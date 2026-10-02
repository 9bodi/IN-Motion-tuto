import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import type {TimedScene} from '../content/timeline';
import {C, FONT, VOICEOVER} from '../theme';
import {Chrome} from './Chrome';
import {Subtitles} from './Subtitles';

/** Fond, habillage, sous-titres et voix off (si disponible) communs à toutes les scènes. */
export const SceneShell: React.FC<{scene: TimedScene; sublabel?: string; children: React.ReactNode}> = ({
	scene,
	sublabel,
	children,
}) => {
	const vo = VOICEOVER[scene.id];
	return (
		<AbsoluteFill style={{background: C.bg, fontFamily: FONT, color: C.ink}}>
			{children}
			<Chrome step={scene.step} sublabel={sublabel} />
			<Subtitles scene={scene} />
			{vo ? <Audio src={staticFile(vo)} /> : null}
		</AbsoluteFill>
	);
};
