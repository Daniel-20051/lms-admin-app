import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Skeleton } from "@/Components/ui/skeleton";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
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

  // Group items by semester and currency
  const groupedItems = (items || []).reduce((acc, item) => {
    const key = `${item.semester}-${item.currency}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, PaymentSetupItem[]>);

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex justify-end">
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
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([key, groupItems]) => {
                const [semester, currency] = key.split('-');
                const total = groupItems.reduce((sum, item) => sum + item.amount, 0);

                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{semester}</Badge>
                        <Badge variant="secondary">{currency}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {groupItems.length} item{groupItems.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="text-sm font-medium">
                        Total: ₦{total.toLocaleString()}
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {groupItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.item}</TableCell>
                              <TableCell className="text-muted-foreground">
                                {item.description || '-'}
                              </TableCell>
                              <TableCell>₦{item.amount.toLocaleString()}</TableCell>
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
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                );
              })}
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

