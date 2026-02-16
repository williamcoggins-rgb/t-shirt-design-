"use client";

import { DesignCategory } from "@/types";
import { DESIGN_PRESETS } from "@/lib/presets";

interface SidebarProps {
  activeCategory: DesignCategory | "all";
  onCategoryChange: (category: DesignCategory | "all") => void;
  designCount: number;
  activeView: "create" | "gallery";
  onViewChange: (view: "create" | "gallery") => void;
}

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  designCount,
  activeView,
  onViewChange,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
            TS
          </div>
          <div>
            <h1 className="font-bold text-sm text-[var(--text-primary)]">
              T-Shirt Studio
            </h1>
            <p className="text-xs text-[var(--text-muted)]">AI Design Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-3">
        <button
          onClick={() => onViewChange("create")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeView === "create"
              ? "bg-brand-500/10 text-brand-400"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Design
        </button>
        <button
          onClick={() => onViewChange("gallery")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mt-1 ${
            activeView === "gallery"
              ? "bg-brand-500/10 text-brand-400"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Gallery
          {designCount > 0 && (
            <span className="ml-auto text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)] px-2 py-0.5 rounded-full">
              {designCount}
            </span>
          )}
        </button>
      </div>

      {/* Categories */}
      <div className="px-3 mt-2">
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
          Categories
        </p>
        <button
          onClick={() => onCategoryChange("all")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            activeCategory === "all"
              ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <span className="text-base">📋</span>
          All Designs
        </button>
        {DESIGN_PRESETS.map((preset) => (
          <button
            key={preset.category}
            onClick={() => onCategoryChange(preset.category)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeCategory === preset.category
                ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="text-base">{preset.icon}</span>
            {preset.name}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Powered by Stability AI
        </div>
      </div>
    </aside>
  );
}
