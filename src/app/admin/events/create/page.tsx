"use client";

import React, { useState } from "react";
import EventForm from "../components/EventForm";
import { createEvent, createDivision } from "@/lib/api/event";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: Partial<Event>, divisionsData?: any[], deletedDivisionIds?: string[]) => {
    try {
      setLoading(true);
      setError("");
      
      const newEvent = await createEvent(data);
      
      if (divisionsData && divisionsData.length > 0 && newEvent.id) {
        for (const div of divisionsData) {
          await createDivision({
            eventId: newEvent.id,
            name: div.name,
            cover: div.coverUrl,
            maxQuota: div.maxQuota,
            isActive: div.isActive,
            description: div.description,
            jobdesc: div.jobdesc,
            taskUrl: div.taskUrl,
            PIC: div.PIC
          });
        }
      }
      
      router.push("/admin/events");
    } catch (err: any) {
      setError(err.message || "Gagal membuat event");
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
