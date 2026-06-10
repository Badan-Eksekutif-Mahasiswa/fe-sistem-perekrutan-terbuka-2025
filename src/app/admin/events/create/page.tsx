"use client";

import React, { useState } from "react";
import EventForm from "../components/EventForm";
import { createEvent } from "@/lib/api/event";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: Partial<Event>) => {
    try {
      setLoading(true);
      setError("");
      await createEvent(data);
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
        <h1 className="text-h2 font-bold font-jakarta">Buat Event Baru</h1>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
