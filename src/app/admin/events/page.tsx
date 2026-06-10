"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/api/event";
import { Event } from "@/types/event";
import Link from "next/link";
import Loader from "@/components/elements/Loader";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-h2 font-bold font-jakarta">Daftar Event</h1>
        <Link href="/admin/events/create">
          <Button variant="primary">Tambah Event Baru</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-100 border-b border-neutral-200 text-m4 font-bold text-neutral-600">
              <th className="p-4">Nama Event</th>
              <th className="p-4">Tipe</th>
              <th className="p-4">Status</th>
              <th className="p-4">Pendaftaran</th>
              <th className="p-4">Jumlah Divisi</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-400">
                  Belum ada event terdaftar
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="p-4 font-bold">{event.title}</td>
                  <td className="p-4">{event.typeOfEvent}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        event.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : event.status === "CLOSED"
                          ? "bg-red-100 text-red-700"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4 text-p5 text-neutral-500">
                    {new Date(event.openRegistration).toLocaleDateString("id-ID")} -{" "}
                    {new Date(event.closeRegistration).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-4 text-center">{event.divisions?.length || 0}</td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
