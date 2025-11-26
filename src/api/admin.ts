import axios from 'axios';
import { BASE_URL, getAuthHeaders, handleApiError } from './base';

export interface AdminPermissions {
  staff: {
    edit: boolean;
    view: boolean;
    create: boolean;
    delete: boolean;
  };
  admins: {
    edit: boolean;
    view: boolean;
    create: boolean;
    delete: boolean;
  };
  system: {
    logs: boolean;
    settings: boolean;
    analytics: boolean;
  };
  content: {
    exams: boolean;
    units: boolean;
    modules: boolean;
    quizzes: boolean;
  };
  courses: {
    edit: boolean;
    view: boolean;
    create: boolean;
    delete: boolean;
  };
  students: {
    edit: boolean;
    view: boolean;
    create: boolean;
    delete: boolean;
  };
}

export interface AdminProfile {
  id: number;
  email: string;
  fname: string;
  lname: string;
  mname: string | null;
  role: string;
  phone: string;
  permissions: AdminPermissions;
  status: string;
  last_login: string;
  profile_image: string | null;
  two_factor_enabled: boolean;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdminProfileResponse {
  success: boolean;
  message: string;
  data: {
    admin: AdminProfile;
  };
}

export const getAdminProfile = async (): Promise<AdminProfileResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<AdminProfileResponse>(
      `${BASE_URL}/api/admin/profile`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting admin profile');
    throw err;
  }
};

export interface UpdateAdminProfileData {
  id: number;
  email: string;
  fname: string;
  lname: string;
  mname?: string | null;
  role: string;
  phone: string;
}

export interface UpdateAdminProfileResponse {
  success: boolean;
  message: string;
  data: {
    admin: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      phone: string;
      profileImage: string | null;
    };
  };
}

export const updateAdminProfile = async (data: UpdateAdminProfileData): Promise<UpdateAdminProfileResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put<UpdateAdminProfileResponse>(
      `${BASE_URL}/api/admin/profile`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating admin profile');
    throw err;
  }
};

// Students Management
export interface Student {
  id: number;
  email: string;
  fname: string;
  lname: string;
  matric_number: string;
  level: number;
  admin_status: string;
  program_id: number;
  phone?: string;
  created_at?: string;
  program?: {
    id: number;
    title: string;
  };
}

export interface GetStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  level?: number;
  status?: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetStudentsResponse {
  success: boolean;
  message: string;
  data: {
    students: Student[];
    pagination: PaginationData;
  };
}

export const getStudents = async (params: GetStudentsParams = {}): Promise<GetStudentsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.level) queryParams.append('level', params.level.toString());
    if (params.status) queryParams.append('status', params.status);

    const url = `${BASE_URL}/api/admin/students${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetStudentsResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting students');
    throw err;
  }
};

export interface StudentStatisticsByLevel {
  level: string | null;
  count: string;
}

export interface StudentStatisticsByProgram {
  program_id: number;
  count: string;
  "program.title": string | null;
}

export interface StudentStatisticsRaw {
  total: number;
  active: number;
  inactive: number;
  byLevel: StudentStatisticsByLevel[];
  byProgram: StudentStatisticsByProgram[];
}

export interface StudentStatistics {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  studentsByLevel: {
    [key: string]: number;
  };
  studentsByProgram: {
    [key: string]: number;
  };
}

export interface GetStudentStatisticsResponse {
  success: boolean;
  message: string;
  data: StudentStatisticsRaw;
}

export const getStudentStatistics = async (): Promise<GetStudentStatisticsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetStudentStatisticsResponse>(
      `${BASE_URL}/api/admin/students/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting student statistics');
    throw err;
  }
};

// Program Statistics
export interface ProgramStatisticsByFaculty {
  faculty_id: number;
  count: string;
  faculty: {
    name: string;
  };
}

export interface ProgramStatisticsTopProgram {
  id: number;
  title: string;
  course_count: string;
}

export interface ProgramStatisticsRaw {
  total: number;
  active: number;
  inactive: number;
  byFaculty: ProgramStatisticsByFaculty[];
  topProgramsByCourses: ProgramStatisticsTopProgram[];
}

export interface ProgramStatistics {
  totalPrograms: number;
  activePrograms: number;
  inactivePrograms: number;
  programsByFaculty: {
    [key: string]: number;
  };
  topProgramsByCourses: Array<{
    id: number;
    title: string;
    courseCount: number;
  }>;
}

export interface GetProgramStatisticsResponse {
  success: boolean;
  message: string;
  data: ProgramStatisticsRaw;
}

export const getProgramStatistics = async (): Promise<GetProgramStatisticsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetProgramStatisticsResponse>(
      `${BASE_URL}/api/admin/programs/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting program statistics');
    throw err;
  }
};

// Course Statistics
export interface CourseStatisticsByProgram {
  program_id: number;
  count: string;
  program: {
    title: string;
  } | null;
}

export interface CourseStatisticsByFaculty {
  faculty_id: number;
  count: string;
  faculty: {
    name: string;
  } | null;
}

export interface CourseStatisticsRaw {
  total: number;
  byProgram: CourseStatisticsByProgram[];
  byFaculty: CourseStatisticsByFaculty[];
}

export interface CourseStatistics {
  totalCourses: number;
  coursesByProgram: {
    [key: string]: number;
  };
  coursesByFaculty: {
    [key: string]: number;
  };
}

export interface GetCourseStatisticsResponse {
  success: boolean;
  message: string;
  data: CourseStatisticsRaw;
}

export const getCourseStatistics = async (): Promise<GetCourseStatisticsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetCourseStatisticsResponse>(
      `${BASE_URL}/api/admin/courses/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting course statistics');
    throw err;
  }
};

