import { Employee, CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeQueryParams, PaginatedResult } from '../types/employee.types.js';
export declare class EmployeeModel {
    /**
     * Insert a new employee into PostgreSQL database
     */
    static create(data: CreateEmployeeDTO): Promise<Employee>;
    /**
     * Find an active (non-soft-deleted) employee by ID
     */
    static findById(id: number): Promise<Employee | null>;
    /**
     * Find an employee by email (including soft deleted check if needed)
     */
    static findByEmail(email: string): Promise<Employee | null>;
    /**
     * Retrieve all employees with search, filter, pagination, and sorting
     */
    static findAll(params: EmployeeQueryParams): Promise<PaginatedResult<Employee>>;
    /**
     * Dynamic Update Employee by ID
     */
    static update(id: number, data: UpdateEmployeeDTO): Promise<Employee | null>;
    /**
     * Soft Delete Employee by setting deleted_at timestamp and is_active = false
     */
    static softDelete(id: number): Promise<boolean>;
}
