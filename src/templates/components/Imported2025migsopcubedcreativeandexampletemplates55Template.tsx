import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 401,
    "y": 149,
    "width": 390,
    "height": 222,
    "fillColor": "#ff4d38",
    "pathD": "M 239 0 C 281 0, 320 10, 354 29 L 355 29 L 369 5 L 390 140 L 262 190 L 278 163 L 273 160 C 263 156, 251 154, 239 154 C 200 154, 167 180, 156 215 L 155 222 L 76 159 L 0 220 L 2 204 C 19 89, 119 0, 239 0 Z"
  },
  {
    "id": "sp-1",
    "x": 651,
    "y": 191,
    "width": 229,
    "height": 427,
    "fillColor": "#52c49c",
    "pathD": "M 124 0 L 126 1 C 188 45, 229 117, 229 198 C 229 280, 188 352, 126 395 L 114 403 L 128 427 L 0 377 L 21 242 L 37 270 L 45 264 C 64 248, 75 224, 75 198 C 75 176, 67 156, 53 140 L 47 135 L 139 99 Z"
  },
  {
    "id": "sp-2",
    "x": 370,
    "y": 308,
    "width": 376,
    "height": 321,
    "fillColor": "#3365cc",
    "pathD": "M 107 0 L 214 86 L 184 86 L 185 90 C 189 133, 226 167, 271 167 C 280 167, 288 166, 296 164 L 297 163 L 282 260 L 376 297 L 372 299 C 341 313, 307 321, 271 321 C 142 321, 37 220, 30 93 L 30 86 L 0 86 Z"
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 444,
    "y": 329,
    "width": 64,
    "height": 58,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 717,
    "y": 243,
    "width": 64,
    "height": 58,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 2,
    "x": 658,
    "y": 523,
    "width": 64,
    "height": 58,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 30
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 760,
    "y": 380,
    "width": 75,
    "height": 75,
    "fillColor": "#ffffff",
    "pathD": "M 73 61 L 73 61 C 66 61, 61 66, 61 73 L 14 73 C 14 66, 9 61, 2 61 L 2 23 L 7 37 C 8 41, 12 43, 15 43 L 17 43 L 17 44 C 17 47, 19 50, 22 50 C 25 50, 28 47, 28 44 L 28 43 L 47 43 L 47 44 C 47 47, 49 50, 53 50 C 56 50, 58 47, 58 44 L 58 43 L 59 43 C 63 43, 66 41, 68 37 L 73 23 L 73 61 Z M 73 69 L 73 69 C 73 71, 71 73, 69 73 L 63 73 C 63 68, 68 63, 73 63 L 73 69 Z M 6 73 L 6 73 C 4 73, 2 71, 2 69 L 2 63 C 7 63, 12 68, 12 73 L 6 73 Z M 26 39 L 26 44 C 26 46, 24 48, 22 48 C 20 48, 19 46, 19 44 L 19 39 L 26 39 Z M 56 39 L 56 44 C 56 46, 54 48, 53 48 C 51 48, 49 46, 49 44 L 49 39 L 56 39 Z M 3 13 L 3 13 C 4 12, 5 11, 6 11 L 69 11 C 70 11, 71 12, 72 13 C 73 14, 73 15, 73 16 L 66 36 C 65 39, 62 41, 59 41 L 58 41 L 58 38 C 58 38, 58 37, 57 37 L 48 37 C 47 37, 47 38, 47 38 L 47 41 L 28 41 L 28 38 C 28 38, 28 37, 27 37 L 18 37 C 17 37, 17 38, 17 38 L 17 41 L 15 41 C 13 41, 10 39, 9 36 L 3 16 C 2 15, 2 14, 3 13 Z M 23 7 L 23 7 C 23 4, 26 2, 28 2 L 46 2 C 49 2, 51 4, 51 7 L 51 9 L 23 9 L 23 7 Z M 74 11 L 74 11 C 73 10, 71 9, 69 9 L 54 9 L 54 7 C 54 3, 50 0, 46 0 L 28 0 C 24 0, 21 3, 21 7 L 21 9 L 6 9 C 4 9, 2 10, 1 11 C 0 13, 0 14, 0 15 L 0 69 C 0 72, 3 75, 6 75 L 69 75 C 72 75, 75 72, 75 69 L 75 15 C 75 14, 75 13, 74 11 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 550,
    "y": 196,
    "width": 74,
    "height": 75,
    "fillColor": "#ffffff",
    "pathD": "M 20 65 L 19 73 L 36 73 L 36 65 L 20 65 Z M 21 57 L 20 63 L 37 63 C 38 63, 38 64, 38 64 L 38 73 L 68 73 L 37 57 L 21 57 Z M 7 57 L 3 73 L 17 73 L 19 57 L 7 57 Z M 66 53 L 50 61 L 71 72 L 66 53 Z M 48 45 C 44 50, 41 53, 39 55 L 47 60 L 65 51 L 63 45 L 48 45 Z M 23 45 L 22 55 L 34 55 C 32 52, 29 49, 26 45 L 23 45 Z M 11 45 L 8 55 L 20 55 L 21 45 L 11 45 Z M 37 13 C 33 13, 29 17, 29 21 C 29 26, 33 29, 37 29 C 41 29, 45 26, 45 21 C 45 17, 41 13, 37 13 Z M 37 11 C 43 11, 47 16, 47 21 C 47 27, 43 31, 37 31 C 31 31, 27 27, 27 21 C 27 16, 31 11, 37 11 Z M 37 2 C 27 2, 19 11, 19 21 C 19 34, 33 50, 37 54 C 41 50, 55 34, 55 21 C 55 11, 47 2, 37 2 Z M 37 0 C 48 0, 58 9, 58 21 C 58 28, 54 36, 49 42 L 64 42 C 64 42, 65 43, 65 43 L 74 73 C 74 74, 74 74, 74 75 C 74 75, 73 75, 73 75 L 1 75 C 1 75, 0 75, 0 75 C 0 74, 0 74, 0 73 L 9 43 C 9 43, 10 42, 10 42 L 24 42 C 20 36, 16 28, 16 21 C 16 9, 26 0, 37 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 484,
    "y": 463,
    "width": 75,
    "height": 75,
    "fillColor": "#ffffff",
    "pathD": "M 33 57 C 34 57, 35 57, 35 57 C 35 57, 35 58, 35 58 C 35 58, 35 59, 35 59 C 35 59, 34 59, 34 59 C 34 59, 34 59, 33 59 C 33 59, 33 58, 33 58 C 33 58, 33 57, 33 57 Z M 12 57 C 13 57, 13 57, 14 57 C 14 57, 14 58, 14 58 C 14 58, 14 59, 14 59 C 14 59, 13 59, 13 59 C 13 59, 12 59, 12 59 C 12 59, 12 58, 12 58 C 12 58, 12 57, 12 57 Z M 24 57 C 24 57, 25 57, 25 58 C 25 58, 24 59, 24 59 C 23 59, 22 58, 22 58 C 22 57, 23 57, 24 57 Z M 6 34 C 4 34, 2 35, 2 37 L 2 62 C 2 64, 4 65, 6 65 L 29 65 C 32 65, 35 66, 37 68 L 45 72 L 45 44 L 39 44 C 37 44, 34 44, 32 46 L 19 53 C 19 53, 19 53, 19 53 C 18 53, 18 53, 18 53 C 18 53, 18 52, 18 52 L 18 34 L 6 34 Z M 28 31 L 54 31 C 55 31, 55 32, 55 33 C 55 33, 55 34, 54 34 L 28 34 C 27 34, 27 33, 27 33 C 27 32, 27 31, 28 31 Z M 43 21 L 64 21 C 65 21, 66 21, 66 22 C 66 23, 65 23, 64 23 L 43 23 C 42 23, 42 23, 42 22 C 42 21, 42 21, 43 21 Z M 28 21 L 35 21 C 36 21, 36 21, 36 22 C 36 23, 36 23, 35 23 L 28 23 C 27 23, 27 23, 27 22 C 27 21, 27 21, 28 21 Z M 56 10 L 64 10 C 65 10, 66 11, 66 11 C 66 12, 65 13, 64 13 L 56 13 C 56 13, 55 12, 55 11 C 55 11, 56 10, 56 10 Z M 28 10 L 48 10 C 49 10, 50 11, 50 11 C 50 12, 49 13, 48 13 L 28 13 C 27 13, 27 12, 27 11 C 27 11, 27 10, 28 10 Z M 23 2 C 22 2, 22 3, 21 3 C 20 4, 20 5, 20 6 L 20 50 L 31 44 C 33 42, 36 42, 39 42 L 69 42 C 70 42, 71 41, 72 41 C 72 40, 73 39, 73 38 L 73 6 C 73 5, 72 4, 72 3 C 71 3, 70 2, 69 2 L 23 2 Z M 23 0 L 69 0 C 71 0, 72 1, 73 2 C 74 3, 75 4, 75 6 L 75 38 C 75 40, 74 41, 73 42 C 72 43, 71 44, 69 44 L 47 44 L 47 74 C 47 74, 47 75, 47 75 C 47 75, 46 75, 46 75 C 46 75, 46 75, 46 75 L 36 70 C 34 68, 32 68, 29 68 L 6 68 C 3 68, 0 65, 0 62 L 0 37 C 0 34, 3 31, 6 31 L 18 31 L 18 6 C 18 4, 18 3, 19 2 C 20 1, 22 0, 23 0 Z"
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 212,
    "y": 166,
    "width": 141,
    "height": 36,
    "text": "Your title 2",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 0,
    "x": 80,
    "y": 207,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 2,
    "x": 212,
    "y": 454,
    "width": 141,
    "height": 36,
    "text": "Your title 1",
    "textSize": 16
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 2,
    "x": 80,
    "y": 495,
    "width": 274,
    "height": 51,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 1,
    "x": 926,
    "y": 310,
    "width": 141,
    "height": 36,
    "text": "Your title 3",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 926,
    "y": 351,
    "width": 274,
    "height": 51,
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

export function Imported2025migsopcubedcreativeandexampletemplates55Template({ data }: { data: BrainData }): ReactElement {
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
