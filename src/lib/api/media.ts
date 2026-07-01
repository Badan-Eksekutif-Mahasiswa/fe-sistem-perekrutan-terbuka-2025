import { BACKEND_URL } from "@/lib/api/config";

type PresignUploadResponse = {
  success: boolean;
  message: string | null;
  data: {
    objectKey: string;
    publicUrl: string;
    uploadUrl: string;
    expiresIn: number;
  } | null;
};

async function readError(response: Response, fallback: string) {
  try {
    const result = await response.json() as Partial<PresignUploadResponse>;
    return result.message || fallback;
  } catch {
    return fallback;
  }
}

export async function uploadMediaFile(file: File, folder = "uploads") {
  const presignResponse = await fetch(`${BACKEND_URL}/media/presign-upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type || "application/octet-stream",
      size: file.size,
      folder,
    }),
  });

  if (!presignResponse.ok) {
    throw new Error(
      await readError(presignResponse, "Gagal menyiapkan upload file.")
    );
  }

  const presignResult = await presignResponse.json() as PresignUploadResponse;
  if (!presignResult.success || !presignResult.data) {
    throw new Error(presignResult.message || "Gagal menyiapkan upload file.");
  }

  const uploadResponse = await fetch(presignResult.data.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Gagal mengunggah file ke penyimpanan media.");
  }

  return presignResult.data.publicUrl;
}
