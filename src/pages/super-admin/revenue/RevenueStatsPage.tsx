import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Award,
  Calendar
} from "lucide-react";
import {
  getWSPRevenueStats,
  type GetWSPRevenueStatsParams,
  type WSPRevenueStats
} from "@/api/admin";
import { toast } from "sonner";

export default function RevenueStatsPage() {
  const [stats, setStats] = useState<WSPRevenueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<GetWSPRevenueStatsParams>({});

  useEffect(() => {
    fetchStats();
  }, [filters]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getWSPRevenueStats(filters);
      if (response.success) {
        setStats(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching revenue stats:", error);
      toast.error(error.response?.data?.message || "Failed to load revenue statistics");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">WSP Revenue Statistics</h1>
          <p className="text-muted-foreground">Overview of marketplace revenue and commissions</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={filters.start_date || ""}
                onChange={(e) => setFilters((prev) => ({ ...prev, start_date: e.target.value || undefined }))}
                className="w-40"
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={filters.end_date || ""}
                onChange={(e) => setFilters((prev) => ({ ...prev, end_date: e.target.value || undefined }))}
                className="w-40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Commission */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold">
                {stats ? formatCurrency(stats.totalCommission, "NGN") : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              WSP earnings
            </p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold">
                {stats ? formatCurrency(stats.totalRevenue, "NGN") : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Marketplace total
            </p>
          </CardContent>
        </Card>

        {/* Total Transactions */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">
                {stats ? formatNumber(stats.totalTransactions) : "0"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              All transactions
            </p>
          </CardContent>
        </Card>

        {/* Pending Payouts */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold text-yellow-600">
                {stats ? formatCurrency(stats.pendingPayouts, "NGN") : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting payout
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Owner Type */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Revenue by Owner Type</CardTitle>
          <CardDescription>Breakdown of revenue by tutor type</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))}
            </div>
          ) : stats && stats.byOwnerType.length > 0 ? (
            <div className="space-y-4">
              {stats.byOwnerType.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-sm">
                      {item.owner_type === "sole_tutor" ? "Sole Tutor" : "Organization"}
                    </Badge>
                    <div>
                      <div className="font-medium">{formatNumber(item.count)} transactions</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(item.total_revenue, "NGN")} total revenue
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(item.total_commission, "NGN")}
                    </div>
                    <div className="text-sm text-muted-foreground">Commission</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No data available</p>
          )}
        </CardContent>
      </Card>

      {/* Top Earners */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Earners
          </CardTitle>
          <CardDescription>Top performing tutors and organizations</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2 border-b">Rank</th>
                    <th className="text-left p-2 border-b">Owner Type</th>
                    <th className="text-left p-2 border-b">Owner ID</th>
                    <th className="text-right p-2 border-b">Sales</th>
                    <th className="text-right p-2 border-b">Revenue</th>
                    <th className="text-right p-2 border-b">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="p-2"><Skeleton className="h-4 w-8" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-16 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-24 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-24 ml-auto" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : stats && stats.topEarners.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Rank</th>
                    <th className="text-left p-2 font-medium">Owner Type</th>
                    <th className="text-left p-2 font-medium">Owner ID</th>
                    <th className="text-right p-2 font-medium">Sales</th>
                    <th className="text-right p-2 font-medium">Revenue</th>
                    <th className="text-right p-2 font-medium">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topEarners.map((earner, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <Badge variant={index === 0 ? "default" : "outline"}>
                          #{index + 1}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline">
                          {earner.owner_type === "sole_tutor" ? "Sole Tutor" : "Organization"}
                        </Badge>
                      </td>
                      <td className="p-2">{earner.owner_id}</td>
                      <td className="p-2 text-right">{formatNumber(earner.sales_count)}</td>
                      <td className="p-2 text-right font-medium">
                        {formatCurrency(earner.total_revenue, "NGN")}
                      </td>
                      <td className="p-2 text-right font-medium text-green-600">
                        {formatCurrency(earner.total_commission, "NGN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No top earners data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

