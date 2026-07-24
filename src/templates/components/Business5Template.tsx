import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6']

export function Business5Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const nodeW = 160
  const nodeH = 50
  const levelGap = 100

  interface Pos { x: number; y: number; label: string }
  const levels: Pos[][] = [
    [{ x: cx, y: 100, label: 'Leadership' }],
    [
      { x: cx - 180, y: 100 + levelGap, label: 'Team A' },
      { x: cx + 180, y: 100 + levelGap, label: 'Team B' },
    ],
    [{ x: cx, y: 100 + levelGap * 2, label: 'Outcome' }],
  ]

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={cx} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {levels.map((row, li) =>
        row.map((pos, pi) => {
          const globalIdx = levels.slice(0, li).reduce((s, r) => s + r.length, 0) + pi
          const node = nodes[globalIdx % nodes.length]!
          const elementId = `node-${globalIdx}`
          const color = tplColors[elementId] ?? PALETTE[li % PALETTE.length]!
          const isSelected = selectedIds.has(elementId)
          const bx = pos.x - nodeW / 2
          const by = pos.y - nodeH / 2
          const visualRect = { x: bx, y: by, width: nodeW, height: nodeH }

          if (li > 0) {
            const parents = levels[li - 1]!
            const parent = parents[Math.min(pi, parents.length - 1)]!
            return (
              <g key={`${li}-${pi}`}>
                <line x1={parent.x} y1={parent.y + nodeH / 2} x2={pos.x} y2={by} stroke={color} strokeWidth={1.5} opacity={0.5} />
                <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                  <rect x={bx} y={by} width={nodeW} height={nodeH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
                  <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                    {node.title.length > 18 ? node.title.slice(0, 16) + '..' : node.title}
                  </text>
                  <text x={pos.x} y={pos.y + nodeH / 2 - 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill={color} fontWeight={600}>
                    {pos.label}
                  </text>
                  {isSelected && renderHandles(visualRect, elementId)}
                </g>
              </g>
            )
          }

          return (
            <g key={`${li}-${pi}`}>
              <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                <rect x={bx} y={by} width={nodeW} height={nodeH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
                <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                  {node.title.length > 18 ? node.title.slice(0, 16) + '..' : node.title}
                </text>
                <text x={pos.x} y={pos.y + nodeH / 2 - 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill={color} fontWeight={600}>
                  {pos.label}
                </text>
                {isSelected && renderHandles(visualRect, elementId)}
              </g>
            </g>
          )
        })
      )}
    </g>
  )
}
