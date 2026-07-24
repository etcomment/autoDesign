import type { ReactElement } from 'react'
import type {
  TemplateData,
  TemplateType,
  RoadmapData,
  ProductRoadmapData,
  ProductRoadmap2Data,
  ProductRoadmap3Data,
  ProductRoadmap4Data,
  ProductRoadmap5Data,
  StrategyData,
  Strategy2Data,
  Strategy3Data,
  Strategy4Data,
  Strategy5Data,
  Strategy6Data,
  ProcessData,
  Process2Data,
  Process4Data,
  Process5Data,
  PuzzleData,
  FunnelData,
  IcebergData,
  DashboardData,
  TableData,
  AgendaData,
  ComparisonData,
  Comparison2Data,
  Comparison5Data,
  Comparison6Data,
  Comparison7Data,
  BrainData,
  BudgetData,
  BusinessData,
  DecisionTreeData,
  GoalsData,
  ManufacturingData,
  ValueChainData,
} from './types'
import { useTemplateStore } from './store'

import { RoadmapTemplate } from './components/RoadmapTemplate'
import { Roadmap2Template } from './components/Roadmap2Template'
import { Roadmap3Template } from './components/Roadmap3Template'
import { Roadmap4Template } from './components/Roadmap4Template'
import { Roadmap5Template } from './components/Roadmap5Template'
import { Roadmap6Template } from './components/Roadmap6Template'
import { Roadmap7Template } from './components/Roadmap7Template'
import { Roadmap8Template } from './components/Roadmap8Template'
import { Roadmap9Template } from './components/Roadmap9Template'
import { Roadmap10Template } from './components/Roadmap10Template'
import { Roadmap11Template } from './components/Roadmap11Template'
import { Roadmap12Template } from './components/Roadmap12Template'
import { Roadmap13Template } from './components/Roadmap13Template'
import { Roadmap14Template } from './components/Roadmap14Template'
import { Roadmap15Template } from './components/Roadmap15Template'
import { Roadmap16Template } from './components/Roadmap16Template'
import { ProductRoadmapTemplate } from './components/ProductRoadmapTemplate'
import { ProductRoadmap2Template } from './components/ProductRoadmap2Template'
import { ProductRoadmap3Template } from './components/ProductRoadmap3Template'
import { ProductRoadmap4Template } from './components/ProductRoadmap4Template'
import { ProductRoadmap5Template } from './components/ProductRoadmap5Template'
import { ProductRoadmap6Template } from './components/ProductRoadmap6Template'
import { ProductRoadmap7Template } from './components/ProductRoadmap7Template'
import { ProductRoadmap8Template } from './components/ProductRoadmap8Template'
import { ProductRoadmap9Template } from './components/ProductRoadmap9Template'
import { ProductRoadmap10Template } from './components/ProductRoadmap10Template'
import { ProductRoadmap11Template } from './components/ProductRoadmap11Template'
import { ProductRoadmap12Template } from './components/ProductRoadmap12Template'
import { StrategyTemplate } from './components/StrategyTemplate'
import { Strategy2Template } from './components/Strategy2Template'
import { Strategy3Template } from './components/Strategy3Template'
import { Strategy4Template } from './components/Strategy4Template'
import { Strategy5Template } from './components/Strategy5Template'
import { Strategy6Template } from './components/Strategy6Template'
import { Strategy7Template } from './components/Strategy7Template'
import { Strategy8Template } from './components/Strategy8Template'
import { ProcessTemplate } from './components/ProcessTemplate'
import { Process1Template } from './components/Process1Template'
import { Process2Template } from './components/Process2Template'
import { Process4Template } from './components/Process4Template'
import { Process5Template } from './components/Process5Template'
import { PuzzleTemplate } from './components/PuzzleTemplate'
import { Puzzle2Template } from './components/Puzzle2Template'
import { Puzzle3Template } from './components/Puzzle3Template'
import { Puzzle4Template } from './components/Puzzle4Template'
import { Puzzle5Template } from './components/Puzzle5Template'
import { Puzzle6Template } from './components/Puzzle6Template'
import { Puzzle7Template } from './components/Puzzle7Template'
import { FunnelTemplate } from './components/FunnelTemplate'
import { Funnel2Template } from './components/Funnel2Template'
import { Funnel3Template } from './components/Funnel3Template'
import { Funnel4Template } from './components/Funnel4Template'
import { Funnel5Template } from './components/Funnel5Template'
import { IcebergTemplate } from './components/IcebergTemplate'
import { Iceberg2Template } from './components/Iceberg2Template'
import { DashboardTemplate } from './components/DashboardTemplate'
import { Dashboard2Template } from './components/Dashboard2Template'
import { Dashboard3Template } from './components/Dashboard3Template'
import { Dashboard4Template } from './components/Dashboard4Template'
import { Dashboard5Template } from './components/Dashboard5Template'
import { TableTemplate } from './components/TableTemplate'
import { Table2Template } from './components/Table2Template'
import { Table3Template } from './components/Table3Template'
import { Table4Template } from './components/Table4Template'
import { Table5Template } from './components/Table5Template'
import { Table6Template } from './components/Table6Template'
import { AgendaTemplate } from './components/AgendaTemplate'
import { Agenda2Template } from './components/Agenda2Template'
import { Agenda3Template } from './components/Agenda3Template'
import { Agenda4Template } from './components/Agenda4Template'
import { ComparisonTemplate } from './components/ComparisonTemplate'
import { Comparison2Template } from './components/Comparison2Template'
import { Comparison3Template } from './components/Comparison3Template'
import { Comparison4Template } from './components/Comparison4Template'
import { Comparison5Template } from './components/Comparison5Template'
import { Comparison6Template } from './components/Comparison6Template'
import { Comparison7Template } from './components/Comparison7Template'
import { BrainTemplate } from './components/BrainTemplate'
import { Brain2Template } from './components/Brain2Template'
import { Brain3Template } from './components/Brain3Template'
import { Brain4Template } from './components/Brain4Template'
import { BudgetTemplate } from './components/BudgetTemplate'
import { Budget2Template } from './components/Budget2Template'
import { Budget3Template } from './components/Budget3Template'
import { Budget4Template } from './components/Budget4Template'
import { Budget5Template } from './components/Budget5Template'
import { BusinessTemplate } from './components/BusinessTemplate'
import { Business2Template } from './components/Business2Template'
import { Business3Template } from './components/Business3Template'
import { Business4Template } from './components/Business4Template'
import { Business5Template } from './components/Business5Template'
import { Business6Template } from './components/Business6Template'
import { Business7Template } from './components/Business7Template'
import { Business8Template } from './components/Business8Template'
import { Business9Template } from './components/Business9Template'
import { Business10Template } from './components/Business10Template'
import { Business11Template } from './components/Business11Template'
import { DecisionTreeTemplate } from './components/DecisionTreeTemplate'
import { Decision2Template } from './components/Decision2Template'
import { GoalsTemplate } from './components/GoalsTemplate'
import { Goals1Template } from './components/Goals1Template'
import { Goals2Template } from './components/Goals2Template'
import { Goals3Template } from './components/Goals3Template'
import { Goals4Template } from './components/Goals4Template'
import { Goals5Template } from './components/Goals5Template'
import { ManufacturingTemplate } from './components/ManufacturingTemplate'
import { Manufacturing2Template } from './components/Manufacturing2Template'
import { Manufacturing3Template } from './components/Manufacturing3Template'
import { Manufacturing4Template } from './components/Manufacturing4Template'
import { Manufacturing5Template } from './components/Manufacturing5Template'
import { Manufacturing6Template } from './components/Manufacturing6Template'
import { Manufacturing7Template } from './components/Manufacturing7Template'
import { Manufacturing8Template } from './components/Manufacturing8Template'
import { ValueChainTemplate } from './components/ValueChainTemplate'
import { ValueChain2Template } from './components/ValueChain2Template'

