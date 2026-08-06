import { useRef, type ReactElement } from 'react'
import type { Strategy4Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import { wrapTextByWidth } from '../shared/primitives'

const COLUMN_KEYS = ['Vision', 'Execution', 'Growth'] as const

export function Strategy4Template({ data }: { data: Strategy4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const colW = 290
  const colStartX = 42
  const colGap = 20
  const cardW = 270
  const cardH = 66
  const cardGap = 12
  const headerH = 40
  const topY = 60

  return (
    <g ref={svgRef}>
      {COLUMN_KEYS.map((label, colIdx) => {
        const colX = colStartX + colIdx * (colW + colGap)
        const colColor = MIGSO_PALETTE[colIdx % MIGSO_PALETTE.length]!

        return (
          <g key={colIdx}>
            <rect x={colX} y={topY} width={colW} height={headerH} rx={6} fill={colColor} />
            <text x={colX + colW / 2} y={topY + headerH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
              {label}
            </text>

            {blocks.map((block, index) => {
              if (index % 3 !== colIdx) return null
              const elementId = `block-${index}`
              const color = tplColors[elementId] ?? block.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
              const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)
              const cardIndex = Math.floor(index / 3)
              const defaultBbox = {
                x: colX + (colW - cardW) / 2,
                y: topY + headerH + 16 + cardIndex * (cardH + cardGap),
                width: cardW,
                height: cardH,
              }
              const customPos = positions[elementId]
              const bbox = {
                x: customPos?.x ?? defaultBbox.x,
                y: customPos?.y ?? defaultBbox.y,
                width: customPos?.width ?? defaultBbox.width,
                height: customPos?.height ?? defaultBbox.height,
              }
              const IconFn = block.icon ? TEMPLATE_ICONS[block.icon] : undefined
              const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
              const titleLines = wrapTextByWidth(block.title, maxChars)
              const subtitleLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []

              return (
                <g
                  key={elementId}
                  data-element-id={elementId}
                  onMouseDown={e => startDrag(e, elementId, bbox)}
                  transform={getTransform(elementId, bbox)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} opacity={0.12} stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray={isSelected ? '4 2' : undefined} />

                  <circle cx={bbox.x + 18} cy={bbox.y + 18} r={14} fill={color} />
                  {IconFn ? (
                    <g transform={`translate(${bbox.x + 11}, ${bbox.y + 11})`}>
                      <IconFn size={14} color="white" />
                    </g>
                  ) : (
                    <text x={bbox.x + 18} y={bbox.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                      {block.number}
                    </text>
                  )}

                  <text x={bbox.x + 40} y={bbox.y + 22} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#333">
                    {titleLines.map((line, li) => (
                      <tspan key={li} x={bbox.x + 40} dy={li === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </text>

                  {block.subtitle && (
                    <text x={bbox.x + 40} y={bbox.y + 38} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
                      {subtitleLines.map((line, li) => (
                        <tspan key={li} x={bbox.x + 40} dy={li === 0 ? 0 : 12}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  )}

                  {(block.value || block.percent) && (
                    <text x={bbox.x + 40} y={bbox.y + 53} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                      {block.value ?? block.percent}
                    </text>
                  )}

                  {block.number && IconFn && (
                    <text x={bbox.x + bbox.width - 10} y={bbox.y + 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
                      {block.number}
                    </text>
                  )}

                  {isSelected && renderHandles(bbox, elementId)}
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
