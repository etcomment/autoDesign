# Suivi de Conformité et Validation des Templates (Baseline Qualité)

Ce document référence l'audit exhaustif de chacun des **98 templates** du catalogue autoDesign face à la checklist unitaire complète (11 catégories, 44 critères atomiques) définie dans [`docs/template_rules.md`](./template_rules.md).

## Légende des statuts
- `✅ VALIDÉ / OK` : Audit complet validé sur les 11 catégories de la checklist unitaire.
- `🟡 À REVOIR` : Template en attente de mise en conformité complète.

---

## 1. Roadmaps (14 templates)

### `roadmap` — Timeline horizontale avec jalons numérotés positionnés alternativement au-dessus et en-dessous de la ligne.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap2` — Timeline verticale avec phases colorées (Phase One, Two, Three) et jalons par années.
- **Statut** : ✅ **VALIDÉ / OK**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [x] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [x] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [x] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [x] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [x] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [x] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [x] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [x] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [x] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [x] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [x] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [x] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [x] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [x] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [x] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [x] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [x] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [x] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [x] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [x] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [x] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [x] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [x] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [x] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [x] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [x] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [x] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [x] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [x] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [x] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [x] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [x] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [x] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [x] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [x] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [x] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [x] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [x] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [x] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [x] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [x] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [x] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [x] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [x] Le projet compile sans erreur (`npm run build`).
  - [x] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [x] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [x] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [x] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [x] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [x] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

- **Notes de validation** : Pente 20° rigoureuse, connecteurs 5px gris `#d7d7d7` avec 10px aération, barre rouge `#ff5338` sur progress, adaptation hauteur dynamique, export PPTX natif validé.

### `roadmap3` — Schéma en serpentin reliant 10 années consécutives avec jalons ancrés.
- **Statut** : ✅ **VALIDÉ / OK**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [x] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [x] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [x] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [x] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [x] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [x] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [x] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [x] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [x] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [x] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [x] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [x] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [x] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [x] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [x] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [x] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [x] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [x] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [x] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [x] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [x] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [x] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [x] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [x] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [x] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [x] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [x] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [x] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [x] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [x] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [x] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [x] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [x] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [x] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [x] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [x] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [x] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [x] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [x] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [x] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [x] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [x] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [x] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [x] Le projet compile sans erreur (`npm run build`).
  - [x] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [x] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [x] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [x] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [x] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [x] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

- **Notes de validation** : Cartes alternées haut/bas 180×120px, connecteurs verticaux dynamiques 4px, badges numérotés 30×30px, icônes dynamiques Lucide, découpage multi-lignes, auto-resize avec réduction instantanée.

### `roadmap4` — Timeline découpée en 5 trimestres (Q1 à Q5) avec cartes de jalons.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap5` — Présentation sous forme de cartes décalées en escalier avec dates clés.
- **Statut** : ✅ **VALIDÉ / OK**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [x] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [x] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [x] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [x] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [x] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [x] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [x] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [x] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [x] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [x] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [x] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [x] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [x] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [x] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [x] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [x] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [x] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [x] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [x] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [x] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [x] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [x] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [x] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [x] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [x] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [x] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [x] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [x] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [x] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [x] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [x] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [x] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [x] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [x] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [x] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [x] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [x] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [x] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [x] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [x] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [x] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [x] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [x] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [x] Le projet compile sans erreur (`npm run build`).
  - [x] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [x] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [x] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [x] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [x] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [x] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

- **Notes de validation** : Bannières start/finish, chevrons imbriqués adaptatifs selon N, connecteurs verticaux vers cartes jalons, auto-resize, rendu direct et transparent.

### `roadmap6` — Timeline de jalons hebdomadaires étalés sur plusieurs années.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap7` — Timeline verticale avec bulles de jalons numérotées, connecteurs triangulaires et descriptions.
- **Statut** : ✅ **VALIDÉ / OK**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [x] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [x] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [x] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [x] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [x] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [x] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [x] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [x] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [x] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [x] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [x] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [x] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [x] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [x] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [x] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [x] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [x] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [x] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [x] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [x] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [x] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [x] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [x] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [x] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [x] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [x] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [x] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [x] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [x] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [x] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [x] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [x] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [x] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [x] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [x] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [x] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [x] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [x] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [x] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [x] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [x] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [x] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [x] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [x] Le projet compile sans erreur (`npm run build`).
  - [x] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [x] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [x] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [x] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [x] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [x] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

- **Notes de validation** : Axe vertical interactif, bulles d étapes avec badges et icônes dynamiques, connecteurs polygonaux élastiques, auto-resize réactif des descriptions, synchronisation bidirectionnelle avec le panneau de propriétés.

