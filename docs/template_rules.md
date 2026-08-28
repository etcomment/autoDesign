# Règles et Prérequis pour le Développement de Templates (autoDesign)

Ce document centralise toutes les contraintes, règles et attentes pour le
développement, la création ou la modification d'un template dans l'application
autoDesign. Tout Agent IA ou développeur **doit impérativement** respecter ces
directives.

- - -
## ⚠️ RÈGLE ABSOLUE ET PRIORITAIRE : PAS DE TITRE, PAS D'ENTÊTE, PAS DE FOND BLANC

* **Transparence totale** : NE JAMAIS ajouter de `\<rect width={W} height={H}
  fill="white" />` en fond de template. Les templates doivent être 100%
  transparents.
* **Pas d'en-tête ni de titre** : NE JAMAIS ajouter de titres par défaut,
  d'en-têtes ("Brain 1 Template", "Roadmap Title", etc.), de pieds de page ou
  de logos. Le template contient UNIQUEMENT le diagramme visuel pur et ses
  cartes/jalons/callouts.

- - -
## 1\. Interactivité Totale (Drag & Resize)

Aucun élément visuel du diagramme ne doit être statique. Chaque nœud, carte,
jalon ou composant généré par le DSL doit être interactif.

* **Référence SVG** : Le composant global doit encapsuler son rendu dans un `\<g
  ref={svgRef}>`.
* **Hook d'interaction** : Utiliser `const { startDrag, renderHandles } =
  useTemplateDragResize(svgRef)`.
* **ID Unique** : Chaque élément interactif doit avoir un identifiant unique (ex: `
  milestone-0`, `card-1`).
* **Sélection & Drag** : Ajouter l'événement sur le groupe de l'élément : `\<g
  onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer'
  }}>`
* **Mise en évidence (Sélection)** : Vérifier si l'élément est sélectionné (`
  selectedIds.has(elementId)`) et modifier son apparence (ex: `
  strokeWidth={isSelected ? 2.5 : 0}`).
* **Poignées de redimensionnement** : Toujours appeler `{isSelected &&
  renderHandles(rect, elementId)}` à l'intérieur du groupe de l'élément pour
  afficher les contrôles.

## 2\. Élasticité et Connecteurs Dynamiques

Si des éléments sont reliés par des lignes, flèches ou des chemins SVG :

* **Pas de coordonnées en dur (hardcodées)** pour les connecteurs.
* **Lecture en temps réel** : Les lignes doivent calculer leurs points de départ
  et d'arrivée en fonction des coordonnées dynamiques des éléments qu'elles
  relient (récupérées via `templateElementPositions` depuis le store).
* **Suivi au mouvement** : Quand un utilisateur déplace une carte, le connecteur
  qui lui est rattaché doit s'étirer ou se réduire automatiquement.

## 3\. Positionnement et Stockage (Store Zustand)

Les éléments ne doivent pas réinitialiser leur position au re-render s'ils ont
été bougés.

* **Layout dynamique (Initialisation)** : Le template calcule les positions
  initiales en fonction du nombre d'éléments à afficher.
* **Priorité au Store** : Avant de rendre l'élément à sa position "par défaut",
  le template doit toujours vérifier si des coordonnées personnalisées existent
  dans le store : `const pos = templateElementPositions\[elementId] ||
  calculInitial`
* Le pattern standard consiste à utiliser une fonction `getRect(id, ...)` ou un
  helper pour fusionner les dimensions stockées avec celles du layout par
  défaut.

## 4\. Adaptation au Nombre d'Éléments ("N éléments")

Le template ne doit pas se casser si le DSL lui passe plus ou moins d'éléments
que prévu.

* **Calcul d'espace dynamique** : Diviser dynamiquement l'espace (largeur ou
  hauteur) par `items.length`.
* **Coupe-circuit de sécurité** : Si le design physique ne permet pas plus d'un
  certain nombre d'éléments, tronquer proprement ou utiliser un `
  Math.min(items.length, MAX_CAPACITY)`.

## 5\. Gestion des Couleurs et de la Palette (Thème MIGSO)

La hiérarchie des couleurs (du plus prioritaire au moins prioritaire) doit être
strictement appliquée :

1.  **Couleur de l'UI** : Modifiée par l'utilisateur via le panel (`
    templateElementColors\[elementId]`).
2.  **Couleur du DSL** : Précisée en dur dans le code DSL par l'utilisateur (via `
    .style.fill` ou `.color`).
3.  **Palette par défaut (MIGSO)** : Utiliser cycliquement la palette
    d'entreprise importée depuis `theme.ts` (`MIGSO_PALETTE\[index %
    MIGSO_PALETTE.length]`).

## 6\. Fidélité au DSL (Domain Specific Language)

Tous les attributs extraits du parser DSL doivent avoir une représentation
visuelle dans le template (sauf si le design justifie de les ignorer
explicitement) :

* `title` et `subtitle` des éléments/cartes (et non de la slide entière).
* `val` (Valeur numérique/texte) et `pct` (Pourcentage).
* `icon` (Utiliser l'intégration avec `TEMPLATE_ICONS` / `Lucide`).
* `date` (Essentiel pour le positionnement ou le label temporel dans les
  Roadmaps).

### 6.1 Retour à la ligne du texte

Toujours s'assurer que le retour à la ligne est géré dans les **titres de
blocs** et dans **les textes/descriptions** (`title`, `subtitle`, libellés des
cartes, jalons, etc.).

* **Wrapping par largeur** : Ne jamais tronquer brutalement avec `.slice()` qui
  coupe du texte, ni laisser le texte déborder hors de la carte. Utiliser le
  helper `wrapTextByWidth(text, maxCharsParLigne)` de `shared/primitives.tsx`
  pour découper le texte en lignes adaptées à la largeur de l'élément.
* **Rendu multi-lignes** : Rendre les lignes produites en `<tspan>` avec `x`
  partagé et `dy={ligneIndex === 0 ? 0 : <hauteurLigne>}` afin que le texte
  passe correctement à la ligne.
* **`maxCharsParLigne` dynamique** : Calculer la capacité de caractères à
  partir de la largeur du bloc (ex : `Math.max(10, Math.floor(bbox.width /
  6.5))`) pour que le wrapping s'adapte au redimensionnement.
* **Sauts de ligne explicites** : Préserver aussi les `\n` explicites présents
  dans le contenu (le parser convertit `\n` en vrai saut de ligne via
  `stripQuotes`).

### 6.2 Accrochage Temporel & Quarters (`quarters`, `date:`)

* **Axe temporel unifié** : Les templates de type Roadmap (`Roadmap 3`, `Roadmap 5`, etc.) utilisent la directive `quarters <an1> <an2> ...` pour définir les points d'ancrage de la timeline.
* **Déduction automatique** : Si `quarters` n'est pas fourni, le template déduit dynamiquement la liste des dates depuis les attributs `date:` des jalons (+ l'étape terminale).
* **Accrochage par `date:`** : Chaque jalon avec `date:<année>` vient se positionner et s'accrocher au point d'année correspondant. Le jalon sans `date:` s'accroche au marqueur `START`.

### 6.3 Progression & Coloration des Segments (`progress`, `current`, `track`)

* **Étape actuelle** : La directive `progress <année|index>` ou `current <année>` définit jusqu'où la timeline est avancée.
* **Segments dynamiques** : Les segments horizontaux de la timeline s'activent et héritent de la couleur du jalon d'origine de chaque segment (ou de `track`). Les segments futurs restent en gris clair inactif (`#d9dee4`).
* **Héritage sur quarters vides** : Les points/quarters sans jalon propre héritent automatiquement de la couleur du jalon qui les précède.

