import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

function percentageToWidth(pct: number, minW: number, maxW: number): number {
  return minW + (maxW - minW) * (pct / 100)
}

export function Funnel3Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { levels } = data
  const W = 900
  const cx = W / 2
  const maxW = 540
  const minW = 90
  const startY = 40
  const totalH = 440
  const count = levels.length
  const levelH = count > 0 ? totalH / count : 0

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  return (
    <g ref={svgRef}>
      {levels.map((level, i) => {
        const elementId = `level-${i}`
        const pct = percentages[i]!
        const nextPct = i + 1 < count ? percentages[i + 1]! : pct * 0.35
        const topHW = percentageToWidth(pct, minW, maxW) / 2
        const botHW = percentageToWidth(nextPct, minW, maxW) / 2
        const defaultY = startY + i * levelH
        const maxHalf = Math.max(topHW, botHW)

        const defaultBbox = { x: cx - maxHalf, y: defaultY, width: maxHalf * 2, height: levelH }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const color = tplColors[elementId] ?? level.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)

        const centerBx = bbox.x + bbox.width / 2
        const y = bbox.y
        const by = y + bbox.height
        const d = `M ${centerBx - topHW} ${y} L ${centerBx + topHW} ${y} L ${centerBx + botHW} ${by} L ${centerBx - botHW} ${by} Z`

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={d} fill={color} opacity={0.88} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1} />
            <path d={d} fill="black" opacity={0.1} transform="translate(0, 3)" stroke="none" />

            <rect x={centerBx - topHW + 4} y={y + 2} width={topHW * 2 - 8} height={bbox.height * 0.4} rx={3} fill="white" opacity={0.15} />

            <text x={centerBx} y={y + bbox.height / 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
              {level.title}
            </text>
            {level.subtitle && (
              <text x={centerBx} y={y + bbox.height / 2 + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.9)">
                {level.subtitle}
              </text>
            )}

            <text x={centerBx + topHW + 20} y={y + bbox.height / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={800} fill={color}>
              {Math.round(pct)}%
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

