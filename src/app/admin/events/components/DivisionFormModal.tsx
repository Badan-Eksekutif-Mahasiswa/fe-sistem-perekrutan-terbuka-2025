"use client";

import React, { useState, useEffect } from "react";
import { Division } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type DivisionFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Division> | null;
  eventId: string;
  onSubmit: (data: Partial<Division>) => Promise<void>;
  loading?: boolean;
};

export default function DivisionFormModal({ isOpen, onClose, initialData, eventId, onSubmit, loading }: DivisionFormModalProps) {
  const [formData, setFormData] = useState<Partial<Division>>({
    name: "",
    maxQuota: undefined,
    isActive: true,
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          id: initialData.id,
          name: initialData.name || "",
          maxQuota: initialData.maxQuota || undefined,
          isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        });
      } else {
        setFormData({
          name: "",
          maxQuota: undefined,
          isActive: true,
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxQuota" ? (value === "" ? undefined : Number(value)) : value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...formData, eventId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Divisi" : "Tambah Divisi"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-m4">Nama Divisi</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="border p-2 rounded-md bg-transparent"
              placeholder="contoh: Hubungan Masyarakat"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="font-bold text-m4">Kuota Maksimal</label>
              <input
                type="number"
                name="maxQuota"
                value={formData.maxQuota || ""}
                onChange={handleChange}
                className="border p-2 rounded-md bg-transparent"
                placeholder="opsional"
                min={1}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="font-bold text-m4">Status</label>
              <select name="isActive" value={formData.isActive?.toString()} onChange={handleChange} className="border p-2 rounded-md bg-transparent">
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>Batal</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
