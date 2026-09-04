---
name: template-test-assistant
description: >-
  Assistant interactif pour tester et valider les templates autoDesign selon docs/template_rules.md.
  À utiliser quand l'utilisateur demande de tester un template, de lancer l'assistant de test,
  ou d'auditer pas à pas un template avec validation humaine.
---

# Assistant de Test Interactif des Templates (autoDesign)

Ce rôle/skill sert d'assistant d'assurance qualité interactif.
**RÈGLE MAÎTRESSE : Tu ne coches AUCUNE case toi-même.**
Chaque critère doit faire l'objet d'une question posée à l'utilisateur, qui teste dans l'interface et valide ou signale un bug.

## Procédure pas à pas

### 1. Initialisation
- Demander ou confirmer le nom du template ciblé (ex: puzzle2).
- Afficher la checklist initiale avec toutes les cases non cochées `[ ]`.
- Fournir des snippets DSL d'exemples prêts à l'emploi.

### 2. Déroulement question par question
Pour chaque critère défini dans `docs/template_rules.md`, poser **une seule question à la fois** :

1. **Section 1 : Transparence & Cadrage Global**
   - Question : Le fond du diagramme est-il bien 100% transparent (aucun rect blanc en arrière-plan) et sans aucun titre/entête/logo fixe au-dessus ?

2. **Section 2 : Conformité DSL & Données**
   - Question : Les icônes déclarées via la syntaxe DSL (`icon:nom`), les titres et les sous-titres s'affichent-ils correctement, et le template résiste-t-il aux données manquantes ?

3. **Section 3 : Géométrie, Capacité & Espacement (N-Éléments)**
   - Question : En testant avec peu d'éléments (2-3) puis beaucoup (6-10), le template s'adapte-t-il proprement sans crash, sans réduction artificielle et sans chevauchement indésirable ?

4. **Section 4 : Découpage Textuel & Multi-Lignes**
   - Question : Les textes longs sont-ils proprement découpés avec un retour à la ligne adapté (pas de texte tronqué au milieu, espacement vertical régulier) ?

5. **Section 5 : Auto-Resize des Textes (Agrandissement & Réduction)**
   - Question : Lorsqu'on saisit une description longue (ex: 4 à 6 lignes), la carte s'allonge-t-elle automatiquement vers le bas pour accueillir le texte, et rétrécit-elle immédiatement si des lignes sont effacées ?

6. **Section 6 : Interactivité, Sélection & Déplacement (Canvas)**
   - Question : Le clic sélectionne-t-il l'élément avec son cadre et ses poignées (toujours au premier plan), et le drag à la souris déplace-t-il l'élément de manière fluide ?

7. **Section 7 : Connecteurs & Ancrages Dynamiques**
   - Question (si applicable) : Les lignes ou connecteurs suivent-ils dynamiquement le mouvement des éléments reliés ? (Note : à marquer N/A si le template n'en a pas).

8. **Section 8 : Cascade des Couleurs**
   - Question : La priorité des couleurs fonctionne-t-elle correctement (couleur changée dans le panneau de droite > couleur déclarée dans le DSL > palette par défaut MIGSO) ?

9. **Section 9 : Synchronisation avec le Store Zustand**
   - Question : Les positions personnalisées sont-elles conservées après re-render et réinitialisées proprement si le nombre d'éléments change ?

10. **Section 10 : Qualité Technique & Export (PPTX / SVG)**
    - Question : L'export (PPTX et SVG) produit-il un rendu fidèle au canvas sans coupure, sans cadres de sélection parasites et avec des polices lisibles ?

11. **Section 11 : Panneau Propriétés & Édition Bidirectionnelle des Textes**
    - Question : En sélectionnant un élément, le panneau latéral de droite affiche-t-il bien ses informations (titre, description) et la modification d'un champ met-elle à jour le canvas en temps réel ?

### 3. Gestion des anomalies
- Dès que l'utilisateur signale un problème sur un critère :
  1. NE PAS passer au critère suivant.
  2. Localiser le code source responsable dans `src/templates/`.
  3. Proposer et appliquer la correction.
  4. Demander à l'utilisateur de re-valider le critère corrigé avant de poursuivre.

### 4. Bilan final
- Afficher le récapitulatif complet avec 100% des cases cochées par l'utilisateur.
