import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
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

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  const topLevels = levels.slice(0, topCount)
  const bottomLevels = levels.slice(topCount)

  return (
    <g ref={svgRef}>
      {topLevels.map((level, i) => {
        const elementId = `level-${i}`
        const pct = percentages[i]!
        const nextPct = i + 1 < count ? percentages[i + 1]! : pct * 0.4
        const topHW = percentageToWidth(pct, minW, maxW) / 2
        const botHW = percentageToWidth(nextPct, minW, maxW) / 2
        const y = topY + i * topH
        const by = y + topH
        const defaultColor = MIGSO_PALETTE[i % MIGSO_PALETTE.length]!

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
        const centerBx = bbox.x + bbox.width / 2

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={`M ${centerBx - topHW} ${bbox.y} L ${centerBx + topHW} ${bbox.y} L ${centerBx + botHW} ${bbox.y + bbox.height} L ${centerBx - botHW} ${bbox.y + bbox.height} Z`}
              fill={color}
              opacity={0.88}
              stroke={isSelected ? '#4a90d9' : color}
              strokeWidth={isSelected ? 2.5 : 1}
            />
            <text x={centerBx} y={bbox.y + bbox.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
              {level.title}
            </text>
            <text x={centerBx} y={bbox.y + bbox.height / 2 + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.9)">
              {Math.round(pct)}%
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      <text x={cx} y={splitY + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#718096">
        SPLIT
      </text>

      {bottomLevels.map((level, i) => {
        const elementId = `level-${topCount + i}`
        const pct = percentages[topCount + i] ?? percentages[percentages.length - 1]!
        const startHW = percentageToWidth(pct, minW, maxW / 2) / 2
        const endHW = percentageToWidth(pct * 0.35, minW, maxW / 2) / 2
        const xOff = i === 0 ? -maxW / 4 : maxW / 4
        const bx = cx + xOff
        const y = splitY + 30
        const by = bottomY
        const defaultColor = MIGSO_PALETTE[(topCount + i) % MIGSO_PALETTE.length]!

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
        const centerBx = bbox.x + bbox.width / 2

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={`M ${centerBx - startHW} ${bbox.y} L ${centerBx + startHW} ${bbox.y} L ${centerBx + endHW} ${bbox.y + bbox.height} L ${centerBx - endHW} ${bbox.y + bbox.height} Z`}
              fill={color}
              opacity={0.88}
              stroke={isSelected ? '#4a90d9' : color}
              strokeWidth={isSelected ? 2.5 : 1}
            />
            <text x={centerBx} y={bbox.y + bbox.height / 2 - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
              {level.title}
            </text>
            <text x={centerBx} y={bbox.y + bbox.height / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={800} fill="white">
              {Math.round(pct)}%
            </text>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}

