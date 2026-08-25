import fs from 'fs'
import path from 'path'
import { TEMPLATES } from '../src/templates/registry'
import { parseTemplateDsl } from '../src/templates/dsl/parseTemplate'
import { TEMPLATE_ICONS } from '../src/templates/shared/icons'

interface DatasetEntry {
  messages: Array<{
    role: 'system' | 'user' | 'assistant'
    content: string
  }>
}

const SYSTEM_PROMPTS = [
  `You are autoDesign AI, an expert at converting natural language descriptions, tables, briefs, and notes into valid autoDesign DSL code.
Always output the DSL code enclosed in a \`\`\`dsl code block. Every autoDesign DSL script begins with @<type>[variant]. Process all items provided in the prompt.`,
  `You are autoDesign AI. Generate valid autoDesign DSL code starting with @ for the user's diagram request. Enclose the DSL in a \`\`\`dsl code block and include every single item requested.`,
  `autoDesign DSL Generator. Output the complete DSL script inside a \`\`\`dsl code block.`
]

// -------------------------------------------------------------
// DICTIONNAIRE SÉMANTIQUE BILINGUE AVEC ICÔNES STRICTEMENT EN MINUSCULE (camelCase)
// -------------------------------------------------------------

const SEMANTIC_ICON_MAP: Record<string, string[]> = {
  // Finance, Budget, Achats & Coûts
  creditCard: ['carte bancaire', 'carte', 'paiement', 'checkout', 'visa', 'mastercard', 'stripe', 'abonnements', 'facturation', 'credit card', 'creditcard', 'billing', 'subscription', 'invoice'],
  dollar: ['dollar', 'usd', 'arr', 'revenus', 'budget', 'financement', 'prix', 'coût', 'marge', 'revenue', 'cost', 'pricing', 'funding', 'sales', 'profit', 'chiffre d\'affaires', 'rentabilité', 'trésorerie', 'capex', 'opex'],
  euro: ['euro', 'euros', 'eur', 'fonds', 'investisseurs', 'capital', 'subvention', 'investors', 'treasury'],
  wallet: ['portefeuille', 'dépenses', 'achats', 'porte-monnaie', 'remboursement', 'épargne', 'wallet', 'expenses', 'spending', 'savings'],
  
  // Tech, Dev, Cloud, Infra & Données
  code: ['code', 'api', 'sdk', 'développement', 'dev', 'frontend', 'backend', 'programmation', 'scripts', 'endpoints', 'graphql', 'engineering', 'programming', 'software', 'repository', 'ui', 'interface', 'sprint', 'user story', 'pr'],
  database: ['database', 'bdd', 'données', 'data', 'sql', 'postgresql', 'redis', 'elasticsearch', 'stockage', 'lakehouse', 'table', 'storage', 'dataset', 'warehouse', 'migration data'],
  server: ['serveur', 'serveurs', 'infrastructure', 'infra', 'datacenter', 'host', 'cluster', 'quota', 'gpu', 'h100', 'nodes', 'proxy', 'computing', 'hosting', 'architecture', 'environnement', 'dev/staging'],
  cloud: ['cloud', 'aws', 'gcp', 'azure', 'saas', 'hébergement', 'cloud computing', 'multi-cloud', 'kubernetes', 'docker'],
  cpu: ['cpu', 'processeur', 'calcul', 'ia', 'intelligence artificielle', 'machine learning', 'algorithme', 'rpa', 'automatisation', 'ai', 'processor', 'automation', 'batch', 'traitement'],
  terminal: ['terminal', 'console', 'commandes', 'cli', 'bash', 'ssh', 'scripting', 'shell', 'command line'],
  gear: ['paramètres', 'outillage', 'configuration', 'setup', 'socle', 'maintenance', 'optimisation', 'réglages', 'settings', 'config', 'tooling', 'cadrage technique'],
  
  // Sécurité, Risques, Audit & Conformité
  shield: ['sécurité', 'protection', 'pare-feu', 'waf', 'rgpd', 'conformité', 'confiance', 'audit sécurité', 'chiffrement', 'security', 'compliance', 'firewall', 'gdpr', 'encryption', 'secops', 'cybersécurité', 'gestion des risques', 'vulnérabilités'],
  key: ['clé', 'auth', 'authentification', 'token', 'jwt', 'oauth', 'mots de passe', 'droits', 'permissions', 'sso', 'key', 'authentication', 'access', 'password', 'login'],
  
  // KPIs, Pilotage PMO, Analytique & Reporting
  barChart: ['barchart', 'statistiques', 'kpi', 'métriques', 'analytics', 'reporting', 'tableau de bord', 'indicateurs', 'bi', 'metrics', 'stats', 'dashboard', 'avancement', 'suivi', 'vélocité'],
  pieChart: ['piechart', 'répartition', 'parts de marché', 'segments', 'distribution', 'taux', 'pourcentage', 'market share', 'breakdown', 'percentage', 'ventilation'],
  lineChart: ['linechart', 'tendance', 'évolution', 'croissance', 'progression temporelle', 'forecast', 'trend', 'growth', 'timeline', 'courbe'],
  target: ['cible', 'objectif', 'kpi cible', 'milestone', 'focus', 'alignement', 'jalon cible', 'ambition', 'target', 'goal', 'aim', 'vision', 'jalon clé', 'livrable critique', 'go/no-go'],
  
  // Équipes, RH, Parties Prenantes & PMO
  user: ['utilisateur', 'compte', 'profil', 'candidat', 'client', 'salarié', 'personne', 'user', 'profile', 'account', 'candidate', 'employee', 'sponsor', 'lead'],
  people: ['utilisateurs', 'clients', 'rh', 'collaborateurs', 'communauté', 'équipe', 'staff', 'recrutement', 'sourcing', 'team', 'hiring', 'recruitment', 'members', 'onboarding', 'parties prenantes', 'stakeholders', 'copil', 'codir', 'comité'],
  handshake: ['partenaire', 'partenariat', 'accord', 'deal', 'alliance', 'intégrateur', 'esn', 'négociation', 'contrat', 'partner', 'partnership', 'agreement', 'contract', 'prestation', 'fournisseur'],
  
  // Succès, Jalons, Validation & Déploiement
  rocket: ['lancement', 'déploiement', 'prod', 'mise en production', 'go live', 'go-live', 'mep', 'release', 'kickoff', 'démarrage', 'launch', 'deploy', 'production', 'bascule'],
  trophy: ['victoire', 'succès', 'trophée', 'premier', 'leader', 'excellence', 'award', 'victory', 'winner', 'trophy', 'succès projet'],
  star: ['qualité', 'étoile', 'satisfaction', 'nps', 'csat', 'avis', 'favori', 'priorité', 'valeur', 'star', 'rating', 'feedback', 'haute valeur'],
  award: ['certification', 'validation', 'homologation', 'diplôme', 'pv signé', 'certified', 'approved', 'recette validée', 'pv de recette', 'sign-off'],
  check: ['validé', 'conforme', 'terminé', 'résolu', 'accepté', 'done', 'completed', 'verified', 'passed', 'fermeture', 'clôture', 'clôturé', 'achevé'],
  
  // Documents, Spécifications, Planning & Gouvernance
  file: ['fichier', 'spécifications', 'cahier des charges', 'document', 'note', 'spéc', 'rapport', 'file', 'specs', 'documentation', 'report', 'cadrage', 'compte-rendu', 'cr', 'minutes', 'charte projet'],
  folder: ['dossier', 'répertoire', 'archives', 'projets', 'catalogue', 'folder', 'directory', 'projects', 'portefeuille'],
  clipboard: ['recette', 'uat', 'tests', 'inventaire', 'tâches', 'checklist', 'audit', 'clipboard', 'tasks', 'testing', 'qa', 'recette utilisateur', 'cahier de recette'],
  calendar: ['planning', 'calendrier', 'semaines', 'trimestres', 'échéance', 'sprint', 'horizon', 'calendar', 'schedule', 'quarter', 'week', 'roadmap', 'chronogramme', 'jalons'],
  clock: ['temps', 'délai', 'durée', 'horaires', 'heures', 'retard', 'chronomètre', 'time', 'hours', 'delay', 'duration', 'respect des délais'],
  
  // Livrables, Modules & Logistique
  package: ['colis', 'livrable', 'livrables', 'paquet', 'module', 'brique', 'composant', 'produit', 'package', 'deliverable', 'deliverables', 'feature', 'alpha', 'beta', 'mvp', 'lot 1', 'lot 2', 'lot 3'],
  truck: ['livraison', 'transport', 'expédition', 'camion', 'logistique', 'fret', 'distribution', 'truck', 'shipping', 'delivery', 'logistics', 'déploiement sur site'],
  plane: ['international', 'export', 'monde', 'global', 'avion', 'expansion', 'plane', 'flight', 'worldwide', 'déploiement mondial'],
  ship: ['maritime', 'import', 'fret lourd', 'cargo', 'navire', 'ship', 'sea freight', 'vessel'],
  
  // Communication & Digital
  globe: ['web', 'site internet', 'organique', 'seo', 'visiteurs', 'globe', 'global', 'website', 'traffic', 'visitors', 'portail web'],
  mail: ['email', 'contact', 'newsletter', 'leads', 'mql', 'courrier', 'messagerie', 'mail', 'inbox', 'messages', 'communication interne'],
  chat: ['chat', 'support', 'faq', 'commentaires', 'conversations', 'échanges', 'messaging', 'helpdesk', 'support utilisateurs'],
  phone: ['téléphone', 'appels', 'call', 'prospection', 'service client', 'phone', 'calls', 'hotline'],
  mobile: ['mobile', 'smartphone', 'application mobile', 'ios', 'android', 'app', 'mobile app'],
  laptop: ['ordinateur', 'pc', 'poste de travail', 'desktop', 'matériel', 'laptop', 'workstation', 'hardware', 'équipement'],
  wifi: ['wifi', 'connexion', 'réseau', 'internet', 'sans fil', 'iot', 'network', 'wireless'],
  
  // RSE & Développement Durable
  leaf: ['rse', 'écologie', 'durable', 'vert', 'carbone', 'environnement', 'nature', 'éthique', 'sustainability', 'green', 'carbon', 'eco', 'esg', 'bilan carbone'],
  recycle: ['recyclage', 'économie circulaire', 'tri', 'réutilisation', 'zéro déchet', 'recycle', 'circular economy'],
  tree: ['arbre', 'structure', 'forêt', 'croissance verte', 'biodiversité', 'tree', 'forest', 'ecosystem']
}