// Get Single Student
export interface StudentDetails extends Omit<Student, 'program'> {
  program?: {
    id: number;
    program_name: string;
    title?: string;
  };
  enrolledCourses?: Array<{
    course_id: number;
    course_name: string;
  }>;
}

export interface GetStudentResponse {
  success: boolean;
  message: string;
  data: {
    student: StudentDetails;
  };
}

export const getStudent = async (studentId: number): Promise<GetStudentResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetStudentResponse>(
      `${BASE_URL}/api/admin/students/${studentId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting student details');
    throw err;
  }
};

// Comprehensive Student Full Details Types
export interface StudentPersonalInformation {
  id: number;
  fname: string;
  mname: string;
  lname: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  state_origin: string;
  lcda: string;
  country: string;
  matric_number: string;
  level: string;
  admin_status: string;
  g_status: string;
  study_mode: string;
  application_code: string;
  referral_code: string;
  date: string;
}

export interface StudentFaculty {
  id: number;
  name: string;
  description: string;
}

export interface StudentProgram {
  id: number;
  title: string;
  description: string;
  status: string;
}

export interface RegistrationCourse {
  id: number;
  title: string;
  course_code: string;
  registration_id: number;
  registration_date: string;
}

export interface RegistrationSchoolFees {
  id: number;
  amount: number;
  status: string;
  date: string;
  type: string;
  teller_no: string;
  currency: string;
}

export interface StudentRegistration {
  academic_year: string;
  semester: string;
  course_count: number;
  courses: RegistrationCourse[];
  registration_date: string;
  school_fees: RegistrationSchoolFees;
  registration_status: string;
}

export interface CourseRegistration {
  id: number;
  academic_year: string;
  semester: string;
  level: string | null;
  date: string;
  ref: string | null;
}

export interface CourseProgram {
  id: number;
  title: string;
}

export interface CourseFaculty {
  id: number;
  name: string;
}

export interface CourseInstructor {
  id: number;
  full_name: string;
  email: string;
}

export interface CourseDetails {
  id: number;
  title: string;
  course_code: string;
  course_unit: number;
  course_type: string;
  course_level: number;
  price: string;
  exam_fee: number;
  currency: string;
  program: CourseProgram | null;
  faculty: CourseFaculty;
  instructor: CourseInstructor | null;
}

export interface CourseResults {
  first_ca: number;
  second_ca: number;
  third_ca: number;
  exam_score: number;
  total_score: number;
}

export interface StudentCourse {
  registration: CourseRegistration;
  course: CourseDetails;
  results: CourseResults;
}

export interface ExamDetails {
  id: number;
  exam_id: number;
  attempt_no: number;
  status: string;
  started_at: string;
  submitted_at: string;
  graded_at: string | null;
  total_score: string;
  max_score: string;
  exam: {
    id: number;
    title: string;
    course_id: number;
    exam_type: string;
    duration_minutes: number;
    academic_year: string;
    semester: string;
    course: {
      id: number;
      title: string;
      course_code: string;
    };
  };
}

export interface WalletTransaction {
  id: number;
  service_name: string;
  amount: number;
  date: string;
  ref: string;
  student_id: number;
  semester: string;
  academic_year: string;
  type: "Credit" | "Debit";
  balance: string;
  currency: string | null;
}

export interface WalletSummary {
  total_credits: number;
  total_debits: number;
  net_balance: number;
}

export interface StudentWallet {
  balance: string;
  currency: string;
  transactions: WalletTransaction[];
  summary: WalletSummary;
}

export interface SchoolFeePayment {
  id: number;
  student_id: number;
  amount: number;
  status: string;
  academic_year: string;
  semester: string;
  date: string;
  balance: number | null;
  teller_no: string;
  matric_number: string;
  total_amount: number | null;
  type: string;
  student_level: string;
  currency: string;
}

export interface CurrentSemesterPayment {
  id: number;
  amount: number;
  status: string;
  academic_year: string;
  semester: string;
  date: string;
  type: string;
  paid: boolean;
}

export interface SchoolFeesPayments {
  history: SchoolFeePayment[];
  currentSemester: CurrentSemesterPayment;
}

export interface CourseOrder {
  id: number;
  student_id: number;
  academic_year: string;
  date: string;
  semester: string;
  amount: string | null;
  level: string | null;
  currency: string | null;
}

export interface StudentPayments {
  schoolFees: SchoolFeesPayments;
  courseOrders: CourseOrder[];
}

export interface CurrentSemester {
  id: number;
  academic_year: string;
  semester: string;
  status: string;
  start_date: string;
  end_date: string;
}

export interface StudentFullDetails {
  personalInformation: StudentPersonalInformation;
  faculty: StudentFaculty;
  program: StudentProgram;
  registrations: StudentRegistration[];
  courses: StudentCourse[];
  exams: ExamDetails[];
  wallet: StudentWallet;
  payments: StudentPayments;
  currentSemester: CurrentSemester;
}

export interface GetStudentFullDetailsResponse {
  success: boolean;
  message: string;
  data: StudentFullDetails;
}

export const getStudentFullDetails = async (studentId: number): Promise<GetStudentFullDetailsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetStudentFullDetailsResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/full`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting student full details');
    throw err;
  }
};

