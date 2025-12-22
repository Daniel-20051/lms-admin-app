import { r as reactExports, t as toast, j as jsxRuntimeExports, J as Search, B as Button, $ as ChevronLeft, a0 as ChevronRight, c as LoaderCircle, a1 as Plus, ax as React, p as SquarePen, a8 as Trash2, a7 as getFaculties, Y as Power, a9 as DollarSign, T as TrendingUp, C as CircleCheck, z as Clock } from './index-BG4-akrH.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-DKXLAlrm.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { w as getSchoolFees, y as updatePaymentSetupItem, z as createPaymentSetupItem, A as getPaymentSetup, B as deletePaymentSetupItem, C as updateSchoolFeesConfiguration, D as createSchoolFeesConfiguration, E as getSchoolFeesConfiguration, F as toggleSchoolFeesConfiguration, G as getSchoolFeesStats } from './admin-BVl3HTxX.js';
import { g as getSemesters } from './semesters-oK3Qf9Wp.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';
import { g as getPrograms } from './programs-a0V4l-AP.js';
import { S as Switch } from './switch-aojsMll3.js';
import './index-BHy36ITo.js';

function SchoolFeesPaymentsList({ onRefresh: _onRefresh }) {
  const [loading, setLoading] = reactExports.useState(false);
  const [payments, setPayments] = reactExports.useState([]);
  const [semesters, setSemesters] = reactExports.useState([]);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [semesterFilter, setSemesterFilter] = reactExports.useState("all");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [total, setTotal] = reactExports.useState(0);
  const limit = 20;
  reactExports.useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await getSemesters({ limit: 100 });
        setSemesters(response.data.semesters);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };
    fetchSemesters();
  }, []);
  reactExports.useEffect(() => {
    fetchPayments();
  }, [currentPage, statusFilter, semesterFilter]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchPayments();
      } else {
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit
      };
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }
      if (semesterFilter !== "all") {
        const [academicYear, semester] = semesterFilter.split("|");
        params.semester = semester;
        params.academic_year = academicYear;
      }
      const response = await getSchoolFees(params);
      if (response.success) {
        let filteredPayments = response.data?.schoolFees || [];
        if (searchTerm) {
          const search = searchTerm.toLowerCase();
          filteredPayments = filteredPayments.filter(
            (p) => p.matric_number?.toLowerCase().includes(search) || p.student?.fname?.toLowerCase().includes(search) || p.student?.lname?.toLowerCase().includes(search) || p.student?.email?.toLowerCase().includes(search)
          );
        }
        setPayments(filteredPayments);
        setTotalPages(response.data?.pagination?.totalPages || 1);
        setTotal(response.data?.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error(error.response?.data?.message || "Failed to load payments");
      setPayments([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status) => {
    if (status === "Paid") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: "Paid" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Pending" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Filters" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by name or email...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-8"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Paid", children: "Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Pending", children: "Pending" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Semester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: semesterFilter, onValueChange: setSemesterFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Semesters" }),
              semesters.map((sem) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectItem,
                {
                  value: `${sem.academic_year}|${sem.semester}`,
                  children: [
                    sem.academic_year,
                    " - ",
                    sem.semester,
                    " ",
                    sem.status === "Active" && "(Active)"
                  ]
                },
                sem.id
              ))
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "School Fees Payments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
          "Total: ",
          total,
          " payment",
          total !== 1 ? "s" : ""
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : !payments || payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No payments found" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Matric Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Semester" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Academic Year" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Payment Date" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: payments.map((payment) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: payment.student ? `${payment.student.fname} ${payment.student.lname}` : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "N/A" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: payment.matric_number || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not assigned" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              payment.currency === "NGN" ? "₦" : payment.currency === "USD" ? "$" : payment.currency === "GBP" ? "£" : payment.currency === "EUR" ? "€" : "",
              payment.amount.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(payment.status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: payment.semester }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: payment.academic_year }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: payment.date ? new Date(payment.date).toLocaleDateString() : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "N/A" }) })
          ] }, payment.id)) })
        ] }) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            currentPage,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
                disabled: currentPage === 1,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                  "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
                disabled: currentPage === totalPages,
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}

