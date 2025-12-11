"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // close on backdrop click
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-2xl mx-4 rounded-xl bg-white shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          aria-label="Sulje"
        >
          ✕
        </button>

        <div className="
    bg-white
    rounded-2xl
    shadow-2xl
    p-6
    w-full max-w-2xl
    mx-auto
    max-h-[90vh]
    overflow-y-auto
"
             id="modal-scroll"
        >
          {children}
        </div>

      </div>
    </div>
  );

  // Render to body to avoid stacking/overflow issues
  return typeof window !== "undefined" ? createPortal(content, document.body) : null;
}
