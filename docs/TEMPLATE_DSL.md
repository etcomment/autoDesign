# Template DSL — Documentation complète de la syntaxe et des templates

Le **Template DSL** (Domain Specific Language) est un langage textuel déclaratif conçu pour construire et personnaliser dynamiquement tous les modèles visuels supportés par la plateforme (`Roadmaps`, `Business`, `Process`, `Strategy`, `Puzzle`, `Funnel`, `Dashboard`, `Table`, `Agenda`, `Comparison`, `Brain`, `Budget`, `DecisionTree`, `Goals`, `Manufacturing`, `ValueChain`, `Iceberg`, `Circle`).

Il permet une génération rapide de schémas interactifs et modifiables instantanément au sein de l'éditeur sans manipulation manuelle complexe dans le canvas.

---

## 1. Grammaire Globale du DSL

Chaque document DSL débute par un en-tête principal déclarant le type et la variante du template, optionnellement suivi du titre global entre guillemets.

### Structure d'une commande d'en-tête
```
@<type>[variante] "[Titre principal]"
```
* **Exemples** : `@roadmap "Roadmap Globale"`, `@business3 "Modèle Hub & Spoke"`, `@process2 "Flux d'approbation"`

### Directives et Mots-Clés Généraux
Le parser découpe le texte ligne par ligne. Les lignes vides et les commentaires débutant par `//` sont ignorés.

```
// Ceci est un commentaire ignoré
@roadmap "Mon Titre"
  start "Début"
  finish "Fin"
```

### Directives de Style Complémentaires (`style`)
Pour certains types de templates (notamment `roadmap`), des paramètres visuels peuvent être injectés globalement ou au niveau des éléments :
| Propriété | Type | Description | Exemple |
|---|---|---|---|
| `fill` | string | Couleur de fond / Remplissage du nœud | `style fill #4a90d9` |
| `stroke` | string | Couleur de bordure | `style stroke #333333` |
| `boxWidth` | number | Largeur du conteneur en pixels | `style boxWidth 180` |
| `boxHeight` | number | Hauteur minimale en pixels | `style boxHeight 100` |
| `fontSize` | number | Taille de la police de titre (px) | `style fontSize 14` |
| `fontWeight` | number | Graisse de la police (ex: 400, 600, 700) | `style fontWeight 600` |
| `fontColor` | string | Couleur du texte | `style fontColor white` |

---

## 2. Modificateurs Universels d'Éléments (Trailing Arguments)

Pour la quasi-totalité des éléments de liste (`milestone`, `step`, `block`, `piece`, `level`, `metric`, `item`, `comp`, `node`, `branch`, `line`, `station`, `primary`, `support`, `above`, `below`, `segment`), le parser prend en charge un ensemble de modificateurs optionnels positionnés après les arguments obligatoires :

1. **Sous-titre / Description** : Deuxième argument sous forme de chaîne de caractères entre guillemets `"Mon sous-titre"`.
2. **Valeur numérique / Métrique (`val:...`)** : Permet de définir une valeur textuelle ou numérique propre à l'élément (ex: `val:"$2.4M"` ou `val:"High"`).
3. **Pourcentage (`pct:...`)** : Permet de définir un pourcentage d'avancement ou de répartition (ex: `pct:"75%"` ou `pct:"80"`).
4. **Icône Lucide (`icon:...`)** : Nom de l'icône Lucide React associée à l'élément (ex: `icon:CheckCircle`, `icon:TrendingUp`, `icon:Target`, `icon:Zap`, `icon:Users`).
5. **Couleur Hexadécimale (`#HEX`)** : Couleur spécifique attribuée au bloc ou au marqueur de l'élément (ex: `#4caf50`, `#e91e63`).

#### Exemple de modificateurs combinés :
```
  step "Analyse du besoin" "Étude d'impact initiale" val:"Urgent" pct:"100%" icon:CheckCircle #4caf50
```

---

## 3. Guide et Exemples par Catégorie de Templates

---

### 3.1 Roadmaps (`Roadmaps`)

