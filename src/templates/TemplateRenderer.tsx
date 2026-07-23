import type { ReactElement } from 'react'
import type {
  TemplateData,
  TemplateType,
  RoadmapData,
  ProductRoadmapData,
  StrategyData,
  ProcessData,
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
import { ProductRoadmapTemplate } from './components/ProductRoadmapTemplate'
import { StrategyTemplate } from './components/StrategyTemplate'
import { ProcessTemplate } from './components/ProcessTemplate'
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
  productRoadmap: ({ data }) => <ProductRoadmapTemplate data={data as ProductRoadmapData} />,
  strategy: ({ data }) => <StrategyTemplate data={data as StrategyData} />,
  process: ({ data }) => <ProcessTemplate data={data as ProcessData} />,
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
    <g>
      <Component data={templateData} />
    </g>
  )
}
