import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {cueStart, getScene} from '../content/timeline';
import {C, LAYOUT} from '../theme';
import {appear, rise} from '../components/anim';
import {SceneShell} from '../components/SceneShell';
import {IconInfo, IconPause, IconShield} from '../components/Icons';
import {LogoEF} from '../components/Logo';

const scene = getScene('intro');
const STEPS = ['S’inscrire', 'Faire vérifier son identité', 'Activer l’application'];

export const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const tWhat = cueStart(scene, 'what');
	const tUnofficial = cueStart(scene, 'unofficial');
	const tSteps = cueStart(scene, 'three-steps');
	const tPause = cueStart(scene, 'pause-anytime');

	// Phase 1 : titre + « pause à tout moment ». Phase 2 : à quoi ça sert + mention non officielle.
	// Phase 3 : les trois étapes.
	const phase1Out = Math.min(1, Math.max(0, (tWhat - frame) / 10));
	const phase2Out = Math.min(1, Math.max(0, (tSteps - frame) / 10));

	return (
		<SceneShell scene={scene}>
			{frame < tWhat ? (
				<AbsoluteFill style={{justifyContent: 'center', paddingLeft: LAYOUT.leftX, opacity: phase1Out}}>
					<div style={{position: 'absolute', right: 160, top: 300, opacity: appear(frame, 0, 24)}}>
						<LogoEF size={340} />
					</div>
					<div style={{...rise(appear(frame, 6)), fontSize: 32, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: 'uppercase'}}>
						Tutoriel pas à pas
					</div>
					<div style={{...rise(appear(frame, 12)), fontSize: 104, fontWeight: 800, lineHeight: 1.04, marginTop: 16, maxWidth: 1150}}>
						Créer son Identité Numérique La Poste
					</div>
					<div style={{...rise(appear(frame, 20)), fontSize: 46, color: C.inkSoft, marginTop: 20}}>étape par étape</div>
					<div
						style={{
							...rise(appear(frame, tPause)),
							marginTop: 64,
							display: 'inline-flex',
							alignSelf: 'flex-start',
							alignItems: 'center',
							gap: 18,
							padding: '16px 28px',
							borderRadius: 18,
							border: `2.5px solid ${C.ink}`,
							background: C.surface,
							fontSize: 34,
							fontWeight: 600,
						}}
					>
						<IconPause size={40} color={C.ink} /> Mettez la vidéo en pause à tout moment
					</div>
				</AbsoluteFill>
			) : null}

			{frame >= tWhat && frame < tSteps ? (
				<AbsoluteFill style={{justifyContent: 'center', paddingLeft: LAYOUT.leftX, paddingRight: 200, opacity: phase2Out}}>
					<div style={{...rise(appear(frame, tWhat)), display: 'flex', alignItems: 'center', gap: 36}}>
						<div style={{width: 130, height: 130, borderRadius: 34, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<IconShield size={80} color={C.accent} />
						</div>
						<div style={{fontSize: 64, fontWeight: 750, lineHeight: 1.15, maxWidth: 1300}}>
							Prouver qui vous êtes sur internet, en toute sécurité
						</div>
					</div>
					<div
						style={{
							...rise(appear(frame, tUnofficial)),
							marginTop: 70,
							display: 'flex',
							alignItems: 'center',
							gap: 18,
							fontSize: 34,
							color: C.ink,
							padding: '20px 28px',
							borderLeft: `8px solid ${C.ink}`,
							background: C.surface,
							maxWidth: 1300,
						}}
					>
						<IconInfo size={42} color={C.ink} />
						Tutoriel indépendant : ce n’est pas une vidéo officielle de La Poste.
					</div>
				</AbsoluteFill>
			) : null}

			{frame >= tSteps ? (
				<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 120}}>
					<div style={{...rise(appear(frame, tSteps)), fontSize: 40, fontWeight: 700, color: C.inkSoft, marginBottom: 48}}>
						Trois grandes étapes
					</div>
					<div style={{display: 'flex', gap: 40}}>
						{STEPS.map((s, i) => {
							const p = appear(frame, tSteps + 20 + i * 26);
							return (
								<div
									key={s}
									style={{
										...rise(p),
										width: 470,
										padding: '40px 36px',
										borderRadius: 28,
										background: C.surface,
										border: `2px solid ${C.line}`,
									}}
								>
									<div style={{width: 76, height: 76, borderRadius: 38, background: C.accent, color: C.onAccent, fontSize: 40, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										{i + 1}
									</div>
									<div style={{fontSize: 44, fontWeight: 750, marginTop: 26, lineHeight: 1.15}}>{s}</div>
								</div>
							);
						})}
					</div>
				</AbsoluteFill>
			) : null}
		</SceneShell>
	);
};
