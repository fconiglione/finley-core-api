import pool from '../utilities/pool.js';

export default class Data {
    static async addAsset({ user_id, category, subcategory, name, current_value, description }) {
        const result = await pool.query(
            `INSERT INTO assets (user_id, category, subcategory, name, current_value, description) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [user_id, category, subcategory, name, current_value, description]
        );
        return result.rows[0];
    }

    static async updateAsset(id, user_id, { category, subcategory, name, current_value, description }) {
        const result = await pool.query(
            `UPDATE assets 
             SET category = $1, subcategory = $2, name = $3, current_value = $4, description = $5, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $6 AND user_id = $7 
             RETURNING *`,
            [category, subcategory, name, current_value, description, id, user_id]
        );
        return result.rows[0];
    }

    static async deleteAsset(id, user_id) {
        const result = await pool.query(
            `DELETE FROM assets 
             WHERE id = $1 AND user_id = $2 
             RETURNING *`,
            [id, user_id]
        );
        return result.rowCount > 0;
    }

    static async addLiability({ user_id, category, subcategory, name, current_value, description }) {
        const result = await pool.query(
            `INSERT INTO liabilities (user_id, category, subcategory, name, current_value, description) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [user_id, category, subcategory, name, current_value, description]
        );
        return result.rows[0];
    }

    static async updateLiability(id, user_id, { category, subcategory, name, current_value, description }) {
        const result = await pool.query(
            `UPDATE liabilities 
             SET category = $1, subcategory = $2, name = $3, current_value = $4, description = $5, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $6 AND user_id = $7 
             RETURNING *`,
            [category, subcategory, name, current_value, description, id, user_id]
        );
        return result.rows[0];
    }

    static async deleteLiability(id, user_id) {
        const result = await pool.query(
            `DELETE FROM liabilities 
             WHERE id = $1 AND user_id = $2 
             RETURNING *`,
            [id, user_id]
        );
        return result.rowCount > 0;
    }
    
    static async getAssetsByUserId(user_id) {
        const result = await pool.query(
            `SELECT * FROM assets WHERE user_id = $1 ORDER BY recorded_at DESC`,
            [user_id]
        );
        return result.rows;
    }

    static async getLiabilitiesByUserId(user_id) {
        const result = await pool.query(
            `SELECT * FROM liabilities WHERE user_id = $1 ORDER BY recorded_at DESC`,
            [user_id]
        );
        return result.rows;
    }
}