// src/app/api/quiz/route.ts

import { NextResponse } from 'next/server';
import { saveQuizResult, isSupabaseConfigured } from '@/lib/supabase';
import type { Dimension } from '@/lib/questions';

interface DimensionScore {
  dimension: Dimension;
  score: number;
  label: string;
}

interface QuizSubmission {
  responses: Record<string, number>;
  scoreTotal: number;
  profileType: string;
  dimensionScores: DimensionScore[];
  sector?: string;
  companySize?: string;
  region?: string;
  ageRange?: string;
}

export async function POST(request: Request) {
  try {
    const body: QuizSubmission = await request.json();

    const { scoreTotal, profileType, dimensionScores, sector, companySize, region, ageRange } = body;

    // Log mode for debugging
    if (!isSupabaseConfigured) {
      console.log('[DEV MODE] Supabase not configured, using in-memory storage');
    }

    const scoresByDimension: Record<string, number> = {};
    for (const ds of dimensionScores) {
      scoresByDimension[ds.dimension] = ds.score;
    }

    // Use the saveQuizResult function which handles both Supabase and dev mode
    const id = await saveQuizResult({
      sector: sector || undefined,
      company_size: companySize || undefined,
      region: region || undefined,
      age_range: ageRange || undefined,
      score_workload: scoresByDimension.workload || 0,
      score_autonomy: scoresByDimension.autonomy || 0,
      score_recognition: scoresByDimension.recognition || 0,
      score_balance: scoresByDimension.balance || 0,
      score_relations: scoresByDimension.relations || 0,
      score_meaning: scoresByDimension.meaning || 0,
      score_management: scoresByDimension.management || 0,
      score_security: scoresByDimension.security || 0,
      score_total: scoreTotal,
      profile_type: profileType,
    });

    if (!id) {
      return NextResponse.json({ error: 'Failed to save quiz result' }, { status: 500 });
    }

    return NextResponse.json({ id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
