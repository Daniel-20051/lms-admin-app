import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogBody,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import {
  createFaculty,
  type CreateFacultyData,
} from "@/api/admin";
import { toast } from "sonner";

interface CreateFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFacultyCreated?: () => void;
}

export default function CreateFacultyDialog({
  open,
  onOpenChange,
  onFacultyCreated,
}: CreateFacultyDialogProps) {
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<CreateFacultyData>({
    name: "",
    description: "",
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter a faculty name");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a faculty description");
      return;
    }

    try {
      setCreating(true);
      const response = await createFaculty(formData);
      if (response.success) {
        toast.success(response.message || "Faculty created successfully");
        setFormData({
          name: "",
          description: "",
        });
        onFacultyCreated?.();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error creating faculty:", error);
      toast.error(error.response?.data?.message || "Failed to create faculty");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Faculty</DialogTitle>
          <DialogDescription>
            Add a new faculty to the system. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Faculty Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Faculty of Engineering"
                required
                disabled={creating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="e.g., Engineering programs and courses"
                rows={4}
                required
                disabled={creating}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creating}>
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Faculty
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

