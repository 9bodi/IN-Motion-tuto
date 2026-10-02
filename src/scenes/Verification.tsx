import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {cueStart, getScene} from '../content/timeline';
import {C, LAYOUT} from '../theme';
import {activeIndex, appear, rise} from '../components/anim';
import {SceneShell} from '../components/SceneShell';
import {Instruction, PauseCard, StepTitle} from '../components/Blocks';
import {Phone} from '../components/Phone';
import {CaptureScreen} from '../components/Screens';
import {IconBuilding, IconCamera, IconFace, IconHand, IconIdCard, IconPerson, IconPhone} from '../components/Icons';

const scene = getScene('verification');

const OptionCard: React.FC<{letter: string; icon: React.ReactNode; title: string; body: string; p: number}> = ({letter, icon, title, body, p}) => (
	<div style={{...rise(p), width: 700, padding: '40px 40px', borderRadius: 30, background: C.surface, border: `2px solid ${C.line}`}}>
		<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
			<div style={{width: 72, height: 72, borderRadius: 36, border: `3px solid ${C.ink}`, fontSize: 38, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				{letter}
			</div>
			{icon}
		</div>
		<div style={{fontSize: 50, fontWeight: 800, marginTop: 24, lineHeight: 1.1}}>{title}</div>
		<div style={{fontSize: 32, marginTop: 14, color: C.inkSoft, lineHeight: 1.35}}>{body}</div>
	</div>
);

export const Verification: React.FC = () => {
	const frame = useCurrentFrame();
	const t = (id: string) => cueStart(scene, id);
	const tChoice = t('choice');
	const tOnline = t('online');
	const tFollow = t('online-follow');
	const tCheck = t('online-check');
	const tOffice = t('office');
	const tReassure = t('reassure');
	const tPause = t('pause');

	// Sous-étapes du parcours en ligne, affichées une par une.
	const tFace = tFollow + Math.round((tCheck - tFollow) * 0.5);
	const onlineSteps = [
		{at: tFollow, icon: <IconPhone size={40} color={C.accent} />, text: 'Suivez les instructions de l’application'},
		{at: tFollow + 40, icon: <IconIdCard size={40} color={C.accent} />, text: 'Filmez votre pièce d’identité'},
		{at: tFace, icon: <IconFace size={40} color={C.accent} />, text: 'Puis filmez votre visage'},
		{at: tCheck, icon: <IconPerson size={40} color={C.accent} />, text: 'Une personne vérifie ces éléments'},
	];
	const currentOnline = activeIndex(frame, onlineSteps.map((s) => s.at));

	const sublabel =
		frame >= tOnline && frame < tOffice ? 'Possibilité A — En ligne' : frame >= tOffice && frame < tReassure ? 'Possibilité B — Bureau de poste' : undefined;

	return (
		<SceneShell scene={scene} sublabel={sublabel}>
			<StepTitle step={2} title="Faire vérifier votre identité" at={0} until={tChoice} />

			{/* Les deux possibilités, côte à côte */}
			{frame >= tChoice && frame < tOnline ? (
				<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 140}}>
					<div style={{...rise(appear(frame, tChoice)), fontSize: 48, fontWeight: 800, marginBottom: 44}}>Deux possibilités, au choix</div>
					<div style={{display: 'flex', gap: 48}}>
						<OptionCard letter="A" icon={<IconPhone size={60} color={C.accent} />} title="En ligne" body="Avec votre smartphone, en suivant les instructions." p={appear(frame, tChoice + 14)} />
						<OptionCard letter="B" icon={<IconBuilding size={60} color={C.accent} />} title="En bureau de poste" body="Avec l’accompagnement d’un chargé de clientèle." p={appear(frame, tChoice + 34)} />
					</div>
				</AbsoluteFill>
			) : null}

			{/* A — En ligne */}
			{frame >= tOnline && frame < tOffice ? (
				<>
					<div style={{position: 'absolute', left: LAYOUT.leftX, top: 190, width: 1060}}>
						<div style={{...rise(appear(frame, tOnline)), display: 'flex', alignItems: 'center', gap: 20}}>
							<div style={{width: 72, height: 72, borderRadius: 36, border: `3px solid ${C.ink}`, fontSize: 38, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>A</div>
							<div style={{fontSize: 58, fontWeight: 800}}>En ligne, avec votre smartphone</div>
						</div>
						<div style={{marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18}}>
							{onlineSteps.map((s, i) =>
								frame >= s.at ? (
									<div
										key={i}
										style={{
											...rise(appear(frame, s.at)),
											display: 'flex',
											alignItems: 'center',
											gap: 20,
											padding: '18px 24px',
											borderRadius: 20,
											background: C.surface,
											border: `${i === currentOnline ? 4 : 2}px solid ${i === currentOnline ? C.accent : C.line}`,
											opacity: i === currentOnline ? 1 : 0.65,
											fontSize: 36,
											fontWeight: 650,
										}}
									>
										<span style={{fontWeight: 800, width: 34}}>{i + 1}.</span>
										{s.icon}
										{s.text}
									</div>
								) : null,
							)}
						</div>
					</div>
					{frame >= tFollow + 40 && frame < tCheck ? (
						<Phone style={{opacity: appear(frame, tFollow + 40)}}>
							<CaptureScreen mode={frame < tFace ? 'document' : 'face'} />
						</Phone>
					) : null}
					{frame >= tCheck ? (
						<div style={{position: 'absolute', left: LAYOUT.phoneX - 40, top: 260, width: 440, textAlign: 'center', ...rise(appear(frame, tCheck))}}>
							<div style={{width: 180, height: 180, borderRadius: 90, background: C.accentSoft, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
								<IconPerson size={110} color={C.accent} />
							</div>
							<div style={{fontSize: 30, fontWeight: 700, marginTop: 20, lineHeight: 1.3}}>Contrôle par une personne</div>
							<div style={{fontSize: 24, color: C.inkSoft, marginTop: 10, lineHeight: 1.35}}>Délai : voir le site officiel</div>
						</div>
					) : null}
				</>
			) : null}

			{/* B — En bureau de poste */}
			{frame >= tOffice && frame < tReassure ? (
				<div style={{position: 'absolute', left: LAYOUT.leftX, top: 190, width: 1640}}>
					<div style={{...rise(appear(frame, tOffice)), display: 'flex', alignItems: 'center', gap: 20}}>
						<div style={{width: 72, height: 72, borderRadius: 36, border: `3px solid ${C.ink}`, fontSize: 38, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>B</div>
						<div style={{fontSize: 58, fontWeight: 800}}>En bureau de poste</div>
					</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 60}}>
						{[
							{at: t('office-bring'), icon: <IconIdCard size={90} color={C.accent} />, text: 'Venez avec votre pièce d’identité'},
							{at: t('office-help'), icon: <IconPerson size={90} color={C.accent} />, text: 'Un chargé de clientèle vérifie votre identité et vous accompagne'},
						].map((b, i) => (
							<div
								key={i}
								style={{
									...rise(appear(frame, b.at)),
									opacity: frame >= b.at ? appear(frame, b.at) : 0,
									width: 700,
									minHeight: 330,
									padding: '36px 36px',
									borderRadius: 28,
									background: C.surface,
									border: `2px solid ${C.line}`,
								}}
							>
								{b.icon}
								<div style={{fontSize: 40, fontWeight: 700, marginTop: 18, lineHeight: 1.25}}>{b.text}</div>
							</div>
						))}
					</div>
				</div>
			) : null}

			{/* Rappel rassurant */}
			<Instruction at={tReassure} until={tPause} icon={<IconHand size={56} color={C.accent} />} title="Vous préférez être aidé ?" top={300}>
				<span style={{fontSize: 44, fontWeight: 700, color: C.ink}}>Choisissez le bureau de poste.</span>
			</Instruction>
			{frame >= tReassure && frame < tPause ? (
				<div style={{position: 'absolute', left: 1380, top: 280, ...rise(appear(frame, tReassure + 10))}}>
					<IconBuilding size={300} color={C.accent} stroke={1.2} />
				</div>
			) : null}

			<PauseCard at={tPause} text="Faites vérifier votre identité, en ligne ou en bureau de poste, puis reprenez la vidéo." />
		</SceneShell>
	);
};
