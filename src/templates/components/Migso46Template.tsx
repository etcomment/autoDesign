import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 259,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-1",
    "x": 259,
    "y": 440,
    "width": 48,
    "height": 158,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 148 Q 48 158 38 158 L 10 158 Q 0 158 0 148 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 362,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-3",
    "x": 362,
    "y": 423,
    "width": 48,
    "height": 175,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 165 Q 48 175 38 175 L 10 175 Q 0 175 0 165 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 466,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "x": 466,
    "y": 401,
    "width": 48,
    "height": 197,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 187 Q 48 197 38 197 L 10 197 Q 0 197 0 187 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 569,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 569,
    "y": 378,
    "width": 48,
    "height": 220,
    "fillColor": "#ffb900",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 210 Q 48 220 38 220 L 10 220 Q 0 220 0 210 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 672,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 672,
    "y": 366,
    "width": 48,
    "height": 232,
    "fillColor": "#ee6d90",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 222 Q 48 232 38 232 L 10 232 Q 0 232 0 222 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 776,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-11",
    "x": 776,
    "y": 351,
    "width": 48,
    "height": 247,
    "fillColor": "#3365cc",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 237 Q 48 247 38 247 L 10 247 Q 0 247 0 237 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 879,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-13",
    "x": 879,
    "y": 330,
    "width": 48,
    "height": 268,
    "fillColor": "#ff4d38",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 258 Q 48 268 38 268 L 10 268 Q 0 268 0 258 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 982,
    "y": 239,
    "width": 48,
    "height": 359,
    "fillColor": "#ffffff",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 349 Q 48 359 38 359 L 10 359 Q 0 359 0 349 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-15",
    "x": 982,
    "y": 316,
    "width": 48,
    "height": 282,
    "fillColor": "#52c49c",
    "text": "",
    "pathD": "M 10 0 L 38 0 Q 48 0 48 10 L 48 272 Q 48 282 38 282 L 10 282 Q 0 282 0 272 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-16",
    "x": 829,
    "y": 124,
    "width": 353,
    "height": 98,
    "fillColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-42",
    "x": 1006,
    "y": 222,
    "width": 10,
    "height": 32,
    "strokeColor": "#ee6d90",
    "text": ""
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 10,
    "x": 967,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2026"
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 9,
    "x": 863,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2025"
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 8,
    "x": 759,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2024"
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 7,
    "x": 657,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2023"
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 6,
    "x": 553,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2022"
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 5,
    "x": 451,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2021"
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 4,
    "x": 347,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2020"
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 3,
    "x": 244,
    "y": 615,
    "width": 79,
    "height": 40,
    "text": "2019"
  },
  {
    "id": "sp-25",
    "x": 118,
    "y": 239,
    "width": 88,
    "height": 40,
    "text": "100%"
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 0,
    "x": 133,
    "y": 321,
    "width": 73,
    "height": 40,
    "text": "75%"
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 1,
    "x": 133,
    "y": 404,
    "width": 73,
    "height": 40,
    "text": "50%"
  },
  {
    "id": "sp-28",
    "x": 148,
    "y": 568,
    "width": 58,
    "height": 40,
    "text": "0%"
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 2,
    "x": 133,
    "y": 486,
    "width": 73,
    "height": 40,
    "text": "25%"
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 7,
    "x": 978,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "75%"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 6,
    "x": 875,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "70%"
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 5,
    "x": 772,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "65%"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 4,
    "x": 668,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "60%"
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 3,
    "x": 564,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "55%"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 2,
    "x": 460,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "50%"
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 1,
    "x": 360,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "45%"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 0,
    "x": 254,
    "y": 552,
    "width": 57,
    "height": 31,
    "text": "40%"
  },
  {
    "id": "sp-38",
    "x": 79,
    "y": 143,
    "width": 132,
    "height": 31,
    "text": "Chart TITLE"
  },
  {
    "id": "sp-39",
    "x": 845,
    "y": 135,
    "width": 322,
    "height": 53,
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

export function Migso46Template({ data }: { data: BrainData }): ReactElement {
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
