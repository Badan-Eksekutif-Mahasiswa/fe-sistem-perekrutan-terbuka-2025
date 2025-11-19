import * as React from "react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

import { TriangleAlert, UploadCloud } from "lucide-react"; // Menambahkan ikon

// Definisikan props untuk FileInput
export interface FileInputProps {
  label?: string;
  error?: string;
  className?: string; // Untuk styling div terluar (wrapper)
  name?: string;
  multiple?: boolean;
  accept?: string; // Misal: "image/*", ".pdf", "video/mp4"
  files: File[] | null;
  onFilesChange: (files: File[] | null) => void; // Handler untuk mengirim file ke parent
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    { className, label, error, name, multiple, accept, files, onFilesChange },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    // const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

    // Ref ini untuk input file yang kita sembunyikan
    const inputRef = useRef<HTMLInputElement>(null);

    // Menggabungkan ref yang di-forward dengan ref internal jika diperlukan
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Fungsi pusat untuk menangani file
    const handleFiles = (files: FileList | null) => {
      console.log("handleFiles called with files:", files);
      if (files && files.length > 0) {
        console.log("Files received:", files.length, "files");
        const fileArray = Array.from(files);
        // setSelectedFiles(fileArray);
        onFilesChange(fileArray); // Kirim file ke komponen parent
      } else {
        console.log("No files or empty file list");
        // setSelectedFiles(null);
        onFilesChange(null);
      }
      // Reset input file untuk memungkinkan upload file yang sama berulang
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    // Handler untuk event drag-and-drop
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Drag over detected");
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Drag leave detected");
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Drop detected");
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    };

    // Handler untuk klik
    const handleClick = () => {
      console.log("Click detected, opening file dialog");
      inputRef.current?.click();
    };

    // Handler untuk input file yang tersembunyi
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Input change detected");
      handleFiles(e.target.files);
    };

    // Menampilkan nama file
    const getFileNames = () => {
      if (!files || files.length === 0) {
        return null;
      }
      if (files.length === 1) {
        return files[0].name;
      }
      return `${files.length} files selected`;
    };

    return (
      <div className={cn("space-y-1", className)}>
        {/* Menggunakan komponen Label Anda */}

        {/* Ini adalah dropzone yang terlihat */}
        <div
          className={` p-4 rounded-xl
            ${isDragging ? "bg-primary-200/30" : "bg-neutral-50"}
            `}
        >
          <div
            className={cn(
              "relative flex w-full flex-col items-center justify-center font-jakarta rounded-xl border-2 border-primary-200 border-dashed p-8 transition-all duration-300 cursor-pointer",
              // Styling dari komponen Input Anda
              error && "border-red-400 text-red-400",
              // Styling saat di-drag
              isDragging ? " border-primary-100" : " hover:bg-neutral-100",
              // Styling saat ada file
              files
                ? "border-primary-300 text-primary-300 hover:border-primary-400"
                : "border-neutral-300 text-neutral-1000 hover:border-neutral-400"
            )}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Input file asli yang disembunyikan */}
            <input
              type="file"
              ref={inputRef}
              name={name}
              multiple={multiple}
              accept={accept}
              onChange={onInputChange}
              className="hidden" // SANGAT PENTING
            />

            {/* Konten Dropzone */}
            <div className="text-center space-y-2">
              <img
                src={"/logo-clean.webp"}
                alt="logo-bem"
                className={`mx-auto w-32 h-32 ${!files && "grayscale"}`}
              />
              <div className="mt-2 text-p5">
                {getFileNames() ? (
                  <span className="text-h5 ">File telah terupload!</span>
                ) : (
                  <>
                    <span className="text-h5">
                      Drag atau upload file kamu disini!
                    </span>{" "}
                  </>
                )}
              </div>
              <p className="text-m4 ">
                {accept
                  ? `Tipe file: ${accept.replace(/,/g, ", ")}`
                  : "File apapun"}
              </p>
            </div>
          </div>
        </div>

        {/* Menampilkan error, sama seperti komponen Input Anda */}
        {error && (
          <div className="flex gap-2 items-center text-red-400">
            <TriangleAlert className="w-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
FileInput.displayName = "FileInput";

export default FileInput;
