import User from '../models/userModel.js';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name  } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ email, password: hashedPassword, name });

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user

export const loginUser = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify user middleware (example, not a route handler)
export const verifyUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Retrieve user profile

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ email: user.email, name: user.name, phone: user.phone, timezone: user.timezone, email_notifications: user.email_notifications, security_notifications: user.security_notifications, created_at: user.created_at });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user account

export const deleteUserAccount = async (req, res) => {
    try {
        const deleted = await User.deleteById(req.user.id);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User account and data deleted successfully' });
    } catch (error) {
        console.error('Error deleting user account and data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, timezone } = req.body;

    try {
        const updatedUser = await User.updateById(req.user.id, { name, email, phone, timezone });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// update user notification preferences
export const updateUserNotifications = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email_notifications, security_notifications } = req.body;

    try {
        const updatedUser = await User.updateNotificationsById(req.user.id, { email_notifications, security_notifications });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User notification preferences updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user notification preferences:', error);
        res.status(500).json({ message: 'Server error' });
    }
};