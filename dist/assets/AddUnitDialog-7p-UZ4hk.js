import { r as reactExports, j as jsxRuntimeExports, bk as Upload, B as Button, X, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { A as AddUnit, U as UploadUnitVideo } from './courses-DmFTm-zX.js';
import { P as Progress } from './progress-B5LDT67g.js';
import { C as ContentEditor } from './ContentEditor-C7WWW0-1.js';

function AddUnitDialog({
  open,
  onOpenChange,
  moduleId,
  moduleTitle,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [formData, setFormData] = reactExports.useState({
    title: "",
    content: "",
    content_type: "html",
    order: 1,
    status: "uncompleted"
  });
  const [videoFile, setVideoFile] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a lesson title");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Please enter lesson content");
      return;
    }
    try {
      setLoading(true);
      const unitData = {
        ...formData,
        content_type: "html"
        // Always use html for rich text editor content
      };
      const response = await AddUnit(moduleId, unitData);
      const data = response.data;
      if (!data?.data?.id) {
        throw new Error("Failed to create unit - no unit ID returned");
      }
      const unitId = data.data.id;
      if (videoFile) {
        try {
          await UploadUnitVideo(moduleId, String(unitId), videoFile, (progress) => {
            setUploadProgress(progress);
          });
          toast.success("Unit created and video uploaded successfully");
        } catch (videoError) {
          console.error("Error uploading video:", videoError);
          toast.warning("Unit created but video upload failed. You can upload the video later.");
        }
      } else {
        toast.success("Unit created successfully");
      }
      setFormData({
        title: "",
        content: "",
        content_type: "html",
        order: 1,
        status: "uncompleted"
      });
      setVideoFile(null);
      setUploadProgress(0);
      setIsDragging(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating unit:", error);
      toast.error(error.response?.data?.message || "Failed to create unit");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: "",
        content: "",
        content_type: "html",
        order: 1,
        status: "uncompleted"
      });
      setVideoFile(null);
      setUploadProgress(0);
      setIsDragging(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onOpenChange(false);
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size must be less than 50MB");
        return;
      }
      const validTypes = ["video/mp4", "video/mov", "video/avi", "video/x-msvideo", "video/x-matroska", "video/webm"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload MP4, MOV, AVI, MKV, or WebM");
        return;
      }
      setVideoFile(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size must be less than 50MB");
        return;
      }
      const validTypes = ["video/mp4", "video/mov", "video/avi", "video/x-msvideo", "video/x-matroska", "video/webm"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload MP4, MOV, AVI, MKV, or WebM");
        return;
      }
      setVideoFile(file);
    }
  };
  const handleRemoveVideo = () => {
    setVideoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "px-6 pt-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Lesson" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: moduleTitle ? `Add a new lesson to ${moduleTitle}` : "Add a new lesson to this module" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-6 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Lesson Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              placeholder: "Enter lesson title",
              value: formData.title,
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              disabled: loading,
              required: true,
              className: "w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Video File (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"}`,
              onDragOver: handleDragOver,
              onDragLeave: handleDragLeave,
              onDrop: handleDrop,
              onClick: () => fileInputRef.current?.click(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "video/mp4,video/mov,video/avi,video/x-msvideo,video/x-matroska,video/webm",
                    onChange: handleFileChange,
                    disabled: loading,
                    className: "hidden"
                  }
                ),
                videoFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: videoFile.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        className: "h-6 w-6",
                        onClick: (e) => {
                          e.stopPropagation();
                          handleRemoveVideo();
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                      }
                    )
                  ] }),
                  uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: uploadProgress }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                      "Uploading... ",
                      uploadProgress,
                      "%"
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: "Drag & drop a video file here, or click to select" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Supports: MP4, MOV, AVI, MKV, WebM (Max: 50MB)" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Lesson Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ContentEditor,
            {
              value: formData.content,
              onChange: (html) => setFormData({ ...formData, content: html })
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
            onClick: handleClose,
            disabled: loading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Add Unit" })
      ] })
    ] })
  ] }) });
}

export { AddUnitDialog as default };
