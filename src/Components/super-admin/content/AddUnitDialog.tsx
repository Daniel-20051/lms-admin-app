import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { AddUnit, UploadUnitVideo } from "@/api/courses";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { Progress } from "@/Components/ui/progress";
import ContentEditor from "@/Components/admin/ContentEditor";

interface AddUnitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleId: string;
  moduleTitle?: string;
  onSuccess: () => void;
}

export default function AddUnitDialog({
  open,
  onOpenChange,
  moduleId,
  moduleTitle,
  onSuccess,
}: AddUnitDialogProps) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    content_type: "html",
    order: 1,
    status: "uncompleted",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      
      // Create unit with html content_type (video upload happens separately)
      const unitData = {
        ...formData,
        content_type: "html", // Always use html for rich text editor content
      };
      
      const response = await AddUnit(moduleId, unitData);
      
      // Check if unit was created successfully
      if (!response.data?.data?.id) {
        throw new Error("Failed to create unit - no unit ID returned");
      }
      
      const unitId = response.data.data.id;
      
      // If video file is selected, upload it to the created unit
      if (videoFile) {
        try {
          await UploadUnitVideo(moduleId, String(unitId), videoFile, (progress) => {
            setUploadProgress(progress);
          });
          toast.success("Unit created and video uploaded successfully");
        } catch (videoError: any) {
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
        status: "uncompleted",
      });
      setVideoFile(null);
      setUploadProgress(0);
      setIsDragging(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
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
        status: "uncompleted",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size must be less than 50MB");
        return;
      }
      // Validate file type
      const validTypes = ["video/mp4", "video/mov", "video/avi", "video/x-msvideo", "video/x-matroska", "video/webm"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload MP4, MOV, AVI, MKV, or WebM");
        return;
      }
      setVideoFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      // Validate file size (50MB max)
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size must be less than 50MB");
        return;
      }
      // Validate file type
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Add New Lesson</DialogTitle>
          <DialogDescription>
            {moduleTitle ? `Add a new lesson to ${moduleTitle}` : "Add a new lesson to this module"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 pb-6">
            {/* Lesson Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                placeholder="Enter lesson title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={loading}
                required
                className="w-full"
              />
            </div>

            {/* Video File Upload */}
            <div className="space-y-2">
              <Label>Video File (Optional)</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/mov,video/avi,video/x-msvideo,video/x-matroska,video/webm"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="hidden"
                />
                {videoFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="h-6 w-6 text-primary" />
                      <span className="font-medium">{videoFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveVideo();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="space-y-2 mt-4">
                        <Progress value={uploadProgress} />
                        <p className="text-sm text-muted-foreground">
                          Uploading... {uploadProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      Drag & drop a video file here, or click to select
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: MP4, MOV, AVI, MKV, WebM (Max: 50MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Lesson Content */}
            <div className="space-y-2">
              <Label>Lesson Content</Label>
              <ContentEditor
                value={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
            </div>
          </div>
          <DialogFooter className="px-6 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Add Unit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

