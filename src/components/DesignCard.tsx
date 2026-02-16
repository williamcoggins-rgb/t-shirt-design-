"use client";

import { GeneratedDesign } from "@/types";
import { DESIGN_PRESETS } from "@/lib/presets";

interface DesignCardProps {
  design: GeneratedDesign;
  onClick: (design: GeneratedDesign) => void;
}

export default function DesignCard({ design, onClick }: DesignCardProps) {
  const preset = DESIGN_PRESETS.find((p) => p.category === design.category);
  const timeAgo = getTimeAgo(design.createdAt);

  return (
    <div
      className="design-grid-item group fade-in"
      onClick={() => onClick(design)}
    >
      {/* Image */}
      <div className="aspect-square relative bg-[var(--bg-tertiary)]">
        <img
          src={design.imageUrl}
          alt={design.prompt}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
          <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-xs line-clamp-2 font-medium">
              {design.prompt.length > 100
                ? design.prompt.slice(0, 100) + "..."
                : design.prompt}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 right-2 flex gap-1.5">
          {design.hasTransparentBg && (
            <span className="px-2 py-0.5 rounded-full bg-green-500/90 text-white text-[10px] font-medium backdrop-blur-sm">
              No BG
            </span>
          )}
          {design.isUpscaled && (
            <span className="px-2 py-0.5 rounded-full bg-purple-500/90 text-white text-[10px] font-medium backdrop-blur-sm">
              HD
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            <span>{preset?.icon}</span>
            {preset?.name}
          </span>
          <span className="text-xs text-[var(--text-muted)]">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
