import { r as reactExports, j as jsxRuntimeExports, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { c as createSemester } from './semesters-oK3Qf9Wp.js';
import './index-BHy36ITo.js';

const SEMESTERS = ["1ST", "2ND"];
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" }
];
function CreateSemesterDialog({
  open,
  onOpenChange,
  onSemesterCreated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    academic_year: "",
    semester: "1ST",
    start_date: "",
    end_date: "",
    status: "pending"
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!open) {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const nextYear = currentYear + 1;
      const defaultAcademicYear = `${currentYear}/${nextYear}`;
      setFormData({
        academic_year: defaultAcademicYear,
        semester: "1ST",
        start_date: "",
        end_date: "",
        status: "pending"
      });
      setErrors({});
    }
  }, [open]);
  const validateForm = () => {
    const newErrors = {};
    const academicYearPattern = /^\d{4}\/\d{4}$/;
    if (!formData.academic_year.trim()) {
      newErrors.academic_year = "Academic year is required";
    } else if (!academicYearPattern.test(formData.academic_year)) {
      newErrors.academic_year = "Academic year must be in format YYYY/YYYY (e.g., 2024/2025)";
    }
    if (!formData.semester) {
      newErrors.semester = "Semester is required";
    }
    if (!formData.start_date) {
      newErrors.start_date = "Start date is required";
    }
    if (!formData.end_date) {
      newErrors.end_date = "End date is required";
    }
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      if (endDate <= startDate) {
        newErrors.end_date = "End date must be after start date";
      }
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
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
      const semesterValue = formData.semester === "1ST" ? "1" : formData.semester === "2ND" ? "2" : formData.semester;
      const submitData = {
        ...formData,
        semester: semesterValue
      };
      await createSemester(submitData);
      toast.success("Semester created successfully");
      onSemesterCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating semester:", error);
      toast.error(error?.response?.data?.message || "Failed to create semester");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new academic semester to the system" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "academic_year", children: [
            "Academic Year ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "academic_year",
              placeholder: "e.g., 2024/2025",
              value: formData.academic_year,
              onChange: (e) => setFormData({ ...formData, academic_year: e.target.value }),
              className: errors.academic_year ? "border-destructive" : ""
            }
          ),
          errors.academic_year && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.academic_year }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Format: YYYY/YYYY (e.g., 2024/2025)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
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
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "status", children: [
              "Status ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.status,
                onValueChange: (value) => setFormData({ ...formData, status: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: errors.status ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select status" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
                ]
              }
            ),
            errors.status && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "start_date", children: [
              "Start Date ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "start_date",
                type: "date",
                value: formData.start_date,
                onChange: (e) => setFormData({ ...formData, start_date: e.target.value }),
                className: errors.start_date ? "border-destructive" : ""
              }
            ),
            errors.start_date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.start_date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "end_date", children: [
              "End Date ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "end_date",
                type: "date",
                value: formData.end_date,
                onChange: (e) => setFormData({ ...formData, end_date: e.target.value }),
                min: formData.start_date || void 0,
                className: errors.end_date ? "border-destructive" : ""
              }
            ),
            errors.end_date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.end_date })
          ] })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Create Semester" })
      ] })
    ] })
  ] }) });
}

export { CreateSemesterDialog as default };
