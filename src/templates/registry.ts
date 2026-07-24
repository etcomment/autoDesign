import type { TemplateDefinition } from './types'

export const TEMPLATES: TemplateDefinition[] = [
  {
    type: 'roadmap',
    label: 'Roadmap',
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
    type: 'productRoadmap',
    label: 'Product Roadmap',
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
    label: 'Strategy',
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
    label: 'Process',
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
    label: 'Puzzle',
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
    type: 'funnel',
    label: 'Funnel',
    category: 'Business',
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
    type: 'iceberg',
    label: 'Iceberg',
    category: 'Business',
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
    type: 'dashboard',
    label: 'Dashboard',
    category: 'Dashboard',
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
    type: 'table',
    label: 'Table',
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
    label: 'Agenda',
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
    label: 'Comparison',
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
    label: 'Brain',
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
    type: 'budget',
    label: 'Budget',
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
    type: 'business',
    label: 'Business',
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
    type: 'decisionTree',
    label: 'Decision Tree',
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
    type: 'goals',
    label: 'Goals',
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
    type: 'manufacturing',
    label: 'Manufacturing',
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
    label: 'Value Chain',
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
    },
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
