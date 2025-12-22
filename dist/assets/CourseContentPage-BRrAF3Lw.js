import { u as useNavigate, aH as useLocation, j as jsxRuntimeExports, k as BookOpen, B as Button } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { u as useCoursesManagement, C as CoursesFilters } from './CoursesFilters-CVm0Ynpd.js';
import { C as CoursesPagination } from './CoursesPagination-CR5_pN6a.js';
import './courses-DmFTm-zX.js';
import './input-DBQ7-6Gz.js';
import './select-cypf-omf.js';
import './index-BHy36ITo.js';
import './programs-a0V4l-AP.js';
import './admin-BVl3HTxX.js';

function CourseContentPage() {
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
  const handleCourseClick = (courseId) => {
    navigate(`${basePath}/content/course-content/${courseId}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Course Content Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage course modules, units, and learning materials" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Filter Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm", children: "Use filters to find courses to manage their content" })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Program" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-32 ml-auto" }) })
      ] }, i)) })
    ] }) }) : courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: "No courses found. Try adjusting your filters." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "S/N" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Program" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: courses.map((course, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: (currentPage - 1) * (pagination?.limit || 20) + index + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: course.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: course.course_code }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
            "Level ",
            course.course_level
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: course.program?.title || "N/A" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "secondary",
              onClick: () => handleCourseClick(course.id),
              children: "Manage Content"
            }
          ) })
        ] }, course.id)) })
      ] }) }),
      !loading && courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CoursesPagination,
        {
          currentPage,
          pagination,
          onPreviousPage: handlePreviousPage,
          onNextPage: handleNextPage
        }
      ) })
    ] }) }) })
  ] });
}

export { CourseContentPage as default };
