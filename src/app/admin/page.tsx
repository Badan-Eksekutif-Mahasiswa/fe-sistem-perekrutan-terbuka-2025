"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loader from "@/components/elements/Loader";
import ActionDialog from "@/components/elements/ActionDialog";
import { useRequireAuth } from "@/hooks/useAuth";
import {
  AdminAnnouncementSummary,
  AdminApplicationDetail,
  AdminApplicationStatus,
  AdminEmailLog,
  AdminEmailStatus,
  AdminEmailType,
  AdminEvent,
  AdminEventSummary,
  AdminRegistrationListItem,
  adminApi,
} from "@/lib/api/admin";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileText,
  History,
  RefreshCcw,
  Search,
  Send,
  Settings,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

const applicationStatuses: Array<{
  value: AdminApplicationStatus | "ALL";
  label: string;
}> = [
  { value: "ALL", label: "Semua status" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "PASSED_ADMINISTRATION", label: "Lulus berkas" },
  { value: "REJECTED_ADMINISTRATION", label: "Tidak lulus" },
];

const statusOptions: Array<{ value: AdminApplicationStatus; label: string }> = [
  { value: "SUBMITTED", label: "Submitted" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "PASSED_ADMINISTRATION", label: "Lulus berkas" },
  { value: "REJECTED_ADMINISTRATION", label: "Tidak lulus" },
];

const announcementTypes: Array<{ value: AdminEmailType; label: string; hint: string }> = [
  {
    value: "PASSED_ADMINISTRATION",
    label: "Lulus berkas",
    hint: "Dikirim ke pendaftar dengan status lulus berkas.",
  },
  {
    value: "REJECTED_ADMINISTRATION",
    label: "Tidak lulus",
    hint: "Dikirim ke pendaftar dengan status tidak lulus berkas.",
  },
  {
    value: "REGISTRATION_CONFIRMATION",
    label: "Konfirmasi pendaftaran",
    hint: "Dikirim ke semua pendaftaran yang sudah submit.",
  },
];

const getEffectiveAdminEventStatus = (event: AdminEvent): AdminEvent["status"] => {
  if (event.status !== "ACTIVE") return event.status;

  const registrationClose = new Date(event.registrationClose);
  if (Number.isNaN(registrationClose.getTime())) return event.status;

  return new Date() > registrationClose ? "CLOSED" : event.status;
};

