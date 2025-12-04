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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Loader2, Plus } from "lucide-react";
import { createStudent, type CreateStudentData } from "@/api/admin";
import { getPrograms } from "@/api/programs";
import { toast } from "sonner";

interface CreateStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudentCreated: () => void;
}

export default function CreateStudentDialog({
  open,
  onOpenChange,
  onStudentCreated,
}: CreateStudentDialogProps) {
  const [creating, setCreating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [programs, setPrograms] = useState<Array<{ id: number; title: string }>>([]);
  const [formData, setFormData] = useState<CreateStudentData>({
    email: "",
    password: "",
    fname: "",
    lname: "",
    matric_number: "",
    level: 100,
    program_id: 1,
    currency: "NGN",
    referral_code: "",
    designated_institute: 0,
    foreign_student: 0,
  });

  // Fetch programs when dialog opens
  useEffect(() => {
    if (open) {
      fetchPrograms();
    }
  }, [open]);

  const fetchPrograms = async () => {
    setFetching(true);
    try {
      const programsResponse = await getPrograms({ limit: 1000 });
      setPrograms(programsResponse.data.programs.map(p => ({ id: p.id, title: p.title })));
      
      // Set default program if available
      if (programsResponse.data.programs.length > 0 && !formData.program_id) {
        setFormData(prev => ({ ...prev, program_id: programsResponse.data.programs[0].id }));
      }
    } catch (error: any) {
      console.error('Error fetching programs:', error);
      toast.error('Failed to load programs');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: 
        name === "level" || name === "program_id" || name === "designated_institute" || name === "foreign_student"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password || !formData.fname || !formData.lname) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.program_id || formData.program_id < 1) {
      toast.error("Please select a program");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setCreating(true);
      const response = await createStudent(formData);
      if (response.success) {
        toast.success(response.message || "Student created successfully");
        // Reset form
        const defaultProgramId = programs.length > 0 ? programs[0].id : 1;
        setFormData({
          email: "",
          password: "",
          fname: "",
          lname: "",
          matric_number: "",
          level: 100,
          program_id: defaultProgramId,
          currency: "NGN",
          referral_code: "",
          designated_institute: 0,
          foreign_student: 0,
        });
        onStudentCreated();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error creating student:", error);
      toast.error(error.response?.data?.message || "Failed to create student");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          // Prevent closing while creating
          if (creating) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          // Prevent closing with Escape while creating
          if (creating) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Create a new student account. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Personal Information */}
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
                  disabled={creating}
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
                  disabled={creating}
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="student@example.com"
                  required
                  disabled={creating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  disabled={creating}
                />
              </div>
            </div>

            {/* Matric Number */}
            <div className="space-y-2">
              <Label htmlFor="matric_number">Matric Number</Label>
              <Input
                id="matric_number"
                name="matric_number"
                value={formData.matric_number}
                onChange={handleInputChange}
                placeholder="e.g., WPU/2024/999"
                disabled={creating}
              />
              <p className="text-xs text-muted-foreground">
                Optional. Will be auto-generated if left empty.
              </p>
            </div>

            {/* Level & Program */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="level">Level *</Label>
                <Select
                  value={formData.level.toString()}
                  onValueChange={(value) => setFormData({ ...formData, level: parseInt(value) })}
                  disabled={creating}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 Level</SelectItem>
                    <SelectItem value="200">200 Level</SelectItem>
                    <SelectItem value="300">300 Level</SelectItem>
                    <SelectItem value="400">400 Level</SelectItem>
                    <SelectItem value="500">500 Level</SelectItem>
                    <SelectItem value="600">600 Level</SelectItem>
                    <SelectItem value="700">700 Level</SelectItem>
                    <SelectItem value="800">800 Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="program_id">Program *</Label>
                <Select
                  value={formData.program_id?.toString() || ""}
                  onValueChange={(value) => setFormData({ ...formData, program_id: parseInt(value) })}
                  disabled={creating || fetching}
                >
                  <SelectTrigger id="program_id">
                    <SelectValue placeholder={fetching ? "Loading programs..." : "Select a program"} />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id.toString()}>
                        {program.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {programs.length === 0 && !fetching && (
                  <p className="text-xs text-muted-foreground">
                    No programs available
                  </p>
                )}
              </div>
            </div>

            {/* Optional Fields */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Optional Fields</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    disabled={creating}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referral_code">Referral Code</Label>
                  <Input
                    id="referral_code"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleInputChange}
                    placeholder="Enter referral code"
                    disabled={creating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designated_institute">Designated Institute</Label>
                  <Input
                    id="designated_institute"
                    name="designated_institute"
                    type="number"
                    min="0"
                    value={formData.designated_institute}
                    onChange={handleInputChange}
                    placeholder="0"
                    disabled={creating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foreign_student">Foreign Student</Label>
                  <Input
                    id="foreign_student"
                    name="foreign_student"
                    type="number"
                    min="0"
                    max="1"
                    value={formData.foreign_student}
                    onChange={handleInputChange}
                    placeholder="0 = Domestic, 1 = Foreign"
                    disabled={creating}
                  />
                  <p className="text-xs text-muted-foreground">
                    0 = Domestic, 1 = Foreign
                  </p>
                </div>
              </div>
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
                  Create Student
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

