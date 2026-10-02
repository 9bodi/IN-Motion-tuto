/**
 * Script de voix off — source unique.
 *
 * Chaque réplique (cue) alimente à la fois :
 *  - les sous-titres synchronisés (2 lignes maximum, vérifié automatiquement) ;
 *  - le minutage des scènes (durée estimée à partir d'un débit lent) ;
 *  - l'export SRT (npm run srt).
 *
 * Les animations de chaque scène se calent sur l'identifiant (`id`) des répliques.
 * Lorsqu'un enregistrement de voix off existera, on remplacera la durée estimée
 * par la durée réelle via `durationOverride` (en secondes).
 *
 * `facts` renvoie aux points listés dans src/content/sources.ts : toute réplique
 * qui énonce une information factuelle sur le service doit y être rattachée.
 */

export type Cue = {
	id: string;
	text: string;
	/** Silence supplémentaire après la réplique (secondes). */
	hold?: number;
	/** Durée réelle mesurée sur l'enregistrement (secondes). */
	durationOverride?: number;
	/** Identifiants des faits sourcés (voir sources.ts). */
	facts?: string[];
};

export type SceneDef = {
	id: string;
	/** Libellé court, utilisé dans l'indicateur d'étape et le storyboard. */
	label: string;
	/** Numéro d'étape (1 à 3) pour les scènes « procédure ». */
	step?: number;
	cues: Cue[];
};

