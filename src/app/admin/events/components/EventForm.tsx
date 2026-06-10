"use client";

import React, { useState } from "react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";

type EventFormProps = {
  initialData?: Partial<Event>;
  onSubmit: (data: Partial<Event>) => Promise<void>;
  loading?: boolean;
};

export default function EventForm({ initialData, onSubmit, loading }: EventFormProps) {
  const [formData, setFormData] = useState<Partial<Event>>({
    id: initialData?.id || "",
    title: initialData?.title || "",
    eventCode: initialData?.eventCode || "",
    description: initialData?.description || "",
    status: initialData?.status || "DRAFT",
    typeOfEvent: initialData?.typeOfEvent || "ORGANISASI",
    eventLevel: initialData?.eventLevel || "Universitas",
    maxChooseDivision: initialData?.maxChooseDivision || 1,
    openRegistration: initialData?.openRegistration ? new Date(initialData.openRegistration).toISOString().slice(0, 16) : "",
    closeRegistration: initialData?.closeRegistration ? new Date(initialData.closeRegistration).toISOString().slice(0, 16) : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id" ? value.toLowerCase().replace(/\s+/g, '-') : name === "maxChooseDivision" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert local datetime to ISO string
    const submitData = { ...formData };
    if (submitData.openRegistration) submitData.openRegistration = new Date(submitData.openRegistration).toISOString();
    if (submitData.closeRegistration) submitData.closeRegistration = new Date(submitData.closeRegistration).toISOString();
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">ID Event (URL Safe)</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="contoh: bem-ui-2025"
            required
            disabled={!!initialData?.id} // cannot edit ID if editing
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Kode Event</label>
          <input
            type="text"
            name="eventCode"
            value={formData.eventCode}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="BEM2025"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">Judul Event</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">Deskripsi</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded-md h-32"
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded-md">
            <option value="DRAFT">DRAFT</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Tipe Event</label>
          <select name="typeOfEvent" value={formData.typeOfEvent} onChange={handleChange} className="border p-2 rounded-md">
            <option value="ORGANISASI">Organisasi</option>
            <option value="KEPANITIAAN">Kepanitiaan</option>
            <option value="UKM">UKM</option>
          </select>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Level Event</label>
          <input
            type="text"
            name="eventLevel"
            value={formData.eventLevel}
            onChange={handleChange}
            className="border p-2 rounded-md"
            placeholder="Universitas / Fakultas"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Maks Pilih Divisi</label>
          <input
            type="number"
            name="maxChooseDivision"
            value={formData.maxChooseDivision}
            onChange={handleChange}
            className="border p-2 rounded-md"
            min={1}
            required
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Waktu Buka Pendaftaran</label>
          <input
            type="datetime-local"
            name="openRegistration"
            value={formData.openRegistration as string}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Waktu Tutup Pendaftaran</label>
          <input
            type="datetime-local"
            name="closeRegistration"
            value={formData.closeRegistration as string}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Event"}
        </Button>
      </div>
    </form>
  );
}
