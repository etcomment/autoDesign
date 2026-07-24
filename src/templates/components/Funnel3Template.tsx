import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#7b68ee', '#e91e63', '#4caf50']

function percentageToWidth(pct: number, minW: number, maxW: number): number {
  return minW + (maxW - minW) * (pct / 100)
}

export function Funnel3Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, levels } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const maxW = 540
  const minW = 90
  const startY = 80
  const totalH = 440
  const count = levels.length
  const levelH = count > 0 ? totalH / count : 0

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  const segments = levels.map((level, i) => {
    const pct = percentages[i]!
    const nextPct = i + 1 < count ? percentages[i + 1]! : pct * 0.35
    const topHW = percentageToWidth(pct, minW, maxW) / 2
    const botHW = percentageToWidth(nextPct, minW, maxW) / 2
    const y = startY + i * levelH
    const by = y + levelH
    const color = level.color ?? PALETTE[i % PALETTE.length]!

    return {
      y, by, topHW, botHW, pct, levelH, color,
      d: `M ${cx - topHW} ${y} L ${cx + topHW} ${y} L ${cx + botHW} ${by} L ${cx - botHW} ${by} Z`,
    }
  })

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={cx} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {levels.map((level, i) => {
        const s = segments[i]!
        const elementId = `level-${i}`
        const color = tplColors[elementId] ?? s.color
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x: cx - s.topHW, y: s.y, width: s.topHW * 2, height: s.levelH }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path d={s.d} fill={color} opacity={0.75} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1} />
              <path d={s.d} fill="black" opacity={0.12} transform="translate(0, 3)" stroke="none" />

              <rect x={cx - s.topHW + 4} y={s.y + 2} width={s.topHW * 2 - 8} height={s.levelH * 0.4} rx={3} fill="white" opacity={0.15} />
              <rect x={cx - s.topHW} y={s.y + s.levelH * 0.85} width={s.topHW * 2} height={2} fill="black" opacity={0.08} />

              <text x={cx} y={s.y + s.levelH / 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
                {level.title}
              </text>
              {level.subtitle && (
                <text x={cx} y={s.y + s.levelH / 2 + 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.9)">
                  {level.subtitle}
                </text>
              )}

              <text x={cx + s.topHW + 20} y={s.y + s.levelH / 2 + 5} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={800} fill={color}>
                {Math.round(s.pct)}%
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
