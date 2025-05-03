"use client";

import { loadingOverlayStore } from "@/design-system/stores";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export function LoadingOverlay() {
  const opened = loadingOverlayStore((state) => state.loading);

  useEffect(() => {
    if (!opened || !window || !document) {
      return;
    }

    const body = document.body;
    body.classList.add("overflow-hidden");
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [opened]);

  if (!opened) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-accent/20 flex items-center justify-center p-4 backdrop-blur-sm">
      <Loader size={32} className="animate-spin" />
    </div>
  );
}
