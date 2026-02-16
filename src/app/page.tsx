"use client";

import { useState, useEffect, useCallback } from "react";
import { DesignCategory, GeneratedDesign, GenerationModel, StylePreset, AspectRatio } from "@/types";
import Sidebar from "@/components/Sidebar";
import PromptBar from "@/components/PromptBar";
import DesignCard from "@/components/DesignCard";
import DesignModal from "@/components/DesignModal";
import GeneratingOverlay from "@/components/GeneratingOverlay";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [activeView, setActiveView] = useState<"create" | "gallery">("create");
  const [activeCategory, setActiveCategory] = useState<DesignCategory | "all">("all");
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<GeneratedDesign | null>(null);
  const [currentImageBase64, setCurrentImageBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load designs on mount
  useEffect(() => {
    loadDesigns();
  }, []);

  const loadDesigns = async () => {
    try {
      const res = await fetch("/api/designs");
      if (res.ok) {
        const data = await res.json();
        setDesigns(data.designs || []);
      }
    } catch {
      // Ignore load errors on initial load
    }
  };

  const handleGenerate = useCallback(
    async (params: {
      prompt: string;
      category: DesignCategory;
      model: GenerationModel;
      style?: StylePreset;
      aspectRatio: AspectRatio;
      negativePrompt?: string;
    }) => {
      setIsGenerating(true);
      setError(null);
      setActiveView("create");

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Generation failed");
        }

        setDesigns((prev) => [data.design, ...prev]);
        setCurrentImageBase64(data.imageBase64);
        setSelectedDesign(data.design);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  const handleRemoveBackground = async (designId: string, imageBase64: string) => {
    try {
      const res = await fetch("/api/remove-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designId, imageBase64 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Update designs list
      setDesigns((prev) =>
        prev.map((d) => (d.id === designId ? data.design : d))
      );
      setSelectedDesign(data.design);
      setCurrentImageBase64(data.imageBase64);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to remove background";
      setError(message);
    }
  };

  const handleUpscale = async (designId: string, imageBase64: string) => {
    try {
      const res = await fetch("/api/upscale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designId, imageBase64 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setDesigns((prev) =>
        prev.map((d) => (d.id === designId ? data.design : d))
      );
      setSelectedDesign(data.design);
      setCurrentImageBase64(data.imageBase64);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upscale";
      setError(message);
    }
  };

  const filteredDesigns =
    activeCategory === "all"
      ? designs
      : designs.filter((d) => d.category === activeCategory);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] md:hidden"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 fixed md:relative z-30 h-full`}
      >
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          designCount={designs.length}
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between shrink-0">
          <div className="ml-10 md:ml-0">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {activeView === "create" ? "Create Design" : "Design Gallery"}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {activeView === "create"
                ? "Describe your concept and generate print-ready designs"
                : `${filteredDesigns.length} design${filteredDesigns.length !== 1 ? "s" : ""} in your collection`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {designs.length > 0 && (
              <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                {designs.length} total designs
              </span>
            )}
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          {activeView === "create" ? (
            <div className="max-w-4xl mx-auto px-6 py-6">
              {/* Prompt bar */}
              <PromptBar
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                selectedCategory={activeCategory}
              />

              {/* Error message */}
              {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm fade-in">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <div>
                      <p className="font-medium">Generation Error</p>
                      <p className="mt-1 text-red-400/80">{error}</p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="ml-auto shrink-0 p-1 hover:bg-red-500/10 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Generating state */}
              {isGenerating && <GeneratingOverlay />}

              {/* Recent designs in create view */}
              {!isGenerating && designs.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
                    Recent Designs
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {designs.slice(0, 8).map((design) => (
                      <DesignCard
                        key={design.id}
                        design={design}
                        onClick={(d) => {
                          setSelectedDesign(d);
                          setCurrentImageBase64(null);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!isGenerating && designs.length === 0 && (
                <EmptyState view="create" />
              )}
            </div>
          ) : (
            /* Gallery view */
            <div className="px-6 py-6">
              {filteredDesigns.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredDesigns.map((design) => (
                    <DesignCard
                      key={design.id}
                      design={design}
                      onClick={(d) => {
                        setSelectedDesign(d);
                        setCurrentImageBase64(null);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState view="gallery" />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Design modal */}
      {selectedDesign && (
        <DesignModal
          design={selectedDesign}
          imageBase64={currentImageBase64}
          onClose={() => {
            setSelectedDesign(null);
            setCurrentImageBase64(null);
          }}
          onRemoveBackground={handleRemoveBackground}
          onUpscale={handleUpscale}
        />
      )}
    </div>
  );
}
