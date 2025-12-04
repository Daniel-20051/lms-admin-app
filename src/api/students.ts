import axios from 'axios';
import { BASE_URL, getAuthHeaders, handleApiError } from './base';

export class StudentsApi {
  async GetStudents(search?: string) {
    try {
      const url = search && search.trim().length > 0
        ? `${BASE_URL}/api/students/?search=${encodeURIComponent(search.trim())}`
        : `${BASE_URL}/api/students/`;
      const response = await axios.get(url, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err: any) {
      return handleApiError(err, "getting students");
    }
  }
}

// Export standalone functions for backward compatibility
export async function GetStudents(search?: string) {
  const api = new StudentsApi();
  return api.GetStudents(search);
}

// ==================== STUDENT STATUS MANAGEMENT ====================

export interface UpdateAdmissionStatusData {
  a_status: 'yes' | 'no';
}

export interface UpdateAdmissionStatusResponse {
  success: boolean;
  message: string;
  data: {
    student_id: number;
    a_status: string;
    previous_status: string;
  };
}

export const updateAdmissionStatus = async (
  studentId: number,
  data: UpdateAdmissionStatusData
): Promise<UpdateAdmissionStatusResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<UpdateAdmissionStatusResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/admission-status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating admission status');
    throw err;
  }
};

export interface UpdateGraduationStatusData {
  g_status: 'Y' | 'N';
}

export interface UpdateGraduationStatusResponse {
  success: boolean;
  message: string;
  data: {
    student_id: number;
    g_status: string;
    previous_status: string;
  };
}

export const updateGraduationStatus = async (
  studentId: number,
  data: UpdateGraduationStatusData
): Promise<UpdateGraduationStatusResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<UpdateGraduationStatusResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/graduation-status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'updating graduation status');
    throw err;
  }
};

export interface ActivateStudentData {
  reason?: string;
}

export interface ActivateStudentResponse {
  success: boolean;
  message: string;
}

export const activateStudent = async (
  studentId: number,
  data: ActivateStudentData = {}
): Promise<ActivateStudentResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<ActivateStudentResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/activate`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'activating student');
    throw err;
  }
};

export interface DeactivateStudentData {
  reason?: string;
}

export interface DeactivateStudentResponse {
  success: boolean;
  message: string;
}

export const deactivateStudent = async (
  studentId: number,
  data: DeactivateStudentData = {}
): Promise<DeactivateStudentResponse> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch<DeactivateStudentResponse>(
      `${BASE_URL}/api/admin/students/${studentId}/deactivate`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, 'deactivating student');
    throw err;
  }
};