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
}