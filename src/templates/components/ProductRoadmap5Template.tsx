import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

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

export function ProductRoadmap5Template({ data }: { data: ProductRoadmap5Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { quarters = [], milestones = [] } = data
  const W = 1040
  const H = 580
  const timelineY = H / 2
  const cardW = 180
  const cardH = 95

  const sorted = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  if (sorted.length === 0) {
    return <g ref={svgRef} />
  }

  const spacing = Math.min(260, (W - 80) / sorted.length)
  const startX = 60 + Math.max(0, (W - 80 - sorted.length * spacing) / 2)

  const quarterBoundaries: Array<{ qi: number; x: number; label: string; color: string }> = []
  let lastQi = -1
  for (let i = 0; i < sorted.length; i++) {
    const qi = quarters.findIndex(q => q.label === sorted[i]!.quarter)
    if (qi !== lastQi && qi >= 0) {
      quarterBoundaries.push({
        qi,
        x: startX + i * spacing,
        label: quarters[qi]!.label,
        color: PALETTE[qi % PALETTE.length]!,
      })
      lastQi = qi
    }
  }

  return (
    <g ref={svgRef}>
      {/* Quarter Headers */}
      {quarterBoundaries.map((qb, bi) => {
        const nextX = bi < quarterBoundaries.length - 1
          ? quarterBoundaries[bi + 1]!.x
          : startX + sorted.length * spacing
        const qW = nextX - qb.x
        const qId = `quarter-boundary-${bi}`
        const defaultQRect = { x: qb.x, y: 30, width: qW, height: 40 }
        const qRect = pos[qId] ?? defaultQRect
        const qColor = tplColors[qId] ?? qb.color
        const qStroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : qb.color)
        const qStrokeWidth = tplStrokeWidths[qId] ?? (selectedIds.has(qId) ? 2.5 : 1)
        const isSelected = selectedIds.has(qId)

        return (
          <g
            key={`qb-${bi}`}
            data-element-id={qId}
            onMouseDown={e => startDrag(e, qId, qRect)}
            transform={getTransform(qId, qRect)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={qRect.x}
              y={qRect.y}
              width={qRect.width}
              height={qRect.height}
              rx={6}
              fill={qColor}
              opacity={0.12}
              stroke={qStroke}
              strokeWidth={qStrokeWidth}
            />
            <text
              x={qRect.x + qRect.width / 2}
              y={qRect.y + qRect.height / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={700}
              fill={qColor}
            >
              {qb.label}
            </text>
            {isSelected && renderHandles(qRect, qId)}
          </g>
        )
      })}

      {/* Central Timeline Line */}
      {(() => {
        const tId = 'timeline'
        const tr = pos[tId] ?? { x: startX - 20, y: timelineY - 2, width: sorted.length * spacing + 40, height: 4 }
        return (
          <g
            data-element-id={tId}
            onMouseDown={e => startDrag(e, tId, tr)}
            transform={getTransform(tId, tr)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={tr.x} y={tr.y - 6} width={tr.width} height={tr.height + 12} fill="transparent" />
            <line
              x1={tr.x}
              y1={tr.y + tr.height / 2}
              x2={tr.x + tr.width}
              y2={tr.y + tr.height / 2}
              stroke={tplColors[tId] || '#d0d0d0'}
              strokeWidth={tr.height}
            />
            {selectedIds.has(tId) && renderHandles(tr, tId)}
          </g>
        )
      })()}

      {/* Milestones Alternating Above and Below Timeline */}
      {sorted.map((milestone, mi) => {
        const isAbove = mi % 2 === 0
        const elementId = `milestone-${mi}`
        const dotId = `dot-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const defaultColor = PALETTE[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]!
        const color = tplColors[elementId] ?? milestone.style?.fill ?? milestone.color ?? defaultColor
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || '#e0e0e0'))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)

        const defaultCX = startX + mi * spacing + spacing / 2
        const defaultCardX = defaultCX - cardW / 2
        const defaultCardY = isAbove ? timelineY - cardH - 35 : timelineY + 35
        const defaultRect = { x: defaultCardX, y: defaultCardY, width: cardW, height: cardH }
        const visualRect = pos[elementId] ?? defaultRect

        const defaultDotRect = { x: defaultCX - 6, y: timelineY - 6, width: 12, height: 12 }
        const dotRect = pos[dotId] ?? defaultDotRect
        const isDotSelected = selectedIds.has(dotId)

        const maxTitleChars = Math.max(6, Math.floor(visualRect.width / 9))
        const maxSubChars = Math.max(8, Math.floor(visualRect.width / 7))
        const titleLines = wrapTextByWidth(milestone.title || '', maxTitleChars)
        const subLines = milestone.subtitle ? wrapTextByWidth(milestone.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(milestone.icon, 16, color)

        return (
          <g key={`ms-${mi}`}>
            {/* Connector Line */}
            <g data-element-id={`conn-${mi}`}>
              <line
                x1={dotRect.x + dotRect.width / 2}
                y1={dotRect.y + dotRect.height / 2}
                x2={visualRect.x + visualRect.width / 2}
                y2={isAbove ? visualRect.y + visualRect.height : visualRect.y}
                stroke={color}
                strokeWidth={2}
                strokeDasharray="3 2"
              />
            </g>

            {/* Timeline Dot */}
            <g
              data-element-id={dotId}
              onMouseDown={e => startDrag(e, dotId, dotRect)}
              transform={getTransform(dotId, dotRect)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={dotRect.x + dotRect.width / 2}
                cy={dotRect.y + dotRect.height / 2}
                r={Math.min(dotRect.width, dotRect.height) / 2}
                fill={color}
              />
              {isDotSelected && renderHandles(dotRect, dotId)}
            </g>

            {/* Milestone Card */}
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
                stroke={stroke}
                strokeWidth={strokeWidth}
              />
              <rect
                x={visualRect.x}
                y={isAbove ? visualRect.y + visualRect.height - 4 : visualRect.y}
                width={visualRect.width}
                height={4}
                rx={2}
                fill={color}
              />

              <g transform={`translate(${visualRect.x + 12}, ${visualRect.y + 20})`}>
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
                  fontSize={12.5}
                  fontWeight={700}
                  fill="#1a1a2e"
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
                  y={visualRect.y + 20 + titleLines.length * 15 + 2}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={10.5}
                  fill="#666666"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={visualRect.x + 12 + (iconEl ? 20 : 0)} dy={li === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {milestone.lane && (
                <text
                  x={visualRect.x + visualRect.width - 10}
                  y={visualRect.y + visualRect.height - 10}
                  textAnchor="end"
                  fontFamily="Arial, sans-serif"
                  fontSize={9.5}
                  fontWeight={600}
                  fill={color}
                >
                  {milestone.lane}
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
