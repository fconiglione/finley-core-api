import Data from '../models/dataModel.js';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

dotenv.config();

// Add a new asset
export const addAsset = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { category, subcategory, name, current_value, description } = req.body;
    const userId = req.user.id;

    try {
        const newAsset = await Data.addAsset({ user_id: userId, category, subcategory, name, current_value, description });
        res.status(201).json({ message: 'Asset added successfully', asset: newAsset });
    } catch (error) {
        console.error('Error adding asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing asset
export const updateAsset = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const assetId = req.params.id;
    const { category, subcategory, name, current_value, description } = req.body;
    const userId = req.user.id;

    try {
        const updatedAsset = await Data.updateAsset(assetId, userId, { category, subcategory, name, current_value, description });
        if (!updatedAsset) {
            return res.status(404).json({ message: 'Asset not found or not authorized' });
        }
        res.status(200).json({ message: 'Asset updated successfully', asset: updatedAsset });
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an asset
export const deleteAsset = async (req, res) => {
    const assetId = req.params.id;
    const userId = req.user.id;

    try {
        const deleted = await Data.deleteAsset(assetId, userId);
        if (!deleted) {
            return res.status(404).json({ message: 'Asset not found or not authorized' });
        }
        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new liability
export const addLiability = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { category, subcategory, name, current_value, description } = req.body;
    const userId = req.user.id;

    try {
        const newLiability = await Data.addLiability({ user_id: userId, category, subcategory, name, current_value, description });
        res.status(201).json({ message: 'Liability added successfully', liability: newLiability });
    } catch (error) {
        console.error('Error adding liability:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing liability
export const updateLiability = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const liabilityId = req.params.id;
    const { category, subcategory, name, current_value, description } = req.body;
    const userId = req.user.id;

    try {
        const updatedLiability = await Data.updateLiability(liabilityId, userId, { category, subcategory, name, current_value, description });
        if (!updatedLiability) {
            return res.status(404).json({ message: 'Liability not found or not authorized' });
        }
        res.status(200).json({ message: 'Liability updated successfully', liability: updatedLiability });
    } catch (error) {
        console.error('Error updating liability:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a liability
export const deleteLiability = async (req, res) => {
    const liabilityId = req.params.id;
    const userId = req.user.id;

    try {
        const deleted = await Data.deleteLiability(liabilityId, userId);
        if (!deleted) {
            return res.status(404).json({ message: 'Liability not found or not authorized' });
        }
        res.status(200).json({ message: 'Liability deleted successfully' });
    } catch (error) {
        console.error('Error deleting liability:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all assets and liabilities for the authenticated user
export const getAllData = async (req, res) => {
    const userId = req.user.id;

    try {
        const assets = await Data.getAssetsByUserId(userId);
        const liabilities = await Data.getLiabilitiesByUserId(userId);
        res.status(200).json({ assets, liabilities });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};