export function detectBestIcon(text: string): string {
  const lower = text.toLowerCase()
  for (const [iconName, keywords] of Object.entries(SEMANTIC_ICON_MAP)) {
    for (const kw of keywords) {
      const regex = new RegExp(`(^|[^a-z0-9à-ÿ])${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9à-ÿ]|$)`, 'i')
      if (regex.test(lower)) {
        return iconName // strictement en minuscule (camelCase)
      }
    }
  }
  return 'star'
}

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4',
  '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16', '#64748b',
  '#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2'
]

function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// -------------------------------------------------------------
// BANQUE DE DONNEES METIER REALISTES PMO, COPIL, TRANSFO DIGITALE
// -------------------------------------------------------------

interface RealisticItem {
  id?: string
  title: string
  deliverable: string
  owner?: string
  startDate?: string
  targetDate?: string
  dependency?: string
  status?: string
}

interface RealisticScenario {
  topic: string
  category: 'Roadmaps' | 'Process' | 'Business' | 'Strategy' | 'Puzzle' | 'Funnel' | 'Dashboard' | 'Brain' | 'ValueChain' | 'Iceberg' | 'Comparison' | 'Manufacturing'
  center?: string
  meetingContext?: string
  items: RealisticItem[]
}

const SCENARIOS: RealisticScenario[] = [
  {
    topic: 'Programme de Transformation Digitale & ERP (SAP S/4HANA)',
    category: 'Roadmaps',
    meetingContext: 'Compte-rendu du Comité de Pilotage Stratégique (COPIL) du 12 Mars',
    items: [
      { id: 'M1', title: 'Cadrage & Alignement Stratégique', deliverable: 'Charte projet signée, budget alloué et gouvernance validée', owner: 'Direction Projet', startDate: '01/09/2026', targetDate: '15/09/2026', dependency: 'Aucune', status: 'Terminé' },
      { id: 'M2', title: 'Étude d\'Impact & Process Métiers', deliverable: 'Cartographie des processus cibles et expression de besoins', owner: 'Consultants Métiers', startDate: '16/09/2026', targetDate: '15/10/2026', dependency: 'M1', status: 'Terminé' },
      { id: 'M3', title: 'Choix de l\'Intégrateur & Contractualisation', deliverable: 'Appel d\'offres finalisé et contrat ESN validé', owner: 'Achats & PMO', startDate: '16/10/2026', targetDate: '30/11/2026', dependency: 'M2', status: 'En cours' },
      { id: 'M4', title: 'Conception Générale & Architecture', deliverable: 'Dossier d\'architecture technique et modèle de données', owner: 'Architecte SI', startDate: '01/12/2026', targetDate: '15/01/2027', dependency: 'M3', status: 'À venir' },
      { id: 'M5', title: 'Paramétrage & Développements Core', deliverable: 'Modules Finance, Supply Chain et Ventes configurés', owner: 'Équipe Intégration', startDate: '16/01/2027', targetDate: '30/04/2027', dependency: 'M4', status: 'À venir' },
      { id: 'M6', title: 'Reprise des Données & Interfaces', deliverable: 'Scripts d\'ETL validés et connecteurs applicatifs testés', owner: 'Data Team', startDate: '01/05/2027', targetDate: '15/06/2027', dependency: 'M5', status: 'À venir' },
      { id: 'M7', title: 'Recette Utilisateur (UAT) & PV Signé', deliverable: 'Campagne de tests fonctionnels et procès-verbal signé', owner: 'Métiers & QA', startDate: '16/06/2027', targetDate: '31/08/2027', dependency: 'M6', status: 'À venir' },
      { id: 'M8', title: 'Formation & Conduite du Changement', deliverable: 'Guide utilisateurs et 400 collaborateurs formés', owner: 'Change Lead', startDate: '01/09/2027', targetDate: '30/09/2027', dependency: 'M7', status: 'À venir' },
      { id: 'M9', title: 'Bascule en Production (Go-Live)', deliverable: 'Basculement technique et ouverture du service aux équipes', owner: 'Direction SI', startDate: '01/10/2027', targetDate: '05/10/2027', dependency: 'M8', status: 'À venir' },
      { id: 'M10', title: 'Hypercare & Passage en MCO', deliverable: 'Support renforcé clôturé et transfert officiel aux équipes de Run', owner: 'Responsable MCO', startDate: '06/10/2027', targetDate: '31/12/2027', dependency: 'M9', status: 'À venir' }
    ]
  },
  {
    topic: 'Roadmap Refonte Plateforme E-Commerce B2B',
    category: 'Roadmaps',
    meetingContext: 'Point d\'avancement hebdomadaire Équipe Produit & Tech (Sprint Review)',
    items: [
      { id: 'J1', title: 'Audit UX & Benchmark Concurrentiel', deliverable: 'Rapport d\'ergonomie et tests utilisateurs initiaux', owner: 'Lead UX', targetDate: 'M1 (S04)', status: 'Terminé' },
      { id: 'J2', title: 'Design System & Maquettes Figma', deliverable: 'Bibliothèque de composants UI et parcours d\'achat validés', owner: 'Product Designer', targetDate: 'M2 (S08)', status: 'Terminé' },
      { id: 'J3', title: 'Socle API & Microservices Headless', deliverable: 'Moteur de recherche Elasticsearch et catalogue produit API', owner: 'Tech Lead', targetDate: 'M3 (S12)', status: 'En cours' },
      { id: 'J4', title: 'Module Tunnel d\'Achat & Paiement', deliverable: 'Intégration Stripe, mandats SEPA et facturation différée', owner: 'Dev Senior', targetDate: 'M4 (S16)', status: 'À venir' },
      { id: 'J5', title: 'Espace Client & Gestion des Devis', deliverable: 'Génération de devis PDF et gestion des droits multi-utilisateurs', owner: 'Dev Fullstack', targetDate: 'M5 (S20)', status: 'À venir' },
      { id: 'J6', title: 'Audit Cybersécurité & Pentest', deliverable: 'Test d\'intrusion validé et mise en conformité RGPD', owner: 'SecOps', targetDate: 'M6 (S24)', status: 'À venir' },
      { id: 'J7', title: 'Lancement Beta Privée & Pilote', deliverable: 'Accès restreint pour 20 clients partenaires et recueil des retours', owner: 'Product Manager', targetDate: 'M7 (S28)', status: 'À venir' },
      { id: 'J8', title: 'Mise en Production Générale (GA)', deliverable: 'Déploiement production et campagne marketing de lancement', owner: 'Head of Digital', targetDate: 'M8 (S32)', status: 'À venir' }
    ]
  },
  {
    topic: 'Piliers Stratégiques de la Direction des Systèmes d\'Information',
    category: 'Strategy',
    meetingContext: 'Séminaire Annuel DSI & Présentation Feuille de Route Direction Générale',
    items: [
      { title: 'Excellence Opérationnelle & Résilience', deliverable: 'Garantir une disponibilité des plateformes à 99.99% et réduire les incidents critiques', targetDate: 'Axe 1' },
      { title: 'Transformation Cloud & DevOps', deliverable: 'Moderniser les infrastructures, automatiser les déploiements et optimiser le FinOps', targetDate: 'Axe 2' },
      { title: 'Accélération par la Donnée & l\'IA', deliverable: 'Déployer des modèles d\'IA générative et valoriser le patrimoine de données métiers', targetDate: 'Axe 3' },
      { title: 'Cybersécurité & Confiance Numérique', deliverable: 'Renforcer la posture Zero-Trust, sécuriser la chaîne logicielle et former 100% des collaborateurs', targetDate: 'Axe 4' },
      { title: 'Expérience Collaborateur & Talents Tech', deliverable: 'Attirer les meilleurs profils, développer les compétences et promouvoir l\'agilité à l\'échelle', targetDate: 'Axe 5' }
    ]
  },
  {
    topic: 'Workflow de Validation des Changements en Production (CAB)',
    category: 'Process',
    meetingContext: 'Procédure ITIL & Comité de Gestion des Changements (Change Advisory Board)',
    items: [
      { id: 'P1', title: 'Soumission de la RFC (Demande de Changement)', deliverable: 'Dépôt de la fiche descriptive avec plan de rollback et analyse d\'impacts', targetDate: 'J-5' },
      { id: 'P2', title: 'Revue Technique & Qualification Risques', deliverable: 'Contrôle des prérequis techniques, tests en pré-prod et matrice de risques', targetDate: 'J-3' },
      { id: 'P3', title: 'Arbitrage en Séance CAB', deliverable: 'Validation collégiale ou demande de compléments par les experts', targetDate: 'J-2' },
      { id: 'P4', title: 'Planification & Communication Utilisateurs', deliverable: 'Envoi des alertes de maintenance et réservation de la fenêtre d\'intervention', targetDate: 'J-1' },
      { id: 'P5', title: 'Exécution du Déploiement', deliverable: 'Application du script de mise à jour sous supervision de l\'astreinte', targetDate: 'Jour J' },
      { id: 'P6', title: 'Tests Post-Déploiement (Sanity Checks)', deliverable: 'Vérification des flux nominaux et validation du bon fonctionnement', targetDate: 'J+1h' },
      { id: 'P7', title: 'Clôture & Bilan PIR (Post Implementation)', deliverable: 'Rapport d\'exécution transmis et mise à jour de la documentation CMDB', targetDate: 'J+2' }
    ]
  },
  {
    topic: 'Gouvernance & Parties Prenantes du Programme',
    category: 'Business',
    center: 'Comité de Direction du Programme (PMO Core)',
    meetingContext: 'Note d\'Organisation & Cartographie des Instances de Pilotage',
    items: [
      { title: 'Comité de Pilotage Stratégique (COPIL)', deliverable: 'Sponsors exécutifs, arbitrage budgétaire et validation des grands jalons', targetDate: 'Instance 1' },
      { title: 'Comité de Projet Opérationnel (COPROJ)', deliverable: 'Chefs de projets métiers et techniques, suivi hebdomadaire des livrables', targetDate: 'Instance 2' },
      { title: 'Cellule d\'Architecture & Urbanisme', deliverable: 'Architectes d\'entreprise, respect des normes techniques et interopérabilité', targetDate: 'Instance 3' },
      { title: 'Comité Sécurité & Conformité (SecOps/DPO)', deliverable: 'Contrôle de la sécurité des accès et conformité réglementaire RGPD', targetDate: 'Instance 4' },
      { title: 'Réseau des Ambassadeurs & Change Leads', deliverable: 'Relais métiers sur le terrain, remontée des besoins et formation des équipes', targetDate: 'Instance 5' }
    ]
  },
  {
    topic: 'Entonnoir de Conversion des Leads Grands Comptes',
    category: 'Funnel',
    meetingContext: 'Revue Trimestrielle Pipeline Commercial & Ventes B2B',
    items: [
      { title: 'Comptes Cibles Identifiés', deliverable: 'Base de prospection qualifiée sur le secteur bancaire et retail', targetDate: '5,000 (100%)' },
      { title: 'Prises de Contact Efficaces (Outreach)', deliverable: 'Échanges téléphoniques et emails personnalisés aux décideurs DSI', targetDate: '1,200 (24%)' },
      { title: 'Réunions de Cadrage & Démos', deliverable: 'Ateliers de démonstration avec les équipes métiers et techniques', targetDate: '380 (7.6%)' },
      { title: 'Preuves de Concept Réalisées (POC)', deliverable: 'Expérimentations concluantes sur périmètre restreint', targetDate: '120 (2.4%)' },
      { title: 'Négociations Contractuelles & Achats', deliverable: 'Validation juridique des clauses et accord tarifaire final', targetDate: '45 (0.9%)' },
      { title: 'Contrats Signés & Déploiement', deliverable: 'Clients actifs sous contrat cadre pluriannuel', targetDate: '32 (0.64%)' }
    ]
  },
  {
    topic: 'Synergie des Compétences de l\'Équipe Projet',
    category: 'Puzzle',
    meetingContext: 'Charte d\'Équipe & Organisation Agile des Squads',
    items: [
      { title: 'Product Ownership & Valeur Métier', deliverable: 'Priorisation du backlog, vision utilisateur et maximisation du ROI' },
      { title: 'Design & Ergonomie (UX/UI)', deliverable: 'Fluidité des parcours, maquettes interactives et accessibilité' },
      { title: 'Ingénierie & Développement', deliverable: 'Architecture logicielle robuste, code propre et APIs sécurisées' },
      { title: 'Assurance Qualité & Automatisation QA', deliverable: 'Tests end-to-end continus et garantie de non-régression' },
      { title: 'DevOps & Exploitation Cloud', deliverable: 'Pipelines CI/CD, résilience des serveurs et monitoring 24/7' },
      { title: 'PMO & Pilotage de Programme', deliverable: 'Respect des délais, maîtrise des coûts et coordination globale' }
    ]
  },
  {
    topic: 'La Réalité d\'un Projet Informatique (Surface vs Coulisses)',
    category: 'Iceberg',
    meetingContext: 'Restitution d\'Audit DSI & Sensibilisation des Directions Métiers',
    items: [
      { title: 'Interface & Boutons Visibles', deliverable: 'Ce que les utilisateurs finaux manipulent au quotidien' },
      { title: 'Fonctionnalités & Écrans Métiers', deliverable: 'Les formulaires, exports Excel et graphiques interactifs' },
      { title: 'Architecture Technique & Microservices', deliverable: 'Réseaux de conteneurs, files de messages et routage des requêtes' },
      { title: 'Sécurité, Chiffrement & Pare-feu', deliverable: 'Protection des identités, certificats SSL et isolation réseau' },
      { title: 'Gestion de la Dette Technique', deliverable: 'Mise à niveau des dépendances, refactoring et maintenance préventive' },
      { title: 'Gouvernance, Reporting & Astreintes PMO', deliverable: 'Coordination continue des équipes, gestion des risques et réunions COPIL' }
    ]
  },
  {
    topic: 'Tableau de Bord Exécutif de Pilotage du Portefeuille Projets',
    category: 'Dashboard',
    meetingContext: 'Flash Report Mensuel présenté au Comité de Direction Générale (CODIR)',
    items: [
      { title: 'Budget Consommé vs Alloué', deliverable: 'Consommation conforme aux prévisions annuelles', targetDate: '8.4M€ / 10M€ (-16%)' },
      { title: 'Taux de Respect des Jalons Clés', deliverable: '92% des jalons franchis dans les délais impartis', targetDate: '92% (+4%)' },
      { title: 'Vélocité Moyenne des Équipes', deliverable: 'Nombre moyen de story points livrés par sprint de 2 semaines', targetDate: '48 pts (+8%)' },
      { title: 'Indice de Risque Global du Programme', deliverable: 'Risques critiques maîtrisés et plans de remédiation actifs', targetDate: 'Faible (-15%)' }
    ]
  },
  {
    topic: 'Pôles d\'Expertise du Centre d\'Excellence Agile & PMO',
    category: 'Brain',
    center: 'Centre d\'Excellence PMO',
    meetingContext: 'Organisation des Compétences & Pôles de Référence',
    items: [
      { title: 'Méthodologies & Cadrage Projet', deliverable: 'Standards de gestion de projet (Scrum, Kanban, Prince2) et modèles documentaires' },
      { title: 'Pilotage Financier & Budgétaire', deliverable: 'Suivi des budgets, rentabilité des investissements et arbitrage des ressources' },
      { title: 'Gestion des Risques & Conformité', deliverable: 'Matrices de criticité, plans de secours et conformité aux audits internes' },
      { title: 'Conduite du Changement & Formation', deliverable: 'Plans de communication, ateliers de montée en compétences et accompagnement terrain' }
    ]
  }
]

