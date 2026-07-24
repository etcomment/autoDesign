import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const BADGE_H = 28

export function ProductRoadmap12Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, quarters, milestones } = data
  const W = 960
  const H = title ? 520 : 480
  const marginX = 60
  const topY = title ? 110 : 70
  const circleR = 28
  const colW = (W - marginX * 2) / Math.max(quarters.length, 1)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {quarters.map((q, qi) => {
        const colX = marginX + qi * colW
        const centerX = colX + colW / 2
        const color = PALETTE[qi % PALETTE.length]!

        const headerId = `quarter-${qi}`
        const isHeaderSel = selectedIds.has(headerId)
        const headerFill = tplColors[headerId] ?? color
        const headerRect = { x: centerX - circleR, y: topY, width: circleR * 2, height: circleR * 2 }

        return (
          <g key={`q-${qi}`}>
            <g onMouseDown={e => startDrag(e, headerId, headerRect)} style={{ cursor: 'pointer' }}>
              <circle cx={centerX} cy={topY + circleR} r={circleR} fill={headerFill} />
              <text x={centerX} y={topY + circleR + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {q.label}
              </text>
              {isHeaderSel && renderHandles(headerRect, headerId)}
            </g>

            {q.year && (
              <text x={centerX} y={topY + circleR * 2 + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">
                {q.year}
              </text>
            )}

            <line x1={centerX} y1={topY + circleR * 2 + 24} x2={centerX} y2={topY + circleR * 2 + 36} stroke="#cbd5e0" strokeWidth={1} />

            {milestones.filter(m => m.quarter === q.label).map((m, mi) => {
              const elementId = `q-${qi}-m-${mi}`
              const mColor = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const badgeY = topY + circleR * 2 + 44 + mi * (BADGE_H + 8)
              const textW = Math.min((m.subtitle ? m.title.length * 8 + 20 : m.title.length * 8 + 20), colW - 16)
              const badgeW = Math.max(textW, 80)
              const badgeX = centerX - badgeW / 2
              const visualRect = { x: badgeX, y: badgeY, width: badgeW, height: BADGE_H }

              return (
                <g key={`qm-${qi}-${mi}`}>
                  <line x1={centerX} y1={badgeY - 8} x2={centerX} y2={badgeY} stroke="#cbd5e0" strokeWidth={1} />
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                    <rect x={badgeX} y={badgeY} width={badgeW} height={BADGE_H} rx={14} fill={mColor} opacity={isSelected ? 1 : 0.85} stroke={isSelected ? '#333' : undefined} strokeWidth={isSelected ? 1.5 : undefined} />
                    <text x={centerX} y={badgeY + BADGE_H / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="white">
                      {m.title}
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
