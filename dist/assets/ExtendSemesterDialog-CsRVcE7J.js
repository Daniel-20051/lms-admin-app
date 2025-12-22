import { r as reactExports, j as jsxRuntimeExports, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { e as extendSemester } from './semesters-oK3Qf9Wp.js';

function ExtendSemesterDialog({
  open,
  onOpenChange,
  selectedSemester,
  onSemesterExtended,
  actionLoading,
  setActionLoading
}) {
  const [newEndDate, setNewEndDate] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (open && selectedSemester) {
      setNewEndDate("");
      setReason("");
      setErrors({});
    }
  }, [open, selectedSemester]);
  const validateForm = () => {
    const newErrors = {};
    if (!newEndDate) {
      newErrors.new_end_date = "New end date is required";
    } else if (selectedSemester) {
      const currentEndDate = new Date(selectedSemester.end_date);
      const newEnd = new Date(newEndDate);
      if (newEnd <= currentEndDate) {
        newErrors.new_end_date = "New end date must be after current end date";
      }
    }
    if (!reason.trim()) {
      newErrors.reason = "Reason is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSemester || !validateForm()) {
      return;
    }
    setActionLoading(true);
    try {
      await extendSemester(selectedSemester.id, {
        new_end_date: newEndDate,
        reason: reason.trim()
      });
      toast.success("Semester extended successfully");
      onSemesterExtended();
      onOpenChange(false);
    } catch (error) {
      console.error("Error extending semester:", error);
      toast.error(error?.response?.data?.message || "Failed to extend semester");
    } finally {
      setActionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Extend Semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        'Extend the end date for "',
        selectedSemester?.academic_year,
        " - ",
        selectedSemester?.semester,
        '"'
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        selectedSemester && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-muted rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Current end date: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: new Date(selectedSemester.end_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "new_end_date", children: [
            "New End Date ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "new_end_date",
              type: "date",
              value: newEndDate,
              onChange: (e) => {
                setNewEndDate(e.target.value);
                setErrors({ ...errors, new_end_date: void 0 });
              },
              min: selectedSemester ? selectedSemester.end_date : void 0,
              className: errors.new_end_date ? "border-destructive" : ""
            }
          ),
          errors.new_end_date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.new_end_date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reason", children: [
            "Reason ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "reason",
              placeholder: "e.g., Extended due to holidays",
              value: reason,
              onChange: (e) => {
                setReason(e.target.value);
                setErrors({ ...errors, reason: void 0 });
              },
              className: errors.reason ? "border-destructive" : "",
              rows: 3
            }
          ),
          errors.reason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.reason })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: actionLoading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: actionLoading, children: actionLoading ? "Extending..." : "Extend Semester" })
      ] })
    ] })
  ] }) });
}

export { ExtendSemesterDialog as default };
