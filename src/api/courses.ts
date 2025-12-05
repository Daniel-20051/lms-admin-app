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
    owner_type: 'wpu' |'marketplace';
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
    academic_year?: string;
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
        if (params.programId) queryParams.append('program_id', params.programId.toString());
        if (params.facultyId) queryParams.append('faculty_id', params.facultyId.toString());
        if (params.staffId) queryParams.append('staff_id', params.staffId.toString());
        if (params.level) queryParams.append('course_level', params.level.toString());
        if (params.semester) queryParams.append('semester', params.semester);
        if (params.academic_year) queryParams.append('academic_year', params.academic_year);

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
    owner_type: 'wpu' | 'sole_tutor' | 'organization';
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
    owner_type?: 'wpu' | 'sole_tutor' | 'organization';
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
      const response = await axios.post(`${BASE_URL}/api/modules/${moduleId}/units/${unitId}/video`, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: { loaded: number; total?: number }) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        }
      } as any);
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

// ==================== COURSE PRICING MANAGEMENT ====================

export interface CoursePricing {
  id: number;
  course_id: number;
  course_title?: string;
  course_code?: string;
  academic_year: string;
  semester: string;
  price: number;
  currency: string;
  created_at?: string;
}

export interface SetCoursePriceData {
  course_id: number;
  academic_year: string;
  semester: string;
  price: number;
  currency?: string;
}

export interface SetCoursePriceResponse {
  success: boolean;
  message: string;
  data: {
    pricing: CoursePricing;
  };
}

export const setCoursePrice = async (data: SetCoursePriceData): Promise<SetCoursePriceResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<SetCoursePriceResponse>(
      `${BASE_URL}/api/admin/courses/pricing`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'setting course price');
    throw err;
  }
};

export interface BulkSetCoursePricesData {
  academic_year: string;
  semester: string;
  prices: Array<{
    course_id: number;
    price: number;
    currency?: string;
  }>;
}

export interface BulkSetCoursePricesResponse {
  success: boolean;
  message: string;
  data: {
    created: number;
    updated: number;
    total: number;
    prices: CoursePricing[];
  };
}

export const bulkSetCoursePrices = async (data: BulkSetCoursePricesData): Promise<BulkSetCoursePricesResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<BulkSetCoursePricesResponse>(
      `${BASE_URL}/api/admin/courses/pricing/bulk`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'bulk setting course prices');
    throw err;
  }
};

export interface GetCoursePricesParams {
  academic_year: string;
  semester: string;
  course_id?: number;
  program_id?: number;
}

export interface GetCoursePricesResponse {
  success: boolean;
  message: string;
  data: {
    prices: CoursePricing[];
    total: number;
  };
}

