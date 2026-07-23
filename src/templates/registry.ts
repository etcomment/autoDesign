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