// Create Student
export interface CreateStudentData {
  email: string;
  password: string;
  fname: string;
  lname: string;
  matric_number?: string;
  level: number;
  program_id: number;
  currency?: string;
  referral_code?: string;
  designated_institute?: number;
  foreign_student?: number;
}

export interface CreateStudentResponse {
  success: boolean;
  message: string;
  data: {
    student: Student;
  };
}

export const createStudent = async (data: CreateStudentData): Promise<CreateStudentResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<CreateStudentResponse>(
      `${BASE_URL}/api/admin/students`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'creating student');
    throw err;
  }
};

// Update Student
export interface UpdateStudentData {
  fname?: string;
  lname?: string;
  level?: number;
  phone?: string;
  matric_number?: string;
  program_id?: number;
}

export interface UpdateStudentResponse {
  success: boolean;
  message: string;
  data: {
    student: Student;
  };
}

export const updateStudent = async (studentId: number, data: UpdateStudentData): Promise<UpdateStudentResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put<UpdateStudentResponse>(
      `${BASE_URL}/api/admin/students/${studentId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating student');
    throw err;
  }
};

// Deactivate Student
export interface DeactivateStudentResponse {
  success: boolean;
  message: string;
}

export const deactivateStudent = async (studentId: number): Promise<DeactivateStudentResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<DeactivateStudentResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/deactivate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'deactivating student');
    throw err;
  }
};

// Activate Student
export interface ActivateStudentResponse {
  success: boolean;
  message: string;
}

export const activateStudent = async (studentId: number): Promise<ActivateStudentResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<ActivateStudentResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/activate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'activating student');
    throw err;
  }
};

// Reset Student Password
export interface ResetStudentPasswordData {
  newPassword: string;
}

export interface ResetStudentPasswordResponse {
  success: boolean;
  message: string;
}

export const resetStudentPassword = async (
  studentId: number,
  data: ResetStudentPasswordData
): Promise<ResetStudentPasswordResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<ResetStudentPasswordResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/reset-password`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'resetting student password');
    throw err;
  }
};

// ==================== STAFF MANAGEMENT ====================

export interface StaffCourse {
  id: number;
  title: string;
  course_code: string;
}

export interface Staff {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  linkedin: string;
  google_scholar: string;
  file: string;
  research_areas: string;
  home_address: string;
  admin_status: string;
  courses: StaffCourse[];
}

export interface GetStaffParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface GetStaffResponse {
  success: boolean;
  message: string;
  data: {
    staff: Staff[];
    pagination: PaginationData;
  };
}

export const getStaff = async (params: GetStaffParams = {}): Promise<GetStaffResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetStaffResponse>(
      `${BASE_URL}/api/admin/staff`,
      { headers, params }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting staff');
    throw err;
  }
};

// Create Staff
export interface CreateStaffData {
  email: string;
  password: string;
  fname: string;
  lname: string;
  title: string;
  phone: string;
}

export interface CreateStaffResponse {
  success: boolean;
  message: string;
  data: {
    staff: {
      id: number;
      email: string;
      fname: string;
      lname: string;
      title: string;
    };
  };
}

export const createStaff = async (data: CreateStaffData): Promise<CreateStaffResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<CreateStaffResponse>(
      `${BASE_URL}/api/admin/staff`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'creating staff');
    throw err;
  }
};

// Update Staff
export interface UpdateStaffData {
  fname?: string;
  lname?: string;
  title?: string;
  phone?: string;
  email?: string;
}

export interface UpdateStaffResponse {
  success: boolean;
  message: string;
}

export const updateStaff = async (staffId: number, data: UpdateStaffData): Promise<UpdateStaffResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put<UpdateStaffResponse>(
      `${BASE_URL}/api/admin/staff/${staffId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating staff');
    throw err;
  }
};

// Deactivate Staff
export interface DeactivateStaffResponse {
  success: boolean;
  message: string;
}

export const deactivateStaff = async (staffId: number): Promise<DeactivateStaffResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<DeactivateStaffResponse>(
      `${BASE_URL}/api/admin/staff/${staffId}/deactivate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'deactivating staff');
    throw err;
  }
};

// Reset Staff Password
export interface ResetStaffPasswordData {
  newPassword: string;
}

export interface ResetStaffPasswordResponse {
  success: boolean;
  message: string;
}

export const resetStaffPassword = async (
  staffId: number,
  data: ResetStaffPasswordData
): Promise<ResetStaffPasswordResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<ResetStaffPasswordResponse>(
      `${BASE_URL}/api/admin/staff/${staffId}/reset-password`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'resetting staff password');
    throw err;
  }
};

