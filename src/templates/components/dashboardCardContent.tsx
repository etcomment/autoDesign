import type { ReactElement } from 'react'
import type { DashboardMetric } from '../types'
import { MiniLineChart } from '../shared/charts/MiniLineChart'
import { MiniBarChart } from '../shared/charts/MiniBarChart'
import { MiniPieChart } from '../shared/charts/MiniPieChart'
import { ArcGauge } from '../shared/charts/ArcGauge'
import { TEMPLATE_ICONS } from '../shared/icons'
import {
  CommentsIcon,
  UsersFemaleIcon,
  FilesIcon,
  MoneyBagChessIcon,
} from './dashboardIcons'

export interface CardBoundingBox {
  x: number
  y: number
  width: number
  height: number
}

const TIMELINE_YEARS = ['2014', '2015', '2016', '2017', '2018', '2019']
const DEFAULT_VISITORS_POINTS = [68, 48, 62, 75, 66, 78]
const DEFAULT_BAR_HEIGHTS = [35, 20, 35, 50, 60, 80]
const DEFAULT_PIE_VALUES = [55, 20, 15, 10]
const PIE_SHADES = ['#ffffff', '#f3f4f6', '#9ca3af', '#4b5563']

function renderIconCard(
  bbox: CardBoundingBox,
  value: string,
  iconNode: ReactElement
): ReactElement {
  return (
    <g>
      {iconNode}
      {value && (
        <text
          x={bbox.x + bbox.width - 16}
          y={bbox.y + bbox.height - 18}
          textAnchor="end"
          fontFamily="Arial, sans-serif"
          fontSize={13}
          fontWeight={700}
          fill="#ffffff"
        >
          {value}
        </text>
      )}
    </g>
  )
}

