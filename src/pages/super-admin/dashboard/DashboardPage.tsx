import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { BookOpen, CheckCircle, XCircle, Building2, TrendingUp, GraduationCap, Users, UserCheck, UserX, BookText } from "lucide-react";
import { Skeleton } from "@/Components/ui/skeleton";
import { getProgramStatistics, getStudentStatistics, getCourseStatistics, type ProgramStatistics, type StudentStatistics, type CourseStatistics } from "@/api/admin";
import { toast } from "sonner";

// Helper function to safely get object keys
const safeObjectKeys = (obj: any): string[] => {
  if (!obj || obj === null || Array.isArray(obj) || typeof obj !== 'object') {
    return [];
  }
  return Object.keys(obj);
};

export default function DashboardPage() {
  const [studentStats, setStudentStats] = useState<StudentStatistics | null>(null);
  const [programStats, setProgramStats] = useState<ProgramStatistics | null>(null);
  const [courseStats, setCourseStats] = useState<CourseStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      
      // Fetch student, program, and course statistics in parallel
      const [studentResponse, programResponse, courseResponse] = await Promise.all([
        getStudentStatistics().catch(err => {
          console.error("Error fetching student statistics:", err);
          return null;
        }),
        getProgramStatistics().catch(err => {
          console.error("Error fetching program statistics:", err);
          return null;
        }),
        getCourseStatistics().catch(err => {
          console.error("Error fetching course statistics:", err);
          return null;
        })
      ]);

      // Process student statistics
      if (studentResponse?.success && studentResponse.data) {
        const studentsByLevel: { [key: string]: number } = {};
        if (Array.isArray(studentResponse.data.byLevel)) {
          studentResponse.data.byLevel.forEach((item) => {
            const level = item.level || 'Unknown';
            studentsByLevel[level] = parseInt(item.count, 10) || 0;
          });
        }

        const studentsByProgram: { [key: string]: number } = {};
        if (Array.isArray(studentResponse.data.byProgram)) {
          studentResponse.data.byProgram.forEach((item) => {
            const programName = item["program.title"] || `Program ${item.program_id}`;
            studentsByProgram[programName] = parseInt(item.count, 10) || 0;
          });
        }

        setStudentStats({
          totalStudents: studentResponse.data.total || 0,
          activeStudents: studentResponse.data.active || 0,
          inactiveStudents: studentResponse.data.inactive || 0,
          studentsByLevel,
          studentsByProgram,
        });
      } else {
        setStudentStats({
          totalStudents: 0,
          activeStudents: 0,
          inactiveStudents: 0,
          studentsByLevel: {},
          studentsByProgram: {},
        });
      }

      // Process program statistics
      if (programResponse?.success && programResponse.data) {
        const programsByFaculty: { [key: string]: number } = {};
        if (Array.isArray(programResponse.data.byFaculty)) {
          programResponse.data.byFaculty.forEach((item) => {
            const facultyName = item.faculty?.name || 'Unknown';
            programsByFaculty[facultyName] = parseInt(item.count, 10) || 0;
          });
        }

        const topProgramsByCourses = (programResponse.data.topProgramsByCourses || []).map((item) => ({
          id: item.id,
          title: item.title,
          courseCount: parseInt(item.course_count, 10) || 0,
        }));

        setProgramStats({
          totalPrograms: programResponse.data.total || 0,
          activePrograms: programResponse.data.active || 0,
          inactivePrograms: programResponse.data.inactive || 0,
          programsByFaculty,
          topProgramsByCourses,
        });
      } else {
        setProgramStats({
          totalPrograms: 0,
          activePrograms: 0,
          inactivePrograms: 0,
          programsByFaculty: {},
          topProgramsByCourses: [],
        });
      }

      // Process course statistics
      if (courseResponse?.success && courseResponse.data) {
        const coursesByProgram: { [key: string]: number } = {};
        if (Array.isArray(courseResponse.data.byProgram)) {
          courseResponse.data.byProgram.forEach((item) => {
            const programName = item.program?.title || `Program ${item.program_id}`;
            coursesByProgram[programName] = parseInt(item.count, 10) || 0;
          });
        }

        const coursesByFaculty: { [key: string]: number } = {};
        if (Array.isArray(courseResponse.data.byFaculty)) {
          courseResponse.data.byFaculty.forEach((item) => {
            const facultyName = item.faculty?.name || 'Unknown';
            coursesByFaculty[facultyName] = parseInt(item.count, 10) || 0;
          });
        }

        setCourseStats({
          totalCourses: courseResponse.data.total || 0,
          coursesByProgram,
          coursesByFaculty,
        });
      } else {
        setCourseStats({
          totalCourses: 0,
          coursesByProgram: {},
          coursesByFaculty: {},
        });
      }

      // Show error toast if all failed
      if (!studentResponse?.success && !programResponse?.success && !courseResponse?.success) {
        toast.error("Failed to load statistics");
      } else {
        if (!studentResponse?.success) toast.error("Failed to load student statistics");
        if (!programResponse?.success) toast.error("Failed to load program statistics");
        if (!courseResponse?.success) toast.error("Failed to load course statistics");
      }
    } catch (error: any) {
      console.error("Error fetching statistics:", error);
      toast.error(error.response?.data?.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your system</p>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookText className="h-4 w-4" />
            Courses
          </TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6 mt-6">
          {/* Student Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-16" /> : studentStats?.totalStudents || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  All students in the system
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {loading ? <Skeleton className="h-8 w-16" /> : studentStats?.activeStudents || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently enrolled
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactive Students</CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-16" /> : studentStats?.inactiveStudents || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Not currently enrolled
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrollment Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : studentStats?.totalStudents ? (
                    `${Math.round((studentStats.activeStudents / studentStats.totalStudents) * 100)}%`
                  ) : (
                    "0%"
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active/Total ratio
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Student Distribution Charts */}
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
                ) : studentStats && safeObjectKeys(studentStats.studentsByLevel).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(studentStats.studentsByLevel)
                      .sort(([a], [b]) => {
                        if (a === 'Unknown') return 1;
                        if (b === 'Unknown') return -1;
                        const numA = Number(a);
                        const numB = Number(b);
                        if (isNaN(numA) || isNaN(numB)) return a.localeCompare(b);
                        return numA - numB;
                      })
                      .map(([level, count]) => {
                        const percentage = studentStats.totalStudents
                          ? (count / studentStats.totalStudents) * 100
                          : 0;
                        return (
                          <div key={level} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {level === 'Unknown' ? 'No Level Assigned' : `${level} Level`}
                                </span>
                              </div>
                              <span className="text-muted-foreground">
                                {count} students ({percentage.toFixed(1)}%)
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
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No level data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Students by Program */}
            <Card className="pt-3">
              <CardHeader>
                <CardTitle>Students by Program</CardTitle>
                <CardDescription>Distribution across programs</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : studentStats && safeObjectKeys(studentStats.studentsByProgram).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(studentStats.studentsByProgram)
                      .sort(([, a], [, b]) => b - a)
                      .map(([program, count], index) => {
                        const percentage = studentStats.totalStudents
                          ? (count / studentStats.totalStudents) * 100
                          : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-purple-500",
                          "bg-orange-500",
                          "bg-pink-500",
                        ];
                        const bgColor = colors[index % colors.length];
                        return (
                          <div key={program} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium truncate flex-1 pr-2">
                                {program}
                              </span>
                              <span className="text-muted-foreground whitespace-nowrap">
                                {count} ({percentage.toFixed(1)}%)
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

          {/* Student Summary */}
          <Card className="pt-3">
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
              <CardDescription>Quick summary of student metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : studentStats ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {safeObjectKeys(studentStats.studentsByLevel).length}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Academic Levels
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {safeObjectKeys(studentStats.studentsByProgram).length}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Programs with Students
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {studentStats.totalStudents > 0 && safeObjectKeys(studentStats.studentsByLevel).length > 0
                        ? Math.round(studentStats.totalStudents / safeObjectKeys(studentStats.studentsByLevel).length)
                        : 0}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Avg. Students/Level
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6 mt-6">
          {/* Program Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-16" /> : programStats?.totalPrograms || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  All programs in the system
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {loading ? <Skeleton className="h-8 w-16" /> : programStats?.activePrograms || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently active
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactive Programs</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-16" /> : programStats?.inactivePrograms || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently inactive
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activation Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : programStats?.totalPrograms ? (
                    `${Math.round((programStats.activePrograms / programStats.totalPrograms) * 100)}%`
                  ) : (
                    "0%"
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active/Total ratio
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Program Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Programs by Faculty */}
            <Card className="pt-3">
              <CardHeader>
                <CardTitle>Programs by Faculty</CardTitle>
                <CardDescription>Distribution across faculties</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : programStats && safeObjectKeys(programStats.programsByFaculty).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(programStats.programsByFaculty)
                      .sort(([, a], [, b]) => b - a)
                      .map(([faculty, count], index) => {
                        const percentage = programStats.totalPrograms
                          ? (count / programStats.totalPrograms) * 100
                          : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-purple-500",
                          "bg-orange-500",
                          "bg-pink-500",
                          "bg-indigo-500",
                          "bg-teal-500",
                        ];
                        const bgColor = colors[index % colors.length];
                        return (
                          <div key={faculty} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium truncate flex-1 pr-2">
                                  {faculty}
                                </span>
                              </div>
                              <span className="text-muted-foreground whitespace-nowrap">
                                {count} ({percentage.toFixed(1)}%)
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
                    No faculty data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Programs by Courses */}
            <Card className="pt-3">
              <CardHeader>
                <CardTitle>Top Programs by Courses</CardTitle>
                <CardDescription>Programs with the most courses</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : programStats && programStats.topProgramsByCourses.length > 0 ? (
                  <div className="space-y-3">
                    {programStats.topProgramsByCourses
                      .sort((a, b) => b.courseCount - a.courseCount)
                      .slice(0, 10)
                      .map((program, index) => {
                        const maxCourses = Math.max(...programStats.topProgramsByCourses.map(p => p.courseCount), 1);
                        const percentage = maxCourses > 0 ? (program.courseCount / maxCourses) * 100 : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-purple-500",
                          "bg-orange-500",
                          "bg-pink-500",
                        ];
                        const bgColor = colors[index % colors.length];
                        return (
                          <div key={program.id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium truncate flex-1 pr-2">
                                  {program.title}
                                </span>
                              </div>
                              <span className="text-muted-foreground whitespace-nowrap">
                                {program.courseCount} {program.courseCount === 1 ? 'course' : 'courses'}
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

          {/* Program Summary */}
          <Card className="pt-3">
            <CardHeader>
              <CardTitle>Program Overview</CardTitle>
              <CardDescription>Quick summary of program metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : programStats ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {safeObjectKeys(programStats.programsByFaculty).length}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Faculties
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {programStats.topProgramsByCourses.length}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Total Programs Tracked
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {programStats.topProgramsByCourses.length > 0 && safeObjectKeys(programStats.programsByFaculty).length > 0
                        ? Math.round(programStats.topProgramsByCourses.length / safeObjectKeys(programStats.programsByFaculty).length)
                        : 0}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Avg. Programs/Faculty
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6 mt-6">
          {/* Course Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-16" /> : courseStats?.totalCourses || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  All courses in the system
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Programs with Courses</CardTitle>
                <GraduationCap className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {loading ? <Skeleton className="h-8 w-16" /> : safeObjectKeys(courseStats?.coursesByProgram || {}).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Programs offering courses
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faculties with Courses</CardTitle>
                <Building2 className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {loading ? <Skeleton className="h-8 w-16" /> : safeObjectKeys(courseStats?.coursesByFaculty || {}).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Faculties offering courses
                </p>
              </CardContent>
            </Card>

            <Card className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Courses/Program</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : courseStats?.totalCourses && safeObjectKeys(courseStats.coursesByProgram || {}).length > 0 ? (
                    Math.round(courseStats.totalCourses / safeObjectKeys(courseStats.coursesByProgram).length)
                  ) : (
                    "0"
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average per program
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Course Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Courses by Program */}
            <Card className="pt-3">
              <CardHeader>
                <CardTitle>Courses by Program</CardTitle>
                <CardDescription>Distribution across programs</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : courseStats && safeObjectKeys(courseStats.coursesByProgram).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(courseStats.coursesByProgram)
                      .sort(([, a], [, b]) => b - a)
                      .map(([program, count], index) => {
                        const percentage = courseStats.totalCourses
                          ? (count / courseStats.totalCourses) * 100
                          : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-purple-500",
                          "bg-orange-500",
                          "bg-pink-500",
                          "bg-indigo-500",
                          "bg-teal-500",
                        ];
                        const bgColor = colors[index % colors.length];
                        return (
                          <div key={program} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium truncate flex-1 pr-2">
                                  {program}
                                </span>
                              </div>
                              <span className="text-muted-foreground whitespace-nowrap">
                                {count} ({percentage.toFixed(1)}%)
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

            {/* Courses by Faculty */}
            <Card className="pt-3">
              <CardHeader>
                <CardTitle>Courses by Faculty</CardTitle>
                <CardDescription>Distribution across faculties</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : courseStats && safeObjectKeys(courseStats.coursesByFaculty).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(courseStats.coursesByFaculty)
                      .sort(([, a], [, b]) => b - a)
                      .map(([faculty, count], index) => {
                        const percentage = courseStats.totalCourses
                          ? (count / courseStats.totalCourses) * 100
                          : 0;
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-purple-500",
                          "bg-orange-500",
                          "bg-pink-500",
                          "bg-indigo-500",
                          "bg-teal-500",
                        ];
                        const bgColor = colors[index % colors.length];
                        return (
                          <div key={faculty} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium truncate flex-1 pr-2">
                                  {faculty}
                                </span>
                              </div>
                              <span className="text-muted-foreground whitespace-nowrap">
                                {count} ({percentage.toFixed(1)}%)
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
                    No faculty data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Course Summary */}
          <Card className="pt-3">
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>Quick summary of course metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : courseStats ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {safeObjectKeys(courseStats.coursesByFaculty).length}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Faculties with Courses
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {safeObjectKeys(courseStats.coursesByProgram).length}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Programs with Courses
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {courseStats.totalCourses > 0 && safeObjectKeys(courseStats.coursesByFaculty).length > 0
                        ? Math.round(courseStats.totalCourses / safeObjectKeys(courseStats.coursesByFaculty).length)
                        : 0}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Avg. Courses/Faculty
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
