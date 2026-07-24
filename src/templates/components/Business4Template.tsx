import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { ChevronArrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Business4Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 1000
  const H = 380
  const chevronW = 130
  const chevronH = 60
  const gap = 10
  const arrowW = 12
  const count = Math.min(nodes.length, 6)
  const totalW = count * chevronW + (count - 1) * (gap + arrowW)
  const startX = (W - totalW) / 2
  const startY = (H - chevronH) / 2 + 30

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {nodes.slice(0, count).map((node, i) => {
        const elementId = `node-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const bx = startX + i * (chevronW + gap + arrowW)
        const visualRect = { x: bx, y: startY, width: chevronW, height: chevronH }

        return (
          <g key={i}>
            {i < count - 1 && (
              <line
                x1={bx + chevronW + 6}
                y1={startY + chevronH / 2}
                x2={bx + chevronW + gap + arrowW + 6}
                y2={startY + chevronH / 2}
                stroke={color}
                strokeWidth={2}
              />
            )}
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <ChevronArrow x={bx} y={startY} width={chevronW} height={chevronH} fill={color} label={node.title.length > 12 ? node.title.slice(0, 10) + '..' : node.title} />
              {isSelected && (
                <rect x={bx - 1} y={startY - 1} width={chevronW + 2} height={chevronH + 2} rx={2} fill="none" stroke="#4a90d9" strokeWidth={2.5} strokeDasharray="4 2" />
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <text x={W / 2} y={H - 40} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fill="#999">
        flow direction →
      </text>
    </g>
  )
}
