import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {Bar, BlankButton, SCREEN_W} from './Phone';
import {FictionalTag} from './Blocks';
import {IconBag, IconDownload, IconFace, IconIdCard, IconLock, IconMessage, IconSearch} from './Icons';

/**
 * Écrans SCHÉMATIQUES (wireframes). Ils ne reproduisent pas l'application réelle :
 * aucun libellé de bouton n'est inventé, les textes sont représentés par des barres grises.
 * Les seules valeurs lisibles sont des données fictives, signalées comme telles.
 */

const PAD = 22;

// --- Écran d'accueil du téléphone -----------------------------------------
export const HOME_TILE = 58;
const COLS = 4;
const GAP = (SCREEN_W - PAD * 2 - COLS * HOME_TILE) / (COLS - 1);
export const homeTilePos = (col: number, row: number) => ({x: PAD + col * (HOME_TILE + GAP), y: 90 + row * 92});

export const HomeScreen: React.FC<{special?: {col: number; row: number; icon: React.ReactNode}}> = ({special}) => (
	<div style={{position: 'absolute', inset: 0, background: '#E9E6DF'}}>
		{Array.from({length: 24}).map((_, i) => {
			const col = i % COLS;
			const row = Math.floor(i / COLS);
			const pos = homeTilePos(col, row);
			const isSpecial = special && special.col === col && special.row === row;
			return (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: pos.x,
						top: pos.y,
						width: HOME_TILE,
						height: HOME_TILE,
						borderRadius: 16,
						background: isSpecial ? C.ink : '#D3CFC6',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{isSpecial ? special.icon : null}
				</div>
			);
		})}
	</div>
);

export const HomeWithStore: React.FC = () => <HomeScreen special={{col: 1, row: 5, icon: <IconBag size={34} color="#FFF" />}} />;
export const HomeWithApp: React.FC = () => <HomeScreen special={{col: 2, row: 1, icon: <IconIdCard size={34} color="#FFF" />}} />;

// --- Boutique : recherche ------------------------------------------------
export const SEARCH_BAR = {x: PAD, y: 84, w: SCREEN_W - PAD * 2, h: 56};
export const RESULT_ROW = {x: PAD - 6, y: 170, w: SCREEN_W - PAD * 2 + 12, h: 104};
export const INSTALL_BTN = {x: SCREEN_W - PAD - 56, y: 194, w: 56, h: 56};
const APP_NAME = 'L’Identité Numérique La Poste';