export const getCoursePrices = async (params: GetCoursePricesParams): Promise<GetCoursePricesResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    queryParams.append('academic_year', params.academic_year);
    queryParams.append('semester', params.semester);
    if (params.course_id) queryParams.append('course_id', params.course_id.toString());
    if (params.program_id) queryParams.append('program_id', params.program_id.toString());

    const response = await axios.get<GetCoursePricesResponse>(
      `${BASE_URL}/api/admin/courses/pricing?${queryParams.toString()}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting course prices');
    throw err;
  }
};

export interface CopyCoursePricesData {
  from_academic_year: string;
  from_semester: string;
  to_academic_year: string;
  to_semester: string;
  program_id?: number;
}

export interface CopyCoursePricesResponse {
  success: boolean;
  message: string;
  data: {
    copied: number;
    from: {
      academic_year: string;
      semester: string;
    };
    to: {
      academic_year: string;
      semester: string;
    };
  };
}

export const copyCoursePrices = async (data: CopyCoursePricesData): Promise<CopyCoursePricesResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<CopyCoursePricesResponse>(
      `${BASE_URL}/api/admin/courses/pricing/copy`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'copying course prices');
    throw err;
  }
};

// ==================== COURSE ALLOCATION MANAGEMENT ====================

export interface AllocateCourseData {
  allocation_type: 'program' | 'level' | 'individual' | 'faculty';
  course_ids: number[];
  academic_year: string;
  semester: string;
  program_id?: number;
  level?: string;
  faculty_id?: number;
  student_ids?: number[];
  exclude_student_ids?: number[];
}

export interface AllocateCourseResponse {
  success: boolean;
  message: string;
  data: {
    summary: {
      students_count: number;
      courses_count: number;
      total_possible: number;
      allocated: number;
      skipped: number;
      errors: number;
    };
    errors: any[];
  };
}

export const allocateCourses = async (data: AllocateCourseData): Promise<AllocateCourseResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<AllocateCourseResponse>(
      `${BASE_URL}/api/admin/courses/allocate`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'allocating courses');
    throw err;
  }
};

export interface CourseAllocation {
  id: number;
  student: {
    id: number;
    name: string;
    email: string;
    matric_number: string;
    level: string;
  };
  course: {
    id: number;
    title: string;
    course_code: string;
    course_unit: number;
  };
  academic_year: string;
  semester: string;
  registration_status: 'allocated' | 'registered' | 'cancelled';
  allocated_price: number;
  allocated_at: string;
  registered_at: string | null;
}

export interface GetAllocationsParams {
  academic_year?: string;
  semester?: string;
  student_id?: number;
  program_id?: number;
  level?: string;
  registration_status?: 'allocated' | 'registered' | 'cancelled';
  page?: number;
  limit?: number;
}

export interface GetAllocationsResponse {
  success: boolean;
  message: string;
  data: {
    allocations: CourseAllocation[];
    pagination: PaginationData;
  };
}

export const getAllocations = async (params: GetAllocationsParams = {}): Promise<GetAllocationsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    
    if (params.academic_year) queryParams.append('academic_year', params.academic_year);
    if (params.semester) queryParams.append('semester', params.semester);
    if (params.student_id) queryParams.append('student_id', params.student_id.toString());
    if (params.program_id) queryParams.append('program_id', params.program_id.toString());
    if (params.level) queryParams.append('level', params.level);
    if (params.registration_status) queryParams.append('registration_status', params.registration_status);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const response = await axios.get<GetAllocationsResponse>(
      `${BASE_URL}/api/admin/courses/allocations?${queryParams.toString()}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting allocations');
    throw err;
  }
};

export interface RemoveAllocationResponse {
  success: boolean;
  message: string;
}

export const removeAllocation = async (allocationId: number): Promise<RemoveAllocationResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete<RemoveAllocationResponse>(
      `${BASE_URL}/api/admin/courses/allocate/${allocationId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'removing allocation');
    throw err;
  }
};

export interface BulkRemoveAllocationsData {
  academic_year: string;
  semester: string;
  student_ids?: number[];
  course_ids?: number[];
}

export interface BulkRemoveAllocationsResponse {
  success: boolean;
  message: string;
  data: {
    deleted_count: number;
  };
}

export const bulkRemoveAllocations = async (data: BulkRemoveAllocationsData): Promise<BulkRemoveAllocationsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete<BulkRemoveAllocationsResponse>(
      `${BASE_URL}/api/admin/courses/allocate/bulk`,
      { 
        headers,
        data: data
      } as any
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'bulk removing allocations');
    throw err;
  }
};

// ==================== STUDENT COURSE ALLOCATION ====================

export interface AllocatedCourse {
  allocation_id: number;
  course: {
    id: number;
    title: string;
    course_code: string;
    course_unit: number;
  };
  price: number;
  allocated_at: string;
}

export interface GetMyAllocatedCoursesResponse {
  success: boolean;
  message: string;
  data: {
    semester: {
      id: number;
      academic_year: string;
      semester: string;
      status: string;
      registration_deadline: string;
      deadline_passed: boolean;
    };
    allocated_courses: AllocatedCourse[];
    total_amount: number;
    course_count: number;
    can_register: boolean;
  };
}

export const getMyAllocatedCourses = async (): Promise<GetMyAllocatedCoursesResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetMyAllocatedCoursesResponse>(
      `${BASE_URL}/api/courses/allocated`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting allocated courses');
    throw err;
  }
};

export interface RegisterAllocatedCoursesResponse {
  success: boolean;
  message: string;
  data: {
    order: {
      id: number;
      amount: number;
      currency: string;
      date: string;
    };
    courses: Array<{
      allocation_id: number;
      course_id: number;
      course_code: string;
      course_title: string;
      price: number;
      allocated_price: number;
    }>;
    payment: {
      transaction_id: number;
      amount_debited: number;
      previous_balance: number;
      new_balance: number;
    };
    registered_count: number;
  };
}

export const registerAllocatedCourses = async (): Promise<RegisterAllocatedCoursesResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<RegisterAllocatedCoursesResponse>(
      `${BASE_URL}/api/courses/register-allocated`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'registering allocated courses');
    throw err;
  }
};
