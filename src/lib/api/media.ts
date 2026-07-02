import { isSupabaseConfigured, supabase, supabaseBucket } from "@/lib/supabaseClient";

function sanitizeFolder(folder?: string) {
  return (folder || "uploads")
    .split("/")
    .map((segment) => segment.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"))
    .filter(Boolean)
    .join("/") || "uploads";
}

function sanitizeExtension(fileName: string, contentType: string) {
  const fromName = fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (fromName) return fromName;

  const subtype = contentType.split("/")[1]?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return subtype || "bin";
}

function createObjectPath(file: File, folder?: string) {
  const safeFolder = sanitizeFolder(folder);
  const ext = sanitizeExtension(file.name, file.type || "application/octet-stream");
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${safeFolder}/${id}.${ext}`;
}

export async function uploadMediaFile(file: File, folder = "uploads") {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Upload file belum dikonfigurasi. Pastikan variabel Supabase sudah tersedia."
    );
  }

  const objectPath = createObjectPath(file, folder);
  const { error } = await supabase.storage.from(supabaseBucket).upload(objectPath, file, {
    cacheControl: "3600",
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(error.message || "Gagal mengunggah file ke Supabase Storage.");
  }

  const { data } = supabase.storage.from(supabaseBucket).getPublicUrl(objectPath);
  if (!data.publicUrl) {
    throw new Error("Gagal mengambil URL publik file yang diunggah.");
  }

  return data.publicUrl;
}
