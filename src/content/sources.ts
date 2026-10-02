/**
 * Registre des faits énoncés dans la vidéo, avec leur source et leur statut.
 *
 * Statuts :
 *  - 'corrobore'   : retrouvé dans des extraits indexés des domaines officiels
 *                    (lidentitenumerique.laposte.fr / aide.lidentitenumerique.laposte.fr),
 *                    mais page non relue en direct : à relire avant diffusion.
 *  - 'a-confirmer' : source secondaire ou divergente ; formulation volontairement prudente.
 *
 * Aucune information n'est marquée 'verifie' tant qu'un humain n'a pas relu la page
 * officielle à jour. Voir docs/03-verifications.md.
 */

export type FactStatus = 'verifie' | 'corrobore' | 'a-confirmer';

export type Fact = {
	id: string;
	claim: string;
	status: FactStatus;
	sources: string[];
	note?: string;
};

const COMMENT = 'https://lidentitenumerique.laposte.fr/comment-lobtenir';
const QUI =
	'https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/qui-peut-creer-une-identite-numerique-la-poste-x2Q0shoa9U/Steps/101476';
const APPLI =
	'https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/comment-creer-mon-identite-numerique-la-poste-sur-lapplication-mobile-tm6n8u78iu/Steps/101477,225692,870049,101548';
const EN_LIGNE =
	'https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/verifier-mon-identite-en-ligne-XOTUIAs7fX/Steps/101488,371087,371169';
const BUREAU =
	'https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/comment-faire-verifier-mon-identite-en-bureau-de-poste-GvOPos173Q/Steps/101487';
const CGU = 'https://lidentitenumerique.laposte.fr/cgu';

export const FACTS: Fact[] = [
	{
		id: 'usage',
		claim: 'L’Identité Numérique permet de prouver son identité en ligne de façon sécurisée.',
		status: 'corrobore',
		sources: ['https://www.franceconnect.gouv.fr/comptes-disponibles/l-identite-numerique-la-poste/'],
	},
	{
		id: 'trois-etapes',
		claim: 'Parcours en trois étapes : inscription, vérification d’identité, activation.',
		status: 'corrobore',
		sources: [COMMENT, CGU],
	},
	{
		id: 'age',
		claim: 'Être majeur, 18 ans révolus.',
		status: 'corrobore',
		sources: [COMMENT, QUI],
	},
	{
		id: 'pieces',
		claim:
			'Pièce d’identité française en cours de validité : CNI française, passeport français, ou titre de séjour français d’une durée de validité ≥ 5 ans.',
		status: 'corrobore',
		sources: [COMMENT, QUI],
		note: 'Vérifier le cas des CNI « périmées » de plus de 5 ans (prolongation) : non traité dans la vidéo.',
	},
	{
		id: 'smartphone',
		claim: 'Smartphone Android 12 ou plus, iOS 16 ou plus.',
		status: 'a-confirmer',
		sources: [COMMENT, QUI],
		note: 'Un autre extrait officiel cite iOS 15 / Android 10 pour la vérification à distance. Divergence à lever.',
	},
	{
		id: 'mobile',
		claim: 'Numéro de téléphone mobile éligible (liste d’indicatifs pays / DROM).',
		status: 'corrobore',
		sources: [COMMENT, QUI],
		note: 'La liste exacte des indicatifs éligibles n’a pas pu être lue : non détaillée dans la vidéo.',
	},
	{
		id: 'compte',
		claim:
			'Dans l’application : connexion avec e-mail et mot de passe si l’on a un compte La Poste, sinon création d’un compte.',
		status: 'corrobore',
		sources: [APPLI],
		note: 'Libellé exact du bouton de création de compte non affiché à l’écran (wireframe sans libellé).',
	},
	{
		id: 'stores',
		claim: 'Application téléchargeable sur l’App Store et Google Play.',
		status: 'corrobore',
		sources: [COMMENT, APPLI],
	},
	{
		id: 'app-nom',
		claim: 'Nom de l’application : « L’Identité Numérique La Poste ».',
		status: 'corrobore',
		sources: [COMMENT, CGU],
		note: 'Nom exact affiché dans les boutiques et nom de l’éditeur à relever sur un téléphone.',
	},
	{
		id: 'gratuit',
		claim: 'Téléchargement gratuit.',
		status: 'corrobore',
		sources: [COMMENT],
	},
	{
		id: 'saisie',
		claim: 'Saisie du numéro de mobile et des informations figurant sur la pièce d’identité.',
		status: 'a-confirmer',
		sources: [
			COMMENT,
			'https://formation.paysdelaloire.cci.fr/sites/default/files/2023-02/Tuto_Creer-son-Identite-Numerique_La%20Poste_V1.pdf',
		],
		note: 'Ordre exact des écrans non vérifié : la vidéo ne montre qu’un formulaire générique fictif.',
	},
	{
		id: 'sms',
		claim: 'Code de vérification reçu par SMS lors de l’inscription.',
		status: 'a-confirmer',
		sources: [
			'https://formation.paysdelaloire.cci.fr/sites/default/files/2023-02/Tuto_Creer-son-Identite-Numerique_La%20Poste_V1.pdf',
		],
		note: 'Source secondaire (2023). Formulation conditionnelle dans la vidéo : « Si vous recevez un code par SMS… ».',
	},
	{
		id: 'deux-canaux',
		claim: 'Vérification d’identité en ligne ou en bureau de poste.',
		status: 'corrobore',
		sources: [COMMENT, EN_LIGNE, BUREAU],
	},
	{
		id: 'en-ligne',
		claim:
			'Vérification en ligne via l’application : vidéo de la pièce d’identité et du visage, contrôlée ensuite par un opérateur.',
		status: 'a-confirmer',
		sources: [EN_LIGNE, CGU],
		note: 'Délai de contrôle volontairement NON cité (extraits divergents : 3 h hors week-end / 48 h).',
	},
	{
		id: 'bureau',
		claim: 'Vérification en bureau de poste avec la pièce d’identité, avec un chargé de clientèle.',
		status: 'corrobore',
		sources: [BUREAU, COMMENT],
		note: 'Vérifier s’il faut aussi apporter son smartphone : non dit dans la vidéo.',
	},
	{
		id: 'activation',
		claim: 'Activation dans l’application : saisie du code d’activation puis choix du code secret.',
		status: 'corrobore',
		sources: [CGU],
		note: 'Mode de réception du code d’activation et délai d’activation (1 mois selon CGU) non cités.',
	},
	{
		id: 'code-secret',
		claim: 'Le code secret sert à confirmer les connexions depuis l’application.',
		status: 'corrobore',
		sources: [CGU],
		note: 'Nombre de chiffres volontairement NON cité ni montré (4 selon CGU, à confirmer).',
	},
];

export const factById = (id: string) => FACTS.find((f) => f.id === id);
