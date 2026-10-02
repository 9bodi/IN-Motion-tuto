import React from 'react';
import {useCurrentFrame} from 'remotion';
import {cueStart, getScene} from '../content/timeline';
import {C, LAYOUT} from '../theme';
import {appear, rise} from '../components/anim';
import {SceneShell} from '../components/SceneShell';
import {Chip, FictionalTag, Instruction, PauseCard, StepTitle} from '../components/Blocks';
import {Highlight} from '../components/Highlight';
import {Phone, onScreen} from '../components/Phone';
import {
	AppWireframe,
	FormScreen,
	FORM_FIELDS,
	formFieldRect,
	HOME_TILE,
	HomeWithStore,
	homeTilePos,
	INSTALL_BTN,
	RESULT_ROW,
	SEARCH_BAR,
	SMS_FIELD,
	SmsScreen,
	SpecimenCard,
	StoreScreen,
} from '../components/Screens';
import {IconArrowRight, IconBag, IconDownload, IconKey, IconMessage, IconPerson, IconSearch} from '../components/Icons';

const scene = getScene('inscription');

export const Inscription: React.FC = () => {
	const frame = useCurrentFrame();
	const t = (id: string) => cueStart(scene, id);
	const tStore = t('store');
	const tSearch = t('search');
	const tInstall = t('check-name');
	const tLogin = t('login');
	const tSignup = t('signup');
	const tForm = t('form-data');
	const tExact = t('form-exact');
	const tSms = t('sms');
	const tPause = t('pause');

	// Remplissage progressif et fictif du formulaire, un champ à la fois.
	const fillStarts = FORM_FIELDS.map((_, i) => tForm + 30 + i * 36);

	const screen =
		frame < tSearch ? (
			<HomeWithStore />
		) : frame < tLogin ? (
			<StoreScreen typedFrom={tSearch + 10} showResults={tInstall - 6} />
		) : frame < tForm ? (
			<AppWireframe />
		) : frame < tSms ? (
			<FormScreen fillStarts={fillStarts} />
		) : (
			<SmsScreen />
		);

	const phoneP = appear(frame, tStore);
	const storeTile = homeTilePos(1, 5);

	return (
		<SceneShell scene={scene} sublabel={frame >= tStore ? 'Sur votre smartphone' : undefined}>
			<StepTitle step={1} title="Installer l’application et s’inscrire" at={0} until={tStore} />

			{frame >= tStore ? <Phone style={{opacity: phoneP, transform: `translateY(${(1 - phoneP) * 30}px)`}}>{screen}</Phone> : null}

			{/* 1. Boutique d'applications */}
			<Instruction at={tStore} until={tSearch} icon={<IconBag size={52} color={C.accent} />} title="Ouvrez la boutique d’applications">
				<div style={{display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start'}}>
					<Chip>
						iPhone <IconArrowRight size={30} color={C.ink} /> App Store
					</Chip>
					<Chip>
						Android <IconArrowRight size={30} color={C.ink} /> Google Play
					</Chip>
				</div>
			</Instruction>
			<Highlight {...onScreen({x: storeTile.x, y: storeTile.y, w: HOME_TILE, h: HOME_TILE})} at={tStore + 20} until={tSearch} label="Boutique" labelSide="left" />

			{/* 2. Recherche */}
			<Instruction at={tSearch} until={tInstall} icon={<IconSearch size={52} color={C.accent} />} title="Recherchez l’application">
				<div style={{fontSize: 44, fontWeight: 750, color: C.ink}}>« L’Identité Numérique La Poste »</div>
				<div style={{marginTop: 16}}>Vérifiez bien ce nom.</div>
			</Instruction>
			<Highlight {...onScreen(SEARCH_BAR)} at={tSearch + 4} until={tInstall} label="Recherche" labelSide="left" />

			{/* 3. Installer puis ouvrir */}
			<Instruction at={tInstall} until={tLogin} icon={<IconDownload size={52} color={C.accent} />} title="Installez-la, puis ouvrez-la">
				L’application est gratuite.
			</Instruction>
			<Highlight {...onScreen(RESULT_ROW)} at={tInstall} until={tInstall + 60} label="Le bon nom" labelSide="left" />
			<Highlight {...onScreen(INSTALL_BTN)} at={tInstall + 60} until={tLogin} label="Installer" labelSide="right" radius={28} />

			{/* 4. Se connecter ou créer un compte : schéma de décision, pas d'écran inventé */}
			{frame >= tLogin && frame < tForm ? (
				<div style={{position: 'absolute', left: LAYOUT.leftX, top: 210, width: 1040}}>
					<div style={{...rise(appear(frame, tLogin)), fontSize: 54, fontWeight: 800}}>Avez-vous un compte La Poste ?</div>
					<div style={{display: 'flex', gap: 28, marginTop: 40}}>
						{[
							{at: tLogin, icon: <IconKey size={50} color={C.accent} />, head: 'Oui', body: 'Connectez-vous avec votre e-mail et votre mot de passe.'},
							{at: tSignup, icon: <IconPerson size={50} color={C.accent} />, head: 'Non', body: 'Choisissez de créer un compte.'},
						].map((b) => {
							const p = appear(frame, b.at);
							const current = (b.at === tLogin && frame < tSignup) || (b.at === tSignup && frame >= tSignup);
							return (
								<div
									key={b.head}
									style={{
										...rise(p),
										flex: 1,
										padding: '30px 30px',
										borderRadius: 24,
										background: C.surface,
										border: `${current ? 4 : 2}px solid ${current ? C.accent : C.line}`,
										opacity: p * (current ? 1 : 0.6),
									}}
								>
									{b.icon}
									<div style={{fontSize: 46, fontWeight: 800, marginTop: 10}}>{b.head}</div>
									<div style={{fontSize: 32, lineHeight: 1.35, marginTop: 8}}>{b.body}</div>
								</div>
							);
						})}
					</div>
				</div>
			) : null}

			{/* 5. Saisie des informations (données fictives) */}
			<Instruction at={tForm} until={tExact} title="Suivez les indications à l’écran">
				<ol style={{margin: 0, paddingLeft: 40}}>
					<li>votre numéro de mobile ;</li>
					<li>les informations de votre pièce d’identité.</li>
				</ol>
				<div style={{marginTop: 26, fontSize: 26}}>
					<FictionalTag /> &nbsp;Les données affichées sont inventées.
				</div>
			</Instruction>
			{fillStarts.map((s, i) => (
				<Highlight key={i} {...onScreen(formFieldRect(i))} at={s} until={i < fillStarts.length - 1 ? fillStarts[i + 1] : tExact} />
			))}

			{frame >= tExact && frame < tSms ? (
				<div style={{position: 'absolute', left: LAYOUT.leftX, top: 200, width: 1040, ...rise(appear(frame, tExact))}}>
					<div style={{fontSize: 52, fontWeight: 800, lineHeight: 1.15}}>Recopiez exactement comme sur votre pièce d’identité</div>
					<div style={{marginTop: 40, display: 'flex', alignItems: 'center', gap: 30}}>
						<SpecimenCard width={520} />
						<IconArrowRight size={70} color={C.ink} />
					</div>
				</div>
			) : null}

			{/* 6. Code SMS éventuel */}
			<Instruction at={tSms} until={tPause} icon={<IconMessage size={52} color={C.accent} />} title="Un code par SMS ?">
				Recopiez-le dans l’application.
			</Instruction>
			<Highlight {...onScreen(SMS_FIELD)} at={tSms + 20} until={tPause} label="Code" labelSide="left" />

			<PauseCard at={tPause} text="Mettez la vidéo en pause le temps de faire cette étape, puis reprenez." />
		</SceneShell>
	);
};
