import pool from '../utilities/pool.js';
import bcrypt from 'bcrypt';

export default class User {
    static async create({ email, password, name }) {
        const result = await pool.query(
            'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
            [email, password, name]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query(
            'SELECT id, email, name FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }
}