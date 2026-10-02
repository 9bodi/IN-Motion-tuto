import {Easing, interpolate, spring} from 'remotion';
import {FPS} from '../content/timeline';

/** Apparition douce (0 → 1) à partir d'une frame. Pas de rebond. */
export const appear = (frame: number, at: number, durationInFrames = 18) =>
	spring({frame: frame - at, fps: FPS, durationInFrames, config: {damping: 200}});

/** Disparition douce (1 → 0). */
export const disappear = (frame: number, at: number, durationInFrames = 12) =>
	interpolate(frame, [at, at + durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});

/** Visible entre deux frames, avec fondu d'entrée et de sortie. */
export const visibleBetween = (frame: number, from: number, to: number = Infinity) =>
	Math.min(appear(frame, from), to === Infinity ? 1 : disappear(frame, to));

/** Style d'apparition : fondu + léger glissement vertical. */
export const rise = (p: number, distance = 24): React.CSSProperties => ({
	opacity: p,
	transform: `translateY(${(1 - p) * distance}px)`,
});

/** Index de l'étape active : dernière frame de départ atteinte. */
export const activeIndex = (frame: number, starts: number[]) => {
	let idx = -1;
	starts.forEach((s, i) => {
		if (frame >= s) idx = i;
	});
	return idx;
};
