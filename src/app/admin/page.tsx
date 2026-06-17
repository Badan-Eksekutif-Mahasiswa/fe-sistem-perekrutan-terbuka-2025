"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loader from "@/components/elements/Loader";
import { useRequireAuth } from "@/hooks/useAuth";
import {
  AdminEvent,
  AdminRegistration,
  adminApi,
} from "@/lib/api/admin";
import {
  CalendarDays,
  ClipboardCheck,
  FileText,
  Mail,
  Pencil,
  Send,
  Settings,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user, isLoading } = useRequireAuth("/admin/login");
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
        return;
      }

      try {
        setIsFetching(true);
        const response = await adminApi.getEvents();
        setEvents(response.events);
        setSelectedEventId(response.events[0]?.id ?? null);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat event."
        );
      } finally {
        setIsFetching(false);
      }
    };

    loadEvents();
  }, [user]);

  useEffect(() => {
    const loadRegistrations = async () => {
      if (!selectedEventId) {
        setRegistrations([]);
        return;
      }

      try {
        const response = await adminApi.getEventRegistrations(selectedEventId);
        setRegistrations(response.registrations);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat pendaftar."
        );
      }
    };

    loadRegistrations();
  }, [selectedEventId]);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [events, selectedEventId]
  );

  const totalApplicants = events.reduce(
    (sum, event) => sum + (event._count?.registrations ?? 0),
    0
  );
  const underReviewCount = registrations.filter(
    (registration) => registration.status === "UNDER_REVIEW"
  ).length;

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg-main)] px-5 text-white">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6 text-center">
          <h1 className="text-h4">Akses Ditolak</h1>
          <p className="mt-2 text-p5 text-white/70">
            Halaman ini hanya untuk panitia dan superadmin.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-main)] px-5 py-8 text-white md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-p5 uppercase tracking-normal text-secondary-100">
              Panel Panitia
            </p>
            <h1 className="mt-2 text-h1">Dashboard Event</h1>
            <p className="mt-2 max-w-2xl text-p4 text-white/70">
              {user.role === "SUPERADMIN"
                ? "Superadmin dapat melihat semua event."
                : "Panitia hanya melihat event dan pendaftar yang dimilikinya."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="md" variant="stroke" asChild>
              <Link href="/admin/change-password">
                <Settings className="size-4" />
                Password
              </Link>
            </Button>
            <Button size="md" variant="stroke">
              <Pencil className="size-4" />
              Draft Event
            </Button>
            <Button size="md" variant="secondary">
              <Send className="size-4" />
              Publish
            </Button>
          </div>
        </header>

        {error && (
          <div className="rounded-md border border-red-200/30 bg-red-300/15 px-4 py-3 text-p5 text-red-100">
            {error}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={CalendarDays} label="Event Terlihat" value={events.length} />
          <MetricCard icon={Users} label="Total Pendaftar" value={totalApplicants} />
          <MetricCard icon={ClipboardCheck} label="Under Review" value={underReviewCount} />
          <MetricCard icon={Mail} label="Email Terkirim" value="0" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1.3fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-h4">Event Saya</h2>
                <p className="mt-1 text-p5 text-white/60">
                  Data berasal dari endpoint admin yang dibatasi oleh owner.
                </p>
              </div>
              <Button size="icon" variant="ghost" aria-label="Tambah event">
                <FileText className="size-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {events.length === 0 ? (
                <div className="rounded-md border border-white/10 bg-white/[0.05] px-4 py-6 text-p5 text-white/65">
                  Belum ada event yang terhubung dengan akun ini.
                </div>
              ) : (
                events.map((event) => (
                  <button
                    key={event.id}
                    className={`w-full rounded-md border px-4 py-3 text-left transition ${
                      selectedEventId === event.id
                        ? "border-secondary-200/50 bg-secondary-200/15"
                        : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]"
                    }`}
                    type="button"
                    onClick={() => setSelectedEventId(event.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-p4 font-semibold">{event.title}</p>
                        <p className="mt-1 text-p6 text-white/60">
                          {event.organizer}
                        </p>
                      </div>
                      <StatusBadge status={event.status} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-p6 text-white/55">
                      <span>{event._count?.divisions ?? 0} divisi</span>
                      <span>{event._count?.registrations ?? 0} pendaftar</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <div className="mb-5">
              <h2 className="text-h4">Pendaftar</h2>
              <p className="mt-1 text-p5 text-white/60">
                {selectedEvent
                  ? selectedEvent.title
                  : "Pilih event untuk melihat pendaftar."}
              </p>
            </div>

            <div className="overflow-hidden rounded-md border border-white/10">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead className="bg-white/[0.08] text-p6 uppercase text-white/60">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="px-4 py-3 font-semibold">Kontak</th>
                    <th className="px-4 py-3 font-semibold">Pilihan Divisi</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {registrations.length === 0 ? (
                    <tr className="text-p5">
                      <td className="px-4 py-4 text-white/70" colSpan={4}>
                        Belum ada pendaftar untuk event ini.
                      </td>
                    </tr>
                  ) : (
                    registrations.map((registration) => (
                      <tr key={registration.id} className="text-p5">
                        <td className="px-4 py-4">
                          <p className="font-semibold">{registration.user.name}</p>
                          <p className="text-p6 text-white/55">
                            {registration.user.npm || "-"}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-white/70">
                          <p>{registration.contactEmail}</p>
                          <p className="text-p6 text-white/55">
                            LINE: {registration.lineId || "-"}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-white/70">
                          {registration.choices
                            .map((choice) => choice.division.name)
                            .join(", ")}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={registration.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-p6 uppercase tracking-normal text-white/55">
            {label}
          </p>
          <p className="mt-2 text-h2">{value}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-md bg-secondary-200/20 text-secondary-100">
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "PUBLISHED" || status === "PASSED_ADMINISTRATION"
      ? "border-green-200/30 bg-green-300/15 text-green-100"
      : status === "DRAFT" || status === "SUBMITTED"
        ? "border-yellow-200/30 bg-yellow-300/15 text-yellow-100"
        : status === "REJECTED_ADMINISTRATION"
          ? "border-red-200/30 bg-red-300/15 text-red-100"
          : "border-blue-200/30 bg-blue-300/15 text-blue-100";

  return (
    <span
      className={`inline-flex min-w-24 items-center justify-center rounded-md border px-2.5 py-1 text-p6 font-semibold ${className}`}
    >
      {status}
    </span>
  );
}
