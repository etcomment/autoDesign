# Spécification et Grammaire Unifiée du DSL autoDesign

Ce document constitue la **source officielle et unique de la syntaxe DSL** pour tous les templates d'autoDesign. Tous les parsers (`parseTemplate.ts`) et générateurs (`generateDslText`) doivent se conformer strictement à cette spécification.

---

## 1. Principes Fondamentaux & Règles de Grammaire

1. **Header d'En-tête (`@templateType`)** :
   - Tout document DSL commence par une directive `@<type>` (ex: `@roadmap`, `@business`, `@process`) ou avec une variante `@<type><numéro>` (ex: `@business6`, `@puzzle3`, `@comparison2`).
   - Suivi optionnellement d'un titre entre guillemets.
   - *Exemples* : `@roadmap "Roadmap Stratégique 2026"`, `@business6 "Analyse de Performance"`.

2. **Structure des Blocs & Éléments** :
   - Chaque élément (étape, jalon, nœud, bloc, métrique, ligne, carte, etc.) est défini sur sa propre ligne avec le mot-clé de l'élément (`milestone`, `step`, `node`, `block`, `level`, `metric`, `row`, `item`, `station`, `activity`, `section`, etc.).
   - Le premier argument texte entre guillemets est le **Titre / Libellé**.
   - Le second argument texte optionnel entre guillemets est le **Sous-titre / Description**.

3. **Attributs Numériques & Temporels** :
   - Valeurs numériques ou montants : `val:"<valeur>"` (ex: `val:"£2.5M"`).
   - Pourcentages et progression : `pct:"<pourcentage>"` (ex: `pct:"75%"`).
   - Icônes Lucide : `icon:"<nom-icone>"` (ex: `icon:"target"`, `icon:"check"`, `icon:"rocket"`).
   - **Date / Année** *(nouveau)* : `date:<valeur>` — associe une date, année, mois ou toute étiquette temporelle à un jalon. Accepte tout format de texte (`date:2026`, `date:"Q1 2025"`, `date:JANUARY`, `date:"Week 3"`).

4. **Couleurs Hexadécimales (`#HEX`)** :
   - Une couleur personnalisée s'exprime au format Hexadécimal `#RRGGBB` ou `#RGB` en fin d'instruction d'élément (ex: `#3b82f6`, `#10b981`).

5. **Directives de Style Attachées (`style`)** :
   - Une directive `style` indentée sous un élément permet d'en personnaliser l'apparence visuelle :
     - `fill <color>` : couleur de fond du bloc
     - `stroke <color>` : couleur de bordure
     - `fontSize <number>` : taille de la police
     - `fontColor <color>` : couleur du texte
     - `boxWidth <number>` : largeur personnalisée
     - `boxHeight <number>` : hauteur personnalisée

---

## 2. Exemples Concrets et Fonctionnels par Template

### 2.1 Roadmaps (`@roadmap`, `@productRoadmap`, `@roadmap2` à `@roadmap16`)

#### Roadmap 1 — Timeline horizontale avec jalons

```dsl
@roadmap "Roadmap Stratégique 2026"
  start "DÉBUT"
  finish "LIVRAISON"
  milestone "Alpha Release" "Tests internes" date:2024 icon:"flask" #3b82f6
  milestone "Beta Launch" "Accès anticipé" date:2025 icon:"users" #8b5cf6
  milestone "GA Release" "Disponibilité générale" date:2026 icon:"rocket" #10b981
```

#### Roadmap 2 — Timeline 10 points (dates par jalon)

```dsl
@roadmap2
  milestone "Initiate" "Project kickoff" date:2022
  milestone "Plan" "Detailed design" date:2023
  milestone "Develop" "Core features" date:2024
  milestone "Test" "QA & validation" date:2025
  milestone "Deliver" "Production release" date:2026
```

> Alternativement, la liste globale des années s'écrit via `quarters` :
> ```dsl
>   quarters 2022 2023 2024 2025 2026 2027
> ```

#### Roadmap 3 — 2 cartes sur timeline (positionnées par `date:`)

