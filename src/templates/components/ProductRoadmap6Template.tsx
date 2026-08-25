import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#3498db', '#e67e22', '#2ecc71', '#9b59b6']

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

export function ProductRoadmap6Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { milestones = [] } = data
  const W = 900
  const barH = 56
  const marginX = 60
  const marginTop = 50
  const gap = 14

  return (
    <g ref={svgRef}>
      {/* Timeline track line */}
      {(() => {
        const tId = 'timeline'
        const tr = pos[tId] ?? { x: marginX - 12, y: marginTop, width: 4, height: Math.max(100, milestones.length * (barH + gap)) }
        return (
          <g
            data-element-id={tId}
            onMouseDown={e => startDrag(e, tId, tr)}
            transform={getTransform(tId, tr)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={tr.x - 4} y={tr.y} width={tr.width + 8} height={tr.height} fill="transparent" />
            <line
              x1={tr.x + tr.width / 2}
              y1={tr.y}
              x2={tr.x + tr.width / 2}
              y2={tr.y + tr.height}
              stroke={tplStrokeColors[tId] ?? '#d0d7de'}
              strokeWidth={tplStrokeWidths[tId] ?? 2}
            />
            {selectedIds.has(tId) && renderHandles(tr, tId)}
          </g>
        )
      })()}

      {/* Milestones Rows */}
      {milestones.map((milestone, index) => {
        const elementId = `milestone-${index}`
        const qId = `quarter-${index}`
        const customStroke = tplStrokeColors[elementId]
        const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
        const isSelected = selectedIds.has(elementId)
        const isQSelected = selectedIds.has(qId)

        const defaultY = marginTop + index * (barH + gap)
        const qColor = tplColors[qId] ?? PALETTE[index % PALETTE.length]!
        const cardColor = tplColors[elementId] ?? milestone.style?.fill ?? '#ffffff'
        const defaultRect = {
          x: marginX + 44,
          y: defaultY,
          width: milestone.style?.boxWidth ?? (W - marginX - 120),
          height: milestone.style?.boxHeight ?? barH,
        }
        const rect = pos[elementId] ?? defaultRect
        const { x: rectX, y: rectY, width: rectW, height: rectH } = rect

        const defaultQR = { x: marginX + 6, y: defaultY, width: 30, height: barH }
        const qr = pos[qId] ?? defaultQR

        const styleFontSize = milestone.style?.fontSize ?? 13
        const styleFontWeight = milestone.style?.fontWeight ?? 600
        const styleFontColor = milestone.style?.fontColor ?? '#222222'

        const maxTitleChars = Math.max(8, Math.floor((rectW - 24) / 8))
        const maxSubChars = Math.max(12, Math.floor((rectW - 24) / 7))
        const titleLines = wrapTextByWidth(milestone.title || '', maxTitleChars)
        const subLines = milestone.subtitle ? wrapTextByWidth(milestone.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(milestone.icon, 18, qColor)
        const qText = milestone.quarter || milestone.date || `Q${(index % 4) + 1}`

        return (
          <g key={index}>
            {/* Quarter Badge */}
            <g
              data-element-id={qId}
              onMouseDown={e => startDrag(e, qId, qr)}
              transform={getTransform(qId, qr)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={qr.x} y={qr.y} width={qr.width} height={qr.height} rx={5} fill={qColor} />
              <text
                x={qr.x + qr.width / 2}
                y={qr.y + qr.height / 2 + 4}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10.5}
                fontWeight={700}
                fill="#ffffff"
              >
                {qText}
              </text>
              {isQSelected && renderHandles(qr, qId)}
            </g>

            {/* Milestone Card */}
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, rect)}
              transform={getTransform(elementId, rect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={rectX}
                y={rectY}
                width={rectW}
                height={rectH}
                rx={6}
                fill={cardColor}
                stroke={customStroke || (isSelected ? '#4a90d9' : (milestone.style?.stroke || '#e0e0e0'))}
                strokeWidth={isSelected ? 2.5 : customStrokeWidth}
              />

              <g transform={`translate(${rectX + 14}, ${rectY + (subLines.length > 0 ? 18 : rectH / 2 + 4)})`}>
                {iconEl && (
                  <g transform="translate(0, -11)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={iconEl ? 22 : 0}
                  y={0}
                  fontFamily="Arial, sans-serif"
                  fontSize={styleFontSize}
                  fontWeight={styleFontWeight}
                  fill={styleFontColor}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={iconEl ? 22 : 0} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {subLines.length > 0 && (
                <text
                  x={rectX + 14 + (iconEl ? 22 : 0)}
                  y={rectY + 18 + titleLines.length * 15 + 2}
                  fontFamily="Arial, sans-serif"
                  fontSize={10}
                  fill="#666666"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={rectX + 14 + (iconEl ? 22 : 0)} dy={li === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(rect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
