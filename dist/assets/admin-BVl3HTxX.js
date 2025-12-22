import { ay as getAuthHeaders, aA as axios, az as BASE_URL, aB as handleApiError } from './index-BG4-akrH.js';

const getAdminProfile = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/profile`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting admin profile");
    throw err;
  }
};
const updateAdminProfile = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/profile`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating admin profile");
    throw err;
  }
};
const getStudents = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.level) queryParams.append("level", params.level.toString());
    if (params.status) queryParams.append("status", params.status);
    const url = `${BASE_URL}/api/admin/students${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting students");
    throw err;
  }
};
const getStudentStatistics = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/students/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting student statistics");
    throw err;
  }
};
const getProgramStatistics = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/programs/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting program statistics");
    throw err;
  }
};
const getCourseStatistics = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/courses/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting course statistics");
    throw err;
  }
};
const getStudent = async (studentId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/students/${studentId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting student details");
    throw err;
  }
};
const getStudentFullDetails = async (studentId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/students/${studentId}/full`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting student full details");
    throw err;
  }
};
const createStudent = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/students`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating student");
    throw err;
  }
};
const updateStudent = async (studentId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/students/${studentId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating student");
    throw err;
  }
};
const deactivateStudent = async (studentId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/students/${studentId}/deactivate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deactivating student");
    throw err;
  }
};
const activateStudent = async (studentId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/students/${studentId}/activate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "activating student");
    throw err;
  }
};
const resetStudentPassword = async (studentId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/students/${studentId}/reset-password`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "resetting student password");
    throw err;
  }
};
const createWalletTransaction = async (studentId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/students/${studentId}/wallet/transaction`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating wallet transaction");
    throw err;
  }
};
const getStaff = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/staff`,
      { headers, params }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting staff");
    throw err;
  }
};
const createStaff = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/staff`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating staff");
    throw err;
  }
};
const updateStaff = async (staffId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/staff/${staffId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating staff");
    throw err;
  }
};
const deactivateStaff = async (staffId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/staff/${staffId}/deactivate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deactivating staff");
    throw err;
  }
};
const resetStaffPassword = async (staffId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/staff/${staffId}/reset-password`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "resetting staff password");
    throw err;
  }
};
const getAdmins = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/admins`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting admins");
    throw err;
  }
};
const createAdmin = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/admins`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating admin");
    throw err;
  }
};
const updateAdmin = async (adminId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/admins/${adminId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating admin");
    throw err;
  }
};
const deactivateAdmin = async (adminId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/admins/${adminId}/deactivate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deactivating admin");
    throw err;
  }
};
const getActivityLogs = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.action) queryParams.append("action", params.action);
    if (params.admin_id) queryParams.append("admin_id", params.admin_id.toString());
    const url = `${BASE_URL}/api/admin/activity-logs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting activity logs");
    throw err;
  }
};
const getFaculties = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    const url = `${BASE_URL}/api/admin/faculties${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting faculties");
    throw err;
  }
};
const getFacultyStatistics = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/faculties/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting faculty statistics");
    throw err;
  }
};
const getFacultyById = async (facultyId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/faculties/${facultyId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting faculty by id");
    throw err;
  }
};
const updateFaculty = async (facultyId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/faculties/${facultyId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating faculty");
    throw err;
  }
};
const deleteFaculty = async (facultyId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/faculties/${facultyId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deleting faculty");
    throw err;
  }
};
const createFaculty = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/faculties`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating faculty");
    throw err;
  }
};
const getSystemSettings = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/settings`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting system settings");
    throw err;
  }
};
const updateSystemSettings = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/settings`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating system settings");
    throw err;
  }
};
const getNotices = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.course_id !== void 0) {
      if (params.course_id === null) {
        queryParams.append("course_id", "null");
      } else {
        queryParams.append("course_id", params.course_id.toString());
      }
    }
    if (params.search) queryParams.append("search", params.search);
    const url = `${BASE_URL}/api/admin/notices${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting notices");
    throw err;
  }
};
const getNoticeById = async (noticeId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/notices/${noticeId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting notice by id");
    throw err;
  }
};
const createNotice = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/notices`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating notice");
    throw err;
  }
};
const updateNotice = async (noticeId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/notices/${noticeId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating notice");
    throw err;
  }
};
const deleteNotice = async (noticeId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/notices/${noticeId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deleting notice");
    throw err;
  }
};
const getPaymentOverview = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/overview`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting payment overview");
    throw err;
  }
};
const getFundings = async (page = 1, limit = 20) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/fundings`,
      {
        headers,
        params: { page, limit }
      }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting fundings");
    throw err;
  }
};
const getSchoolFees = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = {};
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.student_id) queryParams.student_id = params.student_id;
    if (params.status) queryParams.status = params.status;
    if (params.semester) queryParams.semester = params.semester;
    if (params.academic_year) queryParams.academic_year = params.academic_year;
    if (params.start_date) queryParams.start_date = params.start_date;
    if (params.end_date) queryParams.end_date = params.end_date;
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/school-fees`,
      {
        headers,
        params: queryParams
      }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting school fees");
    throw err;
  }
};
const getCourseOrders = async (page = 1, limit = 20) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/course-orders`,
      {
        headers,
        params: { page, limit }
      }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting course orders");
    throw err;
  }
};
const getCourseOrderStats = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/course-orders/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting course order statistics");
    throw err;
  }
};
const getSchoolFeesStats = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/school-fees/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting school fees statistics");
    throw err;
  }
};
const getSchoolFeesPayments = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.student_id) queryParams.append("student_id", params.student_id.toString());
    if (params.status) queryParams.append("status", params.status);
    if (params.semester) queryParams.append("semester", params.semester);
    if (params.academic_year) queryParams.append("academic_year", params.academic_year);
    if (params.start_date) queryParams.append("start_date", params.start_date);
    if (params.end_date) queryParams.append("end_date", params.end_date);
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/school-fees?${queryParams.toString()}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting school fees payments");
    throw err;
  }
};
const getPaymentSetup = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payment-setup`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting payment setup");
    throw err;
  }
};
const createPaymentSetupItem = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/payment-setup`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating payment setup item");
    throw err;
  }
};
const updatePaymentSetupItem = async (id, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/payment-setup/${id}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating payment setup item");
    throw err;
  }
};
const deletePaymentSetupItem = async (id) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${BASE_URL}/api/admin/payment-setup/${id}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deleting payment setup item");
    throw err;
  }
};
const getPaymentSetupStats = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payment-setup/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting payment setup statistics");
    throw err;
  }
};
const getSchoolFeesConfiguration = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.academic_year) queryParams.append("academic_year", params.academic_year);
    if (params.level) queryParams.append("level", params.level);
    if (params.program_id) queryParams.append("program_id", params.program_id.toString());
    if (params.faculty_id) queryParams.append("faculty_id", params.faculty_id.toString());
    if (params.is_active !== void 0) queryParams.append("is_active", params.is_active.toString());
    const response = await axios.get(
      `${BASE_URL}/api/admin/school-fees/configuration?${queryParams.toString()}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting school fees configuration");
    throw err;
  }
};
const createSchoolFeesConfiguration = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${BASE_URL}/api/admin/school-fees/configuration`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "creating school fees configuration");
    throw err;
  }
};
const updateSchoolFeesConfiguration = async (id, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/school-fees/configuration/${id}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating school fees configuration");
    throw err;
  }
};
const toggleSchoolFeesConfiguration = async (id, is_active) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/school-fees/configuration/${id}/toggle`,
      { is_active },
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "toggling school fees configuration");
    throw err;
  }
};
const getFundingStats = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/payments/fundings/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting funding statistics");
    throw err;
  }
};
const getSoleTutors = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    const url = `${BASE_URL}/api/admin/tutors/sole-tutors${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting sole tutors");
    throw err;
  }
};
const getSoleTutorById = async (tutorId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting sole tutor by id");
    throw err;
  }
};
const approveSoleTutor = async (tutorId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}/approve`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "approving sole tutor");
    throw err;
  }
};
const rejectSoleTutor = async (tutorId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}/reject`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "rejecting sole tutor");
    throw err;
  }
};
const updateSoleTutorStatus = async (tutorId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}/status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating sole tutor status");
    throw err;
  }
};
const getOrganizations = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.status) queryParams.append("status", params.status);
    if (params.verification_status) queryParams.append("verification_status", params.verification_status);
    if (params.search) queryParams.append("search", params.search);
    const url = `${BASE_URL}/api/admin/tutors/organizations${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting organizations");
    throw err;
  }
};
const getOrganizationById = async (organizationId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting organization by id");
    throw err;
  }
};
const approveOrganization = async (organizationId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}/approve`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "approving organization");
    throw err;
  }
};
const rejectOrganization = async (organizationId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}/reject`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "rejecting organization");
    throw err;
  }
};
const updateOrganizationStatus = async (organizationId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}/status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating organization status");
    throw err;
  }
};
const getTutorStatistics = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/tutors/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting tutor statistics");
    throw err;
  }
};
const getMarketplaceTransactions = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.owner_type) queryParams.append("owner_type", params.owner_type);
    if (params.owner_id) queryParams.append("owner_id", params.owner_id.toString());
    if (params.payment_status) queryParams.append("payment_status", params.payment_status);
    if (params.start_date) queryParams.append("start_date", params.start_date);
    if (params.end_date) queryParams.append("end_date", params.end_date);
    const url = `${BASE_URL}/api/admin/revenue/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting marketplace transactions");
    throw err;
  }
};
const getWPURevenueStats = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.start_date) queryParams.append("start_date", params.start_date);
    if (params.end_date) queryParams.append("end_date", params.end_date);
    const url = `${BASE_URL}/api/admin/revenue/wpu-stats${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting WPU revenue statistics");
    throw err;
  }
};
const getTutorRevenueDetails = async (ownerType, ownerId, params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.start_date) queryParams.append("start_date", params.start_date);
    if (params.end_date) queryParams.append("end_date", params.end_date);
    const url = `${BASE_URL}/api/admin/revenue/tutor/${ownerType}/${ownerId}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting tutor revenue details");
    throw err;
  }
};
const getDashboardStats = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/dashboard/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting dashboard statistics");
    throw err;
  }
};
const getPendingKYCDocuments = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    const url = `${BASE_URL}/api/admin/students/kyc/pending${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting pending KYC documents");
    throw err;
  }
};
const getStudentKYC = async (studentId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${BASE_URL}/api/admin/students/${studentId}/kyc`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "getting student KYC documents");
    throw err;
  }
};
const approveKYCDocument = async (studentId, documentType) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/students/${studentId}/kyc/documents/${documentType}/approve`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "approving KYC document");
    throw err;
  }
};
const rejectKYCDocument = async (studentId, documentType, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${BASE_URL}/api/admin/students/${studentId}/kyc/documents/${documentType}/reject`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "rejecting KYC document");
    throw err;
  }
};
const getApprovedKYCStudents = async (params = {}) => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    const url = `${BASE_URL}/api/admin/students/kyc/approved${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, "getting approved KYC students");
    throw err;
  }
};

