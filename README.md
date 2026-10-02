# Tutoriel vidéo — Créer son Identité Numérique La Poste, étape par étape

Tutoriel en motion design (Remotion), en français, pour des adultes peu à l'aise avec le numérique.
**Projet indépendant : ce n'est pas une communication officielle de La Poste.**

> **État : VERSION DE TRAVAIL.** Pas de voix off enregistrée, informations à relire sur les sources officielles.
> Voir [`docs/03-verifications.md`](docs/03-verifications.md) avant toute diffusion.

## Livrables

| Document | Contenu |
|---|---|
| [`docs/01-script-voix-off.md`](docs/01-script-voix-off.md) | Script de voix off minuté (généré) |
| [`docs/02-storyboard.md`](docs/02-storyboard.md) | Storyboard : durée, texte à l'écran, visuel, animation par scène |
| [`docs/03-verifications.md`](docs/03-verifications.md) | Points vérifiés, éléments à confirmer, éléments manquants |
| [`docs/sous-titres.srt`](docs/sous-titres.srt) | Sous-titres synchronisés (2 lignes max) |

## Structure

```
src/
  content/script.ts     ← texte de la voix off = sous-titres = minutage (source unique)
  content/sources.ts    ← registre des faits, sources et statuts de vérification
  content/timeline.ts   ← calcul des durées, découpage des sous-titres en 2 lignes max
  theme.ts              ← couleurs, mise en page, DRAFT_MODE, fichiers de voix off
  components/           ← téléphone, écrans schématiques, halo, sous-titres, carte « À vous »…
  scenes/               ← une scène par séquence : Intro, Prerequis, Inscription, Verification, Activation, Conclusion
```

Chaque scène est aussi exposée comme composition séparée (`Scene01-intro`, …) pour être prévisualisée ou exportée seule.

## Commandes

```bash
npm install
npm run studio        # prévisualisation interactive
npm run render        # export MP4 1920×1080 → out/
npm run stills        # images de contrôle au milieu de chaque réplique → out/stills/
npm run srt           # régénère docs/sous-titres.srt et docs/01-script-voix-off.md
npm run typecheck
```

## Intégrer la voix off

1. Enregistrer une piste par scène d'après `docs/01-script-voix-off.md`, la déposer dans `public/voix/`.
2. La déclarer dans `VOICEOVER` (`src/theme.ts`).
3. Reporter la durée réelle de chaque réplique dans `durationOverride` (`src/content/script.ts`) : animations et sous-titres se recalent automatiquement.
4. `npm run srt`, puis `npm run render`.

## Avant la version finale

- Relire chaque fait de `src/content/sources.ts` sur les pages officielles, passer son statut à `verifie`.
- Passer `DRAFT_MODE` à `false` dans `src/theme.ts`.
