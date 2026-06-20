"use client";

import React, { useState } from "react";
import EventForm from "../components/EventForm";
import {
  createEvent,
  createDivision,
  DivisionPayload,
  EventFormDivision,
  EventPayload,
} from "@/lib/api/event";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: EventPayload, divisionsData?: EventFormDivision[]) => {
    try {
      setLoading(true);
      setError("");
      
      const newEvent = await createEvent(data);
      
      if (divisionsData && divisionsData.length > 0 && newEvent.id) {
        for (const div of divisionsData) {
          await createDivision(toDivisionPayload(newEvent.id, div));
        }
      }
      
      router.push("/admin/events");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal membuat event"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-5" />
          </Button>
        </Link>
        <h1 className="text-h2 font-bold font-jakarta text-[#1D2642]">Buat Event Baru</h1>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
