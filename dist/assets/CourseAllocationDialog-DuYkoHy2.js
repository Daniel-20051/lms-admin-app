import { r as reactExports, j as jsxRuntimeExports, B as Button, J as Search, X, c as LoaderCircle, U as Users, a7 as getFaculties, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { C as Checkbox } from './checkbox-CgkZGnpM.js';
import { c as getCourses, k as allocateCourses } from './courses-DmFTm-zX.js';
import { g as getSemesters } from './semesters-oK3Qf9Wp.js';
import { g as getPrograms } from './programs-a0V4l-AP.js';
import { b as getStudents } from './admin-BVl3HTxX.js';
import './index-BHy36ITo.js';

const ALLOCATION_TYPES = [
  { value: "program", label: "By Program" },
  { value: "level", label: "By Level" },
  { value: "faculty", label: "By Faculty" },
  { value: "individual", label: "Individual" }
];
const LEVELS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"];
function CourseAllocationDialog({
  open,
  onOpenChange,
  onAllocationSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [semesters, setSemesters] = reactExports.useState([]);
  const [programs, setPrograms] = reactExports.useState([]);
  const [faculties, setFaculties] = reactExports.useState([]);
  const [courses, setCourses] = reactExports.useState([]);
  const [students, setStudents] = reactExports.useState([]);
  const [selectedSemester, setSelectedSemester] = reactExports.useState("");
  const [allocationType, setAllocationType] = reactExports.useState("program");
  const [selectedProgram, setSelectedProgram] = reactExports.useState("");
  const [selectedFaculty, setSelectedFaculty] = reactExports.useState("");
  const [selectedLevel, setSelectedLevel] = reactExports.useState("");
  const [selectedCourses, setSelectedCourses] = reactExports.useState([]);
  const [selectedStudents, setSelectedStudents] = reactExports.useState([]);
  const [courseSearchTerm, setCourseSearchTerm] = reactExports.useState("");
  const [studentSearchTerm, setStudentSearchTerm] = reactExports.useState("");
  const [studentsLoading, setStudentsLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
  }, [programs]);
  reactExports.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [semestersRes, programsRes, facultiesRes] = await Promise.all([
          getSemesters({ limit: 1e3 }),
          getPrograms({ limit: 1e3 }),
          getFaculties({ limit: 1e3 })
        ]);
        setSemesters(semestersRes.data.semesters);
        setPrograms(programsRes.data.programs);
        setFaculties(facultiesRes.data.faculties);
        const activeSemester = semestersRes.data.semesters.find((s) => s.status === "Active");
        if (activeSemester) {
          setSelectedSemester(`${activeSemester.academic_year}|${activeSemester.semester}`);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load data");
      }
    };
    if (open) {
      fetchInitialData();
    }
  }, [open]);
  reactExports.useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesResponse = await getCourses({ limit: 1e3 });
        const wpuCourses = coursesResponse.data.courses.filter(
          (c) => c.owner_type === "wpu" && !(c.is_marketplace && c.marketplace_status === "published")
        );
        setCourses(wpuCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    if (open) {
      fetchCourses();
    }
  }, [open]);
  reactExports.useEffect(() => {
    const fetchStudents = async () => {
      if (allocationType === "individual" && open) {
        setStudentsLoading(true);
        try {
          const response = await getStudents({ limit: 1e3, search: studentSearchTerm || void 0 });
          if (response.success) {
            setStudents(response.data.students);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
          toast.error("Failed to load students");
        } finally {
          setStudentsLoading(false);
        }
      } else {
        setStudents([]);
      }
    };
    const timer = setTimeout(() => {
      fetchStudents();
    }, studentSearchTerm ? 300 : 0);
    return () => clearTimeout(timer);
  }, [allocationType, open, studentSearchTerm]);
  reactExports.useEffect(() => {
    setSelectedCourses([]);
    setSelectedStudents([]);
  }, [allocationType, selectedProgram, selectedFaculty]);
  const filteredCourses = courses.filter((course) => {
    if (allocationType === "program" && selectedProgram) {
      if (course.program_id !== parseInt(selectedProgram)) {
        return false;
      }
    }
    if (allocationType === "faculty" && selectedFaculty) {
      if (course.faculty_id !== parseInt(selectedFaculty)) {
        return false;
      }
    }
    if (courseSearchTerm) {
      const searchLower = courseSearchTerm.toLowerCase();
      return (course.course_code?.toLowerCase() || "").includes(searchLower) || (course.title?.toLowerCase() || "").includes(searchLower);
    }
    return true;
  });
  const handleCourseToggle = (courseId) => {
    setSelectedCourses(
      (prev) => prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };
  const handleSelectAllCourses = () => {
    const filteredIds = filteredCourses.map((c) => c.id);
    const allFilteredSelected = filteredIds.every((id) => selectedCourses.includes(id));
    if (allFilteredSelected) {
      setSelectedCourses((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      setSelectedCourses((prev) => [.../* @__PURE__ */ new Set([...prev, ...filteredIds])]);
    }
  };
  const handleClearSearch = () => {
    setCourseSearchTerm("");
  };
  const handleStudentToggle = (studentId) => {
    setSelectedStudents(
      (prev) => prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };
  const handleSelectAllStudents = () => {
    const filteredStudentIds = filteredStudents.map((s) => s.id);
    const allFilteredSelected = filteredStudentIds.every((id) => selectedStudents.includes(id));
    if (allFilteredSelected) {
      setSelectedStudents((prev) => prev.filter((id) => !filteredStudentIds.includes(id)));
    } else {
      setSelectedStudents((prev) => [.../* @__PURE__ */ new Set([...prev, ...filteredStudentIds])]);
    }
  };
  const filteredStudents = students.filter((student) => {
    if (studentSearchTerm) {
      const searchLower = studentSearchTerm.toLowerCase();
      return (student.matric_number?.toLowerCase() || "").includes(searchLower) || (student.email?.toLowerCase() || "").includes(searchLower) || `${student.fname || ""} ${student.lname || ""}`.toLowerCase().includes(searchLower);
    }
    return true;
  });
  const handleAllocate = async () => {
    if (!selectedSemester) {
      toast.error("Please select a semester");
      return;
    }
    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      return;
    }
    const [academicYear, semester] = selectedSemester.split("|");
    const allocationData = {
      allocation_type: allocationType,
      course_ids: selectedCourses,
      academic_year: academicYear,
      semester
    };
    if (allocationType === "program") {
      if (!selectedProgram) {
        toast.error("Please select a program");
        return;
      }
      allocationData.program_id = parseInt(selectedProgram);
      if (selectedLevel) {
        allocationData.level = selectedLevel;
      }
    } else if (allocationType === "faculty") {
      if (!selectedFaculty) {
        toast.error("Please select a faculty");
        return;
      }
      allocationData.faculty_id = parseInt(selectedFaculty);
      if (selectedLevel) {
        allocationData.level = selectedLevel;
      }
    } else if (allocationType === "level") {
      if (!selectedLevel) {
        toast.error("Please select a level");
        return;
      }
      allocationData.level = selectedLevel;
    } else if (allocationType === "individual") {
      if (selectedStudents.length === 0) {
        toast.error("Please select at least one student");
        return;
      }
      allocationData.student_ids = selectedStudents;
    }
    setActionLoading(true);
    try {
      const response = await allocateCourses(allocationData);
      toast.success(
        `Successfully allocated ${response.data.summary.allocated} courses to ${response.data.summary.students_count} students${response.data.summary.skipped > 0 ? ` (${response.data.summary.skipped} skipped)` : ""}`
      );
      onAllocationSuccess?.();
      onOpenChange(false);
      setSelectedCourses([]);
      setSelectedStudents([]);
      setSelectedProgram("");
      setSelectedFaculty("");
      setSelectedLevel("");
      setCourseSearchTerm("");
      setStudentSearchTerm("");
    } catch (error) {
      console.error("Error allocating courses:", error);
      toast.error("Failed to allocate courses");
    } finally {
      setActionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Allocate Courses to Students" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Allocate courses to students by program, level, faculty, or individual selection" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Semester" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedSemester, onValueChange: setSelectedSemester, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select semester" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100", children: semesters.map((sem) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: `${sem.academic_year}|${sem.semester}`,
              className: "text-gray-900 dark:text-gray-100",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                sem.academic_year,
                " - ",
                sem.semester,
                " ",
                sem.status === "Active" && "(Active)"
              ] })
            },
            sem.id
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Allocation Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: allocationType, onValueChange: setAllocationType, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100", children: ALLOCATION_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: type.value,
              className: "text-gray-900 dark:text-gray-100",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: type.label })
            },
            type.value
          )) })
        ] })
      ] }),
      allocationType === "program" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Program *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedProgram, onValueChange: setSelectedProgram, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: programs.length > 0 ? "Select program" : "Loading programs..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100", children: programs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 text-sm text-muted-foreground", children: "No programs available" }) : programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectItem,
              {
                value: program.id.toString(),
                className: "text-gray-900 dark:text-gray-100",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: program.title })
              },
              program.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Level (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedLevel || "all", onValueChange: (val) => setSelectedLevel(val === "all" ? "" : val), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All levels" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", className: "text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "All levels" }) }),
              LEVELS.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectItem,
                {
                  value: level,
                  className: "text-gray-900 dark:text-gray-100",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    level,
                    " Level"
                  ] })
                },
                level
              ))
            ] })
          ] })
        ] })
      ] }),
      allocationType === "faculty" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Faculty *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedFaculty, onValueChange: setSelectedFaculty, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select faculty" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100", children: faculties.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 text-sm text-muted-foreground", children: "No faculties available" }) : faculties.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectItem,
              {
                value: faculty.id.toString(),
                className: "text-gray-900 dark:text-gray-100",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: faculty.name })
              },
              faculty.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Level (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedLevel || "all", onValueChange: (val) => setSelectedLevel(val === "all" ? "" : val), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All levels" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", className: "text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "All levels" }) }),
              LEVELS.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectItem,
                {
                  value: level,
                  className: "text-gray-900 dark:text-gray-100",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    level,
                    " Level"
                  ] })
                },
                level
              ))
            ] })
          ] })
        ] })
      ] }),
      allocationType === "level" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Level *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedLevel, onValueChange: setSelectedLevel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-white dark:bg-gray-800 max-h-[300px] overflow-auto z-100", children: LEVELS.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: level,
              className: "text-gray-900 dark:text-gray-100",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                level,
                " Level"
              ] })
            },
            level
          )) })
        ] })
      ] }),
      allocationType === "individual" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Select Students" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              "Choose students to allocate courses (",
              selectedStudents.length,
              " selected)",
              studentSearchTerm && ` • Showing ${filteredStudents.length} of ${students.length} students`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleSelectAllStudents,
              disabled: filteredStudents.length === 0,
              children: filteredStudents.every((s) => selectedStudents.includes(s.id)) && filteredStudents.length > 0 ? "Deselect All" : "Select All"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by matric number, name, or email...",
                value: studentSearchTerm,
                onChange: (e) => setStudentSearchTerm(e.target.value),
                className: "pl-9 pr-9"
              }
            ),
            studentSearchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setStudentSearchTerm(""),
                className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }) }),
          studentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : filteredStudents.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[300px] overflow-y-auto space-y-2 border rounded-md p-4", children: filteredStudents.map((student) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `student-${student.id}`,
                checked: selectedStudents.includes(student.id),
                onCheckedChange: () => handleStudentToggle(student.id)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: `student-${student.id}`,
                className: "flex-1 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: student.matric_number }),
                  " -",
                  " ",
                  student.fname,
                  " ",
                  student.lname,
                  " (",
                  student.email,
                  ")",
                  student.program && ` • ${student.program.title}`
                ]
              }
            )
          ] }, student.id)) }) : studentSearchTerm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            'No students found matching "',
            studentSearchTerm,
            '"'
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No students available" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Select Courses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              "Choose courses to allocate (",
              selectedCourses.length,
              " selected)",
              (courseSearchTerm || selectedProgram || selectedFaculty) && ` • Showing ${filteredCourses.length} of ${courses.length} courses`,
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600 text-xs", children: "Note: Marketplace courses cannot be allocated - students must purchase them" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleSelectAllCourses,
              disabled: filteredCourses.length === 0,
              children: filteredCourses.every((c) => selectedCourses.includes(c.id)) && filteredCourses.length > 0 ? "Deselect All" : "Select All"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by course code or title...",
                value: courseSearchTerm,
                onChange: (e) => setCourseSearchTerm(e.target.value),
                className: "pl-9 pr-9"
              }
            ),
            courseSearchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleClearSearch,
                className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }) }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : filteredCourses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[300px] overflow-y-auto space-y-2 border rounded-md p-4", children: filteredCourses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `course-${course.id}`,
                checked: selectedCourses.includes(course.id),
                onCheckedChange: () => handleCourseToggle(course.id)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: `course-${course.id}`,
                className: "flex-1 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: course.course_code }),
                  " -",
                  " ",
                  course.title,
                  " (",
                  course.course_unit,
                  " units)"
                ]
              }
            )
          ] }, course.id)) }) : courseSearchTerm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            'No courses found matching "',
            courseSearchTerm,
            '"'
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No courses available" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: actionLoading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAllocate,
            disabled: actionLoading || selectedCourses.length === 0 || allocationType === "individual" && selectedStudents.length === 0,
            children: actionLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              " Allocating..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mr-2 h-4 w-4" }),
              " Allocate Courses"
            ] })
          }
        )
      ] })
    ] }) })
  ] }) });
}

export { CourseAllocationDialog as default };