export function renderDashboardCardContent(
  index: number,
  bbox: CardBoundingBox,
  value: string,
  metric?: DashboardMetric
): ReactElement | null {
  const chartType = metric?.chart?.toLowerCase()
  const seriesData = metric?.series

  if (chartType === 'line' || chartType === 'curve') {
    const points = seriesData && seriesData.length > 0 ? seriesData : DEFAULT_VISITORS_POINTS
    return (
      <MiniLineChart
        x={bbox.x + 22}
        y={bbox.y + 45}
        width={Math.max(10, bbox.width - 44)}
        height={Math.max(10, bbox.height - 65)}
        series={[{ points, color: '#ffffff', strokeWidth: 3 }]}
        labels={TIMELINE_YEARS}
        showBaseline={true}
        gridColor="rgba(255, 255, 255, 0.45)"
        textColor="#ffffff"
        fontSize={12}
      />
    )
  }

  if (chartType === 'bar' || chartType === 'bars') {
    const barGroups = TIMELINE_YEARS.map((year, yearIndex) => ({
      label: year,
      values: [seriesData?.[yearIndex] ?? DEFAULT_BAR_HEIGHTS[yearIndex] ?? 30],
    }))
    return (
      <MiniBarChart
        x={bbox.x + 22}
        y={bbox.y + 55}
        width={Math.max(10, bbox.width - 44)}
        height={Math.max(10, bbox.height - 75)}
        groups={barGroups}
        showBaseline={true}
        baselineColor="rgba(255, 255, 255, 0.45)"
        textColor="#ffffff"
        fontSize={12}
        defaultColors={['#ffffff']}
        barRadius={0}
      />
    )
  }

  if (chartType === 'pie' || chartType === 'donut') {
    const pieValues = seriesData && seriesData.length >= 4 ? seriesData : DEFAULT_PIE_VALUES
    const pieSlices = pieValues.map((val, sliceIndex) => ({
      value: val,
      color: PIE_SHADES[sliceIndex % PIE_SHADES.length]!,
    }))
    return (
      <MiniPieChart
        cx={bbox.x + bbox.width / 2}
        cy={bbox.y + bbox.height / 2 + 10}
        radius={Math.min(bbox.width, bbox.height) * 0.28}
        slices={pieSlices}
      />
    )
  }

  if (chartType === 'gauge') {
    const numericValue = parseFloat(value) || 50
    return (
      <g transform={`translate(0, 10)`}>
        <ArcGauge
          cx={bbox.x + bbox.width / 2}
          cy={bbox.y + bbox.height * 0.7}
          radius={Math.min(bbox.width * 0.38, bbox.height * 0.38)}
          innerRadius={Math.min(bbox.width * 0.22, bbox.height * 0.22)}
          value={numericValue}
        />
      </g>
    )
  }

  const CustomIcon = metric?.icon ? TEMPLATE_ICONS[metric.icon] : undefined
  if (CustomIcon) {
    const iconSize = Math.min(bbox.width * 0.35, 48)
    return renderIconCard(
      bbox,
      value,
      <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
        <CustomIcon size={iconSize} color="#ffffff" />
      </g>
    )
  }

  if (chartType === 'stat' || chartType === 'icon') {
    const iconSize = Math.min(bbox.width * 0.35, 52)
    return renderIconCard(
      bbox,
      value,
      <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
        <MoneyBagChessIcon size={iconSize} color="#ffffff" />
      </g>
    )
  }

  if (index === 0) {
    const points = seriesData && seriesData.length > 0 ? seriesData : DEFAULT_VISITORS_POINTS
    return (
      <MiniLineChart
        x={bbox.x + 22}
        y={bbox.y + 45}
        width={Math.max(10, bbox.width - 44)}
        height={Math.max(10, bbox.height - 65)}
        series={[{ points, color: '#ffffff', strokeWidth: 3 }]}
        labels={TIMELINE_YEARS}
        showBaseline={true}
        gridColor="rgba(255, 255, 255, 0.45)"
        textColor="#ffffff"
        fontSize={12}
      />
    )
  }

  if (index === 1) {
    const iconSize = Math.min(bbox.width * 0.45, 56)
    return renderIconCard(
      bbox,
      value,
      <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
        <CommentsIcon size={iconSize} color="#ffffff" />
      </g>
    )
  }

  if (index === 2) {
    const iconSize = Math.min(bbox.width * 0.45, 56)
    return renderIconCard(
      bbox,
      value,
      <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
        <UsersFemaleIcon size={iconSize} color="#ffffff" />
      </g>
    )
  }

  if (index === 3) {
    const iconSize = Math.min(bbox.width * 0.35, 56)
    return renderIconCard(
      bbox,
      value,
      <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
        <FilesIcon size={iconSize} color="#ffffff" />
      </g>
    )
  }

  if (index === 4) {
    const barGroups = TIMELINE_YEARS.map((year, yearIndex) => ({
      label: year,
      values: [seriesData?.[yearIndex] ?? DEFAULT_BAR_HEIGHTS[yearIndex] ?? 30],
    }))
    return (
      <MiniBarChart
        x={bbox.x + 22}
        y={bbox.y + 55}
        width={Math.max(10, bbox.width - 44)}
        height={Math.max(10, bbox.height - 75)}
        groups={barGroups}
        showBaseline={true}
        baselineColor="rgba(255, 255, 255, 0.45)"
        textColor="#ffffff"
        fontSize={12}
        defaultColors={['#ffffff']}
        barRadius={0}
      />
    )
  }

  if (index === 5) {
    const pieValues = seriesData && seriesData.length >= 4 ? seriesData : DEFAULT_PIE_VALUES
    const pieSlices = pieValues.map((val, sliceIndex) => ({
      value: val,
      color: PIE_SHADES[sliceIndex % PIE_SHADES.length]!,
    }))
    return (
      <MiniPieChart
        cx={bbox.x + bbox.width / 2}
        cy={bbox.y + bbox.height / 2 + 10}
        radius={Math.min(bbox.width, bbox.height) * 0.28}
        slices={pieSlices}
      />
    )
  }

  if (index === 6) {
    const iconSize = Math.min(bbox.width * 0.35, 56)
    return renderIconCard(
      bbox,
      value,
      <g transform={`translate(${bbox.x + bbox.width / 2 - iconSize / 2}, ${bbox.y + bbox.height / 2 - iconSize / 2})`}>
        <MoneyBagChessIcon size={iconSize} color="#ffffff" />
      </g>
    )
  }

  return null
}