```dsl
@roadmap3
  quarters 2019 2020 2021 2022 2023 2024 2025 2026 2027 2028
  milestone "Research" "Market analysis" date:2021
  milestone "Launch" "Go to market" date:2026
```

> Le `date:` détermine sur quelle année de la timeline chaque carte vient se **positionner et s'accrocher**.

#### Roadmap 4 — Grille quarters × jalons

```dsl
@roadmap4
  start "START"
  finish "FINISH"
  quarters Q1:2026 Q2:2026 Q3:2026 Q4:2026
  milestone:Q1 "Alpha Release" "Internal testing"
  milestone:Q2 "Beta Launch" "Private preview"
  milestone:Q3 "RC1" "Stabilization"
  milestone:Q4 "GA Release" "General availability"
```

#### Roadmap 5 — 4 jalons alternés (haut/bas) avec dates

```dsl
@roadmap5
  milestone "Discovery" "Understanding user needs" date:2024
  milestone "Prototyping" "Building rapid prototypes" date:2025
  milestone "Development" "Engineering core modules" date:2026
  milestone "Release" "Production deployment" date:2027
```

#### Roadmap 6 — Ruban de chevrons groupés par période

```dsl
@roadmap6
  quarters 2024 2025 2026
  milestone "Setup env" "Infrastructure" date:2024
  milestone "Login page" "Auth module" date:2024
  milestone "Dashboard" "Main UI" date:2025
  milestone "API layer" "Backend REST" date:2025
  milestone "Tests" "QA coverage" date:2026
  milestone "Launch" "Go live" date:2026
```

#### Roadmap 7 — Timeline verticale avec cercles numérotés

```dsl
@roadmap7
  milestone "2023" "458" date:2023
  milestone "2024" "285" date:2024
  milestone "2025" "853" date:2025
```

> Pour ce template, `title` = label gauche, `subtitle` = valeur numérique dans le cercle, `date:` = label affiché sur la timeline.

#### Roadmap 8 & 9 — Jalons avec colonnes ou triangles (date affichée en haut)

```dsl
@roadmap8
  milestone "Research" "Competitive analysis" date:2023
  milestone "Plan" "Scope definition" date:2024
  milestone "Execute" "Development sprints" date:2025
  milestone "Review" "Quality assurance" date:2026
```

#### Roadmap 10 — Blocs alternés haut/bas avec date sous le titre

```dsl
@roadmap10
  milestone "Ideation" "Brainstorm concepts" date:JAN
  milestone "Validation" "Customer interviews" date:MAR
  milestone "MVP Build" "Core features only" date:JUN
  milestone "Launch" "Public release" date:SEP
```

#### Roadmap 11 — Grand label temporel latéral

```dsl
@roadmap11
  milestone "Initiate" "Project charter & team assembly" date:JANUARY
  milestone "Plan" "Timeline, budget & resource allocation" date:FEBRUARY
  milestone "Execute" "Development & integration phases" date:MARCH
  milestone "Monitor" "KPI tracking & risk management" date:APRIL
  milestone "Close" "Final delivery & retrospective" date:MAY
```

> `date:` remplace le numéro d'ordre affiché en grand à côté de chaque bloc.

#### Roadmap 12 — Chemin en S (label "Step")

```dsl
@roadmap12
  milestone "Analyze" "Gather requirements" date:"Phase A"
  milestone "Design" "Create blueprint" date:"Phase B"
  milestone "Implement" "Build solution" date:"Phase C"
  milestone "Verify" "Test & validate" date:"Phase D"
```

> Sans `date:`, le label affiché est `Step 01`, `Step 02`, etc.

#### Roadmap 13 — Bulles alternées sur timeline (label "WEEK")

```dsl
@roadmap13
  milestone "Kickoff" "Team alignment" date:"Week 1"
  milestone "Research" "User interviews" date:"Week 2"
  milestone "Wireframes" "Low-fidelity mockups" date:"Week 3"
  milestone "Prototype" "Interactive demo" date:"Week 4"
  milestone "Dev Sprint 1" "Core features" date:"Week 5"
  milestone "Release" "Production deploy" date:"Week 8"
```

