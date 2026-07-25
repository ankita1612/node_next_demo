import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getHealthStatus = asyncHandler(async (_req: Request, res: Response) => {
  const dbStatusState = mongoose.connection.readyState;
  const dbStates: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const healthData = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStates[dbStatusState] || 'unknown',
      isConnected: dbStatusState === 1,
    },
  };

  const statusCode = dbStatusState === 1 ? 200 : 503;
  return res.status(statusCode).json(new ApiResponse(statusCode, healthData, 'Health check completed'));
});
