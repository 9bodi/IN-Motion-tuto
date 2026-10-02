import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, DRAFT_MODE} from '../theme';
import {IconInfo} from './Icons';
import {LogoEF} from './Logo';

const STEPS = ['S’inscrire', 'Vérifier son identité', 'Activer'];

/**
 * Habillage permanent : indicateur d'étape (numéros + libellés, pas seulement la couleur),
 * mention « tutoriel indépendant », bandeau de version de travail.
 */
export const Chrome: React.FC<{step?: number; sublabel?: string}> = ({step, sublabel}) => (
	<AbsoluteFill style={{pointerEvents: 'none'}}>
		{step ? (
			<div style={{position: 'absolute', left: 140, top: 44, display: 'flex', alignItems: 'center', gap: 28}}>
				{STEPS.map((label, i) => {
					const n = i + 1;
					const current = n === step;
					const done = n < step;
					return (
						<div key={label} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: current ? 1 : 0.62}}>
							<div
								style={{
									width: 40,
									height: 40,
									borderRadius: 20,
									border: `2.5px solid ${current ? C.accent : C.inkSoft}`,
									background: current ? C.accent : 'transparent',
									color: current ? C.onAccent : C.inkSoft,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 700,
									fontSize: 20,
								}}
							>
								{done ? '✓' : n}
							</div>
							<div style={{fontSize: 22, fontWeight: current ? 700 : 500, color: C.ink, textDecoration: current ? 'underline' : 'none', textUnderlineOffset: 6}}>
								{label}
							</div>
						</div>
					);
				})}
				{sublabel ? (
					<div style={{marginLeft: 12, padding: '6px 16px', borderRadius: 999, border: `2px solid ${C.ink}`, fontSize: 20, fontWeight: 600, color: C.ink}}>
						{sublabel}
					</div>
				) : null}
			</div>
		) : null}
		<div
			style={{
				position: 'absolute',
				right: 48,
				top: 32,
				display: 'flex',
				alignItems: 'center',
				gap: 8,
				fontSize: 18,
				color: C.inkSoft,
				fontWeight: 500,
			}}
		>
			<IconInfo size={22} color={C.inkSoft} />
			Tutoriel indépendant — non officiel
			<LogoEF size={52} style={{marginLeft: 10}} />
		</div>
		{DRAFT_MODE ? (
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					right: 0,
					height: 26,
					background: '#7A1F1F',
					color: '#FFF',
					fontSize: 15,
					fontWeight: 700,
					letterSpacing: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				VERSION DE TRAVAIL — voix off non intégrée · informations à valider avant diffusion
			</div>
		) : null}
	</AbsoluteFill>
);
