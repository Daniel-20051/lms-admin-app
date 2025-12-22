import { j as jsxRuntimeExports, B as Button, $ as ChevronLeft, a0 as ChevronRight } from './index-BG4-akrH.js';

function CoursesPagination({
  currentPage,
  pagination,
  onPreviousPage,
  onNextPage
}) {
  const startIndex = (currentPage - 1) * pagination.limit + 1;
  const endIndex = Math.min(currentPage * pagination.limit, pagination.total);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "Showing ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: startIndex }),
      " to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: endIndex }),
      " of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: pagination.total }),
      " courses"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onPreviousPage,
          disabled: currentPage === 1,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
            "Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        "Page ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: currentPage }),
        " of",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: pagination.totalPages })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onNextPage,
          disabled: currentPage === pagination.totalPages,
          children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
          ]
        }
      )
    ] })
  ] });
}

export { CoursesPagination as C };
