import type { ReactElement } from 'react'
import type { BusinessData } from '../types'
import { CircleBadge } from '../shared/primitives'

const PALETTE = ['#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function BusinessTemplate({ data }: { data: BusinessData }): ReactElement {
  const { title, centerLabel, nodes } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const centerR = 48
  const orbitR = 170
  const nodeW = 170
  const nodeH = 60
  const count = Math.min(nodes.length, 6)

  return (
    <g>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={centerR} fill="#1a1a2e" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
        {centerLabel.length > 14 ? centerLabel.slice(0, 12) + '...' : centerLabel}
      </text>

      {nodes.slice(0, count).map((node, i) => {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2
        const nx = cx + orbitR * Math.cos(angle)
        const ny = cy + orbitR * Math.sin(angle)
        const color = PALETTE[i % PALETTE.length]!
        const boxX = nx - nodeW / 2
        const boxY = ny - nodeH / 2

        const dx = nx - cx
        const dy = ny - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const edgeX = cx + (dx / dist) * centerR
        const edgeY = cy + (dy / dist) * centerR

        const ndx = cx - nx
        const ndy = cy - ny
        const ndist = Math.sqrt(ndx * ndx + ndy * ndy)
        const nodeEdgeX = nx + (ndx / ndist) * (nodeW / 2)
        const nodeEdgeY = ny + (ndy / ndist) * (nodeH / 2)

        return (
          <g key={i}>
            <line x1={edgeX} y1={edgeY} x2={nodeEdgeX} y2={nodeEdgeY} stroke={color} strokeWidth={2} opacity={0.5} />

            <rect x={boxX} y={boxY} width={nodeW} height={nodeH} rx={8} fill="white" stroke={color} strokeWidth={2} />
            <CircleBadge cx={boxX + 20} cy={boxY + nodeH / 2} r={12} fill={color} label={String(i + 1)} fontSize={10} />

            <text x={boxX + 42} y={boxY + nodeH / 2 - 6} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#333">
              {node.title.length > 22 ? node.title.slice(0, 20) + '...' : node.title}
            </text>
            {node.subtitle && (
              <text x={boxX + 42} y={boxY + nodeH / 2 + 10} fontFamily="Arial, sans-serif" fontSize={9} fill="#777">
                {node.subtitle.length > 24 ? node.subtitle.slice(0, 22) + '...' : node.subtitle}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
