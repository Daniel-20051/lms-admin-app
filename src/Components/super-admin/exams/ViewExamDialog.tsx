import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogBody,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  ArrowLeft,
  Users,
  BarChart3,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GetExamById, GetExamAttempts, GetExamStatistics } from "@/api/exams";
import { GetStaffCoursesbyId } from "@/api/courses";
import { toast } from "sonner";

interface ViewExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: number | null;
}

interface ExamDetails {
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

interface ExamAttempt {
  id: number;
  exam_id: number;
  student_id: number;
  student_name?: string;
  matric_number?: string;
  started_at: string;
  submitted_at: string | null;
  status: string;
  total_score?: number;
  max_score?: number;
}

interface ExamAttemptsResponse {
  status: boolean;
  code: number;
  message: string;
  data: ExamAttempt[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface ExamStatistics {
  exam_id: number;
  total_attempts: number;
  average_score: string;
  highest_score: number;
  lowest_score: number;
}

interface ExamStatisticsResponse {
  status: boolean;
  code: number;
  message: string;
  data: ExamStatistics;
}

export default function ViewExamDialog({
  open,
  onOpenChange,
  examId,
}: ViewExamDialogProps) {
  const [examDetails, setExamDetails] = useState<ExamDetails | null>(null);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [statistics, setStatistics] = useState<ExamStatistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [loadingStatistics, setLoadingStatistics] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    if (open && examId) {
      loadExamDetails();
      loadAttempts();
      loadStatistics();
    } else {
      setExamDetails(null);
      setAttempts([]);
      setStatistics(null);
      setSearchQuery("");
    }
  }, [open, examId]);

  const loadExamDetails = async () => {
    if (!examId) return;

    try {
      setLoading(true);
      const response = await GetExamById(examId);
      const data = response?.data as any;

      if (data?.status || data?.success || response?.status === 200) {
        const exam = data?.data || data;
        setExamDetails(exam);

        // Load course title
        if (exam.course_id) {
          try {
            const courseResponse = await GetStaffCoursesbyId(String(exam.course_id));
            const courseData = courseResponse.data as any;
            if (courseData?.status || courseData?.success) {
              setCourseTitle(courseData.data?.title || "");
            }
          } catch (error) {
            console.error("Error loading course:", error);
          }
        }
      } else {
        toast.error(data?.message || "Failed to load exam details");
      }
    } catch (error: any) {
      console.error("Error loading exam details:", error);
      toast.error("Failed to load exam details");
    } finally {
      setLoading(false);
    }
  };

  const loadAttempts = async () => {
    if (!examId) return;

    try {
      setLoadingAttempts(true);
      const response = await GetExamAttempts(examId);
      const data = response?.data as ExamAttemptsResponse;

      if (data?.status && data?.data) {
        setAttempts(data.data);
      } else {
        setAttempts([]);
      }
    } catch (error: any) {
      console.error("Error loading attempts:", error);
      setAttempts([]);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const loadStatistics = async () => {
    if (!examId) return;

    try {
      setLoadingStatistics(true);
      const response = await GetExamStatistics(examId);
      const data = response?.data as ExamStatisticsResponse;

      if (data?.status && data?.data) {
        setStatistics(data.data);
      } else {
        setStatistics(null);
      }
    } catch (error: any) {
      console.error("Error loading statistics:", error);
      setStatistics(null);
    } finally {
      setLoadingStatistics(false);
    }
  };

  const filteredAttempts = attempts.filter((attempt) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      attempt.student_name?.toLowerCase().includes(query) ||
      attempt.matric_number?.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "submitted" || statusLower === "completed") {
      return <Badge className="bg-green-100 text-green-800">Submitted</Badge>;
    } else if (statusLower === "in_progress") {
      return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            {loading ? (
              <Skeleton className="h-8 w-48" />
            ) : (
              <h2 className="text-2xl font-bold">
                {examDetails?.title || "Exam Details"}
              </h2>
            )}
          </div>
          {!loading && examDetails && (
            <p className="text-sm text-muted-foreground">
              {courseTitle.toUpperCase()} - Exam Details
            </p>
          )}
        </div>

        <DialogBody className="px-6 py-4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : examDetails ? (
            <>
              {/* Exam Details Section */}
              <div className="mb-4">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2 text-lg font-semibold mb-2"
                >
                  Exam Details
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {showDetails && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Academic Year</p>
                      <p className="font-medium">{examDetails.academic_year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Semester</p>
                      <p className="font-medium">{examDetails.semester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{examDetails.duration_minutes} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Exam Type</p>
                      <p className="font-medium capitalize">{examDetails.exam_type.replace("-", " ")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max Attempts</p>
                      <p className="font-medium">{examDetails.max_attempts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        variant={examDetails.visibility === "published" ? "default" : "secondary"}
                      >
                        {examDetails.visibility}
                      </Badge>
                    </div>
                    {examDetails.instructions && (
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Instructions</p>
                        <p className="font-medium">{examDetails.instructions}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tabs */}
              <Tabs defaultValue="attempts" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="attempts" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Student Attempts
                  </TabsTrigger>
                  <TabsTrigger value="statistics" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Statistics
                  </TabsTrigger>
                </TabsList>

                {/* Student Attempts Tab */}
                <TabsContent value="attempts" className="mt-4">
                  <Card className="pt-3">
                    <CardHeader>
                      <CardTitle>Student Attempts</CardTitle>
                      <CardDescription>
                        View and grade student exam attempts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Search */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by student name or matric number..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      {/* Attempts List */}
                      {loadingAttempts ? (
                        <div className="space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                          ))}
                        </div>
                      ) : filteredAttempts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Users className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="font-medium mb-1">No attempts yet</p>
                          <p className="text-sm text-muted-foreground">
                            No student attempts found for this exam.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {filteredAttempts.map((attempt) => (
                            <div
                              key={attempt.id}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="font-medium">
                                  {attempt.student_name || "Unknown Student"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {attempt.matric_number || "N/A"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Started: {formatDate(attempt.started_at)}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                {attempt.submitted_at && (
                                  <div className="text-right">
                                    <p className="text-sm font-medium">
                                      {attempt.total_score !== undefined &&
                                      attempt.max_score !== undefined
                                        ? `${attempt.total_score}/${attempt.max_score}`
                                        : "N/A"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {formatDate(attempt.submitted_at)}
                                    </p>
                                  </div>
                                )}
                                {getStatusBadge(attempt.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Statistics Tab */}
                <TabsContent value="statistics" className="mt-4">
                  {loadingStatistics ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16 mt-2" />
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  ) : statistics ? (
                    <div className="space-y-4">
                      {/* Statistics Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Total Attempts
                            </CardTitle>
                            <CardDescription className="text-3xl font-bold text-foreground mt-2">
                              {statistics.total_attempts}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Average Score
                            </CardTitle>
                            <CardDescription className="text-3xl font-bold text-foreground mt-2">
                              {parseFloat(statistics.average_score).toFixed(2)}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Highest Score
                            </CardTitle>
                            <CardDescription className="text-3xl font-bold text-foreground mt-2">
                              {statistics.highest_score}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Lowest Score
                            </CardTitle>
                            <CardDescription className="text-3xl font-bold text-foreground mt-2">
                              {statistics.lowest_score}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </div>

                      {/* Empty State Message */}
                      {statistics.total_attempts === 0 && (
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-center mb-1">
                              No student attempts have been submitted yet.
                            </p>
                            <p className="text-center text-sm text-muted-foreground">
                              Statistics will appear once students start taking the exam.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          Failed to load statistics.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Failed to load exam details</p>
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

