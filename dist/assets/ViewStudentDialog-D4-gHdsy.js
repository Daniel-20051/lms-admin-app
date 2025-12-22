import { r as reactExports, bb as sanitizeCurrency, j as jsxRuntimeExports, au as Wallet, bc as formatCurrency, as as cn, T as TrendingUp, bd as TrendingDown, g as CircleAlert, B as Button, t as toast, a as useAuth, be as sanitizeString, x as User, F as FileText, k as BookOpen, n as Award, at as CreditCard, M as Mail, P as Phone, y as Calendar, bf as MapPin, G as GraduationCap, l as Building2, aI as ChevronDown, a0 as ChevronRight, bg as RefreshCw, I as UserCheck, m as UserX } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { C as Card, d as CardContent } from './card-DKXLAlrm.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { X as createWalletTransaction, Y as getStudentFullDetails } from './admin-BVl3HTxX.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import './index-BHy36ITo.js';

function ManageWalletDialog({
  open,
  onOpenChange,
  studentId,
  studentName,
  currentBalance,
  currency,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedCurrency, setSelectedCurrency] = reactExports.useState(sanitizeCurrency(currency));
  const [formData, setFormData] = reactExports.useState({
    type: "Credit",
    amount: 0,
    service_name: "",
    ref: "",
    notes: "",
    currency: sanitizeCurrency(currency)
  });
  const [errors, setErrors] = reactExports.useState({});
  const validCurrency = sanitizeCurrency(currency);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.service_name.trim()) {
      newErrors.service_name = "Service name is required";
    }
    if (formData.type === "Debit" && formData.amount > currentBalance) {
      newErrors.amount = `Insufficient balance. Current balance: ${formatCurrency(currentBalance, selectedCurrency)}`;
    }
    if (formData.amount > 1e5) {
      const confirmed = window.confirm(
        `You are about to ${formData.type.toLowerCase()} a large amount (${formatCurrency(formData.amount, selectedCurrency)}). Are you sure you want to continue?`
      );
      if (!confirmed) {
        newErrors.amount = "Transaction cancelled";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateNewBalance = () => {
    if (formData.type === "Credit") {
      return currentBalance + (formData.amount || 0);
    } else {
      return currentBalance - (formData.amount || 0);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      toast.error("Student ID is required");
      return;
    }
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      const transactionData = {
        ...formData,
        currency: selectedCurrency
      };
      const response = await createWalletTransaction(studentId, transactionData);
      if (response.success) {
        toast.success(response.message || "Wallet transaction processed successfully", {
          description: `New balance: ${formatCurrency(response.data.wallet.new_balance, selectedCurrency)}`
        });
        setFormData({
          type: "Credit",
          amount: 0,
          service_name: "",
          ref: "",
          notes: "",
          currency: validCurrency
        });
        setSelectedCurrency(validCurrency);
        setErrors({});
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error creating wallet transaction:", error);
      const errorMessage = error.response?.data?.message || "Failed to process wallet transaction";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setFormData({
      type: "Credit",
      amount: 0,
      service_name: "",
      ref: "",
      notes: "",
      currency: validCurrency
    });
    setSelectedCurrency(validCurrency);
    setErrors({});
    onOpenChange(false);
  };
  const newBalance = calculateNewBalance();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }),
        "Manage Student Wallet"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "Manually credit or debit wallet for ",
        studentName
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-muted/50 p-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Current Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: formatCurrency(currentBalance, validCurrency) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-8 w-8 text-muted-foreground" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Transaction Type *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setFormData({ ...formData, type: "Credit" }),
                className: cn(
                  "flex items-center gap-2 rounded-md border p-3 transition-all",
                  formData.type === "Credit" ? "border-green-600 bg-green-50 dark:bg-green-950 ring-2 ring-green-600" : "hover:bg-muted/50"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                        formData.type === "Credit" ? "border-green-600" : "border-muted-foreground"
                      ),
                      children: formData.type === "Credit" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-green-600" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Credit" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setFormData({ ...formData, type: "Debit" }),
                className: cn(
                  "flex items-center gap-2 rounded-md border p-3 transition-all",
                  formData.type === "Debit" ? "border-red-600 bg-red-50 dark:bg-red-950 ring-2 ring-red-600" : "hover:bg-muted/50"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                        formData.type === "Debit" ? "border-red-600" : "border-muted-foreground"
                      ),
                      children: formData.type === "Debit" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-red-600" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-red-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Debit" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "currency", children: "Currency *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedCurrency,
              onValueChange: (value) => {
                setSelectedCurrency(value);
                setFormData({ ...formData, currency: value });
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "currency", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select currency" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "NGN", children: "NGN (Nigerian Naira)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "USD", children: "USD (US Dollar)" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Select the currency for this transaction. Currently supporting NGN and USD." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "amount", children: [
            "Amount (",
            selectedCurrency,
            ") *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "amount",
              type: "number",
              placeholder: "Enter amount",
              min: "0",
              step: "0.01",
              value: formData.amount || "",
              onChange: (e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 }),
              className: errors.amount ? "border-red-500" : ""
            }
          ),
          errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-500 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
            errors.amount
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "service_name", children: "Service Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "service_name",
              type: "text",
              placeholder: "e.g., Refund, Manual Credit, Adjustment",
              value: formData.service_name,
              onChange: (e) => setFormData({ ...formData, service_name: e.target.value }),
              className: errors.service_name ? "border-red-500" : ""
            }
          ),
          errors.service_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-500 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
            errors.service_name
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ref", children: "Reference (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ref",
              type: "text",
              placeholder: "e.g., REF-2025-001",
              value: formData.ref,
              onChange: (e) => setFormData({ ...formData, ref: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Notes (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "notes",
              placeholder: "Add any additional notes or reasons for this transaction",
              value: formData.notes,
              onChange: (e) => setFormData({ ...formData, notes: e.target.value }),
              rows: 3
            }
          )
        ] }),
        formData.amount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border bg-muted/20 p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Balance Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Current Balance:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatCurrency(currentBalance, selectedCurrency) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Change:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `font-medium ${formData.type === "Credit" ? "text-green-600" : "text-red-600"}`,
                children: [
                  formData.type === "Credit" ? "+" : "-",
                  formatCurrency(formData.amount, selectedCurrency)
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm pt-2 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "New Balance:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", children: formatCurrency(newBalance, selectedCurrency) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleClose,
              disabled: loading,
              className: "flex-1",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "flex-1", children: loading ? "Processing..." : `Confirm ${formData.type}` })
        ] })
      ] })
    ] })
  ] }) });
}

