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
import { Skeleton } from "@/Components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Loader2, Save, RefreshCw } from "lucide-react";
import {
  getStudent,
  updateStudent,
  type StudentDetails,
  type UpdateStudentData,
} from "@/api/admin";
import { getPrograms } from "@/api/programs";
import { toast } from "sonner";

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: number | null;
  onStudentUpdated: (updatedData: UpdateStudentData & { id: number }) => void;
}

// Level options: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
const LEVEL_OPTIONS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const CURRENCY_OPTIONS = ['NGN', 'USD'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export default function EditStudentDialog({
  open,
  onOpenChange,
  studentId,
  onStudentUpdated,
}: EditStudentDialogProps) {
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Array<{ id: number; title: string }>>([]);
  const [fetchingPrograms, setFetchingPrograms] = useState(false);
  const [formData, setFormData] = useState<UpdateStudentData>({
    fname: "",
    lname: "",
    level: 100,
    phone: "",
    matric_number: "",
    program_id: undefined,
    foreign_student: 0,
    dob: null,
    gender: null,
    currency: "NGN",
    state_origin: null,
    address: null,
    country: "",
  });

  useEffect(() => {
    if (open && studentId) {
      // Reset states first
      setStudent(null);
      setError(null);
      setLoading(false);
      setSaving(false);
      setFormData({
        fname: "",
        lname: "",
        level: 100,
        phone: "",
        matric_number: "",
        program_id: undefined,
        foreign_student: 0,
        dob: null,
        gender: null,
        currency: "NGN",
        state_origin: null,
        address: null,
        country: "",
      });
      
      // Fetch programs and student details
      fetchPrograms();
      // Add a small delay to ensure dialog is fully mounted
      const timer = setTimeout(() => {
        fetchStudentDetails();
      }, 50);
      return () => clearTimeout(timer);
    }
    
    // Ensure body scroll is restored when dialog closes
    if (!open) {
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup on unmount
      setStudent(null);
      setError(null);
      setLoading(false);
      setSaving(false);
      // Force restore pointer events and scroll
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    };
  }, [open, studentId]);

  const fetchPrograms = async () => {
    try {
      setFetchingPrograms(true);
      const response = await getPrograms({ limit: 1000 }); // Get all programs
      if (response.success) {
        setPrograms(response.data.programs);
      }
    } catch (error: any) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to load programs");
    } finally {
      setFetchingPrograms(false);
    }
  };

  const fetchStudentDetails = async () => {
    if (!studentId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getStudent(studentId);
      if (response.success) {
        const studentData = response.data.student;
        setStudent(studentData);
        // Format date of birth for input (YYYY-MM-DD)
        const dobFormatted = studentData.dob 
          ? new Date(studentData.dob).toISOString().split('T')[0]
          : null;
        
        setFormData({
          fname: studentData.fname || "",
          lname: studentData.lname || "",
          level: studentData.level || 100,
          phone: studentData.phone || "",
          matric_number: studentData.matric_number || "",
          program_id: studentData.program_id || undefined,
          foreign_student: studentData.foreign_student !== undefined ? studentData.foreign_student : 0,
          dob: dobFormatted,
          gender: studentData.gender || null,
          currency: studentData.currency || "NGN",
          state_origin: studentData.state_origin || null,
          address: studentData.address || null,
          country: studentData.country || "",
        });
      }
    } catch (error: any) {
      console.error("Error fetching student details:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch student details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" || name === "program_id" || name === "foreign_student"
        ? (value ? parseInt(value) : undefined)
        : value === "" ? null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) return;

    try {
      setSaving(true);
      const response = await updateStudent(studentId, formData);
      if (response.success) {
        toast.success(response.message);
        // Notify parent component of the update
        onStudentUpdated({ ...formData, id: studentId });
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error updating student:", error);
      toast.error(error.response?.data?.message || "Failed to update student");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          // Prevent closing while loading or saving
          if (loading || saving) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          // Prevent closing with Escape while saving
          if (saving) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update student information. Email cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : student ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fname">First Name *</Label>
                  <Input
                    id="fname"
                    name="fname"
                    value={formData.fname}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    required
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lname">Last Name *</Label>
                  <Input
                    id="lname"
                    name="lname"
                    value={formData.lname}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    required
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={student.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="matric_number">Matric Number</Label>
                <Input
                  id="matric_number"
                  name="matric_number"
                  value={formData.matric_number}
                  onChange={handleInputChange}
                  placeholder="e.g., WPU/2024/001"
                  disabled={saving}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level?.toString() || ""}
                    onValueChange={(value) => handleSelectChange("level", value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVEL_OPTIONS.map((level) => (
                        <SelectItem key={level} value={level.toString()}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234801234567"
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="program_id">Program *</Label>
                  <Select
                    value={formData.program_id?.toString() || ""}
                    onValueChange={(value) => handleSelectChange("program_id", value)}
                    disabled={saving || fetchingPrograms}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={fetchingPrograms ? "Loading programs..." : "Select program"} />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id.toString()}>
                          {program.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency *</Label>
                  <Select
                    value={formData.currency || "NGN"}
                    onValueChange={(value) => handleSelectChange("currency", value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCY_OPTIONS.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender || undefined}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDER_OPTIONS.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob || ""}
                    onChange={handleInputChange}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state_origin">State of Origin</Label>
                  <Input
                    id="state_origin"
                    name="state_origin"
                    value={formData.state_origin || ""}
                    onChange={handleInputChange}
                    placeholder="Enter state of origin"
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foreign_student">Foreign Student</Label>
                <Select
                  value={formData.foreign_student?.toString() || "0"}
                  onValueChange={(value) => handleSelectChange("foreign_student", value)}
                  disabled={saving}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No</SelectItem>
                    <SelectItem value="1">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

              <DialogFooter className="px-6 py-4">
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
          ) : error ? (
            <div className="py-4 text-center">
              <p className="text-destructive font-medium mb-2">Failed to fetch student details</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button
                onClick={() => {
                  setError(null);
                  fetchStudentDetails();
                }}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            </div>
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              No student data available
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

