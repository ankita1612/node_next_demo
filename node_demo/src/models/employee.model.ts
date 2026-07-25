import { pool } from '../config/db.js';
import {
  Employee,
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
  EmployeeQueryParams,
  PaginatedResult,
} from '../types/employee.types.js';

// Helper function to map DB row (snake_case) to TypeScript Employee entity (camelCase)
const mapRowToEmployee = (row: any): Employee => ({
  id: row.id,
  name: row.name,
  email: row.email,
  doj: row.doj,
  salary: parseFloat(row.salary),
  skills: row.skills || [],
  isActive: row.is_active,
  salaryType: row.salary_type,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
});

export class EmployeeModel {
  /**
   * Insert a new employee into PostgreSQL database
   */
  static async create(data: CreateEmployeeDTO): Promise<Employee> {
    const query = `
      INSERT INTO employees (name, email, doj, salary, skills, is_active, salary_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      data.name,
      data.email,
      data.doj,
      data.salary,
      data.skills,
      data.isActive !== undefined ? data.isActive : true,
      data.salaryType,
    ];

    const result = await pool.query(query, values);
    return mapRowToEmployee(result.rows[0]);
  }

  /**
   * Find an active (non-soft-deleted) employee by ID
   */
  static async findById(id: number): Promise<Employee | null> {
    const query = `
      SELECT * FROM employees
      WHERE id = $1 AND deleted_at IS NULL;
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    return mapRowToEmployee(result.rows[0]);
  }

  /**
   * Find an employee by email (including soft deleted check if needed)
   */
  static async findByEmail(email: string): Promise<Employee | null> {
    const query = `
      SELECT * FROM employees
      WHERE email = $1 AND deleted_at IS NULL;
    `;
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) return null;
    return mapRowToEmployee(result.rows[0]);
  }

  /**
   * Retrieve all employees with search, filter, pagination, and sorting
   */
  static async findAll(params: EmployeeQueryParams): Promise<PaginatedResult<Employee>> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const whereClauses: string[] = ['deleted_at IS NULL'];
    const values: any[] = [];
    let paramIndex = 1;

    // Search filter by name or email
    if (params.search && params.search.trim() !== '') {
      whereClauses.push(`(name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`);
      values.push(`%${params.search.trim()}%`);
      paramIndex++;
    }

    // Active status filter
    if (params.isActive !== undefined) {
      whereClauses.push(`is_active = $${paramIndex}`);
      values.push(params.isActive);
      paramIndex++;
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Sorting mapping
    const sortFieldMap: Record<string, string> = {
      name: 'name',
      salary: 'salary',
      createdAt: 'created_at',
      doj: 'doj',
    };
    const sortByColumn = sortFieldMap[params.sortBy || 'createdAt'] || 'created_at';
    const sortOrder = params.sortOrder === 'ASC' ? 'ASC' : 'DESC';

    // Count Total Records Query
    const countQuery = `SELECT COUNT(*) FROM employees ${whereSql};`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count, 10);

    // Fetch Paginated Data Query
    const dataQuery = `
      SELECT * FROM employees
      ${whereSql}
      ORDER BY ${sortByColumn} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1};
    `;
    values.push(limit, offset);

    const dataResult = await pool.query(dataQuery, values);
    const employees = dataResult.rows.map(mapRowToEmployee);

    return {
      data: employees,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * Dynamic Update Employee by ID
   */
  static async update(id: number, data: UpdateEmployeeDTO): Promise<Employee | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(data.email);
    }
    if (data.doj !== undefined) {
      fields.push(`doj = $${paramIndex++}`);
      values.push(data.doj);
    }
    if (data.salary !== undefined) {
      fields.push(`salary = $${paramIndex++}`);
      values.push(data.salary);
    }
    if (data.skills !== undefined) {
      fields.push(`skills = $${paramIndex++}`);
      values.push(data.skills);
    }
    if (data.isActive !== undefined) {
      fields.push(`is_active = $${paramIndex++}`);
      values.push(data.isActive);
    }
    if (data.salaryType !== undefined) {
      fields.push(`salary_type = $${paramIndex++}`);
      values.push(data.salaryType);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE employees
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex} AND deleted_at IS NULL
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    if (result.rows.length === 0) return null;
    return mapRowToEmployee(result.rows[0]);
  }

  /**
   * Soft Delete Employee by setting deleted_at timestamp and is_active = false
   */
  static async softDelete(id: number): Promise<boolean> {
    const query = `
      UPDATE employees
      SET deleted_at = CURRENT_TIMESTAMP, is_active = FALSE
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING id;
    `;
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }
}
