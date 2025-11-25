import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import {
  Users,
  UserX,
  UserCog,
  Shield,
  GraduationCap,
  BookOpen,
  Building2,
  TrendingUp,
  Activity,
  Award
} from "lucide-react";
import { getDashboardStats, type DashboardStats } from "@/api/admin";
import { toast } from "sonner";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching dashboard stats:", error);
      toast.error(error.response?.data?.message || "Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number | string) => {
    const numValue = typeof num === "string" ? parseInt(num) : num;
    return new Intl.NumberFormat("en-US").format(numValue);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your system</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {stats?.overview.students.total || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {stats && !loading ? (
                <>
                  {stats.overview.students.active} active, {stats.overview.students.inactive} inactive
                </>
              ) : (
                "Loading..."
              )}
            </p>
          </CardContent>
        </Card>

        {/* Total Staff */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <UserCog className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-green-600">
                {stats?.overview.staff.total || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {stats && !loading ? (
                <>
                  {stats.overview.staff.active} active
                </>
              ) : (
                "Loading..."
              )}
            </p>
          </CardContent>
        </Card>

        {/* Total Admins */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-purple-600">
                {stats?.overview.admins.total || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              System administrators
            </p>
          </CardContent>
        </Card>

        {/* Total Enrollments */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold text-orange-600">
                {stats ? formatNumber(stats.overview.enrollments) : 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Course enrollments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Academic Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Programs */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {stats?.overview.academic.programs.total || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {stats && !loading ? (
                <>
                  {stats.overview.academic.programs.active} active
                </>
              ) : (
                "Loading..."
              )}
            </p>
          </CardContent>
        </Card>

        {/* Courses */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-green-600">
                {stats?.overview.academic.courses || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Total courses available
            </p>
          </CardContent>
        </Card>

        {/* Faculties */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculties</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-purple-600">
                {stats?.overview.academic.faculties || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Total faculties
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students by Level */}
        <Card className="pt-3">
          <CardHeader>
            <CardTitle>Students by Level</CardTitle>
            <CardDescription>Distribution across academic levels</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : stats && stats.studentsByLevel.length > 0 ? (
              <div className="space-y-3">
                {stats.studentsByLevel
                  .filter(item => item.level !== null)
                  .sort((a, b) => {
                    const levelA = a.level ? parseInt(a.level) : 0;
                    const levelB = b.level ? parseInt(b.level) : 0;
                    return levelA - levelB;
                  })
                  .map((item) => {
                    const count = parseInt(item.count);
                    const totalStudents = stats.overview.students.total;
                    const percentage = totalStudents > 0 ? (count / totalStudents) * 100 : 0;
                    return (
                      <div key={item.level} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              Level {item.level}
                            </span>
                          </div>
                          <span className="text-muted-foreground">
                            {formatNumber(count)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                {stats.studentsByLevel.some(item => item.level === null) && (
                  <div className="space-y-2 pt-2 border-t">
                    {stats.studentsByLevel
                      .filter(item => item.level === null)
                      .map((item) => {
                        const count = parseInt(item.count);
                        const totalStudents = stats.overview.students.total;
                        const percentage = totalStudents > 0 ? (count / totalStudents) * 100 : 0;
                        return (
                          <div key="no-level" className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <UserX className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  No Level Assigned
                                </span>
                              </div>
                              <span className="text-muted-foreground">
                                {formatNumber(count)} ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-muted-foreground transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No level data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Programs */}
        <Card className="pt-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Programs
            </CardTitle>
            <CardDescription>Programs with the most students</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : stats && stats.topPrograms.length > 0 ? (
              <div className="space-y-3">
                {stats.topPrograms.map((program, index) => {
                  const maxStudents = Math.max(...stats.topPrograms.map(p => p.student_count), 1);
                  const percentage = (program.student_count / maxStudents) * 100;
                  const colors = [
                    "bg-blue-500",
                    "bg-green-500",
                    "bg-purple-500",
                    "bg-orange-500",
                    "bg-pink-500",
                  ];
                  const bgColor = colors[index % colors.length];
                  return (
                    <div key={program.program_id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? "default" : "outline"} className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="font-medium truncate flex-1 pr-2">
                            {program.program_title}
                          </span>
                        </div>
                        <span className="text-muted-foreground whitespace-nowrap">
                          {formatNumber(program.student_count)} {program.student_count === 1 ? 'student' : 'students'}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${bgColor} transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No program data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Activity summary for recent periods</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {formatNumber(stats.recentActivity.enrollmentsLast7Days)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Enrollments (Last 7 Days)
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {formatNumber(stats.recentActivity.fundingsLast30Days)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Fundings (Last 30 Days)
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {formatNumber(stats.recentActivity.schoolFeesLast30Days)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  School Fees (Last 30 Days)
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No activity data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
