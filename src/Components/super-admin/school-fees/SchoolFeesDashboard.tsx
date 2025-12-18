import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import { DollarSign, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { getSchoolFeesStats } from "@/api/admin";
import { toast } from "sonner";

export default function SchoolFeesDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getSchoolFeesStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching school fees stats:", error);
      toast.error(error.response?.data?.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="pt-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No statistics available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total fee records
            </p>
          </CardContent>
        </Card>

        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{Number(stats.totalAmount || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total amount across all fees
            </p>
          </CardContent>
        </Card>

        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₦{Number(stats.paidAmount || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total paid fees
            </p>
          </CardContent>
        </Card>

        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ₦{Number(stats.pendingAmount || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total pending fees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown by Status */}
      {stats.byStatus && stats.byStatus.length > 0 && (
        <Card className="pt-3">
          <CardHeader>
            <CardTitle>Breakdown by Status</CardTitle>
            <CardDescription>Fee distribution by payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.byStatus.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.status === 'Paid' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count} records
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    ₦{Number(item.total || 0).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breakdown by Semester */}
      {stats.bySemester && stats.bySemester.length > 0 && (
        <Card className="pt-3">
          <CardHeader>
            <CardTitle>Breakdown by Semester</CardTitle>
            <CardDescription>Fee distribution by semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.bySemester.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {item.semester}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.count} records
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    ₦{Number(item.total || 0).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

