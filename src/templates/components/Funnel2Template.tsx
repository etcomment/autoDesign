import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#7b68ee', '#e91e63', '#4caf50']

export function Funnel2Template({ data }: { data: FunnelData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, levels } = data
  const W = 900
  const H = 400
  const maxVH = 160
  const minVH = 50
  const startX = 80
  const endX = 870
  const cx = H / 2

  const count = levels.length
  const totalW = endX - startX
  const segmentW = count > 0 ? totalW / count : 0

  const percentages = levels.map((_, i) => 100 - ((100 - 20) / (count - 1 || 1)) * i)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {levels.map((level, i) => {
        const pct = percentages[i]!
        const nextPct = i + 1 < count ? percentages[i + 1]! : pct * 0.34
        const vH = minVH + (maxVH - minVH) * (pct / 100)
        const nextVH = minVH + (maxVH - minVH) * (nextPct / 100)
        const x = startX + i * segmentW
        const rx = x + segmentW
        const halfH = vH / 2
        const nextHalfH = nextVH / 2

        const top = cx - halfH
        const bottom = cx + halfH
        const rtop = cx - nextHalfH
        const rbottom = cx + nextHalfH

        const d = 'M ' + x + ' ' + top + ' L ' + rx + ' ' + rtop + ' L ' + rx + ' ' + rbottom + ' L ' + x + ' ' + bottom + ' Z'

        const elementId = `level-${i}`
        const color = tplColors[elementId] ?? level.color ?? PALETTE[i % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const visualRect = { x, y: top, width: segmentW, height: vH }

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path d={d} fill={color} opacity={0.82} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={1.5} />
              <text x={x + segmentW / 2} y={cx - 20} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#1a202c">
                {level.title}
              </text>
              {level.subtitle && (
                <text x={x + segmentW / 2} y={cx - 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#718096">
                  {level.subtitle}
                </text>
              )}
              <text x={x + segmentW / 2} y={cx + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill={color}>
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
