import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

function getDynamicIcon(iconName?: string, size = 18, color = '#23255a'): ReactElement | null {
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

export function ProductRoadmap7Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)

  const { quarters = [], milestones = [] } = data
  const W = 960
  const marginX = 40
  const topY = 40
  const numQuarters = Math.max(quarters.length, 1)
  const colW = (W - marginX * 2) / numQuarters
  const colPadding = 10
  const cardW = colW - colPadding * 2
  const cardH = 75

  return (
    <g ref={svgRef}>
      {quarters.map((q, qi) => {
        const colX = marginX + qi * colW
        const color = PALETTE[qi % PALETTE.length]!

        const headerId = `header-${qi}`
        const isHeaderSel = selectedIds.has(headerId)
        const headerFill = tplColors[headerId] ?? color
        const headerStroke = tplStrokeColors[headerId]
        const headerStrokeWidth = tplStrokeWidths[headerId] ?? 1
        const defaultHeaderRect = { x: colX + colPadding, y: topY, width: cardW, height: 32 }
        const headerRect = pos[headerId] ?? defaultHeaderRect

        const quarterMilestones = milestones.filter(m => m.quarter === q.label)

        return (
          <g key={`q-${qi}`}>
            {/* Column Quarter Header */}
            <g
              data-element-id={headerId}
              onMouseDown={e => startDrag(e, headerId, headerRect)}
              transform={getTransform(headerId, headerRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={headerRect.x}
                y={headerRect.y}
                width={headerRect.width}
                height={headerRect.height}
                rx={6}
                fill={headerFill}
                stroke={headerStroke}
                strokeWidth={headerStroke ? headerStrokeWidth : undefined}
              />
              <text
                x={headerRect.x + headerRect.width / 2}
                y={headerRect.y + headerRect.height / 2 + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={700}
                fill="#ffffff"
              >
                {q.label} {q.year ?? ''}
              </text>
              {isHeaderSel && renderHandles(headerRect, headerId)}
            </g>

            {/* Milestones in Column */}
            {quarterMilestones.map((m, mi) => {
              const elementId = `q-${qi}-m-${mi}`
              const mColor = tplColors[elementId] ?? m.style?.fill ?? m.color ?? PALETTE[mi % PALETTE.length]!
              const customStroke = tplStrokeColors[elementId]
              const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
              const styleStroke = m.style?.stroke
              const isSelected = selectedIds.has(elementId)

              const by = topY + 46 + mi * (cardH + 12)
              const defaultMRect = {
                x: colX + colPadding,
                y: by,
                width: m.style?.boxWidth ?? cardW,
                height: m.style?.boxHeight ?? cardH,
              }
              const visualRect = pos[elementId] ?? defaultMRect

              const styleFontSize = m.style?.fontSize ?? 12.5
              const styleFontWeight = m.style?.fontWeight ?? 700
              const styleFontColor = m.style?.fontColor ?? mColor

              const maxTitleChars = Math.max(6, Math.floor((visualRect.width - 24) / 7.5))
              const maxSubChars = Math.max(8, Math.floor((visualRect.width - 24) / 6.5))
              const titleLines = wrapTextByWidth(m.title || '', maxTitleChars)
              const subLines = m.subtitle ? wrapTextByWidth(m.subtitle, maxSubChars) : []

              const iconEl = getDynamicIcon(m.icon, 16, mColor)

              return (
                <g key={`qm-${qi}-${mi}`}>
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

                    <g transform={`translate(${visualRect.x + 12}, ${visualRect.y + (subLines.length > 0 ? 18 : visualRect.height / 2 + 4)})`}>
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
                        x={visualRect.x + 12 + (iconEl ? 20 : 0)}
                        y={visualRect.y + 18 + titleLines.length * 15 + 2}
                        textAnchor="start"
                        fontFamily="Arial, sans-serif"
                        fontSize={10}
                        fill="#666666"
                      >
                        {subLines.map((line, li) => (
                          <tspan key={li} x={visualRect.x + 12 + (iconEl ? 20 : 0)} dy={li === 0 ? 0 : 12}>
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
      })}
    </g>
  )
}
