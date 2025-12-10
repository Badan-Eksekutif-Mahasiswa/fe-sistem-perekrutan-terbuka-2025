"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface SubmitConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function SubmitConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: SubmitConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center">
            Konfirmasi Submit Pendaftaran
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <span className="block">
              Apakah Anda yakin ingin mengirimkan formulir pendaftaran ini?
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2 justify-between">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Batal
            </Button>
            <Button
              // variant="secondary"
              onClick={onConfirm}
              disabled={loading}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {loading ? "Mengirim..." : "Ya, Submit Sekarang"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
