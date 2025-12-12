import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { 
  Plus, 
  FileQuestion, 
  ArrowLeft,
  Search
} from "lucide-react";
import { GetBankQuestions } from "@/api/exams";
import { GetStaffCoursesbyId } from "@/api/courses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { toast } from "sonner";
import AddQuestionDialog from "@/Components/super-admin/exams/AddQuestionDialog";

interface BankQuestion {
  id: number;
  course_id: number;
  created_by: number;
  question_type: "objective" | "theory";
  difficulty: "easy" | "medium" | "hard";
  topic: string | null;
  tags: string[];
  status: "pending" | "approved" | "rejected";
  source_type: string;
  source_id: number | null;
  created_at: string;
  updated_at: string;
  objective?: {
    id: number;
    question_bank_id: number;
    question_text: string;
    options: Array<{ id: string; text: string }>;
    correct_option: string;
    marks: string;
    image_url: string | null;
    video_url: string | null;
  };
  theory?: {
    id: number;
    question_bank_id: number;
    question_text: string;
    max_marks: string;
    image_url: string | null;
    video_url: string | null;
  };
}

export default function QuestionBankPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseLoading, setCourseLoading] = useState(false);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    if (courseId) {
      loadCourseData();
      loadQuestions();
    } else {
      toast.error("Course ID is required");
      navigate("/super-admin/content/exams");
    }
  }, [courseId]);

  const loadCourseData = async () => {
    if (!courseId) return;
    try {
      setCourseLoading(true);
      const response = await GetStaffCoursesbyId(courseId);
      const data = response.data as any;
      if (data?.status || data?.success) {
        setCourseTitle(data.data?.title || data.data?.course?.title || "");
      }
    } catch (error) {
      console.error("Error loading course:", error);
    } finally {
      setCourseLoading(false);
    }
  };

  const loadQuestions = async () => {
    if (!courseId) return;
    try {
      setLoading(true);
      const response = await GetBankQuestions(Number(courseId));
      const data = response.data as any;
      
      // Handle different response structures
      if (data?.status === true || data?.success === true) {
        // Handle both array and single object responses
        const questionsData = data.data;
        if (Array.isArray(questionsData)) {
          setQuestions(questionsData);
        } else if (questionsData && typeof questionsData === 'object' && questionsData.id) {
          // Single question object
          setQuestions([questionsData]);
        } else {
          setQuestions([]);
        }
      } else if (Array.isArray(data?.data)) {
        // Direct array in data.data
        setQuestions(data.data);
      } else if (data?.data && typeof data.data === 'object' && data.data.id) {
        // Single question in data.data
        setQuestions([data.data]);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      toast.error("Failed to load questions");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter questions based on search and filters
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const questionText = q.objective?.question_text?.toLowerCase() || 
                           q.theory?.question_text?.toLowerCase() || "";
        if (!questionText.includes(searchLower)) {
          return false;
        }
      }

      // Type filter
      if (typeFilter !== "all" && q.question_type !== typeFilter) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== "all" && q.difficulty !== difficultyFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && q.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [questions, searchTerm, typeFilter, difficultyFilter, statusFilter]);

  // Total counts (all questions, not filtered)
  const totalObjectiveQuestions = questions.filter((q) => q.question_type === "objective").length;
  const totalTheoryQuestions = questions.filter((q) => q.question_type === "theory").length;
  const totalApprovedQuestions = questions.filter((q) => q.status === "approved").length;
  const totalQuestions = questions.length;

  // Filtered counts for display
  const objectiveQuestions = filteredQuestions.filter((q) => q.question_type === "objective");
  const theoryQuestions = filteredQuestions.filter((q) => q.question_type === "theory");
  const approvedQuestions = filteredQuestions.filter((q) => q.status === "approved");

  return (
    <div className="space-y-6">
      {/* Header with Back Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/super-admin/content/exams")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Exams
          </Button>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {/* Question Bank Title Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Question Bank</CardTitle>
          <CardDescription className="text-lg font-medium">
            {courseLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              courseTitle.toUpperCase()
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Objective Questions</p>
              <p className="text-2xl font-bold">{totalObjectiveQuestions}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Theory Questions</p>
              <p className="text-2xl font-bold">{totalTheoryQuestions}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Approved Questions</p>
              <p className="text-2xl font-bold">{totalApprovedQuestions}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
              <p className="text-2xl font-bold">{totalQuestions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="objective">Objective</SelectItem>
                <SelectItem value="theory">Theory</SelectItem>
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredQuestions.length} of {questions.length} questions (Page 1 of 1)
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No questions found</p>
              <p className="text-sm text-muted-foreground text-center">
                This course doesn't have any questions in the bank yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((question, index) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pt-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{question.question_type}</Badge>
                          <Badge variant="secondary">{question.difficulty}</Badge>
                          <Badge 
                            variant={question.status === "approved" ? "default" : "outline"}
                          >
                            {question.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mb-2">
                          {index + 1}. {question.objective?.question_text || question.theory?.question_text}
                        </CardTitle>
                        {question.objective && (
                          <div className="space-y-2 mt-4">
                            {question.objective.options.map((option) => (
                              <div
                                key={option.id}
                                className={`p-2 rounded border ${
                                  option.id === question.objective?.correct_option
                                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                                    : "border-gray-200"
                                }`}
                              >
                                <span className="font-medium">{option.id}. </span>
                                {option.text}
                                {option.id === question.objective?.correct_option && (
                                  <Badge variant="default" className="ml-2">
                                    Correct
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline">
                            {question.objective?.marks || question.theory?.max_marks} marks
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Question Dialog */}
      {courseId && (
        <AddQuestionDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          courseId={Number(courseId)}
          onQuestionAdded={() => {
            loadQuestions();
          }}
        />
      )}
    </div>
  );
}

