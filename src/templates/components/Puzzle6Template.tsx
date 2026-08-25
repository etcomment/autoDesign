import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9b59b6', '#00bcd4']
const CARD_W = 140
const CARD_H = 80
const CENTER_R = 45

export function Puzzle6Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { pieces } = data
  const W = 700
  const H = 480
  const cx = W / 2
  const cy = H / 2
  const orbitR = 175
  const count = pieces.length
  const angleStep = 360 / count

  return (
    <g ref={svgRef}>
      {/* Central Hub */}
      {(() => {
        const centerId = 'center-hub'
        const defaultBbox = { x: cx - CENTER_R, y: cy - CENTER_R, width: CENTER_R * 2, height: CENTER_R * 2 }
        const customPos = templateElementPositions[centerId]
        const bbox = {
          x: customPos ? customPos.x : defaultBbox.x,
          y: customPos ? customPos.y : defaultBbox.y,
          width: customPos?.width || defaultBbox.width,
          height: customPos?.height || defaultBbox.height,
        }
        const isSelected = selectedIds.has(centerId)

        return (
          <g
            key={centerId}
            data-element-id={centerId}
            onMouseDown={e => startDrag(e, centerId, bbox)}
            transform={getTransform(centerId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + bbox.height / 2} r={bbox.width / 2} fill="#1a1a2e" />
            <text x={bbox.x + bbox.width / 2} y={bbox.y + bbox.height / 2 + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
              CORE
            </text>
            {isSelected && renderHandles(bbox, centerId)}
          </g>
        )
      })()}

      {pieces.map((piece, index) => {
        const angle = index * angleStep - 90
        const rad = (angle * Math.PI) / 180
        const cardCx = cx + orbitR * Math.cos(rad)
        const cardCy = cy + orbitR * Math.sin(rad)
        const defaultRect = { x: cardCx - CARD_W / 2, y: cardCy - CARD_H / 2, width: CARD_W, height: CARD_H }

        const elementId = `piece-${index}`
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const defaultColor = piece.color || PALETTE[index % PALETTE.length]!
        const color = tplColors[elementId] ?? defaultColor
        const strokeColor = tplStrokeColors[elementId] || (selectedIds.has(elementId) ? '#4a90d9' : color)
        const strokeWidth = tplStrokeWidths[elementId] ?? (selectedIds.has(elementId) ? 2.5 : 1.5)
        const isSelected = selectedIds.has(elementId)
        const IconComponent = piece.icon ? TEMPLATE_ICONS[piece.icon] : undefined

        const curCardCx = bbox.x + bbox.width / 2
        const curCardCy = bbox.y + bbox.height / 2
        const maxChars = Math.max(8, Math.floor((bbox.width - 20) / 8))
        const titleLines = wrapTextByWidth(piece.title, maxChars)

        return (
          <g key={elementId}>
            <line x1={cx} y1={cy} x2={curCardCx} y2={curCardCy} stroke={color} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.6} />

            <g
              data-element-id={elementId}
              onMouseDown={e => startDrag(e, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx={bbox.x + 20} cy={bbox.y + 20} r={12} fill={color} />
              {IconComponent ? (
                <g transform={`translate(${bbox.x + 13}, ${bbox.y + 13})`}>
                  <IconComponent size={14} color="white" />
                </g>
              ) : (
                <text x={bbox.x + 20} y={bbox.y + 24} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                  {piece.number}
                </text>
              )}
              <text x={bbox.x + 40} y={bbox.y + 24} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill={color}>
                {titleLines[0] || ''}
              </text>
              {piece.subtitle && (
                <text x={bbox.x + 10} y={bbox.y + 52} fontFamily="Arial, sans-serif" fontSize={10} fill="#666">
                  {piece.subtitle.length > 18 ? piece.subtitle.slice(0, 16) + '...' : piece.subtitle}
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
