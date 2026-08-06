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
    "x": 148,
    "y": 252,
    "width": 1045,
    "height": 92,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 148,
    "y": 352,
    "width": 1045,
    "height": 92,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 148,
    "y": 452,
    "width": 1045,
    "height": 92,
    "fillColor": "#ffffff"
  },
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 148,
    "y": 125,
    "width": 10,
    "height": 549,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 932,
    "y": 125,
    "width": 10,
    "height": 549,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 671,
    "y": 125,
    "width": 10,
    "height": 549,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-51",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 409,
    "y": 125,
    "width": 10,
    "height": 549,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 89,
    "y": 476,
    "width": 45,
    "height": 45,
    "fillColor": "#3365cc",
    "pathD": "M 5 39 C 6 39, 7 40, 7 40 C 7 41, 6 41, 5 41 C 5 41, 5 41, 5 40 C 5 40, 5 39, 5 39 Z M 2 24 L 2 43 L 9 43 L 9 24 Z M 21 2 C 20 2, 20 2, 20 2 C 20 4, 21 8, 20 10 C 19 13, 16 16, 14 19 C 13 20, 11 22, 11 23 L 11 43 L 37 43 C 37 43, 37 43, 37 43 C 38 43, 40 42, 40 40 C 40 39, 40 39, 39 38 C 39 38, 39 38, 39 37 C 39 37, 40 37, 40 37 C 41 37, 43 35, 43 34 C 43 33, 42 32, 42 32 C 41 31, 41 31, 41 31 C 41 31, 42 30, 42 30 C 43 30, 43 29, 43 28 C 43 26, 42 25, 41 25 C 41 25, 40 25, 40 24 C 40 24, 41 23, 41 23 C 42 23, 43 23, 43 20 C 43 19, 42 18, 40 18 L 27 18 C 27 18, 26 18, 26 17 C 26 17, 26 17, 26 16 C 26 15, 27 13, 27 9 C 26 5, 25 2, 22 2 C 22 2, 21 2, 21 2 Z M 22 0 C 26 0, 28 4, 29 9 C 29 12, 29 14, 28 16 L 40 16 C 43 16, 45 18, 45 20 C 45 22, 44 23, 43 24 C 44 25, 45 26, 45 28 C 45 29, 45 30, 44 31 C 44 32, 45 33, 45 34 C 45 36, 43 38, 41 38 C 42 39, 42 39, 42 40 C 42 43, 40 45, 37 45 C 37 45, 37 45, 37 45 L 1 45 C 0 45, 0 45, 0 44 L 0 23 C 0 23, 0 22, 1 22 L 9 22 C 10 21, 11 19, 13 17 C 15 15, 17 12, 18 9 C 19 8, 18 4, 18 2 C 18 1, 18 1, 18 1 C 18 0, 19 0, 22 0 Z"
  },
  {
    "id": "sp-4",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 89,
    "y": 276,
    "width": 45,
    "height": 45,
    "fillColor": "#3365cc",
    "pathD": "M 5 39 C 6 39, 7 40, 7 40 C 7 41, 6 41, 5 41 C 5 41, 5 41, 5 40 C 5 40, 5 39, 5 39 Z M 2 24 L 2 43 L 9 43 L 9 24 Z M 21 2 C 20 2, 20 2, 20 2 C 20 4, 21 8, 20 10 C 19 13, 16 16, 14 19 C 13 20, 11 22, 11 23 L 11 43 L 37 43 C 37 43, 37 43, 37 43 C 38 43, 40 42, 40 40 C 40 39, 40 39, 39 38 C 39 38, 39 38, 39 37 C 39 37, 40 37, 40 37 C 41 37, 43 35, 43 34 C 43 33, 42 32, 42 32 C 41 31, 41 31, 41 31 C 41 31, 42 30, 42 30 C 43 30, 43 29, 43 28 C 43 26, 42 25, 41 25 C 41 25, 40 25, 40 24 C 40 24, 41 23, 41 23 C 42 23, 43 23, 43 20 C 43 19, 42 18, 40 18 L 27 18 C 27 18, 26 18, 26 17 C 26 17, 26 17, 26 16 C 26 15, 27 13, 27 9 C 26 5, 25 2, 22 2 C 22 2, 21 2, 21 2 Z M 22 0 C 26 0, 28 4, 29 9 C 29 12, 29 14, 28 16 L 40 16 C 43 16, 45 18, 45 20 C 45 22, 44 23, 43 24 C 44 25, 45 26, 45 28 C 45 29, 45 30, 44 31 C 44 32, 45 33, 45 34 C 45 36, 43 38, 41 38 C 42 39, 42 39, 42 40 C 42 43, 40 45, 37 45 C 37 45, 37 45, 37 45 L 1 45 C 0 45, 0 45, 0 44 L 0 23 C 0 23, 0 22, 1 22 L 9 22 C 10 21, 11 19, 13 17 C 15 15, 17 12, 18 9 C 19 8, 18 4, 18 2 C 18 1, 18 1, 18 1 C 18 0, 19 0, 22 0 Z"
  },
  {
    "id": "sp-5",
    "x": 52,
    "y": 168,
    "width": 120,
    "height": 48,
    "text": "Needs & Expectations",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "x": 64,
    "y": 588,
    "width": 95,
    "height": 48,
    "text": "Voice of Customer",
    "textColor": "#3365cc",
    "textSize": 12
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 238,
    "y": 130,
    "width": 80,
    "height": 29,
    "text": "Phase 1",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 500,
    "y": 130,
    "width": 80,
    "height": 29,
    "text": "Phase 2",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 2,
    "x": 761,
    "y": 130,
    "width": 80,
    "height": 29,
    "text": "Phase 3",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 3,
    "x": 1023,
    "y": 130,
    "width": 80,
    "height": 29,
    "text": "Phase 4",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 162,
    "y": 156,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 424,
    "y": 156,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 2,
    "x": 685,
    "y": 156,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 3,
    "x": 946,
    "y": 156,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 4,
    "x": 162,
    "y": 575,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 5,
    "x": 424,
    "y": 575,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 6,
    "x": 685,
    "y": 575,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 7,
    "x": 947,
    "y": 575,
    "width": 233,
    "height": 75,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "x": 196,
    "y": 287,
    "width": 964,
    "height": 223,
    "strokeColor": "#ffffff",
    "pathD": "M 0 223 C 1 224, 105 44, 155 36 C 206 28, 245 178, 305 174 C 364 169, 464 8, 512 6 C 560 5, 548 129, 590 163 C 632 198, 722 228, 763 212 C 804 196, 803 102, 836 66 C 870 31, 965 0, 964 0"
  },
  {
    "id": "sp-20",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 200,
    "y": 472,
    "width": 25,
    "height": 25,
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-21",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 279,
    "y": 359,
    "width": 25,
    "height": 25,
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-22",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 411,
    "y": 374,
    "width": 25,
    "height": 25,
    "fillColor": "#ff4d38",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-23",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 465,
    "y": 440,
    "width": 25,
    "height": 25,
    "fillColor": "#ff4d38",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-24",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 540,
    "y": 421,
    "width": 25,
    "height": 25,
    "fillColor": "#ff4d38",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-25",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 622,
    "y": 336,
    "width": 25,
    "height": 25,
    "fillColor": "#ff4d38",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-26",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 707,
    "y": 284,
    "width": 25,
    "height": 25,
    "fillColor": "#52c49c",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-27",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 751,
    "y": 402,
    "width": 25,
    "height": 25,
    "fillColor": "#52c49c",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-28",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 814,
    "y": 460,
    "width": 25,
    "height": 25,
    "fillColor": "#52c49c",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-29",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 906,
    "y": 491,
    "width": 25,
    "height": 25,
    "fillColor": "#52c49c",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-30",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 971,
    "y": 454,
    "width": 25,
    "height": 25,
    "fillColor": "#ffb900",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-31",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 1012,
    "y": 350,
    "width": 25,
    "height": 25,
    "fillColor": "#ffb900",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-32",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 1130,
    "y": 284,
    "width": 25,
    "height": 25,
    "fillColor": "#ffb900",
    "pathD": "M 13 0 A 13 13 0 1 1 12 0 Z"
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 9,
    "x": 231,
    "y": 474,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 4,
    "x": 440,
    "y": 376,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 7,
    "x": 573,
    "y": 423,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 0,
    "x": 740,
    "y": 286,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 8,
    "x": 784,
    "y": 403,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 11,
    "x": 1008,
    "y": 458,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 5,
    "x": 1046,
    "y": 352,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 2,
    "x": 192,
    "y": 361,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 6,
    "x": 378,
    "y": 443,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 3,
    "x": 539,
    "y": 339,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 10,
    "x": 725,
    "y": 462,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 12,
    "x": 822,
    "y": 495,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 1,
    "x": 1047,
    "y": 287,
    "width": 77,
    "height": 21,
    "text": "Touchpoint",
    "textSize": 10
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

export function Imported2025migsopcubedcreativeandexampletemplates78Template({ data }: { data: BrainData }): ReactElement {
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