function PaymentSetupDialog({
  open,
  onOpenChange,
  item,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    item: "",
    amount: "",
    description: "",
    semester: "1ST",
    currency: "NGN"
  });
  reactExports.useEffect(() => {
    if (item) {
      setFormData({
        item: item.item,
        amount: item.amount.toString(),
        description: item.description || "",
        semester: item.semester,
        currency: item.currency
      });
    } else {
      setFormData({
        item: "",
        amount: "",
        description: "",
        semester: "1ST",
        currency: "NGN"
      });
    }
  }, [item, open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.item.trim()) {
      toast.error("Item name is required");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Amount must be a positive number");
      return;
    }
    try {
      setLoading(true);
      const data = {
        item: formData.item.trim(),
        amount: Number(formData.amount),
        description: formData.description.trim() || void 0,
        semester: formData.semester,
        currency: formData.currency.toUpperCase()
      };
      if (item) {
        await updatePaymentSetupItem(item.id, data);
        toast.success("Payment setup item updated successfully");
      } else {
        await createPaymentSetupItem(data);
        toast.success("Payment setup item created successfully");
      }
      onOpenChange(false);
      if (onSuccess) onSuccess(true);
    } catch (error) {
      console.error("Error saving payment setup item:", error);
      toast.error(error.response?.data?.message || "Failed to save item");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: item ? "Edit Payment Setup Item" : "Add Payment Setup Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: item ? "Update the payment setup item details" : "Create a new itemized fee item for students" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-6 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "item", children: "Item Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "item",
              value: formData.item,
              onChange: (e) => setFormData({ ...formData, item: e.target.value }),
              placeholder: "e.g., Semester Registration Fee",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "amount",
              type: "number",
              min: "0",
              step: "0.01",
              value: formData.amount,
              onChange: (e) => setFormData({ ...formData, amount: e.target.value }),
              placeholder: "0.00",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "Optional description",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "semester", children: "Semester *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.semester,
                onValueChange: (value) => setFormData({ ...formData, semester: value }),
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1ST", children: "1ST Semester" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2ND", children: "2ND Semester" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "currency", children: "Currency *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.currency,
                onValueChange: (value) => setFormData({ ...formData, currency: value }),
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "NGN", children: "NGN" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "USD", children: "USD" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "GBP", children: "GBP" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "EUR", children: "EUR" })
                  ] })
                ]
              }
            )
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
            disabled: loading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          item ? "Updating..." : "Creating..."
        ] }) : item ? "Update" : "Create" })
      ] })
    ] })
  ] }) });
}

