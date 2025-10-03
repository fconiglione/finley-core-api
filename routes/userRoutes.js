import express from 'express';
import { registerUser, loginUser, verifyUser, getUserProfile } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

// Register route
router.post('/register', [body('email').isEmail().withMessage('Valid email address required'), body('password').isLength({ min: 5 }).withMessage('Password must be at least 8 characters'), body('name').notEmpty().withMessage('Name is required')], registerUser);

// Login route
router.post('/login', [body('email').isEmail().withMessage('Valid email address required'), body('password').isLength({ min: 5 }).withMessage('Password must be at least 8 characters')], loginUser);

// Logout route
// router.post('/logout', [body('email').isEmail().withMessage('Valid email address required'), body('password').isLength({ min: 5 }).withMessage('Password must be at least 8 characters')], logoutUser);

// Profile route (PROTECTED)
router.post('/profile', verifyUser, getUserProfile);

export default router;