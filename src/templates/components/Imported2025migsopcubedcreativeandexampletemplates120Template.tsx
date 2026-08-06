import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 466,
    "y": 213,
    "width": 345,
    "height": 345,
    "fillColor": "#ffffff",
    "pathD": "M 173 345 L 173 345 C 268 345, 345 268, 345 172 L 345 172 C 345 77, 268 0, 172 0 L 172 0 C 77 0, 0 77, 0 173 L 0 173 C 0 268, 77 345, 173 345"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 639,
    "y": 188,
    "width": 197,
    "height": 394,
    "fillColor": "#ee6d90",
    "pathD": "M 0 160 C 21 160, 37 176, 37 197 C 37 217, 21 234, 0 234 Z M 0 80 C 64 80, 117 133, 117 197 C 117 261, 64 314, 0 314 L 0 269 C 40 269, 72 237, 72 197 C 72 157, 40 125, 0 125 Z M 0 0 C 109 0, 197 88, 197 197 C 197 305, 109 394, 0 394 L 0 349 C 84 349, 152 281, 152 197 C 152 113, 84 45, 0 45 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 442,
    "y": 188,
    "width": 197,
    "height": 394,
    "fillColor": "#ee6d90",
    "pathD": "M 197 160 L 197 234 C 176 234, 160 217, 160 197 C 160 177, 176 160, 197 160 Z M 197 80 L 197 125 C 157 125, 125 157, 125 197 C 125 237, 157 269, 197 269 L 197 314 C 133 314, 80 261, 80 197 C 80 133, 132 81, 197 80 Z M 197 0 L 197 45 C 113 45, 45 113, 45 197 C 45 281, 113 349, 197 349 L 197 394 C 88 394, 0 306, 0 197 C 0 88, 88 0, 197 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 605,
    "y": 107,
    "width": 68,
    "height": 74,
    "fillColor": "#3365cc",
    "pathD": "M 35 74 L 35 74 C 33 74, 29 72, 27 69 L 6 46 L 6 46 C 3 43, 1 37, 1 34 L 0 5 L 0 5 C 0 1, 3 1, 7 3 L 27 17 L 27 17 C 31 19, 37 19, 41 17 L 61 2 L 61 2 C 64 0, 67 1, 67 4 L 68 33 L 68 33 C 68 37, 66 42, 63 45 L 43 68 L 43 68 C 41 71, 37 74, 35 74"
  },
  {
    "id": "sp-4",
    "x": 633,
    "y": 121,
    "width": 11,
    "height": 246,
    "fillColor": "#ffffff",
    "pathD": "M 0 8 L 0 8 C 0 3, 2 0, 5 0 L 5 0 C 9 0, 11 3, 11 8 L 11 238 L 11 238 C 11 243, 9 246, 5 246 L 5 246 C 2 246, 0 243, 0 238 L 0 8"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 366,
    "y": 267,
    "width": 80,
    "height": 75,
    "fillColor": "#ee6d90",
    "pathD": "M 79 53 L 79 53 C 79 55, 75 58, 72 60 L 43 73 L 43 73 C 40 74, 34 75, 31 74 L 3 66 L 3 66 C 0 65, 0 62, 4 59 L 23 43 L 23 43 C 26 40, 28 35, 27 30 L 20 7 L 20 7 C 19 3, 20 0, 24 1 L 51 9 L 51 9 C 54 10, 59 14, 61 17 L 77 44 L 77 44 C 79 47, 80 51, 79 53"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 2,
    "x": 387,
    "y": 299,
    "width": 236,
    "height": 85,
    "fillColor": "#ffffff",
    "pathD": "M 7 12 L 7 12 C 3 11, 0 7, 1 4 L 1 4 C 2 1, 6 0, 10 1 L 229 73 L 229 73 C 233 74, 236 78, 235 81 L 235 81 C 234 84, 230 85, 226 84 L 7 12"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 449,
    "y": 548,
    "width": 77,
    "height": 80,
    "fillColor": "#ffb900",
    "pathD": "M 69 1 L 69 1 C 71 2, 72 7, 73 11 L 77 41 L 77 41 C 77 45, 76 51, 74 54 L 57 77 L 57 77 C 55 80, 52 79, 51 75 L 42 52 L 42 52 C 40 47, 35 44, 31 44 L 6 43 L 6 43 C 2 43, 0 41, 2 38 L 18 15 L 18 15 C 20 12, 25 9, 29 8 L 59 1 L 59 1 C 63 0, 67 0, 69 1"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 482,
    "y": 397,
    "width": 150,
    "height": 203,
    "fillColor": "#ffffff",
    "pathD": "M 12 198 L 12 198 C 9 202, 5 203, 3 201 L 3 201 C 0 199, 0 195, 3 192 L 138 5 L 138 5 C 141 1, 145 0, 147 2 L 147 2 C 150 4, 150 8, 147 11 L 12 198"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 752,
    "y": 549,
    "width": 77,
    "height": 79,
    "fillColor": "#52c49c",
    "pathD": "M 6 1 L 6 1 C 8 0, 12 0, 16 1 L 47 7 L 47 7 C 51 8, 56 11, 58 13 L 75 36 L 75 36 C 77 39, 75 41, 71 41 L 46 43 L 46 43 C 42 43, 37 46, 35 51 L 27 74 L 27 74 C 26 78, 23 79, 21 76 L 4 54 L 4 54 C 1 51, 0 45, 0 41 L 3 11 L 3 11 C 3 7, 5 3, 6 1"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 647,
    "y": 396,
    "width": 150,
    "height": 203,
    "fillColor": "#ffffff",
    "pathD": "M 147 191 L 147 191 C 150 195, 150 199, 147 201 L 147 201 C 145 203, 141 202, 138 198 L 3 11 L 3 11 C 0 8, 0 4, 3 2 L 3 2 C 5 0, 9 1, 12 5 L 147 191"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 833,
    "y": 266,
    "width": 80,
    "height": 76,
    "fillColor": "#ff4d38",
    "pathD": "M 1 56 L 1 56 C 0 54, 1 50, 3 46 L 18 19 L 18 19 C 20 16, 25 12, 28 11 L 55 1 L 55 1 C 58 0, 60 3, 59 7 L 52 31 L 52 31 C 51 35, 53 41, 57 44 L 76 58 L 76 58 C 80 61, 80 64, 77 65 L 50 75 L 50 75 C 46 76, 41 76, 37 74 L 8 62 L 8 62 C 5 61, 1 58, 1 56"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 3,
    "x": 654,
    "y": 299,
    "width": 236,
    "height": 85,
    "fillColor": "#ffffff",
    "pathD": "M 226 1 L 226 1 C 230 0, 234 1, 235 4 L 235 4 C 236 7, 233 11, 229 12 L 10 84 L 10 84 C 6 85, 2 84, 1 81 L 1 81 C 0 78, 3 74, 7 73 L 226 1"
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 968,
    "y": 128,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 0,
    "x": 962,
    "y": 163,
    "width": 236,
    "height": 86,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 2,
    "x": 968,
    "y": 316,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 4,
    "x": 962,
    "y": 351,
    "width": 236,
    "height": 86,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 4,
    "x": 968,
    "y": 504,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 6,
    "x": 962,
    "y": 539,
    "width": 236,
    "height": 86,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 1,
    "x": 197,
    "y": 235,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ee6d90",
    "textSize": 16
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 1,
    "x": 80,
    "y": 270,
    "width": 236,
    "height": 86,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 3,
    "x": 199,
    "y": 423,
    "width": 111,
    "height": 36,
    "text": "Your title",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 5,
    "x": 80,
    "y": 458,
    "width": 236,
    "height": 86,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
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

export function Imported2025migsopcubedcreativeandexampletemplates120Template({ data }: { data: BrainData }): ReactElement {
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

        {titleLines.length > 0 ? (() => {
          const fs = shapeDef.textSize || (shapeDef.isTitle ? 14 : (shapeDef.isSubtitle ? 10 : 12));
          return (
            <text
              x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)}
              y={bbox.y + fs * 0.9 + (shapeDef.pathD || finalColor ? 10 : 0)}
              fontFamily="Arial, sans-serif"
              fontSize={fs}
              fontWeight={shapeDef.isTitle ? 700 : 400}
              fill={shapeDef.textColor || (shapeDef.isTitle ? '#111827' : '#4b5563')}
            >
              {titleLines.map((line: string, lIdx: number) => (
                <tspan key={lIdx} x={bbox.x + (shapeDef.pathD || finalColor ? 10 : 0)} dy={lIdx === 0 ? 0 : Math.round(fs * 1.2)}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })() : null}

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