export { createStudent as $, getPaymentSetup as A, deletePaymentSetupItem as B, updateSchoolFeesConfiguration as C, createSchoolFeesConfiguration as D, getSchoolFeesConfiguration as E, toggleSchoolFeesConfiguration as F, getSchoolFeesStats as G, getTutorStatistics as H, getSoleTutors as I, getOrganizations as J, approveSoleTutor as K, rejectSoleTutor as L, updateSoleTutorStatus as M, approveOrganization as N, rejectOrganization as O, updateOrganizationStatus as P, getPendingKYCDocuments as Q, getApprovedKYCStudents as R, approveKYCDocument as S, rejectKYCDocument as T, getMarketplaceTransactions as U, getWPURevenueStats as V, getTutorRevenueDetails as W, createWalletTransaction as X, getStudentFullDetails as Y, getStudent as Z, updateStudent as _, getAdminProfile as a, updateStaff as a0, createStaff as a1, createAdmin as a2, updateAdmin as a3, getFacultyById as a4, updateFaculty as a5, createFaculty as a6, getNoticeById as a7, updateNotice as a8, createNotice as a9, getSoleTutorById as aa, getOrganizationById as ab, getStudentKYC as ac, getStudents as b, activateStudent as c, deactivateStudent as d, getStudentStatistics as e, getStaff as f, getDashboardStats as g, deactivateStaff as h, resetStaffPassword as i, getAdmins as j, deactivateAdmin as k, getActivityLogs as l, getFaculties as m, deleteFaculty as n, getSystemSettings as o, updateSystemSettings as p, getNotices as q, resetStudentPassword as r, deleteNotice as s, getPaymentOverview as t, updateAdminProfile as u, getFundings as v, getSchoolFees as w, getCourseOrders as x, updatePaymentSetupItem as y, createPaymentSetupItem as z };
