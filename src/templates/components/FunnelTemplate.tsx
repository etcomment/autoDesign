import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

function percentageToWidth(percentage: number, minW: number, maxW: number): number {
  return minW + (maxW - minW) * (percentage / 100)
}

export function FunnelTemplate({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
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
    return 100 - ((100 - 20) / (count - 1 || 1)) * i
  })

  return (
    <g ref={svgRef}>
      {levels.map((level, i) => {
        const elementId = `level-${i}`
        const defaultColor = MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const color = tplColors[elementId] ?? level.color ?? defaultColor

        const topPct = percentages[i]!
        const bottomPct = i + 1 < count ? percentages[i + 1]! : topPct * 0.4
        const topHW = percentageToWidth(topPct, minW, maxW) / 2
        const bottomHW = percentageToWidth(bottomPct, minW, maxW) / 2

        const defaultY = funnelTop + i * levelH
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

        const centerBx = bbox.x + bbox.width / 2
        const tl = centerBx - topHW
        const tr = centerBx + topHW
        const bl = centerBx - bottomHW
        const br = centerBx + bottomHW
        const y = bbox.y
        const by = y + bbox.height

        const d = `M ${tl} ${y} L ${tr} ${y} L ${br} ${by} L ${bl} ${by} Z`
        const labelX = centerBx - maxW / 2 - 28
        const percentX = centerBx + maxW / 2 + 28

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={d} fill={color} opacity={0.85} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} />

            <text x={labelX} y={bbox.y + bbox.height / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#1a202c">
              {level.title}
            </text>

            {level.subtitle && (
              <text x={labelX} y={bbox.y + bbox.height / 2 + 20} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fill="#718096">
                {level.subtitle}
              </text>
            )}

            <text x={percentX} y={bbox.y + bbox.height / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill={color}>
              {Math.round(topPct)}%
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

