import { commit, del, rollback, select, startTransaction } from '@evershop/postgres-query-builder';
import { getConnection } from '../../../../lib/postgres/connection.js';
import { hookable, hookBefore, hookAfter } from '../../../../lib/util/hookable.js';
async function deleteAttributeData(uuid, connection) {
    await del('attribute').where('uuid', '=', uuid).execute(connection);
}
/**
 * Delete attribute service. This service will delete an attribute with all related data
 * @param {String} uuid
 * @param {Object} context
 */ async function deleteAttribute(uuid, context) {
    const connection = await getConnection();
    await startTransaction(connection);
    try {
        const attribute = await select().from('attribute').where('uuid', '=', uuid).load(connection);
        if (!attribute) {
            throw new Error('Invalid attribute id');
        }
        // Make sure the attribute is not being used in any variant group
        const variantGroup = await select().from('variant_group').where('attribute_one', '=', attribute.attribute_id).or('attribute_two', '=', attribute.attribute_id).or('attribute_three', '=', attribute.attribute_id).or('attribute_four', '=', attribute.attribute_id).or('attribute_five', '=', attribute.attribute_id).load(connection);
        if (variantGroup) {
            throw new Error(`The attribute "${attribute.attribute_name}" is being used in a variant group`);
        }
        await hookable(deleteAttributeData, {
            ...context,
            connection,
            attribute
        })(uuid, connection);
        await commit(connection);
        return attribute;
    } catch (e) {
        await rollback(connection);
        throw e;
    }
}
/**
 * Delete attribute service. This service will delete an attribute with all related data
 * @param {String} uuid
 * @param {Object} context
 */ export default (async (uuid, context)=>{
    // Make sure the context is either not provided or is an object
    if (context && typeof context !== 'object') {
        throw new Error('Context must be an object');
    }
    const attribute = await hookable(deleteAttribute, context)(uuid, context);
    return attribute;
});
export function hookBeforeDeleteAttributeData(callback, priority = 10) {
    hookBefore('deleteAttributeData', callback, priority);
}
export function hookAfterDeleteAttributeData(callback, priority = 10) {
    hookAfter('deleteAttributeData', callback, priority);
}
export function hookBeforeDeleteAttribute(callback, priority = 10) {
    hookBefore('deleteAttribute', callback, priority);
}
export function hookAfterDeleteAttribute(callback, priority = 10) {
    hookAfter('deleteAttribute', callback, priority);
}
