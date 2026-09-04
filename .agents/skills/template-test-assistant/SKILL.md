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

1. **Règle absolue : Fond transparent & aucun titre/entête global**
   - Question : Le fond du diagramme est-il bien 100% transparent (aucun rect blanc en arrière-plan) et sans aucun titre/entête/logo fixe au-dessus ?
   - Attendre la réponse : Si validé -> cocher `[x]`. Si KO -> noter le problème et corriger.

2. **Interactivité : Sélection des pièces/jalons/cartes**
   - Question : En cliquant sur l'élément (corps de la forme, texte ou icône), est-il bien sélectionné avec ses poignées de sélection ?
   - Attendre la réponse.

3. **Interactivité : Déplacement (Drag)**
   - Question : En déplaçant l'élément à la souris, l'intégralité de la forme (fond SVG, icône, numéro, texte) bouge-t-elle de manière synchronisée ?
   - Attendre la réponse.

4. **Interactivité : Redimensionnement (Resize)**
   - Question : Les poignées de redimensionnement permettent-elles de modifier la taille correctement sans déformation anormale ?
   - Attendre la réponse.

5. **Connecteurs / Éléments reliés (si applicable)**
   - Question : Les lignes ou connecteurs suivent-ils dynamiquement le mouvement des éléments reliés ?
   - Attendre la réponse.

6. **Résistance au nombre d'éléments ("N éléments")**
   - Question : En testant avec moins d'éléments (ex: 2 ou 3) puis plus d'éléments (ex: 5 ou 6), le template s'adapte-t-il proprement sans crash ni superposition illisible ?
   - Attendre la réponse.

7. **Icônes & DSL**
   - Question : Les icônes déclarées via la syntaxe DSL (`icon:nom`) s'affichent-elles correctement et l'autocomplétion des icônes fonctionne-t-elle ?
   - Attendre la réponse.

8. **Palette de couleurs et thèmes**
   - Question : Les couleurs respectent-elles l'ordre de priorité (personnalisation panel > DSL > palette MIGSO) ?
   - Attendre la réponse.

9. **Export PPTX / SVG**
   - Question : L'export (PPTX ou SVG) génère-t-il un rendu fidèle au canvas ?
   - Attendre la réponse.

### 3. Gestion des anomalies
- Dès que l'utilisateur signale un problème sur un critère :
  1. NE PAS passer au critère suivant.
  2. Localiser le code source responsable dans `src/templates/`.
  3. Proposer et appliquer la correction.
  4. Demander à l'utilisateur de re-valider le critère corrigé avant de poursuivre.

### 4. Bilan final
- Afficher le récapitulatif complet avec 100% des cases cochées par l'utilisateur.
