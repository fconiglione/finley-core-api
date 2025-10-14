import express from 'express';
import { addAsset, updateAsset, deleteAsset, addLiability, updateLiability, deleteLiability, getAllData } from '../controllers/dataController.js';
import { body } from 'express-validator';
import { verifyUser } from '../controllers/userController.js';

const router = express.Router();

// Add Asset route (PROTECTED)
router.post('/assets', verifyUser, [
    body('category').notEmpty().withMessage('Category is required'),
    body('subcategory').notEmpty().withMessage('Subcategory is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('current_value').isFloat({ gt: 0 }).withMessage('Current value must be a positive number'),
    body('description').optional().isString()
], addAsset);

// Update Asset route (PROTECTED)
router.put('/assets/:id', verifyUser, [
    body('category').notEmpty().withMessage('Category is required'),
    body('subcategory').notEmpty().withMessage('Subcategory is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('current_value').isFloat({ gt: 0 }).withMessage('Current value must be a positive number'),
    body('description').optional().isString()
], updateAsset);

// Delete Asset route (PROTECTED)
router.delete('/assets/:id', verifyUser, deleteAsset);

// Add Liability route (PROTECTED)
router.post('/liabilities', verifyUser, [
    body('category').notEmpty().withMessage('Category is required'),
    body('subcategory').notEmpty().withMessage('Subcategory is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('current_value').isFloat({ gt: 0 }).withMessage('Current value must be a positive number'),
    body('description').optional().isString()
], addLiability);

// Update Liability route (PROTECTED)
router.put('/liabilities/:id', verifyUser, [
    body('category').notEmpty().withMessage('Category is required'),
    body('subcategory').notEmpty().withMessage('Subcategory is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('current_value').isFloat({ gt: 0 }).withMessage('Current value must be a positive number'),
    body('description').optional().isString()
], updateLiability);

// Delete Liability route (PROTECTED)
router.delete('/liabilities/:id', verifyUser, deleteLiability); 

// Get All Data route (PROTECTED)
router.get('/all', verifyUser, getAllData);

export default router;