export const StoreScreen: React.FC<{typedFrom: number; showResults: number}> = ({typedFrom, showResults}) => {
	const frame = useCurrentFrame();
	const chars = Math.max(0, Math.min(APP_NAME.length, Math.floor((frame - typedFrom) / 1.6)));
	const results = frame >= showResults;
	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div
				style={{
					position: 'absolute',
					left: SEARCH_BAR.x,
					top: SEARCH_BAR.y,
					width: SEARCH_BAR.w,
					height: SEARCH_BAR.h,
					borderRadius: 16,
					background: C.muted,
					display: 'flex',
					alignItems: 'center',
					gap: 10,
					padding: '0 14px',
					fontSize: 17,
					fontWeight: 600,
					color: C.ink,
					whiteSpace: 'nowrap',
					overflow: 'hidden',
				}}
			>
				<IconSearch size={24} color={C.inkSoft} />
				{APP_NAME.slice(0, chars)}
				{chars < APP_NAME.length && frame >= typedFrom ? <span style={{width: 2, height: 22, background: C.ink}} /> : null}
			</div>
			{results ? (
				<>
					<div style={{position: 'absolute', left: PAD, top: 186, display: 'flex', gap: 14, alignItems: 'center', width: SCREEN_W - PAD * 2 - 66}}>
						<div style={{width: 72, height: 72, borderRadius: 18, background: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto'}}>
							<IconIdCard size={40} color="#FFF" />
						</div>
						<div style={{fontSize: 18, fontWeight: 700, lineHeight: 1.2, color: C.ink}}>{APP_NAME}</div>
					</div>
					<div
						style={{
							position: 'absolute',
							left: INSTALL_BTN.x,
							top: INSTALL_BTN.y,
							width: INSTALL_BTN.w,
							height: INSTALL_BTN.h,
							borderRadius: 28,
							border: `2.5px solid ${C.ink}`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<IconDownload size={28} color={C.ink} />
					</div>
					{[0, 1, 2].map((i) => (
						<div key={i} style={{position: 'absolute', left: PAD, top: 310 + i * 100, display: 'flex', gap: 14, alignItems: 'center', opacity: 0.8}}>
							<div style={{width: 72, height: 72, borderRadius: 18, background: '#D3CFC6'}} />
							<div>
								<Bar w={150} />
								<Bar w={100} style={{marginTop: 10}} />
							</div>
						</div>
					))}
				</>
			) : null}
		</div>
	);
};

// --- Application : écran d'accueil schématique ------------------------------
export const AppWireframe: React.FC = () => (
	<div style={{position: 'absolute', inset: 0, padding: `90px ${PAD}px`}}>
		<Bar w="70%" h={22} />
		<Bar w="50%" style={{marginTop: 16}} />
		<div style={{marginTop: 50, height: 230, borderRadius: 24, background: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			<IconIdCard size={110} color="#B9B4A9" />
		</div>
		<BlankButton filled style={{marginTop: 120}} />
		<BlankButton style={{marginTop: 16}} />
	</div>
);

// --- Formulaire avec données fictives ------------------------------------
export const FORM_FIELDS = [
	{label: 'Numéro de mobile', value: '06 39 98 00 00'},
	{label: 'Nom', value: 'EXEMPLE'},
	{label: 'Prénom', value: 'Camille'},
	{label: 'Date de naissance', value: '01/01/1980'},
];
export const formFieldRect = (i: number) => ({x: PAD - 4, y: 132 + i * 104, w: SCREEN_W - PAD * 2 + 8, h: 84});

export const FormScreen: React.FC<{fillStarts: number[]}> = ({fillStarts}) => {
	const frame = useCurrentFrame();
	return (
		<div style={{position: 'absolute', inset: 0}}>
			<div style={{position: 'absolute', left: PAD, top: 76}}>
				<FictionalTag />
			</div>
			{FORM_FIELDS.map((f, i) => {
				const r = formFieldRect(i);
				const shown = frame >= fillStarts[i];
				return (
					<div key={f.label} style={{position: 'absolute', left: r.x + 4, top: r.y, width: r.w - 8}}>
						<div style={{fontSize: 15, fontWeight: 600, color: C.inkSoft}}>{f.label}</div>
						<div
							style={{
								marginTop: 6,
								height: 48,
								borderRadius: 12,
								border: `2px solid ${C.line}`,
								display: 'flex',
								alignItems: 'center',
								padding: '0 14px',
								fontSize: 20,
								fontWeight: 600,
								color: C.ink,
							}}
						>
							{shown ? f.value : ''}
						</div>
					</div>
				);
			})}
			<BlankButton filled style={{position: 'absolute', left: PAD, right: PAD, bottom: 60}} />
		</div>
	);
};

// --- SMS ------------------------------------------------------------------
export const SMS_FIELD = {x: PAD, y: 330, w: SCREEN_W - PAD * 2, h: 64};
export const SmsScreen: React.FC = () => (
	<div style={{position: 'absolute', inset: 0}}>
		<div
			style={{
				position: 'absolute',
				left: 12,
				right: 12,
				top: 56,
				padding: 14,
				borderRadius: 20,
				background: C.ink,
				color: '#FFF',
				display: 'flex',
				gap: 12,
				alignItems: 'center',
			}}
		>
			<IconMessage size={32} color="#FFF" />
			<div style={{fontSize: 16, lineHeight: 1.3}}>
				<b>SMS</b>
				<br />
				Code : <i>masqué dans ce tutoriel</i>
			</div>
		</div>
		<div style={{position: 'absolute', left: PAD, top: 250}}>
			<Bar w={220} h={18} />
			<Bar w={160} style={{marginTop: 12}} />
		</div>
		<div
			style={{
				position: 'absolute',
				left: SMS_FIELD.x,
				top: SMS_FIELD.y,
				width: SMS_FIELD.w,
				height: SMS_FIELD.h,
				borderRadius: 14,
				border: `2px solid ${C.line}`,
			}}
		/>
	</div>
);

// --- Vérification en ligne : cadrage de la pièce puis du visage ------------
export const CaptureScreen: React.FC<{mode: 'document' | 'face'}> = ({mode}) => (
	<div style={{position: 'absolute', inset: 0, background: '#2A2D34'}}>
		{mode === 'document' ? (
			<div
				style={{
					position: 'absolute',
					left: 30,
					top: 230,
					width: SCREEN_W - 60,
					height: 180,
					borderRadius: 16,
					border: '3px dashed #FFF',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<SpecimenCard width={SCREEN_W - 90} small />
			</div>
		) : (
			<div
				style={{
					position: 'absolute',
					left: (SCREEN_W - 210) / 2,
					top: 170,
					width: 210,
					height: 280,
					borderRadius: '50%',
					border: '3px dashed #FFF',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<IconFace size={130} color="#C9CCD3" stroke={1.4} />
			</div>
		)}
		<div style={{position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center'}}>
			<div style={{width: 72, height: 72, borderRadius: 36, border: '4px solid #FFF'}} />
		</div>
	</div>
);

// --- Activation : saisie de code (aucun chiffre ni nombre de caractères montré) --
export const CODE_FIELD = {x: PAD, y: 250, w: SCREEN_W - PAD * 2, h: 70};
export const CodeScreen: React.FC<{kind: 'activation' | 'secret'}> = ({kind}) => (
	<div style={{position: 'absolute', inset: 0}}>
		<div style={{position: 'absolute', left: 0, right: 0, top: 96, display: 'flex', justifyContent: 'center'}}>
			<div style={{width: 96, height: 96, borderRadius: 48, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				{kind === 'secret' ? <IconLock size={52} color={C.accent} /> : <IconMessage size={52} color={C.accent} />}
			</div>
		</div>
		<div style={{position: 'absolute', left: PAD, top: 210}}>
			<Bar w={200} h={16} />
		</div>
		<div
			style={{
				position: 'absolute',
				left: CODE_FIELD.x,
				top: CODE_FIELD.y,
				width: CODE_FIELD.w,
				height: CODE_FIELD.h,
				borderRadius: 14,
				border: `2px solid ${C.line}`,
			}}
		/>
		<div style={{position: 'absolute', left: PAD + 10, right: PAD + 10, top: 360, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
			{Array.from({length: 12}).map((_, i) => (
				<div key={i} style={{height: 56, borderRadius: 14, background: i === 9 || i === 11 ? 'transparent' : C.muted}} />
			))}
		</div>
	</div>
);

// --- Pièce d'identité fictive (ne reproduit aucun modèle réel) -----------------
export const SpecimenCard: React.FC<{width?: number; small?: boolean}> = ({width = 520, small}) => {
	const s = width / 520;
	return (
		<div
			style={{
				width,
				height: 320 * s,
				borderRadius: 18 * s,
				background: '#FFFFFF',
				border: `${Math.max(2, 3 * s)}px solid ${C.ink}`,
				position: 'relative',
				overflow: 'hidden',
				fontSize: 26 * s,
				color: C.ink,
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'repeating-linear-gradient(135deg, transparent 0 22px, rgba(21,23,28,0.05) 22px 44px)',
				}}
			/>
			<div style={{position: 'absolute', left: 22 * s, top: 18 * s, fontWeight: 800, letterSpacing: 2 * s}}>DOCUMENT FICTIF</div>
			<div style={{position: 'absolute', left: 22 * s, top: 74 * s, width: 130 * s, height: 160 * s, borderRadius: 12 * s, background: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<IconFace size={90 * s} color="#9A968C" stroke={1.6} />
			</div>
			{!small ? (
				<div style={{position: 'absolute', left: 180 * s, top: 80 * s, lineHeight: 1.5}}>
					<div>
						Nom : <b>EXEMPLE</b>
					</div>
					<div>
						Prénom : <b>Camille</b>
					</div>
					<div>
						Né(e) le : <b>01/01/1980</b>
					</div>
				</div>
			) : (
				<div style={{position: 'absolute', left: 180 * s, top: 90 * s}}>
					<Bar w={200 * s} h={16 * s} />
					<Bar w={150 * s} h={16 * s} style={{marginTop: 18 * s}} />
					<Bar w={170 * s} h={16 * s} style={{marginTop: 18 * s}} />
				</div>
			)}
			<div
				style={{
					position: 'absolute',
					right: -40 * s,
					bottom: 34 * s,
					transform: 'rotate(-14deg)',
					border: `${3 * s}px solid ${C.ink}`,
					padding: `${4 * s}px ${30 * s}px`,
					fontWeight: 900,
					fontSize: 30 * s,
					letterSpacing: 4 * s,
					background: '#FFFFFF',
				}}
			>
				SPÉCIMEN
			</div>
		</div>
	);
};
