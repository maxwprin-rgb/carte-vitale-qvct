'use client';

// src/components/quiz/QuizContainer.tsx

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizQuestion } from './QuizQuestion';
import { ProgressBar } from './ProgressBar';
import { QUESTIONS } from '@/lib/questions';
import { calculateQuizResult, type Responses } from '@/lib/scoring';

export function QuizContainer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Empecher le refresh accidentel
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(responses).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [responses]);

  const handleAnswer = useCallback(async (value: number) => {
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    if (isLastQuestion) {
      setIsSubmitting(true);

      try {
        const result = calculateQuizResult(newResponses);

        const response = await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            responses: newResponses,
            scoreTotal: result.scoreTotal,
            profileType: result.profile.type,
            dimensionScores: result.dimensionScores,
          }),
        });

        if (!response.ok) throw new Error('Failed to save quiz');

        const { id } = await response.json();
        router.push(`/resultat/${id}`);
      } catch (error) {
        console.error('Error submitting quiz:', error);
        setIsSubmitting(false);
        alert('Une erreur est survenue. Veuillez reessayer.');
      }
    } else {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 250);
    }
  }, [currentIndex, currentQuestion, isLastQuestion, responses, router]);

  // Loading screen - Gamified Delight style
  if (isSubmitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-[var(--color-primary)]/20" />
          {/* Spinning ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-[var(--color-primary)] border-r-[var(--color-turquoise)] animate-spin" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl animate-pulse">&#129504;</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-display text-xl font-bold text-[var(--color-dark)]">
            Analyse en cours...
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">
            Calcul de ton profil QVCT
          </p>
        </div>

        {/* Fun loading messages */}
        <div className="mt-8 flex gap-2">
          {['&#128640;', '&#128161;', '&#127919;'].map((emoji, i) => (
            <span
              key={i}
              className="text-2xl animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }}
              dangerouslySetInnerHTML={{ __html: emoji }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col">
      {/* Progress bar */}
      <div className="mb-8">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center py-4">
        <QuizQuestion
          key={currentQuestion.id}
          question={currentQuestion.text}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
          selectedValue={responses[currentQuestion.id]}
        />
      </div>

      {/* Navigation hint */}
      <div className="mt-8 text-center space-y-2">
        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="text-sm text-[var(--color-primary)] hover:underline font-medium"
          >
            &#8592; Question precedente
          </button>
        )}
        <p className="text-xs text-[var(--color-text-muted)]">
          &#128274; Tes reponses sont 100% anonymes
        </p>
      </div>
    </div>
  );
}
