import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { a as getSemester, u as updateSemester } from './semesters-oK3Qf9Wp.js';
import './index-BHy36ITo.js';

const SEMESTERS = ["1ST", "2ND"];
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" }
];
function EditSemesterDialog({
  open,
  onOpenChange,
  semesterId,
  onSemesterUpdated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [fetching, setFetching] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    academic_year: "",
    semester: "",
    start_date: "",
    end_date: "",
    status: "pending"
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (open && semesterId) {
      fetchSemester();
    }
  }, [open, semesterId]);
  const fetchSemester = async () => {
    if (!semesterId) return;
    setFetching(true);
    try {
      const response = await getSemester(semesterId);
      const semester = response.data.semester;
      const semesterValue = semester.semester === "1" ? "1ST" : semester.semester === "2" ? "2ND" : semester.semester;
      setFormData({
        academic_year: semester.academic_year,
        semester: semesterValue,
        start_date: semester.start_date,
        end_date: semester.end_date,
        status: semester.status.toLowerCase()
      });
    } catch (error) {
      console.error("Error fetching semester:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch semester details");
      onOpenChange(false);
    } finally {
      setFetching(false);
    }
  };
  reactExports.useEffect(() => {
    if (!open) {
      setFormData({
        academic_year: "",
        semester: "",
        start_date: "",
        end_date: "",
        status: "pending"
      });
      setErrors({});
    }
  }, [open]);
  const validateForm = () => {
    const newErrors = {};
    if (formData.academic_year !== void 0) {
      const academicYearPattern = /^\d{4}\/\d{4}$/;
      if (!formData.academic_year.trim()) {
        newErrors.academic_year = "Academic year is required";
      } else if (!academicYearPattern.test(formData.academic_year)) {
        newErrors.academic_year = "Academic year must be in format YYYY/YYYY (e.g., 2024/2025)";
      }
    }
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      if (endDate <= startDate) {
        newErrors.end_date = "End date must be after start date";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!semesterId || !validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const updateData = { ...formData };
      if (updateData.semester) {
        updateData.semester = updateData.semester === "1ST" ? "1" : updateData.semester === "2ND" ? "2" : updateData.semester;
      }
      await updateSemester(semesterId, updateData);
      toast.success("Semester updated successfully");
      onSemesterUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating semester:", error);
      toast.error(error?.response?.data?.message || "Failed to update semester");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update semester information" })
    ] }),
    fetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading semester details..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
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
              value: formData.academic_year || "",
              onChange: (e) => setFormData({ ...formData, academic_year: e.target.value }),
              className: errors.academic_year ? "border-destructive" : ""
            }
          ),
          errors.academic_year && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.academic_year })
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
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "status", children: [
              "Status ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.status || "",
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
                value: formData.start_date || "",
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
                value: formData.end_date || "",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Updating..." : "Update Semester" })
      ] })
    ] })
  ] }) });
}

export { EditSemesterDialog as default };
