import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import {
  updateFaculty,
  type Faculty,
  type UpdateFacultyData,
} from "@/api/admin";
import { toast } from "sonner";

interface EditFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty: Faculty | null;
  onFacultyUpdated?: () => void;
}

export default function EditFacultyDialog({
  open,
  onOpenChange,
  faculty,
  onFacultyUpdated,
}: EditFacultyDialogProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateFacultyData>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (open && faculty) {
      setFormData({
        name: faculty.name || "",
        description: faculty.description || "",
      });
    }
  }, [open, faculty]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faculty) return;

    try {
      setSaving(true);
      const response = await updateFaculty(faculty.id, formData);
      if (response.success) {
        toast.success(response.message || "Faculty updated successfully");
        onFacultyUpdated?.();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error updating faculty:", error);
      toast.error(error.response?.data?.message || "Failed to update faculty");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Faculty</DialogTitle>
          <DialogDescription>
            Update the faculty information below
          </DialogDescription>
        </DialogHeader>

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
                placeholder="Enter faculty name"
                required
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter faculty description"
                rows={4}
                disabled={saving}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

