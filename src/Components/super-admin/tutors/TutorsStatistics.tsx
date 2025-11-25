import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { User, Building2, BookOpen } from "lucide-react";
import type { TutorStatistics } from "@/api/admin";

interface TutorsStatisticsProps {
  loading: boolean;
  statistics: TutorStatistics | null;
}

export default function TutorsStatistics({
  loading,
  statistics,
}: TutorsStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Sole Tutors Total */}
      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate">Sole Tutors</CardTitle>
          <User className="h-4 w-4 text-muted-foreground shrink-0" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-xl font-bold truncate">
              {statistics?.soleTutors.total || 0}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {statistics ? `${statistics.soleTutors.active} active, ${statistics.soleTutors.pending} pending` : "Loading..."}
          </p>
        </CardContent>
      </Card>

      {/* Organizations Total */}
      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate">Organizations</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-xl font-bold truncate">
              {statistics?.organizations.total || 0}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {statistics ? `${statistics.organizations.active} active, ${statistics.organizations.pending} pending` : "Loading..."}
          </p>
        </CardContent>
      </Card>

      {/* Total Tutors */}
      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate">Total Tutors</CardTitle>
          <User className="h-4 w-4 text-muted-foreground shrink-0" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-xl font-bold truncate">
              {(statistics?.soleTutors.total || 0) + (statistics?.organizations.total || 0)}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1 truncate">
            All tutor types
          </p>
        </CardContent>
      </Card>

      {/* Tutor Courses */}
      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate">Tutor Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-xl font-bold truncate">
              {statistics?.tutorCourses || 0}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Total courses
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

