import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 358,
    "y": 420,
    "width": 142,
    "height": 182,
    "fillColor": "#ffffff",
    "pathD": "M 142 91 C 142 41, 101 0, 51 0 L 0 0 L 0 61 L 51 61 C 68 61, 81 74, 81 91 C 81 108, 68 121, 51 121 L 0 121 L 0 182 L 51 182 C 101 182, 142 141, 142 91 Z"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 704,
    "y": 299,
    "width": 142,
    "height": 182,
    "fillColor": "#ffffff",
    "pathD": "M 0 91 C 0 41, 41 0, 91 0 L 142 0 L 142 61 L 91 61 C 74 61, 61 74, 61 91 C 61 108, 74 121, 91 121 L 142 121 L 142 182 L 91 182 C 41 182, 0 141, 0 91 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 500,
    "y": 420,
    "width": 206,
    "height": 61,
    "fillColor": "#ffffff",
    "pathD": "M 0 61 L 206 61 L 206 0 L 0 0 C 0 0, 0 61, 0 61 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 499,
    "y": 299,
    "width": 206,
    "height": 61,
    "fillColor": "#ffffff",
    "pathD": "M 206 61 L 0 61 L 0 0 L 206 0 C 206 0, 206 61, 206 61 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 500,
    "y": 542,
    "width": 395,
    "height": 61,
    "fillColor": "#ffffff",
    "pathD": "M 0 61 L 395 61 L 395 0 L 0 0 L 0 61 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 358,
    "y": 178,
    "width": 142,
    "height": 182,
    "fillColor": "#ffffff",
    "pathD": "M 142 91 C 142 41, 101 0, 51 0 L 0 0 L 0 61 L 51 61 C 68 61, 81 74, 81 91 C 81 108, 68 121, 51 121 L 0 121 L 0 182 L 51 182 C 101 182, 142 141, 142 91 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 384,
    "y": 202,
    "width": 95,
    "height": 134,
    "fillColor": "#FFFFFF",
    "pathD": "M 0 11 L 0 0 L 23 0 L 23 11 C 23 11, 0 11, 0 11 Z M 62 23 C 57 18, 51 15, 44 13 L 47 3 C 55 5, 63 9, 69 14 C 69 14, 62 23, 62 23 Z M 84 57 C 82 50, 80 44, 76 38 L 86 32 C 90 39, 93 47, 95 55 C 95 55, 84 57, 84 57 Z M 86 102 L 76 96 C 80 90, 82 84, 84 77 L 95 79 C 93 87, 90 95, 86 102 Z M 47 131 L 44 121 C 51 119, 57 116, 62 111 L 69 120 C 63 125, 55 129, 47 131 Z M 0 134 L 0 123 L 23 123 L 23 134 C 23 134, 0 134, 0 134 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 500,
    "y": 177,
    "width": 395,
    "height": 61,
    "fillColor": "#ffffff",
    "pathD": "M 0 61 L 395 61 L 395 0 L 0 0 L 0 61 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 384,
    "y": 445,
    "width": 95,
    "height": 134,
    "fillColor": "#ffffff",
    "pathD": "M 0 11 L 0 0 L 23 0 L 23 11 C 23 11, 0 11, 0 11 Z M 62 23 C 57 18, 51 15, 44 13 L 47 3 C 55 5, 63 9, 69 14 C 69 14, 62 23, 62 23 Z M 84 57 C 82 50, 80 44, 76 38 L 86 32 C 90 39, 93 47, 95 55 C 95 55, 84 57, 84 57 Z M 86 102 L 76 96 C 80 90, 82 84, 84 77 L 95 79 C 93 87, 90 95, 86 102 Z M 47 131 L 44 121 C 51 119, 57 116, 62 111 L 69 120 C 63 125, 55 129, 47 131 Z M 0 134 L 0 123 L 23 123 L 23 134 C 23 134, 0 134, 0 134 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 727,
    "y": 324,
    "width": 95,
    "height": 134,
    "fillColor": "#ffffff",
    "pathD": "M 72 11 L 72 0 L 95 0 L 95 11 C 95 11, 72 11, 72 11 Z M 26 14 C 32 9, 40 5, 48 3 L 51 13 C 44 15, 38 18, 33 23 C 33 23, 26 14, 26 14 Z M 0 55 C 2 47, 5 39, 9 32 L 19 38 C 15 44, 13 50, 11 57 C 11 57, 0 55, 0 55 Z M 0 79 L 11 77 C 13 84, 15 90, 19 96 L 9 102 C 5 95, 2 87, 0 79 Z M 26 120 L 33 111 C 38 116, 44 119, 51 121 L 48 131 C 40 129, 32 125, 26 120 Z M 72 134 L 72 123 L 95 123 L 95 134 C 95 134, 72 134, 72 134 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 499,
    "y": 447,
    "width": 205,
    "height": 11,
    "fillColor": "#ffffff",
    "pathD": "M 182 11 L 182 0 L 205 0 L 205 11 C 205 11, 182 11, 182 11 Z M 137 11 L 137 0 L 159 0 L 159 11 C 159 11, 137 11, 137 11 Z M 91 11 L 91 0 L 114 0 L 114 11 C 114 11, 91 11, 91 11 Z M 46 11 L 46 0 L 68 0 L 68 11 C 68 11, 46 11, 46 11 Z M 0 11 L 0 0 L 23 0 L 23 11 C 23 11, 0 11, 0 11 Z"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 499,
    "y": 325,
    "width": 205,
    "height": 11,
    "fillColor": "#ffffff",
    "pathD": "M 0 11 L 0 0 L 23 0 L 23 11 C 23 11, 0 11, 0 11 Z M 46 11 L 46 0 L 68 0 L 68 11 C 68 11, 46 11, 46 11 Z M 91 11 L 91 0 L 114 0 L 114 11 C 114 11, 91 11, 91 11 Z M 137 11 L 137 0 L 159 0 L 159 11 C 159 11, 137 11, 137 11 Z M 182 11 L 182 0 L 205 0 L 205 11 C 205 11, 182 11, 182 11 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 500,
    "y": 568,
    "width": 384,
    "height": 11,
    "fillColor": "#ffffff",
    "pathD": "M 358 11 L 358 0 L 384 0 L 384 11 C 384 11, 358 11, 358 11 Z M 307 11 L 307 0 L 333 0 L 333 11 C 333 11, 307 11, 307 11 Z M 256 11 L 256 0 L 282 0 L 282 11 C 282 11, 256 11, 256 11 Z M 205 11 L 205 0 L 230 0 L 230 11 C 230 11, 205 11, 205 11 Z M 154 11 L 154 0 L 179 0 L 179 11 C 179 11, 154 11, 154 11 Z M 102 11 L 102 0 L 128 0 L 128 11 C 128 11, 102 11, 102 11 Z M 51 11 L 51 0 L 77 0 L 77 11 C 77 11, 51 11, 51 11 Z M 0 11 L 0 0 L 26 0 L 26 11 C 26 11, 0 11, 0 11 Z"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 500,
    "y": 204,
    "width": 384,
    "height": 11,
    "fillColor": "#ffffff",
    "pathD": "M 358 11 L 358 0 L 384 0 L 384 11 C 384 11, 358 11, 358 11 Z M 307 11 L 307 0 L 333 0 L 333 11 C 333 11, 307 11, 307 11 Z M 256 11 L 256 0 L 282 0 L 282 11 C 282 11, 256 11, 256 11 Z M 205 11 L 205 0 L 230 0 L 230 11 C 230 11, 205 11, 205 11 Z M 154 11 L 154 0 L 179 0 L 179 11 C 179 11, 154 11, 154 11 Z M 102 11 L 102 0 L 128 0 L 128 11 C 128 11, 102 11, 102 11 Z M 51 11 L 51 0 L 77 0 L 77 11 C 77 11, 51 11, 51 11 Z M 0 11 L 0 0 L 26 0 L 26 11 C 26 11, 0 11, 0 11 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 874,
    "y": 108,
    "width": 274,
    "height": 158,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 798,
    "y": 171,
    "width": 10,
    "height": 68,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 721,
    "y": 142,
    "width": 142,
    "height": 50,
    "fillColor": "#ee6d90",
    "pathD": "M 23 50 L 0 25 L 23 0 L 142 0 L 142 50 L 23 50 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 790,
    "y": 535,
    "width": 10,
    "height": 68,
    "fillColor": "#ee6d90"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 721,
    "y": 507,
    "width": 142,
    "height": 50,
    "fillColor": "#ee6d90",
    "pathD": "M 119 50 L 142 25 L 119 0 L 0 0 L 0 50 L 119 50 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 513,
    "y": 292,
    "width": 10,
    "height": 68,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 474,
    "y": 243,
    "width": 86,
    "height": 86,
    "fillColor": "#ffb900",
    "pathD": "M 42 0 L 44 0 C 67 0, 86 19, 86 42 L 86 44 C 86 67, 67 86, 44 86 L 42 86 C 19 86, 0 67, 0 44 L 0 42 C 0 19, 19 0, 42 0 C 42 0, 42 0, 42 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 648,
    "y": 413,
    "width": 10,
    "height": 68,
    "fillColor": "#ffb900"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 610,
    "y": 363,
    "width": 86,
    "height": 86,
    "fillColor": "#ffb900",
    "pathD": "M 42 0 L 44 0 C 67 0, 86 19, 86 42 L 86 44 C 86 67, 67 86, 44 86 L 42 86 C 19 86, 0 67, 0 44 L 0 42 C 0 19, 19 0, 42 0 C 42 0, 42 0, 42 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 132,
    "y": 187,
    "width": 274,
    "height": 158,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 874,
    "y": 478,
    "width": 274,
    "height": 158,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 1,
    "x": 142,
    "y": 235,
    "width": 254,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 1,
    "x": 195,
    "y": 198,
    "width": 149,
    "height": 36,
    "text": "Milestone 02",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 0,
    "x": 885,
    "y": 156,
    "width": 254,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 0,
    "x": 937,
    "y": 120,
    "width": 149,
    "height": 36,
    "text": "Milestone 01",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 2,
    "x": 885,
    "y": 528,
    "width": 254,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 2,
    "x": 937,
    "y": 491,
    "width": 149,
    "height": 36,
    "text": "Milestone 03",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 0,
    "x": 761,
    "y": 153,
    "width": 88,
    "height": 29,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 1,
    "x": 737,
    "y": 517,
    "width": 88,
    "height": 29,
    "text": "Your title",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 1,
    "x": 617,
    "y": 382,
    "width": 71,
    "height": 48,
    "text": "YOUR TITLE",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 0,
    "x": 481,
    "y": 261,
    "width": 71,
    "height": 48,
    "text": "YOUR TITLE",
    "textColor": "#ffffff",
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

export function Imported2025migsopcubedcreativeandexampletemplates136Template({ data }: { data: BrainData }): ReactElement {
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