> Sans `date:`, le label affiché est `WEEK 1`, `WEEK 2`, etc.

#### Roadmap 14 — Flèches en cascade avec année

```dsl
@roadmap14
  milestone "Foundation" "Core platform" date:2023
  milestone "Growth" "Feature expansion" date:2024
  milestone "Scale" "Infrastructure upgrade" date:2025
  milestone "Optimize" "Performance & UX" date:2026
```

#### Roadmap 15 — Blocs de progression avec date

```dsl
@roadmap15
  start "START"
  finish "FINISH"
  milestone "Research" "Market study" date:"Q1 2025"
  milestone "Prototype" "Proof of concept" date:"Q2 2025"
  milestone "Development" "Build phase" date:"Q3 2025"
  milestone "Testing" "QA cycle" date:"Q4 2025"
  milestone "Launch" "Go live" date:"Q1 2026"
```

> `date:` remplace le grand numéro en arrière-plan et est également affiché en bas du bloc.

#### Roadmap 16 — Cercles sur courbe avec date

```dsl
@roadmap16
  start "START"
  finish "FINISH"
  milestone "Concept" "Idea validation" date:2023
  milestone "Design" "UX & architecture" date:2024
  milestone "Develop" "Core modules" date:2025
  milestone "Test" "QA & UAT" date:2026
  milestone "Deliver" "Production release" date:2027
```

#### Product Roadmap — Grille quarters × équipes

```dsl
@productRoadmap
  quarters Q1:2026 Q2:2026 Q3:2026 Q4:2026
  lanes Produit Tech Marketing
  milestone:Q1:Produit "Refonte UX" "Nouvelle interface"
  milestone:Q2:Tech "Migration API" "Backend GraphQL"
  milestone:Q3:Marketing "Campagne Mkt" "Lancement international"
```

---

### 2.2 Business 1 à 11 (`@business` à `@business11`)

```dsl
@business "Analyse d'Affaires Globale"
  center "Vision 2026"
  node "Part de Marché" "Acquisition clients" val:"£2.5M" pct:"75%" icon:"trending-up" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  node "R&D Innovation" "Nouveaux brevets" val:"€1.2M" pct:"50%" icon:"cpu" #8b5cf6
  node "Expansion" "Ouverture filiales" val:"$800K" pct:"35%" icon:"map-pin" #10b981
```

### 2.3 Process 1 à 5 (`@process` à `@process5`)

```dsl
@process "Cycle de Développement Produit"
  step "Conception" "Cahier des charges et spécifications" icon:"edit-3" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  step "Développement" "Sprints de réalisation" icon:"code" #8b5cf6
  step "Recette QA" "Validation des tests automatisés" icon:"check-circle" #10b981
  step "Déploiement" "Mise en production progressive" icon:"rocket" #f59e0b
```

### 2.4 Strategy 1 à 8 (`@strategy` à `@strategy8`)

```dsl
@strategy "Piliers de Croissance Stratégique"
  block "01" "Excellence Opérationnelle" "Optimisation continue des processus" icon:"shield" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  block "02" "Innovation Disruptive" "Investissements R&D et IA" icon:"zap" #8b5cf6
  block "03" "Expansion Internationale" "Conquête des marchés asiatiques" icon:"globe" #10b981
  block "04" "Satisfaction Client" "Accompagnement et support dédié" icon:"heart" #ec4899
```

### 2.5 Puzzle 1 à 7 (`@puzzle` à `@puzzle7`)

```dsl
@puzzle "Composants de l'Écosystème"
  piece "Stratégie" "Alignement de la vision" val:"100%" icon:"compass" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  piece "Exécution" "Mise en œuvre des projets" val:"85%" icon:"cpu" #8b5cf6
  piece "Mesure" "Suivi des KPIs" val:"90%" icon:"bar-chart-2" #10b981
  piece "Optimisation" "Amélioration continue" val:"70%" icon:"sliders" #f59e0b
```

### 2.6 Funnel 1 à 5 (`@funnel` à `@funnel5`)

