import { useRef, useId, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { MIGSO_PALETTE } from '../../lib/theme'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'
import { wrapTextByWidth } from '../shared/primitives'

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 20} color={props.color ?? 'white'} />
  }
  return null
}

export function Brain3Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const uid = useId().replace(/:/g, '')
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const clipId = `clip-${uid}-head`

  const headId = 'head'
  const headDef = { x: 350, y: 50, width: 280, height: 460 }
  const headPos = positions[headId]
  const headBbox = {
    x: headPos?.x ?? headDef.x,
    y: headPos?.y ?? headDef.y,
    width: headPos?.width ?? headDef.width,
    height: headPos?.height ?? headDef.height,
  }
  const isHeadSelected = selectedIds.has(headId)

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'Idea', subtitle: 'Define the concept' },
    { title: 'Planning', subtitle: 'Structure the roadmap' },
    { title: 'Design', subtitle: 'Visual identity' },
    { title: 'Marketing', subtitle: 'Launch strategy' },
  ]
  const count = Math.max(1, branches.length)
  const sliceH = headBbox.height / count

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
        {/* Render dynamic colored zones clipped to head shape */}
        {branches.map((branch, i) => {
          const zoneId = `zone-${i}`
          const defaultY = headBbox.y + i * sliceH
          const pos = positions[zoneId]
          const bbox = {
            x: pos?.x ?? headBbox.x,
            y: pos?.y ?? defaultY,
            width: pos?.width ?? headBbox.width,
            height: pos?.height ?? sliceH,
          }
          const color = tplColors[zoneId] ?? branch.color ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
          const isZoneSel = selectedIds.has(zoneId)

          return (
            <g key={zoneId} onMouseDown={e => startDrag(e, zoneId, bbox)}
               transform={getTransform(zoneId, bbox)} style={{ cursor: 'pointer' }}>
              <rect
                x={bbox.x - 1}
                y={bbox.y - 1}
                width={bbox.width + 2}
                height={bbox.height + 2}
                fill={color}
                opacity={isZoneSel ? 0.85 : 1}
                clipPath={`url(#${clipId})`}
              />
              {i > 0 && (
                <line x1={bbox.x} y1={bbox.y} x2={bbox.x + bbox.width} y2={bbox.y}
                  stroke="white" strokeWidth={2} opacity={0.7} clipPath={`url(#${clipId})`} />
              )}
              {isZoneSel && renderHandles(bbox, zoneId)}
            </g>
          )
        })}

        {/* Outer head outline */}
        <path
          d={HEAD_PATH}
          transform={`translate(${headBbox.x},${headBbox.y}) scale(${headBbox.width / 300},${headBbox.height / 420})`}
          fill="none"
          stroke={isHeadSelected ? '#4a90d9' : 'white'}
          strokeWidth={isHeadSelected ? 3.5 : 1.5}
          opacity={0.8}
          style={{ cursor: 'pointer' }}
          onMouseDown={e => startDrag(e, headId, headBbox)}
        />
        {isHeadSelected && renderHandles(headBbox, headId)}
      </g>

      {/* Center Label (if defined in DSL) — Interactive */}
      {data.centerLabel && (() => {
        const centerId = 'center-label'
        const defaultCenterBbox = { x: headBbox.x + headBbox.width / 2 - 70, y: headBbox.y + headBbox.height + 12, width: 140, height: 36 }
        const customCenterPos = positions[centerId]
        const centerBbox = {
          x: customCenterPos?.x ?? defaultCenterBbox.x,
          y: customCenterPos?.y ?? defaultCenterBbox.y,
          width: customCenterPos?.width ?? defaultCenterBbox.width,
          height: customCenterPos?.height ?? defaultCenterBbox.height,
        }
        const isCenterSelected = selectedIds.has(centerId)
        const centerFill = tplColors[centerId] ?? '#1a1a2e'
        const centerStroke = tplStrokeColors[centerId] || (isCenterSelected ? '#4a90d9' : 'none')
        const centerStrokeW = tplStrokeWidths[centerId] !== undefined ? tplStrokeWidths[centerId] : (isCenterSelected ? 2.5 : 0)

        return (
          <g
            key={centerId}
            data-element-id={centerId}
            onMouseDown={e => startDrag(e, centerId, centerBbox)}
            transform={getTransform(centerId, centerBbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={centerBbox.x} y={centerBbox.y} width={centerBbox.width} height={centerBbox.height} rx={18} fill={centerFill} stroke={centerStroke} strokeWidth={centerStrokeW} />
            <text x={centerBbox.x + centerBbox.width / 2} y={centerBbox.y + centerBbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
              {data.centerLabel}
            </text>
            {isCenterSelected && renderHandles(centerBbox, centerId)}
          </g>
        )
      })()}

      {/* Callouts with Dynamic Connectors to zone centers */}
      {branches.map((branch, i) => {
        const id = `callout-${i}`
        const zoneId = `zone-${i}`
        const color = tplColors[id] ?? branch.color ?? tplColors[zoneId] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!

        const isLeft = i % 2 === 0
        const cW = 240
        const cH = 74

        const zonePos = positions[zoneId]
        const zX = zonePos?.x ?? headBbox.x
        const zY = zonePos?.y ?? (headBbox.y + i * sliceH)
        const zW = zonePos?.width ?? headBbox.width
        const zH = zonePos?.height ?? sliceH

        const zoneCX = zX + zW / 2
        const zoneCY = zY + zH / 2

        const defaultDx = isLeft ? 24 : headBbox.x + headBbox.width + 36
        const defaultDy = zoneCY - cH / 2

        const pos = positions[id]
        const bbox = {
          x: pos?.x ?? defaultDx, y: pos?.y ?? defaultDy,
          width: pos?.width ?? cW, height: pos?.height ?? cH
        }
        const isSel = selectedIds.has(id)

        const connStartX = isLeft ? bbox.x + bbox.width : bbox.x
        const connStartY = bbox.y + bbox.height / 2

        const maxChars = Math.max(10, Math.floor(bbox.width / 7.5))
        const titleLines = wrapTextByWidth(branch.title, maxChars)
        const subtitleLabel = [branch.subtitle ?? `Step ${i + 1}`, branch.val, branch.pct].filter(Boolean).join(' · ')
        const subtitleLines = wrapTextByWidth(subtitleLabel, maxChars)
        const IconFn = getDynamicIcon(branch.icon)

        return (
          <g key={id}>
            {/* Dynamic connector line */}
            <line x1={connStartX} y1={connStartY}
              x2={zoneCX} y2={zoneCY}
              stroke={color} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.85} />
            <circle cx={zoneCX} cy={zoneCY} r={5} fill={color} />

            <g onMouseDown={e => startDrag(e, id, bbox)}
              transform={getTransform(id, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8}
                fill="#ffffff" stroke={isSel ? '#4a90d9' : color} strokeWidth={isSel ? 2.5 : 2}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.10))" />
              <rect x={isLeft ? bbox.x : bbox.x + bbox.width - 6} y={bbox.y}
                width={6} height={bbox.height} rx={3} fill={color} />

              {IconFn && (
                <g transform={`translate(${isLeft ? bbox.x + bbox.width - 32 : bbox.x + 14}, ${bbox.y + 14})`}>
                  <IconFn size={20} color={color} />
                </g>
              )}

              <text x={isLeft ? bbox.x + 16 : bbox.x + 12 + (IconFn ? 24 : 0)} y={bbox.y + (subtitleLines.length > 0 ? 22 : bbox.height / 2 + 5)}
                fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1a1a2e">
                {titleLines.map((line, li) => (
                  <tspan key={li} x={isLeft ? bbox.x + 16 : bbox.x + 12 + (IconFn ? 24 : 0)} dy={li === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text x={isLeft ? bbox.x + 16 : bbox.x + 12 + (IconFn ? 24 : 0)} y={bbox.y + 22 + titleLines.length * 14 + 3}
                  fontFamily="Arial, sans-serif" fontSize={11} fill="#666">
                  {subtitleLines.map((line, li) => (
                    <tspan key={li} x={isLeft ? bbox.x + 16 : bbox.x + 12 + (IconFn ? 24 : 0)} dy={li === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
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