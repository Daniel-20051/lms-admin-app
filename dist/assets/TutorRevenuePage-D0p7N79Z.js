import { aG as useParams, u as useNavigate, r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, e as ArrowLeft, a9 as DollarSign, T as TrendingUp, au as Wallet, $ as ChevronLeft, a0 as ChevronRight } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from './card-DKXLAlrm.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { B as Badge } from './badge-CVay2utB.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { W as getTutorRevenueDetails } from './admin-BVl3HTxX.js';

function TutorRevenuePage() {
  const { ownerType, ownerId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [filters, setFilters] = reactExports.useState({});
  const [transactionsPage, setTransactionsPage] = reactExports.useState(1);
  const transactionsPerPage = 10;
  reactExports.useEffect(() => {
    if (ownerType && ownerId) {
      fetchDetails();
    }
  }, [ownerType, ownerId, filters]);
  const fetchDetails = async () => {
    if (!ownerType || !ownerId) return;
    try {
      setLoading(true);
      const response = await getTutorRevenueDetails(
        ownerType,
        parseInt(ownerId),
        filters
      );
      if (response.success) {
        setDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching tutor revenue details:", error);
      toast.error(error.response?.data?.message || "Failed to load tutor revenue details");
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
  if (!ownerType || !ownerId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Invalid tutor information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate("/super-admin/revenue/transactions"), className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Back to Transactions"
      ] })
    ] });
  }
  const paginatedTransactions = details?.transactions.slice(
    (transactionsPage - 1) * transactionsPerPage,
    transactionsPage * transactionsPerPage
  ) || [];
  const totalPages = details ? Math.ceil((details.transactions.length || 0) / transactionsPerPage) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => navigate("/super-admin/revenue/transactions"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Tutor Revenue Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            ownerType === "sole_tutor" ? "Sole Tutor" : "Organization",
            " - ID: ",
            ownerId
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
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
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: details ? formatCurrency(details.total_revenue, details.currency) : "₦0.00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Gross revenue" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: details ? formatCurrency(details.total_commission, details.currency) : "₦0.00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "WPU commission" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Tutor Earnings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-600", children: details ? formatCurrency(details.tutor_earnings, details.currency) : "₦0.00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Net earnings" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Wallet Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: details ? formatCurrency(details.wallet_balance, details.currency) : "₦0.00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Current balance" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Transaction History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: details ? `${details.transaction_count} total transactions` : "Loading..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "S/N" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 border-b", children: "Earnings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 border-b", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) })
        ] }, index)) })
      ] }) }) : details && details.transactions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "S/N" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Course" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Commission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2 font-medium", children: "Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2 font-medium", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedTransactions.map((transaction, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b hover:bg-muted/50", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium", children: formatCurrency(transaction.course_price, transaction.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right", children: formatCurrency(transaction.wpu_commission, transaction.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right font-medium text-green-600", children: formatCurrency(transaction.tutor_earnings, transaction.currency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: getStatusBadge(transaction.payment_status) })
          ] }, transaction.id)) })
        ] }) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "Showing ",
            (transactionsPage - 1) * transactionsPerPage + 1,
            " to ",
            Math.min(transactionsPage * transactionsPerPage, details.transactions.length),
            " of ",
            details.transactions.length,
            " results"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setTransactionsPage((p) => Math.max(1, p - 1)),
                disabled: transactionsPage === 1,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                  "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              "Page ",
              transactionsPage,
              " of ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setTransactionsPage((p) => Math.min(totalPages, p + 1)),
                disabled: transactionsPage === totalPages,
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

export { TutorRevenuePage as default };
