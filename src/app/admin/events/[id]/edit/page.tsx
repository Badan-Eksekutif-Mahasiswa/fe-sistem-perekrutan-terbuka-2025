"use client";

import React, { useEffect, useState, use } from "react";
import EventForm from "../../components/EventForm";
import { getEventById, updateEvent, deleteEvent, createDivision, updateDivision, deleteDivision } from "@/lib/api/event";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import Loader from "@/components/elements/Loader";

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await getEventById(id);
      setEvent(data);
    } catch (err: any) {
      setError(err.message || "Gagal memuat event");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<Event>, divisionsData?: any[], deletedDivisionIds?: string[]) => {
    try {
      setSaving(true);
      setError("");
      
      await updateEvent(id, data);
      
      if (deletedDivisionIds && deletedDivisionIds.length > 0) {
        for (const divId of deletedDivisionIds) {
          await deleteDivision(divId);
        }
      }

      if (divisionsData && divisionsData.length > 0) {
        for (const div of divisionsData) {
          const divPayload = {
            eventId: id,
            name: div.name,
            cover: div.coverUrl,
            maxQuota: div.maxQuota,
            isActive: div.isActive,
            description: div.description,
            jobdesc: div.jobdesc,
            taskUrl: div.taskUrl,
            PIC: div.PIC
          };
          if (div.id) {
            await updateDivision(div.id, divPayload);
          } else {
            await createDivision(divPayload);
          }
        }
      }
      
      router.push("/admin/events");
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan event");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Apakah kamu yakin ingin menghapus event ini? Semua data pendaftar dan divisi akan ikut terhapus!")) {
      try {
        setSaving(true);
        await deleteEvent(id);
        router.push("/admin/events");
      } catch (err: any) {
        setError(err.message || "Gagal menghapus event");
        setSaving(false);
      }
    }
  };

  if (loading) return <Loader />;
  if (!event) return <div className="p-8 text-center">Event tidak ditemukan.</div>;

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/events">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-h2 font-bold font-jakarta text-[#1D2642]">Edit Event</h1>
        </div>
        <Button variant="destructive" onClick={handleDelete} disabled={saving}>
          <Trash2 className="size-4 mr-2" /> Hapus Event
        </Button>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      <EventForm initialData={event} onSubmit={handleSubmit} loading={saving} />
    </div>
  );
}
