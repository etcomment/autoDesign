import { useRef, type ReactElement } from 'react'
import type { ProductRoadmap3Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db', '#e91e63', '#00bcd4']

export function ProductRoadmap3Template({ data }: { data: ProductRoadmap3Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { title, quarters, milestones, lanes } = data
  const W = 1000
  const topMargin = 50
  const headerHeight = 60
  const timelineY = topMargin + headerHeight
  const cardSpacing = 220
  const cardW = 160
  const cardH = 90
  const leftPad = 40

  const sortedMilestones = [...milestones].sort((a, b) => {
    const qiA = quarters.findIndex(q => q.label === a.quarter)
    const qiB = quarters.findIndex(q => q.label === b.quarter)
    return qiA - qiB
  })

  const quarterGroups = new Map<string, (typeof sortedMilestones)[number][]>()
  for (const m of sortedMilestones) {
    const q = m.quarter ?? '?'
    if (!quarterGroups.has(q)) quarterGroups.set(q, [])
    quarterGroups.get(q)!.push(m)
  }

  const totalCards = sortedMilestones.length
  const totalWidth = totalCards * cardSpacing + leftPad * 2
  const startX = Math.max(leftPad, (W - totalWidth) / 2 + leftPad)

  return (
    <g ref={svgRef}>
      {(() => {
        const r = pos['main-title'] ?? { x: W / 2 - 250, y: 10, width: 500, height: 35 }
        const fill = tplColors['main-title'] ?? '#1a1a2e'
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

      {quarters.map((quarter, qi) => {
        const qKey = quarter.label
        const qMs = sortedMilestones.filter(m => m.quarter === qKey)
        const firstIdx = sortedMilestones.findIndex(m => m.quarter === qKey)
        const lastIdx = firstIdx + qMs.length - 1
        if (qMs.length === 0) return null

        const qStartX = startX + firstIdx * cardSpacing - 10
        const qEndX = startX + lastIdx * cardSpacing + cardW + 10
        const qWidth = qEndX - qStartX
        const qId = `quarter-${qi}`
        const qRect = pos[qId] ?? { x: qStartX, y: topMargin, width: qWidth, height: headerHeight }
        const defaultColor = PALETTE[qi % PALETTE.length]!
        const color = tplColors[qId] ?? defaultColor
        const stroke = tplStrokeColors[qId] ?? (selectedIds.has(qId) ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[qId] ?? (selectedIds.has(qId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(qId)

        return (
          <g key={`q-group-${qKey}`} onMouseDown={e => startDrag(e, qId, qRect)} transform={getTransform(qId, qRect)} style={{ cursor: 'pointer' }}>
            <rect x={qRect.x} y={qRect.y} width={qRect.width} height={qRect.height} rx={8} fill={color} opacity={0.1} stroke={stroke} strokeWidth={strokeWidth} />
            <text x={qRect.x + qRect.width / 2} y={qRect.y + qRect.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill={color}>
              {qKey} {quarter.year ? quarter.year : ''}
            </text>
            {isSelected && renderHandles(qRect, qId)}
          </g>
        )
      })}

      {(() => {
        const tId = 'timeline'
        const tr = pos[tId] ?? { x: startX, y: timelineY + 28, width: (totalCards - 1) * cardSpacing + cardW, height: 4 }
        return (
          <g onMouseDown={e => startDrag(e, tId, tr)} transform={getTransform(tId, tr)} style={{ cursor: 'pointer' }}>
            <rect x={tr.x} y={tr.y - 4} width={tr.width} height={tr.height + 8} fill="transparent" />
            <line x1={tr.x} y1={tr.y + tr.height / 2} x2={tr.x + tr.width} y2={tr.y + tr.height / 2} stroke={tplStrokeColors[tId] ?? '#c0c8d0'} strokeWidth={tplStrokeWidths[tId] ?? 2} />
            {selectedIds.has(tId) && renderHandles(tr, tId)}
          </g>
        )
      })()}

      {sortedMilestones.map((milestone, mi) => {
        const elementId = `milestone-${mi}`
        const qi = quarters.findIndex(q => q.label === milestone.quarter)
        const color = tplColors[elementId] ?? milestone.style?.fill ?? PALETTE[qi >= 0 ? qi % PALETTE.length : mi % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : (milestone.style?.stroke || color))
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1)
        const isSelected = selectedIds.has(elementId)
        const cardX = startX + mi * cardSpacing
        const cardY = topMargin + headerHeight + 20
        const defaultMRect = { x: cardX, y: cardY, width: milestone.style?.boxWidth ?? cardW, height: milestone.style?.boxHeight ?? cardH }
        const visualRect = pos[elementId] ?? defaultMRect
        const mRectX = visualRect.x; const mRectY = visualRect.y; const mRectW = visualRect.width; const mRectH = visualRect.height

        const laneColor = lanes.find(l => l.label === milestone.lane)
          ? PALETTE[lanes.findIndex(l => l.label === milestone.lane) % PALETTE.length]
          : color
        const styleFontSize = milestone.style?.fontSize ?? 11
        const styleFontWeight = milestone.style?.fontWeight ?? 700
        const styleFontColor = milestone.style?.fontColor ?? color

        return (
          <g key={`m-${mi}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={mRectX} y={mRectY} width={mRectW} height={mRectH} rx={8} fill="#fff" stroke={stroke} strokeWidth={strokeWidth} />
              <rect x={mRectX} y={mRectY} width={mRectW} height={32} rx={8} fill={color} opacity={0.15} />
              <rect x={mRectX} y={mRectY + 24} width={mRectW} height={8} fill={color} opacity={0.15} />
              <rect x={mRectX + 4} y={mRectY + 3} width={4} height={26} rx={2} fill={laneColor} />
              {milestone.title.split('\n').map((line, li) => (<text x={mRectX + 14} key={li} y={mRectY + 20 + li * 12 - ((milestone.title.split('\\n').length - 1) * 6)} fontFamily="Arial, sans-serif" fontSize={styleFontSize} fontWeight={styleFontWeight} fill={styleFontColor}>{line}</text>))}
              {milestone.subtitle && (
                <text x={mRectX + mRectW / 2} y={mRectY + 52} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                  {milestone.subtitle.length > 24 ? milestone.subtitle.slice(0, 22) + '...' : milestone.subtitle}
                </text>
              )}
              <text x={mRectX + mRectW / 2} y={mRectY + mRectH - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fill="#aaa">
                {milestone.lane ?? ''}  ·  {milestone.quarter ?? ''}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {totalCards > 0 && [...Array(totalCards)].map((_, i) => {
        const dId = `dot-${i}`
        const defaultCx = startX + i * cardSpacing + cardW / 2
        const defaultCy = timelineY + 30
        const r = pos[dId] ?? { x: defaultCx - 5, y: defaultCy - 5, width: 10, height: 10 }
        const dotColor = tplColors[dId] ?? PALETTE[sortedMilestones[i] ? quarters.findIndex(q => q.label === sortedMilestones[i]!.quarter) % PALETTE.length : i % PALETTE.length]
        return (
          <g key={dId} onMouseDown={e => startDrag(e, dId, r)} transform={getTransform(dId, r)} style={{ cursor: 'pointer' }}>
            <circle cx={r.x + r.width / 2} cy={r.y + r.height / 2} r={Math.min(r.width, r.height) / 2} fill={dotColor} />
            <circle cx={r.x + r.width / 2} cy={r.y + r.height / 2} r={Math.min(r.width, r.height) / 4} fill="#fff" />
            {selectedIds.has(dId) && renderHandles(r, dId)}
          </g>
        )
      })}
    </g>
  )
}
