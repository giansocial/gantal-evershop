import { commit, insert, rollback, select, startTransaction } from '@evershop/postgres-query-builder';
import { getConnection } from '../../../lib/postgres/connection.js';
import { hookable, hookBefore, hookAfter } from '../../../lib/util/hookable.js';
import addOrderActivityLog from './addOrderActivityLog.js';
import { updateShipmentStatus } from './updateShipmentStatus.js';
async function createShipment(orderId, carrier, trackingNumber, connection) {
    const result = await insert('shipment').given({
        shipment_order_id: orderId,
        carrier,
        tracking_number: trackingNumber
    }).execute(connection);
    return result;
}
export default (async (orderUuid, carrier, trackingNumber, connection)=>{
    const conn = connection || await getConnection();
    const order = await select().from('order').where('uuid', '=', orderUuid).load(conn, false);
    if (!order) {
        throw new Error('Invalid order id');
    }
    const shipment = await select().from('shipment').where('shipment_order_id', '=', order.order_id).load(conn, false);
    if (shipment) {
        throw new Error('Shipment was created');
    }
    if (!connection) {
        await startTransaction(conn);
    }
    try {
        const result = await hookable(createShipment, {
            order,
            carrier,
            trackingNumber
        })(order.order_id, carrier, trackingNumber, conn);
        /* Update Shipment status to shipped */ await updateShipmentStatus(order.order_id, 'shipped', conn);
        /* Add an activity log message */ await addOrderActivityLog(order.order_id, `Order has been shipped`, false, conn);
        const shipmentData = await select().from('shipment').where('shipment_id', '=', result.insertId).load(conn, false);
        if (!connection) {
            await commit(conn);
        }
        return shipmentData;
    } catch (e) {
        if (!connection) {
            await rollback(conn);
        }
        throw e;
    }
});
export function hookBeforeCreateShipment(callback, priority = 10) {
    hookBefore('createShipment', callback, priority);
}
export function hookAfterCreateShipment(callback, priority = 10) {
    hookAfter('createShipment', callback, priority);
}
