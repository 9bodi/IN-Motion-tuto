/**
 * Rend une image fixe au milieu de chaque réplique (contrôle visuel rapide).
 * Usage : npm run stills [-- <sceneId>]
 * Sortie : out/stills/<scene>-<cue>.jpg
 */
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import {TIMELINE} from '../src/content/timeline';

const only = process.argv[2];
const browserExecutable = process.env.REMOTION_BROWSER ?? undefined;

const main = async () => {
	const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
	const composition = await selectComposition({serveUrl, id: 'Tutoriel', browserExecutable});
	for (const scene of TIMELINE) {
		if (only && scene.id !== only) continue;
		for (const cue of scene.cues) {
			const frame = scene.from + cue.from + Math.round(cue.duration * 0.7);
			const output = path.resolve('out/stills', `${scene.id}-${cue.id}.jpg`);
			await renderStill({composition, serveUrl, frame, output, imageFormat: 'jpeg', browserExecutable});
			console.log(output);
		}
	}
};

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
