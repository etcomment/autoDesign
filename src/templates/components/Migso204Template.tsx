import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 122,
    "y": 138,
    "width": 1069,
    "height": 523,
    "fillColor": "#f0f0f0",
    "text": ""
  },
  {
    "id": "sp-1",
    "x": 782,
    "y": 158,
    "width": 221,
    "height": 482,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 0 L 166 0 L 221 241 L 166 482 L 0 482 L 55 241 Z"
  },
  {
    "id": "sp-2",
    "x": 288,
    "y": 374,
    "width": 629,
    "height": 50,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 13 L 377 13 L 377 0 L 629 25 L 377 50 L 377 38 L 0 38 Z"
  },
  {
    "id": "sp-3",
    "x": 1031,
    "y": 368,
    "width": 121,
    "height": 61,
    "text": "Efficiency & Agility"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 621,
    "y": 158,
    "width": 274,
    "height": 208,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 55 0 L 274 0 L 219 208 L 0 208 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 467,
    "y": 158,
    "width": 274,
    "height": 208,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 55 0 L 274 0 L 219 208 L 0 208 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 313,
    "y": 158,
    "width": 274,
    "height": 208,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 55 0 L 274 0 L 219 208 L 0 208 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 160,
    "y": 158,
    "width": 274,
    "height": 208,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 55 0 L 274 0 L 219 208 L 0 208 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 267,
    "y": 430,
    "width": 629,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 126 0 L 629 0 L 503 36 L 0 36 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 240,
    "y": 474,
    "width": 629,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 126 0 L 629 0 L 503 36 L 0 36 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 213,
    "y": 517,
    "width": 629,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 126 0 L 629 0 L 503 36 L 0 36 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 186,
    "y": 561,
    "width": 629,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 126 0 L 629 0 L 503 36 L 0 36 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 159,
    "y": 604,
    "width": 629,
    "height": 36,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 126 0 L 629 0 L 503 36 L 0 36 Z"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 476,
    "y": 381,
    "width": 253,
    "height": 36,
    "text": "Reference architecture"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 317,
    "y": 434,
    "width": 255,
    "height": 29,
    "text": "Governance risk & compliance"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 0,
    "x": 290,
    "y": 477,
    "width": 164,
    "height": 29,
    "text": "Sourcing & vendor"
  },
  {
    "id": "sp-16",
    "x": 263,
    "y": 520,
    "width": 200,
    "height": 29,
    "text": "Intelligence & reporting"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 2,
    "x": 240,
    "y": 564,
    "width": 151,
    "height": 29,
    "text": "Finance & assets"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 1,
    "x": 210,
    "y": 608,
    "width": 167,
    "height": 29,
    "text": "Resource & project"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 0,
    "x": 323,
    "y": 328,
    "width": 54,
    "height": 29,
    "text": "Plan"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 473,
    "y": 328,
    "width": 60,
    "height": 29,
    "text": "Build"
  },
  {
    "id": "sp-21",
    "x": 620,
    "y": 328,
    "width": 73,
    "height": 29,
    "text": "Deliver"
  },
  {
    "id": "sp-22",
    "x": 785,
    "y": 328,
    "width": 51,
    "height": 29,
    "text": "Run"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 208,
    "y": 218,
    "width": 156,
    "height": 48,
    "text": "Strategy to portfolio"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 360,
    "y": 218,
    "width": 156,
    "height": 48,
    "text": "Requirement to deploy"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 0,
    "x": 515,
    "y": 227,
    "width": 156,
    "height": 29,
    "text": "Request to fulfill"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 1,
    "x": 669,
    "y": 227,
    "width": 156,
    "height": 29,
    "text": "Detect to correct"
  },
  {
    "id": "sp-27",
    "x": 141,
    "y": 261,
    "width": 128,
    "height": 29,
    "text": "Value streams"
  },
  {
    "id": "sp-28",
    "x": 115,
    "y": 507,
    "width": 179,
    "height": 29,
    "text": "Supporting activities"
  }
]

const DEFAULT_COLORS = ["#282a5d","#3365cc","#ff4d38","#ffb900","#52c49c","#ee6d90"]

