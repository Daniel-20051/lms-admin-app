import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Progress } from "@/Components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { GetQuizStats } from "@/api/quiz";
import { toast } from "sonner";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Hash,
  Search,
  User,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface QuizStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: number;
  quizTitle?: string;
}

interface StudentScore {
  student_id: number;
  full_name: string;
  email: string;
  attempt_id?: number;
  total_score?: number;
  max_score?: number;
  percentage?: number;
  started_at?: string;
  submitted_at?: string;
}

interface QuizStats {
  quiz_id: number;
  submitted_attempts: number;
  average_score: number;
  max_possible_score: number;
  participation?: {
    total_enrolled: number;
    total_attempted: number;
    completion_rate: number;
  };
  distribution?: {
    "0-39": number;
    "40-49": number;
    "50-59": number;
    "60-69": number;
    "70-100": number;
  };
  questions_insights?: Array<{
    question_id: number;
    correct_rate: number;
  }>;
  students: StudentScore[];
}

export default function QuizStatsDialog({
  open,
  onOpenChange,
  quizId,
  quizTitle,
}: QuizStatsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open) {
      loadStats();
    }
  }, [open, quizId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await GetQuizStats(quizId);
      const data = response.data as any;
      if (data?.status || data?.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error loading quiz stats:", error);
      toast.error("Failed to load quiz statistics");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = stats?.students?.filter((student) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      student.full_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  }) || [];

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="pb-4 px-6 pt-6">
          <DialogTitle className="text-xl">
            Quiz Stats {quizTitle && `• ${quizTitle}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading quiz statistics...</p>
          </div>
        ) : stats ? (
          <div className="space-y-6">
            {/* Overview Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="text-2xl font-bold">
                          {stats.average_score} / {stats.max_possible_score}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Max Possible Score</p>
                        <p className="text-2xl font-bold">{stats.max_possible_score}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted Attempts</p>
                        <p className="text-2xl font-bold">{stats.submitted_attempts}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Hash className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Quiz ID</p>
                        <p className="text-2xl font-bold">{stats.quiz_id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Participation Section */}
            {stats.participation && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Participation</h3>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                        <span className="text-sm font-medium">{stats.participation.completion_rate}%</span>
                      </div>
                      <Progress value={stats.participation.completion_rate} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Attempted</p>
                          <p className="text-lg font-semibold">{stats.participation.total_attempted}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Enrolled</p>
                          <p className="text-lg font-semibold">{stats.participation.total_enrolled}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Score Distribution Section */}
            {stats.distribution && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
                <Card className="pt-3">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {[
                        { range: "0-39", label: "0-39", value: stats.distribution["0-39"] || 0 },
                        { range: "40-49", label: "40-49", value: stats.distribution["40-49"] || 0 },
                        { range: "50-59", label: "50-59", value: stats.distribution["50-59"] || 0 },
                        { range: "60-69", label: "60-69", value: stats.distribution["60-69"] || 0 },
                        { range: "70-100", label: "70-100", value: stats.distribution["70-100"] || 0 },
                      ].map((item) => {
                        const totalStudents = stats.students?.length || 0;
                        const percentage = totalStudents > 0 ? (item.value / totalStudents) * 100 : 0;
                        return (
                          <div key={item.range} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{item.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {item.value} {item.value === 1 ? "student" : "students"}
                                </span>
                                <span className="text-sm font-medium">{item.value}</span>
                              </div>
                            </div>
                            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${item.value > 0 ? "bg-primary" : "bg-muted"}`}
                                style={{ width: `${Math.max(percentage, item.value > 0 ? 5 : 0)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Questions Performance Section */}
            {stats.questions_insights && stats.questions_insights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Questions Performance</h3>
                <Card className="pt-3">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {stats.questions_insights.map((question, index) => {
                        const isCorrect = question.correct_rate === 100;
                        return (
                          <div key={question.question_id} className="flex items-center gap-3">
                            <span className="text-sm font-medium w-20">Question {index + 1}</span>
                            <div className="flex items-center gap-2 flex-1">
                              {isCorrect ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                              <span className="text-sm font-medium w-12">{question.correct_rate}%</span>
                              <div className="flex-1 relative h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${isCorrect ? "bg-primary" : "bg-red-500"}`}
                                  style={{ width: `${question.correct_rate}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Students Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Students</h3>
              <Card className="pt-3">
                <CardHeader>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredStudents.length > 0 ? (
                    <div className="space-y-3">
                      {filteredStudents.map((student) => (
                        <div
                          key={student.student_id}
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">{student.full_name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchQuery ? "No students found matching your search" : "No submissions yet"}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Failed to load statistics
            </CardContent>
          </Card>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

