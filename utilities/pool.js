import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION,
  ssl: {
    rejectUnauthorized: false, // allow self-signed certs for development
  },
});

export default pool;