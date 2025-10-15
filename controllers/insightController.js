import Data from '../models/dataModel.js';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

dotenv.config();

// Handle message from client and send to data api then return response back to client
export const handleMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;
    const userId = req.user.id;

    try {
        console.log(`Received message from user ${userId}: ${message}`);

        res.status(200).json({ message: 'Message received successfully' });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ message: 'Server error' });
    }
};