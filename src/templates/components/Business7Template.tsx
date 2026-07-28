import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

const DEFAULT_COLORS = ['#27295c', '#2962ff', '#ff4d30', '#ffc107']

export function Business7Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes = [] } = data
  const W = 900

  const totalWidth = 800
  const startX = (W - totalWidth) / 2
  
  const iconRadius = 38
  const iconY = 160
  const cardTopY = 200
  const cardH = 340
  const notchDepth = 35

  const defaultTitles = ['Your title 01', 'Your title 02', 'Your title 03', 'Your title 04']
  const defaultDesc = 'Content and description to be added here as required'

  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 4 })
  const count = displayNodes.length
  
  // Calculate width per column, but if count is huge it might overflow.
  // Using generic scaling per element
  const columnGap = 16
  const colW = count > 1 ? (totalWidth - (count - 1) * columnGap) / count : totalWidth

  return (
    <g ref={svgRef}>
      {title && (
        <text
          x={W / 2}
          y={48}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight={700}
          fill="#1e3a5f"
        >
          {title}
        </text>
      )}

      {displayNodes.map((item, i) => {
        const elementId = `node-${i}`
        const nodeData = typeof item === 'object' && item !== null ? (item as any) : {}
        const x = startX + i * (colW + columnGap)
        const mainColor = tplColors[elementId] ?? nodeData.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeW = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)

        const colTitle = nodeData.title || nodeData.percent || nodeData.value || defaultTitles[i % defaultTitles.length]!
        const colDesc = nodeData.subtitle || nodeData.text || defaultDesc

        const defaultRect = { x, y: iconY - iconRadius, width: colW, height: cardTopY + cardH - (iconY - iconRadius) }
        
        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height

        const grayChevronPath = `
          M ${x} ${cardTopY + notchDepth}
          L ${x + colW / 2} ${cardTopY}
          L ${x + colW} ${cardTopY + notchDepth}
          L ${x + colW} ${cardTopY + notchDepth + 20}
          L ${x + colW / 2} ${cardTopY + 20}
          L ${x} ${cardTopY + notchDepth + 20}
          Z
        `

        const bodyPath = `
          M ${x} ${cardTopY + notchDepth + 18}
          L ${x + colW / 2} ${cardTopY + 18}
          L ${x + colW} ${cardTopY + notchDepth + 18}
          L ${x + colW} ${cardTopY + cardH}
          L ${x} ${cardTopY + cardH}
          Z
        `

        const titleLines = colTitle.split('\n').filter(Boolean)
        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7))
        const descLines = wrapTextByWidth(colDesc, dynamicMaxChars)

        return (
          <g key={i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                <path d={grayChevronPath} fill="#afb4b9" />

                <path
                  d={bodyPath}
                  fill={mainColor}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />

                <circle cx={x + colW / 2} cy={iconY} r={iconRadius} fill={mainColor} stroke="#ffffff" strokeWidth={3} />

                <g transform={`translate(${x + colW / 2 - 16}, ${iconY - 16})`} stroke="#ffffff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {i % 4 === 0 && <path d="M4 22h24L28 10l-6 6-6-10-6 10-6-6z" />}
                  {i % 4 === 1 && (
                    <>
                      <rect x="5" y="4" width="22" height="24" rx="2" />
                      <line x1="9" y1="10" x2="23" y2="10" />
                      <line x1="9" y1="15" x2="23" y2="15" />
                      <line x1="9" y1="20" x2="17" y2="20" />
                    </>
                  )}
                  {i % 4 === 2 && (
                    <>
                      <circle cx="16" cy="16" r="8" />
                      <path d="M16 2v4M16 26v4M2 16h4M26 16h4" />
                    </>
                  )}
                  {i % 4 === 3 && (
                    <>
                      <rect x="5" y="10" width="22" height="17" rx="2" />
                      <path d="M11 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                      <line x1="5" y1="17" x2="27" y2="17" />
                    </>
                  )}
                </g>

                <text
                  x={x + 18}
                  y={cardTopY + notchDepth + 70}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={18}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {titleLines.map((l: string, lIdx: number) => <tspan key={lIdx} x={x + 18} dy={lIdx === 0 ? 0 : 20}>{l}</tspan>)}
                </text>

                <text
                  x={x + 18}
                  y={cardTopY + notchDepth + 70 + titleLines.length * 20}
                  textAnchor="start"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#ffffff"
                  opacity={0.9}
                >
                  {descLines.map((l: string, lIdx: number) => <tspan key={lIdx} x={x + 18} dy={lIdx === 0 ? 0 : 18}>{l}</tspan>)}
                </text>
              </g>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
