import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'

const PIECE_COLORS = ['#23255a', '#2d62ed', '#ffbe00', '#ff4a2b']

/** 4 interlocking puzzle pieces in rectangle (ox,oy,pw,ph) with semicircular tabs */
function makePuzzlePieces(ox: number, oy: number, pw: number, ph: number): string[] {
  const mx = ox + pw / 2
  const my = oy + ph / 2
  const t = Math.min(pw, ph) * 0.10

  // TL: right tab OUT, bottom tab OUT, left tab IN, top tab IN
  const tl = `M ${ox} ${oy}
    L ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy} L ${ox + pw} ${oy}
    L ${ox + pw} ${my - t} A ${t} ${t} 0 0 1 ${ox + pw} ${my + t} L ${ox + pw} ${oy + ph}
    L ${mx + t} ${oy + ph} A ${t} ${t} 0 0 1 ${mx - t} ${oy + ph} L ${ox} ${oy + ph}
    L ${ox} ${my + t} A ${t} ${t} 0 0 0 ${ox} ${my - t} Z`

  // TR: left tab IN (concave), bottom tab OUT, right straight, top straight
  const tr = `M ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy}
    L ${ox + pw} ${oy} L ${ox + pw} ${my - t} A ${t} ${t} 0 0 1 ${ox + pw} ${my + t}
    L ${ox + pw} ${oy + ph}
    L ${mx + t} ${oy + ph} A ${t} ${t} 0 0 1 ${mx - t} ${oy + ph}
    L ${mx - t} ${my + t} A ${t} ${t} 0 0 1 ${mx + t} ${my - t} L ${mx + t} ${oy} Z`

  // BL: right tab OUT, top tab IN (concave), left straight, bottom straight
  const bl = `M ${ox} ${oy}
    L ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy}
    L ${mx + t} ${my - t} A ${t} ${t} 0 0 1 ${mx - t} ${my + t}
    L ${mx - t} ${oy + ph} A ${t} ${t} 0 0 0 ${mx + t} ${oy + ph}
    L ${ox + pw} ${oy + ph} L ${ox + pw} ${oy}
    L ${ox} ${oy} Z`

  // BR: left tab IN, top tab IN, right straight, bottom straight
  const br = `M ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy}
    L ${ox + pw} ${oy} L ${ox + pw} ${oy + ph}
    L ${mx + t} ${oy + ph} A ${t} ${t} 0 0 0 ${mx - t} ${oy + ph}
    L ${mx - t} ${my + t} A ${t} ${t} 0 0 1 ${mx + t} ${my - t}
    L ${mx + t} ${oy} Z`

  return [tl, tr, bl, br]
}

