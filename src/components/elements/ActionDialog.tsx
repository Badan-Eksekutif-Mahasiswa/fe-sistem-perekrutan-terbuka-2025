"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ActionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "destructive" | "secondary";
  loading?: boolean;
  hideCancel?: boolean;
  onConfirm?: () => void | Promise<void>;
};

export default function ActionDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "OK",
  cancelLabel = "Batal",
  variant = "primary",
  loading = false,
  hideCancel = false,
  onConfirm,
}: ActionDialogProps) {
  const handleConfirm = async () => {
    await onConfirm?.();
    if (!loading) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {!hideCancel && (
            <DialogClose asChild>
              <Button type="button" variant="stroke" disabled={loading}>
                {cancelLabel}
              </Button>
            </DialogClose>
          )}
          <Button
            type="button"
            variant={variant}
            disabled={loading}
            onClick={() => void handleConfirm()}
          >
            {loading ? "Memproses..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
