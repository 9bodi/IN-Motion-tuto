# 3. Points vérifiés et éléments restant à confirmer

Date de la recherche : **2 octobre 2026**.

## ⚠️ Limite importante de la vérification

Les deux sources officielles demandées **n'ont pas pu être ouvertes directement** : la politique réseau de l'environnement de production bloque les domaines
`lidentitenumerique.laposte.fr` et `aide.lidentitenumerique.laposte.fr`.

Les informations ci-dessous proviennent donc :
- d'**extraits indexés par un moteur de recherche** de pages de ces domaines officiels (page « Comment l'obtenir ? », centre d'aide, CGU) ;
- de sources **secondaires** (FranceConnect, tutoriel CCI Pays de la Loire 2023), signalées comme telles.

**Aucun point n'est donc marqué « vérifié ».** Avant toute diffusion, une personne doit relire les pages officielles à jour et, idéalement, parcourir l'application sur un vrai téléphone, puis passer chaque fait au statut `verifie` dans `src/content/sources.ts`.

Légende : 🟡 corroboré par des extraits officiels, à relire · 🔴 à confirmer (source secondaire ou divergente).

## Faits utilisés dans la vidéo

| # | Fait affiché ou dit | Statut | Source(s) | Remarque |
|---|---|---|---|---|
| age | Avoir 18 ans révolus | 🟡 | [Comment l'obtenir ?][co] · [Qui peut créer…][qui] | |
| pieces | Pièce d'identité française en cours de validité : **CNI française, passeport français, titre de séjour français d'une durée de validité ≥ 5 ans** | 🟡 | [co] · [qui] | Formulation retrouvée à l'identique dans plusieurs extraits. Cas des CNI prolongées non traité. |
| smartphone | **Android 12 ou plus, iOS 16 ou plus** | 🔴 | [co] · [qui] | Un autre extrait officiel (vérification à distance) cite **iOS 15 / Android 10**. Divergence à lever ; la vidéo renvoie aussi au site officiel. |
| mobile | Numéro de mobile **éligible** | 🟡 | [co] · [qui] | Il existe une liste d'indicatifs pays/DROM éligibles, non lue en entier → non détaillée dans la vidéo. |
| compte | Avec un compte La Poste : e-mail + mot de passe ; sinon, création d'un compte | 🟡 | [Créer mon IN sur l'application mobile][appli] | Libellé exact du bouton (« Créer un compte » selon l'extrait) **non affiché** : la vidéo dit « choisissez de créer un compte ». |
| stores, gratuit | Application gratuite sur App Store et Google Play | 🟡 | [co] · [appli] | |
| app-nom | Nom : « L'Identité Numérique La Poste » | 🟡 | [co] · [CGU][cgu] | Nom exact affiché en boutique et nom de l'éditeur à relever sur un téléphone. |
| saisie | Saisie du numéro de mobile et des informations de la pièce d'identité | 🔴 | [co] · [Tuto CCI 2023][cci] | Ordre exact des écrans non vérifié → formulaire générique fictif. |
| sms | Code de vérification reçu par SMS | 🔴 | [cci] (secondaire, 2023) | Formulation **conditionnelle** dans la vidéo (« Si vous recevez un code par SMS… »). |
| deux-canaux | Vérification en ligne **ou** en bureau de poste | 🟡 | [co] · [En ligne][enligne] · [Bureau][bureau] | |
| en-ligne | En ligne : suivre les instructions, filmer sa pièce puis son visage ; contrôle par un opérateur | 🔴 | [enligne] · [cgu] · [cci] | Un extrait évoque aussi le choix d'un « code d'activation à 6 caractères » lors du parcours en ligne : **non repris**. Ancien parcours via « lettre recommandée électronique AR24 » (source 2023) : **non repris**, probablement obsolète. |
| bureau | En bureau de poste : venir avec sa pièce d'identité ; un chargé de clientèle vérifie et accompagne | 🟡 | [bureau] · [co] | Faut-il aussi venir avec son smartphone ? Non dit dans la vidéo, à vérifier. |
| activation | Activation dans l'application : code d'activation puis choix du code secret | 🟡 | [cgu] | Mode de réception du code d'activation non cité. |
| code-secret | Le code secret sert à confirmer les connexions depuis l'application | 🟡 | [cgu] | |
| usage | Sert à prouver son identité en ligne de façon sécurisée | 🟡 | [FranceConnect][fc] | |

## Informations volontairement NON utilisées (non confirmées ou contradictoires)

| Information trouvée | Pourquoi elle est écartée |
|---|---|
| Délai de vérification en ligne : « 3 h (hors week-end) » / « sous 48 h » | Extraits contradictoires. La vidéo affiche « Délai : voir le site officiel ». |
| Code secret « à 4 chiffres » | Lu seulement dans un extrait des CGU (et une source secondaire). Ni dit, ni suggéré à l'écran (champ vide, aucun point). |
| Code d'activation « à 6 caractères » défini par l'utilisateur | Extrait isolé, parcours non clair. |
| Délai d'un mois pour activer après la vérification | Extrait de CGU, version non datée. |
| Délai de 48 h après une réactivation | Hors sujet (réactivation). |
| Libellés de boutons de l'application et des boutiques | Aucune capture officielle consultée : écrans schématiques, boutons sans libellé. |

## Éléments manquants pour une vidéo finalisée

1. **Voix off** : non enregistrée. La version actuelle est muette, avec sous-titres. Le script minuté est prêt (`01-script-voix-off.md`). Après enregistrement : déposer les fichiers dans `public/voix/`, les déclarer dans `VOICEOVER` (`src/theme.ts`) et reporter les durées réelles dans `durationOverride` (`src/content/script.ts`).
2. **Relecture des sources officielles** (voir ci-dessus) : obligatoire avant diffusion.
3. **Captures officielles** : non disponibles. Les écrans sont des illustrations schématiques avec la mention « Écran illustratif — l'affichage peut varier ».
4. **Musique** : aucune (choix conforme au brief).
5. **Version finale** : passer `DRAFT_MODE` à `false` dans `src/theme.ts` pour retirer le bandeau « VERSION DE TRAVAIL ».

[co]: https://lidentitenumerique.laposte.fr/comment-lobtenir
[qui]: https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/qui-peut-creer-une-identite-numerique-la-poste-x2Q0shoa9U/Steps/101476
[appli]: https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/comment-creer-mon-identite-numerique-la-poste-sur-lapplication-mobile-tm6n8u78iu/Steps/101477,225692,870049,101548
[enligne]: https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/verifier-mon-identite-en-ligne-XOTUIAs7fX/Steps/101488,371087,371169
[bureau]: https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/comment-faire-verifier-mon-identite-en-bureau-de-poste-GvOPos173Q/Steps/101487
[cgu]: https://lidentitenumerique.laposte.fr/cgu
[cci]: https://formation.paysdelaloire.cci.fr/sites/default/files/2023-02/Tuto_Creer-son-Identite-Numerique_La%20Poste_V1.pdf
[fc]: https://www.franceconnect.gouv.fr/comptes-disponibles/l-identite-numerique-la-poste/
