import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {appear} from './anim';

/**
 * Met en évidence une zone : encadré épais + halo + étiquette texte avec flèche.
 * L'information ne repose jamais sur la seule couleur (forme + texte).
 */
export const Highlight: React.FC<{
	x: number;
	y: number;
	w: number;
	h: number;
	at: number;
	until?: number;
	label?: string;
	labelSide?: 'left' | 'right' | 'below';
	radius?: number;
}> = ({x, y, w, h, at, until, label, labelSide = 'below', radius = 18}) => {
	const frame = useCurrentFrame();
	if (frame < at || (until !== undefined && frame >= until)) return null;
	const p = appear(frame, at, 16);
	// Halo qui « respire » très légèrement, sans clignotement.
	const breathe = interpolate(Math.sin((frame - at) / 14), [-1, 1], [8, 14]);
	const pad = 8;
	return (
		<div
			style={{
				position: 'absolute',
				left: x - pad,
				top: y - pad,
				width: w + pad * 2,
				height: h + pad * 2,
				borderRadius: radius + pad,
				border: `5px solid ${C.accent}`,
				boxShadow: `0 0 0 ${breathe}px ${C.accentSoft}`,
				opacity: p,
				transform: `scale(${1.04 - 0.04 * p})`,
				zIndex: 10,
			}}
		>
			{label ? (
				<div
					style={{
						position: 'absolute',
						...(labelSide === 'below'
							? {top: '100%', marginTop: 14, left: '50%', transform: 'translateX(-50%)'}
							: labelSide === 'left'
								? {right: '100%', marginRight: 22, top: '50%', transform: 'translateY(-50%)'}
								: {left: '100%', marginLeft: 22, top: '50%', transform: 'translateY(-50%)'}),
						background: C.accent,
						color: C.onAccent,
						fontSize: 20,
						fontWeight: 700,
						padding: '8px 16px',
						borderRadius: 10,
						whiteSpace: 'nowrap',
					}}
				>
					{labelSide === 'below' ? '▲ ' : labelSide === 'right' ? '◀ ' : ''}
					{label}
					{labelSide === 'left' ? ' ▶' : ''}
				</div>
			) : null}
		</div>
	);
};
