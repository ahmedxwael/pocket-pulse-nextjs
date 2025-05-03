import { toast } from "sonner";

type ToastActions =
  | "normal"
  | "action"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | "default";

type ToastOptions = {
  action?: {
    type: ToastActions;
    label: string;
    onClick: () => void;
  };
  description?: string;
};

export function toastSuccess(message: string, options?: ToastOptions) {
  toast.success(message, {
    ...options,
    classNames: {
      toast: "bg-green-500 text-white",
    },
  });
}

export function toastError(message: string, options?: ToastOptions) {
  toast.error(message, {
    ...options,
    classNames: {
      toast: "bg-red-500 text-white",
    },
  });
}

export function toastWarning(message: string, options?: ToastOptions) {
  toast.warning(message, {
    ...options,
    classNames: {
      toast: "bg-yellow-500 text-white",
    },
  });
}

export function toastInfo(message: string, options?: ToastOptions) {
  toast.info(message, {
    ...options,
    classNames: {
      toast: "bg-blue-500 text-white",
    },
  });
}

export function toastLoading(message: string, options?: ToastOptions) {
  toast.loading(message, {
    ...options,
    classNames: {
      toast: "bg-gray-500 text-white",
    },
  });
}
