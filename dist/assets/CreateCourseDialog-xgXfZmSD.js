import { r as reactExports, a7 as getFaculties, t as toast, j as jsxRuntimeExports, B as Button } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { e as createCourse } from './courses-DmFTm-zX.js';
import { g as getPrograms } from './programs-a0V4l-AP.js';
import { f as getStaff } from './admin-BVl3HTxX.js';
import { A as Api } from './index-DSZNHD2t.js';
import './index-BHy36ITo.js';
import './quiz-DTu6yipn.js';
import './exams-CpQ4GBAC.js';

const COURSE_TYPES = ["Core", "Elective", "General"];
const LEVELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3];
const SEMESTERS = ["1ST", "2ND"];
const CURRENCIES = ["NGN", "USD"];
const OWNER_TYPES = [
  { value: "wpu", label: "WPU" },
  { value: "sole_tutor", label: "Sole Tutor" },
  { value: "organization", label: "Organization" }
];
const MARKETPLACE_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" }
];
function CreateCourseDialog({
  open,
  onOpenChange,
  onCourseCreated,
  initialProgramId,
  initialFacultyId
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [fetching, setFetching] = reactExports.useState(false);
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
      loadActiveSemester();
    }
  }, [open]);
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
      if (initialProgramId || initialFacultyId) {
        setFormData((prev) => ({
          ...prev,
          program_id: initialProgramId || prev.program_id,
          faculty_id: initialFacultyId || prev.faculty_id
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load programs, staff, and faculties");
    } finally {
      setFetching(false);
    }
  };
  const loadActiveSemester = async () => {
    try {
      const api = new Api();
      const response = await api.Getsessions();
      const items = response?.data?.data ?? response?.data ?? [];
      if (Array.isArray(items) && items.length > 0) {
        const active = items.find((it) => it.status === "Active");
        if (active?.semester) {
          setFormData((prev) => ({
            ...prev,
            semester: active.semester
          }));
        }
      }
    } catch (error) {
      console.error("Error loading active semester:", error);
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
    } else if (open && (initialProgramId || initialFacultyId)) {
      setFormData((prev) => ({
        ...prev,
        program_id: initialProgramId || prev.program_id,
        faculty_id: initialFacultyId || prev.faculty_id
      }));
    }
  }, [open, initialProgramId, initialFacultyId]);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.course_code.trim()) {
      newErrors.course_code = "Course code is required";
    }
    if (!formData.course_unit || formData.course_unit <= 0) {
      newErrors.course_unit = "Course unit must be greater than 0";
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      newErrors.price = "Price must be 0 or greater";
    }
    if (!formData.course_type) {
      newErrors.course_type = "Course type is required";
    }
    if (!formData.course_level) {
      newErrors.course_level = "Course level is required";
    }
    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    }
    if (!formData.staff_id || formData.staff_id === 0) {
      newErrors.staff_id = "Please select an instructor";
    }
    if (!formData.program_id || formData.program_id === 0) {
      newErrors.program_id = "Please select a program";
    }
    if (!formData.faculty_id || formData.faculty_id === 0) {
      newErrors.faculty_id = "Please select a faculty";
    }
    if (!formData.currency) {
      newErrors.currency = "Currency is required";
    }
    if (!formData.owner_type) {
      newErrors.owner_type = "Owner type is required";
    }
    if (formData.is_marketplace) {
      if (formData.marketplace_status === "published") {
        if (!formData.price || parseFloat(formData.price) <= 0) {
          newErrors.price = "Price must be greater than 0 for published marketplace courses";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        owner_id: formData.is_marketplace ? formData.owner_id : null
      };
      await createCourse(submitData);
      toast.success("Course created successfully");
      onCourseCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error(error?.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new course to the system" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: fetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading programs, staff, and faculties..." })
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
              value: formData.title,
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
              value: formData.course_code,
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
                value: formData.course_level.toString(),
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
                value: formData.semester,
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
                value: formData.program_id.toString(),
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
                value: formData.faculty_id.toString(),
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
                value: formData.staff_id.toString(),
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
                value: formData.course_type,
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
                value: formData.price,
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
                value: formData.currency,
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
                value: formData.owner_type,
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Create Course" })
      ] })
    ] }) })
  ] }) });
}

export { CreateCourseDialog as default };
