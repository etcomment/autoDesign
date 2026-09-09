import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import {
  PictogramGrid,
  WorldMapVector,
  MiniAreaChart,
  MiniBarChart,
  type PictogramCategory,
  type AreaSeries,
  type BarGroup,
} from '../shared/charts'
import { Dashboard5Node } from './Dashboard5Node'
import { Dashboard5ConcentricArcs, Dashboard5HorizontalBars } from './Dashboard5Widgets'

interface NodeItem {
  identifier: string
  number: string
  title: string
  description: string
  color: string
}

const DEFAULT_CATEGORIES: PictogramCategory[] = [
  { count: 12, color: '#1e2652', percent: '25%' },
  { count: 15, color: '#2e65c8', percent: '30%' },
  { count: 10, color: '#f05338', percent: '20%' },
  { count: 8, color: '#fdb813', percent: '20%' },
  { count: 5, color: '#4ebe96', percent: '20%' },
]

const DEFAULT_AREA_SERIES: AreaSeries[] = [
  { points: [6, 12, 6, 16, 9, 24, 6], color: '#fdb813', opacity: 0.9 },
  { points: [5, 9, 4, 13, 7, 18, 5], color: '#f05338', opacity: 0.85 },
  { points: [3, 6, 3, 8, 5, 11, 4], color: '#2e65c8', opacity: 0.95 },
  { points: [2, 4, 2, 5, 3, 6, 3], color: '#1e2652', opacity: 1 },
]

const DEFAULT_HISTOGRAM_GROUPS: BarGroup[] = [
  { values: [22, 14], colors: ['#2e65c8', '#fdb813'] },
  { values: [30, 18, 36], colors: ['#2e65c8', '#f05338', '#fdb813'] },
  { values: [24, 16, 20, 18], colors: ['#1e2652', '#2e65c8', '#f05338', '#fdb813'] },
  { values: [32, 38, 22], colors: ['#1e2652', '#f05338', '#2e65c8'] },
  { values: [36, 18, 12, 16], colors: ['#1e2652', '#2e65c8', '#f05338', '#fdb813'] },
]

const NODE_COLORS = ['#1e2652', '#2e65c8', '#f05338', '#fdb813', '#4ebe96', '#ea6c8d']

