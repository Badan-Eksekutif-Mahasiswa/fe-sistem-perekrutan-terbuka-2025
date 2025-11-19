import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Info, X } from "lucide-react";
import { useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "loading";

export const useToast = () => {
  const show = useCallback(
    (
      type: ToastType,
      message?: string,
      opts?: { id?: string; duration?: number }
    ): string => {
      const { id, duration } = opts || {};

      const toastId = id ?? crypto.randomUUID(); // Auto generate jika tidak ada

      const base = (
        <div className="p-[1px] bg-primary-500 rounded-xl max-w-sm w-fit min-w-80">
          <div
            className={`w-full h-full rounded-xl border ${
              type === "info"
                ? "border-blue-200"
                : type === "success"
                ? "border-green-200"
                : type === "warning"
                ? "border-yellow-200"
                : type === "error"
                ? "border-red-200"
                : "border-green-200"
            }`}
          >
            <div
              className={`relative w-full h-full flex items-center gap-3 p-4 rounded-xl shadow-lg text-white glass transition-all overflow-hidden ${
                type === "info"
                  ? "bg-gradient-to-r from-blue-100/30 to-blue-300/30"
                  : type === "success"
                  ? "bg-gradient-to-r from-green-100/30 to-green-300/30"
                  : type === "warning"
                  ? "bg-gradient-to-r from-yellow-100/30 to-yellow-300/30"
                  : type === "error"
                  ? "bg-gradient-to-r from-red-100/30 to-red-300/30"
                  : "bg-gradient-to-r from-green-100/30 to-green-300/30"
              }`}
            >
              <div className="relative z-10 flex items-center gap-2">
                {type === "info" && <Info className="w-5 h-5 shrink-0" />}
                {type === "success" && (
                  <CheckCircle className="w-5 h-5 shrink-0" />
                )}
                {type === "warning" && <Info className="w-5 h-5 shrink-0" />}
                {type === "error" && <XCircle className="w-5 h-5 shrink-0" />}
                {type === "loading" && (
                  <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
                )}
                <div className="flex flex-col gap-1 font-josefin-sans font-semibold flex-1 min-w-0">
                  <h1 className="text-m3 max-md:text-bodyLarge-mobile truncate">
                    {
                      {
                        info: "Info",
                        success: "Success",
                        warning: "Warning",
                        error: "Error!",
                        loading: "Loading...",
                      }[type]
                    }
                  </h1>
                  {message && (
                    <span className="text-p6 line-clamp-2">{message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      toast.custom(() => base, {
        id: toastId,
        duration: type === "loading" ? Infinity : duration || 3000,
        className: "max-w-sm",
        style: {
          maxWidth: "24rem",
          width: "fit-content",
        },
      });

      return toastId;
    },
    []
  );

  const dismiss = useCallback((id?: string) => {
    toast.dismiss(id);
  }, []);

  return {
    show,
    dismiss,
  };
};
