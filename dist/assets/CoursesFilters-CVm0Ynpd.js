import { r as reactExports, t as toast, j as jsxRuntimeExports, J as Search, a7 as getFaculties } from './index-BG4-akrH.js';
import { c as getCourses, d as deleteCourse } from './courses-DmFTm-zX.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { g as getPrograms } from './programs-a0V4l-AP.js';
import { f as getStaff } from './admin-BVl3HTxX.js';

const useCoursesManagement = () => {
  const [courses, setCourses] = reactExports.useState([]);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [programFilter, setProgramFilter] = reactExports.useState(null);
  const [facultyFilter, setFacultyFilter] = reactExports.useState(null);
  const [staffFilter, setStaffFilter] = reactExports.useState(null);
  const [levelFilter, setLevelFilter] = reactExports.useState(null);
  const [semesterFilter, setSemesterFilter] = reactExports.useState(null);
  const [academicYearFilter, setAcademicYearFilter] = reactExports.useState(null);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedCourseId, setSelectedCourseId] = reactExports.useState(null);
  const [selectedCourse, setSelectedCourse] = reactExports.useState(null);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [showCreateDialog, setShowCreateDialog] = reactExports.useState(false);
  const [showEditDialog, setShowEditDialog] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const fetchCourses = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 20
      };
      if (searchTerm) {
        params.search = searchTerm;
      }
      if (programFilter) {
        params.programId = programFilter;
      }
      if (facultyFilter) {
        params.facultyId = facultyFilter;
      }
      if (staffFilter) {
        params.staffId = staffFilter;
      }
      if (levelFilter) {
        params.level = levelFilter;
      }
      if (semesterFilter) {
        params.semester = semesterFilter;
      }
      if (academicYearFilter) {
        params.academic_year = academicYearFilter;
      }
      const response = await getCourses(params);
      setCourses(response.data.courses);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch courses");
      setCourses([]);
      setPagination({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, programFilter, facultyFilter, staffFilter, levelFilter, semesterFilter, academicYearFilter]);
  reactExports.useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  reactExports.useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, programFilter, facultyFilter, staffFilter, levelFilter, semesterFilter, academicYearFilter]);
  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;
    setActionLoading(true);
    try {
      await deleteCourse(selectedCourse.id);
      toast.success("Course deleted successfully");
      setShowDeleteDialog(false);
      setSelectedCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error?.response?.data?.message || "Failed to delete course");
    } finally {
      setActionLoading(false);
    }
  };
  const handleCourseUpdated = () => {
    toast.success("Course updated successfully");
    setShowEditDialog(false);
    setSelectedCourseId(null);
    fetchCourses();
  };
  return {
    // Data
    courses,
    pagination,
    loading,
    // Filters
    searchTerm,
    setSearchTerm,
    programFilter,
    setProgramFilter,
    facultyFilter,
    setFacultyFilter,
    staffFilter,
    setStaffFilter,
    levelFilter,
    setLevelFilter,
    semesterFilter,
    setSemesterFilter,
    academicYearFilter,
    setAcademicYearFilter,
    currentPage,
    // Selected items
    selectedCourseId,
    setSelectedCourseId,
    selectedCourse,
    setSelectedCourse,
    // Dialog states
    showViewDialog,
    setShowViewDialog,
    showCreateDialog,
    setShowCreateDialog,
    showEditDialog,
    setShowEditDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    actionLoading,
    // Handlers
    handleNextPage,
    handlePreviousPage,
    handleDeleteCourse,
    handleCourseUpdated,
    fetchCourses,
    refetchCourses: fetchCourses
    // Alias for clarity
  };
};

const SEMESTERS = ["1ST", "2ND"];
const LEVELS = [100, 200, 300, 400, 500, 600, 700];
const generateAcademicYears = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const years = [];
  for (let i = -5; i <= 2; i++) {
    const year = currentYear + i;
    years.push(`${year}/${year + 1}`);
  }
  return years.reverse();
};
const ACADEMIC_YEARS = generateAcademicYears();
function CoursesFilters({
  searchTerm,
  onSearchChange,
  semesterFilter,
  onSemesterChange,
  academicYearFilter,
  onAcademicYearChange,
  programFilter,
  onProgramChange,
  facultyFilter,
  onFacultyChange,
  staffFilter,
  onStaffChange,
  levelFilter,
  onLevelChange
}) {
  const [programs, setPrograms] = reactExports.useState([]);
  const [faculties, setFaculties] = reactExports.useState([]);
  const [staff, setStaff] = reactExports.useState([]);
  const [loadingPrograms, setLoadingPrograms] = reactExports.useState(false);
  const [loadingFaculties, setLoadingFaculties] = reactExports.useState(false);
  const [loadingStaff, setLoadingStaff] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const fetchData = async () => {
      setLoadingPrograms(true);
      try {
        const response = await getPrograms({ limit: 1e3 });
        setPrograms(response.data.programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoadingPrograms(false);
      }
      setLoadingFaculties(true);
      try {
        const response = await getFaculties({ limit: 1e3 });
        setFaculties(response.data.faculties);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      } finally {
        setLoadingFaculties(false);
      }
      setLoadingStaff(true);
      try {
        const response = await getStaff({ limit: 1e3 });
        setStaff(response.data.staff);
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoadingStaff(false);
      }
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search courses by title or code...",
          value: searchTerm,
          onChange: (e) => onSearchChange(e.target.value),
          className: "pl-10"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: programFilter ? programFilter.toString() : "all",
          onValueChange: (value) => onProgramChange(value === "all" ? null : parseInt(value)),
          disabled: loadingPrograms,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Programs" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-[300px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Programs" }),
              programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: program.id.toString(), children: program.title }, program.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: facultyFilter ? facultyFilter.toString() : "all",
          onValueChange: (value) => onFacultyChange(value === "all" ? null : parseInt(value)),
          disabled: loadingFaculties,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Faculties" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-[300px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Faculties" }),
              faculties.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: faculty.id.toString(), children: faculty.name }, faculty.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: staffFilter ? staffFilter.toString() : "all",
          onValueChange: (value) => onStaffChange(value === "all" ? null : parseInt(value)),
          disabled: loadingStaff,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Instructors" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-[300px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Instructors" }),
              staff.map((instructor) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: instructor.id.toString(), children: instructor.full_name }, instructor.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: levelFilter ? levelFilter.toString() : "all",
          onValueChange: (value) => onLevelChange(value === "all" ? null : parseInt(value)),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Levels" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
              LEVELS.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: level.toString(), children: [
                level,
                " Level"
              ] }, level))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: academicYearFilter || "all",
          onValueChange: (value) => onAcademicYearChange(value === "all" ? null : value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Academic Years" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-[300px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Academic Years" }),
              ACADEMIC_YEARS.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: semesterFilter || "all",
          onValueChange: (value) => onSemesterChange(value === "all" ? null : value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Semesters" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Semesters" }),
              SEMESTERS.map((semester) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: semester, children: [
                semester,
                " Semester"
              ] }, semester))
            ] })
          ]
        }
      )
    ] })
  ] });
}

export { CoursesFilters as C, useCoursesManagement as u };