- - -

## 7. Checklist Unitaire de Conformité (Baseline Qualité)

Cette checklist est la **grille d'audit unitaire** que chaque composant de template doit valider point par point. Chaque élément correspond à une règle unique et vérifiable.

---

### 1. 🎨 Transparence & Cadrage Global
- [ ] Aucun `<rect>` de fond blanc ou opaque n'est présent (canvas 100% transparent).
- [ ] Aucun titre global de slide n'est codé en dur dans le SVG (ex: pas de `<text>Brain Template</text>`).
- [ ] Aucun sous-titre de page ou en-tête statique n'est inclus dans le SVG.
- [ ] Aucun pied de page ou logo global n'est codé en dur dans le composant.

---

### 2. 🧩 Conformité DSL & Données
- [ ] Aucun mot-clé ou directive DSL inutile n'est déclaré dans `registry.ts` (ex: pas de `startLabel` ou `finishLabel` fantômes s'ils ne sont pas dessinés).
- [ ] Tous les champs fournis par le DSL et pertinents au template sont rendus (`title`, `subtitle`, `date`, `val`, `pct`, `lane`, etc.).
- [ ] Le composant fonctionne sans crash si `milestones`, `items`, `lanes` ou `quarters` sont vides ou non définis.
- [ ] Les dates ou quarters non renseignés disposent d'un fallback visuel ou logique propre.

---

### 3. 📐 Géométrie, Capacité & Espacement (N-Éléments)
- [ ] Les espacements entre éléments sont calculés dynamiquement en fonction du nombre réel d'éléments ($N$).
- [ ] Les éléments ne subissent aucun chevauchement accidentel ou indésirable (hors designs où le chevauchement est expressément prévu, ex: diagrammes de Venn, cercles concentriques, chevrons imbriqués).
- [ ] Le diagramme reste visuellement équilibré si la liste ne contient que 1 ou 2 éléments.
- [ ] Une borne de sécurité (`Math.max(1, count)`) est utilisée pour éviter les divisions par zéro.

---

