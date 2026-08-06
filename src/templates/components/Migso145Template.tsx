import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 556,
    "y": 493,
    "width": 168,
    "height": 168,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 L 158 0 Q 168 0 168 10 L 168 158 Q 168 168 158 168 L 10 168 Q 0 168 0 158 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 270,
    "y": 493,
    "width": 168,
    "height": 168,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 158 0 Q 168 0 168 10 L 168 158 Q 168 168 158 168 L 10 168 Q 0 168 0 158 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 842,
    "y": 493,
    "width": 168,
    "height": 168,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 10 0 L 158 0 Q 168 0 168 10 L 168 158 Q 168 168 158 168 L 10 168 Q 0 168 0 158 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 128,
    "y": 140,
    "width": 168,
    "height": 168,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 10 0 L 158 0 Q 168 0 168 10 L 168 158 Q 168 168 158 168 L 10 168 Q 0 168 0 158 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 414,
    "y": 140,
    "width": 168,
    "height": 168,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 158 0 Q 168 0 168 10 L 168 158 Q 168 168 158 168 L 10 168 Q 0 168 0 158 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 700,
    "y": 140,
    "width": 168,
    "height": 168,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 158 0 Q 168 0 168 10 L 168 158 Q 168 168 158 168 L 10 168 Q 0 168 0 158 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 986,
    "y": 140,
    "width": 168,
    "height": 168,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 158 0 Q 168 0 168 10 L 168 158 Q 168 168 158 168 L 10 168 Q 0 168 0 158 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "x": 2,
    "y": 401,
    "width": 1278,
    "height": 10,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 640,
    "y": 399,
    "width": 10,
    "height": 93,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 355,
    "y": 399,
    "width": 10,
    "height": 93,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 927,
    "y": 399,
    "width": 10,
    "height": 93,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 213,
    "y": 308,
    "width": 10,
    "height": 91,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 498,
    "y": 308,
    "width": 10,
    "height": 91,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 783,
    "y": 308,
    "width": 10,
    "height": 91,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1070,
    "y": 308,
    "width": 10,
    "height": 91,
    "strokeColor": "#ffffff",
    "text": ""
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 203,
    "y": 393,
    "width": 19,
    "height": 19,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 346,
    "y": 393,
    "width": 19,
    "height": 19,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 489,
    "y": 393,
    "width": 19,
    "height": 19,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 631,
    "y": 393,
    "width": 19,
    "height": 19,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 774,
    "y": 393,
    "width": 19,
    "height": 19,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 917,
    "y": 393,
    "width": 19,
    "height": 19,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 1060,
    "y": 393,
    "width": 19,
    "height": 19,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 0,
    "x": 153,
    "y": 157,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 0,
    "x": 137,
    "y": 193,
    "width": 152,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 1,
    "x": 439,
    "y": 157,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 1,
    "x": 422,
    "y": 193,
    "width": 152,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 2,
    "x": 724,
    "y": 157,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 2,
    "x": 708,
    "y": 193,
    "width": 152,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 3,
    "x": 1011,
    "y": 157,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 3,
    "x": 994,
    "y": 193,
    "width": 152,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 4,
    "x": 295,
    "y": 511,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 4,
    "x": 279,
    "y": 547,
    "width": 152,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 5,
    "x": 581,
    "y": 511,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 5,
    "x": 564,
    "y": 547,
    "width": 152,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 6,
    "x": 867,
    "y": 511,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 6,
    "x": 851,
    "y": 547,
    "width": 152,
    "height": 99,
    "text": "MIGSO-PCUBED content and words to be added here as required"
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

export function Migso145Template({ data }: { data: BrainData }): ReactElement {
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
