"use client";

import React, { useState } from "react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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
    logo: initialData?.logo || "",
  });

  const [socialMedia, setSocialMedia] = useState({
    instagram: (initialData?.socialMedia as any)?.instagram || "",
    tiktok: (initialData?.socialMedia as any)?.tiktok || "",
    twitter: (initialData?.socialMedia as any)?.twitter || "",
    website: (initialData?.socialMedia as any)?.website || "",
    line: (initialData?.socialMedia as any)?.line || "",
  });

  const parsedTimeline = Array.isArray(initialData?.timeline) && initialData.timeline.length > 0
    ? initialData.timeline as any
    : [{ date: "", title: "", description: "" }];

  const [timeline, setTimeline] = useState<Array<{ date: string, title: string, description: string }>>(parsedTimeline);

  React.useEffect(() => {
    if (!initialData?.id && formData.title) {
      setFormData((prev) => ({
        ...prev,
        id: prev.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || "",
      }));
    }
  }, [formData.title, initialData?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id" ? value.toLowerCase().replace(/\s+/g, '-') : name === "maxChooseDivision" ? Number(value) : value,
    }));
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanValue = name !== 'website' && value.startsWith('@') ? value.substring(1) : value;
    setSocialMedia((prev) => ({ ...prev, [name]: cleanValue }));
  };

  const handleTimelineChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newTimeline = [...timeline];
    newTimeline[index] = { ...newTimeline[index], [name]: value };
    setTimeline(newTimeline);
  };

  const addTimeline = () => {
    setTimeline([...timeline, { date: "", title: "", description: "" }]);
  };

  const removeTimeline = (index: number) => {
    const newTimeline = timeline.filter((_, i) => i !== index);
    setTimeline(newTimeline);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert local datetime to ISO string
    const submitData: any = { ...formData };
    if (submitData.openRegistration) submitData.openRegistration = new Date(submitData.openRegistration).toISOString();
    if (submitData.closeRegistration) submitData.closeRegistration = new Date(submitData.closeRegistration).toISOString();
    
    // Clean up empty social media fields
    const cleanedSocialMedia: any = {};
    Object.entries(socialMedia).forEach(([key, val]) => {
      if (val.trim() !== "") cleanedSocialMedia[key] = val.trim();
    });

    submitData.socialMedia = cleanedSocialMedia;
    submitData.timeline = timeline.filter(t => t.title.trim() !== "" || t.date.trim() !== "");

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
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

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">URL Logo</label>
        <input
          type="url"
          name="logo"
          value={formData.logo || ""}
          onChange={handleChange}
          className="border p-2 rounded-md"
          placeholder="https://example.com/logo.png"
        />
      </div>

      {/* SOSIAL MEDIA */}
      <div className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-md">
        <label className="font-bold text-m4">Sosial Media</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Instagram</label>
            <input type="text" name="instagram" value={socialMedia.instagram} onChange={handleSocialMediaChange} className="border p-2 rounded-md" placeholder="bemui_official" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Tiktok</label>
            <input type="text" name="tiktok" value={socialMedia.tiktok} onChange={handleSocialMediaChange} className="border p-2 rounded-md" placeholder="bemui_official" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Twitter</label>
            <input type="text" name="twitter" value={socialMedia.twitter} onChange={handleSocialMediaChange} className="border p-2 rounded-md" placeholder="BEMUI_Official" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Line</label>
            <input type="text" name="line" value={socialMedia.line} onChange={handleSocialMediaChange} className="border p-2 rounded-md" placeholder="bemui" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm">Website</label>
            <input type="url" name="website" value={socialMedia.website} onChange={handleSocialMediaChange} className="border p-2 rounded-md" placeholder="https://bemui.id" />
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold text-m4">Timeline</label>
          <Button variant="secondary" size="sm" type="button" onClick={addTimeline}>
            <Plus className="size-4 mr-1" /> Tambah Timeline
          </Button>
        </div>
        
        {timeline.map((item, index) => (
          <div key={index} className="flex gap-4 items-start p-3 bg-neutral-50 rounded-md border border-neutral-100">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Tanggal</label>
                  <input type="date" name="date" value={item.date} onChange={(e) => handleTimelineChange(index, e)} className="border p-2 rounded-md" required />
                </div>
                <div className="flex-[2] flex flex-col gap-1">
                  <label className="text-sm">Judul</label>
                  <input type="text" name="title" value={item.title} onChange={(e) => handleTimelineChange(index, e)} className="border p-2 rounded-md" placeholder="Contoh: Pembukaan Pendaftaran" required />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Deskripsi</label>
                <textarea name="description" value={item.description} onChange={(e) => handleTimelineChange(index, e)} className="border p-2 rounded-md h-20" placeholder="Opsional" />
              </div>
            </div>
            {timeline.length > 1 && (
              <Button variant="destructive" size="icon" type="button" onClick={() => removeTimeline(index)} className="mt-7">
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
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
