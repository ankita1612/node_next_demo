import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export class EmployeeController {
  /**
   * POST /employees - Create new employee
   */
  static createEmployee = asyncHandler(async (req: Request, res: Response) => {
    const employee = await EmployeeService.createEmployee(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, employee, 'Employee created successfully'));
  });

  /**
   * GET /employees - Fetch all employees with pagination, search, sorting
   */
  static getAllEmployees = asyncHandler(async (req: Request, res: Response) => {
    const queryParams = req.query as any;
    const result = await EmployeeService.getAllEmployees(queryParams);
    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Employees retrieved successfully'));
  });

  /**
   * GET /employees/:id - Fetch employee by ID
   */
  static getEmployeeById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const employee = await EmployeeService.getEmployeeById(id);
    return res
      .status(200)
      .json(new ApiResponse(200, employee, 'Employee details retrieved successfully'));
  });

  /**
   * PUT /employees/:id - Update employee
   */
  static updateEmployee = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const updatedEmployee = await EmployeeService.updateEmployee(id, req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, updatedEmployee, 'Employee updated successfully'));
  });

  /**
   * DELETE /employees/:id - Soft delete employee
   */
  static deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    await EmployeeService.deleteEmployee(id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Employee soft-deleted successfully'));
  });
}
