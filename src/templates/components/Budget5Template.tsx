import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Budget5Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const items = data.items && data.items.length > 0 ? data.items : [
    { label: 'Engineering', percentage: 40, amount: '€40,000' },
    { label: 'Marketing', percentage: 25, amount: '€25,000' },
    { label: 'Operations', percentage: 20, amount: '€20,000' },
    { label: 'Design', percentage: 15, amount: '€15,000' },
  ]
  const totalLabel = data.totalLabel || 'Total'
  const totalAmount = data.totalAmount || '€100,000'

  const W = 900
  const H = 480
  const cx = W * 0.35
  const cy = H / 2
  const pieR = 140
  const legendX = W * 0.6
  const total = Math.max(1, items.reduce((s, it) => s + it.percentage, 0))

  let cumulative = -90

  return (
    <g ref={svgRef}>
      {items.map((item, index) => {
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const sliceAngle = (item.percentage / total) * 360
        const startAngle = cumulative
        const endAngle = startAngle + sliceAngle
        cumulative = endAngle

        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180
        const x1 = cx + pieR * Math.cos(startRad)
        const y1 = cy + pieR * Math.sin(startRad)
        const x2 = cx + pieR * Math.cos(endRad)
        const y2 = cy + pieR * Math.sin(endRad)
        const largeArc = sliceAngle > 180 ? 1 : 0

        const pathD = [
          `M ${cx} ${cy}`,
          `L ${x1} ${y1}`,
          `A ${pieR} ${pieR} 0 ${largeArc} 1 ${x2} ${y2}`,
          'Z',
        ].join(' ')

        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'white')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 2)

        return (
          <path
            key={`slice-${index}`}
            d={pathD}
            fill={color}
            opacity={isSelected ? 1 : 0.88}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        )
      })}

      {/* Center hole summary */}
      {(() => {
        const centerId = 'donut-center'
        const holeR = pieR * 0.4
        const defaultBbox = { x: cx - holeR, y: cy - holeR, width: holeR * 2, height: holeR * 2 }
        const customPos = positions[centerId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(centerId)
        const strokeColor = tplStrokeColors[centerId] || (isSelected ? '#4a90d9' : '#e0e0e0')
        const strokeWidth = tplStrokeWidths[centerId] ?? (isSelected ? 2.5 : 1)

        return (
          <g
            key={centerId}
            data-element-id={centerId}
            onMouseDown={e => startDrag(e, centerId, bbox)}
            transform={getTransform(centerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + bbox.height / 2} r={holeR} fill="transparent" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#333">
              {totalLabel}
            </text>
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a1a2e">
              {totalAmount}
            </text>
            {isSelected && renderHandles(bbox, centerId)}
          </g>
        )
      })()}

      {/* Side Legend Cards */}
      {items.map((item, index) => {
        const elementId = `item-${index}`
        const color = tplColors[elementId] ?? item.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const defaultLy = cy - (items.length * 44) / 2 + index * 44
        const defaultBbox = { x: legendX, y: defaultLy, width: 240, height: 38 }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#edf2f7')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 1)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined
        const maxChars = Math.max(8, Math.floor((bbox.width - 110) / 7))
        const labelLines = wrapTextByWidth(item.label, maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} filter="drop-shadow(0 1px 2px rgba(0,0,0,0.04))" />
            <rect x={bbox.x + 10} y={bbox.y + 10} width={16} height={16} rx={3} fill={color} />

            {IconComponent && (
              <g transform={`translate(${bbox.x + 32}, ${bbox.y + 10})`}>
                <IconComponent size={16} color={color} />
              </g>
            )}

            <text x={bbox.x + (IconComponent ? 54 : 34)} y={bbox.y + bbox.height / 2 + (labelLines.length > 1 ? -2 : 4)} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + (IconComponent ? 54 : 34)} dy={lineIndex === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={bbox.x + bbox.width - 12} y={bbox.y + bbox.height / 2 + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
              {item.amount} ({Math.round(item.percentage)}%)
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
