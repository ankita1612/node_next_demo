import { Employee, EmployeeFormInputs, EmployeeQueryParams, ApiResponse, PaginatedResult } from '../../types/employee';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function handleResponse<T>(response: Response): Promise<T> {
  const result: ApiResponse<T> = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'An unexpected API error occurred');
  }
  return result.data;
}

export const fetchEmployees = async (params: EmployeeQueryParams = {}): Promise<PaginatedResult<Employee>> => {
  const urlParams = new URLSearchParams();
  if (params.page) urlParams.append('page', params.page.toString());
  if (params.limit) urlParams.append('limit', params.limit.toString());
  if (params.search) urlParams.append('search', params.search);
  if (params.sortBy) urlParams.append('sortBy', params.sortBy);
  if (params.sortOrder) urlParams.append('sortOrder', params.sortOrder);
  if (params.isActive !== undefined) urlParams.append('isActive', params.isActive.toString());

  const response = await fetch(`${API_BASE_URL}/employees?${urlParams.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  return handleResponse<PaginatedResult<Employee>>(response);
};

export const fetchEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  return handleResponse<Employee>(response);
};

export const createEmployeeApi = async (formData: EmployeeFormInputs): Promise<Employee> => {
  const skillsArray = formData.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    name: formData.name,
    email: formData.email,
    doj: formData.doj,
    salary: Number(formData.salary),
    skills: skillsArray,
    salaryType: formData.salaryType,
    isActive: formData.isActive,
  };

  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<Employee>(response);
};

export const updateEmployeeApi = async (id: number, formData: EmployeeFormInputs): Promise<Employee> => {
  const skillsArray = formData.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    name: formData.name,
    email: formData.email,
    doj: formData.doj,
    salary: Number(formData.salary),
    skills: skillsArray,
    salaryType: formData.salaryType,
    isActive: formData.isActive,
  };

  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<Employee>(response);
};

export const deleteEmployeeApi = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse<void>(response);
};
