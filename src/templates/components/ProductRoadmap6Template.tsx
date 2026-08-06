import { useRef, type ReactElement } from 'react'
import type { ProductRoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#3498db', '#e67e22', '#2ecc71', '#9b59b6']

export function ProductRoadmap6Template({ data }: { data: ProductRoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
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
          <g data-element-id="main-title" onMouseDown={e => startDrag(e, 'main-title', r)} transform={getTransform('main-title', r)} style={{ cursor: 'pointer' }}>
            {title.split('\n').map((line, i) => (
              <text key={i} x={r.x + r.width / 2} y={r.y + 24 + i * 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill={fill} stroke={stroke} strokeWidth={stroke ? sW : undefined}>
                {line}
              </text>
            ))}
            {selectedIds.has('main-title') && renderHandles(r, 'main-title')}
          </g>
        ) : null
      })()}

      {(() => {
        const tId = 'timeline'
        const tr = pos[tId] ?? { x: marginX - 12, y: marginTop, width: 4, height: milestones.length * (barH + gap) }
        return (
          <g onMouseDown={e => startDrag(e, tId, tr)} transform={getTransform(tId, tr)} style={{ cursor: 'pointer' }}>
            <rect x={tr.x - 4} y={tr.y} width={tr.width + 8} height={tr.height} fill="transparent" />
            <line x1={tr.x + tr.width / 2} y1={tr.y} x2={tr.x + tr.width / 2} y2={tr.y + tr.height} stroke={tplStrokeColors[tId] ?? '#ddd'} strokeWidth={tplStrokeWidths[tId] ?? 2} />
            {selectedIds.has(tId) && renderHandles(tr, tId)}
          </g>
        )
      })()}

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
          <g key={index}>
            {(() => {
              const qId = `quarter-${index}`
              const qr = pos[qId] ?? { x: marginX + 10, y: defaultY, width: 28, height: barH }
              const qc = tplColors[qId] ?? PALETTE[index % PALETTE.length]!
              return (
                <g onMouseDown={e => startDrag(e, qId, qr)} transform={getTransform(qId, qr)} style={{ cursor: 'pointer' }}>
                  <rect x={qr.x} y={qr.y} width={qr.width} height={qr.height} rx={4} fill={qc} />
                  <text x={qr.x + qr.width / 2} y={qr.y + qr.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
                    {milestone.quarter ?? '?'}
                  </text>
                  {selectedIds.has(qId) && renderHandles(qr, qId)}
                </g>
              )
            })()}

            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, rect)} transform={getTransform(elementId, rect)} style={{ cursor: 'pointer' }}>
              <rect x={rectX} y={rectY} width={rectW} height={rectH} rx={6} fill={cardColor} stroke={customStroke || (isSelected ? '#4a90d9' : (milestone.style?.stroke || '#e0e0e0'))} strokeWidth={isSelected ? 2.5 : customStrokeWidth} />
              {milestone.title.split('\n').map((line, li) => (<text x={rectX + 12} key={li} y={rectY + rectH / 2 + 4 + li * 12 - ((milestone.title.split('\\n').length - 1) * 6)} fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{line}</text>))}
              {milestone.subtitle && (
                <text x={rectX + 12} y={rectY + rectH / 2 + 18} fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
                  {milestone.subtitle.length > 60 ? milestone.subtitle.slice(0, 57) + '...' : milestone.subtitle}
                </text>
              )}
              {isSelected && renderHandles(rect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