export function Dashboard5Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedElementIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const positions = useTemplateStore(state => state.templateElementPositions)
  const templateElementColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)

  const metrics = data.metrics ?? []
  const nodeItems: NodeItem[] = Array.from({ length: 6 }).map((_, index) => {
    const metric = metrics[index]
    const numberString = index < 9 ? `0${index + 1}` : `${index + 1}`
    return {
      identifier: `node-${index}`,
      number: numberString,
      title: metric?.label ?? 'Your title',
      description: metric?.description ?? 'MIGSO-PCUBED content and words to be added here as required',
      color: NODE_COLORS[index]!,
    }
  })

  const pictogramBoundingBox = {
    x: positions['pictogram-grid']?.x ?? 40,
    y: positions['pictogram-grid']?.y ?? 50,
    width: positions['pictogram-grid']?.width ?? 230,
    height: positions['pictogram-grid']?.height ?? 90,
  }

  const badgesBoundingBox = {
    x: positions['top-badges']?.x ?? 320,
    y: positions['top-badges']?.y ?? 55,
    width: positions['top-badges']?.width ?? 200,
    height: positions['top-badges']?.height ?? 80,
  }

  const areaChartBoundingBox = {
    x: positions['area-chart']?.x ?? 590,
    y: positions['area-chart']?.y ?? 45,
    width: positions['area-chart']?.width ?? 270,
    height: positions['area-chart']?.height ?? 95,
  }

  const concentricArcsBoundingBox = {
    x: positions['bottom-concentric-arcs']?.x ?? 160,
    y: positions['bottom-concentric-arcs']?.y ?? 430,
    width: positions['bottom-concentric-arcs']?.width ?? 180,
    height: positions['bottom-concentric-arcs']?.height ?? 110,
  }

  const histogramBoundingBox = {
    x: positions['bottom-histogram']?.x ?? 430,
    y: positions['bottom-histogram']?.y ?? 440,
    width: positions['bottom-histogram']?.width ?? 170,
    height: positions['bottom-histogram']?.height ?? 80,
  }

  const horizontalBarsBoundingBox = {
    x: positions['bottom-horizontal-bars']?.x ?? 680,
    y: positions['bottom-horizontal-bars']?.y ?? 430,
    width: positions['bottom-horizontal-bars']?.width ?? 230,
    height: positions['bottom-horizontal-bars']?.height ?? 100,
  }

  const horizontalBarData = [
    { value: '30', color: '#1e2652', barWidth: 140 },
    { value: '19', color: '#2e65c8', barWidth: 90 },
    { value: '18', color: '#f05338', barWidth: 85 },
    { value: '28', color: '#fdb813', barWidth: 130 },
  ]

  const concentricArcColors: [string, string, string] = [
    templateElementColors['bottom-arc-0'] ?? '#1e2652',
    templateElementColors['bottom-arc-1'] ?? '#2e65c8',
    templateElementColors['bottom-arc-2'] ?? '#f05338',
  ]

  return (
    <g ref={svgRef}>
      <WorldMapVector x={30} y={150} width={900} height={280} fill="#edf2f7" opacity={0.65} />

      <g
        data-element-id="pictogram-grid"
        transform={getTransform('pictogram-grid', pictogramBoundingBox)}
        onMouseDown={event => startDrag(event, 'pictogram-grid', pictogramBoundingBox)}
        style={{ cursor: 'pointer' }}
      >
        <PictogramGrid
          x={pictogramBoundingBox.x}
          y={pictogramBoundingBox.y}
          width={pictogramBoundingBox.width}
          height={pictogramBoundingBox.height}
          categories={DEFAULT_CATEGORIES}
          totalItems={50}
          columns={10}
          rows={5}
        />
        {selectedElementIds.has('pictogram-grid') && renderHandles(pictogramBoundingBox, 'pictogram-grid')}
      </g>

      <g
        data-element-id="top-badges"
        transform={getTransform('top-badges', badgesBoundingBox)}
        onMouseDown={event => startDrag(event, 'top-badges', badgesBoundingBox)}
        style={{ cursor: 'pointer' }}
      >
        {[
          { value: '27%', color: templateElementColors['badge-0'] ?? '#1e2652', radius: 24, offsetX: 35 },
          { value: '35%', color: templateElementColors['badge-1'] ?? '#2e65c8', radius: 28, offsetX: 80 },
          { value: '27%', color: templateElementColors['badge-2'] ?? '#f05338', radius: 24, offsetX: 125 },
          { value: '15%', color: templateElementColors['badge-3'] ?? '#fdb813', radius: 20, offsetX: 168 },
        ].map((badge, badgeIndex) => {
          const circleX = badgesBoundingBox.x + badge.offsetX
          const circleY = badgesBoundingBox.y + badgesBoundingBox.height / 2
          return (
            <g key={badgeIndex}>
              <circle cx={circleX} cy={circleY} r={badge.radius} fill={badge.color} />
              <text
                x={circleX}
                y={circleY + 5}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={13}
                fontWeight={700}
                fontFamily="Arial, sans-serif"
              >
                {badge.value}
              </text>
            </g>
          )
        })}
        {selectedElementIds.has('top-badges') && renderHandles(badgesBoundingBox, 'top-badges')}
      </g>

      <g
        data-element-id="area-chart"
        transform={getTransform('area-chart', areaChartBoundingBox)}
        onMouseDown={event => startDrag(event, 'area-chart', areaChartBoundingBox)}
        style={{ cursor: 'pointer' }}
      >
        <MiniAreaChart
          x={areaChartBoundingBox.x}
          y={areaChartBoundingBox.y}
          width={areaChartBoundingBox.width}
          height={areaChartBoundingBox.height}
          series={DEFAULT_AREA_SERIES}
          showBaseline={false}
        />
        {selectedElementIds.has('area-chart') && renderHandles(areaChartBoundingBox, 'area-chart')}
      </g>

      {nodeItems.map((item, index) => {
        const isEven = index % 2 === 0
        const defaultCenterX = 105 + index * 150
        const defaultBoundingBox = isEven
          ? { x: defaultCenterX - 34, y: 155, width: 180, height: 165 }
          : { x: defaultCenterX - 145, y: 250, width: 180, height: 165 }

        const customPosition = positions[item.identifier]
        const boundingBox = {
          x: customPosition?.x ?? defaultBoundingBox.x,
          y: customPosition?.y ?? defaultBoundingBox.y,
          width: customPosition?.width ?? defaultBoundingBox.width,
          height: customPosition?.height ?? defaultBoundingBox.height,
        }

        const isSelected = selectedElementIds.has(item.identifier)
        const nodeColor = templateElementColors[item.identifier] ?? item.color
        const strokeColor = templateStrokeColors[item.identifier] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[item.identifier] ?? (isSelected ? 2 : 0)

        return (
          <Dashboard5Node
            key={item.identifier}
            identifier={item.identifier}
            number={item.number}
            title={item.title}
            description={item.description}
            color={nodeColor}
            index={index}
            boundingBox={boundingBox}
            isSelected={isSelected}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            transform={getTransform(item.identifier, boundingBox)}
            onMouseDown={event => startDrag(event, item.identifier, boundingBox)}
            renderHandles={renderHandles}
          />
        )
      })}

      <Dashboard5ConcentricArcs
        boundingBox={concentricArcsBoundingBox}
        colors={concentricArcColors}
        isSelected={selectedElementIds.has('bottom-concentric-arcs')}
        transform={getTransform('bottom-concentric-arcs', concentricArcsBoundingBox)}
        onMouseDown={event => startDrag(event, 'bottom-concentric-arcs', concentricArcsBoundingBox)}
        renderHandles={renderHandles}
      />

      <g
        data-element-id="bottom-histogram"
        transform={getTransform('bottom-histogram', histogramBoundingBox)}
        onMouseDown={event => startDrag(event, 'bottom-histogram', histogramBoundingBox)}
        style={{ cursor: 'pointer' }}
      >
        <MiniBarChart
          x={histogramBoundingBox.x}
          y={histogramBoundingBox.y}
          width={histogramBoundingBox.width}
          height={histogramBoundingBox.height}
          groups={DEFAULT_HISTOGRAM_GROUPS}
          showBaseline={false}
        />
        {selectedElementIds.has('bottom-histogram') && renderHandles(histogramBoundingBox, 'bottom-histogram')}
      </g>

      <Dashboard5HorizontalBars
        boundingBox={horizontalBarsBoundingBox}
        bars={horizontalBarData}
        isSelected={selectedElementIds.has('bottom-horizontal-bars')}
        transform={getTransform('bottom-horizontal-bars', horizontalBarsBoundingBox)}
        onMouseDown={event => startDrag(event, 'bottom-horizontal-bars', horizontalBarsBoundingBox)}
        renderHandles={renderHandles}
      />
    </g>
  )
}