### `roadmap8` — Timeline à jalons décalés avec sous-titres de périmètre.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap9` — Deux niveaux de jalons (haut et bas) reliés à un axe central.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap10` — Cartes de jalons avec affichage en grands caractères pour les mois.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap11` — Liste verticale de jalons mensuels avec indicateurs de progression.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap12` — Timeline sous forme de chemin par étapes numérotées.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap13` — Grille de colonnes hebdomadaires (Week 1 à Week 8).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `roadmap15` — Blocs de jalons trimestriels avec barre de progression globale.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 2. Product Roadmaps (9 templates)

### `productRoadmap` — Grille trimestrielle (Q1-Q4) croisée avec 4 pôles (Dev, Product, UX, QA).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap3` — Grille trimestrielle avec cartes détaillées contenant titres et sous-titres.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap4` — Matrice centrée sur les phases de recherche, prototypage et mise sur le marché.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap5` — Vue en tableau des livrables clés par trimestre et pôle métier.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap6` — Vue condensée des fonctionnalités à livrer par trimestre.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap8` — Calendrier de livraison avec suivi par équipe.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap10` — Représentation style Gantt simplifiée pour les livrables produit.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap11` — Affichage par cartes indépendantes dans chaque trimestre.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `productRoadmap12` — Badges colorés de jalons organisés par trimestre.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 3. Strategy (6 templates)

### `strategy` — Alignement horizontal de 5 blocs représentant les axes stratégiques.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `strategy2` — Pyramide à 5 niveaux (Vision, Mission, Objectifs, Initiatives, Fondations).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `strategy4` — Disposition en 3 colonnes verticales avec 6 blocs stratégiques.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `strategy5` — Timeline stratégique découpée par objectifs trimestriels.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `strategy6` — Matrice 2x2 avec axes X et Y paramétrables.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `strategy8` — Disposition en escalier illustrant la montée en puissance stratégique.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 4. Process (4 templates)

### `process` — Flux séquentiel de 4 étapes avec résultat final (Outcome).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `process2` — Étapes interconnectées par des flèches directionnelles.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `process4` — Cartes de phases avec numéro, titre et sous-titre.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `process1` — Schéma minimaliste à 4 étapes avec connecteurs.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 5. Puzzles (7 templates)

### `puzzle` — Cercle de 4 quadrants puzzle imbriqués avec cartes de texte externes.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `puzzle2` — Assemblage en losange de 4 pièces puzzle imbriquées avec points et textes.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `puzzle3` — Disposition verticale de pièces de puzzle imbriquées.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `puzzle4` — Grille 3x2 de pièces de puzzle imbriquées.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `puzzle5` — Hexagones horizontaux imbriqués en quinconce (A, B, C, D, E).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `puzzle6` — Grande pièce de puzzle filaire centrale avec 4 segments ouverts et 4 coins A, B, C, D.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `puzzle7` — Cadre carré aux coins arrondis creux composé de 4 quadrants puzzle imbriqués (1, 2, 3, 4).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 6. Funnels (5 templates)

### `funnel` — Entonnoir classique à 4 niveaux (Awareness, Interest, Consideration, Purchase).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `funnel2` — Entonnoir couché horizontalement de la prospection au closing.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `funnel3` — Représentation 3D en couches empilées avec pourcentages.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `funnel4` — Entonnoir se séparant en deux parcours au niveau inférieur.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `funnel5` — Entonnoir par segments gradués avec pourcentages de conversion.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 7. Icebergs (2 templates)

### `iceberg` — Diagramme séparant les éléments émergés (visibles) et immergés (cachés).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `iceberg2` — Vue verticale des efforts et apprentissages sous la surface du succès.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 8. Dashboards (4 templates)

### `dashboard2` — Grand affichage de la métrique clé accompagné de cartes secondaires.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `dashboard3` — Cartes KPI avec barres de progression et variations.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `dashboard4` — Affichage sous forme de jauges et compteurs.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `dashboard5` — Vue condensée des principaux indicateurs de performance.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 9. Tables (5 templates)

### `table` — Tableau de données avec en-têtes et lignes structurées.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `table2` — Tableau avec lignes bicolores pour une meilleure lisibilité.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `table4` — Tableau avec en-tête coloré mis en valeur.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `table5` — Design minimaliste sans lignes de séparation.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `table6` — Tableau stylisé aux tons bleus professionnels.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 10. Agendas (2 templates)

### `agenda` — Liste chronologique des points à traiter avec numérotation.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `agenda2` — Timeline horizontale des créneaux de la réunion.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 11. Comparisons (6 templates)

