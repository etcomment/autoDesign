import { useRef, type ReactElement } from 'react'
import type { StrategyData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Strategy7Template({ data }: { data: StrategyData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, blocks } = data
  const W = 800
  const H = 620
  const cx = W / 2
  const cy = title ? 370 : 330
  const rings = [
    { name: 'Vision', r: 200, w: 180, items: blocks.slice(0, 2) },
    { name: 'Strategy', r: 140, w: 120, items: blocks.slice(2, 4) },
    { name: 'Execution', r: 80, w: 60, items: blocks.slice(4, 6) },
  ]

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {rings.map((ring, ri) => {
        const color = PALETTE[ri % PALETTE.length]!
        const ringId = `ring-${ri}`
        const ringFill = tplColors[ringId] ?? color

        return (
          <g key={`ring-${ri}`}>
            <circle cx={cx} cy={cy} r={ring.r} fill="none" stroke={ringFill} strokeWidth={2} opacity={0.3} />
            <circle cx={cx} cy={cy} r={ring.r - ring.w / 2} fill={ringFill} opacity={0.06} stroke={ringFill} strokeWidth={1.5} strokeDasharray="8 4" />

            <text x={cx + ring.r - ring.w / 2 + 6} y={cy - 8} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={ringFill}>
              {ring.name}
            </text>

            {ring.items.map((item, ii) => {
              const elementId = `ring-${ri}-item-${ii}`
              const itemColor = tplColors[elementId] ?? PALETTE[(ri + ii) % PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const angle = (ii / ring.items.length) * 360 - 90
              const rad = (angle * Math.PI) / 180
              const itemR = ring.r - ring.w / 2
              const itemX = cx + Math.cos(rad) * itemR
              const itemY = cy + Math.sin(rad) * itemR + 40
              const itemW = 100
              const itemH = 46
              const visualRect = { x: itemX - itemW / 2, y: itemY, width: itemW, height: itemH }

              return (
                <g key={`ri-${ri}-${ii}`}>
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                    <rect x={itemX - itemW / 2} y={itemY} width={itemW} height={itemH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : itemColor} strokeWidth={isSelected ? 2.5 : 1.5} />
                    <text x={itemX} y={itemY + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill={itemColor}>
                      {item.title}
                    </text>
                    {item.subtitle && (
                      <text x={itemX} y={itemY + 36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#777">
                        {item.subtitle.length > 15 ? item.subtitle.slice(0, 13) + '..' : item.subtitle}
                      </text>
                    )}
                    {isSelected && renderHandles(visualRect, elementId)}
                  </g>
                </g>
              )
            })}
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={24} fill={PALETTE[0]} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
        Core
      </text>
    </g>
  )
}
