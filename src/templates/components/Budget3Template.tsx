import { useRef, type ReactElement } from 'react'
import type { BudgetData, BudgetItem } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const DEFAULT_ITEMS: BudgetItem[] = [
  { label: 'JANUARY', amount: '£17,300', percentage: 70, color: '#1a2249' },
  { label: 'FEBRUARY', amount: '£7,600', percentage: 30, color: '#2b63d9' },
  { label: 'MARCH', amount: '£15,200', percentage: 60, color: '#ff5338' },
  { label: 'APRIL', amount: '£4,000', percentage: 16, color: '#ffb100' },
  { label: 'MAY', amount: '£25,000', percentage: 100, color: '#1a2249' },
  { label: 'JUNE', amount: '£2,000', percentage: 8, color: '#2b63d9' },
  { label: 'JULY', amount: '£5,000', percentage: 20, color: '#ff5338' },
]

function extractNumericValue(item: BudgetItem): number {
  if (item.percentage && item.percentage > 0) {
    return item.percentage
  }
  const raw = item.amount || item.value || ''
  const cleaned = raw.replace(/[^0-9.-]/g, '')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 10 : parsed
}

export function Budget3Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const items = data.items && data.items.length > 0 ? data.items : DEFAULT_ITEMS
  const count = Math.max(1, items.length)

  const values = items.map(extractNumericValue)
  const maxValue = Math.max(1, ...values)

  const canvasWidth = 1000
  const startX = 60
  const availableW = canvasWidth - startX * 2
  const baselineY = 440
  const stepX = availableW / count
  const coneBaseWidth = Math.min(84, stepX * 0.72)
  const minConeHeight = 45
  const maxConeHeight = 280
  const ringRadius = 13

  const subtitle = data.subtitle ?? 'MIGSO-PCUBED content and words to be added here as required'

  return (
    <g ref={svgRef}>
      <line
        x1={startX - 10}
        y1={baselineY}
        x2={startX + availableW + 10}
        y2={baselineY}
        stroke="#cbd5e1"
        strokeWidth={2.5}
      />

      {items.map((item, index) => {
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const value = values[index] ?? 10
        const ratio = Math.max(0.1, Math.min(1, value / maxValue))
        const coneHeight = minConeHeight + ratio * (maxConeHeight - minConeHeight)
        const cx = startX + (index + 0.5) * stepX
        const apexY = baselineY - coneHeight

        const defaultBbox = {
          x: cx - coneBaseWidth / 2,
          y: apexY - ringRadius * 2 - 32,
          width: coneBaseWidth,
          height: coneHeight + ringRadius * 2 + 70,
        }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const amountText = item.amount || item.value || `${value}`
        const ringCenterY = apexY - ringRadius - 2
        const amountY = ringCenterY - ringRadius - 10

        const trianglePoints = [
          `${cx - coneBaseWidth / 2},${baselineY}`,
          `${cx},${apexY}`,
          `${cx + coneBaseWidth / 2},${baselineY}`,
        ].join(' ')

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <polygon
              points={trianglePoints}
              fill={color}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            <circle
              cx={cx}
              cy={ringCenterY}
              r={ringRadius}
              fill="#ffffff"
              stroke={color}
              strokeWidth={4.5}
            />

            <text
              x={cx}
              y={amountY}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight={700}
              fill="#1e293b"
            >
              {amountText}
            </text>

            <text
              x={cx}
              y={baselineY + 28}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight={700}
              fill="#1e293b"
            >
              {item.label}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {subtitle && (
        <text
          x={500}
          y={baselineY + 75}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={13}
          fill="#475569"
        >
          {subtitle}
        </text>
      )}
    </g>
  )
}
