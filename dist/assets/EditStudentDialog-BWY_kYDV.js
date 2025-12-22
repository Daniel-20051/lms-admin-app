import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, c as LoaderCircle, q as Save, bg as RefreshCw } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { Z as getStudent, _ as updateStudent } from './admin-BVl3HTxX.js';
import { g as getPrograms } from './programs-a0V4l-AP.js';
import './index-BHy36ITo.js';

const LEVEL_OPTIONS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3];
const CURRENCY_OPTIONS = ["NGN", "USD"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];
function EditStudentDialog({
  open,
  onOpenChange,
  studentId,
  onStudentUpdated
}) {
  const [student, setStudent] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [programs, setPrograms] = reactExports.useState([]);
  const [fetchingPrograms, setFetchingPrograms] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    fname: "",
    lname: "",
    level: 100,
    phone: "",
    matric_number: "",
    program_id: void 0,
    foreign_student: 0,
    dob: null,
    gender: null,
    currency: "NGN",
    state_origin: null,
    address: null,
    country: ""
  });
  reactExports.useEffect(() => {
    if (open && studentId) {
      setStudent(null);
      setError(null);
      setLoading(false);
      setSaving(false);
      setFormData({
        fname: "",
        lname: "",
        level: 100,
        phone: "",
        matric_number: "",
        program_id: void 0,
        foreign_student: 0,
        dob: null,
        gender: null,
        currency: "NGN",
        state_origin: null,
        address: null,
        country: ""
      });
      fetchPrograms();
      const timer = setTimeout(() => {
        fetchStudentDetails();
      }, 50);
      return () => clearTimeout(timer);
    }
    if (!open) {
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    }
    return () => {
      setStudent(null);
      setError(null);
      setLoading(false);
      setSaving(false);
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    };
  }, [open, studentId]);
  const fetchPrograms = async () => {
    try {
      setFetchingPrograms(true);
      const response = await getPrograms({ limit: 1e3 });
      if (response.success) {
        setPrograms(response.data.programs);
      }
    } catch (error2) {
      console.error("Error fetching programs:", error2);
      toast.error("Failed to load programs");
    } finally {
      setFetchingPrograms(false);
    }
  };
  const fetchStudentDetails = async () => {
    if (!studentId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await getStudent(studentId);
      if (response.success) {
        const studentData = response.data.student;
        setStudent(studentData);
        const dobFormatted = studentData.dob ? new Date(studentData.dob).toISOString().split("T")[0] : null;
        setFormData({
          fname: studentData.fname || "",
          lname: studentData.lname || "",
          level: studentData.level || 100,
          phone: studentData.phone || "",
          matric_number: studentData.matric_number || "",
          program_id: studentData.program_id || void 0,
          foreign_student: studentData.foreign_student !== void 0 ? studentData.foreign_student : 0,
          dob: dobFormatted,
          gender: studentData.gender || null,
          currency: studentData.currency || "NGN",
          state_origin: studentData.state_origin || null,
          address: studentData.address || null,
          country: studentData.country || ""
        });
      }
    } catch (error2) {
      console.error("Error fetching student details:", error2);
      const errorMessage = error2.response?.data?.message || "Failed to fetch student details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" || name === "program_id" || name === "foreign_student" ? value ? parseInt(value) : void 0 : value === "" ? null : value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) return;
    try {
      setSaving(true);
      const response = await updateStudent(studentId, formData);
      if (response.success) {
        toast.success(response.message);
        onStudentUpdated({ ...formData, id: studentId });
        onOpenChange(false);
      }
    } catch (error2) {
      console.error("Error updating student:", error2);
      toast.error(error2.response?.data?.message || "Failed to update student");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      onInteractOutside: (e) => {
        if (loading || saving) {
          e.preventDefault();
        }
      },
      onEscapeKeyDown: (e) => {
        if (saving) {
          e.preventDefault();
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update student information. Email cannot be changed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
        ] }) : student ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fname", children: "First Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fname",
                    name: "fname",
                    value: formData.fname,
                    onChange: handleInputChange,
                    placeholder: "Enter first name",
                    required: true,
                    disabled: saving
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lname", children: "Last Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "lname",
                    name: "lname",
                    value: formData.lname,
                    onChange: handleInputChange,
                    placeholder: "Enter last name",
                    required: true,
                    disabled: saving
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  value: student.email,
                  disabled: true,
                  className: "bg-muted"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email cannot be changed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "matric_number", children: "Matric Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "matric_number",
                  name: "matric_number",
                  value: formData.matric_number,
                  onChange: handleInputChange,
                  placeholder: "e.g., WPU/2024/001",
                  disabled: saving
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "level", children: "Level *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: formData.level?.toString() || "",
                    onValueChange: (value) => handleSelectChange("level", value),
                    disabled: saving,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LEVEL_OPTIONS.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: level.toString(), children: level }, level)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "phone",
                    name: "phone",
                    value: formData.phone,
                    onChange: handleInputChange,
                    placeholder: "+234801234567",
                    disabled: saving
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "program_id", children: "Program *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: formData.program_id?.toString() || "",
                    onValueChange: (value) => handleSelectChange("program_id", value),
                    disabled: saving || fetchingPrograms,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: fetchingPrograms ? "Loading programs..." : "Select program" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: program.id.toString(), children: program.title }, program.id)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "currency", children: "Currency *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: formData.currency || "NGN",
                    onValueChange: (value) => handleSelectChange("currency", value),
                    disabled: saving,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select currency" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCY_OPTIONS.map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: currency, children: currency }, currency)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gender", children: "Gender" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: formData.gender || void 0,
                    onValueChange: (value) => handleSelectChange("gender", value),
                    disabled: saving,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENDER_OPTIONS.map((gender) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: gender, children: gender }, gender)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dob", children: "Date of Birth" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "dob",
                    name: "dob",
                    type: "date",
                    value: formData.dob || "",
                    onChange: handleInputChange,
                    disabled: saving
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: "Country" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "country",
                    name: "country",
                    value: formData.country || "",
                    onChange: handleInputChange,
                    placeholder: "Enter country",
                    disabled: saving
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state_origin", children: "State of Origin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "state_origin",
                    name: "state_origin",
                    value: formData.state_origin || "",
                    onChange: handleInputChange,
                    placeholder: "Enter state of origin",
                    disabled: saving
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "address",
                  name: "address",
                  value: formData.address || "",
                  onChange: handleInputChange,
                  placeholder: "Enter address",
                  disabled: saving
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "foreign_student", children: "Foreign Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.foreign_student?.toString() || "0",
                  onValueChange: (value) => handleSelectChange("foreign_student", value),
                  disabled: saving,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "0", children: "No" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1", children: "Yes" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => onOpenChange(false),
                disabled: saving,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
              "Save Changes"
            ] }) })
          ] })
        ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium mb-2", children: "Failed to fetch student details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => {
                setError(null);
                fetchStudentDetails();
              },
              variant: "outline",
              size: "sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-2 h-4 w-4" }),
                "Try again"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 text-center text-muted-foreground", children: "No student data available" }) })
      ]
    }
  ) });
}

export { EditStudentDialog as default };
