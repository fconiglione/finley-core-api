import pool from '../utilities/pool.js';
import bcrypt from 'bcrypt';

export default class User {
    static async create({ email, password }) {
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, password]
        );
        return result.rows[0];
    }
}