**Variantes supportées** : `roadmap`, `roadmap2`, `roadmap3`, `roadmap4`, `roadmap5`, `roadmap6`, `roadmap7`, `roadmap8`, `roadmap9`, `roadmap10`, `roadmap11`, `roadmap12`, `roadmap13`, `roadmap14`, `roadmap15`, `roadmap16`, `productRoadmap`, `productRoadmap2`, `productRoadmap3`, `productRoadmap4`, `productRoadmap5`, `productRoadmap6`.

#### Syntaxe et sous-commandes :
* `start "Label"` : Marqueur ou badge de départ de la timeline (ex: `start "START"` ou `start "Kickoff"`).
* `finish "Label"` : Marqueur de fin de la timeline (ex: `finish "RELEASE"`).
* `quarters 2019 2020 2021 2022` ou `quarters Q1:2026 Q2:2026 ...` : Définit l'axe temporel (années ou trimestres). Si omis, l'axe est déduit automatiquement des dates `date:` des jalons.
* `lanes TeamA TeamB` ou `lanes "Design":#4cbfa0 "Dev":#23255a` : Couloirs ou catégories organisationnelles avec couleurs optionnelles.
* `progress <année|index|pourcentage> [#couleur]` : Indique l'avancement / étape actuelle de la timeline (ex: `progress 2020`, `progress 2`, `progress 75% #23255a`).
* `current <année|index|titre>` : Définit l'étape actuelle (synonyme de `progress`).
* `track #couleurActive [#couleurFond]` (ou `bar #couleurActive`) : Personnalise la couleur du segment actif et du segment de fond/inactif de la timeline (ex: `track #23255a #d9dee4`).
* `milestone [Quarter:Lane] "Titre" ["Sous-titre"] [date:ANNÉE] [val:"..."] [pct:"..."] [icon:Nom] [#HEX]` : Déclare un jalon.
  * `date:2020` : Accroche le jalon au point temporel correspondant sur la timeline.
  * `#couleur` ou `color:#couleur` : Attribue une couleur spécifique au jalon (sa tige, son point et son segment de progression).
  * `current` : Marque le jalon comme étant l'étape active/en cours.

#### Exemple 1 : Timeline Alternée avec Dates & Progression (`@roadmap5`)
```
@roadmap5
  start "START"
  quarters 2019 2020 2021 2022
  progress 2020
  track #23255a #d9dee4
  milestone "Milestone 01" "MIGSO-PCUBED content and words to be added here" #4cbfa0
  milestone "Milestone 02" "MIGSO-PCUBED content and words to be added here" date:2019 #23255a
  milestone "Milestone 03" "MIGSO-PCUBED content and words to be added here" date:2020 #23255a
  milestone "Milestone 04" "MIGSO-PCUBED content and words to be added here" date:2021 #2d62ed
```

#### Exemple 2 : Cartes Positionnées sur Timeline Annuelle (`@roadmap3`)
```
@roadmap3 "Feuille de Route Stratégique"
  quarters 2019 2020 2021 2022 2023 2024 2025 2026 2027 2028
  milestone "Recherche & Cadrage" "Étude de marché et besoins" date:2021 #4a90d9
  milestone "Déploiement Global" "Mise sur le marché et adoption" date:2026 #4caf50
```

#### Exemple 3 : Product Roadmap Grille (`@productRoadmap3`)
```
@productRoadmap3 "Plan Produit Annuel"
  quarters Q1:2026 Q2:2026 Q3:2026 Q4:2026
  lanes Development Product UX QA

  milestone Q1:Development "Refonte Auth" "Support OAuth2 & SSO" icon:Lock
  milestone Q2:Product "Module Analytics" "Rapports exportables PDF" icon:BarChart
  milestone Q3:UX "Design System v2" "Composants accessibles" icon:Palette
  milestone Q4:QA "Tests d'intégration" "Automatisation E2E" icon:CheckSquare
```

