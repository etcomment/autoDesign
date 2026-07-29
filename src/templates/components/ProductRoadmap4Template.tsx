import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap4Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

const CHEVRON_OFFSET = 16

export function ProductRoadmap4Template({ data }: { data: ProductRoadmap4Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { title, quarters, milestones } = data
  const W = 1100
  const H = 420
  const topMargin = 80
  const stepW = 200
  const stepH = 100
  const gap = 8

  const sorted = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  if (sorted.length === 0) {
    return (
      <g ref={svgRef}>
        {title && <text x={W / 2} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight={700} fill="#1a1a2e">{title}</text>}
      </g>
    )
  }

  const leftOffset = Math.max(20, (W - sorted.length * (stepW + gap) + gap) / 2)

  return (
    <g ref={svgRef}>
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 10, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? '#1a1a2e'
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

      {sorted.map((milestone, mi) => {
        const elementId = `milestone-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const color = tplColors[elementId] ?? milestone.style?.fill ?? PALETTE[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || color))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const defaultX = leftOffset + mi * (stepW + gap)
        const defaultY = topMargin + (H - topMargin - stepH) / 2
        const defaultW = milestone.style?.boxWidth ?? stepW
        const defaultH = milestone.style?.boxHeight ?? stepH
        const visualRect = pos[elementId] ?? { x: defaultX, y: defaultY, width: defaultW, height: defaultH }
        const { x, y, width: curW, height: curH } = visualRect

        const points = [
          `${x},${y}`,
          `${x + curW},${y}`,
          `${x + curW + CHEVRON_OFFSET},${y + curH / 2}`,
          `${x + curW},${y + curH}`,
          `${x},${y + curH}`,
          `${x + CHEVRON_OFFSET},${y + curH / 2}`,
        ].join(' ')

        const styleFontSize = milestone.style?.fontSize ?? 13
        const styleFontWeight = milestone.style?.fontWeight ?? 700
        const styleFontColor = milestone.style?.fontColor ?? color

        return (
          <g key={`m-${mi}`}>
            {mi < sorted.length - 1 && (() => {
              const arrId = `arrow-${mi}`
              const arrRect = pos[arrId] ?? { x: x + curW + CHEVRON_OFFSET, y: y + curH / 2 - 10, width: leftOffset + (mi + 1) * (stepW + gap) - (x + curW + CHEVRON_OFFSET), height: 20 }
              const arrStroke = tplStrokeColors[arrId] ?? color
              const arrStrokeW = tplStrokeWidths[arrId] ?? 2
              return (
                <g onMouseDown={e => startDrag(e, arrId, arrRect)} style={{ cursor: 'pointer' }}>
                  <rect x={arrRect.x} y={arrRect.y} width={arrRect.width} height={arrRect.height} fill="transparent" />
                  <line
                    x1={arrRect.x}
                    y1={arrRect.y + arrRect.height / 2}
                    x2={arrRect.x + arrRect.width}
                    y2={arrRect.y + arrRect.height / 2}
                    stroke={arrStroke}
                    strokeWidth={arrStrokeW}
                    markerEnd={`url(#marker-${arrId})`}
                  />
                  <defs>
                    <marker id={`marker-${arrId}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill={arrStroke} />
                    </marker>
                  </defs>
                  {selectedIds.has(arrId) && renderHandles(arrRect, arrId)}
                </g>
              )
            })()}

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <polygon
                points={points}
                fill={color}
                opacity={isSelected ? 0.25 : 0.12}
                stroke={stroke}
                strokeWidth={strokeWidth}
              />
              <text x={x + curW / 2 + CHEVRON_OFFSET / 2} y={y + curH / 2 - 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={18} fontWeight={700} fill={color}>
                {mi + 1}
              </text>
              {milestone.title.split('\n').map((line, li) => (<text x={x + curW / 2 + CHEVRON_OFFSET / 2} key={li} y={y + curH / 2 + 12 + li * 12 - ((milestone.title.split('\\n').length - 1) * 6)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{line}</text>))}
              {milestone.subtitle && (
                <text x={x + curW / 2 + CHEVRON_OFFSET / 2} y={y + curH / 2 + 30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {milestone.subtitle.length > 22 ? milestone.subtitle.slice(0, 20) + '...' : milestone.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
