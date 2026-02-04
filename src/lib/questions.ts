// src/lib/questions.ts

export type Dimension =
  | 'workload'
  | 'autonomy'
  | 'recognition'
  | 'balance'
  | 'relations'
  | 'meaning'
  | 'management'
  | 'security';

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  reversed: boolean;
}

// Les 20 questions du quiz - ordre mélangé pour éviter le biais
export const QUESTIONS: Question[] = [
  { id: 'workload_1', dimension: 'workload', text: 'Ma charge de travail est raisonnable et gérable au quotidien.', reversed: false },
  { id: 'meaning_1', dimension: 'meaning', text: "Mon travail a du sens et contribue à quelque chose d'important.", reversed: false },
  { id: 'relations_1', dimension: 'relations', text: 'Je peux compter sur mes collègues en cas de besoin.', reversed: false },
  { id: 'autonomy_1', dimension: 'autonomy', text: 'Je peux organiser mon travail comme je le souhaite.', reversed: false },
  { id: 'balance_1', dimension: 'balance', text: "J'arrive à déconnecter du travail le soir et le week-end.", reversed: false },
  { id: 'recognition_1', dimension: 'recognition', text: 'Mon travail est reconnu et valorisé à sa juste valeur.', reversed: false },
  { id: 'management_1', dimension: 'management', text: "Mon manager est à l'écoute et disponible quand j'en ai besoin.", reversed: false },
  { id: 'workload_2', dimension: 'workload', text: "J'ai suffisamment de temps pour réaliser mon travail correctement.", reversed: false },
  { id: 'meaning_2', dimension: 'meaning', text: 'Les valeurs de mon entreprise sont en accord avec les miennes.', reversed: false },
  { id: 'relations_2', dimension: 'relations', text: "L'ambiance dans mon équipe est positive et bienveillante.", reversed: false },
  { id: 'autonomy_2', dimension: 'autonomy', text: "J'ai mon mot à dire sur les décisions qui concernent mon travail.", reversed: false },
  { id: 'balance_2', dimension: 'balance', text: 'Mon travail me laisse du temps pour ma vie personnelle et mes loisirs.', reversed: false },
  { id: 'recognition_2', dimension: 'recognition', text: 'Je reçois régulièrement des retours constructifs sur mon travail.', reversed: false },
  { id: 'management_2', dimension: 'management', text: "Mon manager me fait confiance et me laisse de l'autonomie.", reversed: false },
  { id: 'workload_3', dimension: 'workload', text: 'Je me sens souvent débordé(e) ou sous pression.', reversed: true },
  { id: 'meaning_3', dimension: 'meaning', text: "Je me lève le matin avec envie d'aller travailler.", reversed: false },
  { id: 'relations_3', dimension: 'relations', text: 'Il y a souvent des tensions ou conflits dans mon environnement de travail.', reversed: true },
  { id: 'balance_3', dimension: 'balance', text: "Mon employeur fait preuve de flexibilité quand j'en ai besoin.", reversed: false },
  { id: 'recognition_3', dimension: 'recognition', text: "J'ai des perspectives d'évolution dans mon entreprise.", reversed: false },
  { id: 'security_1', dimension: 'security', text: "Je me sens en sécurité concernant la stabilité de mon emploi.", reversed: false },
];

export const DIMENSION_LABELS: Record<Dimension, string> = {
  workload: 'Charge de travail',
  autonomy: 'Autonomie',
  recognition: 'Reconnaissance',
  balance: 'Équilibre vie pro/perso',
  relations: 'Relations au travail',
  meaning: 'Sens au travail',
  management: 'Management',
  security: "Sécurité de l'emploi",
};

export const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  workload: 0.15,
  autonomy: 0.10,
  recognition: 0.15,
  balance: 0.15,
  relations: 0.12,
  meaning: 0.13,
  management: 0.12,
  security: 0.08,
};

export const RESPONSE_OPTIONS = [
  { value: 1, emoji: '😫', label: 'Pas du tout' },
  { value: 2, emoji: '😕', label: 'Plutôt non' },
  { value: 3, emoji: '😐', label: 'Neutre' },
  { value: 4, emoji: '🙂', label: 'Plutôt oui' },
  { value: 5, emoji: '😄', label: 'Tout à fait' },
];
