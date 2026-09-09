import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { ArcGauge, type ArcGaugeSegment } from '../shared/charts/ArcGauge'

interface GaugeConfig {
  defaultCenterX: number
  defaultCenterY: number
  fallbackLabel: string
  fallbackValue: number
  fallbackDescription: string
}

const GAUGE_CONFIGURATIONS: GaugeConfig[] = [
  {
    defaultCenterX: 190,
    defaultCenterY: 255,
    fallbackLabel: 'Leadership',
    fallbackValue: 25,
    fallbackDescription: 'MIGSO-PCUBED content and words to be added here as required',
  },
  {
    defaultCenterX: 480,
    defaultCenterY: 255,
    fallbackLabel: 'Talent',
    fallbackValue: 50,
    fallbackDescription: 'MIGSO-PCUBED content and words to be added here as required',
  },
  {
    defaultCenterX: 770,
    defaultCenterY: 255,
    fallbackLabel: 'Market',
    fallbackValue: 85,
    fallbackDescription: 'MIGSO-PCUBED content and words to be added here as required',
  },
  {
    defaultCenterX: 335,
    defaultCenterY: 445,
    fallbackLabel: 'Strategy',
    fallbackValue: 35,
    fallbackDescription: 'MIGSO-PCUBED content and words to be added here as required',
  },
  {
    defaultCenterX: 625,
    defaultCenterY: 445,
    fallbackLabel: 'Culture',
    fallbackValue: 65,
    fallbackDescription: 'MIGSO-PCUBED content and words to be added here as required',
  },
]

const DEFAULT_SEGMENTS: ArcGaugeSegment[] = [
  { color: '#262261' },
  { color: '#2e65c8' },
  { color: '#f05338' },
  { color: '#fdb813' },
  { color: '#4ebe96' },
]

function parseNumericValue(valueString: string | undefined, fallbackValue: number): number {
  if (!valueString) return fallbackValue
  const parsedNumber = parseFloat(valueString.replace(/[^0-9.]/g, ''))
  return isNaN(parsedNumber) ? fallbackValue : parsedNumber
}

function computeGaugeCenter(index: number, count: number): { x: number; y: number } {
  if (count === 5 && index < GAUGE_CONFIGURATIONS.length) {
    return {
      x: GAUGE_CONFIGURATIONS[index]!.defaultCenterX,
      y: GAUGE_CONFIGURATIONS[index]!.defaultCenterY,
    }
  }

  if (count === 1) {
    return { x: 480, y: 330 }
  }

  if (count === 2) {
    const xs = [300, 660]
    return { x: xs[index]!, y: 330 }
  }

  if (count === 3) {
    const xs = [190, 480, 770]
    return { x: xs[index]!, y: 330 }
  }

  if (count === 4) {
    const xs = [320, 640, 320, 640]
    const ys = [255, 255, 445, 445]
    return { x: xs[index]!, y: ys[index]! }
  }

  const cols = Math.ceil(count / 2)
  const row = Math.floor(index / cols)
  const col = index % cols
  const spacing = 780 / Math.max(1, cols)
  return {
    x: 100 + col * spacing + spacing / 2,
    y: row === 0 ? 255 : 445,
  }
}

export function Kpi1Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedElementIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const positions = useTemplateStore(state => state.templateElementPositions)
  const templateElementColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)

  const displayedMetrics =
    data.metrics && data.metrics.length > 0
      ? data.metrics
      : GAUGE_CONFIGURATIONS.map(c => ({
          label: c.fallbackLabel,
          value: String(c.fallbackValue),
          description: c.fallbackDescription,
        }))

  const count = displayedMetrics.length
  const radius = count > 3 ? 90 : 100
  const innerRadius = count > 3 ? 52 : 58

  return (
    <g ref={svgRef}>
      {displayedMetrics.map((metric, index) => {
        const elementId = `metric-${index}`
        const configuration = GAUGE_CONFIGURATIONS[index % GAUGE_CONFIGURATIONS.length]!
        const label = metric.label || configuration.fallbackLabel
        const description = metric.description || configuration.fallbackDescription
        const numericValue = parseNumericValue(metric.value, configuration.fallbackValue)
        const center = computeGaugeCenter(index, count)

        const defaultBoundingBox = {
          x: center.x - 120,
          y: center.y - 170,
          width: 240,
          height: 180,
        }

        const customPosition = positions[elementId]
        const boundingBox = {
          x: customPosition?.x ?? defaultBoundingBox.x,
          y: customPosition?.y ?? defaultBoundingBox.y,
          width: customPosition?.width ?? defaultBoundingBox.width,
          height: customPosition?.height ?? defaultBoundingBox.height,
        }

        const isSelected = selectedElementIds.has(elementId)
        const customColor = templateElementColors[elementId]
        const needleColor = customColor ?? '#1f2856'
        const titleColor = customColor ?? '#1e2652'
        const strokeColor = templateStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height - 10
        const titleY = boundingBox.y + 18
        const descriptionLines = wrapTextByWidth(description, 34)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            transform={getTransform(elementId, boundingBox)}
            onMouseDown={event => startDrag(event, elementId, boundingBox)}
            style={{ cursor: 'pointer' }}
          >
            {strokeWidth > 0 && (
              <rect
                x={boundingBox.x}
                y={boundingBox.y}
                width={boundingBox.width}
                height={boundingBox.height}
                rx={6}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            )}

            <text
              x={centerX}
              y={titleY}
              textAnchor="middle"
              fill={titleColor}
              fontSize={18}
              fontWeight={700}
              fontFamily="Arial, sans-serif"
            >
              {label}
            </text>

            {descriptionLines.map((line, lineIndex) => (
              <text
                key={lineIndex}
                x={centerX}
                y={titleY + 18 + lineIndex * 14}
                textAnchor="middle"
                fill="#4a5568"
                fontSize={11}
                fontFamily="Arial, sans-serif"
              >
                {line}
              </text>
            ))}

            <ArcGauge
              cx={centerX}
              cy={centerY}
              radius={radius}
              innerRadius={innerRadius}
              value={numericValue}
              min={0}
              max={100}
              segments={DEFAULT_SEGMENTS}
              needleColor={needleColor}
              pivotColor={needleColor}
              innerFill="#f1f5f9"
            />

            {isSelected && renderHandles(boundingBox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
