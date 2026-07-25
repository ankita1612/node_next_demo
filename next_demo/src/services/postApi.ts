import { Post, PostFormInputs, PostQueryParams } from '../types/post';
import { ApiResponse, PaginatedResult } from '../types/employee';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function handleResponse<T>(response: Response): Promise<T> {
  const result: ApiResponse<T> = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'An unexpected API error occurred');
  }
  return result.data;
}

export const fetchPosts = async (params: PostQueryParams = {}): Promise<PaginatedResult<Post>> => {
  const urlParams = new URLSearchParams();
  if (params.page) urlParams.append('page', params.page.toString());
  if (params.limit) urlParams.append('limit', params.limit.toString());
  if (params.search) urlParams.append('search', params.search);
  if (params.sortBy) urlParams.append('sortBy', params.sortBy);
  if (params.sortOrder) urlParams.append('sortOrder', params.sortOrder);

  const response = await fetch(`${API_BASE_URL}/posts?${urlParams.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  return handleResponse<PaginatedResult<Post>>(response);
};

export const createPostApi = async (formData: PostFormInputs): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse<Post>(response);
};

export const updatePostApi = async (id: number, formData: PostFormInputs): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return handleResponse<Post>(response);
};

export const deletePostApi = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse<void>(response);
};
