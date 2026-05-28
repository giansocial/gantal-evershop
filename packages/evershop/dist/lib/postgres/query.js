import { select as _select, insert as _insert, update as _update, del as _del, insertOnUpdate as _insertOnUpdate } from '@evershop/postgres-query-builder';
// ---- Typed factory functions ---------------------------------------------------
/**
 * Begin a SELECT query.
 *
 * Column name suggestions are shown as `table.column` (e.g. `'order.order_id'`,
 * `'product.sku'`) so you can see which table each column belongs to.
 * Once you call `.from(tableName)`, the chain narrows to that table's columns
 * for `.where()`, `.orderBy()`, `.groupBy()`, etc.
 *
 * @example
 * // All columns shorthand:
 * select().from('order').where('status', '=', 'pending').execute(pool)
 *
 * // Explicit columns with table-prefixed suggestions:
 * select('order.order_id', 'order.uuid')
 *   .from('order')
 *   .orderBy('created_at', 'DESC')
 *   .execute(pool)
 */ export function select(...args) {
    return _select(...args);
}
/** Insert a row into a known EverShop table. `.given()` suggests columns of `T`. */ export function insert(table) {
    return _insert(table);
}
/** Update rows in a known EverShop table. `.given()` / `.where()` suggest columns of `T`. */ export function update(table) {
    return _update(table);
}
/** Delete rows from a known EverShop table. `.where()` suggests columns of `T`. */ export function del(table) {
    return _del(table);
}
/** Insert or update rows in a known EverShop table on conflict. `.given()` suggests columns of `T`. */ export function insertOnUpdate(table, conflictColumns) {
    return _insertOnUpdate(table, conflictColumns);
}
// ---- Re-export everything else from postgres-query-builder ---------------------
export { node, getConnection, startTransaction, commit, rollback, release, execute, sql, value, SelectQuery, UpdateQuery, InsertQuery, InsertOnUpdateQuery, DeleteQuery } from '@evershop/postgres-query-builder';
