"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Loader from "@/components/elements/Loader";
import {
  User,
  FileText,
  Settings,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  GraduationCap,
  IdCard,
  MapPin,
  Crown,
} from "lucide-react";
import Image from "next/image";

const DashboardPage = () => {
  const { user, isLoading } = useRequireAuth();

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
                <p className="text-m4 text-white">Total Aplikasi</p>
                <p className="text-h2 text-white font-bold">0</p>
              </div>
              <div className="bg-primary-200/20 p-3 rounded-full">
                <FileText className="w-6 h-6 text-primary-100" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-m4 text-white">Dalam Review</p>
                <p className="text-h2 text-white font-bold">0</p>
              </div>
              <div className="bg-secondary-200/20 p-3 rounded-full">
                <Clock className="w-6 h-6 text-secondary-100" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-m4 text-white">Diterima</p>
                <p className="text-h2 text-white font-bold">0</p>
              </div>
              <div className="bg-green-200/20 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-200" />
              </div>
            </div>
          </div>
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
                        <p className="text-m4 text-white">
                          Program Studi
                        </p>
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

              {/* Email Verification Status */}
              <div className="mt-6 pt-4 border-t border-primary-300/30">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.emailVerified ? "bg-green-300" : "bg-red-300"
                    }`}
                  ></div>
                  <p className="text-p5 text-white">
                    Email{" "}
                    {user.emailVerified
                      ? "Terverifikasi"
                      : "Belum Terverifikasi"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
              <h2 className="text-h4 text-white mb-4">Menu Cepat</h2>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start bg-primary-200/10 hover:bg-primary-200/20 border border-primary-300/50 text-white"
                  variant="ghost"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Lihat Lowongan Tersedia
                </Button>
                <Button
                  className="w-full justify-start bg-primary-200/10 hover:bg-primary-200/20 border border-primary-300/50 text-white"
                  variant="ghost"
                >
                  <User className="w-4 h-4 mr-2" />
                  Aplikasi Saya
                </Button>
                <Button
                  className="w-full justify-start bg-primary-200/10 hover:bg-primary-200/20 border border-primary-300/50 text-white"
                  variant="ghost"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan Profil
                </Button>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-gradient-card-glass backdrop-blur-sm border border-primary-300 rounded-xl p-6">
              <h2 className="text-h4 text-white mb-4">Informasi Akun</h2>
              <div className="space-y-3 text-p6">
                <div className="flex justify-between">
                  <span className="text-white">User ID:</span>
                  <span className="text-white font-mono text-right flex-1 ml-2 break-all">
                    {user.id.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Dibuat:</span>
                  <span className="text-white">
                    {new Date(user.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Terakhir Update:</span>
                  <span className="text-white">
                    {new Date(user.updatedAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
