/**
 * Charte du tutoriel — volontairement distincte de la charte La Poste
 * (pas de jaune ni de bleu La Poste) : bleu nuit #1a2744 comme couleur secondaire (accent),
 * en accord avec le logo EF.
 * Contrastes (WCAG) : ink/bg ≈ 16:1 ; accent/surface ≈ 15:1 ; inkSoft/bg ≈ 7,6:1.
 */
export const C = {
	bg: '#F5F3EE',
	surface: '#FFFFFF',
	ink: '#15171C',
	inkSoft: '#454A55',
	line: '#D8D3C8',
	muted: '#ECE9E2',
	accent: '#1A2744',
	accentSoft: '#DFE4EE',
	onAccent: '#FFFFFF',
	subtitleBg: 'rgba(21, 23, 28, 0.92)',
} as const;

export const FONT = '"Inter", "Liberation Sans", "DejaVu Sans", Arial, sans-serif';

export const LAYOUT = {
	/** Zone de contenu à gauche (texte, listes). */
	leftX: 140,
	leftW: 1000,
	/** Téléphone à droite. */
	phoneX: 1340,
	phoneY: 118,
	phoneW: 360,
	phoneH: 720,
	bezel: 12,
} as const;

/** Mettre à false pour l'export final, une fois la voix off et les faits validés. */
export const DRAFT_MODE = true;

/**
 * Fichiers de voix off (dans public/voix/). Laisser undefined tant qu'ils n'existent pas.
 * Exemple : intro: 'voix/01-intro.wav'
 */
export const VOICEOVER: Record<string, string | undefined> = {
	intro: undefined,
	prerequis: undefined,
	inscription: undefined,
	verification: undefined,
	activation: undefined,
	conclusion: undefined,
};
