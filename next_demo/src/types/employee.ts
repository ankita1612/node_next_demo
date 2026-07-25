export type SalaryType = 'MONTH' | 'YEAR';

export interface Employee {
  id: number;
  name: string;
  email: string;
  doj: string;
  salary: number;
  skills: string[];
  isActive: boolean;
  salaryType: SalaryType;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface EmployeeFormInputs {
  name: string;
  email: string;
  doj: string;
  salary: number;
  skills: string; // comma-separated input for form field
  salaryType: SalaryType;
  isActive: boolean;
}

export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'salary' | 'createdAt' | 'doj';
  sortOrder?: 'ASC' | 'DESC';
  isActive?: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
