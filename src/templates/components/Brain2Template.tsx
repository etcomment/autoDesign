import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { CurvedPath } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#e74c3c']

export function Brain2Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 20
  const centerR = 48
  const branchW = 180
  const branchH = 56
  const branchGapX = 80
  const branchGapY = 30

  const visible = branches.slice(0, 6)
  const leftBranches = visible.slice(0, Math.ceil(visible.length / 2))
  const rightBranches = visible.slice(Math.ceil(visible.length / 2))

  const renderBranch = (branch: (typeof visible)[0], i: number, isLeft: boolean) => {
    const elementId = `branch-${isLeft ? 'l' : 'r'}-${i}`
    const color = tplColors[elementId] ?? branch.color ?? PALETTE[i % PALETTE.length]!
    const isSelected = selectedIds.has(elementId)
    const bx = isLeft
      ? cx - centerR - branchGapX - branchW
      : cx + centerR + branchGapX
    const by = cy - ((isLeft ? leftBranches : rightBranches).length * (branchH + branchGapY)) / 2 + i * (branchH + branchGapY)
    const visualRect = { x: bx, y: by, width: branchW, height: branchH }

    const fromX = isLeft ? cx - centerR : cx + centerR
    const toX = isLeft ? bx + branchW : bx

    return (
      <g key={`${isLeft ? 'l' : 'r'}-${i}`}>
        <CurvedPath points={[{ x: fromX, y: cy }, { x: toX, y: by + branchH / 2 }]} color={color} strokeWidth={2} />
        <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
          <rect x={bx} y={by} width={branchW} height={branchH} rx={10} fill={color} opacity={isSelected ? 0.25 : 0.12} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
          <text x={bx + branchW / 2} y={by + branchH / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
            {branch.title.length > 22 ? branch.title.slice(0, 20) + '..' : branch.title}
          </text>
          {branch.subtitle && (
            <text x={bx + branchW / 2} y={by + branchH / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#777">
              {branch.subtitle.length > 24 ? branch.subtitle.slice(0, 22) + '..' : branch.subtitle}
            </text>
          )}
          {isSelected && renderHandles(visualRect, elementId)}
        </g>
      </g>
    )
  }

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={centerR} fill="#1a1a2e" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
        {centerLabel.length > 12 ? centerLabel.slice(0, 10) + '..' : centerLabel}
      </text>

      {leftBranches.map((b, i) => renderBranch(b, i, true))}
      {rightBranches.map((b, i) => renderBranch(b, i, false))}
    </g>
  )
}
