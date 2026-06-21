"use client";

import React, { useCallback, useEffect, useState, use } from "react";
import EventForm from "../../components/EventForm";
import {
  getAdminEventById,
  updateEvent,
  deleteEvent,
  createDivision,
  updateDivision,
  deleteDivision,
  DivisionPayload,
  EventFormDivision,
  EventPayload,
} from "@/lib/api/event";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Loader from "@/components/elements/Loader";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function toDivisionPayload(eventId: string, division: EventFormDivision): DivisionPayload {
  return {
    eventId,
    name: division.name,
    cover: division.coverUrl,
    maxQuota: division.maxQuota === "" ? null : division.maxQuota,
    isActive: division.isActive,
    description: division.description,
    jobdesc: division.jobdesc,
    taskUrl: division.taskUrl,
    PIC: {
      name: division.picName,
      contact: division.picContact,
    },
  };
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAdminEventById(id);
      setEvent(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal memuat event"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleSubmit = async (data: EventPayload, divisionsData?: EventFormDivision[], deletedDivisionIds?: string[]) => {
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
          const divPayload = toDivisionPayload(event?.id || id, div);
          if (div.id) {
            await updateDivision(div.id, divPayload);
          } else {
            await createDivision(divPayload);
          }
        }
      }
      
      router.push("/admin/events");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal menyimpan event"));
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
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Gagal menghapus event"));
        setSaving(false);
      }
    }
  };

  if (loading) return <Loader />;
  if (!event) return <div className="p-8 text-center">Event tidak ditemukan.</div>;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 pb-20 pt-8 md:px-8">
      <div className="flex items-center justify-between">
        <div>
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
