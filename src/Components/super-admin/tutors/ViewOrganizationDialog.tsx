import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { 
  BookOpen, 
  Building2, 
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { getOrganizationById, type OrganizationDetails } from "@/api/admin";
import { toast } from "sonner";

interface ViewOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: number | null;
}

export default function ViewOrganizationDialog({
  open,
  onOpenChange,
  organizationId,
}: ViewOrganizationDialogProps) {
  const [organizationData, setOrganizationData] = useState<OrganizationDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && organizationId) {
      setOrganizationData(null);
      setError(null);
      setLoading(false);
      
      const timer = setTimeout(() => {
        fetchOrganizationDetails();
      }, 50);
      return () => clearTimeout(timer);
    }
    
    if (!open) {
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      setOrganizationData(null);
      setError(null);
      setLoading(false);
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    };
  }, [open, organizationId]);

  const fetchOrganizationDetails = async () => {
    if (!organizationId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getOrganizationById(organizationId);
      if (response.success) {
        setOrganizationData(response.data.organization);
      }
    } catch (error: any) {
      console.error("Error fetching organization details:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch organization details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "active" || statusLower === "approved") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
    } else if (statusLower === "suspended") {
      return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Suspended</Badge>;
    } else if (statusLower === "pending" || statusLower === "pending_approval") {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    } else if (statusLower === "rejected") {
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
    }
    return <Badge variant="outline">{status || "Unknown"}</Badge>;
  };

  const formatCurrency = (amount: number | string, currency: string = "USD") => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(numAmount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Organization Profile</DialogTitle>
          <DialogDescription>
            View complete organization information, users, courses, and earnings
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-destructive">{error}</p>
          </div>
        ) : organizationData ? (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(organizationData).map(([key, value]) => {
                      // Skip nested objects and arrays - they'll be shown in other tabs
                      if (key === "users" || key === "courses" || key === "earnings" || typeof value === "object") {
                        return null;
                      }
                      
                      // Skip id as it's shown in header
                      if (key === "id") {
                        return null;
                      }

                      const displayKey = key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                      const displayValue = value === null || value === undefined ? "N/A" : String(value);

                      return (
                        <div key={key} className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">{displayKey}</p>
                          <p className="text-sm">{displayValue}</p>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Status Badge */}
                  {organizationData.status && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                      {getStatusBadge(organizationData.status)}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Organization Users (Tutors)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {organizationData.users && organizationData.users.length > 0 ? (
                    <div className="space-y-4">
                      {organizationData.users.map((user) => (
                        <Card key={user.id} className="border">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h4 className="font-semibold">
                                  {user.name || `User #${user.id}`}
                                </h4>
                                {user.email && (
                                  <p className="text-sm text-muted-foreground">
                                    {user.email}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No users assigned</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {organizationData.courses && organizationData.courses.length > 0 ? (
                    <div className="space-y-4">
                      {organizationData.courses.map((course) => (
                        <Card key={course.id} className="border">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h4 className="font-semibold">{course.title}</h4>
                                {course.course_code && (
                                  <p className="text-sm text-muted-foreground">
                                    Code: {course.course_code}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No courses assigned</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings" className="space-y-4 mt-4">
              {organizationData.earnings ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Earnings Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Total Earnings</span>
                        <span className="text-2xl font-bold">
                          {formatCurrency(
                            typeof organizationData.earnings.total === "string" 
                              ? parseFloat(organizationData.earnings.total) 
                              : organizationData.earnings.total,
                            organizationData.earnings.currency || "USD"
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No earnings information available</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : null}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

