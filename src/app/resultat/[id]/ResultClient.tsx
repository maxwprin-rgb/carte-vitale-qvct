'use client';

// src/app/resultat/[id]/ResultClient.tsx

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import type { Profile } from '@/lib/profiles';
import type { Dimension } from '@/lib/questions';

interface DimensionScore {
  dimension: Dimension;
  score: number;
  label: string;
}

interface ResultClientProps {
  resultId: string;
  scoreTotal: number;
  profile: Profile;
  dimensionScores: DimensionScore[];
}

export function ResultClient({
  resultId,
  scoreTotal,
  profile,
  dimensionScores,
}: ResultClientProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation du compteur
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const increment = scoreTotal / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= scoreTotal) {
        setDisplayScore(scoreTotal);
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 200);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [scoreTotal]);

  // Telecharger la carte en PNG
  const handleDownloadCard = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Meilleure qualite
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `qvct-wrapped-${profile.type}-${scoreTotal}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Erreur lors du telechargement. Essaie de faire une capture d\'ecran.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Partager sur LinkedIn (ouvre la page de post)
  const handleShareLinkedIn = () => {
    const url = `${window.location.origin}/resultat/${resultId}`;
    const text = encodeURIComponent(
      `Je viens de decouvrir mon profil QVCT : ${profile.name} avec un score de ${scoreTotal}/100 !\n\nEt toi, quel est ton score de bien-etre au travail ?\n\n#QVCTWrapped #BienEtreAuTravail #QVCT`
    );

    // Ouvre LinkedIn avec le texte pre-rempli
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${text}%0A%0A${encodeURIComponent(url)}`,
      '_blank'
    );

    // Track share
    fetch(`/api/share?id=${resultId}`, { method: 'POST' });
  };

  const handleShareTwitter = () => {
    const url = `${window.location.origin}/resultat/${resultId}`;
    const text = `Je suis ${profile.name} avec un score QVCT de ${scoreTotal}/100 !\n\nDecouvre ton profil bien-etre au travail :\n${url}\n\n#QVCTWrapped`;

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    fetch(`/api/share?id=${resultId}`, { method: 'POST' });
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/resultat/${resultId}`;
    await navigator.clipboard.writeText(url);
    alert('Lien copie !');
  };

  // Rotation aleatoire pour le sticker
  const stickerRotation = profile.type === 'phoenix' ? '-rotate-1' :
                          profile.type === 'equilibriste' ? 'rotate-1' :
                          profile.type === 'marathonien' ? '-rotate-1' :
                          profile.type === 'funambule' ? 'rotate-2' :
                          profile.type === 'survivant' ? '-rotate-2' :
                          'rotate-1';

  return (
    <main className="min-h-screen bg-[var(--color-background)] p-4 md:p-12">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-turquoise)] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[500px] mx-auto">

        {/* Header */}
        <header className="text-center mb-8 animate-fade-in-down">
          <Link href="/" className="inline-block">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-dark)] tracking-tight">
              QVCT <span className="text-gradient">WRAPPED</span>
            </h1>
          </Link>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Ton bilan bien-etre 2026
          </p>
        </header>

        {/* === CARTE WRAPPED === */}
        <div
          ref={cardRef}
          className={`wrapped-card ${profile.bgClass} p-5 shadow-2xl mx-auto ${profile.isAlerte ? 'border-2 border-white/10' : ''} animate-scale-in`}
        >

          {/* Grain overlay */}
          <div className="grain"></div>

          {/* Header carte */}
          <div className="flex justify-between items-start z-10 relative">
            <div className={`${profile.isAlerte ? 'bg-black' : 'glass-box'} px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-widest`}>
              {profile.isAlerte ? 'URGENT' : 'Bilan 2026'}
            </div>
            <div className={`${profile.badgeColor} p-1.5 rounded-lg font-black text-[9px] leading-none text-center`}>
              UL<br/>TEAM
            </div>
          </div>

          {/* Emoji + Nom */}
          <div className="mt-4 text-center z-10 relative">
            <div className={`text-6xl mb-2 drop-shadow-xl ${showContent ? 'animate-scale-in' : 'opacity-0'}`}>
              {profile.emoji}
            </div>
            <h2
              className={`font-black-tight uppercase italic ${profile.isAlerte ? 'text-black text-6xl' : 'text-white text-4xl md:text-5xl'} leading-none`}
              dangerouslySetInnerHTML={{ __html: profile.nameDisplay }}
            />
            <p className={`font-black mt-2 ${profile.scoreClass} inline-block px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider`}>
              Score : {displayScore}/100
            </p>
          </div>

          {/* Phrase sticker */}
          {showContent && (
            <div className="mt-4 z-10 relative animate-fade-in-up">
              <div className={`${profile.isAlerte ? 'bg-black' : 'bg-white'} p-4 rounded-2xl sticker-badge ${stickerRotation}`}>
                <p className={`${profile.isAlerte ? 'text-white text-center' : 'text-black'} font-extrabold text-sm leading-tight italic`}>
                  {profile.phrase}
                </p>
              </div>
            </div>
          )}

          {/* Ateliers */}
          {showContent && (
            <div className={`mt-4 glass-box rounded-2xl p-4 z-10 relative animate-fade-in-up delay-100 ${profile.isSurvivant ? 'border-red-500/20' : ''}`}>
              <p className={`${profile.ateliersLabelClass} text-[9px] uppercase font-black tracking-widest mb-2`}>
                {profile.ateliersLabel}
              </p>
              <ul className={`space-y-1 font-bold text-xs ${profile.isAlerte ? 'text-black' : 'text-white'}`}>
                {profile.ateliers.map((atelier, i) => (
                  <li key={i}>* {atelier}</li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          {showContent && (
            <div className="mt-auto flex flex-col items-center z-10 relative pb-2 animate-fade-in-up delay-200">
              <div className={`${profile.ctaBoxClass} w-full p-3 rounded-2xl mb-3 text-center`}>
                <p className={`text-[11px] font-black leading-tight ${
                  profile.isSurvivant ? 'text-red-400 uppercase italic tracking-tighter' :
                  profile.isAlerte ? 'text-red-500 uppercase italic tracking-tighter text-[10px]' :
                  'text-white'
                }`}>
                  {profile.ctaMessage}
                </p>
                <p className={`text-[9px] mt-0.5 ${
                  profile.isSurvivant ? 'text-white/40' :
                  profile.isAlerte ? 'text-white/50 text-[8px]' :
                  'text-white/60'
                }`}>
                  {profile.ctaSubtext}
                </p>
              </div>
              <div className={`w-full ${profile.ctaButtonClass} rounded-xl py-3 flex justify-center items-center shadow-lg`}>
                <span className={`font-black text-xs tracking-tighter italic ${
                  profile.isSurvivant || profile.isAlerte ? 'text-white uppercase' : 'text-black'
                }`}>
                  {profile.ctaButtonText}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* === SECTION PARTAGE === */}
        {showContent && (
          <div className="mt-8 space-y-6 animate-fade-in-up delay-300">

            {/* Etape 1: Telecharger */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-[var(--color-primary)]/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-bold text-[var(--color-dark)]">Telecharge ta carte</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Format PNG optimise pour LinkedIn</p>
                </div>
              </div>

              <button
                onClick={handleDownloadCard}
                disabled={isDownloading}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                  ${downloadSuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5'
                  }
                  ${isDownloading ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                {isDownloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Telechargement...
                  </>
                ) : downloadSuccess ? (
                  <>
                    <span>&#10003;</span>
                    Telecharge !
                  </>
                ) : (
                  <>
                    <span>&#8595;</span>
                    Telecharger ma carte PNG
                  </>
                )}
              </button>
            </div>

            {/* Etape 2: Partager */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-[var(--color-primary)]/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-bold text-[var(--color-dark)]">Partage sur les reseaux</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Ajoute l'image dans ton post</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleShareLinkedIn}
                  className="flex-1 bg-[#0077B5] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#006399] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#0077B5]/20"
                >
                  LinkedIn
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="flex-1 bg-[var(--color-dark)] text-white py-3 rounded-xl font-bold text-sm hover:bg-black transition-all hover:-translate-y-0.5 shadow-lg"
                >
                  X / Twitter
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-gray-100 text-[var(--color-dark)] py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all hover:-translate-y-0.5"
                >
                  Copier
                </button>
              </div>

              <p className="text-xs text-[var(--color-text-muted)] text-center mt-3">
                Astuce: Telecharge d'abord ta carte, puis uploade-la dans ton post LinkedIn
              </p>
            </div>
          </div>
        )}

        {/* === DETAILS PAR DIMENSION === */}
        {showContent && (
          <details className="mt-8 animate-fade-in-up delay-400">
            <summary className="text-[var(--color-primary)] text-sm cursor-pointer hover:underline font-semibold text-center">
              Voir le detail par dimension
            </summary>
            <div className="mt-4 bg-white rounded-2xl p-5 shadow-lg border border-[var(--color-primary)]/10 space-y-4">
              {dimensionScores.map((ds) => (
                <div key={ds.dimension}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--color-text-muted)] text-xs font-medium">{ds.label}</span>
                    <span className="text-[var(--color-dark)] font-bold text-sm">{ds.score}%</span>
                  </div>
                  <div className="h-2 bg-[var(--color-primary)]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-turquoise)] rounded-full transition-all duration-700"
                      style={{ width: `${ds.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Refaire */}
        <div className="mt-8 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:underline"
          >
            Refaire le quiz
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center pb-8">
          <p className="text-[var(--color-text-muted)] text-xs font-medium">
            2026 <span className="text-[var(--color-primary)] font-semibold">Ulteam</span> - QVCT Wrapped Edition
          </p>
        </footer>
      </div>
    </main>
  );
}
