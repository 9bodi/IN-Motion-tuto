import React from 'react';
import {C, LAYOUT} from '../theme';
import {IconInfo} from './Icons';

export const SCREEN_W = LAYOUT.phoneW - LAYOUT.bezel * 2;
export const SCREEN_H = LAYOUT.phoneH - LAYOUT.bezel * 2;

/**
 * Smartphone générique, de face (aucune perspective), sans marque.
 * Le contenu de l'écran est fourni en enfant, en coordonnées écran (SCREEN_W × SCREEN_H).
 */
export const Phone: React.FC<{children?: React.ReactNode; style?: React.CSSProperties; caption?: boolean}> = ({
	children,
	style,
	caption = true,
}) => (
	<div style={{position: 'absolute', left: LAYOUT.phoneX, top: LAYOUT.phoneY, width: LAYOUT.phoneW, ...style}}>
		<div
			style={{
				width: LAYOUT.phoneW,
				height: LAYOUT.phoneH,
				borderRadius: 54,
				background: C.ink,
				padding: LAYOUT.bezel,
				boxShadow: '0 24px 60px rgba(21,23,28,0.18)',
			}}
		>
			<div
				style={{
					position: 'relative',
					width: SCREEN_W,
					height: SCREEN_H,
					borderRadius: 42,
					background: C.surface,
					overflow: 'hidden',
				}}
			>
				{/* Barre d'état neutre */}
				<div style={{position: 'absolute', top: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
					<div style={{width: 96, height: 26, borderRadius: 13, background: C.ink}} />
				</div>
				{children}
			</div>
		</div>
		{caption ? <IllustrativeCaption /> : null}
	</div>
);

/** Mention obligatoire sous chaque écran simulé. */
export const IllustrativeCaption: React.FC = () => (
	<div
		style={{
			marginTop: 14,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 8,
			fontSize: 19,
			fontWeight: 600,
			color: C.inkSoft,
			whiteSpace: 'nowrap',
		}}
	>
		<IconInfo size={22} color={C.inkSoft} />
		Écran illustratif — l’affichage peut varier
	</div>
);

/** Barre grise : texte schématisé (pas de libellé inventé). */
export const Bar: React.FC<{w: number | string; h?: number; style?: React.CSSProperties}> = ({w, h = 14, style}) => (
	<div style={{width: w, height: h, borderRadius: h / 2, background: C.muted, ...style}} />
);

/** Bouton schématisé, sans libellé. */
export const BlankButton: React.FC<{filled?: boolean; style?: React.CSSProperties}> = ({filled, style}) => (
	<div
		style={{
			height: 54,
			borderRadius: 27,
			background: filled ? C.ink : C.surface,
			border: `2.5px solid ${C.ink}`,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			...style,
		}}
	>
		<Bar w="45%" h={12} style={{background: filled ? '#5A5F6B' : C.muted}} />
	</div>
);

/** Convertit une zone de l'écran du téléphone en coordonnées de la vidéo (pour Highlight). */
export const onScreen = (r: {x: number; y: number; w: number; h: number}) => ({
	x: LAYOUT.phoneX + LAYOUT.bezel + r.x,
	y: LAYOUT.phoneY + LAYOUT.bezel + r.y,
	w: r.w,
	h: r.h,
});
