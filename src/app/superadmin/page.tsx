"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/elements/Loader";
import { authApi } from "@/lib/auth";
import { useRequireRole } from "@/hooks/useAuth";
import type { User } from "@/types/auth";
import {
  BadgeCheck,
  KeyRound,
  Mail,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";

export default function SuperadminPage() {
  const { user, isLoading, isAuthorized } = useRequireRole(
    ["SUPERADMIN"],
    "/internal/spt-admin-2026/login",
    "/admin"
  );
  const [admins, setAdmins] = useState<User[]>([]);
  const [isFetchingAdmins, setIsFetchingAdmins] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAdmins = useCallback(async () => {
    setIsFetchingAdmins(true);
    const response = await authApi.getAdmins();

    if (response.success && response.data?.users) {
      setAdmins(response.data.users);
    } else {
      setFeedback({
        type: "error",
        message: response.message || "Gagal memuat daftar akun internal.",
      });
    }

    setIsFetchingAdmins(false);
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;
    fetchAdmins();
  }, [fetchAdmins, isAuthorized]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const response = await authApi.createAdmin({
      name: form.name,
      email: form.email,
      password: form.password,
      role: "ADMIN",
    });

    if (response.success && response.data?.user) {
      setForm({ name: "", email: "", password: "" });
      setFeedback({
        type: "success",
        message: "Akun panitia berhasil dibuat.",
      });
      await fetchAdmins();
    } else {
      setFeedback({
        type: "error",
        message: response.message || "Gagal membuat akun panitia.",
      });
    }

    setIsSubmitting(false);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    setIsDeleting(true);

    const response = await authApi.deleteAdmin(confirmDelete.id);

    if (response.success) {
      setFeedback({ type: "success", message: "Akun berhasil dihapus." });
      setConfirmDelete(null);
      await fetchAdmins();
    } else {
      setFeedback({
        type: "error",
        message: response.message || "Gagal menghapus akun.",
      });
      setConfirmDelete(null);
    }

    setIsDeleting(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!user || !isAuthorized) {
    return null;
  }

  return (
    <>
    <main className="min-h-screen bg-[var(--bg-main)] px-5 pb-8 pt-32 text-white md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-p5 uppercase tracking-normal text-secondary-100">
              Panel Superadmin
            </p>
            <h1 className="mt-2 text-h1">Manajemen Panitia</h1>
            <p className="mt-2 max-w-2xl text-p4 text-white/70">
              Buat akun panitia internal yang bisa login melalui halaman admin.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-md border border-green-200/30 bg-green-300/15 px-3 py-2 text-p5 text-green-100">
            <ShieldCheck className="size-4" />
            Superadmin
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard
            icon={Users}
            label="Akun Internal"
            value={admins.length}
          />
          <MetricCard icon={BadgeCheck} label="Role Baru" value="ADMIN" />
          <MetricCard icon={KeyRound} label="Provider" value="Internal" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-secondary-200/20 text-secondary-100">
                <UserPlus className="size-5" />
              </div>
              <div>
                <h2 className="text-h4">Buat Akun Panitia</h2>
                <p className="text-p5 text-white/60">Backend internal auth</p>
              </div>
            </div>

            <div className="grid gap-4">
              <Input
                required
                label="Nama panitia"
                value={form.name}
                icon={<Users />}
                placeholder="Nama lengkap"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
              <Input
                required
                type="email"
                label="Email"
                value={form.email}
                icon={<Mail />}
                placeholder="panitia@bem.ui.ac.id"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
              <Input
                required
                minLength={8}
                type="password"
                label="Password sementara"
                value={form.password}
                icon={<KeyRound />}
                placeholder="Minimal 8 karakter"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
              />
            </div>

            <Button
              className="mt-5 w-full"
              disabled={isSubmitting}
              type="submit"
              variant="secondary"
            >
              <UserPlus className="size-4" />
              {isSubmitting ? "Membuat Akun..." : "Buat Akun"}
            </Button>

            {feedback && (
              <div
                className={`mt-4 rounded-md border px-4 py-3 text-p5 ${
                  feedback.type === "success"
                    ? "border-green-200/30 bg-green-300/15 text-green-100"
                    : "border-red-200/30 bg-red-300/15 text-red-100"
                }`}
              >
                {feedback.message}
              </div>
            )}
          </form>

          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <h2 className="text-h4">Akun Internal</h2>
            <div className="mt-5 overflow-hidden rounded-md border border-white/10">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead className="bg-white/[0.08] text-p6 uppercase text-white/60">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {isFetchingAdmins ? (
                    <tr className="text-p5">
                      <td className="px-4 py-4 text-white/70" colSpan={4}>
                        Memuat akun internal...
                      </td>
                    </tr>
                  ) : admins.length === 0 ? (
                    <tr className="text-p5">
                      <td className="px-4 py-4 text-white/70" colSpan={4}>
                        Belum ada akun internal di database.
                      </td>
                    </tr>
                  ) : (
                    admins.map((account) => (
                      <tr key={account.id} className="text-p5">
                        <td className="px-4 py-4 font-semibold">
                          {account.name}
                        </td>
                        <td className="px-4 py-4 text-white/70">
                          {account.email}
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex min-w-24 items-center justify-center rounded-md border border-blue-200/30 bg-blue-300/15 px-2.5 py-1 text-p6 font-semibold text-blue-100">
                            {account.role || "ADMIN"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {account.role !== "SUPERADMIN" && account.id !== user.id && (
                            <button
                              type="button"
                              onClick={() => setConfirmDelete(account)}
                              className="flex items-center gap-1.5 rounded-md border border-red-200/30 bg-red-300/10 px-2.5 py-1 text-p6 text-red-300 transition-colors hover:bg-red-300/20"
                            >
                              <Trash2 className="size-3.5" />
                              Hapus
                            </button>
                          )}
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

    {confirmDelete && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#1a1a2e] p-6 shadow-xl">
          <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-red-300/15">
            <Trash2 className="size-5 text-red-300" />
          </div>
          <h3 className="text-h4 text-white">Hapus Akun?</h3>
          <p className="mt-2 text-p5 text-white/70">
            Akun <span className="font-semibold text-white">{confirmDelete.name}</span> ({confirmDelete.email}) akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setConfirmDelete(null)}
              disabled={isDeleting}
              className="flex-1 rounded-md border border-white/10 px-4 py-2 text-p5 text-white/70 transition-colors hover:bg-white/5"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="flex-1 rounded-md bg-red-600 px-4 py-2 text-p5 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
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
