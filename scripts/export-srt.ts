/**
 * Génère, à partir de src/content/script.ts :
 *  - docs/sous-titres.srt          (sous-titres synchronisés, 2 lignes max)
 *  - docs/01-script-voix-off.md    (script de voix off minuté, pour l'enregistrement)
 * Usage : npm run srt
 */
import fs from 'node:fs';
import {FPS, TIMELINE, TOTAL_FRAMES} from '../src/content/timeline';
import {factById} from '../src/content/sources';

const tc = (frames: number, sep = ',') => {
	const ms = Math.round((frames / FPS) * 1000);
	const h = Math.floor(ms / 3600000);
	const m = Math.floor((ms % 3600000) / 60000);
	const s = Math.floor((ms % 60000) / 1000);
	const r = ms % 1000;
	const p = (n: number, l = 2) => String(n).padStart(l, '0');
	return `${p(h)}:${p(m)}:${p(s)}${sep}${p(r, 3)}`;
};
const mmss = (frames: number) => {
	const s = Math.round(frames / FPS);
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

let srt = '';
let n = 1;
for (const scene of TIMELINE) {
	for (const cue of scene.cues) {
		const start = scene.from + cue.from;
		srt += `${n++}\n${tc(start)} --> ${tc(start + cue.duration)}\n${cue.lines.join('\n')}\n\n`;
	}
}
fs.mkdirSync('docs', {recursive: true});
fs.writeFileSync('docs/sous-titres.srt', srt);

const STATUS: Record<string, string> = {verifie: '✅', corrobore: '🟡', 'a-confirmer': '🔴'};
let md = `# 1. Script de voix off\n\n`;
md += `> Fichier généré par \`npm run srt\` à partir de \`src/content/script.ts\` — ne pas modifier à la main.\n\n`;
md += `Durée totale estimée : **${mmss(TOTAL_FRAMES)}** (débit lent ≈ 150 mots/min, pauses comprises). `;
md += `Les minutages sont des **estimations** : ils seront recalés sur l'enregistrement réel (champ \`durationOverride\`).\n\n`;
md += `**Consignes d'enregistrement** : vouvoiement, ton calme et chaleureux, débit lent mais naturel. `;
md += `Marquer un vrai silence après chaque réplique et une pause plus longue avant chaque nouvelle étape. `;
md += `Pas de musique, ou une nappe très discrète (−30 dB sous la voix). Lire l'adresse du site lettre à lettre si nécessaire : « l-identité-numérique point laposte point f-r ».\n\n`;
md += `Légende des faits : ✅ vérifié · 🟡 corroboré, à relire sur la page officielle · 🔴 à confirmer (voir \`03-verifications.md\`).\n`;
for (const scene of TIMELINE) {
	md += `\n## ${mmss(scene.from)} — ${scene.label}${scene.step ? ` (étape ${scene.step})` : ''}\n\n`;
	md += `| Début | Texte dit | Faits |\n|---|---|---|\n`;
	for (const cue of scene.cues) {
		const facts = (cue.facts ?? [])
			.map((f) => `${STATUS[factById(f)?.status ?? 'a-confirmer']} ${f}`)
			.join('<br>');
		md += `| ${mmss(scene.from + cue.from)} | ${cue.text}${cue.hold && cue.hold >= 1 ? ' *(pause)*' : ''} | ${facts} |\n`;
	}
}
fs.writeFileSync('docs/01-script-voix-off.md', md);
console.log(`OK — ${n - 1} sous-titres, durée ${mmss(TOTAL_FRAMES)}`);
