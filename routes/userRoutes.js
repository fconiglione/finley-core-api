import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

// Register route
router.post('/register', [body('email').isEmail().withMessage('Valid email address required'), body('password').isLength({ min: 5 }).withMessage('Password must be at least 8 characters')], registerUser);

// Login route
// router.post('/login', [body('email').isEmail().withMessage('Valid email address required'), body('password').isLength({ min: 5 }).withMessage('Password must be at least 8 characters')], loginUser);

// Logout route
// router.post('/logout', [body('email').isEmail().withMessage('Valid email address required'), body('password').isLength({ min: 5 }).withMessage('Password must be at least 8 characters')], logoutUser);

// Middleware to check authentication
// router.post('/verify', verifyUser);

export default router;