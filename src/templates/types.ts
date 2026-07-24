export interface TemplateText {
  content: string
  fontSize?: number
  fontWeight?: number
  color?: string
}

export interface TemplateMilestone {
  title: string
  subtitle?: string
  quarter?: string
  lane?: string
  style?: TemplateElementStyle
}

export interface TemplateElementStyle {
  boxWidth?: number
  boxHeight?: number
  fontSize?: number
  fontWeight?: number
  fontColor?: string
  fill?: string
  stroke?: string
}

export interface TemplateQuarter {
  label: string
  year?: string
}

export interface TemplateLane {
  label: string
}

export interface RoadmapData {
  type: 'roadmap'
  title?: string
  milestones: TemplateMilestone[]
  quarters?: TemplateQuarter[]
  lanes?: TemplateLane[]
  startLabel?: string
  finishLabel?: string
  defaultStyle?: TemplateElementStyle
}

export interface ProductRoadmapData {
  type: 'productRoadmap'
  title?: string
  quarters: TemplateQuarter[]
  lanes: TemplateLane[]
  milestones: TemplateMilestone[]
}

export interface StrategyBlock {
  number: string
  title: string
  subtitle?: string
}

export interface StrategyData {
  type: 'strategy'
  title?: string
  blocks: StrategyBlock[]
}

export interface ProcessStep {
  number: number
  title: string
  subtitle?: string
}

export interface ProcessData {
  type: 'process'
  title?: string
  steps: ProcessStep[]
  outcome?: string
}

export interface PuzzlePiece {
  number: number
  title: string
  subtitle?: string
  color: string
}

export interface PuzzleData {
  type: 'puzzle'
  title?: string
  pieces: PuzzlePiece[]
}

export interface FunnelLevel {
  title: string
  subtitle?: string
  percentage?: number
  color?: string
}

export interface FunnelData {
  type: 'funnel'
  title?: string
  levels: FunnelLevel[]
}

export interface IcebergSection {
  title: string
  subtitle?: string
  isAbove: boolean
}

export interface IcebergData {
  type: 'iceberg'
  title?: string
  sections: IcebergSection[]
}

export interface DashboardMetric {
  label: string
  value: string
  change?: string
  color?: string
}

export interface DashboardData {
  type: 'dashboard'
  title?: string
  metrics: DashboardMetric[]
}

export interface TableRow {
  label: string
  cells: string[]
}

export interface TableData {
  type: 'table'
  title?: string
  columns: string[]
  rows: TableRow[]
}

export interface AgendaItem {
  number: string
  title: string
  subtitle?: string
}

export interface AgendaData {
  type: 'agenda'
  title?: string
  items: AgendaItem[]
}

export interface ComparisonItem {
  label: string
  left: string
  right: string
}

export interface ComparisonData {
  type: 'comparison'
  title?: string
  leftTitle: string
  rightTitle: string
  items: ComparisonItem[]
}

export interface BrainData {
  type: 'brain'
  title?: string
  centerLabel: string
  branches: { title: string; subtitle?: string; color?: string }[]
}

export interface BudgetItem {
  label: string
  amount: string
  percentage: number
  color?: string
}

export interface BudgetData {
  type: 'budget'
  title?: string
  totalLabel: string
  totalAmount: string
  items: BudgetItem[]
}

export interface BusinessData {
  type: 'business'
  title?: string
  centerLabel: string
  nodes: { title: string; subtitle?: string }[]
}

export interface DecisionTreeNode {
  label: string
  answer: 'yes' | 'no'
  outcome?: string
  children?: DecisionTreeNode[]
}

export interface DecisionTreeData {
  type: 'decisionTree'
  title?: string
  rootQuestion: string
  branches: DecisionTreeNode[]
}

export interface GoalsMetric {
  label: string
  value: string
  target: string
}

export interface GoalsData {
  type: 'goals'
  title?: string
  centerGoal: string
  metrics: GoalsMetric[]
}

export interface ManufacturingStation {
  title: string
  subtitle?: string
  isQuality?: boolean
}

export interface ManufacturingData {
  type: 'manufacturing'
  title?: string
  stations: ManufacturingStation[]
}

export interface ValueChainActivity {
  title: string
  subtitle?: string
}

export interface ValueChainData {
  type: 'valueChain'
  title?: string
  primary: ValueChainActivity[]
  support: ValueChainActivity[]
}

export type TemplateData =
  | RoadmapData
  | ProductRoadmapData
  | StrategyData
  | ProcessData
  | PuzzleData
  | FunnelData
  | IcebergData
  | DashboardData
  | TableData
  | AgendaData
  | ComparisonData
  | BrainData
  | BudgetData
  | BusinessData
  | DecisionTreeData
  | GoalsData
  | ManufacturingData
  | ValueChainData

export type TemplateType = TemplateData['type']

export interface TemplateDefinition {
  type: TemplateType
  label: string
  category: string
  defaultData: TemplateData
}
