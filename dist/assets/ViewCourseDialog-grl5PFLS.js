import { r as reactExports, t as toast, j as jsxRuntimeExports } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { B as Badge } from './badge-CVay2utB.js';
import { S as Separator } from './separator-BjHBJBAG.js';
import { f as getCourse } from './courses-DmFTm-zX.js';

function ViewCourseDialog({
  open,
  onOpenChange,
  courseId
}) {
  const [course, setCourse] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open && courseId) {
      fetchCourse();
    } else {
      setCourse(null);
    }
  }, [open, courseId]);
  const fetchCourse = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const response = await getCourse(courseId);
      if (response.status && response.data) {
        setCourse(response.data);
      } else {
        throw new Error("Invalid course data received");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to fetch course details");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };
  const formatCurrency = (amount, currency = "NGN") => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency
    }).format(numAmount);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Course Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "View detailed information about this course" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading course details..." })
    ] }) : course ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Course Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "ID:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Course Code:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm font-medium", children: course.course_code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Title:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm font-medium", children: course.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Program:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.program?.title || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Faculty:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.faculty?.name || "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Instructor:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.instructor ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: course.instructor.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: course.instructor.email })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Not assigned" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Level:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
            "Level ",
            course.course_level
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Semester:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.semester })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Course Units:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.course_unit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Course Type:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.course_type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Price:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm font-medium", children: formatCurrency(course.price, course.currency) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Exam Fee:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm font-medium", children: formatCurrency(course.exam_fee, course.currency) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Owner Type:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: course.owner_type === "wpu" ? "default" : "secondary",
              className: course.owner_type === "wpu" ? "bg-blue-500 hover:bg-blue-600" : "bg-purple-500 hover:bg-purple-600",
              children: course.owner_type === "wpu" ? "WPU" : "Marketplace"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Marketplace Status:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: course.is_marketplace ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: course.marketplace_status || "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Not in marketplace" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Date Created:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm", children: new Date(course.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Token:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-sm font-mono break-all", children: course.token })
        ] })
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No course data available" }) }) })
  ] }) });
}

export { ViewCourseDialog as default };
