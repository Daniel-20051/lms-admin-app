import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Loader2 } from "lucide-react";
import { createPaymentSetupItem, updatePaymentSetupItem, type PaymentSetupItem } from "@/api/admin";
import { toast } from "sonner";

interface PaymentSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: PaymentSetupItem | null;
  onSuccess?: (success: boolean) => void;
}

export default function PaymentSetupDialog({
  open,
  onOpenChange,
  item,
  onSuccess,
}: PaymentSetupDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    amount: "",
    description: "",
    semester: "1ST" as "1ST" | "2ND",
    currency: "NGN",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        item: item.item,
        amount: item.amount.toString(),
        description: item.description || "",
        semester: item.semester as "1ST" | "2ND",
        currency: item.currency,
      });
    } else {
      setFormData({
        item: "",
        amount: "",
        description: "",
        semester: "1ST",
        currency: "NGN",
      });
    }
  }, [item, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.item.trim()) {
      toast.error("Item name is required");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Amount must be a positive number");
      return;
    }

    try {
      setLoading(true);
      const data = {
        item: formData.item.trim(),
        amount: Number(formData.amount),
        description: formData.description.trim() || undefined,
        semester: formData.semester,
        currency: formData.currency.toUpperCase(),
      };

      if (item) {
        await updatePaymentSetupItem(item.id, data);
        toast.success("Payment setup item updated successfully");
      } else {
        await createPaymentSetupItem(data);
        toast.success("Payment setup item created successfully");
      }

      onOpenChange(false);
      if (onSuccess) onSuccess(true);
    } catch (error: any) {
      console.error("Error saving payment setup item:", error);
      toast.error(error.response?.data?.message || "Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item ? "Edit Payment Setup Item" : "Add Payment Setup Item"}
          </DialogTitle>
          <DialogDescription>
            {item
              ? "Update the payment setup item details"
              : "Create a new itemized fee item for students"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="item">Item Name *</Label>
              <Input
                id="item"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                placeholder="e.g., Semester Registration Fee"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester *</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value: "1ST" | "2ND") =>
                    setFormData({ ...formData, semester: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1ST">1ST Semester</SelectItem>
                    <SelectItem value="2ND">2ND Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {item ? "Updating..." : "Creating..."}
                </>
              ) : (
                item ? "Update" : "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

