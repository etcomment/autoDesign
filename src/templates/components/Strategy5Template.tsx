import { useRef, type ReactElement } from 'react'
import type { Strategy5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

const PHASE_LABELS = ['Phase 1', 'Phase 2', 'Phase 3']

export function Strategy5Template({ data }: { data: Strategy5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, blocks } = data
  const W = 1000
  const H = 480
  const phaseCount = 3
  const phaseW = 290
  const phaseGap = 16
  const totalPhaseW = phaseCount * phaseW + (phaseCount - 1) * phaseGap
  const phaseStartX = (W - totalPhaseW) / 2
  const phaseTopY = 90
  const timelineY = 310
  const cardW = 260
  const cardH = 62
  const cardGap = 10

  const blocksPerPhase = Math.max(1, Math.ceil(blocks.length / phaseCount))
  const phases: { index: number; blockIndices: number[]; isFuture: boolean }[] = []

  for (let p = 0; p < phaseCount; p++) {
    const start = p * blocksPerPhase
    const end = Math.min(start + blocksPerPhase, blocks.length)
    const blockIndices: number[] = []
    for (let i = start; i < end; i++) blockIndices.push(i)
    phases.push({ index: p, blockIndices, isFuture: p === phaseCount - 1 })
  }

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={phaseStartX} y1={timelineY} x2={phaseStartX + totalPhaseW} y2={timelineY} stroke="#bbb" strokeWidth={3} strokeLinecap="round" />

      {phases.map(phase => {
        const px = phaseStartX + phase.index * (phaseW + phaseGap)
        const phaseColor = PALETTE[phase.index % PALETTE.length]!

        return (
          <g key={phase.index}>
            <rect
              x={px}
              y={phaseTopY}
              width={phaseW}
              height={timelineY - phaseTopY - 10}
              rx={8}
              fill="none"
              stroke={phase.isFuture ? '#aaa' : phaseColor}
              strokeWidth={2}
              strokeDasharray={phase.isFuture ? '8 4' : undefined}
              opacity={0.5}
            />

            <text x={px + phaseW / 2} y={phaseTopY + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={phaseColor}>
              {PHASE_LABELS[phase.index]!}
            </text>

            {phase.blockIndices.map((blockIndex, cardIdx) => {
              const block = blocks[blockIndex]!
              const elementId = `block-${blockIndex}`
              const color = tplColors[elementId] ?? PALETTE[blockIndex % PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const by = phaseTopY + 40 + cardIdx * (cardH + cardGap)
              const bx = px + (phaseW - cardW) / 2
              const visualRect = { x: bx, y: by, width: cardW, height: cardH }

              return (
                <g key={blockIndex}>
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
                    <rect
                      x={bx}
                      y={by}
                      width={cardW}
                      height={cardH}
                      rx={6}
                      fill={color}
                      opacity={phase.isFuture ? 0.5 : 0.85}
                      stroke={color}
                      strokeWidth={1.5}
                      strokeDasharray={phase.isFuture ? '6 3' : undefined}
                    />

                    {isSelected && (
                      <rect x={bx - 1} y={by - 1} width={cardW + 2} height={cardH + 2} rx={6} fill="none" stroke="#4a90d9" strokeWidth={2} strokeDasharray="4 2" />
                    )}

                    <text x={bx + cardW / 2} y={by + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={phase.isFuture && color !== '#f2cb13' ? 'white' : (color === '#f2cb13' ? '#333' : 'white')}>
                      {block.title.length > 28 ? block.title.slice(0, 26) + '...' : block.title}
                    </text>

                    {block.subtitle && (
                      <text x={bx + cardW / 2} y={by + 44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill={phase.isFuture ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.85)'}>
                        {block.subtitle.length > 30 ? block.subtitle.slice(0, 28) + '...' : block.subtitle}
                      </text>
                    )}

                    {isSelected && renderHandles(visualRect, elementId)}
                  </g>

                  <circle cx={px + phaseW / 2} cy={timelineY} r={6} fill={phase.isFuture ? '#aaa' : phaseColor} stroke="white" strokeWidth={2} />
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
