import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Wallet, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { createWalletTransaction, type CreateWalletTransactionData } from "@/api/admin";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ManageWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: number | null;
  studentName: string;
  currentBalance: number;
  currency: string;
  onSuccess: () => void;
}

export default function ManageWalletDialog({
  open,
  onOpenChange,
  studentId,
  studentName,
  currentBalance,
  currency,
  onSuccess,
}: ManageWalletDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateWalletTransactionData>({
    type: "Credit",
    amount: 0,
    service_name: "",
    ref: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCurrency = (amount: number, curr: string = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.service_name.trim()) {
      newErrors.service_name = "Service name is required";
    }

    // Check for debit with insufficient balance
    if (formData.type === "Debit" && formData.amount > currentBalance) {
      newErrors.amount = `Insufficient balance. Current balance: ${formatCurrency(currentBalance, currency)}`;
    }

    // Warn for large amounts (over 100,000)
    if (formData.amount > 100000) {
      const confirmed = window.confirm(
        `You are about to ${formData.type.toLowerCase()} a large amount (${formatCurrency(formData.amount, currency)}). Are you sure you want to continue?`
      );
      if (!confirmed) {
        newErrors.amount = "Transaction cancelled";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateNewBalance = (): number => {
    if (formData.type === "Credit") {
      return currentBalance + (formData.amount || 0);
    } else {
      return currentBalance - (formData.amount || 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId) {
      toast.error("Student ID is required");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await createWalletTransaction(studentId, formData);

      if (response.success) {
        toast.success(response.message || "Wallet transaction processed successfully", {
          description: `New balance: ${formatCurrency(response.data.wallet.new_balance, currency)}`,
        });

        // Reset form
        setFormData({
          type: "Credit",
          amount: 0,
          service_name: "",
          ref: "",
          notes: "",
        });
        setErrors({});

        // Call success callback to refresh student data
        onSuccess();

        // Close dialog
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error creating wallet transaction:", error);
      const errorMessage = error.response?.data?.message || "Failed to process wallet transaction";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      type: "Credit",
      amount: 0,
      service_name: "",
      ref: "",
      notes: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  const newBalance = calculateNewBalance();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Manage Student Wallet
          </DialogTitle>
          <DialogDescription>
            Manually credit or debit wallet for {studentName}
          </DialogDescription>
        </DialogHeader>

        {/* Current Balance Display */}
        <div className="rounded-lg border bg-muted/50 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(currentBalance, currency)}</p>
            </div>
            <Wallet className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label>Transaction Type *</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "Credit" })}
                className={cn(
                  "flex items-center gap-2 rounded-md border p-3 transition-all",
                  formData.type === "Credit"
                    ? "border-green-600 bg-green-50 dark:bg-green-950 ring-2 ring-green-600"
                    : "hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                    formData.type === "Credit"
                      ? "border-green-600"
                      : "border-muted-foreground"
                  )}
                >
                  {formData.type === "Credit" && (
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                  )}
                </div>
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Credit</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "Debit" })}
                className={cn(
                  "flex items-center gap-2 rounded-md border p-3 transition-all",
                  formData.type === "Debit"
                    ? "border-red-600 bg-red-50 dark:bg-red-950 ring-2 ring-red-600"
                    : "hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                    formData.type === "Debit"
                      ? "border-red-600"
                      : "border-muted-foreground"
                  )}
                >
                  {formData.type === "Debit" && (
                    <div className="h-2 w-2 rounded-full bg-red-600" />
                  )}
                </div>
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Debit</span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({currency}) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              value={formData.amount || ""}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
              }
              className={errors.amount ? "border-red-500" : ""}
            />
            {errors.amount && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.amount}
              </p>
            )}
          </div>

          {/* Service Name */}
          <div className="space-y-2">
            <Label htmlFor="service_name">Service Name *</Label>
            <Input
              id="service_name"
              type="text"
              placeholder="e.g., Refund, Manual Credit, Adjustment"
              value={formData.service_name}
              onChange={(e) =>
                setFormData({ ...formData, service_name: e.target.value })
              }
              className={errors.service_name ? "border-red-500" : ""}
            />
            {errors.service_name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.service_name}
              </p>
            )}
          </div>

          {/* Reference */}
          <div className="space-y-2">
            <Label htmlFor="ref">Reference (Optional)</Label>
            <Input
              id="ref"
              type="text"
              placeholder="e.g., REF-2025-001"
              value={formData.ref}
              onChange={(e) =>
                setFormData({ ...formData, ref: e.target.value })
              }
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or reasons for this transaction"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* Balance Preview */}
          {formData.amount > 0 && (
            <div className="rounded-lg border bg-muted/20 p-4 space-y-2">
              <p className="text-sm font-medium">Balance Preview</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current Balance:</span>
                <span className="font-medium">{formatCurrency(currentBalance, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Change:</span>
                <span
                  className={`font-medium ${
                    formData.type === "Credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formData.type === "Credit" ? "+" : "-"}
                  {formatCurrency(formData.amount, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t">
                <span className="font-medium">New Balance:</span>
                <span className="font-bold text-lg">
                  {formatCurrency(newBalance, currency)}
                </span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Processing..." : `Confirm ${formData.type}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

