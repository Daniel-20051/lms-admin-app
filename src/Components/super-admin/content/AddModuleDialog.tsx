import { useState } from "react";
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
import { Textarea } from "@/Components/ui/textarea";
import { Api } from "@/api";
import { toast } from "sonner";

interface AddModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  onSuccess: () => void;
}

export default function AddModuleDialog({
  open,
  onOpenChange,
  courseId,
  onSuccess,
}: AddModuleDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a module title");
      return;
    }

    try {
      setLoading(true);
      const api = new Api();
      const response = await api.AddModule(
        courseId,
        formData.title,
        formData.description
      );
      
      // Check for success in response (could be status or success field)
      if (response.data?.status || response.data?.success || response.status === 201 || response.status === 200) {
        toast.success("Module created successfully");
        setFormData({ title: "", description: "" });
        onSuccess();
        onOpenChange(false); // Auto-close dialog on success
      } else {
        toast.error(response.data?.message || "Failed to create module");
      }
    } catch (error: any) {
      console.error("Error creating module:", error);
      toast.error(error.response?.data?.message || "Failed to create module");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ title: "", description: "" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
            <DialogDescription>
              Create a new module to organize your course content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Module Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Programming"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what this module covers..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={loading}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Module"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

