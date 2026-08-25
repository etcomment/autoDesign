import { useRef, type ReactElement } from 'react'
import type { IcebergData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const VISIBLE_COLOR = MIGSO_PALETTE[0]!
const SUBMERGED_COLOR = '#0284c7'

export function Iceberg2Template({ data }: { data: IcebergData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { sections = [] } = data
  const W = 900
  const cx = W / 2
  const waterY = 160

  const visibleItems = sections.filter(s => s.isAbove)
  const submergedItems = sections.filter(s => !s.isAbove)

  return (
    <g ref={svgRef}>
      {/* Background Submerged Layer */}
      <rect x={40} y={waterY} width={W - 80} height={340} rx={12} fill="#e0f2fe" opacity={0.6} />

      {/* Waterline */}
      <line x1={30} y1={waterY} x2={W - 30} y2={waterY} stroke="#0284c7" strokeWidth={3} strokeDasharray="8 4" />
      <text x={50} y={waterY - 10} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#0284c7">
        SURFACE / WATERLINE
      </text>

      {/* Central Iceberg Silhouette Path */}
      <polygon
        points={`${cx},40 ${cx + 120},${waterY} ${cx + 220},460 ${cx - 220},460 ${cx - 120},${waterY}`}
        fill="#bae6fd"
        opacity={0.35}
        stroke="#7dd3fc"
        strokeWidth={2}
      />

      {/* Visible Section Header */}
      {(() => {
        const headerId = 'header-visible'
        const defaultRect = { x: cx - 100, y: 45, width: 200, height: 32 }
        const customPos = positions[headerId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(headerId)
        const color = tplColors[headerId] || VISIBLE_COLOR

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
              VISIBLE (TOP)
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {visibleItems.map((item, index) => {
        const elementId = `visible-${index}`
        const side = index % 2 === 0 ? -1 : 1
        const defaultX = cx + side * 220 - 100
        const defaultY = 85 + Math.floor(index / 2) * 55
        const defaultRect = { x: defaultX, y: defaultY, width: 200, height: 48 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const color = tplColors[elementId] ?? item.color ?? VISIBLE_COLOR
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#e2e8f0')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined

        const maxChars = Math.max(8, Math.floor((bbox.width - 40) / 8))
        const titleLines = wrapTextByWidth(item.title, maxChars)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={4} height={bbox.height} rx={2} fill={color} />

              {IconComponent && (
                <g transform={`translate(${bbox.x + 10}, ${bbox.y + bbox.height / 2 - 8})`}>
                  <IconComponent size={16} color={color} />
                </g>
              )}

              <text x={bbox.x + (IconComponent ? 32 : 12)} y={bbox.y + bbox.height / 2 + (item.subtitle ? -2 : 5)} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#1a202c">
                {titleLines[0] || ''}
              </text>

              {item.subtitle && (
                <text x={bbox.x + (IconComponent ? 32 : 12)} y={bbox.y + bbox.height / 2 + 13} fontFamily="Arial, sans-serif" fontSize={9} fill="#64748b">
                  {item.subtitle.length > 22 ? item.subtitle.slice(0, 20) + '...' : item.subtitle}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Submerged Section Header */}
      {(() => {
        const headerId = 'header-submerged'
        const defaultRect = { x: cx - 110, y: waterY + 20, width: 220, height: 32 }
        const customPos = positions[headerId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const isSelected = selectedIds.has(headerId)
        const color = tplColors[headerId] || SUBMERGED_COLOR

        return (
          <g
            key={headerId}
            data-element-id={headerId}
            onMouseDown={e => startDrag(e, headerId, bbox)}
            transform={getTransform(headerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={6} fill={color} />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
              SUBMERGED (HIDDEN)
            </text>
            {isSelected && renderHandles(bbox, headerId)}
          </g>
        )
      })()}

      {submergedItems.map((item, index) => {
        const elementId = `submerged-${index}`
        const side = index % 2 === 0 ? -1 : 1
        const defaultX = cx + side * 240 - 110
        const defaultY = waterY + 65 + Math.floor(index / 2) * 65
        const defaultRect = { x: defaultX, y: defaultY, width: 220, height: 54 }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const color = tplColors[elementId] ?? item.color ?? SUBMERGED_COLOR
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : '#bae6fd')
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined

        const maxChars = Math.max(8, Math.floor((bbox.width - 40) / 8))
        const titleLines = wrapTextByWidth(item.title, maxChars)

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <rect x={bbox.x} y={bbox.y} width={4} height={bbox.height} rx={2} fill={color} />

              {IconComponent && (
                <g transform={`translate(${bbox.x + 10}, ${bbox.y + bbox.height / 2 - 8})`}>
                  <IconComponent size={16} color={color} />
                </g>
              )}

              <text x={bbox.x + (IconComponent ? 32 : 12)} y={bbox.y + bbox.height / 2 + (item.subtitle ? -2 : 5)} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#1a202c">
                {titleLines[0] || ''}
              </text>

              {item.subtitle && (
                <text x={bbox.x + (IconComponent ? 32 : 12)} y={bbox.y + bbox.height / 2 + 13} fontFamily="Arial, sans-serif" fontSize={9} fill="#64748b">
                  {item.subtitle.length > 24 ? item.subtitle.slice(0, 22) + '...' : item.subtitle}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
