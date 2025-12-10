import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { ArrowLeft, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { GetExams, DeleteExam } from "@/api/exams";
import { GetStaffCoursesbyId } from "@/api/courses";
import CreateExamDialog from "@/Components/super-admin/exams/CreateExamDialog";
import EditExamDialog from "@/Components/super-admin/exams/EditExamDialog";
import ViewExamDialog from "@/Components/super-admin/exams/ViewExamDialog";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { toast } from "sonner";

interface Exam {
  id: number;
  course_id: number;
  academic_year: string;
  semester: string;
  title: string;
  instructions: string | null;
  start_at: string | null;
  end_at: string | null;
  duration_minutes: number;
  visibility: string;
  randomize: boolean;
  exam_type: string;
  objective_count: number;
  theory_count: number;
  selection_mode: string;
  max_attempts: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface ExamsResponse {
  status: boolean;
  code: number;
  message: string;
  data: Exam[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export default function CourseExamsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadExams(1);
    }
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      setCourseLoading(true);
      const response = await GetStaffCoursesbyId(courseId!);
      const data = response.data as any;
      if (data?.status || data?.success) {
        setCourseTitle(data.data?.title || "Course");
      }
    } catch (error) {
      console.error("Error loading course:", error);
      setCourseTitle("Course");
    } finally {
      setCourseLoading(false);
    }
  };

  const loadExams = async (page: number = 1) => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      const response = await GetExams(Number(courseId), page, 20);
      const data = response?.data as ExamsResponse;
      
      if (data?.status && data?.data) {
        setExams(data.data);
        setPagination(data.pagination);
        setCurrentPage(page);
      } else {
        setExams([]);
        toast.error(data?.message || "Failed to load exams");
      }
    } catch (error: any) {
      console.error("Error loading exams:", error);
      setExams([]);
      toast.error("Failed to load exams");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getExamTypeBadge = (examType: string) => {
    const typeMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      "objective-only": { label: "Objective", variant: "secondary" },
      "theory-only": { label: "Theory", variant: "secondary" },
      "mixed": { label: "Mixed", variant: "secondary" },
    };

    const config = typeMap[examType] || { label: examType, variant: "outline" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "published") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">published</Badge>;
    } else if (statusLower === "draft") {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">draft</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      loadExams(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      loadExams(currentPage + 1);
    }
  };

  const handleViewExam = (examId: number) => {
    setSelectedExamId(examId);
    setShowViewDialog(true);
  };

  const handleEditExam = (examId: number) => {
    setSelectedExamId(examId);
    setShowEditDialog(true);
  };

  const handleDeleteExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowDeleteDialog(true);
  };

  const confirmDeleteExam = async () => {
    if (!selectedExam) return;

    try {
      setDeleting(true);
      const response = await DeleteExam(selectedExam.id);
      const data = response?.data as any;

      if (data?.status || data?.success || response?.status === 200) {
        toast.success("Exam deleted successfully");
        setShowDeleteDialog(false);
        setSelectedExam(null);
        loadExams(currentPage);
      } else {
        toast.error(data?.message || "Failed to delete exam");
      }
    } catch (error: any) {
      console.error("Error deleting exam:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete exam"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {courseLoading ? (
              <Skeleton className="h-9 w-64" />
            ) : (
              `${courseTitle.toUpperCase()} - Exams`
            )}
          </h1>
          <p className="text-muted-foreground">
            Manage exams for this course.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/super-admin/content/exams")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        </div>
      </div>

      {/* Exams Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : exams.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">
                No exams found for this course.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Academic Year</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Max Attempts</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium max-w-[200px]">
                          <div className="line-clamp-3">{exam.title}</div>
                        </TableCell>
                        <TableCell>{exam.academic_year}</TableCell>
                        <TableCell>{exam.semester}</TableCell>
                        <TableCell>{exam.duration_minutes} min</TableCell>
                        <TableCell>{getExamTypeBadge(exam.exam_type)}</TableCell>
                        <TableCell>{getStatusBadge(exam.visibility)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Obj: {exam.objective_count || 0}</div>
                            <div>Theory: {exam.theory_count || 0}</div>
                          </div>
                        </TableCell>
                        <TableCell>{exam.max_attempts}</TableCell>
                        <TableCell>{formatDate(exam.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewExam(exam.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditExam(exam.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteExam(exam)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {!loading && exams.length > 0 && (
                <div className="p-4 border-t flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * pagination.limit) + 1} to{" "}
                    {Math.min(currentPage * pagination.limit, pagination.total)} of{" "}
                    {pagination.total} exams
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={!pagination.hasPreviousPage}
                    >
                      Previous
                    </Button>
                    <div className="text-sm">
                      Page {currentPage} of {pagination.totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={!pagination.hasNextPage}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Create Exam Dialog */}
      {courseId && (
        <CreateExamDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          courseId={Number(courseId)}
          onExamCreated={() => {
            loadExams(currentPage);
            setShowCreateDialog(false);
          }}
        />
      )}

      {/* View Exam Dialog */}
      <ViewExamDialog
        open={showViewDialog}
        onOpenChange={(open) => {
          setShowViewDialog(open);
          if (!open) {
            setSelectedExamId(null);
          }
        }}
        examId={selectedExamId}
      />

      {/* Edit Exam Dialog */}
      <EditExamDialog
        open={showEditDialog}
        onOpenChange={(open) => {
          setShowEditDialog(open);
          if (!open) {
            setSelectedExamId(null);
          }
        }}
        examId={selectedExamId}
        onExamUpdated={() => {
          loadExams(currentPage);
          setShowEditDialog(false);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Exam"
        description={
          selectedExam
            ? `Are you sure you want to delete the exam "${selectedExam.title}"? This action cannot be undone and will permanently remove the exam from the system.`
            : "Are you sure you want to delete this exam? This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteExam}
        isProcessing={deleting}
        variant="destructive"
      />
    </div>
  );
}

