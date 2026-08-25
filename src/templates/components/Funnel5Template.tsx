import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const BAR_W = 460
const BAR_H = 52
const ARROW_H = 16

export function Funnel5Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { levels } = data
  const W = 900
  const count = levels.length
  const gap = 20
  const startX = (W - BAR_W) / 2
  const startY = 40

  const percentages = levels.map((level, i) => {
    if (level.percentage !== undefined) return level.percentage
    if (level.percent !== undefined) {
      const parsed = parseFloat(level.percent.replace(/[^0-9.]/g, ''))
      if (!isNaN(parsed)) return parsed
    }
    return 100 - ((100 - 20) / (count - 1 || 1)) * i
  })

  const getBbox = (i: number) => {
    const elementId = `level-${i}`
    const defaultY = startY + i * (BAR_H + ARROW_H + gap)
    const defaultBbox = { x: startX, y: defaultY, width: BAR_W, height: BAR_H }
    const customPos = positions[elementId]
    return {
      x: customPos?.x ?? defaultBbox.x,
      y: customPos?.y ?? defaultBbox.y,
      width: customPos?.width ?? defaultBbox.width,
      height: customPos?.height ?? defaultBbox.height,
    }
  }

  return (
    <g ref={svgRef}>
      {levels.map((level, index) => {
        const elementId = `level-${index}`
        const pct = percentages[index]!
        const bbox = getBbox(index)

        const color = tplColors[elementId] ?? level.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1.5)
        const IconComponent = level.icon ? TEMPLATE_ICONS[level.icon] : undefined

        let arrowPoints = ''
        if (index < count - 1) {
          const nextBbox = getBbox(index + 1)
          const curCx = bbox.x + bbox.width / 2
          const curBottomY = bbox.y + bbox.height
          const nextCx = nextBbox.x + nextBbox.width / 2
          const nextTopY = nextBbox.y

          arrowPoints = `${curCx - 12},${curBottomY} ${curCx + 12},${curBottomY} ${nextCx},${nextTopY}`
        }

        const maxChars = Math.max(10, Math.floor((bbox.width - 120) / 8))
        const titleLines = wrapTextByWidth(level.title, maxChars)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} stroke={strokeColor} strokeWidth={strokeWidth} opacity={0.9} />

              {IconComponent && (
                <g transform={`translate(${bbox.x + 16}, ${bbox.y + bbox.height / 2 - 9})`}>
                  <IconComponent size={18} color="white" />
                </g>
              )}

              <text x={bbox.x + (IconComponent ? 44 : 20)} y={bbox.y + bbox.height / 2 + (level.subtitle ? -2 : 5) - (titleLines.length > 1 ? 5 : 0)} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={bbox.x + (IconComponent ? 44 : 20)} dy={lineIndex === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
              {level.subtitle && (
                <text x={bbox.x + (IconComponent ? 44 : 20)} y={bbox.y + bbox.height / 2 + titleLines.length * 13 + 3} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
                  {level.subtitle}
                </text>
              )}

              <text x={bbox.x + bbox.width - 20} y={bbox.y + bbox.height / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill="white">
                {level.value ?? `${Math.round(pct)}%`}
              </text>

              {isSelected && renderHandles(bbox, elementId)}
            </g>

            {index < count - 1 && arrowPoints && (
              <polygon points={arrowPoints} fill={color} opacity={0.5} />
            )}
          </g>
        )
      })}
    </g>
  )
}