export const SCENES: SceneDef[] = [
	{
		id: 'intro',
		label: 'Introduction',
		cues: [
			{
				id: 'promise',
				text: 'Bonjour. Nous allons créer votre Identité Numérique La Poste, une étape à la fois.',
			},
			{
				id: 'pause-anytime',
				text: 'Vous pouvez mettre cette vidéo en pause à tout moment.',
				hold: 0.6,
			},
			{
				id: 'what',
				text: 'Elle sert à prouver qui vous êtes sur internet, en toute sécurité.',
				facts: ['usage'],
			},
			{
				id: 'unofficial',
				text: 'Ce tutoriel est indépendant. Ce n’est pas une vidéo officielle de La Poste.',
			},
			{
				id: 'three-steps',
				text: 'Il y a trois grandes étapes : s’inscrire, faire vérifier son identité, puis activer l’application.',
				hold: 1.2,
				facts: ['trois-etapes'],
			},
		],
	},
	{
		id: 'prerequis',
		label: 'Avant de commencer',
		cues: [
			{id: 'intro', text: 'Avant de commencer, vérifions trois conditions.', hold: 0.4},
			{
				id: 'age',
				text: 'Un : avoir 18 ans révolus, c’est-à-dire avoir déjà fêté ses 18 ans.',
				hold: 0.6,
				facts: ['age'],
			},
			{
				id: 'id-doc',
				text: 'Deux : avoir une pièce d’identité française, en cours de validité.',
				facts: ['pieces'],
			},
			{
				id: 'id-list',
				text: 'Seules ces pièces sont acceptées : la carte d’identité française, le passeport français…',
				facts: ['pieces'],
			},
			{
				id: 'id-list-2',
				text: '… ou un titre de séjour français valable au moins cinq ans.',
				hold: 0.8,
				facts: ['pieces'],
			},
			{
				id: 'phone',
				text: 'Trois : avoir un smartphone compatible, et un numéro de mobile éligible.',
				facts: ['smartphone', 'mobile'],
			},
			{
				id: 'phone-versions',
				text: 'Il faut un téléphone Android version 12 ou plus, ou un iPhone avec iOS 16 ou plus.',
				facts: ['smartphone'],
			},
			{
				id: 'phone-site',
				text: 'Les conditions à jour sont indiquées sur le site officiel.',
				hold: 0.6,
			},
			{
				id: 'account',
				text: 'Vous avez déjà un compte La Poste ? Gardez votre e-mail et votre mot de passe à portée de main.',
				hold: 0.6,
				facts: ['compte'],
			},
		],
	},
	{
		id: 'inscription',
		label: 'Installer l’application et s’inscrire',
		step: 1,
		cues: [
			{id: 'title', text: 'Étape 1 : installer l’application et vous inscrire.', hold: 0.6},
			{
				id: 'store',
				text: 'Ouvrez la boutique d’applications : App Store sur iPhone, Google Play sur Android.',
				facts: ['stores'],
			},
			{
				id: 'search',
				text: 'Recherchez : L’Identité Numérique La Poste. Vérifiez bien ce nom.',
				facts: ['app-nom'],
			},
			{
				id: 'check-name',
				text: 'L’application est gratuite. Installez-la, puis ouvrez-la.',
				hold: 0.5,
				facts: ['gratuit'],
			},
			{
				id: 'login',
				text: 'Vous avez un compte La Poste ? Connectez-vous avec votre e-mail et votre mot de passe.',
				facts: ['compte'],
			},
			{id: 'signup', text: 'Sinon, choisissez de créer un compte.', hold: 0.6, facts: ['compte']},
			{
				id: 'form-data',
				text: 'Suivez les indications : votre numéro de mobile, puis les informations de votre pièce d’identité.',
				facts: ['saisie'],
			},
			{
				id: 'form-exact',
				text: 'Recopiez-les exactement comme sur votre pièce d’identité.',
			},
			{
				id: 'sms',
				text: 'Si vous recevez un code par SMS, recopiez-le dans l’application.',
				hold: 0.8,
				facts: ['sms'],
			},
			{
				id: 'pause',
				text: 'À vous ! Mettez la vidéo en pause le temps de faire cette étape.',
				hold: 2,
			},
		],
	},
	{
		id: 'verification',
		label: 'Faire vérifier son identité',
		step: 2,
		cues: [
			{id: 'title', text: 'Étape 2 : faire vérifier votre identité.', hold: 0.6},
			{
				id: 'choice',
				text: 'Vous avez deux possibilités. Choisissez celle qui vous convient.',
				hold: 0.6,
				facts: ['deux-canaux'],
			},
			{id: 'online', text: 'Première possibilité : en ligne, avec votre smartphone.', hold: 0.4},
			{
				id: 'online-follow',
				text: 'Suivez les instructions de l’application : filmez votre pièce d’identité, puis votre visage.',
				facts: ['en-ligne'],
			},
			{
				id: 'online-check',
				text: 'Ensuite, une personne chargée du contrôle vérifie ces éléments.',
				hold: 0.6,
				facts: ['en-ligne'],
			},
			{id: 'office', text: 'Deuxième possibilité : en bureau de poste.', hold: 0.4},
			{
				id: 'office-bring',
				text: 'Présentez-vous au guichet avec votre pièce d’identité.',
				facts: ['bureau'],
			},
			{
				id: 'office-help',
				text: 'Un chargé de clientèle vérifie votre identité et vous accompagne.',
				hold: 0.6,
				facts: ['bureau'],
			},
			{
				id: 'reassure',
				text: 'Vous préférez être aidé ? Choisissez le bureau de poste.',
				hold: 0.6,
			},
			{
				id: 'pause',
				text: 'Faites vérifier votre identité, puis reprenez la vidéo.',
				hold: 2,
			},
		],
	},
	{
		id: 'activation',
		label: 'Activer son Identité Numérique',
		step: 3,
		cues: [
			{id: 'title', text: 'Étape 3 : activer votre Identité Numérique.', hold: 0.6},
			{
				id: 'open',
				text: 'Une fois votre identité vérifiée, ouvrez l’application.',
				facts: ['activation'],
			},
			{
				id: 'activation-code',
				text: 'Saisissez votre code d’activation, en suivant les instructions.',
				facts: ['activation'],
			},
			{
				id: 'secret',
				text: 'Puis choisissez votre code secret.',
				hold: 0.4,
				facts: ['code-secret'],
			},
			{
				id: 'secret-explain',
				text: 'Il vous servira à confirmer vos connexions, depuis l’application.',
				hold: 0.6,
				facts: ['code-secret'],
			},
			{
				id: 'personal',
				text: 'Ce code est personnel. Ne le communiquez à personne.',
				hold: 1.2,
			},
			{
				id: 'pause',
				text: 'Activez votre Identité Numérique, puis reprenez la vidéo.',
				hold: 2,
			},
		],
	},
	{
		id: 'conclusion',
		label: 'Conclusion',
		cues: [
			{id: 'recap', text: 'Récapitulons.', hold: 0.4},
			{id: 'step1', text: 'S’inscrire.', hold: 0.5},
			{id: 'step2', text: 'Faire vérifier son identité.', hold: 0.5},
			{id: 'step3', text: 'Activer l’application.', hold: 1},
			{
				id: 'site',
				text: 'Les informations à jour sont sur le site officiel : lidentitenumerique.laposte.fr',
				hold: 0.8,
			},
			{
				id: 'help',
				text: 'Et si vous avez besoin d’aide, rendez-vous dans un bureau de poste.',
				hold: 0.6,
				facts: ['bureau'],
			},
			{id: 'thanks', text: 'Merci d’avoir suivi ce tutoriel.', hold: 1.5},
		],
	},
];
