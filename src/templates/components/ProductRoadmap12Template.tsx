import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const BADGE_H = 28

export function ProductRoadmap12Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
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

            {q.year && (() => {
              const yearId = `year-${qi}`
              const defaultYear = { x: centerX - 20, y: topY + circleR * 2 + 16 - 10, width: 40, height: 14 }
              const yr = pos[yearId] ?? defaultYear
              return (
                <g onMouseDown={e => startDrag(e, yearId, yr)} style={{ cursor: 'pointer' }}>
                  <text x={yr.x + yr.width/2} y={yr.y + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill={tplColors[yearId] ?? "#888"}>
                    {q.year}
                  </text>
                  {selectedIds.has(yearId) && renderHandles(yr, yearId)}
                </g>
              )
            })()}

            {(() => {
              const lineId = `line-${qi}`
              const defaultLine = { x: centerX - 1, y: topY + circleR * 2 + 24, width: 2, height: 12 }
              const lr = pos[lineId] ?? defaultLine
              return (
                <g onMouseDown={e => startDrag(e, lineId, lr)} transform={`translate(${lr.x - defaultLine.x}, ${lr.y - defaultLine.y})`} style={{ cursor: 'pointer' }}>
                  <line x1={defaultLine.x + 1} y1={defaultLine.y} x2={defaultLine.x + 1} y2={defaultLine.y + defaultLine.height} stroke={tplStrokeColors[lineId] ?? '#cbd5e0'} strokeWidth={tplStrokeWidths[lineId] ?? 1} />
                  {selectedIds.has(lineId) && renderHandles(lr, lineId)}
                </g>
              )
            })()}

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
                  {(() => {
                    const mLineId = `mline-${qi}-${mi}`
                    const defaultMLine = { x: centerX - 1, y: visualRect.y - 8, width: 2, height: 8 }
                    const lr = pos[mLineId] ?? defaultMLine
                    return (
                      <g onMouseDown={e => startDrag(e, mLineId, lr)} transform={`translate(${lr.x - defaultMLine.x}, ${lr.y - defaultMLine.y})`} style={{ cursor: 'pointer' }}>
                        <line x1={defaultMLine.x + 1} y1={defaultMLine.y} x2={defaultMLine.x + 1} y2={defaultMLine.y + defaultMLine.height} stroke={tplStrokeColors[mLineId] ?? '#cbd5e0'} strokeWidth={tplStrokeWidths[mLineId] ?? 1} />
                        {selectedIds.has(mLineId) && renderHandles(lr, mLineId)}
                      </g>
                    )
                  })()}
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
