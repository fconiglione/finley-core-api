import pool from '../utilities/pool.js';

export async function initializeUserTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20),
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email_notifications BOOLEAN DEFAULT TRUE,
            security_notifications BOOLEAN DEFAULT TRUE,
            timezone VARCHAR(100) DEFAULT 'EST',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('User table initialized or already exists.');
    } catch (error) {
        console.error('Error initializing user table:', error);
    }
}

export async function initializeAssetsTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS assets (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            category VARCHAR(100) NOT NULL,
            subcategory VARCHAR(100),
            name VARCHAR(255) NOT NULL,
            current_value DECIMAL(15, 2) NOT NULL,
            description TEXT,
            recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Assets table initialized or already exists.');
    } catch (error) {
        console.error('Error initializing assets table:', error);
    }
}

export async function initializeLiabilitiesTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS liabilities (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            category VARCHAR(100) NOT NULL,
            subcategory VARCHAR(100),
            name VARCHAR(255) NOT NULL,
            current_value DECIMAL(15, 2) NOT NULL,
            description TEXT,
            recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Liabilities table initialized or already exists.');
    } catch (error) {
        console.error('Error initializing liabilities table:', error);
    }
}