// ==================== ADMIN MANAGEMENT ====================

export interface AdminListItem {
  id: number;
  email: string;
  fname: string;
  lname: string;
  mname: string | null;
  role: string;
  phone: string;
  permissions: AdminPermissions;
  status: string;
  last_login: string | null;
  token: string | null;
  profile_image: string | null;
  two_factor_enabled: boolean;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface GetAdminsResponse {
  success: boolean;
  message: string;
  data: {
    admins: AdminListItem[];
    count: number;
  };
}

export const getAdmins = async (): Promise<GetAdminsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetAdminsResponse>(
      `${BASE_URL}/api/admin/admins`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting admins');
    throw err;
  }
};

// Create Admin
export interface CreateAdminPermissions {
  students: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  staff: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  courses: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export interface CreateAdminData {
  email: string;
  password: string;
  fname: string;
  lname: string;
  role: "super_admin" | "wpu_admin";
  phone?: string;
  permissions: CreateAdminPermissions;
}

export interface CreateAdminResponse {
  success: boolean;
  message: string;
  data: {
    admin: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  };
}

export const createAdmin = async (data: CreateAdminData): Promise<CreateAdminResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<CreateAdminResponse>(
      `${BASE_URL}/api/admin/admins`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'creating admin');
    throw err;
  }
};

// Update Admin
export interface UpdateAdminData {
  fname?: string;
  lname?: string;
  phone?: string;
}

export interface UpdateAdminResponse {
  success: boolean;
  message: string;
}

export const updateAdmin = async (adminId: number, data: UpdateAdminData): Promise<UpdateAdminResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put<UpdateAdminResponse>(
      `${BASE_URL}/api/admin/admins/${adminId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating admin');
    throw err;
  }
};

// Deactivate Admin
export interface DeactivateAdminResponse {
  success: boolean;
  message: string;
}

export const deactivateAdmin = async (adminId: number): Promise<DeactivateAdminResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<DeactivateAdminResponse>(
      `${BASE_URL}/api/admin/admins/${adminId}/deactivate`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'deactivating admin');
    throw err;
  }
};

// Activity Logs
export interface ActivityLog {
  id: number;
  admin_id: number;
  action: string;
  target_type: string;
  target_id: number;
  description: string;
  changes: any | null;
  metadata: any | null;
  ip_address: string | null;
  user_agent: string | null;
  result: string;
  error_message: string | null;
  created_at: string;
  admin?: {
    id: number;
    fname: string;
    lname: string;
    email: string;
    role: string;
  };
}

export interface GetActivityLogsParams {
  page?: number;
  limit?: number;
  action?: string;
  admin_id?: number;
}

export interface GetActivityLogsResponse {
  success: boolean;
  message: string;
  data: {
    logs: ActivityLog[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const getActivityLogs = async (params: GetActivityLogsParams = {}): Promise<GetActivityLogsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.action) queryParams.append('action', params.action);
    if (params.admin_id) queryParams.append('admin_id', params.admin_id.toString());

    const url = `${BASE_URL}/api/admin/activity-logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetActivityLogsResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting activity logs');
    throw err;
  }
};

// ==================== FACULTIES MANAGEMENT ====================

export interface FacultyProgram {
  id: number;
  title: string;
}

export interface Faculty {
  id: number;
  name: string;
  description: string;
  date: string;
  token: string;
  programs: FacultyProgram[];
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

// Faculty Statistics
export interface FacultyStatisticsByPrograms {
  id: number;
  name: string;
  program_count: string;
}

export interface FacultyStatisticsByCourses {
  id: number;
  name: string;
  course_count: string;
}

export interface FacultyStatisticsRaw {
  total: number;
  byPrograms: FacultyStatisticsByPrograms[];
  byCourses: FacultyStatisticsByCourses[];
}

export interface FacultyStatistics {
  totalFaculties: number;
  facultiesByPrograms: {
    [key: string]: number;
  };
  facultiesByCourses: {
    [key: string]: number;
  };
}

export interface GetFacultyStatisticsResponse {
  success: boolean;
  message: string;
  data: FacultyStatisticsRaw;
}

export const getFacultyStatistics = async (): Promise<GetFacultyStatisticsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetFacultyStatisticsResponse>(
      `${BASE_URL}/api/admin/faculties/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting faculty statistics');
    throw err;
  }
};

// Get Faculty by ID
export interface GetFacultyResponse {
  success: boolean;
  message: string;
  data: {
    faculty: Faculty;
  };
}

export const getFacultyById = async (facultyId: number): Promise<GetFacultyResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetFacultyResponse>(
      `${BASE_URL}/api/admin/faculties/${facultyId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting faculty by id');
    throw err;
  }
};

// Update Faculty
export interface UpdateFacultyData {
  name?: string;
  description?: string;
}

export interface UpdateFacultyResponse {
  success: boolean;
  message: string;
  data: {
    faculty: Faculty;
  };
}

export const updateFaculty = async (facultyId: number, data: UpdateFacultyData): Promise<UpdateFacultyResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put<UpdateFacultyResponse>(
      `${BASE_URL}/api/admin/faculties/${facultyId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating faculty');
    throw err;
  }
};

// Delete Faculty
export interface DeleteFacultyResponse {
  success: boolean;
  message: string;
}

export const deleteFaculty = async (facultyId: number): Promise<DeleteFacultyResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete<DeleteFacultyResponse>(
      `${BASE_URL}/api/admin/faculties/${facultyId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'deleting faculty');
    throw err;
  }
};

