import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { MIGSO_PALETTE } from '../../lib/theme'

/**
 * 3 vertical shade columns per horizontal band.
 * Each entry: [light (face side), base (center), dark (back of skull)]
 */
const BAND_SHADES: [string, string, string][] = [
  ['#5c5aa0', '#2c2b64', '#1a1a3e'],   // MIGSO navy
  ['#6699e8', '#3366cc', '#1a3d88'],   // MIGSO blue
  ['#ff8870', '#ff5338', '#c02010'],   // MIGSO red
  ['#f5e060', '#f2cb13', '#b89400'],   // MIGSO yellow
  ['#90d8bc', '#5cc29d', '#289060'],   // MIGSO green
  ['#f5a0b8', '#f27798', '#b83060'],   // MIGSO pink
]

/** Simple white SVG icons, drawn at (0,0) */
function BandIcon({ index }: { index: number }): ReactElement {
  const icons: ReactElement[] = [
    // 0: Blueprint/document
    <g key="i0" stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={-12} y={-16} width={24} height={32} rx={2} />
      <line x1={-7} y1={-6} x2={7} y2={-6} />
      <line x1={-7} y1={2} x2={7} y2={2} />
      <line x1={-7} y1={10} x2={3} y2={10} />
    </g>,
    // 1: Boxes/product
    <g key="i1" stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={-13} y={-4} width={12} height={18} rx={2} />
      <rect x={2} y={-12} width={12} height={26} rx={2} />
      <line x1={8} y1={-16} x2={8} y2={-12} />
    </g>,
    // 2: Briefcase
    <g key="i2" stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={-16} y={-10} width={32} height={24} rx={3} />
      <path d="M -7,-10 L -7,-15 Q -7,-17 -5,-17 L 5,-17 Q 7,-17 7,-15 L 7,-10" />
      <line x1={-16} y1={2} x2={16} y2={2} />
    </g>,
    // 3: Gear + people
    <g key="i3" stroke="white" strokeWidth={2} fill="none" strokeLinecap="round">
      <circle cx={0} cy={1} r={6} />
      <circle cx={-13} cy={-11} r={4} />
      <circle cx={13} cy={-11} r={4} />
      <path d="M -18,8 Q -13,2 -6,4" />
      <path d="M 18,8 Q 13,2 6,4" />
    </g>,
    // 4: Lightbulb
    <g key="i4" stroke="white" strokeWidth={2} fill="none" strokeLinecap="round">
      <path d="M 0,-16 A 11,11 0 1,1 -7,5 L 7,5 Z" />
      <line x1={-6} y1={10} x2={6} y2={10} />
      <line x1={-4} y1={15} x2={4} y2={15} />
    </g>,
    // 5: Chart
    <g key="i5" stroke="white" strokeWidth={2} fill="none" strokeLinecap="round">
      <polyline points="-14,10 -7,-6 0,2 7,-10 14,0" />
      <line x1={-16} y1={14} x2={16} y2={14} />
    </g>,
  ]
  return icons[index % icons.length] ?? <g key="empty" />
}

