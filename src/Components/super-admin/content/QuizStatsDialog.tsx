import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
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

interface QuizStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: number;
}

interface StudentScore {
  student_id: number;
  full_name: string;
  email: string;
  total_score: number;
  max_score: number;
  percentage: number;
  started_at: string;
  submitted_at: string;
}

interface QuizStats {
  quiz_id: number;
  submitted_attempts: number;
  average_score: number;
  max_possible_score: number;
  students: StudentScore[];
}

export default function QuizStatsDialog({
  open,
  onOpenChange,
  quizId,
}: QuizStatsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<QuizStats | null>(null);

  useEffect(() => {
    if (open) {
      loadStats();
    }
  }, [open, quizId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await GetQuizStats(quizId);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error loading quiz stats:", error);
      toast.error("Failed to load quiz statistics");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">Quiz Statistics</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        ) : stats ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Attempts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.submitted_attempts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats.average_score.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Max Possible Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.max_possible_score}</div>
                </CardContent>
              </Card>
            </div>

            {/* Student Scores Table */}
            <Card>
              <CardHeader>
                <CardTitle>Student Scores</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.students && stats.students.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Score</TableHead>
                          <TableHead className="text-right">Percentage</TableHead>
                          <TableHead>Submitted At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats.students.map((student) => (
                          <TableRow key={student.student_id}>
                            <TableCell className="font-medium">
                              {student.full_name}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {student.email}
                            </TableCell>
                            <TableCell className="text-right">
                              {student.total_score} / {student.max_score}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant="outline"
                                className={getScoreColor(student.percentage)}
                              >
                                {student.percentage.toFixed(1)}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(student.submitted_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No submissions yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Failed to load statistics
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}

