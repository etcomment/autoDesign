import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 662,
    "y": 163,
    "width": 538,
    "height": 379,
    "fillColor": "#52c49c",
    "pathD": "M 538 72 L 469 10 L 469 50 L 121 50 L 121 50 C 88 22, 46 4, 0 0 L 0 0 C 12 7, 20 20, 20 35 L 20 35 C 20 48, 13 61, 2 68 L 2 68 C 78 79, 136 144, 136 223 L 136 223 C 136 265, 119 303, 93 331 L 93 331 C 95 330, 97 330, 100 330 L 100 330 C 122 330, 141 348, 141 371 L 141 371 C 141 373, 140 376, 140 379 L 140 379 C 179 339, 203 284, 203 223 L 203 223 C 203 176, 188 133, 164 97 L 469 97 L 469 133 L 538 72"
  },
  {
    "id": "sp-1",
    "x": 81,
    "y": 162,
    "width": 681,
    "height": 448,
    "fillColor": "#3365cc",
    "pathD": "M 680 412 L 680 412 C 658 412, 640 394, 640 371 L 640 371 C 640 366, 641 361, 643 356 L 643 356 C 619 372, 590 381, 559 381 L 559 381 C 472 381, 402 310, 402 224 L 402 224 C 402 144, 460 79, 536 68 L 536 68 C 526 61, 519 49, 519 35 L 519 35 C 519 20, 527 7, 539 0 L 539 0 C 425 10, 335 106, 335 224 L 335 224 C 335 271, 349 314, 374 350 L 69 350 L 69 314 L 0 376 L 69 437 L 69 397 L 417 397 L 417 397 C 455 429, 505 448, 559 448 L 559 448 C 604 448, 646 435, 681 412 L 681 412 C 681 412, 681 412, 680 412"
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 0,
    "x": 616,
    "y": 168,
    "width": 49,
    "height": 58,
    "text": "A",
    "textColor": "#3365cc",
    "textSize": 30
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 738,
    "y": 505,
    "width": 49,
    "height": 58,
    "text": "B",
    "textColor": "#3365cc",
    "textSize": 30
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 882,
    "y": 316,
    "width": 199,
    "height": 199,
    "fillColor": "#52c49c",
    "pathD": "M 100 0 A 100 100 0 1 1 99 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 191,
    "y": 255,
    "width": 199,
    "height": 199,
    "fillColor": "#3365cc",
    "pathD": "M 100 0 A 100 100 0 1 1 99 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 249,
    "y": 311,
    "width": 83,
    "height": 83,
    "fillColor": "#ffffff",
    "pathD": "M 30 80 L 47 80 C 48 80, 48 81, 48 81 C 48 82, 48 83, 47 83 L 30 83 C 29 83, 28 82, 28 81 C 28 81, 29 80, 30 80 Z M 61 68 C 60 68, 59 68, 59 69 C 58 70, 58 72, 59 73 C 60 74, 62 74, 63 73 C 64 72, 64 70, 63 69 C 62 68, 61 68, 61 68 Z M 61 66 C 62 66, 63 66, 64 67 C 66 69, 66 73, 64 75 C 63 76, 62 76, 61 76 C 59 76, 58 76, 57 75 C 55 73, 55 69, 57 67 C 58 66, 59 66, 61 66 Z M 27 59 C 27 59, 27 59, 26 60 L 14 72 C 12 74, 12 77, 14 78 L 15 79 C 17 81, 20 81, 22 79 L 34 67 C 34 67, 34 66, 34 66 L 27 60 C 27 59, 27 59, 27 59 Z M 65 25 L 61 30 L 64 33 L 69 29 L 65 25 Z M 21 24 L 27 30 C 27 30, 27 31, 27 31 C 26 35, 24 37, 20 38 C 20 38, 19 38, 19 38 L 13 32 C 13 35, 14 37, 16 39 C 18 41, 21 42, 24 42 C 24 42, 24 42, 24 42 C 25 42, 25 42, 25 42 L 51 68 C 52 68, 52 69, 52 69 C 51 72, 52 76, 54 78 C 56 80, 58 80, 61 80 C 63 80, 65 80, 67 78 C 69 76, 70 74, 70 71 C 70 69, 69 67, 67 65 C 65 63, 62 62, 58 63 C 58 63, 58 63, 57 62 L 31 36 C 31 36, 31 35, 31 35 C 31 32, 31 29, 28 26 C 26 25, 24 24, 21 24 Z M 64 21 C 65 21, 65 21, 65 22 L 69 25 L 72 28 C 72 28, 72 29, 72 29 C 72 29, 72 30, 72 30 L 64 35 C 64 35, 64 35, 63 35 C 63 35, 63 35, 62 35 L 61 34 L 47 48 L 59 60 C 62 59, 66 61, 69 63 C 71 65, 72 68, 72 71 C 72 74, 71 77, 69 80 C 66 82, 64 83, 61 83 C 57 83, 55 82, 52 80 C 50 77, 48 73, 49 69 L 37 58 L 33 62 L 36 64 C 37 65, 37 67, 36 69 L 23 81 C 22 82, 20 83, 18 83 C 16 83, 15 82, 13 81 L 13 80 C 10 77, 10 73, 13 70 L 25 58 C 26 57, 28 57, 29 58 L 31 60 L 36 56 L 24 44 C 20 45, 16 44, 14 41 C 11 38, 10 33, 11 29 C 11 29, 12 28, 12 28 C 12 28, 13 28, 13 28 L 20 36 C 22 35, 24 33, 25 31 L 18 24 C 17 24, 17 23, 17 23 C 17 22, 18 22, 18 22 C 22 20, 27 22, 30 25 C 33 27, 34 31, 33 35 L 45 47 L 59 32 L 58 31 C 58 30, 58 30, 58 29 L 64 22 C 64 22, 64 21, 64 21 Z M 74 7 C 74 6, 75 6, 76 7 C 76 7, 76 7, 76 7 C 76 8, 76 8, 76 8 C 75 9, 75 9, 75 9 C 74 9, 74 9, 74 8 C 74 8, 74 8, 74 7 C 74 7, 74 7, 74 7 Z M 58 7 C 58 6, 59 6, 60 7 C 60 7, 60 7, 60 7 C 60 8, 60 8, 60 8 C 59 9, 59 9, 59 9 C 58 9, 58 9, 58 8 C 58 8, 57 8, 57 7 C 57 7, 58 7, 58 7 Z M 67 6 C 68 6, 68 7, 68 7 C 68 8, 68 9, 67 9 C 66 9, 66 8, 66 7 C 66 7, 66 6, 67 6 Z M 3 2 L 3 13 L 80 13 L 80 2 L 3 2 Z M 1 0 L 82 0 C 82 0, 83 0, 83 1 L 83 14 L 83 82 C 83 82, 82 83, 82 83 L 75 83 C 74 83, 73 82, 73 82 C 73 81, 74 80, 75 80 L 80 80 L 80 15 L 3 15 L 3 80 L 7 80 C 8 80, 8 81, 8 82 C 8 82, 8 83, 7 83 L 1 83 C 1 83, 0 82, 0 82 L 0 14 L 0 1 C 0 0, 1 0, 1 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 939,
    "y": 374,
    "width": 83,
    "height": 83,
    "fillColor": "#ffffff",
    "pathD": "M 45 14 C 45 14, 46 14, 47 14 C 47 15, 47 16, 46 16 C 41 20, 38 26, 38 32 C 38 36, 39 39, 41 42 C 41 43, 41 43, 41 43 C 41 43, 41 43, 41 43 C 41 43, 41 43, 41 43 C 41 43, 41 43, 41 43 L 41 44 C 41 44, 41 44, 41 44 L 35 53 L 60 53 C 71 53, 81 44, 81 32 C 81 26, 78 20, 73 16 C 72 16, 72 15, 72 14 C 73 14, 74 14, 74 14 C 80 19, 83 25, 83 32 C 83 45, 73 56, 60 56 L 33 56 C 32 56, 32 55, 31 55 C 31 55, 31 54, 32 54 L 39 43 C 37 40, 36 36, 36 32 C 36 25, 39 19, 45 14 Z M 55 13 L 52 19 C 52 19, 52 19, 52 20 C 53 20, 53 20, 53 20 C 54 20, 54 20, 55 20 C 55 20, 55 20, 55 20 C 56 21, 56 21, 57 21 C 57 21, 57 21, 58 21 C 58 21, 59 21, 60 21 C 60 21, 60 21, 60 21 C 60 21, 61 21, 62 21 C 62 21, 62 21, 62 21 C 63 21, 63 21, 64 20 C 64 20, 64 20, 65 20 C 65 20, 66 20, 66 20 C 66 20, 66 20, 67 20 C 67 19, 67 19, 67 19 L 64 13 C 63 14, 61 14, 60 14 C 58 14, 57 14, 55 13 Z M 60 4 L 56 11 C 58 12, 61 12, 63 11 L 60 4 Z M 59 1 C 59 0, 60 0, 61 1 L 70 19 C 70 19, 70 20, 70 20 L 70 20 C 70 20, 70 20, 70 20 L 70 46 C 70 47, 70 47, 69 47 C 68 47, 68 47, 68 46 L 68 22 C 68 22, 68 22, 68 22 C 67 22, 66 22, 66 23 C 66 23, 66 23, 66 23 C 65 23, 65 23, 64 23 C 64 23, 64 23, 64 23 C 63 23, 62 23, 62 23 C 62 23, 62 23, 61 23 C 61 23, 61 23, 61 23 L 61 49 C 61 50, 60 50, 60 50 C 59 50, 58 50, 58 49 L 58 23 C 58 23, 58 23, 58 23 C 58 23, 58 23, 57 23 C 57 23, 56 23, 56 23 C 56 23, 55 23, 55 23 C 55 23, 54 23, 54 23 C 54 23, 53 23, 53 23 C 53 22, 52 22, 52 22 C 52 22, 52 22, 52 22 L 52 49 C 52 50, 51 50, 50 50 C 50 50, 49 50, 49 49 L 49 20 C 49 20, 49 20, 49 20 L 49 20 C 49 20, 49 19, 49 19 L 59 1 Z M 37 0 C 38 0, 38 0, 39 0 C 39 0, 39 0, 39 0 C 41 0, 46 0, 52 2 C 52 2, 53 3, 52 4 C 52 4, 51 5, 51 5 C 46 3, 41 3, 39 3 C 39 3, 39 3, 39 3 C 38 3, 38 3, 37 3 C 32 3, 13 4, 10 28 C 10 28, 10 31, 3 42 C 3 42, 2 43, 3 43 C 3 44, 3 44, 4 44 C 6 46, 10 47, 10 47 C 10 47, 10 48, 10 48 C 10 49, 10 57, 10 61 C 11 62, 14 63, 20 63 C 20 63, 21 63, 21 63 C 21 63, 21 63, 21 63 C 24 63, 25 65, 25 66 L 25 76 C 25 76, 25 77, 26 78 C 32 81, 47 81, 53 78 C 53 77, 54 77, 54 76 C 53 73, 53 67, 55 61 C 55 61, 56 60, 56 60 C 57 61, 57 61, 57 62 C 55 67, 56 73, 56 76 C 57 77, 56 79, 54 80 C 51 82, 45 83, 40 83 C 34 83, 28 82, 25 80 C 23 79, 22 77, 22 76 L 22 66 C 22 66, 22 66, 21 66 C 21 66, 21 66, 21 66 C 21 66, 20 66, 20 66 C 16 66, 9 65, 8 61 C 7 58, 8 51, 8 49 C 7 49, 4 48, 2 46 C 1 46, 0 44, 0 44 C 0 42, 1 41, 1 41 C 7 30, 8 27, 8 27 C 11 2, 31 0, 37 0 Z"
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 0,
    "x": 241,
    "y": 171,
    "width": 100,
    "height": 58,
    "text": "57%",
    "textColor": "#3365cc",
    "textSize": 30
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 1,
    "x": 939,
    "y": 543,
    "width": 100,
    "height": 58,
    "text": "43%",
    "textColor": "#52c49c",
    "textSize": 30
  },
  {
    "id": "sp-10",
    "x": 518,
    "y": 389,
    "width": 244,
    "height": 82,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "x": 544,
    "y": 292,
    "width": 191,
    "height": 58,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 30
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

export function Imported2025migsopcubedcreativeandexampletemplates69Template({ data }: { data: BrainData }): ReactElement {
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
