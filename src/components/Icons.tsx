import React from 'react';

/** Pictogrammes au trait, dessinés pour ce tutoriel (aucun logo de marque). */
type P = {size?: number; color?: string; stroke?: number};

const Svg: React.FC<P & {children: React.ReactNode}> = ({size = 48, color = 'currentColor', stroke = 2.2, children}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke={color}
		strokeWidth={stroke}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
	>
		{children}
	</svg>
);

export const IconCheck: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M5 12.5l4.5 4.5L19 7.5" />
	</Svg>
);
export const IconPause: React.FC<P> = (p) => (
	<Svg {...p}>
		<rect x="6" y="5" width="4" height="14" rx="1" />
		<rect x="14" y="5" width="4" height="14" rx="1" />
	</Svg>
);
export const IconPhone: React.FC<P> = (p) => (
	<Svg {...p}>
		<rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
		<path d="M10.5 18.5h3" />
	</Svg>
);
export const IconIdCard: React.FC<P> = (p) => (
	<Svg {...p}>
		<rect x="2.5" y="5" width="19" height="14" rx="2" />
		<circle cx="8.5" cy="11" r="2.2" />
		<path d="M5.5 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4M14 10h4.5M14 13.5h4.5" />
	</Svg>
);
export const IconCake: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M4 20h16M5 20v-7h14v7M5 16c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0" />
		<path d="M12 13V9M12 6.5c-.8-.8-.8-1.8 0-3 .8 1.2.8 2.2 0 3z" />
	</Svg>
);
export const IconBag: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M5 8h14l-1.2 12.5H6.2z" />
		<path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
	</Svg>
);
export const IconSearch: React.FC<P> = (p) => (
	<Svg {...p}>
		<circle cx="10.5" cy="10.5" r="6" />
		<path d="M15 15l5 5" />
	</Svg>
);
export const IconDownload: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14" />
	</Svg>
);
export const IconLock: React.FC<P> = (p) => (
	<Svg {...p}>
		<rect x="5" y="10.5" width="14" height="10" rx="2" />
		<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
	</Svg>
);
export const IconShield: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z" />
		<path d="M8.5 12l2.5 2.5 4.5-5" />
	</Svg>
);
export const IconBuilding: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M3 21h18M4.5 21V10M19.5 21V10M2.5 10L12 4l9.5 6" />
		<path d="M8 21v-6h8v6M8 12.5h0M16 12.5h0" />
	</Svg>
);
export const IconPerson: React.FC<P> = (p) => (
	<Svg {...p}>
		<circle cx="12" cy="8" r="3.5" />
		<path d="M5 20.5c.9-3.8 3.6-5.8 7-5.8s6.1 2 7 5.8" />
	</Svg>
);
export const IconFace: React.FC<P> = (p) => (
	<Svg {...p}>
		<ellipse cx="12" cy="12" rx="6.5" ry="8.5" />
		<path d="M9.5 10.5h0M14.5 10.5h0M9.5 15c1.5 1.2 3.5 1.2 5 0" />
	</Svg>
);
export const IconCamera: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M3.5 8h4l1.5-2.5h6L16.5 8h4v11h-17z" />
		<circle cx="12" cy="13" r="3.5" />
	</Svg>
);
export const IconInfo: React.FC<P> = (p) => (
	<Svg {...p}>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 11v5.5M12 7.5h0" />
	</Svg>
);
export const IconGlobe: React.FC<P> = (p) => (
	<Svg {...p}>
		<circle cx="12" cy="12" r="9" />
		<path d="M3 12h18M12 3c2.5 2.7 3.7 5.7 3.7 9s-1.2 6.3-3.7 9c-2.5-2.7-3.7-5.7-3.7-9S9.5 5.7 12 3z" />
	</Svg>
);
export const IconKey: React.FC<P> = (p) => (
	<Svg {...p}>
		<circle cx="8" cy="15" r="4" />
		<path d="M11 12l8.5-8.5M16 7l2.5 2.5M14 9l2 2" />
	</Svg>
);
export const IconMessage: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M4 5h16v11H9l-5 4z" />
		<path d="M8 9.5h8M8 12.5h5" />
	</Svg>
);
export const IconNoShare: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M4 5h16v11H9l-5 4z" />
		<path d="M3 3l18 18" />
	</Svg>
);
export const IconArrowRight: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5" />
	</Svg>
);
export const IconHand: React.FC<P> = (p) => (
	<Svg {...p}>
		<path d="M3 13.5l3.5-1 4.5 2.5h3.5a1.5 1.5 0 0 1 0 3H10" />
		<path d="M14.5 18h3.2l3.3-3.2a1.4 1.4 0 0 0-2-2l-2.5 2" />
		<path d="M3 20.5l3-1.5" />
	</Svg>
);
