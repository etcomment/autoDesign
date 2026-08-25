import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const BADGE_H = 34

function getDynamicIcon(iconName?: string, size = 16, color = '#ffffff'): ReactElement | null {
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

export function ProductRoadmap12Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)

  const { quarters = [], milestones = [] } = data
  const W = 960
  const marginX = 60
  const topY = 40
  const circleR = 28
  const colW = (W - marginX * 2) / Math.max(quarters.length, 1)

  return (
    <g ref={svgRef}>
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
            {/* Quarter Circle Header */}
            <g
              data-element-id={headerId}
              onMouseDown={e => startDrag(e, headerId, headerRect)}
              transform={getTransform(headerId, headerRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={headerRect.x + headerRect.width / 2}
                cy={headerRect.y + headerRect.height / 2}
                r={headerRect.width / 2}
                fill={headerFill}
                stroke={headerStroke}
                strokeWidth={headerStroke ? headerStrokeWidth : undefined}
              />
              <text
                x={headerRect.x + headerRect.width / 2}
                y={headerRect.y + headerRect.height / 2 + 4}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12.5}
                fontWeight={700}
                fill="#ffffff"
              >
                {q.label}
              </text>
              {isHeaderSel && renderHandles(headerRect, headerId)}
            </g>

            {/* Year Label */}
            {q.year && (() => {
              const yearId = `year-${qi}`
              const defaultYear = { x: centerX - 25, y: topY + circleR * 2 + 10, width: 50, height: 16 }
              const yr = pos[yearId] ?? defaultYear
              return (
                <g
                  data-element-id={yearId}
                  onMouseDown={e => startDrag(e, yearId, yr)}
                  transform={getTransform(yearId, yr)}
                  style={{ cursor: 'pointer' }}
                >
                  <text
                    x={yr.x + yr.width / 2}
                    y={yr.y + 12}
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize={11}
                    fontWeight={600}
                    fill={tplColors[yearId] ?? '#666666'}
                  >
                    {q.year}
                  </text>
                  {selectedIds.has(yearId) && renderHandles(yr, yearId)}
                </g>
              )
            })()}

            {/* Vertical connector line */}
            {(() => {
              const lineId = `line-${qi}`
              const defaultLine = { x: centerX - 1, y: topY + circleR * 2 + (q.year ? 28 : 12), width: 2, height: 14 }
              const lr = pos[lineId] ?? defaultLine
              return (
                <g
                  data-element-id={lineId}
                  onMouseDown={e => startDrag(e, lineId, lr)}
                  transform={getTransform(lineId, lr)}
                  style={{ cursor: 'pointer' }}
                >
                  <line
                    x1={lr.x + lr.width / 2}
                    y1={lr.y}
                    x2={lr.x + lr.width / 2}
                    y2={lr.y + lr.height}
                    stroke={tplStrokeColors[lineId] ?? '#cbd5e0'}
                    strokeWidth={tplStrokeWidths[lineId] ?? 1.5}
                  />
                  {selectedIds.has(lineId) && renderHandles(lr, lineId)}
                </g>
              )
            })()}

            {/* Milestone Badges */}
            {quarterMilestones.map((m, mi) => {
              const elementId = `q-${qi}-m-${mi}`
              const mColor = tplColors[elementId] ?? m.style?.fill ?? m.color ?? PALETTE[mi % PALETTE.length]!
              const customStroke = tplStrokeColors[elementId]
              const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
              const styleStroke = m.style?.stroke
              const isSelected = selectedIds.has(elementId)
              const badgeY = topY + circleR * 2 + (q.year ? 46 : 30) + mi * (BADGE_H + 10)
              const badgeW = m.style?.boxWidth ?? Math.min(colW - 16, 170)
              const badgeH = m.style?.boxHeight ?? BADGE_H
              const badgeX = centerX - badgeW / 2
              const defaultMRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }
              const visualRect = pos[elementId] ?? defaultMRect

              const styleFontSize = m.style?.fontSize ?? 11.5
              const styleFontWeight = m.style?.fontWeight ?? 600
              const styleFontColor = m.style?.fontColor ?? '#ffffff'

              const maxTitleChars = Math.max(6, Math.floor((visualRect.width - 24) / 7.5))
              const titleLines = wrapTextByWidth(m.title || '', maxTitleChars)

              const iconEl = getDynamicIcon(m.icon, 14, styleFontColor)

              return (
                <g key={`qm-${qi}-${mi}`}>
                  {/* Dynamic connection connector */}
                  {(() => {
                    const mLineId = `mline-${qi}-${mi}`
                    const defaultMLine = { x: centerX - 1, y: visualRect.y - 10, width: 2, height: 10 }
                    const lr = pos[mLineId] ?? defaultMLine
                    return (
                      <g
                        data-element-id={mLineId}
                        onMouseDown={e => startDrag(e, mLineId, lr)}
                        transform={getTransform(mLineId, lr)}
                        style={{ cursor: 'pointer' }}
                      >
                        <line
                          x1={lr.x + lr.width / 2}
                          y1={lr.y}
                          x2={lr.x + lr.width / 2}
                          y2={lr.y + lr.height}
                          stroke={tplStrokeColors[mLineId] ?? '#cbd5e0'}
                          strokeWidth={tplStrokeWidths[mLineId] ?? 1}
                        />
                        {selectedIds.has(mLineId) && renderHandles(lr, mLineId)}
                      </g>
                    )
                  })()}

                  {/* Pill Badge */}
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
                      rx={visualRect.height / 2}
                      fill={mColor}
                      opacity={isSelected ? 1 : 0.88}
                      stroke={customStroke || (isSelected ? '#4a90d9' : styleStroke)}
                      strokeWidth={isSelected ? 2.5 : customStrokeWidth}
                    />

                    <g transform={`translate(${visualRect.x + visualRect.width / 2}, ${visualRect.y + visualRect.height / 2 + 4 - (titleLines.length - 1) * 6})`}>
                      {iconEl && (
                        <g transform="translate(-16, -10)">
                          {iconEl}
                        </g>
                      )}
                      <text
                        x={iconEl ? 4 : 0}
                        y={0}
                        textAnchor="middle"
                        fontFamily="Arial, sans-serif"
                        fontSize={styleFontSize}
                        fontWeight={styleFontWeight}
                        fill={styleFontColor}
                      >
                        {titleLines.map((line, li) => (
                          <tspan key={li} x={iconEl ? 4 : 0} dy={li === 0 ? 0 : 13}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>

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
