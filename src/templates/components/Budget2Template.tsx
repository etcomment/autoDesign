import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const DEFAULT_ITEMS = [
  { label: '2015', percentage: 50, percent: '50%', color: '#1a2249' },
  { label: '2016', percentage: 60, percent: '60%', color: '#2b63d9' },
  { label: '2017', percentage: 67, percent: '67%', color: '#ff5338' },
  { label: '2018', percentage: 72, percent: '72%', color: '#ffb100' },
  { label: '2019', percentage: 80, percent: '80%', color: '#4ebe96' },
]

export function Budget2Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const items = data.items && data.items.length > 0 ? data.items : DEFAULT_ITEMS
  const count = Math.max(1, items.length)

  const totalW = 1000
  const startY = 60
  const availableH = 380
  const gap = count > 1 ? Math.max(14, Math.min(26, (availableH - count * 42) / (count - 1))) : 20
  const barHeight = Math.min(44, (availableH - (count - 1) * gap) / count)

  const labelX = 140
  const trackX = 220
  const trackWidth = 560
  const pctX = trackX + trackWidth + 40

  const subtitle = data.subtitle ?? 'MIGSO-PCUBED content and words to be added here as required'

  return (
    <g ref={svgRef}>
      {items.map((item, index) => {
        const rowY = startY + index * (barHeight + gap)
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        let rawPercentage = item.percentage ?? (item.percent ? parseFloat(item.percent.replace('%', '')) : 0)
        if (isNaN(rawPercentage)) rawPercentage = 0
        const percentage = Math.max(0, Math.min(100, rawPercentage))
        const fillWidth = (percentage / 100) * trackWidth

        const defaultBbox = { x: 80, y: rowY, width: totalW - 160, height: barHeight }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const displayPercent = item.percent || `${percentage}%`

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={labelX}
              y={bbox.y + bbox.height / 2 + 10}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={28}
              fontWeight={700}
              fill={color}
            >
              {item.label}
            </text>

            <rect
              x={trackX}
              y={bbox.y}
              width={trackWidth}
              height={bbox.height}
              fill="#edf0f5"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            <rect
              x={trackX}
              y={bbox.y}
              width={fillWidth}
              height={bbox.height}
              fill={color}
            />

            <text
              x={pctX}
              y={bbox.y + bbox.height / 2 + 10}
              textAnchor="start"
              fontFamily="Arial, sans-serif"
              fontSize={28}
              fontWeight={700}
              fill={color}
            >
              {displayPercent}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      {subtitle && (
        <text
          x={500}
          y={startY + count * (barHeight + gap) + 36}
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
