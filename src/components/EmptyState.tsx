"use client";

interface EmptyStateProps {
  view: "create" | "gallery";
}

export default function EmptyState({ view }: EmptyStateProps) {
  if (view === "gallery") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          No Designs Yet
        </h3>
        <p className="text-sm text-[var(--text-muted)] max-w-md">
          Your generated designs will appear here. Start creating to build your collection!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="grid grid-cols-2 gap-3 mb-8 opacity-30">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-32 h-32 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)]"
          />
        ))}
      </div>
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        Design Your Next Bestseller
      </h3>
      <p className="text-sm text-[var(--text-muted)] max-w-lg leading-relaxed">
        Enter a concept in the prompt bar above. Choose your design category - graphics, typography,
        patches, or PVC - and let AI create print-ready designs instantly.
      </p>
      <div className="flex flex-wrap gap-2 mt-6 justify-center max-w-lg">
        {[
          "Skull with roses",
          "Geometric wolf",
          "Retro sunset",
          "Japanese dragon",
          "STAY WILD lettering",
          "Mountain badge",
        ].map((example) => (
          <span
            key={example}
            className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border)]"
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}
