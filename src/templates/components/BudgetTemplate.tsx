import { useRef, type ReactElement } from 'react'
import type { BudgetData, BudgetItem } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const DEFAULT_ITEMS: BudgetItem[] = [
  {
    label: 'Budget',
    amount: '£50,000',
    color: '#1a2249',
    bullets: [
      'MIGSO-PCUBED content and words',
      'to be added here as required',
      'MIGSO-PCUBED content and words',
      'to be added here as required',
    ],
  },
  {
    label: 'Spending',
    amount: '£30,000',
    color: '#2b63d9',
    bullets: [
      'MIGSO-PCUBED content and words',
      'to be added here as required',
      'MIGSO-PCUBED content and words',
      'to be added here as required',
    ],
  },
  {
    label: 'Saving',
    amount: '£20,000',
    color: '#ff5338',
    bullets: [
      'MIGSO-PCUBED content and words',
      'to be added here as required',
      'MIGSO-PCUBED content and words',
      'to be added here as required',
    ],
  },
]

function createHeaderBadgePath(x: number, y: number, width: number, height: number): string {
  const rTopLeft = 24
  const rBottomRight = 24
  const rSmall = 4

  return [
    `M ${x + rTopLeft} ${y}`,
    `L ${x + width - rSmall} ${y}`,
    `Q ${x + width} ${y} ${x + width} ${y + rSmall}`,
    `L ${x + width} ${y + height - rBottomRight}`,
    `Q ${x + width} ${y + height} ${x + width - rBottomRight} ${y + height}`,
    `L ${x + rSmall} ${y + height}`,
    `Q ${x} ${y + height} ${x} ${y + height - rSmall}`,
    `L ${x} ${y + rTopLeft}`,
    `Q ${x} ${y} ${x + rTopLeft} ${y}`,
    'Z',
  ].join(' ')
}

export function BudgetTemplate({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const items = data.items && data.items.length > 0 ? data.items : DEFAULT_ITEMS
  const count = Math.max(1, items.length)

  const canvasWidth = 1000
  const startX = 60
  const totalAvailableWidth = canvasWidth - startX * 2
  const gap = count > 1 ? Math.max(20, Math.min(45, (totalAvailableWidth - count * 260) / (count - 1))) : 20
  const colWidth = Math.min(280, (totalAvailableWidth - (count - 1) * gap) / count)
  const headerHeight = 58
  const headerY = 70
  const dividerY = headerY + headerHeight + 24
  const bulletsStartY = dividerY + 36

  return (
    <g ref={svgRef}>
      <line
        x1={startX}
        y1={dividerY}
        x2={startX + count * colWidth + (count - 1) * gap}
        y2={dividerY}
        stroke="#cbd5e1"
        strokeWidth={1.5}
      />

      {items.map((item, index) => {
        const elementId = `item-${index}`
        const color = templateColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = templateStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const defaultX = startX + index * (colWidth + gap)
        const defaultHeight = 440
        const defaultBbox = { x: defaultX, y: headerY, width: colWidth, height: defaultHeight }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const rawBullets = item.bullets && item.bullets.length > 0
          ? item.bullets
          : item.subtitle
            ? item.subtitle.split('\n')
            : DEFAULT_ITEMS[index % DEFAULT_ITEMS.length]?.bullets ?? []

        const amount = item.amount || item.value || DEFAULT_ITEMS[index % DEFAULT_ITEMS.length]?.amount || '£0'

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={createHeaderBadgePath(bbox.x, bbox.y, bbox.width, headerHeight)}
              fill={color}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + headerHeight / 2 + 7}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={20}
              fontWeight={700}
              fill="#ffffff"
            >
              {item.label}
            </text>

            {rawBullets.map((bulletText: string, bulletIndex: number) => {
              const bulletY = bulletsStartY + bulletIndex * 42
              const wrappedLines = wrapTextByWidth(bulletText, Math.max(16, Math.floor(bbox.width / 11)))

              return (
                <g key={`bullet-${bulletIndex}`}>
                  <rect
                    x={bbox.x + 12}
                    y={bulletY + 3}
                    width={7}
                    height={7}
                    fill={color}
                  />

                  <text
                    x={bbox.x + 28}
                    y={bulletY + 10}
                    fontFamily="Arial, sans-serif"
                    fontSize={13}
                    fill="#334155"
                  >
                    {wrappedLines.map((line, lineIdx) => (
                      <tspan
                        key={lineIdx}
                        x={bbox.x + 28}
                        dy={lineIdx === 0 ? 0 : 17}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              )
            })}

            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + bbox.height - 30}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={34}
              fontWeight={800}
              fill={color}
            >
              {amount}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
