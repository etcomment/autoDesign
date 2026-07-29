import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

const STATUS_COLUMNS = [
  { key: 'now', label: 'Now', color: '#3b82f6' },
  { key: 'next', label: 'Next', color: '#8b5cf6' },
  { key: 'later', label: 'Later', color: '#64748b' }
]

export function ProductRoadmap9Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones } = data
  const W = 960
  const marginX = 30
  const topY = title ? 100 : 60
  const colW = (W - marginX * 2) / 3
  const padding = 10
  const cardW = colW - padding * 2
  const cardH = 68

  return (
    <g ref={svgRef}>
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 15, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? '#1e293b'
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

      {STATUS_COLUMNS.map((col, ci) => {
        const colX = marginX + ci * colW
        const headerId = `status-header-${ci}`
        const bgId = `status-bg-${ci}`
        const hColor = tplColors[headerId] ?? col.color
        const hStroke = tplStrokeColors[headerId]
        const hStrokeWidth = tplStrokeWidths[headerId] ?? 1
        const defaultHRect = { x: colX + padding, y: topY, width: cardW, height: 32 }
        const hRect = pos[headerId] ?? defaultHRect
        const isHeaderSel = selectedIds.has(headerId)

        const defaultBGRect = { x: colX + padding / 2, y: topY + 40, width: colW - padding, height: 360 }
        const bgRect = pos[bgId] ?? defaultBGRect
        const bgFill = tplColors[bgId] ?? col.color
        const bgStroke = tplStrokeColors[bgId]
        const bgStrokeWidth = tplStrokeWidths[bgId] ?? 1
        const isBGSel = selectedIds.has(bgId)

        return (
          <g key={`col-${ci}`}>
            <g onMouseDown={e => startDrag(e, bgId, bgRect)} style={{ cursor: 'pointer' }}>
              <rect x={bgRect.x} y={bgRect.y} width={bgRect.width} height={bgRect.height} rx={10} fill={bgFill} opacity={0.06} stroke={bgStroke} strokeWidth={bgStroke ? bgStrokeWidth : undefined} />
              {isBGSel && renderHandles(bgRect, bgId)}
            </g>

            <g onMouseDown={e => startDrag(e, headerId, hRect)} style={{ cursor: 'pointer' }}>
              <rect x={hRect.x} y={hRect.y} width={hRect.width} height={hRect.height} rx={6} fill={hColor} stroke={hStroke} strokeWidth={hStroke ? hStrokeWidth : undefined} />
              <text x={hRect.x + hRect.width / 2} y={hRect.y + hRect.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {col.label}
              </text>
              {isHeaderSel && renderHandles(hRect, headerId)}
            </g>
          </g>
        )
      })}

      {milestones.map((m, mi) => {
        const mStatus = (m as any).status ?? (m.quarter?.toLowerCase() ?? 'now')
        const ci = Math.max(0, STATUS_COLUMNS.findIndex(c => c.key === mStatus || mStatus.includes(c.key)))
        const colX = marginX + ci * colW
        const colMs = milestones.filter(x => {
          const xStatus = (x as any).status ?? (x.quarter?.toLowerCase() ?? 'now')
          return Math.max(0, STATUS_COLUMNS.findIndex(c => c.key === xStatus || xStatus.includes(c.key))) === ci
        })
        const idxInCol = colMs.indexOf(m)

        const elementId = `kanban-m-${mi}`
        const color = tplColors[elementId] ?? m.style?.fill ?? STATUS_COLUMNS[ci]!.color
        const customStroke = tplStrokeColors[elementId]
        const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
        const styleStroke = m.style?.stroke
        const isSelected = selectedIds.has(elementId)
        const defaultY = topY + 48 + idxInCol * (cardH + 12)
        const defaultMRect = { x: colX + padding, y: defaultY, width: m.style?.boxWidth ?? cardW, height: m.style?.boxHeight ?? cardH }
        const visualRect = pos[elementId] ?? defaultMRect
        const styleFontSize = m.style?.fontSize ?? 13
        const styleFontWeight = m.style?.fontWeight ?? 700
        const styleFontColor = m.style?.fontColor ?? '#1e293b'

        return (
          <g key={`km-${mi}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={visualRect.height} rx={8} fill="white" stroke={customStroke || (isSelected ? '#4a90d9' : (styleStroke || '#e2e8f0'))} strokeWidth={isSelected ? 2.5 : customStrokeWidth} />
              <rect x={visualRect.x} y={visualRect.y} width={4} height={visualRect.height} rx={2} fill={color} />
              <text x={visualRect.x + 14} y={visualRect.y + 24} fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>
                {m.title}
              </text>
              {m.subtitle && (
                <text x={visualRect.x + 14} y={visualRect.y + 44} fontFamily="Arial, sans-serif" fontSize={10} fill="#64748b">
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
