import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

function getDynamicIcon(iconName?: string, size = 16, color = '#23255a'): ReactElement | null {
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

export function ProductRoadmapTemplate({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { quarters = [], lanes = [], milestones = [] } = data
  const W = 1000
  const H = 580
  const leftMargin = 140
  const topMargin = 50
  const rightPadding = 24
  const bottomPadding = 24

  const gridLeft = leftMargin
  const gridTop = topMargin
  const gridWidth = W - leftMargin - rightPadding
  const gridHeight = H - topMargin - bottomPadding
  const numQuarters = Math.max(1, quarters.length)
  const numLanes = Math.max(1, lanes.length)
  const colWidth = gridWidth / numQuarters
  const rowHeight = gridHeight / numLanes

  return (
    <g ref={svgRef}>
      {/* Quarters (Column Headers) */}
      {quarters.map((quarter, qi) => {
        const colX = gridLeft + qi * colWidth
        const qId = `quarter-${qi}`
        const defaultQRect = { x: colX, y: gridTop, width: colWidth, height: 40 }
        const qRect = pos[qId] ?? defaultQRect
        const qColor = tplColors[qId] ?? '#f0f4f8'
        const qStroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : '#d0d7de')
        const qStrokeWidth = tplStrokeWidths[qId] ?? (selectedIds.has(qId) ? 2.5 : 1)
        const isSelected = selectedIds.has(qId)

        return (
          <g
            key={quarter.label}
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
              stroke={qStroke}
              strokeWidth={qStrokeWidth}
            />
            <text
              x={qRect.x + qRect.width / 2}
              y={qRect.y + (quarter.year ? 17 : 24)}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={700}
              fill="#333333"
            >
              {quarter.label}
            </text>
            {quarter.year && (
              <text
                x={qRect.x + qRect.width / 2}
                y={qRect.y + 31}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fill="#888888"
              >
                {quarter.year}
              </text>
            )}
            {isSelected && renderHandles(qRect, qId)}
          </g>
        )
      })}

      {/* Lanes and Grid Cells */}
      {lanes.map((lane, li) => {
        const rowY = gridTop + 40 + li * rowHeight
        const lId = `lane-${li}`
        const defaultLRect = { x: 16, y: rowY, width: leftMargin - 28, height: rowHeight }
        const lRect = pos[lId] ?? defaultLRect
        const lColor = tplColors[lId] ?? (lane.color || '#f8f9fa')
        const lStroke = tplStrokeColors[lId] ?? (selectedIds.has(lId) ? '#4a90d9' : '#e0e0e0')
        const lStrokeWidth = tplStrokeWidths[lId] ?? (selectedIds.has(lId) ? 2.5 : 1)
        const isSelected = selectedIds.has(lId)

        const maxLaneChars = Math.max(6, Math.floor(lRect.width / 8.5))
        const laneLines = wrapTextByWidth(lane.label, maxLaneChars)

        return (
          <g key={lane.label}>
            {/* Lane Header */}
            <g
              data-element-id={lId}
              onMouseDown={e => startDrag(e, lId, lRect)}
              transform={getTransform(lId, lRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={lRect.x}
                y={lRect.y}
                width={lRect.width}
                height={lRect.height}
                rx={6}
                fill={lColor}
                stroke={lStroke}
                strokeWidth={lStrokeWidth}
              />
              <text
                x={lRect.x + lRect.width / 2}
                y={lRect.y + lRect.height / 2 + 4 - (laneLines.length - 1) * 7}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fontWeight={600}
                fill="#333333"
              >
                {laneLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={lRect.x + lRect.width / 2} dy={lIdx === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isSelected && renderHandles(lRect, lId)}
            </g>

            {/* Background Grid Cells */}
            {quarters.map((quarter, qi) => {
              const colX = gridLeft + qi * colWidth
              const id = `bg-rect-${li}-${qi}`
              const defaultR = { x: colX, y: rowY, width: colWidth, height: rowHeight }
              const r = pos[id] ?? defaultR
              return (
                <g
                  key={`${lane.label}-${quarter.label}`}
                  data-element-id={id}
                  onMouseDown={e => startDrag(e, id, r)}
                  transform={getTransform(id, r)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={r.x}
                    y={r.y}
                    width={r.width}
                    height={r.height}
                    fill={tplColors[id] ?? 'none'}
                    stroke={tplStrokeColors[id] ?? '#e8ecf0'}
                    strokeWidth={tplStrokeWidths[id] ?? 1}
                  />
                  {selectedIds.has(id) && renderHandles(r, id)}
                </g>
              )
            })}
          </g>
        )
      })}

      {/* Milestones / Feature Badges */}
      {milestones.map((milestone, mi) => {
        const quarterIndex = quarters.findIndex(q => q.label === milestone.quarter)
        const laneIndex = lanes.findIndex(l => l.label === milestone.lane)
        if (quarterIndex < 0 || laneIndex < 0) return null

        const elementId = `milestone-${mi}`
        const color = tplColors[elementId] ?? milestone.style?.fill ?? milestone.color ?? PALETTE[mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || color))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)

        const cellX = gridLeft + quarterIndex * colWidth
        const cellY = gridTop + 40 + laneIndex * rowHeight
        const padding = 10
        const badgeW = milestone.style?.boxWidth ?? (colWidth - padding * 2)
        const badgeH = milestone.style?.boxHeight ?? Math.min(rowHeight - 12, 48)
        const badgeX = cellX + padding
        const badgeY = cellY + (rowHeight - badgeH) / 2
        const defaultRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }
        const visualRect = pos[elementId] ?? defaultRect

        const maxTitleChars = Math.max(6, Math.floor((visualRect.width - 24) / 7.5))
        const titleLines = wrapTextByWidth(milestone.title || '', maxTitleChars)
        const subLines = milestone.subtitle ? wrapTextByWidth(milestone.subtitle, maxTitleChars + 2) : []

        const iconEl = getDynamicIcon(milestone.icon, 16, color)

        return (
          <g key={`${milestone.quarter}-${milestone.lane}-${milestone.title}-${mi}`}>
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
                rx={6}
                fill={color}
                opacity={isSelected ? 0.22 : 0.14}
              />
              <rect x={visualRect.x} y={visualRect.y} width={4} height={visualRect.height} fill={color} rx={2} />
              <rect
                x={visualRect.x}
                y={visualRect.y}
                width={visualRect.width}
                height={visualRect.height}
                rx={6}
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                opacity={isSelected ? 1 : 0.5}
                strokeDasharray={isSelected ? '4 2' : undefined}
              />

              <g transform={`translate(${visualRect.x + 12}, ${visualRect.y + (subLines.length > 0 ? 14 : visualRect.height / 2 + 4)})`}>
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
                  fontSize={11}
                  fontWeight={600}
                  fill={color}
                >
                  {titleLines.map((line, li) => (
                    <tspan key={li} x={iconEl ? 20 : 0} dy={li === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {subLines.length > 0 && (
                <text
                  x={visualRect.x + 12 + (iconEl ? 20 : 0)}
                  y={visualRect.y + 14 + titleLines.length * 13 + 2}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={9.5}
                  fill="#666666"
                >
                  {subLines.map((line, li) => (
                    <tspan key={li} x={visualRect.x + 12 + (iconEl ? 20 : 0)} dy={li === 0 ? 0 : 11}>
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
