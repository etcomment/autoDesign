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
    "x": 536,
    "y": 121,
    "width": 469,
    "height": 234,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 210 0 C 212 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 334 226 C 335 229, 336 231, 338 232 C 341 233, 343 234, 346 234 L 469 234"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 566,
    "y": 179,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 276,
    "y": 178,
    "width": 663,
    "height": 187,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 209 0 C 212 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 309 179 C 310 182, 312 184, 314 185 C 316 186, 319 187, 321 187 L 663 187"
  },
  {
    "id": "sp-3",
    "x": 242,
    "y": 374,
    "width": 715,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-4",
    "x": 88,
    "y": 205,
    "width": 162,
    "height": 339,
    "fillColor": "#ffffff",
    "pathD": "M 2 14 C -1 11, -1 7, 2 4 C 5 -1, 11 -1, 15 2 L 158 159 C 161 162, 162 166, 162 170 C 162 173, 161 176, 159 178 L 17 335 C 15 337, 13 338, 11 339 C 8 339, 5 339, 3 337 C 0 334, 0 330, 2 327 C 27 280, 40 228, 41 175 C 42 119, 28 64, 2 14 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 595,
    "y": 235,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-6",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 625,
    "y": 294,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-7",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 305,
    "y": 235,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-8",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 335,
    "y": 294,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-9",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 275,
    "y": 384,
    "width": 663,
    "height": 187,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 209 0 C 212 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 309 179 C 310 182, 312 184, 314 185 C 316 186, 319 187, 321 187 L 663 187"
  },
  {
    "id": "sp-10",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 536,
    "y": 394,
    "width": 469,
    "height": 234,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 210 0 C 212 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 334 226 C 335 229, 336 231, 338 232 C 341 233, 343 234, 346 234 L 469 234"
  },
  {
    "id": "sp-11",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 566,
    "y": 553,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-12",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 596,
    "y": 494,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-13",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 624,
    "y": 438,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-14",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 307,
    "y": 493,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-15",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 335,
    "y": 438,
    "width": 226,
    "height": 16,
    "strokeColor": "#ffffff",
    "pathD": "M 0 0 L 211 0 C 213 0, 215 1, 217 2 C 219 3, 220 5, 221 7 L 226 16"
  },
  {
    "id": "sp-16",
    "x": 931,
    "y": 216,
    "width": 262,
    "height": 323,
    "fillColor": "#ffffff",
    "pathD": "M 83 0 C 81 0, 79 0, 77 1 C 70 3, 63 6, 58 12 C 19 55, -2 111, 0 168 C 2 222, 23 274, 59 313 C 64 318, 71 322, 78 323 C 86 324, 93 322, 100 319 C 128 300, 156 280, 181 258 C 207 235, 231 210, 254 184 C 259 178, 262 171, 262 163 C 262 155, 259 147, 254 140 C 232 112, 207 87, 180 63 C 155 41, 127 21, 98 4 C 95 2, 92 1, 89 0 C 87 0, 85 0, 83 0 Z M 111 79 C 119 79, 127 82, 132 88 C 144 100, 144 119, 132 130 C 121 142, 102 142, 90 130 C 79 119, 79 100, 90 88 C 96 82, 104 79, 111 79 Z"
  },
  {
    "id": "sp-17",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 549,
    "y": 169,
    "width": 19,
    "height": 19,
    "fillColor": "#52c49c",
    "strokeColor": "#52c49c",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 233,
    "y": 155,
    "width": 45,
    "height": 45,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "pathD": "M 23 0 A 23 23 0 1 1 22 0 Z"
  },
  {
    "id": "sp-19",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 233,
    "y": 547,
    "width": 45,
    "height": 45,
    "fillColor": "#ff4d38",
    "strokeColor": "#ff4d38",
    "pathD": "M 23 0 A 23 23 0 1 1 22 0 Z"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 492,
    "y": 97,
    "width": 45,
    "height": 45,
    "fillColor": "#52c49c",
    "strokeColor": "#52c49c",
    "pathD": "M 23 0 A 23 23 0 1 1 22 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 492,
    "y": 603,
    "width": 45,
    "height": 45,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "pathD": "M 23 0 A 23 23 0 1 1 22 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 577,
    "y": 225,
    "width": 19,
    "height": 19,
    "fillColor": "#52c49c",
    "strokeColor": "#52c49c",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 606,
    "y": 285,
    "width": 19,
    "height": 19,
    "fillColor": "#52c49c",
    "strokeColor": "#52c49c",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 607,
    "y": 445,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 578,
    "y": 499,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 549,
    "y": 560,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 288,
    "y": 500,
    "width": 19,
    "height": 19,
    "fillColor": "#ff4d38",
    "strokeColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 317,
    "y": 445,
    "width": 19,
    "height": 19,
    "fillColor": "#ff4d38",
    "strokeColor": "#ff4d38",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 287,
    "y": 226,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 318,
    "y": 283,
    "width": 19,
    "height": 19,
    "fillColor": "#3365cc",
    "strokeColor": "#3365cc",
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 1,
    "x": 290,
    "y": 180,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 2,
    "x": 290,
    "y": 533,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 3,
    "x": 549,
    "y": 588,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 0,
    "x": 549,
    "y": 123,
    "width": 108,
    "height": 37,
    "text": "Your title",
    "textColor": "#3365cc",
    "textSize": 17
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 1,
    "x": 312,
    "y": 237,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 3,
    "x": 344,
    "y": 296,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 5,
    "x": 344,
    "y": 426,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 7,
    "x": 312,
    "y": 481,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 0,
    "x": 575,
    "y": 180,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 9,
    "x": 575,
    "y": 541,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 2,
    "x": 606,
    "y": 235,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 8,
    "x": 606,
    "y": 481,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 4,
    "x": 638,
    "y": 294,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 6,
    "x": 638,
    "y": 426,
    "width": 179,
    "height": 28,
    "text": "Add words",
    "textSize": 13
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 0,
    "x": 499,
    "y": 104,
    "width": 31,
    "height": 36,
    "text": "3",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 1,
    "x": 240,
    "y": 162,
    "width": 31,
    "height": 36,
    "text": "1",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 2,
    "x": 240,
    "y": 555,
    "width": 31,
    "height": 36,
    "text": "2",
    "textColor": "#ffffff",
    "textSize": 16
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 3,
    "x": 499,
    "y": 611,
    "width": 31,
    "height": 36,
    "text": "4",
    "textColor": "#ffffff",
    "textSize": 16
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

export function Imported2025migsopcubedcreativeandexampletemplates94Template({ data }: { data: BrainData }): ReactElement {
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
