import { ay as getAuthHeaders, az as BASE_URL, aA as axios, aB as handleApiError } from './index-BG4-akrH.js';

const getCourses = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.programId) queryParams.append("program_id", params.programId.toString());
    if (params.facultyId) queryParams.append("faculty_id", params.facultyId.toString());
    if (params.staffId) queryParams.append("staff_id", params.staffId.toString());
    if (params.level) queryParams.append("course_level", params.level.toString());
    if (params.semester) queryParams.append("semester", params.semester);
    if (params.academic_year) queryParams.append("academic_year", params.academic_year);
    const url = `${BASE_URL}/api/admin/courses${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting courses");
    throw err;
  }
};
const getCourse = async (courseId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/courses/single/${courseId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting course details");
    throw err;
  }
};
const getCoursesByProgram = async (programId, params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    const url = `${BASE_URL}/api/admin/courses/program/${programId}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting courses by program");
    throw err;
  }
};
const createCourse = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/courses`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating course");
    throw err;
  }
};
const updateCourse = async (courseId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/courses/${courseId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating course");
    throw err;
  }
};
const updateCoursePrice = async (courseId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/courses/${courseId}/price`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating course price");
    throw err;
  }
};
const deleteCourse = async (courseId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/courses/${courseId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deleting course");
    throw err;
  }
};
class CoursesApi {
  async GetCourses(session, semester) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/courses?session=${session}&semester=${semester}`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during getting courses:", err);
      throw err;
    }
  }
  async GetStaffCourses(session) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/staff/courses?session=${session}`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during getting staff courses:", err);
      throw err;
    }
  }
  async GetStaffCoursesByYear(year1, year2) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/courses/staff/${year1}/${year2}`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during getting staff courses by year:", err);
      throw err;
    }
  }
  async GetStaffCoursesbyId(id) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/courses/single/${id}`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during getting staff course by id:", err);
      throw err;
    }
  }
  async GetCourseModules(courseId) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/courses/${courseId}/modules`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during getting course modules:", err);
      throw err;
    }
  }
  async AddModule(courseId, title, description) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${BASE_URL}/api/courses/${courseId}/modules`, {
        course_id: parseInt(courseId, 10),
        title,
        description
      }, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during adding module:", err);
      throw err;
    }
  }
  async DeleteModule(moduleId) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.delete(`${BASE_URL}/api/modules/${moduleId}`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during deleting module:", err);
      throw err;
    }
  }
  async AddUnit(moduleId, data) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(`${BASE_URL}/api/modules/${moduleId}/units`, {
        ...data,
        module_id: parseInt(moduleId, 10)
      }, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during adding unit:", err);
      throw err;
    }
  }
  async getUnits(moduleId) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/modules/${moduleId}/units`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during getting units:", err);
      throw err;
    }
  }
  async EditUnit(unitId, data) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.patch(`${BASE_URL}/api/units/${unitId}`, data, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during editing unit:", err);
      throw err;
    }
  }
  async DeleteUnit(unitId) {
    try {
      const headers = getAuthHeaders();
      const response = await axios.delete(`${BASE_URL}/api/units/${unitId}`, {
        headers
      });
      return response;
    } catch (err) {
      console.error("Error during deleting unit:", err);
      throw err;
    }
  }
  async UploadUnitVideo(moduleId, unitId, videoFile, onProgress) {
    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      const headers = getAuthHeaders();
      const response = await axios.post(`${BASE_URL}/api/modules/${moduleId}/units/${unitId}/video`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            onProgress(progress);
          }
        }
      });
      return response;
    } catch (err) {
      console.error("Error during uploading unit video:", err);
      throw err;
    }
  }
}
const GetStaffCourses = (session) => {
  const api = new CoursesApi();
  return api.GetStaffCourses(session);
};
const GetStaffCoursesByYear = (year1, year2) => {
  const api = new CoursesApi();
  return api.GetStaffCoursesByYear(year1, year2);
};
const GetStaffCoursesbyId = (id) => {
  const api = new CoursesApi();
  return api.GetStaffCoursesbyId(id);
};
const GetCourseModules = (courseId) => {
  const api = new CoursesApi();
  return api.GetCourseModules(courseId);
};
const AddModule = (courseId, title, description) => {
  const api = new CoursesApi();
  return api.AddModule(courseId, title, description);
};
const DeleteModule = (moduleId) => {
  const api = new CoursesApi();
  return api.DeleteModule(moduleId);
};
const AddUnit = (moduleId, data) => {
  const api = new CoursesApi();
  return api.AddUnit(moduleId, data);
};
const getUnits = (moduleId) => {
  const api = new CoursesApi();
  return api.getUnits(moduleId);
};
const EditUnit = (unitId, data) => {
  const api = new CoursesApi();
  return api.EditUnit(unitId, data);
};
const DeleteUnit = (unitId) => {
  const api = new CoursesApi();
  return api.DeleteUnit(unitId);
};
const UploadUnitVideo = (moduleId, unitId, videoFile, onProgress) => {
  const api = new CoursesApi();
  return api.UploadUnitVideo(moduleId, unitId, videoFile, onProgress);
};
const setCoursePrice = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/courses/pricing`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "setting course price");
    throw err;
  }
};
const bulkSetCoursePrices = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/courses/pricing/bulk`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "bulk setting course prices");
    throw err;
  }
};
const getCoursePrices = async (params) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    queryParams.append("academic_year", params.academic_year);
    queryParams.append("semester", params.semester);
    if (params.course_id) queryParams.append("course_id", params.course_id.toString());
    if (params.program_id) queryParams.append("program_id", params.program_id.toString());
    const response = await axios.get(
      `${BASE_URL}/api/admin/courses/pricing?${queryParams.toString()}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting course prices");
    throw err;
  }
};
const copyCoursePrices = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/courses/pricing/copy`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "copying course prices");
    throw err;
  }
};
const allocateCourses = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/courses/allocate`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "allocating courses");
    throw err;
  }
};
const getAllocations = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.academic_year) queryParams.append("academic_year", params.academic_year);
    if (params.semester) queryParams.append("semester", params.semester);
    if (params.student_id) queryParams.append("student_id", params.student_id.toString());
    if (params.program_id) queryParams.append("program_id", params.program_id.toString());
    if (params.level) queryParams.append("level", params.level);
    if (params.registration_status) queryParams.append("registration_status", params.registration_status);
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    const response = await axios.get(
      `${BASE_URL}/api/admin/courses/allocations?${queryParams.toString()}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting allocations");
    throw err;
  }
};
const removeAllocation = async (allocationId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/courses/allocate/${allocationId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "removing allocation");
    throw err;
  }
};
const bulkRemoveAllocations = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/courses/allocate/bulk`,
      {
        headers,
        data
      }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "bulk removing allocations");
    throw err;
  }
};
const allocateAllStudents = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/courses/allocate-all-students`,
      data || {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "allocating courses to all students");
    throw err;
  }
};
const getMyAllocatedCourses = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/courses/allocated`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting allocated courses");
    throw err;
  }
};
const registerAllocatedCourses = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/courses/register-allocated`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "registering allocated courses");
    throw err;
  }
};

export { AddUnit as A, CoursesApi as C, DeleteModule as D, EditUnit as E, GetStaffCoursesbyId as G, UploadUnitVideo as U, GetCourseModules as a, DeleteUnit as b, getCourses as c, deleteCourse as d, createCourse as e, getCourse as f, getAllocations as g, getCoursePrices as h, bulkSetCoursePrices as i, copyCoursePrices as j, allocateCourses as k, updateCoursePrice as l, removeAllocation as r, updateCourse as u };
