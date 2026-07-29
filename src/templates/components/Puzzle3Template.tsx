import { useRef, type ReactElement } from 'react'
import type { PuzzleData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE, TITLE_COLOR } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#e91e63', '#4caf50', '#ff9800']
const CELL_W = 180
const CELL_H = 100
const TAB_W = 50
const TAB_D = 20

function piecePathV(
  x: number,
  y: number,
  opts: { bottomTab?: boolean; topIndent?: boolean },
): string {
  const r = x + CELL_W
  const b = y + CELL_H
  const mid = x + CELL_W / 2
  const ls = mid - TAB_W / 2
  const le = mid + TAB_W / 2

  let d = 'M ' + x + ' ' + y + ' L ' + r + ' ' + y + ' L ' + r + ' ' + b
  if (opts.bottomTab) {
    d += ' L ' + le + ' ' + b + ' C ' + le + ' ' + (b + TAB_D) + ' ' + ls + ' ' + (b + TAB_D) + ' ' + ls + ' ' + b + ' L ' + x + ' ' + b
  } else {
    d += ' L ' + x + ' ' + b
  }
  if (opts.topIndent) {
    d += ' L ' + x + ' ' + y + ' L ' + ls + ' ' + y + ' C ' + ls + ' ' + (y - TAB_D) + ' ' + le + ' ' + (y - TAB_D) + ' ' + le + ' ' + y
  }
  d += ' Z'
  return d
}

function getTabsForPiece(i: number, total: number) {
  return {
    bottomTab: i < total - 1,
    topIndent: i > 0,
  }
}

export function Puzzle3Template({ data }: { data: PuzzleData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, pieces } = data
  const W = 500
  const totalH = pieces.length * CELL_H
  const H = Math.max(600, totalH + 120)
  const startX = (W - CELL_W) / 2
  const startY = (H - totalH) / 2 + (title ? 20 : 0)

  return (
    <g ref={svgRef}>
      {title && (
        <text x={W / 2} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill={TITLE_COLOR}>
          {title}
        </text>
      )}

      {pieces.map((piece, i) => {
        const tabs = getTabsForPiece(i, pieces.length)
        const px = startX
        const py = startY + i * CELL_H
        const cx = px + CELL_W / 2
        const cy = py + CELL_H / 2
        const path = piecePathV(px, py, tabs)
        const defaultColor = piece.color || PALETTE[i % PALETTE.length]!
        const elementId = `piece-${i}`
        const color = tplColors[elementId] ?? defaultColor
        const stroke = tplStrokeColors[elementId] || 'white'
        const isSelected = selectedIds.has(elementId)
        const defaultRect = { x: px, y: py, width: CELL_W, height: CELL_H }
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        const dx = visualRect.x - defaultRect.x
        const dy = visualRect.y - defaultRect.y
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                <path d={path} fill={color} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3.5 : 3} strokeLinejoin="round" />
                <circle cx={px + 30} cy={cy} r={14} fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
                <text x={px + 30} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="white">
                  {piece.number}
                </text>
                <text x={cx + 18} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="white">
                  {piece.title}
                </text>
                {piece.subtitle && (
                  <text x={cx + 18} y={cy + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.85)">
                    {piece.subtitle}
                  </text>
                )}
              </g>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
