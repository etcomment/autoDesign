import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

function percentageToWidth(percentage: number, minW: number, maxW: number): number {
  return minW + (maxW - minW) * (percentage / 100)
}

export function FunnelTemplate({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { levels } = data
  const W = 900

  const funnelTop = 40
  const funnelBottom = 460
  const maxW = 560
  const minW = 100
  const cx = W / 2
  const count = levels.length
  const totalSpace = funnelBottom - funnelTop
  const levelH = count > 0 ? totalSpace / count : 0

  const percentages = levels.map((level, i) => {
    if (level.percentage !== undefined) return level.percentage
    if (level.percent !== undefined) {
      const parsed = parseFloat(level.percent.replace(/[^0-9.]/g, ''))
      if (!isNaN(parsed)) return parsed
    }
    return 100 - ((100 - 20) / (count - 1 || 1)) * i
  })

  return (
    <g ref={svgRef}>
      {levels.map((level, index) => {
        const elementId = `level-${index}`
        const defaultColor = MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const color = tplColors[elementId] ?? level.color ?? defaultColor

        const topPct = percentages[index]!
        const bottomPct = index + 1 < count ? percentages[index + 1]! : topPct * 0.4
        const topHW = percentageToWidth(topPct, minW, maxW) / 2
        const bottomHW = percentageToWidth(bottomPct, minW, maxW) / 2

        const defaultY = funnelTop + index * levelH
        const maxHalf = Math.max(topHW, bottomHW)
        const defaultBbox = { x: cx - maxHalf, y: defaultY, width: maxHalf * 2, height: levelH }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1.5)

        const centerBx = bbox.x + bbox.width / 2
        const scaleFactor = bbox.width / defaultBbox.width
        const currentTopHW = topHW * scaleFactor
        const currentBottomHW = bottomHW * scaleFactor

        const tl = centerBx - currentTopHW
        const tr = centerBx + currentTopHW
        const bl = centerBx - currentBottomHW
        const br = centerBx + currentBottomHW
        const y = bbox.y
        const by = y + bbox.height

        const pathD = `M ${tl} ${y} L ${tr} ${y} L ${br} ${by} L ${bl} ${by} Z`
        const labelX = centerBx - maxW / 2 - 28
        const percentX = centerBx + maxW / 2 + 28
        const IconComponent = level.icon ? TEMPLATE_ICONS[level.icon] : undefined

        const titleLines = wrapTextByWidth(level.title, 18)
        const subtitleLines = level.subtitle ? wrapTextByWidth(level.subtitle, 22) : []

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={pathD} fill={color} opacity={0.85} stroke={strokeColor} strokeWidth={strokeWidth} />

            {IconComponent && (
              <g transform={`translate(${centerBx - 10}, ${bbox.y + bbox.height / 2 - 10})`}>
                <IconComponent size={20} color="white" />
              </g>
            )}

            <text x={labelX} y={bbox.y + bbox.height / 2 + (subtitleLines.length > 0 ? -2 : 5)} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#1a202c">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={labelX} dy={lineIndex === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </text>

            {level.subtitle && (
              <text x={labelX} y={bbox.y + bbox.height / 2 + titleLines.length * 14 + 2} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fill="#718096">
                {subtitleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={labelX} dy={lineIndex === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            <text x={percentX} y={bbox.y + bbox.height / 2 + 6} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill={color}>
              {level.value ?? `${Math.round(topPct)}%`}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
