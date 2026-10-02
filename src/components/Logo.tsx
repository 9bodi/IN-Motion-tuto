import React from 'react';
import {Img, staticFile} from 'remotion';

/** Logo EF (auteur du tutoriel), fourni par le commanditaire : public/logo-ef.png. */
export const LogoEF: React.FC<{size: number; style?: React.CSSProperties}> = ({size, style}) => (
	<Img src={staticFile('logo-ef.png')} alt="Logo EF" style={{width: size, height: size, objectFit: 'contain', ...style}} />
);
