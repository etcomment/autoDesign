import re

descriptions = {
    # Roadmaps
    "Timeline avec Jalons Alternés": "Timeline horizontale avec jalons numérotés positionnés alternativement au-dessus et en-dessous de la ligne.",
    "Chronologie avec Jalons & Phases": "Timeline verticale avec phases colorées (Phase One, Two, Three) et jalons par années.",
    "Trajectoire Serpentin Multi-Années": "Schéma en serpentin reliant 10 années consécutives avec jalons ancrés.",
    "Planification par Trimestre (Q1-Q4)": "Timeline découpée en 4 trimestres (Q1 à Q4) avec cartes de jalons.",
    "Cartes de Projets en Escalier": "Présentation sous forme de cartes décalées en escalier avec dates clés.",
    "Calendrier de Déploiement Hebdo": "Timeline de jalons hebdomadaires étalés sur plusieurs années.",
    "Courbe de Progression Annuelle": "Courbe fluide reliant des métriques et étapes annuelles.",
    "Milestones et Tâches Échelonnées": "Timeline à jalons décalés avec sous-titres de périmètre.",
    "Timeline à Double Étage": "Deux niveaux de jalons (haut et bas) reliés à un axe central.",
    "Jalons à Grands Métriques": "Cartes de jalons avec affichage en grands caractères pour les mois.",
    "Suivi Mensuel avec Pourcentages": "Liste verticale de jalons mensuels avec indicateurs de progression.",
    "Parcours par Étapes Clés": "Timeline sous forme de chemin par étapes numérotées.",
    "Tableau de Sprint par Semaines": "Grille de colonnes hebdomadaires (Week 1 à Week 8).",
    "Feuille de Route Multi-Années": "Timeline prospective s'étalant sur plusieurs années.",
    "Barre de Progression par Quart": "Blocs de jalons trimestriels avec barre de progression globale.",
    "Chemin Courbé de Maturation": "Parcours sinueux reliant les étapes d'idéation à la livraison.",

    # Product Roadmaps
    "Grille Produit 4 Quarters": "Grille trimestrielle (Q1-Q4) croisée avec 4 pôles (Dev, Product, UX, QA).",
    "Feuille de Route Multi-Équipes": "Grille trimestrielle avec bandes d'équipes et badges de fonctionnalités.",
    "Matrice Produit avec Cartes Détails": "Grille trimestrielle avec cartes détaillées contenant titres et sous-titres.",
    "Suivi Produit Découverte & MVP": "Matrice centrée sur les phases de recherche, prototypage et mise sur le marché.",
    "Tableau de Jalons Produit": "Vue en tableau des livrables clés par trimestre et pôle métier.",
    "Matrice Synthétique de Fonctionnalités": "Vue condensée des fonctionnalités à livrer par trimestre.",
    "Product Roadmap Grille Trimestrielle": "Grille de quarters personnalisable pour équipes produit.",
    "Planification Calendrier Équipes": "Calendrier de livraison avec suivi par équipe.",
    "Barres Chronologiques de Livraison": "Feuille de route avec barres d'avancement par trimestre.",
    "Vue Gantt des Équipes Produit": "Représentation style Gantt simplifiée pour les livrables produit.",
    "Cartes de Livrables par Trimestre": "Affichage par cartes indépendantes dans chaque trimestre.",
    "Badges Trimestriels par Pôle": "Badges colorés de jalons organisés par trimestre.",

    # Strategy
    "5 Piliers Stratégiques": "Alignement horizontal de 5 blocs représentant les axes stratégiques.",
    "Pyramide de Vision & Mission": "Pyramide à 5 niveaux (Vision, Mission, Objectifs, Initiatives, Fondations).",
    "Hub Central & 6 Axes Stratégiques": "Disposition en étoile autour d'un sujet central avec 6 rayons.",
    "3 Colonnes de Piliers d'Action": "Disposition en 3 colonnes verticales avec 6 blocs stratégiques.",
    "Feuille de Route Stratégique": "Timeline stratégique découpée par objectifs trimestriels.",
    "Matrice Stratégique 4 Cadrans": "Matrice 2x2 avec axes X et Y paramétrables.",
    "Niveaux Concentriques d'Impact": "Cercles imbriqués illustrant les niveaux d'impact stratégique.",
    "Escalier de Croissance": "Disposition en escalier illustrant la montée en puissance stratégique.",

    # Process
    "Processus 4 Étapes Horizontales": "Flux séquentiel de 4 étapes avec résultat final (Outcome).",
    "Flux de Processus en Flèches": "Étapes interconnectées par des flèches directionnelles.",
    "Cartes de Processus Séquentielles": "Cartes de phases avec numéro, titre et sous-titre.",
    "Processus Vertical Pas à Pas": "Flux vertical étape par étape de l'idéation au release.",
    "Étapes Simples avec Flèches": "Schéma minimaliste à 4 étapes avec connecteurs.",

    # Puzzles
    "Puzzle 4 Blocs d'Interconnexion": "Assemblage 2x2 de 4 pièces de puzzle interconnectées.",
    "Puzzle Ligne Horizontale": "Alignement horizontal de 4 pièces de puzzle imbriquées.",
    "Puzzle Colonne Verticale": "Empilement vertical de 4 pièces de puzzle.",
    "Puzzle Grille 2x3": "Grille 2x3 de 6 pièces de puzzle colorées.",
    "Puzzle Cercle d'Interdépendance": "Disposition circulaire de 4 pièces de puzzle.",
    "Puzzle Losange 4 Piliers": "Disposition en losange des pièces de puzzle.",
    "Puzzle Cœur de Métier & Soutien": "Pièce centrale avec pièces périphériques de soutien.",

    # Funnels
    "Entonnoir de Conversion Marketing": "Entonnoir classique à 4 niveaux (Awareness, Interest, Consideration, Purchase).",
    "Entonnoir Horizontal de Pipeline": "Entonnoir couché horizontalement de la prospection au closing.",
    "Entonnoir 3D en Couches": "Représentation 3D en couches empilées avec pourcentages.",
    "Entonnoir avec Bifurcation": "Entonnoir se séparant en deux parcours au niveau inférieur.",
    "Entonnoir par Niveaux d'Étape": "Entonnoir par segments gradués avec pourcentages de conversion.",

    # Icebergs
    "Iceberg Partie Visible vs Cachée": "Diagramme séparant les éléments émergés (visibles) et immergés (cachés).",
    "Iceberg Vertical d'Effort": "Vue verticale des efforts et apprentissages sous la surface du succès.",

    # Dashboards
    "Tableau KPI 4 Cartes Métriques": "Grille de 4 cartes métriques (Chiffre d'affaires, Utilisateurs, Churn, NPS).",
    "Focus Métrique Principale & Cartes": "Grand affichage de la métrique clé accompagné de cartes secondaires.",
    "Indicateurs avec Barres de Progression": "Cartes KPI avec barres de progression et variations.",
    "Tableau d'Indicateurs à Jauges": "Affichage sous forme de jauges et compteurs.",
    "Synthèse de Métriques Compacte": "Vue condensée des principaux indicateurs de performance.",

    # Tables
    "Grille de Données Classique": "Tableau de données avec en-têtes et lignes structurées.",
    "Tableau Lignes Alternées": "Tableau avec lignes bicolores pour une meilleure lisibilité.",
    "Tableau en Cartes": "Présentation des données sous forme de cartes d'en-tête.",
    "Tableau En-tête Mis en Avant": "Tableau avec en-tête coloré mis en valeur.",
    "Tableau Épuré sans Bordures": "Design minimaliste sans lignes de séparation.",
    "Tableau Thématique Bleu": "Tableau stylisé aux tons bleus professionnels.",

    # Agendas
    "Ordre du Jour Chronologique": "Liste chronologique des points à traiter avec numérotation.",
    "Ordre du Jour Ligne Temporelle": "Timeline horizontale des créneaux de la réunion.",
    "Ordre du Jour Grille d'Horaire": "Grille horaire par blocs d'interventions.",
    "Ordre du Jour Cartes Séquentielles": "Cartes indépendantes pour chaque sujet de l'ordre du jour.",

    # Comparisons
    "Tableau Comparatif Direct": "Comparaison colonne à colonne entre deux solutions (Left vs Right).",
    "Comparatif Graphique Radar/Toile": "Graphique en radar/toile comparant 2 séries sur plusieurs critères.",
    "Comparatif Barres de Mesure": "Barres de mesure horizontales comparatives.",
    "Comparatif Bulles & Cercles": "Comparaison visuelle sous forme de cercles proportionnels.",
    "Comparatif Évaluation par Scores": "Liste d'options avec scores et évaluations.",
    "Comparatif Liste de Contrôle": "Checklist bicolore de fonctionnalités valides/absentes.",
    "Matrice Pour et Contre": "Tableau 2 colonnes séparant les Avantages (Pros) et Inconvénients (Cons).",

    # Brains
    "Mindmap Carte Centrée": "Sujet central avec branches diffusant vers les idées secondaires.",
    "Mindmap Arbre Bi-Directionnel": "Sujet central avec branches réparties à gauche et à droite.",
    "Mindmap Toile de Réseau": "Réseau d'idées interconnectées autour d'un noyau.",
    "Mindmap Arborescence Hiérarchique": "Structure en arbre hiérarchique descendant.",

    # Budgets
    "Répartition Budget par Postes": "Synthèse du budget total et répartition par postes de dépense.",
    "Comparaison Budget Barres Verticales": "Histogramme vertical des dépenses par catégorie.",
    "Répartition Budgétaire en Donut": "Diagramme en anneau (Donut) avec total au centre.",
    "Analyse de Flux en Cascade (Waterfall)": "Diagramme de cascade (Waterfall) d'évolution budgétaire.",
    "Camembert Budget par Catégorie": "Diagramme circulaire (Pie Chart) des dépenses.",

    # Business
    "Vue d'Ensemble Modèle Business": "Sujet central entouré de ses composants business.",
    "Hub Central & Pôles Métier": "Hub vertical connectant les différents pôles de l'entreprise.",
    "Matrice d'Analyse Business 2x3": "Grille 2x3 d'analyse stratégique et opérationnelle.",
    "Flux de Processus par Chevrons": "Chaîne de valeur représentée par des chevrons successifs.",
    "Schéma Losange d'Interactions": "Disposition en losange des flux d'interaction d'affaires.",
    "Comparatif Barres Empilées Business": "Barres empilées représentant les facteurs d'affaires.",
    "Cycle d'Activité Circulaire": "Schéma circulaire du cycle de vie des affaires.",
    "Liste Structurée Verticale": "Liste verticale des fonctions business clés.",
    "Grille d'Analyse 9 Cases (3x3)": "Matrice 3x3 pour le diagnostic d'entreprise.",
    "Pyramide de Valeur Business": "Pyramide à niveaux de la création de valeur.",
    "Parcours Chronologique d'Entreprise": "Timeline de l'historique et des jalons de la société.",

    # Decision Tree
    "Arbre de Décision Binaire": "Arbre binaire de choix avec réponses Oui / Non.",
    "Arbre de Décision Horizontal": "Arbre de décision déployé horizontalement de gauche à droite.",

    # Goals
    "Tableau d'Objectifs & Cibles": "Objectif central et indicateurs cibles associés.",
    "Cible de Performance": "Visuel en cible concentrique avec objectifs de performance.",
    "Objectif Ascension / Montagne": "Parcours d'ascension représenté par la montée d'une montagne.",
    "Niveau d'Objectif par Jauge": "Jauges de niveau d'atteinte des objectifs.",
    "Progression des Objectifs en Barres": "Barres de progression des objectifs avec pourcentages.",
    "Indicateur d'Objectif Thermomètre": "Indicateur vertical sous forme de thermomètre de réussite.",

    # Manufacturing
    "Chaîne de Production Générale": "Ligne de fabrication avec stations et points de contrôle qualité.",
    "Ligne de Fabrique Verticale": "Flux de production vertical de l'entrée matière au produit fini.",
    "Circuit de Production en U": "Disposition des postes de travail en forme de U.",
    "Lignes de Production Parallèles": "Lignes d'assemblage parallèles convergentes.",
    "Diagramme de Production Losange": "Diagramme de processus de fabrication en losange.",
    "Centre de Distribution Hub & Spoke": "Réseau logistique hub & rayons.",
    "Timeline de Production": "Calendrier des étapes de fabrication.",
    "Circuit Fermé Circulaire": "Flux de production en boucle fermée (recyclage / réutilisation).",

    # Value Chain & Cycles
    "Chaîne de Valeur de Porter (Horizontale)": "Chaîne de valeur avec activités principales et de soutien.",
    "Chaîne de Valeur Verticale": "Vue verticale des activités principales et de soutien.",
    "Cycle d'Amélioration Continue": "Cycle itératif en 4 étapes (PDCA / Amélioration continue).",
}

