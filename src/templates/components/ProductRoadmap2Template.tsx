import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap2Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']
const LANE_BG = ['#e8f4fd', '#eaf7e9', '#fef3e2', '#f5eefa', '#fde8ec', '#e0f7fa']

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

export function ProductRoadmap2Template({ data }: { data: ProductRoadmap2Data }): ReactElement {
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
  const leftMargin = 150
  const topMargin = 50
  const rightPadding = 20
  const bottomPadding = 20
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
      {/* Quarter Headers */}
      {quarters.map((quarter, qi) => {
        const colX = gridLeft + qi * colWidth
        const qId = `quarter-${qi}`
        const defaultQRect = { x: colX, y: gridTop, width: colWidth, height: 36 }
        const qRect = pos[qId] ?? defaultQRect
        const defaultColor = PALETTE[qi % PALETTE.length]!
        const qColor = tplColors[qId] ?? defaultColor
        const qStroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : 'none')
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
              rx={4}
              fill={qColor}
              opacity={0.15}
              stroke={qStroke}
              strokeWidth={qStrokeWidth}
            />
            <text
              x={qRect.x + qRect.width / 2}
              y={qRect.y + (quarter.year ? 16 : 22)}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={700}
              fill={qColor}
            >
              {quarter.label}
            </text>
            {quarter.year && (
              <text
                x={qRect.x + qRect.width / 2}
                y={qRect.y + 29}
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

      {/* Lanes and Backgrounds */}
      {lanes.map((lane, li) => {
        const rowY = gridTop + 36 + li * rowHeight
        const lId = `lane-${li}`
        const defaultLRect = { x: 8, y: rowY + 4, width: leftMargin - 20, height: rowHeight - 8 }
        const lRect = pos[lId] ?? defaultLRect
        const defaultLaneColor = PALETTE[li % PALETTE.length]!
        const laneColor = tplColors[lId] ?? (lane.color || defaultLaneColor)
        const lStroke = tplStrokeColors[lId] ?? (selectedIds.has(lId) ? '#4a90d9' : 'none')
        const lStrokeWidth = tplStrokeWidths[lId] ?? (selectedIds.has(lId) ? 2.5 : 1)
        const isSelected = selectedIds.has(lId)

        const maxLaneChars = Math.max(6, Math.floor(lRect.width / 8.5))
        const laneLines = wrapTextByWidth(lane.label, maxLaneChars)

        return (
          <g key={lane.label}>
            {/* Lane Background */}
            {(() => {
              const laneBgId = `lanebg-${li}`
              const defaultBg = { x: gridLeft, y: rowY, width: gridWidth, height: rowHeight }
              const r = pos[laneBgId] ?? defaultBg
              return (
                <g
                  data-element-id={laneBgId}
                  onMouseDown={e => startDrag(e, laneBgId, r)}
                  transform={getTransform(laneBgId, r)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect x={r.x} y={r.y} width={r.width} height={r.height} fill={tplColors[laneBgId] ?? LANE_BG[li % LANE_BG.length]} rx={2} />
                  {selectedIds.has(laneBgId) && renderHandles(r, laneBgId)}
                </g>
              )
            })()}

            {/* Lane Marker Indicator */}
            {(() => {
              const laneMarkerId = `lanemarker-${li}`
              const defaultMarker = { x: 0, y: rowY, width: 4, height: rowHeight }
              const mr = pos[laneMarkerId] ?? defaultMarker
              return (
                <g
                  data-element-id={laneMarkerId}
                  onMouseDown={e => startDrag(e, laneMarkerId, mr)}
                  transform={getTransform(laneMarkerId, mr)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect x={mr.x} y={mr.y} width={mr.width} height={mr.height} fill={tplColors[laneMarkerId] ?? laneColor} rx={2} />
                  {selectedIds.has(laneMarkerId) && renderHandles(mr, laneMarkerId)}
                </g>
              )
            })()}

            {/* Lane Label Button */}
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
                strokeWidth={lStrokeWidth}
              />
              <text
                x={lRect.x + lRect.width / 2}
                y={lRect.y + lRect.height / 2 + 4 - (laneLines.length - 1) * 7}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11.5}
                fontWeight={600}
                fill="#ffffff"
              >
                {laneLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={lRect.x + lRect.width / 2} dy={lIdx === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isSelected && renderHandles(lRect, lId)}
            </g>

            {/* Vertical grid lines */}
            {quarters.map((_q, qi) => (() => {
              const lineId = `gridline-${li}-${qi}`
              const defaultLine = { x: gridLeft + qi * colWidth - 0.5, y: rowY, width: 1, height: rowHeight }
              const lr = pos[lineId] ?? defaultLine
              return (
                <g
                  key={`grid-${li}-${qi}`}
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
                    stroke={tplColors[lineId] ?? 'rgba(0,0,0,0.06)'}
                    strokeWidth={1}
                  />
                  {selectedIds.has(lineId) && renderHandles(lr, lineId)}
                </g>
              )
            })())}
          </g>
        )
      })}

      {/* Milestones / Task Pills */}
      {milestones.map((milestone, mi) => {
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const li = lanes.findIndex(l => l.label === milestone.lane)
        if (qi < 0 || li < 0) return null

        const elementId = `milestone-${mi}`
        const color = tplColors[elementId] ?? milestone.style?.fill ?? milestone.color ?? PALETTE[mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || 'none'))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)

        const cellX = gridLeft + qi * colWidth
        const cellY = gridTop + 36 + li * rowHeight
        const padding = 10
        const badgeW = milestone.style?.boxWidth ?? (colWidth - padding * 2)
        const badgeH = milestone.style?.boxHeight ?? Math.min(rowHeight - 14, 52)
        const badgeX = cellX + padding
        const badgeY = cellY + (rowHeight - badgeH) / 2
        const defaultRect = { x: badgeX, y: badgeY, width: badgeW, height: badgeH }
        const visualRect = pos[elementId] ?? defaultRect

        const maxTitleChars = Math.max(6, Math.floor((visualRect.width - 24) / 7.5))
        const titleLines = wrapTextByWidth(milestone.title || '', maxTitleChars)
        const subLines = milestone.subtitle ? wrapTextByWidth(milestone.subtitle, maxTitleChars + 2) : []

        const iconEl = getDynamicIcon(milestone.icon, 16, '#ffffff')

        return (
          <g
            key={`m-${mi}`}
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
              rx={7}
              fill={color}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />

            <g transform={`translate(${visualRect.x + 10}, ${visualRect.y + (subLines.length > 0 ? 15 : visualRect.height / 2 + 4)})`}>
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
                fontSize={11.5}
                fontWeight={700}
                fill="#ffffff"
              >
                {titleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={iconEl ? 20 : 0} dy={lIdx === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>

            {subLines.length > 0 && (
              <text
                x={visualRect.x + 10 + (iconEl ? 20 : 0)}
                y={visualRect.y + 15 + titleLines.length * 13 + 2}
                textAnchor="start"
                fontFamily="Arial, sans-serif"
                fontSize={9.5}
                fill="rgba(255,255,255,0.85)"
              >
                {subLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={visualRect.x + 10 + (iconEl ? 20 : 0)} dy={lIdx === 0 ? 0 : 11}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {isSelected && renderHandles(visualRect, elementId)}
          </g>
        )
      })}
    </g>
  )
}