// Create Faculty
export interface CreateFacultyData {
  name: string;
  description: string;
}

export interface CreateFacultyResponse {
  success: boolean;
  message: string;
  data: {
    faculty: Faculty;
  };
}

export const createFaculty = async (data: CreateFacultyData): Promise<CreateFacultyResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<CreateFacultyResponse>(
      `${BASE_URL}/api/admin/faculties`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'creating faculty');
    throw err;
  }
};

// ==================== SYSTEM SETTINGS ====================

export interface SystemSettings {
  id: number | null;
  name: string;
  address: string;
  rate: string;
}

export interface GetSystemSettingsResponse {
  success: boolean;
  message: string;
  data: {
    settings: SystemSettings;
  };
}

export const getSystemSettings = async (): Promise<GetSystemSettingsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetSystemSettingsResponse>(
      `${BASE_URL}/api/admin/settings`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting system settings');
    throw err;
  }
};

// Update System Settings
export interface UpdateSystemSettingsData {
  name: string;
  address: string;
  rate: string;
}

export interface UpdateSystemSettingsResponse {
  success: boolean;
  message: string;
  data: {
    settings: SystemSettings;
  };
}

export const updateSystemSettings = async (data: UpdateSystemSettingsData): Promise<UpdateSystemSettingsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put<UpdateSystemSettingsResponse>(
      `${BASE_URL}/api/admin/settings`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating system settings');
    throw err;
  }
};

// ==================== NOTICES MANAGEMENT ====================

export interface Notice {
  id: number;
  title: string;
  note: string;
  date: string;
  token: string;
  course_id: number | null;
  course: {
    id: number;
    title: string;
  } | null;
}

export interface GetNoticesParams {
  page?: number;
  limit?: number;
  course_id?: number | null;
  search?: string;
}

export interface GetNoticesResponse {
  success: boolean;
  message: string;
  data: {
    notices: Notice[];
    pagination: PaginationData;
  };
}

export const getNotices = async (params: GetNoticesParams = {}): Promise<GetNoticesResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.course_id !== undefined) {
      if (params.course_id === null) {
        queryParams.append('course_id', 'null');
      } else {
        queryParams.append('course_id', params.course_id.toString());
      }
    }
    if (params.search) queryParams.append('search', params.search);

    const url = `${BASE_URL}/api/admin/notices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetNoticesResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting notices');
    throw err;
  }
};

// Get Notice by ID
export interface GetNoticeResponse {
  success: boolean;
  message: string;
  data: {
    notice: Notice;
  };
}

export const getNoticeById = async (noticeId: number): Promise<GetNoticeResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetNoticeResponse>(
      `${BASE_URL}/api/admin/notices/${noticeId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting notice by id');
    throw err;
  }
};

// Create Notice
export interface CreateNoticeData {
  title: string;
  note: string;
  course_id: number | null;
}

export interface CreateNoticeResponse {
  success: boolean;
  message: string;
  data: {
    notice: Notice;
  };
}

export const createNotice = async (data: CreateNoticeData): Promise<CreateNoticeResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post<CreateNoticeResponse>(
      `${BASE_URL}/api/admin/notices`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'creating notice');
    throw err;
  }
};

// Update Notice
export interface UpdateNoticeData {
  title?: string;
  note?: string;
  course_id?: number | null;
}

export interface UpdateNoticeResponse {
  success: boolean;
  message: string;
  data: {
    notice: Notice;
  };
}

export const updateNotice = async (noticeId: number, data: UpdateNoticeData): Promise<UpdateNoticeResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put<UpdateNoticeResponse>(
      `${BASE_URL}/api/admin/notices/${noticeId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating notice');
    throw err;
  }
};

// Delete Notice
export interface DeleteNoticeResponse {
  success: boolean;
  message: string;
}

export const deleteNotice = async (noticeId: number): Promise<DeleteNoticeResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete<DeleteNoticeResponse>(
      `${BASE_URL}/api/admin/notices/${noticeId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'deleting notice');
    throw err;
  }
};

// ==================== PAYMENTS MANAGEMENT ====================

export interface FundingItem {
  count: string;
  total: string;
  type: "Debit" | "Credit";
  currency: string | null;
}

export interface SchoolFee {
  count: string;
  total: string;
  status: string;
}

export interface CourseOrder {
  count: string;
  total: string;
}

export interface PaymentOverview {
  funding: FundingItem[];
  schoolFees: SchoolFee[];
  courseOrders: CourseOrder;
}

export interface GetPaymentOverviewResponse {
  success: boolean;
  message: string;
  data: PaymentOverview;
}

export const getPaymentOverview = async (): Promise<GetPaymentOverviewResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetPaymentOverviewResponse>(
      `${BASE_URL}/api/admin/payments/overview`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting payment overview');
    throw err;
  }
};

