import type { ReactElement } from 'react'
import type { BrainData } from '../types'
import { CurvedPath } from '../shared/primitives'

const PALETTE = ['#4a90d9', '#2ecc71', '#e67e22', '#e74c3c']

export function BrainTemplate({ data }: { data: BrainData }): ReactElement {
  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2
  const centerR = 55
  const branchW = 200
  const branchH = 66

  const positions: { angle: number; bx: number; by: number }[] = [
    { angle: -90, bx: cx - branchW / 2, by: 130 },
    { angle: 90, bx: cx - branchW / 2, by: H - 130 - branchH },
    { angle: 0, bx: cx + centerR + 50, by: cy - branchH / 2 },
    { angle: 180, bx: cx - centerR - 50 - branchW, by: cy - branchH / 2 },
  ]

  const usedBranches = branches.slice(0, 4)

  return (
    <g>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={centerR} fill="#1a1a2e" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
        {centerLabel.length > 14 ? centerLabel.slice(0, 12) + '...' : centerLabel}
      </text>

      {usedBranches.map((branch, i) => {
        const pos = positions[i]!
        const color = branch.color ?? PALETTE[i % PALETTE.length]!
        const branchMidX = pos.bx + branchW / 2
        const branchMidY = pos.by + branchH / 2

        const edgeX = cx + centerR * Math.cos(pos.angle * Math.PI / 180)
        const edgeY = cy + centerR * Math.sin(pos.angle * Math.PI / 180)

        return (
          <g key={i}>
            <CurvedPath points={[{ x: edgeX, y: edgeY }, { x: branchMidX, y: branchMidY }]} color={color} strokeWidth={2.5} />

            <rect x={pos.bx} y={pos.by} width={branchW} height={branchH} rx={10} fill={color} opacity={0.15} stroke={color} strokeWidth={2} />
            <text x={branchMidX} y={pos.by + branchH / 2 - 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
              {branch.title.length > 26 ? branch.title.slice(0, 24) + '...' : branch.title}
            </text>
            {branch.subtitle && (
              <text x={branchMidX} y={pos.by + branchH / 2 + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">
                {branch.subtitle.length > 30 ? branch.subtitle.slice(0, 28) + '...' : branch.subtitle}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
