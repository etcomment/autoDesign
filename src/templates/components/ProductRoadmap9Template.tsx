import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function ProductRoadmap9Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, quarters, milestones } = data
  const W = 960
  const H = title ? 500 : 460
  const marginX = 60
  const barH = 48
  const barGap = 20
  const labelH = 20
  const topY = title ? 115 : 75

  const colW = (W - marginX * 2) / Math.max(quarters.length, 1)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {quarters.map((q, qi) => (
        <text key={`ql-${qi}`} x={marginX + qi * colW + colW / 2} y={topY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#888">
          {q.label} {q.year ?? ''}
        </text>
      ))}

      {milestones.map((m, mi) => {
        const elementId = `bar-${mi}`
        const qi = quarters.findIndex(q => q.label === m.quarter)
        if (qi < 0) return null
        const color = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const barX = marginX + qi * colW + 6
        const barW = colW - 12
        const barY = topY + labelH + mi * (barH + barGap)
        const visualRect = { x: barX, y: barY, width: barW, height: barH }

        return (
          <g key={`bar-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={barX} y={barY} width={barW} height={barH} rx={8} fill={color} opacity={isSelected ? 1 : 0.85} stroke={isSelected ? '#333' : undefined} strokeWidth={isSelected ? 1.5 : undefined} />
              <text x={barX + barW / 2} y={barY + barH / 2 - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {m.title}
              </text>
              {m.subtitle && (
                <text x={barX + barW / 2} y={barY + barH / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.8)">
                  {m.subtitle.length > 32 ? m.subtitle.slice(0, 30) + '..' : m.subtitle}
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
