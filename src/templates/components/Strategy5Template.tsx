import { useRef, type ReactElement } from 'react'
import type { Strategy5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import { wrapTextByWidth } from '../shared/primitives'

const PHASE_LABELS = ['Phase 1', 'Phase 2', 'Phase 3']

export function Strategy5Template({ data }: { data: Strategy5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { blocks } = data
  const W = 1000
  const phaseCount = 3
  const phaseW = 290
  const phaseGap = 16
  const totalPhaseW = phaseCount * phaseW + (phaseCount - 1) * phaseGap
  const phaseStartX = (W - totalPhaseW) / 2
  const phaseTopY = 90
  const timelineY = 310
  const cardW = 260
  const cardH = 74
  const cardGap = 10

  const blocksPerPhase = Math.max(1, Math.ceil(blocks.length / phaseCount))

  return (
    <g ref={svgRef}>
      <line x1={phaseStartX} y1={timelineY} x2={phaseStartX + totalPhaseW} y2={timelineY} stroke="#bbb" strokeWidth={3} strokeLinecap="round" />

      {Array.from({ length: phaseCount }).map((_, p) => {
        const px = phaseStartX + p * (phaseW + phaseGap)
        const isFuture = p === phaseCount - 1
        const phaseColor = MIGSO_PALETTE[p % MIGSO_PALETTE.length]!
        const start = p * blocksPerPhase
        const end = Math.min(start + blocksPerPhase, blocks.length)

        return (
          <g key={p}>
            <rect
              x={px}
              y={phaseTopY}
              width={phaseW}
              height={timelineY - phaseTopY - 10}
              rx={8}
              fill="none"
              stroke={isFuture ? '#aaa' : phaseColor}
              strokeWidth={2}
              strokeDasharray={isFuture ? '8 4' : undefined}
              opacity={0.5}
            />

            <text x={px + phaseW / 2} y={phaseTopY + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={phaseColor}>
              {PHASE_LABELS[p]!}
            </text>

            {blocks.slice(start, end).map((block, cardIdx) => {
              const blockIndex = start + cardIdx
              const elementId = `block-${blockIndex}`
              const color = tplColors[elementId] ?? block.color ?? MIGSO_PALETTE[blockIndex % MIGSO_PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
              const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1.5)
              const by = phaseTopY + 40 + cardIdx * (cardH + cardGap)
              const bx = px + (phaseW - cardW) / 2
              const defaultBbox = { x: bx, y: by, width: cardW, height: cardH }
              const customPos = positions[elementId]
              const bbox = {
                x: customPos?.x ?? defaultBbox.x,
                y: customPos?.y ?? defaultBbox.y,
                width: customPos?.width ?? defaultBbox.width,
                height: customPos?.height ?? defaultBbox.height,
              }

              const IconFn = block.icon ? TEMPLATE_ICONS[block.icon] : undefined
              const textColor = color === '#f2cb13' ? '#333' : 'white'
              const muted = isFuture ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.85)'
              const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
              const titleLines = wrapTextByWidth(block.title, maxChars)
              const subtitleLines = block.subtitle ? wrapTextByWidth(block.subtitle, maxChars) : []

              return (
                <g key={blockIndex}>
                  <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
                    <rect
                      x={bbox.x}
                      y={bbox.y}
                      width={bbox.width}
                      height={bbox.height}
                      rx={6}
                      fill={color}
                      opacity={isFuture ? 0.5 : 0.85}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isFuture ? '6 3' : undefined}
                    />

                    <circle cx={bbox.x + 16} cy={bbox.y + 18} r={11} fill="white" opacity={0.25} />
                    <text x={bbox.x + 16} y={bbox.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={textColor}>
                      {block.number}
                    </text>

                    <text x={bbox.x + bbox.width / 2} y={bbox.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={textColor}>
                      {titleLines.map((line, li) => (
                        <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 13}>
                          {line}
                        </tspan>
                      ))}
                    </text>

                    {block.subtitle && (
                      <text x={bbox.x + bbox.width / 2} y={bbox.y + 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill={muted}>
                        {subtitleLines.map((line, li) => (
                          <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    )}

                    <text x={bbox.x + 14} y={bbox.y + bbox.height - 12} fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill={textColor}>
                      {block.value}
                    </text>
                    <text x={bbox.x + bbox.width - 14} y={bbox.y + bbox.height - 12} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={textColor}>
                      {block.percent}
                    </text>

                    {IconFn && (
                      <g transform={`translate(${bbox.x + bbox.width - 30}, ${bbox.y + 8})`}>
                        <IconFn size={16} color={textColor} />
                      </g>
                    )}

                    {isSelected && renderHandles(bbox, elementId)}
                  </g>

                  <circle cx={px + phaseW / 2} cy={timelineY} r={6} fill={isFuture ? '#aaa' : phaseColor} stroke="white" strokeWidth={2} />
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