### 4. 📝 Découpage Textuel & Multi-Lignes
- [ ] Aucun titre ou description n'est tronqué avec un `.slice()` brutal qui coupe les phrases.
- [ ] Les textes longs sont découpés avec `wrapTextByWidth` de manière proportionnelle à la largeur du bloc.
- [ ] Chaque ligne calculée est rendue dans un `<tspan>` distinct avec un `dy` adapté (ex: 20px pour les titres, 16px pour les descriptions).
- [ ] Les coordonnées horizontales `x` de chaque `<tspan>` sont explicitement définies pour éviter les décalages d'alignement.
- [ ] Les sauts de ligne explicites `\n` contenus dans les données sont respectés et convertis en lignes distinctes.

---

### 5. ↕️ Auto-Resize des Textes (Agrandissement & Réduction)
- [ ] La boîte / carte conserve sa taille minimale standard pour les textes courts et moyens.
- [ ] Le seuil de déclenchement de l'agrandissement est calibré (la carte ne grandit que lorsque le texte excède réellement sa capacité standard, ex: à partir de 7 lignes).
- [ ] La hauteur de la carte s'agrandit automatiquement et proportionnellement au nombre de lignes supplémentaires.
- [ ] La carte **réduit immédiatement** à sa taille nominale dès que des lignes de texte sont supprimées.
- [ ] Les éléments voisins ou connecteurs s'ajustent pour préserver la lisibilité lorsque la hauteur varie.

---

### 6. 🖱️ Interactivité, Sélection & Déplacement (Canvas)
- [ ] La racine du SVG est encapsulée dans un `<g ref={svgRef}>`.
- [ ] Le hook `useTemplateDragResize(svgRef)` est instancié.
- [ ] Chaque élément interactif possède un attribut `data-element-id` unique.
- [ ] L'événement `onMouseDown={e => startDrag(e, id, rect)}` est branché sur chaque élément déplaçable.
- [ ] Le curseur CSS est configuré avec `style={{ cursor: 'pointer' }}` sur les éléments interactifs.
- [ ] Le feedback visuel de sélection est actif (`selectedIds.has(id)` modifie le contour ou la bordure).
- [ ] Les poignées de redimensionnement `{selectedIds.has(id) && renderHandles(rect, id)}` sont rendues.

---

### 7. 🔗 Connecteurs & Ancrages Dynamiques
- [ ] Aucune coordonnée de ligne ou flèche de liaison n'est codée en dur.
- [ ] Les extrémités des connecteurs sont calculées en temps réel à partir de `getR(...)` des éléments source et cible.
- [ ] Quand un élément est déplacé au curseur, son connecteur suit instantanément le mouvement sans se décrocher.
- [ ] Quand un élément grandit ou rétrécit en hauteur/largeur, l'ancrage du connecteur reste positionné exactement sur la zone cible (ex: pointe de flèche).

---

### 8. 🌈 Cascade des Couleurs
- [ ] Priorité 1 : La couleur modifiée par l'utilisateur dans le panneau latéral (`templateElementColors[id]`) est prioritaire.
- [ ] Priorité 2 : Si non modifiée par l'UI, la couleur explicitement spécifiée dans le DSL (`item.color`) est appliquée.
- [ ] Priorité 3 : À défaut, la couleur par défaut issue de `MIGSO_PALETTE` (ou de la phase/lane associée) est utilisée.
- [ ] Les couleurs de contour (`templateStrokeColors[id]`) et épaisseurs (`templateStrokeWidths[id]`) sont prises en compte si personnalisées.

---

### 9. 💾 Synchronisation avec le Store Zustand
- [ ] Une fonction `getR(id)` fusionne les positions par défaut calculées et les positions stockées dans `pos[id]`.
- [ ] Les dimensions par défaut sont synchronisées dans le store sans créer de cycle de re-render infini.
- [ ] Les modifications de position manuelle de l'utilisateur sont conservées lors des re-renders.

---

### 10. ⚡ Qualité Technique & Tests
- [ ] Aucun mot-clé `any` n'est utilisé dans le fichier TypeScript (strict typing).
- [ ] Chaque élément de liste mappé possède une prop `key` unique et stable.
- [ ] Aucun warning React ou SVG n'apparaît dans la console (ex: props invalides, `NaN` dans les attributs `d`, `x`, `y`).
- [ ] Le projet compile sans erreur (`npm run build`).
- [ ] Tous les tests unitaires associés passent avec succès (`npm test`).

---

### 11. 🎛️ Panneau Propriétés & Édition Bidirectionnelle des Textes
- [ ] Le préfixe de chaque élément sélectionnable (`card-`, `desc-`, `bubble-`, `step-`, `milestone-`, `block-`, `node-`, etc.) est répertorié dans `templateElementUtils.ts` (`collectionKeys` et `elementLabel`).
- [ ] La sélection d'un élément dans le canvas peuple immédiatement le panneau de propriétés avec son libellé exact et ses textes actuels (Titre, Description/Sous-titre, Date, Valeur).
- [ ] La saisie ou modification d'un champ dans le panneau de propriétés met à jour le store `templateData` en temps réel.
- [ ] Le rendu SVG répercute instantanément le nouveau texte saisi depuis le panneau de propriétés.
- [ ] L'auto-resize du SVG réagit immédiatement aux modifications textuelles effectuées depuis le panneau de propriétés.


