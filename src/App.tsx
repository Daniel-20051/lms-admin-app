import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/Components/theme-provider";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import AdminLoginPage from "@/pages/AdminLogin";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ResetPasswordPage from "@/pages/ResetPassword";
import SuperAdminLayout from "@/Components/super-admin/AdminLayout";
import SuperAdminDashboard from "@/pages/super-admin/dashboard/DashboardPage";
import SuperAdminProfile from "@/pages/super-admin/profile/ProfilePage";
import StudentsPage from "@/pages/super-admin/students/StudentsPage";
import StaffPage from "@/pages/super-admin/staff/StaffPage";
import AdminsPage from "@/pages/super-admin/admins/AdminsPage";
import ActivityLogsPage from "@/pages/super-admin/activity-logs/ActivityLogsPage";
import ProgramsPage from "@/pages/super-admin/programs/ProgramsPage";
import CoursesPage from "@/pages/super-admin/courses/CoursesPage";
import SemestersPage from "@/pages/super-admin/semesters/SemestersPage";
import FacultiesPage from "@/pages/super-admin/faculties/FacultiesPage";
import SettingsPage from "@/pages/super-admin/settings/SettingsPage";
import NoticesPage from "@/pages/super-admin/notices/NoticesPage";
import PaymentsPage from "@/pages/super-admin/payments/PaymentsPage";
import TutorsPage from "@/pages/super-admin/tutors/TutorsPage";
import RevenuePage from "@/pages/super-admin/revenue/RevenuePage";
import TutorRevenuePage from "@/pages/super-admin/revenue/TutorRevenuePage";

// Content Management Pages
import CourseContentPage from "@/pages/super-admin/content/CourseContentPage";
import CourseDetailPage from "@/pages/super-admin/content/CourseDetailPage";
import QuizzesPage from "@/pages/super-admin/content/QuizzesPage";
import ExamsPage from "@/pages/super-admin/content/ExamsPage";
import ResultsPage from "@/pages/super-admin/content/ResultsPage";
import CourseQuizzesPage from "@/pages/super-admin/content/CourseQuizzesPage";

// Exam Management Pages
import ExamsListPage from "@/pages/super-admin/exams/ExamsListPage";
import CourseExamsPage from "@/pages/super-admin/exams/CourseExamsPage";
import QuestionBankPage from "@/pages/super-admin/exams/QuestionBankPage";

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
        <Route
          path="/forgot-password"
          element={
            hasSuperAdminAccess ? (
              <Navigate to="/super-admin/dashboard" replace />
            ) : (
              <ForgotPasswordPage />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            hasSuperAdminAccess ? (
              <Navigate to="/super-admin/dashboard" replace />
            ) : (
              <ResetPasswordPage />
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
            <Route path="programs" element={<ProgramsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="semesters" element={<SemestersPage />} />
            <Route path="faculties" element={<FacultiesPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="tutors" element={<TutorsPage />} />
            <Route path="revenue" element={<RevenuePage />} />
            <Route path="revenue/tutor/:ownerType/:ownerId" element={<TutorRevenuePage />} />
            <Route path="activity-logs" element={<ActivityLogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            
            {/* Content Management Routes */}
            <Route path="content/course-content" element={<CourseContentPage />} />
            <Route path="content/course-content/:courseId" element={<CourseDetailPage />} />
            <Route path="content/quizzes" element={<QuizzesPage />} />
            <Route path="content/exams" element={<ExamsPage />} />
            <Route path="content/results" element={<ResultsPage />} />
            <Route path="content/results/:courseId" element={<CourseQuizzesPage />} />
            
            {/* Exam Management Routes */}
            <Route path="exams" element={<ExamsListPage />} />
            <Route path="exams/question-bank" element={<QuestionBankPage />} />
            <Route path="exams/course/:courseId" element={<CourseExamsPage />} />

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

