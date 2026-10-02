import {SCENES, type Cue, type SceneDef} from './script';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Débit de parole lent mais naturel : ~2,5 mots par seconde (≈ 150 mots/min). */
const WORDS_PER_SECOND = 2.5;
/** Respiration entre deux répliques (secondes). */
const GAP = 0.4;
/** Silence en début de scène, avant la première réplique. */
const SCENE_HEAD = 0.6;
/** Silence en fin de scène : pause entre les étapes. */
const SCENE_TAIL = 1.2;
/** Contrainte d'accessibilité : 2 lignes de sous-titres maximum. */
export const SUBTITLE_MAX_LINE = 52;

const sec = (s: number) => Math.round(s * FPS);

export const speechSeconds = (cue: Cue) => {
	if (cue.durationOverride) return cue.durationOverride;
	const words = cue.text.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
	return Math.max(1.2, words / WORDS_PER_SECOND + 0.2);
};

/** Découpe une réplique en 1 ou 2 lignes équilibrées ; lève une erreur au-delà. */
export const splitSubtitle = (text: string): string[] => {
	if (text.length <= SUBTITLE_MAX_LINE) return [text];
	const words = text.split(' ');
	let best: string[] | null = null;
	let bestScore = Infinity;
	for (let i = 1; i < words.length; i++) {
		const a = words.slice(0, i).join(' ');
		const b = words.slice(i).join(' ');
		if (a.length > SUBTITLE_MAX_LINE || b.length > SUBTITLE_MAX_LINE) continue;
		// Équilibre des lignes, en préférant couper après une ponctuation.
		const score = Math.abs(a.length - b.length) - (/[,.:;?!…]$/.test(a) ? 12 : 0);
		if (score < bestScore) {
			bestScore = score;
			best = [a, b];
		}
	}
	if (!best) {
		throw new Error(`Sous-titre trop long pour 2 lignes (${SUBTITLE_MAX_LINE} car.) : « ${text} »`);
	}
	return best;
};

export type TimedCue = Cue & {
	sceneId: string;
	/** Frame de début, relative à la scène. */
	from: number;
	/** Durée d'affichage du sous-titre (frames). */
	duration: number;
	lines: string[];
};

export type TimedScene = Omit<SceneDef, 'cues'> & {
	from: number;
	duration: number;
	cues: TimedCue[];
};

const buildScene = (scene: SceneDef, sceneFrom: number): TimedScene => {
	let t = SCENE_HEAD;
	const cues: TimedCue[] = scene.cues.map((cue) => {
		const speech = speechSeconds(cue);
		const timed: TimedCue = {
			...cue,
			sceneId: scene.id,
			from: sec(t),
			// Le sous-titre reste affiché pendant la parole + une partie du silence qui suit.
			duration: sec(speech + Math.min(cue.hold ?? 0, 1) + GAP * 0.6),
			lines: splitSubtitle(cue.text),
		};
		t += speech + GAP + (cue.hold ?? 0);
		return timed;
	});
	const duration = sec(t + SCENE_TAIL);
	return {...scene, from: sceneFrom, duration, cues};
};

export const TIMELINE: TimedScene[] = (() => {
	let from = 0;
	return SCENES.map((s) => {
		const timed = buildScene(s, from);
		from += timed.duration;
		return timed;
	});
})();

export const TOTAL_FRAMES = TIMELINE.reduce((acc, s) => acc + s.duration, 0);

export const getScene = (id: string): TimedScene => {
	const s = TIMELINE.find((x) => x.id === id);
	if (!s) throw new Error(`Scène inconnue : ${id}`);
	return s;
};

/** Frame (relative à la scène) à laquelle commence une réplique. */
export const cueStart = (scene: TimedScene, cueId: string): number => {
	const c = scene.cues.find((x) => x.id === cueId);
	if (!c) throw new Error(`Réplique inconnue : ${scene.id}/${cueId}`);
	return c.from;
};
