"use client";

import React, { useState } from "react";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

type EventFormProps = {
  initialData?: Partial<Event>;
  onSubmit: (data: Partial<Event>, divisionsData?: any[], deletedDivisionIds?: string[]) => Promise<void>;
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

  const [timeline, setTimeline] = useState<Array<{ date: string, title: string, description: string }>>(
    Array.isArray(initialData?.timeline) && initialData.timeline.length > 0 ? initialData.timeline as any : [{ date: "", title: "", description: "" }]
  );

  const [faqs, setFaqs] = useState<Array<{ question: string, answer: string }>>(
    Array.isArray(initialData?.faqs) && initialData.faqs.length > 0 ? initialData.faqs as any : [{ question: "", answer: "" }]
  );

  const [testimonials, setTestimonials] = useState<Array<{ name: string, role: string, message: string, photoUrl: string }>>(
    Array.isArray(initialData?.testimonials) && initialData.testimonials.length > 0 ? initialData.testimonials as any : [{ name: "", role: "", message: "", photoUrl: "" }]
  );

  const [documentations, setDocumentations] = useState<Array<{ title: string, imageUrl: string }>>(
    Array.isArray(initialData?.documentations) && initialData.documentations.length > 0 ? initialData.documentations as any : [{ title: "", imageUrl: "" }]
  );

  // Divisions State
  const parsedDivisions = Array.isArray(initialData?.divisions) && initialData.divisions.length > 0
    ? initialData.divisions as any
    : [{ id: "", name: "", maxQuota: "", description: "", jobdesc: "", picName: "", picContact: "", isActive: true }];

  const [divisions, setDivisions] = useState<Array<any>>(parsedDivisions.map((d: any) => ({
    id: d.id || "",
    name: d.name || "",
    maxQuota: d.maxQuota || "",
    description: d.description || "",
    jobdesc: d.jobdesc || "",
    picName: d.PIC?.name || "",
    picContact: d.PIC?.contact || "",
    isActive: d.isActive !== undefined ? d.isActive : true,
  })));

  const [deletedDivisions, setDeletedDivisions] = useState<string[]>([]);

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
  const addTimeline = () => setTimeline([...timeline, { date: "", title: "", description: "" }]);
  const removeTimeline = (index: number) => setTimeline(timeline.filter((_, i) => i !== index));

  const handleFaqChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [name]: value };
    setFaqs(newFaqs);
  };
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const handleTestimonialChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [name]: value };
    setTestimonials(newTestimonials);
  };
  const addTestimonial = () => setTestimonials([...testimonials, { name: "", role: "", message: "", photoUrl: "" }]);
  const removeTestimonial = (index: number) => setTestimonials(testimonials.filter((_, i) => i !== index));

  const handleDocumentationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newDocs = [...documentations];
    newDocs[index] = { ...newDocs[index], [name]: value };
    setDocumentations(newDocs);
  };
  const addDocumentation = () => setDocumentations([...documentations, { title: "", imageUrl: "" }]);
  const removeDocumentation = (index: number) => setDocumentations(documentations.filter((_, i) => i !== index));


  const handleDivisionChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newDivisions = [...divisions];
    newDivisions[index] = { 
      ...newDivisions[index], 
      [name]: name === "isActive" ? value === "true" : name === "maxQuota" ? (value === "" ? "" : Number(value)) : value 
    };
    setDivisions(newDivisions);
  };

  const addDivision = () => {
    setDivisions([...divisions, { id: "", name: "", maxQuota: "", description: "", jobdesc: "", picName: "", picContact: "", isActive: true }]);
  };

  const removeDivision = (index: number) => {
    const divToRemove = divisions[index];
    if (divToRemove.id) {
      setDeletedDivisions([...deletedDivisions, divToRemove.id]);
    }
    const newDivisions = divisions.filter((_, i) => i !== index);
    setDivisions(newDivisions);
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
    submitData.faqs = faqs.filter(f => f.question.trim() !== "");
    submitData.testimonials = testimonials.filter(t => t.name.trim() !== "");
    submitData.documentations = documentations.filter(d => d.title.trim() !== "" || d.imageUrl.trim() !== "");

    // Prepare divisions payload
    const finalDivisions = divisions.filter(d => d.name.trim() !== "").map(d => ({
      id: d.id,
      name: d.name,
      maxQuota: d.maxQuota === "" ? null : Number(d.maxQuota),
      isActive: d.isActive,
      description: d.description,
      jobdesc: d.jobdesc,
      PIC: {
        name: d.picName,
        contact: d.picContact
      }
    }));

    onSubmit(submitData, finalDivisions, deletedDivisions);
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

      {/* DIVISI */}
      <div className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold text-m4">Divisi</label>
          <Button variant="secondary" size="sm" type="button" onClick={addDivision}>
            <Plus className="size-4 mr-1" /> Tambah Divisi
          </Button>
        </div>
        
        {divisions.map((item, index) => (
          <div key={index} className="flex gap-4 items-start p-3 bg-neutral-50 rounded-md border border-neutral-100">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Nama Divisi</label>
                  <input type="text" name="name" value={item.name} onChange={(e) => handleDivisionChange(index, e)} className="border p-2 rounded-md" placeholder="Contoh: Humas" required />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Kuota Maksimal</label>
                  <input type="number" name="maxQuota" value={item.maxQuota} onChange={(e) => handleDivisionChange(index, e)} className="border p-2 rounded-md" placeholder="Opsional" min={1} />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Status</label>
                  <select name="isActive" value={item.isActive?.toString()} onChange={(e) => handleDivisionChange(index, e)} className="border p-2 rounded-md">
                    <option value="true">Aktif</option>
                    <option value="false">Nonaktif</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Deskripsi Divisi</label>
                  <textarea name="description" value={item.description} onChange={(e) => handleDivisionChange(index, e)} className="border p-2 rounded-md h-20" placeholder="Opsional" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Jobdesc</label>
                  <textarea name="jobdesc" value={item.jobdesc} onChange={(e) => handleDivisionChange(index, e)} className="border p-2 rounded-md h-20" placeholder="Opsional" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Nama PIC</label>
                  <input type="text" name="picName" value={item.picName} onChange={(e) => handleDivisionChange(index, e)} className="border p-2 rounded-md" placeholder="Opsional" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Kontak PIC</label>
                  <input type="text" name="picContact" value={item.picContact} onChange={(e) => handleDivisionChange(index, e)} className="border p-2 rounded-md" placeholder="Contoh: Line/WA" />
                </div>
              </div>
            </div>
            {divisions.length > 1 && (
              <Button variant="destructive" size="icon" type="button" onClick={() => removeDivision(index)} className="mt-7">
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
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

      {/* FAQ */}
      <div className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold text-m4">FAQ</label>
          <Button variant="secondary" size="sm" type="button" onClick={addFaq}>
            <Plus className="size-4 mr-1" /> Tambah FAQ
          </Button>
        </div>
        
        {faqs.map((item, index) => (
          <div key={index} className="flex gap-4 items-start p-3 bg-neutral-50 rounded-md border border-neutral-100">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm">Pertanyaan</label>
                <input type="text" name="question" value={item.question} onChange={(e) => handleFaqChange(index, e)} className="border p-2 rounded-md" placeholder="Contoh: Apakah event ini berbayar?" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Jawaban</label>
                <textarea name="answer" value={item.answer} onChange={(e) => handleFaqChange(index, e)} className="border p-2 rounded-md h-20" placeholder="Contoh: Tidak, event ini 100% gratis." required />
              </div>
            </div>
            {faqs.length > 1 && (
              <Button variant="destructive" size="icon" type="button" onClick={() => removeFaq(index)} className="mt-7">
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* TESTIMONIAL */}
      <div className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold text-m4">Testimoni</label>
          <Button variant="secondary" size="sm" type="button" onClick={addTestimonial}>
            <Plus className="size-4 mr-1" /> Tambah Testimoni
          </Button>
        </div>
        
        {testimonials.map((item, index) => (
          <div key={index} className="flex gap-4 items-start p-3 bg-neutral-50 rounded-md border border-neutral-100">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Nama</label>
                  <input type="text" name="name" value={item.name} onChange={(e) => handleTestimonialChange(index, e)} className="border p-2 rounded-md" placeholder="Contoh: Budi" required />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">Peran/Posisi</label>
                  <input type="text" name="role" value={item.role} onChange={(e) => handleTestimonialChange(index, e)} className="border p-2 rounded-md" placeholder="Contoh: Peserta 2024" required />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm">URL Foto</label>
                  <input type="url" name="photoUrl" value={item.photoUrl} onChange={(e) => handleTestimonialChange(index, e)} className="border p-2 rounded-md" placeholder="https://example.com/photo.jpg" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm">Pesan Testimoni</label>
                <textarea name="message" value={item.message} onChange={(e) => handleTestimonialChange(index, e)} className="border p-2 rounded-md h-20" placeholder="Pesan singkat..." required />
              </div>
            </div>
            {testimonials.length > 1 && (
              <Button variant="destructive" size="icon" type="button" onClick={() => removeTestimonial(index)} className="mt-7">
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* DOKUMENTASI */}
      <div className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold text-m4">Dokumentasi</label>
          <Button variant="secondary" size="sm" type="button" onClick={addDocumentation}>
            <Plus className="size-4 mr-1" /> Tambah Dokumentasi
          </Button>
        </div>
        
        {documentations.map((item, index) => (
          <div key={index} className="flex gap-4 items-start p-3 bg-neutral-50 rounded-md border border-neutral-100">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-4">
                <div className="flex-[2] flex flex-col gap-1">
                  <label className="text-sm">Judul Foto/Kegiatan</label>
                  <input type="text" name="title" value={item.title} onChange={(e) => handleDocumentationChange(index, e)} className="border p-2 rounded-md" placeholder="Contoh: Pembukaan Acara" required />
                </div>
                <div className="flex-[3] flex flex-col gap-1">
                  <label className="text-sm">URL Gambar</label>
                  <input type="url" name="imageUrl" value={item.imageUrl} onChange={(e) => handleDocumentationChange(index, e)} className="border p-2 rounded-md" placeholder="https://example.com/foto.jpg" required />
                </div>
              </div>
            </div>
            {documentations.length > 1 && (
              <Button variant="destructive" size="icon" type="button" onClick={() => removeDocumentation(index)} className="mt-7">
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
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

      <div className="mt-4 flex justify-end gap-2 border-t pt-4 border-neutral-200">
        <Button variant="primary" type="submit" disabled={loading} className="w-48 text-lg font-bold py-6">
          {loading ? "Menyimpan..." : "Simpan Event"}
        </Button>
      </div>
    </form>
  );
}
