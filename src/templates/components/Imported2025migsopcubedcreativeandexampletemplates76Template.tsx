import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 33,
    "y": 160,
    "width": 72,
    "height": 29,
    "text": "Stages",
    "textSize": 12
  },
  {
    "id": "sp-1",
    "x": 26,
    "y": 408,
    "width": 87,
    "height": 29,
    "text": "Thinking",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 6,
    "x": 31,
    "y": 499,
    "width": 76,
    "height": 29,
    "text": "Feeling",
    "textSize": 12
  },
  {
    "id": "sp-3",
    "x": 39,
    "y": 590,
    "width": 61,
    "height": 29,
    "text": "Opps",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "x": 11,
    "y": 281,
    "width": 117,
    "height": 29,
    "text": "Touchpoints",
    "textSize": 12
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 0,
    "x": 94,
    "y": 139,
    "width": 226,
    "height": 72,
    "fillColor": "#3365cc"
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 1,
    "x": 309,
    "y": 139,
    "width": 226,
    "height": 72,
    "fillColor": "#ff4d38",
    "pathD": "M 0 0 L 170 0 L 226 36 L 170 72 L 0 72 L 57 36 Z"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 1,
    "x": 163,
    "y": 160,
    "width": 68,
    "height": 29,
    "text": "Step 1",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 2,
    "x": 388,
    "y": 160,
    "width": 68,
    "height": 29,
    "text": "Step 2",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 523,
    "y": 139,
    "width": 226,
    "height": 72,
    "fillColor": "#52c49c",
    "pathD": "M 0 0 L 170 0 L 226 36 L 170 72 L 0 72 L 57 36 Z"
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 3,
    "x": 602,
    "y": 160,
    "width": 68,
    "height": 29,
    "text": "Step 3",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 3,
    "x": 737,
    "y": 139,
    "width": 226,
    "height": 72,
    "fillColor": "#ffb900",
    "pathD": "M 0 0 L 170 0 L 226 36 L 170 72 L 0 72 L 57 36 Z"
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 4,
    "x": 816,
    "y": 160,
    "width": 68,
    "height": 29,
    "text": "Step 4",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 4,
    "x": 951,
    "y": 139,
    "width": 226,
    "height": 72,
    "fillColor": "#ee6d90",
    "pathD": "M 0 0 L 170 0 L 226 36 L 170 72 L 0 72 L 57 36 Z"
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 5,
    "x": 1030,
    "y": 160,
    "width": 68,
    "height": 29,
    "text": "Step 5",
    "textColor": "#ffffff",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "x": 94,
    "y": 291,
    "width": 1083,
    "height": 10
  },
  {
    "id": "sp-16",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 151,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-63",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 160,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 7,
    "x": 106,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-18",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 288,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-64",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 298,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 8,
    "x": 243,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 425,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 435,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 9,
    "x": 380,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 563,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-66",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 573,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 10,
    "x": 518,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 700,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-67",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 710,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 11,
    "x": 655,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 838,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-68",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 847,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 12,
    "x": 793,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 975,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-69",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 985,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 13,
    "x": 930,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 1113,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-70",
    "isColorNode": true,
    "dataNodeIdx": 14,
    "x": 1122,
    "y": 310,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 14,
    "x": 1068,
    "y": 334,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 13,
    "x": 1044,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 6,
    "x": 999,
    "y": 237,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-71",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 1054,
    "y": 258,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-34",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 907,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 5,
    "x": 861,
    "y": 237,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-72",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 916,
    "y": 258,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-36",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 769,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 4,
    "x": 724,
    "y": 237,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-73",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 779,
    "y": 258,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-38",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 632,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 3,
    "x": 587,
    "y": 237,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-74",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 641,
    "y": 258,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-40",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 494,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 2,
    "x": 449,
    "y": 237,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-75",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 504,
    "y": 258,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-42",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 357,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 1,
    "x": 312,
    "y": 237,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-76",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 366,
    "y": 258,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-44",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 219,
    "y": 286,
    "width": 19,
    "height": 19,
    "pathD": "M 10 0 A 10 10 0 1 1 9 0 Z"
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 0,
    "x": 174,
    "y": 237,
    "width": 109,
    "height": 19,
    "text": "Touchpoint",
    "textSize": 9
  },
  {
    "id": "sp-77",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 229,
    "y": 258,
    "width": 10,
    "height": 24
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 0,
    "x": 94,
    "y": 385,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 1,
    "x": 309,
    "y": 385,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-48",
    "dataNodeIdx": 2,
    "x": 523,
    "y": 385,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-49",
    "dataNodeIdx": 3,
    "x": 737,
    "y": 385,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-50",
    "dataNodeIdx": 5,
    "x": 951,
    "y": 385,
    "width": 226,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-51",
    "dataNodeIdx": 4,
    "x": 94,
    "y": 476,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-52",
    "dataNodeIdx": 5,
    "x": 309,
    "y": 476,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-53",
    "dataNodeIdx": 6,
    "x": 523,
    "y": 476,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-54",
    "dataNodeIdx": 7,
    "x": 737,
    "y": 476,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-55",
    "dataNodeIdx": 6,
    "x": 951,
    "y": 476,
    "width": 226,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-56",
    "dataNodeIdx": 8,
    "x": 94,
    "y": 567,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-57",
    "dataNodeIdx": 9,
    "x": 309,
    "y": 567,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-58",
    "dataNodeIdx": 10,
    "x": 523,
    "y": 567,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-59",
    "dataNodeIdx": 11,
    "x": 737,
    "y": 567,
    "width": 201,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-60",
    "dataNodeIdx": 7,
    "x": 951,
    "y": 567,
    "width": 226,
    "height": 75,
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

export function Imported2025migsopcubedcreativeandexampletemplates76Template({ data }: { data: BrainData }): ReactElement {
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
