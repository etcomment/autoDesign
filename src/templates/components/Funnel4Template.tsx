import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

function percentageToWidth(pct: number, minW: number, maxW: number): number {
  return minW + (maxW - minW) * (pct / 100)
}

export function Funnel4Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { levels } = data
  const W = 900
  const cx = W / 2
  const maxW = 500
  const minW = 60
  const topY = 40
  const splitY = 320
  const bottomY = 500

  const count = levels.length
  const topCount = Math.ceil(count / 2)
  const topH = (splitY - topY) / topCount

  const percentages = levels.map((level, i) => {
    if (level.percentage !== undefined) return level.percentage
    if (level.percent !== undefined) {
      const parsed = parseFloat(level.percent.replace(/[^0-9.]/g, ''))
      if (!isNaN(parsed)) return parsed
    }
    return 100 - ((100 - 20) / (count - 1 || 1)) * i
  })

  const topLevels = levels.slice(0, topCount)
  const bottomLevels = levels.slice(topCount)

  return (
    <g ref={svgRef}>
      {topLevels.map((level, index) => {
        const elementId = `level-${index}`
        const pct = percentages[index]!
        const nextPct = index + 1 < count ? percentages[index + 1]! : pct * 0.4
        const topHW = percentageToWidth(pct, minW, maxW) / 2
        const botHW = percentageToWidth(nextPct, minW, maxW) / 2
        const y = topY + index * topH
        const defaultColor = MIGSO_PALETTE[index % MIGSO_PALETTE.length]!

        const defaultBbox = { x: cx - topHW, y, width: topHW * 2, height: topH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const color = tplColors[elementId] ?? level.color ?? defaultColor
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1)
        const centerBx = bbox.x + bbox.width / 2

        const scaleFactor = bbox.width / defaultBbox.width
        const currentTopHW = topHW * scaleFactor
        const currentBotHW = botHW * scaleFactor
        const IconComponent = level.icon ? TEMPLATE_ICONS[level.icon] : undefined
        const maxChars = Math.max(8, Math.floor((currentTopHW * 1.5) / 8))
        const titleLines = wrapTextByWidth(level.title, maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={`M ${centerBx - currentTopHW} ${bbox.y} L ${centerBx + currentTopHW} ${bbox.y} L ${centerBx + currentBotHW} ${bbox.y + bbox.height} L ${centerBx - currentBotHW} ${bbox.y + bbox.height} Z`}
              fill={color}
              opacity={0.88}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            {IconComponent && (
              <g transform={`translate(${centerBx - 8}, ${bbox.y + 6})`}>
                <IconComponent size={16} color="white" />
              </g>
            )}

            <text x={centerBx} y={bbox.y + bbox.height / 2 + (IconComponent ? 4 : 0) - (titleLines.length > 1 ? 5 : 0)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={centerBx} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={centerBx} y={bbox.y + bbox.height / 2 + titleLines.length * 13 + (IconComponent ? 4 : 2)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.9)">
              {level.value ?? `${Math.round(pct)}%`}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      <text x={cx} y={splitY + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#718096">
        SPLIT
      </text>

      {bottomLevels.map((level, index) => {
        const elementId = `level-${topCount + index}`
        const pct = percentages[topCount + index] ?? percentages[percentages.length - 1]!
        const startHW = percentageToWidth(pct, minW, maxW / 2) / 2
        const endHW = percentageToWidth(pct * 0.35, minW, maxW / 2) / 2
        const xOff = index === 0 ? -maxW / 4 : maxW / 4
        const bx = cx + xOff
        const y = splitY + 30
        const by = bottomY
        const defaultColor = MIGSO_PALETTE[(topCount + index) % MIGSO_PALETTE.length]!

        const defaultBbox = { x: bx - startHW, y, width: startHW * 2, height: by - y }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const color = tplColors[elementId] ?? level.color ?? defaultColor
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1)
        const centerBx = bbox.x + bbox.width / 2

        const scaleFactor = bbox.width / defaultBbox.width
        const currentStartHW = startHW * scaleFactor
        const currentEndHW = endHW * scaleFactor
        const IconComponent = level.icon ? TEMPLATE_ICONS[level.icon] : undefined
        const maxChars = Math.max(8, Math.floor((currentStartHW * 1.5) / 8))
        const titleLines = wrapTextByWidth(level.title, maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={`M ${centerBx - currentStartHW} ${bbox.y} L ${centerBx + currentStartHW} ${bbox.y} L ${centerBx + currentEndHW} ${bbox.y + bbox.height} L ${centerBx - currentEndHW} ${bbox.y + bbox.height} Z`}
              fill={color}
              opacity={0.88}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            {IconComponent && (
              <g transform={`translate(${centerBx - 8}, ${bbox.y + 8})`}>
                <IconComponent size={16} color="white" />
              </g>
            )}

            <text x={centerBx} y={bbox.y + bbox.height / 2 + (IconComponent ? 4 : 0) - (titleLines.length > 1 ? 5 : 0)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={centerBx} dy={lineIndex === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={centerBx} y={bbox.y + bbox.height / 2 + titleLines.length * 13 + (IconComponent ? 4 : 2)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={800} fill="white">
              {level.value ?? `${Math.round(pct)}%`}
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
