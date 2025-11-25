import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import TransactionsPage from "./TransactionsPage";
import RevenueStatsPage from "./RevenueStatsPage";
import { Receipt, BarChart3 } from "lucide-react";

export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-0">
          <TransactionsPage />
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
          <RevenueStatsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}

