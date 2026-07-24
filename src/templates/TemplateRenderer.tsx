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
  ProcessData,
  Process2Data,
  Process4Data,
  Process5Data,
  Strategy2Data,
  Strategy3Data,
  Strategy4Data,
  Strategy5Data,
  PuzzleData,
  FunnelData,
  IcebergData,
  DashboardData,
  TableData,
  AgendaData,
  ComparisonData,
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
import { ProductRoadmapTemplate } from './components/ProductRoadmapTemplate'
import { ProductRoadmap2Template } from './components/ProductRoadmap2Template'
import { ProductRoadmap3Template } from './components/ProductRoadmap3Template'
import { ProductRoadmap4Template } from './components/ProductRoadmap4Template'
import { ProductRoadmap5Template } from './components/ProductRoadmap5Template'
import { ProductRoadmap6Template } from './components/ProductRoadmap6Template'
import { StrategyTemplate } from './components/StrategyTemplate'
import { ProcessTemplate } from './components/ProcessTemplate'
import { Process2Template } from './components/Process2Template'
import { Process4Template } from './components/Process4Template'
import { Process5Template } from './components/Process5Template'
import { Strategy2Template } from './components/Strategy2Template'
import { Strategy3Template } from './components/Strategy3Template'
import { Strategy4Template } from './components/Strategy4Template'
import { Strategy5Template } from './components/Strategy5Template'
import { PuzzleTemplate } from './components/PuzzleTemplate'
import { FunnelTemplate } from './components/FunnelTemplate'
import { IcebergTemplate } from './components/IcebergTemplate'
import { DashboardTemplate } from './components/DashboardTemplate'
import { TableTemplate } from './components/TableTemplate'
import { AgendaTemplate } from './components/AgendaTemplate'
import { ComparisonTemplate } from './components/ComparisonTemplate'
import { BrainTemplate } from './components/BrainTemplate'
import { BudgetTemplate } from './components/BudgetTemplate'
import { BusinessTemplate } from './components/BusinessTemplate'
import { DecisionTreeTemplate } from './components/DecisionTreeTemplate'
import { GoalsTemplate } from './components/GoalsTemplate'
import { ManufacturingTemplate } from './components/ManufacturingTemplate'
import { ValueChainTemplate } from './components/ValueChainTemplate'

type TemplateComponent = (props: { data: TemplateData }) => ReactElement

const TEMPLATE_MAP: Record<TemplateType, TemplateComponent> = {
  roadmap: ({ data }) => <RoadmapTemplate data={data as RoadmapData} />,
  roadmap2: ({ data }) => <Roadmap2Template data={data as RoadmapData} />,
  roadmap3: ({ data }) => <Roadmap3Template data={data as RoadmapData} />,
  roadmap4: ({ data }) => <Roadmap4Template data={data as RoadmapData} />,
  roadmap5: ({ data }) => <Roadmap5Template data={data as RoadmapData} />,
  roadmap6: ({ data }) => <Roadmap6Template data={data as RoadmapData} />,
  productRoadmap: ({ data }) => <ProductRoadmapTemplate data={data as ProductRoadmapData} />,
  productRoadmap2: ({ data }) => <ProductRoadmap2Template data={data as ProductRoadmap2Data} />,
  productRoadmap3: ({ data }) => <ProductRoadmap3Template data={data as ProductRoadmap3Data} />,
  productRoadmap4: ({ data }) => <ProductRoadmap4Template data={data as ProductRoadmap4Data} />,
  productRoadmap5: ({ data }) => <ProductRoadmap5Template data={data as ProductRoadmap5Data} />,
  productRoadmap6: ({ data }) => <ProductRoadmap6Template data={data as ProductRoadmapData} />,
  strategy: ({ data }) => <StrategyTemplate data={data as StrategyData} />,
  strategy2: ({ data }) => <Strategy2Template data={data as Strategy2Data} />,
  strategy3: ({ data }) => <Strategy3Template data={data as Strategy3Data} />,
  strategy4: ({ data }) => <Strategy4Template data={data as Strategy4Data} />,
  strategy5: ({ data }) => <Strategy5Template data={data as Strategy5Data} />,
  process: ({ data }) => <ProcessTemplate data={data as ProcessData} />,
  process2: ({ data }) => <Process2Template data={data as Process2Data} />,
  process4: ({ data }) => <Process4Template data={data as Process4Data} />,
  process5: ({ data }) => <Process5Template data={data as Process5Data} />,
  puzzle: ({ data }) => <PuzzleTemplate data={data as PuzzleData} />,
  funnel: ({ data }) => <FunnelTemplate data={data as FunnelData} />,
  iceberg: ({ data }) => <IcebergTemplate data={data as IcebergData} />,
  dashboard: ({ data }) => <DashboardTemplate data={data as DashboardData} />,
  table: ({ data }) => <TableTemplate data={data as TableData} />,
  agenda: ({ data }) => <AgendaTemplate data={data as AgendaData} />,
  comparison: ({ data }) => <ComparisonTemplate data={data as ComparisonData} />,
  brain: ({ data }) => <BrainTemplate data={data as BrainData} />,
  budget: ({ data }) => <BudgetTemplate data={data as BudgetData} />,
  business: ({ data }) => <BusinessTemplate data={data as BusinessData} />,
  decisionTree: ({ data }) => <DecisionTreeTemplate data={data as DecisionTreeData} />,
  goals: ({ data }) => <GoalsTemplate data={data as GoalsData} />,
  manufacturing: ({ data }) => <ManufacturingTemplate data={data as ManufacturingData} />,
  valueChain: ({ data }) => <ValueChainTemplate data={data as ValueChainData} />,
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
