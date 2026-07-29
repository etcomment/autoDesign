import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const BADGE_H = 28

export function ProductRoadmap12Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, quarters, milestones } = data
  const W = 960
  const marginX = 60
  const topY = title ? 110 : 70
  const circleR = 28
  const BADGE_H = 28
  const colW = (W - marginX * 2) / Math.max(quarters.length, 1)

  return (
    <g ref={svgRef}>
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 15, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? TITLE_COLOR
        const stroke = tplStrokeColors['main-title']
        const sW = tplStrokeWidths['main-title'] ?? 1
        return title ? (
          <g onMouseDown={e => startDrag(e, 'main-title', r)} style={{ cursor: 'pointer' }}>
            {title.split('\n').map((line, i) => (
              <text key={i} x={r.x + r.width / 2} y={r.y + 24 + i * 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
                {line}
              </text>
            ))}
            {selectedIds.has('main-title') && renderHandles(r, 'main-title')}
          </g>
        ) : null
      })()}

      {quarters.map((q, qi) => {
        const colX = marginX + qi * colW
        const centerX = colX + colW / 2
        const color = PALETTE[qi % PALETTE.length]!

        const headerId = `quarter-${qi}`
        const isHeaderSel = selectedIds.has(headerId)
        const headerFill = tplColors[headerId] ?? color
        const headerStroke = tplStrokeColors[headerId]
        const headerStrokeWidth = tplStrokeWidths[headerId] ?? 1
        const defaultHeaderRect = { x: centerX - circleR, y: topY, width: circleR * 2, height: circleR * 2 }
        const headerRect = pos[headerId] ?? defaultHeaderRect

        const quarterMilestones = milestones.filter(m => m.quarter === q.label)

        return (
          <g key={`q-${qi}`}>
            <g onMouseDown={e => startDrag(e, headerId, headerRect)} style={{ cursor: 'pointer' }}>
              <circle cx={headerRect.x + headerRect.width / 2} cy={headerRect.y + headerRect.height / 2} r={headerRect.width / 2} fill={headerFill} stroke={headerStroke} strokeWidth={headerStroke ? headerStrokeWidth : undefined} />
              <text x={headerRect.x + headerRect.width / 2} y={headerRect.y + headerRect.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {q.label}
              </text>
              {isHeaderSel && renderHandles(headerRect, headerId)}
            </g>

            {q.year && (
              <text x={centerX} y={topY + circleR * 2 + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">
                {q.year}
              </text>
            )}

            <line x1={centerX} y1={topY + circleR * 2 + 24} x2={centerX} y2={topY + circleR * 2 + 36} stroke={tplStrokeColors[`line-${qi}`] ?? '#cbd5e0'} strokeWidth={tplStrokeWidths[`line-${qi}`] ?? 1} />

            {quarterMilestones.map((m, mi) => {
              const elementId = `q-${qi}-m-${mi}`
              const mColor = tplColors[elementId] ?? m.style?.fill ?? PALETTE[mi % PALETTE.length]!
              const customStroke = tplStrokeColors[elementId]
              const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
              const styleStroke = m.style?.stroke
              const isSelected = selectedIds.has(elementId)
              const badgeY = topY + circleR * 2 + 44 + mi * (BADGE_H + 8)
              const textW = Math.min((m.subtitle ? m.title.length * 8 + 20 : m.title.length * 8 + 20), colW - 16)
              const badgeW = m.style?.boxWidth ?? Math.max(textW, 80)
              const badgeH = m.style?.boxHeight ?? BADGE_H
              const badgeX = centerX - badgeW / 2
              const defaultMRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }
              const visualRect = pos[elementId] ?? defaultMRect
              const styleFontSize = m.style?.fontSize ?? 11
              const styleFontWeight = m.style?.fontWeight ?? 600
              const styleFontColor = m.style?.fontColor ?? 'white'

              return (
                <g key={`qm-${qi}-${mi}`}>
                  <line x1={centerX} y1={visualRect.y - 8} x2={centerX} y2={visualRect.y} stroke={tplStrokeColors[`line-${qi}-${mi}`] ?? '#cbd5e0'} strokeWidth={1} />
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                    <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={visualRect.height / 2} fill={mColor} opacity={isSelected ? 1 : 0.85} stroke={customStroke || (isSelected ? '#333' : styleStroke)} strokeWidth={isSelected ? 2.5 : customStrokeWidth} />
                    <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + visualRect.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>
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
