import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Funnel2Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

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

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  return (
    <g ref={svgRef}>
      {levels.map((level, i) => {
        const pct = percentages[i]!
        const nextPct = i + 1 < count ? percentages[i + 1]! : pct * 0.34
        const vH = minVH + (maxVH - minVH) * (pct / 100)
        const nextVH = minVH + (maxVH - minVH) * (nextPct / 100)

        const defaultX = startX + i * segmentW
        const defaultBbox = { x: defaultX, y: cy - vH / 2, width: segmentW, height: vH }

        const elementId = `level-${i}`
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const color = tplColors[elementId] ?? level.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)

        const rx = bbox.x + bbox.width
        const centerCy = bbox.y + bbox.height / 2
        const halfH = bbox.height / 2
        const nextHalfH = nextVH / 2

        const top = centerCy - halfH
        const bottom = centerCy + halfH
        const rtop = centerCy - nextHalfH
        const rbottom = centerCy + nextHalfH

        const d = `M ${bbox.x} ${top} L ${rx} ${rtop} L ${rx} ${rbottom} L ${bbox.x} ${bottom} Z`

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={d} fill={color} opacity={0.85} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />
            <text x={bbox.x + bbox.width / 2} y={centerCy - 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#1a202c">
              {level.title}
            </text>
            {level.subtitle && (
              <text x={bbox.x + bbox.width / 2} y={centerCy - 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#718096">
                {level.subtitle}
              </text>
            )}
            <text x={bbox.x + bbox.width / 2} y={centerCy + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill={color}>
              {Math.round(pct)}%
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