export function BrainTemplate({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const W = 1000, H = 600

  // Head bounding box
  const HX = 335
  const HY = 32
  const HW = 295
  const HH = 520   // scale the 300x420 path to 520px tall → natural proportions

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Idea', subtitle: 'Define the concept' },
    { title: 'Planning', subtitle: 'Structure the roadmap' },
    { title: 'Design', subtitle: 'Visual identity' },
    { title: 'Marketing', subtitle: 'Go to market' },
  ]
  const count = Math.min(branches.length, MIGSO_PALETTE.length)
  const bandH = HH / count

  // ── Crop at the START of the last band (yellow) — everything below is hidden ──
  const CROP_Y = HY + (count - 1) * bandH

  // 3 vertical column widths as fractions of HW
  const COL_L = HW * 0.30   // left — lighter (face/nose side)
  const COL_M = HW * 0.40   // center — base color + icon
  // right = remaining — darker (back of skull)

  const clipHead = 'brain1-head'
  const clipCrop = 'brain1-crop'

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
        {/* Head silhouette clip */}
        <clipPath id={clipHead}>
          <path
            d={HEAD_PATH}
            transform={`translate(${HX},${HY}) scale(${HW / 300},${HH / 420})`}
          />
        </clipPath>

      </defs>

      <rect x={0} y={0} width={W} height={H} fill="#ffffff" />

      {/* Bands + separators clipped to head shape */}
      <g clipPath={`url(#${clipHead})`}>

          {/* 3 vertical columns per horizontal band */}
          {branches.slice(0, count).map((_, i) => {
            const shades = BAND_SHADES[i % BAND_SHADES.length] ?? BAND_SHADES[0]!
            const bandY = HY + i * bandH
            const h = bandH + 1
            const x0 = HX - 2
            const x1 = HX + COL_L
            const x2 = HX + COL_L + COL_M
            const customBase = tplColors[`band-${i}`]
            const cL = customBase ?? shades[0]
            const cM = customBase ?? shades[1]
            const cD = customBase ?? shades[2]
            return (
              <g key={`band-${i}`}>
                <rect x={x0} y={bandY} width={COL_L + 3} height={h} fill={cL} />
                <rect x={x1} y={bandY} width={COL_M + 1} height={h} fill={cM} />
                <rect x={x2} y={bandY} width={HW - COL_L - COL_M + 4} height={h} fill={cD} />
              </g>
            )
          })}

          {/* Horizontal separators between bands */}
          {branches.slice(0, count - 1).map((_, i) => (
            <line key={`hsep-${i}`}
              x1={HX - 2} y1={HY + (i + 1) * bandH}
              x2={HX + HW + 2} y2={HY + (i + 1) * bandH}
              stroke="white" strokeWidth={2.5}
            />
          ))}

          {/* Vertical separators between columns (per band) */}
          {branches.slice(0, count).map((_, i) => {
            const bandY = HY + i * bandH
            return (
              <g key={`vsep-${i}`}>
                <line x1={HX + COL_L} y1={bandY} x2={HX + COL_L} y2={bandY + bandH}
                  stroke="white" strokeWidth={1.5} opacity={0.65} />
                <line x1={HX + COL_L + COL_M} y1={bandY} x2={HX + COL_L + COL_M} y2={bandY + bandH}
                  stroke="white" strokeWidth={1.5} opacity={0.65} />
              </g>
            )
          })}

      </g>{/* end head clip */}

      {/* ── White rectangle covers neck below CROP_Y — always on top ── */}
      <rect x={HX - 20} y={CROP_Y} width={HW + 40} height={HH + 60} fill="white" />

      {/* Icons drawn OVER the bands (outside nested clips, so no double-clip issue) */}
      {branches.slice(0, count).map((_, i) => {
        const bandCy = HY + i * bandH + bandH / 2
        // Only show icon if it's within crop area
        if (bandCy > CROP_Y) return null
        const iconCX = HX + COL_L + COL_M / 2
        return (
          <g key={`icon-${i}`}
            transform={`translate(${iconCX}, ${bandCy})`}
            style={{ pointerEvents: 'none' }}>
            <BandIcon index={i} />
          </g>
        )
      })}

      {/* Title */}
      <g onMouseDown={e => startDrag(e, titleId, titleBbox)}
        transform={getTransform(titleId, titleBbox)} style={{ cursor: 'pointer' }}>
        <text x={titleBbox.x} y={titleBbox.y + 30}
          fontFamily="Arial, sans-serif" fontSize={26} fontWeight={800} fill={MIGSO_PALETTE[0]}>
          {data.title || 'Brain Template'}
        </text>
        {selectedIds.has(titleId) && renderHandles(titleBbox, titleId)}
      </g>

      {/* Callouts alternating L/R */}
      {branches.slice(0, count).map((branch, i) => {
        const id = `callout-${i}`
        const bandCy = HY + i * bandH + bandH / 2
        // Don't render callout if its band is fully cropped
        if (HY + i * bandH >= CROP_Y) return null
        const isLeft = i % 2 === 0
        const cW = 260, cH = 64
        const cDefaultX = isLeft ? 18 : HX + HW + 36
        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? cDefaultX,
          y: pos?.y ?? Math.min(bandCy - cH / 2, CROP_Y - cH),
          width: pos?.width ?? cW, height: pos?.height ?? cH
        }
        const isSel = selectedIds.has(id)
        const shades = BAND_SHADES[i % BAND_SHADES.length] ?? BAND_SHADES[0]!
        const color = tplColors[`band-${i}`] ?? shades[1]
        const connX = isLeft ? HX : HX + HW
        const connStartX = isLeft ? bbox.x + bbox.width : bbox.x

        return (
          <g key={id}>
            <line x1={connStartX} y1={bbox.y + bbox.height / 2}
              x2={connX} y2={Math.min(bandCy, CROP_Y - 2)}
              stroke={color} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={connX} cy={Math.min(bandCy, CROP_Y - 2)} r={4} fill={color} />
            <g onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6}
                fill="white" stroke={color} strokeWidth={2}
                filter="drop-shadow(0 2px 6px rgba(0,0,0,0.10))" />
              <rect x={isLeft ? bbox.x : bbox.x + bbox.width - 5} y={bbox.y}
                width={5} height={bbox.height} rx={3} fill={color} />
              <text x={isLeft ? bbox.x + 14 : bbox.x + 10} y={bbox.y + 22}
                fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={MIGSO_PALETTE[0]}>
                {branch.title}
              </text>
              <text x={isLeft ? bbox.x + 14 : bbox.x + 10} y={bbox.y + 44}
                fontFamily="Arial, sans-serif" fontSize={11} fill="#555">
                {branch.subtitle ?? `Step ${i + 1}`}
              </text>
              {isSel && renderHandles(bbox, id)}
            </g>
          </g>
        )
      })}
    </g>
  )
}