// -------------------------------------------------------------
// FORMATEURS DE PROMPTS REALISTES PMO
// -------------------------------------------------------------

function formatAsMeetingNotes(sc: RealisticScenario, items: RealisticItem[]): string {
  let text = `COMPTE-RENDU DE RÉUNION — ${sc.meetingContext || 'Comité de Pilotage'}\n`
  text += `Sujet : ${sc.topic}\n\n`
  text += `Voici les points d'étape et décisions validées en séance :\n`
  items.forEach((it, idx) => {
    const ownerStr = it.owner ? ` [Resp: ${it.owner}]` : ''
    const dateStr = it.targetDate || it.startDate ? ` (Échéance: ${it.targetDate || it.startDate})` : ''
    text += `${idx + 1}. ${it.title}${ownerStr}${dateStr} : ${it.deliverable}\n`
  })
  return text.trim()
}

function formatAsJiraTable(items: RealisticItem[]): string {
  let table = `Clé\tTitre du Jalon / Ticket\tDate Début\tDate Cible\tLivrable & Description\tResponsable\tStatut\n`
  items.forEach((it, idx) => {
    const id = it.id || `PRJ-${idx + 101}`
    const start = it.startDate || `01/0${idx + 1}/2026`
    const target = it.targetDate || `15/0${idx + 1}/2026`
    const owner = it.owner || 'Chef de Projet'
    const status = it.status || (idx === 0 ? 'Terminé' : (idx === 1 ? 'En cours' : 'À venir'))
    table += `${id}\t${it.title}\t${start}\t${target}\t${it.deliverable}\t${owner}\t${status}\n`
  })
  return table.trim()
}

