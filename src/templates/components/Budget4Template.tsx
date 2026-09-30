import { useRef, type ReactElement } from 'react'
import type { BudgetData, BudgetItem } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const DEFAULT_ITEMS: BudgetItem[] = [
  {
    label: 'Your title 01',
    subtitle: 'MIGSO-PCUBED content and words to be added here as required',
    percentage: 72,
    percent: '72%',
    color: '#1a2249',
  },
  {
    label: 'Your title 02',
    subtitle: 'MIGSO-PCUBED content and words to be added here as required',
    percentage: 68,
    percent: '68%',
    color: '#2b63d9',
  },
  {
    label: 'Your title 03',
    subtitle: 'MIGSO-PCUBED content and words to be added here as required',
    percentage: 56,
    percent: '56%',
    color: '#ff5338',
  },
  {
    label: 'Your title 04',
    subtitle: 'MIGSO-PCUBED content and words to be added here as required',
    percentage: 44,
    percent: '44%',
    color: '#ffb100',
  },
]

function createArcPath(cx: number, cy: number, radius: number, percent: number): string {
  const clamped = Math.max(0.1, Math.min(99.99, percent))
  const startAngle = -90
  const endAngle = startAngle + (clamped / 100) * 360

  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180

  const x1 = cx + radius * Math.cos(startRad)
  const y1 = cy + radius * Math.sin(startRad)
  const x2 = cx + radius * Math.cos(endRad)
  const y2 = cy + radius * Math.sin(endRad)

  const largeArcFlag = clamped > 50 ? 1 : 0

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
}

export function Budget4Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const items = data.items && data.items.length > 0 ? data.items : DEFAULT_ITEMS
  const count = Math.max(1, items.length)

  const cols = count <= 3 ? count : 2
  const rows = Math.ceil(count / cols)

  const canvasWidth = 1000
  const startX = 60
  const startY = 60
  const totalW = canvasWidth - startX * 2
  const gapX = 40
  const gapY = 40
  const cardWidth = (totalW - (cols - 1) * gapX) / cols
  const cardHeight = Math.min(200, (460 - (rows - 1) * gapY) / rows)
  const ringRadius = Math.min(54, cardHeight * 0.38)
  const strokeThickness = Math.min(18, ringRadius * 0.36)

  return (
    <g ref={svgRef}>
      {items.map((item, index) => {
        const colIndex = index % cols
        const rowIndex = Math.floor(index / cols)
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const defaultX = startX + colIndex * (cardWidth + gapX)
        const defaultY = startY + rowIndex * (cardHeight + gapY)
        const defaultBbox = { x: defaultX, y: defaultY, width: cardWidth, height: cardHeight }

        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        let rawPct = item.percentage ?? (item.percent ? parseFloat(item.percent.replace('%', '')) : 0)
        if (isNaN(rawPct)) rawPct = 0
        const percentage = Math.max(0, Math.min(100, rawPct))
        const displayPercent = item.percent || `${percentage}%`

        const donutCx = bbox.x + ringRadius + strokeThickness + 10
        const donutCy = bbox.y + bbox.height / 2
        const textStartX = donutCx + ringRadius + strokeThickness + 24
        const textMaxWidth = Math.max(100, bbox.width - (textStartX - bbox.x) - 10)

        const titleText = item.label
        const subtitleText = item.subtitle ?? 'MIGSO-PCUBED content and words to be added here as required'
        const descLines = wrapTextByWidth(subtitleText, Math.max(16, Math.floor(textMaxWidth / 8.5)))

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            <circle
              cx={donutCx}
              cy={donutCy}
              r={ringRadius}
              fill="none"
              stroke="#d1d5db"
              strokeWidth={strokeThickness}
            />

            <path
              d={createArcPath(donutCx, donutCy, ringRadius, percentage)}
              fill="none"
              stroke={color}
              strokeWidth={strokeThickness}
            />

            <text
              x={donutCx}
              y={donutCy + 9}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={26}
              fontWeight={800}
              fill={color}
            >
              {displayPercent}
            </text>

            <text
              x={textStartX}
              y={bbox.y + bbox.height / 2 - 20}
              fontFamily="Arial, sans-serif"
              fontSize={18}
              fontWeight={700}
              fill="#1a2249"
            >
              {titleText}
            </text>

            <text
              x={textStartX}
              y={bbox.y + bbox.height / 2 + 6}
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fill="#4b5563"
            >
              {descLines.map((line, lIdx) => (
                <tspan key={lIdx} x={textStartX} dy={lIdx === 0 ? 0 : 17}>
                  {line}
                </tspan>
              ))}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}