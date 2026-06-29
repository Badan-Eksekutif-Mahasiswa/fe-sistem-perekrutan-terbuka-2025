"use client";

import React, { useEffect, useRef, useState } from "react";
import { Event } from "@/types/event";
import {
  EventDocumentationItem,
  EventFaqItem,
  EventFormDivision,
  EventPayload,
  EventTestimonialItem,
  EventTimelineItem,
} from "@/lib/api/event";
import { Button } from "@/components/ui/button";
import { Info, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import FileUpload from "@/components/elements/FileUpload";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

function DeleteConfirmModal({ onConfirm, itemName }: { onConfirm: () => void, itemName: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" type="button" className="w-full">
          <Trash2 className="size-4 mr-2" /> Hapus {itemName}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus {itemName} ini? Data yang dihapus tidak dapat dikembalikan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">Batal</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" type="button" onClick={onConfirm}>Hapus</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type EventFormProps = {
  initialData?: Partial<Event>;
  onSubmit: (data: EventPayload, divisionsData?: EventFormDivision[], deletedDivisionIds?: string[]) => Promise<void>;
  loading?: boolean;
};

type SocialMediaLinks = {
  instagram: string;
  tiktok: string;
  twitter: string;
  website: string;
  line: string;
};

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function toStringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getStringField(value: unknown, key: string): string {
  return toStringValue(toRecord(value)[key]);
}

type FieldErrors = Record<string, string>;
const WHATSAPP_PATTERN = /^\+?[0-9][0-9\s-]{7,20}$/;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const genKey = () => Math.random().toString(36).slice(2, 10);
type WithKey<T> = T & { _key: string };

function getWhatsappError(value: unknown) {
  const text = String(value || "").trim();
  if (!text) return "";

  const digitsOnly = text.replace(/\D/g, "");
  if (!WHATSAPP_PATTERN.test(text) || digitsOnly.length < 8 || digitsOnly.length > 15) {
    return "Nomor WhatsApp hanya boleh berisi angka, spasi, strip, dan opsional tanda + di awal.";
  }

  return "";
}

function getInputClass(hasError: boolean) {
  return [
    "border bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400",
    hasError ? "border-red-300 ring-2 ring-red-200" : "border-[#8F344A]",
  ].join(" ");
}

function getInputClassRight(hasError: boolean) {
  return [
    "border bg-white p-2 rounded-r-md text-neutral-900 placeholder:text-neutral-400 flex-1 font-mono text-sm",
    hasError ? "border-red-300 ring-2 ring-red-200" : "border-[#8F344A]",
  ].join(" ");
}

export default function EventForm({ initialData, onSubmit, loading }: EventFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<EventPayload>({
    id: initialData?.id || "",
    title: initialData?.title || "",
    eventCode: initialData?.eventCode || "",
    description: initialData?.description || "",
    generalTaskUrl: initialData?.generalTaskUrl || "",
    status: initialData?.status || "DRAFT",
    typeOfEvent: initialData?.typeOfEvent || "ORGANISASI",
    eventLevel: initialData?.eventLevel || "Universitas",
    maxDivisionChoices: initialData?.maxDivisionChoices || 1,
    registrationOpen: initialData?.registrationOpen ? new Date(initialData.registrationOpen).toISOString().slice(0, 16) : "",
    registrationClose: initialData?.registrationClose ? new Date(initialData.registrationClose).toISOString().slice(0, 16) : "",
    logo: initialData?.logo || "",
    organizer: initialData?.organizer || "",
    contactLineId: initialData?.contactLineId || "",
    contactName: initialData?.contactName || "",
    contactWhatsapp: initialData?.contactWhatsapp || "",
    contactEmail: initialData?.contactEmail || "",
  });

  const socialMediaData = toRecord(initialData?.socialMedia);
  const [socialMedia, setSocialMedia] = useState<SocialMediaLinks>({
    instagram: toStringValue(socialMediaData.instagram),
    tiktok: toStringValue(socialMediaData.tiktok),
    twitter: toStringValue(socialMediaData.twitter),
    website: toStringValue(socialMediaData.website),
    line: toStringValue(socialMediaData.line),
  });

  const [timeline, setTimeline] = useState<WithKey<EventTimelineItem>[]>(
    Array.isArray(initialData?.timeline) && initialData.timeline.length > 0
      ? initialData.timeline.map((item: unknown) => ({
          startDate: getStringField(item, "startDate"),
          endDate: getStringField(item, "endDate"),
          title: getStringField(item, "title"),
          description: getStringField(item, "description"),
          _key: genKey(),
        }))
      : [{ startDate: "", endDate: "", title: "", description: "", _key: genKey() }]
  );

  const [faqs, setFaqs] = useState<WithKey<EventFaqItem>[]>(
    Array.isArray(initialData?.faqs) && initialData.faqs.length > 0
      ? initialData.faqs.map((item: unknown) => ({
          question: getStringField(item, "question"),
          answer: getStringField(item, "answer"),
          _key: genKey(),
        }))
      : [{ question: "", answer: "", _key: genKey() }]
  );

  const [testimonials, setTestimonials] = useState<WithKey<EventTestimonialItem>[]>(
    Array.isArray(initialData?.testimonials) && initialData.testimonials.length > 0
      ? initialData.testimonials.map((item: unknown) => ({
          name: getStringField(item, "name"),
          role: getStringField(item, "role"),
          message: getStringField(item, "message"),
          photoUrl: getStringField(item, "photoUrl"),
          _key: genKey(),
        }))
      : [{ name: "", role: "", message: "", photoUrl: "", _key: genKey() }]
  );

  const [documentations, setDocumentations] = useState<WithKey<EventDocumentationItem>[]>(
    Array.isArray(initialData?.documentations) && initialData.documentations.length > 0
      ? initialData.documentations.map((item: unknown) => ({
          title: getStringField(item, "title"),
          imageUrl: getStringField(item, "imageUrl"),
          _key: genKey(),
        }))
      : [{ title: "", imageUrl: "", _key: genKey() }]
  );

  // Divisions State
  const blankDivision: EventFormDivision = {
    id: "",
    name: "",
    coverUrl: "",
    maxQuota: "",
    description: "",
    jobdesc: "",
    picName: "",
    picContact: "",
    taskUrl: "",
    isActive: true,
  };

  const [divisions, setDivisions] = useState<WithKey<EventFormDivision>[]>(
    Array.isArray(initialData?.divisions) && initialData.divisions.length > 0
      ? initialData.divisions.map((division) => {
          const pic = toRecord(division.PIC);

          return {
            id: division.id || "",
            name: division.name || "",
            coverUrl: division.cover || "",
            maxQuota: division.maxQuota || "",
            description: division.description || "",
            jobdesc: division.jobdesc || "",
            picName: toStringValue(pic.name),
            picContact: toStringValue(pic.contact),
            taskUrl: division.taskUrl || "",
            isActive: division.isActive !== undefined ? division.isActive : true,
            _key: division.id || genKey(),
          };
        })
      : [{ ...blankDivision, _key: genKey() }]
  );

  const [deletedDivisions, setDeletedDivisions] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const setSectionRef = (name: string) => (node: HTMLElement | null) => {
    sectionRefs.current[name] = node;
  };

  const FieldError = ({ name }: { name: string }) => (
    fieldErrors[name] ? <p className="text-sm font-medium text-red-100">{fieldErrors[name]}</p> : null
  );

  const RequiredMark = () => <span className="text-red-400 ml-0.5">*</span>;

  const isDirty = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const clearFieldError = (...names: string[]) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      names.forEach((name) => delete next[name]);
      return next;
    });
  };

  const focusFirstError = (errors: FieldErrors) => {
    const firstKey = Object.keys(errors)[0];
    if (!firstKey) return;

    window.requestAnimationFrame(() => {
      const target =
        sectionRefs.current[firstKey] ||
        document.querySelector<HTMLElement>(`[name="${firstKey}"]`);

      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus?.({ preventScroll: true });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    isDirty.current = true;
    if (name === "registrationOpen" || name === "registrationClose") {
      clearFieldError("registrationOpen", "registrationClose");
    } else {
      clearFieldError(name);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "eventCode" || name === "id" 
        ? value.toLowerCase().replace(/\s+/g, '-') 
        : name === "maxDivisionChoices" 
          ? Number(value) 
          : value,
    }));
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanValue = name !== 'website' && value.startsWith('@') ? value.substring(1) : value;
    setSocialMedia((prev) => ({ ...prev, [name]: cleanValue }));
  };

  const handleTimelineChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    isDirty.current = true;
    clearFieldError("timeline");
    const newTimeline = [...timeline];
    newTimeline[index] = { ...newTimeline[index], [name]: value };
    setTimeline(newTimeline);
  };
  const addTimeline = () => setTimeline([...timeline, { startDate: "", endDate: "", title: "", description: "", _key: genKey() }]);
  const removeTimeline = (index: number) => setTimeline(timeline.filter((_, i) => i !== index));

  const handleFaqChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    isDirty.current = true;
    clearFieldError("faqs");
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [name]: value };
    setFaqs(newFaqs);
  };
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "", _key: genKey() }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const handleTestimonialChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [name]: value };
    setTestimonials(newTestimonials);
  };
  const addTestimonial = () => setTestimonials([...testimonials, { name: "", role: "", message: "", photoUrl: "", _key: genKey() }]);
  const removeTestimonial = (index: number) => setTestimonials(testimonials.filter((_, i) => i !== index));

  const handleDocumentationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newDocs = [...documentations];
    newDocs[index] = { ...newDocs[index], [name]: value };
    setDocumentations(newDocs);
  };
  const addDocumentation = () => setDocumentations([...documentations, { title: "", imageUrl: "", _key: genKey() }]);
  const removeDocumentation = (index: number) => setDocumentations(documentations.filter((_, i) => i !== index));


  const handleDivisionChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    isDirty.current = true;
    clearFieldError("divisions");
    const newDivisions = [...divisions];
    newDivisions[index] = { 
      ...newDivisions[index], 
      [name]: name === "isActive" ? value === "true" : name === "maxQuota" ? (value === "" ? "" : Number(value)) : value 
    };
    setDivisions(newDivisions);
  };

  const addDivision = () => {
    setDivisions([...divisions, { ...blankDivision, _key: genKey() }]);
  };

  const removeDivision = (index: number) => {
    const divToRemove = divisions[index];
    if (divToRemove.id) {
      setDeletedDivisions([...deletedDivisions, divToRemove.id]);
    }
    const newDivisions = divisions.filter((_, i) => i !== index);
    setDivisions(newDivisions);
  };

  const getValidationErrors = () => {
    const errors: FieldErrors = {};
    const isDraft = formData.status === "DRAFT";

    if (!isDraft) {
      const requiredFields: Array<[keyof EventPayload, string]> = [
        ["title", "Nama acara wajib diisi sebelum event dipublish."],
        ["eventCode", "URL event wajib diisi sebelum event dipublish."],
        ["description", "Deskripsi acara wajib diisi sebelum event dipublish."],
        ["organizer", "Penyelenggara wajib diisi sebelum event dipublish."],
        ["contactLineId", "ID Line kontak wajib diisi sebelum event dipublish."],
        ["registrationOpen", "Waktu buka pendaftaran wajib diisi sebelum event dipublish."],
        ["registrationClose", "Waktu tutup pendaftaran wajib diisi sebelum event dipublish."],
      ];

      requiredFields.forEach(([field, message]) => {
        if (!String(formData[field] || "").trim()) errors[String(field)] = message;
      });
    }

    if (formData.eventCode && !/^[a-z0-9-]+$/.test(String(formData.eventCode))) {
      errors.eventCode = "URL event hanya boleh berisi huruf kecil, angka, dan strip (-).";
    }

    if (Number(formData.maxDivisionChoices || 0) < 1) {
      errors.maxDivisionChoices = "Maks pilih divisi minimal 1.";
    }

    const activeDivisionCount = divisions.filter(d => d.isActive && d.name.trim() !== "").length;
    if (!isDraft && activeDivisionCount > 0 && Number(formData.maxDivisionChoices) > activeDivisionCount) {
      errors.maxDivisionChoices = `Maks pilih divisi (${formData.maxDivisionChoices}) tidak boleh melebihi jumlah divisi aktif (${activeDivisionCount}).`;
    }

    const whatsappError = getWhatsappError(formData.contactWhatsapp);
    if (whatsappError) errors.contactWhatsapp = whatsappError;

    if (formData.registrationOpen && formData.registrationClose) {
      if (new Date(formData.registrationClose as string) <= new Date(formData.registrationOpen as string)) {
        errors.registrationClose = "Waktu tutup pendaftaran harus setelah waktu buka pendaftaran.";
      }
    }

    faqs.forEach((item, index) => {
      const question = item.question.trim();
      const answer = item.answer.trim();

      if (question && !answer) {
        errors.faqs = `Jawaban FAQ nomor ${index + 1} wajib diisi jika pertanyaannya diisi.`;
      }

      if (answer && !question) {
        errors.faqs = `Pertanyaan FAQ nomor ${index + 1} wajib diisi jika jawabannya diisi.`;
      }
    });

    if (!isDraft) {
      const activeDivisions = divisions.filter((division) => division.isActive && division.name.trim() !== "");
      if (activeDivisions.length < 1) {
        errors.divisions = "Event harus memiliki minimal satu divisi aktif sebelum publish.";
      }

      const filledTimeline = timeline.filter((item) => item.title.trim() !== "" && item.startDate.trim() !== "");
      if (filledTimeline.length < 1) {
        errors.timeline = "Event aktif harus memiliki minimal satu timeline dengan tanggal dan judul.";
      }
    }

    return errors;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const validationErrors = getValidationErrors();
    const firstError = Object.values(validationErrors)[0];
    if (firstError) {
      setFieldErrors(validationErrors);
      toast.error(firstError);
      focusFirstError(validationErrors);
      return;
    }

    // Convert local datetime to ISO string
    const submitData: EventPayload = { ...formData };
    submitData.ownerId = submitData.ownerId || user?.id;
    
    // Inject placeholders if status is DRAFT to satisfy backend constraints
    if (submitData.status === "DRAFT") {
      if (!submitData.title) submitData.title = "Draft Event";
      if (!submitData.eventCode) submitData.eventCode = "draft-" + Date.now();
      if (!submitData.description) submitData.description = "-";
      if (!submitData.maxDivisionChoices) submitData.maxDivisionChoices = 1;
      if (!submitData.organizer) submitData.organizer = "Draft Organizer";
      if (!submitData.contactLineId) submitData.contactLineId = "draftline";
      
      const draftOpen = submitData.registrationOpen
        ? new Date(submitData.registrationOpen)
        : submitData.registrationClose
          ? new Date(new Date(submitData.registrationClose).getTime() - ONE_DAY_MS)
          : new Date();
      const draftClose = submitData.registrationClose
        ? new Date(submitData.registrationClose)
        : new Date(draftOpen.getTime() + ONE_DAY_MS);

      submitData.registrationOpen = draftOpen.toISOString();
      submitData.registrationClose = draftClose.toISOString();
    } else {
      if (submitData.registrationOpen) submitData.registrationOpen = new Date(submitData.registrationOpen).toISOString();
      if (submitData.registrationClose) submitData.registrationClose = new Date(submitData.registrationClose).toISOString();
    }
    
    // Clean up empty social media fields
    const cleanedSocialMedia: Record<string, string> = {};
    Object.entries(socialMedia).forEach(([key, val]) => {
      let cleanVal = val.trim();
      if (cleanVal !== "") {
        if (key === "website" && !cleanVal.startsWith("http://") && !cleanVal.startsWith("https://")) {
          cleanVal = "https://" + cleanVal;
        }
        cleanedSocialMedia[key] = cleanVal;
      }
    });

    submitData.socialMedia = cleanedSocialMedia;
    submitData.timeline = timeline
      .filter(t => t.title.trim() !== "" || t.startDate.trim() !== "")
      .map(({ _key, ...rest }) => rest)
      .sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();

        if (Number.isNaN(dateA)) return 1;
        if (Number.isNaN(dateB)) return -1;
        return dateA - dateB;
      });
    submitData.faqs = faqs.filter(f => f.question.trim() !== "" || f.answer.trim() !== "").map(({ _key, ...rest }) => rest);
    submitData.testimonials = testimonials.filter(t => t.name.trim() !== "").map(({ _key, ...rest }) => rest);
    submitData.documentations = documentations.filter(d => d.title.trim() !== "" || d.imageUrl.trim() !== "").map(({ _key, ...rest }) => rest);

    // Prepare divisions payload
    const finalDivisions: EventFormDivision[] = divisions.filter(d => d.name.trim() !== "").map(d => ({
      id: d.id,
      name: d.name,
      coverUrl: d.coverUrl,
      maxQuota: d.maxQuota === "" ? "" : Number(d.maxQuota),
      isActive: d.isActive,
      description: d.description,
      jobdesc: d.jobdesc,
      taskUrl: d.taskUrl,
      picName: d.picName,
      picContact: d.picContact
    }));

    onSubmit(submitData, finalDivisions, deletedDivisions);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 rounded-xl border border-primary-300 backdrop-blur-md text-white"
      style={{ backgroundImage: 'var(--gradient-card-blue)', boxShadow: 'var(--shadow-glass)' }}
    >
      <div className="mb-2">
        <h1 className="text-3xl font-bold">{initialData?.id ? "Edit Event" : "Buat Event"}</h1>
        <p className="text-lg">Isilah Data Acara Berikut</p>
      </div>

      {formData.status === "DRAFT" && (
        <div className="flex items-start gap-3 rounded-md border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white/75">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>Draft boleh disimpan dengan data minimum. Saat status diubah ke ACTIVE, CLOSED, atau ARCHIVED, field wajib dan minimal satu divisi aktif akan divalidasi.</span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">Nama Acara<RequiredMark /></label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={getInputClass(!!fieldErrors.title)}
          placeholder="Contoh: Open Recruitment BEM UI 2026"
          required={formData.status !== "DRAFT"}
        />
        <FieldError name="title" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">URL Event (Slug)<RequiredMark /></label>
        <div className="flex items-center">
          <span className="bg-[#8F344A]/20 border border-[#8F344A] border-r-0 text-white/80 p-2 rounded-l-md font-mono text-sm">/events/</span>
          <input
            type="text"
            name="eventCode"
            value={formData.eventCode || ""}
            onChange={handleChange}
            className={getInputClassRight(!!fieldErrors.eventCode)}
            placeholder="open-recruitment"
            required={formData.status !== "DRAFT"}
          />
        </div>
        <FieldError name="eventCode" />
        <p className="text-xs text-white/70 mt-1">*Hanya boleh menggunakan huruf kecil, angka, dan strip (-). Jika diubah, link event lama akan mati.</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">Deskripsi Acara<RequiredMark /></label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${getInputClass(!!fieldErrors.description)} h-32`}
          placeholder="Jelaskan secara singkat mengenai event ini..."
          required={formData.status !== "DRAFT"}
        />
        <FieldError name="description" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">Link Tugas Umum</label>
        <input
          type="url"
          name="generalTaskUrl"
          value={formData.generalTaskUrl || ""}
          onChange={handleChange}
          className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400"
          placeholder="https://docs.google.com/..."
        />
        <p className="text-xs text-white/60 mt-1">Pastikan URL diawali dengan <span className="font-mono">https://</span></p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-bold text-m4">Penyelenggara (Organizer)<RequiredMark /></label>
        <input
          type="text"
          name="organizer"
          value={formData.organizer || ""}
          onChange={handleChange}
          className={getInputClass(!!fieldErrors.organizer)}
          placeholder="Contoh: BEM UI 2026"
          required={formData.status !== "DRAFT"}
        />
        <FieldError name="organizer" />
      </div>

      <div className="flex gap-4 mt-2">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Nama Kontak Utama</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName || ""}
            onChange={handleChange}
            className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400"
            placeholder="Contoh: Budi"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">ID Line Kontak<RequiredMark /></label>
          <input
            type="text"
            name="contactLineId"
            value={formData.contactLineId || ""}
            onChange={handleChange}
            className={getInputClass(!!fieldErrors.contactLineId)}
            placeholder="Contoh: budi_line"
            required={formData.status !== "DRAFT"}
          />
          <FieldError name="contactLineId" />
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Email Kontak</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail || ""}
            onChange={handleChange}
            className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400"
            placeholder="Contoh: info@bem.ui.ac.id"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">WhatsApp Kontak</label>
          <input
            type="text"
            name="contactWhatsapp"
            value={formData.contactWhatsapp || ""}
            onChange={handleChange}
            className={getInputClass(!!fieldErrors.contactWhatsapp)}
            placeholder="Contoh: 08123456789"
          />
          <FieldError name="contactWhatsapp" />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-m4">Status</label>
          <select name="status" value={formData.status || "DRAFT"} onChange={handleChange} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400">
            <option value="DRAFT">DRAFT</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-m4">Tipe Event</label>
          <select name="typeOfEvent" value={formData.typeOfEvent || "ORGANISASI"} onChange={handleChange} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400">
            <option value="ORGANISASI">Organisasi</option>
            <option value="KEPANITIAAN">Kepanitiaan</option>
            <option value="UKM">UKM</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-m4">Level Event</label>
          <select 
            name="eventLevel" 
            value={formData.eventLevel || "Universitas"} 
            onChange={handleChange} 
            className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400"
          >
            <option value="Universitas">Universitas</option>
            <option value="Fakultas">Fakultas</option>
            <option value="ProgramStudi">Jurusan</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-m4">Maks Pilih Divisi</label>
          <input
            type="number"
            name="maxDivisionChoices"
            value={formData.maxDivisionChoices}
            onChange={handleChange}
            className={getInputClass(!!fieldErrors.maxDivisionChoices)}
            min={1}
            required={formData.status !== "DRAFT"}
          />
          <FieldError name="maxDivisionChoices" />
        </div>
      </div>

      <div
        ref={setSectionRef("registrationClose")}
        tabIndex={-1}
        className="flex gap-4 mt-2"
      >
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Waktu Buka Pendaftaran<RequiredMark /></label>
          <input
            type="datetime-local"
            name="registrationOpen"
            value={formData.registrationOpen as string}
            onChange={handleChange}
            className={getInputClass(!!fieldErrors.registrationOpen)}
            required={formData.status !== "DRAFT"}
          />
          <FieldError name="registrationOpen" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="font-bold text-m4">Waktu Tutup Pendaftaran<RequiredMark /></label>
          <input
            type="datetime-local"
            name="registrationClose"
            value={formData.registrationClose as string}
            onChange={handleChange}
            className={getInputClass(!!fieldErrors.registrationClose)}
            required={formData.status !== "DRAFT"}
          />
          <FieldError name="registrationClose" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <FileUpload
          label="Logo Event"
          value={formData.logo || ""}
          onChange={(url) => setFormData(prev => ({ ...prev, logo: url }))}
          placeholder="Upload Logo Event"
        />
      </div>

      {/* DIVISI */}
      <div ref={setSectionRef("divisions")} tabIndex={-1} className="flex flex-col gap-4 mt-4">
        <label className="text-2xl font-bold">Divisi</label>
        <FieldError name="divisions" />
        
        {divisions.map((item, index) => (
          <div key={item._key} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <FileUpload
                label="Upload Foto Cover Divisi"
                value={item.coverUrl}
                onChange={(url) => {
                  const newDivisions = [...divisions];
                  newDivisions[index] = { ...newDivisions[index], coverUrl: url };
                  setDivisions(newDivisions);
                }}
                placeholder="Upload Cover Divisi"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Nama/Judul Divisi<RequiredMark /></label>
              <input type="text" name="name" value={item.name} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Humas" required={formData.status !== "DRAFT"} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Kuota Maksimal</label>
              <input type="number" name="maxQuota" value={item.maxQuota} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Opsional" min={1} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Status</label>
              <select name="isActive" value={item.isActive?.toString()} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400">
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Deskripsi Divisi</label>
              <textarea name="description" value={item.description} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md h-20 text-neutral-900 placeholder:text-neutral-400" placeholder="Opsional" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Jobdesk Divisi</label>
              <textarea name="jobdesc" value={item.jobdesc} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md h-20 text-neutral-900 placeholder:text-neutral-400" placeholder="Opsional" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Nama PIC</label>
              <input type="text" name="picName" value={item.picName} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Opsional" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Kontak PIC</label>
              <input type="text" name="picContact" value={item.picContact} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Line/WA" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Link Tugas Khusus Divisi</label>
              <input type="url" name="taskUrl" value={item.taskUrl} onChange={(e) => handleDivisionChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="https://docs.google.com/..." />
              <p className="text-xs text-white/60 mt-1">Pastikan URL diawali dengan <span className="font-mono">https://</span></p>
            </div>
            {divisions.length > 1 && (
              <DeleteConfirmModal onConfirm={() => removeDivision(index)} itemName="Divisi" />
            )}
            <hr className="border-[#8F344A] my-2" />
          </div>
        ))}
        <Button variant="secondary" type="button" onClick={addDivision} className="w-full bg-gradient-to-r from-[#B83A5A] to-[#FFD8DF] text-white border border-[#8F344A] font-semibold shadow-md hover:from-[#8F1A35] hover:to-[#F0A8B8] active:from-[#6B0D26] active:to-[#E08098] transition-all duration-200">
          <Plus className="size-5 mr-2" /> Tambah Divisi
        </Button>
      </div>

      {/* SOSIAL MEDIA */}
      <div className="flex flex-col gap-4 mt-6">
        <label className="text-2xl font-bold">Sosial Media</label>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Instagram</label>
            <input type="text" name="instagram" value={socialMedia.instagram} onChange={handleSocialMediaChange} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="bemui_official" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Tiktok</label>
            <input type="text" name="tiktok" value={socialMedia.tiktok} onChange={handleSocialMediaChange} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="bemui_official" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Twitter</label>
            <input type="text" name="twitter" value={socialMedia.twitter} onChange={handleSocialMediaChange} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="BEMUI_Official" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Line</label>
            <input type="text" name="line" value={socialMedia.line} onChange={handleSocialMediaChange} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="bemui" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Website</label>
            <input type="text" name="website" value={socialMedia.website} onChange={handleSocialMediaChange} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="bemui.id" />
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div ref={setSectionRef("timeline")} tabIndex={-1} className="flex flex-col gap-4 mt-6">
        <label className="text-2xl font-bold">Timeline</label>
        <FieldError name="timeline" />
        
        {timeline.map((item, index) => (
          <div key={item._key} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm">Tanggal Mulai<RequiredMark /></label>
              <input type="date" name="startDate" value={item.startDate} onChange={(e) => handleTimelineChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" required={formData.status !== "DRAFT"} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Judul Timeline<RequiredMark /></label>
              <input type="text" name="title" value={item.title} onChange={(e) => handleTimelineChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Pembukaan Pendaftaran" required={formData.status !== "DRAFT"} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Deskripsi Timeline</label>
              <textarea name="description" value={item.description} onChange={(e) => handleTimelineChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md h-20 text-neutral-900 placeholder:text-neutral-400" placeholder="Opsional" />
            </div>
            {timeline.length > 1 && (
              <DeleteConfirmModal onConfirm={() => removeTimeline(index)} itemName="Timeline" />
            )}
            <hr className="border-[#8F344A] my-2" />
          </div>
        ))}
        <Button variant="secondary" type="button" onClick={addTimeline} className="w-full bg-gradient-to-r from-[#B83A5A] to-[#FFD8DF] text-white border border-[#8F344A] font-semibold shadow-md hover:from-[#8F1A35] hover:to-[#F0A8B8] active:from-[#6B0D26] active:to-[#E08098] transition-all duration-200">
          <Plus className="size-5 mr-2" /> Tambah Timeline
        </Button>
      </div>

      {/* FAQ */}
      <div ref={setSectionRef("faqs")} tabIndex={-1} className="flex flex-col gap-4 mt-6">
        <label className="text-2xl font-bold">FAQ</label>
        <FieldError name="faqs" />
        
        {faqs.map((item, index) => (
          <div key={item._key} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm">Pertanyaan</label>
              <input type="text" name="question" value={item.question} onChange={(e) => handleFaqChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Apakah event ini berbayar?" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Jawaban</label>
              <textarea name="answer" value={item.answer} onChange={(e) => handleFaqChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md h-20 text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Tidak, event ini 100% gratis." />
            </div>
            {faqs.length > 1 && (
              <DeleteConfirmModal onConfirm={() => removeFaq(index)} itemName="FAQ" />
            )}
            <hr className="border-[#8F344A] my-2" />
          </div>
        ))}
        <Button variant="secondary" type="button" onClick={addFaq} className="w-full bg-gradient-to-r from-[#B83A5A] to-[#FFD8DF] text-white border border-[#8F344A] font-semibold shadow-md hover:from-[#8F1A35] hover:to-[#F0A8B8] active:from-[#6B0D26] active:to-[#E08098] transition-all duration-200">
          <Plus className="size-5 mr-2" /> Tambah FAQ
        </Button>
      </div>

      {/* TESTIMONIAL */}
      <div className="flex flex-col gap-4 mt-6">
        <label className="text-2xl font-bold">Testimoni</label>
        
        {testimonials.map((item, index) => (
          <div key={item._key} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <FileUpload
                label="Upload Foto Responden"
                value={item.photoUrl}
                onChange={(url) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[index] = { ...newTestimonials[index], photoUrl: url };
                  setTestimonials(newTestimonials);
                }}
                placeholder="Upload Foto Responden"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Nama Responden</label>
              <input type="text" name="name" value={item.name} onChange={(e) => handleTestimonialChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Budi" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Peran/Posisi</label>
              <input type="text" name="role" value={item.role} onChange={(e) => handleTestimonialChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Peserta 2024" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Pesan Testimoni</label>
              <textarea name="message" value={item.message} onChange={(e) => handleTestimonialChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md h-20 text-neutral-900 placeholder:text-neutral-400" placeholder="Pesan singkat..." />
            </div>
            {testimonials.length > 1 && (
              <DeleteConfirmModal onConfirm={() => removeTestimonial(index)} itemName="Testimoni" />
            )}
            <hr className="border-[#8F344A] my-2" />
          </div>
        ))}
        <Button variant="secondary" type="button" onClick={addTestimonial} className="w-full bg-gradient-to-r from-[#B83A5A] to-[#FFD8DF] text-white border border-[#8F344A] font-semibold shadow-md hover:from-[#8F1A35] hover:to-[#F0A8B8] active:from-[#6B0D26] active:to-[#E08098] transition-all duration-200">
          <Plus className="size-5 mr-2" /> Tambah Testimoni
        </Button>
      </div>

      {/* DOKUMENTASI */}
      <div className="flex flex-col gap-4 mt-6">
        <label className="text-2xl font-bold">Dokumentasi</label>
        
        {documentations.map((item, index) => (
          <div key={item._key} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <FileUpload
                label="Upload Foto Dokumentasi"
                value={item.imageUrl}
                onChange={(url) => {
                  const newDocs = [...documentations];
                  newDocs[index] = { ...newDocs[index], imageUrl: url };
                  setDocumentations(newDocs);
                }}
                placeholder="Upload Foto Dokumentasi"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Judul Foto/Kegiatan</label>
              <input type="text" name="title" value={item.title} onChange={(e) => handleDocumentationChange(index, e)} className="border border-[#8F344A] bg-white p-2 rounded-md text-neutral-900 placeholder:text-neutral-400" placeholder="Contoh: Pembukaan Acara" />
            </div>
            {documentations.length > 1 && (
              <DeleteConfirmModal onConfirm={() => removeDocumentation(index)} itemName="Dokumentasi" />
            )}
            <hr className="border-[#8F344A] my-2" />
          </div>
        ))}
        <Button variant="secondary" type="button" onClick={addDocumentation} className="w-full bg-gradient-to-r from-[#B83A5A] to-[#FFD8DF] text-white border border-[#8F344A] font-semibold shadow-md hover:from-[#8F1A35] hover:to-[#F0A8B8] active:from-[#6B0D26] active:to-[#E08098] transition-all duration-200">
          <Plus className="size-5 mr-2" /> Tambah Dokumentasi
        </Button>
      </div>



      <div className="mt-8 flex justify-end gap-2 border-t pt-8 border-[#8F344A]">
        <Button variant="secondary" type="submit" disabled={loading} className="w-full text-lg font-bold py-3 bg-gradient-to-r from-[#B83A5A] to-[#FFD8DF] text-white shadow-md border-none hover:from-[#8F1A35] hover:to-[#F0A8B8] active:from-[#6B0D26] active:to-[#E08098] transition-all duration-200">
          {loading ? "Menyimpan..." : "Simpan Event"}
        </Button>
      </div>
    </form>
  );
}
