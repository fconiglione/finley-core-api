import express from 'express';
import { handleMessage } from '../controllers/insightController.js';
import { body } from 'express-validator';
import { verifyUser } from '../controllers/userController.js';

const router = express.Router();

// Handle Message route (PROTECTED)
router.post('/', verifyUser, [
    body('message').notEmpty().withMessage('Message is required')
], handleMessage);

export default router;