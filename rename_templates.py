import re

mapping = {
    # Roadmaps
    "Roadmap 1": "Roadmap Classique",
    "Roadmap 2 (Vertical Timeline)": "Roadmap Chronologie Verticale",
    "Roadmap 3 (Snake Path)": "Roadmap Trajectoire Serpentin",
    "Roadmap 4 (Year Timeline)": "Roadmap Trimestrielle",
    "Roadmap 5 (Staggered Cards)": "Roadmap Cartes Alignées",
    "Roadmap 6 (Weekly Timeline)": "Roadmap Hebdomadaire",
    "Roadmap 7 (Curved Path)": "Roadmap Courbe",
    "Roadmap 8 (Staggered Timeline)": "Roadmap Jalons Échelonnés",
    "Roadmap 9 (Two-Level Timeline)": "Roadmap Double Niveau",
    "Roadmap 10 (Large Numbers)": "Roadmap Grands Chiffres",
    "Roadmap 11 (Vertical Percentage)": "Roadmap Pourcentages Verticaux",
    "Roadmap 12 (Step Path)": "Roadmap Étapes Successives",
    "Roadmap 13 (Weekly Columns)": "Roadmap Colonnes Hebdomadaires",
    "Roadmap 14 (Year Timeline)": "Roadmap Chronologie Annuelle",
    "Roadmap 15 (Progress Blocks)": "Roadmap Blocs de Progression",
    "Roadmap 16 (Curved Path)": "Roadmap Parcours Arqué",

    # Product Roadmaps
    "Product Roadmap 1": "Product Roadmap Standard",
    "Product Roadmap 2": "Product Roadmap Équipes & Quarters",
    "Product Roadmap 3": "Product Roadmap Cartes Descriptives",
    "Product Roadmap 4": "Product Roadmap Découverte & MVP",
    "Product Roadmap 5": "Product Roadmap Jalons Clés",
    "Product Roadmap 6": "Product Roadmap Synthétique",
    "Product Roadmap 7 (Quarters Grid)": "Product Roadmap Grille Trimestrielle",
    "Product Roadmap 8 (Calendar Grid)": "Product Roadmap Vue Calendrier",
    "Product Roadmap 9 (Timeline Bars)": "Product Roadmap Barres Chronologiques",
    "Product Roadmap 10 (Team Gantt)": "Product Roadmap Gantt par Équipe",
    "Product Roadmap 11 (Milestone Cards)": "Product Roadmap Cartes de Jalons",
    "Product Roadmap 12 (Quarter Badges)": "Product Roadmap Badges Trimestriels",

    # Strategy
    "Strategy 1": "Stratégie Étapes Principales",
    "Strategy Pyramid": "Pyramide Stratégique",
    "Strategy Hub & Spoke": "Stratégie Hub & Rayons",
    "Strategy 3 Columns": "Stratégie 3 Piliers",
    "Strategy Timeline": "Chronologie Stratégique",
    "Strategy 6 (Quadrant Matrix)": "Matrice Stratégique 4 Cadrans",
    "Strategy 7 (Nested Circles)": "Cercles Concentriques Stratégiques",
    "Strategy 8 (Staircase)": "Escalier Stratégique",

    # Process
    "Process 1": "Processus Linéaire",
    "Process Arrow": "Processus Flèches",
    "Process Cards": "Processus Cartes",
    "Process Vertical": "Processus Vertical",
    "Process 1 (Simple Steps)": "Processus Étapes Simples",

    # Puzzles
    "Puzzle 1": "Puzzle 4 Pièces",
    "Puzzle Horizontal": "Puzzle Horizontal",
    "Puzzle Vertical": "Puzzle Vertical",
    "Puzzle Grid 2x3": "Puzzle Grille 2x3",
    "Puzzle Circular": "Puzzle Circulaire",
    "Puzzle Diamond": "Puzzle Losange",
    "Puzzle Focus": "Puzzle Cœur de Cible",

    # Funnels
    "Funnel 1": "Entonnoir de Conversion",
    "Funnel Horizontal": "Entonnoir Horizontal",
    "Funnel 3D Effect": "Entonnoir Effet 3D",
    "Funnel Split": "Entonnoir Ramifié",
    "Funnel Steps": "Entonnoir Échelonné",

    # Icebergs
    "Iceberg 1": "Iceberg Stratégique",
    "Iceberg Vertical": "Iceberg Vertical",

    # Dashboards
    "Dashboard 1": "Tableau de Bord KPIs",
    "Dashboard Large Metric": "Tableau de Bord Grande Métrique",
    "Dashboard Bar KPIs": "Tableau de Bord Barres KPI",
    "Dashboard Gauges": "Tableau de Bord Jauges",
    "Dashboard Compact": "Tableau de Bord Compact",

    # Tables
    "Table 1": "Tableau Classique",
    "Table 2 (Striped)": "Tableau Rayé",
    "Table 3 (Card-based)": "Tableau en Cartes",
    "Table 4 (Header Emphasis)": "Tableau En-tête Mis en Avant",
    "Table 5 (Minimal)": "Tableau Minimaliste",
    "Table 6 (Blue Theme)": "Tableau Thème Bleu",

    # Agendas
    "Agenda 1": "Ordre du Jour Standard",
    "Agenda 2 (Horizontal Timeline)": "Ordre du Jour Ligne du Temps",
    "Agenda 3 (Grid)": "Ordre du Jour en Grille",
    "Agenda 4 (Card Stack)": "Ordre du Jour Cartes Empilées",

    # Comparisons
    "Comparison 1": "Comparatif Tableau",
    "Comparison 2 (Radar)": "Comparatif Radar",
    "Comparison 3 (Bar Chart)": "Comparatif Graphique en Barres",
    "Comparison 4 (Circles)": "Comparatif Cercles",
    "Comparison 5 (Scores)": "Comparatif Niveaux & Scores",
    "Comparison 6 (Checklist)": "Comparatif Liste de Contrôle",
    "Comparison 7 (Pros/Cons)": "Comparatif Avantages & Inconvénients",

    # Brains
    "Brain 1": "Carte Mentale Centrée",
    "Brain Left-Right Split": "Carte Mentale Séparation Gauche-Droite",
    "Brain Spider Web": "Carte Mentale Toile d'Araignée",
    "Brain Tree Structure": "Carte Mentale Arborescente",

    # Budgets
    "Budget 1": "Budget Répartition",
    "Budget Vertical Bars": "Budget Barres Verticales",
    "Budget Donut": "Budget Donut",
    "Budget Waterfall": "Budget en Cascade",
    "Budget Pie": "Budget Diagramme Circulaire",

    # Business
    "Business 1": "Business Vue d'Ensemble",
    "Business Vertical Hub": "Business Hub Vertical",
    "Business Matrix 2x3": "Business Matrice 2x3",
    "Business Chevron Flow": "Business Flux de Chevrons",
    "Business Diamond": "Business Losange",
    "Business Stacked Bars": "Business Barres Empilées",
    "Business Circle": "Business Cercle",
    "Business Vertical List": "Business Liste Verticale",
    "Business 3x3 Grid": "Business Grille 3x3",
    "Business Pyramid": "Business Pyramide",
    "Business Timeline": "Business Chronologie",

    # Decision Tree
    "Decision Tree 1": "Arbre de Décision Standard",
    "Decision Tree Horizontal": "Arbre de Décision Horizontal",

    # Goals
    "Goals 1": "Objectifs Généraux",
    "Goals Target": "Objectifs Cible",
    "Goals Mountain": "Objectifs Montagne",
    "Goals Gauge": "Objectifs Jauge",
    "Goals Progress Bars": "Objectifs Barres de Progression",
    "Goals Thermometer": "Objectifs Thermomètre",

    # Manufacturing
    "Manufacturing 1": "Production Flux Général",
    "Manufacturing 2 (Vertical Flow)": "Production Flux Vertical",
    "Manufacturing 3 (U-Shaped)": "Production Disposition en U",
    "Manufacturing 4 (Parallel Lines)": "Production Lignes Parallèles",
    "Manufacturing 5 (Diamond)": "Production Losange",
    "Manufacturing 6 (Hub & Spoke)": "Production Hub & Rayons",
    "Manufacturing 7 (Timeline)": "Production Chronologie",
    "Manufacturing 8 (Circular Flow)": "Production Flux Circulaire",

    # Value Chain & Cycles
    "Value Chain 1": "Chaîne de Valeur Horizontale",
    "Value Chain 2 (Vertical)": "Chaîne de Valeur Verticale",
    "Circle": "Cycle Répétitif",
}

with open('src/templates/registry.ts', 'r') as f:
    content = f.read()

count = 0
for old_label, new_label in mapping.items():
    # Only replace label: 'old_label' inside TEMPLATES definitions
    pattern = r"(label:\s*['\"])" + re.escape(old_label) + r"(['\"])"
    if re.search(pattern, content):
        content = re.sub(pattern, r"\g<1>" + new_label + r"\g<2>", content)
        count += 1
    else:
        print(f"NOT FOUND: {old_label}")

with open('src/templates/registry.ts', 'w') as f:
    f.write(content)

print(f"Successfully replaced {count} template labels.")
