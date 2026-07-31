import { useRef, useId, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { MIGSO_PALETTE } from '../../lib/theme'

/** Interlocking puzzle pieces in rectangle (ox,oy,pw,ph) for count items */
function makePuzzlePieces(ox: number, oy: number, pw: number, ph: number, count: number): { path: string; cx: number; cy: number }[] {
  if (count === 4) {
    const mx = ox + pw / 2
    const my = oy + ph / 2
    const t = Math.min(pw, ph) * 0.10

    const tl = `M ${ox} ${oy}
      L ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy} L ${ox + pw} ${oy}
      L ${ox + pw} ${my - t} A ${t} ${t} 0 0 1 ${ox + pw} ${my + t} L ${ox + pw} ${oy + ph}
      L ${mx + t} ${oy + ph} A ${t} ${t} 0 0 1 ${mx - t} ${oy + ph} L ${ox} ${oy + ph}
      L ${ox} ${my + t} A ${t} ${t} 0 0 0 ${ox} ${my - t} Z`

    const tr = `M ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy}
      L ${ox + pw} ${oy} L ${ox + pw} ${my - t} A ${t} ${t} 0 0 1 ${ox + pw} ${my + t}
      L ${ox + pw} ${oy + ph}
      L ${mx + t} ${oy + ph} A ${t} ${t} 0 0 1 ${mx - t} ${oy + ph}
      L ${mx - t} ${my + t} A ${t} ${t} 0 0 1 ${mx + t} ${my - t} L ${mx + t} ${oy} Z`

    const bl = `M ${ox} ${oy}
      L ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy}
      L ${mx + t} ${my - t} A ${t} ${t} 0 0 1 ${mx - t} ${my + t}
      L ${mx - t} ${oy + ph} A ${t} ${t} 0 0 0 ${mx + t} ${oy + ph}
      L ${ox + pw} ${oy + ph} L ${ox + pw} ${oy}
      L ${ox} ${oy} Z`

    const br = `M ${mx - t} ${oy} A ${t} ${t} 0 0 0 ${mx + t} ${oy}
      L ${ox + pw} ${oy} L ${ox + pw} ${oy + ph}
      L ${mx + t} ${oy + ph} A ${t} ${t} 0 0 0 ${mx - t} ${oy + ph}
      L ${mx - t} ${my + t} A ${t} ${t} 0 0 1 ${mx + t} ${my - t}
      L ${mx + t} ${oy} Z`

    return [
      { path: tl, cx: ox + pw * 0.25, cy: oy + ph * 0.25 },
      { path: tr, cx: mx + pw * 0.25, cy: oy + ph * 0.25 },
      { path: bl, cx: ox + pw * 0.25, cy: my + ph * 0.25 },
      { path: br, cx: mx + pw * 0.25, cy: my + ph * 0.25 },
    ]
  }

  const sliceH = ph / count
  const result: { path: string; cx: number; cy: number }[] = []
  const tabR = Math.min(pw, sliceH) * 0.15

  for (let i = 0; i < count; i++) {
    const sY = oy + i * sliceH
    const eY = oy + (i + 1) * sliceH
    const midX = ox + pw * 0.5

    let path = `M ${ox} ${sY}`
    if (i === 0) {
      path += ` L ${ox + pw} ${sY}`
    } else {
      path += ` L ${midX - tabR} ${sY} A ${tabR} ${tabR} 0 0 ${i % 2 === 0 ? '1' : '0'} ${midX + tabR} ${sY} L ${ox + pw} ${sY}`
    }
    path += ` L ${ox + pw} ${eY}`
    if (i === count - 1) {
      path += ` L ${ox} ${eY}`
    } else {
      path += ` L ${midX + tabR} ${eY} A ${tabR} ${tabR} 0 0 ${i % 2 === 0 ? '0' : '1'} ${midX - tabR} ${eY} L ${ox} ${eY}`
    }
    path += ` Z`

    result.push({ path, cx: ox + pw / 2, cy: sY + sliceH / 2 })
  }
  return result
}

export function Brain4Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const uid = useId().replace(/:/g, '')
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const headId = 'head'
  const headDef = { x: 330, y: 48, width: 285, height: 465 }
  const headPos = positions[headId]
  const headBbox = {
    x: headPos?.x ?? headDef.x,
    y: headPos?.y ?? headDef.y,
    width: headPos?.width ?? headDef.width,
    height: headPos?.height ?? headDef.height,
  }
  const isHeadSelected = selectedIds.has(headId)

  const clipId = `clip-${uid}-head`

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Planning', subtitle: 'Strategic goals and analysis' },
    { title: 'Idea', subtitle: 'Innovation and concepts' },
    { title: 'Design', subtitle: 'Architecture and blueprints' },
    { title: 'Marketing', subtitle: 'Go-to-market strategy' },
  ]
  const count = Math.max(1, branches.length)

  // Brain/cranium area (top portion of the head)
  const pX = headBbox.x + headBbox.width * 0.08
  const pY = headBbox.y + headBbox.height * 0.03
  const pW = headBbox.width * 0.82
  const pH = headBbox.height * 0.53

  const puzzlePieces = makePuzzlePieces(pX, pY, pW, pH, count)

  return (
    <g ref={svgRef}>
      <defs>
        <clipPath id={clipId}>
          <path
            d={HEAD_PATH}
            transform={`translate(${headBbox.x},${headBbox.y}) scale(${headBbox.width / 300},${headBbox.height / 420})`}
          />
        </clipPath>
      </defs>

      {/* Head silhouette container — Interactive */}
      <g transform={getTransform(headId, headBbox)}>
        {/* Lower head (jaw/neck) — neutral fill clipped to head */}
        <rect x={headBbox.x} y={pY + pH} width={headBbox.width} height={headBbox.y + headBbox.height - (pY + pH)}
          fill="#d2d5de" clipPath={`url(#${clipId})`} />

        {/* Puzzle pieces = the cranium */}
        {puzzlePieces.map((piece, i) => {
          const pid = `piece-${i}`
          const color = tplColors[pid] ?? branches[i]?.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
          const pDef = { x: piece.cx - pW / 4, y: piece.cy - pH / 4, width: pW / 2, height: pH / 2 }
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
              <path d={piece.path} fill={color} stroke="white" strokeWidth={2.5}
                strokeLinejoin="round" opacity={isSel ? 0.8 : 1} clipPath={`url(#${clipId})`} />
              <text x={piece.cx} y={piece.cy + 6} textAnchor="middle"
                fontFamily="Arial, sans-serif" fontSize={16} fontWeight={900}
                fill="rgba(255,255,255,0.85)">
                0{i + 1}
              </text>
              {isSel && renderHandles(bbox, pid)}
            </g>
          )
        })}

        {/* Head outline */}
        <path
          d={HEAD_PATH}
          transform={`translate(${headBbox.x},${headBbox.y}) scale(${headBbox.width / 300},${headBbox.height / 420})`}
          fill="none" stroke={isHeadSelected ? '#4a90d9' : '#1a1a2e'} strokeWidth={isHeadSelected ? 3 : 1.5}
          style={{ cursor: 'pointer' }}
          onMouseDown={e => startDrag(e, headId, headBbox)}
        />
        {isHeadSelected && renderHandles(headBbox, headId)}
      </g>

      {/* Callouts with Dynamic Connectors */}
      {branches.map((branch, i) => {
        const id = `callout-${i}`
        const pieceId = `piece-${i}`
        const color = tplColors[id] ?? branch.color ?? tplColors[pieceId] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isLeft = i % 2 === 0
        const cW = 230, cH = 74

        const piece = puzzlePieces[i] ?? puzzlePieces[0]!
        const piecePos = positions[pieceId]
        const pcX = piecePos ? piecePos.x + piecePos.width / 2 : piece.cx
        const pcY = piecePos ? piecePos.y + piecePos.height / 2 : piece.cy

        const defaultDx = isLeft ? 22 : headBbox.x + headBbox.width + 38
        const defaultDy = pcY - cH / 2

        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? defaultDx, y: pos?.y ?? defaultDy,
          width: pos?.width ?? cW, height: pos?.height ?? cH
        }
        const isSel = selectedIds.has(id)
        const connStartX = isLeft ? bbox.x + bbox.width : bbox.x
        const connStartY = bbox.y + bbox.height / 2

        return (
          <g key={id}>
            {/* Dynamic connector line */}
            <line x1={connStartX} y1={connStartY}
              x2={pcX} y2={pcY}
              stroke={color} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.85} />
            <circle cx={pcX} cy={pcY} r={5} fill={color} />

            <g onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8}
                fill="#ffffff" stroke={isSel ? '#4a90d9' : color} strokeWidth={isSel ? 2.5 : 2}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.09))" />
              <rect x={isLeft ? bbox.x : bbox.x + bbox.width - 6} y={bbox.y}
                width={6} height={bbox.height} rx={3} fill={color} />
              <text x={isLeft ? bbox.x + 16 : bbox.x + 12} y={bbox.y + 25}
                fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a1a2e">
                {branch.title}
              </text>
              <text x={isLeft ? bbox.x + 16 : bbox.x + 12} y={bbox.y + 48}
                fontFamily="Arial, sans-serif" fontSize={11} fill="#666">
                {branch.subtitle ?? `Description ${i + 1}`}
              </text>
              {isSel && renderHandles(bbox, id)}
            </g>
          </g>
        )
      })}
    </g>
  )
}