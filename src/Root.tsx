import React from 'react';
import {Composition, Series} from 'remotion';
import './fonts';
import {FPS, HEIGHT, TIMELINE, TOTAL_FRAMES, WIDTH} from './content/timeline';
import {Intro} from './scenes/Intro';
import {Prerequis} from './scenes/Prerequis';
import {Inscription} from './scenes/Inscription';
import {Verification} from './scenes/Verification';
import {Activation} from './scenes/Activation';
import {Conclusion} from './scenes/Conclusion';

/** Scènes modulaires : l'ordre et la durée viennent de content/script.ts via timeline.ts. */
export const SCENE_COMPONENTS: Record<string, React.FC> = {
	intro: Intro,
	prerequis: Prerequis,
	inscription: Inscription,
	verification: Verification,
	activation: Activation,
	conclusion: Conclusion,
};

const Tutoriel: React.FC = () => (
	<Series>
		{TIMELINE.map((s) => {
			const Comp = SCENE_COMPONENTS[s.id];
			return (
				<Series.Sequence key={s.id} durationInFrames={s.duration} name={s.label}>
					<Comp />
				</Series.Sequence>
			);
		})}
	</Series>
);

export const RemotionRoot: React.FC = () => (
	<>
		<Composition id="Tutoriel" component={Tutoriel} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
		{TIMELINE.map((s, i) => (
			<Composition
				key={s.id}
				id={`Scene${String(i + 1).padStart(2, '0')}-${s.id}`}
				component={SCENE_COMPONENTS[s.id]}
				durationInFrames={s.duration}
				fps={FPS}
				width={WIDTH}
				height={HEIGHT}
			/>
		))}
	</>
);