#### Exemple 4 : Ruban de Chevrons Groupés (`@roadmap6`)
```
@roadmap6 "Plan de Déploiement"
  quarters 2024 2025 2026
  milestone "Setup Infra" "Configuration cloud" date:2024
  milestone "Auth Module" "SSO & Sécurité" date:2024
  milestone "Dashboard" "Interface principale" date:2025
  milestone "API v2" "Endpoints REST" date:2025
  milestone "Tests & QA" "Validation globale" date:2026
  milestone "Go Live" "Lancement officiel" date:2026
```

---

### 3.2 Business (`Business 1-11`)

**Variantes supportées** : `business`, `business2`, `business3`, `business4`, `business5`, `business6`, `business7`, `business8`, `business9`, `business10`, `business11`.

#### Syntaxe et sous-commandes :
* `center "Nom central"` : Définition du nœud central / cœur de l'écosystème.
* `nodes "A" "B" "C"` : Déclaration rapide de plusieurs nœuds.
* `node "Titre" ["Sous-titre"] [options]` : Déclaration détaillée d'un nœud business.

#### Exemple 1 : Business Hub Central (`@business3`)
```
@business3 "Écosystème Entreprise"
  center "Plateforme Core"

  node "Partenaires" "Réseau d'intégrateurs" icon:Handshake #4a90d9
  node "Clients" "Segment Enterprise" icon:Users #4caf50
  node "Fournisseurs" "Infrastructure Cloud" icon:Server #ff9800
  node "Investisseurs" "Gouvernance & Financement" icon:DollarSign #9c27b0
```

#### Exemple 2 : Business Grid (`@business7`)
```
@business7 "Piliers Stratégiques"
  node "Innovation" "R&D continue" icon:Lightbulb #2196f3
  node "Excellence" "Qualité de service" icon:Star #4caf50
  node "Agilité" "Adaptation marché" icon:Zap #ff9800
  node "Confiance" "Sécurité des données" icon:Shield #e91e63
```

---

### 3.3 Processus (`Process 1-5`)

**Variantes supportées** : `process`, `process2`, `process3` (via base `process`), `process4`, `process5`.

#### Syntaxe et sous-commandes :
* `step "Titre" ["Description"] [options]` : Étape numérotée séquentiellement.

#### Exemple 1 : Processus Linéaire (`@process2`)
```
@process2 "Workflow d'Intégration Client"
  step "Inscription" "Création du compte et validation email" icon:UserPlus #4a90d9
  step "Onboarding" "Tutoriel interactif et configuration" icon:BookOpen #7b68ee
  step "Vérification" "Validation KYC et documents" icon:FileCheck #ff9800
  step "Activation" "Accès complet aux fonctionnalités" icon:CheckCircle2 #4caf50
```

#### Exemple 2 : Processus Vertical (`@process5`)
```
@process5 "Pipeline CI/CD"
  step "Source Code" "Commit dans le repository principal" icon:GitCommit
  step "Build & Test" "Compilation et tests unitaires" icon:Cpu
  step "Security Scan" "Analyse des vulnérabilités" icon:ShieldAlert
  step "Deployment" "Déploiement sur cluster Kubernetes" icon:Server
```

---

### 3.4 Stratégie (`Strategy 1-8`)

**Variantes supportées** : `strategy`, `strategy2`, `strategy3`, `strategy4`, `strategy5`, `strategy6`, `strategy7`, `strategy8`.

#### Syntaxe et sous-commandes :
* `block "Numéro/Identifiant" "Titre" ["Sous-titre"] [options]` : Bloc de décision ou pilier stratégique.

#### Exemple 1 : Pyramide Stratégique (`@strategy2`)
```
@strategy2 "Pyramide d'Alignement"
  block "01" "Vision" "Devenir le leader européen du secteur" icon:Eye #3366cc
  block "02" "Mission" "Offrir une expérience utilisateur irréprochable" icon:Target #2196f3
  block "03" "Objectifs" "Croissance de 30% de l'ARR" icon:TrendingUp #4caf50
  block "04" "Initiatives" "Lancement de la gamme Premium" icon:Rocket #ff9800
  block "05" "Fondation" "Culture d'entreprise et valeurs" icon:Heart #e91e63
```

