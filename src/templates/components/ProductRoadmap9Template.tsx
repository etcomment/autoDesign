import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const STATUS_COLUMNS = [
  { key: 'now', label: 'Now', color: '#3b82f6' },
  { key: 'next', label: 'Next', color: '#8b5cf6' },
  { key: 'later', label: 'Later', color: '#64748b' },
]

function getDynamicIcon(iconName?: string, size = 16, color = '#3b82f6'): ReactElement | null {
  if (!iconName) return null
  const clean = iconName.trim()

  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn({ size, color })

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const lucideRecord = LucideIcons as Record<string, unknown>
  const LucideFn = (lucideRecord[pascalName] || lucideRecord[clean] || lucideRecord[clean.toUpperCase()]) as
    | React.ComponentType<{ size?: number; color?: string }>
    | undefined

  if (LucideFn) {
    return <LucideFn size={size} color={color} />
  }

  return null
}

export function ProductRoadmap9Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)

  const { milestones = [] } = data
  const W = 960
  const marginX = 30
  const topY = 40
  const colW = (W - marginX * 2) / 3
  const padding = 10
  const cardW = colW - padding * 2
  const cardH = 75

  return (
    <g ref={svgRef}>
      {/* Column Headers and Column Backgrounds */}
      {STATUS_COLUMNS.map((col, ci) => {
        const colX = marginX + ci * colW
        const headerId = `status-header-${ci}`
        const bgId = `status-bg-${ci}`
        const hColor = tplColors[headerId] ?? col.color
        const hStroke = tplStrokeColors[headerId]
        const hStrokeWidth = tplStrokeWidths[headerId] ?? 1
        const defaultHRect = { x: colX + padding, y: topY, width: cardW, height: 34 }
        const hRect = pos[headerId] ?? defaultHRect
        const isHeaderSel = selectedIds.has(headerId)

        const defaultBGRect = { x: colX + padding / 2, y: topY + 44, width: colW - padding, height: 420 }
        const bgRect = pos[bgId] ?? defaultBGRect
        const bgFill = tplColors[bgId] ?? col.color
        const bgStroke = tplStrokeColors[bgId]
        const bgStrokeWidth = tplStrokeWidths[bgId] ?? 1
        const isBGSel = selectedIds.has(bgId)

        return (
          <g key={`col-${ci}`}>
            {/* Column Background */}
            <g
              data-element-id={bgId}
              onMouseDown={e => startDrag(e, bgId, bgRect)}
              transform={getTransform(bgId, bgRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={bgRect.x}
                y={bgRect.y}
                width={bgRect.width}
                height={bgRect.height}
                rx={10}
                fill={bgFill}
                opacity={0.06}
                stroke={bgStroke}
                strokeWidth={bgStroke ? bgStrokeWidth : undefined}
              />
              {isBGSel && renderHandles(bgRect, bgId)}
            </g>

            {/* Column Header */}
            <g
              data-element-id={headerId}
              onMouseDown={e => startDrag(e, headerId, hRect)}
              transform={getTransform(headerId, hRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={hRect.x}
                y={hRect.y}
                width={hRect.width}
                height={hRect.height}
                rx={6}
                fill={hColor}
                stroke={hStroke}
                strokeWidth={hStroke ? hStrokeWidth : undefined}
              />
              <text
                x={hRect.x + hRect.width / 2}
                y={hRect.y + hRect.height / 2 + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13.5}
                fontWeight={700}
                fill="#ffffff"
              >
                {col.label}
              </text>
              {isHeaderSel && renderHandles(hRect, headerId)}
            </g>
          </g>
        )
      })}

      {/* Kanban Milestone Cards */}
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
        const color = tplColors[elementId] ?? m.style?.fill ?? m.color ?? STATUS_COLUMNS[ci]!.color
        const customStroke = tplStrokeColors[elementId]
        const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
        const styleStroke = m.style?.stroke
        const isSelected = selectedIds.has(elementId)

        const defaultY = topY + 54 + idxInCol * (cardH + 12)
        const defaultMRect = { x: colX + padding, y: defaultY, width: m.style?.boxWidth ?? cardW, height: m.style?.boxHeight ?? cardH }
        const visualRect = pos[elementId] ?? defaultMRect

        const styleFontSize = m.style?.fontSize ?? 12.5
        const styleFontWeight = m.style?.fontWeight ?? 700
        const styleFontColor = m.style?.fontColor ?? '#1e293b'

        const maxTitleChars = Math.max(6, Math.floor((visualRect.width - 24) / 7.5))
        const maxSubChars = Math.max(8, Math.floor((visualRect.width - 24) / 6.5))
        const titleLines = wrapTextByWidth(m.title || '', maxTitleChars)
        const subLines = m.subtitle ? wrapTextByWidth(m.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(m.icon, 16, color)

        return (
          <g key={`km-${mi}`}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={visualRect.x}
                y={visualRect.y}
                width={visualRect.width}
                height={visualRect.height}
                rx={8}
                fill="#ffffff"
                stroke={customStroke || (isSelected ? '#4a90d9' : (styleStroke || '#e2e8f0'))}
                strokeWidth={isSelected ? 2.5 : customStrokeWidth}
              />
              <rect x={visualRect.x} y={visualRect.y} width={4} height={visualRect.height} rx={2} fill={color} />

              <g transform={`translate(${visualRect.x + 14}, ${visualRect.y + (subLines.length > 0 ? 18 : visualRect.height / 2 + 4)})`}>
                {iconEl && (
                  <g transform="translate(0, -11)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={iconEl ? 20 : 0}
                  y={0}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={styleFontSize}
                  fontWeight={styleFontWeight}
                  fill={styleFontColor}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={iconEl ? 20 : 0} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {subLines.length > 0 && (
                <text
                  x={visualRect.x + 14 + (iconEl ? 20 : 0)}
                  y={visualRect.y + 18 + titleLines.length * 15 + 2}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={10}
                  fill="#64748b"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={visualRect.x + 14 + (iconEl ? 20 : 0)} dy={li === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
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
