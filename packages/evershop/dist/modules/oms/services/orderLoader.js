import { pool } from '../../../lib/postgres/connection.js';
import { select } from '../../../lib/postgres/query.js';
export async function loadOrderById(orderId) {
    const order = await select().from('order').where('order_id', '=', orderId).load(pool);
    if (!order) {
        return null;
    }
    const items = await select().from('order_item').where('order_item_order_id', '=', orderId).execute(pool);
    const shippingAddress = await select().from('order_address').where('order_address_id', '=', order.shipping_address_id).load(pool);
    const billingAddress = await select().from('order_address').where('order_address_id', '=', order.billing_address_id).load(pool);
    return {
        ...order,
        items,
        shippingAddress,
        billingAddress
    };
}
export async function loadOrderByUUID(orderUUID) {
    const order = await select().from('order').where('uuid', '=', orderUUID).load(pool);
    if (!order) {
        return null;
    }
    const items = await select().from('order_item').where('order_item_order_id', '=', order.order_id).execute(pool);
    const shippingAddress = await select().from('order_address').where('order_address_id', '=', order.shipping_address_id).load(pool);
    const billingAddress = await select().from('order_address').where('order_address_id', '=', order.billing_address_id).load(pool);
    return {
        ...order,
        items,
        shippingAddress,
        billingAddress
    };
}
