import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/Components/theme-provider";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import AdminLoginPage from "@/pages/AdminLogin";
import SuperAdminLayout from "@/Components/super-admin/AdminLayout";
import SuperAdminDashboard from "@/pages/super-admin/dashboard/DashboardPage";
import SuperAdminProfile from "@/pages/super-admin/profile/ProfilePage";
import StudentsPage from "@/pages/super-admin/students/StudentsPage";
import StaffPage from "@/pages/super-admin/staff/StaffPage";
import AdminsPage from "@/pages/super-admin/admins/AdminsPage";
import ActivityLogsPage from "@/pages/super-admin/activity-logs/ActivityLogsPage";
import CoursesPage from "@/pages/admin/course/CoursesPage";
import CourseDetailPage from "@/pages/admin/course-details/CourseDetailPage";
import AdminExamsListPage from "@/pages/admin/exams/AdminExamsListPage";
import AdminCourseExamsPage from "@/pages/admin/exams/AdminCourseExamsPage";
import AdminExamDetailsPage from "@/pages/admin/exams/AdminExamDetailsPage";
import QuestionBankPage from "@/pages/admin/exams/QuestionBankPage";
import CourseQuizzesPage from "@/pages/admin/quiz/CourseQuizzesPage";
import { Toaster } from "sonner";
import { useEffect } from "react";
import socketService from "@/services/Socketservice";

function RequireSuperAdmin() {
  const { isLoggedIn, isInitializing, user } = useAuth();
  const hasAccess =
    isLoggedIn && (user?.role === "super_admin" || user?.role === "admin");

  if (isInitializing) {
    return null;
  }

  return hasAccess ? <Outlet /> : <Navigate to="/admin-login" replace />;
}

function AppRouter() {
  const { isLoggedIn, isInitializing, user } = useAuth();
  const hasSuperAdminAccess =
    isLoggedIn && (user?.role === "super_admin" || user?.role === "admin");

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      socketService.connect(String(user.id));
    } else {
      socketService.disconnect();
    }
  }, [isLoggedIn, user?.id]);

  if (isInitializing) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            hasSuperAdminAccess ? (
              <Navigate to="/super-admin/dashboard" replace />
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />
        <Route
          path="/admin-login"
          element={
            hasSuperAdminAccess ? (
              <Navigate to="/super-admin/dashboard" replace />
            ) : (
              <AdminLoginPage />
            )
          }
        />
        <Route element={<RequireSuperAdmin />}>
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route
              index
              element={<Navigate to="/super-admin/dashboard" replace />}
            />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="profile" element={<SuperAdminProfile />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="activity-logs" element={<ActivityLogsPage />} />

            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:courseId" element={<CourseDetailPage />} />

            <Route path="exams" element={<AdminExamsListPage />} />
            <Route path="exams/question-bank" element={<QuestionBankPage />} />
            <Route path="exams/:courseId" element={<AdminCourseExamsPage />} />
            <Route path="exams/:courseId/:examId" element={<AdminExamDetailsPage />} />

            <Route path="quizzes/:courseId" element={<CourseQuizzesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/super-admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <AppRouter />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

