import { r as reactExports, j as jsxRuntimeExports, c as LoaderCircle, B as Button, q as Save, bh as Copy, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from './table-DSquZLpp.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-CdamqglU.js';
import { c as getCourses, h as getCoursePrices, i as bulkSetCoursePrices, j as copyCoursePrices } from './courses-DmFTm-zX.js';
import { g as getSemesters } from './semesters-oK3Qf9Wp.js';
import './index-BHy36ITo.js';

function PricingManagementDialog({ open, onOpenChange }) {
  const [loading, setLoading] = reactExports.useState(false);
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [semesters, setSemesters] = reactExports.useState([]);
  const [selectedSemester, setSelectedSemester] = reactExports.useState("");
  const [courses, setCourses] = reactExports.useState([]);
  const [prices, setPrices] = reactExports.useState({});
  const [copyFromSemester, setCopyFromSemester] = reactExports.useState("");
  const [copyToSemester, setCopyToSemester] = reactExports.useState("");
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
    if (open) {
      fetchSemesters();
    }
  }, [open]);
  reactExports.useEffect(() => {
    const fetchCoursesAndPrices = async () => {
      if (!selectedSemester) return;
      setLoading(true);
      try {
        const [academicYear, semester] = selectedSemester.split("|");
        const coursesResponse = await getCourses({ limit: 1e3 });
        const wpuCourses = coursesResponse.data.courses.filter((c) => c.owner_type === "wpu");
        setCourses(wpuCourses);
        try {
          const pricesResponse = await getCoursePrices({ academic_year: academicYear, semester });
          const priceMap = {};
          if (pricesResponse.data?.prices && Array.isArray(pricesResponse.data.prices)) {
            pricesResponse.data.prices.forEach((p) => {
              priceMap[p.course_id] = p.price.toString();
            });
          }
          setPrices(priceMap);
        } catch (priceError) {
          console.log("No prices set for this semester yet");
          setPrices({});
        }
      } catch (error) {
        console.error("Error fetching courses and prices:", error);
        toast.error("Failed to load courses and prices");
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesAndPrices();
  }, [selectedSemester]);
  const handlePriceChange = (courseId, price) => {
    setPrices((prev) => ({ ...prev, [courseId]: price }));
  };
  const handleBulkSave = async () => {
    if (!selectedSemester) {
      toast.error("Please select a semester");
      return;
    }
    const [academicYear, semester] = selectedSemester.split("|");
    const priceArray = Object.entries(prices).filter(([_, price]) => price && parseFloat(price) > 0).map(([courseId, price]) => ({
      course_id: parseInt(courseId),
      price: parseFloat(price),
      currency: "NGN"
    }));
    if (priceArray.length === 0) {
      toast.error("Please set at least one course price");
      return;
    }
    setActionLoading(true);
    try {
      const response = await bulkSetCoursePrices({
        academic_year: academicYear,
        semester,
        prices: priceArray
      });
      toast.success(
        `Successfully saved ${response.data.total} course prices (${response.data.created} created, ${response.data.updated} updated)`
      );
    } catch (error) {
      console.error("Error saving prices:", error);
      toast.error("Failed to save course prices");
    } finally {
      setActionLoading(false);
    }
  };
  const handleCopyPrices = async () => {
    if (!copyFromSemester || !copyToSemester) {
      toast.error("Please select both semesters");
      return;
    }
    if (copyFromSemester === copyToSemester) {
      toast.error("Source and destination semesters must be different");
      return;
    }
    const [fromYear, fromSem] = copyFromSemester.split("|");
    const [toYear, toSem] = copyToSemester.split("|");
    setActionLoading(true);
    try {
      const response = await copyCoursePrices({
        from_academic_year: fromYear,
        from_semester: fromSem,
        to_academic_year: toYear,
        to_semester: toSem
      });
      toast.success(`Successfully copied ${response.data.copied} course prices`);
      if (copyToSemester === selectedSemester) {
        setSelectedSemester("");
        setTimeout(() => setSelectedSemester(copyToSemester), 100);
      }
    } catch (error) {
      console.error("Error copying prices:", error);
      toast.error("Failed to copy course prices");
    } finally {
      setActionLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-5xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Course Pricing Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Set and manage course prices for each semester" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "set-prices", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "set-prices", children: "Set Prices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "copy-prices", children: "Copy Prices" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "set-prices", className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Select Semester" }),
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
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : courses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Course Prices" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Set prices for each course (in NGN)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border max-h-[400px] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Units" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Price (₦)" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: course.course_code }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: course.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: course.course_unit }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    placeholder: "0.00",
                    value: prices[course.id] || "",
                    onChange: (e) => handlePriceChange(course.id, e.target.value),
                    className: "w-32"
                  }
                ) })
              ] }, course.id)) })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => onOpenChange(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleBulkSave,
                disabled: actionLoading,
                children: actionLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  " Saving..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
                  " Save All Prices"
                ] })
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: selectedSemester ? "No WPU courses found" : "Please select a semester" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "copy-prices", className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Copy Prices from Another Semester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Quickly duplicate course prices from one semester to another" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Copy From (Source Semester)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: copyFromSemester, onValueChange: setCopyFromSemester, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select source semester" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: semesters.map((sem) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectItem,
                {
                  value: `${sem.academic_year}|${sem.semester}`,
                  children: [
                    sem.academic_year,
                    " - ",
                    sem.semester
                  ]
                },
                sem.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Copy To (Destination Semester)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: copyToSemester, onValueChange: setCopyToSemester, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select destination semester" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: semesters.map((sem) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectItem,
                {
                  value: `${sem.academic_year}|${sem.semester}`,
                  children: [
                    sem.academic_year,
                    " - ",
                    sem.semester
                  ]
                },
                sem.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => onOpenChange(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleCopyPrices,
                disabled: actionLoading,
                children: actionLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  " Copying..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-2 h-4 w-4" }),
                  " Copy Prices"
                ] })
              }
            )
          ] })
        ] })
      ] }) })
    ] }) })
  ] }) });
}

export { PricingManagementDialog as default };
