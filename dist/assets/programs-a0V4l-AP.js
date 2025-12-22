import { ay as getAuthHeaders, az as BASE_URL, aA as axios, aB as handleApiError } from './index-BG4-akrH.js';

const getPrograms = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.facultyId) queryParams.append("facultyId", params.facultyId.toString());
    if (params.status) queryParams.append("status", params.status);
    const url = `${BASE_URL}/api/admin/programs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting programs");
    throw err;
  }
};
const getProgram = async (programId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/programs/${programId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting program details");
    throw err;
  }
};
const createProgram = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/programs`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating program");
    throw err;
  }
};
const updateProgram = async (programId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/programs/${programId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating program");
    throw err;
  }
};
const deleteProgram = async (programId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/programs/${programId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deleting program");
    throw err;
  }
};
const activateProgram = async (programId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/programs/${programId}/activate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "activating program");
    throw err;
  }
};
const deactivateProgram = async (programId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/programs/${programId}/deactivate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deactivating program");
    throw err;
  }
};

export { getProgram as a, createProgram as c, deleteProgram as d, getPrograms as g, updateProgram as u };
