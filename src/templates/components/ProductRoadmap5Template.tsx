import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap5Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

export function ProductRoadmap5Template({ data }: { data: ProductRoadmap5Data }): ReactElement {
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
  const W = 1040
  const H = 600
  const timelineY = H / 2
  const cardW = 180
  const cardH = 90

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

  const spacing = Math.min(260, (W - 80) / sorted.length)
  const startX = 60 + Math.max(0, (W - 80 - sorted.length * spacing) / 2)

  const quarterBoundaries: Array<{ qi: number; x: number; label: string; color: string }> = []
  let lastQi = -1
  for (let i = 0; i < sorted.length; i++) {
    const qi = quarters.findIndex(q => q.label === sorted[i]!.quarter)
    if (qi !== lastQi && qi >= 0) {
      quarterBoundaries.push({
        qi,
        x: startX + i * spacing,
        label: quarters[qi]!.label,
        color: PALETTE[qi % PALETTE.length]!,
      })
      lastQi = qi
    }
  }

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

      {quarterBoundaries.map((qb, bi) => {
        const nextX = bi < quarterBoundaries.length - 1
          ? quarterBoundaries[bi + 1]!.x
          : startX + sorted.length * spacing
        const qW = nextX - qb.x
        const qId = `quarter-boundary-${bi}`
        const defaultQRect = { x: qb.x, y: 60, width: qW, height: 40 }
        const qRect = pos[qId] ?? defaultQRect
        const qColor = tplColors[qId] ?? qb.color
        const qStroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : qb.color)
        const qStrokeWidth = tplStrokeWidths[qId] ?? (selectedIds.has(qId) ? 2.5 : 1)
        const isSelected = selectedIds.has(qId)

        return (
          <g key={`qb-${bi}`} onMouseDown={e => startDrag(e, qId, qRect)} style={{ cursor: 'pointer' }}>
            <rect x={qRect.x} y={qRect.y} width={qRect.width} height={qRect.height} rx={6} fill={qColor} opacity={0.12} stroke={qStroke} strokeWidth={qStrokeWidth} />
            <text x={qRect.x + qRect.width / 2} y={qRect.y + qRect.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={qColor}>
              {qb.label}
            </text>
            {isSelected && renderHandles(qRect, qId)}
          </g>
        )
      })}

      {(() => {
        const tId = 'timeline'
        const tr = pos[tId] ?? { x: startX, y: timelineY - 4, width: (sorted.length - 1) * spacing, height: 8 }
        return (
          <g onMouseDown={e => startDrag(e, tId, tr)} style={{ cursor: 'pointer' }}>
            <rect x={tr.x} y={tr.y - 4} width={tr.width} height={tr.height + 8} fill="transparent" />
            <line x1={tr.x} y1={tr.y + tr.height / 2} x2={tr.x + tr.width} y2={tr.y + tr.height / 2} stroke={tplStrokeColors[tId] ?? '#b0b8c0'} strokeWidth={tplStrokeWidths[tId] ?? 3} strokeLinecap="round" />
            {selectedIds.has(tId) && renderHandles(tr, tId)}
          </g>
        )
      })()}

      {sorted.map((milestone, mi) => {
        const elementId = `milestone-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const color = tplColors[elementId] ?? milestone.style?.fill ?? (PALETTE as string[])[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || color))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)
        const isAbove = mi % 2 === 0
        const cx = startX + mi * spacing
        const cardX = cx - cardW / 2
        const cardY = isAbove ? timelineY - cardH - 30 : timelineY + 30
        const defaultMRect = { x: cardX, y: cardY, width: milestone.style?.boxWidth ?? cardW, height: milestone.style?.boxHeight ?? cardH }
        const visualRect = pos[elementId] ?? defaultMRect
        const mRectX = visualRect.x; const mRectY = visualRect.y; const mRectW = visualRect.width; const mRectH = visualRect.height

        const styleFontSize = milestone.style?.fontSize ?? 11
        const styleFontWeight = milestone.style?.fontWeight ?? 700
        const styleFontColor = milestone.style?.fontColor ?? '#fff'

        return (
          <g key={`m-${mi}`}>
            {(() => {
              const pId = `point-${mi}`
              const pr = pos[pId] ?? { x: cx - 10, y: timelineY - 10, width: 20, height: 20 }
              const pColor = tplColors[pId] ?? color
              return (
                <g onMouseDown={e => startDrag(e, pId, pr)} style={{ cursor: 'pointer' }}>
                  <line x1={pr.x + pr.width / 2} y1={isAbove ? mRectY + mRectH : pr.y + pr.height / 2} x2={pr.x + pr.width / 2} y2={isAbove ? pr.y + pr.height / 2 - 8 : mRectY} stroke={pColor} strokeWidth={1.5} strokeDasharray="3 3" />
                  <circle cx={pr.x + pr.width / 2} cy={pr.y + pr.height / 2} r={Math.min(pr.width, pr.height) / 2} fill={pColor} />
                  <circle cx={pr.x + pr.width / 2} cy={pr.y + pr.height / 2} r={Math.min(pr.width, pr.height) / 4} fill="#fff" />
                  <text x={pr.x + pr.width / 2} y={pr.y + pr.height / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fontWeight={700} fill={pColor}>
                    {mi + 1}
                  </text>
                  {selectedIds.has(pId) && renderHandles(pr, pId)}
                </g>
              )
            })()}

            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={mRectX} y={mRectY} width={mRectW} height={mRectH} rx={8} fill="#fff" stroke={stroke} strokeWidth={strokeWidth} />
              <rect x={mRectX} y={mRectY} width={mRectW} height={28} rx={8} fill={color} />
              <rect x={mRectX} y={mRectY + 20} width={mRectW} height={8} fill={color} />
              {milestone.title.split('\n').map((line, li) => (<text x={mRectX + mRectW / 2} key={li} y={mRectY + 19 + li * 12 - ((milestone.title.split('\\n').length - 1) * 6)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{line}</text>))}
              {milestone.subtitle && (
                <text x={mRectX + mRectW / 2} y={mRectY + 50} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {milestone.subtitle.length > 24 ? milestone.subtitle.slice(0, 22) + '...' : milestone.subtitle}
                </text>
              )}
              <text x={mRectX + mRectW / 2} y={mRectY + mRectH - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fill="#aaa">
                {milestone.quarter ?? ''} {milestone.lane ? ` · ${milestone.lane}` : ''}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
