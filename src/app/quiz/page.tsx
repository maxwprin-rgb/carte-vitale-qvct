// src/app/quiz/page.tsx

import { QuizContainer } from '@/components/quiz/QuizContainer';
import Link from 'next/link';

export const metadata = {
  title: 'Quiz - QVCT Wrapped 2026',
  description: 'Reponds a 20 questions pour decouvrir ton score de bien-etre au travail',
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-turquoise)] rounded-full opacity-5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-4 px-4 border-b border-[var(--color-primary)]/10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-bold text-[var(--color-dark)] tracking-tight">
              QVCT <span className="text-gradient">WRAPPED</span>
            </span>
          </Link>
          <span className="text-xs text-[var(--color-text-muted)] font-medium">
            par <span className="text-[var(--color-primary)] font-semibold">Ulteam</span>
          </span>
        </div>
      </header>

      {/* Quiz */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <QuizContainer />
        </div>
      </div>
    </main>
  );
}
