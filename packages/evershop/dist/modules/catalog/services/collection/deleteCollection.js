import { startTransaction, commit, rollback, select, del } from '@evershop/postgres-query-builder';
import { getConnection } from '../../../../lib/postgres/connection.js';
import { hookable, hookBefore, hookAfter } from '../../../../lib/util/hookable.js';
async function deleteCollectionData(uuid, connection) {
    await del('collection').where('uuid', '=', uuid).execute(connection);
}
/**
 * Delete collection service. This service will delete a collection with all related data
 * @param {String} uuid
 * @param {Object} context
 */ async function deleteCollection(uuid, context) {
    const connection = await getConnection();
    await startTransaction(connection);
    try {
        const query = select().from('collection');
        const collection = await query.where('uuid', '=', uuid).load(connection);
        if (!collection) {
            throw new Error('Invalid collection id');
        }
        await hookable(deleteCollectionData, {
            ...context,
            connection,
            collection
        })(uuid, connection);
        await commit(connection);
        return collection;
    } catch (e) {
        await rollback(connection);
        throw e;
    }
}
/**
 * Delete collection service. This service will delete a collection with all related data
 * @param {String} uuid
 * @param {Object} context
 */ export default (async (uuid, context)=>{
    // Make sure the context is either not provided or is an object
    if (context && typeof context !== 'object') {
        throw new Error('Context must be an object');
    }
    const collection = await hookable(deleteCollection, context)(uuid, context);
    return collection;
});
export function hookBeforeDeleteCollectionData(callback, priority = 10) {
    hookBefore('deleteCollectionData', callback, priority);
}
export function hookAfterDeleteCollectionData(callback, priority = 10) {
    hookAfter('deleteCollectionData', callback, priority);
}
export function hookBeforeDeleteCollection(callback, priority = 10) {
    hookBefore('deleteCollection', callback, priority);
}
export function hookAfterDeleteCollection(callback, priority = 10) {
    hookAfter('deleteCollection', callback, priority);
}
