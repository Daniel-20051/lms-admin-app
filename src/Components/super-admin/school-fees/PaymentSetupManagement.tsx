import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import {
  getPaymentSetup,
  deletePaymentSetupItem,
  type PaymentSetupItem,
} from "@/api/admin";
import { toast } from "sonner";
import PaymentSetupDialog from "./PaymentSetupDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

interface PaymentSetupManagementProps {
  onRefresh?: () => void;
}

export default function PaymentSetupManagement({ onRefresh }: PaymentSetupManagementProps) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PaymentSetupItem[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<PaymentSetupItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<PaymentSetupItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("all");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await getPaymentSetup();
      if (response.success) {
        setItems(response.data?.paymentSetup || []);
      }
    } catch (error: any) {
      console.error("Error fetching payment setup:", error);
      toast.error(error.response?.data?.message || "Failed to load payment setup");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowDialog(true);
  };

  const handleEdit = (item: PaymentSetupItem) => {
    setEditingItem(item);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeleteLoading(true);
      const response = await deletePaymentSetupItem(itemToDelete.id);
      if (response.success) {
        toast.success("Payment setup item deleted successfully");
        setItemToDelete(null);
        fetchItems();
        if (onRefresh) onRefresh();
      }
    } catch (error: any) {
      console.error("Error deleting payment setup item:", error);
      toast.error(error.response?.data?.message || "Failed to delete item");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDialogClose = (success: boolean) => {
    setShowDialog(false);
    setEditingItem(null);
    if (success) {
      fetchItems();
      if (onRefresh) onRefresh();
    }
  };

  // Get unique semesters and currencies for filters
  const uniqueSemesters = useMemo(() => {
    const semesters = new Set(items.map(item => item.semester));
    return Array.from(semesters).sort();
  }, [items]);

  const uniqueCurrencies = useMemo(() => {
    const currencies = new Set(items.map(item => item.currency));
    return Array.from(currencies).sort();
  }, [items]);

  // Filter items based on selected filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSemester = selectedSemester === "all" || item.semester === selectedSemester;
      const matchesCurrency = selectedCurrency === "all" || item.currency === selectedCurrency;
      return matchesSemester && matchesCurrency;
    });
  }, [items, selectedSemester, selectedCurrency]);

  // Group filtered items by semester and currency, and calculate totals
  const groupedItemsWithTotals = useMemo(() => {
    const grouped = filteredItems.reduce((acc, item) => {
      const key = `${item.semester}-${item.currency}`;
      if (!acc[key]) {
        acc[key] = {
          semester: item.semester,
          currency: item.currency,
          items: [],
          total: 0,
        };
      }
      acc[key].items.push(item);
      acc[key].total += item.amount;
      return acc;
    }, {} as Record<string, { semester: string; currency: string; items: PaymentSetupItem[]; total: number }>);

    // Sort groups by semester, then currency
    return Object.values(grouped).sort((a, b) => {
      if (a.semester !== b.semester) {
        return a.semester.localeCompare(b.semester);
      }
      return a.currency.localeCompare(b.currency);
    });
  }, [filteredItems]);

  // Format currency amount
  const formatAmount = (amount: number, currency: string) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString()}`;
    } else if (currency === "NGN") {
      return `₦${amount.toLocaleString()}`;
    }
    return `${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          {/* Semester Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Semester:</label>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {uniqueSemesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Currency Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Currency:</label>
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Currencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                {uniqueCurrencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Fee Item
        </Button>
      </div>

      {/* Items List */}
      <Card className="pt-3">
        <CardHeader>
          <CardTitle>Payment Setup Items</CardTitle>
          <CardDescription>
            Manage itemized fee breakdown for students
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !items || items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payment setup items found. Click "Add Fee Item" to create one.
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No items match the selected filters.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedItemsWithTotals.map((group, groupIndex) => (
                    <React.Fragment key={`${group.semester}-${group.currency}-${groupIndex}`}>
                      {group.items.map((item, itemIndex) => (
                        <TableRow key={item.id}>
                          {itemIndex === 0 && (
                            <TableCell
                              rowSpan={group.items.length}
                              className="font-medium align-top border-r bg-muted/30"
                              style={{ verticalAlign: 'top' }}
                            >
                              <div className="py-2">
                                <Badge variant="outline" className="text-sm">
                                  {group.semester}
                                </Badge>
                              </div>
                            </TableCell>
                          )}
                          {itemIndex === 0 && (
                            <TableCell
                              rowSpan={group.items.length}
                              className="font-medium align-top border-r bg-muted/30"
                              style={{ verticalAlign: 'top' }}
                            >
                              <div className="py-2">
                                <Badge variant="secondary" className="text-sm">
                                  {group.currency}
                                </Badge>
                              </div>
                            </TableCell>
                          )}
                          <TableCell className="font-medium">{item.item}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {item.description || '-'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatAmount(item.amount, item.currency)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setItemToDelete(item)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Total row for this group */}
                      <TableRow className="bg-muted/50 font-semibold border-t-2">
                        <TableCell colSpan={4} className="text-right pr-4">
                          <span className="flex items-center gap-2 justify-end">
                            <Badge variant="outline">{group.semester}</Badge>
                            <Badge variant="secondary">{group.currency}</Badge>
                            <span>Total:</span>
                          </span>
                        </TableCell>
                        <TableCell className="font-bold text-lg">
                          {formatAmount(group.total, group.currency)}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {/* Spacer row between groups */}
                      {groupIndex < groupedItemsWithTotals.length - 1 && (
                        <TableRow>
                          <TableCell colSpan={6} className="h-3 p-0 bg-transparent border-0"></TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <PaymentSetupDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        item={editingItem}
        onSuccess={handleDialogClose}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Setup Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{itemToDelete?.item}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

