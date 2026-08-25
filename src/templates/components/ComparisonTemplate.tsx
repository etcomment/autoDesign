import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const LEFT_COLOR = MIGSO_PALETTE[0]!
const RIGHT_COLOR = MIGSO_PALETTE[1]!
const LEFT_BG = '#eff6ff'
const RIGHT_BG = '#fef2f2'

export function ComparisonTemplate({ data }: { data: ComparisonData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { leftTitle, rightTitle, items } = data
  const W = 900
  const colW = 320
  const labelW = 120
  const dividerW = 40
  const totalW = colW * 2 + labelW + dividerW
  const tableX = (W - totalW) / 2
  const headerH = 48
  const rowH = 48
  const tableY = 40

  const leftColX = tableX
  const labelColX = leftColX + colW
  const rightColX = labelColX + labelW + dividerW

  return (
    <g ref={svgRef}>
      {(() => {
        const headerLeftId = 'header-left'
        const defaultBbox = { x: leftColX, y: tableY, width: colW, height: headerH }
        const customPos = positions[headerLeftId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerLeftId)
        const color = tplColors[headerLeftId] || LEFT_COLOR
        const strokeColor = tplStrokeColors[headerLeftId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[headerLeftId] ?? (isSelected ? 2.5 : 0)
        const maxChars = Math.max(8, Math.floor(bbox.width / 10))
        const titleLines = wrapTextByWidth(leftTitle, maxChars)

        return (
          <g
            key={headerLeftId}
            data-element-id={headerLeftId}
            onMouseDown={e => startDrag(e, headerLeftId, bbox)}
            transform={getTransform(headerLeftId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + (titleLines.length > 1 ? -4 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2} dy={lineIndex === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, headerLeftId)}
          </g>
        )
      })()}

      {(() => {
        const headerRightId = 'header-right'
        const defaultBbox = { x: rightColX, y: tableY, width: colW, height: headerH }
        const customPos = positions[headerRightId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(headerRightId)
        const color = tplColors[headerRightId] || RIGHT_COLOR
        const strokeColor = tplStrokeColors[headerRightId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[headerRightId] ?? (isSelected ? 2.5 : 0)
        const maxChars = Math.max(8, Math.floor(bbox.width / 10))
        const titleLines = wrapTextByWidth(rightTitle, maxChars)

        return (
          <g
            key={headerRightId}
            data-element-id={headerRightId}
            onMouseDown={e => startDrag(e, headerRightId, bbox)}
            transform={getTransform(headerRightId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + (titleLines.length > 1 ? -4 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2} dy={lineIndex === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </text>
            {isSelected && renderHandles(bbox, headerRightId)}
          </g>
        )
      })()}

      <text x={labelColX + labelW / 2 + dividerW / 2} y={tableY + headerH / 2 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={800} fill="#94a3b8">
        VS
      </text>

      {items.map((item, index) => {
        const elementId = `item-${index}`
        const isSelected = selectedIds.has(elementId)
        const rowY = tableY + headerH + index * rowH
        const isEven = index % 2 === 0
        const defaultBbox = { x: leftColX, y: rowY, width: totalW, height: rowH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2 : 0)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined

        const maxSideChars = Math.max(8, Math.floor(colW / 9))
        const leftLines = wrapTextByWidth(item.left, maxSideChars)
        const rightLines = wrapTextByWidth(item.right, maxSideChars)
        const labelLines = wrapTextByWidth(item.label, Math.max(6, Math.floor(labelW / 8)))

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={colW} height={bbox.height} fill={isEven ? LEFT_BG : 'white'} stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x={bbox.x + colW + labelW + dividerW} y={bbox.y} width={colW} height={bbox.height} fill={isEven ? RIGHT_BG : 'white'} stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x={bbox.x + colW + dividerW / 2} y={bbox.y} width={labelW} height={bbox.height} rx={4} fill={isEven ? '#f8fafc' : '#f1f5f9'} />

            {IconComponent && (
              <g transform={`translate(${bbox.x + colW + dividerW / 2 + 8}, ${bbox.y + bbox.height / 2 - 8})`}>
                <IconComponent size={16} color="#64748b" />
              </g>
            )}

            <text x={bbox.x + colW / 2} y={bbox.y + bbox.height / 2 + (leftLines.length > 1 ? -4 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill={LEFT_COLOR}>
              {leftLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + colW / 2} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>

            <text x={bbox.x + colW + labelW + dividerW + colW / 2} y={bbox.y + bbox.height / 2 + (rightLines.length > 1 ? -4 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={500} fill={RIGHT_COLOR}>
              {rightLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + colW + labelW + dividerW + colW / 2} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>

            <text x={bbox.x + colW + dividerW / 2 + labelW / 2 + (IconComponent ? 8 : 0)} y={bbox.y + bbox.height / 2 + (labelLines.length > 1 ? -4 : 5)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#475569">
              {labelLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + colW + dividerW / 2 + labelW / 2 + (IconComponent ? 8 : 0)} dy={lineIndex === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>

            <line x1={bbox.x} y1={bbox.y + bbox.height} x2={bbox.x + bbox.width} y2={bbox.y + bbox.height} stroke="#e2e8f0" strokeWidth={1} />

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