function formatAsMarkdownTable(items: RealisticItem[]): string {
  let table = `| Réf | Étape / Composant | Échéance | Description & Livrables | Statut |\n`
  table += `|---|---|---|---|---|\n`
  items.forEach((it, idx) => {
    const id = it.id || `M${idx + 1}`
    const date = it.targetDate || it.startDate || '2026'
    const status = it.status || 'Actif'
    table += `| ${id} | ${it.title} | ${date} | ${it.deliverable} | ${status} |\n`
  })
  return table.trim()
}

// -------------------------------------------------------------
// GENERATEUR DE SAMPLES STRICTEMENT CONFORMES AU PARSER OFFICIEL
// -------------------------------------------------------------

function generateSample(): { prompt: string; dsl: string } {
  const sc = sample(SCENARIOS)
  const count = randInt(2, sc.items.length)
  const items = sc.items.slice(0, count)

  const mode = Math.random()
  const isEn = Math.random() < 0.20

  let prompt = ''
  let dsl = ''

  // CAS 1 (45%) : COMPTE-RENDU DE REUNION OU TABLEAU BRUT PMO (Zero-shot intent)
  if (mode < 0.45) {
    const promptStyle = Math.random()
    if (promptStyle < 0.35) {
      // Compte-rendu de réunion COPIL / CODIR
      prompt = isEn
        ? `Please generate the appropriate diagram from these meeting minutes:\n${formatAsMeetingNotes(sc, items)}`
        : `Génère le diagramme adapté à partir de ce compte-rendu de réunion :\n${formatAsMeetingNotes(sc, items)}`
    } else if (promptStyle < 0.70) {
      // Tableau Jira / Excel copié-collé
      prompt = isEn
        ? `Here is our project management tracking table (${count} items), create the visualization:\n${formatAsJiraTable(items)}`
        : `Voici notre tableau de suivi de projet (${count} éléments), crée la visualisation correspondante :\n${formatAsJiraTable(items)}`
    } else {
      // Tableau Markdown
      prompt = isEn
        ? `Here are the project milestones, please generate the matching visualization:\n${formatAsMarkdownTable(items)}`
        : `Voici les données de notre planning projet, génère le diagramme :\n${formatAsMarkdownTable(items)}`
    }

    // Déduction automatique du type idéal
    if (sc.category === 'Roadmaps') {
      dsl = `@roadmap2 "${sc.topic}"\n`
      items.forEach((it, idx) => {
        const dt = it.targetDate || it.startDate || `202${4 + idx}`
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  milestone "${it.title}" "${it.deliverable}" date:"${dt}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (sc.category === 'Process') {
      dsl = `@process2 "${sc.topic}"\n`
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  step "${it.title}" "${it.deliverable}" val:"0${idx + 1}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (sc.category === 'Strategy') {
      dsl = `@strategy "${sc.topic}"\n`
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  block "0${idx + 1}" "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (sc.category === 'Funnel') {
      dsl = `@funnel "${sc.topic}"\n`
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  level "${it.title}" val:"${100 - idx * 15}k" pct:"${Math.max(5, 100 - idx * 20)}%" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (sc.category === 'Puzzle') {
      dsl = `@puzzle "${sc.topic}"\n`
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  piece "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (sc.category === 'Iceberg') {
      dsl = `@iceberg "${sc.topic}"\n`
      const half = Math.max(1, Math.floor(items.length / 2))
      items.slice(0, half).forEach(it => {
        dsl += `  above "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #38bdf8\n`
      })
      items.slice(half).forEach(it => {
        dsl += `  below "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #075985\n`
      })
    } else if (sc.category === 'Dashboard') {
      dsl = `@dashboard "${sc.topic}"\n`
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  metric "${it.title}" "100%" "+10%" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (sc.category === 'Brain') {
      dsl = `@brain "${sc.topic}"\n`
      if (sc.center) dsl += `  center "${sc.center}"\n`
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  branch "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else {
      dsl = `@business3 "${sc.topic}"\n`
      dsl += `  center "${sc.center || 'Hub Central'}"\n`
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  node "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    }
  }

  // CAS 2 (30%) : DEMANDE EXPLICITE DE TYPE / VARIANTE
  else if (mode < 0.75) {
    const tpl = sample(TEMPLATES)
    const baseType = tpl.type.replace(/\d+$/, '')
    const variantNum = tpl.type.replace(/^[a-zA-Z]+/, '')
    const contentStr = Math.random() > 0.5 ? formatAsJiraTable(items) : formatAsMeetingNotes(sc, items)

    prompt = isEn
      ? `Generate @${tpl.type} diagram with these ${count} project items:\n${contentStr}`
      : `j'ai besoin que tu me génère une ${baseType}${variantNum ? `, type ${variantNum}` : ''}, avec ces ${count} données :\n${contentStr}`

    dsl = `@${tpl.type} "${sc.topic}"\n`
    if (baseType === 'roadmap' || baseType === 'productRoadmap') {
      items.forEach((it, idx) => {
        const dt = it.targetDate || it.startDate || `202${4 + idx}`
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  milestone "${it.title}" "${it.deliverable}" date:"${dt}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'process') {
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  step "${it.title}" "${it.deliverable}" val:"0${idx + 1}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'strategy') {
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  block "0${idx + 1}" "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'puzzle') {
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  piece "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'funnel') {
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  level "${it.title}" val:"${100 - idx * 10}k" pct:"${Math.max(5, 100 - idx * 15)}%" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'business') {
      if (variantNum === '3' || variantNum === '4' || variantNum === '8') {
        dsl += `  center "${sc.center || 'Plateforme Core'}"\n`
      }
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  node "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'brain') {
      if (sc.center) dsl += `  center "${sc.center}"\n`
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  branch "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'iceberg') {
      const half = Math.max(1, Math.floor(items.length / 2))
      items.slice(0, half).forEach(it => {
        dsl += `  above "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #38bdf8\n`
      })
      items.slice(half).forEach(it => {
        dsl += `  below "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #075985\n`
      })
    } else if (baseType === 'manufacturing') {
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  station "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'valueChain') {
      const half = Math.max(1, Math.floor(items.length / 2))
      items.slice(0, half).forEach(it => {
        dsl += `  primary "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #3b82f6\n`
      })
      items.slice(half).forEach(it => {
        dsl += `  support "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #8b5cf6\n`
      })
    } else if (baseType === 'agenda') {
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  item "0${9 + idx}:00" "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else if (baseType === 'circle') {
      if (sc.center) dsl += `  center "${sc.center}"\n`
      items.forEach((it, idx) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  segment "0${idx + 1}" "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      })
    } else {
      items.forEach((it) => {
        const ic = detectBestIcon(it.title + ' ' + it.deliverable)
        dsl += `  metric "${it.title}" "100%" "+10%" icon:${ic} ${sample(COLORS)}\n`
      })
    }
  }

  // CAS 3 (25%) : DEMANDE AVEC NOM OFFICIEL DU TEMPLATE
  else {
    const tpl = sample(TEMPLATES)
    const tableStr = formatAsMarkdownTable(items)
    prompt = `Génère le template "${tpl.label}" pour le projet "${sc.topic}" avec les ${count} données suivantes :\n${tableStr}`

    dsl = `@${tpl.type} "${sc.topic}"\n`
    const baseType = tpl.type.replace(/\d+$/, '')
    items.forEach((it, idx) => {
      const dt = it.targetDate || it.startDate || `202${4 + idx}`
      const ic = detectBestIcon(it.title + ' ' + it.deliverable)
      if (baseType === 'process') {
        dsl += `  step "${it.title}" "${it.deliverable}" val:"0${idx + 1}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'strategy') {
        dsl += `  block "0${idx + 1}" "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'puzzle') {
        dsl += `  piece "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'funnel') {
        dsl += `  level "${it.title}" val:"${100 - idx * 10}k" pct:"${Math.max(5, 100 - idx * 15)}%" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'business') {
        if (tpl.type === 'business3' || tpl.type === 'business4' || tpl.type === 'business8') {
          dsl += `  center "${sc.center || 'Noyau Central'}"\n`
        }
        dsl += `  node "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'dashboard' || baseType === 'goals') {
        dsl += `  metric "${it.title}" "100%" "+10%" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'brain') {
        if (sc.center) dsl += `  center "${sc.center}"\n`
        dsl += `  branch "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'manufacturing') {
        dsl += `  station "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'valueChain') {
        if (idx < Math.floor(items.length / 2)) {
          dsl += `  primary "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
        } else {
          dsl += `  support "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
        }
      } else if (baseType === 'agenda') {
        dsl += `  item "0${9 + idx}:00" "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'circle') {
        if (sc.center) dsl += `  center "${sc.center}"\n`
        dsl += `  segment "0${idx + 1}" "${it.title}" "${it.deliverable}" icon:${ic} ${sample(COLORS)}\n`
      } else if (baseType === 'iceberg') {
        const half = Math.max(1, Math.floor(items.length / 2))
        items.slice(0, half).forEach(it => {
          dsl += `  above "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #38bdf8\n`
        })
        items.slice(half).forEach(it => {
          dsl += `  below "${it.title}" "${it.deliverable}" icon:${detectBestIcon(it.title + ' ' + it.deliverable)} #075985\n`
        })
      } else {
        dsl += `  milestone "${it.title}" "${it.deliverable}" date:"${dt}" icon:${ic} ${sample(COLORS)}\n`
      }
    })
  }

  return { prompt: prompt.trim(), dsl: dsl.trim() }
}

// -------------------------------------------------------------
// ORCHESTRATEUR PRINCIPAL (50 000 EXEMPLES)
// -------------------------------------------------------------

export function generate50kDataset(targetCount: number = 50000): DatasetEntry[] {
  console.log(`🚀 Génération de ${targetCount} exemples PMO ultra-réalistes et validés...`)
  const dataset: DatasetEntry[] = []
  let validCount = 0
  let rejectedCount = 0

  while (validCount < targetCount) {
    const { prompt, dsl } = generateSample()

    // Validation stricte par le parser AST officiel
    const parsed = parseTemplateDsl(dsl)
    if (!parsed) {
      rejectedCount++
      continue
    }

    const systemPrompt = sample(SYSTEM_PROMPTS)
    const formattedDsl = `\`\`\`dsl\n${dsl}\n\`\`\``

    dataset.push({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
        { role: 'assistant', content: formattedDsl }
      ]
    })
    validCount++

    if (validCount % 10000 === 0) {
      console.log(`  ✓ ${validCount} / ${targetCount} exemples validés (Rejets: ${rejectedCount})`)
    }
  }

  console.log(`✨ Terminé ! ${validCount} exemples générés avec 100% de validation syntaxique.`)
  return dataset
}

// Execution directe
if (process.argv[1]?.endsWith('generate_dataset.ts')) {
  const countArg = parseInt(process.argv[2] || '50000', 10)
  const dataset = generate50kDataset(countArg)

  const scriptDir = path.dirname(new URL(import.meta.url).pathname)
  const outputDir = path.resolve(scriptDir, 'data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const outputPath = path.join(outputDir, 'autodesign_train_dataset.jsonl')
  const stream = fs.createWriteStream(outputPath, { flags: 'w' })

  for (const entry of dataset) {
    stream.write(JSON.stringify(entry) + '\n')
  }
  stream.end()

  console.log(`📁 Fichier JSONL enregistré : ${outputPath}`)
}
