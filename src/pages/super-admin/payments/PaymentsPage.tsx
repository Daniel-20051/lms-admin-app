import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";
import { Badge } from "@/Components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import { 
  CreditCard, 
  DollarSign, 
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  GraduationCap,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { getPaymentOverview, getFundings, getSchoolFees, getCourseOrders, type PaymentOverview, type Funding, type SchoolFee, type CourseOrderPayment } from "@/api/admin";
import { toast } from "sonner";

export default function PaymentsPage() {
  const [overview, setOverview] = useState<PaymentOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [fundings, setFundings] = useState<Funding[]>([]);
  const [fundingsLoading, setFundingsLoading] = useState(false);
  const [fundingsPage, setFundingsPage] = useState(1);
  const [fundingsPagination, setFundingsPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [schoolFees, setSchoolFees] = useState<SchoolFee[]>([]);
  const [schoolFeesLoading, setSchoolFeesLoading] = useState(false);
  const [schoolFeesPage, setSchoolFeesPage] = useState(1);
  const [schoolFeesPagination, setSchoolFeesPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [courseOrders, setCourseOrders] = useState<CourseOrderPayment[]>([]);
  const [courseOrdersLoading, setCourseOrdersLoading] = useState(false);
  const [courseOrdersPage, setCourseOrdersPage] = useState(1);
  const [courseOrdersPagination, setCourseOrdersPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [activeTab, setActiveTab] = useState("funding");

  useEffect(() => {
    fetchPaymentOverview();
  }, []);

  useEffect(() => {
    if (activeTab === "funding") {
      fetchFundings();
    } else if (activeTab === "school-fees") {
      fetchSchoolFees();
    } else if (activeTab === "course-orders") {
      fetchCourseOrders();
    }
  }, [activeTab, fundingsPage, schoolFeesPage, courseOrdersPage]);

  const fetchPaymentOverview = async () => {
    try {
      setLoading(true);
      const response = await getPaymentOverview();
      if (response.success) {
        setOverview(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching payment overview:", error);
      toast.error(error.response?.data?.message || "Failed to load payment overview");
    } finally {
      setLoading(false);
    }
  };

  const fetchFundings = async () => {
    try {
      setFundingsLoading(true);
      const response = await getFundings(fundingsPage, 20);
      if (response.success) {
        setFundings(response.data.fundings);
        setFundingsPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching fundings:", error);
      toast.error(error.response?.data?.message || "Failed to load fundings");
    } finally {
      setFundingsLoading(false);
    }
  };

  const fetchSchoolFees = async () => {
    try {
      setSchoolFeesLoading(true);
      const response = await getSchoolFees(schoolFeesPage, 20);
      if (response.success) {
        setSchoolFees(response.data.schoolFees);
        setSchoolFeesPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching school fees:", error);
      toast.error(error.response?.data?.message || "Failed to load school fees");
    } finally {
      setSchoolFeesLoading(false);
    }
  };

  const fetchCourseOrders = async () => {
    try {
      setCourseOrdersLoading(true);
      const response = await getCourseOrders(courseOrdersPage, 20);
      if (response.success) {
        setCourseOrders(response.data.courseOrders);
        setCourseOrdersPagination(response.data.pagination);
      }
    } catch (error: any) {
      console.error("Error fetching course orders:", error);
      toast.error(error.response?.data?.message || "Failed to load course orders");
    } finally {
      setCourseOrdersLoading(false);
    }
  };

  const formatCurrency = (amount: number | string, currency: string | null = "USD") => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    const currencyCode = currency || "USD";
    
    // Handle numeric currency codes (likely currency IDs)
    if (currencyCode && !isNaN(Number(currencyCode))) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(numAmount);
    }
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(numAmount);
  };

  const formatNumber = (num: number | string) => {
    const numValue = typeof num === "string" ? parseFloat(num) : num;
    return new Intl.NumberFormat("en-US").format(numValue);
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (!overview) return null;

    const totalFundingDebit = overview.funding
      .filter(f => f.type === "Debit")
      .reduce((sum, f) => sum + parseFloat(f.total), 0);
    
    const totalFundingCredit = overview.funding
      .filter(f => f.type === "Credit")
      .reduce((sum, f) => sum + parseFloat(f.total), 0);

    const totalFundingCount = overview.funding
      .reduce((sum, f) => sum + parseInt(f.count), 0);

    const totalSchoolFees = overview.schoolFees
      .reduce((sum, f) => sum + parseFloat(f.total), 0);

    const totalSchoolFeesCount = overview.schoolFees
      .reduce((sum, f) => sum + parseInt(f.count), 0);

    const totalCourseOrders = parseFloat(overview.courseOrders.total);
    const totalCourseOrdersCount = parseInt(overview.courseOrders.count);

    return {
      totalFundingDebit,
      totalFundingCredit,
      totalFundingCount,
      totalSchoolFees,
      totalSchoolFeesCount,
      totalCourseOrders,
      totalCourseOrdersCount,
      grandTotal: totalFundingDebit + totalFundingCredit + totalSchoolFees + totalCourseOrders,
      grandTotalCount: totalFundingCount + totalSchoolFeesCount + totalCourseOrdersCount,
    };
  }, [overview]);


  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const statusLower = status.toLowerCase();
    if (statusLower === "completed" || statusLower === "success" || statusLower === "paid") {
      return <Badge variant="default" className="bg-green-500">Completed</Badge>;
    } else if (statusLower === "pending" || statusLower === "processing") {
      return <Badge variant="secondary" className="bg-yellow-500">Pending</Badge>;
    } else if (statusLower === "failed" || statusLower === "cancelled") {
      return <Badge variant="destructive">Failed</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Payment Overview</h1>
        <p className="text-muted-foreground">View payment statistics and all payment types</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Transactions Card */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium truncate">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-xl font-bold truncate">
                {summaryStats ? formatNumber(summaryStats.grandTotalCount) : "0"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1 truncate">
              All transactions
            </p>
          </CardContent>
        </Card>

        {/* Total Amount Card */}
        <Card  className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium truncate">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-xl font-bold truncate" title={summaryStats ? formatCurrency(summaryStats.grandTotal, "USD") : "$0.00"}>
                {summaryStats 
                  ? formatCurrency(summaryStats.grandTotal, "USD")
                  : "$0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1 truncate">
              Total revenue
            </p>
          </CardContent>
        </Card>

        {/* School Fees Card */}
        <Card  className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium truncate">School Fees</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-xl font-bold truncate" title={summaryStats ? formatCurrency(summaryStats.totalSchoolFees, "NGN") : "₦0.00"}>
                {summaryStats 
                  ? formatCurrency(summaryStats.totalSchoolFees, "NGN")
                  : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {summaryStats ? formatNumber(summaryStats.totalSchoolFeesCount) : "0"} transactions
            </p>
          </CardContent>
        </Card>

        {/* Course Orders Card */}
        <Card className="pt-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium truncate">Course Orders</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-xl font-bold truncate" title={summaryStats ? formatCurrency(summaryStats.totalCourseOrders, "NGN") : "₦0.00"}>
                {summaryStats 
                  ? formatCurrency(summaryStats.totalCourseOrders, "NGN")
                  : "₦0.00"}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {summaryStats ? formatNumber(summaryStats.totalCourseOrdersCount) : "0"} orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            View detailed payment information by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="funding" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Funding
              </TabsTrigger>
              <TabsTrigger value="school-fees" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                School Fees
              </TabsTrigger>
              <TabsTrigger value="course-orders" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Course Orders
              </TabsTrigger>
            </TabsList>

            {/* Funding Tab */}
            <TabsContent value="funding" className="mt-4">
              {fundingsLoading ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 border-b">S/N</th>
                        <th className="text-left p-2 border-b">Service</th>
                        <th className="text-left p-2 border-b">Date</th>
                        <th className="text-left p-2 border-b">Reference</th>
                        <th className="text-left p-2 border-b">Type</th>
                        <th className="text-right p-2 border-b">Amount</th>
                        <th className="text-right p-2 border-b">Balance</th>
                        <th className="text-left p-2 border-b">Currency</th>
                        <th className="text-left p-2 border-b">Semester</th>
                        <th className="text-left p-2 border-b">Academic Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          <td className="p-2"><Skeleton className="h-4 w-12" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-28" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : fundings.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">S/N</th>
                          <th className="text-left p-2 font-medium">Service</th>
                          <th className="text-left p-2 font-medium">Date</th>
                          <th className="text-left p-2 font-medium">Reference</th>
                          <th className="text-left p-2 font-medium">Type</th>
                          <th className="text-right p-2 font-medium">Amount</th>
                          <th className="text-right p-2 font-medium">Balance</th>
                          <th className="text-left p-2 font-medium">Currency</th>
                          <th className="text-left p-2 font-medium">Semester</th>
                          <th className="text-left p-2 font-medium">Academic Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fundings.map((funding, index) => (
                          <tr key={funding.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2 truncate max-w-[200px]" title={funding.service_name}>
                              {funding.service_name}
                            </td>
                            <td className="p-2">{new Date(funding.date).toLocaleDateString()}</td>
                            <td className="p-2 truncate max-w-[150px]" title={funding.ref}>
                              {funding.ref}
                            </td>
                            <td className="p-2">
                              <div className="flex items-center gap-1">
                                {funding.type === "Debit" ? (
                                  <ArrowDownCircle className="h-3 w-3 text-red-500 shrink-0" />
                                ) : (
                                  <ArrowUpCircle className="h-3 w-3 text-green-500 shrink-0" />
                                )}
                                <span className={funding.type === "Debit" ? "text-red-600" : "text-green-600"}>
                                  {funding.type}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 text-right font-medium">
                              {formatCurrency(funding.amount, funding.currency)}
                            </td>
                            <td className="p-2 text-right">
                              {formatCurrency(parseFloat(funding.balance), funding.currency)}
                            </td>
                            <td className="p-2">{funding.currency || "N/A"}</td>
                            <td className="p-2">{funding.semester}</td>
                            <td className="p-2">{funding.academic_year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {fundingsPagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {((fundingsPage - 1) * fundingsPagination.limit) + 1} to {Math.min(fundingsPage * fundingsPagination.limit, fundingsPagination.total)} of {fundingsPagination.total} results
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFundingsPage(p => Math.max(1, p - 1))}
                          disabled={fundingsPage === 1 || fundingsLoading}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="text-sm">
                          Page {fundingsPage} of {fundingsPagination.totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFundingsPage(p => Math.min(fundingsPagination.totalPages, p + 1))}
                          disabled={fundingsPage === fundingsPagination.totalPages || fundingsLoading}
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
                  <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No funding transactions available</p>
                </div>
              )}
            </TabsContent>

            {/* School Fees Tab */}
            <TabsContent value="school-fees" className="mt-4">
              {schoolFeesLoading ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 border-b">S/N</th>
                        <th className="text-left p-2 border-b">Matric Number</th>
                        <th className="text-left p-2 border-b">Student</th>
                        <th className="text-left p-2 border-b">Date</th>
                        <th className="text-left p-2 border-b">Teller No</th>
                        <th className="text-left p-2 border-b">Type</th>
                        <th className="text-left p-2 border-b">Status</th>
                        <th className="text-right p-2 border-b">Amount</th>
                        <th className="text-left p-2 border-b">Currency</th>
                        <th className="text-left p-2 border-b">Level</th>
                        <th className="text-left p-2 border-b">Semester</th>
                        <th className="text-left p-2 border-b">Academic Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          <td className="p-2"><Skeleton className="h-4 w-12" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-28" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-28" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-20" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : schoolFees.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">S/N</th>
                          <th className="text-left p-2 font-medium">Matric Number</th>
                          <th className="text-left p-2 font-medium">Student</th>
                          <th className="text-left p-2 font-medium">Date</th>
                          <th className="text-left p-2 font-medium">Teller No</th>
                          <th className="text-left p-2 font-medium">Type</th>
                          <th className="text-left p-2 font-medium">Status</th>
                          <th className="text-right p-2 font-medium">Amount</th>
                          <th className="text-left p-2 font-medium">Currency</th>
                          <th className="text-left p-2 font-medium">Level</th>
                          <th className="text-left p-2 font-medium">Semester</th>
                          <th className="text-left p-2 font-medium">Academic Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schoolFees.map((fee, index) => (
                          <tr key={fee.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2 truncate max-w-[150px]" title={fee.matric_number}>
                              {fee.matric_number}
                            </td>
                            <td className="p-2 truncate max-w-[200px]">
                              {fee.student ? (
                                <span title={`${fee.student.fname} ${fee.student.lname} (${fee.student.email})`}>
                                  {fee.student.fname} {fee.student.lname}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">N/A</span>
                              )}
                            </td>
                            <td className="p-2">{new Date(fee.date).toLocaleDateString()}</td>
                            <td className="p-2 truncate max-w-[150px]" title={fee.teller_no}>
                              {fee.teller_no}
                            </td>
                            <td className="p-2 truncate max-w-[200px]" title={fee.type}>
                              {fee.type}
                            </td>
                            <td className="p-2">
                              {getStatusBadge(fee.status)}
                            </td>
                            <td className="p-2 text-right font-medium">
                              {formatCurrency(fee.amount, fee.currency)}
                            </td>
                            <td className="p-2">{fee.currency || "N/A"}</td>
                            <td className="p-2">{fee.student_level}</td>
                            <td className="p-2">{fee.semester}</td>
                            <td className="p-2">{fee.academic_year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {schoolFeesPagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {((schoolFeesPage - 1) * schoolFeesPagination.limit) + 1} to {Math.min(schoolFeesPage * schoolFeesPagination.limit, schoolFeesPagination.total)} of {schoolFeesPagination.total} results
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSchoolFeesPage(p => Math.max(1, p - 1))}
                          disabled={schoolFeesPage === 1 || schoolFeesLoading}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="text-sm">
                          Page {schoolFeesPage} of {schoolFeesPagination.totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSchoolFeesPage(p => Math.min(schoolFeesPagination.totalPages, p + 1))}
                          disabled={schoolFeesPage === schoolFeesPagination.totalPages || schoolFeesLoading}
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
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No school fees data available</p>
                </div>
              )}
            </TabsContent>

            {/* Course Orders Tab */}
            <TabsContent value="course-orders" className="mt-4">
              {courseOrdersLoading ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 border-b">S/N</th>
                        <th className="text-left p-2 border-b">Student</th>
                        <th className="text-left p-2 border-b">Date</th>
                        <th className="text-right p-2 border-b">Amount</th>
                        <th className="text-left p-2 border-b">Currency</th>
                        <th className="text-left p-2 border-b">Level</th>
                        <th className="text-left p-2 border-b">Semester</th>
                        <th className="text-left p-2 border-b">Academic Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          <td className="p-2"><Skeleton className="h-4 w-12" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-32" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-20 ml-auto" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-16" /></td>
                          <td className="p-2"><Skeleton className="h-4 w-24" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : courseOrders.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">S/N</th>
                          <th className="text-left p-2 font-medium">Student</th>
                          <th className="text-left p-2 font-medium">Date</th>
                          <th className="text-right p-2 font-medium">Amount</th>
                          <th className="text-left p-2 font-medium">Currency</th>
                          <th className="text-left p-2 font-medium">Level</th>
                          <th className="text-left p-2 font-medium">Semester</th>
                          <th className="text-left p-2 font-medium">Academic Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseOrders.map((order, index) => (
                          <tr key={order.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2 truncate max-w-[200px]">
                              {order.student ? (
                                <span title={`${order.student.fname} ${order.student.lname} (${order.student.email})`}>
                                  {order.student.fname} {order.student.lname}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">N/A</span>
                              )}
                            </td>
                            <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="p-2 text-right font-medium">
                              {order.amount ? formatCurrency(parseFloat(order.amount), order.currency) : "N/A"}
                            </td>
                            <td className="p-2">{order.currency || "N/A"}</td>
                            <td className="p-2">{order.level || "N/A"}</td>
                            <td className="p-2">{order.semester}</td>
                            <td className="p-2">{order.academic_year}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {courseOrdersPagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {((courseOrdersPage - 1) * courseOrdersPagination.limit) + 1} to {Math.min(courseOrdersPage * courseOrdersPagination.limit, courseOrdersPagination.total)} of {courseOrdersPagination.total} results
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCourseOrdersPage(p => Math.max(1, p - 1))}
                          disabled={courseOrdersPage === 1 || courseOrdersLoading}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="text-sm">
                          Page {courseOrdersPage} of {courseOrdersPagination.totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCourseOrdersPage(p => Math.min(courseOrdersPagination.totalPages, p + 1))}
                          disabled={courseOrdersPage === courseOrdersPagination.totalPages || courseOrdersLoading}
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
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No course orders data available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

    </div>
  );
}

