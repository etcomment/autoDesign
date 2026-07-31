import { useRef, type ReactElement } from 'react'
import type { Strategy3Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import { wrapTextByWidth } from '../shared/primitives'

export function Strategy3Template({ data }: { data: Strategy3Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const W = 1000
  const cx = W / 2
  const cy = 290
  const hubR = 50
  const spokeLen = 175
  const cardW = 150
  const cardH = 78
  const count = Math.max(1, blocks.length)
  const angleStep = (2 * Math.PI) / count
  const startAngle = -Math.PI / 2

  return (
    <g ref={svgRef}>
      <circle cx={cx} cy={cy} r={hubR} fill="#ececf2" stroke="#d2d2dc" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={hubR - 14} fill="#e2e2ea" stroke="#c6c6d2" strokeWidth={1} strokeDasharray="3 2" />
      <text x={cx} y={cy - 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#666">
        Core Focus
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#999">
        Strategy Hub
      </text>

      {blocks.map((block, index) => {
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? block.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const angle = startAngle + index * angleStep
        const cardCx = cx + spokeLen * Math.cos(angle)
        const cardCy = cy + spokeLen * Math.sin(angle)
        const defaultBbox = { x: cardCx - cardW / 2, y: cardCy - cardH / 2, width: cardW, height: cardH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const cardCenterX = bbox.x + bbox.width / 2
        const cardCenterY = bbox.y + bbox.height / 2
        const hubAngle = Math.atan2(cardCenterY - cy, cardCenterX - cx)
        const spokeX = cx + hubR * Math.cos(hubAngle)
        const spokeY = cy + hubR * Math.sin(hubAngle)
        const IconFn = block.icon ? TEMPLATE_ICONS[block.icon] : undefined
        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLines = wrapTextByWidth(block.title, maxChars)
        const subtitleLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []

        return (
          <g key={elementId}>
            <line x1={spokeX} y1={spokeY} x2={cardCenterX} y2={cardCenterY} stroke={color} strokeWidth={2} strokeOpacity={0.45} />

            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={color} opacity={0.15} stroke={color} strokeWidth={1.5} strokeDasharray={isSelected ? '4 2' : undefined} />

              <circle cx={bbox.x + 16} cy={bbox.y + 16} r={13} fill={color} />
              {IconFn ? (
                <g transform={`translate(${bbox.x + 9}, ${bbox.y + 9})`}>
                  <IconFn size={14} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 16} y={bbox.y + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                  {block.number}
                </text>
              )}

              {block.number && IconFn && (
                <text x={bbox.x + bbox.width - 10} y={bbox.y + 18} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
                  {block.number}
                </text>
              )}

              <text x={cardCenterX} y={bbox.y + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
                {titleLines.map((line, li) => (
                  <tspan key={li} x={cardCenterX} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>

              {block.subtitle && (
                <text x={cardCenterX} y={bbox.y + 54} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#777">
                  {subtitleLines.map((line, li) => (
                    <tspan key={li} x={cardCenterX} dy={li === 0 ? 0 : 11}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {(block.value || block.percent) && (
                <text x={cardCenterX} y={bbox.y + 71} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={color}>
                  {block.value ?? block.percent}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
