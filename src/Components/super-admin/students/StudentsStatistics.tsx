import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { Users, UserCheck, UserX, GraduationCap } from "lucide-react";
import { getStudentStatistics, type StudentStatisticsRaw } from "@/api/admin";
import { toast } from "sonner";
import type { PaginationData } from "@/api/admin";

interface StudentsStatisticsProps {
  loading?: boolean;
  pagination: PaginationData;
  currentPage: number;
}

export default function StudentsStatistics({
  loading: externalLoading,
  pagination,
  currentPage,
}: StudentsStatisticsProps) {
  const [stats, setStats] = useState<StudentStatisticsRaw | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const response = await getStudentStatistics();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching student statistics:", error);
        toast.error(error.response?.data?.message || "Failed to load student statistics");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const loading = externalLoading || loadingStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <Skeleton className="h-8 w-16" /> : stats?.total ?? pagination.total}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Across all levels</p>
        </CardContent>
      </Card>

      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          <UserCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              stats?.active ?? 0
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Total active students</p>
        </CardContent>
      </Card>

      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactive Students</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              stats?.inactive ?? 0
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Total inactive students</p>
        </CardContent>
      </Card>

      <Card className="pt-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Page</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              `${currentPage}/${pagination.totalPages || 1}`
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {pagination.limit || 10} per page
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

