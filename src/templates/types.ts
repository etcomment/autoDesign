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
  progress?: string
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
  color?: string
  icon?: string
  value?: string
  percent?: string
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
  | CircleData

export type TemplateType = 'imported2025migsopcubedcreativeandexampletemplates205' | 'imported2025migsopcubedcreativeandexampletemplates204' | 'imported2025migsopcubedcreativeandexampletemplates203' | 'imported2025migsopcubedcreativeandexampletemplates202' | 'imported2025migsopcubedcreativeandexampletemplates201' | 'imported2025migsopcubedcreativeandexampletemplates200' | 'imported2025migsopcubedcreativeandexampletemplates199' | 'imported2025migsopcubedcreativeandexampletemplates198' | 'imported2025migsopcubedcreativeandexampletemplates197' | 'imported2025migsopcubedcreativeandexampletemplates196' | 'imported2025migsopcubedcreativeandexampletemplates195' | 'imported2025migsopcubedcreativeandexampletemplates194' | 'imported2025migsopcubedcreativeandexampletemplates193' | 'imported2025migsopcubedcreativeandexampletemplates192' | 'imported2025migsopcubedcreativeandexampletemplates191' | 'imported2025migsopcubedcreativeandexampletemplates190' | 'imported2025migsopcubedcreativeandexampletemplates189' | 'imported2025migsopcubedcreativeandexampletemplates188' | 'imported2025migsopcubedcreativeandexampletemplates187' | 'imported2025migsopcubedcreativeandexampletemplates186' | 'imported2025migsopcubedcreativeandexampletemplates185' | 'imported2025migsopcubedcreativeandexampletemplates184' | 'imported2025migsopcubedcreativeandexampletemplates183' | 'imported2025migsopcubedcreativeandexampletemplates182' | 'imported2025migsopcubedcreativeandexampletemplates181' | 'imported2025migsopcubedcreativeandexampletemplates180' | 'imported2025migsopcubedcreativeandexampletemplates179' | 'imported2025migsopcubedcreativeandexampletemplates178' | 'imported2025migsopcubedcreativeandexampletemplates177' | 'imported2025migsopcubedcreativeandexampletemplates176' | 'imported2025migsopcubedcreativeandexampletemplates175' | 'imported2025migsopcubedcreativeandexampletemplates174' | 'imported2025migsopcubedcreativeandexampletemplates173' | 'imported2025migsopcubedcreativeandexampletemplates172' | 'imported2025migsopcubedcreativeandexampletemplates171' | 'imported2025migsopcubedcreativeandexampletemplates170' | 'imported2025migsopcubedcreativeandexampletemplates169' | 'imported2025migsopcubedcreativeandexampletemplates168' | 'imported2025migsopcubedcreativeandexampletemplates167' | 'imported2025migsopcubedcreativeandexampletemplates166' | 'imported2025migsopcubedcreativeandexampletemplates165' | 'imported2025migsopcubedcreativeandexampletemplates164' | 'imported2025migsopcubedcreativeandexampletemplates163' | 'imported2025migsopcubedcreativeandexampletemplates162' | 'imported2025migsopcubedcreativeandexampletemplates161' | 'imported2025migsopcubedcreativeandexampletemplates160' | 'imported2025migsopcubedcreativeandexampletemplates159' | 'imported2025migsopcubedcreativeandexampletemplates158' | 'imported2025migsopcubedcreativeandexampletemplates157' | 'imported2025migsopcubedcreativeandexampletemplates156' | 'imported2025migsopcubedcreativeandexampletemplates155' | 'imported2025migsopcubedcreativeandexampletemplates154' | 'imported2025migsopcubedcreativeandexampletemplates153' | 'imported2025migsopcubedcreativeandexampletemplates152' | 'imported2025migsopcubedcreativeandexampletemplates151' | 'imported2025migsopcubedcreativeandexampletemplates150' | 'imported2025migsopcubedcreativeandexampletemplates149' | 'imported2025migsopcubedcreativeandexampletemplates148' | 'imported2025migsopcubedcreativeandexampletemplates147' | 'imported2025migsopcubedcreativeandexampletemplates146' | 'imported2025migsopcubedcreativeandexampletemplates145' | 'imported2025migsopcubedcreativeandexampletemplates144' | 'imported2025migsopcubedcreativeandexampletemplates143' | 'imported2025migsopcubedcreativeandexampletemplates142' | 'imported2025migsopcubedcreativeandexampletemplates141' | 'imported2025migsopcubedcreativeandexampletemplates140' | 'imported2025migsopcubedcreativeandexampletemplates139' | 'imported2025migsopcubedcreativeandexampletemplates138' | 'imported2025migsopcubedcreativeandexampletemplates137' | 'imported2025migsopcubedcreativeandexampletemplates136' | 'imported2025migsopcubedcreativeandexampletemplates135' | 'imported2025migsopcubedcreativeandexampletemplates134' | 'imported2025migsopcubedcreativeandexampletemplates133' | 'imported2025migsopcubedcreativeandexampletemplates132' | 'imported2025migsopcubedcreativeandexampletemplates131' | 'imported2025migsopcubedcreativeandexampletemplates130' | 'imported2025migsopcubedcreativeandexampletemplates129' | 'imported2025migsopcubedcreativeandexampletemplates128' | 'imported2025migsopcubedcreativeandexampletemplates127' | 'imported2025migsopcubedcreativeandexampletemplates126' | 'imported2025migsopcubedcreativeandexampletemplates125' | 'imported2025migsopcubedcreativeandexampletemplates124' | 'imported2025migsopcubedcreativeandexampletemplates123' | 'imported2025migsopcubedcreativeandexampletemplates122' | 'imported2025migsopcubedcreativeandexampletemplates121' | 'imported2025migsopcubedcreativeandexampletemplates120' | 'imported2025migsopcubedcreativeandexampletemplates119' | 'imported2025migsopcubedcreativeandexampletemplates118' | 'imported2025migsopcubedcreativeandexampletemplates117' | 'imported2025migsopcubedcreativeandexampletemplates116' | 'imported2025migsopcubedcreativeandexampletemplates115' | 'imported2025migsopcubedcreativeandexampletemplates114' | 'imported2025migsopcubedcreativeandexampletemplates113' | 'imported2025migsopcubedcreativeandexampletemplates112' | 'imported2025migsopcubedcreativeandexampletemplates111' | 'imported2025migsopcubedcreativeandexampletemplates110' | 'imported2025migsopcubedcreativeandexampletemplates109' | 'imported2025migsopcubedcreativeandexampletemplates108' | 'imported2025migsopcubedcreativeandexampletemplates107' | 'imported2025migsopcubedcreativeandexampletemplates106' | 'imported2025migsopcubedcreativeandexampletemplates105' | 'imported2025migsopcubedcreativeandexampletemplates104' | 'imported2025migsopcubedcreativeandexampletemplates103' | 'imported2025migsopcubedcreativeandexampletemplates102' | 'imported2025migsopcubedcreativeandexampletemplates101' | 'imported2025migsopcubedcreativeandexampletemplates100' | 'imported2025migsopcubedcreativeandexampletemplates99' | 'imported2025migsopcubedcreativeandexampletemplates98' | 'imported2025migsopcubedcreativeandexampletemplates97' | 'imported2025migsopcubedcreativeandexampletemplates96' | 'imported2025migsopcubedcreativeandexampletemplates95' | 'imported2025migsopcubedcreativeandexampletemplates94' | 'imported2025migsopcubedcreativeandexampletemplates93' | 'imported2025migsopcubedcreativeandexampletemplates92' | 'imported2025migsopcubedcreativeandexampletemplates91' | 'imported2025migsopcubedcreativeandexampletemplates90' | 'imported2025migsopcubedcreativeandexampletemplates89' | 'imported2025migsopcubedcreativeandexampletemplates88' | 'imported2025migsopcubedcreativeandexampletemplates87' | 'imported2025migsopcubedcreativeandexampletemplates86' | 'imported2025migsopcubedcreativeandexampletemplates85' | 'imported2025migsopcubedcreativeandexampletemplates84' | 'imported2025migsopcubedcreativeandexampletemplates83' | 'imported2025migsopcubedcreativeandexampletemplates82' | 'imported2025migsopcubedcreativeandexampletemplates81' | 'imported2025migsopcubedcreativeandexampletemplates80' | 'imported2025migsopcubedcreativeandexampletemplates79' | 'imported2025migsopcubedcreativeandexampletemplates78' | 'imported2025migsopcubedcreativeandexampletemplates77' | 'imported2025migsopcubedcreativeandexampletemplates76' | 'imported2025migsopcubedcreativeandexampletemplates75' | 'imported2025migsopcubedcreativeandexampletemplates74' | 'imported2025migsopcubedcreativeandexampletemplates73' | 'imported2025migsopcubedcreativeandexampletemplates72' | 'imported2025migsopcubedcreativeandexampletemplates71' | 'imported2025migsopcubedcreativeandexampletemplates70' | 'imported2025migsopcubedcreativeandexampletemplates69' | 'imported2025migsopcubedcreativeandexampletemplates68' | 'imported2025migsopcubedcreativeandexampletemplates67' | 'imported2025migsopcubedcreativeandexampletemplates66' | 'imported2025migsopcubedcreativeandexampletemplates65' | 'imported2025migsopcubedcreativeandexampletemplates64' | 'imported2025migsopcubedcreativeandexampletemplates63' | 'imported2025migsopcubedcreativeandexampletemplates62' | 'imported2025migsopcubedcreativeandexampletemplates61' | 'imported2025migsopcubedcreativeandexampletemplates60' | 'imported2025migsopcubedcreativeandexampletemplates59' | 'imported2025migsopcubedcreativeandexampletemplates58' | 'imported2025migsopcubedcreativeandexampletemplates57' | 'imported2025migsopcubedcreativeandexampletemplates56' | 'imported2025migsopcubedcreativeandexampletemplates55' | 'imported2025migsopcubedcreativeandexampletemplates54' | 'imported2025migsopcubedcreativeandexampletemplates53' | 'imported2025migsopcubedcreativeandexampletemplates52' | 'imported2025migsopcubedcreativeandexampletemplates51' | 'imported2025migsopcubedcreativeandexampletemplates50' | 'imported2025migsopcubedcreativeandexampletemplates49' | 'imported2025migsopcubedcreativeandexampletemplates48' | 'imported2025migsopcubedcreativeandexampletemplates47' | 'imported2025migsopcubedcreativeandexampletemplates46' | 'imported2025migsopcubedcreativeandexampletemplates45' | 'imported2025migsopcubedcreativeandexampletemplates44' | 'imported2025migsopcubedcreativeandexampletemplates43' | 'imported2025migsopcubedcreativeandexampletemplates42' | 'imported2025migsopcubedcreativeandexampletemplates41' | 'imported2025migsopcubedcreativeandexampletemplates40' | 'imported2025migsopcubedcreativeandexampletemplates39' | 'imported2025migsopcubedcreativeandexampletemplates38' | 'imported2025migsopcubedcreativeandexampletemplates37' | 'imported2025migsopcubedcreativeandexampletemplates36' | 'imported2025migsopcubedcreativeandexampletemplates35' | 'imported2025migsopcubedcreativeandexampletemplates34' | 'imported2025migsopcubedcreativeandexampletemplates33' | 'imported2025migsopcubedcreativeandexampletemplates32' | 'imported2025migsopcubedcreativeandexampletemplates31' | 'imported2025migsopcubedcreativeandexampletemplates30' | 'imported2025migsopcubedcreativeandexampletemplates29' | 'imported2025migsopcubedcreativeandexampletemplates28' | 'imported2025migsopcubedcreativeandexampletemplates27' | 'imported2025migsopcubedcreativeandexampletemplates26' | 'imported2025migsopcubedcreativeandexampletemplates25' | 'imported2025migsopcubedcreativeandexampletemplates24' | 'imported2025migsopcubedcreativeandexampletemplates23' | 'imported2025migsopcubedcreativeandexampletemplates22' | 'imported2025migsopcubedcreativeandexampletemplates21' | 'imported2025migsopcubedcreativeandexampletemplates20' | 'imported2025migsopcubedcreativeandexampletemplates19' | 'imported2025migsopcubedcreativeandexampletemplates18' | 'imported2025migsopcubedcreativeandexampletemplates17' | 'imported2025migsopcubedcreativeandexampletemplates16' | 'imported2025migsopcubedcreativeandexampletemplates15' | 'imported2025migsopcubedcreativeandexampletemplates14' | 'imported2025migsopcubedcreativeandexampletemplates13' | 'imported2025migsopcubedcreativeandexampletemplates12' | 'imported2025migsopcubedcreativeandexampletemplates11' | 'imported2025migsopcubedcreativeandexampletemplates10' | 'imported2025migsopcubedcreativeandexampletemplates9' | 'imported2025migsopcubedcreativeandexampletemplates8' | 'imported2025migsopcubedcreativeandexampletemplates7' | 'imported2025migsopcubedcreativeandexampletemplates6' | 'imported2025migsopcubedcreativeandexampletemplates5' | 'imported2025migsopcubedcreativeandexampletemplates4' | 'imported2025migsopcubedcreativeandexampletemplates3' | 'imported2025migsopcubedcreativeandexampletemplates2' | 'imported2025migsopcubedcreativeandexampletemplates1' | | 'testlayout60' | string

export interface TemplateDefinition {
  type: TemplateType
  label: string
  category: string
  description?: string
  defaultData: TemplateData
  supportsStroke?: boolean
}
