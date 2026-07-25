import { Employee, CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeQueryParams, PaginatedResult } from '../types/employee.types.js';
export declare class EmployeeService {
    /**
     * Create a new employee with email uniqueness check
     */
    static createEmployee(dto: CreateEmployeeDTO): Promise<Employee>;
    /**
     * Fetch all employees with filtering, searching, and pagination
     */
    static getAllEmployees(params: EmployeeQueryParams): Promise<PaginatedResult<Employee>>;
    /**
     * Get employee by ID
     */
    static getEmployeeById(id: number): Promise<Employee>;
    /**
     * Update existing employee details
     */
    static updateEmployee(id: number, dto: UpdateEmployeeDTO): Promise<Employee>;
    /**
     * Soft delete employee by ID
     */
    static deleteEmployee(id: number): Promise<void>;
}
