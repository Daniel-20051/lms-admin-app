import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  ArrowLeft,
  DollarSign,
  Wallet,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  getTutorRevenueDetails,
  type GetTutorRevenueDetailsParams,
  type TutorRevenueDetails
} from "@/api/admin";
import { toast } from "sonner";

export default function TutorRevenuePage() {
  const { ownerType, ownerId } = useParams<{ ownerType: "sole_tutor" | "organization"; ownerId: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<TutorRevenueDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<GetTutorRevenueDetailsParams>({});
  const [transactionsPage, setTransactionsPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    if (ownerType && ownerId) {
      fetchDetails();
    }
  }, [ownerType, ownerId, filters]);

  const fetchDetails = async () => {
    if (!ownerType || !ownerId) return;

    try {
      setLoading(true);
      const response = await getTutorRevenueDetails(
        ownerType,
        parseInt(ownerId),
        filters
      );
      if (response.success) {
        setDetails(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching tutor revenue details:", error);
      toast.error(error.response?.data?.message || "Failed to load tutor revenue details");
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

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "completed") {
      return <Badge variant="default" className="bg-green-500">Completed</Badge>;
    } else if (statusLower === "pending") {
      return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
    } else if (statusLower === "failed") {
      return <Badge variant="destructive">Failed</Badge>;
    } else if (statusLower === "refunded") {
      return <Badge variant="outline" className="bg-orange-500">Refunded</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  if (!ownerType || !ownerId) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Invalid tutor information</p>
        <Button onClick={() => navigate("/super-admin/revenue/transactions")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Transactions
        </Button>
      </div>
    );
  }

  const paginatedTransactions = details?.transactions.slice(
    (transactionsPage - 1) * transactionsPerPage,
    transactionsPage * transactionsPerPage
  ) || [];
  const totalPages = details ? Math.ceil((details.transactions.length || 0) / transactionsPerPage) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/super-admin/revenue/transactions")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Tutor Revenue Details</h1>
            <p className="text-muted-foreground">
              {ownerType === "sole_tutor" ? "Sole Tutor" : "Organization"} - ID: {ownerId}
            </p>
          </div>
        </div>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold">
                {details ? formatCurrency(details.total_revenue, details.currency) : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Gross revenue
            </p>
          </CardContent>
        </Card>

        {/* Total Commission */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold text-red-600">
                {details ? formatCurrency(details.total_commission, details.currency) : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              WPU commission
            </p>
          </CardContent>
        </Card>

        {/* Tutor Earnings */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tutor Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold text-green-600">
                {details ? formatCurrency(details.tutor_earnings, details.currency) : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Net earnings
            </p>
          </CardContent>
        </Card>

        {/* Wallet Balance */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-bold">
                {details ? formatCurrency(details.wallet_balance, details.currency) : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Current balance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {details ? `${details.transaction_count} total transactions` : "Loading..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2 border-b">ID</th>
                    <th className="text-left p-2 border-b">Course</th>
                    <th className="text-left p-2 border-b">Student</th>
                    <th className="text-right p-2 border-b">Price</th>
                    <th className="text-right p-2 border-b">Commission</th>
                    <th className="text-right p-2 border-b">Earnings</th>
                    <th className="text-left p-2 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="p-2"><Skeleton className="h-4 w-12" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : details && details.transactions.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">ID</th>
                      <th className="text-left p-2 font-medium">Course</th>
                      <th className="text-left p-2 font-medium">Student</th>
                      <th className="text-right p-2 font-medium">Price</th>
                      <th className="text-right p-2 font-medium">Commission</th>
                      <th className="text-right p-2 font-medium">Earnings</th>
                      <th className="text-left p-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">{transaction.id}</td>
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{transaction.course.title}</div>
                            <div className="text-xs text-muted-foreground">{transaction.course.course_code}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div>
                            <div>{transaction.student.fname} {transaction.student.lname}</div>
                            <div className="text-xs text-muted-foreground">{transaction.student.email}</div>
                          </div>
                        </td>
                        <td className="p-2 text-right font-medium">
                          {formatCurrency(transaction.course_price, transaction.currency)}
                        </td>
                        <td className="p-2 text-right">
                          {formatCurrency(transaction.wpu_commission, transaction.currency)}
                        </td>
                        <td className="p-2 text-right font-medium text-green-600">
                          {formatCurrency(transaction.tutor_earnings, transaction.currency)}
                        </td>
                        <td className="p-2">
                          {getStatusBadge(transaction.payment_status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((transactionsPage - 1) * transactionsPerPage) + 1} to {Math.min(transactionsPage * transactionsPerPage, details.transactions.length)} of {details.transactions.length} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTransactionsPage(p => Math.max(1, p - 1))}
                      disabled={transactionsPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-sm">
                      Page {transactionsPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTransactionsPage(p => Math.min(totalPages, p + 1))}
                      disabled={transactionsPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