type TemplateComponent = (props: { data: TemplateData }) => ReactElement

const TEMPLATE_MAP: Record<TemplateType, TemplateComponent> = {
  roadmap: ({ data }) => <RoadmapTemplate data={data as RoadmapData} />,
  roadmap2: ({ data }) => <Roadmap2Template data={data as RoadmapData} />,
  roadmap3: ({ data }) => <Roadmap3Template data={data as RoadmapData} />,
  roadmap4: ({ data }) => <Roadmap4Template data={data as RoadmapData} />,
  roadmap5: ({ data }) => <Roadmap5Template data={data as RoadmapData} />,
  roadmap6: ({ data }) => <Roadmap6Template data={data as RoadmapData} />,
  roadmap7: ({ data }) => <Roadmap7Template data={data as RoadmapData} />,
  roadmap8: ({ data }) => <Roadmap8Template data={data as RoadmapData} />,
  roadmap9: ({ data }) => <Roadmap9Template data={data as RoadmapData} />,
  roadmap10: ({ data }) => <Roadmap10Template data={data as RoadmapData} />,
  roadmap11: ({ data }) => <Roadmap11Template data={data as RoadmapData} />,
  roadmap12: ({ data }) => <Roadmap12Template data={data as RoadmapData} />,
  roadmap13: ({ data }) => <Roadmap13Template data={data as RoadmapData} />,
  roadmap14: ({ data }) => <Roadmap14Template data={data as RoadmapData} />,
  roadmap15: ({ data }) => <Roadmap15Template data={data as RoadmapData} />,
  roadmap16: ({ data }) => <Roadmap16Template data={data as RoadmapData} />,
  productRoadmap: ({ data }) => <ProductRoadmapTemplate data={data as ProductRoadmapData} />,
  productRoadmap2: ({ data }) => <ProductRoadmap2Template data={data as ProductRoadmap2Data} />,
  productRoadmap3: ({ data }) => <ProductRoadmap3Template data={data as ProductRoadmap3Data} />,
  productRoadmap4: ({ data }) => <ProductRoadmap4Template data={data as ProductRoadmap4Data} />,
  productRoadmap5: ({ data }) => <ProductRoadmap5Template data={data as ProductRoadmap5Data} />,
  productRoadmap6: ({ data }) => <ProductRoadmap6Template data={data as ProductRoadmapData} />,
  productRoadmap7: ({ data }) => <ProductRoadmap7Template data={data as ProductRoadmapData} />,
  productRoadmap8: ({ data }) => <ProductRoadmap8Template data={data as ProductRoadmapData} />,
  productRoadmap9: ({ data }) => <ProductRoadmap9Template data={data as ProductRoadmapData} />,
  productRoadmap10: ({ data }) => <ProductRoadmap10Template data={data as ProductRoadmapData} />,
  productRoadmap11: ({ data }) => <ProductRoadmap11Template data={data as ProductRoadmapData} />,
  productRoadmap12: ({ data }) => <ProductRoadmap12Template data={data as ProductRoadmapData} />,
  strategy: ({ data }) => <StrategyTemplate data={data as StrategyData} />,
  strategy2: ({ data }) => <Strategy2Template data={data as Strategy2Data} />,
  strategy3: ({ data }) => <Strategy3Template data={data as Strategy3Data} />,
  strategy4: ({ data }) => <Strategy4Template data={data as Strategy4Data} />,
  strategy5: ({ data }) => <Strategy5Template data={data as Strategy5Data} />,
  strategy6: ({ data }) => <Strategy6Template data={data as Strategy6Data} />,
  strategy7: ({ data }) => <Strategy7Template data={data as StrategyData} />,
  strategy8: ({ data }) => <Strategy8Template data={data as StrategyData} />,
  process: ({ data }) => <ProcessTemplate data={data as ProcessData} />,
  process1: ({ data }) => <Process1Template data={data as ProcessData} />,
  process2: ({ data }) => <Process2Template data={data as Process2Data} />,
  process4: ({ data }) => <Process4Template data={data as Process4Data} />,
  process5: ({ data }) => <Process5Template data={data as Process5Data} />,
  puzzle: ({ data }) => <PuzzleTemplate data={data as PuzzleData} />,
  puzzle2: ({ data }) => <Puzzle2Template data={data as PuzzleData} />,
  puzzle3: ({ data }) => <Puzzle3Template data={data as PuzzleData} />,
  puzzle4: ({ data }) => <Puzzle4Template data={data as PuzzleData} />,
  puzzle5: ({ data }) => <Puzzle5Template data={data as PuzzleData} />,
  puzzle6: ({ data }) => <Puzzle6Template data={data as PuzzleData} />,
  puzzle7: ({ data }) => <Puzzle7Template data={data as PuzzleData} />,
  funnel: ({ data }) => <FunnelTemplate data={data as FunnelData} />,
  funnel2: ({ data }) => <Funnel2Template data={data as FunnelData} />,
  funnel3: ({ data }) => <Funnel3Template data={data as FunnelData} />,
  funnel4: ({ data }) => <Funnel4Template data={data as FunnelData} />,
  funnel5: ({ data }) => <Funnel5Template data={data as FunnelData} />,
  iceberg: ({ data }) => <IcebergTemplate data={data as IcebergData} />,
  iceberg2: ({ data }) => <Iceberg2Template data={data as IcebergData} />,
  dashboard: ({ data }) => <DashboardTemplate data={data as DashboardData} />,
  dashboard2: ({ data }) => <Dashboard2Template data={data as DashboardData} />,
  dashboard3: ({ data }) => <Dashboard3Template data={data as DashboardData} />,
  dashboard4: ({ data }) => <Dashboard4Template data={data as DashboardData} />,
  dashboard5: ({ data }) => <Dashboard5Template data={data as DashboardData} />,
  table: ({ data }) => <TableTemplate data={data as TableData} />,
  table2: ({ data }) => <Table2Template data={data as TableData} />,
  table3: ({ data }) => <Table3Template data={data as TableData} />,
  table4: ({ data }) => <Table4Template data={data as TableData} />,
  table5: ({ data }) => <Table5Template data={data as TableData} />,
  table6: ({ data }) => <Table6Template data={data as TableData} />,
  agenda: ({ data }) => <AgendaTemplate data={data as AgendaData} />,
  agenda2: ({ data }) => <Agenda2Template data={data as AgendaData} />,
  agenda3: ({ data }) => <Agenda3Template data={data as AgendaData} />,
  agenda4: ({ data }) => <Agenda4Template data={data as AgendaData} />,
  comparison: ({ data }) => <ComparisonTemplate data={data as ComparisonData} />,
  comparison2: ({ data }) => <Comparison2Template data={data as Comparison2Data} />,
  comparison3: ({ data }) => <Comparison3Template data={data as ComparisonData} />,
  comparison4: ({ data }) => <Comparison4Template data={data as ComparisonData} />,
  comparison5: ({ data }) => <Comparison5Template data={data as Comparison5Data} />,
  comparison6: ({ data }) => <Comparison6Template data={data as Comparison6Data} />,
  comparison7: ({ data }) => <Comparison7Template data={data as Comparison7Data} />,
  brain: ({ data }) => <BrainTemplate data={data as BrainData} />,
  brain2: ({ data }) => <Brain2Template data={data as BrainData} />,
  brain3: ({ data }) => <Brain3Template data={data as BrainData} />,
  brain4: ({ data }) => <Brain4Template data={data as BrainData} />,
  budget: ({ data }) => <BudgetTemplate data={data as BudgetData} />,
  budget2: ({ data }) => <Budget2Template data={data as BudgetData} />,
  budget3: ({ data }) => <Budget3Template data={data as BudgetData} />,
  budget4: ({ data }) => <Budget4Template data={data as BudgetData} />,
  budget5: ({ data }) => <Budget5Template data={data as BudgetData} />,
  business: ({ data }) => <BusinessTemplate data={data as BusinessData} />,
  business2: ({ data }) => <Business2Template data={data as BusinessData} />,
  business3: ({ data }) => <Business3Template data={data as BusinessData} />,
  business4: ({ data }) => <Business4Template data={data as BusinessData} />,
  business5: ({ data }) => <Business5Template data={data as BusinessData} />,
  business6: ({ data }) => <Business6Template data={data as BusinessData} />,
  business7: ({ data }) => <Business7Template data={data as BusinessData} />,
  business8: ({ data }) => <Business8Template data={data as BusinessData} />,
  business9: ({ data }) => <Business9Template data={data as BusinessData} />,
  business10: ({ data }) => <Business10Template data={data as BusinessData} />,
  business11: ({ data }) => <Business11Template data={data as BusinessData} />,
  decisionTree: ({ data }) => <DecisionTreeTemplate data={data as DecisionTreeData} />,
  decision2: ({ data }) => <Decision2Template data={data as DecisionTreeData} />,
  goals: ({ data }) => <GoalsTemplate data={data as GoalsData} />,
  goals1: ({ data }) => <Goals1Template data={data as GoalsData} />,
  goals2: ({ data }) => <Goals2Template data={data as GoalsData} />,
  goals3: ({ data }) => <Goals3Template data={data as GoalsData} />,
  goals4: ({ data }) => <Goals4Template data={data as GoalsData} />,
  goals5: ({ data }) => <Goals5Template data={data as GoalsData} />,
  manufacturing: ({ data }) => <ManufacturingTemplate data={data as ManufacturingData} />,
  manufacturing2: ({ data }) => <Manufacturing2Template data={data as ManufacturingData} />,
  manufacturing3: ({ data }) => <Manufacturing3Template data={data as ManufacturingData} />,
  manufacturing4: ({ data }) => <Manufacturing4Template data={data as ManufacturingData} />,
  manufacturing5: ({ data }) => <Manufacturing5Template data={data as ManufacturingData} />,
  manufacturing6: ({ data }) => <Manufacturing6Template data={data as ManufacturingData} />,
  manufacturing7: ({ data }) => <Manufacturing7Template data={data as ManufacturingData} />,
  manufacturing8: ({ data }) => <Manufacturing8Template data={data as ManufacturingData} />,
  valueChain: ({ data }) => <ValueChainTemplate data={data as ValueChainData} />,
  valueChain2: ({ data }) => <ValueChain2Template data={data as ValueChainData} />,
}

export function TemplateRenderer(): ReactElement | null {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const templateData = useTemplateStore(s => s.templateData)

  if (!activeTemplate || !templateData) return null

  const Component = TEMPLATE_MAP[activeTemplate]
  if (!Component) return null

  return (
    <g pointerEvents="all">
      <Component data={templateData} />
    </g>
  )
}
