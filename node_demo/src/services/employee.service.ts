import { EmployeeModel } from '../models/employee.model.js';
import {
  Employee,
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
  EmployeeQueryParams,
  PaginatedResult,
} from '../types/employee.types.js';
import { ApiError } from '../utils/ApiError.js';

export class EmployeeService {
  /**
   * Create a new employee with email uniqueness check
   */
  static async createEmployee(dto: CreateEmployeeDTO): Promise<Employee> {
    const existingEmployee = await EmployeeModel.findByEmail(dto.email);
    if (existingEmployee) {
      throw new ApiError(409, `Employee with email '${dto.email}' already exists.`);
    }

    return await EmployeeModel.create(dto);
  }

  /**
   * Fetch all employees with filtering, searching, and pagination
   */
  static async getAllEmployees(params: EmployeeQueryParams): Promise<PaginatedResult<Employee>> {
    return await EmployeeModel.findAll(params);
  }

  /**
   * Get employee by ID
   */
  static async getEmployeeById(id: number): Promise<Employee> {
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      throw new ApiError(404, `Employee with ID ${id} not found.`);
    }
    return employee;
  }

  /**
   * Update existing employee details
   */
  static async updateEmployee(id: number, dto: UpdateEmployeeDTO): Promise<Employee> {
    // Check if employee exists
    const existingEmployee = await EmployeeModel.findById(id);
    if (!existingEmployee) {
      throw new ApiError(404, `Employee with ID ${id} not found.`);
    }

    // Check email uniqueness if email is being updated
    if (dto.email && dto.email.toLowerCase() !== existingEmployee.email.toLowerCase()) {
      const emailConflict = await EmployeeModel.findByEmail(dto.email);
      if (emailConflict) {
        throw new ApiError(409, `Employee with email '${dto.email}' already exists.`);
      }
    }

    const updatedEmployee = await EmployeeModel.update(id, dto);
    if (!updatedEmployee) {
      throw new ApiError(400, `Failed to update employee with ID ${id}.`);
    }
    return updatedEmployee;
  }

  /**
   * Soft delete employee by ID
   */
  static async deleteEmployee(id: number): Promise<void> {
    const existingEmployee = await EmployeeModel.findById(id);
    if (!existingEmployee) {
      throw new ApiError(404, `Employee with ID ${id} not found.`);
    }

    const isDeleted = await EmployeeModel.softDelete(id);
    if (!isDeleted) {
      throw new ApiError(400, `Failed to soft delete employee with ID ${id}.`);
    }
  }
}