export interface Funding {
  id: number;
  service_name: string;
  amount: number;
  date: string;
  ref: string;
  student_id: number | null;
  semester: string;
  academic_year: string;
  type: "Debit" | "Credit";
  balance: string;
  currency: string | null;
  student: any | null;
}

export interface FundingsResponse {
  success: boolean;
  message: string;
  data: {
    fundings: Funding[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const getFundings = async (page: number = 1, limit: number = 20): Promise<FundingsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<FundingsResponse>(
      `${BASE_URL}/api/admin/payments/fundings`,
      { 
        headers,
        params: { page, limit }
      }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting fundings');
    throw err;
  }
};

export interface SchoolFee {
  id: number;
  student_id: number | null;
  amount: number;
  status: string;
  academic_year: string;
  semester: string;
  date: string;
  balance: number | null;
  teller_no: string;
  matric_number: string;
  total_amount: number | null;
  type: string;
  student_level: string;
  currency: string;
  student: {
    id: number;
    fname: string;
    lname: string;
    email: string;
    matric_number: string;
  } | null;
}

export interface SchoolFeesResponse {
  success: boolean;
  message: string;
  data: {
    schoolFees: SchoolFee[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const getSchoolFees = async (page: number = 1, limit: number = 20): Promise<SchoolFeesResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<SchoolFeesResponse>(
      `${BASE_URL}/api/admin/payments/school-fees`,
      { 
        headers,
        params: { page, limit }
      }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting school fees');
    throw err;
  }
};

export interface CourseOrderPayment {
  id: number;
  student_id: number | null;
  academic_year: string;
  date: string;
  semester: string;
  amount: string | null;
  level: string | null;
  currency: string | null;
  student: {
    id: number;
    fname: string;
    lname: string;
    email: string;
    matric_number: string;
  } | null;
}

export interface CourseOrdersResponse {
  success: boolean;
  message: string;
  data: {
    courseOrders: CourseOrderPayment[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const getCourseOrders = async (page: number = 1, limit: number = 20): Promise<CourseOrdersResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<CourseOrdersResponse>(
      `${BASE_URL}/api/admin/payments/course-orders`,
      { 
        headers,
        params: { page, limit }
      }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting course orders');
    throw err;
  }
};

// Payment Statistics Types and Functions
export interface CourseOrderStats {
  total: number;
  totalAmount: string;
  bySemester: Array<{
    semester: string;
    count: string;
    total: string;
  }>;
  byAcademicYear: Array<{
    academic_year: string;
    count: string;
    total: string;
  }>;
}

export interface CourseOrderStatsResponse {
  success: boolean;
  message: string;
  data: CourseOrderStats;
}

export const getCourseOrderStats = async (): Promise<CourseOrderStatsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<CourseOrderStatsResponse>(
      `${BASE_URL}/api/admin/payments/course-orders/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting course order statistics');
    throw err;
  }
};

export interface SchoolFeesStats {
  total: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  byStatus: Array<{
    status: string;
    count: string;
    total: string;
  }>;
  bySemester: Array<{
    semester: string;
    count: string;
    total: string;
  }>;
}

export interface SchoolFeesStatsResponse {
  success: boolean;
  message: string;
  data: SchoolFeesStats;
}

export const getSchoolFeesStats = async (): Promise<SchoolFeesStatsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<SchoolFeesStatsResponse>(
      `${BASE_URL}/api/admin/payments/school-fees/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting school fees statistics');
    throw err;
  }
};

export interface FundingStats {
  total: number;
  totalCredits: number;
  totalDebits: number;
  netBalance: number;
  byType: Array<{
    type: string;
    count: string;
    total: string;
  }>;
  byCurrency: Array<{
    currency: string | null;
    count: string;
    total: string;
  }>;
}

export interface FundingStatsResponse {
  success: boolean;
  message: string;
  data: FundingStats;
}

export const getFundingStats = async (): Promise<FundingStatsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<FundingStatsResponse>(
      `${BASE_URL}/api/admin/payments/fundings/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting funding statistics');
    throw err;
  }
};

// ==================== TUTORS MANAGEMENT ====================

export interface SoleTutor {
  id: number;
  [key: string]: any; // Flexible structure since we don't know exact fields yet
}

export interface GetSoleTutorsParams {
  page?: number;
  limit?: number;
}

export interface GetSoleTutorsResponse {
  success: boolean;
  message: string;
  data: {
    tutors: SoleTutor[];
    pagination: PaginationData;
  };
}

export const getSoleTutors = async (params: GetSoleTutorsParams = {}): Promise<GetSoleTutorsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const url = `${BASE_URL}/api/admin/tutors/sole-tutors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetSoleTutorsResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting sole tutors');
    throw err;
  }
};

// Get Sole Tutor by ID
export interface SoleTutorDetails extends SoleTutor {
  courses?: Array<{
    id: number;
    title: string;
    course_code?: string;
    [key: string]: any;
  }>;
  wallet?: {
    balance: string | number;
    currency: string;
    transactions?: Array<{
      id: number;
      amount: number;
      type: string;
      date: string;
      [key: string]: any;
    }>;
  };
  earnings?: {
    total: string | number;
    currency: string;
    [key: string]: any;
  };
}

export interface GetSoleTutorResponse {
  success: boolean;
  message: string;
  data: {
    tutor: SoleTutorDetails;
  };
}

export const getSoleTutorById = async (tutorId: number): Promise<GetSoleTutorResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetSoleTutorResponse>(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting sole tutor by id');
    throw err;
  }
};

// Approve Sole Tutor
export interface ApproveSoleTutorResponse {
  success: boolean;
  message: string;
}

export const approveSoleTutor = async (tutorId: number): Promise<ApproveSoleTutorResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<ApproveSoleTutorResponse>(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}/approve`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'approving sole tutor');
    throw err;
  }
};

// Reject Sole Tutor
export interface RejectSoleTutorData {
  reason: string;
}

export interface RejectSoleTutorResponse {
  success: boolean;
  message: string;
}

export const rejectSoleTutor = async (tutorId: number, data: RejectSoleTutorData): Promise<RejectSoleTutorResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<RejectSoleTutorResponse>(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}/reject`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'rejecting sole tutor');
    throw err;
  }
};

