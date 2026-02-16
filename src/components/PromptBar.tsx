"use client";

import { useState, useRef, useEffect } from "react";
import { DesignCategory, GenerationModel, StylePreset, AspectRatio } from "@/types";
import { DESIGN_PRESETS, STYLE_OPTIONS, QUICK_PROMPTS, DEFAULT_NEGATIVE_PROMPT } from "@/lib/presets";

interface PromptBarProps {
  onGenerate: (params: {
    prompt: string;
    category: DesignCategory;
    model: GenerationModel;
    style?: StylePreset;
    aspectRatio: AspectRatio;
    negativePrompt?: string;
  }) => void;
  isGenerating: boolean;
  selectedCategory: DesignCategory | "all";
}

export default function PromptBar({
  onGenerate,
  isGenerating,
  selectedCategory,
}: PromptBarProps) {
  const [prompt, setPrompt] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [category, setCategory] = useState<DesignCategory>(
    selectedCategory === "all" ? "graphic" : selectedCategory
  );
  const [model, setModel] = useState<GenerationModel>("ultra");
  const [style, setStyle] = useState<StylePreset>("line-art");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [negativePrompt, setNegativePrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (selectedCategory !== "all") {
      setCategory(selectedCategory);
      const preset = DESIGN_PRESETS.find((p) => p.category === selectedCategory);
      if (preset) {
        setModel(preset.recommendedModel);
        setStyle(preset.recommendedStyle);
      }
    }
  }, [selectedCategory]);

  const handleSubmit = () => {
    if (!prompt.trim() || isGenerating) return;

    const preset = DESIGN_PRESETS.find((p) => p.category === category);
    const fullPrompt = preset
      ? `${preset.promptPrefix} ${prompt.trim()} ${preset.promptSuffix}`
      : prompt.trim();

    // Merge user negative prompt with default anti-cartoon negative prompt
    const finalNegative = negativePrompt
      ? `${negativePrompt}, ${DEFAULT_NEGATIVE_PROMPT}`
      : DEFAULT_NEGATIVE_PROMPT;

    onGenerate({
      prompt: fullPrompt,
      category,
      model,
      style: model === "core" ? style : undefined,
      aspectRatio,
      negativePrompt: finalNegative,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const applyQuickPrompt = (qp: string) => {
    setPrompt(qp);
    setShowQuickPrompts(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="w-full">
      {/* Main prompt bar */}
      <div className="relative">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your t-shirt design concept..."
              className="prompt-bar min-h-[60px] max-h-[200px] pr-24"
              rows={1}
              disabled={isGenerating}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                onClick={() => setShowQuickPrompts(!showQuickPrompts)}
                className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                title="Quick prompts"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors ${
                  showSettings
                    ? "text-brand-400 bg-brand-500/10"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
                title="Settings"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            className="btn-primary h-[60px] px-8 rounded-2xl flex items-center gap-2 text-base shrink-0"
          >
            {isGenerating ? (
              <>
                <svg className="w-5 h-5 spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                Generate
              </>
            )}
          </button>
        </div>

        {/* Quick prompts dropdown */}
        {showQuickPrompts && (
          <div className="absolute bottom-full mb-2 left-0 w-full card p-4 z-50 scale-in max-h-[400px] overflow-y-auto">
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              Quick Prompts
            </p>
            {QUICK_PROMPTS.map((group) => (
              <div key={group.category} className="mb-3 last:mb-0">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.prompts.map((qp) => (
                    <button
                      key={qp}
                      onClick={() => applyQuickPrompt(qp)}
                      className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                    >
                      {qp}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="mt-3 card p-5 fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as DesignCategory;
                  setCategory(cat);
                  const preset = DESIGN_PRESETS.find((p) => p.category === cat);
                  if (preset) {
                    setModel(preset.recommendedModel);
                    setStyle(preset.recommendedStyle);
                  }
                }}
                className="input-field text-sm py-2"
              >
                {DESIGN_PRESETS.map((p) => (
                  <option key={p.category} value={p.category}>
                    {p.icon} {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as GenerationModel)}
                className="input-field text-sm py-2"
              >
                <option value="ultra">Ultra (Best Quality)</option>
                <option value="core">Core (Fast + Styles)</option>
                <option value="sd3.5-large">SD 3.5 Large</option>
                <option value="sd3.5-medium">SD 3.5 Medium</option>
                <option value="sd3.5-large-turbo">SD 3.5 Turbo (Fastest)</option>
              </select>
            </div>

            {/* Style (only for Core) */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Style {model !== "core" && <span className="normal-case">(Core only)</span>}
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as StylePreset)}
                className="input-field text-sm py-2"
                disabled={model !== "core"}
              >
                {STYLE_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="input-field text-sm py-2"
              >
                <option value="1:1">1:1 Square</option>
                <option value="4:5">4:5 Portrait</option>
                <option value="5:4">5:4 Landscape</option>
                <option value="3:2">3:2 Wide</option>
                <option value="2:3">2:3 Tall</option>
              </select>
            </div>
          </div>

          {/* Negative prompt */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Negative Prompt (things to avoid)
            </label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="blurry, low quality, watermark..."
              className="input-field text-sm"
            />
          </div>

          {/* Category description */}
          <div className="mt-3 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border)]">
            <p className="text-xs text-[var(--text-muted)]">
              {DESIGN_PRESETS.find((p) => p.category === category)?.description ||
                "Select a category for optimized design prompts."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
