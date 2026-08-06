import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "grp-0",
    "isGroup": true,
    "children": [
      {
        "id": "sp-2",
        "x": 145.49745676500507,
        "y": 129,
        "width": 988.5961342828076,
        "height": 107.86715867158671,
        "localPctX": 0.055951169888097646,
        "localPctY": 0,
        "localPctW": 0.8850457782299084,
        "localPctH": 0.20664206642066418,
        "pathD": "M 494 0 L 988.5961342828076 107.86715867158671 L 0 107.86715867158671 Z"
      },
      {
        "id": "sp-3",
        "x": 478.438453713123,
        "y": 244.5719557195572,
        "width": 322.71414038657167,
        "height": 262.9261992619926,
        "localPctX": 0.3540183112919633,
        "localPctY": 0.22140221402214022,
        "localPctW": 0.288911495422177,
        "localPctH": 0.503690036900369,
        "fillColor": "#52c49c"
      },
      {
        "id": "sp-4",
        "x": 811.379450661241,
        "y": 244.5719557195572,
        "width": 322.71414038657167,
        "height": 262.9261992619926,
        "localPctX": 0.652085452695829,
        "localPctY": 0.22140221402214022,
        "localPctW": 0.288911495422177,
        "localPctH": 0.503690036900369,
        "fillColor": "#ffb900"
      },
      {
        "id": "sp-5",
        "x": 145.49745676500507,
        "y": 244.5719557195572,
        "width": 322.71414038657167,
        "height": 262.9261992619926,
        "localPctX": 0.055951169888097646,
        "localPctY": 0.22140221402214022,
        "localPctW": 0.288911495422177,
        "localPctH": 0.503690036900369,
        "fillColor": "#ff4d38"
      },
      {
        "id": "sp-6",
        "x": 83,
        "y": 515.2029520295202,
        "width": 1117,
        "height": 135.7970479704797,
        "localPctX": 0,
        "localPctY": 0.7398523985239851,
        "localPctW": 1,
        "localPctH": 0.26014760147601473,
        "fillColor": "#ee6d90"
      },
      {
        "id": "sp-7",
        "x": 539.7995930824009,
        "y": 161.74538745387454,
        "width": 199.99186164801625,
        "height": 34.67158671586716,
        "localPctX": 0.4089521871820957,
        "localPctY": 0.06273062730627307,
        "localPctW": 0.1790437436419125,
        "localPctH": 0.06642066420664207,
        "text": "SOCIAL MEDIA",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-8",
        "x": 335.26246185147505,
        "y": 195.4538745387454,
        "width": 610.2024415055951,
        "height": 26.966789667896677,
        "localPctX": 0.22583926754832145,
        "localPctY": 0.12730627306273065,
        "localPctW": 0.5462868769074262,
        "localPctH": 0.051660516605166046,
        "text": "MIGSO-PCUBED content and words to be added here as required",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-9",
        "x": 272.76500508646996,
        "y": 285.0221402214022,
        "width": 69.31536113936927,
        "height": 58.7490774907749,
        "localPctX": 0.16988809766022378,
        "localPctY": 0.29889298892988925,
        "localPctW": 0.06205493387589013,
        "localPctH": 0.1125461254612546,
        "fillColor": "#ffffff",
        "pathD": "M 64 48 L 57 54 L 60 57 C 60 57, 61 57, 62 57 L 67 53 C 67 52, 67 52, 67 52 C 67 51, 67 51, 67 51 L 64 48 Z M 54 40 L 47 46 L 56 53 L 63 47 L 54 40 Z M 26 13 C 27 13, 27 14, 27 14 C 27 15, 27 15, 26 15 C 21 15, 17 18, 17 23 C 17 23, 17 24, 16 24 C 16 24, 15 23, 15 23 C 15 17, 20 13, 26 13 Z M 26 9 C 17 9, 10 15, 10 23 C 10 30, 17 36, 26 36 C 35 36, 42 30, 42 23 C 42 15, 35 9, 26 9 Z M 26 7 C 36 7, 44 14, 44 23 C 44 31, 36 38, 26 38 C 16 38, 8 31, 8 23 C 8 14, 16 7, 26 7 Z M 26 2 C 13 2, 2 11, 2 22 C 2 34, 13 43, 26 43 C 32 43, 36 42, 41 39 C 41 39, 41 39, 41 39 C 41 39, 42 39, 42 39 L 47 44 L 51 40 L 46 36 C 46 35, 46 35, 46 34 C 49 31, 51 27, 51 22 C 51 11, 40 2, 26 2 Z M 26 0 C 41 0, 53 10, 53 22 C 53 27, 51 31, 48 35 L 53 39 L 54 38 C 54 38, 55 38, 55 38 L 68 49 C 70 51, 70 53, 68 54 L 64 58 C 63 58, 62 59, 61 59 C 60 59, 59 58, 58 58 L 45 47 C 45 47, 45 46, 45 46 C 45 46, 45 46, 45 45 L 46 45 L 41 41 C 37 44, 32 45, 26 45 C 12 45, 0 35, 0 22 C 0 10, 12 0, 26 0 Z"
      },
      {
        "id": "sp-10",
        "x": 590.9338758901322,
        "y": 363.99630996309963,
        "width": 97.7232960325534,
        "height": 34.67158671586716,
        "localPctX": 0.45473041709053913,
        "localPctY": 0.45018450184501846,
        "localPctW": 0.08748728382502544,
        "localPctH": 0.06642066420664207,
        "text": "EMAIL",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-11",
        "x": 509.11902339776196,
        "y": 403.48339483394835,
        "width": 261.353001017294,
        "height": 51.04428044280443,
        "localPctX": 0.38148524923702953,
        "localPctY": 0.525830258302583,
        "localPctW": 0.23397761953204477,
        "localPctH": 0.09778597785977859,
        "text": "MIGSO-PCUBED content and words to be added here as required",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-12",
        "x": 244.35707019328584,
        "y": 363.99630996309963,
        "width": 124.99491353001017,
        "height": 34.67158671586716,
        "localPctX": 0.1444557477110885,
        "localPctY": 0.45018450184501846,
        "localPctW": 0.11190233977619532,
        "localPctH": 0.06642066420664207,
        "text": "SEARCH",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-13",
        "x": 176.17802644964394,
        "y": 403.48339483394835,
        "width": 261.353001017294,
        "height": 51.04428044280443,
        "localPctX": 0.08341810783316378,
        "localPctY": 0.525830258302583,
        "localPctW": 0.23397761953204477,
        "localPctH": 0.09778597785977859,
        "text": "MIGSO-PCUBED content and words to be added here as required",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-14",
        "x": 901.1485249237028,
        "y": 363.99630996309963,
        "width": 143.17599186164801,
        "height": 34.67158671586716,
        "localPctX": 0.7324516785350965,
        "localPctY": 0.45018450184501846,
        "localPctW": 0.12817904374364192,
        "localPctH": 0.06642066420664207,
        "text": "ANALYSIS",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-15",
        "x": 842.0600203458798,
        "y": 403.48339483394835,
        "width": 261.353001017294,
        "height": 51.04428044280443,
        "localPctX": 0.6795523906408951,
        "localPctY": 0.525830258302583,
        "localPctW": 0.23397761953204477,
        "localPctH": 0.09778597785977859,
        "text": "MIGSO-PCUBED content and words to be added here as required",
        "textColor": "#ffffff",
        "textSize": 12
      },
      {
        "id": "sp-16",
        "x": 937.5106815869785,
        "y": 285.0221402214022,
        "width": 69.31536113936927,
        "height": 58.7490774907749,
        "localPctX": 0.7650050864699898,
        "localPctY": 0.29889298892988925,
        "localPctW": 0.06205493387589013,
        "localPctH": 0.1125461254612546,
        "fillColor": "#ffffff",
        "pathD": "M 54 34 C 53 44, 43 52, 31 52 C 25 52, 20 50, 16 47 L 11 50 C 16 54, 23 57, 31 57 C 46 57, 59 47, 59 34 L 54 34 Z M 46 34 C 45 40, 39 45, 31 45 C 27 45, 24 44, 21 42 L 17 46 C 21 49, 26 50, 31 50 C 42 50, 51 43, 51 34 L 46 34 Z M 10 16 C 5 20, 2 26, 2 33 C 2 39, 5 45, 10 49 L 19 41 C 17 39, 16 36, 16 33 C 16 30, 17 27, 19 24 L 10 16 Z M 30 8 C 23 9, 16 11, 11 15 L 30 30 L 30 8 Z M 31 7 C 31 7, 32 7, 32 7 L 32 33 C 32 33, 32 33, 31 33 C 31 34, 31 34, 31 34 C 31 34, 30 33, 30 33 L 21 26 C 19 27, 18 30, 18 33 C 18 39, 24 44, 31 44 C 38 44, 44 39, 44 33 C 44 32, 44 32, 45 32 L 61 32 C 61 32, 62 32, 62 33 C 62 47, 48 59, 31 59 C 14 59, 0 47, 0 33 C 0 18, 14 7, 31 7 Z M 40 2 L 40 13 C 47 14, 53 19, 54 25 L 67 25 C 67 12, 55 2, 40 2 Z M 38 0 C 55 0, 69 12, 69 26 C 69 27, 69 27, 68 27 L 53 27 C 52 27, 52 27, 52 26 C 52 20, 46 15, 38 15 C 38 15, 37 15, 37 14 L 37 1 C 37 0, 38 0, 38 0 Z"
      },
      {
        "id": "sp-17",
        "x": 605.706002034588,
        "y": 285.0221402214022,
        "width": 69.31536113936927,
        "height": 58.7490774907749,
        "localPctX": 0.46795523906408953,
        "localPctY": 0.29889298892988925,
        "localPctW": 0.06205493387589013,
        "localPctH": 0.1125461254612546,
        "fillColor": "#ffffff",
        "pathD": "M 35 36 L 4 57 L 65 57 L 35 36 Z M 35 26 L 49 26 C 49 26, 50 26, 50 27 C 50 28, 49 28, 49 28 L 35 28 C 34 28, 34 28, 34 27 C 34 26, 34 26, 35 26 Z M 21 26 L 28 26 C 28 26, 29 26, 29 27 C 29 28, 28 28, 28 28 L 21 28 C 20 28, 20 28, 20 27 C 20 26, 20 26, 21 26 Z M 67 25 L 45 41 L 67 56 L 67 25 Z M 2 25 L 2 56 L 25 41 L 2 25 Z M 42 18 L 49 18 C 49 18, 50 18, 50 19 C 50 19, 49 20, 49 20 L 42 20 C 41 20, 41 19, 41 19 C 41 18, 41 18, 42 18 Z M 21 18 L 35 18 C 35 18, 36 18, 36 19 C 36 19, 35 20, 35 20 L 21 20 C 20 20, 20 19, 20 19 C 20 18, 20 18, 21 18 Z M 57 17 L 57 30 L 67 24 L 57 17 Z M 13 17 L 3 24 L 13 30 L 13 17 Z M 15 11 L 15 32 L 26 40 L 34 34 C 34 34, 35 34, 35 34 L 43 40 L 55 32 L 55 11 L 15 11 Z M 35 2 L 24 9 L 46 9 L 35 2 Z M 34 0 C 34 0, 35 0, 35 0 L 49 9 L 56 9 C 56 9, 57 10, 57 10 L 57 15 L 69 23 C 69 23, 69 23, 69 24 L 69 58 C 69 58, 69 59, 68 59 L 1 59 C 0 59, 0 58, 0 58 L 0 24 C 0 23, 0 23, 0 23 L 13 15 L 13 10 C 13 10, 13 9, 14 9 L 20 9 L 34 0 Z"
      },
      {
        "id": "sp-18",
        "x": 611.3875890132247,
        "y": 529.6494464944649,
        "width": 56.81586978636825,
        "height": 44.30258302583026,
        "localPctX": 0.47304170905391646,
        "localPctY": 0.7675276752767527,
        "localPctW": 0.050864699898270596,
        "localPctH": 0.08487084870848709,
        "fillColor": "#ffffff",
        "pathD": "M 55 12 L 33 12 C 33 12, 33 12, 33 13 L 27 17 L 27 1 L 55 1 L 55 12 Z M 50 21 L 40 21 C 40 19, 40 16, 38 14 L 48 14 C 50 16, 50 19, 50 21 Z M 45 35 L 45 35 C 43 34, 40 33, 38 32 C 39 29, 40 26, 40 23 L 50 23 C 50 28, 48 32, 45 35 Z M 28 43 L 28 43 C 31 41, 34 38, 37 33 C 39 34, 42 35, 44 36 C 40 40, 34 42, 28 43 Z M 27 42 L 27 31 C 30 32, 33 32, 35 33 C 33 37, 29 40, 27 42 Z M 27 23 L 39 23 C 39 26, 37 29, 36 31 C 33 31, 30 30, 27 30 L 27 23 Z M 25 30 L 25 30 C 22 30, 19 31, 16 31 C 15 29, 14 26, 14 23 L 25 23 L 25 30 Z M 25 42 L 25 42 C 23 40, 20 37, 17 33 C 20 32, 22 32, 25 31 L 25 42 Z M 8 36 L 8 36 C 10 35, 13 34, 15 33 C 18 38, 22 41, 24 43 C 18 42, 12 40, 8 36 Z M 7 35 L 7 35 C 4 32, 2 28, 2 23 L 12 23 C 12 26, 13 29, 14 32 C 12 33, 9 34, 7 35 Z M 7 9 L 7 9 C 9 10, 12 12, 14 12 C 13 15, 12 18, 12 21 L 2 21 C 2 17, 4 12, 7 9 Z M 56 0 L 26 0 C 26 0, 25 0, 25 1 L 25 19 C 25 19, 25 19, 26 19 C 26 19, 26 19, 26 19 C 26 19, 27 19, 27 19 L 34 14 L 36 14 C 38 16, 39 19, 39 21 L 14 21 C 14 18, 15 16, 16 13 C 18 14, 20 14, 23 14 L 23 14 C 23 14, 23 14, 24 14 C 24 13, 23 13, 23 13 C 21 12, 19 12, 17 12 C 19 8, 21 6, 23 4 C 24 4, 24 3, 23 3 C 23 3, 22 3, 22 3 C 20 5, 17 8, 15 11 C 13 10, 10 9, 8 8 C 11 5, 16 3, 20 2 C 21 2, 21 2, 21 1 C 21 1, 20 1, 20 1 C 8 3, 0 12, 0 22 C 0 34, 12 44, 26 44 C 40 44, 52 34, 52 22 C 52 19, 51 16, 50 14 L 56 14 C 56 14, 57 14, 57 13 L 57 1 C 57 0, 56 0, 56 0 Z"
      },
      {
        "id": "sp-19",
        "x": 539.7995930824009,
        "y": 580.6937269372694,
        "width": 199.99186164801625,
        "height": 34.67158671586716,
        "localPctX": 0.4089521871820957,
        "localPctY": 0.8653136531365314,
        "localPctW": 0.1790437436419125,
        "localPctH": 0.06642066420664207,
        "text": "SOCIAL MEDIA",
        "textColor": "#ffffff",
        "textSize": 16
      },
      {
        "id": "sp-20",
        "x": 120.49847405900303,
        "y": 614.4022140221402,
        "width": 1039.730417090539,
        "height": 26.966789667896677,
        "localPctX": 0.033570701932858577,
        "localPctY": 0.929889298892989,
        "localPctW": 0.9308240081383519,
        "localPctH": 0.051660516605166046,
        "text": "MIGSO-PCUBED content and words to be added here as required",
        "textColor": "#ffffff",
        "textSize": 12
      }
    ],
    "x": 83,
    "y": 129,
    "width": 1117,
    "height": 522
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

export function Imported2025migsopcubedcreativeandexampletemplates190Template({ data }: { data: BrainData }): ReactElement {
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