// Update Sole Tutor Status
export interface UpdateSoleTutorStatusData {
  status: "active" | "suspended";
}

export interface UpdateSoleTutorStatusResponse {
  success: boolean;
  message: string;
}

export const updateSoleTutorStatus = async (tutorId: number, data: UpdateSoleTutorStatusData): Promise<UpdateSoleTutorStatusResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<UpdateSoleTutorStatusResponse>(
      `${BASE_URL}/api/admin/tutors/sole-tutors/${tutorId}/status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating sole tutor status');
    throw err;
  }
};

// ==================== ORGANIZATIONS MANAGEMENT ====================

export interface Organization {
  id: number;
  [key: string]: any; // Flexible structure since we don't know exact fields yet
}

export interface GetOrganizationsParams {
  page?: number;
  limit?: number;
  status?: "pending" | "active" | "suspended" | "rejected";
  verification_status?: string;
  search?: string;
}

export interface GetOrganizationsResponse {
  success: boolean;
  message: string;
  data: {
    organizations: Organization[];
    pagination: PaginationData;
  };
}

export const getOrganizations = async (params: GetOrganizationsParams = {}): Promise<GetOrganizationsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.verification_status) queryParams.append('verification_status', params.verification_status);
    if (params.search) queryParams.append('search', params.search);

    const url = `${BASE_URL}/api/admin/tutors/organizations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetOrganizationsResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting organizations');
    throw err;
  }
};

// Get Organization by ID
export interface OrganizationDetails extends Organization {
  users?: Array<{
    id: number;
    name?: string;
    email?: string;
    [key: string]: any;
  }>;
  courses?: Array<{
    id: number;
    title: string;
    course_code?: string;
    [key: string]: any;
  }>;
  earnings?: {
    total: string | number;
    currency: string;
    [key: string]: any;
  };
}

export interface GetOrganizationResponse {
  success: boolean;
  message: string;
  data: {
    organization: OrganizationDetails;
  };
}

export const getOrganizationById = async (organizationId: number): Promise<GetOrganizationResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetOrganizationResponse>(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting organization by id');
    throw err;
  }
};

// Approve Organization
export interface ApproveOrganizationResponse {
  success: boolean;
  message: string;
}

export const approveOrganization = async (organizationId: number): Promise<ApproveOrganizationResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<ApproveOrganizationResponse>(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}/approve`,
      {},
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'approving organization');
    throw err;
  }
};

// Reject Organization
export interface RejectOrganizationData {
  reason: string;
}

export interface RejectOrganizationResponse {
  success: boolean;
  message: string;
}

export const rejectOrganization = async (organizationId: number, data: RejectOrganizationData): Promise<RejectOrganizationResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<RejectOrganizationResponse>(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}/reject`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'rejecting organization');
    throw err;
  }
};

// Update Organization Status
export interface UpdateOrganizationStatusData {
  status: "active" | "suspended";
}

export interface UpdateOrganizationStatusResponse {
  success: boolean;
  message: string;
}

export const updateOrganizationStatus = async (organizationId: number, data: UpdateOrganizationStatusData): Promise<UpdateOrganizationStatusResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<UpdateOrganizationStatusResponse>(
      `${BASE_URL}/api/admin/tutors/organizations/${organizationId}/status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating organization status');
    throw err;
  }
};

// Get Tutor Statistics
export interface TutorStatistics {
  soleTutors: {
    total: number;
    active: number;
    pending: number;
  };
  organizations: {
    total: number;
    active: number;
    pending: number;
  };
  tutorCourses: number;
}

export interface GetTutorStatisticsResponse {
  success: boolean;
  message: string;
  data: TutorStatistics;
}

export const getTutorStatistics = async (): Promise<GetTutorStatisticsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetTutorStatisticsResponse>(
      `${BASE_URL}/api/admin/tutors/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting tutor statistics');
    throw err;
  }
};

// ==================== REVENUE MANAGEMENT ====================