export function Brain4Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 1000, H = 600
  const HX = 330, HY = 48, HW = 285, HH = 465
  const clipId = 'brain4-head-clip'

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Planning', subtitle: 'Strategic goals and analysis' },
    { title: 'Idea', subtitle: 'Innovation and concepts' },
    { title: 'Design', subtitle: 'Architecture and blueprints' },
    { title: 'Marketing', subtitle: 'Go-to-market strategy' },
  ]
  const count = Math.min(branches.length, 4)

  // Brain/cranium area (top portion of the head)
  const pX = HX + HW * 0.08
  const pY = HY + HH * 0.03
  const pW = HW * 0.82
  const pH = HH * 0.53
  const mx = pX + pW / 2
  const my = pY + pH / 2

  const pieceIds = ['piece-tl', 'piece-tr', 'piece-bl', 'piece-br']
  const pieces = makePuzzlePieces(pX, pY, pW, pH)
  const pieceCenters = [
    { cx: pX + pW * 0.25, cy: pY + pH * 0.25 },
    { cx: mx  + pW * 0.25, cy: pY + pH * 0.25 },
    { cx: pX + pW * 0.25, cy: my  + pH * 0.25 },
    { cx: mx  + pW * 0.25, cy: my  + pH * 0.25 },
  ]

  const calloutCfg = [
    { align: 'left',  dx: 22,           dy: pY + pH * 0.08 },
    { align: 'right', dx: HX + HW + 38, dy: pY + pH * 0.08 },
    { align: 'left',  dx: 22,           dy: my  + pH * 0.05 },
    { align: 'right', dx: HX + HW + 38, dy: my  + pH * 0.05 },
  ]

  const titleId = 'title'
  const titleDefault = { x: 28, y: 14, width: 280, height: 42 }
  const titlePos = positions[titleId]
  const titleBbox = {
    x: titlePos?.x ?? titleDefault.x, y: titlePos?.y ?? titleDefault.y,
    width: titlePos?.width ?? titleDefault.width, height: titlePos?.height ?? titleDefault.height
  }

  return (
    <g ref={svgRef}>
      <defs>
        <clipPath id={clipId}>
          <path
            d={HEAD_PATH}
            transform={`translate(${HX},${HY}) scale(${HW / 300},${HH / 420})`}
          />
        </clipPath>
      </defs>

      <rect x={0} y={0} width={W} height={H} fill="#f8f9fc" />

      {/* Lower head (jaw/neck) — neutral fill clipped to head */}
      <rect x={HX} y={pY + pH} width={HW} height={HY + HH - (pY + pH)}
        fill="#d2d5de" clipPath={`url(#${clipId})`} />

      {/* 4 puzzle pieces = the cranium */}
      {pieces.slice(0, count).map((piecePath, i) => {
        const pid = pieceIds[i] ?? `piece-${i}`
        const color = tplColors[pid] ?? PIECE_COLORS[i % PIECE_COLORS.length]
        const pc = pieceCenters[i] ?? { cx: mx, cy: my }
        const pDef = { x: pc.cx - pW / 4, y: pc.cy - pH / 4, width: pW / 2, height: pH / 2 }
        const pos = positions[pid]
        const bbox = {
          x: pos?.x ?? pDef.x, y: pos?.y ?? pDef.y,
          width: pos?.width ?? pDef.width, height: pos?.height ?? pDef.height
        }
        const isSel = selectedIds.has(pid)
        return (
          <g key={pid}
            onMouseDown={e => startDrag(e, pid, bbox)}
            transform={getTransform(pid, bbox)}
            style={{ cursor: 'pointer' }}>
            <path d={piecePath} fill={color} stroke="white" strokeWidth={2.5}
              strokeLinejoin="round" opacity={isSel ? 0.8 : 1} />
            <text x={pc.cx} y={pc.cy + 8} textAnchor="middle"
              fontFamily="Arial, sans-serif" fontSize={18} fontWeight={900}
              fill="rgba(255,255,255,0.28)">
              0{i + 1}
            </text>
            {isSel && renderHandles(bbox, pid)}
          </g>
        )
      })}

      {/* Head outline */}
      <path
        d={HEAD_PATH}
        transform={`translate(${HX},${HY}) scale(${HW / 300},${HH / 420})`}
        fill="none" stroke="#1a1a2e" strokeWidth={1.5}
      />

      {/* Title */}
      <g onMouseDown={e => startDrag(e, titleId, titleBbox)}
        transform={getTransform(titleId, titleBbox)} style={{ cursor: 'pointer' }}>
        <text x={titleBbox.x} y={titleBbox.y + 30}
          fontFamily="Arial, sans-serif" fontSize={26} fontWeight={800} fill="#1a1a2e">
          {data.title || 'Brain 4 Template'}
        </text>
        {selectedIds.has(titleId) && renderHandles(titleBbox, titleId)}
      </g>

      {/* Callouts */}
      {calloutCfg.slice(0, count).map((cfg, i) => {
        const id = `callout-${i}`
        const color = tplColors[pieceIds[i] ?? ''] ?? PIECE_COLORS[i % PIECE_COLORS.length]
        const isLeft = cfg.align === 'left'
        const cW = 230, cH = 74
        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? cfg.dx, y: pos?.y ?? cfg.dy,
          width: pos?.width ?? cW, height: pos?.height ?? cH
        }
        const isSel = selectedIds.has(id)
        const pc = pieceCenters[i] ?? { cx: mx, cy: my }
        const connX = isLeft ? bbox.x + bbox.width : bbox.x

        return (
          <g key={id}>
            <line x1={connX} y1={bbox.y + bbox.height / 2}
              x2={pc.cx} y2={pc.cy}
              stroke={color} strokeWidth={1.5} strokeDasharray="5 3" />
            <circle cx={pc.cx} cy={pc.cy} r={5} fill={color} />
            <g onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8}
                fill="white" stroke={color} strokeWidth={2}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.09))" />
              <rect x={isLeft ? bbox.x : bbox.x + bbox.width - 6} y={bbox.y}
                width={6} height={bbox.height} rx={3} fill={color} />
              <text x={isLeft ? bbox.x + 16 : bbox.x + 12} y={bbox.y + 25}
                fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a1a2e">
                {branches[i]?.title ?? `Step ${i + 1}`}
              </text>
              <text x={isLeft ? bbox.x + 16 : bbox.x + 12} y={bbox.y + 48}
                fontFamily="Arial, sans-serif" fontSize={11} fill="#666">
                {branches[i]?.subtitle ?? `Description ${i + 1}`}
              </text>
              {isSel && renderHandles(bbox, id)}
            </g>
          </g>
        )
      })}
    </g>
  )
}