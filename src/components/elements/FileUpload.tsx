"use client";

import React, { useState } from "react";
import { uploadMediaFile } from "@/lib/api/media";
import { Loader2, UploadCloud, CheckCircle2, X } from "lucide-react";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  accept?: string;
  folder?: string;
}

function isValidUploadUrl(value: string) {
  if (value.startsWith("/")) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isImageUrl(value: string) {
  return /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i.test(value);
}

export default function FileUpload({
  value,
  onChange,
  label,
  placeholder = "Upload gambar",
  accept = "image/*",
  folder = "uploads",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadDisabled = uploading;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) return;

      if (accept.includes("image") && !file.type.startsWith("image/")) {
        throw new Error("File harus berupa gambar (JPG, PNG, WEBP, dll)." );
      }

      if (file.size > 3 * 1024 * 1024) {
        throw new Error(`Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)} MB). Maksimal 3 MB.`);
      }

      const uploadedUrl = await uploadMediaFile(file, folder);
      onChange(uploadedUrl);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengunggah file.";
      console.error("Upload error:", message);
      setError(message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const clearFile = () => {
    onChange("");
  };

  const handleManualUrl = (rawUrl: string) => {
    const url = rawUrl.trim();
    if (!url) return;

    if (!isValidUploadUrl(url)) {
      setError("URL gambar tidak valid. Gunakan URL lengkap yang diawali https://");
      return;
    }

    setError(null);
    onChange(url);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-bold">{label}</label>}

      {value ? (
        <div className="relative border border-[#8F344A] bg-neutral-50 rounded-md p-2 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {isValidUploadUrl(value) && (isImageUrl(value) || accept.includes("image")) ? (
              <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 border border-neutral-200">
                <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
              </div>
            ) : (
              <CheckCircle2 className="size-6 text-green-500 shrink-0" />
            )}
            {isValidUploadUrl(value) ? (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#8F344A] truncate">
                  File berhasil tersimpan
                </p>
                <p className="text-xs text-neutral-500">
                  URL file disimpan otomatis.
                </p>
              </div>
            ) : (
              <span className="text-sm text-red-500 truncate">
                URL tersimpan tidak valid. Hapus lalu masukkan URL yang diawali https://
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
            title="Hapus"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label className="relative flex items-center justify-center w-full min-h-[100px] border-2 border-dashed border-[#8F344A] rounded-md transition-colors cursor-pointer hover:bg-blue-50/50 group">
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleUpload}
            disabled={uploadDisabled}
          />
          <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            {uploading ? (
              <>
                <Loader2 className="size-8 text-[#8F344A] animate-spin" />
                <span className="text-sm text-neutral-600">Mengunggah...</span>
              </>
            ) : (
              <>
                <UploadCloud className="size-8 text-neutral-400 group-hover:text-[#8F344A] transition-colors" />
                <span className="text-sm text-neutral-500">
                  <span className="font-semibold text-[#8F344A]">Klik untuk {placeholder}</span> atau seret file ke sini
                </span>
              </>
            )}
          </div>
        </label>
      )}

      {!value && (
        <div className="flex gap-2 items-center mt-1">
          <input
            type="url"
            placeholder="Atau masukkan URL gambar..."
            className="border border-[#8F344A] bg-white p-2 rounded-md text-sm text-neutral-900 placeholder:text-neutral-400 flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleManualUrl(e.currentTarget.value);
              }
            }}
            onBlur={(e) => {
              handleManualUrl(e.target.value);
            }}
          />
        </div>
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
