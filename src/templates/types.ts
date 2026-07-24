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

export interface ProductRoadmap2Data {
  type: 'productRoadmap2'
  title?: string
  quarters: TemplateQuarter[]
  lanes: TemplateLane[]
  milestones: TemplateMilestone[]
}

export interface ProductRoadmap3Data {
  type: 'productRoadmap3'
  title?: string
  quarters: TemplateQuarter[]
  lanes: TemplateLane[]
  milestones: TemplateMilestone[]
}

export interface ProductRoadmap4Data {
  type: 'productRoadmap4'
  title?: string
  quarters: TemplateQuarter[]
  lanes: TemplateLane[]
  milestones: TemplateMilestone[]
}

export interface ProductRoadmap5Data {
  type: 'productRoadmap5'
  title?: string
  quarters: TemplateQuarter[]
  lanes: TemplateLane[]
  milestones: TemplateMilestone[]
}

export interface ProductRoadmap6Data {
  type: 'productRoadmap6'
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

export interface Strategy2Data {
  type: 'strategy2'
  title?: string
  blocks: StrategyBlock[]
}

export interface Strategy3Data {
  type: 'strategy3'
  title?: string
  blocks: StrategyBlock[]
}

export interface Strategy4Data {
  type: 'strategy4'
  title?: string
  blocks: StrategyBlock[]
}

export interface Strategy5Data {
  type: 'strategy5'
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

export interface Process2Data {
  type: 'process2'
  title?: string
  steps: ProcessStep[]
  outcome?: string
}

export interface Process4Data {
  type: 'process4'
  title?: string
  steps: ProcessStep[]
  outcome?: string
}

export interface Process5Data {
  type: 'process5'
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
  | ProductRoadmap2Data
  | ProductRoadmap3Data
  | ProductRoadmap4Data
  | ProductRoadmap5Data
  | ProductRoadmap6Data
  | StrategyData
  | ProcessData
  | Process2Data
  | Process4Data
  | Process5Data
  | Strategy2Data
  | Strategy3Data
  | Strategy4Data
  | Strategy5Data
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

export type TemplateType = TemplateData['type'] | 'roadmap2' | 'roadmap3' | 'roadmap4' | 'roadmap5' | 'roadmap6' | 'process2' | 'process4' | 'process5' | 'strategy2' | 'strategy3' | 'strategy4' | 'strategy5'

export interface TemplateDefinition {
  type: TemplateType
  label: string
  category: string
  defaultData: TemplateData
}
