import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'

export function Budget3Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const items = data.items && data.items.length > 0 ? data.items : [
    { label: 'Category A', percentage: 35, amount: '€35,000' },
    { label: 'Category B', percentage: 25, amount: '€25,000' },
    { label: 'Category C', percentage: 20, amount: '€20,000' },
    { label: 'Category D', percentage: 20, amount: '€20,000' },
  ]
  const totalLabel = data.totalLabel || 'Total'
  const totalAmount = data.totalAmount || '€100,000'

  const W = 900
  const H = 480
  const cx = W / 2
  const cy = H / 2
  const outerR = 150
  const innerR = 85
  const labelR = outerR + 40
  const total = Math.max(1, items.reduce((s, it) => s + it.percentage, 0))

  let cumulative = -90

  return (
    <g ref={svgRef}>
      {items.map((item, i) => {
        const elementId = `item-${i}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!

        const sliceAngle = (item.percentage / total) * 360
        const startAngle = cumulative
        const endAngle = startAngle + sliceAngle
        cumulative = endAngle

        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        const x1o = cx + outerR * Math.cos(startRad)
        const y1o = cy + outerR * Math.sin(startRad)
        const x2o = cx + outerR * Math.cos(endRad)
        const y2o = cy + outerR * Math.sin(endRad)
        const x1i = cx + innerR * Math.cos(startRad)
        const y1i = cy + innerR * Math.sin(startRad)
        const x2i = cx + innerR * Math.cos(endRad)
        const y2i = cy + innerR * Math.sin(endRad)
        const largeArc = sliceAngle > 180 ? 1 : 0

        const d = [
          `M ${x1o} ${y1o}`,
          `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o}`,
          `L ${x2i} ${y2i}`,
          `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1i} ${y1i}`,
          'Z',
        ].join(' ')

        const midAngle = (startAngle + endAngle) / 2
        const midRad = (midAngle * Math.PI) / 180
        const defaultLx = cx + labelR * Math.cos(midRad) - 40
        const defaultLy = cy + labelR * Math.sin(midRad) - 16

        const defaultBbox = { x: defaultLx, y: defaultLy, width: 80, height: 32 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)

        return (
          <g key={elementId}>
            <g
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={d}
                fill={color}
                opacity={isSelected ? 1 : 0.88}
                stroke={isSelected ? '#4a90d9' : 'white'}
                strokeWidth={isSelected ? 2.5 : 2}
              />

              <rect
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
                rx={4}
                fill="white"
                stroke={color}
                strokeWidth={1}
                filter="drop-shadow(0 1px 3px rgba(0,0,0,0.1))"
              />
              <text
                x={bbox.x + bbox.width / 2}
                y={bbox.y + 14}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fontWeight={700}
                fill="#333"
              >
                {item.label}
              </text>
              <text
                x={bbox.x + bbox.width / 2}
                y={bbox.y + 26}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={9}
                fill={color}
              >
                {Math.round(item.percentage)}%
              </text>
              {item.icon && (() => {
                const IconFn = TEMPLATE_ICONS[item.icon]
                return IconFn ? (
                  <g transform={`translate(${bbox.x + bbox.width / 2 - 8}, ${bbox.y + bbox.height - 14})`}>
                    <IconFn size={16} color={color} />
                  </g>
                ) : null
              })()}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Center Donut Hole summary */}
      {(() => {
        const centerId = 'donut-center'
        const defaultBbox = { x: cx - innerR, y: cy - innerR, width: innerR * 2, height: innerR * 2 }
        const customPos = positions[centerId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(centerId)

        return (
          <g
            key={centerId}
            onMouseDown={e => startDrag(e, centerId, bbox)}
            transform={getTransform(centerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + bbox.height / 2} r={innerR} fill="transparent" stroke="#e0e0e0" strokeWidth={1} />
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + bbox.height / 2 - 8}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fontWeight={700}
              fill="#333"
            >
              {totalLabel}
            </text>
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y + bbox.height / 2 + 14}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={16}
              fontWeight={700}
              fill="#1a1a2e"
            >
              {totalAmount}
            </text>
            {isSelected && renderHandles(bbox, centerId)}
          </g>
        )
      })()}
    </g>
  )
}