#### Exemple 2 : Timeline Stratégique (`@strategy5`)
```
@strategy5 "Plan de Transformation Digitale"
  block "T1" "Audit Systèmes" "Cartographie de l'existant" icon:ClipboardList
  block "T2" "Migration Cloud" "Transfert vers l'infrastructure Serverless" icon:Cloud
  block "T3" "Formation Équipes" "Montée en compétences des développeurs" icon:GraduationCap
  block "T4" "Optimisation AI" "Intégration des modèles LLM" icon:Brain
```

---

### 3.5 Puzzles (`Puzzle 1-7`)

**Variantes supportées** : `puzzle`, `puzzle2`, `puzzle3`, `puzzle4`, `puzzle5`, `puzzle6`, `puzzle7`.

#### Syntaxe et sous-commandes :
* `piece "Titre" ["Sous-titre"] [options]` : Pièce de puzzle interconnectée.

#### Exemple : Puzzle 4 Pièces (`@puzzle4`)
```
@puzzle4 "Synergie des Facteurs de Succès"
  piece "Recherche" "Compréhension fine des besoins" icon:Search #2c2b64
  piece "Design" "Prototypage rapide et intuitif" icon:PenTool #3366cc
  piece "Exécution" "Développement agile et solide" icon:Code #ff5338
  piece "Mesure" "Analyse des métriques de rétention" icon:BarChart2 #f2cb13
```

---

### 3.6 Entonnoirs / Funnels (`Funnel 1-5`)

**Variantes supportées** : `funnel`, `funnel2`, `funnel3`, `funnel4`, `funnel5`.

#### Syntaxe et sous-commandes :
* `level "Titre" [Pourcentage] ["Sous-titre"] [options]` : Niveau de l'entonnoir de conversion.

#### Exemple : Entonnoir de Vente (`@funnel`)
```
@funnel "Funnel de Conversion Sales"
  level "Impressions Web" 100 "Visiteurs uniques du site" icon:Globe #2c2b64
  level "Leads Qualifiés (MQL)" 65 "Demandes de démonstration" icon:Filter #3366cc
  level "Opportunités (SQL)" 35 "Propositions commerciales envoyées" icon:FileText #ff5338
  level "Clients Signés" 12 "Contrats validés" icon:CheckCircle #f2cb13
```

---

### 3.7 Tableaux de Bord / Dashboards (`Dashboard 1-5`)

**Variantes supportées** : `dashboard`, `dashboard2`, `dashboard3`, `dashboard4`, `dashboard5`.

#### Syntaxe et sous-commandes :
* `metric "Intitulé" "Valeur" ["Évolution/Sous-titre"] [options]` : Indicateur clé de performance (KPI).

#### Exemple : Dashboard Exécutif (`@dashboard`)
```
@dashboard "Indicateurs Clés du Mois"
  metric "Chiffre d'Affaires" "$1.28M" "+14% vs M-1" val:"$1.28M" pct:"85%" icon:DollarSign #4caf50
  metric "Nouveaux Utilisateurs" "12,450" "+8% de croissance" val:"12.4K" icon:UserCheck #2196f3
  metric "Taux de Churn" "1.4%" "-0.3% vs objectif" val:"1.4%" icon:TrendingDown #ff9800
  metric "Score CSAT" "94/100" "Satisfaisant" val:"94%" icon:Smile #9c27b0
```

---

### 3.8 Tableaux (`Table 1-6`)

**Variantes supportées** : `table`, `table2`, `table3`, `table4`, `table5`, `table6`.

#### Syntaxe et sous-commandes :
* `columns "Col 1" "Col 2" "Col 3"...` : Entêtes des colonnes du tableau.
* `row "Label Ligne" "Cellule 1" "Cellule 2"...` : Ligne de données.

