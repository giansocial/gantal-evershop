import { insert, select, update, getConnection, startTransaction, commit, rollback } from '@evershop/postgres-query-builder';
import { pool } from '../../../lib/postgres/connection.js';
import { hookable, hookBefore, hookAfter } from '../../../lib/util/hookable.js';
import { validateAddress } from '../../customer/services/customer/address/addressValidators.js';
/**
 * Add billing address to cart service.
 * This service validates the address and saves the billing address to the cart.
 *
 * @param {string} cartUUID - The UUID of the cart to add the billing address to
 * @param {Address} addressData - The billing address data to be saved
 * @param {Record<string, unknown>} context - Additional context for hooks and extensions
 * @throws {Error} If cart does not exist or address validation fails
 * @returns {Promise<Address>} The newly created address object
 */ const _addBillingAddress = async function addBillingAddress(cartUUID, addressData, context = {}) {
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
        // Save address to database
        const savedAddress = await hookable(saveBillingAddress, {
            cartUUID,
            addressData,
            cart,
            ...context
        })(addressData, connection);
        // Update cart with billing address
        await hookable(updateCartWithBillingAddress, {
            cartUUID,
            addressData,
            cart,
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
 * Save billing address to database
 */ async function saveBillingAddress(addressData, connection) {
    // Save address to database
    const result = await insert('cart_address').given(addressData).execute(connection);
    // Get the saved address
    const savedAddress = await select().from('cart_address').where('cart_address_id', '=', result.insertId).load(connection);
    return savedAddress;
}
/**
 * Update cart with billing address
 */ async function updateCartWithBillingAddress(cartId, addressId, connection) {
    await update('cart').given({
        billing_address_id: addressId
    }).where('cart_id', '=', cartId).execute(connection);
}
/**
 * Hookable wrapper for the addBillingAddress service.
 * This allows third-party extensions to hook into the billing address addition flow.
 */ export const addBillingAddress = async (cartUUID, addressData, context = {})=>{
    const result = await hookable(_addBillingAddress, {
        cartUUID,
        addressData,
        ...context
    })(cartUUID, addressData, context);
    return result;
};
export function hookBeforeSaveBillingAddress(callback, priority = 10) {
    hookBefore('saveBillingAddress', callback, priority);
}
export function hookAfterSaveBillingAddress(callback, priority = 10) {
    hookAfter('saveBillingAddress', callback, priority);
}
export function hookBeforeUpdateCartWithBillingAddress(callback, priority = 10) {
    hookBefore('updateCartWithBillingAddress', callback, priority);
}
export function hookAfterUpdateCartWithBillingAddress(callback, priority = 10) {
    hookAfter('updateCartWithBillingAddress', callback, priority);
}
export function hookBeforeAddBillingAddress(callback, priority = 10) {
    hookBefore('addBillingAddress', callback, priority);
}
export function hookAfterAddBillingAddress(callback, priority = 10) {
    hookAfter('addBillingAddress', callback, priority);
}