function PaymentSetupManagement({ onRefresh }) {
  const [loading, setLoading] = reactExports.useState(false);
  const [items, setItems] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [editingItem, setEditingItem] = reactExports.useState(null);
  const [itemToDelete, setItemToDelete] = reactExports.useState(null);
  const [deleteLoading, setDeleteLoading] = reactExports.useState(false);
  const [selectedSemester, setSelectedSemester] = reactExports.useState("all");
  const [selectedCurrency, setSelectedCurrency] = reactExports.useState("all");
  reactExports.useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await getPaymentSetup();
      if (response.success) {
        setItems(response.data?.paymentSetup || []);
      }
    } catch (error) {
      console.error("Error fetching payment setup:", error);
      toast.error(error.response?.data?.message || "Failed to load payment setup");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = () => {
    setEditingItem(null);
    setShowDialog(true);
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowDialog(true);
  };
  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      setDeleteLoading(true);
      const response = await deletePaymentSetupItem(itemToDelete.id);
      if (response.success) {
        toast.success("Payment setup item deleted successfully");
        setItemToDelete(null);
        fetchItems();
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      console.error("Error deleting payment setup item:", error);
      toast.error(error.response?.data?.message || "Failed to delete item");
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleDialogClose = (success) => {
    setShowDialog(false);
    setEditingItem(null);
    if (success) {
      fetchItems();
      if (onRefresh) onRefresh();
    }
  };
  const uniqueSemesters = reactExports.useMemo(() => {
    const semesters = new Set(items.map((item) => item.semester));
    return Array.from(semesters).sort();
  }, [items]);
  const uniqueCurrencies = reactExports.useMemo(() => {
    const currencies = new Set(items.map((item) => item.currency));
    return Array.from(currencies).sort();
  }, [items]);
  const filteredItems = reactExports.useMemo(() => {
    return items.filter((item) => {
      const matchesSemester = selectedSemester === "all" || item.semester === selectedSemester;
      const matchesCurrency = selectedCurrency === "all" || item.currency === selectedCurrency;
      return matchesSemester && matchesCurrency;
    });
  }, [items, selectedSemester, selectedCurrency]);
  const groupedItemsWithTotals = reactExports.useMemo(() => {
    const grouped = filteredItems.reduce((acc, item) => {
      const key = `${item.semester}-${item.currency}`;
      if (!acc[key]) {
        acc[key] = {
          semester: item.semester,
          currency: item.currency,
          items: [],
          total: 0
        };
      }
      acc[key].items.push(item);
      acc[key].total += item.amount;
      return acc;
    }, {});
    return Object.values(grouped).sort((a, b) => {
      if (a.semester !== b.semester) {
        return a.semester.localeCompare(b.semester);
      }
      return a.currency.localeCompare(b.currency);
    });
  }, [filteredItems]);
  const formatAmount = (amount, currency) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString()}`;
    } else if (currency === "NGN") {
      return `₦${amount.toLocaleString()}`;
    }
    return `${amount.toLocaleString()}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Semester:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedSemester, onValueChange: setSelectedSemester, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Semesters" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Semesters" }),
              uniqueSemesters.map((semester) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: semester, children: semester }, semester))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Currency:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedCurrency, onValueChange: setSelectedCurrency, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Currencies" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Currencies" }),
              uniqueCurrencies.map((currency) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: currency, children: currency }, currency))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Fee Item"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Payment Setup Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Manage itemized fee breakdown for students" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : !items || items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: 'No payment setup items found. Click "Add Fee Item" to create one.' }) : filteredItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No items match the selected filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Semester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: groupedItemsWithTotals.map((group, groupIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          group.items.map((item, itemIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            itemIndex === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableCell,
              {
                rowSpan: group.items.length,
                className: "font-medium align-top border-r bg-muted/30",
                style: { verticalAlign: "top" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-sm", children: group.semester }) })
              }
            ),
            itemIndex === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableCell,
              {
                rowSpan: group.items.length,
                className: "font-medium align-top border-r bg-muted/30",
                style: { verticalAlign: "top" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm", children: group.currency }) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: item.item }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: item.description || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatAmount(item.amount, item.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => handleEdit(item),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setItemToDelete(item),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                }
              )
            ] }) })
          ] }, item.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50 font-semibold border-t-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "text-right pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: group.semester }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: group.currency }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total:" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold text-lg", children: formatAmount(group.total, group.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, {})
          ] }),
          groupIndex < groupedItemsWithTotals.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "h-3 p-0 bg-transparent border-0" }) })
        ] }, `${group.semester}-${group.currency}-${groupIndex}`)) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaymentSetupDialog,
      {
        open: showDialog,
        onOpenChange: setShowDialog,
        item: editingItem,
        onSuccess: handleDialogClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!itemToDelete,
        onOpenChange: (open) => !open && setItemToDelete(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Payment Setup Item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              'Are you sure you want to delete "',
              itemToDelete?.item,
              '"? This action cannot be undone.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleteLoading, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                disabled: deleteLoading,
                className: "bg-destructive hover:bg-destructive/90",
                children: deleteLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  "Deleting..."
                ] }) : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}

