"use client";

import React, { useEffect, useState, use } from "react";
import EventForm from "../../components/EventForm";
import { getEventById, updateEvent, deleteEvent } from "@/lib/api/event";
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

  const handleSubmit = async (data: Partial<Event>) => {
    try {
      setSaving(true);
      setError("");
      await updateEvent(id, data);
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
          <h1 className="text-h2 font-bold font-jakarta">Edit Event</h1>
        </div>
        <Button variant="destructive" onClick={handleDelete} disabled={saving}>
          <Trash2 className="size-4 mr-2" /> Hapus Event
        </Button>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      <EventForm initialData={event} onSubmit={handleSubmit} loading={saving} />

      <div className="mt-8 border-t pt-8">
        <h2 className="text-h3 font-bold font-jakarta mb-4">Kelola Divisi</h2>
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-100 border-b border-neutral-200 text-m4 font-bold text-neutral-600">
                <th className="p-4">Nama Divisi</th>
                <th className="p-4">Kuota</th>
                <th className="p-4">Status</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {event.divisions && event.divisions.length > 0 ? (
                event.divisions.map((div) => (
                  <tr key={div.id} className="border-b border-neutral-100">
                    <td className="p-4 font-bold">{div.name}</td>
                    <td className="p-4">{div.maxQuota || "-"}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${div.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {div.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">Edit Divisi (Coming Soon)</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-neutral-400">Belum ada divisi</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 text-center">
            <Button variant="secondary" size="sm">Tambah Divisi (Coming Soon)</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