```dsl
@funnel "Tunnel de Conversion Marketing"
  level "Visiteurs Unique" 10000 val:"10,000" pct:"100%" icon:"users" #242254
    style fill #242254 fontColor #ffffff
  level "Leads Qualifiés" 2500 val:"2,500" pct:"25%" icon:"user-check" #2b60d3
  level "Opportunités" 800 val:"800" pct:"8%" icon:"target" #8b5cf6
  level "Clients Signés" 150 val:"150" pct:"1.5%" icon:"award" #ff472e
```

### 2.7 Dashboard 1 à 5 (`@dashboard` à `@dashboard5`)

```dsl
@dashboard "Tableau de Bord Exécutif"
  metric "ARR" "£4.2M" "+18%" icon:"dollar-sign" #10b981
    style fill #10b981 fontColor #ffffff
  metric "Taux de Retention" "94.2%" "+2.1%" icon:"users" #3b82f6
  metric "NPS Client" "+68" "+5 pts" icon:"smile" #8b5cf6
  metric "Churn Mensuel" "0.8%" "-0.2%" icon:"trending-down" #ec4899
```

### 2.8 Table 1 à 6 (`@table` à `@table6`)

```dsl
@table "Matrice Comparative des Offres"
  columns "Fonctionnalité" "Starter" "Professionnel" "Entreprise"
  row "Support 24/7" "Email" "Prioritaire" "Dédié & Téléphone" icon:"help-circle" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  row "Stockage Cloud" "10 GB" "500 GB" "Illimité" icon:"database" #8b5cf6
  row "Garantie SLA" "99.0%" "99.9%" "99.99%" icon:"shield-check" #10b981
```

### 2.9 Agenda 1 à 4 (`@agenda` à `@agenda4`)

```dsl
@agenda "Planning de la Journée Séminaire"
  item "09:00" "Accueil & Café" "Discours d'ouverture et présentation" icon:"coffee" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  item "10:30" "Atelier Stratégie" "Session de travail en équipes" icon:"users" #8b5cf6
  item "14:00" "Keynote Innovation" "Intervention des experts invités" icon:"award" #10b981
  item "16:30" "Clôture & Cocktail" "Networking et bilan" icon:"glass-water" #f59e0b
```

### 2.10 Comparison 1 à 7 (`@comparison` à `@comparison7`)

```dsl
@comparison "Comparatif d'Architecture Tech"
  left "Option A: Monolithe" "Architecture classique centralisée" icon:"box" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  right "Option B: Microservices" "Distribution résiliente et scalable" icon:"layers" #10b981
    style fill #10b981 fontColor #ffffff
```

### 2.11 Brain 1 à 4 (`@brain` à `@brain4`)

```dsl
@brain "Carte Mentale d'Innovation"
  center "Projet Alpha"
  node "Intelligence Artificielle" "Modèles prédictifs et LLM" pct:"80%" icon:"cpu" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  node "Expérience Client" "Personnalisation du parcours" pct:"95%" icon:"user-check" #8b5cf6
  node "Sécurité & Données" "Chiffrement et conformité RGPD" pct:"100%" icon:"lock" #10b981
```

### 2.12 Budget 1 à 5 (`@budget` à `@budget5`)

```dsl
@budget "Répartition du Budget Projets 2026"
  item "Infrastructure & Cloud" "£1.2M" "40%" icon:"server" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  item "Équipe & Recrutement" "£900K" "30%" icon:"users" #8b5cf6
  item "Marketing & Acquisition" "£600K" "20%" icon:"megaphone" #10b981
  item "R&D & Outillage" "£300K" "10%" icon:"wrench" #f59e0b
```

### 2.13 DecisionTree / Decision 1 à 2 (`@decision` / `@decisionTree`, `@decision2`)

```dsl
@decision "Arbre de Décision Qualité"
  question "Niveau de risque identifié ?"
  yes "Faible" -> "Approbation automatique" icon:"check-circle" #10b981
  no "Élevé" -> "Revue Comité" icon:"alert-triangle" #ef4444
  leaf "Revue Comité" -> "Validation Direction" icon:"shield-alert" #f59e0b
    style fill #f59e0b fontColor #ffffff
```

