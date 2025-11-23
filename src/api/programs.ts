import axios from 'axios';
import { BASE_URL, getAuthHeaders, handleApiError } from './base';

// ==================== INTERFACES ====================

export interface Faculty {
    id: number;
    name: string;
}

export interface Course {
    id: number;
    title: string;
    course_code: string;
}

export interface Program {
    id: number;
    faculty_id: number;
    title: string;
    description: string;
    date: string;
    token: string;
    status: 'Y' | 'N';
    faculty: Faculty;
    courses?: Course[];
}

export interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface GetProgramsParams {
    page?: number;
    limit?: number;
    search?: string;
    facultyId?: number;
    status?: 'Y' | 'N';
}

export interface GetProgramsResponse {
    success: boolean;
    message: string;
    data: {
        programs: Program[];
        pagination: PaginationData;
    };
}

// ==================== API FUNCTIONS ====================

export const getPrograms = async (params: GetProgramsParams = {}): Promise<GetProgramsResponse> => {
    try {
        const headers = getAuthHeaders();
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.facultyId) queryParams.append('facultyId', params.facultyId.toString());
        if (params.status) queryParams.append('status', params.status);

        const url = `${BASE_URL}/api/admin/programs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axios.get<GetProgramsResponse>(url, { headers });
        return response.data;
    } catch (err) {
        handleApiError(err, 'getting programs');
        throw err;
    }
};

// ==================== PLACEHOLDER FUNCTIONS FOR FUTURE IMPLEMENTATION ====================

// Get Single Program
export interface GetProgramResponse {
    success: boolean;
    message: string;
    data: {
        program: Program;
    };
}

export const getProgram = async (programId: number): Promise<GetProgramResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.get<GetProgramResponse>(
            `${BASE_URL}/api/admin/programs/${programId}`,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'getting program details');
        throw err;
    }
};

// Create Program (placeholder - to be implemented when endpoint is available)
export interface CreateProgramData {
    title: string;
    description: string;
    faculty_id: number;
    status?: 'Y' | 'N';
}

export interface CreateProgramResponse {
    success: boolean;
    message: string;
    data: {
        program: Program;
    };
}

export const createProgram = async (data: CreateProgramData): Promise<CreateProgramResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.post<CreateProgramResponse>(
            `${BASE_URL}/api/admin/programs`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'creating program');
        throw err;
    }
};

// Update Program (placeholder - to be implemented when endpoint is available)
export interface UpdateProgramData {
    title?: string;
    description?: string;
    faculty_id?: number;
}

export interface UpdateProgramResponse {
    success: boolean;
    message: string;
    data: {
        program: Program;
    };
}

export const updateProgram = async (
    programId: number,
    data: UpdateProgramData
): Promise<UpdateProgramResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.put<UpdateProgramResponse>(
            `${BASE_URL}/api/admin/programs/${programId}`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'updating program');
        throw err;
    }
};

// Delete Program (placeholder - to be implemented when endpoint is available)
export interface DeleteProgramResponse {
    success: boolean;
    message: string;
}

export const deleteProgram = async (programId: number): Promise<DeleteProgramResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.delete<DeleteProgramResponse>(
            `${BASE_URL}/api/admin/programs/${programId}`,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'deleting program');
        throw err;
    }
};

// Activate Program (placeholder - to be implemented when endpoint is available)
export interface ActivateProgramResponse {
    success: boolean;
    message: string;
}

export const activateProgram = async (programId: number): Promise<ActivateProgramResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.patch<ActivateProgramResponse>(
            `${BASE_URL}/api/admin/programs/${programId}/activate`,
            {},
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'activating program');
        throw err;
    }
};

// Deactivate Program (placeholder - to be implemented when endpoint is available)
export interface DeactivateProgramResponse {
    success: boolean;
    message: string;
}

export const deactivateProgram = async (programId: number): Promise<DeactivateProgramResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.patch<DeactivateProgramResponse>(
            `${BASE_URL}/api/admin/programs/${programId}/deactivate`,
            {},
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'deactivating program');
        throw err;
    }
};
