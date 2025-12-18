import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import SchoolFeesPaymentsList from "@/Components/super-admin/school-fees/SchoolFeesPaymentsList";
import PaymentSetupManagement from "@/Components/super-admin/school-fees/PaymentSetupManagement";
import SchoolFeesConfiguration from "@/Components/super-admin/school-fees/SchoolFeesConfiguration";
import SchoolFeesDashboard from "@/Components/super-admin/school-fees/SchoolFeesDashboard";

export default function SchoolFeesPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">School Fees Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage student school fees, payment setup, and configurations
        </p>
      </div>

      <Card className="pt-3">
        <CardHeader>
          <CardTitle>School Fees Management</CardTitle>
          <CardDescription>
            View payments, manage payment setup items, and configure school fees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="setup">Payment Setup</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <SchoolFeesDashboard key={refreshKey} />
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <SchoolFeesPaymentsList key={refreshKey} onRefresh={handleRefresh} />
            </TabsContent>

            <TabsContent value="setup" className="mt-6">
              <PaymentSetupManagement key={refreshKey} onRefresh={handleRefresh} />
            </TabsContent>

            <TabsContent value="configuration" className="mt-6">
              <SchoolFeesConfiguration key={refreshKey} onRefresh={handleRefresh} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