function ViewStudentDialog({
  open,
  onOpenChange,
  studentId
}) {
  const { isSuperAdmin } = useAuth();
  const [studentData, setStudentData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [manageWalletOpen, setManageWalletOpen] = reactExports.useState(false);
  const [expandedRegistrations, setExpandedRegistrations] = reactExports.useState(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    if (open && studentId) {
      setStudentData(null);
      setError(null);
      setLoading(false);
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
      setStudentData(null);
      setError(null);
      setLoading(false);
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    };
  }, [open, studentId]);
  const fetchStudentDetails = async () => {
    if (!studentId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await getStudentFullDetails(studentId);
      if (response.success) {
        setStudentData(response.data);
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
  const getStatusBadge = (status) => {
    if (status === "active" || status === "Active") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3 w-3 mr-1" }),
        "Active"
      ] });
    } else if (status === "inactive" || status === "Inactive") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-800 hover:bg-red-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-3 w-3 mr-1" }),
        "Inactive"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-5xl max-h-[90vh] overflow-y-auto",
        onInteractOutside: (e) => {
          if (loading) {
            e.preventDefault();
          }
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: studentData?.personalInformation ? `Student Profile: ${sanitizeString(studentData.personalInformation.fname)} ${sanitizeString(studentData.personalInformation.mname || "")} ${sanitizeString(studentData.personalInformation.lname)}`.trim() : "Student Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Comprehensive student information and academic records" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
          ] }) : studentData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "personal", className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "personal", className: "flex items-center gap-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
                "Personal"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "registrations", className: "flex items-center gap-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3" }),
                "Registrations"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "courses", className: "flex items-center gap-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
                "Courses"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "exams", className: "flex items-center gap-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3 w-3" }),
                "Exams"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "wallet", className: "flex items-center gap-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3 w-3" }),
                "Wallet"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "payments", className: "flex items-center gap-1 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3 w-3" }),
                "Payments"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "personal", className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Personal Information" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Full Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-medium mt-1", children: [
                      sanitizeString(studentData.personalInformation.fname),
                      " ",
                      sanitizeString(studentData.personalInformation.mname || ""),
                      " ",
                      sanitizeString(studentData.personalInformation.lname)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: getStatusBadge(studentData.personalInformation.admin_status) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Email" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: sanitizeString(studentData.personalInformation.email) })
                    ] })
                  ] }),
                  studentData.personalInformation.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Phone" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: sanitizeString(studentData.personalInformation.phone) })
                    ] })
                  ] }),
                  studentData.personalInformation.gender && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Gender" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: sanitizeString(studentData.personalInformation.gender) })
                  ] }),
                  studentData.personalInformation.dob && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Date of Birth" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: formatDate(studentData.personalInformation.dob) })
                    ] })
                  ] }),
                  studentData.personalInformation.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: sanitizeString(studentData.personalInformation.address) })
                    ] })
                  ] }),
                  studentData.personalInformation.state_origin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "State of Origin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: sanitizeString(studentData.personalInformation.state_origin) })
                  ] }),
                  studentData.personalInformation.country && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Country" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: sanitizeString(studentData.personalInformation.country) })
                  ] }),
                  studentData.personalInformation.study_mode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Study Mode" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: sanitizeString(studentData.personalInformation.study_mode) })
                  ] }),
                  studentData.personalInformation.application_code && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Application Code" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-sm bg-muted px-2 py-1 rounded block mt-1 w-fit", children: studentData.personalInformation.application_code })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Academic Information" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Matric Number" }),
                    studentData.personalInformation.matric_number ? /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-sm bg-muted px-2 py-1 rounded block mt-1 w-fit", children: sanitizeString(studentData.personalInformation.matric_number) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic mt-1", children: "Not assigned" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Level" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-medium mt-1", children: [
                      sanitizeString(studentData.personalInformation.level),
                      " Level"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Faculty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: studentData.faculty?.name || "N/A" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Program" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: studentData.program?.title || "N/A" })
                  ] }),
                  studentData.personalInformation.date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Enrolled Since" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: formatDate(studentData.personalInformation.date) })
                    ] })
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "registrations", className: "space-y-4", children: studentData.registrations && studentData.registrations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium w-8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Academic Year" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Semester" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Registration Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Courses" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: studentData.registrations.map((registration, index) => {
                const isExpanded = expandedRegistrations.has(index);
                const toggleExpand = () => {
                  const newExpanded = new Set(expandedRegistrations);
                  if (isExpanded) {
                    newExpanded.delete(index);
                  } else {
                    newExpanded.add(index);
                  }
                  setExpandedRegistrations(newExpanded);
                };
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: registration.courses && registration.courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: toggleExpand,
                        className: "flex items-center justify-center w-6 h-6 rounded hover:bg-muted transition-colors",
                        "aria-label": isExpanded ? "Collapse courses" : "Expand courses",
                        children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 font-medium", children: registration.academic_year }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: registration.semester }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: formatDate(registration.registration_date) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: registration.registration_status === "registered" ? "default" : "secondary",
                        className: "text-xs capitalize",
                        children: sanitizeString(registration.registration_status)
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: registration.course_count }),
                      registration.courses && registration.courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                        "(",
                        registration.courses.length,
                        ")"
                      ] })
                    ] })
                  ] }, index),
                  isExpanded && registration.courses && registration.courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm mb-2", children: "Registered Courses:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2", children: registration.courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 p-2 rounded-md bg-background border",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: sanitizeString(course.title) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: course.course_code }) })
                          ] })
                        ]
                      },
                      course.id
                    )) })
                  ] }) }) }, `${index}-courses`)
                ] });
              }) })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No registrations found" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "courses", className: "space-y-4", children: studentData.courses && studentData.courses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: studentData.courses.map((courseGroup, groupIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold", children: [
                  courseGroup.academic_year,
                  " - ",
                  courseGroup.semester,
                  " Semester"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-auto", children: [
                  courseGroup.courses.length,
                  " ",
                  courseGroup.courses.length === 1 ? "Course" : "Courses"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Course" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Unit" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Level" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Instructor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "1st CA" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "2nd CA" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "3rd CA" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Exam" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Total" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: courseGroup.courses.map((course, courseIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: course?.title || "N/A" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-1.5 py-0.5 rounded", children: course?.course_code || "N/A" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: course?.course_type || "N/A" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: course?.course_unit || "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2 text-center", children: [
                    "Level ",
                    course?.course_level || "N/A"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: course?.instructor ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: sanitizeString(course.instructor.full_name) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "N/A" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center font-medium", children: course?.results?.first_ca ?? "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center font-medium", children: course?.results?.second_ca ?? "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center font-medium", children: course?.results?.third_ca ?? "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center font-medium", children: course?.results?.exam_score ?? "-" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center font-bold", children: course?.results?.total_score ?? "-" })
                ] }, courseIndex)) })
              ] }) })
            ] }) }, groupIndex)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No courses found" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "exams", className: "space-y-4", children: studentData.exams && studentData.exams.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Exam Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Course" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Academic Year" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Semester" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Attempt" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Started" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Submitted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Graded" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: studentData.exams.map((exam) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: exam.exam?.title || "N/A" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                  exam.exam?.course?.title || "N/A",
                  " (",
                  exam.exam?.course?.course_code || "N/A",
                  ")"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: exam.exam?.academic_year || "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: exam.exam?.semester || "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2 text-center", children: [
                  "#",
                  exam.attempt_no
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: exam.status === "graded" ? "default" : "secondary", className: "text-xs", children: exam.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2 text-center font-medium", children: [
                  exam.total_score,
                  " / ",
                  exam.max_score
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: exam.started_at ? formatDate(exam.started_at) : "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: exam.submitted_at ? formatDate(exam.submitted_at) : "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: exam.graded_at ? formatDate(exam.graded_at) : "-" })
              ] }, exam.id)) })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No exam records found" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "wallet", className: "space-y-4", children: studentData.wallet ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Wallet Balance" })
                ] }),
                isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => setManageWalletOpen(true),
                    size: "sm",
                    variant: "outline",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 mr-2" }),
                      "Manage Wallet"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: formatCurrency(studentData.wallet.balance, studentData.wallet.currency) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Current Balance" })
              ] }),
              studentData.wallet.summary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3 mb-6 border-t pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Total Credits" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-green-600 mt-1", children: formatCurrency(studentData.wallet.summary.total_credits, studentData.wallet.currency) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Total Debits" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-red-600 mt-1", children: formatCurrency(studentData.wallet.summary.total_debits, studentData.wallet.currency) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Net Balance" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium mt-1", children: formatCurrency(studentData.wallet.summary.net_balance, studentData.wallet.currency) })
                ] })
              ] }),
              studentData.wallet.transactions && studentData.wallet.transactions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium mb-3", children: "Transaction History" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Service" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Balance" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Ref" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: studentData.wallet.transactions.map((transaction) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: formatDate(transaction.date) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: transaction.service_name || "N/A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium", children: formatCurrency(transaction.amount, transaction.currency || studentData.wallet.currency) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right", children: formatCurrency(transaction.balance, transaction.currency || studentData.wallet.currency) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: transaction.type === "Credit" ? "default" : "secondary", className: "text-xs", children: transaction.type }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: transaction.ref || "-" })
                  ] }, transaction.id)) })
                ] }) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No transactions found" })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No wallet data available" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "payments", className: "space-y-4", children: studentData.payments ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "School Fees" })
                ] }),
                studentData.payments.schoolFees?.currentSemester || studentData.payments.schoolFees?.history && studentData.payments.schoolFees.history.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Academic Year" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Semester" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-2 font-medium", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Teller No" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                    studentData.payments.schoolFees?.currentSemester && /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50 bg-muted/30", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 font-medium", children: formatDate(studentData.payments.schoolFees.currentSemester.date) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 font-medium", children: studentData.payments.schoolFees.currentSemester.academic_year }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 font-medium", children: studentData.payments.schoolFees.currentSemester.semester }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium", children: formatCurrency(studentData.payments.schoolFees.currentSemester.amount, "NGN") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: studentData.payments.schoolFees.currentSemester.paid ? "default" : "secondary", children: studentData.payments.schoolFees.currentSemester.status }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: "-" })
                    ] }),
                    studentData.payments.schoolFees?.history && studentData.payments.schoolFees.history.map((payment) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: formatDate(payment.date) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: payment.academic_year }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: payment.semester }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium", children: formatCurrency(payment.amount, payment.currency) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: payment.status === "Paid" ? "default" : "secondary", children: payment.status }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-xs", children: payment.teller_no || "-" })
                    ] }, payment.id))
                  ] })
                ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No payment history found" })
              ] }) }),
              studentData.payments.courseOrders && studentData.payments.courseOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Course Orders" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Academic Year" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Semester" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Amount" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: studentData.payments.courseOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: formatDate(order.date) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: order.academic_year }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: order.semester }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium", children: order.amount ? formatCurrency(order.amount, order.currency || "NGN") : "N/A" })
                  ] }, order.id)) })
                ] }) })
              ] }) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-12 w-12 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No payment data available" })
            ] }) })
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
    ),
    studentData && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ManageWalletDialog,
      {
        open: manageWalletOpen,
        onOpenChange: setManageWalletOpen,
        studentId,
        studentName: `${sanitizeString(studentData.personalInformation.fname)} ${sanitizeString(studentData.personalInformation.lname)}`,
        currentBalance: parseFloat(studentData.wallet?.balance || "0"),
        currency: sanitizeCurrency(studentData.wallet?.currency),
        onSuccess: fetchStudentDetails
      }
    )
  ] });
}

export { ViewStudentDialog as default };
