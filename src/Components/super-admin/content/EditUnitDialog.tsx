import { useState, useEffect, useRef } from "react";
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
import { EditUnit, UploadUnitVideo } from "@/api/courses";
import { toast } from "sonner";
import { Upload, X, CheckCircle2, ExternalLink } from "lucide-react";
import { Progress } from "@/Components/ui/progress";
import ContentEditor from "@/Components/admin/ContentEditor";

interface Unit {
  id: number;
  module_id: number;
  title: string;
  content: string;
  video_url?: string;
}

interface EditUnitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: Unit;
  onSuccess: () => void;
}

export default function EditUnitDialog({
  open,
  onOpenChange,
  unit,
  onSuccess,
}: EditUnitDialogProps) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: unit.title,
    content: unit.content,
    video_url: unit.video_url || "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        title: unit.title,
        content: unit.content,
        video_url: unit.video_url || "",
      });
      setVideoFile(null);
      setUploadProgress(0);
      setIsDragging(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, unit]);

  const handleSubmit = async (e: React.FormEvent) => {
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
      
      // If video file is selected, upload it first, then update unit with the video_url
      if (videoFile) {
        try {
          const videoResponse = await UploadUnitVideo(String(unit.module_id), String(unit.id), videoFile, (progress) => {
            setUploadProgress(progress);
          });
          const videoData = videoResponse.data as any;
          
          // Update unit data with the new video_url from upload response
          const unitData = {
            title: formData.title,
            content: formData.content,
            video_url: videoData?.data?.video_url || videoData?.video_url || formData.video_url,
          };
          
          await EditUnit(String(unit.id), unitData);
          toast.success("Unit updated and video uploaded successfully");
        } catch (videoError: any) {
          console.error("Error uploading video:", videoError);
          // Still try to update unit without video_url if upload fails
          const unitData = {
            title: formData.title,
            content: formData.content,
            video_url: formData.video_url, // Keep existing video_url
          };
          await EditUnit(String(unit.id), unitData);
          toast.warning("Unit updated but video upload failed. You can upload the video later.");
        }
      } else {
        // No new video file, just update unit with existing data
        const unitData = {
          title: formData.title,
          content: formData.content,
          video_url: formData.video_url || undefined,
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
    } catch (error: any) {
      console.error("Error updating unit:", error);
      toast.error(error.response?.data?.message || "Failed to update unit");
    } finally {
      setLoading(false);
      setUploadProgress(0);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Edit Unit</DialogTitle>
          <DialogDescription>
            Update the unit details and content
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 pb-6">
            <div className="space-y-2">
              <Label htmlFor="title">Unit Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Variables and Data Types"
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
            <div className="space-y-3">
              <Label>Video Files</Label>
              
              {/* Video Already Uploaded Banner */}
              {formData.video_url && !videoFile && (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Video already uploaded
                    </span>
                  </div>
                  <a
                    href={formData.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Current Video
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

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
                      {formData.video_url 
                        ? "Drag & drop new video files to replace current video"
                        : "Drag & drop a video file here, or click to select"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: MP4, MOV, AVI, MKV, WebM (Max: 50MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Unit Content */}
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
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Unit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

