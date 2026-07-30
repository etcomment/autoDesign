# Règles et Prérequis pour le Développement de Templates (autoDesign)

Ce document centralise toutes les contraintes, règles et attentes pour le développement, la création ou la modification d'un template dans l'application autoDesign. 
Tout Agent IA ou développeur **doit impérativement** respecter ces directives pour que le template soit considéré comme "fini" ("Definition of Done").

---

## 1. Interactivité Totale (Drag & Resize)
Aucun élément visuel ne doit être statique. Chaque nœud, carte, jalon ou composant généré par le DSL doit être interactif.

*   **Référence SVG** : Le composant global doit encapsuler son rendu dans un `<g ref={svgRef}>`.
*   **Hook d'interaction** : Utiliser `const { startDrag, renderHandles } = useTemplateDragResize(svgRef)`.
*   **ID Unique** : Chaque élément interactif doit avoir un identifiant unique (ex: `milestone-0`, `card-1`).
*   **Sélection & Drag** : Ajouter l'événement sur le groupe de l'élément : 
    `<g onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer' }}>`
*   **Mise en évidence (Sélection)** : Vérifier si l'élément est sélectionné (`selectedIds.has(elementId)`) et modifier son apparence (ex: `strokeWidth={isSelected ? 2.5 : 0}`).
*   **Poignées de redimensionnement** : Toujours appeler `{isSelected && renderHandles(rect, elementId)}` à l'intérieur du groupe de l'élément pour afficher les contrôles.

## 2. Élasticité et Connecteurs Dynamiques
Si des éléments sont reliés par des lignes, flèches ou des chemins SVG :
*   **Pas de coordonnées en dur (hardcodées)** pour les connecteurs.
*   **Lecture en temps réel** : Les lignes doivent calculer leurs points de départ et d'arrivée en fonction des coordonnées dynamiques des éléments qu'elles relient (récupérées via `templateElementPositions` depuis le store).
*   **Suivi au mouvement** : Quand un utilisateur déplace une carte, le connecteur qui lui est rattaché doit s'étirer ou se réduire automatiquement.

## 3. Positionnement et Stockage (Store Zustand)
Les éléments ne doivent pas réinitialiser leur position au re-render s'ils ont été bougés.

*   **Layout dynamique (Initialisation)** : Le template calcule les positions initiales en fonction du nombre d'éléments à afficher.
*   **Priorité au Store** : Avant de rendre l'élément à sa position "par défaut", le template doit toujours vérifier si des coordonnées personnalisées existent dans le store :
    `const pos = templateElementPositions[elementId] || calculInitial`
*   Le pattern standard consiste à utiliser une fonction `getRect(id, ...)` pour fusionner les dimensions stockées avec celles du layout par défaut.

## 4. Adaptation au Nombre d'Éléments ("Le N éléments")
Le template ne doit pas se casser si le DSL lui passe plus ou moins d'éléments que prévu.
*   **Calcul d'espace dynamique** : Diviser dynamiquement l'espace (largeur ou hauteur) par `items.length`.
*   **Coupe-circuit de sécurité** : Si le design physique ne permet pas plus d'un certain nombre d'éléments, tronquer proprement ou utiliser un `Math.min(items.length, MAX_CAPACITY)`.

## 5. Gestion des Couleurs et de la Palette (Thème MIGSO)
La hiérarchie des couleurs (du plus prioritaire au moins prioritaire) doit être strictement appliquée :
1.  **Couleur de l'UI** : Modifiée par l'utilisateur via le panel (`templateElementColors[elementId]`).
2.  **Couleur du DSL** : Précisée en dur dans le code DSL par l'utilisateur (via `.style.fill` ou `.color`).
3.  **Palette par défaut (MIGSO)** : Utiliser cycliquement la palette d'entreprise importée depuis `theme.ts` (`MIGSO_PALETTE[index % MIGSO_PALETTE.length]`).

## 6. Fidélité au DSL (Domain Specific Language)
Tous les attributs extraits du parser DSL doivent avoir une représentation visuelle dans le template (sauf si le design justifie de les ignorer explicitement) :
*   `title` et `subtitle`.
*   `val` (Valeur numérique/texte) et `pct` (Pourcentage).
*   `icon` (Utiliser l'intégration avec `TEMPLATE_ICONS` / `Lucide`).
*   `date` (Essentiel pour le positionnement ou le label temporel dans les Roadmaps).

## 7. Propreté Visuelle et Exports
Pour garantir que les exports en PPTX ou PNG fonctionnent bien :
*   **Fond opaque** : Le SVG racine doit toujours contenir un `<rect width={W} height={H} fill="white" />` en arrière-plan, sinon l'image exportée sera transparente/illisible sur certains visionneurs.
*   **Générique** : Pas d'en-tête, de pied de page, de date du jour hardcodée ou de logo de l'entreprise figé dans le code. Les templates sont de l'intelligence visuelle pure, le reste de la page PPTX gérera le branding global.
