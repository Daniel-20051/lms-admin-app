import { aA as axios, az as BASE_URL, ay as getAuthHeaders } from './index-BG4-akrH.js';

class QuizApi {
  // Quiz creation API method
  async CreateQuiz(data) {
    try {
      const response = await axios.post(`${BASE_URL}/api/quiz/create-quiz`, data, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (err) {
      console.error("Error during creating quiz:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  async GetQuiz(courseId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz?course_id=${courseId}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      console.error("Error during getting quizzes:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  async GetQuizById(quizId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/${quizId}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      console.error("Error during getting quiz by id:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Add questions to a quiz
  async AddQuizQuestions(quizId, questions) {
    try {
      const response = await axios.post(`${BASE_URL}/api/quiz/${quizId}/questions-batch`, {
        questions
      }, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (err) {
      console.error("Error during adding quiz questions:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Delete a quiz by ID
  async DeleteQuiz(quizId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/quiz/${quizId}`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      console.error("Error during deleting quiz:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Update a quiz by ID
  async UpdateQuiz(quizId, data) {
    try {
      const response = await axios.patch(`${BASE_URL}/api/quiz/${quizId}/update`, {
        quiz: data
      }, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (err) {
      console.error("Error during updating quiz:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Update quiz questions
  async UpdateQuizQuestions(quizId, questions) {
    try {
      const response = await axios.patch(`${BASE_URL}/api/quiz/${quizId}/update`, {
        questions
      }, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (err) {
      console.error("Error during updating quiz questions:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Start a quiz attempt
  async StartQuizAttempt(quizId) {
    try {
      const response = await axios.post(`${BASE_URL}/api/quiz/${quizId}/attempts`, {}, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      console.error("Error during starting quiz attempt:", err);
      throw err;
    }
  }
  // Save quiz answers as user answers questions
  async SaveQuizAnswers(attemptId, data) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/quiz/attempts/${attemptId}/answers`,
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
      console.error("Error during saving quiz answers:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Submit an in-progress quiz attempt
  async SubmitQuizAttempt(attemptId, data) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/quiz/attempts/${attemptId}/submit`,
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
      console.error("Error during submitting quiz attempt:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  async GetQuizStats(quizId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/${quizId}/stats`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      console.error("Error during getting quiz stats:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
  // Get the student's latest attempt details for a quiz
  async GetMyLatestAttempt(quizId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/quiz/${quizId}/my-latest`, {
        headers: getAuthHeaders()
      });
      return response;
    } catch (err) {
      console.error("Error during getting latest attempt:", err);
      if (err.response?.status === 401) {
      }
      throw err;
    }
  }
}
async function CreateQuiz(data) {
  const api = new QuizApi();
  return api.CreateQuiz(data);
}
async function GetQuiz(courseId) {
  const api = new QuizApi();
  return api.GetQuiz(courseId);
}
async function GetQuizById(quizId) {
  const api = new QuizApi();
  return api.GetQuizById(quizId);
}
async function AddQuizQuestions(quizId, questions) {
  const api = new QuizApi();
  return api.AddQuizQuestions(quizId, questions);
}
async function DeleteQuiz(quizId) {
  const api = new QuizApi();
  return api.DeleteQuiz(quizId);
}
async function UpdateQuiz(quizId, data) {
  const api = new QuizApi();
  return api.UpdateQuiz(quizId, data);
}
async function UpdateQuizQuestions(quizId, questions) {
  const api = new QuizApi();
  return api.UpdateQuizQuestions(quizId, questions);
}
async function StartQuizAttempt(quizId) {
  const api = new QuizApi();
  return api.StartQuizAttempt(quizId);
}
async function SaveQuizAnswers(attemptId, data) {
  const api = new QuizApi();
  return api.SaveQuizAnswers(attemptId, data);
}
async function SubmitQuizAttempt(attemptId, data) {
  const api = new QuizApi();
  return api.SubmitQuizAttempt(attemptId, data);
}
async function GetQuizStats(quizId) {
  const api = new QuizApi();
  return api.GetQuizStats(quizId);
}
async function GetMyLatestAttempt(quizId) {
  const api = new QuizApi();
  return api.GetMyLatestAttempt(quizId);
}

export { AddQuizQuestions as A, CreateQuiz as C, DeleteQuiz as D, GetQuiz as G, QuizApi as Q, UpdateQuiz as U, GetQuizById as a, GetQuizStats as b, UpdateQuizQuestions as c };
