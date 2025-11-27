import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Card, CardContent } from "@/Components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  User, 
  UserCheck, 
  UserX, 
  RefreshCw,
  FileText,
  Wallet,
  CreditCard,
  Award,
  MapPin,
  Building2,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { getStudentFullDetails, type StudentFullDetails } from "@/api/admin";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import ManageWalletDialog from "./ManageWalletDialog";
import { formatCurrency, sanitizeString, sanitizeCurrency } from "@/lib/utils";

interface ViewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: number | null;
}

export default function ViewStudentDialog({
  open,
  onOpenChange,
  studentId,
}: ViewStudentDialogProps) {
  const { isSuperAdmin } = useAuth();
  const [studentData, setStudentData] = useState<StudentFullDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manageWalletOpen, setManageWalletOpen] = useState(false);
  const [expandedRegistrations, setExpandedRegistrations] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (open && studentId) {
      // Reset states first
      setStudentData(null);
      setError(null);
      setLoading(false);
      
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
      setStudentData(null);
      setError(null);
      setLoading(false);
      // Force restore pointer events and scroll
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    };
  }, [open, studentId]);

  const fetchStudentDetails = async () => {
    if (!studentId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getStudentFullDetails(studentId);
      if (response.success) {
        setStudentData(response.data);
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

  const getStatusBadge = (status: string) => {
    if (status === "active" || status === "Active") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <UserCheck className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    } else if (status === "inactive" || status === "Inactive") {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <UserX className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      );
    }
    return <Badge variant="outline">{status}</Badge>;
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-5xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          // Prevent closing while loading
          if (loading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {studentData?.personalInformation 
              ? `Student Profile: ${sanitizeString(studentData.personalInformation.fname)} ${sanitizeString(studentData.personalInformation.mname || '')} ${sanitizeString(studentData.personalInformation.lname)}`.trim()
              : "Student Details"}
          </DialogTitle>
          <DialogDescription>
            Comprehensive student information and academic records
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : studentData ? (
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-4">
              <TabsTrigger value="personal" className="flex items-center gap-1 text-xs">
                <User className="h-3 w-3" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="registrations" className="flex items-center gap-1 text-xs">
                <FileText className="h-3 w-3" />
                Registrations
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-1 text-xs">
                <BookOpen className="h-3 w-3" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex items-center gap-1 text-xs">
                <Award className="h-3 w-3" />
                Exams
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center gap-1 text-xs">
                <Wallet className="h-3 w-3" />
                Wallet
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-1 text-xs">
                <CreditCard className="h-3 w-3" />
                Payments
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Personal Information</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-base font-medium mt-1">
                        {sanitizeString(studentData.personalInformation.fname)} {sanitizeString(studentData.personalInformation.mname || '')} {sanitizeString(studentData.personalInformation.lname)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <div className="mt-1">{getStatusBadge(studentData.personalInformation.admin_status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{sanitizeString(studentData.personalInformation.email)}</p>
                      </div>
                    </div>
                    {studentData.personalInformation.phone && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{sanitizeString(studentData.personalInformation.phone)}</p>
                        </div>
                      </div>
                    )}
                    {studentData.personalInformation.gender && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Gender</label>
                        <p className="text-sm mt-1">{sanitizeString(studentData.personalInformation.gender)}</p>
                      </div>
                    )}
                    {studentData.personalInformation.dob && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{formatDate(studentData.personalInformation.dob)}</p>
                        </div>
                      </div>
                    )}
                    {studentData.personalInformation.address && (
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Address</label>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{sanitizeString(studentData.personalInformation.address)}</p>
                        </div>
                      </div>
                    )}
                    {studentData.personalInformation.state_origin && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">State of Origin</label>
                        <p className="text-sm mt-1">{sanitizeString(studentData.personalInformation.state_origin)}</p>
                      </div>
                    )}
                    {studentData.personalInformation.country && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Country</label>
                        <p className="text-sm mt-1">{sanitizeString(studentData.personalInformation.country)}</p>
                      </div>
                    )}
                    {studentData.personalInformation.study_mode && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Study Mode</label>
                        <p className="text-sm mt-1">{sanitizeString(studentData.personalInformation.study_mode)}</p>
                      </div>
                    )}
                    {studentData.personalInformation.application_code && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Application Code</label>
                        <code className="text-sm bg-muted px-2 py-1 rounded block mt-1 w-fit">
                          {studentData.personalInformation.application_code}
                        </code>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Faculty & Program Information */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Academic Information</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Matric Number</label>
                      {studentData.personalInformation.matric_number ? (
                        <code className="text-sm bg-muted px-2 py-1 rounded block mt-1 w-fit">
                          {sanitizeString(studentData.personalInformation.matric_number)}
                        </code>
                      ) : (
                        <p className="text-sm text-muted-foreground italic mt-1">Not assigned</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Level</label>
                      <p className="text-base font-medium mt-1">{sanitizeString(studentData.personalInformation.level)} Level</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Faculty</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{studentData.faculty.name}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Program</label>
                      <p className="text-sm mt-1">{studentData.program.title}</p>
                    </div>
                    {studentData.personalInformation.date && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Enrolled Since</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{formatDate(studentData.personalInformation.date)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Registrations Tab */}
            <TabsContent value="registrations" className="space-y-4">
              {studentData.registrations && studentData.registrations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium w-8"></th>
                        <th className="text-left p-2 font-medium">Academic Year</th>
                        <th className="text-left p-2 font-medium">Semester</th>
                        <th className="text-left p-2 font-medium">Registration Date</th>
                        <th className="text-center p-2 font-medium">Status</th>
                        <th className="text-center p-2 font-medium">Courses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.registrations.map((registration, index) => {
                        const isExpanded = expandedRegistrations.has(index);
                        const toggleExpand = () => {
                          const newExpanded = new Set(expandedRegistrations);
                          if (isExpanded) {
                            newExpanded.delete(index);
                          } else {
                            newExpanded.add(index);
                          }
                          setExpandedRegistrations(newExpanded);
                        };

                        return (
                          <>
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-2">
                                {registration.courses && registration.courses.length > 0 && (
                                  <button
                                    onClick={toggleExpand}
                                    className="flex items-center justify-center w-6 h-6 rounded hover:bg-muted transition-colors"
                                    aria-label={isExpanded ? "Collapse courses" : "Expand courses"}
                                  >
                                    {isExpanded ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </button>
                                )}
                              </td>
                              <td className="p-2 font-medium">{registration.academic_year}</td>
                              <td className="p-2">{registration.semester}</td>
                              <td className="p-2 text-xs">{formatDate(registration.registration_date)}</td>
                              <td className="p-2 text-center">
                                <Badge 
                                  variant={registration.registration_status === "registered" ? "default" : "secondary"} 
                                  className="text-xs capitalize"
                                >
                                  {sanitizeString(registration.registration_status)}
                                </Badge>
                              </td>
                              <td className="p-2 text-center">
                                <span className="font-medium">{registration.course_count}</span>
                                {registration.courses && registration.courses.length > 0 && (
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({registration.courses.length})
                                  </span>
                                )}
                              </td>
                            </tr>
                            {isExpanded && registration.courses && registration.courses.length > 0 && (
                              <tr key={`${index}-courses`} className="border-b bg-muted/30">
                                <td colSpan={6} className="p-4">
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-sm mb-2">Registered Courses:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                      {registration.courses.map((course) => (
                                        <div
                                          key={course.id}
                                          className="flex items-center gap-2 p-2 rounded-md bg-background border"
                                        >
                                          <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                              {sanitizeString(course.title)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              <code>{course.course_code}</code>
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No registrations found</p>
                </div>
              )}
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              {studentData.courses && studentData.courses.length > 0 ? (
                <div className="space-y-6">
                  {studentData.courses.map((courseGroup, groupIndex) => (
                    <Card key={groupIndex}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold">
                            {courseGroup.academic_year} - {courseGroup.semester} Semester
                          </h3>
                          <Badge variant="outline" className="ml-auto">
                            {courseGroup.courses.length} {courseGroup.courses.length === 1 ? 'Course' : 'Courses'}
                          </Badge>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2 font-medium">Course</th>
                                <th className="text-left p-2 font-medium">Code</th>
                                <th className="text-center p-2 font-medium">Type</th>
                                <th className="text-center p-2 font-medium">Unit</th>
                                <th className="text-center p-2 font-medium">Level</th>
                                <th className="text-left p-2 font-medium">Instructor</th>
                                <th className="text-center p-2 font-medium">1st CA</th>
                                <th className="text-center p-2 font-medium">2nd CA</th>
                                <th className="text-center p-2 font-medium">3rd CA</th>
                                <th className="text-center p-2 font-medium">Exam</th>
                                <th className="text-center p-2 font-medium">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {courseGroup.courses.map((course, courseIndex) => (
                                <tr key={courseIndex} className="border-b hover:bg-muted/50">
                                  <td className="p-2">
                                    <div className="font-medium">{course?.title || "N/A"}</div>
                                  </td>
                                  <td className="p-2">
                                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                      {course?.course_code || "N/A"}
                                    </code>
                                  </td>
                                  <td className="p-2 text-center">
                                    <Badge variant="outline" className="text-xs">
                                      {course?.course_type || "N/A"}
                                    </Badge>
                                  </td>
                                  <td className="p-2 text-center">{course?.course_unit || "-"}</td>
                                  <td className="p-2 text-center">
                                    Level {course?.course_level || "N/A"}
                                  </td>
                                  <td className="p-2">
                                    {course?.instructor ? (
                                      <span className="text-xs">{sanitizeString(course.instructor.full_name)}</span>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">N/A</span>
                                    )}
                                  </td>
                                  <td className="p-2 text-center font-medium">
                                    {course?.results?.first_ca ?? "-"}
                                  </td>
                                  <td className="p-2 text-center font-medium">
                                    {course?.results?.second_ca ?? "-"}
                                  </td>
                                  <td className="p-2 text-center font-medium">
                                    {course?.results?.third_ca ?? "-"}
                                  </td>
                                  <td className="p-2 text-center font-medium">
                                    {course?.results?.exam_score ?? "-"}
                                  </td>
                                  <td className="p-2 text-center font-bold">
                                    {course?.results?.total_score ?? "-"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No courses found</p>
                </div>
              )}
            </TabsContent>

            {/* Exams Tab */}
            <TabsContent value="exams" className="space-y-4">
              {studentData.exams && studentData.exams.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Exam Title</th>
                        <th className="text-left p-2 font-medium">Course</th>
                        <th className="text-center p-2 font-medium">Attempt</th>
                        <th className="text-center p-2 font-medium">Status</th>
                        <th className="text-center p-2 font-medium">Score</th>
                        <th className="text-left p-2 font-medium">Started</th>
                        <th className="text-left p-2 font-medium">Submitted</th>
                        <th className="text-left p-2 font-medium">Graded</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.exams.map((exam) => (
                        <tr key={exam.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div className="font-medium">{exam.exam.title}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-xs">
                              {exam.exam.course.title} ({exam.exam.course.course_code})
                            </div>
                          </td>
                          <td className="p-2 text-center">#{exam.attempt_no}</td>
                          <td className="p-2 text-center">
                            <Badge variant={exam.status === "graded" ? "default" : "secondary"} className="text-xs">
                              {exam.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-center font-medium">
                            {exam.total_score} / {exam.max_score}
                          </td>
                          <td className="p-2 text-xs">
                            {exam.started_at ? formatDate(exam.started_at) : "-"}
                          </td>
                          <td className="p-2 text-xs">
                            {exam.submitted_at ? formatDate(exam.submitted_at) : "-"}
                          </td>
                          <td className="p-2 text-xs">
                            {exam.graded_at ? formatDate(exam.graded_at) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No exam records found</p>
                </div>
              )}
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-4">
              {studentData.wallet ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">Wallet Balance</h3>
                      </div>
                      {isSuperAdmin && (
                        <Button
                          onClick={() => setManageWalletOpen(true)}
                          size="sm"
                          variant="outline"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Manage Wallet
                        </Button>
                      )}
                    </div>
                    <div className="mb-6">
                      <p className="text-3xl font-bold">
                        {formatCurrency(studentData.wallet.balance, studentData.wallet.currency)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Current Balance</p>
                    </div>
                    {studentData.wallet.summary && (
                      <div className="grid gap-4 sm:grid-cols-3 mb-6 border-t pt-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Total Credits</label>
                          <p className="text-lg font-medium text-green-600 mt-1">
                            {formatCurrency(studentData.wallet.summary.total_credits, studentData.wallet.currency)}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Total Debits</label>
                          <p className="text-lg font-medium text-red-600 mt-1">
                            {formatCurrency(studentData.wallet.summary.total_debits, studentData.wallet.currency)}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Net Balance</label>
                          <p className="text-lg font-medium mt-1">
                            {formatCurrency(studentData.wallet.summary.net_balance, studentData.wallet.currency)}
                          </p>
                        </div>
                      </div>
                    )}
                    {studentData.wallet.transactions && studentData.wallet.transactions.length > 0 ? (
                      <div>
                        <h4 className="font-medium mb-3">Transaction History</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2 font-medium">Date</th>
                                <th className="text-left p-2 font-medium">Service</th>
                                <th className="text-right p-2 font-medium">Amount</th>
                                <th className="text-right p-2 font-medium">Balance</th>
                                <th className="text-center p-2 font-medium">Type</th>
                                <th className="text-left p-2 font-medium">Ref</th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentData.wallet.transactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b hover:bg-muted/50">
                                  <td className="p-2 text-xs">{formatDate(transaction.date)}</td>
                                  <td className="p-2">{transaction.service_name || "N/A"}</td>
                                  <td className="p-2 text-right font-medium">
                                    {formatCurrency(transaction.amount, transaction.currency || studentData.wallet.currency)}
                                  </td>
                                  <td className="p-2 text-right">
                                    {formatCurrency(transaction.balance, transaction.currency || studentData.wallet.currency)}
                                  </td>
                                  <td className="p-2 text-center">
                                    <Badge variant={transaction.type === "Credit" ? "default" : "secondary"} className="text-xs">
                                      {transaction.type}
                                    </Badge>
                                  </td>
                                  <td className="p-2 text-xs">{transaction.ref || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No transactions found</p>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8">
                  <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No wallet data available</p>
                </div>
              )}
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-4">
              {studentData.payments ? (
                <>
                  {/* School Fees */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">School Fees</h3>
                      </div>
                      {(studentData.payments.schoolFees?.currentSemester || (studentData.payments.schoolFees?.history && studentData.payments.schoolFees.history.length > 0)) ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2 font-medium">Date</th>
                                <th className="text-left p-2 font-medium">Academic Year</th>
                                <th className="text-left p-2 font-medium">Semester</th>
                                <th className="text-right p-2 font-medium">Amount</th>
                                <th className="text-center p-2 font-medium">Status</th>
                                <th className="text-left p-2 font-medium">Teller No</th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentData.payments.schoolFees?.currentSemester && (
                                <tr className="border-b hover:bg-muted/50 bg-muted/30">
                                  <td className="p-2 font-medium">{formatDate(studentData.payments.schoolFees.currentSemester.date)}</td>
                                  <td className="p-2 font-medium">{studentData.payments.schoolFees.currentSemester.academic_year}</td>
                                  <td className="p-2 font-medium">{studentData.payments.schoolFees.currentSemester.semester}</td>
                                  <td className="p-2 text-right font-medium">
                                    {formatCurrency(studentData.payments.schoolFees.currentSemester.amount, "NGN")}
                                  </td>
                                  <td className="p-2 text-center">
                                    <Badge variant={studentData.payments.schoolFees.currentSemester.paid ? "default" : "secondary"}>
                                      {studentData.payments.schoolFees.currentSemester.status}
                                    </Badge>
                                  </td>
                                  <td className="p-2 text-xs">-</td>
                                </tr>
                              )}
                              {studentData.payments.schoolFees?.history && studentData.payments.schoolFees.history.map((payment) => (
                                <tr key={payment.id} className="border-b hover:bg-muted/50">
                                  <td className="p-2">{formatDate(payment.date)}</td>
                                  <td className="p-2">{payment.academic_year}</td>
                                  <td className="p-2">{payment.semester}</td>
                                  <td className="p-2 text-right font-medium">
                                    {formatCurrency(payment.amount, payment.currency)}
                                  </td>
                                  <td className="p-2 text-center">
                                    <Badge variant={payment.status === "Paid" ? "default" : "secondary"}>
                                      {payment.status}
                                    </Badge>
                                  </td>
                                  <td className="p-2 text-xs">{payment.teller_no || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No payment history found</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Course Orders */}
                  {studentData.payments.courseOrders && studentData.payments.courseOrders.length > 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-4">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold">Course Orders</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2 font-medium">Date</th>
                                <th className="text-left p-2 font-medium">Academic Year</th>
                                <th className="text-left p-2 font-medium">Semester</th>
                                <th className="text-right p-2 font-medium">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentData.payments.courseOrders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-muted/50">
                                  <td className="p-2">{formatDate(order.date)}</td>
                                  <td className="p-2">{order.academic_year}</td>
                                  <td className="p-2">{order.semester}</td>
                                  <td className="p-2 text-right font-medium">
                                    {order.amount ? formatCurrency(order.amount, order.currency || "NGN") : "N/A"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No payment data available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : error ? (
          <div className="py-8 text-center">
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
          <div className="py-8 text-center text-muted-foreground">
            No student data available
          </div>
        )}
      </DialogContent>

      {/* Manage Wallet Dialog */}
      {studentData && (
        <ManageWalletDialog
          open={manageWalletOpen}
          onOpenChange={setManageWalletOpen}
          studentId={studentId}
          studentName={`${sanitizeString(studentData.personalInformation.fname)} ${sanitizeString(studentData.personalInformation.lname)}`}
          currentBalance={parseFloat(studentData.wallet?.balance || "0")}
          currency={sanitizeCurrency(studentData.wallet?.currency)}
          onSuccess={fetchStudentDetails}
        />
      )}
    </Dialog>
  );
}