#### Exemple : Matrice Comparative (`@table`)
```
@table "Matrice des Fonctionnalités"
  columns "Fonctionnalité" "Offre Starter" "Offre Pro" "Offre Enterprise"
  row "Support Utilisateur" "Email (48h)" "Prioritaire 24/7" "Dédié & Téléphone"
  row "Stockage Cloud" "10 GB" "1 TB" "Illimité"
  row "Accès API" "Restreint" "Complet" "Dédié + SLA"
  row "SLA garanti" "99.0%" "99.9%" "99.99%"
```

---

### 3.9 Agenda (`Agenda 1-4`)

**Variantes supportées** : `agenda`, `agenda2`, `agenda3`, `agenda4`.

#### Syntaxe et sous-commandes :
* `item "Horaire/Numéro" "Titre" ["Description"] [options]` : Point ou créneau d'ordre du jour.

#### Exemple : Agenda de Réunion Exécutive (`@agenda2`)
```
@agenda2 "Planning du Séminaire Annuel"
  item "09:00" "Accueil & Mot d'ouverture" "Présentation des enjeux par la Direction" icon:Coffee #4a90d9
  item "10:30" "Bilan Financier Q2" "Analyse des résultats et performances" icon:TrendingUp #2196f3
  item "12:00" "Pause Déjeuner Netwoking" "Buffet dans le hall principal" icon:Utensils #4caf50
  item "14:00" "Ateliers Stratégiques" "Brainstorming en groupes de travail" icon:Users #ff9800
```

---

### 3.10 Comparaison (`Comparison 1-7`)

**Variantes supportées** : `comparison`, `comparison2`, `comparison3`, `comparison4`, `comparison5`, `comparison6`, `comparison7`.

#### Syntaxe et sous-commandes :
* `left "Titre Colonne Gauche"` : Libellé du volet de gauche.
* `right "Titre Colonne Droite"` : Libellé du volet de droite.
* `comp "Critère" "Valeur Gauche" "Valeur Droite" [options]` : Point de comparaison.

#### Exemple : Comparatif Avant / Après (`@comparison`)
```
@comparison "Analyse d'Impact Transformation"
  left "Mode Traditionnel (Avant)"
  right "Mode Agile & Automatisé (Après)"

  comp "Déploiement" "Manuel / Mensuel" "Automatique / Quotidien" icon:Rocket #4caf50
  comp "Gestion des Erreurs" "Réactive et lente" "Proactive avec monitoring" icon:AlertTriangle #ff9800
  comp "Satisfaction Équipe" "Moyenne (stress)" "Élevée (autonomie)" icon:Smile #2196f3
```

---

### 3.11 Brainstorm / Cartes Mentales (`Brain 1-4`)

**Variantes supportées** : `brain`, `brain2`, `brain3`, `brain4`.

#### Syntaxe et sous-commandes :
* `center "Sujet Central"` : Nœud central de l'esprit / brainstorming.
* `branch "Branche" ["Sous-titre"] [options]` : Branche de réflexion connectée au centre.

#### Exemple : Brainstorm Produit (`@brain`)
```
@brain "Axes d'Innovation 2026"
  center "Intelligence Artificielle"

  branch "Copilote Code" "Assistance en temps réel" icon:Code #4a90d9
  branch "Génération d'Assets" "Création automatique d'images" icon:Image #e91e63
  branch "Analyse Prédictive" "Détection des anomalies" icon:BarChart #4caf50
  branch "Agent conversationnel" "Support client autonome" icon:MessageSquare #ff9800
```

---

### 3.12 Budget (`Budget 1-5`)

**Variantes supportées** : `budget`, `budget2`, `budget3`, `budget4`, `budget5`.

#### Syntaxe et sous-commandes :
* `total "Montant Total"` : Enveloppe budgétaire globale.
* `line "Poste de dépense" "Montant" Pourcentage ["Description"] [options]` : Ligne budgétaire.

