import { insert } from '@evershop/postgres-query-builder';
import { pool } from '../postgres/connection.js';
// Implementation
export async function emit(name, data) {
    await insert('event').given({
        name,
        data
    }).execute(pool);
}
