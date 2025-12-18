import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getSchoolFees, type SchoolFee } from "@/api/admin";
import { toast } from "sonner";
import { getSemesters, type Semester } from "@/api/semesters";

interface SchoolFeesPaymentsListProps {
  onRefresh?: () => void;
}

export default function SchoolFeesPaymentsList({ onRefresh: _onRefresh }: SchoolFeesPaymentsListProps) {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<SchoolFee[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [semesterFilter, setSemesterFilter] = useState<string>("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Fetch semesters
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await getSemesters({ limit: 100 });
        setSemesters(response.data.semesters);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    fetchSemesters();
  }, []);

  // Fetch payments
  useEffect(() => {
    fetchPayments();
  }, [currentPage, statusFilter, semesterFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchPayments();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: limit,
      };

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      if (semesterFilter !== "all") {
        const [academicYear, semester] = semesterFilter.split('|');
        params.semester = semester;
        params.academic_year = academicYear;
      }

      const response = await getSchoolFees(params);
      if (response.success) {
        let filteredPayments = response.data?.schoolFees || [];
        
        // Apply client-side search filter if search term is provided
        if (searchTerm) {
          const search = searchTerm.toLowerCase();
          filteredPayments = filteredPayments.filter(p => 
            p.matric_number?.toLowerCase().includes(search) ||
            p.student?.fname?.toLowerCase().includes(search) ||
            p.student?.lname?.toLowerCase().includes(search) ||
            p.student?.email?.toLowerCase().includes(search)
          );
        }
        
        setPayments(filteredPayments);
        setTotalPages(response.data?.pagination?.totalPages || 1);
        setTotal(response.data?.pagination?.total || 0);
      }
    } catch (error: any) {
      console.error("Error fetching payments:", error);
      toast.error(error.response?.data?.message || "Failed to load payments");
      setPayments([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Paid") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
    }
    return <Badge variant="secondary">Pending</Badge>;
  };


  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Semester</Label>
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((sem) => (
                    <SelectItem
                      key={sem.id}
                      value={`${sem.academic_year}|${sem.semester}`}
                    >
                      {sem.academic_year} - {sem.semester} {sem.status === 'Active' && '(Active)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="pt-3">
        <CardHeader>
          <div>
            <CardTitle>School Fees Payments</CardTitle>
            <CardDescription>
              Total: {total} payment{total !== 1 ? 's' : ''}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !payments || payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payments found
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Matric Number</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Academic Year</TableHead>
                      <TableHead>Payment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {payment.student ? (
                            `${payment.student.fname} ${payment.student.lname}`
                          ) : (
                            <span className="text-muted-foreground italic">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {payment.matric_number || (
                            <span className="text-muted-foreground italic">Not assigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {payment.currency === 'NGN' ? '₦' : payment.currency === 'USD' ? '$' : payment.currency === 'GBP' ? '£' : payment.currency === 'EUR' ? '€' : ''}
                          {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{payment.semester}</TableCell>
                        <TableCell>{payment.academic_year}</TableCell>
                        <TableCell>
                          {payment.date ? (
                            new Date(payment.date).toLocaleDateString()
                          ) : (
                            <span className="text-muted-foreground italic">N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