with open('src/templates/registry.ts', 'r') as f:
    content = f.read()

count = 0
for label, desc in descriptions.items():
    # Insert description: '...' right after label: 'label'
    pattern = r"(label:\s*[\"']" + re.escape(label.replace("'", "\\'")) + r"[\"'])"
    if re.search(pattern, content):
        replacement = r"\1,\n    description: '" + desc.replace("'", "\\'") + r"'"
        content = re.sub(pattern, replacement, content)
        count += 1
    else:
        print(f"LABEL NOT FOUND FOR DESC: {label}")

with open('src/templates/registry.ts', 'w') as f:
    f.write(content)

print(f"Added description to {count} templates in registry.ts.")

# Generate docs/TEMPLATE_INVENTORY.md
md_lines = [
    "# Inventaire Complet des 116 Templates d'autoDesign\n",
    "Ce document recense l'intégralité des 116 templates disponibles dans l'application, avec leur nom d'interface, leur identifiant technique (type), leur catégorie et leur description visuelle / fonctionnelle exacte.\n",
    "| # | Nom dans l'Interface | Identifiant (Type) | Catégorie | Description Fonctionnelle & Visuelle |",
    "|---|---|---|---|---|",
]

idx = 1
for label, desc in descriptions.items():
    # Find type and category for this label
    match = re.search(r"type:\s*['\"]([^'\"]+)['\"]\s*,\s*label:\s*['\"]" + re.escape(label.replace("'", "\\'")) + r"['\"]\s*,\s*category:\s*['\"]([^'\"]+)['\"]", content)
    if match:
        t, c = match.group(1), match.group(2)
        md_lines.append(f"| {idx} | **{label}** | `{t}` | {c} | {desc} |")
        idx += 1

with open('docs/TEMPLATE_INVENTORY.md', 'w') as f:
    f.write('\n'.join(md_lines) + '\n')

print("Generated docs/TEMPLATE_INVENTORY.md successfully.")
