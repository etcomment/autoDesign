import re

mapping = {
    # Roadmaps
    "Roadmap Classique": "Timeline avec Jalons Alternés",
    "Roadmap Chronologie Verticale": "Chronologie avec Jalons & Phases",
    "Roadmap Trajectoire Serpentin": "Trajectoire Serpentin Multi-Années",
    "Roadmap Trimestrielle": "Planification par Trimestre (Q1-Q4)",
    "Roadmap Cartes Alignées": "Cartes de Projets en Escalier",
    "Roadmap Hebdomadaire": "Calendrier de Déploiement Hebdo",
    "Roadmap Courbe": "Courbe de Progression Annuelle",
    "Roadmap Jalons Échelonnés": "Milestones et Tâches Échelonnées",
    "Roadmap Double Niveau": "Timeline à Double Étage",
    "Roadmap Grands Chiffres": "Jalons à Grands Métriques",
    "Roadmap Pourcentages Verticaux": "Suivi Mensuel avec Pourcentages",
    "Roadmap Étapes Successives": "Parcours par Étapes Clés",
    "Roadmap Colonnes Hebdomadaires": "Tableau de Sprint par Semaines",
    "Roadmap Chronologie Annuelle": "Feuille de Route Multi-Années",
    "Roadmap Blocs de Progression": "Barre de Progression par Quart",
    "Roadmap Parcours Arqué": "Chemin Courbé de Maturation",

    # Product Roadmaps
    "Product Roadmap Standard": "Grille Produit 4 Quarters",
    "Product Roadmap Équipes & Quarters": "Feuille de Route Multi-Équipes",
    "Product Roadmap Cartes Descriptives": "Matrice Produit avec Cartes Détails",
    "Product Roadmap Découverte & MVP": "Suivi Produit Découverte & MVP",
    "Product Roadmap Jalons Clés": "Tableau de Jalons Produit",
    "Product Roadmap Synthétique": "Matrice Synthétique de Fonctionnalités",
    "Product Roadmap Grille Trimestrielle": "Grille Produit par Trimestre",
    "Product Roadmap Vue Calendrier": "Planification Calendrier Équipes",
    "Product Roadmap Barres Chronologiques": "Barres Chronologiques de Livraison",
    "Product Roadmap Gantt par Équipe": "Vue Gantt des Équipes Produit",
    "Product Roadmap Cartes de Jalons": "Cartes de Livrables par Trimestre",
    "Product Roadmap Badges Trimestriels": "Badges Trimestriels par Pôle",

    # Strategy
    "Stratégie Étapes Principales": "5 Piliers Stratégiques",
    "Pyramide Stratégique": "Pyramide de Vision & Mission",
    "Stratégie Hub & Rayons": "Hub Central & 6 Axes Stratégiques",
    "Stratégie 3 Piliers": "3 Colonnes de Piliers d'Action",
    "Chronologie Stratégique": "Feuille de Route Stratégique",
    "Matrice Stratégique 4 Cadrans": "Matrice Stratégique 4 Cadrans",
    "Cercles Concentriques Stratégiques": "Niveaux Concentriques d'Impact",
    "Escalier Stratégique": "Escalier de Croissance",

    # Process
    "Processus Linéaire": "Processus 4 Étapes Horizontales",
    "Processus Flèches": "Flux de Processus en Flèches",
    "Processus Cartes": "Cartes de Processus Séquentielles",
    "Processus Vertical": "Processus Vertical Pas à Pas",
    "Processus Étapes Simples": "Étapes Simples avec Flèches",

    # Puzzles
    "Puzzle 4 Pièces": "Puzzle 4 Blocs d'Interconnexion",
    "Puzzle Horizontal": "Puzzle Ligne Horizontale",
    "Puzzle Vertical": "Puzzle Colonne Verticale",
    "Puzzle Grille 2x3": "Matrice Puzzle 6 Pièces (2x3)",
    "Puzzle Circulaire": "Puzzle Cercle d'Interdépendance",
    "Puzzle Losange": "Puzzle Losange 4 Piliers",
    "Puzzle Cœur de Cible": "Puzzle Cœur de Métier & Soutien",

    # Funnels
    "Entonnoir de Conversion": "Entonnoir de Conversion Marketing",
    "Entonnoir Horizontal": "Entonnoir Horizontal de Pipeline",
    "Entonnoir Effet 3D": "Entonnoir 3D en Couches",
    "Entonnoir Ramifié": "Entonnoir avec Bifurcation",
    "Entonnoir Échelonné": "Entonnoir par Niveaux d'Étape",

    # Icebergs
    "Iceberg Stratégique": "Iceberg Partie Visible vs Cachée",
    "Iceberg Vertical": "Iceberg Vertical d'Effort",

    # Dashboards
    "Tableau de Bord KPIs": "Tableau KPI 4 Cartes Métriques",
    "Tableau de Bord Grande Métrique": "Focus Métrique Principale & Cartes",
    "Tableau de Bord Barres KPI": "Indicateurs avec Barres de Progression",
    "Tableau de Bord Jauges": "Tableau d'Indicateurs à Jauges",
    "Tableau de Bord Compact": "Synthèse de Métriques Compacte",

    # Tables
    "Tableau Classique": "Grille de Données Classique",
    "Tableau Rayé": "Tableau Lignes Alternées",
    "Tableau en Cartes": "Grille sous forme de Cartes",
    "Tableau En-tête Mis en Avant": "Tableau En-tête Mis en Avant",
    "Tableau Minimaliste": "Tableau Épuré sans Bordures",
    "Tableau Thème Bleu": "Tableau Thématique Bleu",

    # Agendas
    "Ordre du Jour Standard": "Ordre du Jour Chronologique",
    "Ordre du Jour Ligne du Temps": "Ordre du Jour Ligne Temporelle",
    "Ordre du Jour en Grille": "Ordre du Jour Grille d'Horaire",
    "Ordre du Jour Cartes Empilées": "Ordre du Jour Cartes Séquentielles",

    # Comparisons
    "Comparatif Tableau": "Tableau Comparatif Direct",
    "Comparatif Radar": "Comparatif Graphique Radar/Toile",
    "Comparatif Graphique en Barres": "Comparatif Barres de Mesure",
    "Comparatif Cercles": "Comparatif Bulles & Cercles",
    "Comparatif Niveaux & Scores": "Comparatif Évaluation par Scores",
    "Comparatif Liste de Contrôle": "Tableau d'Éléments Valides (Checklist)",
    "Comparatif Avantages & Inconvénients": "Matrice Pour et Contre",

    # Brains
    "Carte Mentale Centrée": "Mindmap Carte Centrée",
    "Carte Mentale Séparation Gauche-Droite": "Mindmap Arbre Bi-Directionnel",
    "Carte Mentale Toile d'Araignée": "Mindmap Toile de Réseau",
    "Carte Mentale Arborescente": "Mindmap Arborescence Hiérarchique",

    # Budgets
    "Budget Répartition": "Répartition Budget par Postes",
    "Budget Barres Verticales": "Comparaison Budget Barres Verticales",
    "Budget Donut": "Répartition Budgétaire en Donut",
    "Budget en Cascade": "Analyse de Flux en Cascade (Waterfall)",
    "Budget Diagramme Circulaire": "Camembert Budget par Catégorie",

    # Business
    "Business Vue d'Ensemble": "Vue d'Ensemble Modèle Business",
    "Business Hub Vertical": "Hub Central & Pôles Métier",
    "Business Matrice 2x3": "Matrice d'Analyse Business 2x3",
    "Business Flux de Chevrons": "Flux de Processus par Chevrons",
    "Business Losange": "Schéma Losange d'Interactions",
    "Business Barres Empilées": "Comparatif Barres Empilées Business",
    "Business Cercle": "Cycle d'Activité Circulaire",
    "Business Liste Verticale": "Liste Structurée Verticale",
    "Business Grille 3x3": "Grille d'Analyse 9 Cases (3x3)",
    "Business Pyramide": "Pyramide de Valeur Business",
    "Business Chronologie": "Parcours Chronologique d'Entreprise",

    # Decision Tree
    "Arbre de Décision Standard": "Arbre de Décision Binaire",
    "Arbre de Décision Horizontal": "Arbre de Décision Horizontal",

    # Goals
    "Objectifs Généraux": "Tableau d'Objectifs & Cibles",
    "Objectifs Cible": "Cible de Performance",
    "Objectifs Montagne": "Objectif Ascension / Montagne",
    "Objectifs Jauge": "Niveau d'Objectif par Jauge",
    "Objectifs Barres de Progression": "Progression des Objectifs en Barres",
    "Objectifs Thermomètre": "Indicateur d'Objectif Thermomètre",

    # Manufacturing
    "Production Flux Général": "Chaîne de Production Générale",
    "Production Flux Vertical": "Ligne de Fabrique Verticale",
    "Production Disposition en U": "Circuit de Production en U",
    "Production Lignes Parallèles": "Lignes de Production Parallèles",
    "Production Losange": "Diagramme de Production Losange",
    "Production Hub & Rayons": "Centre de Distribution Hub & Spoke",
    "Production Chronologie": "Timeline de Production",
    "Production Flux Circulaire": "Circuit Fermé Circulaire",

    # Value Chain & Cycles
    "Chaîne de Valeur Horizontale": "Chaîne de Valeur de Porter (Horizontale)",
    "Chaîne de Valeur Verticale": "Chaîne de Valeur Verticale",
    "Cycle Répétitif": "Cycle d'Amélioration Continue",
}

with open('src/templates/registry.ts', 'r') as f:
    content = f.read()

count = 0
for old_label, new_label in mapping.items():
    # Make sure we safely match single quotes or double quotes
    pattern = r"(label:\s*['\"])" + re.escape(old_label) + r"(['\"])"
    if re.search(pattern, content):
        content = re.sub(pattern, r"\g<1>" + new_label.replace("'", "\\'") + r"\g<2>", content)
        count += 1
    else:
        print(f"NOT FOUND: {old_label}")

with open('src/templates/registry.ts', 'w') as f:
    f.write(content)

print(f"Successfully updated {count} template labels to functional descriptive names.")
