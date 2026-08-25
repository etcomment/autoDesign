import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Funnel2Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { levels } = data
  const H = 360
  const maxVH = 160
  const minVH = 50
  const startX = 60
  const endX = 840
  const cy = H / 2

  const count = levels.length
  const totalW = endX - startX
  const segmentW = count > 0 ? totalW / count : 0

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
        const pct = percentages[index]!
        const nextPct = index + 1 < count ? percentages[index + 1]! : pct * 0.34
        const vH = minVH + (maxVH - minVH) * (pct / 100)
        const nextVH = minVH + (maxVH - minVH) * (nextPct / 100)

        const defaultX = startX + index * segmentW
        const defaultBbox = { x: defaultX, y: cy - vH / 2, width: segmentW, height: vH }

        const elementId = `level-${index}`
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const color = tplColors[elementId] ?? level.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1.5)

        const rx = bbox.x + bbox.width
        const centerCy = bbox.y + bbox.height / 2
        const halfH = bbox.height / 2
        const nextHalfH = (nextVH / 2) * (bbox.height / defaultBbox.height)

        const top = centerCy - halfH
        const bottom = centerCy + halfH
        const rtop = centerCy - nextHalfH
        const rbottom = centerCy + nextHalfH

        const pathD = `M ${bbox.x} ${top} L ${rx} ${rtop} L ${rx} ${rbottom} L ${bbox.x} ${bottom} Z`
        const IconComponent = level.icon ? TEMPLATE_ICONS[level.icon] : undefined

        const maxChars = Math.max(8, Math.floor(bbox.width / 9))
        const titleLines = wrapTextByWidth(level.title, maxChars)

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
              <g transform={`translate(${bbox.x + bbox.width / 2 - 10}, ${centerCy - 38})`}>
                <IconComponent size={20} color="#1a202c" />
              </g>
            )}

            <text x={bbox.x + bbox.width / 2} y={centerCy - (titleLines.length > 1 ? 22 : 16)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#1a202c">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={bbox.x + bbox.width / 2} dy={lineIndex === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </text>

            {level.subtitle && (
              <text x={bbox.x + bbox.width / 2} y={centerCy + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#718096">
                {level.subtitle}
              </text>
            )}

            <text x={bbox.x + bbox.width / 2} y={centerCy + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill={color}>
              {level.value ?? `${Math.round(pct)}%`}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
