import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    throw new ApiError(400, 'Name and email are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists');
  }

  const user = await User.create({ name, email, role });
  return res.status(201).json(new ApiResponse(201, user, 'User created successfully'));
});

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find({ isActive: true }).select('-__v');
  return res.status(200).json(new ApiResponse(200, users, 'Users retrieved successfully'));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
});