function wrapText(text: string, maxCharsPerLine: number): string[] {
  if (!text) return []
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim()
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

export function Migso204Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const branches = data?.branches && data.branches.length > 0 ? data.branches : []

  const renderShape = (shapeDef: any, parentBbox: any) => {
    const id = shapeDef.id
    const isRoot = parentBbox === null
    
    let bbox = { x: shapeDef.x, y: shapeDef.y, width: shapeDef.width || shapeDef.w, height: shapeDef.height || shapeDef.h }
    
    if (isRoot) {
      const pos = positions[id]
      bbox = {
        x: pos?.x ?? bbox.x,
        y: pos?.y ?? bbox.y,
        width: pos?.width ?? bbox.width,
        height: pos?.height ?? bbox.height,
      }
    } else if (parentBbox && shapeDef.localPctX !== undefined) {
      bbox = {
        x: parentBbox.x + shapeDef.localPctX * parentBbox.width,
        y: parentBbox.y + shapeDef.localPctY * parentBbox.height,
        width: Math.max(1, shapeDef.localPctW * parentBbox.width),
        height: Math.max(1, shapeDef.localPctH * parentBbox.height),
      }
    }

    const isSelected = selectedIds.has(id)
    
    const branch = (shapeDef.dataNodeIdx !== undefined && shapeDef.dataNodeIdx !== -1 && shapeDef.dataNodeIdx < branches.length) 
      ? branches[shapeDef.dataNodeIdx] 
      : null

    let finalColor = shapeDef.fillColor
    let finalStroke = shapeDef.strokeColor
    if (shapeDef.isColorNode && branch) {
      const branchColor = branch.color || DEFAULT_COLORS[shapeDef.dataNodeIdx % DEFAULT_COLORS.length]
      if (finalColor && finalColor.toLowerCase() !== '#ffffff' && finalColor.toLowerCase() !== '#000000') {
        finalColor = branchColor
      }
      if (finalStroke && finalStroke.toLowerCase() !== '#ffffff' && finalStroke.toLowerCase() !== '#000000') {
        finalStroke = branchColor
      }
    }
    
    finalColor = tplColors[id] ?? finalColor

    let finalText = shapeDef.text
    if (shapeDef.isTitle && branch?.title) {
      finalText = branch.title
    }
    if (shapeDef.isSubtitle && branch?.subtitle) {
      finalText = branch.subtitle
    }

    if (shapeDef.isGroup) {
      return (
        <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
          {shapeDef.children?.map((child: any) => renderShape(child, bbox))}
          {isRoot && isSelected && renderHandles(bbox, id)}
        </g>
      )
    }

    const titleLines = finalText ? wrapText(finalText, Math.max(10, Math.floor(bbox.width / 6))) : []

    return (
      <g key={id} onMouseDown={isRoot ? (e => startDrag(e, id, bbox)) : undefined} transform={isRoot ? getTransform(id, bbox) : undefined} style={{ cursor: isRoot ? 'pointer' : 'default' }}>
        {shapeDef.pathD ? (
          <path
            d={shapeDef.pathD}
            transform={`translate(${bbox.x}, ${bbox.y}) scale(${bbox.width / Math.max(1, shapeDef.width || shapeDef.w)}, ${bbox.height / Math.max(1, shapeDef.height || shapeDef.h)})`}
            fill={finalColor || 'transparent'}
            opacity={isSelected && isRoot ? 0.88 : 1}
            stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
            strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
          />
        ) : (
          (finalColor || finalStroke) && (
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              rx={8}
              fill={finalColor || 'transparent'}
              opacity={isSelected && isRoot ? 0.88 : 1}
              stroke={isSelected && isRoot ? '#4a90d9' : (finalStroke || 'transparent')}
              strokeWidth={isSelected && isRoot ? 2.5 : (finalStroke ? 1.5 : 0)}
            />
          )
        )}

        {titleLines.length > 0 && (
          <text
            x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
            y={bbox.y + (shapeDef.pathD || finalColor ? 20 : 10)}
            fontFamily="Arial, sans-serif"
            fontSize={shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12)}
            fontWeight={shapeDef.isTitle ? 700 : 400}
            fill={shapeDef.isTitle ? '#111827' : '#4b5563'}
          >
            {titleLines.map((line: string, lIdx: number) => (
              <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : (shapeDef.isTitle ? 18 : 14)}>
                {line}
              </tspan>
            ))}
          </text>
        )}

        {isRoot && isSelected && renderHandles(bbox, id)}
      </g>
    )
  }

  return (
    <g ref={svgRef}>
      {PPTX_EXTRACTED_SHAPES.map((shapeDef) => renderShape(shapeDef, null))}
    </g>
  )
}
