import { r as reactExports, a7 as getFaculties, t as toast, j as jsxRuntimeExports, B as Button } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { f as getCourse, u as updateCourse } from './courses-DmFTm-zX.js';
import { g as getPrograms } from './programs-a0V4l-AP.js';
import { f as getStaff } from './admin-BVl3HTxX.js';
import './index-BHy36ITo.js';

const COURSE_TYPES = ["Core", "Elective", "General"];
const LEVELS = [100, 200, 300, 400, 500, 600, 700];
const SEMESTERS = ["1ST", "2ND"];
const CURRENCIES = ["NGN", "USD", "EUR", "GBP"];
const OWNER_TYPES = [
  { value: "wpu", label: "WPU" },
  { value: "sole_tutor", label: "Sole Tutor" },
  { value: "organization", label: "Organization" }
];
const MARKETPLACE_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" }
];
function EditCourseDialog({
  open,
  onOpenChange,
  courseId,
  onCourseUpdated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [fetching, setFetching] = reactExports.useState(false);
  const [fetchingCourse, setFetchingCourse] = reactExports.useState(false);
  const [programs, setPrograms] = reactExports.useState([]);
  const [staff, setStaff] = reactExports.useState([]);
  const [faculties, setFaculties] = reactExports.useState([]);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    course_code: "",
    course_unit: 0,
    price: "0",
    course_type: "Core",
    course_level: 100,
    semester: "1ST",
    staff_id: 0,
    program_id: 0,
    faculty_id: 0,
    currency: "NGN",
    owner_type: "wpu",
    is_marketplace: false,
    marketplace_status: null,
    owner_id: null
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (open) {
      fetchProgramsStaffAndFaculties();
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (open && courseId) {
      fetchCourse();
    }
  }, [open, courseId]);
  const fetchProgramsStaffAndFaculties = async () => {
    setFetching(true);
    try {
      const [programsResponse, staffResponse, facultiesResponse] = await Promise.all([
        getPrograms({ limit: 1e3 }),
        getStaff({ limit: 1e3 }),
        getFaculties({ limit: 1e3 })
      ]);
      setPrograms(programsResponse.data.programs.map((p) => ({ id: p.id, title: p.title })));
      setStaff(staffResponse.data.staff.map((s) => ({ id: s.id, full_name: s.full_name })));
      setFaculties(facultiesResponse.data.faculties);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load programs, staff, and faculties");
    } finally {
      setFetching(false);
    }
  };
  const fetchCourse = async () => {
    if (!courseId) return;
    setFetchingCourse(true);
    try {
      const response = await getCourse(courseId);
      if (response.status && response.data) {
        const course = response.data;
        setFormData({
          title: course.title || "",
          course_code: course.course_code || "",
          course_unit: course.course_unit || 0,
          price: course.price || "0",
          course_type: course.course_type || "Core",
          course_level: course.course_level || 100,
          semester: course.semester || "1ST",
          staff_id: course.staff_id || 0,
          program_id: course.program_id || 0,
          faculty_id: course.faculty_id || 0,
          currency: course.currency || "NGN",
          owner_type: course.owner_type || "wpu",
          is_marketplace: course.is_marketplace || false,
          marketplace_status: course.marketplace_status || null,
          owner_id: course.owner_id || null
        });
      } else {
        throw new Error("Invalid course data received");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to fetch course details");
      onOpenChange(false);
    } finally {
      setFetchingCourse(false);
    }
  };
  reactExports.useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        course_code: "",
        course_unit: 0,
        price: "0",
        course_type: "Core",
        course_level: 100,
        semester: "1ST",
        staff_id: 0,
        program_id: 0,
        faculty_id: 0,
        currency: "NGN",
        owner_type: "wpu",
        is_marketplace: false,
        marketplace_status: null,
        owner_id: null
      });
      setErrors({});
    }
  }, [open]);
  const validateForm = () => {
    const newErrors = {};
    if (formData.title !== void 0 && !formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (formData.course_code !== void 0 && !formData.course_code.trim()) {
      newErrors.course_code = "Course code is required";
    }
    if (formData.course_unit !== void 0 && formData.course_unit <= 0) {
      newErrors.course_unit = "Course unit must be greater than 0";
    }
    if (formData.price !== void 0 && parseFloat(formData.price) < 0) {
      newErrors.price = "Price must be 0 or greater";
    }
    if (formData.staff_id !== void 0 && (!formData.staff_id || formData.staff_id === 0)) {
      newErrors.staff_id = "Please select an instructor";
    }
    if (formData.program_id !== void 0 && (!formData.program_id || formData.program_id === 0)) {
      newErrors.program_id = "Please select a program";
    }
    if (formData.faculty_id !== void 0 && (!formData.faculty_id || formData.faculty_id === 0)) {
      newErrors.faculty_id = "Please select a faculty";
    }
    if (formData.is_marketplace) {
      if (formData.marketplace_status === "published") {
        if (formData.price !== void 0 && (!formData.price || parseFloat(formData.price) <= 0)) {
          newErrors.price = "Price must be greater than 0 for published marketplace courses";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId || !validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        owner_id: formData.is_marketplace ? formData.owner_id : null
      };
      await updateCourse(courseId, submitData);
      toast.success("Course updated successfully");
      onCourseUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error(error?.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };
  const isLoading = fetching || fetchingCourse;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update course information" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: fetchingCourse ? "Loading course details..." : "Loading programs and staff..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
            "Course Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              placeholder: "e.g., Introduction to Programming",
              value: formData.title || "",
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              className: errors.title ? "border-destructive" : ""
            }
          ),
          errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "course_code", children: [
            "Course Code ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "course_code",
              placeholder: "e.g., CSC101",
              value: formData.course_code || "",
              onChange: (e) => setFormData({ ...formData, course_code: e.target.value.toUpperCase() }),
              className: errors.course_code ? "border-destructive" : ""
            }
          ),
          errors.course_code && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.course_code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "course_unit", children: [
              "Course Unit ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "course_unit",
                type: "number",
                min: "1",
                placeholder: "e.g., 3",
                value: formData.course_unit || "",
                onChange: (e) => setFormData({ ...formData, course_unit: parseInt(e.target.value) || 0 }),
                className: errors.course_unit ? "border-destructive" : ""
              }
            ),
            errors.course_unit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.course_unit })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "course_level", children: [
              "Course Level ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.course_level?.toString() || "",
                onValueChange: (value) => setFormData({ ...formData, course_level: parseInt(value) }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.course_level ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LEVELS.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: level.toString(), children: [
                    "Level ",
                    level
                  ] }, level)) })
                ]
              }
            ),
            errors.course_level && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.course_level })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "semester", children: [
              "Semester ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.semester || "",
                onValueChange: (value) => setFormData({ ...formData, semester: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.semester ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select semester" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SEMESTERS.map((semester) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: semester, children: [
                    semester,
                    " Semester"
                  ] }, semester)) })
                ]
              }
            ),
            errors.semester && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.semester })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "program", children: [
              "Program ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.program_id?.toString() || "",
                onValueChange: (value) => setFormData({ ...formData, program_id: parseInt(value) }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.program_id ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select program" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: program.id.toString(), children: program.title }, program.id)) })
                ]
              }
            ),
            errors.program_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.program_id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "faculty", children: [
              "Faculty ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.faculty_id?.toString() || "",
                onValueChange: (value) => setFormData({ ...formData, faculty_id: parseInt(value) }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.faculty_id ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select faculty" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: faculties.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 text-sm text-muted-foreground", children: "No faculties available" }) : faculties.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: faculty.id.toString(), children: faculty.name }, faculty.id)) })
                ]
              }
            ),
            errors.faculty_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.faculty_id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "staff", children: [
              "Instructor ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.staff_id?.toString() || "",
                onValueChange: (value) => setFormData({ ...formData, staff_id: parseInt(value) }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.staff_id ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select instructor" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: staff.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id.toString(), children: s.full_name }, s.id)) })
                ]
              }
            ),
            errors.staff_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.staff_id })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "course_type", children: [
              "Course Type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.course_type || "",
                onValueChange: (value) => setFormData({ ...formData, course_type: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.course_type ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select type" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COURSE_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type, children: type }, type)) })
                ]
              }
            ),
            errors.course_type && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.course_type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "price", children: [
              "Price ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "price",
                type: "number",
                min: "0",
                step: "0.01",
                placeholder: "0.00",
                value: formData.price || "",
                onChange: (e) => setFormData({ ...formData, price: e.target.value }),
                className: errors.price ? "border-destructive" : ""
              }
            ),
            errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.price })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "currency", children: [
              "Currency ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.currency || "",
                onValueChange: (value) => setFormData({ ...formData, currency: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.currency ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select currency" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCIES.map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: currency, children: currency }, currency)) })
                ]
              }
            ),
            errors.currency && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.currency })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "owner_type", children: [
              "Owner Type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.owner_type || "",
                onValueChange: (value) => setFormData({ ...formData, owner_type: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.owner_type ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select owner type" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: OWNER_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type.value, children: type.label }, type.value)) })
                ]
              }
            ),
            errors.owner_type && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.owner_type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "is_marketplace", children: "List on Marketplace" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.is_marketplace ? "true" : "false",
                onValueChange: (value) => {
                  const isMarketplace = value === "true";
                  setFormData({
                    ...formData,
                    is_marketplace: isMarketplace,
                    marketplace_status: isMarketplace ? formData.marketplace_status || "draft" : null,
                    owner_id: isMarketplace ? formData.owner_id : null
                  });
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "false", children: "No" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "true", children: "Yes" })
                  ] })
                ]
              }
            ),
            formData.is_marketplace && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600", children: "Marketplace courses require payment from all students" })
          ] })
        ] }),
        formData.is_marketplace && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "marketplace_status", children: "Marketplace Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: formData.marketplace_status || "draft",
              onValueChange: (value) => {
                const status = value === "draft" ? "draft" : value === "published" ? "published" : null;
                setFormData({
                  ...formData,
                  marketplace_status: status
                });
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select status" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MARKETPLACE_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status.value, children: status.label }, status.value)) })
              ]
            }
          ),
          formData.marketplace_status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600", children: "Published courses require price > 0" })
        ] }),
        formData.is_marketplace && formData.owner_type !== "wpu" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "owner_id", children: [
            "Owner ID ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "owner_id",
              type: "number",
              min: "1",
              placeholder: "Enter owner ID",
              value: formData.owner_id || "",
              onChange: (e) => setFormData({ ...formData, owner_id: parseInt(e.target.value) || null }),
              className: errors.owner_id ? "border-destructive" : ""
            }
          ),
          errors.owner_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.owner_id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Required when course is in marketplace (non-WPU)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: loading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Updating..." : "Update Course" })
      ] })
    ] }) })
  ] }) });
}

export { EditCourseDialog as default };
