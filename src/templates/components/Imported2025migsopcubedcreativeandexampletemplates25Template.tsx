import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-54",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 80,
    "y": 143,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-55",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 80,
    "y": 201,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-56",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 80,
    "y": 239,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-57",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 80,
    "y": 276,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-58",
    "isColorNode": true,
    "dataNodeIdx": 4,
    "x": 80,
    "y": 314,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-59",
    "isColorNode": true,
    "dataNodeIdx": 5,
    "x": 80,
    "y": 352,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-60",
    "isColorNode": true,
    "dataNodeIdx": 6,
    "x": 80,
    "y": 390,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-61",
    "isColorNode": true,
    "dataNodeIdx": 7,
    "x": 80,
    "y": 428,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-62",
    "isColorNode": true,
    "dataNodeIdx": 8,
    "x": 80,
    "y": 465,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-63",
    "isColorNode": true,
    "dataNodeIdx": 9,
    "x": 80,
    "y": 503,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-64",
    "isColorNode": true,
    "dataNodeIdx": 10,
    "x": 80,
    "y": 541,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-65",
    "isColorNode": true,
    "dataNodeIdx": 11,
    "x": 80,
    "y": 579,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-66",
    "isColorNode": true,
    "dataNodeIdx": 12,
    "x": 80,
    "y": 617,
    "width": 1120,
    "height": 10,
    "strokeColor": "#ffffff"
  },
  {
    "id": "sp-0",
    "dataNodeIdx": 0,
    "x": 132,
    "y": 208,
    "width": 158,
    "height": 24,
    "text": "Staff Costs (Internal)",
    "textSize": 12
  },
  {
    "id": "sp-1",
    "dataNodeIdx": 2,
    "x": 1028,
    "y": 208,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-2",
    "dataNodeIdx": 0,
    "x": 456,
    "y": 208,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-3",
    "dataNodeIdx": 1,
    "x": 742,
    "y": 208,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 0,
    "x": 167,
    "y": 510,
    "width": 87,
    "height": 24,
    "text": "Equipment",
    "textSize": 12
  },
  {
    "id": "sp-5",
    "dataNodeIdx": 19,
    "x": 171,
    "y": 434,
    "width": 79,
    "height": 24,
    "text": "Hardware",
    "textSize": 12
  },
  {
    "id": "sp-6",
    "dataNodeIdx": 1,
    "x": 129,
    "y": 359,
    "width": 165,
    "height": 24,
    "text": "Advertising Expenses",
    "textSize": 12
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 2,
    "x": 146,
    "y": 321,
    "width": 129,
    "height": 24,
    "text": "Travel Expenses",
    "textSize": 12
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 6,
    "x": 177,
    "y": 283,
    "width": 68,
    "height": 24,
    "text": "Material",
    "textSize": 12
  },
  {
    "id": "sp-9",
    "x": 138,
    "y": 245,
    "width": 146,
    "height": 24,
    "text": "Services (External)",
    "textSize": 12
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 3,
    "x": 140,
    "y": 472,
    "width": 141,
    "height": 24,
    "text": "Software/Licenses",
    "textSize": 12
  },
  {
    "id": "sp-11",
    "x": 189,
    "y": 397,
    "width": 44,
    "height": 24,
    "text": "Rent",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 163,
    "y": 548,
    "width": 96,
    "height": 24,
    "text": "Other Costs",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 26,
    "x": 456,
    "y": 510,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 20,
    "x": 456,
    "y": 434,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-15",
    "dataNodeIdx": 13,
    "x": 456,
    "y": 359,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-16",
    "dataNodeIdx": 10,
    "x": 456,
    "y": 321,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-17",
    "dataNodeIdx": 7,
    "x": 456,
    "y": 283,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-18",
    "dataNodeIdx": 3,
    "x": 456,
    "y": 245,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-19",
    "dataNodeIdx": 23,
    "x": 456,
    "y": 472,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-20",
    "dataNodeIdx": 16,
    "x": 456,
    "y": 397,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-21",
    "dataNodeIdx": 29,
    "x": 456,
    "y": 548,
    "width": 81,
    "height": 24,
    "text": "£5,000.00",
    "textSize": 12
  },
  {
    "id": "sp-22",
    "dataNodeIdx": 27,
    "x": 742,
    "y": 510,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-23",
    "dataNodeIdx": 21,
    "x": 742,
    "y": 434,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-24",
    "dataNodeIdx": 14,
    "x": 742,
    "y": 359,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-25",
    "dataNodeIdx": 11,
    "x": 742,
    "y": 321,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-26",
    "dataNodeIdx": 8,
    "x": 742,
    "y": 283,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-27",
    "dataNodeIdx": 4,
    "x": 742,
    "y": 245,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-28",
    "dataNodeIdx": 24,
    "x": 742,
    "y": 472,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-29",
    "dataNodeIdx": 17,
    "x": 742,
    "y": 397,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-30",
    "dataNodeIdx": 30,
    "x": 742,
    "y": 548,
    "width": 81,
    "height": 24,
    "text": "£3,000.00",
    "textSize": 12
  },
  {
    "id": "sp-31",
    "dataNodeIdx": 28,
    "x": 1028,
    "y": 510,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-32",
    "dataNodeIdx": 22,
    "x": 1028,
    "y": 434,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-33",
    "dataNodeIdx": 15,
    "x": 1028,
    "y": 359,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-34",
    "dataNodeIdx": 12,
    "x": 1028,
    "y": 321,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-35",
    "dataNodeIdx": 9,
    "x": 1028,
    "y": 283,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-36",
    "dataNodeIdx": 5,
    "x": 1028,
    "y": 245,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-37",
    "dataNodeIdx": 25,
    "x": 1028,
    "y": 472,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-38",
    "dataNodeIdx": 18,
    "x": 1028,
    "y": 397,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-39",
    "dataNodeIdx": 31,
    "x": 1028,
    "y": 548,
    "width": 81,
    "height": 24,
    "text": "£2,000.00",
    "textSize": 12
  },
  {
    "id": "sp-40",
    "dataNodeIdx": 0,
    "x": 429,
    "y": 154,
    "width": 136,
    "height": 36,
    "text": "Planned (£)",
    "textColor": "#ff4d38",
    "textSize": 16
  },
  {
    "id": "sp-41",
    "dataNodeIdx": 0,
    "x": 152,
    "y": 154,
    "width": 118,
    "height": 36,
    "text": "Cost type",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-42",
    "dataNodeIdx": 1,
    "x": 724,
    "y": 154,
    "width": 118,
    "height": 36,
    "text": "Actual (£)",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-43",
    "dataNodeIdx": 1,
    "x": 999,
    "y": 154,
    "width": 140,
    "height": 36,
    "text": "Variance (£)",
    "textColor": "#ffb900",
    "textSize": 16
  },
  {
    "id": "sp-44",
    "dataNodeIdx": 4,
    "x": 145,
    "y": 580,
    "width": 132,
    "height": 36,
    "text": "Total costs",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-45",
    "dataNodeIdx": 2,
    "x": 433,
    "y": 580,
    "width": 127,
    "height": 36,
    "text": "£50,000.00",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-46",
    "dataNodeIdx": 3,
    "x": 719,
    "y": 580,
    "width": 127,
    "height": 36,
    "text": "£30,000.00",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-47",
    "dataNodeIdx": 4,
    "x": 1006,
    "y": 580,
    "width": 127,
    "height": 36,
    "text": "£20,000.00",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-48",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 168,
    "y": 140,
    "width": 94,
    "height": 10
  },
  {
    "id": "sp-49",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 450,
    "y": 140,
    "width": 94,
    "height": 10,
    "fillColor": "#ff4d38"
  },
  {
    "id": "sp-50",
    "isColorNode": true,
    "dataNodeIdx": 2,
    "x": 736,
    "y": 140,
    "width": 94,
    "height": 10,
    "fillColor": "#52c49c"
  },
  {
    "id": "sp-51",
    "isColorNode": true,
    "dataNodeIdx": 3,
    "x": 1022,
    "y": 140,
    "width": 94,
    "height": 10,
    "fillColor": "#ffb900"
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

export function Imported2025migsopcubedcreativeandexampletemplates25Template({ data }: { data: BrainData }): ReactElement {
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
