export enum SalaryType {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  doj: Date;
  salary: number;
  skills: string[];
  isActive: boolean;
  salaryType: SalaryType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateEmployeeDTO {
  name: string;
  email: string;
  doj: string | Date;
  salary: number;
  skills: string[];
  isActive?: boolean;
  salaryType: SalaryType;
}

export interface UpdateEmployeeDTO {
  name?: string;
  email?: string;
  doj?: string | Date;
  salary?: number;
  skills?: string[];
  isActive?: boolean;
  salaryType?: SalaryType;
}

export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'salary' | 'createdAt' | 'doj';
  sortOrder?: 'ASC' | 'DESC';
  isActive?: boolean;
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
