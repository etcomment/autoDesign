import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
import { Arrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const STEP_W = 180
const STEP_H = 60
const STEP_GAP = 30
const STEP_OFFSET_X = 60

export function Strategy8Template({ data }: { data: StrategyData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, blocks } = data
  const count = Math.min(blocks.length, 5)
  const W = (count * STEP_W) + (count * STEP_OFFSET_X) + 120
  const H = Math.max(520, count * STEP_H + count * STEP_GAP + 180)
  const startY = title ? 100 : 60

  return (
    <g ref={svgRef}>
      <rect width={Math.max(W, 960)} height={Math.max(H, 400)} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {blocks.slice(0, 5).map((block, index) => {
        const elementId = `step-${index}`
        const color = tplColors[elementId] ?? PALETTE[index % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const sx = 40 + index * STEP_OFFSET_X
        const sy = startY + index * (STEP_H + STEP_GAP)
        const visualRect = { x: sx, y: sy, width: STEP_W, height: STEP_H }

        return (
          <g key={`step-${index}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={sx} y={sy} width={STEP_W} height={STEP_H} rx={8} fill={color} opacity={isSelected ? 1 : 0.85} stroke={isSelected ? '#333' : undefined} strokeWidth={isSelected ? 1.5 : undefined} />
              <text x={sx + STEP_W / 2} y={sy + STEP_H / 2 - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {block.number}. {block.title}
              </text>
              {block.subtitle && (
                <text x={sx + STEP_W / 2} y={sy + STEP_H / 2 + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.85)">
                  {block.subtitle.length > 22 ? block.subtitle.slice(0, 20) + '..' : block.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {index < count - 1 && (
              <Arrow
                from={{ x: sx + STEP_W + 4, y: sy + STEP_H / 2 }}
                to={{ x: sx + STEP_W + STEP_OFFSET_X - 4, y: sy + STEP_H + STEP_GAP / 2 }}
                color={color}
              />
            )}
          </g>
        )
      })}

      <text x={W / 2} y={H - 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#888" letterSpacing={2}>
        PROGRESSION
      </text>
    </g>
  )
}
