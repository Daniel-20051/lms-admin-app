import axios from 'axios';
import { getAccessToken, removeAccessToken } from '../lib/cookies';

// Global interceptor: if any request returns 401, remove token and notify app
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        removeAccessToken();
        // Notify AuthContext (and other listeners) to logout immediately
        window.dispatchEvent(new Event('auth:token-removed'));
      } catch {}
    }
    return Promise.reject(error);
  }
);

export const BASE_URL = 'https://lms-work.onrender.com';

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("No access token found. Please login again.");
  }
  return {
    'Authorization': `Bearer ${token}`
  };
};

// Helper function to handle API errors
export const handleApiError = (err: any, context: string) => {
  // Enhanced error logging with full context
  console.error(`Error during ${context}:`, {
    status: err.response?.status,
    statusText: err.response?.statusText,
    data: err.response?.data,
    message: err.message,
    config: {
      url: err.config?.url,
      method: err.config?.method,
      headers: err.config?.headers
    },
    fullError: err
  });
  
  if (err.response?.status === 401) {
    removeAccessToken();
  }
  
  // Preserve the original error structure for better error handling upstream
  return err;
};

// ==================== FACULTIES API ====================

export interface Faculty {
  id: number;
  name: string;
  description?: string;
  status?: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetFacultiesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetFacultiesResponse {
  success: boolean;
  message: string;
  data: {
    faculties: Faculty[];
    pagination: PaginationData;
  };
}

export const getFaculties = async (params: GetFacultiesParams = {}): Promise<GetFacultiesResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);

    const url = `${BASE_URL}/api/admin/faculties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetFacultiesResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting faculties');
    throw err;
  }
};