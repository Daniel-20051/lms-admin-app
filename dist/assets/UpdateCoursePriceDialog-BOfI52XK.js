import { r as reactExports, j as jsxRuntimeExports, a9 as DollarSign, c as LoaderCircle, B as Button, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, f as DialogBody, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-cypf-omf.js';
import { f as getCourse, l as updateCoursePrice } from './courses-DmFTm-zX.js';
import './index-BHy36ITo.js';

const CURRENCIES = ["NGN", "USD", "EUR", "GBP"];
function UpdateCoursePriceDialog({
  open,
  onOpenChange,
  courseId,
  onPriceUpdated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [fetchingCourse, setFetchingCourse] = reactExports.useState(false);
  const [price, setPrice] = reactExports.useState("");
  const [currency, setCurrency] = reactExports.useState("NGN");
  const [courseTitle, setCourseTitle] = reactExports.useState("");
  const [courseCode, setCourseCode] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    const fetchCourse = async () => {
      if (open && courseId) {
        setFetchingCourse(true);
        try {
          const response = await getCourse(courseId);
          if (response.status && response.data) {
            const course = response.data;
            setCourseTitle(course.title || "");
            setCourseCode(course.course_code || "");
            setPrice(course.price || "0");
            setCurrency(course.currency || "NGN");
            setError("");
          } else {
            throw new Error("Invalid course data received");
          }
        } catch (error2) {
          console.error("Error fetching course:", error2);
          toast.error(error2?.response?.data?.message || error2?.message || "Failed to load course details");
          onOpenChange(false);
        } finally {
          setFetchingCourse(false);
        }
      }
    };
    fetchCourse();
  }, [open, courseId, onOpenChange]);
  reactExports.useEffect(() => {
    if (!open) {
      setPrice("");
      setCurrency("NGN");
      setError("");
      setCourseTitle("");
      setCourseCode("");
    }
  }, [open]);
  const validateForm = () => {
    setError("");
    if (!price || price.trim() === "") {
      setError("Price is required");
      return false;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      setError("Price must be a valid number");
      return false;
    }
    if (priceNum < 0) {
      setError("Price must be a positive number");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId || !validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const priceNum = parseFloat(price);
      const updateData = {
        price: priceNum,
        currency
      };
      const response = await updateCoursePrice(courseId, updateData);
      if (response.success || response.status) {
        toast.success("Course price updated successfully");
        onPriceUpdated();
        onOpenChange(false);
      } else {
        throw new Error(response.message || "Failed to update course price");
      }
    } catch (error2) {
      console.error("Error updating course price:", error2);
      const errorMessage = error2?.response?.data?.message || "Failed to update course price";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const isLoading = fetchingCourse || loading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }),
        "Update Course Price"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the price for this course. The price will be used for all future registrations." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: fetchingCourse ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-sm text-muted-foreground", children: "Loading course details..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base font-semibold", children: [
            courseCode,
            " - ",
            courseTitle
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "price", children: [
            "Price ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "price",
              type: "number",
              min: "0",
              step: "0.01",
              placeholder: "Enter price",
              value: price,
              onChange: (e) => {
                setPrice(e.target.value);
                setError("");
              },
              className: error ? "border-destructive" : "",
              disabled: isLoading
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter the price for this course. Use 0 for free courses." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "currency", children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: currency,
              onValueChange: setCurrency,
              disabled: isLoading,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "currency", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCIES.map((curr) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: curr, children: curr }, curr)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: isLoading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isLoading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Updating..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "mr-2 h-4 w-4" }),
          "Update Price"
        ] }) })
      ] })
    ] }) })
  ] }) });
}

export { UpdateCoursePriceDialog as default };