function SchoolFeesConfigurationDialog({
  open,
  onOpenChange,
  configuration,
  programs,
  faculties,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    academic_year: "",
    level: "",
    program_id: "",
    faculty_id: "",
    amount: "",
    currency: "NGN",
    description: "",
    is_active: true
  });
  reactExports.useEffect(() => {
    if (configuration) {
      setFormData({
        academic_year: configuration.academic_year,
        level: configuration.level || "",
        program_id: configuration.program_id ? configuration.program_id.toString() : "",
        faculty_id: configuration.faculty_id ? configuration.faculty_id.toString() : "",
        amount: configuration.amount.toString(),
        currency: configuration.currency,
        description: configuration.description || "",
        is_active: configuration.is_active
      });
    } else {
      setFormData({
        academic_year: "",
        level: "",
        program_id: "",
        faculty_id: "",
        amount: "",
        currency: "NGN",
        description: "",
        is_active: true
      });
    }
  }, [configuration, open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.academic_year.trim()) {
      toast.error("Academic year is required");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Amount must be a positive number");
      return;
    }
    try {
      setLoading(true);
      const data = {
        academic_year: formData.academic_year.trim(),
        level: formData.level === "" ? null : formData.level,
        program_id: formData.program_id === "" || formData.program_id === "all" ? null : Number(formData.program_id),
        faculty_id: formData.faculty_id === "" || formData.faculty_id === "all" ? null : Number(formData.faculty_id),
        amount: Number(formData.amount),
        currency: formData.currency.toUpperCase(),
        description: formData.description.trim() || void 0,
        is_active: formData.is_active
      };
      if (configuration) {
        await updateSchoolFeesConfiguration(configuration.id, data);
        toast.success("School fees configuration updated successfully");
      } else {
        await createSchoolFeesConfiguration(data);
        toast.success("School fees configuration created successfully");
      }
      onOpenChange(false);
      if (onSuccess) onSuccess(true);
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error(error.response?.data?.message || "Failed to save configuration");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: configuration ? "Edit School Fees Configuration" : "Add School Fees Configuration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: configuration ? "Update the school fees configuration for specific student groups" : "Create a new school fees configuration override for student groups" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-6 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "academic_year", children: "Academic Year *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "academic_year",
                value: formData.academic_year,
                onChange: (e) => setFormData({ ...formData, academic_year: e.target.value }),
                placeholder: "e.g., 2025/2026",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "amount",
                type: "number",
                min: "0",
                step: "0.01",
                value: formData.amount,
                onChange: (e) => setFormData({ ...formData, amount: e.target.value }),
                placeholder: "0.00",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "level", children: "Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.level || "all",
                onValueChange: (value) => setFormData({
                  ...formData,
                  level: value === "all" ? null : value
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
                    [100, 200, 300, 400, 500, 600, 700].map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: level.toString(), children: [
                      level,
                      " Level"
                    ] }, level))
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "currency", children: "Currency *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.currency,
                onValueChange: (value) => setFormData({ ...formData, currency: value }),
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "NGN", children: "NGN" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "USD", children: "USD" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "GBP", children: "GBP" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "EUR", children: "EUR" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "program", children: "Program" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.program_id === "" || formData.program_id === null ? "all" : formData.program_id,
                onValueChange: (value) => setFormData({
                  ...formData,
                  program_id: value === "all" ? "" : value
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Programs" }),
                    programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: program.id.toString(), children: program.title }, program.id))
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "faculty", children: "Faculty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.faculty_id === "" || formData.faculty_id === null ? "all" : formData.faculty_id,
                onValueChange: (value) => setFormData({
                  ...formData,
                  faculty_id: value === "all" ? "" : value
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Faculties" }),
                    faculties.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: faculty.id.toString(), children: faculty.name }, faculty.id))
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "Optional description",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "is_active", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Only active configurations are used for fee calculation" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "is_active",
              checked: formData.is_active,
              onCheckedChange: (checked) => setFormData({ ...formData, is_active: checked })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "px-6 pb-6", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          configuration ? "Updating..." : "Creating..."
        ] }) : configuration ? "Update" : "Create" })
      ] })
    ] })
  ] }) });
}

