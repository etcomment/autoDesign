import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12']

export function Brain4Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const rootY = 90
  const trunkH = 60
  const nodeW = 150
  const nodeH = 44
  const levelGap = 90
  const levels = [1, 2, 3]

  let nodeIdx = 0

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={rootY} r={30} fill="#1a1a2e" />
      <text x={cx} y={rootY + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
        {centerLabel.length > 10 ? centerLabel.slice(0, 8) + '..' : centerLabel}
      </text>

      <line x1={cx} y1={rootY + 30} x2={cx} y2={rootY + trunkH} stroke="#8B4513" strokeWidth={4} opacity={0.4} />

      {levels.map((count, li) => {
        const levelY = rootY + trunkH + (li + 1) * levelGap
        const totalRowW = count * nodeW + (count - 1) * 30
        const rowStartX = cx - totalRowW / 2

        return (
          <g key={li}>
            {Array.from({ length: count }).map((_, ci) => {
              const branch = branches[nodeIdx % branches.length]!
              const elementId = `node-${nodeIdx}`
              nodeIdx++
              const x = rowStartX + ci * (nodeW + 30)
              const y = levelY - nodeH / 2
              const color = tplColors[elementId] ?? branch.color ?? PALETTE[li % PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const visualRect = { x, y, width: nodeW, height: nodeH }

              const parentIdx = Math.floor(ci / 2)
              const prevTotal = levels.slice(0, li).reduce((s, c) => s + c, 0)

              return (
                <g key={ci}>
                  {li > 0 && (
                    <line
                      x1={cx - (prevTotal > 1 ? (prevTotal - 1) * (nodeW + 30) / 2 : 0) + parentIdx * (nodeW + 30) + nodeW / 2}
                      y1={levelY - levelGap + nodeH / 2}
                      x2={x + nodeW / 2}
                      y2={y}
                      stroke={color}
                      strokeWidth={1.5}
                      opacity={0.4}
                    />
                  )}
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                    <rect x={x} y={y} width={nodeW} height={nodeH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
                    <text x={x + nodeW / 2} y={y + nodeH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                      {branch.title.length > 18 ? branch.title.slice(0, 16) + '..' : branch.title}
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
