import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
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

  const { levels } = data
  const W = 900
  const count = levels.length
  const gap = 20
  const startX = (W - BAR_W) / 2
  const startY = 40

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  // Helper to get element bounding box
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
      {levels.map((level, i) => {
        const elementId = `level-${i}`
        const pct = percentages[i]!
        const bbox = getBbox(i)

        const color = tplColors[elementId] ?? level.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)

        // Connector arrow to next stage
        let arrowPoints = ''
        if (i < count - 1) {
          const nextBbox = getBbox(i + 1)
          const curCx = bbox.x + bbox.width / 2
          const curBottomY = bbox.y + bbox.height
          const nextCx = nextBbox.x + nextBbox.width / 2
          const nextTopY = nextBbox.y
          const midY = (curBottomY + nextTopY) / 2

          arrowPoints = `${curCx - 12},${curBottomY} ${curCx + 12},${curBottomY} ${nextCx},${nextTopY}`
        }

        return (
          <g key={elementId}>
            <g
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} opacity={0.9} />

              <text x={bbox.x + 20} y={bbox.y + bbox.height / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {level.title}
              </text>
              {level.subtitle && (
                <text x={bbox.x + 20} y={bbox.y + bbox.height / 2 + 22} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
                  {level.subtitle}
                </text>
              )}

              <text x={bbox.x + bbox.width - 20} y={bbox.y + bbox.height / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={800} fill="white">
                {Math.round(pct)}%
              </text>

              {isSelected && renderHandles(bbox, elementId)}
            </g>

            {i < count - 1 && arrowPoints && (
              <polygon points={arrowPoints} fill={color} opacity={0.5} />
            )}
          </g>
        )
      })}
    </g>
  )
}

