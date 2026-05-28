import { commit, rollback, select, startTransaction, update } from '@evershop/postgres-query-builder';
import { getConnection } from '../../../../lib/postgres/connection.js';
import { hookable, hookBefore, hookAfter } from '../../../../lib/util/hookable.js';
import { getValue, getValueSync } from '../../../../lib/util/registry.js';
import { sanitizeRawHtml } from '../../../../lib/util/sanitizeHtml.js';
import { getAjv } from '../../../base/services/getAjv.js';
import categoryDataSchema from './categoryDataSchema.json' with {
    type: 'json'
};
function validateCategoryDataBeforeInsert(data) {
    const ajv = getAjv();
    categoryDataSchema.required = [];
    const jsonSchema = getValueSync('updateCategoryDataJsonSchema', categoryDataSchema, {});
    const validate = ajv.compile(jsonSchema);
    const valid = validate(data);
    if (valid) {
        return data;
    } else {
        throw new Error(validate.errors[0].message);
    }
}
async function updateCategoryData(uuid, data, connection) {
    const query = select().from('category');
    query.leftJoin('category_description').on('category_description.category_description_category_id', '=', 'category.category_id');
    const category = await query.where('uuid', '=', uuid).load(connection);
    if (!category) {
        throw new Error('Requested category not found');
    }
    let newCategory;
    try {
        newCategory = await update('category').given(data).where('uuid', '=', uuid).execute(connection);
        Object.assign(category, newCategory);
    } catch (e) {
        if (!e.message.includes('No data was provided')) {
            throw e;
        }
    }
    let description;
    try {
        description = await update('category_description').given(data).where('category_description_category_id', '=', category.category_id).execute(connection);
        Object.assign(category, description);
    } catch (e) {
        if (!e.message.includes('No data was provided')) {
            throw e;
        }
    }
    return {
        ...description,
        ...newCategory,
        updatedId: category.category_id
    };
}
/**
 * Update category service. This service will update a category with all related data
 * @param {String} uuid
 * @param {Object} data
 * @param {Object} context
 */ async function updateCategory(uuid, data, context) {
    const connection = await getConnection();
    await startTransaction(connection);
    try {
        const categoryData = await getValue('categoryDataBeforeUpdate', data);
        // Validate category data
        validateCategoryDataBeforeInsert(categoryData);
        if (categoryData.description) {
            sanitizeRawHtml(categoryData.description);
        }
        // Insert category data
        const category = await hookable(updateCategoryData, {
            ...context,
            connection
        })(uuid, categoryData, connection);
        await commit(connection);
        return category;
    } catch (e) {
        await rollback(connection);
        throw e;
    }
}
/**
 * Update category service. This service will update a category with all related data
 * @param {String} uuid
 * @param {Object} data
 * @param {Object} context
 */ export default (async (uuid, data, context)=>{
    // Make sure the context is either not provided or is an object
    if (context && typeof context !== 'object') {
        throw new Error('Context must be an object');
    }
    const category = await hookable(updateCategory, context)(uuid, data, context);
    return category;
});
export function hookBeforeUpdateCategoryData(callback, priority = 10) {
    hookBefore('updateCategoryData', callback, priority);
}
export function hookAfterUpdateCategoryData(callback, priority = 10) {
    hookAfter('updateCategoryData', callback, priority);
}
export function hookBeforeUpdateCategory(callback, priority = 10) {
    hookBefore('updateCategory', callback, priority);
}
export function hookAfterUpdateCategory(callback, priority = 10) {
    hookAfter('updateCategory', callback, priority);
}
