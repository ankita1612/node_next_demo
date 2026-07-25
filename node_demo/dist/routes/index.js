import { Router } from 'express';
import employeeRoutes from './employee.routes.js';
const router = Router();
// Health check endpoint
router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Employee Management API is operational',
        timestamp: new Date().toISOString(),
    });
});
// Employee resource routes
router.use('/employees', employeeRoutes);
export default router;
