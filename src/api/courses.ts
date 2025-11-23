import axios from 'axios';
import { BASE_URL, getAuthHeaders, handleApiError } from './base';

// ==================== INTERFACES ====================

export interface Program {
    id: number;
    title: string;
}

export interface Faculty {
    id: number;
    name: string;
}

export interface Instructor {
    id: number;
    full_name: string;
    email: string;
}

export interface Course {
    id: number;
    faculty_id: number;
    program_id: number;
    title: string;
    course_unit: number;
    price: string;
    course_type: string;
    course_level: number;
    semester: string;
    user_id: number;
    course_code: string;
    token: string;
    exam_fee: number;
    currency: string;
    staff_id: number;
    owner_type: 'wsp' | 'marketplace';
    owner_id: number | null;
    is_marketplace: boolean;
    marketplace_status: string | null;
    date: string;
    program: Program;
    faculty: Faculty;
    instructor: Instructor | null;
}

export interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface GetCoursesParams {
    page?: number;
    limit?: number;
    search?: string;
    programId?: number;
    facultyId?: number;
    staffId?: number;
    level?: number;
    semester?: string;
}

export interface GetCoursesResponse {
    success: boolean;
    message: string;
    data: {
        courses: Course[];
        pagination: PaginationData;
    };
}

// ==================== API FUNCTIONS ====================

export const getCourses = async (params: GetCoursesParams = {}): Promise<GetCoursesResponse> => {
    try {
        const headers = getAuthHeaders();
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.programId) queryParams.append('programId', params.programId.toString());
        if (params.facultyId) queryParams.append('facultyId', params.facultyId.toString());
        if (params.staffId) queryParams.append('staffId', params.staffId.toString());
        if (params.level) queryParams.append('level', params.level.toString());
        if (params.semester) queryParams.append('semester', params.semester);

        const url = `${BASE_URL}/api/admin/courses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axios.get<GetCoursesResponse>(url, { headers });
        return response.data;
    } catch (err) {
        handleApiError(err, 'getting courses');
        throw err;
    }
};

// Get Single Course
export interface GetCourseResponse {
    success: boolean;
    message: string;
    data: {
        course: Course;
    };
}

export const getCourse = async (courseId: number): Promise<GetCourseResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.get<GetCourseResponse>(
            `${BASE_URL}/api/admin/courses/${courseId}`,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'getting course details');
        throw err;
    }
};

// Get Courses by Program
export interface GetCoursesByProgramParams {
    page?: number;
    limit?: number;
    search?: string;
}

export const getCoursesByProgram = async (
    programId: number,
    params: GetCoursesByProgramParams = {}
): Promise<GetCoursesResponse> => {
    try {
        const headers = getAuthHeaders();
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);

        const url = `${BASE_URL}/api/admin/courses/program/${programId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axios.get<GetCoursesResponse>(url, { headers });
        return response.data;
    } catch (err) {
        handleApiError(err, 'getting courses by program');
        throw err;
    }
};

// Create Course
export interface CreateCourseData {
    title: string;
    course_code: string;
    course_unit: number;
    price: string;
    course_type: string;
    course_level: number;
    semester: string;
    staff_id: number;
    program_id: number;
    faculty_id: number;
    currency: string;
    owner_type: 'wsp' | 'sole_tutor' | 'organization';
    is_marketplace: boolean;
    owner_id?: number | null;
}

export interface CreateCourseResponse {
    success: boolean;
    message: string;
    data: {
        course: Course;
    };
}

export const createCourse = async (data: CreateCourseData): Promise<CreateCourseResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.post<CreateCourseResponse>(
            `${BASE_URL}/api/admin/courses`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'creating course');
        throw err;
    }
};

// Update Course
export interface UpdateCourseData {
    title?: string;
    course_code?: string;
    course_unit?: number;
    price?: string;
    course_type?: string;
    course_level?: number;
    semester?: string;
    staff_id?: number;
    program_id?: number;
    faculty_id?: number;
    currency?: string;
    owner_type?: 'wsp' | 'sole_tutor' | 'organization';
    is_marketplace?: boolean;
    owner_id?: number | null;
}

export interface UpdateCourseResponse {
    success: boolean;
    message: string;
    data: {
        course: Course;
    };
}

export const updateCourse = async (
    courseId: number,
    data: UpdateCourseData
): Promise<UpdateCourseResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.put<UpdateCourseResponse>(
            `${BASE_URL}/api/admin/courses/${courseId}`,
            data,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'updating course');
        throw err;
    }
};

// Delete Course
export interface DeleteCourseResponse {
    success: boolean;
    message: string;
}

export const deleteCourse = async (courseId: number): Promise<DeleteCourseResponse> => {
    try {
        const headers = getAuthHeaders();
        const response = await axios.delete<DeleteCourseResponse>(
            `${BASE_URL}/api/admin/courses/${courseId}`,
            { headers }
        );
        return response.data;
    } catch (err) {
        handleApiError(err, 'deleting course');
        throw err;
    }
};
