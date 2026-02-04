'use client';

// src/components/quiz/ProgressBar.tsx

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-[var(--color-text-muted)]">
          Progression
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[var(--color-primary)]">
            {current}/{total}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      <div className="h-3 progress-bar-bg rounded-full overflow-hidden">
        <div
          className="h-full progress-bar-fill relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] -translate-x-full"
               style={{ animation: 'shimmer 2s infinite' }} />
        </div>
      </div>

      {/* Milestone markers */}
      <div className="flex justify-between mt-2 px-1">
        {[0, 25, 50, 75, 100].map((milestone) => (
          <div
            key={milestone}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              percentage >= milestone
                ? 'bg-[var(--color-primary)]'
                : 'bg-[var(--color-primary)]/20'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
