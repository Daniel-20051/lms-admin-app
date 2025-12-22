const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ViewCourseDialog-grl5PFLS.js","assets/index-BG4-akrH.js","assets/index-C9o3Y9ry.css","assets/dialog-Bga1LIUy.js","assets/badge-CVay2utB.js","assets/separator-BjHBJBAG.js","assets/courses-DmFTm-zX.js","assets/CreateCourseDialog-xgXfZmSD.js","assets/input-DBQ7-6Gz.js","assets/label-UX76_odr.js","assets/select-cypf-omf.js","assets/index-BHy36ITo.js","assets/programs-a0V4l-AP.js","assets/admin-BVl3HTxX.js","assets/index-DSZNHD2t.js","assets/quiz-DTu6yipn.js","assets/exams-CpQ4GBAC.js","assets/EditCourseDialog-DPluFD8I.js","assets/CourseActionDialogs-BJM8BQBE.js","assets/alert-dialog-B-eBACCp.js","assets/PricingManagementDialog-CNcqw4JK.js","assets/table-DSquZLpp.js","assets/card-DKXLAlrm.js","assets/tabs-CdamqglU.js","assets/semesters-oK3Qf9Wp.js","assets/CourseAllocationDialog-DuYkoHy2.js","assets/checkbox-CgkZGnpM.js","assets/UpdateCoursePriceDialog-BOfI52XK.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, K as DropdownMenu, N as DropdownMenuTrigger, B as Button, O as EllipsisVertical, Q as DropdownMenuContent, R as DropdownMenuLabel, V as DropdownMenuSeparator, W as DropdownMenuItem, b as Eye, p as SquarePen, a9 as DollarSign, a8 as Trash2, r as reactExports, a1 as Plus, J as Search, c as LoaderCircle, t as toast, f as useSearchParams, aa as List, U as Users, a2 as __vitePreload } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { u as useCoursesManagement, C as CoursesFilters } from './CoursesFilters-CVm0Ynpd.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { B as Badge } from './badge-CVay2utB.js';
import { C as CoursesPagination } from './CoursesPagination-CR5_pN6a.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from './alert-dialog-B-eBACCp.js';
import { g as getAllocations, r as removeAllocation } from './courses-DmFTm-zX.js';
import { g as getSemesters } from './semesters-oK3Qf9Wp.js';
import './programs-a0V4l-AP.js';
import './admin-BVl3HTxX.js';
import './index-BHy36ITo.js';

function CoursesTable({
  loading,
  courses,
  searchTerm,
  onViewCourse,
  onEditCourse,
  onDeleteCourse,
  onUpdatePrice
}) {
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading courses..." })
    ] }) });
  }
  if (courses.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: searchTerm ? "No courses found matching your filters." : "No courses found." }) }) });
  }
  const formatCurrency = (amount, currency = "NGN") => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency
    }).format(numAmount);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[80px]", children: "S/N" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course Code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Program" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden lg:table-cell", children: "Faculty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Instructor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden lg:table-cell", children: "Semester" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Units" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden lg:table-cell", children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Owner Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "hidden md:table-cell", children: "Marketplace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: courses.filter((course) => course != null).map((course, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: index + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: course.course_code || "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium max-w-xs", children: course.title || "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: course.program?.title || "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: course.faculty?.name || "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: course.instructor ? course.instructor.full_name : "N/A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
        "Level ",
        course.course_level
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: course.semester }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: course.course_unit }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: formatCurrency(course.price, course.currency) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: (() => {
        const getOwnerTypeDisplay = () => {
          if (course.owner_type === "wpu") {
            return { label: "WPU", variant: "default", className: "bg-blue-500 hover:bg-blue-600" };
          }
          if (course.owner_type === "marketplace" || course.is_marketplace) {
            return { label: "Marketplace", variant: "secondary", className: "bg-purple-500 hover:bg-purple-600" };
          }
          if (course.owner_type === "sole_tutor") {
            return { label: "Sole Tutor", variant: "secondary", className: "bg-green-500 hover:bg-green-600" };
          }
          if (course.owner_type === "organization") {
            return { label: "Organization", variant: "secondary", className: "bg-orange-500 hover:bg-orange-600" };
          }
          return { label: course.owner_type || "Unknown", variant: "secondary", className: "bg-gray-500 hover:bg-gray-600" };
        };
        const display = getOwnerTypeDisplay();
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: display.variant,
            className: display.className,
            children: display.label
          }
        );
      })() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: course.is_marketplace ? "Yes" : "No" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onViewCourse(course.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-2 h-4 w-4" }),
            "View Details"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onEditCourse(course.id),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "mr-2 h-4 w-4" }),
                "Edit Course"
              ]
            }
          ),
          onUpdatePrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onUpdatePrice(course.id),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "mr-2 h-4 w-4" }),
                "Update Price"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: () => onDeleteCourse(course),
              className: "text-red-600 focus:text-red-600",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delete Course" })
              ]
            }
          )
        ] })
      ] }) })
    ] }, course.id)) })
  ] }) });
}