export interface MarketplaceTransaction {
  id: number;
  course_id: number;
  student_id: number;
  owner_type: "sole_tutor" | "organization";
  owner_id: number;
  course_price: number;
  currency: string;
  commission_rate: number;
  wpu_commission: number;
  tutor_earnings: number;
  payment_status: "pending" | "completed" | "failed" | "refunded";
  course: {
    id: number;
    title: string;
    course_code: string;
  };
  student: {
    id: number;
    fname: string;
    lname: string;
    email: string;
  };
  wpuCommission: {
    id: number;
    amount: number;
    status: string;
  };
}

export interface GetMarketplaceTransactionsParams {
  page?: number;
  limit?: number;
  owner_type?: "sole_tutor" | "organization";
  owner_id?: number;
  payment_status?: "pending" | "completed" | "failed" | "refunded";
  start_date?: string;
  end_date?: string;
}

export interface GetMarketplaceTransactionsResponse {
  success: boolean;
  message: string;
  data: {
    transactions: MarketplaceTransaction[];
    pagination: PaginationData;
  };
}

export const getMarketplaceTransactions = async (
  params: GetMarketplaceTransactionsParams = {}
): Promise<GetMarketplaceTransactionsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.owner_type) queryParams.append('owner_type', params.owner_type);
    if (params.owner_id) queryParams.append('owner_id', params.owner_id.toString());
    if (params.payment_status) queryParams.append('payment_status', params.payment_status);
    if (params.start_date) queryParams.append('start_date', params.start_date);
    if (params.end_date) queryParams.append('end_date', params.end_date);

    const url = `${BASE_URL}/api/admin/revenue/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetMarketplaceTransactionsResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting marketplace transactions');
    throw err;
  }
};

export interface WPURevenueStats {
  totalCommission: number;
  totalRevenue: number;
  totalTransactions: number;
  byOwnerType: Array<{
    owner_type: "sole_tutor" | "organization";
    count: number;
    total_revenue: number;
    total_commission: number;
  }>;
  pendingPayouts: number;
  topEarners: Array<{
    owner_type: "sole_tutor" | "organization";
    owner_id: number;
    sales_count: number;
    total_revenue: number;
    total_commission: number;
  }>;
}

export interface GetWPURevenueStatsParams {
  start_date?: string;
  end_date?: string;
}

export interface GetWPURevenueStatsResponse {
  success: boolean;
  message: string;
  data: WPURevenueStats;
}

export const getWPURevenueStats = async (
  params: GetWPURevenueStatsParams = {}
): Promise<GetWPURevenueStatsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.start_date) queryParams.append('start_date', params.start_date);
    if (params.end_date) queryParams.append('end_date', params.end_date);

    const url = `${BASE_URL}/api/admin/revenue/wpu-stats${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetWPURevenueStatsResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting WPU revenue statistics');
    throw err;
  }
};

export interface TutorRevenueDetails {
  owner_type: "sole_tutor" | "organization";
  owner_id: number;
  total_revenue: number;
  total_commission: number;
  tutor_earnings: number;
  wallet_balance: number;
  currency: string;
  transactions: MarketplaceTransaction[];
  transaction_count: number;
}

export interface GetTutorRevenueDetailsParams {
  start_date?: string;
  end_date?: string;
}

export interface GetTutorRevenueDetailsResponse {
  success: boolean;
  message: string;
  data: TutorRevenueDetails;
}

export const getTutorRevenueDetails = async (
  ownerType: "sole_tutor" | "organization",
  ownerId: number,
  params: GetTutorRevenueDetailsParams = {}
): Promise<GetTutorRevenueDetailsResponse> => {
  try {
    const headers = getAuthHeaders();
    const queryParams = new URLSearchParams();

    if (params.start_date) queryParams.append('start_date', params.start_date);
    if (params.end_date) queryParams.append('end_date', params.end_date);

    const url = `${BASE_URL}/api/admin/revenue/tutor/${ownerType}/${ownerId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await axios.get<GetTutorRevenueDetailsResponse>(url, { headers });
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting tutor revenue details');
    throw err;
  }
};

// ==================== DASHBOARD STATISTICS ====================

export interface DashboardOverview {
  students: {
    total: number;
    active: number;
    inactive: number;
  };
  staff: {
    total: number;
    active: number;
  };
  admins: {
    total: number;
  };
  academic: {
    programs: {
      total: number;
      active: number;
    };
    courses: number;
    faculties: number;
  };
  enrollments: number;
}

export interface StudentByLevel {
  level: string | null;
  count: string;
}

export interface TopProgram {
  program_id: number;
  program_title: string;
  student_count: number;
}

export interface RecentActivity {
  enrollmentsLast7Days: number;
  fundingsLast30Days: number;
  schoolFeesLast30Days: number;
}

export interface DashboardStats {
  overview: DashboardOverview;
  currentSemester: any | null;
  studentsByLevel: StudentByLevel[];
  topPrograms: TopProgram[];
  recentActivity: RecentActivity;
}

export interface GetDashboardStatsResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}

export const getDashboardStats = async (): Promise<GetDashboardStatsResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get<GetDashboardStatsResponse>(
      `${BASE_URL}/api/admin/dashboard/stats`,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'getting dashboard statistics');
    throw err;
  }
};

