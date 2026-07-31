import { useRef, useId, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { MIGSO_PALETTE } from '../../lib/theme'

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

export function Brain2Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const uid = useId().replace(/:/g, '')
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const H = 600

  const headId = 'head'
  const headDef = { x: 580, y: 90, width: 220, height: 380 }
  const headPos = positions[headId]
  const headBbox = {
    x: headPos?.x ?? headDef.x,
    y: headPos?.y ?? headDef.y,
    width: headPos?.width ?? headDef.width,
    height: headPos?.height ?? headDef.height,
  }
  const isHeadSelected = selectedIds.has(headId)

  // Arc ring centered on skull center
  const sCX = headBbox.x + headBbox.width * 0.50
  const sCY = headBbox.y + headBbox.height * 0.36
  const R = headBbox.width * 0.85
  const r = headBbox.width * 0.55

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Idea', subtitle: 'Define the concept' },
    { title: 'Planning', subtitle: 'Structure the roadmap' },
    { title: 'Design', subtitle: 'Visual identity' },
    { title: 'Marketing', subtitle: 'Launch strategy' },
    { title: 'Analytics', subtitle: 'Measure results' },
    { title: 'Growth', subtitle: 'Scale the business' },
  ]
  const count = Math.max(1, branches.length)

  // Dynamic angle subdivision for N branches
  const startAngle = 140
  const totalSpan = 290
  const step = totalSpan / count
  const gap = count > 1 ? Math.min(4, step * 0.1) : 0

  return (
    <g ref={svgRef}>
      {/* Arc ring BEHIND the head — Dynamic subdivision based on branch count */}
      {branches.map((branch, i) => {
        const id = `arc-${i}`
        const color = tplColors[id] ?? branch.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(id)
        
        const sDeg = startAngle + i * step + gap / 2
        const eDeg = startAngle + (i + 1) * step - gap / 2
        const midA = (sDeg + eDeg) / 2
        const midPt = polarToCartesian(sCX, sCY, (R + r) / 2, midA)
        
        const aDef = { x: midPt.x - 35, y: midPt.y - 35, width: 70, height: 70 }
        const aPos = positions[id]
        const aBbox = {
          x: aPos?.x ?? aDef.x, y: aPos?.y ?? aDef.y,
          width: aPos?.width ?? aDef.width, height: aPos?.height ?? aDef.height
        }

        return (
          <g key={id} onMouseDown={e => startDrag(e, id, aBbox)}
            transform={getTransform(id, aBbox)} style={{ cursor: 'pointer' }}>
            <path d={arcPath(sCX, sCY, R, r, sDeg, eDeg)}
              fill={color} opacity={isSelected ? 0.85 : 1}
              stroke={isSelected ? '#4a90d9' : 'none'} strokeWidth={isSelected ? 2 : 0} />
            <text x={midPt.x} y={midPt.y + 4} textAnchor="middle"
              fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
              0{i + 1}
            </text>
            {isSelected && renderHandles(aBbox, id)}
          </g>
        )
      })}

      {/* Head silhouette ON TOP of arcs — Interactive */}
      <g transform={getTransform(headId, headBbox)} style={{ cursor: 'pointer' }}
         onMouseDown={e => startDrag(e, headId, headBbox)}>
        <path
          d={HEAD_PATH}
          transform={`translate(${headBbox.x},${headBbox.y}) scale(${headBbox.width / 300},${headBbox.height / 420})`}
          fill="#1a1a2e"
          stroke={isHeadSelected ? '#4a90d9' : 'none'}
          strokeWidth={isHeadSelected ? 3 : 0}
        />

        {/* Lightbulb/arrow icon inside the skull */}
        <g transform={`translate(${headBbox.x + headBbox.width * 0.18}, ${headBbox.y + headBbox.height * 0.18})`}>
          <circle cx={28} cy={18} r={20} fill="none" stroke="#666" strokeWidth={2} />
          <line x1={38} y1={18} x2={8} y2={18} stroke="#666" strokeWidth={2} />
          <polygon points="6,18 12,12 12,24" fill="#666" />
          <line x1={10} y1={24} x2={46} y2={24} stroke="#666" strokeWidth={1.5} />
          <polygon points="48,24 42,19 42,29" fill="#666" />
          <line x1={18} y1={38} x2={38} y2={38} stroke="#666" strokeWidth={2} />
          <line x1={20} y1={44} x2={36} y2={44} stroke="#666" strokeWidth={2} />
        </g>
        {isHeadSelected && renderHandles(headBbox, headId)}
      </g>

      {/* Branch list cards on the left with Dynamic Connectors to arc slices */}
      {branches.map((branch, i) => {
        const id = `branch-${i}`
        const arcId = `arc-${i}`
        const color = tplColors[id] ?? branch.color ?? tplColors[arcId] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!

        const itemH = Math.min(64, (H - 100) / count - 10)
        const itemDef = { x: 28, y: 50 + i * ((H - 80) / count), width: 420, height: Math.max(48, itemH) }
        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? itemDef.x, y: pos?.y ?? itemDef.y,
          width: pos?.width ?? itemDef.width, height: pos?.height ?? itemDef.height
        }
        const isSel = selectedIds.has(id)

        // Arc mid point for dynamic connector
        const sDeg = startAngle + i * step + gap / 2
        const eDeg = startAngle + (i + 1) * step - gap / 2
        const midA = (sDeg + eDeg) / 2
        const arcMidPt = polarToCartesian(sCX, sCY, (R + r) / 2, midA)

        // Dynamic arc position if user moved the arc element
        const arcPos = positions[arcId]
        const targetX = arcPos ? arcPos.x + arcPos.width / 2 : arcMidPt.x
        const targetY = arcPos ? arcPos.y + arcPos.height / 2 : arcMidPt.y

        const connStartX = bbox.x + bbox.width
        const connStartY = bbox.y + bbox.height / 2

        return (
          <g key={id}>
            {/* Dynamic connector line */}
            <line x1={connStartX} y1={connStartY} x2={targetX} y2={targetY}
              stroke={color} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.75} />
            <circle cx={targetX} cy={targetY} r={4} fill={color} />

            <g onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8}
                fill="#ffffff" stroke={isSel ? '#4a90d9' : '#e2e8f0'} strokeWidth={isSel ? 2.5 : 1}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.07))" />
              <rect x={bbox.x} y={bbox.y} width={6} height={bbox.height} rx={3} fill={color} />
              <circle cx={bbox.x + 28} cy={bbox.y + bbox.height / 2} r={13} fill={color} />
              <text x={bbox.x + 28} y={bbox.y + bbox.height / 2 + 4} textAnchor="middle"
                fontFamily="Arial, sans-serif" fontSize={11} fontWeight={800} fill="white">
                {String(i + 1).padStart(2, '0')}
              </text>
              <text x={bbox.x + 50} y={bbox.y + 22}
                fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a1a2e">
                {branch.title}
              </text>
              {bbox.height >= 52 && (
                <text x={bbox.x + 50} y={bbox.y + 42}
                  fontFamily="Arial, sans-serif" fontSize={11} fill="#666">
                  {branch.subtitle ?? `Description ${i + 1}`}
                </text>
              )}
              {isSel && renderHandles(bbox, id)}
            </g>
          </g>
        )
      })}
    </g>
  )
}