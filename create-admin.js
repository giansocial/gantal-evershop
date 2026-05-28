// Script para crear el admin de EverShop automaticamente en Render
// Se ejecuta una vez despues del primer deploy

import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@gantalstore.com';
  const password = process.env.ADMIN_PASSWORD || 'Gantal2024!';

  try {
    // Verificar si la tabla admin existe
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'admin_user'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('Tabla admin_user no existe aun, las migraciones no han corrido');
      await pool.end();
      return;
    }

    // Verificar si ya existe un admin
    const existing = await pool.query('SELECT admin_user_id FROM admin_user WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log('Admin ya existe:', email);
      await pool.end();
      return;
    }

    // Crear el admin
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await pool.query(
      `INSERT INTO admin_user (uuid, email, password, full_name, status)
       VALUES (gen_random_uuid(), $1, $2, 'Gantal Admin', TRUE)`,
      [email, hash]
    );

    console.log('✅ Admin creado exitosamente!');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (err) {
    console.error('Error creando admin:', err.message);
  } finally {
    await pool.end();
  }
}

createAdmin();
