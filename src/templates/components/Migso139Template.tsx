import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 678,
    "y": 108,
    "width": 371,
    "height": 77,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 0 19 L 223 19 L 223 0 L 371 39 L 223 77 L 223 58 L 0 58 Z"
  },
  {
    "id": "sp-1",
    "x": 467,
    "y": 130,
    "width": 233,
    "height": 151,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 43 0 C 31 0, 20 5, 13 13 C 5 20, 0 31, 0 43 L 0 108 C 0 120, 5 131, 13 138 C 20 146, 31 151, 43 151 L 233 151 L 233 118 L 41 118 C 41 118, 40 118, 39 117 C 38 116, 38 116, 38 115 L 38 36 C 38 36, 38 35, 39 34 C 40 33, 41 33, 41 33 L 225 33 L 225 0 L 43 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 596,
    "y": 247,
    "width": 314,
    "height": 151,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 51 0 C 37 0, 24 5, 15 13 C 6 20, 0 31, 0 43 L 0 108 C 0 120, 6 131, 15 138 C 24 146, 37 151, 51 151 L 314 151 L 314 118 L 49 118 C 48 118, 47 118, 46 117 C 45 116, 45 116, 45 115 L 45 36 C 45 36, 45 35, 46 34 C 47 33, 48 33, 49 33 L 187 33 L 187 0 L 51 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 673,
    "y": 225,
    "width": 153,
    "height": 77,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 0 19 L 92 19 L 92 0 L 153 39 L 92 77 L 92 58 L 0 58 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 420,
    "y": 364,
    "width": 314,
    "height": 151,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 51 0 C 37 0, 24 5, 15 13 C 6 20, 0 31, 0 43 L 0 108 C 0 120, 6 131, 15 138 C 24 146, 37 151, 51 151 L 314 151 L 314 118 L 49 118 C 48 118, 47 118, 46 117 C 45 116, 45 116, 45 115 L 45 36 C 45 36, 45 35, 46 34 C 47 33, 48 33, 49 33 L 142 33 L 142 0 L 51 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 504,
    "y": 343,
    "width": 153,
    "height": 77,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 0 19 L 92 19 L 92 0 L 153 39 L 92 77 L 92 58 L 0 58 Z"
  },
  {
    "id": "sp-6",
    "x": 596,
    "y": 482,
    "width": 288,
    "height": 151,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 46 0 C 34 0, 22 5, 14 13 C 5 20, 0 31, 0 43 L 0 108 C 0 120, 5 131, 14 138 C 22 146, 34 151, 46 151 L 288 151 L 288 118 L 45 118 C 44 118, 43 118, 42 117 C 41 116, 41 116, 41 115 L 41 36 C 41 36, 41 35, 42 34 C 43 33, 44 33, 45 33 L 175 33 L 175 0 L 46 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 673,
    "y": 460,
    "width": 153,
    "height": 77,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 0 19 L 92 19 L 92 0 L 153 39 L 92 77 L 92 58 L 0 58 Z"
  },
  {
    "id": "sp-8",
    "x": 204,
    "y": 578,
    "width": 452,
    "height": 77,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 0 19 L 271 19 L 271 0 L 452 39 L 271 77 L 271 58 L 0 58 Z"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 7,
    "x": 492,
    "y": 598,
    "width": 114,
    "height": 36,
    "text": "Step One"
  },
  {
    "id": "sp-10",
    "x": 475,
    "y": 364,
    "width": 131,
    "height": 36,
    "text": "Step Three"
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 5,
    "x": 723,
    "y": 481,
    "width": 114,
    "height": 36,
    "text": "Step Two"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 723,
    "y": 246,
    "width": 120,
    "height": 36,
    "text": "Step Four"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 885,
    "y": 127,
    "width": 115,
    "height": 36,
    "text": "Step Five"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 6,
    "x": 886,
    "y": 487,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 3,
    "x": 886,
    "y": 526,
    "width": 288,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 3,
    "x": 927,
    "y": 254,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 1,
    "x": 927,
    "y": 292,
    "width": 288,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 4,
    "x": 272,
    "y": 367,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 2,
    "x": 113,
    "y": 405,
    "width": 288,
    "height": 52,
    "text": "MIGSO-PCUBED content and words to be added here as required"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 0,
    "x": 321,
    "y": 130,
    "width": 119,
    "height": 36,
    "text": "Milestone"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 0,
    "x": 162,
    "y": 169,
    "width": 288,
    "height": 52,
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

export function Migso139Template({ data }: { data: BrainData }): ReactElement {
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
