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
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { title, milestones } = data
  const W = 900
  const barH = 50
  const marginX = 60
  const marginTop = title ? 80 : 50
  const gap = 12

  return (
    <g ref={svgRef}>
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 15, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? '#222'
        const stroke = tplStrokeColors['main-title']
        const sW = tplStrokeWidths['main-title'] ?? 1
        return title ? (
          <g onMouseDown={e => startDrag(e, 'main-title', r)} style={{ cursor: 'pointer' }}>
            {title.split('\n').map((line, i) => (
              <text key={i} x={r.x + r.width / 2} y={r.y + 24 + i * 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
                {line}
              </text>
            ))}
            {selectedIds.has('main-title') && renderHandles(r, 'main-title')}
          </g>
        ) : null
      })()}

      <line x1={marginX - 10} y1={marginTop} x2={marginX - 10} y2={marginTop + milestones.length * (barH + gap)} stroke={tplStrokeColors['timeline'] ?? '#ddd'} strokeWidth={tplStrokeWidths['timeline'] ?? 2} />

      {milestones.map((milestone, index) => {
        const elementId = `milestone-${index}`
        const customStroke = tplStrokeColors[elementId]
        const customStrokeWidth = tplStrokeWidths[elementId] ?? 1.5
        const isSelected = selectedIds.has(elementId)
        const defaultY = marginTop + index * (barH + gap)
        const qColor = tplColors[`quarter-${index}`] ?? PALETTE[index % PALETTE.length]!
        const cardColor = tplColors[elementId] ?? milestone.style?.fill ?? 'white'
        const defaultRect = { x: marginX + 40, y: defaultY, width: milestone.style?.boxWidth ?? (W - marginX - 120), height: milestone.style?.boxHeight ?? barH }
        const rect = pos[elementId] ?? defaultRect
        const { x: rectX, y: rectY, width: rectW, height: rectH } = rect

        const styleFontSize = milestone.style?.fontSize ?? 12
        const styleFontWeight = milestone.style?.fontWeight ?? 600
        const styleFontColor = milestone.style?.fontColor ?? '#333'

        return (
          <g key={index} onMouseDown={e => startDrag(e, elementId, rect)} style={{ cursor: 'pointer' }}>
            <rect x={marginX + 10} y={rectY} width={28} height={rectH} rx={4} fill={qColor} />
            <text x={marginX + 24} y={rectY + rectH / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
              {milestone.quarter ?? '?'}
            </text>

            <rect x={rectX} y={rectY} width={rectW} height={rectH} rx={6} fill={cardColor} stroke={customStroke || (isSelected ? '#4a90d9' : (milestone.style?.stroke || '#e0e0e0'))} strokeWidth={isSelected ? 2.5 : customStrokeWidth} />
            {milestone.title.split('\n').map((line, li) => (<text x={rectX + 12} key={li} y={rectY + rectH / 2 + 4 + li * 12 - ((milestone.title.split('\\n').length - 1) * 6)} fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{line}</text>))}
            {milestone.subtitle && (
              <text x={rectX + 12} y={rectY + rectH / 2 + 18} fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
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
