// src/app/resultat/[id]/page.tsx

import { notFound } from 'next/navigation';
import { getQuizResult } from '@/lib/supabase';
import { getProfileByType, type ProfileType } from '@/lib/profiles';
import { DIMENSION_LABELS, type Dimension } from '@/lib/questions';
import { ResultClient } from './ResultClient';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const result = await getQuizResult(params.id);
  
  if (!result) {
    return { title: 'Résultat non trouvé' };
  }

  const profile = getProfileByType(result.profile_type as ProfileType);
  
  return {
    title: `${result.score_total}/100 - ${profile?.name || 'Mon Score'} | QVCT Wrapped`,
    description: profile?.description || 'Découvre ton score de bien-être au travail',
    openGraph: {
      title: `Mon score QVCT : ${result.score_total}/100`,
      description: profile?.phrase || 'Découvre ton score de bien-être au travail',
      images: [`/api/og?id=${params.id}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Mon score QVCT : ${result.score_total}/100`,
      description: profile?.phrase || 'Découvre ton score de bien-être au travail',
      images: [`/api/og?id=${params.id}`],
    },
  };
}

export default async function ResultatPage({ params }: PageProps) {
  const result = await getQuizResult(params.id);

  if (!result) {
    notFound();
  }

  const profile = getProfileByType(result.profile_type as ProfileType);

  if (!profile) {
    notFound();
  }

  const dimensionScores = [
    { dimension: 'workload' as Dimension, score: result.score_workload, label: DIMENSION_LABELS.workload },
    { dimension: 'autonomy' as Dimension, score: result.score_autonomy, label: DIMENSION_LABELS.autonomy },
    { dimension: 'recognition' as Dimension, score: result.score_recognition, label: DIMENSION_LABELS.recognition },
    { dimension: 'balance' as Dimension, score: result.score_balance, label: DIMENSION_LABELS.balance },
    { dimension: 'relations' as Dimension, score: result.score_relations, label: DIMENSION_LABELS.relations },
    { dimension: 'meaning' as Dimension, score: result.score_meaning, label: DIMENSION_LABELS.meaning },
    { dimension: 'management' as Dimension, score: result.score_management, label: DIMENSION_LABELS.management },
    { dimension: 'security' as Dimension, score: result.score_security, label: DIMENSION_LABELS.security },
  ];

  return (
    <ResultClient
      resultId={params.id}
      scoreTotal={result.score_total}
      profile={profile}
      dimensionScores={dimensionScores}
    />
  );
}
