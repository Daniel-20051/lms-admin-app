import axios from 'axios';
import { BASE_URL, getAuthHeaders, handleApiError } from './base';

// ==================== INTERFACES ====================

export interface Semester {
    id: number;
    academic_year: string;
    semester: string;
    status: 'Active' | 'Closed' | 'Pending';
    date: string;
    start_date: string;
    end_date: string;
}

export interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface GetSemestersParams {
    page?: number;
    limit?: number;
    academicYear?: string;
    status?: 'active' | 'closed' | 'pending';
}

export interface GetSemestersResponse {
    success: boolean;
    message: string;
    data: {
        semesters: Semester[];
        pagination: PaginationData;
    };
}

// ==================== API FUNCTIONS ====================

export const getSemesters = async (params: GetSemestersParams = {}): Promise<GetSemestersResponse> => {
    try {
        const headers = getAuthHeaders();
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.academicYear) queryParams.append('academicYear', params.academicYear);
        if (params.status) queryParams.append('status', params.status);

        const url = `${BASE_URL}/api/admin/semesters${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axios.get<GetSemestersResponse>(url, { headers });
        return response.data;
    } catch (err) {
        handleApiError(err, 'getting semesters');
        throw err;
    }
};

// Get Single Semester
export interface GetSemesterResponse {
    success: boolean;
    message: string;
    data: {
        semester: Semester;
    };
}

export const getSemester = async (semesterId: number): Promise<GetSemesterResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.get<GetSemesterResponse>(
            `${BASE_URL}/api/admin/semesters/${semesterId}`,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'getting semester details');
        throw err;
    }
};

// Create Semester
export interface CreateSemesterData {
    academic_year: string;
    semester: string;
    start_date: string;
    end_date: string;
    status: 'pending' | 'active' | 'closed';
}

export interface CreateSemesterResponse {
    success: boolean;
    message: string;
    data: {
        semester: Semester;
    };
}

export const createSemester = async (data: CreateSemesterData): Promise<CreateSemesterResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.post<CreateSemesterResponse>(
            `${BASE_URL}/api/admin/semesters`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'creating semester');
        throw err;
    }
};

// Update Semester
export interface UpdateSemesterData {
    academic_year?: string;
    semester?: string;
    start_date?: string;
    end_date?: string;
    status?: 'pending' | 'active' | 'closed';
}

export interface UpdateSemesterResponse {
    success: boolean;
    message: string;
    data: {
        semester: Semester;
    };
}

export const updateSemester = async (
    semesterId: number,
    data: UpdateSemesterData
): Promise<UpdateSemesterResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.put<UpdateSemesterResponse>(
            `${BASE_URL}/api/admin/semesters/${semesterId}`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'updating semester');
        throw err;
    }
};

// Close Semester
export interface CloseSemesterData {
    reason: string;
}

export interface CloseSemesterResponse {
    success: boolean;
    message: string;
    data: {
        semester: Semester;
    };
}

export const closeSemester = async (
    semesterId: number,
    data: CloseSemesterData
): Promise<CloseSemesterResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.patch<CloseSemesterResponse>(
            `${BASE_URL}/api/admin/semesters/${semesterId}/close`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'closing semester');
        throw err;
    }
};

// Extend Semester
export interface ExtendSemesterData {
    new_end_date: string;
    reason: string;
}

export interface ExtendSemesterResponse {
    success: boolean;
    message: string;
    data: {
        semester: Semester;
    };
}

export const extendSemester = async (
    semesterId: number,
    data: ExtendSemesterData
): Promise<ExtendSemesterResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.patch<ExtendSemesterResponse>(
            `${BASE_URL}/api/admin/semesters/${semesterId}/extend`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'extending semester');
        throw err;
    }
};

// Activate Semester
export interface ActivateSemesterResponse {
    success: boolean;
    message: string;
    data: {
        semester: Semester;
    };
}

export const activateSemester = async (
    semesterId: number
): Promise<ActivateSemesterResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.patch<ActivateSemesterResponse>(
            `${BASE_URL}/api/admin/semesters/${semesterId}/activate`,
            {},
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'activating semester');
        throw err;
    }
};

// Delete Semester
export interface DeleteSemesterResponse {
    success: boolean;
    message: string;
}

export const deleteSemester = async (semesterId: number): Promise<DeleteSemesterResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.delete<DeleteSemesterResponse>(
            `${BASE_URL}/api/admin/semesters/${semesterId}`,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'deleting semester');
        throw err;
    }
};

