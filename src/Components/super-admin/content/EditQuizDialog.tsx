import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { UpdateQuiz } from "@/api/quiz";
import { toast } from "sonner";

interface Quiz {
  id: number;
  title: string;
  description?: string;
  duration_minutes: number;
  status: string;
}

interface EditQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz: Quiz;
  onSuccess: () => void;
}

export default function EditQuizDialog({
  open,
  onOpenChange,
  quiz,
  onSuccess,
}: EditQuizDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: quiz.title,
    description: quiz.description || "",
    duration_minutes: quiz.duration_minutes,
    status: quiz.status,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        title: quiz.title,
        description: quiz.description || "",
        duration_minutes: quiz.duration_minutes,
        status: quiz.status,
      });
    }
  }, [open, quiz]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }

    try {
      setLoading(true);
      await UpdateQuiz(quiz.id, formData);
      toast.success("Quiz updated successfully");
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error updating quiz:", error);
      toast.error(error.response?.data?.message || "Failed to update quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Quiz</DialogTitle>
            <DialogDescription>
              Update the quiz details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Module 1 Assessment"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={formData.duration_minutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration_minutes: parseInt(e.target.value) || 30,
                    })
                  }
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the quiz..."
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
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Quiz"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

