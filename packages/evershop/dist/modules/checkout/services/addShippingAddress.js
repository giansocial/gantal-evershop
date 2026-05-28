import { insert, select, update, getConnection, startTransaction, commit, rollback } from '@evershop/postgres-query-builder';
import { pool } from '../../../lib/postgres/connection.js';
import { hookable, hookBefore, hookAfter } from '../../../lib/util/hookable.js';
import { validateAddress } from '../../customer/services/customer/address/addressValidators.js';
/**
 * Add shipping address to cart service.
 * This service validates the address, checks shipping zones, and saves the address to the cart.
 *
 * @param {string} cartUUID - The UUID of the cart to add the shipping address to
 * @param {Address} addressData - The shipping address data to be saved
 * @param {Record<string, unknown>} context - Additional context for hooks and extensions
 * @throws {Error} If cart does not exist, address validation fails, or shipping zone is not available
 * @returns {Promise<Address>} The newly created address object
 */ const _addShippingAddress = async function addShippingAddress(cartUUID, addressData, context = {}) {
    if (!cartUUID || typeof cartUUID !== 'string') {
        throw new Error('Cart UUID is required');
    }
    if (!addressData || typeof addressData !== 'object') {
        throw new Error('Address data is required');
    }
    if (typeof context !== 'object' || context === null) {
        throw new Error('Context must be an object');
    }
    // Get database connection for transaction
    const connection = await getConnection(pool);
    try {
        await startTransaction(connection);
        // Verify cart exists and is active
        const cart = await select().from('cart').where('uuid', '=', cartUUID).andWhere('status', '=', true).load(connection);
        if (!cart) {
            throw new Error('Cart not found or not active');
        }
        // Validate address
        const validationResult = validateAddress(addressData);
        if (!validationResult.valid) {
            const errorMessage = validationResult.errors?.[0] || 'Invalid address data';
            throw new Error(errorMessage);
        }
        // // Find shipping zone for the address
        // const shippingZone = await hookable(findShippingZone, {
        //   cartUUID,
        //   addressData,
        //   cart,
        //   ...context
        // })(addressData, connection);
        // if (!shippingZone) {
        //   throw new Error('We do not ship to this address');
        // }
        // Save address to database
        const savedAddress = await hookable(saveShippingAddress, {
            cartUUID,
            addressData,
            cart,
            //shippingZone,
            ...context
        })(addressData, connection);
        // Update cart with shipping zone and address
        await hookable(updateCartWithShippingAddress, {
            cartUUID,
            addressData,
            cart,
            //shippingZone,
            savedAddress,
            ...context
        })(cart.cart_id, savedAddress.cart_address_id, connection);
        await commit(connection);
        return savedAddress;
    } catch (error) {
        await rollback(connection);
        throw error;
    }
};
/**
 * Find shipping zone for the given address
 */ async function findShippingZone(addressData, connection) {
    const shippingZoneQuery = select().from('shipping_zone');
    shippingZoneQuery.leftJoin('shipping_zone_province').on('shipping_zone_province.zone_id', '=', 'shipping_zone.shipping_zone_id');
    shippingZoneQuery.where('shipping_zone.country', '=', addressData.country);
    const shippingZoneProvinces = await shippingZoneQuery.execute(connection);
    const shippingZone = shippingZoneProvinces.find((zone)=>zone.province === addressData.province || zone.province === null);
    return shippingZone;
}
/**
 * Save shipping address to database
 */ async function saveShippingAddress(addressData, connection) {
    // Save address to database
    const result = await insert('cart_address').given(addressData).execute(connection);
    // Get the saved address
    const savedAddress = await select().from('cart_address').where('cart_address_id', '=', result.insertId).load(connection);
    return savedAddress;
}
/**
 * Update cart with shipping zone and address
 */ async function updateCartWithShippingAddress(cartId, addressId, connection) {
    await update('cart').given({
        shipping_address_id: addressId
    }).where('cart_id', '=', cartId).execute(connection);
}
/**
 * Hookable wrapper for the addShippingAddress service.
 * This allows third-party extensions to hook into the shipping address addition flow.
 */ export const addShippingAddress = async (cartUUID, addressData, context = {})=>{
    const result = await hookable(_addShippingAddress, {
        cartUUID,
        addressData,
        ...context
    })(cartUUID, addressData, context);
    return result;
};
export function hookBeforeSaveShippingAddress(callback, priority = 10) {
    hookBefore('saveShippingAddress', callback, priority);
}
export function hookAfterSaveShippingAddress(callback, priority = 10) {
    hookAfter('saveShippingAddress', callback, priority);
}
export function hookBeforeAddShippingAddress(callback, priority = 10) {
    hookBefore('addShippingAddress', callback, priority);
}
export function hookAfterAddShippingAddress(callback, priority = 10) {
    hookAfter('addShippingAddress', callback, priority);
}
