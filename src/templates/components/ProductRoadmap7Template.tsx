import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function ProductRoadmap7Template({ data }: { data: ProductRoadmapData }): ReactElement {
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
  const marginX = 40
  const topY = title ? 110 : 70
  const colW = (W - marginX * 2) / Math.max(quarters.length, 1)
  const colPadding = 12
  const cardW = colW - colPadding * 2
  const cardH = 64

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
        const color = PALETTE[qi % PALETTE.length]!

        const headerId = `header-${qi}`
        const isHeaderSel = selectedIds.has(headerId)
        const headerFill = tplColors[headerId] ?? color
        const headerStroke = tplStrokeColors[headerId]
        const headerStrokeWidth = tplStrokeWidths[headerId] ?? 1
        const defaultHeaderRect = { x: colX + colPadding, y: topY, width: cardW, height: 30 }
        const headerRect = pos[headerId] ?? defaultHeaderRect

        const quarterMilestones = milestones.filter(m => m.quarter === q.label)

        return (
          <g key={`q-${qi}`}>
            <g onMouseDown={e => startDrag(e, headerId, headerRect)} style={{ cursor: 'pointer' }}>
              <rect x={headerRect.x} y={headerRect.y} width={headerRect.width} height={headerRect.height} rx={6} fill={headerFill} stroke={headerStroke} strokeWidth={headerStroke ? headerStrokeWidth : undefined} />
              <text x={headerRect.x + headerRect.width / 2} y={headerRect.y + headerRect.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {q.label} {q.year ?? ''}
              </text>
              {isHeaderSel && renderHandles(headerRect, headerId)}
            </g>

            {quarterMilestones.map((m, mi) => {
              const elementId = `q-${qi}-m-${mi}`
              const mColor = tplColors[elementId] ?? m.style?.fill ?? PALETTE[mi % PALETTE.length]!
              const customStroke = tplStrokeColors[elementId]
              const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
              const styleStroke = m.style?.stroke
              const isSelected = selectedIds.has(elementId)
              const by = topY + 44 + mi * (cardH + 12)
              const defaultMRect = { x: colX + colPadding, y: by, width: m.style?.boxWidth ?? cardW, height: m.style?.boxHeight ?? cardH }
              const visualRect = pos[elementId] ?? defaultMRect
              const styleFontSize = m.style?.fontSize ?? 13
              const styleFontWeight = m.style?.fontWeight ?? 700
              const styleFontColor = m.style?.fontColor ?? mColor

              return (
                <g key={`qm-${qi}-${mi}`}>
                  <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
                    <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={8} fill="white" stroke={customStroke || (isSelected ? '#4a90d9' : (styleStroke || '#e2e8f0'))} strokeWidth={isSelected ? 2.5 : customStrokeWidth} />
                    <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>
                      {m.title}
                    </text>
                    {m.subtitle && (
                      <text x={visualRect.x + visualRect.width / 2} y={visualRect.y + 44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
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
