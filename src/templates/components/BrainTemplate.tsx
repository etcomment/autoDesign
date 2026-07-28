import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { CurvedPath, wrapTextByWidth } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#e74c3c']

export function BrainTemplate({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, centerLabel, branches } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2
  const centerR = 55
  const branchW2 = 200
  const branchH2 = 66

  const branchPositions: { angle: number; bx: number; by: number }[] = [
    { angle: -90, bx: cx - branchW2 / 2, by: 130 },
    { angle: 90, bx: cx - branchW2 / 2, by: H - 130 - branchH2 },
    { angle: 0, bx: cx + centerR + 50, by: cy - branchH2 / 2 },
    { angle: 180, bx: cx - centerR - 50 - branchW2, by: cy - branchH2 / 2 },
  ]

  const usedBranches = branches.slice(0, 4)

  return (
    <g ref={svgRef}>
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
        const elementId = `branch-${i}`
        const pos = branchPositions[i % branchPositions.length]!
        const color = tplColors[elementId] ?? branch.color ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const customPos = templateElementPositions[elementId]
        const visualRect = { 
          x: customPos?.x ?? pos.bx, 
          y: customPos?.y ?? pos.by, 
          width: customPos?.width ?? branchW2, 
          height: customPos?.height ?? branchH2 
        }
        
        const branchMidX = visualRect.x + visualRect.width / 2
        const branchMidY = visualRect.y + visualRect.height / 2
        
        const edgeX = cx + centerR * Math.cos(pos.angle * Math.PI / 180)
        const edgeY = cy + centerR * Math.sin(pos.angle * Math.PI / 180)

        return (
          <g key={i}>
            <CurvedPath points={[{ x: edgeX, y: edgeY }, { x: branchMidX, y: branchMidY }]} color={color} strokeWidth={2.5} />

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={10} fill={color} opacity={isSelected ? 0.25 : 0.15} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={branchMidX} y={visualRect.y + visualRect.height / 2 - 7} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={color}>
                {branch.title}
              </text>
              {branch.subtitle && (
                <text x={branchMidX} y={visualRect.y + visualRect.height / 2 + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#555">
                  {wrapTextByWidth(branch.subtitle, Math.max(15, Math.floor(visualRect.width / 6.5))).join(' ')}
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
