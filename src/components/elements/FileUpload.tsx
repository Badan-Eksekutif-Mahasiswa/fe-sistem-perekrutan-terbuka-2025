"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, UploadCloud, CheckCircle2, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  bucketName?: string;
  accept?: string;
}

export default function FileUpload({
  value,
  onChange,
  label,
  placeholder = "Upload gambar",
  bucketName = "spt-media",
  accept = "image/*",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) return;

      // Ensure file is an image if accept="image/*"
      if (accept.includes("image") && !file.type.startsWith("image/")) {
        throw new Error("File harus berupa gambar (JPG, PNG, dll).");
      }

      // Generate unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (data?.publicUrl) {
        onChange(data.publicUrl);
      }
    } catch (err: any) {
      console.error("Upload error:", err.message);
      setError(err.message || "Terjadi kesalahan saat mengunggah file.");
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-bold">{label}</label>}

      {value ? (
        <div className="relative border border-[#475CA3] bg-neutral-50 rounded-md p-2 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {value.match(/\.(jpeg|jpg|gif|png|webp)/i) || accept.includes("image") ? (
              <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 border border-neutral-200">
                <Image src={value} alt="Uploaded" fill className="object-cover" />
              </div>
            ) : (
              <CheckCircle2 className="size-6 text-green-500 shrink-0" />
            )}
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#475CA3] truncate hover:underline"
            >
              {value}
            </a>
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
        <label className="relative flex items-center justify-center w-full min-h-[100px] border-2 border-dashed border-[#475CA3] rounded-md hover:bg-blue-50/50 transition-colors cursor-pointer group">
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
          />
          <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            {uploading ? (
              <>
                <Loader2 className="size-8 text-[#475CA3] animate-spin" />
                <span className="text-sm text-neutral-600">Mengunggah...</span>
              </>
            ) : (
              <>
                <UploadCloud className="size-8 text-neutral-400 group-hover:text-[#475CA3] transition-colors" />
                <span className="text-sm text-neutral-500">
                  <span className="font-semibold text-[#475CA3]">Klik untuk {placeholder}</span> atau seret file ke sini
                </span>
              </>
            )}
          </div>
        </label>
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
