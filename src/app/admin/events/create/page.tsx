"use client";

import React, { useState } from "react";
import EventForm from "../components/EventForm";
import {
  createEvent,
  updateEvent,
  createDivision,
  DivisionPayload,
  EventFormDivision,
  EventPayload,
} from "@/lib/api/event";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

  const handleSubmit = async (data: EventPayload, divisionsData?: EventFormDivision[]) => {
    try {
      setLoading(true);
      
      const requestedStatus = data.status || "DRAFT";
      const shouldFinalizeStatus = requestedStatus !== "DRAFT";
      const eventPayload = shouldFinalizeStatus
        ? { ...data, status: "DRAFT" as EventPayload["status"] }
        : data;

      const newEvent = await createEvent(eventPayload);
      
      if (divisionsData && divisionsData.length > 0 && newEvent.id) {
        for (const div of divisionsData) {
          await createDivision(toDivisionPayload(newEvent.id, div));
        }
      }

      if (shouldFinalizeStatus && newEvent.id) {
        await updateEvent(newEvent.id, { status: requestedStatus });
      }
      
      router.push("/admin/events");
    } catch (err: unknown) {
      const message = getErrorMessage(err, "Gagal membuat event");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 pb-20 pt-8 md:px-8">
      <div>
        <h1 className="text-h2 font-bold font-jakarta text-[#1D2642]">Buat Event Baru</h1>
      </div>

      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
