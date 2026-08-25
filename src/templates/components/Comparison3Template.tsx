import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const LEFT_COLOR = MIGSO_PALETTE[0]!
const RIGHT_COLOR = MIGSO_PALETTE[1]!
const MAX_BAR_W = 200

export function Comparison3Template({ data }: { data: ComparisonData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { leftTitle, rightTitle, items } = data
  const W = 800
  const midX = W / 2
  const rowH = 48
  const barH = 26
  const topY = 60

  const allNumeric = items.every(i => !isNaN(Number(i.left.replace(/[^0-9.]/g, ''))) && !isNaN(Number(i.right.replace(/[^0-9.]/g, ''))))
  const getVal = (v: string) => allNumeric ? parseFloat(v.replace(/[^0-9.]/g, '')) || 0 : v.length * 8
  const maxVal = Math.max(...items.map(i => Math.max(getVal(i.left), getVal(i.right)))) || 100

  return (
    <g ref={svgRef}>
      {(() => {
        const leftHeaderId = 'header-left'
        const defaultBbox = { x: midX - MAX_BAR_W - 140, y: topY - 32, width: 140, height: 26 }
        const customPos = positions[leftHeaderId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(leftHeaderId)
        return (
          <g
            key={leftHeaderId}
            data-element-id={leftHeaderId}
            onMouseDown={e => startDrag(e, leftHeaderId, bbox)}
            transform={getTransform(leftHeaderId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text x={bbox.x + bbox.width} y={bbox.y + 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={LEFT_COLOR}>
              {leftTitle}
            </text>
            {isSelected && renderHandles(bbox, leftHeaderId)}
          </g>
        )
      })()}

      {(() => {
        const rightHeaderId = 'header-right'
        const defaultBbox = { x: midX + 20, y: topY - 32, width: 140, height: 26 }
        const customPos = positions[rightHeaderId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(rightHeaderId)
        return (
          <g
            key={rightHeaderId}
            data-element-id={rightHeaderId}
            onMouseDown={e => startDrag(e, rightHeaderId, bbox)}
            transform={getTransform(rightHeaderId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <text x={bbox.x} y={bbox.y + 18} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={RIGHT_COLOR}>
              {rightTitle}
            </text>
            {isSelected && renderHandles(bbox, rightHeaderId)}
          </g>
        )
      })()}

      {items.map((item, index) => {
        const elementId = `item-${index}`
        const isSelected = selectedIds.has(elementId)
        const rowY = topY + index * rowH
        const leftVal = getVal(item.left)
        const rightVal = getVal(item.right)
        const leftW = (leftVal / maxVal) * MAX_BAR_W
        const rightW = (rightVal / maxVal) * MAX_BAR_W

        const defaultBbox = { x: midX - MAX_BAR_W - 40, y: rowY, width: MAX_BAR_W * 2 + 80, height: rowH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const leftColor = tplColors[`${elementId}-left`] || LEFT_COLOR
        const rightColor = tplColors[`${elementId}-right`] || RIGHT_COLOR
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined
        const labelLines = wrapTextByWidth(item.label, 12)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            {strokeWidth > 0 && (
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            )}

            <rect x={midX - 10 - leftW} y={bbox.y + (rowH - barH) / 2} width={leftW} height={barH} rx={6} fill={leftColor} opacity={0.85} />
            <text x={midX - 16 - leftW} y={bbox.y + rowH / 2 + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {item.left}
            </text>

            <rect x={midX + 10} y={bbox.y + (rowH - barH) / 2} width={rightW} height={barH} rx={6} fill={rightColor} opacity={0.85} />
            <text x={midX + rightW + 16} y={bbox.y + rowH / 2 + 4} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {item.right}
            </text>

            {IconComponent && (
              <g transform={`translate(${midX - 8}, ${bbox.y + 4})`}>
                <IconComponent size={16} color="#64748b" />
              </g>
            )}

            <text x={midX} y={bbox.y + rowH / 2 + (IconComponent ? 14 : 5) - (labelLines.length > 1 ? (labelLines.length - 1) * 6 : 0)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#555">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={midX} dy={lineIndex === 0 ? 0 : 12}>
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