### `comparison` — Comparaison entre 2 marques/options avec badges hexagonaux, jauges et cartes descriptives (Slide 66).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `comparison2` — Comparaison entre 3 marques/options avec badges hexagonaux, séparateurs VS et jauges (Slide 67).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `comparison3` — Barres de mesure horizontales comparatives.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `comparison4` — Comparaison visuelle sous forme de cercles proportionnels.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `comparison6` — Comparaison bidirectionnelle Option 1 vs Option 2 par aspects avec barres de pourcentage horizontales.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `comparison8` — Tableau 2 colonnes comparant Plan A et Plan B avec calcul dynamique de hauteur de ligne synchronisée.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 12. Brains (3 templates)

### `brain` — Sujet central avec branches diffusant vers les idées secondaires.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `brain2` — Sujet central avec branches réparties à gauche et à droite.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `brain4` — Structure en arbre hiérarchique descendant.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 13. Budgets (4 templates)

### `budget` — Synthèse du budget total et répartition par postes de dépense.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `budget2` — Barres horizontales de répartition du budget par poste, proportionnelles au pourcentage.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `budget3` — Diagramme en anneau (Donut) avec total au centre.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `budget5` — Diagramme circulaire (Pie Chart) des dépenses.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 14. Business (5 templates)

### `business` — Sujet central entouré de ses composants business.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `business4` — Chaîne de valeur représentée par des chevrons successifs.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `business7` — Schéma circulaire du cycle de vie des affaires.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `business8` — Liste verticale des fonctions business clés.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `business10` — Pyramide à niveaux de la création de valeur.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 15. Decision trees (2 templates)

### `decisionTree` — Arbre binaire de choix avec réponses Oui / Non.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `decision2` — Arbre de décision déployé horizontalement de gauche à droite.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 16. Goals (3 templates)

### `goals` — Trajectoire ascendante jalonnée vers une cible bicolore.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `goals2` — Cible centrale bicolore avec flèches rayonnantes et empennages colorés.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `goals4` — Cible centrale avec couronne segmentée, fléchettes 3D et badges.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 17. Manufacturing (6 templates)

### `manufacturing` — Ligne de fabrication avec stations et points de contrôle qualité.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `manufacturing3` — Disposition des postes de travail en forme de U.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `manufacturing5` — Diagramme de processus de fabrication en losange.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `manufacturing6` — Réseau logistique hub & rayons.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `manufacturing7` — Calendrier des étapes de fabrication.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `manufacturing8` — Flux de production en boucle fermée (recyclage / réutilisation).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 18. Value Chain (5 templates)

### `valueChain` — Chaîne de valeur avec activités principales et de soutien.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `valueChain2` — Vue verticale des activités principales et de soutien.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `valueChain4` — Chaîne de valeur inclinée avec Value streams, Supporting activities et flèche centrale.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `valueChain5` — Chaîne de valeur avec blocs d’entrée, barres horizontales convergentes et double chevron.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `valueChain3` — Chaîne de valeur horizontale avec barres supérieure et inférieure et chevrons imbriqués.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 19. Cycles (1 template)

### `circle` — Cycle itératif en 4 étapes (PDCA / Amélioration continue).
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

## 20. Pie Charts (5 templates)

### `pieChart1` — Donut à 3 parts égales avec marqueurs numérotés et légende.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `pieChart2` — Donut avec titre central et libellés autour, 4 parts.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `pieChart3` — Donut à 6 parts numérotées avec légende.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `pieChart4` — Comparaison de 3 mini-donuts à 2 parts avec pourcentages.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

### `pieChart5` — Camembert à 4 parts pondérées avec libellés et pourcentages.
- **Statut** : 🟡 **À REVOIR**
- **Checklist Unitaire de Conformité** :

  **1. 🎨 Transparence & Cadrage Global**
  - [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
  - [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
  - [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
  - [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

  **2. 🧩 Conformité DSL & Données**
  - [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
  - [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
  - [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
  - [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

  **3. 📐 Géométrie, Capacité & Espacement (N-Éléments)**
  - [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
  - [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
  - [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
  - [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

  **4. 📝 Découpage Textuel & Multi-Lignes**
  - [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
  - [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
  - [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
  - [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
  - [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

  **5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)**
  - [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
  - [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
  - [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
  - [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
  - [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

  **6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)**
  - [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
  - [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
  - [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
  - [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
  - [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
  - [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
  - [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

  **7. 🔗 Connecteurs & Ancrages Dynamiques**
  - [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
  - [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
  - [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
  - [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

  **8. 🌈 Cascade des Couleurs**
  - [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
  - [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
  - [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
  - [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

  **9. 💾 Synchronisation avec le Store Zustand**
  - [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
  - [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
  - [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

  **10. ⚡ Qualité Technique & Tests**
  - [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
  - [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
  - [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
  - [ ] Le projet compile sans erreur (`npm run build`).
  - [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

  **11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes**
  - [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
  - [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
  - [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
  - [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
  - [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.

---

