import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Brain3Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const centerR = 44
  const orbitR = 200
  const nodeW = 130
  const nodeH = 46
  const count = Math.min(branches.length, 8)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={centerR} fill="#1a1a2e" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
        {centerLabel.length > 10 ? centerLabel.slice(0, 8) + '..' : centerLabel}
      </text>

      {branches.slice(0, count).map((branch, i) => {
        const elementId = `branch-${i}`
        const color = tplColors[elementId] ?? branch.color ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2
        const nx = cx + orbitR * Math.cos(angle)
        const ny = cy + orbitR * Math.sin(angle)
        const boxX = nx - nodeW / 2
        const boxY = ny - nodeH / 2
        const visualRect = { x: boxX, y: boxY, width: nodeW, height: nodeH }

        const dx = nx - cx
        const dy = ny - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const edgeX = cx + (dx / dist) * centerR
        const edgeY = cy + (dy / dist) * centerR

        return (
          <g key={i}>
            <line x1={edgeX} y1={edgeY} x2={nx} y2={ny} stroke={color} strokeWidth={1.5} opacity={0.5} />
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={boxX} y={boxY} width={nodeW} height={nodeH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={nx} y={ny + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#333">
                {branch.title.length > 16 ? branch.title.slice(0, 14) + '..' : branch.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {branches.slice(0, count).flatMap((_, i) =>
        branches.slice(i + 1, count).map((_, j) => {
          const jIdx = i + 1 + j
          const angle1 = (i / count) * 2 * Math.PI - Math.PI / 2
          const angle2 = (jIdx / count) * 2 * Math.PI - Math.PI / 2
          const x1 = cx + orbitR * Math.cos(angle1)
          const y1 = cy + orbitR * Math.sin(angle1)
          const x2 = cx + orbitR * Math.cos(angle2)
          const y2 = cy + orbitR * Math.sin(angle2)
          return <line key={`web-${i}-${jIdx}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d0d0d0" strokeWidth={0.8} strokeDasharray="3 4" opacity={0.4} />
        })
      )}
    </g>
  )
}
