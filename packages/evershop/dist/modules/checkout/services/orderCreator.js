import { commit, getConnection, insert, rollback, select, startTransaction, update } from '@evershop/postgres-query-builder';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../../lib/postgres/connection.js';
import { getConfig } from '../../../lib/util/getConfig.js';
import { hookable, hookBefore, hookAfter } from '../../../lib/util/hookable.js';
import addOrderActivityLog from '../../oms/services/addOrderActivityLog.js';
import { resolveOrderStatus } from '../../oms/services/updateOrderStatus.js';
import { validateBeforeCreateOrder } from './orderValidator.js';
async function disableCart(cartId, connection) {
    const cart = await update('cart').given({
        status: false
    }).where('cart_id', '=', cartId).execute(connection);
    return cart;
}
async function saveOrder(cart, connection) {
    const shipmentStatusList = getConfig('oms.order.shipmentStatus', {});
    const paymentStatusList = getConfig('oms.order.paymentStatus', {});
    let defaultShipmentStatus;
    Object.keys(shipmentStatusList).forEach((key)=>{
        if (shipmentStatusList[key].isDefault) {
            defaultShipmentStatus = key;
        }
    });
    let defaultPaymentStatus;
    Object.keys(paymentStatusList).forEach((key)=>{
        if (paymentStatusList[key].isDefault) {
            defaultPaymentStatus = key;
        }
    });
    let shipAddr;
    if (cart.getData('shipping_address_id')) {
        // Save the shipping address
        const cartShippingAddress = await select().from('cart_address').where('cart_address_id', '=', cart.getData('shipping_address_id')).load(connection);
        delete cartShippingAddress.uuid;
        shipAddr = await insert('order_address').given(cartShippingAddress).execute(connection);
    }
    // Save the billing address
    const cartBillingAddress = await select().from('cart_address').where('cart_address_id', '=', cart.getData('billing_address_id')).load(connection);
    delete cartBillingAddress.uuid;
    const billAddr = await insert('order_address').given(cartBillingAddress).execute(connection);
    const previous = await select('order_id').from('order').orderBy('order_id', 'DESC').limit(0, 1).execute(connection);
    const orderStatus = resolveOrderStatus(defaultPaymentStatus, defaultShipmentStatus);
    // Save order to DB
    const order = await insert('order').given({
        ...cart.exportData(),
        uuid: uuidv4().replace(/-/g, ''),
        order_number: 10000 + parseInt(previous[0] ? previous[0].order_id : 0, 10) + 1,
        // FIXME: Must be structured
        shipping_address_id: shipAddr ? shipAddr.insertId : null,
        billing_address_id: billAddr.insertId,
        status: orderStatus,
        payment_status: defaultPaymentStatus,
        shipment_status: defaultShipmentStatus
    }).execute(connection);
    return order;
}
async function saveOrderItems(cart, orderId, connection) {
    // Save order items
    const items = cart.getItems();
    const savedItems = await Promise.all(items.map(async (item)=>{
        await insert('order_item').given({
            ...item.export(),
            uuid: uuidv4().replace(/-/g, ''),
            order_item_order_id: orderId
        }).execute(connection);
    }));
    return savedItems;
}
async function createOrderFunc(cart) {
    // Start creating order
    const connection = await getConnection(pool);
    try {
        await startTransaction(connection);
        // Validate the cart
        const validateResult = await validateBeforeCreateOrder(cart);
        if (!validateResult.valid) {
            throw new Error(`Order validation failed: ${validateResult.errors.join('\r\n-- ')}`);
        }
        // Save order to DB
        const order = await hookable(saveOrder, {
            cart
        })(cart, connection);
        // Save order items
        await hookable(saveOrderItems, {
            cart
        })(cart, order.insertId, connection);
        // Save order activity
        await addOrderActivityLog(order.insertId, `Order has been created`, false, connection);
        // Disable the cart
        await hookable(disableCart, {
            cart
        })(cart.getData('cart_id'), connection);
        await commit(connection);
        return order;
    } catch (e) {
        await rollback(connection);
        throw e;
    }
}
/**
 * Create a new order from the cart
 * @param cart
 * @returns {Promise<Object>} - The created order object
 * @throws {Error} - If the order creation fails due to validation errors or database issues
 */ export const createOrder = async (cart)=>{
    const order = await hookable(createOrderFunc, {
        cart
    })(cart);
    return order;
};
export function hookBeforeDisableCart(callback, priority = 10) {
    hookBefore('disableCart', callback, priority);
}
export function hookAfterDisableCart(callback, priority = 10) {
    hookAfter('disableCart', callback, priority);
}
export function hookBeforeSaveOrder(callback, priority = 10) {
    hookBefore('saveOrder', callback, priority);
}
export function hookAfterSaveOrder(callback, priority = 10) {
    hookAfter('saveOrder', callback, priority);
}
export function hookBeforeSaveOrderItems(callback, priority = 10) {
    hookBefore('saveOrderItems', callback, priority);
}
export function hookAfterSaveOrderItems(callback, priority = 10) {
    hookAfter('saveOrderItems', callback, priority);
}
export function hookBeforeCreateOrderFunc(callback, priority = 10) {
    hookBefore('createOrderFunc', callback, priority);
}
export function hookAfterCreateOrderFunc(callback, priority = 10) {
    hookAfter('createOrderFunc', callback, priority);
}
