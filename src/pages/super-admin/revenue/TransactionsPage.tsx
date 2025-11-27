import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  X,
  ExternalLink
} from "lucide-react";
import {
  getMarketplaceTransactions,
  type GetMarketplaceTransactionsParams,
  type MarketplaceTransaction
} from "@/api/admin";
import { toast } from "sonner";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<MarketplaceTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });

  // Filters
  const [filters, setFilters] = useState<GetMarketplaceTransactionsParams>({
    page: 1,
    limit: 20,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getMarketplaceTransactions(filters);
      if (response.success) {
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      toast.error(error.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof GetMarketplaceTransactionsParams, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 20,
    });
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

  const exportTransactions = () => {
    // TODO: Implement CSV/Excel export
    toast.info("Export functionality coming soon");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketplace Transactions</h1>
          <p className="text-muted-foreground">View and manage all marketplace transactions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" onClick={exportTransactions}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="owner_type">Owner Type</Label>
                <Select
                  value={filters.owner_type || ""}
                  onValueChange={(value) => handleFilterChange("owner_type", value || undefined)}
                >
                  <SelectTrigger id="owner_type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="sole_tutor">Sole Tutor</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="payment_status">Payment Status</Label>
                <Select
                  value={filters.payment_status || ""}
                  onValueChange={(value) => handleFilterChange("payment_status", value || undefined)}
                >
                  <SelectTrigger id="payment_status">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={filters.start_date || ""}
                  onChange={(e) => handleFilterChange("start_date", e.target.value || undefined)}
                />
              </div>

              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={filters.end_date || ""}
                  onChange={(e) => handleFilterChange("end_date", e.target.value || undefined)}
                />
              </div>

              {filters.owner_id && (
                <div>
                  <Label htmlFor="owner_id">Owner ID</Label>
                  <Input
                    id="owner_id"
                    type="number"
                    value={filters.owner_id}
                    onChange={(e) => handleFilterChange("owner_id", e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            {pagination.total} total transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2 border-b">S/N</th>
                    <th className="text-left p-2 border-b">Course</th>
                    <th className="text-left p-2 border-b">Student</th>
                    <th className="text-left p-2 border-b">Owner</th>
                    <th className="text-right p-2 border-b">Course Price</th>
                    <th className="text-right p-2 border-b">Commission</th>
                    <th className="text-right p-2 border-b">Tutor Earnings</th>
                    <th className="text-left p-2 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="p-2"><Skeleton className="h-4 w-12" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                      <td className="p-2"><Skeleton className="h-4 w-20" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : transactions.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">S/N</th>
                      <th className="text-left p-2 font-medium">Course</th>
                      <th className="text-left p-2 font-medium">Student</th>
                      <th className="text-left p-2 font-medium">Owner</th>
                      <th className="text-right p-2 font-medium">Course Price</th>
                      <th className="text-right p-2 font-medium">Commission</th>
                      <th className="text-right p-2 font-medium">Tutor Earnings</th>
                      <th className="text-left p-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">{index + 1}</td>
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
                        <td className="p-2">
                          <div>
                            <Button
                              variant="link"
                              className="h-auto p-0 text-left font-normal"
                              onClick={() => navigate(`/super-admin/revenue/tutor/${transaction.owner_type}/${transaction.owner_id}`)}
                            >
                              <Badge variant="outline" className="mr-2">
                                {transaction.owner_type === "sole_tutor" ? "Sole Tutor" : "Organization"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">ID: {transaction.owner_id}</span>
                              <ExternalLink className="h-3 w-3 ml-1 inline" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-2 text-right font-medium">
                          {formatCurrency(transaction.course_price, transaction.currency)}
                        </td>
                        <td className="p-2 text-right">
                          {formatCurrency(transaction.wpu_commission, transaction.currency)}
                          <div className="text-xs text-muted-foreground">
                            ({transaction.commission_rate}%)
                          </div>
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
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange("page", Math.max(1, pagination.page - 1))}
                      disabled={pagination.page === 1 || loading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-sm">
                      Page {pagination.page} of {pagination.totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange("page", Math.min(pagination.totalPages, pagination.page + 1))}
                      disabled={pagination.page === pagination.totalPages || loading}
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

