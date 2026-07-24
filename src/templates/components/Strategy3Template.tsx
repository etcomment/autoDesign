import { useRef, type ReactElement } from 'react'
import type { Strategy3Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Strategy3Template({ data }: { data: Strategy3Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, blocks } = data
  const W = 1000
  const H = 560
  const cx = W / 2
  const cy = 290
  const hubR = 52
  const spokeLen = 160
  const cardW = 140
  const cardH = 60
  const angleStep = blocks.length > 0 ? (2 * Math.PI) / blocks.length : 0
  const startAngle = -Math.PI / 2

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />

      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={hubR} fill={PALETTE[0]} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
        {blocks.length > 0 ? blocks[0]!.title.slice(0, 14) : 'Goal'}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.8)">
        Core Focus
      </text>

      {blocks.map((block, index) => {
        const elementId = `block-${index}`
        const color = tplColors[elementId] ?? PALETTE[(index + 1) % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const angle = startAngle + index * angleStep
        const cardCx = cx + spokeLen * Math.cos(angle)
        const cardCy = cy + spokeLen * Math.sin(angle)
        const by = cardCy - cardH / 2
        const bx = cardCx - cardW / 2
        const visualRect = { x: bx, y: by, width: cardW, height: cardH }

        return (
          <g key={index}>
            <line x1={cx + hubR * Math.cos(angle)} y1={cy + hubR * Math.sin(angle)} x2={cardCx} y2={cardCy} stroke={color} strokeWidth={2} />

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} onClick={e => { e.stopPropagation(); toggleElement(elementId); }} style={{ cursor: 'pointer' }}>
              <rect x={bx} y={by} width={cardW} height={cardH} rx={6} fill={color} opacity={0.15} stroke={color} strokeWidth={1.5} />

              {isSelected && (
                <rect x={bx - 1} y={by - 1} width={cardW + 2} height={cardH + 2} rx={6} fill="none" stroke="#4a90d9" strokeWidth={2} strokeDasharray="4 2" />
              )}

              <text x={cardCx} y={by + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#333">
                {block.title.length > 16 ? block.title.slice(0, 14) + '...' : block.title}
              </text>

              {block.subtitle && (
                <text x={cardCx} y={by + 42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#777">
                  {block.subtitle.length > 20 ? block.subtitle.slice(0, 18) + '...' : block.subtitle}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
