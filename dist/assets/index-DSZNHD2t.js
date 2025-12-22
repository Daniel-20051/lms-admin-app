import { aA as axios, az as BASE_URL, ay as getAuthHeaders, aB as handleApiError, A as AuthApi } from './index-BG4-akrH.js';
import { C as CoursesApi } from './courses-DmFTm-zX.js';
import { Q as QuizApi } from './quiz-DTu6yipn.js';
import { E as ExamsApi } from './exams-CpQ4GBAC.js';
import './admin-BVl3HTxX.js';

class NotesApi {
  async GetModuleNotes(moduleId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/modules/${moduleId}/note`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting unit notes");
    }
  }
  async CreateModuleNotes(moduleId, data) {
    try {
      const payload = {
        note_text: data.note_text
      };
      if (data.title) {
        payload.title = data.title;
      }
      const response = await axios.put(
        `${BASE_URL}/api/modules/${moduleId}/note`,
        payload,
        {
          headers: getAuthHeaders()
        }
      );
      return response;
    } catch (err) {
      return handleApiError(err, "creating unit notes");
    }
  }
  async EditModuleNotes(moduleId, noteId, data) {
    try {
      const payload = {
        note_text: data.note_text,
        title: data.title
      };
      const response = await axios.patch(
        `${BASE_URL}/api/modules/${moduleId}/notes/${noteId}`,
        payload,
        {
          headers: getAuthHeaders()
        }
      );
      return response;
    } catch (err) {
      return handleApiError(err, "editing unit notes");
    }
  }
  async DeleteModuleNotes(moduleId, noteId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/modules/${moduleId}/notes/${noteId}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "deleting unit notes");
    }
  }
}
async function GetModuleNotes(moduleId) {
  const api = new NotesApi();
  return api.GetModuleNotes(moduleId);
}
async function CreateModuleNotes(moduleId, data) {
  const api = new NotesApi();
  return api.CreateModuleNotes(moduleId, data);
}
async function EditModuleNotes(moduleId, noteId, data) {
  const api = new NotesApi();
  return api.EditModuleNotes(moduleId, noteId, data);
}
async function DeleteModuleNotes(moduleId, noteId) {
  const api = new NotesApi();
  return api.DeleteModuleNotes(moduleId, noteId);
}

class StudentsApi {
  async GetStudents(search) {
    try {
      const url = search && search.trim().length > 0 ? `${BASE_URL}/api/students/?search=${encodeURIComponent(search.trim())}` : `${BASE_URL}/api/students/`;
      const response = await axios.get(url, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting students");
    }
  }
}
async function GetStudents(search) {
  const api = new StudentsApi();
  return api.GetStudents(search);
}
const updateAdmissionStatus = async (studentId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/students/${studentId}/admission-status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating admission status");
    throw err;
  }
};
const updateGraduationStatus = async (studentId, data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/students/${studentId}/graduation-status`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "updating graduation status");
    throw err;
  }
};
const activateStudent = async (studentId, data = {}) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/students/${studentId}/activate`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "activating student");
    throw err;
  }
};
const deactivateStudent = async (studentId, data = {}) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(
      `${BASE_URL}/api/admin/students/${studentId}/deactivate`,
      data,
      { headers }
    );
    return response.data;
  } catch (err) {
    handleApiError(err, "deactivating student");
    throw err;
  }
};

class ChatApi {
  async GetChatThreads() {
    try {
      const response = await axios.get(`${BASE_URL}/api/chat/dm/threads`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting chat threads");
    }
  }
}
async function GetChatThreads() {
  const api = new ChatApi();
  return api.GetChatThreads();
}

class VideoApi {
  /**
   * Create a new video call
   */
  async createVideoCall(payload) {
    try {
      const response = await axios.post(`${BASE_URL}/api/video/calls`, payload, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error("Error creating video call:", error);
      handleApiError(error, "creating video call");
      throw new Error(error.response?.data?.message || "Failed to create video call");
    }
  }
  /**
   * Get all video calls
   */
  async getVideoCalls() {
    try {
      const response = await axios.get(`${BASE_URL}/api/video/calls`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching video calls:", error);
      handleApiError(error, "fetching video calls");
      throw new Error(error.response?.data?.message || "Failed to fetch video calls");
    }
  }
  /**
   * Delete a video call
   */
  async deleteVideoCall(callId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/video/calls/${callId}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting video call:", error);
      handleApiError(error, "deleting video call");
      throw new Error(error.response?.data?.message || "Failed to delete video call");
    }
  }
}
const CreateVideoCall = async (payload) => {
  const api = new VideoApi();
  return api.createVideoCall(payload);
};
const GetVideoCalls = async () => {
  const api = new VideoApi();
  return api.getVideoCalls();
};
const DeleteVideoCall = async (callId) => {
  const api = new VideoApi();
  return api.deleteVideoCall(callId);
};

class Api extends AuthApi {
  courses = new CoursesApi();
  notes = new NotesApi();
  quiz = new QuizApi();
  exams = new ExamsApi();
  students = new StudentsApi();
  chat = new ChatApi();
  video = new VideoApi();
  // Re-export course methods for backward compatibility
  async GetCourses(session, semester) {
    return this.courses.GetCourses(session, semester);
  }
  async GetStaffCourses(session) {
    return this.courses.GetStaffCourses(session);
  }
  async GetStaffCoursesbyId(id) {
    return this.courses.GetStaffCoursesbyId(id);
  }
  async GetCourseModules(courseId) {
    return this.courses.GetCourseModules(courseId);
  }
  async AddModule(courseId, title, description) {
    return this.courses.AddModule(courseId, title, description);
  }
  async DeleteModule(moduleId) {
    return this.courses.DeleteModule(moduleId);
  }
  async AddUnit(moduleId, data) {
    return this.courses.AddUnit(moduleId, data);
  }
  async getUnits(moduleId) {
    return this.courses.getUnits(moduleId);
  }
  async EditUnit(unitId, data) {
    return this.courses.EditUnit(unitId, data);
  }
  async DeleteUnit(unitId) {
    return this.courses.DeleteUnit(unitId);
  }
  async UploadUnitVideo(moduleId, unitId, videoFile, onProgress) {
    return this.courses.UploadUnitVideo(moduleId, unitId, videoFile, onProgress);
  }
  // Re-export notes methods for backward compatibility
  async GetModuleNotes(moduleId) {
    return this.notes.GetModuleNotes(moduleId);
  }
  async CreateModuleNotes(moduleId, data) {
    return this.notes.CreateModuleNotes(moduleId, data);
  }
  async EditModuleNotes(moduleId, noteId, data) {
    return this.notes.EditModuleNotes(moduleId, noteId, data);
  }
  async DeleteModuleNotes(moduleId, noteId) {
    return this.notes.DeleteModuleNotes(moduleId, noteId);
  }
  // Re-export quiz methods for backward compatibility
  async CreateQuiz(data) {
    return this.quiz.CreateQuiz(data);
  }
  async GetQuiz(courseId) {
    return this.quiz.GetQuiz(courseId);
  }
  async GetQuizById(quizId) {
    return this.quiz.GetQuizById(quizId);
  }
  async AddQuizQuestions(quizId, questions) {
    return this.quiz.AddQuizQuestions(quizId, questions);
  }
  async DeleteQuiz(quizId) {
    return this.quiz.DeleteQuiz(quizId);
  }
  async UpdateQuiz(quizId, data) {
    return this.quiz.UpdateQuiz(quizId, data);
  }
  async UpdateQuizQuestions(quizId, questions) {
    return this.quiz.UpdateQuizQuestions(quizId, questions);
  }
  async StartQuizAttempt(quizId) {
    return this.quiz.StartQuizAttempt(quizId);
  }
  async SaveQuizAnswers(attemptId, data) {
    return this.quiz.SaveQuizAnswers(attemptId, data);
  }
  async SubmitQuizAttempt(attemptId, data) {
    return this.quiz.SubmitQuizAttempt(attemptId, data);
  }
  async GetQuizStats(quizId) {
    return this.quiz.GetQuizStats(quizId);
  }
  async GetMyLatestAttempt(quizId) {
    return this.quiz.GetMyLatestAttempt(quizId);
  }
  // Re-export exam methods for backward compatibility
  async GetStaffExams() {
    return this.exams.GetStaffExams();
  }
  async GetExams(courseId, page = 1, limit = 20) {
    return this.exams.GetExams(courseId, page, limit);
  }
  async CreateExam(data) {
    return this.exams.CreateExam(data);
  }
  async UpdateExam(examId, data) {
    return this.exams.UpdateExam(examId, data);
  }
  async DeleteExam(examId) {
    return this.exams.DeleteExam(examId);
  }
  async GetExamById(examId) {
    return this.exams.GetExamById(examId);
  }
  async GetBankQuestions(courseId) {
    return this.exams.GetBankQuestions(courseId);
  }
  async AddObjectiveQuestion(data) {
    return this.exams.AddObjectiveQuestion(data);
  }
  async AddTheoryQuestion(data) {
    return this.exams.AddTheoryQuestion(data);
  }
  async GetExamAttempts(examId) {
    return this.exams.GetExamAttempts(examId);
  }
  async GetAttemptForGrading(attemptId) {
    return this.exams.GetAttemptForGrading(attemptId);
  }
  async GradeTheoryAnswer(answerId, score, feedback) {
    return this.exams.GradeTheoryAnswer(answerId, score, feedback);
  }
  async BulkGradeTheoryAnswers(attemptId, grades) {
    return this.exams.BulkGradeTheoryAnswers(attemptId, grades);
  }
  async GetExamStatistics(examId) {
    return this.exams.GetExamStatistics(examId);
  }
  async GetStudentExams(courseId) {
    return this.exams.GetStudentExams(courseId);
  }
  async StartExam(examId) {
    return this.exams.StartExam(examId);
  }
  async SubmitExamAnswer(attemptId, payload) {
    return this.exams.SubmitExamAnswer(attemptId, payload);
  }
  async SubmitExam(attemptId) {
    return this.exams.SubmitExam(attemptId);
  }
  // Re-export student methods for backward compatibility
  async GetStudents(search) {
    return this.students.GetStudents(search);
  }
  // Re-export chat methods for backward compatibility
  async GetChatThreads() {
    return this.chat.GetChatThreads();
  }
  // Re-export video methods for backward compatibility
  async CreateVideoCall(payload) {
    return this.video.createVideoCall(payload);
  }
  async GetVideoCalls() {
    return this.video.getVideoCalls();
  }
  async DeleteVideoCall(callId) {
    return this.video.deleteVideoCall(callId);
  }
  // Add user profile method
  async getUserProfile() {
    return super.getUserProfile();
  }
}

export { Api as A };
