import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'

const ZONE_COLORS = ['#23255a', '#2d62ed', '#ff4a2b', '#ffbe00']

export function Brain3Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 1000, H = 600
  const HX = 352, HY = 52, HW = 278, HH = 460

  const clipId = 'brain3-clip'

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Idea', subtitle: 'Define the concept' },
    { title: 'Planning', subtitle: 'Structure the roadmap' },
    { title: 'Design', subtitle: 'Visual identity' },
    { title: 'Marketing', subtitle: 'Launch strategy' },
  ]
  const count = Math.min(branches.length, 4)

  // 4 zones tile the full head: 2 columns × 2 rows
  const zW = HW / 2
  const zH = HH / 2
  const zones = [
    { id: 'zone-0', col: 0, row: 0 },
    { id: 'zone-1', col: 1, row: 0 },
    { id: 'zone-2', col: 0, row: 1 },
    { id: 'zone-3', col: 1, row: 1 },
  ]

  // Callout anchors
  const calloutCfg = [
    { align: 'left',  dx: 18,           dy: HY + zH * 0.5, zi: 0 },
    { align: 'right', dx: HX + HW + 38, dy: HY + zH * 0.5, zi: 1 },
    { align: 'left',  dx: 18,           dy: HY + zH * 1.5, zi: 2 },
    { align: 'right', dx: HX + HW + 38, dy: HY + zH * 1.5, zi: 3 },
  ]

  const titleId = 'title'
  const titleDefault = { x: 30, y: 14, width: 300, height: 42 }
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

      <rect x={0} y={0} width={W} height={H} fill="#f5f7fb" />

      {/* === 4 colored zones clipped to head shape — THEY ARE the silhouette === */}
      {zones.slice(0, count).map((z, i) => {
        const color = tplColors[z.id] ?? ZONE_COLORS[i]
        return (
          <rect
            key={z.id}
            x={HX + z.col * zW - 1}
            y={HY + z.row * zH - 1}
            width={zW + 2}
            height={zH + 2}
            fill={color}
            clipPath={`url(#${clipId})`}
          />
        )
      })}

      {/* Thin white grid lines */}
      <line x1={HX + zW} y1={HY} x2={HX + zW} y2={HY + HH}
        stroke="white" strokeWidth={2.5} clipPath={`url(#${clipId})`} />
      <line x1={HX} y1={HY + zH} x2={HX + HW} y2={HY + zH}
        stroke="white" strokeWidth={2.5} clipPath={`url(#${clipId})`} />

      {/* Title */}
      <g onMouseDown={e => startDrag(e, titleId, titleBbox)}
        transform={getTransform(titleId, titleBbox)} style={{ cursor: 'pointer' }}>
        <text x={titleBbox.x} y={titleBbox.y + 30}
          fontFamily="Arial, sans-serif" fontSize={26} fontWeight={800} fill="#1a1a2e">
          {data.title || 'Brain 3 Template'}
        </text>
        {selectedIds.has(titleId) && renderHandles(titleBbox, titleId)}
      </g>

      {/* Callouts with connectors to zone centers */}
      {calloutCfg.slice(0, count).map((cfg, i) => {
        const id = `callout-${i}`
        const color = tplColors[`zone-${i}`] ?? ZONE_COLORS[i]
        const isLeft = cfg.align === 'left'
        const cW = 228, cH = 78
        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? cfg.dx, y: pos?.y ?? (cfg.dy - cH / 2),
          width: pos?.width ?? cW, height: pos?.height ?? cH
        }
        const isSel = selectedIds.has(id)
        // Zone center
        const zi = cfg.zi
        const zCol = zi % 2, zRow = Math.floor(zi / 2)
        const zoneCX = HX + (zCol + 0.5) * zW
        const zoneCY = HY + (zRow + 0.5) * zH
        const connX = isLeft ? bbox.x + bbox.width : bbox.x

        return (
          <g key={id}>
            <line x1={connX} y1={bbox.y + bbox.height / 2}
              x2={zoneCX} y2={zoneCY}
              stroke={color} strokeWidth={1.5} strokeDasharray="5 3" />
            <circle cx={zoneCX} cy={zoneCY} r={5} fill={color} />
            <g onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8}
                fill="white" stroke={color} strokeWidth={2}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.10))" />
              <rect x={isLeft ? bbox.x : bbox.x + bbox.width - 6} y={bbox.y}
                width={6} height={bbox.height} rx={3} fill={color} />
              <text x={isLeft ? bbox.x + 16 : bbox.x + 12} y={bbox.y + 26}
                fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a1a2e">
                {branches[i]?.title ?? `Item ${i + 1}`}
              </text>
              <text x={isLeft ? bbox.x + 16 : bbox.x + 12} y={bbox.y + 50}
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