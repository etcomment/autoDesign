import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#7b68ee', '#e91e63', '#4caf50', '#ff9800', '#00bcd4']

function percentageToWidth(pct: number, minW: number, maxW: number): number {
  return minW + (maxW - minW) * (pct / 100)
}

export function Funnel4Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, levels } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const maxW = 500
  const minW = 60
  const topY = 70
  const splitY = 370
  const bottomY = 560

  const count = levels.length
  const topCount = Math.ceil(count / 2)
  const topH = (splitY - topY) / topCount

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  const topLevels = levels.slice(0, topCount)
  const bottomLevels = levels.slice(topCount)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={cx} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {topLevels.map((level, i) => {
        const pct = percentages[i]!
        const nextPct = i + 1 < count ? percentages[i + 1]! : pct * 0.4
        const topHW = percentageToWidth(pct, minW, maxW) / 2
        const botHW = percentageToWidth(nextPct, minW, maxW) / 2
        const y = topY + i * topH
        const by = y + topH
        const color = level.color ?? PALETTE[i % PALETTE.length]!
        const elementId = `level-${i}`
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: cx - topHW, y, width: topHW * 2, height: topH }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path
                d={`M ${cx - topHW} ${y} L ${cx + topHW} ${y} L ${cx + botHW} ${by} L ${cx - botHW} ${by} Z`}
                fill={tplColors[elementId] ?? color}
                opacity={0.82}
                stroke={isSelected ? '#4a90d9' : color}
                strokeWidth={1}
              />
              <text x={cx} y={y + topH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {level.title}
              </text>
              <text x={cx} y={y + topH / 2 + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.9)">
                {Math.round(pct)}%
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <text x={cx} y={splitY + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#718096">
        SPLIT
      </text>

      {bottomLevels.map((level, i) => {
        const pct = percentages[topCount + i] ?? percentages[percentages.length - 1]!
        const startHW = percentageToWidth(pct, minW, maxW / 2) / 2
        const endHW = percentageToWidth(pct * 0.35, minW, maxW / 2) / 2
        const xOff = i === 0 ? -maxW / 4 : maxW / 4
        const bx = cx + xOff
        const y = splitY + 30
        const by = bottomY
        const color = level.color ?? PALETTE[(topCount + i) % PALETTE.length]!
        const elementId = `level-${topCount + i}`
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: bx - startHW, y, width: startHW * 2, height: by - y }

        return (
          <g key={topCount + i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path
                d={`M ${bx - startHW} ${y} L ${bx + startHW} ${y} L ${bx + endHW} ${by} L ${bx - endHW} ${by} Z`}
                fill={tplColors[elementId] ?? color}
                opacity={0.82}
                stroke={isSelected ? '#4a90d9' : color}
                strokeWidth={1}
              />
              <text x={bx} y={y + (by - y) / 2 - 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                {level.title}
              </text>
              <text x={bx} y={y + (by - y) / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={800} fill="white">
                {Math.round(pct)}%
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
