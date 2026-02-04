'use client';

// src/components/quiz/QuizQuestion.tsx

import { useState } from 'react';
import { RESPONSE_OPTIONS } from '@/lib/questions';

interface QuizQuestionProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
  selectedValue?: number;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedValue,
}: QuizQuestionProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      {/* Question card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-[var(--color-primary)]/10 border border-[var(--color-primary)]/10">
        {/* Question number badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-turquoise)]/10 border border-[var(--color-primary)]/20">
            <span className="text-sm font-bold text-[var(--color-primary)]">
              Question {questionNumber}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">
              sur {totalQuestions}
            </span>
          </div>
        </div>

        {/* Question text */}
        <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--color-dark)] text-center leading-relaxed mb-8 px-2">
          {question}
        </h2>

        {/* Response options */}
        <div className="flex justify-center gap-3 md:gap-4 flex-wrap px-2">
          {RESPONSE_OPTIONS.map((option, index) => {
            const isSelected = selectedValue === option.value;
            const isHovered = hoveredValue === option.value;

            return (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                onMouseEnter={() => setHoveredValue(option.value)}
                onMouseLeave={() => setHoveredValue(null)}
                className={`
                  group relative flex flex-col items-center justify-center
                  w-16 h-20 md:w-20 md:h-24
                  rounded-2xl transition-all duration-300
                  ${isSelected
                    ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-turquoise)] scale-110 shadow-lg shadow-[var(--color-primary)]/30'
                    : 'bg-white border-2 border-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/40 hover:shadow-md hover:scale-105'
                  }
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                aria-label={option.label}
              >
                {/* Emoji */}
                <span
                  className={`text-3xl md:text-4xl mb-1 transition-transform duration-300 ${
                    isSelected || isHovered ? 'scale-110' : ''
                  }`}
                >
                  {option.emoji}
                </span>

                {/* Label */}
                <span
                  className={`text-[10px] md:text-xs text-center px-1 leading-tight font-medium transition-colors ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  {option.label}
                </span>

                {/* Selection ring effect */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl ring-4 ring-[var(--color-primary)]/20 animate-ping pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-6 px-4 text-xs text-[var(--color-text-muted)] font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]/50" />
            Pas d'accord
          </span>
          <span className="flex items-center gap-1">
            D'accord
            <span className="w-2 h-2 rounded-full bg-[var(--color-turquoise)]" />
          </span>
        </div>
      </div>

      {/* Hint */}
      <p className="text-center mt-4 text-xs text-[var(--color-text-muted)]">
        Clique sur une reponse pour continuer
      </p>
    </div>
  );
}
