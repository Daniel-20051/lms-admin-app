import { r as reactExports, t as toast, j as jsxRuntimeExports, B as Button, p as SquarePen, H as Settings, c as LoaderCircle, q as Save, X } from './index-BG4-akrH.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-DKXLAlrm.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { T as Textarea } from './textarea-LWcfCAwC.js';
import { S as Skeleton } from './skeleton-Bd8cuwAJ.js';
import { o as getSystemSettings, p as updateSystemSettings } from './admin-BVl3HTxX.js';

function SettingsPage() {
  const [settings, setSettings] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    address: "",
    rate: ""
  });
  reactExports.useEffect(() => {
    fetchSettings();
  }, []);
  reactExports.useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.name || "",
        address: settings.address || "",
        rate: settings.rate || ""
      });
    }
  }, [settings]);
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await getSystemSettings();
      if (response.success) {
        setSettings(response.data.settings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error(error.response?.data?.message || "Failed to load system settings");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a system name");
      return;
    }
    if (!formData.rate.trim()) {
      toast.error("Please enter a rate");
      return;
    }
    try {
      setIsSaving(true);
      const response = await updateSystemSettings(formData);
      if (response.success) {
        toast.success(response.message || "System settings updated successfully");
        setSettings(response.data.settings);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error(error.response?.data?.message || "Failed to update system settings");
    } finally {
      setIsSaving(false);
    }
  };
  const handleCancel = () => {
    if (settings) {
      setFormData({
        name: settings.name || "",
        address: settings.address || "",
        rate: settings.rate || ""
      });
    }
    setIsEditing(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "System Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage system-wide configuration" })
      ] }),
      !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIsEditing(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
        "Edit Settings"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "General Settings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Configure the basic system information and settings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "System Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "Enter system name",
              disabled: !isEditing,
              className: !isEditing ? "bg-muted" : ""
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "address",
              value: formData.address,
              onChange: (e) => setFormData({ ...formData, address: e.target.value }),
              placeholder: "Enter system address",
              rows: 3,
              disabled: !isEditing,
              className: !isEditing ? "bg-muted" : ""
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rate", children: "Rate *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "rate",
              type: "text",
              value: formData.rate,
              onChange: (e) => setFormData({ ...formData, rate: e.target.value }),
              placeholder: "Enter rate",
              disabled: !isEditing,
              className: !isEditing ? "bg-muted" : ""
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "System rate or fee amount" })
        ] }),
        isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-4 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: isSaving,
              children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Saving..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
                "Save Changes"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: handleCancel,
              disabled: isSaving,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-2 h-4 w-4" }),
                "Cancel"
              ]
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}

export { SettingsPage as default };
