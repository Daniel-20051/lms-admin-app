import { u as useNavigate, r as reactExports, aL as hasValidSession, t as toast, j as jsxRuntimeExports, F as FileText, B as Button, k as BookOpen } from './index-BG4-akrH.js';
import { C as Card, d as CardContent } from './card-DKXLAlrm.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { A as Api } from './index-DSZNHD2t.js';
import { u as useCoursesManagement, C as CoursesFilters } from './CoursesFilters-CVm0Ynpd.js';
import { C as CoursesPagination } from './CoursesPagination-CR5_pN6a.js';
import './courses-DmFTm-zX.js';
import './quiz-DTu6yipn.js';
import './exams-CpQ4GBAC.js';
import './admin-BVl3HTxX.js';
import './input-DBQ7-6Gz.js';
import './select-cypf-omf.js';
import './index-BHy36ITo.js';
import './programs-a0V4l-AP.js';

const getCurrentAcademicYear = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return `${currentYear}/${currentYear + 1}`;
};
const CURRENT_YEAR = getCurrentAcademicYear();
function ExamsPage() {
  const navigate = useNavigate();
  const {
    courses,
    pagination,
    loading,
    searchTerm,
    semesterFilter,
    academicYearFilter,
    programFilter,
    facultyFilter,
    staffFilter,
    levelFilter,
    setSearchTerm,
    setSemesterFilter,
    setAcademicYearFilter,
    setProgramFilter,
    setFacultyFilter,
    setStaffFilter,
    setLevelFilter,
    currentPage,
    handlePreviousPage,
    handleNextPage
  } = useCoursesManagement();
  reactExports.useEffect(() => {
    if (!hasValidSession()) {
      toast.error("Your session has expired. Please login again.");
      navigate("/admin-login");
      return;
    }
  }, [navigate]);
  reactExports.useEffect(() => {
    if (!academicYearFilter) {
      setAcademicYearFilter(CURRENT_YEAR);
    }
    const loadActiveSession = async () => {
      try {
        const api = new Api();
        const response = await api.Getsessions();
        const items = response?.data?.data ?? response?.data ?? [];
        if (Array.isArray(items) && items.length > 0) {
          const active = items.find((it) => it.status === "Active");
          if (active?.academic_year) {
            setAcademicYearFilter(active.academic_year);
          }
        }
      } catch (error) {
        console.error("Error loading active session:", error);
      }
    };
    loadActiveSession();
  }, [academicYearFilter, setAcademicYearFilter]);
  const handleQuestionBank = (courseId) => {
    navigate(`/super-admin/exams/question-bank?courseId=${courseId}`);
  };
  const handleManageExams = (courseId) => {
    navigate(`/super-admin/exams/course/${courseId}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Exams" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Pick a course to manage its exams." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CoursesFilters,
        {
          searchTerm,
          onSearchChange: setSearchTerm,
          semesterFilter,
          onSemesterChange: setSemesterFilter,
          academicYearFilter,
          onAcademicYearChange: setAcademicYearFilter,
          programFilter,
          onProgramChange: setProgramFilter,
          facultyFilter,
          onFacultyChange: setFacultyFilter,
          staffFilter,
          onStaffChange: setStaffFilter,
          levelFilter,
          onLevelChange: setLevelFilter
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, i)) }) : courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No courses found for the selected year." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[60px]", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: courses.map((course, index) => {
            const rowNumber = (currentPage - 1) * pagination.limit + index + 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: rowNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: course.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: course.course_code }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handleQuestionBank(course.id),
                    className: "gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                      "Question Bank"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "default",
                    size: "sm",
                    onClick: () => handleManageExams(course.id),
                    children: "Manage exams"
                  }
                )
              ] }) })
            ] }, course.id);
          }) })
        ] }),
        !loading && courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CoursesPagination,
          {
            currentPage,
            pagination,
            onPreviousPage: handlePreviousPage,
            onNextPage: handleNextPage
          }
        ) })
      ] }) })
    ] })
  ] });
}

export { ExamsPage as default };