#### Exemple : Répartition Budgétaire (`@budget`)
```
@budget "Budget Opérationnel IT"
  total "$500,000"

  line "Infrastructures Cloud" "$200,000" 40 "Hébergement & Serveurs" icon:Server #4a90d9
  line "Salaires & Prestations" "$175,000" 35 "Équipe d'ingénierie" icon:Users #2196f3
  line "Licences Logiciels" "$75,000" 15 "Outils SaaS et sécurité" icon:Key #ff9800
  line "Réserve d'Imprévus" "$50,000" 10 "Marge de sécurité" icon:Shield #4caf50
```

---

### 3.13 Arbre de Déduction / Arbre de Décision (`DecisionTree`)

**Variantes supportées** : `decision`, `decisionTree`.

#### Syntaxe et sous-commandes :
* `question "Question Principale"` : Point d'entrée de l'arbre décisionnel.
* `yes "Noeud Source" -> "Noeud Cible"` : Branche positive ou conditionnelle.
* `no "Noeud Source" -> "Noeud Cible"` : Branche négative.
* `leaf "Noeud Source" -> "Résultat / Action Final"` : Feuille / Résultat de la décision.

#### Exemple : Arbre de Qualification Bug (`@decisionTree`)
```
@decisionTree "Arbre de Diagnostic Incident"
  question "Le bug impacte-t-il la production ?"

  yes "Le bug impacte-t-il la production ?" -> "Pertes financières en cours ?"
  no "Le bug impacte-t-il la production ?" -> "Planifier dans le sprint suivant"

  yes "Pertes financières en cours ?" -> "Déclencher procédure P1 Urgent"
  no "Pertes financières en cours ?" -> "Corriger sous 24 heures"

  leaf "Déclencher procédure P1 Urgent" -> "Mobiliser la cellule de crise"
  leaf "Corriger sous 24 heures" -> "Assigner au développeur d'astreinte"
  leaf "Planifier dans me sprint suivant" -> "Créer un ticket Backlog"
```

---

### 3.14 Objectifs & KPIs (`Goals 1-5`)

**Variantes supportées** : `goals`, `goals2`, `goals3`, `goals4`, `goals5`.

#### Syntaxe et sous-commandes :
* `center "Objectif Suprême"` : Cible globale ou vision d'entreprise.
* `metric "Indicateur" "Valeur Actuelle" "Cible Attendue" [options]` : Objectif mesurable.

#### Exemple : Objectifs Annuels OKR (`@goals`)
```
@goals "Objectifs Clés Q3/Q4"
  center "Leader Qualité Client"

  metric "NPS Client" "65" "80" val:"65/80" pct:"81%" icon:Heart #e91e63
  metric "Temps de Réponse Support" "4h" "1h" val:"4h -> 1h" pct:"75%" icon:Clock #ff9800
  metric "Disponibilité Service" "99.5%" "99.99%" val:"99.5%" pct:"95%" icon:ShieldCheck #4caf50
  metric "Couverture de Test" "60%" "90%" val:"60%" pct:"66%" icon:CheckSquare #2196f3
```

---

### 3.15 Processus Industriel / Fabrication (`Manufacturing 1-8`)

**Variantes supportées** : `manufacturing`, `manufacturing2`, `manufacturing3`, `manufacturing4`, `manufacturing5`, `manufacturing6`, `manufacturing7`, `manufacturing8`.

#### Syntaxe et sous-commandes :
* `station "Nom du Poste" ["Description"] [options]` : Station de travail ou poste de chaîne.

#### Exemple : Chaîne d'Assemblage (`@manufacturing2`)
```
@manufacturing2 "Chaîne de Fabrication Électronique"
  station "Réception Composants" "Inspection des matières premières" icon:Truck #4a90d9
  station "Assemblage SMT" "Pose automatisée des puces" icon:Cpu #7b68ee
  station "Brasage à Vague" "Fixation thermique des cartes" icon:Zap #ff9800
  station "Contrôle Optique (AOI)" "Inspection haute précision" icon:Eye #e91e63
  station "Conditionnement" "Emballage et étiquetage" icon:Package #4caf50
```

---

### 3.16 Chaîne de Valeur (`ValueChain 1-2`)

