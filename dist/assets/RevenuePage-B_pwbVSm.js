import { u as useNavigate, r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, a4 as Funnel, a5 as Download, X, aD as ExternalLink, $ as ChevronLeft, a0 as ChevronRight, a9 as DollarSign, T as TrendingUp, y as Calendar, au as Wallet, n as Award, aE as Receipt, aF as ChartColumn } from './index-BG4-akrH.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-DKXLAlrm.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { B as Badge } from './badge-CVay2utB.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { U as getMarketplaceTransactions, V as getWPURevenueStats } from './admin-BVl3HTxX.js';
import './index-BHy36ITo.js';

function TransactionsPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [pagination, setPagination] = reactExports.useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const [filters, setFilters] = reactExports.useState({
    page: 1,
    limit: 20
  });
  const [showFilters, setShowFilters] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchTransactions();
  }, [filters]);
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getMarketplaceTransactions(filters);
      if (response.success) {
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error(error.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1
      // Reset to first page when filters change
    }));
  };
  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 20
    });
  };
  const formatCurrency = (amount, currency = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency
    }).format(amount);
  };
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "completed") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "bg-green-500", children: "Completed" });
    } else if (statusLower === "pending") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-yellow-500", children: "Pending" });
    } else if (statusLower === "failed") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Failed" });
    } else if (statusLower === "refunded") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-orange-500", children: "Refunded" });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
  };
  const exportTransactions = () => {
    toast.info("Export functionality coming soon");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Marketplace Transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "View and manage all marketplace transactions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setShowFilters(!showFilters),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 mr-2" }),
              "Filters"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportTransactions, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
          "Export"
        ] })
      ] })
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Filters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: clearFilters, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
          "Clear"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "owner_type", children: "Owner Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filters.owner_type || "",
              onValueChange: (value) => handleFilterChange("owner_type", value || void 0),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "owner_type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "", children: "All Types" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sole_tutor", children: "Sole Tutor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "organization", children: "Organization" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payment_status", children: "Payment Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filters.payment_status || "",
              onValueChange: (value) => handleFilterChange("payment_status", value || void 0),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "payment_status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "", children: "All Statuses" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "completed", children: "Completed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "failed", children: "Failed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "refunded", children: "Refunded" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start_date", children: "Start Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "start_date",
              type: "date",
              value: filters.start_date || "",
              onChange: (e) => handleFilterChange("start_date", e.target.value || void 0)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "end_date", children: "End Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "end_date",
              type: "date",
              value: filters.end_date || "",
              onChange: (e) => handleFilterChange("end_date", e.target.value || void 0)
            }
          )
        ] }),
        filters.owner_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "owner_id", children: "Owner ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "owner_id",
              type: "number",
              value: filters.owner_id,
              onChange: (e) => handleFilterChange("owner_id", e.target.value ? parseInt(e.target.value) : void 0)
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
          pagination.total,
          " total transactions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "S/N" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Owner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Course Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Tutor Earnings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) })
        ] }, index)) })
      ] }) }) : transactions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "S/N" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Course" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Owner" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Course Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Commission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Tutor Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: transactions.map((transaction, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: index + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: transaction.course.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: transaction.course.course_code })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                transaction.student.fname,
                " ",
                transaction.student.lname
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: transaction.student.email })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "link",
                className: "h-auto p-0 text-left font-normal",
                onClick: () => navigate(`/super-admin/revenue/tutor/${transaction.owner_type}/${transaction.owner_id}`),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mr-2", children: transaction.owner_type === "sole_tutor" ? "Sole Tutor" : "Organization" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "ID: ",
                    transaction.owner_id
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 ml-1 inline" })
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium", children: formatCurrency(transaction.course_price, transaction.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2 text-right", children: [
              formatCurrency(transaction.wpu_commission, transaction.currency),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "(",
                transaction.commission_rate,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium text-green-600", children: formatCurrency(transaction.tutor_earnings, transaction.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: getStatusBadge(transaction.payment_status) })
          ] }, transaction.id)) })
        ] }) }),
        pagination.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "Showing ",
            (pagination.page - 1) * pagination.limit + 1,
            " to ",
            Math.min(pagination.page * pagination.limit, pagination.total),
            " of ",
            pagination.total,
            " results"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => handleFilterChange("page", Math.max(1, pagination.page - 1)),
                disabled: pagination.page === 1 || loading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                  "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              "Page ",
              pagination.page,
              " of ",
              pagination.totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => handleFilterChange("page", Math.min(pagination.totalPages, pagination.page + 1)),
                disabled: pagination.page === pagination.totalPages || loading,
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No transactions found" }) }) })
    ] })
  ] });
}