function AllocationsView({ onAddAllocation, refreshKey }) {
  const [loading, setLoading] = reactExports.useState(false);
  const [allocations, setAllocations] = reactExports.useState([]);
  const [semesters, setSemesters] = reactExports.useState([]);
  const [selectedSemester, setSelectedSemester] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [total, setTotal] = reactExports.useState(0);
  const [allocationToDelete, setAllocationToDelete] = reactExports.useState(null);
  const [deleteLoading, setDeleteLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await getSemesters({ limit: 100 });
        setSemesters(response.data.semesters);
        const activeSemester = response.data.semesters.find((s) => s.status === "Active");
        if (activeSemester) {
          setSelectedSemester(`${activeSemester.academic_year}|${activeSemester.semester}`);
        }
      } catch (error) {
        console.error("Error fetching semesters:", error);
        toast.error("Failed to load semesters");
      }
    };
    fetchSemesters();
  }, []);
  reactExports.useEffect(() => {
    const fetchAllocations = async () => {
      if (!selectedSemester) return;
      setLoading(true);
      try {
        const [academicYear, semester] = selectedSemester.split("|");
        const params = {
          academic_year: academicYear,
          semester,
          page: currentPage,
          limit: 20
        };
        if (statusFilter) {
          params.registration_status = statusFilter;
        }
        const response = await getAllocations(params);
        setAllocations(response.data.allocations);
        setTotalPages(response.data.pagination.totalPages);
        setTotal(response.data.pagination.total);
      } catch (error) {
        console.error("Error fetching allocations:", error);
        toast.error("Failed to load allocations");
      } finally {
        setLoading(false);
      }
    };
    fetchAllocations();
  }, [selectedSemester, statusFilter, currentPage, refreshKey]);
  const handleDeleteAllocation = async () => {
    if (!allocationToDelete) return;
    setDeleteLoading(true);
    try {
      await removeAllocation(allocationToDelete.id);
      toast.success("Allocation removed successfully");
      setAllocationToDelete(null);
      const [academicYear, semester] = selectedSemester.split("|");
      const response = await getAllocations({
        academic_year: academicYear,
        semester,
        registration_status: statusFilter,
        page: currentPage,
        limit: 20
      });
      setAllocations(response.data.allocations);
      setTotal(response.data.pagination.total);
    } catch (error) {
      console.error("Error removing allocation:", error);
      toast.error(error?.response?.data?.error || "Failed to remove allocation");
    } finally {
      setDeleteLoading(false);
    }
  };
  const filteredAllocations = allocations.filter((allocation) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return allocation.student.name?.toLowerCase().includes(search) || allocation.student.matric_number?.toLowerCase().includes(search) || allocation.course.course_code?.toLowerCase().includes(search) || allocation.course.title?.toLowerCase().includes(search);
  });
  const getStatusBadge = (status) => {
    switch (status) {
      case "allocated":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Allocated" });
      case "registered":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", children: "Registered" });
      case "cancelled":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Cancelled" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Course Allocations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "View and manage all course allocations" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onAddAllocation, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "Add Allocation"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Semester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedSemester, onValueChange: setSelectedSemester, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select semester" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: semesters.map((sem) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter || "all", onValueChange: (val) => setStatusFilter(val === "all" ? "" : val), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "allocated", children: "Allocated" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "registered", children: "Registered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search student or course...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-8"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Allocations Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
          "Total: ",
          total,
          " allocation",
          total !== 1 ? "s" : "",
          filteredAllocations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " • ",
            "Without price: ",
            filteredAllocations.filter((a) => !a.allocated_price).length
          ] })
        ] })
      ] }) }),
      filteredAllocations.length > 0 && filteredAllocations.some((a) => !a.allocated_price) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-md p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-5 w-5 text-yellow-600 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-yellow-800", children: "Missing Course Prices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-yellow-700 mt-1", children: [
            "Some allocations don't have prices set. Please set course prices in the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pricing" }),
            " tab before students can register."
          ] })
        ] })
      ] }) }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : filteredAllocations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Matric Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Allocated Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredAllocations.map((allocation) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: allocation.student.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: allocation.student.matric_number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: allocation.student.level }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: allocation.course.course_code }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: allocation.course.title })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: allocation.allocated_price ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₦",
              allocation.allocated_price.toLocaleString()
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not set" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(allocation.registration_status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: allocation.allocated_at ? new Date(allocation.allocated_at).toLocaleDateString() : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "N/A" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: allocation.registration_status === "allocated" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => setAllocationToDelete(allocation),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
              }
            ) })
          ] }, allocation.id)) })
        ] }) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            currentPage,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
                disabled: currentPage === 1,
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
                disabled: currentPage === totalPages,
                children: "Next"
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground border rounded-md", children: selectedSemester ? "No allocations found" : "Please select a semester" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!allocationToDelete,
        onOpenChange: (open) => !open && setAllocationToDelete(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Allocation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to remove this course allocation?",
              allocationToDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Student:" }),
                  " ",
                  allocationToDelete.student.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Course:" }),
                  " ",
                  allocationToDelete.course.course_code,
                  " - ",
                  allocationToDelete.course.title
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleteLoading, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeleteAllocation,
                disabled: deleteLoading,
                className: "bg-destructive hover:bg-destructive/90",
                children: deleteLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  " Removing..."
                ] }) : "Remove"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}

