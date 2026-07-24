import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#3498db', '#e67e22', '#2ecc71', '#9b59b6']

export function ProductRoadmap6Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, milestones } = data
  const W = 900
  const H = Math.max(400, milestones.length * 70 + 120)
  const barH = 50
  const marginX = 60
  const marginTop = title ? 80 : 50
  const gap = 12

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <line x1={marginX - 10} y1={marginTop} x2={marginX - 10} y2={marginTop + milestones.length * (barH + gap)} stroke="#ddd" strokeWidth={2} />

      {milestones.map((milestone, index) => {
        const elementId = `milestone-${index}`
        const customStroke = tplStrokeColors[elementId]
        const isSelected = selectedIds.has(elementId)
        const y = marginTop + index * (barH + gap)
        const qColor = PALETTE[index % PALETTE.length]!
        const rect = { x: marginX + 40, y, width: W - marginX - 120, height: barH }

        return (
          <g key={index} onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer' }}>
            <rect x={marginX + 10} y={y} width={28} height={barH} rx={4} fill={qColor} />
            <text x={marginX + 24} y={y + barH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
              {milestone.quarter ?? '?'}
            </text>

            <rect x={marginX + 40} y={y} width={rect.width} height={barH} rx={6} fill="white" stroke={customStroke || (isSelected ? '#4a90d9' : '#e0e0e0')} strokeWidth={isSelected ? 2.5 : 1} />
            <text x={marginX + 52} y={y + barH / 2 + 4} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
              {milestone.title}
            </text>
            {milestone.subtitle && (
              <text x={marginX + 52} y={y + barH / 2 + 18} fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
                {milestone.subtitle.length > 60 ? milestone.subtitle.slice(0, 57) + '...' : milestone.subtitle}
              </text>
            )}
            {isSelected && renderHandles(rect, elementId)}
          </g>
        )
      })}
    </g>
  )
}
