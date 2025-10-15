import express from 'express';
import { receiveMessage, sendMessage } from '../controllers/insightController.js';
import { body } from 'express-validator';
import { verifyUser } from '../controllers/userController.js';

const router = express.Router();

// Receive Message route (PROTECTED)
router.post('/receive', verifyUser, [
    body('message').notEmpty().withMessage('Message is required')
], receiveMessage);

// Send Message route (PROTECTED)
router.post('/send', verifyUser, [
    body('message').notEmpty().withMessage('Message is required')
], sendMessage);

export default router;