import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function ProductRoadmap7Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, quarters, milestones } = data
  const W = 960
  const H = 540
  const marginX = 40
  const topY = title ? 110 : 70
  const colW = (W - marginX * 2) / Math.max(quarters.length, 1)
  const colPadding = 12
  const cardW = colW - colPadding * 2
  const cardH = 64

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
        const color = PALETTE[qi % PALETTE.length]!

        const headerId = `header-${qi}`
        const isHeaderSel = selectedIds.has(headerId)
        const headerFill = tplColors[headerId] ?? color
        const headerRect = { x: colX + colPadding, y: topY, width: cardW, height: 30 }

        const quarterMilestones = milestones.filter(m => m.quarter === q.label)

        return (
          <g key={`q-${qi}`}>
            <g onMouseDown={e => startDrag(e, headerId, headerRect)} style={{ cursor: 'pointer' }}>
              <rect x={headerRect.x} y={headerRect.y} width={headerRect.width} height={headerRect.height} rx={6} fill={headerFill} />
              <text x={colX + colW / 2} y={topY + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {q.label} {q.year ?? ''}
              </text>
              {isHeaderSel && renderHandles(headerRect, headerId)}
            </g>

            {quarterMilestones.map((m, mi) => {
              const elementId = `q-${qi}-m-${mi}`
              const mColor = tplColors[elementId] ?? PALETTE[mi % PALETTE.length]!
              const isSelected = selectedIds.has(elementId)
              const by = topY + 44 + mi * (cardH + 12)
              const visualRect = { x: colX + colPadding, y: by, width: cardW, height: cardH }

              return (
                <g key={`qm-${qi}-${mi}`}>
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                    <rect x={visualRect.x} y={visualRect.y} width={cardW} height={cardH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSelected ? 2.5 : 1.5} />
                    <text x={colX + colW / 2} y={by + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={mColor}>
                      {m.title}
                    </text>
                    {m.subtitle && (
                      <text x={colX + colW / 2} y={by + 44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
                        {m.subtitle.length > 28 ? m.subtitle.slice(0, 26) + '..' : m.subtitle}
                      </text>
                    )}
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
