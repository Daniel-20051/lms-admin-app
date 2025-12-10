import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { CreateExam } from "@/api/exams";
import { Api } from "@/api";
import { toast } from "sonner";

interface CreateExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: number;
  onExamCreated: () => void;
}

// Generate academic years
const generateAcademicYears = () => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let i = -5; i <= 2; i++) {
    const year = currentYear + i;
    years.push(`${year}/${year + 1}`);
  }
  return years.reverse();
};

const ACADEMIC_YEARS = generateAcademicYears();
const SEMESTERS = ["1ST", "2ND"];
const EXAM_TYPES = [
  { value: "objective-only", label: "Objective Only" },
  { value: "theory-only", label: "Theory Only" },
  { value: "mixed", label: "Mixed" },
];
const SELECTION_MODES = [
  { value: "manual", label: "Manual Selection" },
  { value: "random", label: "Random Selection" },
];
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export default function CreateExamDialog({
  open,
  onOpenChange,
  courseId,
  onExamCreated,
}: CreateExamDialogProps) {
  const [loading, setLoading] = useState(false);
  const [loadingSession, setLoadingSession] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    duration_minutes: 60,
    instructions: "",
    academic_year: "",
    semester: "1ST",
    start_at: "",
    end_at: "",
    exam_type: "mixed",
    selection_mode: "manual",
    status: "draft",
    randomize: false,
    objective_count: 0,
    theory_count: 0,
  });

  // Load active session on mount
  useEffect(() => {
    if (open) {
      loadActiveSession();
    }
  }, [open]);

  const loadActiveSession = async () => {
    try {
      setLoadingSession(true);
      const api = new Api();
      const response = await api.Getsessions();
      const items = response?.data?.data ?? response?.data ?? [];

      if (Array.isArray(items) && items.length > 0) {
        const active = items.find((it: any) => it.status === "Active");
        if (active?.academic_year) {
          setFormData((prev) => ({
            ...prev,
            academic_year: active.academic_year,
            semester: active.semester || "1ST",
          }));
        } else {
          const currentYear = new Date().getFullYear();
          setFormData((prev) => ({
            ...prev,
            academic_year: `${currentYear}/${currentYear + 1}`,
          }));
        }
      } else {
        const currentYear = new Date().getFullYear();
        setFormData((prev) => ({
          ...prev,
          academic_year: `${currentYear}/${currentYear + 1}`,
        }));
      }
    } catch (error) {
      console.error("Error loading active session:", error);
      const currentYear = new Date().getFullYear();
      setFormData((prev) => ({
        ...prev,
        academic_year: `${currentYear}/${currentYear + 1}`,
      }));
    } finally {
      setLoadingSession(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter an exam title");
      return;
    }

    if (!formData.academic_year) {
      toast.error("Please select an academic year");
      return;
    }

    if (!formData.semester) {
      toast.error("Please select a semester");
      return;
    }

    try {
      setLoading(true);

      // Format dates for API (convert datetime-local to ISO format)
      const startAt = formData.start_at
        ? new Date(formData.start_at).toISOString()
        : null;
      const endAt = formData.end_at
        ? new Date(formData.end_at).toISOString()
        : null;

      const payload = {
        course_id: courseId,
        title: formData.title.trim(),
        duration_minutes: formData.duration_minutes,
        instructions: formData.instructions.trim() || undefined,
        academic_year: formData.academic_year,
        semester: formData.semester,
        start_at: startAt,
        end_at: endAt,
        exam_type: formData.exam_type,
        selection_mode: formData.selection_mode,
        status: formData.status,
        visibility: formData.status, // visibility should match status
        randomize: formData.randomize,
        objective_count:
          formData.exam_type === "mixed" || formData.exam_type === "objective-only"
            ? formData.objective_count
            : undefined,
        theory_count:
          formData.exam_type === "mixed" || formData.exam_type === "theory-only"
            ? formData.theory_count
            : undefined,
      };

      const response = await CreateExam(payload);
      const data = response?.data as any;

      if (data?.status || data?.success || response?.status === 201) {
        toast.success("Exam created successfully");
        onExamCreated();
        handleClose();
      } else {
        toast.error(data?.message || "Failed to create exam");
      }
    } catch (error: any) {
      console.error("Error creating exam:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create exam"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: "",
        duration_minutes: 60,
        instructions: "",
        academic_year: "",
        semester: "1ST",
        start_at: "",
        end_at: "",
        exam_type: "mixed",
        selection_mode: "manual",
        status: "draft",
        randomize: false,
        objective_count: 0,
        theory_count: 0,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Exam</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="pb-6">
            <div className="space-y-4 py-4">
              {/* Title and Duration */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter exam title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    disabled={loading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Duration (minutes) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_minutes: parseInt(e.target.value) || 60,
                      })
                    }
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Enter exam instructions for students"
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  disabled={loading}
                  rows={3}
                />
              </div>

              {/* Academic Year and Semester */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="academic_year">
                    Academic Year <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.academic_year}
                    onValueChange={(value) =>
                      setFormData({ ...formData, academic_year: value })
                    }
                    disabled={loading || loadingSession}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACADEMIC_YEARS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">
                    Semester <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value) =>
                      setFormData({ ...formData, semester: value })
                    }
                    disabled={loading}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEMESTERS.map((sem) => (
                        <SelectItem key={sem} value={sem}>
                          {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start and End Date & Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start_at">Start Date & Time</Label>
                  <Input
                    id="start_at"
                    type="datetime-local"
                    value={formData.start_at}
                    onChange={(e) =>
                      setFormData({ ...formData, start_at: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_at">End Date & Time</Label>
                  <Input
                    id="end_at"
                    type="datetime-local"
                    value={formData.end_at}
                    onChange={(e) =>
                      setFormData({ ...formData, end_at: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Exam Type and Selection Mode */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select
                    value={formData.exam_type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, exam_type: value })
                    }
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXAM_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selection_mode">Selection Mode</Label>
                  <Select
                    value={formData.selection_mode}
                    onValueChange={(value) =>
                      setFormData({ ...formData, selection_mode: value })
                    }
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {SELECTION_MODES.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Question Counts (shown for mixed or relevant types) */}
              {(formData.exam_type === "mixed" ||
                formData.exam_type === "objective-only") && (
                <div className="space-y-2">
                  <Label htmlFor="objective_count">Objective Questions Count</Label>
                  <Input
                    id="objective_count"
                    type="number"
                    min="0"
                    value={formData.objective_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        objective_count: parseInt(e.target.value) || 0,
                      })
                    }
                    disabled={loading}
                  />
                </div>
              )}

              {(formData.exam_type === "mixed" ||
                formData.exam_type === "theory-only") && (
                <div className="space-y-2">
                  <Label htmlFor="theory_count">Theory Questions Count</Label>
                  <Input
                    id="theory_count"
                    type="number"
                    min="0"
                    value={formData.theory_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theory_count: parseInt(e.target.value) || 0,
                      })
                    }
                    disabled={loading}
                  />
                </div>
              )}

              {/* Status */}
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
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Randomize Questions */}
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="randomize" className="flex-1">
                  Randomize Questions
                </Label>
                <Switch
                  id="randomize"
                  checked={formData.randomize}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, randomize: checked })
                  }
                  disabled={loading}
                />
              </div>
            </div>
          </DialogBody>

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
              {loading ? "Creating..." : "Create Exam"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

