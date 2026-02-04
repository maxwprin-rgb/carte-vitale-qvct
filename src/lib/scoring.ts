// src/lib/scoring.ts

import { QUESTIONS, DIMENSION_WEIGHTS, DIMENSION_LABELS, type Dimension } from './questions';
import { getProfileByScore, type Profile } from './profiles';

export type Responses = Record<string, number>;

export interface DimensionScore {
  dimension: Dimension;
  score: number;
  label: string;
}

export interface QuizResult {
  scoreTotal: number;
  profile: Profile;
  dimensionScores: DimensionScore[];
  responses: Responses;
}

/**
 * Convertit une reponse (1-5) en score normalise (0-100)
 *
 * IMPORTANT: On ignore le flag "reversed" pour simplifier.
 * Toutes les reponses sont traitees de la meme facon:
 * - Reponse 1 → Score 0
 * - Reponse 2 → Score 25
 * - Reponse 3 → Score 50
 * - Reponse 4 → Score 75
 * - Reponse 5 → Score 100
 */
function getQuestionScore(response: number): number {
  // Normalise sur 0-100
  return ((response - 1) / 4) * 100;
}

/**
 * Calcule le score d'une dimension (moyenne des questions)
 */
function calculateDimensionScore(dimension: Dimension, responses: Responses): number {
  const dimensionQuestions = QUESTIONS.filter(q => q.dimension === dimension);
  if (dimensionQuestions.length === 0) return 0;

  let totalScore = 0;
  let answeredCount = 0;

  for (const question of dimensionQuestions) {
    const response = responses[question.id];
    if (response === undefined || response < 1 || response > 5) continue;

    totalScore += getQuestionScore(response);
    answeredCount++;
  }

  if (answeredCount === 0) return 0;

  return Math.round(totalScore / answeredCount);
}

/**
 * Calcule le score total pondere
 */
function calculateTotalScore(dimensionScores: Record<Dimension, number>): number {
  let total = 0;
  let totalWeight = 0;

  for (const [dimension, weight] of Object.entries(DIMENSION_WEIGHTS)) {
    const score = dimensionScores[dimension as Dimension];
    if (score !== undefined) {
      total += score * weight;
      totalWeight += weight;
    }
  }

  // Normalise si tous les poids ne sont pas utilises
  if (totalWeight > 0 && totalWeight < 1) {
    total = total / totalWeight;
  }

  return Math.round(total);
}

/**
 * Calcule le resultat complet du quiz
 */
export function calculateQuizResult(responses: Responses): QuizResult {
  const dimensions: Dimension[] = ['workload', 'autonomy', 'recognition', 'balance', 'relations', 'meaning', 'management', 'security'];

  const dimensionScoresMap: Record<Dimension, number> = {} as Record<Dimension, number>;
  const dimensionScores: DimensionScore[] = [];

  // Debug log
  console.log('=== SCORING DEBUG ===');
  console.log('Responses:', Object.keys(responses).length, 'questions answered');

  for (const dimension of dimensions) {
    const score = calculateDimensionScore(dimension, responses);
    dimensionScoresMap[dimension] = score;
    dimensionScores.push({ dimension, score, label: DIMENSION_LABELS[dimension] });

    console.log(`${dimension}: ${score}/100 (weight: ${DIMENSION_WEIGHTS[dimension]})`);
  }

  const scoreTotal = calculateTotalScore(dimensionScoresMap);
  console.log(`TOTAL: ${scoreTotal}/100`);
  console.log('====================');

  const profile = getProfileByScore(scoreTotal);

  return { scoreTotal, profile, dimensionScores, responses };
}

export function validateResponses(responses: Responses): boolean {
  return QUESTIONS.every(q => {
    const response = responses[q.id];
    return response !== undefined && response >= 1 && response <= 5;
  });
}

export function getAnsweredCount(responses: Responses): number {
  return Object.keys(responses).filter(
    key => responses[key] !== undefined && responses[key] >= 1 && responses[key] <= 5
  ).length;
}
