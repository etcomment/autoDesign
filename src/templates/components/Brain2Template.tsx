import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'

function polarToCartesian(cx: number, cy: number, r: number, a: number) {
  const rad = ((a - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}
function arcPath(cx: number, cy: number, R: number, r: number, s: number, e: number) {
  const a = polarToCartesian(cx, cy, R, e), b = polarToCartesian(cx, cy, R, s)
  const c = polarToCartesian(cx, cy, r, e), d = polarToCartesian(cx, cy, r, s)
  const lg = e - s > 180 ? '1' : '0'
  return `M ${a.x} ${a.y} A ${R} ${R} 0 ${lg} 0 ${b.x} ${b.y} L ${d.x} ${d.y} A ${r} ${r} 0 ${lg} 1 ${c.x} ${c.y} Z`
}

const ARC_CFG = [
  { s: 180, e: 238, color: '#23255a' },
  { s: 242, e: 298, color: '#2d62ed' },
  { s: 302, e: 358, color: '#ff4a2b' },
  { s:   2, e:  58, color: '#ffbe00' },
  { s:  62, e: 118, color: '#4cbfa0' },
  { s: 122, e: 178, color: '#e8507b' },
]

export function Brain2Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 1000, H = 600

  // Head — SMALLER, positioned right
  const HX = 580, HY = 110, HW = 190, HH = 334

  // Arc ring centered on skull center
  const sCX = HX + HW * 0.50
  const sCY = HY + HH * 0.36
  const R = 175, r = 112

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Idea', subtitle: 'Define the concept' },
    { title: 'Planning', subtitle: 'Structure the roadmap' },
    { title: 'Design', subtitle: 'Visual identity' },
    { title: 'Marketing', subtitle: 'Launch strategy' },
    { title: 'Analytics', subtitle: 'Measure results' },
    { title: 'Growth', subtitle: 'Scale the business' },
  ]
  const count = Math.min(branches.length, 6)

  const titleId = 'title'
  const titleDefault = { x: 30, y: 18, width: 420, height: 50 }
  const titlePos = positions[titleId]
  const titleBbox = {
    x: titlePos?.x ?? titleDefault.x, y: titlePos?.y ?? titleDefault.y,
    width: titlePos?.width ?? titleDefault.width, height: titlePos?.height ?? titleDefault.height
  }

  return (
    <g ref={svgRef}>
      <rect x={0} y={0} width={W} height={H} fill="#f8f9fc" />

      {/* Arc ring BEHIND the head */}
      {ARC_CFG.slice(0, count).map((cfg, i) => {
        const id = `arc-${i}`
        const color = tplColors[id] ?? cfg.color
        const isSelected = selectedIds.has(id)
        const midA = (cfg.s + cfg.e) / 2
        const midPt = polarToCartesian(sCX, sCY, (R + r) / 2, midA)
        const aDef = { x: midPt.x - 40, y: midPt.y - 40, width: 80, height: 80 }
        const aPos = positions[id]
        const aBbox = {
          x: aPos?.x ?? aDef.x, y: aPos?.y ?? aDef.y,
          width: aPos?.width ?? aDef.width, height: aPos?.height ?? aDef.height
        }
        return (
          <g key={id} onMouseDown={e => startDrag(e, id, aBbox)}
            transform={getTransform(id, aBbox)} style={{ cursor: 'pointer' }}>
            <path d={arcPath(sCX, sCY, R, r, cfg.s, cfg.e)}
              fill={color} opacity={isSelected ? 0.75 : 1} />
            <text x={midPt.x} y={midPt.y + 5} textAnchor="middle"
              fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="white">
              {branches[i]?.title?.substring(0, 8) ?? `Item ${i + 1}`}
            </text>
            {isSelected && renderHandles(aBbox, id)}
          </g>
        )
      })}

      {/* Head silhouette ON TOP of arcs */}
      <path
        d={HEAD_PATH}
        transform={`translate(${HX},${HY}) scale(${HW / 300},${HH / 420})`}
        fill="#1a1a2e"
      />

      {/* Lightbulb/arrow icon inside the skull */}
      <g transform={`translate(${HX + HW * 0.18}, ${HY + HH * 0.18})`}>
        <circle cx={28} cy={18} r={20} fill="none" stroke="#555" strokeWidth={2} />
        <line x1={38} y1={18} x2={8} y2={18} stroke="#555" strokeWidth={2} />
        <polygon points="6,18 12,12 12,24" fill="#555" />
        <line x1={10} y1={24} x2={46} y2={24} stroke="#555" strokeWidth={1.5} />
        <polygon points="48,24 42,19 42,29" fill="#555" />
        <line x1={18} y1={38} x2={38} y2={38} stroke="#555" strokeWidth={2} />
        <line x1={20} y1={44} x2={36} y2={44} stroke="#555" strokeWidth={2} />
      </g>

      {/* Title */}
      <g onMouseDown={e => startDrag(e, titleId, titleBbox)}
        transform={getTransform(titleId, titleBbox)} style={{ cursor: 'pointer' }}>
        <text x={titleBbox.x} y={titleBbox.y + 36}
          fontFamily="Arial, sans-serif" fontSize={32} fontWeight={800} fill="#1a1a2e">
          {data.title || 'Brain 2 Template'}
        </text>
        {selectedIds.has(titleId) && renderHandles(titleBbox, titleId)}
      </g>

      {/* Branch list on the left */}
      {branches.slice(0, count).map((branch, i) => {
        const id = `branch-${i}`
        const color = tplColors[`arc-${i}`] ?? (ARC_CFG[i % ARC_CFG.length]?.color ?? '#23255a')
        const itemDef = { x: 28, y: 88 + i * 72, width: 420, height: 62 }
        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? itemDef.x, y: pos?.y ?? itemDef.y,
          width: pos?.width ?? itemDef.width, height: pos?.height ?? itemDef.height
        }
        const isSel = selectedIds.has(id)
        return (
          <g key={id} onMouseDown={e => startDrag(e, id, bbox)}
            transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8}
              fill="white" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.07))" />
            <rect x={bbox.x} y={bbox.y} width={6} height={bbox.height} rx={3} fill={color} />
            <circle cx={bbox.x + 28} cy={bbox.y + 31} r={13} fill={color} />
            <text x={bbox.x + 28} y={bbox.y + 36} textAnchor="middle"
              fontFamily="Arial, sans-serif" fontSize={11} fontWeight={800} fill="white">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={bbox.x + 50} y={bbox.y + 22}
              fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a1a2e">
              {branch.title}
            </text>
            <text x={bbox.x + 50} y={bbox.y + 44}
              fontFamily="Arial, sans-serif" fontSize={11} fill="#666">
              {branch.subtitle ?? `Description ${i + 1}`}
            </text>
            {isSel && renderHandles(bbox, id)}
          </g>
        )
      })}
    </g>
  )
}