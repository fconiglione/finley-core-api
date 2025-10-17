import Data from '../models/dataModel.js';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import axios from 'axios';

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
        const response = await axios.post(`${process.env.DATA_API}/v1/api/ai/respond`,
            {message: message,
            userId: userId},
            { timeout: 15000 }
        );

        const messageReceived = response.data.response;

        res.status(200).json(messageReceived);
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ message: 'Server error' });
    }
};