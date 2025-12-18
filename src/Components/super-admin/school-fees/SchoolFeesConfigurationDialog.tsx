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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { Loader2 } from "lucide-react";
import {
  createSchoolFeesConfiguration,
  updateSchoolFeesConfiguration,
  type SchoolFeesConfiguration,
} from "@/api/admin";
import { toast } from "sonner";

interface SchoolFeesConfigurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  configuration?: SchoolFeesConfiguration | null;
  programs: any[];
  faculties: any[];
  onSuccess?: (success: boolean) => void;
}

export default function SchoolFeesConfigurationDialog({
  open,
  onOpenChange,
  configuration,
  programs,
  faculties,
  onSuccess,
}: SchoolFeesConfigurationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    academic_year: "",
    level: "" as string | null,
    program_id: "" as string,
    faculty_id: "" as string,
    amount: "",
    currency: "NGN",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    if (configuration) {
      setFormData({
        academic_year: configuration.academic_year,
        level: configuration.level || "",
        program_id: configuration.program_id ? configuration.program_id.toString() : "",
        faculty_id: configuration.faculty_id ? configuration.faculty_id.toString() : "",
        amount: configuration.amount.toString(),
        currency: configuration.currency,
        description: configuration.description || "",
        is_active: configuration.is_active,
      });
    } else {
      setFormData({
        academic_year: "",
        level: "",
        program_id: "",
        faculty_id: "",
        amount: "",
        currency: "NGN",
        description: "",
        is_active: true,
      });
    }
  }, [configuration, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.academic_year.trim()) {
      toast.error("Academic year is required");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Amount must be a positive number");
      return;
    }

    try {
      setLoading(true);
      const data = {
        academic_year: formData.academic_year.trim(),
        level: formData.level === "" ? null : formData.level,
        program_id: formData.program_id === "" || formData.program_id === "all" ? null : Number(formData.program_id),
        faculty_id: formData.faculty_id === "" || formData.faculty_id === "all" ? null : Number(formData.faculty_id),
        amount: Number(formData.amount),
        currency: formData.currency.toUpperCase(),
        description: formData.description.trim() || undefined,
        is_active: formData.is_active,
      };

      if (configuration) {
        await updateSchoolFeesConfiguration(configuration.id, data);
        toast.success("School fees configuration updated successfully");
      } else {
        await createSchoolFeesConfiguration(data);
        toast.success("School fees configuration created successfully");
      }

      onOpenChange(false);
      if (onSuccess) onSuccess(true);
    } catch (error: any) {
      console.error("Error saving configuration:", error);
      toast.error(error.response?.data?.message || "Failed to save configuration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {configuration
              ? "Edit School Fees Configuration"
              : "Add School Fees Configuration"}
          </DialogTitle>
          <DialogDescription>
            {configuration
              ? "Update the school fees configuration for specific student groups"
              : "Create a new school fees configuration override for student groups"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="academic_year">Academic Year *</Label>
                <Input
                  id="academic_year"
                  value={formData.academic_year}
                  onChange={(e) =>
                    setFormData({ ...formData, academic_year: e.target.value })
                  }
                  placeholder="e.g., 2025/2026"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={formData.level || "all"}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      level: value === "all" ? null : value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {[100, 200, 300, 400, 500, 600, 700].map((level) => (
                      <SelectItem key={level} value={level.toString()}>
                        {level} Level
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select
                  value={formData.program_id === "" || formData.program_id === null ? "all" : formData.program_id}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      program_id: value === "all" ? "" : value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id.toString()}>
                        {program.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty">Faculty</Label>
                <Select
                  value={formData.faculty_id === "" || formData.faculty_id === null ? "all" : formData.faculty_id}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      faculty_id: value === "all" ? "" : value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Faculties</SelectItem>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id.toString()}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optional description"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_active">Active</Label>
                <p className="text-sm text-muted-foreground">
                  Only active configurations are used for fee calculation
                </p>
              </div>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
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
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {configuration ? "Updating..." : "Creating..."}
                </>
              ) : (
                configuration ? "Update" : "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

