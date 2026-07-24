import type { TemplateDefinition } from './types'
import type {
  ProductRoadmapData,
  StrategyData,
  Strategy6Data,
  ProcessData,
  TableData,
  AgendaData,
  ComparisonData,
  Comparison2Data,
  Comparison5Data,
  Comparison6Data,
  Comparison7Data,
  ManufacturingData,
  ValueChainData,
} from './types'

export const TEMPLATES: TemplateDefinition[] = [
  {
    type: 'roadmap',
    label: 'Roadmap 1',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Milestone 1', subtitle: 'Description' },
        { title: 'Milestone 2', subtitle: 'Description' },
        { title: 'Milestone 3', subtitle: 'Description' },
        { title: 'Milestone 4', subtitle: 'Description' },
      ],
      startLabel: 'START',
      finishLabel: 'FINISH',
    },
  },
  {
    type: 'roadmap2',
    label: 'Roadmap 2 (Vertical Timeline)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Initiate', subtitle: 'Project kickoff' },
        { title: 'Plan', subtitle: 'Detailed design' },
        { title: 'Develop', subtitle: 'Core features' },
        { title: 'Test', subtitle: 'QA & validation' },
        { title: 'Deliver', subtitle: 'Production release' },
      ],
      startLabel: 'START',
      finishLabel: 'FINISH',
    },
  },
  {
    type: 'roadmap3',
    label: 'Roadmap 3 (Snake Path)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Research', subtitle: 'Market analysis' },
        { title: 'Design', subtitle: 'UX/UI prototype' },
        { title: 'Develop', subtitle: 'Sprint cycles' },
        { title: 'Launch', subtitle: 'Go to market' },
      ],
      startLabel: 'START',
      finishLabel: 'FINISH',
    },
  },
  {
    type: 'roadmap4',
    label: 'Roadmap 4 (Year Timeline)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      milestones: [
        { title: 'Alpha Release', subtitle: 'Internal testing', quarter: 'Q1' },
        { title: 'Beta Launch', subtitle: 'Private preview', quarter: 'Q2' },
        { title: 'RC1', subtitle: 'Stabilization', quarter: 'Q3' },
        { title: 'GA Release', subtitle: 'General availability', quarter: 'Q4' },
      ],
      startLabel: 'START',
      finishLabel: 'FINISH',
    },
  },
  {
    type: 'roadmap5',
    label: 'Roadmap 5 (Staggered Cards)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Discovery', subtitle: 'Understanding user needs and market fit' },
        { title: 'Prototyping', subtitle: 'Building rapid prototypes for feedback' },
        { title: 'Development', subtitle: 'Engineering the core modules' },
        { title: 'Integration', subtitle: 'Connecting all components together' },
        { title: 'Release', subtitle: 'Production deployment and monitoring' },
      ],
    },
  },
  {
    type: 'roadmap6',
    label: 'Roadmap 6 (Weekly Timeline)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Setup env' },
        { title: 'Login page' },
        { title: 'Dashboard' },
        { title: 'API layer' },
        { title: 'DB schema' },
        { title: 'Tests' },
        { title: 'Deploy CI' },
        { title: 'Launch' },
      ],
    },
  },
  {
    type: 'roadmap7',
    label: 'Roadmap 7 (Curved Path)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Discovery', subtitle: 'Market research' },
        { title: 'Design', subtitle: 'UX & architecture' },
        { title: 'Prototype', subtitle: 'MVP build' },
        { title: 'Validate', subtitle: 'User testing' },
        { title: 'Launch', subtitle: 'Go to market' },
      ],
      startLabel: 'START',
      finishLabel: 'FINISH',
    },
  },
  {
    type: 'roadmap8',
    label: 'Roadmap 8 (Staggered Timeline)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Research', subtitle: 'Competitive analysis' },
        { title: 'Plan', subtitle: 'Scope definition' },
        { title: 'Execute', subtitle: 'Development sprints' },
        { title: 'Review', subtitle: 'Quality assurance' },
      ],
    },
  },
  {
    type: 'roadmap9',
    label: 'Roadmap 9 (Two-Level Timeline)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Research' },
        { title: 'Design' },
        { title: 'Development' },
        { title: 'Testing' },
        { title: 'Deploy' },
        { title: 'Iterate' },
      ],
    },
  },
  {
    type: 'roadmap10',
    label: 'Roadmap 10 (Large Numbers)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Ideation', subtitle: 'Brainstorm concepts' },
        { title: 'Validation', subtitle: 'Customer interviews' },
        { title: 'MVP Build', subtitle: 'Core features only' },
        { title: 'Launch', subtitle: 'Public release' },
      ],
    },
  },
  {
    type: 'roadmap11',
    label: 'Roadmap 11 (Vertical Percentage)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Initiate', subtitle: 'Project charter & team assembly' },
        { title: 'Plan', subtitle: 'Timeline, budget & resource allocation' },
        { title: 'Execute', subtitle: 'Development & integration phases' },
        { title: 'Monitor', subtitle: 'KPI tracking & risk management' },
        { title: 'Close', subtitle: 'Final delivery & retrospective' },
      ],
    },
  },
  {
    type: 'roadmap12',
    label: 'Roadmap 12 (Step Path)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Analyze', subtitle: 'Gather requirements' },
        { title: 'Design', subtitle: 'Create blueprint' },
        { title: 'Implement', subtitle: 'Build solution' },
        { title: 'Verify', subtitle: 'Test & validate' },
      ],
    },
  },
  {
    type: 'roadmap13',
    label: 'Roadmap 13 (Weekly Columns)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Kickoff', subtitle: 'Team alignment' },
        { title: 'Research', subtitle: 'User interviews' },
        { title: 'Wireframes', subtitle: 'Low-fidelity mockups' },
        { title: 'Prototype', subtitle: 'Interactive demo' },
        { title: 'Dev Sprint 1', subtitle: 'Core features' },
        { title: 'Dev Sprint 2', subtitle: 'Polish & QA' },
        { title: 'UAT', subtitle: 'User validation' },
        { title: 'Release', subtitle: 'Production deploy' },
      ],
    },
  },
  {
    type: 'roadmap14',
    label: 'Roadmap 14 (Year Timeline)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Foundation', subtitle: 'Core platform' },
        { title: 'Growth', subtitle: 'Feature expansion' },
        { title: 'Scale', subtitle: 'Infrastructure upgrade' },
        { title: 'Optimize', subtitle: 'Performance & UX' },
      ],
    },
  },
  {
    type: 'roadmap15',
    label: 'Roadmap 15 (Progress Blocks)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Research', subtitle: 'Market study' },
        { title: 'Prototype', subtitle: 'Proof of concept' },
        { title: 'Development', subtitle: 'Build phase' },
        { title: 'Testing', subtitle: 'QA cycle' },
        { title: 'Launch', subtitle: 'Go live' },
      ],
      startLabel: 'START',
      finishLabel: 'FINISH',
    },
  },
  {
    type: 'roadmap16',
    label: 'Roadmap 16 (Curved Path)',
    category: 'Roadmaps',
    defaultData: {
      type: 'roadmap',
      milestones: [
        { title: 'Concept', subtitle: 'Idea validation' },
        { title: 'Design', subtitle: 'UX & architecture' },
        { title: 'Develop', subtitle: 'Core modules' },
        { title: 'Test', subtitle: 'QA & UAT' },
        { title: 'Deliver', subtitle: 'Production release' },
      ],
      startLabel: 'START',
      finishLabel: 'FINISH',
    },
  },
  {
    type: 'productRoadmap',
    label: 'Product Roadmap 1',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Development' },
        { label: 'Product' },
        { label: 'UX' },
        { label: 'QA' },
      ],
      milestones: [
        { title: 'Alpha', quarter: 'Q1', lane: 'Development' },
        { title: 'Beta', quarter: 'Q2', lane: 'Product' },
        { title: 'RC1', quarter: 'Q3', lane: 'QA' },
        { title: 'Launch', quarter: 'Q4', lane: 'Development' },
      ],
    },
  },
  {
    type: 'productRoadmap2',
    label: 'Product Roadmap 2',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap2',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Development' },
        { label: 'Product' },
        { label: 'UX' },
        { label: 'QA' },
      ],
      milestones: [
        { title: 'Alpha', quarter: 'Q1', lane: 'Development' },
        { title: 'Beta', quarter: 'Q2', lane: 'Product' },
        { title: 'RC1', quarter: 'Q3', lane: 'QA' },
        { title: 'Launch', quarter: 'Q4', lane: 'Development' },
      ],
    },
  },
  {
    type: 'productRoadmap3',
    label: 'Product Roadmap 3',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap3',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Development' },
        { label: 'Product' },
        { label: 'UX' },
        { label: 'QA' },
      ],
      milestones: [
        { title: 'Alpha', subtitle: 'First working prototype', quarter: 'Q1', lane: 'Development' },
        { title: 'Beta', subtitle: 'Feature complete', quarter: 'Q2', lane: 'Product' },
        { title: 'RC1', subtitle: 'Release candidate', quarter: 'Q3', lane: 'QA' },
        { title: 'Launch', subtitle: 'Public release', quarter: 'Q4', lane: 'Development' },
      ],
    },
  },
  {
    type: 'productRoadmap4',
    label: 'Product Roadmap 4',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap4',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Development' },
        { label: 'Product' },
        { label: 'UX' },
        { label: 'QA' },
      ],
      milestones: [
        { title: 'Discovery', subtitle: 'Research & ideation', quarter: 'Q1', lane: 'Product' },
        { title: 'Prototype', subtitle: 'Build MVP', quarter: 'Q2', lane: 'Development' },
        { title: 'Testing', subtitle: 'User validation', quarter: 'Q3', lane: 'QA' },
        { title: 'Launch', subtitle: 'Go to market', quarter: 'Q4', lane: 'Development' },
      ],
    },
  },
  {
    type: 'productRoadmap5',
    label: 'Product Roadmap 5',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap5',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Development' },
        { label: 'Product' },
        { label: 'UX' },
        { label: 'QA' },
      ],
      milestones: [
        { title: 'Alpha', subtitle: 'First working prototype', quarter: 'Q1', lane: 'Development' },
        { title: 'Beta', subtitle: 'Feature complete', quarter: 'Q2', lane: 'Product' },
        { title: 'RC1', subtitle: 'Release candidate', quarter: 'Q3', lane: 'QA' },
        { title: 'Launch', subtitle: 'Public release', quarter: 'Q4', lane: 'Development' },
      ],
    },
  },
  {
    type: 'productRoadmap6',
    label: 'Product Roadmap 6',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap6',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Development' },
        { label: 'Product' },
        { label: 'UX' },
        { label: 'QA' },
      ],
      milestones: [
        { title: 'Alpha', subtitle: 'First working prototype', quarter: 'Q1', lane: 'Development' },
        { title: 'Beta', subtitle: 'Feature complete', quarter: 'Q2', lane: 'Product' },
        { title: 'RC1', subtitle: 'Release candidate', quarter: 'Q3', lane: 'QA' },
        { title: 'Launch', subtitle: 'Public release', quarter: 'Q4', lane: 'Development' },
      ],
    },
  },
  {
    type: 'strategy',
    label: 'Strategy 1',
    category: 'Strategy',
    defaultData: {
      type: 'strategy',
      blocks: [
        { number: '01', title: 'Vision', subtitle: 'Define the vision' },
        { number: '02', title: 'Goals', subtitle: 'Set clear goals' },
        { number: '03', title: 'Execution', subtitle: 'Execute the plan' },
        { number: '04', title: 'Review', subtitle: 'Measure results' },
        { number: '05', title: 'Iterate', subtitle: 'Improve continuously' },
      ],
    },
  },
  {
    type: 'strategy2',
    label: 'Strategy Pyramid',
    category: 'Strategy',
    defaultData: {
      type: 'strategy2',
      blocks: [
        { number: '01', title: 'Vision', subtitle: 'North Star direction' },
        { number: '02', title: 'Mission', subtitle: 'What we do & why' },
        { number: '03', title: 'Goals', subtitle: 'Measurable targets' },
        { number: '04', title: 'Initiatives', subtitle: 'Key programs' },
        { number: '05', title: 'Foundation', subtitle: 'Core capabilities' },
      ],
    },
  },
  {
    type: 'strategy3',
    label: 'Strategy Hub & Spoke',
    category: 'Strategy',
    defaultData: {
      type: 'strategy3',
      blocks: [
        { number: '01', title: 'Customer', subtitle: 'Client experience' },
        { number: '02', title: 'Innovation', subtitle: 'R&D and tech' },
        { number: '03', title: 'Operations', subtitle: 'Process excellence' },
        { number: '04', title: 'Finance', subtitle: 'Sustainable growth' },
        { number: '05', title: 'People', subtitle: 'Talent & culture' },
        { number: '06', title: 'Brand', subtitle: 'Market positioning' },
      ],
    },
  },
  {
    type: 'strategy4',
    label: 'Strategy 3 Columns',
    category: 'Strategy',
    defaultData: {
      type: 'strategy4',
      blocks: [
        { number: '01', title: 'Market Expansion', subtitle: 'New regions' },
        { number: '02', title: 'Product Excellence', subtitle: 'Quality first' },
        { number: '03', title: 'Customer Success', subtitle: 'Retention focus' },
        { number: '04', title: 'Talent Growth', subtitle: 'Hire & develop' },
        { number: '05', title: 'Digital Transform', subtitle: 'Tech upgrade' },
        { number: '06', title: 'Sustainability', subtitle: 'ESG goals' },
      ],
    },
  },
  {
    type: 'strategy5',
    label: 'Strategy Timeline',
    category: 'Strategy',
    defaultData: {
      type: 'strategy5',
      blocks: [
        { number: '01', title: 'Market Analysis', subtitle: 'Q1 Focus' },
        { number: '02', title: 'Product Redesign', subtitle: 'Q2 Focus' },
        { number: '03', title: 'Go-to-Market', subtitle: 'Q3 Focus' },
        { number: '04', title: 'Scale Operations', subtitle: 'Q4 Focus' },
        { number: '05', title: 'Global Expansion', subtitle: 'Next Year' },
      ],
    },
  },
  {
    type: 'process',
    label: 'Process 1',
    category: 'Process',
    defaultData: {
      type: 'process',
      steps: [
        { number: 1, title: 'Analyze', subtitle: 'Understand the problem' },
        { number: 2, title: 'Design', subtitle: 'Create solution' },
        { number: 3, title: 'Implement', subtitle: 'Build the solution' },
        { number: 4, title: 'Validate', subtitle: 'Test and verify' },
      ],
      outcome: 'Success',
    },
  },
  {
    type: 'process2',
    label: 'Process Arrow',
    category: 'Process',
    defaultData: {
      type: 'process2',
      steps: [
        { number: 1, title: 'Research', subtitle: 'Gather data' },
        { number: 2, title: 'Design', subtitle: 'Create blueprint' },
        { number: 3, title: 'Build', subtitle: 'Develop solution' },
        { number: 4, title: 'Launch', subtitle: 'Go live' },
      ],
      outcome: 'Success',
    },
  },
  {
    type: 'process4',
    label: 'Process Cards',
    category: 'Process',
    defaultData: {
      type: 'process4',
      steps: [
        { number: 1, title: 'Plan', subtitle: 'Define scope & objectives' },
        { number: 2, title: 'Execute', subtitle: 'Implement the action plan' },
        { number: 3, title: 'Monitor', subtitle: 'Track progress & KPIs' },
        { number: 4, title: 'Close', subtitle: 'Finalize & deliver' },
      ],
      outcome: 'Delivered',
    },
  },
  {
    type: 'process5',
    label: 'Process Vertical',
    category: 'Process',
    defaultData: {
      type: 'process5',
      steps: [
        { number: 1, title: 'Ideation', subtitle: 'Brainstorm concepts' },
        { number: 2, title: 'Prototyping', subtitle: 'Build MVP' },
        { number: 3, title: 'Testing', subtitle: 'Validate with users' },
        { number: 4, title: 'Iteration', subtitle: 'Refine & improve' },
        { number: 5, title: 'Release', subtitle: 'Ship to production' },
      ],
      outcome: 'Launched',
    },
  },
  {
    type: 'puzzle',
    label: 'Puzzle 1',
    category: 'Business',
    defaultData: {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Identify', subtitle: 'Find opportunities', color: '#4a90d9' },
        { number: 2, title: 'Innovation', subtitle: 'Create solutions', color: '#e91e63' },
        { number: 3, title: 'Improve', subtitle: 'Optimize process', color: '#4caf50' },
        { number: 4, title: 'Management', subtitle: 'Lead teams', color: '#ff9800' },
      ],
    },
  },
  {
    type: 'puzzle2',
    label: 'Puzzle Horizontal',
    category: 'Puzzles',
    defaultData: {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Research', subtitle: 'Gather data', color: '#4a90d9' },
        { number: 2, title: 'Strategy', subtitle: 'Define approach', color: '#e91e63' },
        { number: 3, title: 'Execute', subtitle: 'Implement plan', color: '#4caf50' },
        { number: 4, title: 'Results', subtitle: 'Measure impact', color: '#ff9800' },
      ],
    },
  },
  {
    type: 'puzzle3',
    label: 'Puzzle Vertical',
    category: 'Puzzles',
    defaultData: {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Discover', subtitle: 'Find the need', color: '#4a90d9' },
        { number: 2, title: 'Design', subtitle: 'Build solution', color: '#e91e63' },
        { number: 3, title: 'Develop', subtitle: 'Create product', color: '#4caf50' },
        { number: 4, title: 'Deliver', subtitle: 'Ship to users', color: '#ff9800' },
      ],
    },
  },
  {
    type: 'puzzle4',
    label: 'Puzzle Grid 2x3',
    category: 'Puzzles',
    defaultData: {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Vision', subtitle: 'Direction', color: '#2c2b64' },
        { number: 2, title: 'Mission', subtitle: 'Purpose', color: '#3366cc' },
        { number: 3, title: 'Strategy', subtitle: 'Approach', color: '#ff5338' },
        { number: 4, title: 'Execution', subtitle: 'Action', color: '#f2cb13' },
        { number: 5, title: 'Metrics', subtitle: 'Measure', color: '#5cc29d' },
        { number: 6, title: 'Growth', subtitle: 'Scale', color: '#f27798' },
      ],
    },
  },
  {
    type: 'puzzle5',
    label: 'Puzzle Circular',
    category: 'Puzzles',
    defaultData: {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'People', subtitle: 'Talent', color: '#4a90d9' },
        { number: 2, title: 'Process', subtitle: 'Operate', color: '#e91e63' },
        { number: 3, title: 'Tech', subtitle: 'Platform', color: '#4caf50' },
        { number: 4, title: 'Data', subtitle: 'Insights', color: '#ff9800' },
      ],
    },
  },
  {
    type: 'puzzle6',
    label: 'Puzzle Diamond',
    category: 'Puzzles',
    defaultData: {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Analyze', subtitle: 'Understand', color: '#4a90d9' },
        { number: 2, title: 'Ideate', subtitle: 'Brainstorm', color: '#e91e63' },
        { number: 3, title: 'Prototype', subtitle: 'Build MVP', color: '#4caf50' },
        { number: 4, title: 'Validate', subtitle: 'Test', color: '#ff9800' },
      ],
    },
  },
  {
    type: 'puzzle7',
    label: 'Puzzle Focus',
    category: 'Puzzles',
    defaultData: {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Core Strategy', subtitle: 'Main focus area', color: '#4a90d9' },
        { number: 2, title: 'Support', subtitle: 'Enablement', color: '#e91e63' },
        { number: 3, title: 'Growth', subtitle: 'Expansion', color: '#4caf50' },
        { number: 4, title: 'Sustain', subtitle: 'Maintain', color: '#ff9800' },
      ],
    },
  },
  {
    type: 'funnel',
    label: 'Funnel 1',
    category: 'Funnels',
    defaultData: {
      type: 'funnel',
      levels: [
        { title: 'Awareness', percentage: 100, color: '#4a90d9' },
        { title: 'Interest', percentage: 75, color: '#7b68ee' },
        { title: 'Consideration', percentage: 50, color: '#e91e63' },
        { title: 'Purchase', percentage: 25, color: '#4caf50' },
      ],
    },
  },
  {
    type: 'funnel2',
    label: 'Funnel Horizontal',
    category: 'Funnels',
    defaultData: {
      type: 'funnel',
      levels: [
        { title: 'Leads', percentage: 100, color: '#4a90d9' },
        { title: 'MQL', percentage: 70, color: '#7b68ee' },
        { title: 'SQL', percentage: 40, color: '#e91e63' },
        { title: 'Won', percentage: 20, color: '#4caf50' },
      ],
    },
  },
  {
    type: 'funnel3',
    label: 'Funnel 3D Effect',
    category: 'Funnels',
    defaultData: {
      type: 'funnel',
      levels: [
        { title: 'Visitors', percentage: 100, color: '#4a90d9' },
        { title: 'Sign-ups', percentage: 60, color: '#7b68ee' },
        { title: 'Active', percentage: 35, color: '#e91e63' },
        { title: 'Paying', percentage: 15, color: '#4caf50' },
      ],
    },
  },
  {
    type: 'funnel4',
    label: 'Funnel Split',
    category: 'Funnels',
    defaultData: {
      type: 'funnel',
      levels: [
        { title: 'Traffic', percentage: 100, color: '#4a90d9' },
        { title: 'Engaged', percentage: 55, color: '#7b68ee' },
        { title: 'Plan A', percentage: 30, color: '#e91e63' },
        { title: 'Plan B', percentage: 25, color: '#4caf50' },
      ],
    },
  },
  {
    type: 'funnel5',
    label: 'Funnel Steps',
    category: 'Funnels',
    defaultData: {
      type: 'funnel',
      levels: [
        { title: 'Awareness', percentage: 100, color: '#4a90d9' },
        { title: 'Interest', percentage: 75, color: '#7b68ee' },
        { title: 'Decision', percentage: 45, color: '#e91e63' },
        { title: 'Action', percentage: 20, color: '#4caf50' },
      ],
    },
  },
  {
    type: 'iceberg',
    label: 'Iceberg 1',
    category: 'Icebergs',
    defaultData: {
      type: 'iceberg',
      sections: [
        { title: 'Results', subtitle: 'Visible outcomes', isAbove: true },
        { title: 'Strategy', subtitle: 'Hidden planning', isAbove: false },
        { title: 'Culture', subtitle: 'Hidden values', isAbove: false },
        { title: 'Process', subtitle: 'Hidden foundation', isAbove: false },
      ],
    },
  },
  {
    type: 'iceberg2',
    label: 'Iceberg Vertical',
    category: 'Icebergs',
    defaultData: {
      type: 'iceberg',
      sections: [
        { title: 'Success', subtitle: 'Visible to all', isAbove: true },
        { title: 'Persistence', subtitle: 'Hidden effort', isAbove: false },
        { title: 'Sacrifice', subtitle: 'Hidden cost', isAbove: false },
        { title: 'Failure', subtitle: 'Hidden learning', isAbove: false },
      ],
    },
  },
  {
    type: 'dashboard',
    label: 'Dashboard 1',
    category: 'Dashboards',
    defaultData: {
      type: 'dashboard',
      metrics: [
        { label: 'Revenue', value: '$2.4M', change: '+12%', color: '#4caf50' },
        { label: 'Users', value: '48.5K', change: '+8%', color: '#2196f3' },
        { label: 'Churn', value: '2.1%', change: '-0.5%', color: '#ff9800' },
        { label: 'NPS', value: '72', change: '+5', color: '#9c27b0' },
      ],
    },
  },
  {
    type: 'dashboard2',
    label: 'Dashboard Large Metric',
    category: 'Dashboards',
    defaultData: {
      type: 'dashboard',
      metrics: [
        { label: 'MRR', value: '$842K', change: '+18%', color: '#4caf50' },
        { label: 'Trials', value: '2.4K', change: '+22%', color: '#2196f3' },
        { label: 'Churn', value: '1.8%', change: '-0.3%', color: '#ff9800' },
        { label: 'NPS', value: '81', change: '+7', color: '#9c27b0' },
      ],
    },
  },
  {
    type: 'dashboard3',
    label: 'Dashboard Bar KPIs',
    category: 'Dashboards',
    defaultData: {
      type: 'dashboard',
      metrics: [
        { label: 'Revenue', value: '$2.4M', change: '+12%', color: '#4caf50' },
        { label: 'Users', value: '48.5K', change: '+8%', color: '#2196f3' },
        { label: 'Sessions', value: '128K', change: '+15%', color: '#ff9800' },
        { label: 'Conversion', value: '3.2%', change: '-0.1%', color: '#9c27b0' },
      ],
    },
  },
  {
    type: 'dashboard4',
    label: 'Dashboard Gauges',
    category: 'Dashboards',
    defaultData: {
      type: 'dashboard',
      metrics: [
        { label: 'CPU', value: '42', change: '-5', color: '#4caf50' },
        { label: 'Memory', value: '68', change: '+3', color: '#ff9800' },
        { label: 'Disk', value: '31', change: '-2', color: '#2196f3' },
        { label: 'Network', value: '56', change: '+10', color: '#9c27b0' },
      ],
    },
  },
  {
    type: 'dashboard5',
    label: 'Dashboard Compact',
    category: 'Dashboards',
    defaultData: {
      type: 'dashboard',
      metrics: [
        { label: 'Revenue', value: '$42K', change: '+8%', color: '#4caf50' },
        { label: 'Orders', value: '847', change: '+12%', color: '#2196f3' },
        { label: 'AvgOrder', value: '$49', change: '+2%', color: '#9c27b0' },
        { label: 'Visitors', value: '12.4K', change: '-3%', color: '#ff9800' },
        { label: 'Bounce', value: '24%', change: '-5%', color: '#4caf50' },
        { label: 'Time', value: '4:32', change: '+8%', color: '#2196f3' },
      ],
    },
  },
  {
    type: 'table',
    label: 'Table 1',
    category: 'Tables',
    defaultData: {
      type: 'table',
      columns: ['Column 1', 'Column 2', 'Column 3'],
      rows: [
        { label: 'Row 1', cells: ['Data A1', 'Data B1', 'Data C1'] },
        { label: 'Row 2', cells: ['Data A2', 'Data B2', 'Data C2'] },
        { label: 'Row 3', cells: ['Data A3', 'Data B3', 'Data C3'] },
      ],
    },
  },
  {
    type: 'agenda',
    label: 'Agenda 1',
    category: 'Agendas',
    defaultData: {
      type: 'agenda',
      items: [
        { number: '01', title: 'Introduction' },
        { number: '02', title: 'Project Review' },
        { number: '03', title: 'Q&A' },
        { number: '04', title: 'Next Steps' },
      ],
    },
  },
  {
    type: 'comparison',
    label: 'Comparison 1',
    category: 'Comparisons',
    defaultData: {
      type: 'comparison',
      leftTitle: 'Option A',
      rightTitle: 'Option B',
      items: [
        { label: 'Cost', left: '$10K', right: '$15K' },
        { label: 'Time', left: '3 months', right: '6 months' },
        { label: 'Risk', left: 'Low', right: 'Medium' },
        { label: 'ROI', left: 'High', right: 'Medium' },
      ],
    },
  },
  {
    type: 'brain',
    label: 'Brain 1',
    category: 'Brains',
    defaultData: {
      type: 'brain',
      centerLabel: 'Main Idea',
      branches: [
        { title: 'Branch 1', subtitle: 'Description' },
        { title: 'Branch 2', subtitle: 'Description' },
        { title: 'Branch 3', subtitle: 'Description' },
        { title: 'Branch 4', subtitle: 'Description' },
      ],
    },
  },
  {
    type: 'brain2',
    label: 'Brain Left-Right Split',
    category: 'Brains',
    defaultData: {
      type: 'brain',
      centerLabel: 'Core Idea',
      branches: [
        { title: 'Left Branch 1', subtitle: 'Logical side' },
        { title: 'Left Branch 2', subtitle: 'Data analysis' },
        { title: 'Right Branch 1', subtitle: 'Creative side' },
        { title: 'Right Branch 2', subtitle: 'Design thinking' },
        { title: 'Right Branch 3', subtitle: 'Storytelling' },
      ],
    },
  },
  {
    type: 'brain3',
    label: 'Brain Spider Web',
    category: 'Brains',
    defaultData: {
      type: 'brain',
      centerLabel: 'Central Topic',
      branches: [
        { title: 'Research' },
        { title: 'Ideation' },
        { title: 'Prototyping' },
        { title: 'Testing' },
        { title: 'Launch' },
        { title: 'Growth' },
      ],
    },
  },
  {
    type: 'brain4',
    label: 'Brain Tree Structure',
    category: 'Brains',
    defaultData: {
      type: 'brain',
      centerLabel: 'Root Idea',
      branches: [
        { title: 'Strategy', subtitle: 'Level 1' },
        { title: 'Tactics', subtitle: 'Level 2' },
        { title: 'Operations', subtitle: 'Level 2' },
        { title: 'People', subtitle: 'Level 3' },
        { title: 'Process', subtitle: 'Level 3' },
        { title: 'Technology', subtitle: 'Level 3' },
      ],
    },
  },
  {
    type: 'budget',
    label: 'Budget 1',
    category: 'Budgets',
    defaultData: {
      type: 'budget',
      totalLabel: 'Total Budget',
      totalAmount: '$500K',
      items: [
        { label: 'Engineering', amount: '$200K', percentage: 40, color: '#4a90d9' },
        { label: 'Marketing', amount: '$150K', percentage: 30, color: '#e91e63' },
        { label: 'Operations', amount: '$100K', percentage: 20, color: '#4caf50' },
        { label: 'Admin', amount: '$50K', percentage: 10, color: '#ff9800' },
      ],
    },
  },
  {
    type: 'budget2',
    label: 'Budget Vertical Bars',
    category: 'Budgets',
    defaultData: {
      type: 'budget',
      totalLabel: 'Total',
      totalAmount: '$1.2M',
      items: [
        { label: 'Engineering', amount: '$400K', percentage: 33, color: '#4a90d9' },
        { label: 'Marketing', amount: '$300K', percentage: 25, color: '#e91e63' },
        { label: 'Operations', amount: '$250K', percentage: 21, color: '#4caf50' },
        { label: 'Sales', amount: '$150K', percentage: 12, color: '#ff9800' },
        { label: 'Admin', amount: '$100K', percentage: 8, color: '#9c27b0' },
      ],
    },
  },
  {
    type: 'budget3',
    label: 'Budget Donut',
    category: 'Budgets',
    defaultData: {
      type: 'budget',
      totalLabel: 'Total Budget',
      totalAmount: '$800K',
      items: [
        { label: 'Engineering', amount: '$300K', percentage: 38, color: '#4a90d9' },
        { label: 'Marketing', amount: '$200K', percentage: 25, color: '#e91e63' },
        { label: 'Ops', amount: '$180K', percentage: 22, color: '#4caf50' },
        { label: 'Admin', amount: '$120K', percentage: 15, color: '#ff9800' },
      ],
    },
  },
  {
    type: 'budget4',
    label: 'Budget Waterfall',
    category: 'Budgets',
    defaultData: {
      type: 'budget',
      totalLabel: 'Net',
      totalAmount: '$350K',
      items: [
        { label: 'Revenue', amount: '+$500K', percentage: 100, color: '#2ecc71' },
        { label: 'COGS', amount: '-$150K', percentage: -30, color: '#e74c3c' },
        { label: 'Marketing', amount: '-$80K', percentage: -16, color: '#e74c3c' },
        { label: 'Operations', amount: '-$60K', percentage: -12, color: '#e74c3c' },
        { label: 'R&D', amount: '+$140K', percentage: 28, color: '#2ecc71' },
      ],
    },
  },
  {
    type: 'budget5',
    label: 'Budget Pie',
    category: 'Budgets',
    defaultData: {
      type: 'budget',
      totalLabel: 'Total',
      totalAmount: '$500K',
      items: [
        { label: 'Engineering', amount: '$200K', percentage: 40, color: '#4a90d9' },
        { label: 'Marketing', amount: '$150K', percentage: 30, color: '#e91e63' },
        { label: 'Operations', amount: '$100K', percentage: 20, color: '#4caf50' },
        { label: 'Admin', amount: '$50K', percentage: 10, color: '#ff9800' },
      ],
    },
  },
  {
    type: 'business',
    label: 'Business 1',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Core',
      nodes: [
        { title: 'Strategy', subtitle: 'Long-term vision' },
        { title: 'Finance', subtitle: 'Budget & ROI' },
        { title: 'Product', subtitle: 'Development' },
        { title: 'Sales', subtitle: 'Revenue' },
        { title: 'Support', subtitle: 'Customer care' },
        { title: 'HR', subtitle: 'Talent & culture' },
      ],
    },
  },
  {
    type: 'business2',
    label: 'Business Vertical Hub',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Strategy',
      nodes: [
        { title: 'Finance', subtitle: 'Budget & ROI' },
        { title: 'Product', subtitle: 'Development' },
        { title: 'Sales', subtitle: 'Revenue' },
        { title: 'Support', subtitle: 'Customer care' },
        { title: 'HR', subtitle: 'Talent & culture' },
        { title: 'Marketing', subtitle: 'Brand growth' },
      ],
    },
  },
  {
    type: 'business3',
    label: 'Business Matrix 2x3',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Matrix',
      nodes: [
        { title: 'Strategy', subtitle: 'Vision' },
        { title: 'Finance', subtitle: 'Budget' },
        { title: 'Product', subtitle: 'Dev' },
        { title: 'Sales', subtitle: 'Revenue' },
        { title: 'Support', subtitle: 'Care' },
        { title: 'HR', subtitle: 'Talent' },
      ],
    },
  },
  {
    type: 'business4',
    label: 'Business Chevron Flow',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Flow',
      nodes: [
        { title: 'Research', subtitle: 'Discover' },
        { title: 'Design', subtitle: 'Ideate' },
        { title: 'Develop', subtitle: 'Build' },
        { title: 'Test', subtitle: 'Validate' },
        { title: 'Launch', subtitle: 'Ship' },
      ],
    },
  },
  {
    type: 'business5',
    label: 'Business Diamond',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Structure',
      nodes: [
        { title: 'CEO', subtitle: 'Leadership' },
        { title: 'Engineering', subtitle: 'Team A' },
        { title: 'Design', subtitle: 'Team B' },
        { title: 'Results', subtitle: 'Outcome' },
      ],
    },
  },
  {
    type: 'business6',
    label: 'Business Stacked Bars',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Bars',
      nodes: [
        { title: 'Inbound Logistics' },
        { title: 'Operations' },
        { title: 'Outbound Logistics' },
        { title: 'Marketing & Sales' },
        { title: 'Service' },
        { title: 'Infrastructure' },
      ],
    },
  },
  {
    type: 'business7',
    label: 'Business Circle',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Core',
      nodes: [
        { title: 'Strategy', subtitle: 'Vision' },
        { title: 'Finance', subtitle: 'Budget' },
        { title: 'Product', subtitle: 'Dev' },
        { title: 'Sales', subtitle: 'Revenue' },
        { title: 'Support', subtitle: 'Care' },
        { title: 'HR', subtitle: 'Talent' },
        { title: 'Marketing', subtitle: 'Brand' },
        { title: 'Legal', subtitle: 'Compliance' },
      ],
    },
  },
  {
    type: 'business8',
    label: 'Business Vertical List',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'List',
      nodes: [
        { title: 'Define Vision & Mission' },
        { title: 'Market Research & Analysis' },
        { title: 'Product Development' },
        { title: 'Go-to-Market Strategy' },
        { title: 'Launch & Iterate' },
        { title: 'Scale & Optimize' },
      ],
    },
  },
  {
    type: 'business9',
    label: 'Business 3x3 Grid',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Grid',
      nodes: [
        { title: 'Strategy' },
        { title: 'Finance' },
        { title: 'Product' },
        { title: 'Sales' },
        { title: 'Support' },
        { title: 'HR' },
        { title: 'Marketing' },
        { title: 'Legal' },
        { title: 'R&D' },
      ],
    },
  },
  {
    type: 'business10',
    label: 'Business Pyramid',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Pyramid',
      nodes: [
        { title: 'CEO Vision', subtitle: 'Leadership' },
        { title: 'VPs', subtitle: 'Management' },
        { title: 'Directors', subtitle: 'Management' },
        { title: 'Managers', subtitle: 'Operations' },
        { title: 'Team Leads', subtitle: 'Operations' },
        { title: 'Engineers', subtitle: 'Operations' },
        { title: 'Analysts', subtitle: 'Foundation' },
        { title: 'Interns', subtitle: 'Foundation' },
        { title: 'Ops', subtitle: 'Foundation' },
        { title: 'Support', subtitle: 'Foundation' },
      ],
    },
  },
  {
    type: 'business11',
    label: 'Business Timeline',
    category: 'Business',
    defaultData: {
      type: 'business',
      centerLabel: 'Timeline',
      nodes: [
        { title: 'Discovery', subtitle: 'Phase 1' },
        { title: 'Planning', subtitle: 'Phase 2' },
        { title: 'Development', subtitle: 'Phase 3' },
        { title: 'Testing', subtitle: 'Phase 4' },
        { title: 'Launch', subtitle: 'Phase 5' },
        { title: 'Growth', subtitle: 'Phase 6' },
      ],
    },
  },
  {
    type: 'decisionTree',
    label: 'Decision Tree 1',
    category: 'Decision trees',
    defaultData: {
      type: 'decisionTree',
      rootQuestion: 'Start project?',
      branches: [
        {
          label: 'Budget OK?',
          answer: 'yes',
          children: [
            { label: 'Resources?', answer: 'yes', outcome: 'Launch' },
            { label: 'Resources?', answer: 'no', outcome: 'Hire first' },
          ],
        },
        { label: 'Budget OK?', answer: 'no', outcome: 'Postpone' },
      ],
    },
  },
  {
    type: 'decision2',
    label: 'Decision Tree Horizontal',
    category: 'Decision trees',
    defaultData: {
      type: 'decisionTree',
      rootQuestion: 'Launch Product?',
      branches: [
        { label: 'Market ready?', answer: 'yes', children: [
          { label: 'Budget OK?', answer: 'yes', outcome: 'Launch Now' },
          { label: 'Budget OK?', answer: 'no', outcome: 'Seek Funding' },
        ]},
        { label: 'Market ready?', answer: 'no', outcome: 'Wait & Refine' },
      ],
    },
  },
  {
    type: 'goals',
    label: 'Goals 1',
    category: 'Goals',
    defaultData: {
      type: 'goals',
      centerGoal: 'Vision 2026',
      metrics: [
        { label: 'Revenue', value: '$2M', target: '$5M' },
        { label: 'Users', value: '10K', target: '50K' },
        { label: 'Markets', value: '3', target: '10' },
      ],
    },
  },
  {
    type: 'goals1',
    label: 'Goals Target',
    category: 'Goals',
    defaultData: {
      type: 'goals',
      centerGoal: 'Vision 2026',
      metrics: [
        { label: 'Revenue', value: '$2M', target: '$5M' },
        { label: 'Users', value: '10K', target: '50K' },
        { label: 'Markets', value: '3', target: '10' },
        { label: 'NPS', value: '72', target: '90' },
        { label: 'ROI', value: '18%', target: '30%' },
      ],
    },
  },
  {
    type: 'goals2',
    label: 'Goals Mountain',
    category: 'Goals',
    defaultData: {
      type: 'goals',
      centerGoal: 'Market Leader 2026',
      metrics: [
        { label: 'Awareness', value: '40%', target: '80%' },
        { label: 'Acquisition', value: '5K', target: '25K' },
        { label: 'Retention', value: '70%', target: '95%' },
        { label: 'Revenue', value: '$1M', target: '$10M' },
      ],
    },
  },
  {
    type: 'goals3',
    label: 'Goals Gauge',
    category: 'Goals',
    defaultData: {
      type: 'goals',
      centerGoal: 'KPIs 2026',
      metrics: [
        { label: 'Revenue', value: '$2.4M', target: '$3M' },
        { label: 'Users', value: '35K', target: '50K' },
        { label: 'NPS', value: '68', target: '85' },
        { label: 'Churn', value: '2.1%', target: '1%' },
      ],
    },
  },
  {
    type: 'goals4',
    label: 'Goals Progress Bars',
    category: 'Goals',
    defaultData: {
      type: 'goals',
      centerGoal: 'Progress',
      metrics: [
        { label: 'Revenue', value: '$4.2M', target: '$5M' },
        { label: 'Active Users', value: '42K', target: '50K' },
        { label: 'Countries', value: '12', target: '25' },
        { label: 'Team Size', value: '85', target: '100' },
        { label: 'NPS Score', value: '78', target: '85' },
      ],
    },
  },
  {
    type: 'goals5',
    label: 'Goals Thermometer',
    category: 'Goals',
    defaultData: {
      type: 'goals',
      centerGoal: 'Targets',
      metrics: [
        { label: 'Revenue', value: '$3.6M', target: '$4M' },
        { label: 'Users', value: '28K', target: '40K' },
        { label: 'Markets', value: '7', target: '12' },
        { label: 'Satisfaction', value: '82%', target: '95%' },
      ],
    },
  },
  {
    type: 'manufacturing',
    label: 'Manufacturing 1',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Raw Materials', subtitle: 'Input' },
        { title: 'Processing', subtitle: 'Transform' },
        { title: 'Quality Control', subtitle: 'Verify', isQuality: true },
        { title: 'Assembly', subtitle: 'Build' },
        { title: 'Shipping', subtitle: 'Output' },
      ],
    },
  },
  {
    type: 'valueChain',
    label: 'Value Chain 1',
    category: 'Value Chain',
    defaultData: {
      type: 'valueChain',
      primary: [
        { title: 'Inbound', subtitle: 'Logistics' },
        { title: 'Operations', subtitle: 'Production' },
        { title: 'Outbound', subtitle: 'Delivery' },
        { title: 'Sales', subtitle: 'Revenue' },
        { title: 'Service', subtitle: 'Support' },
      ],
      support: [
        { title: 'Infrastructure', subtitle: 'IT & Systems' },
        { title: 'HR', subtitle: 'Talent' },
        { title: 'R&D', subtitle: 'Innovation' },
        { title: 'Procurement', subtitle: 'Sourcing' },
      ],
    } as ValueChainData,
  },
  {
    type: 'productRoadmap7',
    label: 'Product Roadmap 7 (Quarters Grid)',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [],
      milestones: [
        { title: 'Alpha', subtitle: 'Internal testing', quarter: 'Q1' },
        { title: 'Beta', subtitle: 'Private preview', quarter: 'Q2' },
        { title: 'RC1', subtitle: 'Stabilization', quarter: 'Q3' },
        { title: 'GA', subtitle: 'General availability', quarter: 'Q4' },
      ],
    } as ProductRoadmapData,
  },
  {
    type: 'productRoadmap8',
    label: 'Product Roadmap 8 (Calendar Grid)',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Engineering' },
        { label: 'Design' },
        { label: 'QA' },
      ],
      milestones: [
        { title: 'Core API', quarter: 'Q1', lane: 'Engineering' },
        { title: 'Wireframes', quarter: 'Q1', lane: 'Design' },
        { title: 'Integration', quarter: 'Q2', lane: 'Engineering' },
        { title: 'Testing', quarter: 'Q3', lane: 'QA' },
        { title: 'Release', quarter: 'Q4', lane: 'Engineering' },
      ],
    } as ProductRoadmapData,
  },
  {
    type: 'productRoadmap9',
    label: 'Product Roadmap 9 (Timeline Bars)',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [],
      milestones: [
        { title: 'Discovery', subtitle: 'Research & ideation', quarter: 'Q1' },
        { title: 'MVP Build', subtitle: 'Core features', quarter: 'Q2' },
        { title: 'Testing', subtitle: 'User validation', quarter: 'Q3' },
        { title: 'Launch', subtitle: 'Go to market', quarter: 'Q4' },
      ],
    } as ProductRoadmapData,
  },
  {
    type: 'productRoadmap10',
    label: 'Product Roadmap 10 (Team Gantt)',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [
        { label: 'Frontend' },
        { label: 'Backend' },
        { label: 'DevOps' },
      ],
      milestones: [
        { title: 'Dashboard', quarter: 'Q1', lane: 'Frontend' },
        { title: 'API v1', quarter: 'Q2', lane: 'Backend' },
        { title: 'CI/CD', quarter: 'Q1', lane: 'DevOps' },
        { title: 'Auth', quarter: 'Q3', lane: 'Backend' },
        { title: 'Monitoring', quarter: 'Q4', lane: 'DevOps' },
      ],
    } as ProductRoadmapData,
  },
  {
    type: 'productRoadmap11',
    label: 'Product Roadmap 11 (Milestone Cards)',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap',
      quarters: [],
      lanes: [],
      milestones: [
        { title: 'Discovery', subtitle: 'Understanding user needs and market gaps' },
        { title: 'Prototyping', subtitle: 'Building rapid prototypes for feedback' },
        { title: 'Development', subtitle: 'Engineering the core product modules' },
        { title: 'Integration', subtitle: 'Connecting all components together' },
        { title: 'Release', subtitle: 'Production deployment and monitoring' },
      ],
    } as ProductRoadmapData,
  },
  {
    type: 'productRoadmap12',
    label: 'Product Roadmap 12 (Quarter Badges)',
    category: 'Roadmaps',
    defaultData: {
      type: 'productRoadmap',
      quarters: [
        { label: 'Q1', year: '2026' },
        { label: 'Q2', year: '2026' },
        { label: 'Q3', year: '2026' },
        { label: 'Q4', year: '2026' },
      ],
      lanes: [],
      milestones: [
        { title: 'Alpha', quarter: 'Q1' },
        { title: 'Beta', quarter: 'Q2' },
        { title: 'RC1', quarter: 'Q3' },
        { title: 'GA', quarter: 'Q4' },
      ],
    } as ProductRoadmapData,
  },
  {
    type: 'strategy6',
    label: 'Strategy 6 (Quadrant Matrix)',
    category: 'Strategy',
    defaultData: {
      type: 'strategy6',
      axisX: 'Market Growth',
      axisY: 'Competitive Position',
      quadrants: [
        { title: 'Stars', subtitle: 'High growth, strong position', color: '#e3f2fd' },
        { title: 'Question Marks', subtitle: 'High growth, weak position', color: '#fff3e0' },
        { title: 'Cash Cows', subtitle: 'Low growth, strong position', color: '#e8f5e9' },
        { title: 'Dogs', subtitle: 'Low growth, weak position', color: '#fce4ec' },
      ],
    } as Strategy6Data,
  },
  {
    type: 'strategy7',
    label: 'Strategy 7 (Nested Circles)',
    category: 'Strategy',
    defaultData: {
      type: 'strategy',
      blocks: [
        { number: '01', title: 'Long-term Vision', subtitle: '5-year horizon' },
        { number: '02', title: 'Market Leadership', subtitle: 'Global expansion' },
        { number: '03', title: 'Product Strategy', subtitle: 'Platform approach' },
        { number: '04', title: 'Go-to-Market', subtitle: 'Channel partnerships' },
        { number: '05', title: 'Sprint Planning', subtitle: '2-week cycles' },
        { number: '06', title: 'Daily Ops', subtitle: 'Standups & KPIs' },
      ],
    } as StrategyData,
  },
  {
    type: 'strategy8',
    label: 'Strategy 8 (Staircase)',
    category: 'Strategy',
    defaultData: {
      type: 'strategy',
      blocks: [
        { number: '01', title: 'Foundation', subtitle: 'Build core capabilities' },
        { number: '02', title: 'Growth', subtitle: 'Scale operations' },
        { number: '03', title: 'Optimization', subtitle: 'Efficiency & automation' },
        { number: '04', title: 'Expansion', subtitle: 'New markets & products' },
        { number: '05', title: 'Leadership', subtitle: 'Industry dominance' },
      ],
    } as StrategyData,
  },
  {
    type: 'process1',
    label: 'Process 1 (Simple Steps)',
    category: 'Process',
    defaultData: {
      type: 'process',
      title: 'Process 1',
      steps: [
        { number: 1, title: 'Analyze', subtitle: 'Understand the problem' },
        { number: 2, title: 'Design', subtitle: 'Create solution' },
        { number: 3, title: 'Implement', subtitle: 'Build the solution' },
        { number: 4, title: 'Validate', subtitle: 'Test and verify' },
        { number: 5, title: 'Deploy', subtitle: 'Go live' },
      ],
      outcome: 'Success',
    } as ProcessData,
  },
  {
    type: 'table2',
    label: 'Table 2 (Striped)',
    category: 'Tables',
    defaultData: {
      type: 'table',
      columns: ['Revenue', 'Cost', 'Profit', 'Margin'],
      rows: [
        { label: 'Product A', cells: ['$500K', '$300K', '$200K', '40%'] },
        { label: 'Product B', cells: ['$350K', '$180K', '$170K', '49%'] },
        { label: 'Product C', cells: ['$220K', '$150K', '$70K', '32%'] },
      ],
    } as TableData,
  },
  {
    type: 'table3',
    label: 'Table 3 (Card-based)',
    category: 'Tables',
    defaultData: {
      type: 'table',
      columns: ['Status', 'Owner', 'Deadline'],
      rows: [
        { label: 'Login Page', cells: ['Done', 'Alice', 'Mar 15'] },
        { label: 'Dashboard 1', cells: ['In Progress', 'Bob', 'Mar 30'] },
        { label: 'API Layer', cells: ['Pending', 'Charlie', 'Apr 10'] },
        { label: 'Database', cells: ['Done', 'Diana', 'Mar 20'] },
      ],
    } as TableData,
  },
  {
    type: 'table4',
    label: 'Table 4 (Header Emphasis)',
    category: 'Tables',
    defaultData: {
      type: 'table',
      columns: ['KPI', 'Current', 'Target', 'Status'],
      rows: [
        { label: 'Revenue', cells: ['$2.4M', '$3M', 'On Track'] },
        { label: 'Users', cells: ['48K', '60K', 'Behind'] },
        { label: 'NPS', cells: ['72', '80', 'On Track'] },
        { label: 'Churn', cells: ['2.1%', '1.5%', 'At Risk'] },
      ],
    } as TableData,
  },
  {
    type: 'table5',
    label: 'Table 5 (Minimal)',
    category: 'Tables',
    defaultData: {
      type: 'table',
      columns: ['Q1', 'Q2', 'Q3', 'Q4'],
      rows: [
        { label: 'Revenue', cells: ['$1.2M', '$1.5M', '$1.8M', '$2.1M'] },
        { label: 'Expenses', cells: ['$0.8M', '$1.0M', '$1.2M', '$1.4M'] },
        { label: 'Profit', cells: ['$0.4M', '$0.5M', '$0.6M', '$0.7M'] },
      ],
    } as TableData,
  },
  {
    type: 'table6',
    label: 'Table 6 (Blue Theme)',
    category: 'Tables',
    defaultData: {
      type: 'table',
      columns: ['Metric', 'Value', 'Change', 'Trend'],
      rows: [
        { label: 'Sessions', cells: ['245K', '+12%', 'Up'] },
        { label: 'Conversions', cells: ['8.4K', '+5%', 'Up'] },
        { label: 'Bounce', cells: ['32%', '-3%', 'Down'] },
        { label: 'Revenue', cells: ['$890K', '+18%', 'Up'] },
      ],
    } as TableData,
  },
  {
    type: 'agenda2',
    label: 'Agenda 2 (Horizontal Timeline)',
    category: 'Agendas',
    defaultData: {
      type: 'agenda',
      items: [
        { number: '01', title: 'Introduction', subtitle: '10 min' },
        { number: '02', title: 'Review', subtitle: '20 min' },
        { number: '03', title: 'Discussion', subtitle: '15 min' },
        { number: '04', title: 'Next Steps', subtitle: '10 min' },
      ],
    } as AgendaData,
  },
  {
    type: 'agenda3',
    label: 'Agenda 3 (Grid)',
    category: 'Agendas',
    defaultData: {
      type: 'agenda',
      items: [
        { number: '01', title: 'Strategy Review', subtitle: 'Q3 results & Q4 planning' },
        { number: '02', title: 'Product Demo', subtitle: 'New feature showcase' },
        { number: '03', title: 'Team Updates', subtitle: 'Department highlights' },
        { number: '04', title: 'Wrap-up', subtitle: 'Action items & deadlines' },
      ],
    } as AgendaData,
  },
  {
    type: 'agenda4',
    label: 'Agenda 4 (Card Stack)',
    category: 'Agendas',
    defaultData: {
      type: 'agenda',
      items: [
        { number: '01', title: 'Welcome & Intro', subtitle: 'Setting the stage' },
        { number: '02', title: 'Project Status', subtitle: 'Current progress review' },
        { number: '03', title: 'Open Discussion', subtitle: 'Q&A and feedback' },
        { number: '04', title: 'Closing', subtitle: 'Next steps & action items' },
      ],
    } as AgendaData,
  },
  {
    type: 'comparison2',
    label: 'Comparison 2 (Radar)',
    category: 'Comparisons',
    defaultData: {
      type: 'comparison2',
      seriesAName: 'Product A',
      seriesBName: 'Product B',
      dimensions: [
        { label: 'Price', seriesA: 80, seriesB: 60 },
        { label: 'Quality', seriesA: 70, seriesB: 85 },
        { label: 'Support', seriesA: 90, seriesB: 65 },
        { label: 'Speed', seriesA: 60, seriesB: 75 },
        { label: 'Features', seriesA: 85, seriesB: 80 },
      ],
    } as Comparison2Data,
  },
  {
    type: 'comparison3',
    label: 'Comparison 3 (Bar Chart)',
    category: 'Comparisons',
    defaultData: {
      type: 'comparison',
      leftTitle: 'Option A',
      rightTitle: 'Option B',
      items: [
        { label: 'Cost', left: '$10K', right: '$15K' },
        { label: 'Time', left: '3 months', right: '6 months' },
        { label: 'Risk', left: 'Low', right: 'Medium' },
        { label: 'ROI', left: 'High', right: 'Medium' },
      ],
    } as ComparisonData,
  },
  {
    type: 'comparison4',
    label: 'Comparison 4 (Circles)',
    category: 'Comparisons',
    defaultData: {
      type: 'comparison',
      leftTitle: 'Product A',
      rightTitle: 'Product B',
      items: [
        { label: 'Cloud-native', left: '', right: '' },
        { label: 'Auto-scaling', left: '', right: '' },
        { label: '24/7 Support', left: '', right: '' },
        { label: 'On-premise', left: '', right: '' },
        { label: 'Custom SLA', left: '', right: '' },
        { label: 'White-label', left: '', right: '' },
      ],
    } as ComparisonData,
  },
  {
    type: 'comparison5',
    label: 'Comparison 5 (Scores)',
    category: 'Comparisons',
    defaultData: {
      type: 'comparison5',
      entries: [
        { name: 'Vendor A', score: 85, color: '#2563eb' },
        { name: 'Vendor B', score: 72, color: '#dc2626' },
        { name: 'Vendor C', score: 68, color: '#e67e22' },
      ],
    } as Comparison5Data,
  },
  {
    type: 'comparison6',
    label: 'Comparison 6 (Checklist)',
    category: 'Comparisons',
    defaultData: {
      type: 'comparison6',
      leftTitle: 'Plan A',
      rightTitle: 'Plan B',
      leftItems: ['Cloud hosting', 'Auto-scaling', 'CDN included', 'SSL cert', 'Daily backups'],
      rightItems: ['On-premise', 'Manual scaling', 'No CDN', 'Own cert', 'Weekly backups'],
    } as Comparison6Data,
  },
  {
    type: 'comparison7',
    label: 'Comparison 7 (Pros/Cons)',
    category: 'Comparisons',
    defaultData: {
      type: 'comparison7',
      pros: ['Fast delivery', 'Cost effective', 'Scalable architecture', 'Modern tech stack', 'Excellent support'],
      cons: ['Limited customization', 'Vendor lock-in risk', 'Requires training', 'Higher upfront cost'],
    } as Comparison7Data,
  },
  {
    type: 'manufacturing2',
    label: 'Manufacturing 2 (Vertical Flow)',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Raw Materials', subtitle: 'Input reception & sorting' },
        { title: 'Processing', subtitle: 'Transform raw materials' },
        { title: 'Quality Control', subtitle: 'Inspection & testing', isQuality: true },
        { title: 'Assembly', subtitle: 'Build final product' },
        { title: 'Shipping', subtitle: 'Package & deliver' },
      ],
    } as ManufacturingData,
  },
  {
    type: 'manufacturing3',
    label: 'Manufacturing 3 (U-Shaped)',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Raw Materials', subtitle: 'Input reception' },
        { title: 'Cutting', subtitle: 'Precision cutting' },
        { title: 'Painting', subtitle: 'Surface treatment' },
        { title: 'Assembly', subtitle: 'Final assembly' },
        { title: 'Packaging', subtitle: 'Ready for dispatch' },
      ],
    } as ManufacturingData,
  },
  {
    type: 'manufacturing4',
    label: 'Manufacturing 4 (Parallel Lines)',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Production A', subtitle: 'Main line' },
        { title: 'Production B', subtitle: 'Main line' },
        { title: 'Production C', subtitle: 'Main line' },
        { title: 'Inspection A', subtitle: 'Quality check', isQuality: true },
        { title: 'Inspection B', subtitle: 'Quality check', isQuality: true },
        { title: 'Inspection C', subtitle: 'Quality check', isQuality: true },
      ],
    } as ManufacturingData,
  },
  {
    type: 'manufacturing5',
    label: 'Manufacturing 5 (Diamond)',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Planning', subtitle: 'Production plan' },
        { title: 'Execution', subtitle: 'Build process' },
        { title: 'Delivery', subtitle: 'Ship to client' },
        { title: 'Feedback', subtitle: 'Client review' },
      ],
    } as ManufacturingData,
  },
  {
    type: 'manufacturing6',
    label: 'Manufacturing 6 (Hub & Spoke)',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Supplier A', subtitle: 'Raw materials' },
        { title: 'Supplier B', subtitle: 'Components' },
        { title: 'Supplier C', subtitle: 'Packaging' },
        { title: 'Distributor X', subtitle: 'Region East' },
        { title: 'Distributor Y', subtitle: 'Region West' },
        { title: 'Distributor Z', subtitle: 'Region South' },
      ],
    } as ManufacturingData,
  },
  {
    type: 'manufacturing7',
    label: 'Manufacturing 7 (Timeline)',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Design', subtitle: 'Blueprint phase' },
        { title: 'Prototype', subtitle: 'Build sample' },
        { title: 'Test', subtitle: 'Validate sample' },
        { title: 'Produce', subtitle: 'Mass production' },
        { title: 'Ship', subtitle: 'Distribute' },
      ],
    } as ManufacturingData,
  },
  {
    type: 'manufacturing8',
    label: 'Manufacturing 8 (Circular Flow)',
    category: 'Manufacturing',
    defaultData: {
      type: 'manufacturing',
      stations: [
        { title: 'Input', subtitle: 'Receive' },
        { title: 'Process', subtitle: 'Transform' },
        { title: 'Inspect', subtitle: 'Verify' },
        { title: 'Package', subtitle: 'Prepare' },
        { title: 'Store', subtitle: 'Warehouse' },
        { title: 'Deliver', subtitle: 'Ship' },
      ],
    } as ManufacturingData,
  },
  {
    type: 'valueChain2',
    label: 'Value Chain 2 (Vertical)',
    category: 'Value Chain',
    defaultData: {
      type: 'valueChain',
      primary: [
        { title: 'Inbound', subtitle: 'Logistics' },
        { title: 'Operations', subtitle: 'Production' },
        { title: 'Outbound', subtitle: 'Delivery' },
        { title: 'Sales', subtitle: 'Revenue' },
        { title: 'Service', subtitle: 'Support' },
      ],
      support: [
        { title: 'Infrastructure', subtitle: 'IT & Systems' },
        { title: 'HR', subtitle: 'Talent' },
        { title: 'R&D', subtitle: 'Innovation' },
        { title: 'Procurement', subtitle: 'Sourcing' },
      ],
    } as ValueChainData,
  },
]

export function getTemplateByType(type: string): TemplateDefinition | undefined {
  return TEMPLATES.find(t => t.type === type)
}

export function getTemplatesByCategory(): Map<string, TemplateDefinition[]> {
  const map = new Map<string, TemplateDefinition[]>()
  for (const t of TEMPLATES) {
    const list = map.get(t.category) ?? []
    list.push(t)
    map.set(t.category, list)
  }
  return map
}
