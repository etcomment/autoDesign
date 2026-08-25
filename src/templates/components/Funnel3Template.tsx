import { useRef, type ReactElement } from 'react'
import type { FunnelData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
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
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { levels } = data
  const W = 900
  const cx = W / 2
  const maxW = 540
  const minW = 90
  const startY = 40
  const totalH = 440
  const count = levels.length
  const levelH = count > 0 ? totalH / count : 0

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
        const elementId = `level-${index}`
        const pct = percentages[index]!
        const nextPct = index + 1 < count ? percentages[index + 1]! : pct * 0.35
        const topHW = percentageToWidth(pct, minW, maxW) / 2
        const botHW = percentageToWidth(nextPct, minW, maxW) / 2
        const defaultY = startY + index * levelH
        const maxHalf = Math.max(topHW, botHW)

        const defaultBbox = { x: cx - maxHalf, y: defaultY, width: maxHalf * 2, height: levelH }
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
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 2.5 : 1)

        const centerBx = bbox.x + bbox.width / 2
        const scaleFactor = bbox.width / defaultBbox.width
        const currentTopHW = topHW * scaleFactor
        const currentBotHW = botHW * scaleFactor

        const y = bbox.y
        const by = y + bbox.height
        const pathD = `M ${centerBx - currentTopHW} ${y} L ${centerBx + currentTopHW} ${y} L ${centerBx + currentBotHW} ${by} L ${centerBx - currentBotHW} ${by} Z`
        const IconComponent = level.icon ? TEMPLATE_ICONS[level.icon] : undefined

        const maxChars = Math.max(8, Math.floor((currentTopHW * 1.6) / 8))
        const titleLines = wrapTextByWidth(level.title, maxChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <path d={pathD} fill={color} opacity={0.88} stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x={centerBx - currentTopHW + 4} y={y + 2} width={currentTopHW * 2 - 8} height={bbox.height * 0.4} rx={3} fill="white" opacity={0.15} />

            {IconComponent && (
              <g transform={`translate(${centerBx - 8}, ${y + 8})`}>
                <IconComponent size={16} color="white" />
              </g>
            )}

            <text x={centerBx} y={y + bbox.height / 2 + (IconComponent ? 4 : 0) - (titleLines.length > 1 ? 6 : 0)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
              {titleLines.map((line, lineIndex) => (
                <tspan key={lineIndex} x={centerBx} dy={lineIndex === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </text>

            {level.subtitle && (
              <text x={centerBx} y={y + bbox.height / 2 + titleLines.length * 14 + (IconComponent ? 4 : 0)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.9)">
                {level.subtitle}
              </text>
            )}

            <text x={centerBx + currentTopHW + 20} y={y + bbox.height / 2 + 6} textAnchor="start" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={800} fill={color}>
              {level.value ?? `${Math.round(pct)}%`}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}
