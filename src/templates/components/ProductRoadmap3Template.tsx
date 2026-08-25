import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap3Data } from '../types'
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

export function ProductRoadmap3Template({ data }: { data: ProductRoadmap3Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { quarters = [], milestones = [] } = data
  const W = 1000
  const topMargin = 40
  const headerHeight = 50
  const timelineY = topMargin + headerHeight + 15
  const cardSpacing = 220
  const cardW = 170
  const cardH = 95
  const leftPad = 40

  const sortedMilestones = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  const totalCards = Math.max(1, sortedMilestones.length)
  const totalWidth = totalCards * cardSpacing + leftPad * 2
  const startX = Math.max(leftPad, (W - totalWidth) / 2 + leftPad)

  const tId = 'timeline'
  const tr = pos[tId] ?? { x: startX, y: timelineY + 28, width: Math.max(100, (totalCards - 1) * cardSpacing + cardW), height: 4 }

  return (
    <g ref={svgRef}>
      {/* Quarter Group Headers */}
      {quarters.map((quarter, qi) => {
        const qKey = quarter.label
        const qMs = sortedMilestones.filter(m => m.quarter === qKey)
        const firstIdx = sortedMilestones.findIndex(m => m.quarter === qKey)
        const lastIdx = firstIdx + qMs.length - 1
        if (qMs.length === 0) return null

        const qStartX = startX + firstIdx * cardSpacing - 10
        const qEndX = startX + lastIdx * cardSpacing + cardW + 10
        const qWidth = qEndX - qStartX
        const qId = `quarter-${qi}`
        const qRect = pos[qId] ?? { x: qStartX, y: topMargin, width: qWidth, height: headerHeight }
        const defaultColor = PALETTE[qi % PALETTE.length]!
        const color = tplColors[qId] ?? defaultColor
        const stroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[qId] ?? (selectedIds.has(qId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(qId)

        return (
          <g
            key={`q-group-${qKey}`}
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
              rx={8}
              fill={color}
              opacity={0.12}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            <text
              x={qRect.x + qRect.width / 2}
              y={qRect.y + qRect.height / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fontWeight={700}
              fill={color}
            >
              {qKey} {quarter.year ? quarter.year : ''}
            </text>
            {isSelected && renderHandles(qRect, qId)}
          </g>
        )
      })}

      {/* Timeline track line */}
      <g
        data-element-id={tId}
        onMouseDown={e => startDrag(e, tId, tr)}
        transform={getTransform(tId, tr)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={tr.x} y={tr.y - 4} width={tr.width} height={tr.height + 8} fill="transparent" />
        <line
          x1={tr.x}
          y1={tr.y + tr.height / 2}
          x2={tr.x + tr.width}
          y2={tr.y + tr.height / 2}
          stroke={tplColors[tId] || '#dcdcdc'}
          strokeWidth={tr.height}
        />
        {selectedIds.has(tId) && renderHandles(tr, tId)}
      </g>

      {/* Milestone Cards, Nodes & Connectors */}
      {sortedMilestones.map((milestone, mi) => {
        const cardId = `card-${mi}`
        const dotId = `dot-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const defaultColor = PALETTE[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]!
        const color = tplColors[cardId] ?? milestone.style?.fill ?? milestone.color ?? defaultColor
        const stroke = tplStrokeColors[cardId] || (selectedIds.has(cardId) ? '#4a90d9' : (milestone.style?.stroke || '#e0e0e0'))
        const strokeWidth = tplStrokeWidths[cardId] ?? (selectedIds.has(cardId) ? 2.5 : 1)
        const isSelected = selectedIds.has(cardId)

        const defaultCX = startX + mi * cardSpacing + cardW / 2
        const defaultCardX = defaultCX - cardW / 2
        const defaultCardY = timelineY + 80
        const cardRect = pos[cardId] ?? { x: defaultCardX, y: defaultCardY, width: cardW, height: cardH }
        const dotRect = pos[dotId] ?? { x: defaultCX - 7, y: timelineY + 28 - 5, width: 14, height: 14 }
        const isDotSelected = selectedIds.has(dotId)

        const maxTitleChars = Math.max(6, Math.floor(cardRect.width / 9))
        const maxSubChars = Math.max(8, Math.floor(cardRect.width / 7))
        const titleLines = wrapTextByWidth(milestone.title || '', maxTitleChars)
        const subLines = milestone.subtitle ? wrapTextByWidth(milestone.subtitle, maxSubChars) : []

        const iconEl = getDynamicIcon(milestone.icon, 16, color)

        return (
          <g key={`ms-group-${mi}`}>
            {/* Dynamic vertical connector line */}
            <g data-element-id={`conn-${mi}`}>
              <line
                x1={dotRect.x + dotRect.width / 2}
                y1={dotRect.y + dotRect.height / 2}
                x2={cardRect.x + cardRect.width / 2}
                y2={cardRect.y}
                stroke={color}
                strokeWidth={2}
                strokeDasharray="4 2"
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
              <circle
                cx={dotRect.x + dotRect.width / 2}
                cy={dotRect.y + dotRect.height / 2}
                r={Math.min(dotRect.width, dotRect.height) / 2 - 2}
                fill="#ffffff"
              />
              <circle
                cx={dotRect.x + dotRect.width / 2}
                cy={dotRect.y + dotRect.height / 2}
                r={Math.min(dotRect.width, dotRect.height) / 2 - 4}
                fill={color}
              />
              {isDotSelected && renderHandles(dotRect, dotId)}
            </g>

            {/* Milestone Card */}
            <g
              data-element-id={cardId}
              onMouseDown={e => startDrag(e, cardId, cardRect)}
              transform={getTransform(cardId, cardRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={cardRect.x}
                y={cardRect.y}
                width={cardRect.width}
                height={cardRect.height}
                rx={8}
                fill="#ffffff"
                stroke={stroke}
                strokeWidth={strokeWidth}
              />
              <rect x={cardRect.x} y={cardRect.y} width={cardRect.width} height={4} rx={2} fill={color} />

              <g transform={`translate(${cardRect.x + 12}, ${cardRect.y + 22})`}>
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
                  fontSize={13}
                  fontWeight={700}
                  fill="#1a1a2e"
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={iconEl ? 20 : 0} dy={li === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {subLines.length > 0 && (
                <text
                  x={cardRect.x + 12 + (iconEl ? 20 : 0)}
                  y={cardRect.y + 22 + titleLines.length * 16 + 2}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={10.5}
                  fill="#666666"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={cardRect.x + 12 + (iconEl ? 20 : 0)} dy={li === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {milestone.lane && (
                <text
                  x={cardRect.x + cardRect.width - 10}
                  y={cardRect.y + cardRect.height - 10}
                  textAnchor="end"
                  fontFamily="Arial, sans-serif"
                  fontSize={9.5}
                  fontWeight={600}
                  fill={color}
                >
                  {milestone.lane}
                </text>
              )}

              {isSelected && renderHandles(cardRect, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
