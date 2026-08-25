import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap4Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']
const CHEVRON_OFFSET = 16

function getDynamicIcon(iconName?: string, size = 18, color = '#ffffff'): ReactElement | null {
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

export function ProductRoadmap4Template({ data }: { data: ProductRoadmap4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { quarters = [], milestones = [] } = data
  const W = 1100
  const H = 420
  const topMargin = 50
  const stepW = 200
  const stepH = 110
  const gap = 12

  const sorted = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  if (sorted.length === 0) {
    return <g ref={svgRef} />
  }

  const leftOffset = Math.max(30, (W - sorted.length * (stepW + gap) + gap) / 2)

  return (
    <g ref={svgRef}>
      {sorted.map((milestone, mi) => {
        const elementId = `milestone-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const color = tplColors[elementId] ?? milestone.style?.fill ?? milestone.color ?? PALETTE[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || color))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)

        const defaultX = leftOffset + mi * (stepW + gap)
        const defaultY = topMargin + (H - topMargin - stepH) / 2
        const defaultW = milestone.style?.boxWidth ?? stepW
        const defaultH = milestone.style?.boxHeight ?? stepH
        const visualRect = pos[elementId] ?? { x: defaultX, y: defaultY, width: defaultW, height: defaultH }
        const { x, y, width: curW, height: curH } = visualRect

        const points = [
          `${x},${y}`,
          `${x + curW},${y}`,
          `${x + curW + CHEVRON_OFFSET},${y + curH / 2}`,
          `${x + curW},${y + curH}`,
          `${x},${y + curH}`,
          `${x + CHEVRON_OFFSET},${y + curH / 2}`,
        ].join(' ')

        const styleFontSize = milestone.style?.fontSize ?? 13
        const styleFontWeight = milestone.style?.fontWeight ?? 700
        const styleFontColor = milestone.style?.fontColor ?? '#ffffff'

        const maxTitleChars = Math.max(6, Math.floor((curW - 20) / 8))
        const maxSubChars = Math.max(8, Math.floor((curW - 20) / 7))
        const titleLines = wrapTextByWidth(milestone.title || '', maxTitleChars)
        const subLines = milestone.subtitle ? wrapTextByWidth(milestone.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(milestone.icon, 18, styleFontColor)

        return (
          <g key={`m-${mi}`}>
            {/* Arrow connector between chevrons */}
            {mi < sorted.length - 1 && (() => {
              const arrId = `arrow-${mi}`
              const arrRect = pos[arrId] ?? {
                x: x + curW + CHEVRON_OFFSET + 2,
                y: y + curH / 2 - 10,
                width: gap - 4,
                height: 20,
              }
              const arrStroke = tplStrokeColors[arrId] ?? color
              const arrStrokeW = tplStrokeWidths[arrId] ?? 2
              return (
                <g
                  data-element-id={arrId}
                  onMouseDown={e => startDrag(e, arrId, arrRect)}
                  transform={getTransform(arrId, arrRect)}
                  style={{ cursor: 'pointer' }}
                >
                  <line
                    x1={arrRect.x}
                    y1={arrRect.y + arrRect.height / 2}
                    x2={arrRect.x + arrRect.width}
                    y2={arrRect.y + arrRect.height / 2}
                    stroke={arrStroke}
                    strokeWidth={arrStrokeW}
                    strokeDasharray="2 2"
                  />
                  {selectedIds.has(arrId) && renderHandles(arrRect, arrId)}
                </g>
              )
            })()}

            {/* Chevron shape */}
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <polygon
                points={points}
                fill={color}
                stroke={stroke}
                strokeWidth={strokeWidth}
              />

              {/* Quarter Pill inside Chevron */}
              {milestone.quarter && (
                <g transform={`translate(${x + CHEVRON_OFFSET + 8}, ${y + 12})`}>
                  <rect
                    x={0}
                    y={0}
                    width={48}
                    height={18}
                    rx={4}
                    fill="#ffffff"
                    opacity={0.25}
                  />
                  <text
                    x={24}
                    y={13}
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize={10}
                    fontWeight={700}
                    fill="#ffffff"
                  >
                    {milestone.quarter}
                  </text>
                </g>
              )}

              {/* Title and Subtitle */}
              <g transform={`translate(${x + CHEVRON_OFFSET + 8}, ${y + (milestone.quarter ? 44 : 28)})`}>
                {iconEl && (
                  <g transform="translate(0, -10)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={iconEl ? 22 : 0}
                  y={0}
                  textAnchor="start"
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
                  x={x + CHEVRON_OFFSET + 8}
                  y={y + (milestone.quarter ? 44 : 28) + titleLines.length * 15 + 4}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={10.5}
                  fill="rgba(255,255,255,0.9)"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={x + CHEVRON_OFFSET + 8} dy={li === 0 ? 0 : 13}>
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