function RevenueStatsPage() {
  const [stats, setStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [filters, setFilters] = reactExports.useState({});
  reactExports.useEffect(() => {
    fetchStats();
  }, [filters]);
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getWPURevenueStats(filters);
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching revenue stats:", error);
      toast.error(error.response?.data?.message || "Failed to load revenue statistics");
    } finally {
      setLoading(false);
    }
  };
  const formatCurrency = (amount, currency = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency
    }).format(amount);
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "WPU Revenue Statistics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Overview of marketplace revenue and commissions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start_date", children: "Start Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "start_date",
              type: "date",
              value: filters.start_date || "",
              onChange: (e) => setFilters((prev) => ({ ...prev, start_date: e.target.value || void 0 })),
              className: "w-40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "end_date", children: "End Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "end_date",
              type: "date",
              value: filters.end_date || "",
              onChange: (e) => setFilters((prev) => ({ ...prev, end_date: e.target.value || void 0 })),
              className: "w-40"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: stats ? formatCurrency(stats.totalCommission, "NGN") : "₦0.00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "WPU earnings" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: stats ? formatCurrency(stats.totalRevenue, "NGN") : "₦0.00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Marketplace total" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Transactions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: stats ? formatNumber(stats.totalTransactions) : "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "All transactions" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Pending Payouts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-yellow-600", children: stats ? formatCurrency(stats.pendingPayouts, "NGN") : "₦0.00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Awaiting payout" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Revenue by Owner Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Breakdown of revenue by tutor type" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 2 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }, index)) }) : stats && stats.byOwnerType.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: stats.byOwnerType.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-sm", children: item.owner_type === "sole_tutor" ? "Sole Tutor" : "Organization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              formatNumber(item.count),
              " transactions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              formatCurrency(item.total_revenue, "NGN"),
              " total revenue"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-green-600", children: formatCurrency(item.total_commission, "NGN") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Commission" })
        ] })
      ] }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center py-4", children: "No data available" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }),
          "Top Earners"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Top performing tutors and organizations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Rank" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Owner Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Owner ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Sales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Commission" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 ml-auto" }) })
        ] }, index)) })
      ] }) }) : stats && stats.topEarners.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Rank" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Owner Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Owner ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Sales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Commission" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: stats.topEarners.map((earner, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: index === 0 ? "default" : "outline", children: [
            "#",
            index + 1
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: earner.owner_type === "sole_tutor" ? "Sole Tutor" : "Organization" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: earner.owner_id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right", children: formatNumber(earner.sales_count) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium", children: formatCurrency(earner.total_revenue, "NGN") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium text-green-600", children: formatCurrency(earner.total_commission, "NGN") })
        ] }, index)) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center py-4", children: "No top earners data available" }) })
    ] })
  ] });
}

function RevenuePage() {
  const [activeTab, setActiveTab] = reactExports.useState("transactions");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-md grid-cols-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "transactions", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4" }),
        "Transactions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "stats", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
        "Statistics"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "transactions", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionsPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "stats", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueStatsPage, {}) })
  ] }) });
}

export { RevenuePage as default };
