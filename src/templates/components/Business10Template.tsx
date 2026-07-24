import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12']

export function Business10Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, nodes } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const nodeW = 120
  const nodeH = 48
  const gapX = 20
  const gapY = 30
  const startY = 100

  const levels = [
    { count: 1, label: 'Leadership' },
    { count: 2, label: 'Management' },
    { count: 3, label: 'Operations' },
    { count: 4, label: 'Foundation' },
  ]

  let nodeIdx = 0

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={cx} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      {levels.map((level, li) => {
        const y = startY + li * (nodeH + gapY)
        const totalRowW = level.count * nodeW + (level.count - 1) * gapX
        const rowStartX = cx - totalRowW / 2

        return (
          <g key={li}>
            <text x={cx + totalRowW / 2 + 30} y={y + nodeH / 2 + 4} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={10} fill="#999" fontWeight={600}>
              {level.label}
            </text>
            {Array.from({ length: level.count }).map((_, ci) => {
              const node = nodes[nodeIdx % nodes.length]!
              const elementId = `node-${nodeIdx}`
              nodeIdx++
              const x = rowStartX + ci * (nodeW + gapX)
              const color = tplColors[elementId] ?? PALETTE[li % PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const visualRect = { x, y, width: nodeW, height: nodeH }

              return (
                <g key={ci}>
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                    <rect x={x} y={y} width={nodeW} height={nodeH} rx={6} fill={color} opacity={0.2} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
                    <text x={x + nodeW / 2} y={y + nodeH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
                      {node.title.length > 14 ? node.title.slice(0, 12) + '..' : node.title}
                    </text>
                    {isSelected && renderHandles(visualRect, elementId)}
                  </g>
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
