import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {cueStart, getScene} from '../content/timeline';
import {C} from '../theme';
import {appear, rise} from '../components/anim';
import {SceneShell} from '../components/SceneShell';
import {Instruction, PauseCard, StepTitle} from '../components/Blocks';
import {Highlight} from '../components/Highlight';
import {Phone, onScreen} from '../components/Phone';
import {CODE_FIELD, CodeScreen, HOME_TILE, HomeWithApp, homeTilePos} from '../components/Screens';
import {IconIdCard, IconLock, IconMessage, IconNoShare, IconShield} from '../components/Icons';

const scene = getScene('activation');

export const Activation: React.FC = () => {
	const frame = useCurrentFrame();
	const t = (id: string) => cueStart(scene, id);
	const tOpen = t('open');
	const tCode = t('activation-code');
	const tSecret = t('secret');
	const tPersonal = t('personal');
	const tPause = t('pause');
	const appTile = homeTilePos(2, 1);

	return (
		<SceneShell scene={scene}>
			<StepTitle step={3} title="Activer votre Identité Numérique" at={0} until={tOpen} />

			{frame >= tOpen && frame < tPersonal ? (
				<Phone style={{opacity: appear(frame, tOpen)}}>
					{frame < tCode ? <HomeWithApp /> : frame < tSecret ? <CodeScreen kind="activation" /> : <CodeScreen kind="secret" />}
				</Phone>
			) : null}

			<Instruction at={tOpen} until={tCode} icon={<IconIdCard size={52} color={C.accent} />} title="Une fois votre identité vérifiée, ouvrez l’application" />
			<Highlight {...onScreen({...appTile, w: HOME_TILE, h: HOME_TILE})} at={tOpen + 16} until={tCode} label="Application" labelSide="left" />

			<Instruction at={tCode} until={tSecret} icon={<IconMessage size={52} color={C.accent} />} title="Saisissez votre code d’activation">
				Suivez les instructions affichées.
			</Instruction>
			<Highlight {...onScreen(CODE_FIELD)} at={tCode + 10} until={tSecret} label="Code d’activation" labelSide="left" />

			<Instruction at={tSecret} until={tPersonal} icon={<IconLock size={52} color={C.accent} />} title="Choisissez votre code secret">
				Il vous servira à confirmer vos connexions, depuis l’application.
			</Instruction>
			<Highlight {...onScreen(CODE_FIELD)} at={tSecret + 10} until={tPersonal} label="Code secret" labelSide="left" />

			{frame >= tPersonal && frame < tPause ? (
				<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 140}}>
					<div
						style={{
							...rise(appear(frame, tPersonal), 30),
							display: 'flex',
							alignItems: 'center',
							gap: 50,
							padding: '56px 70px',
							borderRadius: 34,
							background: C.surface,
							border: `5px solid ${C.ink}`,
							maxWidth: 1400,
						}}
					>
						<IconShield size={170} color={C.accent} stroke={1.6} />
						<div>
							<div style={{fontSize: 68, fontWeight: 850, lineHeight: 1.1}}>Ce code est personnel.</div>
							<div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 50, fontWeight: 700, marginTop: 20}}>
								<IconNoShare size={58} color={C.ink} />
								Ne le communiquez à personne.
							</div>
						</div>
					</div>
				</AbsoluteFill>
			) : null}

			<PauseCard at={tPause} text="Activez votre Identité Numérique, puis reprenez la vidéo." />
		</SceneShell>
	);
};