### 2.14 Goals 1 à 5 (`@goals` à `@goals5`)

```dsl
@goals "Objectifs Stratégiques Q3-Q4"
  metric "Chiffre d'Affaires" "Target: £5.0M" val:"£4.2M" pct:"84%" icon:"target" #10b981
    style fill #10b981 fontColor #ffffff
  metric "Satisfaction Client" "Target: 95%" val:"92%" pct:"92%" icon:"smile" #3b82f6
  metric "Nouveaux Utilisateurs" "Target: 50K" val:"41K" pct:"82%" icon:"user-plus" #8b5cf6
```

### 2.15 Manufacturing 1 à 8 (`@manufacturing` à `@manufacturing8`)

```dsl
@manufacturing "Ligne de Fabrication Industrielle"
  station "Approvisionnement" "Réception des matières premières" icon:"truck" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  station "Assemblage" "Montage automatique des composants" icon:"cpu" #8b5cf6
  station "Contrôle Qualité" "Inspection optique et métrologie" icon:"search" #10b981
  station "Conditionnement" "Emballage et expédition" icon:"package" #f59e0b
```

### 2.16 ValueChain 1 à 2 (`@valueChain`, `@valueChain2`)

```dsl
@valueChain "Chaîne de Valeur Entreprise"
  activity "Logistique Interne" "Stockage et gestion des matières" icon:"archive" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  activity "Production" "Transformation et assemblage" icon:"settings" #8b5cf6
  activity "Marketing & Ventes" "Promotion et canaux de distribution" icon:"shopping-cart" #10b981
  activity "Services après-vente" "Support et maintenance" icon:"headphones" #ec4899
```

### 2.17 Iceberg 1 à 2 (`@iceberg`, `@iceberg2`)

```dsl
@iceberg "Structure des Coûts Cachés"
  section "Coûts Visibles (Surface)" "Licences et matériel direct" val:"20%" icon:"eye" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  section "Maintenance & Support" "Mises à jour et assistance" val:"35%" icon:"tool" #10b981
  section "Dette Technique (Immergé)" "Refactorisation et sécurité" val:"45%" icon:"alert-octagon" #ef4444
```

### 2.18 Circle (`@circle`)

```dsl
@circle "Cycle d'Amélioration Continue (PDCA)"
  center "Qualité"
  segment "Planifier (Plan)" "Définir les objectifs et processus" pct:"25%" icon:"compass" #3b82f6
    style fill #3b82f6 fontColor #ffffff
  segment "Déployer (Do)" "Exécuter les plans d'action" pct:"50%" icon:"play" #8b5cf6
  segment "Contrôler (Check)" "Mesurer les résultats obtenus" pct:"75%" icon:"check-square" #10b981
  segment "Agir (Act)" "Corriger et standardiser" pct:"100%" icon:"refresh-cw" #f59e0b
```

---

## 3. Attribut `date:` — Référence complète

L'attribut `date:` est applicable à tous les éléments `milestone` de n'importe quel template Roadmap.

### Syntaxe

```
milestone "Titre" "Sous-titre" date:<valeur>
```

La `<valeur>` est un texte libre sans espaces, ou entre guillemets si elle contient des espaces :

| Exemple | Résultat affiché |
|---|---|
| `date:2026` | `2026` |
| `date:JANUARY` | `JANUARY` |
| `date:JAN` | `JAN` |
| `date:"Q1 2025"` | `Q1 2025` |
| `date:"Week 3"` | `Week 3` |
| `date:"Phase A"` | `Phase A` |

### Effet par template

