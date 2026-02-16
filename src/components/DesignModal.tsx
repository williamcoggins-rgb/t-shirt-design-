"use client";

import { useState } from "react";
import { GeneratedDesign } from "@/types";
import { DESIGN_PRESETS } from "@/lib/presets";

interface DesignModalProps {
  design: GeneratedDesign;
  imageBase64: string | null;
  onClose: () => void;
  onRemoveBackground: (designId: string, imageBase64: string) => Promise<void>;
  onUpscale: (designId: string, imageBase64: string) => Promise<void>;
  onDelete?: (designId: string) => Promise<void>;
}

export default function DesignModal({
  design,
  imageBase64,
  onClose,
  onRemoveBackground,
  onUpscale,
  onDelete,
}: DesignModalProps) {
  const [processing, setProcessing] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const preset = DESIGN_PRESETS.find((p) => p.category === design.category);

  const handleRemoveBg = async () => {
    if (!imageBase64) return;
    setProcessing("remove-bg");
    try {
      await onRemoveBackground(design.id, imageBase64);
    } finally {
      setProcessing(null);
    }
  };

  const handleUpscale = async () => {
    if (!imageBase64) return;
    setProcessing("upscale");
    try {
      await onUpscale(design.id, imageBase64);
    } finally {
      setProcessing(null);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = design.imageUrl;
    link.download = `${design.id}.png`;
    link.click();
  };

  const handleDownloadBase64 = () => {
    if (!imageBase64) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageBase64}`;
    link.download = `${design.id}-full.png`;
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-secondary)] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image side */}
        <div className="flex-1 bg-[var(--bg-tertiary)] flex items-center justify-center p-4 min-h-[300px]">
          <img
            src={design.imageUrl}
            alt={design.prompt}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>

        {/* Details side */}
        <div className="w-full md:w-80 p-6 flex flex-col overflow-y-auto">
          {/* Close */}
          <button
            onClick={onClose}
            className="self-end p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">{preset?.icon}</span>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {preset?.name}
            </span>
            <span className="text-xs text-[var(--text-muted)] ml-auto">
              {design.model}
            </span>
          </div>

          {/* Prompt */}
          <div className="mb-5">
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
              Prompt
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {design.prompt}
            </p>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                design.hasTransparentBg
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border)]"
              }`}
            >
              {design.hasTransparentBg ? "Transparent BG" : "Has Background"}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                design.isUpscaled
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border)]"
              }`}
            >
              {design.isUpscaled ? "Upscaled HD" : "Standard Resolution"}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-2 mt-auto">
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Actions
            </p>

            {!design.hasTransparentBg && imageBase64 && (
              <button
                onClick={handleRemoveBg}
                disabled={processing !== null}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                {processing === "remove-bg" ? (
                  <>
                    <svg className="w-4 h-4 spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Removing Background...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                    Remove Background
                  </>
                )}
              </button>
            )}

            {!design.isUpscaled && imageBase64 && (
              <button
                onClick={handleUpscale}
                disabled={processing !== null}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                {processing === "upscale" ? (
                  <>
                    <svg className="w-4 h-4 spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Upscaling to HD...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                    Upscale to HD (Print-Ready)
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleDownload}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PNG
            </button>

            {imageBase64 && (
              <button
                onClick={handleDownloadBase64}
                className="btn-ghost w-full flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Full Resolution
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => {
                  if (!confirmDelete) {
                    setConfirmDelete(true);
                    return;
                  }
                  setProcessing("delete");
                  onDelete(design.id).finally(() => {
                    setProcessing(null);
                    onClose();
                  });
                }}
                disabled={processing !== null}
                className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors mt-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {processing === "delete"
                  ? "Deleting..."
                  : confirmDelete
                  ? "Click again to confirm delete"
                  : "Delete Design"}
              </button>
            )}
          </div>

          {/* Metadata */}
          <div className="mt-5 pt-4 border-t border-[var(--border)]">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[var(--text-muted)]">Seed:</span>{" "}
                <span className="text-[var(--text-secondary)]">{design.seed || "Random"}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Style:</span>{" "}
                <span className="text-[var(--text-secondary)]">{design.style || "Default"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[var(--text-muted)]">Created:</span>{" "}
                <span className="text-[var(--text-secondary)]">
                  {new Date(design.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
