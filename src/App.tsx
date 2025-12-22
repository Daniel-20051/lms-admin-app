import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { ThemeProvider } from "@/Components/theme-provider";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import socketService from "@/services/Socketservice";
import SuperAdminLayout from "@/Components/super-admin/AdminLayout";

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Lazy load all page components
const AdminLoginPage = lazy(() => import("@/pages/AdminLogin"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPassword"));
const SuperAdminDashboard = lazy(() => import("@/pages/super-admin/dashboard/DashboardPage"));
const SuperAdminProfile = lazy(() => import("@/pages/super-admin/profile/ProfilePage"));
const StudentsPage = lazy(() => import("@/pages/super-admin/students/StudentsPage"));
const StaffPage = lazy(() => import("@/pages/super-admin/staff/StaffPage"));
const AdminsPage = lazy(() => import("@/pages/super-admin/admins/AdminsPage"));
const ActivityLogsPage = lazy(() => import("@/pages/super-admin/activity-logs/ActivityLogsPage"));
const ProgramsPage = lazy(() => import("@/pages/super-admin/programs/ProgramsPage"));
const CoursesPage = lazy(() => import("@/pages/super-admin/courses/CoursesPage"));
const SemestersPage = lazy(() => import("@/pages/super-admin/semesters/SemestersPage"));
const FacultiesPage = lazy(() => import("@/pages/super-admin/faculties/FacultiesPage"));
const SettingsPage = lazy(() => import("@/pages/super-admin/settings/SettingsPage"));
const NoticesPage = lazy(() => import("@/pages/super-admin/notices/NoticesPage"));
const PaymentsPage = lazy(() => import("@/pages/super-admin/payments/PaymentsPage"));
const SchoolFeesPage = lazy(() => import("@/pages/super-admin/school-fees/SchoolFeesPage"));
const TutorsPage = lazy(() => import("@/pages/super-admin/tutors/TutorsPage"));
const ApplicationsPage = lazy(() => import("@/pages/super-admin/applications/ApplicationsPage"));
const RevenuePage = lazy(() => import("@/pages/super-admin/revenue/RevenuePage"));
const TutorRevenuePage = lazy(() => import("@/pages/super-admin/revenue/TutorRevenuePage"));

// Content Management Pages
const CourseContentPage = lazy(() => import("@/pages/super-admin/content/CourseContentPage"));
const CourseDetailPage = lazy(() => import("@/pages/super-admin/content/CourseDetailPage"));
const QuizzesPage = lazy(() => import("@/pages/super-admin/content/QuizzesPage"));
const ExamsPage = lazy(() => import("@/pages/super-admin/content/ExamsPage"));
const ResultsPage = lazy(() => import("@/pages/super-admin/content/ResultsPage"));
const CourseQuizzesPage = lazy(() => import("@/pages/super-admin/content/CourseQuizzesPage"));

// Exam Management Pages
const ExamsListPage = lazy(() => import("@/pages/super-admin/exams/ExamsListPage"));
const CourseExamsPage = lazy(() => import("@/pages/super-admin/exams/CourseExamsPage"));
const QuestionBankPage = lazy(() => import("@/pages/super-admin/exams/QuestionBankPage"));

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
              <Suspense fallback={<PageLoader />}>
                <AdminLoginPage />
              </Suspense>
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            hasSuperAdminAccess ? (
              <Navigate to="/super-admin/dashboard" replace />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <ForgotPasswordPage />
              </Suspense>
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            hasSuperAdminAccess ? (
              <Navigate to="/super-admin/dashboard" replace />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <ResetPasswordPage />
              </Suspense>
            )
          }
        />
        <Route element={<RequireSuperAdmin />}>
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route
              index
              element={<Navigate to="/super-admin/dashboard" replace />}
            />
            <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><SuperAdminDashboard /></Suspense>} />
            <Route path="profile" element={<Suspense fallback={<PageLoader />}><SuperAdminProfile /></Suspense>} />
            <Route path="students" element={<Suspense fallback={<PageLoader />}><StudentsPage /></Suspense>} />
            <Route path="staff" element={<Suspense fallback={<PageLoader />}><StaffPage /></Suspense>} />
            <Route path="admins" element={<Suspense fallback={<PageLoader />}><AdminsPage /></Suspense>} />
            <Route path="programs" element={<Suspense fallback={<PageLoader />}><ProgramsPage /></Suspense>} />
            <Route path="courses" element={<Suspense fallback={<PageLoader />}><CoursesPage /></Suspense>} />
            <Route path="semesters" element={<Suspense fallback={<PageLoader />}><SemestersPage /></Suspense>} />
            <Route path="faculties" element={<Suspense fallback={<PageLoader />}><FacultiesPage /></Suspense>} />
            <Route path="notices" element={<Suspense fallback={<PageLoader />}><NoticesPage /></Suspense>} />
            <Route path="payments" element={<Suspense fallback={<PageLoader />}><PaymentsPage /></Suspense>} />
            <Route path="school-fees" element={<Suspense fallback={<PageLoader />}><SchoolFeesPage /></Suspense>} />
            <Route path="tutors" element={<Suspense fallback={<PageLoader />}><TutorsPage /></Suspense>} />
            <Route path="applications" element={<Suspense fallback={<PageLoader />}><ApplicationsPage /></Suspense>} />
            <Route path="revenue" element={<Suspense fallback={<PageLoader />}><RevenuePage /></Suspense>} />
            <Route path="revenue/tutor/:ownerType/:ownerId" element={<Suspense fallback={<PageLoader />}><TutorRevenuePage /></Suspense>} />
            <Route path="activity-logs" element={<Suspense fallback={<PageLoader />}><ActivityLogsPage /></Suspense>} />
            <Route path="settings" element={<Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>} />
            
            {/* Content Management Routes */}
            <Route path="content/course-content" element={<Suspense fallback={<PageLoader />}><CourseContentPage /></Suspense>} />
            <Route path="content/course-content/:courseId" element={<Suspense fallback={<PageLoader />}><CourseDetailPage /></Suspense>} />
            <Route path="content/quizzes" element={<Suspense fallback={<PageLoader />}><QuizzesPage /></Suspense>} />
            <Route path="content/exams" element={<Suspense fallback={<PageLoader />}><ExamsPage /></Suspense>} />
            <Route path="content/results" element={<Suspense fallback={<PageLoader />}><ResultsPage /></Suspense>} />
            <Route path="content/results/:courseId" element={<Suspense fallback={<PageLoader />}><CourseQuizzesPage /></Suspense>} />
            
            {/* Exam Management Routes */}
            <Route path="exams" element={<Suspense fallback={<PageLoader />}><ExamsListPage /></Suspense>} />
            <Route path="exams/question-bank" element={<Suspense fallback={<PageLoader />}><QuestionBankPage /></Suspense>} />
            <Route path="exams/course/:courseId" element={<Suspense fallback={<PageLoader />}><CourseExamsPage /></Suspense>} />

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
        <Toaster position="top-right" />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