export default function AdminDashboardPage() {
  const { user, isLoading } = useRequireAuth("/admin/login");
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [registrations, setRegistrations] = useState<AdminRegistrationListItem[]>([]);
  const [summary, setSummary] = useState<AdminEventSummary | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<AdminApplicationStatus | "ALL">("ALL");
  const [divisionFilter, setDivisionFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<AdminApplicationDetail | null>(null);
  const [statusDraft, setStatusDraft] = useState<AdminApplicationStatus>("SUBMITTED");
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const [isFetchingRegistrations, setIsFetchingRegistrations] = useState(false);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAccess = user?.role === "ADMIN" || user?.role === "SUPERADMIN";

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [events, selectedEventId]
  );

  const loadEvents = useCallback(async () => {
    if (!canAccess) {
      setIsFetchingEvents(false);
      return;
    }

    try {
      setError(null);
      setIsFetchingEvents(true);
      const response = await adminApi.getEvents();
      setEvents(response.events);
      setSelectedEventId((current) => current ?? response.events[0]?.id ?? null);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : "Gagal memuat event."
      );
    } finally {
      setIsFetchingEvents(false);
    }
  }, [canAccess]);

  const loadRegistrations = useCallback(async () => {
    if (!selectedEventId) {
      setSummary(null);
      setRegistrations([]);
      return;
    }

    try {
      setError(null);
      setIsFetchingRegistrations(true);
      const [summaryResponse, registrationsResponse] = await Promise.all([
        adminApi.getEventSummary(selectedEventId),
        adminApi.getEventRegistrations(selectedEventId, {
          status: statusFilter,
          divisionId: divisionFilter || undefined,
          search,
          page: 1,
          limit: 100,
          sort: "submitted_at",
          order: "desc",
        }),
      ]);

      setSummary(summaryResponse);
      setRegistrations(registrationsResponse.data);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal memuat pendaftar."
      );
    } finally {
      setIsFetchingRegistrations(false);
    }
  }, [divisionFilter, search, selectedEventId, statusFilter]);

  useEffect(() => {
    if (!isLoading) void loadEvents();
  }, [isLoading, loadEvents]);

  useEffect(() => {
    void loadRegistrations();
  }, [loadRegistrations]);

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setStatusFilter("ALL");
    setDivisionFilter("");
    setSearch("");
    setSelectedApplication(null);
  };

  const openApplicationDetail = async (registrationId: string) => {
    try {
      setError(null);
      setIsFetchingDetail(true);
      const detail = await adminApi.getApplicationDetail(registrationId);
      setSelectedApplication(detail);
      setStatusDraft(detail.status);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal memuat detail pendaftar."
      );
    } finally {
      setIsFetchingDetail(false);
    }
  };

  const updateSelectedStatus = async () => {
    if (!selectedApplication) return;

    try {
      setError(null);
      setIsUpdatingStatus(true);
      await adminApi.updateApplicationStatus(
        selectedApplication.registration_code,
        statusDraft
      );
      const detail = await adminApi.getApplicationDetail(
        selectedApplication.registration_code
      );
      setSelectedApplication(detail);
      setStatusDraft(detail.status);
      await loadRegistrations();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Gagal mengubah status pendaftar."
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const exportCsv = async () => {
    if (!selectedEventId) return;

    try {
      setError(null);
      setIsExporting(true);
      const blob = await adminApi.exportRegistrationsCsv(selectedEventId);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `spt-${selectedEvent?.eventCode || selectedEventId}-pendaftar.csv`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      setError(
        exportError instanceof Error ? exportError.message : "Gagal export CSV."
      );
    } finally {
      setIsExporting(false);
    }
  };

  const totalApplicants =
    summary?.total_registrants ?? selectedEvent?._count?.registrations ?? 0;
  const submittedCount =
    summary?.by_status.SUBMITTED ??
    registrations.filter((registration) => registration.status === "SUBMITTED").length;
  const underReviewCount =
    summary?.by_status.UNDER_REVIEW ??
    registrations.filter((registration) => registration.status === "UNDER_REVIEW").length;
  const passedCount =
    summary?.by_status.PASSED_ADMINISTRATION ??
    registrations.filter(
      (registration) => registration.status === "PASSED_ADMINISTRATION"
    ).length;
  const rejectedCount =
    summary?.by_status.REJECTED_ADMINISTRATION ??
    registrations.filter(
      (registration) => registration.status === "REJECTED_ADMINISTRATION"
    ).length;

  if (isLoading || isFetchingEvents) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  const adminGreetingName = user.email?.split("@")[0] || user.name || "Admin";

  if (!canAccess) {
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
              Panel {user.role === "SUPERADMIN" ? "Superadmin" : "Panitia"}
            </p>
            <h1 className="mt-2 text-h1">Halo, {adminGreetingName}</h1>
            <p className="mt-2 max-w-2xl text-p4 text-white/70">
              {user.role === "SUPERADMIN"
                ? "Pantau seluruh event, pendaftar, dan status seleksi dari semua panitia."
                : "Pantau event milikmu, buka berkas pendaftar, lalu ubah status seleksi administrasi."}
            </p>
          </div>
          {user.role === "ADMIN" && (
            <Button size="md" variant="stroke" asChild>
              <Link href="/admin/change-password">
                <Settings className="size-4" />
                Password
              </Link>
            </Button>
          )}
        </header>

        {error && (
          <div className="rounded-md border border-red-200/30 bg-red-300/15 px-4 py-3 text-p5 text-red-100">
            {error}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard icon={Users} label="Total Pendaftar" value={totalApplicants} />
          <MetricCard icon={FileText} label="Submitted" value={submittedCount} />
          <MetricCard icon={Clock3} label="Under Review" value={underReviewCount} />
          <MetricCard icon={CheckCircle2} label="Lulus Berkas" value={passedCount} />
          <MetricCard icon={XCircle} label="Tidak Lulus" value={rejectedCount} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.55fr]">
          <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-h4">
                  {user.role === "SUPERADMIN" ? "Semua Event" : "Event Saya"}
                </h2>
                <p className="mt-1 text-p5 text-white/60">
                  {user.role === "SUPERADMIN"
                    ? "Superadmin dapat memilih event dari semua panitia."
                    : "Daftar ini hanya berisi event yang kamu kelola."}
                </p>
              </div>
              <Button size="icon" variant="ghost" aria-label="Event">
                <CalendarDays className="size-4" />
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
                    onClick={() => handleSelectEvent(event.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-p4 font-semibold">{event.title}</p>
                        <p className="mt-1 text-p6 text-white/60">
                          {user.role === "SUPERADMIN"
                            ? event.owner?.name || "Tanpa pemilik"
                            : event.organizer}
                        </p>
                      </div>
                      <StatusBadge status={getEffectiveAdminEventStatus(event)} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-p6 text-white/55">
                      <span>{event._count?.divisions ?? event.divisions?.length ?? 0} divisi</span>
                      <span>{event._count?.registrations ?? 0} pendaftar</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className="flex flex-col gap-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
              <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h2 className="text-h4">Pendaftar</h2>
                  <p className="mt-1 text-p5 text-white/60">
                    {selectedEvent
                      ? selectedEvent.title
                      : "Pilih event untuk melihat pendaftar."}
                  </p>
                </div>
                <Button
                  type="button"
                  size="md"
                  variant="stroke"
                  onClick={exportCsv}
                  disabled={!selectedEventId || isExporting}
                >
                  <Download className="size-4" />
                  {isExporting ? "Exporting..." : "Export CSV"}
                </Button>
              </div>

              <div className="mb-5 grid gap-3 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Cari nama, email, atau NPM"
                    className="h-11 w-full rounded-md border border-white/15 bg-white px-10 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
                  />
                </label>
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as AdminApplicationStatus | "ALL")
                  }
                  className="h-11 rounded-md border border-white/15 bg-white px-3 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
                >
                  {applicationStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <select
                  value={divisionFilter}
                  onChange={(event) => setDivisionFilter(event.target.value)}
                  className="h-11 rounded-md border border-white/15 bg-white px-3 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
                >
                  <option value="">Semua divisi</option>
                  {selectedEvent?.divisions?.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-hidden rounded-md border border-white/10">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead className="bg-white/[0.08] text-p6 uppercase text-white/60">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Nama</th>
                        <th className="px-4 py-3 font-semibold">Pilihan Divisi</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Submit</th>
                        <th className="px-4 py-3 font-semibold">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {isFetchingRegistrations ? (
                        <tr className="text-p5">
                          <td className="px-4 py-6 text-white/70" colSpan={5}>
                            Memuat pendaftar...
                          </td>
                        </tr>
                      ) : registrations.length === 0 ? (
                        <tr className="text-p5">
                          <td className="px-4 py-6 text-white/70" colSpan={5}>
                            Belum ada pendaftar yang sesuai filter ini.
                          </td>
                        </tr>
                      ) : (
                        registrations.map((registration) => (
                          <tr key={registration.registration_code} className="text-p5">
                            <td className="px-4 py-4">
                              <p className="font-semibold">{registration.user.name}</p>
                              <p className="text-p6 text-white/55">
                                {registration.user.npm || "-"} Ãƒâ€šÃ‚Â·{" "}
                                {registration.user.email || "-"}
                              </p>
                            </td>
                            <td className="px-4 py-4 text-white/70">
                              <p>{registration.division_choice_1?.name || "-"}</p>
                              {registration.division_choice_2 && (
                                <p className="text-p6 text-white/55">
                                  {registration.division_choice_2.name}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <StatusBadge status={registration.status} />
                            </td>
                            <td className="px-4 py-4 text-white/70">
                              {formatDateTime(registration.submitted_at)}
                            </td>
                            <td className="px-4 py-4">
                              <Button
                                type="button"
                                size="md"
                                variant="stroke"
                                onClick={() =>
                                  void openApplicationDetail(
                                    registration.registration_code
                                  )
                                }
                              >
                                <Eye className="size-4" />
                                Detail
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <ApplicationDetailPanel
              application={selectedApplication}
              isLoading={isFetchingDetail}
              statusDraft={statusDraft}
              onStatusDraftChange={setStatusDraft}
              onUpdateStatus={updateSelectedStatus}
              isUpdating={isUpdatingStatus}
            />

            <AnnouncementPanel event={selectedEvent} onError={setError} />
          </section>
        </section>
      </div>
    </main>
  );
}

function ApplicationDetailPanel({
  application,
  isLoading,
  statusDraft,
  onStatusDraftChange,
  onUpdateStatus,
  isUpdating,
}: {
  application: AdminApplicationDetail | null;
  isLoading: boolean;
  statusDraft: AdminApplicationStatus;
  onStatusDraftChange: (status: AdminApplicationStatus) => void;
  onUpdateStatus: () => Promise<void>;
  isUpdating: boolean;
}) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 text-p5 text-white/70">
        Memuat detail pendaftar...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-secondary-200/20 text-secondary-100">
            <UserCheck className="size-5" />
          </div>
          <div>
            <h2 className="text-h4">Detail Berkas</h2>
            <p className="mt-1 text-p5 text-white/60">
              Pilih salah satu pendaftar untuk melihat kontak, pilihan divisi,
              dan link berkas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-p6 uppercase tracking-normal text-secondary-100">
            {application.registration_code}
          </p>
          <h2 className="mt-1 text-h4">{application.user.name}</h2>
          <p className="mt-1 text-p5 text-white/60">
            {application.user.npm || "-"} Ãƒâ€šÃ‚Â· {application.user.faculty || "-"} Ãƒâ€šÃ‚Â·{" "}
            {application.user.studyProgram || "-"}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoBlock label="Email" value={application.user.email || "-"} />
        <InfoBlock label="LINE" value={application.user.line_id || "-"} />
        <InfoBlock label="WhatsApp" value={application.user.whatsapp || "-"} />
        <InfoBlock label="Submit" value={formatDateTime(application.submitted_at)} />
        <InfoBlock
          label="Pilihan divisi 1"
          value={application.division_choice_1?.name || "-"}
        />
        <InfoBlock
          label="Pilihan divisi 2"
          value={application.division_choice_2?.name || "-"}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-p4 font-semibold">Berkas Pendaftaran</h3>
        <div className="mt-3 space-y-2">
          {application.submission_links.length === 0 ? (
            <p className="rounded-md border border-white/10 bg-white/[0.05] px-4 py-3 text-p5 text-white/65">
              Belum ada link berkas yang dikirim.
            </p>
          ) : (
            application.submission_links.map((link) => (
              <a
                key={`${link.requirement}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.05] px-4 py-3 text-p5 text-white transition hover:bg-white/[0.09]"
              >
                <span>{link.requirement}</span>
                <span className="max-w-[55%] truncate text-p6 text-secondary-100">
                  {link.url}
                </span>
              </a>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row md:items-end">
        <label className="flex-1">
          <span className="mb-2 block text-p5 font-semibold">Status seleksi</span>
          <select
            value={statusDraft}
            onChange={(event) =>
              onStatusDraftChange(event.target.value as AdminApplicationStatus)
            }
            className="h-11 w-full rounded-md border border-white/15 bg-white px-3 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={() => void onUpdateStatus()}
          disabled={isUpdating || statusDraft === application.status}
        >
          {isUpdating ? "Menyimpan..." : "Simpan Status"}
        </Button>
      </div>
    </div>
  );
}

function AnnouncementPanel({
  event,
  onError,
}: {
  event: AdminEvent | null;
  onError: (message: string | null) => void;
}) {
  const [type, setType] = useState<AdminEmailType>("PASSED_ADMINISTRATION");
  const [statusFilter, setStatusFilter] = useState<AdminEmailStatus | "ALL">("ALL");
  const [divisionId, setDivisionId] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [force, setForce] = useState(false);
  const [summary, setSummary] = useState<AdminAnnouncementSummary | null>(null);
  const [logs, setLogs] = useState<AdminEmailLog[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isFetchingLogs, setIsFetchingLogs] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);

  const loadEmailLogs = useCallback(async () => {
    if (!event) {
      setLogs([]);
      return;
    }

    try {
      setIsFetchingLogs(true);
      const response = await adminApi.getEventEmails(event.id, {
        type: "ALL",
        status: statusFilter,
        page: 1,
        limit: 8,
      });
      setLogs(response.data);
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Gagal memuat riwayat email."
      );
    } finally {
      setIsFetchingLogs(false);
    }
  }, [event, onError, statusFilter]);

  useEffect(() => {
    setSummary(null);
    setDivisionId("");
    setAdditionalMessage("");
    setForce(false);
  }, [event?.id]);

  useEffect(() => {
    void loadEmailLogs();
  }, [loadEmailLogs]);

  const processAnnouncement = async (dryRun: boolean) => {
    if (!event) return;


    try {
      onError(null);
      setIsSending(true);
      const result = await adminApi.sendAnnouncement(event.id, {
        type,
        additionalMessage: additionalMessage.trim() || null,
        divisionId: divisionId || null,
        force,
        dryRun,
      });
      setSummary(result);
      await loadEmailLogs();
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Gagal memproses pengumuman."
      );
    } finally {
      setIsSending(false);
    }
  };

  const selectedType = announcementTypes.find((item) => item.value === type);
  const isArchived = event?.status === "ARCHIVED";

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-p6 uppercase tracking-normal text-secondary-100">
            Pengumuman
          </p>
          <h2 className="mt-1 text-h4">Kirim Email Status Kelulusan</h2>
          <p className="mt-1 text-p5 text-white/60">
            Email memakai pesan default sistem. Pesan tambahan akan ditaruh di
            dalam email yang sama.
          </p>
        </div>
        <Button
          type="button"
          size="md"
          variant="stroke"
          onClick={() => void loadEmailLogs()}
          disabled={!event || isFetchingLogs}
        >
          <RefreshCcw className="size-4" />
          Refresh Log
        </Button>
      </div>

      {!event ? (
        <div className="rounded-md border border-white/10 bg-white/[0.05] px-4 py-6 text-p5 text-white/65">
          Pilih event terlebih dahulu untuk mengirim pengumuman.
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            {isArchived && (
              <div className="rounded-md border border-red-200/30 bg-red-300/15 px-4 py-3 text-p5 text-red-100">
                Event archived tidak bisa mengirim pengumuman.
              </div>
            )}

            <label className="block">
              <span className="mb-2 block text-p5 font-semibold">Target email</span>
              <select
                value={type}
                onChange={(changeEvent) =>
                  setType(changeEvent.target.value as AdminEmailType)
                }
                className="h-11 w-full rounded-md border border-white/15 bg-white px-3 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
              >
                {announcementTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-p6 text-white/55">
                {selectedType?.hint}
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-p5 font-semibold">Filter divisi</span>
              <select
                value={divisionId}
                onChange={(changeEvent) => setDivisionId(changeEvent.target.value)}
                className="h-11 w-full rounded-md border border-white/15 bg-white px-3 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
              >
                <option value="">Semua divisi</option>
                {event.divisions?.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-p5 font-semibold">
                Pesan tambahan
              </span>
              <textarea
                value={additionalMessage}
                onChange={(changeEvent) =>
                  setAdditionalMessage(changeEvent.target.value)
                }
                placeholder="Opsional. Contoh: Mohon bergabung ke grup LINE paling lambat besok."
                className="min-h-28 w-full rounded-md border border-white/15 bg-white px-3 py-2 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
              />
            </label>

            <label className="flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.05] px-4 py-3 text-p5 text-white/75">
              <input
                type="checkbox"
                checked={force}
                onChange={(changeEvent) => setForce(changeEvent.target.checked)}
                className="mt-1 size-4"
              />
              <span>
                Kirim ulang ke penerima yang sudah pernah mendapatkan email tipe
                ini.
              </span>
            </label>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                size="lg"
                variant="stroke"
                onClick={() => void processAnnouncement(true)}
                disabled={isSending || isArchived}
              >
                <Eye className="size-4" />
                Cek Penerima
              </Button>
              <Button
                type="button"
                size="lg"
                variant="primary"
                onClick={() => setSendDialogOpen(true)}
                disabled={isSending || isArchived}
              >
                <Send className="size-4" />
                {isSending ? "Memproses..." : "Kirim Email"}
              </Button>
            </div>

            <ActionDialog
              open={sendDialogOpen}
              onOpenChange={setSendDialogOpen}
              title="Kirim email pengumuman?"
              description={`Email "${announcementLabel(type)}" akan dikirim untuk event "${event.title}". Pastikan target dan filter divisi sudah benar.`}
              confirmLabel="Kirim Email"
              variant="primary"
              loading={isSending}
              onConfirm={() => processAnnouncement(false)}
            />

            {summary && (
              <div className="grid grid-cols-2 gap-3 rounded-md border border-white/10 bg-white/[0.05] p-4 md:grid-cols-4">
                <SummaryValue label="Eligible" value={summary.eligible} />
                <SummaryValue
                  label={summary.dryRun ? "Akan dikirim" : "Terkirim"}
                  value={summary.sent}
                />
                <SummaryValue label="Gagal" value={summary.failed} />
                <SummaryValue label="Dilewati" value={summary.skipped} />
              </div>
            )}
          </div>

          <div>
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <History className="size-5 text-secondary-100" />
                <h3 className="text-p4 font-semibold">Riwayat Email</h3>
              </div>
              <select
                value={statusFilter}
                onChange={(changeEvent) =>
                  setStatusFilter(changeEvent.target.value as AdminEmailStatus | "ALL")
                }
                className="h-10 rounded-md border border-white/15 bg-white px-3 text-p5 text-[#1D2642] outline-none focus:border-primary-300"
              >
                <option value="ALL">Semua status</option>
                <option value="SENT">Sent</option>
                <option value="FAILED">Failed</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            <div className="overflow-hidden rounded-md border border-white/10">
              {isFetchingLogs ? (
                <p className="px-4 py-5 text-p5 text-white/65">
                  Memuat riwayat email...
                </p>
              ) : logs.length === 0 ? (
                <p className="px-4 py-5 text-p5 text-white/65">
                  Belum ada email yang dikirim untuk event ini.
                </p>
              ) : (
                <div className="divide-y divide-white/10">
                  {logs.map((log) => (
                    <div key={log.id} className="px-4 py-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-p5 font-semibold text-white">
                          {log.applicant_name || log.recipient_email}
                        </p>
                        <StatusBadge status={log.status} />
                      </div>
                      <p className="mt-1 text-p6 text-white/60">
                        {announcementLabel(log.type)} Ãƒâ€šÃ‚Â· {log.recipient_email}
                      </p>
                      <p className="mt-1 text-p6 text-white/45">
                        {formatDateTime(log.created_at)}
                      </p>
                      {log.error_message && (
                        <p className="mt-2 rounded-md border border-red-200/25 bg-red-300/10 px-3 py-2 text-p6 text-red-100">
                          {log.error_message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryValue({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-p6 uppercase tracking-normal text-white/45">{label}</p>
      <p className="mt-1 text-h4 text-white">{value}</p>
    </div>
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

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.05] px-4 py-3">
      <p className="text-p6 uppercase tracking-normal text-white/45">{label}</p>
      <p className="mt-1 break-words text-p5 text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "ACTIVE" || status === "PASSED_ADMINISTRATION" || status === "SENT"
      ? "border-green-200/30 bg-green-300/15 text-green-100"
      : status === "DRAFT" || status === "SUBMITTED" || status === "PENDING"
        ? "border-yellow-200/30 bg-yellow-300/15 text-yellow-100"
        : status === "REJECTED_ADMINISTRATION" || status === "FAILED"
          ? "border-red-200/30 bg-red-300/15 text-red-100"
          : "border-blue-200/30 bg-blue-300/15 text-blue-100";

  return (
    <span
      className={`inline-flex min-w-24 items-center justify-center rounded-md border px-2.5 py-1 text-p6 font-semibold ${className}`}
    >
      {statusLabel(status)}
    </span>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case "SUBMITTED":
      return "SUBMITTED";
    case "UNDER_REVIEW":
      return "UNDER REVIEW";
    case "PASSED_ADMINISTRATION":
      return "LULUS";
    case "REJECTED_ADMINISTRATION":
      return "TIDAK LULUS";
    case "SENT":
      return "SENT";
    case "FAILED":
      return "FAILED";
    case "PENDING":
      return "PENDING";
    default:
      return status;
  }
}

function announcementLabel(type: AdminEmailType) {
  switch (type) {
    case "PASSED_ADMINISTRATION":
      return "Lulus berkas";
    case "REJECTED_ADMINISTRATION":
      return "Tidak lulus";
    case "REGISTRATION_CONFIRMATION":
      return "Konfirmasi pendaftaran";
  }
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
