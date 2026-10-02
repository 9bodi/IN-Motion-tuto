import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {TimedScene} from '../content/timeline';
import {C} from '../theme';

/** Sous-titres synchronisés : 2 lignes max, fond sombre opaque, texte blanc. */
export const Subtitles: React.FC<{scene: TimedScene}> = ({scene}) => {
	const frame = useCurrentFrame();
	const cue = scene.cues.find((c) => frame >= c.from && frame < c.from + c.duration);
	if (!cue) return null;
	const local = frame - cue.from;
	const opacity = Math.min(1, local / 4, (cue.duration - local) / 4);
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: 44,
				display: 'flex',
				justifyContent: 'center',
				opacity,
				zIndex: 30,
			}}
		>
			<div
				style={{
					background: C.subtitleBg,
					color: '#FFFFFF',
					fontSize: 42,
					lineHeight: 1.3,
					fontWeight: 500,
					padding: '14px 32px',
					borderRadius: 14,
					textAlign: 'center',
					maxWidth: 1560,
				}}
			>
				{cue.lines.map((l, i) => (
					<div key={i} style={{whiteSpace: 'nowrap'}}>
						{l}
					</div>
				))}
			</div>
		</div>
	);
};
