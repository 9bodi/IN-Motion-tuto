import React from 'react';
import {useCurrentFrame} from 'remotion';
import {cueStart, getScene} from '../content/timeline';
import {C} from '../theme';
import {activeIndex, appear, rise} from '../components/anim';
import {SceneShell} from '../components/SceneShell';
import {IconCake, IconCheck, IconGlobe, IconIdCard, IconKey, IconPhone} from '../components/Icons';

const scene = getScene('prerequis');

const ITEMS = [
	{cue: 'age', icon: IconCake, title: '18 ans révolus'},
	{cue: 'id-doc', icon: IconIdCard, title: 'Une pièce d’identité acceptée, en cours de validité'},
	{cue: 'phone', icon: IconPhone, title: 'Un smartphone compatible et un numéro de mobile éligible'},
];

const DOCS = [
	'Carte nationale d’identité française',
	'Passeport français',
	'Titre de séjour français valable 5 ans ou plus',
];

const Panel: React.FC<{at: number; until?: number; children: React.ReactNode}> = ({at, until, children}) => {
	const frame = useCurrentFrame();
	if (frame < at || (until !== undefined && frame >= until)) return null;
	const out = until !== undefined ? Math.min(1, (until - frame) / 8) : 1;
	return (
		<div style={{position: 'absolute', left: 1010, top: 170, width: 790, opacity: out, ...rise(appear(frame, at))}}>
			{children}
		</div>
	);
};

export const Prerequis: React.FC = () => {
	const frame = useCurrentFrame();
	const starts = ITEMS.map((it) => cueStart(scene, it.cue));
	const tAccount = cueStart(scene, 'account');
	const current = frame >= tAccount ? -1 : activeIndex(frame, starts);
	const tList = cueStart(scene, 'id-list');
	const tVersions = cueStart(scene, 'phone-versions');

	return (
		<SceneShell scene={scene}>
			<div style={{position: 'absolute', left: 140, top: 120, ...rise(appear(frame, 4))}}>
				<div style={{fontSize: 30, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: 'uppercase'}}>Avant de commencer</div>
				<div style={{fontSize: 56, fontWeight: 800, marginTop: 8}}>Vérifiez ces 3 conditions</div>
			</div>

			{/* Checklist : un élément à la fois */}
			<div style={{position: 'absolute', left: 140, top: 300, width: 800, display: 'flex', flexDirection: 'column', gap: 26}}>
				{ITEMS.map((it, i) => {
					const p = appear(frame, starts[i]);
					if (frame < starts[i]) return null;
					const isCurrent = i === current;
					const Icon = it.icon;
					return (
						<div
							key={it.cue}
							style={{
								...rise(p),
								display: 'flex',
								alignItems: 'center',
								gap: 24,
								padding: '24px 28px',
								borderRadius: 22,
								background: C.surface,
								border: `${isCurrent ? 4 : 2}px solid ${isCurrent ? C.accent : C.line}`,
								opacity: p * (current === -1 || isCurrent ? 1 : 0.65),
							}}
						>
							<div style={{width: 64, height: 64, borderRadius: 32, border: `3px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto'}}>
								<IconCheck size={38} color={C.ink} stroke={3} />
							</div>
							<Icon size={52} color={C.accent} />
							<div style={{fontSize: 36, fontWeight: 700, lineHeight: 1.2}}>{it.title}</div>
						</div>
					);
				})}
			</div>

			{/* Détail de l'élément courant, à droite */}
			<Panel at={starts[0]} until={starts[1]}>
				<div style={{fontSize: 200, fontWeight: 800, color: C.accent, lineHeight: 1}}>18 ans</div>
				<div style={{fontSize: 40, marginTop: 24, lineHeight: 1.35}}>
					<b>« Révolus »</b> = vous avez déjà fêté vos 18 ans.
				</div>
			</Panel>

			<Panel at={starts[1]} until={starts[2]}>
				<div style={{fontSize: 34, fontWeight: 700, marginBottom: 22}}>Pièces acceptées, en cours de validité :</div>
				{DOCS.map((d, i) => (
					<div
						key={d}
						style={{
							...rise(appear(frame, tList + i * 30)),
							display: 'flex',
							alignItems: 'center',
							gap: 20,
							padding: '18px 22px',
							marginBottom: 16,
							borderRadius: 18,
							background: C.surface,
							border: `2px solid ${C.line}`,
							fontSize: 32,
							fontWeight: 600,
						}}
					>
						<IconIdCard size={46} color={C.accent} />
						{d}
					</div>
				))}
				<div style={{...rise(appear(frame, tList)), fontSize: 26, color: C.inkSoft, marginTop: 14}}>
					Les autres pièces ne sont pas acceptées.
				</div>
			</Panel>

			<Panel at={starts[2]} until={tAccount}>
				<div style={{display: 'flex', gap: 22}}>
					{[
						{os: 'Android', v: 'version 12 ou plus'},
						{os: 'iPhone (iOS)', v: 'version 16 ou plus'},
					].map((x, i) => (
						<div
							key={x.os}
							style={{
								...rise(appear(frame, tVersions + i * 20)),
								flex: 1,
								padding: '28px 26px',
								borderRadius: 22,
								background: C.surface,
								border: `2px solid ${C.line}`,
							}}
						>
							<IconPhone size={56} color={C.accent} />
							<div style={{fontSize: 38, fontWeight: 800, marginTop: 12}}>{x.os}</div>
							<div style={{fontSize: 32, marginTop: 6}}>{x.v}</div>
						</div>
					))}
				</div>
				<div style={{fontSize: 32, marginTop: 30, lineHeight: 1.4}}>
					+ un <b>numéro de mobile éligible</b>
				</div>
				<div style={{fontSize: 26, color: C.inkSoft, marginTop: 10, lineHeight: 1.4}}>
					La version figure dans les paramètres du téléphone.
				</div>
				<div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 600, marginTop: 28}}>
					<IconGlobe size={36} color={C.ink} /> Conditions à jour : site officiel
				</div>
			</Panel>

			<Panel at={tAccount}>
				<div style={{padding: '36px 36px', borderRadius: 26, background: C.surface, border: `4px solid ${C.accent}`}}>
					<IconKey size={64} color={C.accent} />
					<div style={{fontSize: 40, fontWeight: 800, marginTop: 16, lineHeight: 1.2}}>Déjà un compte La Poste ?</div>
					<div style={{fontSize: 34, marginTop: 14, lineHeight: 1.4}}>
						Gardez à portée de main :<br />
						• votre adresse e-mail<br />• votre mot de passe
					</div>
				</div>
			</Panel>
		</SceneShell>
	);
};
