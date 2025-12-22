import { ay as getAuthHeaders, az as BASE_URL, aA as axios, aB as handleApiError } from './index-BG4-akrH.js';

const getSemesters = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.academicYear) queryParams.append("academicYear", params.academicYear);
    if (params.status) queryParams.append("status", params.status);
    const url = `${BASE_URL}/api/admin/semesters${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting semesters");
    throw err;
  }
};
const getSemester = async (semesterId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/semesters/${semesterId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting semester details");
    throw err;
  }
};
const createSemester = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/semesters`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating semester");
    throw err;
  }
};
const updateSemester = async (semesterId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/semesters/${semesterId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating semester");
    throw err;
  }
};
const closeSemester = async (semesterId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/semesters/${semesterId}/close`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "closing semester");
    throw err;
  }
};
const extendSemester = async (semesterId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/semesters/${semesterId}/extend`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "extending semester");
    throw err;
  }
};
const activateSemester = async (semesterId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/semesters/${semesterId}/activate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "activating semester");
    throw err;
  }
};
const deleteSemester = async (semesterId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/semesters/${semesterId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deleting semester");
    throw err;
  }
};
const extendRegistrationDeadline = async (semesterId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/semesters/${semesterId}/extend-deadline`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "extending registration deadline");
    throw err;
  }
};

export { getSemester as a, closeSemester as b, createSemester as c, deleteSemester as d, extendSemester as e, activateSemester as f, getSemesters as g, updateSemester as u };
