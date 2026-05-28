import { select } from '@evershop/postgres-query-builder';
import { pool } from '../../../lib/postgres/connection.js';
let setting;
export async function getSetting(name, defaultValue) {
    if (!setting) {
        setting = await select().from('setting').execute(pool);
    }
    const row = setting.find((s)=>s.name === name);
    if (row) {
        return row.value;
    } else {
        return defaultValue;
    }
}
export async function refreshSetting() {
    setting = await select().from('setting').execute(pool);
}
export async function getStoreName(defaultValue = 'Evershop') {
    return await getSetting('storeName', defaultValue);
}
export function getStoreDescription() {
    return getSetting('storeDescription', null);
}
export async function getStoreEmail() {
    return await getSetting('storeEmail', null);
}
export async function getStorePhoneNumber() {
    return await getSetting('storePhoneNumber', null);
}
export function getStoreCountry() {
    return getSetting('storeCountry', null);
}
export function getStoreProvince() {
    return getSetting('storeProvince', null);
}
export function getStoreCity() {
    return getSetting('storeCity', null);
}
export function getStoreAddress() {
    return getSetting('storeAddress', null);
}
export function getStorePostalCode() {
    return getSetting('storePostalCode', null);
}