const ViewCourseDialog = reactExports.lazy(() => __vitePreload(() => import('./ViewCourseDialog-grl5PFLS.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6]):void 0));
const CreateCourseDialog = reactExports.lazy(() => __vitePreload(() => import('./CreateCourseDialog-xgXfZmSD.js'),true              ?__vite__mapDeps([7,1,2,3,8,9,10,11,6,12,13,14,15,16]):void 0));
const EditCourseDialog = reactExports.lazy(() => __vitePreload(() => import('./EditCourseDialog-DPluFD8I.js'),true              ?__vite__mapDeps([17,1,2,3,8,9,10,11,6,12,13]):void 0));
const CourseActionDialogs = reactExports.lazy(() => __vitePreload(() => import('./CourseActionDialogs-BJM8BQBE.js'),true              ?__vite__mapDeps([18,1,2,19]):void 0));
const PricingManagementDialog = reactExports.lazy(() => __vitePreload(() => import('./PricingManagementDialog-CNcqw4JK.js'),true              ?__vite__mapDeps([20,1,2,3,8,9,10,11,21,22,23,6,24]):void 0));
const CourseAllocationDialog = reactExports.lazy(() => __vitePreload(() => import('./CourseAllocationDialog-DuYkoHy2.js'),true              ?__vite__mapDeps([25,1,2,3,8,9,10,11,22,26,6,24,12,13]):void 0));
const UpdateCoursePriceDialog = reactExports.lazy(() => __vitePreload(() => import('./UpdateCoursePriceDialog-BOfI52XK.js'),true              ?__vite__mapDeps([27,1,2,3,8,9,10,11,6]):void 0));
function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    courses,
    pagination,
    loading,
    searchTerm,
    semesterFilter,
    academicYearFilter,
    programFilter,
    facultyFilter,
    staffFilter,
    levelFilter,
    currentPage,
    selectedCourseId,
    selectedCourse,
    showViewDialog,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    actionLoading,
    setSearchTerm,
    setSemesterFilter,
    setAcademicYearFilter,
    setProgramFilter,
    setFacultyFilter,
    setStaffFilter,
    setLevelFilter,
    setSelectedCourseId,
    setSelectedCourse,
    setShowViewDialog,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    handlePreviousPage,
    handleNextPage,
    handleDeleteCourse,
    handleCourseUpdated,
    refetchCourses
  } = useCoursesManagement();
  const [showPricingDialog, setShowPricingDialog] = reactExports.useState(false);
  const [showAllocationDialog, setShowAllocationDialog] = reactExports.useState(false);
  const [allocationsRefreshKey, setAllocationsRefreshKey] = reactExports.useState(0);
  const [showUpdatePriceDialog, setShowUpdatePriceDialog] = reactExports.useState(false);
  const [selectedPriceUpdateCourseId, setSelectedPriceUpdateCourseId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const programIdFromUrl = searchParams.get("program");
    if (programIdFromUrl) {
      setProgramFilter(parseInt(programIdFromUrl));
    }
  }, []);
  reactExports.useEffect(() => {
    if (programFilter) {
      setSearchParams({ program: programFilter.toString() });
    } else {
      setSearchParams({});
    }
  }, [programFilter]);
  const handleProgramChange = (programId) => {
    setProgramFilter(programId);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold", children: "Courses Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground", children: "Manage all courses in the system" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowCreateDialog(true),
          className: "w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Course"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "courses", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "courses", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4 mr-2" }),
          "Courses"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pricing", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 mr-2" }),
          "Pricing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "allocation", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 mr-2" }),
          "Allocations"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "courses", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "A list of all courses with their details" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CoursesFilters,
            {
              searchTerm,
              onSearchChange: setSearchTerm,
              semesterFilter,
              onSemesterChange: setSemesterFilter,
              academicYearFilter,
              onAcademicYearChange: setAcademicYearFilter,
              programFilter,
              onProgramChange: handleProgramChange,
              facultyFilter,
              onFacultyChange: setFacultyFilter,
              staffFilter,
              onStaffChange: setStaffFilter,
              levelFilter,
              onLevelChange: setLevelFilter
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CoursesTable,
            {
              loading,
              courses,
              searchTerm,
              onViewCourse: (id) => {
                setSelectedCourseId(id);
                setShowViewDialog(true);
              },
              onEditCourse: (id) => {
                setSelectedCourseId(id);
                setShowEditDialog(true);
              },
              onDeleteCourse: (course) => {
                setSelectedCourse(course);
                setShowDeleteDialog(true);
              },
              onUpdatePrice: (id) => {
                setSelectedPriceUpdateCourseId(id);
                setShowUpdatePriceDialog(true);
              }
            }
          ),
          !loading && courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CoursesPagination,
            {
              currentPage,
              pagination,
              onPreviousPage: handlePreviousPage,
              onNextPage: handleNextPage
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Course Pricing Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Set and manage course prices for each semester" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowPricingDialog(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 mr-2" }),
          "Manage Course Prices"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "allocation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AllocationsView,
        {
          onAddAllocation: () => setShowAllocationDialog(true),
          refreshKey: allocationsRefreshKey
        }
      ) }) }) })
    ] }),
    showViewDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewCourseDialog,
      {
        open: showViewDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowViewDialog(false);
            setSelectedCourseId(null);
          }
        },
        courseId: selectedCourseId
      },
      `view-${selectedCourseId}-${showViewDialog ? "open" : "closed"}`
    ) }) : null,
    showCreateDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateCourseDialog,
      {
        open: showCreateDialog,
        onOpenChange: setShowCreateDialog,
        onCourseCreated: refetchCourses
      }
    ) }) : null,
    showEditDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditCourseDialog,
      {
        open: showEditDialog,
        onOpenChange: (open) => {
          if (!open) {
            setShowEditDialog(false);
            setSelectedCourseId(null);
          }
        },
        courseId: selectedCourseId,
        onCourseUpdated: handleCourseUpdated
      }
    ) }) : null,
    showDeleteDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CourseActionDialogs,
      {
        selectedCourse,
        actionLoading,
        showDeleteDialog,
        onDeleteDialogChange: (open) => {
          setShowDeleteDialog(open);
          if (!open) {
            setSelectedCourse(null);
          }
        },
        onConfirmDelete: handleDeleteCourse
      }
    ) }) : null,
    showPricingDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PricingManagementDialog,
      {
        open: showPricingDialog,
        onOpenChange: setShowPricingDialog
      }
    ) }) : null,
    showAllocationDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CourseAllocationDialog,
      {
        open: showAllocationDialog,
        onOpenChange: setShowAllocationDialog,
        onAllocationSuccess: () => {
          setAllocationsRefreshKey((prev) => prev + 1);
        }
      }
    ) }) : null,
    showUpdatePriceDialog ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpdateCoursePriceDialog,
      {
        open: showUpdatePriceDialog,
        onOpenChange: (open) => {
          setShowUpdatePriceDialog(open);
          if (!open) {
            setSelectedPriceUpdateCourseId(null);
          }
        },
        courseId: selectedPriceUpdateCourseId,
        onPriceUpdated: () => {
          handleCourseUpdated();
        }
      }
    ) }) : null
  ] });
}

export { CoursesPage as default };
