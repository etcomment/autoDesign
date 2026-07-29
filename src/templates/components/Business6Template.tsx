import { TITLE_COLOR } from '../../lib/theme'
import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'

const DEFAULT_COLORS = ['#242254', '#2b60d3', '#ff472e', '#ffc000', '#48be93', '#90052d']

const DEFAULT_TITLES = ['Your title 01', 'Your title 02', 'Your title 03', 'Your title 04', 'Your title 05', 'Your title 06']

export function Business6Template({ data }: { data: BusinessData }): ReactElement {
  const W = 900
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const { title, nodes = [] } = data

  const startX = 100
  const shapeW = 112
  const overlap = 15
  const stepX = shapeW - overlap
  const centerY = 310

  const heights = [
    { hLeft: 170, hRight: 210 },
    { hLeft: 210, hRight: 250 },
    { hLeft: 250, hRight: 210 },
    { hLeft: 210, hRight: 250 },
    { hLeft: 250, hRight: 210 },
    { hLeft: 210, hRight: 170 },
  ]

  const textPositions = [
    { isTop: true, textX: startX + 45, lineX: startX + shapeW, lineY1: 175, lineY2: centerY - 210 / 2 },
    { isTop: true, textX: startX + stepX + 35, lineX: startX + stepX + shapeW, lineY1: 145, lineY2: centerY - 210 / 2 },
    { isTop: false, textX: startX + stepX * 2 + 25, lineX: startX + stepX * 2 + 60, lineY1: centerY + 250 / 2 - 20, lineY2: 450 },
    { isTop: true, textX: startX + stepX * 3 + 35, lineX: startX + stepX * 3 + shapeW, lineY1: 145, lineY2: centerY - 210 / 2 },
    { isTop: false, textX: startX + stepX * 4 + 25, lineX: startX + stepX * 4 + 60, lineY1: centerY + 250 / 2 - 20, lineY2: 450 },
    { isTop: true, textX: startX + stepX * 5 + 35, lineX: startX + stepX * 5 + shapeW, lineY1: 175, lineY2: centerY - 210 / 2 },
  ]

  const defaultText = 'Content and description to be added here as required'
  const displayNodes = nodes.length > 0 ? nodes : Array.from({ length: 6 })

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
          fill={TITLE_COLOR}
        >
          {title}
        </text>
      )}

      {displayNodes.map((item, i) => {
        const nodeData = typeof item === 'object' && item !== null ? (item as any) : {}
        const elementId = `node-${i}`
        
        const xLeft = startX + i * stepX
        const xRight = xLeft + shapeW
        const h = heights[i % heights.length]!
        const yLTop = centerY - h.hLeft / 2
        const yLBot = centerY + h.hLeft / 2
        const yRTop = centerY - h.hRight / 2
        const yRBot = centerY + h.hRight / 2

        const mainColor = tplColors[elementId] ?? nodeData.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeW = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 0)

        const blockTitle = nodeData.title || nodeData.percent || nodeData.value || DEFAULT_TITLES[i % DEFAULT_TITLES.length]
        const blockDesc = nodeData.subtitle || nodeData.text || defaultText

        const polygonPath = `M ${xLeft} ${yLTop} L ${xRight} ${yRTop} L ${xRight} ${yRBot} L ${xLeft} ${yLBot} Z`
        const defaultRect = {
          x: xLeft,
          y: Math.min(yLTop, yRTop),
          width: shapeW,
          height: Math.max(h.hLeft, h.hRight),
        }

        const customPos = templateElementPositions[elementId]
        const visualRect = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }
        
        const scaleX = visualRect.width / defaultRect.width
        const scaleY = visualRect.height / defaultRect.height

        const tPos = textPositions[i % textPositions.length]!
        const iconCx = xLeft + shapeW / 2
        const iconCy = centerY

        const dynamicMaxChars = Math.max(15, Math.floor(visualRect.width / 7))
        const descLines = wrapTextByWidth(blockDesc, dynamicMaxChars)
        const titleLines = blockTitle.split('\n').filter(Boolean)

        return (
          <g key={i}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <g transform={`translate(${visualRect.x}, ${visualRect.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultRect.x}, ${-defaultRect.y})`}>
                {i === 0 && <line x1={xLeft + shapeW} y1={175} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}
                {i === 1 && <line x1={xLeft + shapeW} y1={145} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}
                {i === 2 && <line x1={xLeft + 60} y1={yLBot} x2={xLeft + 60} y2={450} stroke="#cccccc" strokeWidth={2} />}
                {i === 3 && <line x1={xLeft + shapeW} y1={145} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}
                {i === 4 && <line x1={xLeft + 60} y1={yLBot} x2={xLeft + 60} y2={450} stroke="#cccccc" strokeWidth={2} />}
                {i === 5 && <line x1={xLeft + shapeW} y1={175} x2={xLeft + shapeW} y2={yRTop} stroke="#cccccc" strokeWidth={2} />}

                {tPos.isTop ? (
                  <g>
                    <text
                      x={tPos.textX}
                      y={130}
                      textAnchor="end"
                      fontFamily="Arial, sans-serif"
                      fontSize={18}
                      fontWeight={700}
                      fill={mainColor}
                    >
                      {titleLines.map((l: string, lIdx: number) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 20}>{l}</tspan>)}
                    </text>
                    <text
                      x={tPos.textX}
                      y={130 + titleLines.length * 20}
                      textAnchor="end"
                      fontFamily="Arial, sans-serif"
                      fontSize={11}
                      fill="#444444"
                    >
                      {descLines.map((l: string, lIdx: number) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 15}>{l}</tspan>)}
                    </text>
                  </g>
                ) : (
                  <g>
                    <text
                      x={tPos.textX}
                      y={475}
                      textAnchor="start"
                      fontFamily="Arial, sans-serif"
                      fontSize={18}
                      fontWeight={700}
                      fill={mainColor}
                    >
                      {titleLines.map((l: string, lIdx: number) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 20}>{l}</tspan>)}
                    </text>
                    <text
                      x={tPos.textX}
                      y={475 + titleLines.length * 20}
                      textAnchor="start"
                      fontFamily="Arial, sans-serif"
                      fontSize={11}
                      fill="#444444"
                    >
                      {descLines.map((l: string, lIdx: number) => <tspan key={lIdx} x={tPos.textX} dy={lIdx === 0 ? 0 : 15}>{l}</tspan>)}
                    </text>
                  </g>
                )}

                <path
                  d={polygonPath}
                  fill={mainColor}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeDasharray={isSelected ? '4 2' : undefined}
                />

                <g transform={`translate(${iconCx - 24}, ${iconCy - 24})`} stroke="#ffffff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {i % 6 === 0 && (
                    <>
                      <circle cx="16" cy="16" r="6" strokeDasharray="2 2" />
                      <path d="M7 26a6 6 0 0 1 12 0H7z" />
                      <path d="M12 20a4 4 0 0 1 8 0" />
                      <path d="M22 10l2-2M26 16h3M22 22l2 2M16 6V3" />
                    </>
                  )}
                  {i % 6 === 1 && (
                    <>
                      <path d="M4 8a2 2 0 0 1 2-2h8l3 3h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
                      <circle cx="20" cy="20" r="3" />
                      <path d="M20 15v2M20 23v2M15 20h2M23 20h2" />
                    </>
                  )}
                  {i % 6 === 2 && (
                    <>
                      <circle cx="24" cy="24" r="14" />
                      <circle cx="24" cy="24" r="6" />
                      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" />
                    </>
                  )}
                  {i % 6 === 3 && (
                    <>
                      <circle cx="24" cy="24" r="10" />
                      <polyline points="24 18 24 24 28 24" />
                      <path d="M18 6h12l2 8H16l2-8zM18 42h12l2-8H16l2 8z" />
                    </>
                  )}
                  {i % 6 === 4 && (
                    <>
                      <path d="M10 12h28l-3 26H13L10 12z" />
                      <path d="M8 12h32M18 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
                      <line x1="18" y1="18" x2="18" y2="32" />
                      <line x1="24" y1="18" x2="24" y2="32" />
                      <line x1="30" y1="18" x2="30" y2="32" />
                    </>
                  )}
                  {i % 6 === 5 && (
                    <>
                      <rect x="6" y="8" width="28" height="32" rx="4" />
                      <circle cx="22" cy="20" r="4" />
                      <path d="M22 24v10a2 2 0 0 0 4 0v-4" />
                    </>
                  )}
                </g>
              </g>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
