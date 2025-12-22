import { r as reactExports, j as jsxRuntimeExports, C as CircleCheck, aD as ExternalLink, bk as Upload, B as Button, X, t as toast } from './index-BG4-akrH.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-Bga1LIUy.js';
import { I as Input } from './input-DBQ7-6Gz.js';
import { L as Label } from './label-UX76_odr.js';
import { U as UploadUnitVideo, E as EditUnit } from './courses-DmFTm-zX.js';
import { P as Progress } from './progress-B5LDT67g.js';
import { C as ContentEditor } from './ContentEditor-C7WWW0-1.js';

function EditUnitDialog({
  open,
  onOpenChange,
  unit,
  onSuccess
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [formData, setFormData] = reactExports.useState({
    title: unit.title,
    content: unit.content,
    video_url: unit.video_url || ""
  });
  const [videoFile, setVideoFile] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      setFormData({
        title: unit.title,
        content: unit.content,
        video_url: unit.video_url || ""
      });
      setVideoFile(null);
      setUploadProgress(0);
      setIsDragging(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, unit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a unit title");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Please enter unit content");
      return;
    }
    try {
      setLoading(true);
      if (videoFile) {
        try {
          const videoResponse = await UploadUnitVideo(String(unit.module_id), String(unit.id), videoFile, (progress) => {
            setUploadProgress(progress);
          });
          const videoData = videoResponse.data;
          const unitData = {
            title: formData.title,
            content: formData.content,
            video_url: videoData?.data?.video_url || videoData?.video_url || formData.video_url
          };
          await EditUnit(String(unit.id), unitData);
          toast.success("Unit updated and video uploaded successfully");
        } catch (videoError) {
          console.error("Error uploading video:", videoError);
          const unitData = {
            title: formData.title,
            content: formData.content,
            video_url: formData.video_url
            // Keep existing video_url
          };
          await EditUnit(String(unit.id), unitData);
          toast.warning("Unit updated but video upload failed. You can upload the video later.");
        }
      } else {
        const unitData = {
          title: formData.title,
          content: formData.content,
          video_url: formData.video_url || void 0
        };
        await EditUnit(String(unit.id), unitData);
        toast.success("Unit updated successfully");
      }
      setVideoFile(null);
      setUploadProgress(0);
      setIsDragging(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating unit:", error);
      toast.error(error.response?.data?.message || "Failed to update unit");
    } finally {
      setLoading(false);
      setUploadProgress(0);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "px-6 pt-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Unit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the unit details and content" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-6 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Unit Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              placeholder: "e.g., Variables and Data Types",
              value: formData.title,
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              disabled: loading,
              required: true,
              className: "w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Video Files" }),
          formData.video_url && !videoFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-green-800", children: "Video already uploaded" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: formData.video_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-sm text-primary hover:underline flex items-center gap-1",
                onClick: (e) => e.stopPropagation(),
                children: [
                  "View Current Video",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
                ]
              }
            )
          ] }),
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: formData.video_url ? "Drag & drop new video files to replace current video" : "Drag & drop a video file here, or click to select" }),
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
            onClick: () => onOpenChange(false),
            disabled: loading,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Updating..." : "Update Unit" })
      ] })
    ] })
  ] }) });
}

export { EditUnitDialog as default };