**Variantes supportées** : `valueChain`, `valueChain2`.

#### Syntaxe et sous-commandes :
* `primary "Activité Principale" ["Description"] [options]` : Activité de la chaîne principale (Logistique, Opérations, Ventes).
* `support "Activité de Soutien" ["Description"] [options]` : Activité de support (Infrastructure, RH, R&D).

#### Exemple : Modèle de Porter (`@valueChain`)
```
@valueChain "Chaîne de Valeur Entreprise"
  support "Infrastructure de l'Entreprise" "Direction générale, finance, juridique" icon:Building
  support "Gestion des Ressources Humaines" "Recrutement, formation, rémunération" icon:UserCheck
  support "Développement Technologique" "R&D, composants informatiques" icon:Code
  support "Achats & Approvisionnements" "Négociation fournisseurs et contrats" icon:ShoppingBag

  primary "Logistique Interne" "Stockage et gestion des flux" icon:Inbox
  primary "Fabrication & Opérations" "Transformation des produits" icon:Settings
  primary "Logistique Externe" "Distribution et livraison" icon:Truck
  primary "Marketing & Ventes" "Promotion et conversion" icon:Megaphone
  primary "Services Après-Vente" "Support et maintenance client" icon:LifeBuoy
```

---

### 3.17 Modèle de l'Iceberg (`Iceberg 1-2`)

**Variantes supportées** : `iceberg`, `iceberg2`.

#### Syntaxe et sous-commandes :
* `above "Élément Emergé" ["Subtitle"] [options]` : Partie visible (au-dessus du niveau de la mer).
* `below "Élément Immergé" ["Subtitle"] [options]` : Partie cachée (sous le niveau de la mer).

#### Exemple : Modèle d'Analyse des Problèmes (`@iceberg`)
```
@iceberg "La Face Cachée d'un Projet Software"
  above "Interface Graphique (UI)" "Ce que voit l'utilisateur final" icon:Layout #4a90d9
  above "Fonctionnalités Clés" "Captures d'écran et démos" icon:Sparkles #2196f3

  below "Architecture Microservices" "Complexité système et scalabilité" icon:Server #ff9800
  below "Gestion de la Dette Technique" "Refactoring et tests automatisés" icon:Wrench #e91e63
  below "Sécurité & Conformité GDPR" "Chiffrement et gestion d'accès" icon:Lock #9c27b0
  below "Monitoring & Astreintes 24/7" "Résolution d'incidents sous pression" icon:Activity #4caf50
```

---

### 3.18 Diagrammes Circulaires / Segments (`Circle`)

**Variantes supportées** : `circle`.

#### Syntaxe et sous-commandes :
* `segment "Numéro" "Titre" "Description" [options]` : Segment d'un cycle circulaire répétitif.

#### Exemple : Cycle d'Amélioration Continue PDCA (`@circle`)
```
@circle "Roue de Deming (PDCA)"
  segment "01" "Plan (Planifier)" "Identifier le problème et préparer la solution" icon:Target #4a90d9
  segment "02" "Do (Déployer)" "Mettre en œuvre le plan d'action sur le terrain" icon:Play #4caf50
  segment "03" "Check (Contrôler)" "Vérifier l'efficacité et mesurer les résultats" icon:CheckCircle #ff9800
  segment "04" "Act (Agir)" "Standardiser les améliorations ou corriger" icon:RefreshCw #e91e63
```

---

### 3.20 Camemberts / Pie Charts (`Pie Charts`)

**Variantes supportées** : `pieChart`, `pieChart2`, `pieChart3`, `pieChart4`, `pieChart5`.

Composants : `PieChart1Template.tsx` à `PieChart5Template.tsx`, géométrie partagée dans
`src/templates/shared/pieGeometry.ts` (`donutSlicePath`, `donutSliceGapPath` — la technique
`asin(gap/2/r)` garantit un espace de largeur constante entre les parts des anneaux).

