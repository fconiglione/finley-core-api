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
            'SELECT id, email, name, phone, timezone, email_notifications, security_notifications, created_at FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async deleteById(id) {
        const resultAssets = await pool.query(
            'DELETE FROM assets WHERE user_id = $1 RETURNING id',
            [id]
        );
        const resultLiabilities = await pool.query(
            'DELETE FROM liabilities WHERE user_id = $1 RETURNING id',
            [id]
        );
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount > 0;
    }

    static async updateById(id, { email, name, phone, timezone }) {
        const result = await pool.query(
            'UPDATE users SET email = $1, name = $2, phone = $3, timezone = $4 WHERE id = $5 RETURNING id, email, name, phone, timezone',
            [email, name, phone, timezone, id]
        );
        return result.rows[0];
    }

    static async updateNotificationsById(id, { email_notifications, security_notifications }) {
        const result = await pool.query(
            'UPDATE users SET email_notifications = $1, security_notifications = $2 WHERE id = $3 RETURNING id, email_notifications, security_notifications',
            [email_notifications, security_notifications, id]
        );
        return result.rows[0];
    }
}