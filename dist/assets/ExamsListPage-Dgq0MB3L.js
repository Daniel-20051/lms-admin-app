import { u as useNavigate, aH as useLocation, j as jsxRuntimeExports, F as FileText, U as Users, B as Button } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { u as useCoursesManagement, C as CoursesFilters } from './CoursesFilters-CVm0Ynpd.js';
import { C as CoursesPagination } from './CoursesPagination-CR5_pN6a.js';
import './courses-DmFTm-zX.js';
import './input-DBQ7-6Gz.js';
import './select-cypf-omf.js';
import './index-BHy36ITo.js';
import './programs-a0V4l-AP.js';
import './admin-BVl3HTxX.js';

function ExamsListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperAdmin = location.pathname.startsWith("/super-admin");
  const basePath = isSuperAdmin ? "/super-admin" : "/admin";
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
    currentPage,
    setSearchTerm,
    setSemesterFilter,
    setAcademicYearFilter,
    setProgramFilter,
    setFacultyFilter,
    setStaffFilter,
    setLevelFilter,
    handlePreviousPage,
    handleNextPage
  } = useCoursesManagement();
  const handleViewExams = (courseId) => {
    navigate(`${basePath}/exams/course/${courseId}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Exams Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage course exams and assessments" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Filter Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm", children: "Use filters to find courses to manage their exams" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      ) })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }) })
    ] }, i)) }) : courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: "No courses found. Try adjusting your filters." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "hover:shadow-lg transition-shadow cursor-pointer",
          onClick: () => handleViewExams(course.id),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg line-clamp-2", children: course.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "mt-1", children: course.course_code })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
                "Level ",
                course.course_level
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              course.program && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: course.program.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    course.exams_count || 0,
                    " Exams"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    course.students_count || 0,
                    " Students"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", variant: "secondary", children: "Manage Exams" })
            ] })
          ]
        },
        course.id
      )) }),
      !loading && courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CoursesPagination,
        {
          currentPage,
          pagination,
          onPreviousPage: handlePreviousPage,
          onNextPage: handleNextPage
        }
      )
    ] })
  ] });
}

export { ExamsListPage as default };