#### Syntaxe et sous-commandes :
* `slice "Libellé" <valeur%> ["Description"] [pct:"x%"] [icon:Nom] [#HEX]` : une part du camembert.

Champs :
| Champ | Obligatoire | Rôle |
| --- | --- | --- |
| `Libellé` | oui | Texte affiché dans la part (et la légende) |
| `<valeur%>` | non | **Pourcentage littéral** de la part (voir sémantique ci-dessous) |
| `"Description"` | non | Sous-titre de la part |
| `pct:"x%"` | non | Pourcentage affiché (libellé) |
| `icon:Nom` | non | Nom d'icône Lucide (parsé mais non rendu par PieChart1-5) |
| `#HEX` | non | Couleur de la part ; sinon palette MIGSO (`MIGSO_PALETTE`) cyclée par index |

#### Sémantique exacte de `value`
La `value` est un **pourcentage littéral** (0-100), pas un poids à normaliser : l'angle
couvert par la part vaut `value/100 × 2π` radians (fonction `sliceBounds` de
`pieGeometry.ts`). Conséquences :
* Somme de `value` = 100 → cercle complet.
* Somme < 100 → cercle incomplet (l'espace restant n'est pas attribué).
* Parts sans `value` (ou `value` ≤ 0) : elles se **partagent également le reste** jusqu'à 100 %.
* Première part démarrant à `-π/2` (haut du cercle, sens horaire).
* Le parser accepte un titre dans l'en-tête (`@pieChart5 "Titre"`) mais les composants
  PieChart1-5 ne l'affichent pas : le rendu est sans bandeau de titre.

#### Exemple : Camembert de Répartition (`@pieChart5`)
```
@pieChart5
  slice "Part 01" 15 "Segment principal" pct:"15%" #2c2b64
  slice "Part 02" 35 "Deuxième segment" pct:"35%" #3366cc
  slice "Part 03" 20 "Troisième segment" pct:"20%" #ff5338
  slice "Part 04" 30 "Quatrième segment" pct:"30%" #f2cb13
```

---

### 3.21 Templates Importés (`imported*`)

Templates générés depuis une slide PowerPoint (.pptx/.potx) via le moteur d'import
vectoriel (pptx-svg). Chaque élément de la slide devient un `item` identifié par son
`data-ooxml-id` ; le rendu vectoriel exact est conservé, seuls les textes et
couleurs sont pilotables par le DSL. Voir [IMPORT_ENGINE.md](./IMPORT_ENGINE.md)
pour le pipeline complet.

**Variantes supportées** : le parser accepte **tout type commençant par `imported`**
(ex: `importedRoadmapSlide12`, `importedPieSlide12`, `importedX`...). Le nom est attribué
à l'import via `sanitizeImportedName` (`src/templates/import/generateImportedComponent.ts`)
qui garantit un identifiant alphanumérique préfixé `imported`.

#### Syntaxe et sous-commandes :
* `item "ooxmlId" ["Titre"] ["Sous-titre"] [#HEX]` : élément importé (identifiant
  technique + textes de substitution + couleur de surcharge).

Champs :
| Champ | Obligatoire | Rôle |
| --- | --- | --- |
| `ooxmlId` | oui | Identifiant technique de l'élément (ou `shape-N` si absent du SVG) |
| `Titre` | non | Remplace le premier `<text>` de l'élément au rendu |
| `Sous-titre` | non | Remplace le deuxième `<text>` de l'élément |
| `#HEX` (ou `color:`) | non | Surcharge la couleur de remplissage (attributs `fill` non `url()`/`none`) |

Les modificateurs `val:`, `pct:`, `icon:`, `date:`, `lane:` sont tolérés par le parser
mais ignorés au rendu. La sérialisation inverse (`generateDslText`) réémet les champs
`item` en préservant titre, sous-titre et couleur (aller-retour DSL ↔ données sans perte).

#### Exemple
```
@importedRoadmapSlide12
  item "shape-1" "Vision" "Direction stratégique" #2c2b64
  item "shape-2" "Exécution"
  item "shape-3"
```
