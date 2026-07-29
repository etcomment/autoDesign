import { TITLE_COLOR } from '../../lib/theme'
import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth, parseNodePercent } from '../shared/primitives'

export function BusinessTemplate({ data }: { data: BusinessData }): ReactElement {
  const W = 950
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const titleText = data.title ?? 'Business 1'
  const nodes = data.nodes ?? []

  // Standard items from template data or default Business 1 configuration
  const defaultNodes = [
    {
      percent: '30%',
      text: 'Content and description to be added here as required',
      color: '#3b71ca',
      x: 215,
      lineX: 215,
      lineY1: 180,
      lineY2: 290,
      isTop: true
    },
    {
      percent: '62%',
      text: 'Content and description to be added here as required',
      color: '#ffc107',
      x: 535,
      lineX: 535,
      lineY1: 180,
      lineY2: 290,
      isTop: true
    },
    {
      percent: '81%',
      text: 'Content and description to be added here as required',
      color: '#e91e63',
      x: 810,
      lineX: 810,
      lineY1: 180,
      lineY2: 290,
      isTop: true
    },
    {
      percent: '25%',
      text: 'Content and description to be added here as required',
      color: '#1a237e',
      x: 230,
      lineX: 135,
      lineY1: 310,
      lineY2: 360,
      isTop: false
    },
    {
      percent: '48%',
      text: 'Content and description to be added here as required',
      color: '#ff5722',
      x: 480,
      lineX: 388,
      lineY1: 310,
      lineY2: 360,
      isTop: false
    },
    {
      percent: '58%',
      text: 'Content and description to be added here as required',
      color: '#4caf50',
      x: 770,
      lineX: 677,
      lineY1: 310,
      lineY2: 360,
      isTop: false
    },
  ]

  const displayNodes = nodes.length > 0 ? nodes : defaultNodes

  return (
    <g ref={svgRef}>
      {/* Slide Title */}
      {titleText && (
        <text
          x={W / 2}
          y={48}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight={700}
          fill={TITLE_COLOR}
        >
          {titleText}
        </text>
      )}

      {/* Main Wave Mountain Graphics */}
      <g>
        <path
          d="M 62 310 C 72 260, 80 180, 100 180 C 120 180, 115 260, 128 260 C 140 260, 142 205, 160 205 C 178 205, 175 230, 192 230 C 208 230, 210 290, 230 310 Z"
          fill={tplColors['wave-0'] ?? '#272b5c'}
          opacity={0.9}
        />
        <path
          d="M 160 310 C 190 310, 210 290, 240 290 C 270 290, 272 170, 296 170 C 320 170, 325 310, 370 310 Z"
          fill={tplColors['wave-1'] ?? '#4a7ad8'}
          opacity={0.95}
        />
        <path
          d="M 310 310 C 330 260, 345 200, 365 200 C 385 200, 385 230, 400 230 C 415 230, 412 195, 432 195 C 452 195, 450 230, 470 230 C 490 230, 480 310, 560 310 Z"
          fill={tplColors['wave-2'] ?? '#ff5733'}
          opacity={0.88}
        />
        <path
          d="M 400 310 C 460 310, 490 240, 508 240 C 526 240, 520 270, 538 270 C 556 270, 560 190, 580 190 C 600 190, 605 310, 675 310 Z"
          fill={tplColors['wave-3'] ?? '#ffc400'}
          opacity={0.88}
        />
        <path
          d="M 570 310 C 610 310, 615 250, 642 250 C 670 250, 675 185, 705 185 C 735 185, 740 310, 810 310 Z"
          fill={tplColors['wave-4'] ?? '#56c596'}
          opacity={0.88}
        />
        <path
          d="M 720 310 C 735 240, 740 185, 760 185 C 780 185, 775 245, 810 245 C 845 245, 875 270, 885 310 Z"
          fill={tplColors['wave-5'] ?? '#f03a6b'}
          opacity={0.92}
        />
      </g>

      {/* Nodes Blocks */}
      {displayNodes.map((item, i) => {
        const def = defaultNodes[i % defaultNodes.length]!
        const elementId = `node-${i}`
        const isSelected = selectedIds.has(elementId)

        const parsed = parseNodePercent(item, 0.5)
        const percentVal = parsed.percentStr

        const nodeData = typeof item === 'object' && item !== null ? (item as any) : undefined
        const titleVal = nodeData?.title ?? ''
        const subtitleVal = nodeData?.subtitle ?? nodeData?.text ?? def.text
        const fullText = titleVal ? `${titleVal}\n${subtitleVal}` : subtitleVal
        
        const color = tplColors[elementId] ?? nodeData?.color ?? def.color
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'transparent')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2 : 0)

        // Dynamic positioning for extra nodes
        const isTop = def.isTop
        const boxX = (def.x - 110) + (Math.floor(i / 6) * 10)
        const boxY = (isTop ? 100 : 370) + (Math.floor(i / 6) * 10)
        const boxW = 220
        const boxH = 65

        const defaultBbox = { x: boxX, y: boxY, width: boxW, height: boxH }
        const customPos = templateElementPositions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultBbox.x,
          y: customPos ? customPos.y : defaultBbox.y,
          width: customPos?.width || defaultBbox.width,
          height: customPos?.height || defaultBbox.height,
        }

        const dynamicMaxChars = Math.max(15, Math.floor(bbox.width / 6.5))
        const textLines = wrapTextByWidth(fullText, dynamicMaxChars)

        const scaleX = bbox.width / defaultBbox.width
        const scaleY = bbox.height / defaultBbox.height

        return (
          <g key={elementId}>
            {/* Connecting Vertical Line (only for first 6 realistically) */}
            {i < 6 && (
              <line
                x1={def.lineX}
                y1={def.lineY1}
                x2={def.lineX}
                y2={def.lineY2}
                stroke="#ccc"
                strokeWidth={2}
              />
            )}

            {/* Interactive Drag & Custom Color Container */}
            <g
              onMouseDown={e => startDrag(e, elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
                fill={tplColors[`bg-${elementId}`] ?? 'transparent'}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 2' : undefined}
                rx={4}
              />
              <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
                <text
                  x={def.x}
                  y={boxY + 22}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={22}
                  fontWeight="bold"
                  fill={color}
                >
                  {percentVal}
                </text>
                <text
                  x={def.x}
                  y={boxY + 40}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill="#333"
                >
                  {textLines.map((line: string, lIdx: number) => (
                    <tspan key={lIdx} x={def.x} dy={lIdx === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

    </g>
  )
}