function SchoolFeesConfiguration({ onRefresh }) {
  const [loading, setLoading] = reactExports.useState(false);
  const [configurations, setConfigurations] = reactExports.useState([]);
  const [programs, setPrograms] = reactExports.useState([]);
  const [faculties, setFaculties] = reactExports.useState([]);
  const [semesters, setSemesters] = reactExports.useState([]);
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [editingConfig, setEditingConfig] = reactExports.useState(null);
  const [togglingId, setTogglingId] = reactExports.useState(null);
  const [academicYearFilter, setAcademicYearFilter] = reactExports.useState("");
  const [levelFilter, setLevelFilter] = reactExports.useState("");
  const [programFilter, setProgramFilter] = reactExports.useState("");
  const [facultyFilter, setFacultyFilter] = reactExports.useState("");
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  reactExports.useEffect(() => {
    fetchPrograms();
    fetchFaculties();
    fetchSemesters();
  }, []);
  const fetchSemesters = async () => {
    try {
      const response = await getSemesters({ limit: 100 });
      setSemesters(response.data.semesters);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };
  reactExports.useEffect(() => {
    fetchConfigurations();
  }, [academicYearFilter, levelFilter, programFilter, facultyFilter, activeFilter]);
  const fetchPrograms = async () => {
    try {
      const response = await getPrograms({ limit: 1e3 });
      setPrograms(response.data.programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };
  const fetchFaculties = async () => {
    try {
      const response = await getFaculties({ limit: 1e3 });
      setFaculties(response.data.faculties);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };
  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const params = {};
      if (academicYearFilter) params.academic_year = academicYearFilter;
      if (levelFilter) params.level = levelFilter;
      if (programFilter) params.program_id = parseInt(programFilter);
      if (facultyFilter) params.faculty_id = parseInt(facultyFilter);
      if (activeFilter !== "all") params.is_active = activeFilter === "active";
      const response = await getSchoolFeesConfiguration(params);
      if (response.success) {
        setConfigurations(response.data?.configurations || []);
      }
    } catch (error) {
      console.error("Error fetching configurations:", error);
      toast.error(error.response?.data?.message || "Failed to load configurations");
      setConfigurations([]);
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = () => {
    setEditingConfig(null);
    setShowDialog(true);
  };
  const handleEdit = (config) => {
    setEditingConfig(config);
    setShowDialog(true);
  };
  const handleToggle = async (id, currentStatus) => {
    try {
      setTogglingId(id);
      const response = await toggleSchoolFeesConfiguration(id, !currentStatus);
      if (response.success) {
        toast.success(
          `Configuration ${!currentStatus ? "activated" : "deactivated"} successfully`
        );
        fetchConfigurations();
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      console.error("Error toggling configuration:", error);
      toast.error(error.response?.data?.message || "Failed to toggle configuration");
    } finally {
      setTogglingId(null);
    }
  };
  const handleDialogClose = (success) => {
    setShowDialog(false);
    setEditingConfig(null);
    if (success) {
      fetchConfigurations();
      if (onRefresh) onRefresh();
    }
  };
  const getScopeDescription = (config) => {
    const parts = [];
    if (config.level) parts.push(`Level ${config.level}`);
    if (config.program) parts.push(config.program.title);
    if (config.faculty) parts.push(config.faculty.name);
    if (parts.length === 0) return "All Students";
    return parts.join(" • ");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Filters" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Academic Year" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: academicYearFilter || "all", onValueChange: (value) => setAcademicYearFilter(value === "all" ? "" : value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Years" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Years" }),
              Array.from(new Set(semesters.map((s) => s.academic_year))).sort().map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year, children: year }, year))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: levelFilter || "all", onValueChange: (value) => setLevelFilter(value === "all" ? "" : value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Levels" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
              [100, 200, 300, 400, 500, 600, 700].map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: level.toString(), children: [
                level,
                " Level"
              ] }, level))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Program" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: programFilter || "all", onValueChange: (value) => setProgramFilter(value === "all" ? "" : value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Programs" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Programs" }),
              programs.map((program) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: program.id.toString(), children: program.title }, program.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Faculty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: facultyFilter || "all", onValueChange: (value) => setFacultyFilter(value === "all" ? "" : value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Faculties" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Faculties" }),
              faculties.map((faculty) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: faculty.id.toString(), children: faculty.name }, faculty.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: activeFilter, onValueChange: setActiveFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "Inactive" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreate, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
      "Add Configuration"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "School Fees Configurations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Configure school fees overrides for specific student groups" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : !configurations || configurations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: 'No configurations found. Click "Add Configuration" to create one.' }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Academic Year" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Scope" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: configurations.map((config) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: config.academic_year }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: getScopeDescription(config) }),
            config.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: config.description })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
            "₦",
            config.amount.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: config.currency }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: config.is_active ? "default" : "secondary",
              children: config.is_active ? "Active" : "Inactive"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleEdit(config),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleToggle(config.id, config.is_active),
                disabled: togglingId === config.id,
                children: togglingId === config.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: `h-4 w-4 ${config.is_active ? "text-yellow-600" : "text-green-600"}` })
              }
            )
          ] }) })
        ] }, config.id)) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SchoolFeesConfigurationDialog,
      {
        open: showDialog,
        onOpenChange: setShowDialog,
        configuration: editingConfig,
        programs,
        faculties,
        onSuccess: handleDialogClose
      }
    )
  ] });
}

