import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {cueStart, getScene} from '../content/timeline';
import {C} from '../theme';
import {appear, rise} from '../components/anim';
import {SceneShell} from '../components/SceneShell';
import {IconBuilding, IconCheck, IconGlobe, IconInfo} from '../components/Icons';

const scene = getScene('conclusion');
const STEPS = [
	{cue: 'step1', text: 'S’inscrire'},
	{cue: 'step2', text: 'Faire vérifier son identité'},
	{cue: 'step3', text: 'Activer l’application'},
];

export const Conclusion: React.FC = () => {
	const frame = useCurrentFrame();
	const t = (id: string) => cueStart(scene, id);
	const tSite = t('site');
	const tThanks = t('thanks');

	return (
		<SceneShell scene={scene}>
			{frame < tSite ? (
				<AbsoluteFill style={{justifyContent: 'flex-start', paddingLeft: 140, paddingTop: 300}}>
					<div style={{...rise(appear(frame, t('recap'))), fontSize: 34, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: 'uppercase'}}>
						Récapitulatif
					</div>
					<div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 26}}>
						{STEPS.map((s, i) => {
							const at = t(s.cue);
							if (frame < at) return null;
							return (
								<div key={s.cue} style={{...rise(appear(frame, at)), display: 'flex', alignItems: 'center', gap: 30}}>
									<div style={{width: 92, height: 92, borderRadius: 46, background: C.accent, color: C.onAccent, fontSize: 48, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										{i + 1}
									</div>
									<div style={{fontSize: 72, fontWeight: 800}}>{s.text}</div>
									<IconCheck size={64} color={C.ink} stroke={3} />
								</div>
							);
						})}
					</div>
				</AbsoluteFill>
			) : (
				<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 140}}>
					<div style={{...rise(appear(frame, tSite)), display: 'flex', alignItems: 'center', gap: 26}}>
						<IconGlobe size={76} color={C.accent} />
						<div style={{fontSize: 34, fontWeight: 600, color: C.inkSoft}}>Site officiel</div>
					</div>
					<div style={{...rise(appear(frame, tSite + 8)), fontSize: 86, fontWeight: 850, marginTop: 14, letterSpacing: -1}}>lidentitenumerique.laposte.fr</div>
					<div
						style={{
							...rise(appear(frame, t('help'))),
							opacity: frame >= t('help') ? 1 : 0,
							marginTop: 64,
							display: 'flex',
							alignItems: 'center',
							gap: 24,
							padding: '24px 36px',
							borderRadius: 24,
							background: C.surface,
							border: `3px solid ${C.ink}`,
							fontSize: 42,
							fontWeight: 700,
						}}
					>
						<IconBuilding size={64} color={C.accent} />
						Besoin d’aide ? Rendez-vous en bureau de poste.
					</div>
					{frame >= tThanks ? (
						<div style={{...rise(appear(frame, tThanks)), marginTop: 50, display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: C.inkSoft, maxWidth: 1300, textAlign: 'center'}}>
							<IconInfo size={30} color={C.inkSoft} />
							Tutoriel indépendant, non affilié à La Poste. Les écrans sont illustratifs ; les données présentées sont fictives.
						</div>
					) : null}
				</AbsoluteFill>
			)}
		</SceneShell>
	);
};