| Template | Rôle de `date:` | Fallback sans `date:` |
|---|---|---|
| **Roadmap 1** | Affiché comme label secondaire du jalon | *(aucun)* |
| **Roadmap 2** | Année affichée sous le dot de la timeline | `2019`, `2020`… |
| **Roadmap 3** | Positionne la carte sur la bonne année de la timeline | Indice 2 (ms[0]) et indice 7 (ms[1]) |
| **Roadmap 5** | Année affichée sous chaque tige | `2019`, `2020`, `2021`, `2022` |
| **Roadmap 6** | Groupe de la phase (utiliser `quarters` à la place) | *(aucun)* |
| **Roadmap 7** | Label affiché à gauche de chaque dot vertical | *(aucun)* |
| **Roadmap 8 & 9** | Année affichée en haut de chaque colonne | `2019 + i` |
| **Roadmap 10** | Affiché sous le titre dans le bloc coloré | *(aucun)* |
| **Roadmap 11** | Grand label numéro/temporel latéral | `1`, `2`, `3`… |
| **Roadmap 12** | Remplace `Step 01` comme label du chemin | `Step 01`, `Step 02`… |
| **Roadmap 13** | Remplace `WEEK 1` comme label de la bulle | `WEEK 1`, `WEEK 2`… |
| **Roadmap 14** | Année au-dessus de chaque flèche en cascade | `2019 + i` |
| **Roadmap 15** | Grand chiffre en arrière-plan + label bas du bloc | `01`, `02`… |
| **Roadmap 16** | Affiché sous le subtitle de chaque cercle | *(aucun)* |

### Combinaison avec `quarters` (Roadmaps 2, 3, 6)

Pour les templates à timeline fixe (Roadmap 2 et 3), la **liste des années** visible sur la timeline est définie par `quarters`. Les `date:` des milestones référencent une valeur de cette liste.

```dsl
@roadmap3
  quarters 2025 2026 2027 2028 2029 2030
  milestone "Alpha" "Phase 1" date:2027    ← se positionne sur 2027 dans la timeline
  milestone "GA" "Release" date:2030       ← se positionne sur 2030 dans la timeline
```

---

## 4. Matrice de Conformité des Parsers

| Famille | En-tête `@` | Éléments dynamiques | `date:` | `val:` / `pct:` | `icon:` | `style` supporté |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `Roadmap` (1 à 16) | Oui | Oui | **Oui** | Non | Oui | Oui |
| `ProductRoadmap` | Oui | Oui | Non | Non | Oui | Oui |
| `Business` (1 à 11) | Oui | Oui | Non | Oui | Oui | Oui |
| `Process` (1 à 5) | Oui | Oui | Non | Non | Oui | Oui |
| `Strategy` (1 à 8) | Oui | Oui | Non | Non | Oui | Oui |
| `Puzzle` (1 à 7) | Oui | Oui | Non | Oui | Oui | Oui |
| `Funnel` (1 à 5) | Oui | Oui | Non | Oui | Oui | Oui |
| `Dashboard` (1 à 5) | Oui | Oui | Non | Oui | Oui | Oui |
| `Table` (1 à 6) | Oui | Oui | Non | Non | Oui | Oui |
| `Agenda` (1 à 4) | Oui | Oui | Non | Non | Oui | Oui |
| `Comparison` (1 à 7) | Oui | Oui | Non | Non | Oui | Oui |
| `Brain` (1 à 4) | Oui | Oui | Non | Oui | Oui | Oui |
| `Budget` (1 à 5) | Oui | Oui | Non | Oui | Oui | Oui |
| `DecisionTree` (1 à 2) | Oui | Oui | Non | Non | Oui | Oui |
| `Goals` (1 à 5) | Oui | Oui | Non | Oui | Oui | Oui |
| `Manufacturing` (1 à 8) | Oui | Oui | Non | Non | Oui | Oui |
| `ValueChain` (1 à 2) | Oui | Oui | Non | Non | Oui | Oui |
| `Iceberg` (1 à 2) | Oui | Oui | Non | Oui | Oui | Oui |
| `Circle` | Oui | Oui | Non | Oui | Oui | Oui |

---

## 5. Règle pour les Développeurs & Agents

> **Toute modification de la syntaxe DSL ou ajout d'un nouveau type de diagramme doit impérativement être documentée dans ce fichier avant ou au moment de l'implémentation dans `src/templates/dsl/parseTemplate.ts`.**
