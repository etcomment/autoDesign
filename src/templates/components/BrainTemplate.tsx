import { useRef, useId, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'

const BAND_SHADES: [string, string, string][] = [
  ['#5c5aa0', '#2c2b64', '#1a1a3e'],
  ['#6699e8', '#3366cc', '#1a3d88'],
  ['#ff8870', '#ff5338', '#c02010'],
  ['#f5e060', '#f2cb13', '#b89400'],
  ['#90d8bc', '#5cc29d', '#289060'],
  ['#f5a0b8', '#f27798', '#b83060'],
]

const FALLBACK_ICONS = ['lightbulb', 'gear', 'chart', 'flag', 'star', 'target']

function BandIcon({ iconName, index }: { iconName?: string; index: number }): ReactElement {
  const key = iconName ?? FALLBACK_ICONS[index % FALLBACK_ICONS.length]!
  const IconFn = TEMPLATE_ICONS[key]
  if (IconFn) {
    return (
      <g transform="translate(-18, -18)">
        <IconFn size={36} color="white" />
      </g>
    )
  }
  return <g />
}

export function BrainTemplate({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const uid = useId().replace(/:/g, '')
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const HX = 320
  const HY = 32
  const HW = 300
  const HH = 480

  // Crop Y: cut the neck below the cranium (~68% of the path height)
  const CROP_NECK_Y = HY + HH * 0.68

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Idea', subtitle: 'Define the concept' },
    { title: 'Planning', subtitle: 'Structure the roadmap' },
    { title: 'Design', subtitle: 'Visual identity' },
    { title: 'Marketing', subtitle: 'Go to market' },
  ]
  
  // Dynamic subdivision of horizontal bands based on number of branches
  const count = Math.max(1, branches.length)
  const visibleH = CROP_NECK_Y - HY
  const bandH = visibleH / count

  return (
    <g ref={svgRef}>
      <defs>
        {branches.map((_, i) => {
          const id = `band-${i}`
          const defaultY = HY + i * bandH
          const pos = positions[id]
          const bbox = {
            x: pos?.x ?? HX,
            y: pos?.y ?? defaultY,
            width: pos?.width ?? HW,
            height: pos?.height ?? bandH,
          }
          const currentTotalH = (bbox.width / 300) * 480
          const headOriginY = bbox.y - (i * (visibleH / count) * (bbox.width / 300))
          return (
            <clipPath id={`clip-${uid}-${id}`} key={`clip-${id}`}>
              <path
                d={HEAD_PATH}
                transform={`translate(${bbox.x}, ${headOriginY}) scale(${bbox.width / 300}, ${currentTotalH / 420})`}
              />
            </clipPath>
          )
        })}
      </defs>

      {/* Each band is interactive (drag, resize, select) */}
      {branches.map((branch, i) => {
        const id = `band-${i}`
        const defaultY = HY + i * bandH
        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? HX,
          y: pos?.y ?? defaultY,
          width: pos?.width ?? HW,
          height: pos?.height ?? bandH,
        }
        
        const currentBandH = bbox.height
        const isSel = selectedIds.has(id)
        const shades = BAND_SHADES[i % BAND_SHADES.length] ?? BAND_SHADES[0]!
        const customBase = tplColors[id] ?? branch.color
        const cL = customBase ?? shades[0]
        const cM = customBase ?? shades[1]
        const cD = customBase ?? shades[2]

        const COL_L = bbox.width * 0.30
        const COL_M = bbox.width * 0.40

        const clipId = `clip-${uid}-${id}`

        return (
          <g key={id}>
            <g transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}
               onMouseDown={e => startDrag(e, id, bbox)}>
               
              <g clipPath={`url(#${clipId})`}>
                <rect x={bbox.x - 2} y={bbox.y} width={COL_L + 3} height={currentBandH + 1} fill={cL} />
                <rect x={bbox.x + COL_L} y={bbox.y} width={COL_M + 1} height={currentBandH + 1} fill={cM} />
                <rect x={bbox.x + COL_L + COL_M} y={bbox.y} width={bbox.width - COL_L - COL_M + 4} height={currentBandH + 1} fill={cD} />

                {i > 0 && (
                  <line x1={bbox.x - 2} y1={bbox.y} x2={bbox.x + bbox.width + 2} y2={bbox.y} stroke="white" strokeWidth={2.5} />
                )}

                <line x1={bbox.x + COL_L} y1={bbox.y} x2={bbox.x + COL_L} y2={bbox.y + currentBandH} stroke="white" strokeWidth={1.5} opacity={0.65} />
                <line x1={bbox.x + COL_L + COL_M} y1={bbox.y} x2={bbox.x + COL_L + COL_M} y2={bbox.y + currentBandH} stroke="white" strokeWidth={1.5} opacity={0.65} />
              </g>

              <g transform={`translate(${bbox.x + COL_L + COL_M / 2}, ${bbox.y + currentBandH / 2})`} pointerEvents="none">
                <BandIcon iconName={branch.icon} index={i} />
              </g>

              {/* Transparent overlay for selection & dragging */}
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={currentBandH} fill="transparent" stroke={isSel ? '#4a90d9' : 'none'} strokeWidth={isSel ? 2 : 0} />
              
              {isSel && renderHandles(bbox, id)}
            </g>
          </g>
        )
      })}

      {/* Callouts with Dynamic Connectors */}
      {branches.map((branch, i) => {
        const id = `callout-${i}`
        const bandId = `band-${i}`
        
        // Coordonnées dynamiques de la bande pour y accrocher le connecteur
        const bandPos = positions[bandId]
        const bX = bandPos?.x ?? HX
        const bY = bandPos?.y ?? (HY + i * bandH)
        const bW = bandPos?.width ?? HW
        const bH = bandPos?.height ?? bandH

        const isLeft = i % 2 === 0
        const cW = 260, cH = 64
        
        const bandCy = bY + bH / 2
        const connTargetX = isLeft ? bX : bX + bW
        
        const cDefaultX = isLeft ? 24 : connTargetX + 36
        const cDefaultY = bandCy - cH / 2
        
        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? cDefaultX,
          y: pos?.y ?? cDefaultY,
          width: pos?.width ?? cW, 
          height: pos?.height ?? cH
        }
        const isSel = selectedIds.has(id)
        
        const color = tplColors[id] ?? branch.color ?? tplColors[bandId] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        
        const connStartX = isLeft ? bbox.x + bbox.width : bbox.x
        const connStartY = bbox.y + bbox.height / 2

        return (
          <g key={id}>
            {/* Dynamic connector line */}
            <line x1={connStartX} y1={connStartY}
              x2={connTargetX} y2={bandCy}
              stroke={color} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={connTargetX} cy={bandCy} r={4} fill={color} />
            
            <g onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6}
                fill="#ffffff" stroke={isSel ? '#4a90d9' : color} strokeWidth={isSel ? 2.5 : 2}
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