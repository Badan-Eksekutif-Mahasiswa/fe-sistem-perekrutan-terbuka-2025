"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui-legacy/button";
import Loader from "@/components/elements/Loader";
import {
  User,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  GraduationCap,
  IdCard,
  MapPin,
  Crown,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { registrationApi } from "@/lib/api/registration";
import { authApi } from "@/lib/auth";
import type { MyApplication, RegistrationStatus } from "@/types/registration";
import Link from "next/link";

const isApplicationSubmitted = (application: MyApplication) =>
  application.status !== "DRAFT";

const getStatusLabel = (status: RegistrationStatus) => {
  const statusLabels: Record<RegistrationStatus, string> = {
    DRAFT: "Draft",
    SUBMITTED: "Submitted",
    UNDER_REVIEW: "Under Review",
    PASSED_ADMINISTRATION: "Lulus Berkas",
    REJECTED_ADMINISTRATION: "Tidak Lulus Berkas",
  };
  return statusLabels[status];
};

const getStatusColor = (status: RegistrationStatus) => {
  const colors: Record<RegistrationStatus, string> = {
    DRAFT: "bg-yellow-500/20 text-yellow-300",
    SUBMITTED: "bg-green-500/20 text-green-300",
    UNDER_REVIEW: "bg-secondary-200/20 text-secondary-100",
    PASSED_ADMINISTRATION: "bg-green-500/20 text-green-300",
    REJECTED_ADMINISTRATION: "bg-red-500/20 text-red-300",
  };
  return colors[status];
};

const getEventTypeLabel = (type: MyApplication["typeOfEvent"]) => {
  if (type === "ORGANISASI") return "Organisasi";
  if (type === "KEPANITIAAN") return "Kepanitiaan";
  if (type === "UKM") return "UKM";
  return null;
};

const DashboardPage = () => {
  const { user, isLoading } = useRequireAuth();
  const { checkAuth } = useAuth();
  const toast = useToast();
  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [profileEmail, setProfileEmail] = useState("");
  const [isSavingProfileEmail, setIsSavingProfileEmail] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await registrationApi.getMyApplications();
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoadingApplications(false);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  useEffect(() => {
    setProfileEmail(user?.email ?? "");
  }, [user?.email]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const needsProfileEmail = user.role === "APPLICANT" && !user.email;

  const handleSaveProfileEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = profileEmail.trim();
    if (!email) {
      toast.show("error", "Email aktif wajib diisi");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.show("error", "Format email tidak valid");
      return;
    }

    setIsSavingProfileEmail(true);
    try {
      const response = await authApi.updateProfile({ email });
      if (!response.success) {
        toast.show("error", response.message || "Gagal menyimpan email");
        return;
      }

      await checkAuth();
      toast.show("success", "Email aktif berhasil disimpan");
    } catch (error) {
      console.error("Failed to save profile email:", error);
      toast.show("error", "Gagal menyimpan email");
    } finally {
      setIsSavingProfileEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/assets/logo-bem-ui.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-h1 text-white">
                {getGreeting()}, {user.name?.split(" ")[0]}
              </h1>
              <p className="text-m3 text-white">
                Selamat datang kembali di Sistem Perekrutan Terbuka
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-m4 text-white">Jumlah Mendaftar</p>
                <p className="text-h2 text-white font-bold">
                  {applications.length}
                </p>
              </div>
              <div className="bg-primary-200/20 p-3 rounded-full">
                <FileText className="w-6 h-6 text-primary-100" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-m4 text-white">Disubmit</p>
                <p className="text-h2 text-white font-bold">
                  {applications.filter(isApplicationSubmitted).length}
                </p>
              </div>
              <div className="bg-secondary-200/20 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-secondary-100" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-m4 text-white">Draft</p>
                <p className="text-h2 text-white font-bold">
                  {applications.filter((app) => !isApplicationSubmitted(app)).length}
                </p>
              </div>
              <div className="bg-yellow-200/20 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-200" />
              </div>
            </div>
          </div>
        </div>

        {needsProfileEmail && (
          <div className="mb-8 bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary-200/20 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-primary-100" />
                  </div>
                  <h2 className="text-h3 text-white">Lengkapi Email Aktif</h2>
                </div>
                <p className="text-m4 text-white/80">
                  Email ini akan dipakai sebagai default saat kamu mendaftar dan
                  sebagai tujuan informasi hasil seleksi. Kamu tetap bisa
                  mengganti emailnya di setiap form pendaftaran.
                </p>
              </div>

              <form
                onSubmit={handleSaveProfileEmail}
                className="w-full lg:max-w-md space-y-3"
              >
                <label className="block text-m4 text-white" htmlFor="profile-email">
                  Email aktif
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={profileEmail}
                  onChange={(event) => setProfileEmail(event.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-primary-300 bg-white px-4 py-3 text-primary-400 outline-none focus:border-primary-100"
                  disabled={isSavingProfileEmail}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary-200 hover:bg-primary-300 text-white"
                  disabled={isSavingProfileEmail}
                >
                  {isSavingProfileEmail ? "Menyimpan..." : "Simpan Email"}
                </Button>
              </form>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-h3 text-white mb-4">Pendaftaran saya</h2>

          {loadingApplications ? (
            <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-8 text-center">
              <Loader />
            </div>
          ) : applications.length === 0 ? (
            <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-white/50 mx-auto mb-4" />
              <p className="text-m3 text-white/70 mb-4">
                Kamu belum memiliki aplikasi pendaftaran
              </p>
              <Link href="/event">
                <Button className="bg-primary-200 hover:bg-primary-300 text-white">
                  Lihat Event Tersedia
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const eventTypeLabel = getEventTypeLabel(app.typeOfEvent);
                const lastEditedAt = app.lastEditedAt || app.submittedAt;
                const formPath = `/${app.eventCode || app.eventId}/form`;

                return (
                  <div
                    key={app.id}
                    className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6 hover:border-primary-200 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {app.eventLogo && (
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={app.eventLogo}
                            alt={app.eventTitle}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                      )}

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-h4 text-white mb-1">
                            {app.eventTitle}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {eventTypeLabel && (
                              <span className="text-p6 px-2 py-1 bg-primary-200/20 text-primary-100 rounded">
                                {eventTypeLabel}
                              </span>
                            )}
                            {app.eventLevel && (
                              <span className="text-p6 px-2 py-1 bg-secondary-200/20 text-secondary-100 rounded">
                                {app.eventLevel}
                              </span>
                            )}
                            <span
                              className={`text-p6 px-2 py-1 rounded ${getStatusColor(
                                app.status
                              )}`}
                            >
                              {getStatusLabel(app.status)}
                            </span>
                          </div>
                        </div>

                        {app.selectedDivisions.length > 0 && (
                          <div>
                            <p className="text-p6 text-white/70 mb-1">
                              Divisi yang Dipilih:
                            </p>
                            <div className="space-y-1">
                              {app.selectedDivisions.map((div) => (
                                <div
                                  key={div.divisionId}
                                  className="text-p6 text-white flex items-center gap-2"
                                >
                                  <span className="w-5 h-5 rounded-full bg-primary-200/20 text-primary-100 flex items-center justify-center text-xs">
                                    {div.choiceOrder}
                                  </span>
                                  <span>{div.divisionName}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-4 text-p6 text-white/50">
                          {isApplicationSubmitted(app) && app.submittedAt && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>
                                Disubmit: {new Date(app.submittedAt).toLocaleDateString("id-ID")}
                              </span>
                            </div>
                          )}
                          {lastEditedAt && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                Update terakhir: {new Date(lastEditedAt).toLocaleDateString("id-ID")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Link href={formPath}>
                          <Button
                            className="bg-primary-200/10 hover:bg-primary-200/20 border border-primary-300 text-white"
                            variant="ghost"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {isApplicationSubmitted(app) ? "Lihat Detail" : "Lanjutkan"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary-200/20 p-2 rounded-lg">
                  <User className="w-5 h-5 text-primary-100" />
                </div>
                <h2 className="text-h3 text-white">Informasi Profil</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <IdCard className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-m4 text-white">Nama Lengkap</p>
                      <p className="text-m3 text-white font-medium">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-m4 text-white">Email</p>
                      <p className="text-m3 text-white font-medium">
                        {user.email || "Belum diisi"}
                      </p>
                    </div>
                  </div>

                  {user.npm && (
                    <div className="flex items-start gap-3">
                      <Crown className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-m4 text-white">NPM</p>
                        <p className="text-m3 text-white font-medium">{user.npm}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {user.faculty && (
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-m4 text-white">Fakultas</p>
                        <p className="text-m3 text-white font-medium">{user.faculty}</p>
                      </div>
                    </div>
                  )}

                  {user.studyProgram && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-m4 text-white">Program Studi</p>
                        <p className="text-m3 text-white font-medium">{user.studyProgram}</p>
                      </div>
                    </div>
                  )}

                  {user.year && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-m4 text-white">Angkatan</p>
                        <p className="text-m3 text-white font-medium">{user.year}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
              <h2 className="text-h4 text-white mb-4">Menu Cepat</h2>
              <div className="space-y-3">
                <Link href="/event">
                  <Button
                    className="w-full justify-start bg-primary-200/10 hover:bg-primary-200/20 border border-primary-300/50 text-white"
                    variant="ghost"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Event Tersedia
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
