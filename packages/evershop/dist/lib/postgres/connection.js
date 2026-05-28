import fs from 'fs';
import { Pool } from 'pg';
import { getConfig } from '../util/getConfig.js';
// Use env for the database connection, maintain the backward compatibility
const connectionSetting = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20
};
// Support SSL
const sslMode = process.env.DB_SSLMODE;
switch(sslMode){
    case 'disable':
        {
            connectionSetting.ssl = false;
            break;
        }
    case 'require':
    case 'prefer':
    case 'verify-ca':
    case 'verify-full':
        {
            const ssl = {
                rejectUnauthorized: true
            };
            const ca = process.env.DB_SSLROOTCERT;
            if (ca) {
                ssl.ca = fs.readFileSync(ca).toString();
            }
            const cert = process.env.DB_SSLCERT;
            if (cert) {
                ssl.cert = fs.readFileSync(cert).toString();
            }
            const key = process.env.DB_SSLKEY;
            if (key) {
                ssl.key = fs.readFileSync(key).toString();
            }
            connectionSetting.ssl = ssl;
            break;
        }
    case 'no-verify':
        {
            connectionSetting.ssl = {
                rejectUnauthorized: false
            };
            break;
        }
    default:
        {
            connectionSetting.ssl = false;
            break;
        }
}
// onConnect is awaited by pg before the client is handed to user code,
// unlike pool.on('connect', ...) which is not awaited (deprecated in pg@8.19.0).
// Cast needed because @types/pg doesn't yet declare onConnect in PoolConfig.
const pool = new Pool({
    ...connectionSetting,
    onConnect: async (client)=>{
        const timeZone = getConfig('shop.timezone', 'UTC');
        await client.query(`SET TIMEZONE TO "${timeZone}";`);
    }
});
async function getConnection() {
    return await pool.connect();
}
export { pool, getConnection, connectionSetting };