function SchoolFeesDashboard() {
  const [loading, setLoading] = reactExports.useState(true);
  const [stats, setStats] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getSchoolFeesStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching school fees stats:", error);
      toast.error(error.response?.data?.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
      ] })
    ] }, i)) }) });
  }
  if (!stats) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No statistics available" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Fees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: stats.total || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total fee records" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
            "₦",
            Number(stats.totalAmount || 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total amount across all fees" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Paid Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-600" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-green-600", children: [
            "₦",
            Number(stats.paidAmount || 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total paid fees" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Pending Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-yellow-600" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-yellow-600", children: [
            "₦",
            Number(stats.pendingAmount || 0).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total pending fees" })
        ] })
      ] })
    ] }),
    stats.byStatus && stats.byStatus.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Breakdown by Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Fee distribution by payment status" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: stats.byStatus.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: item.status === "Paid" ? "default" : "secondary", children: item.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            item.count,
            " records"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium", children: [
          "₦",
          Number(item.total || 0).toLocaleString()
        ] })
      ] }, index)) }) })
    ] }),
    stats.bySemester && stats.bySemester.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Breakdown by Semester" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Fee distribution by semester" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: stats.bySemester.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: item.semester }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            item.count,
            " records"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium", children: [
          "₦",
          Number(item.total || 0).toLocaleString()
        ] })
      ] }, index)) }) })
    ] })
  ] });
}

function SchoolFeesPage() {
  const [activeTab, setActiveTab] = reactExports.useState("dashboard");
  const [refreshKey, setRefreshKey] = reactExports.useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "School Fees Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage student school fees, payment setup, and configurations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "School Fees Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View payments, manage payment setup items, and configure school fees" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "dashboard", children: "Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "payments", children: "Payments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "setup", children: "Payment Setup" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "configuration", children: "Configuration" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "dashboard", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SchoolFeesDashboard, {}, refreshKey) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "payments", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SchoolFeesPaymentsList, { onRefresh: handleRefresh }, refreshKey) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "setup", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentSetupManagement, { onRefresh: handleRefresh }, refreshKey) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "configuration", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SchoolFeesConfiguration, { onRefresh: handleRefresh }, refreshKey) })
      ] }) })
    ] })
  ] });
}

export { SchoolFeesPage as default };
