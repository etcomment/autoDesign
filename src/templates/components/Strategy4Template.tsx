import { useRef, type ReactElement } from 'react'
import type { Strategy4Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'
import { wrapTextByWidth } from '../shared/primitives'

const COLUMN_KEYS = ['Vision', 'Execution', 'Growth'] as const

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 16} color={props.color ?? 'white'} />
  }
  return null
}

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
  const cardH = 70
  const cardGap = 12
  const headerH = 40
  const topY = 60

  return (
    <g ref={svgRef}>
      {COLUMN_KEYS.map((label, colIdx) => {
        const headerId = `col-header-${colIdx}`
        const colX = colStartX + colIdx * (colW + colGap)
        const defaultHeaderBbox = { x: colX, y: topY, width: colW, height: headerH }
        const customHeaderPos = positions[headerId]
        const headerBbox = {
          x: customHeaderPos?.x ?? defaultHeaderBbox.x,
          y: customHeaderPos?.y ?? defaultHeaderBbox.y,
          width: customHeaderPos?.width ?? defaultHeaderBbox.width,
          height: customHeaderPos?.height ?? defaultHeaderBbox.height,
        }
        const isHeaderSelected = selectedIds.has(headerId)
        const colColor = tplColors[headerId] ?? MIGSO_PALETTE[colIdx % MIGSO_PALETTE.length]!
        const headerStroke = tplStrokeColors[headerId] || (isHeaderSelected ? '#4a90d9' : 'none')
        const headerStrokeW = tplStrokeWidths[headerId] !== undefined ? tplStrokeWidths[headerId] : (isHeaderSelected ? 2.5 : 0)

        return (
          <g key={`col-${colIdx}`}>
            {/* Interactive Column Header */}
            <g
              data-element-id={headerId}
              onMouseDown={e => startDrag(e, headerId, headerBbox)}
              transform={getTransform(headerId, headerBbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={headerBbox.x} y={headerBbox.y} width={headerBbox.width} height={headerBbox.height} rx={6} fill={colColor} stroke={headerStroke} strokeWidth={headerStrokeW} />
              <text x={headerBbox.x + headerBbox.width / 2} y={headerBbox.y + headerBbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {label}
              </text>
              {isHeaderSelected && renderHandles(headerBbox, headerId)}
            </g>

            {blocks.map((block, index) => {
              if (index % 3 !== colIdx) return null
              const elementId = `block-${index}`
              const color = tplColors[elementId] ?? block.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
              const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1)
              const cardIndex = Math.floor(index / 3)
              const defaultBbox = {
                x: headerBbox.x + (headerBbox.width - cardW) / 2,
                y: headerBbox.y + headerBbox.height + 16 + cardIndex * (cardH + cardGap),
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
              const IconFn = getDynamicIcon(block.icon)
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
                  <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} fillOpacity={0.12} stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray={isSelected ? '4 2' : undefined} />

                  <circle cx={bbox.x + 18} cy={bbox.y + 18} r={13} fill={color} />
                  {IconFn ? (
                    <g transform={`translate(${bbox.x + 10}, ${bbox.y + 10})`}>
                      <IconFn size={16} color="white" />
                    </g>
                  ) : (
                    <text x={bbox.x + 18} y={bbox.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                      {block.number || String(index + 1)}
                    </text>
                  )}

                  <text x={bbox.x + 40} y={bbox.y + 20} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#222">
                    {titleLines.map((line, li) => (
                      <tspan key={li} x={bbox.x + 40} dy={li === 0 ? 0 : 13}>
                        {line}
                      </tspan>
                    ))}
                  </text>

                  {subtitleLines.length > 0 && (
                    <text x={bbox.x + 40} y={bbox.y + 20 + titleLines.length * 13 + 3} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
                      {subtitleLines.map((line, li) => (
                        <tspan key={li} x={bbox.x + 40} dy={li === 0 ? 0 : 12}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  )}

                  {(block.value || block.percent) && (
                    <text x={bbox.x + 40} y={bbox.y + bbox.height - 8} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
                      {[block.value, block.percent].filter(Boolean).join(' · ')}
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
