import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, c as LoaderCircle, a1 as Plus } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { $ as createStudent } from './admin-BVl3HTxX.js';
import { g as getPrograms } from './programs-a0V4l-AP.js';
import './index-BHy36ITo.js';

function CreateStudentDialog({
  open,
  onOpenChange,
  onStudentCreated
}) {
  const [creating, setCreating] = reactExports.useState(false);
  const [fetching, setFetching] = reactExports.useState(false);
  const [programs, setPrograms] = reactExports.useState([]);
  const [formData, setFormData] = reactExports.useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    matric_number: "",
    level: 100,
    program_id: 1,
    currency: "NGN",
    referral_code: "",
    designated_institute: 0,
    foreign_student: 0
  });
  reactExports.useEffect(() => {
    if (open) {
      fetchPrograms();
    }
  }, [open]);
  const fetchPrograms = async () => {
    setFetching(true);
    try {
      const programsResponse = await getPrograms({ limit: 1e3 });
      setPrograms(programsResponse.data.programs.map((p) => ({ id: p.id, title: p.title })));
      if (programsResponse.data.programs.length > 0 && !formData.program_id) {
        setFormData((prev) => ({ ...prev, program_id: programsResponse.data.programs[0].id }));
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to load programs");
    } finally {
      setFetching(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" || name === "program_id" || name === "designated_institute" || name === "foreign_student" ? parseInt(value) || 0 : value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fname || !formData.lname) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!formData.program_id || formData.program_id < 1) {
      toast.error("Please select a program");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      setCreating(true);
      const response = await createStudent(formData);
      if (response.success) {
        toast.success(response.message || "Student created successfully");
        const defaultProgramId = programs.length > 0 ? programs[0].id : 1;
        setFormData({
          email: "",
          password: "",
          fname: "",
          lname: "",
          matric_number: "",
          level: 100,
          program_id: defaultProgramId,
          currency: "NGN",
          referral_code: "",
          designated_institute: 0,
          foreign_student: 0
        });
        onStudentCreated();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error creating student:", error);
      toast.error(error.response?.data?.message || "Failed to create student");
    } finally {
      setCreating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      onInteractOutside: (e) => {
        if (creating) {
          e.preventDefault();
        }
      },
      onEscapeKeyDown: (e) => {
        if (creating) {
          e.preventDefault();
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a new student account. All fields marked with * are required." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4 px-6", children: [
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
                    disabled: creating
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
                    disabled: creating
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    name: "email",
                    type: "email",
                    value: formData.email,
                    onChange: handleInputChange,
                    placeholder: "student@example.com",
                    required: true,
                    disabled: creating
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    name: "password",
                    type: "password",
                    value: formData.password,
                    onChange: handleInputChange,
                    placeholder: "Minimum 6 characters",
                    required: true,
                    minLength: 6,
                    disabled: creating
                  }
                )
              ] })
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
                  placeholder: "e.g., WPU/2024/999",
                  disabled: creating
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Optional. Will be auto-generated if left empty." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "level", children: "Level *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: formData.level.toString(),
                    onValueChange: (value) => setFormData({ ...formData, level: parseInt(value) }),
                    disabled: creating,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "level", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "50", children: "50 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "100", children: "100 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "200", children: "200 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "300", children: "300 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "400", children: "400 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "500", children: "500 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "600", children: "600 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "700", children: "700 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "800", children: "800 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "900", children: "900 Level" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1000", children: "1000 Level" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "program_id", children: "Program *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: formData.program_id?.toString() || "",
                    onValueChange: (value) => setFormData({ ...formData, program_id: parseInt(value) }),
                    disabled: creating || fetching,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "program_id", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: fetching ? "Loading programs..." : "Select a program" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: program.id.toString(), children: program.title }, program.id)) })
                    ]
                  }
                ),
                programs.length === 0 && !fetching && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No programs available" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-3", children: "Optional Fields" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "currency", children: "Currency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: formData.currency,
                      onValueChange: (value) => setFormData({ ...formData, currency: value }),
                      disabled: creating,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "currency", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select currency" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "NGN", children: "NGN" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "USD", children: "USD" })
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "referral_code", children: "Referral Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "referral_code",
                      name: "referral_code",
                      value: formData.referral_code,
                      onChange: handleInputChange,
                      placeholder: "Enter referral code",
                      disabled: creating
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "designated_institute", children: "Designated Institute" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "designated_institute",
                      name: "designated_institute",
                      type: "number",
                      min: "0",
                      value: formData.designated_institute,
                      onChange: handleInputChange,
                      placeholder: "0",
                      disabled: creating
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "foreign_student", children: "Foreign Student" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: formData.foreign_student?.toString() || "0",
                      onValueChange: (value) => setFormData({ ...formData, foreign_student: parseInt(value) }),
                      disabled: creating,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "foreign_student", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select option" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "0", children: "No (Domestic)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1", children: "Yes (Foreign)" })
                        ] })
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => onOpenChange(false),
                disabled: creating,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: creating, children: creating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Creating..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
              "Create Student"
            ] }) })
          ] })
        ] })
      ]
    }
  ) });
}

export { CreateStudentDialog as default };
