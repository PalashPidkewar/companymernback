import express from 'express';
import { addProduction, getProduction } from '../controllers/Productioncontrollers.js';
import { protect, adminOnly } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/add', protect, adminOnly, addProduction); // Only admin can add
router.get('/all', protect, getProduction);             // Both roles can view

export default router;
    