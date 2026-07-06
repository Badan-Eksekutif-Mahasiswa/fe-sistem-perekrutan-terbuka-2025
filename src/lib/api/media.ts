import { BACKEND_URL } from "@/lib/api/config";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

export async function uploadMediaFile(file: File, folder = "uploads"): Promise<string> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ukuran file melebihi batas 5 MB.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Hanya file JPEG, PNG, WebP, dan GIF yang diizinkan.");
  }

  const urlRes = await fetch(`${BACKEND_URL}/admin/media/upload-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
      folder,
    }),
  });

  const urlData = (await urlRes.json()) as ApiResponse<{
    signedUrl: string;
    publicUrl: string;
  }>;

  if (!urlRes.ok || !urlData.success) {
    throw new Error(urlData.message || "Gagal mendapatkan URL upload.");
  }

  const { signedUrl, publicUrl } = urlData.data;

  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Gagal mengunggah file ke storage.");
  }

  return publicUrl;
}

export async function deleteMediaFile(url: string): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/admin/media/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ url }),
  });

  let result: Partial<ApiResponse<unknown>> = {};
  try {
    result = await response.json();
  } catch {
    result = {};
  }

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Gagal menghapus file dari storage.");
  }
}
