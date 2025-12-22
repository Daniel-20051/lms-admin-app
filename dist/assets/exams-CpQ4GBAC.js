import { aA as axios, az as BASE_URL, ay as getAuthHeaders, aB as handleApiError } from './index-BG4-akrH.js';

class ExamsApi {
  // Exam management API methods
  async GetStaffExams() {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting staff exams");
    }
  }
  async GetExams(courseId, page = 1, limit = 20) {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams?course_id=${courseId}&page=${page}&limit=${limit}`, {
        headers: getAuthHeaders()
      });
      console.log(response);
      return response;
    } catch (err) {
      return handleApiError(err, "getting exams");
    }
  }
  async CreateExam(data) {
    try {
      const response = await axios.post(`${BASE_URL}/api/exams`, data, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (err) {
      return handleApiError(err, "creating exam");
    }
  }
  async UpdateExam(examId, data) {
    try {
      const response = await axios.put(`${BASE_URL}/api/exams/${examId}`, data, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (err) {
      return handleApiError(err, "updating exam");
    }
  }
  async DeleteExam(examId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/exams/${examId}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "deleting exam");
    }
  }
  async GetExamById(examId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams/${examId}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting exam by id");
    }
  }
  // Get question bank for exam creation
  async GetBankQuestions(courseId, page = 1, limit = 20) {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams/bank/questions?course_id=${courseId}&page=${page}&limit=${limit}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting bank questions");
    }
  }
  // Add objective question to question bank
  async AddObjectiveQuestion(data) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/exams/bank/questions/objective`,
        data,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
          }
        }
      );
      return response;
    } catch (err) {
      console.error("Error adding objective question:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Add theory question to question bank
  async AddTheoryQuestion(data) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/exams/bank/questions/theory`,
        data,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
          }
        }
      );
      return response;
    } catch (err) {
      console.error("Error adding theory question:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Get all attempts for an exam (for grading)
  async GetExamAttempts(examId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams/${examId}/attempts`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting exam attempts");
    }
  }
  // Get specific attempt for grading
  async GetAttemptForGrading(attemptId) {
    try {
      const url = `${BASE_URL}/api/exams/attempts/${attemptId}/grade`;
      const response = await axios.get(url, {
        headers: getAuthHeaders()
      });
      console.log(response);
      return response;
    } catch (err) {
      console.error("Error during getting attempt for grading:", err);
      console.log("Error response data:", err.response?.data);
      console.log("Error response status:", err.response?.status);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Grade a single theory answer
  async GradeTheoryAnswer(answerId, score, feedback) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/exams/answers/theory/${answerId}/grade`,
        { score, feedback },
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
          }
        }
      );
      return response;
    } catch (err) {
      return handleApiError(err, "grading theory answer");
    }
  }
  // Bulk grade theory answers
  async BulkGradeTheoryAnswers(attemptId, grades) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/exams/attempts/${attemptId}/grade-bulk`,
        { grades },
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
          }
        }
      );
      return response;
    } catch (err) {
      return handleApiError(err, "bulk grading");
    }
  }
  // Get exam statistics
  async GetExamStatistics(examId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams/${examId}/statistics`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting exam statistics");
    }
  }
  // Get student exams for a course
  async GetStudentExams(courseId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams/student/exams?course_id=${courseId}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting student exams");
    }
  }
  // Start an exam
  async StartExam(examId) {
    try {
      const response = await axios.post(`${BASE_URL}/api/exams/student/exams/${examId}/start`, {}, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      const enhancedError = handleApiError(err, `starting exam ${examId}`);
      if (err.response?.data) {
        console.error("Exam start error details:", {
          examId,
          errorData: err.response.data,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      throw enhancedError;
    }
  }
  // Submit exam answer
  async SubmitExamAnswer(attemptId, payload) {
    try {
      const response = await axios.post(`${BASE_URL}/api/exams/student/exams/attempts/${attemptId}/answer`, payload, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        }
      });
      console.log(response);
      return response;
    } catch (err) {
      return handleApiError(err, "submitting exam answer");
    }
  }
  // Submit completed exam
  async SubmitExam(attemptId) {
    try {
      const response = await axios.post(`${BASE_URL}/api/exams/student/exams/attempts/${attemptId}/submit`, {}, {
        headers: getAuthHeaders()
      });
      console.log(response);
      return response;
    } catch (err) {
      return handleApiError(err, "submitting exam");
    }
  }
  // Get student's exam attempt history
  async GetStudentExamAttempts(page = 1, limit = 20) {
    try {
      const response = await axios.get(`${BASE_URL}/api/exams/student/attempts?page=${page}&limit=${limit}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      return handleApiError(err, "getting student exam attempts");
    }
  }
}
async function GetStaffExams() {
  const api = new ExamsApi();
  return api.GetStaffExams();
}
async function GetExams(courseId, page = 1, limit = 20) {
  const api = new ExamsApi();
  return api.GetExams(courseId, page, limit);
}
async function CreateExam(data) {
  const api = new ExamsApi();
  return api.CreateExam(data);
}
async function UpdateExam(examId, data) {
  const api = new ExamsApi();
  return api.UpdateExam(examId, data);
}
async function DeleteExam(examId) {
  const api = new ExamsApi();
  return api.DeleteExam(examId);
}
async function GetExamById(examId) {
  const api = new ExamsApi();
  return api.GetExamById(examId);
}
async function GetBankQuestions(courseId, page = 1, limit = 20) {
  const api = new ExamsApi();
  return api.GetBankQuestions(courseId, page, limit);
}
async function AddObjectiveQuestion(data) {
  const api = new ExamsApi();
  return api.AddObjectiveQuestion(data);
}
async function AddTheoryQuestion(data) {
  const api = new ExamsApi();
  return api.AddTheoryQuestion(data);
}
async function GetExamAttempts(examId) {
  const api = new ExamsApi();
  return api.GetExamAttempts(examId);
}
async function GetAttemptForGrading(attemptId) {
  const api = new ExamsApi();
  return api.GetAttemptForGrading(attemptId);
}
async function GradeTheoryAnswer(answerId, score, feedback) {
  const api = new ExamsApi();
  return api.GradeTheoryAnswer(answerId, score, feedback);
}
async function BulkGradeTheoryAnswers(attemptId, grades) {
  const api = new ExamsApi();
  return api.BulkGradeTheoryAnswers(attemptId, grades);
}
async function GetExamStatistics(examId) {
  const api = new ExamsApi();
  return api.GetExamStatistics(examId);
}
async function GetStudentExams(courseId) {
  const api = new ExamsApi();
  return api.GetStudentExams(courseId);
}
async function StartExam(examId) {
  const api = new ExamsApi();
  return api.StartExam(examId);
}
async function SubmitExamAnswer(attemptId, payload) {
  const api = new ExamsApi();
  return api.SubmitExamAnswer(attemptId, payload);
}
async function SubmitExam(attemptId) {
  const api = new ExamsApi();
  return api.SubmitExam(attemptId);
}
async function GetStudentExamAttempts(page = 1, limit = 20) {
  const api = new ExamsApi();
  return api.GetStudentExamAttempts(page, limit);
}

export { AddObjectiveQuestion as A, CreateExam as C, DeleteExam as D, ExamsApi as E, GetExams as G, UpdateExam as U, GetBankQuestions as a, GetExamById as b, GetExamAttempts as c, GetExamStatistics as d, AddTheoryQuestion as e };
