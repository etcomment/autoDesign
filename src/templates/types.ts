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
  date?: string
  style?: TemplateElementStyle
  color?: string
  icon?: string
  value?: string
  percent?: string
  current?: boolean
  status?: 'done' | 'current' | 'future'
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
  color?: string
}

export interface RoadmapData {
  type: 'roadmap'
  title?: string
  milestones: TemplateMilestone[]
  steps?: ProcessStep[]
  quarters?: TemplateQuarter[]
  lanes?: TemplateLane[]
  startLabel?: string
  finishLabel?: string
  current?: string
  progress?: string
  progressColor?: string
  trackColor?: string
  trackBgColor?: string
  color?: string
  defaultStyle?: TemplateElementStyle
}

export interface ProductRoadmapData {
  type: 'productRoadmap'
  title?: string
  steps?: ProcessStep[]
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
  blocks?: ComparisonBlock[]
  leftTitle?: string
  rightTitle?: string
  items?: ComparisonItem[]
  seriesAName?: string
  seriesBName?: string
  dimensions?: { label: string; seriesA: number; seriesB: number }[]
}

export type Comparison3Data = ComparisonData
export type Comparison4Data = ComparisonData

export interface Comparison5Item {
  text: string
  icon?: string
}

export interface Comparison5Data {
  type: 'comparison5'
  title?: string
  leftTitle?: string
  rightTitle?: string
  leftOption?: string
  rightOption?: string
  leftItems?: (string | Comparison5Item)[]
  rightItems?: (string | Comparison5Item)[]
  // Backward compatibility with legacy entries format if any
  entries?: { name: string; score: number; color?: string }[]
}

export interface Comparison6Aspect {
  label: string
  leftPercent: number
  rightPercent: number
  color?: string
  leftColor?: string
  rightColor?: string
}

export interface Comparison6Data {
  type: 'comparison6'
  title?: string
  leftTitle?: string
  leftSubtitle?: string
  rightTitle?: string
  rightSubtitle?: string
  aspects: Comparison6Aspect[]
}

export interface Comparison7Item {
  title: string
  subtitle?: string
  icon?: string
  color?: string
}

export interface Comparison7Data {
  type: 'comparison7'
  title?: string
  leftTitle?: string
  rightTitle?: string
  pros: (string | Comparison7Item)[]
  cons: (string | Comparison7Item)[]
}

export interface Comparison8Data {
  type: 'comparison8'
  title?: string
  leftTitle: string
  rightTitle: string
  leftItems: string[]
  rightItems: string[]
}

export type Manufacturing2Data = ManufacturingData
export type Manufacturing3Data = ManufacturingData
export type Manufacturing4Data = ManufacturingData
export type Manufacturing5Data = ManufacturingData
export type Manufacturing6Data = ManufacturingData
export type Manufacturing7Data = ManufacturingData
export type Manufacturing8Data = ManufacturingData

export type ValueChain2Data = ValueChainData

export type Business2Data = Omit<BusinessData, 'type'> & { type: 'business2' }
export type Business3Data = Omit<BusinessData, 'type'> & { type: 'business3' }
export type Business4Data = Omit<BusinessData, 'type'> & { type: 'business4' }
export type Business5Data = Omit<BusinessData, 'type'> & { type: 'business5' }
export type Business6Data = Omit<BusinessData, 'type'> & { type: 'business6' }
export type Business7Data = Omit<BusinessData, 'type'> & { type: 'business7' }
export type Business8Data = Omit<BusinessData, 'type'> & { type: 'business8' }
export type Business9Data = Omit<BusinessData, 'type'> & { type: 'business9' }
export type Business10Data = Omit<BusinessData, 'type'> & { type: 'business10' }
export type Business11Data = Omit<BusinessData, 'type'> & { type: 'business11' }

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
  color?: string
  icon?: string
  value?: string
  percent?: string
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
  color?: string
  icon?: string
  value?: string
  percent?: string
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
  color?: string
  icon?: string
  value?: string
  percent?: string
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
  icon?: string
  value?: string
  percent?: string
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
  color?: string
  icon?: string
  value?: string
  percent?: string
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
  icon?: string
  percent?: string
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
  description?: string
  time?: string
  color?: string
  icon?: string
  value?: string
  percent?: string
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
  subtitle?: string
  description?: string
  color?: string
  icon?: string
  value?: string
  percent?: string
}

export interface ComparisonBlock {
  title: string
  subtitle?: string
  description?: string
  color?: string
  icon?: string
  value?: string
  val?: string
  percent?: string
  badgePercent?: string
  progress?: string
}

export interface ComparisonData {
  type: 'comparison'
  title?: string
  leftTitle?: string
  rightTitle?: string
  items?: ComparisonItem[]
  blocks?: ComparisonBlock[]
}

export interface BrainData {
  type: 'brain'
  title?: string
  centerLabel?: string
  branches: {
    title: string
    subtitle?: string
    color?: string
    icon?: string
    val?: string
    value?: string
    pct?: string
    percent?: string
    date?: string
    number?: number
  }[]
}

export interface BudgetItem {
  label: string
  amount: string
  percentage: number
  color?: string
  icon?: string
  value?: string
  percent?: string
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
  nodes: { title: string; subtitle?: string; value?: string; percent?: string; color?: string; icon?: string }[]
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
  change?: string
  color?: string
  icon?: string
  percent?: string
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
  color?: string
  icon?: string
  value?: string
  percent?: string
}

export interface ManufacturingData {
  type: 'manufacturing'
  title?: string
  stations: ManufacturingStation[]
}

export interface ValueChainActivity {
  title: string
  subtitle?: string
  color?: string
  icon?: string
  value?: string
  percent?: string
}

export interface ValueChainData {
  type: 'valueChain'
  title?: string
  primary: ValueChainActivity[]
  support: ValueChainActivity[]
}

export interface ValueChain3Item {
  id?: string
  title: string
  subtitle?: string
  color?: string
  icon?: string
}

export interface ValueChain3Data {
  type: 'valueChain3'
  title?: string
  topBar?: string
  bottomBar?: string
  items?: ValueChain3Item[]
  footerText?: string
  primary?: ValueChainActivity[]
  support?: ValueChainActivity[]
}

export interface ValueChain4Data {
  type: 'valueChain4'
  title?: string
  upperLabel?: string
  lowerLabel?: string
  centerLabel?: string
  rightLabel?: string
  primary?: ValueChainActivity[]
  support?: ValueChainActivity[]
}

export interface ValueChain5Item {
  title: string
  subtitle?: string
  color?: string
}

export interface ValueChain5Data {
  type: 'valueChain5'
  title?: string
  leftBlocks?: ValueChain5Item[]
  centerBars?: ValueChain5Item[]
  rightChevrons?: ValueChain5Item[]
}

export interface CircleSegment {
  number: string
  title: string
  description: string
  icon: string
}

export interface CircleData {
  type: 'circle'
  title?: string
  segments: CircleSegment[]
}

export interface PieSlice {
  label: string
  value?: number
  description?: string
  pct?: string
  icon?: string
  color?: string
}

export interface PieData {
  type: string
  title?: string
  slices: PieSlice[]
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
  | Comparison8Data
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
  | ValueChain3Data
  | ValueChain4Data
  | ValueChain5Data
  | CircleData
  | PieData

export type TemplateType = | 'testlayout60' | string

export interface TemplateDefinition {
  type: TemplateType
  label: string
  category: string
  description?: string
  defaultData: TemplateData
  supportsStroke?: boolean
}
