import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
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

// ==================== COURSES API CLASS (for staff/admin course management) ====================

export class CoursesApi {
  async GetCourses(session: string, semester: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/courses?session=${session}&semester=${semester}`, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during getting courses:", err);
      throw err;
    }
  }

  async GetStaffCourses(session: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/staff/courses?session=${session}`, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during getting staff courses:", err);
      throw err;
    }
  }

  async GetStaffCoursesbyId(id: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/staff/courses/${id}`, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during getting staff course by id:", err);
      throw err;
    }
  }

  async GetCourseModules(courseId: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/courses/${courseId}/modules`, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during getting course modules:", err);
      throw err;
    }
  }

  async AddModule(courseId: string, title: string, description: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${BASE_URL}/api/courses/${courseId}/modules`, {
        title,
        description
      }, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during adding module:", err);
      throw err;
    }
  }

  async DeleteModule(moduleId: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.delete(`${BASE_URL}/api/modules/${moduleId}`, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during deleting module:", err);
      throw err;
    }
  }

  async AddUnit(moduleId: string, data: {title: string, content: string, content_type: string, order: number, status: string}) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${BASE_URL}/api/modules/${moduleId}/units`, data, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during adding unit:", err);
      throw err;
    }
  }

  async getUnits(moduleId: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/modules/${moduleId}/units`, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during getting units:", err);
      throw err;
    }
  }

  async EditUnit(unitId: string, data: {title: string, content: string, video_url?: string}) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(`${BASE_URL}/api/units/${unitId}`, data, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during editing unit:", err);
      throw err;
    }
  }

  async DeleteUnit(unitId: string) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.delete(`${BASE_URL}/api/units/${unitId}`, {
        headers
      });
      return response;
    } catch (err: any) {
      console.error("Error during deleting unit:", err);
      throw err;
    }
  }

  async UploadUnitVideo(moduleId: string, unitId: string, videoFile: File, onProgress?: (progress: number) => void) {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      const headers = getAuthHeaders();
      const config: AxiosRequestConfig = {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        }
      };
      const response = await axios.post(`${BASE_URL}/api/modules/${moduleId}/units/${unitId}/video`, formData, config);
      return response;
    } catch (err: any) {
      console.error("Error during uploading unit video:", err);
      throw err;
    }
  }
}

// Export functions for backward compatibility
export const GetStaffCourses = (session: string) => {
  const api = new CoursesApi();
  return api.GetStaffCourses(session);
};

export const GetStaffCoursesbyId = (id: string) => {
  const api = new CoursesApi();
  return api.GetStaffCoursesbyId(id);
};

export const GetCourseModules = (courseId: string) => {
  const api = new CoursesApi();
  return api.GetCourseModules(courseId);
};

export const AddModule = (courseId: string, title: string, description: string) => {
  const api = new CoursesApi();
  return api.AddModule(courseId, title, description);
};

export const DeleteModule = (moduleId: string) => {
  const api = new CoursesApi();
  return api.DeleteModule(moduleId);
};

export const AddUnit = (moduleId: string, data: {title: string, content: string, content_type: string, order: number, status: string}) => {
  const api = new CoursesApi();
  return api.AddUnit(moduleId, data);
};

export const getUnits = (moduleId: string) => {
  const api = new CoursesApi();
  return api.getUnits(moduleId);
};

export const EditUnit = (unitId: string, data: {title: string, content: string, video_url?: string}) => {
  const api = new CoursesApi();
  return api.EditUnit(unitId, data);
};

export const DeleteUnit = (unitId: string) => {
  const api = new CoursesApi();
  return api.DeleteUnit(unitId);
};

export const UploadUnitVideo = (moduleId: string, unitId: string, videoFile: File, onProgress?: (progress: number) => void) => {
  const api = new CoursesApi();
  return api.UploadUnitVideo(moduleId, unitId, videoFile, onProgress);
};
