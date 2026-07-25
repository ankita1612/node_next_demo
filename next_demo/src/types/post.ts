export interface Post {
  id: number;
  name: string;
  comment: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface PostFormInputs {
  name: string;
  comment: string;
  date: string;
}

export interface PostQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'date' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
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
