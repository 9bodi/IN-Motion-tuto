import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, LAYOUT} from '../theme';
import {appear, rise} from './anim';
import {IconPause} from './Icons';

/** Grand titre d'étape, seul à l'écran. */
export const StepTitle: React.FC<{step: number; title: string; at: number; until: number}> = ({step, title, at, until}) => {
	const frame = useCurrentFrame();
	if (frame >= until) return null;
	const p = appear(frame, at);
	const out = Math.min(1, (until - frame) / 10);
	return (
		<AbsoluteFill style={{justifyContent: 'center', paddingLeft: LAYOUT.leftX, opacity: out}}>
			<div style={{...rise(p), fontSize: 34, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: 'uppercase'}}>
				Étape {step} sur 3
			</div>
			<div style={{...rise(appear(frame, at + 6)), fontSize: 92, fontWeight: 800, color: C.ink, lineHeight: 1.05, marginTop: 12, maxWidth: 1400}}>
				{title}
			</div>
		</AbsoluteFill>
	);
};

/** Consigne principale, à gauche : une seule action importante à la fois. */
export const Instruction: React.FC<{
	at: number;
	until?: number;
	icon?: React.ReactNode;
	kicker?: string;
	title: React.ReactNode;
	children?: React.ReactNode;
	top?: number;
}> = ({at, until, icon, kicker, title, children, top = 230}) => {
	const frame = useCurrentFrame();
	if (frame < at - 1 || (until !== undefined && frame >= until)) return null;
	const p = appear(frame, at);
	const out = until !== undefined ? Math.min(1, (until - frame) / 8) : 1;
	return (
		<div style={{position: 'absolute', left: LAYOUT.leftX, top, width: LAYOUT.leftW, opacity: out, ...rise(p)}}>
			{kicker ? (
				<div style={{fontSize: 26, fontWeight: 700, color: C.accent, marginBottom: 14, letterSpacing: 0.5}}>{kicker}</div>
			) : null}
			<div style={{display: 'flex', alignItems: 'flex-start', gap: 26}}>
				{icon ? (
					<div
						style={{
							flex: '0 0 auto',
							width: 88,
							height: 88,
							borderRadius: 24,
							background: C.accentSoft,
							color: C.accent,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{icon}
					</div>
				) : null}
				<div style={{fontSize: 58, fontWeight: 750, lineHeight: 1.12, color: C.ink}}>{title}</div>
			</div>
			{children ? <div style={{marginTop: 34, fontSize: 34, lineHeight: 1.4, color: C.inkSoft}}>{children}</div> : null}
		</div>
	);
};

/** Carte « À vous » : invite à mettre la vidéo en pause. */
export const PauseCard: React.FC<{at: number; text: string}> = ({at, text}) => {
	const frame = useCurrentFrame();
	if (frame < at) return null;
	const p = appear(frame, at, 20);
	return (
		<AbsoluteFill style={{background: `rgba(245,243,238,${0.94 * p})`, justifyContent: 'center', alignItems: 'center', zIndex: 20}}>
			<div
				style={{
					...rise(p, 30),
					background: C.surface,
					border: `3px solid ${C.ink}`,
					borderRadius: 32,
					padding: '56px 80px',
					display: 'flex',
					alignItems: 'center',
					gap: 48,
					maxWidth: 1360,
					marginBottom: 120,
				}}
			>
				<div style={{width: 150, height: 150, borderRadius: 75, background: C.ink, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto'}}>
					<IconPause size={86} color="#FFF" />
				</div>
				<div>
					<div style={{fontSize: 64, fontWeight: 800, color: C.ink}}>À vous !</div>
					<div style={{fontSize: 36, lineHeight: 1.35, color: C.inkSoft, marginTop: 10}}>{text}</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

/** Étiquette « Exemple fictif » apposée sur toute donnée personnelle simulée. */
export const FictionalTag: React.FC<{style?: React.CSSProperties}> = ({style}) => (
	<div
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: 6,
			padding: '5px 12px',
			borderRadius: 8,
			border: `2px dashed ${C.ink}`,
			background: C.surface,
			fontSize: 16,
			fontWeight: 800,
			color: C.ink,
			letterSpacing: 0.6,
			textTransform: 'uppercase',
			...style,
		}}
	>
		Exemple fictif
	</div>
);

/** Petite pastille texte + icône (ex. « iPhone → App Store »). */
export const Chip: React.FC<{icon?: React.ReactNode; children: React.ReactNode; style?: React.CSSProperties}> = ({icon, children, style}) => (
	<div
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: 12,
			padding: '12px 22px',
			borderRadius: 16,
			background: C.surface,
			border: `2px solid ${C.line}`,
			fontSize: 30,
			fontWeight: 600,
			color: C.ink,
			...style,
		}}
	>
		{icon}
		{children}
	</div>
);
