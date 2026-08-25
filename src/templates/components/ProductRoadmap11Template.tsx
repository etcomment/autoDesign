import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { Arrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const CARD_W = 240
const CARD_H = 80
const HEADER_H = 30

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

export function ProductRoadmap11Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)

  const { milestones = [] } = data
  const count = Math.min(milestones.length, 5)
  const startX = 40
  const cardY = 50

  return (
    <g ref={svgRef}>
      {milestones.slice(0, 5).map((m, mi) => {
        const elementId = `card-${mi}`
        const color = tplColors[elementId] ?? m.style?.fill ?? m.color ?? PALETTE[mi % PALETTE.length]!
        const customStroke = tplStrokeColors[elementId]
        const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
        const styleStroke = m.style?.stroke
        const isSelected = selectedIds.has(elementId)

        const cx = startX + mi * (CARD_W + 40)
        const defaultMRect = { x: cx, y: cardY, width: m.style?.boxWidth ?? CARD_W, height: m.style?.boxHeight ?? CARD_H }
        const visualRect = pos[elementId] ?? defaultMRect

        const styleFontSize = m.style?.fontSize ?? 13
        const styleFontWeight = m.style?.fontWeight ?? 700
        const styleFontColor = m.style?.fontColor ?? '#ffffff'

        const maxTitleChars = Math.max(6, Math.floor((visualRect.width - 24) / 8))
        const maxSubChars = Math.max(8, Math.floor((visualRect.width - 24) / 7))
        const titleLines = wrapTextByWidth(m.title || '', maxTitleChars)
        const subLines = m.subtitle ? wrapTextByWidth(m.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(m.icon, 16, styleFontColor)

        return (
          <g key={`card-${mi}`}>
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
                rx={10}
                fill="#ffffff"
                stroke={customStroke || (isSelected ? '#4a90d9' : (styleStroke || '#cbd5e0'))}
                strokeWidth={isSelected ? 2.5 : customStrokeWidth}
              />
              <rect x={visualRect.x} y={visualRect.y} width={visualRect.width} height={HEADER_H} rx={10} fill={color} />
              <rect x={visualRect.x} y={visualRect.y + HEADER_H - 10} width={visualRect.width} height={10} fill={color} />

              <g transform={`translate(${visualRect.x + visualRect.width / 2}, ${visualRect.y + HEADER_H / 2 + 5})`}>
                {iconEl && (
                  <g transform="translate(-18, -11)">
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
                    <tspan key={li} x={iconEl ? 4 : 0} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {subLines.length > 0 && (
                <text
                  x={visualRect.x + visualRect.width / 2}
                  y={visualRect.y + HEADER_H + 20}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={10.5}
                  fill="#555555"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={visualRect.x + visualRect.width / 2} dy={li === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(visualRect, elementId)}
            </g>

            {/* Dynamic Arrow Connector */}
            {mi < count - 1 && (() => {
              const arrowId = `arrow-${mi}`
              const nextCardId = `card-${mi + 1}`
              const nextCardRect = pos[nextCardId] ?? { x: startX + (mi + 1) * (CARD_W + 40), y: cardY, width: CARD_W, height: CARD_H }
              const arrowR = pos[arrowId] ?? {
                x: visualRect.x + visualRect.width,
                y: visualRect.y + visualRect.height / 2 - 10,
                width: Math.max(10, nextCardRect.x - (visualRect.x + visualRect.width)),
                height: 20,
              }
              return (
                <g
                  data-element-id={arrowId}
                  onMouseDown={e => startDrag(e, arrowId, arrowR)}
                  transform={getTransform(arrowId, arrowR)}
                  style={{ cursor: 'pointer' }}
                >
                  <Arrow
                    from={{ x: visualRect.x + visualRect.width + 4, y: visualRect.y + visualRect.height / 2 }}
                    to={{ x: nextCardRect.x - 4, y: nextCardRect.y + nextCardRect.height / 2 }}
                    color={tplColors[arrowId] ?? '#a0aec0'}
                    strokeWidth={tplStrokeWidths[arrowId] ?? 2}
                  />
                  {selectedIds.has(arrowId) && renderHandles(arrowR, arrowId)}
                </g>
              )
            })()}
          </g>
        )
      })}
    </g>
  )
}
