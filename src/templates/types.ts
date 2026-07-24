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

export type ProductRoadmap7Data = ProductRoadmapData
export type ProductRoadmap8Data = ProductRoadmapData
export type ProductRoadmap9Data = ProductRoadmapData
export type ProductRoadmap10Data = ProductRoadmapData
export type ProductRoadmap11Data = ProductRoadmapData
export type ProductRoadmap12Data = ProductRoadmapData

export interface RoadmapPhase {
  label: string
  color?: string
  milestones: TemplateMilestone[]
}

export interface Roadmap15Data {
  type: 'roadmap15'
  title?: string
  phases: RoadmapPhase[]
}

export interface Strategy6Data {
  type: 'strategy6'
  title?: string
  axisX: string
  axisY: string
  quadrants: { title: string; subtitle?: string; color?: string }[]
}

export type Strategy7Data = StrategyData
export type Strategy8Data = StrategyData

export type Process1Data = ProcessData

export type Table2Data = TableData
export type Table3Data = TableData
export type Table4Data = TableData
export type Table5Data = TableData
export type Table6Data = TableData

export type Agenda2Data = AgendaData
export type Agenda3Data = AgendaData
export type Agenda4Data = AgendaData

export interface Comparison2Data {
  type: 'comparison2'
  title?: string
  seriesAName: string
  seriesBName: string
  dimensions: { label: string; seriesA: number; seriesB: number }[]
}

export type Comparison3Data = ComparisonData
export type Comparison4Data = ComparisonData

export interface Comparison5Data {
  type: 'comparison5'
  title?: string
  entries: { name: string; score: number; color?: string }[]
}

export interface Comparison6Data {
  type: 'comparison6'
  title?: string
  leftTitle: string
  rightTitle: string
  leftItems: string[]
  rightItems: string[]
}

export interface Comparison7Data {
  type: 'comparison7'
  title?: string
  pros: string[]
  cons: string[]
}

export type Manufacturing2Data = ManufacturingData
export type Manufacturing3Data = ManufacturingData
export type Manufacturing4Data = ManufacturingData
export type Manufacturing5Data = ManufacturingData
export type Manufacturing6Data = ManufacturingData
export type Manufacturing7Data = ManufacturingData
export type Manufacturing8Data = ManufacturingData

export type ValueChain2Data = ValueChainData

export type Business2Data = BusinessData
export type Business3Data = BusinessData
export type Business4Data = BusinessData
export type Business5Data = BusinessData
export type Business6Data = BusinessData
export type Business7Data = BusinessData
export type Business8Data = BusinessData
export type Business9Data = BusinessData
export type Business10Data = BusinessData
export type Business11Data = BusinessData

export type Brain2Data = BrainData
export type Brain3Data = BrainData
export type Brain4Data = BrainData

export type Budget2Data = BudgetData
export type Budget3Data = BudgetData
export type Budget4Data = BudgetData
export type Budget5Data = BudgetData

export type Decision2Data = DecisionTreeData

export type Goals1Data = GoalsData
export type Goals2Data = GoalsData
export type Goals3Data = GoalsData
export type Goals4Data = GoalsData
export type Goals5Data = GoalsData

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
  | Roadmap15Data
  | ProductRoadmapData
  | ProductRoadmap2Data
  | ProductRoadmap3Data
  | ProductRoadmap4Data
  | ProductRoadmap5Data
  | ProductRoadmap6Data
  | ProductRoadmap7Data
  | ProductRoadmap8Data
  | ProductRoadmap9Data
  | ProductRoadmap10Data
  | ProductRoadmap11Data
  | ProductRoadmap12Data
  | StrategyData
  | Strategy2Data
  | Strategy3Data
  | Strategy4Data
  | Strategy5Data
  | Strategy6Data
  | Strategy7Data
  | Strategy8Data
  | ProcessData
  | Process1Data
  | Process2Data
  | Process4Data
  | Process5Data
  | PuzzleData
  | FunnelData
  | IcebergData
  | DashboardData
  | TableData
  | Table2Data
  | Table3Data
  | Table4Data
  | Table5Data
  | Table6Data
  | AgendaData
  | Agenda2Data
  | Agenda3Data
  | Agenda4Data
  | ComparisonData
  | Comparison2Data
  | Comparison3Data
  | Comparison4Data
  | Comparison5Data
  | Comparison6Data
  | Comparison7Data
  | BrainData
  | Brain2Data
  | Brain3Data
  | Brain4Data
  | BudgetData
  | Budget2Data
  | Budget3Data
  | Budget4Data
  | Budget5Data
  | BusinessData
  | Business2Data
  | Business3Data
  | Business4Data
  | Business5Data
  | Business6Data
  | Business7Data
  | Business8Data
  | Business9Data
  | Business10Data
  | Business11Data
  | DecisionTreeData
  | Decision2Data
  | GoalsData
  | Goals1Data
  | Goals2Data
  | Goals3Data
  | Goals4Data
  | Goals5Data
  | ManufacturingData
  | Manufacturing2Data
  | Manufacturing3Data
  | Manufacturing4Data
  | Manufacturing5Data
  | Manufacturing6Data
  | Manufacturing7Data
  | Manufacturing8Data
  | ValueChainData
  | ValueChain2Data

export type TemplateType = TemplateData['type'] | 'roadmap2' | 'roadmap3' | 'roadmap4' | 'roadmap5' | 'roadmap6' | 'roadmap7' | 'roadmap8' | 'roadmap9' | 'roadmap10' | 'roadmap11' | 'roadmap12' | 'roadmap13' | 'roadmap14' | 'roadmap15' | 'roadmap16' | 'process1' | 'process2' | 'process4' | 'process5' | 'strategy2' | 'strategy3' | 'strategy4' | 'strategy5' | 'strategy6' | 'strategy7' | 'strategy8' | 'puzzle2' | 'puzzle3' | 'puzzle4' | 'puzzle5' | 'puzzle6' | 'puzzle7' | 'funnel2' | 'funnel3' | 'funnel4' | 'funnel5' | 'dashboard2' | 'dashboard3' | 'dashboard4' | 'dashboard5' | 'iceberg2' | 'business2' | 'business3' | 'business4' | 'business5' | 'business6' | 'business7' | 'business8' | 'business9' | 'business10' | 'business11' | 'brain2' | 'brain3' | 'brain4' | 'budget2' | 'budget3' | 'budget4' | 'budget5' | 'decision2' | 'goals1' | 'goals2' | 'goals3' | 'goals4' | 'goals5' | 'manufacturing2' | 'manufacturing3' | 'manufacturing4' | 'manufacturing5' | 'manufacturing6' | 'manufacturing7' | 'manufacturing8' | 'valueChain2' | 'table2' | 'table3' | 'table4' | 'table5' | 'table6' | 'agenda2' | 'agenda3' | 'agenda4' | 'comparison2' | 'comparison3' | 'comparison4' | 'comparison5' | 'comparison6' | 'comparison7' | 'productRoadmap7' | 'productRoadmap8' | 'productRoadmap9' | 'productRoadmap10' | 'productRoadmap11' | 'productRoadmap12'

export interface TemplateDefinition {
  type: TemplateType
  label: string
  category: string
  defaultData: TemplateData
}
