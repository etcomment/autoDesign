import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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

export function ProductRoadmap8Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const pos = useTemplateStore(s => s.templateElementPositions)

  const { lanes = [], milestones = [] } = data
  const W = 960
  const marginX = 120
  const topY = 40
  const monthW = (W - marginX) / 12
  const rowH = 56
  const labelW = 100

  return (
    <g ref={svgRef}>
      {/* Month Header Columns */}
      {MONTHS.map((m, mi) => {
        const id = `month-${mi}`
        const defaultR = { x: marginX + mi * monthW, y: topY, width: monthW, height: 24 }
        const r = pos[id] ?? defaultR
        return (
          <g
            key={id}
            data-element-id={id}
            onMouseDown={e => startDrag(e, id, r)}
            transform={getTransform(id, r)}
            style={{ cursor: 'pointer' }}
          >
            <text
              x={r.x + r.width / 2}
              y={r.y + 16}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fontWeight={600}
              fill={tplColors[id] ?? '#666666'}
            >
              {m}
            </text>
            {selectedIds.has(id) && renderHandles(r, id)}
          </g>
        )
      })}

      {/* Lanes and Rows */}
      {lanes.map((lane, li) => {
        const laneY = topY + 28 + li * rowH
        const lId = `lane-${li}`
        const defaultLRect = { x: 4, y: laneY, width: labelW - 8, height: rowH - 4 }
        const lRect = pos[lId] ?? defaultLRect
        const laneColor = tplColors[lId] ?? PALETTE[li % PALETTE.length]!
        const lStroke = tplStrokeColors[lId] ?? (selectedIds.has(lId) ? '#4a90d9' : undefined)
        const lStrokeWidth = tplStrokeWidths[lId] ?? (selectedIds.has(lId) ? 2 : 1)
        const isSelected = selectedIds.has(lId)

        const maxLaneChars = Math.max(6, Math.floor(lRect.width / 8))
        const laneLines = wrapTextByWidth(lane.label, maxLaneChars)

        return (
          <g key={`lane-${li}`}>
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
                fill={laneColor}
                opacity={0.9}
                stroke={lStroke}
                strokeWidth={lStroke ? lStrokeWidth : undefined}
              />
              <text
                x={lRect.x + lRect.width / 2}
                y={lRect.y + lRect.height / 2 + 4 - (laneLines.length - 1) * 6}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fontWeight={700}
                fill="#ffffff"
              >
                {laneLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={lRect.x + lRect.width / 2} dy={lIdx === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isSelected && renderHandles(lRect, lId)}
            </g>

            {/* Horizontal Line across months */}
            {(() => {
              const lineId = `line-lane-${li}`
              const defaultLineR = { x: marginX, y: laneY + rowH / 2 - 2, width: W - marginX - 20, height: 4 }
              const lRectLine = pos[lineId] ?? defaultLineR
              const stroke = tplStrokeColors[lineId] ?? '#e2e8f0'
              const sW = tplStrokeWidths[lineId] ?? 1
              return (
                <g
                  data-element-id={lineId}
                  onMouseDown={e => startDrag(e, lineId, lRectLine)}
                  transform={getTransform(lineId, lRectLine)}
                  style={{ cursor: 'pointer' }}
                >
                  <line
                    x1={lRectLine.x}
                    y1={lRectLine.y + lRectLine.height / 2}
                    x2={lRectLine.x + lRectLine.width}
                    y2={lRectLine.y + lRectLine.height / 2}
                    stroke={stroke}
                    strokeWidth={sW}
                  />
                  {selectedIds.has(lineId) && renderHandles(lRectLine, lineId)}
                </g>
              )
            })()}
          </g>
        )
      })}

      {/* Milestones Gantt-like Bars */}
      {milestones.map((m, mi) => {
        const elementId = `bar-${mi}`
        const li = lanes.findIndex(l => l.label === m.lane)
        if (li < 0) return null

        const qi = parseInt(m.quarter?.replace(/[^0-9]/g, '') || '') || 1
        const startMonth = Math.max(0, Math.min(11, (qi - 1) * 3))
        const spanMonths = 3
        const laneY = topY + 28 + li * rowH
        const defaultBarX = marginX + startMonth * monthW + 2
        const defaultBarW = spanMonths * monthW - 4
        const defaultBarH = rowH - 12
        const defaultBarY = laneY + 6
        const color = tplColors[elementId] ?? m.style?.fill ?? m.color ?? PALETTE[mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] ?? (selectedIds.has(elementId) ? '#4a90d9' : m.style?.stroke)
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2 : 1)
        const isSelected = selectedIds.has(elementId)
        const defaultRect = { x: defaultBarX, y: defaultBarY, width: m.style?.boxWidth ?? defaultBarW, height: m.style?.boxHeight ?? defaultBarH }
        const visualRect = pos[elementId] ?? defaultRect

        const styleFontSize = m.style?.fontSize ?? 11.5
        const styleFontWeight = m.style?.fontWeight ?? 700
        const styleFontColor = m.style?.fontColor ?? '#ffffff'

        const maxTitleChars = Math.max(6, Math.floor((visualRect.width - 20) / 7.5))
        const titleLines = wrapTextByWidth(m.title || '', maxTitleChars)
        const subLines = m.subtitle ? wrapTextByWidth(m.subtitle, maxTitleChars + 2) : []

        const iconEl = getDynamicIcon(m.icon, 15, styleFontColor)

        return (
          <g key={`bar-${mi}`}>
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
                opacity={isSelected ? 1 : 0.88}
                stroke={stroke}
                strokeWidth={stroke ? strokeWidth : undefined}
              />

              <g transform={`translate(${visualRect.x + 10}, ${visualRect.y + (subLines.length > 0 ? 14 : visualRect.height / 2 + 4)})`}>
                {iconEl && (
                  <g transform="translate(0, -10)">
                    {iconEl}
                  </g>
                )}
                <text
                  x={iconEl ? 18 : 0}
                  y={0}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={styleFontSize}
                  fontWeight={styleFontWeight}
                  fill={styleFontColor}
                >
                  {titleLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={iconEl ? 18 : 0} dy={lIdx === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>

              {subLines.length > 0 && (
                <text
                  x={visualRect.x + 10 + (iconEl ? 18 : 0)}
                  y={visualRect.y + 14 + titleLines.length * 13 + 2}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={9.5}
                  fill="rgba(255,255,255,0.85)"
                >
                  {subLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={visualRect.x + 10 + (iconEl ? 18 : 0)} dy={lIdx === 0 ? 0 : 11}>
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

      {/* Vertical Grid Lines */}
      {Array.from({ length: 12 }, (_, mi) => {
        const id = `vg-${mi}`
        const defaultR = { x: marginX + mi * monthW - 2, y: topY + 28, width: 4, height: lanes.length * rowH }
        const r = pos[id] ?? defaultR
        const stroke = tplStrokeColors[id] ?? '#e2e8f0'
        const sW = tplStrokeWidths[id] ?? 0.5
        return (
          <g
            key={id}
            data-element-id={id}
            onMouseDown={e => startDrag(e, id, r)}
            transform={getTransform(id, r)}
            style={{ cursor: 'pointer' }}
          >
            <line
              x1={r.x + r.width / 2}
              y1={r.y}
              x2={r.x + r.width / 2}
              y2={r.y + r.height}
              stroke={stroke}
              strokeWidth={sW}
            />
            {selectedIds.has(id) && renderHandles(r, id)}
          </g>
        )
      })}
    </g>
  )
}
