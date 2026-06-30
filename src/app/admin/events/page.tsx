"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminEvent, adminApi } from "@/lib/api/admin";
import { updateEvent } from "@/lib/api/event";
import Link from "next/link";
import Loader from "@/components/elements/Loader";
import ActionDialog from "@/components/elements/ActionDialog";
import { useAuth } from "@/contexts/AuthContext";

type EventStatusFilter = "ALL" | AdminEvent["status"];

const getEffectiveEventStatus = (event: AdminEvent): AdminEvent["status"] => {
  if (event.status !== "ACTIVE") return event.status;

  const registrationClose = new Date(event.registrationClose);
  if (Number.isNaN(registrationClose.getTime())) return event.status;

  return new Date() > registrationClose ? "CLOSED" : event.status;
};

const statusFilters: Array<{ label: string; value: EventStatusFilter }> = [
  { label: "Semua", value: "ALL" },
  { label: "Draft", value: "DRAFT" },
  { label: "Active", value: "ACTIVE" },
  { label: "Closed", value: "CLOSED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>("ALL");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishTarget, setPublishTarget] = useState<AdminEvent | null>(null);
  const [feedbackDialog, setFeedbackDialog] = useState<{ title: string; description: string } | null>(null);
  const { user } = useAuth();
  const displayName = user?.name || user?.email?.split("@")[0] || "Admin";
  const isSuperadmin = user?.role === "SUPERADMIN";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getEvents();
      setEvents(data.events);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents =
    statusFilter === "ALL"
      ? events
      : events.filter((event) => getEffectiveEventStatus(event) === statusFilter);

  const handlePublish = (event: AdminEvent) => {
    const activeDivisionCount =
      event.divisions?.filter((division) => division.isActive !== false).length ??
      event._count?.divisions ??
      0;

    if (activeDivisionCount < 1) {
      setFeedbackDialog({
        title: "Event belum bisa dipublish",
        description: "Event harus memiliki minimal satu divisi aktif sebelum publish.",
      });
      return;
    }

    setPublishTarget(event);
  };

  const confirmPublish = async () => {
    if (!publishTarget) return;

    try {
      setActionLoadingId(publishTarget.id);
      await updateEvent(publishTarget.id, { status: "ACTIVE" });
      setPublishTarget(null);
      await fetchEvents();
    } catch (error) {
      console.error("Failed to publish event", error);
      setFeedbackDialog({
        title: "Gagal publish event",
        description: error instanceof Error ? error.message : "Gagal publish event",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 pb-20 pt-8 md:px-8 lg:px-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-h2 font-bold font-jakarta text-[#1D2642]">
            Hello {displayName}
          </h1>
        </div>
        <Link href="/admin/events/create">
          <Button variant="primary">Buat Event +</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatusFilter(filter.value)}
            className={`rounded-md border px-4 py-2 text-p5 font-semibold transition ${
              statusFilter === filter.value
                ? "border-secondary-200 bg-secondary-200/20 text-secondary-100"
                : "border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.1]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-100 border-b border-neutral-200 text-m4 font-bold text-neutral-600">
              <th className="p-4">Nama Event</th>
              {isSuperadmin && <th className="p-4">Pemilik</th>}
              <th className="p-4">Tipe</th>
              <th className="p-4">Status</th>
              <th className="p-4">Pendaftaran</th>
              <th className="p-4">Jumlah Divisi</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td
                  colSpan={isSuperadmin ? 7 : 6}
                  className="p-8 text-center text-neutral-400"
                >
                  Belum ada event terdaftar
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => {
                const effectiveStatus = getEffectiveEventStatus(event);

                return (
                <tr
                  key={event.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="p-4 font-bold">{event.title}</td>
                  {isSuperadmin && (
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {event.owner?.name || "Tanpa nama"}
                        </span>
                        <span className="text-p6 text-neutral-500">
                          {event.owner?.email || "-"}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="p-4">{event.typeOfEvent}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        effectiveStatus === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : effectiveStatus === "CLOSED"
                          ? "bg-red-100 text-red-700"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {effectiveStatus}
                    </span>
                  </td>
                  <td className="p-4 text-p5 text-neutral-500">
                    {new Date(event.registrationOpen).toLocaleDateString("id-ID")} -{" "}
                    {new Date(event.registrationClose).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-4 text-center">{event.divisions?.length || 0}</td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/events/${event.eventCode || event.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                    {event.status === "DRAFT" && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={actionLoadingId === event.id}
                        onClick={() => handlePublish(event)}
                      >
                        {actionLoadingId === event.id ? "Publishing..." : "Publish"}
                      </Button>
                    )}
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ActionDialog
        open={Boolean(publishTarget)}
        onOpenChange={(open) => {
          if (!open) setPublishTarget(null);
        }}
        title="Publish event?"
        description={`Event "${publishTarget?.title || ""}" akan ditampilkan ke applicant.`}
        confirmLabel="Publish"
        variant="secondary"
        loading={Boolean(actionLoadingId)}
        onConfirm={confirmPublish}
      />

      <ActionDialog
        open={Boolean(feedbackDialog)}
        onOpenChange={(open) => {
          if (!open) setFeedbackDialog(null);
        }}
        title={feedbackDialog?.title || "Peringatan"}
        description={feedbackDialog?.description || ""}
        confirmLabel="Mengerti"
        hideCancel
      />
    </div>
  );
}
