import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onOpenChange?: (open: boolean) => void;
  isProcessing?: boolean;
  children?: React.ReactNode;
  variant?: "default" | "destructive";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Confirm Action",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  onOpenChange,
  isProcessing = false,
  children,
  variant = "default",
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          handleCancel();
        } else if (onOpenChange) {
          onOpenChange(next);
        }
      }}
    >
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="px-0 pt-0 pb-4">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription className="pt-2">{description}</DialogDescription>}
        </DialogHeader>

        {children && <div className="px-0 pb-4">{children}</div>}

        <DialogFooter className="px-0 pb-0 pt-4 flex gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isProcessing}>
            {cancelText}
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isProcessing} 
            className="gap-2"
            variant={variant === "destructive" ? "destructive" : "default"}
          >
            {isProcessing ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
