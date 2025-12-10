"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { registrationApi } from "@/lib/api/registration";
import type { MyApplication, SelectionStage } from "@/types/registration";
import Link from "next/link";

const DashboardPage = () => {
  const { user, isLoading } = useRequireAuth();
  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);

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

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return null; // useRequireAuth will handle redirect
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const getStageLabel = (stage: SelectionStage | null) => {
    if (!stage) return "Belum Diproses";
    const stageLabels: Record<SelectionStage, string> = {
      DOCUMENT_SCREENING: "Seleksi Berkas",
      INTERVIEW: "Wawancara",
      ACCEPTED: "Diterima",
      REJECTED: "Ditolak",
    };
    return stageLabels[stage];
  };

  const getStageColor = (stage: SelectionStage | null) => {
    if (!stage) return "bg-gray-500/20 text-gray-300";
    const colors: Record<SelectionStage, string> = {
      DOCUMENT_SCREENING: "bg-secondary-200/20 text-secondary-100",
      INTERVIEW: "bg-primary-200/20 text-primary-100",
      ACCEPTED: "bg-green-500/20 text-green-300",
      REJECTED: "bg-red-500/20 text-red-300",
    };
    return colors[stage];
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto ">
        {/* Header Section */}
        <div className="mb-8 ">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/logo-clean.webp"
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

        {/* Stats Cards */}
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
                  {applications.filter((app) => app.isSubmitted).length}
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
                  {applications.filter((app) => !app.isSubmitted).length}
                </p>
              </div>
              <div className="bg-yellow-200/20 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="mb-8">
          <h2 className="text-h3 text-white mb-4">List aplikasi</h2>

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
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6 hover:border-primary-200 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Event Logo */}
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

                    {/* Event Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-h4 text-white mb-1">
                          {app.eventTitle}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-p6 px-2 py-1 bg-primary-200/20 text-primary-100 rounded">
                            {app.typeOfEvent}
                          </span>
                          <span className="text-p6 px-2 py-1 bg-secondary-200/20 text-secondary-100 rounded">
                            {app.eventLevel}
                          </span>
                          <span
                            className={`text-p6 px-2 py-1 rounded ${
                              app.isSubmitted
                                ? "bg-green-500/20 text-green-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {app.isSubmitted ? "Submitted" : "Draft"}
                          </span>
                          {app.stage && (
                            <span
                              className={`text-p6 px-2 py-1 rounded ${getStageColor(
                                app.stage
                              )}`}
                            >
                              {getStageLabel(app.stage)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Divisions */}
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
                                  {div.priority}
                                </span>
                                <span>{div.divisionName}</span>
                                {div.stage && (
                                  <span
                                    className={`text-p7 px-2 py-0.5 rounded ${getStageColor(
                                      div.stage
                                    )}`}
                                  >
                                    {getStageLabel(div.stage)}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="flex flex-wrap gap-4 text-p6 text-white/50">
                        {app.isSubmitted && app.submittedAt && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>
                              Disubmit:{" "}
                              {new Date(app.submittedAt).toLocaleDateString(
                                "id-ID"
                              )}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            Update terakhir:{" "}
                            {new Date(app.lastEditedAt).toLocaleDateString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center">
                      <Link href={`/${app.eventId}/form`}>
                        <Button
                          className="bg-primary-200/10 hover:bg-primary-200/20 border border-primary-300 text-white"
                          variant="ghost"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {app.isSubmitted ? "Lihat Detail" : "Lanjutkan"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
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
                      <p className="text-m3 text-white font-medium">
                        {user.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-m4 text-white">Email</p>
                      <p className="text-m3 text-white font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {user.npm && (
                    <div className="flex items-start gap-3">
                      <Crown className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-m4 text-white">NPM</p>
                        <p className="text-m3 text-white font-medium">
                          {user.npm}
                        </p>
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
                        <p className="text-m3 text-white font-medium">
                          {user.faculty}
                        </p>
                      </div>
                    </div>
                  )}

                  {user.studyProgram && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-m4 text-white">Program Studi</p>
                        <p className="text-m3 text-white font-medium">
                          {user.studyProgram}
                        </p>
                      </div>
                    </div>
                  )}

                  {user.year && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-m4 text-white">Angkatan</p>
                        <p className="text-m3 text-white font-medium">
                          {user.year}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
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
