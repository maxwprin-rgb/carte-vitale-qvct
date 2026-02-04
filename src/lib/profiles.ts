// src/lib/profiles.ts

export type ProfileType =
  | 'phoenix'
  | 'equilibriste'
  | 'marathonien'
  | 'funambule'
  | 'survivant'
  | 'alerte';

export interface Profile {
  type: ProfileType;
  emoji: string;
  name: string;
  nameDisplay: string;
  subtitle: string;
  description: string;
  phrase: string;
  bgClass: string;
  badgeColor: string;
  scoreClass: string;
  ctaBoxClass: string;
  ctaButtonClass: string;
  ctaButtonText: string;
  ateliersLabel: string;
  ateliersLabelClass: string;
  minScore: number;
  maxScore: number;
  ateliers: string[];
  ctaMessage: string;
  ctaSubtext: string;
  ctaUrgency: 'low' | 'medium' | 'high' | 'urgent';
  isAlerte?: boolean;
  isSurvivant?: boolean;
}

export const PROFILES: Profile[] = [
  {
    type: 'phoenix',
    emoji: '🔥',
    name: 'Le Phoenix',
    nameDisplay: 'LE<br/>PHOENIX',
    subtitle: 'Profil Épanoui',
    description: 'Tu rayonnes !',
    phrase: '"Tu rayonnes tellement que tes collègues portent des lunettes de soleil."',
    bgClass: 'bg-phoenix',
    badgeColor: 'bg-white text-black',
    scoreClass: 'bg-black/20 text-white',
    ctaBoxClass: 'bg-white/10 border border-white/10',
    ctaButtonClass: 'bg-white',
    ctaButtonText: 'carte-vitale.ulteam.eu',
    ateliersLabel: '💡 Ateliers recommandés :',
    ateliersLabelClass: 'text-white/70',
    minScore: 85,
    maxScore: 100,
    ateliers: ['Théâtre d\'entreprise', 'Self-Defense', 'Naturopathie'],
    ctaMessage: '🏢 Et si ton entreprise proposait ces ateliers ?',
    ctaSubtext: 'Partage ce résultat à ton RH',
    ctaUrgency: 'low',
  },
  {
    type: 'equilibriste',
    emoji: '⚖️',
    name: "L'Équilibriste",
    nameDisplay: "L'ÉQUILI<br/>BRISTE",
    subtitle: 'Profil Stable',
    description: 'Tu as trouvé un bel équilibre.',
    phrase: '"Tu jongles comme un pro. Mais même les pros ont besoin de souffler."',
    bgClass: 'bg-equilibre',
    badgeColor: 'bg-white text-black',
    scoreClass: 'bg-black/20 text-white',
    ctaBoxClass: 'bg-white/10 border border-white/10',
    ctaButtonClass: 'bg-white',
    ctaButtonText: 'carte-vitale.ulteam.eu',
    ateliersLabel: '💡 Ateliers recommandés :',
    ateliersLabelClass: 'text-white/70',
    minScore: 70,
    maxScore: 84,
    ateliers: ['Yoga en entreprise', 'Atelier Nutrition', 'Danse & Expression'],
    ctaMessage: '🏢 Et si ton entreprise proposait ces ateliers ?',
    ctaSubtext: 'Partage ce résultat à ton RH',
    ctaUrgency: 'low',
  },
  {
    type: 'marathonien',
    emoji: '🏃',
    name: 'Le Marathonien',
    nameDisplay: 'LE MARA<br/>THONIEN',
    subtitle: 'Profil Endurant',
    description: 'Tu tiens le rythme.',
    phrase: '"Tu cours vite. Mais vers où exactement ?"',
    bgClass: 'bg-marathon',
    badgeColor: 'bg-white text-black',
    scoreClass: 'bg-black/20 text-white',
    ctaBoxClass: 'bg-white/10 border border-white/10',
    ctaButtonClass: 'bg-white',
    ctaButtonText: 'carte-vitale.ulteam.eu',
    ateliersLabel: '💡 Ateliers recommandés :',
    ateliersLabelClass: 'text-white/70',
    minScore: 55,
    maxScore: 69,
    ateliers: ['Massage Assis 15min', 'Atelier Sommeil', 'Running Collectif'],
    ctaMessage: '🏢 Ton entreprise peut t\'aider',
    ctaSubtext: 'Montre ce résultat à ton RH',
    ctaUrgency: 'medium',
  },
  {
    type: 'funambule',
    emoji: '🎪',
    name: 'Le Funambule',
    nameDisplay: 'LE FUNAM<br/>BULE',
    subtitle: 'Profil Sous Tension',
    description: 'Tu es en équilibre précaire.',
    phrase: '"Tu danses sur un fil. Et en dessous, y\'a pas de filet."',
    bgClass: 'bg-funambule',
    badgeColor: 'bg-white text-black',
    scoreClass: 'bg-black/20 text-white',
    ctaBoxClass: 'bg-white/10 border border-white/10',
    ctaButtonClass: 'bg-white',
    ctaButtonText: 'carte-vitale.ulteam.eu',
    ateliersLabel: '💡 Ateliers recommandés :',
    ateliersLabelClass: 'text-white/70',
    minScore: 40,
    maxScore: 54,
    ateliers: ['Sophrologie', 'Art Therapy', 'Tai Chi / Qi Gong'],
    ctaMessage: '⚠️ Ton entreprise doit agir',
    ctaSubtext: 'Envoie ce résultat à ton RH maintenant',
    ctaUrgency: 'high',
  },
  {
    type: 'survivant',
    emoji: '🛟',
    name: 'Le Survivant',
    nameDisplay: 'LE SUR<br/>VIVANT',
    subtitle: 'Profil En Difficulté',
    description: 'Zone de vigilance.',
    phrase: '"Tenir bon, c\'est bien. Mais tu mérites mieux que ça."',
    bgClass: 'bg-survivant',
    badgeColor: 'bg-red-600 text-white',
    scoreClass: 'bg-red-600/30 text-red-200',
    ctaBoxClass: 'bg-red-900/40 border border-red-500/20',
    ctaButtonClass: 'bg-red-600',
    ctaButtonText: 'SOS.ULTEAM.EU',
    ateliersLabel: '💡 Priorités santé :',
    ateliersLabelClass: 'text-red-400',
    minScore: 25,
    maxScore: 39,
    ateliers: ['Check-up Santé', 'Méditation guidée', 'Gestion des conflits'],
    ctaMessage: '🚨 Ce n\'est pas normal. Parles-en.',
    ctaSubtext: 'Ton entreprise a des obligations envers toi',
    ctaUrgency: 'high',
    isSurvivant: true,
  },
  {
    type: 'alerte',
    emoji: '🆘',
    name: 'Alerte',
    nameDisplay: 'ALERTE',
    subtitle: 'Profil Critique',
    description: 'Signal d\'alerte.',
    phrase: '"Pause. Ton corps te parle. Et là, il crie."',
    bgClass: 'bg-alerte',
    badgeColor: 'bg-black text-white',
    scoreClass: 'bg-white/20 text-black',
    ctaBoxClass: 'bg-black/80',
    ctaButtonClass: 'bg-black',
    ctaButtonText: 'SOS.ULTEAM.EU',
    ateliersLabel: 'Actions immédiates :',
    ateliersLabelClass: 'text-black/70 italic',
    minScore: 0,
    maxScore: 24,
    ateliers: ['Consultation psy/médecin', 'Sensibilisation Addictions', 'Programme Sommeil'],
    ctaMessage: '🚨 URGENT : Tu n\'es pas seul(e)',
    ctaSubtext: 'Des solutions existent. Réagissons.',
    ctaUrgency: 'urgent',
    isAlerte: true,
  },
];

export function getProfileByScore(score: number): Profile {
  const profile = PROFILES.find(p => score >= p.minScore && score <= p.maxScore);
  return profile || PROFILES[PROFILES.length - 1];
}

export function getProfileByType(type: ProfileType): Profile | undefined {
  return PROFILES.find(p => p.type === type);
}
