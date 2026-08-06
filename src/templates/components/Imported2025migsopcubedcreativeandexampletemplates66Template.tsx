import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PPTX_EXTRACTED_SHAPES = [
  {
    "id": "sp-0",
    "x": 591,
    "y": 294,
    "width": 98,
    "height": 81,
    "text": "VS",
    "textColor": "#3365cc",
    "textSize": 44
  },
  {
    "id": "grp-1",
    "isGroup": true,
    "children": [
      {
        "id": "sp-17",
        "x": 209.5114854517611,
        "y": 192.4622222222222,
        "width": 314.48085758039815,
        "height": 282.0814814814815,
        "localPctX": 0.02297090352220521,
        "localPctY": 0.07555555555555551,
        "localPctW": 0.9617151607963246,
        "localPctH": 0.837037037037037,
        "fillColor": "#ffffff",
        "pathD": "M 231 220 L 231 220 C 224 233, 204 244, 189 244 L 126 244 L 126 244 C 110 244, 91 233, 83 220 L 52 166 L 52 166 C 44 152, 44 130, 52 117 L 83 62 L 83 62 C 91 49, 110 38, 126 38 L 189 38 L 189 38 C 204 38, 224 49, 231 62 L 263 117 L 263 117 C 271 130, 271 152, 263 166 L 231 220 Z M 253 25 L 253 25 C 245 11, 226 0, 211 0 L 104 0 L 104 0 C 88 0, 69 11, 61 25 L 8 117 L 8 117 C 0 130, 0 152, 8 166 L 61 258 L 61 258 C 69 271, 88 282, 104 282 L 211 282 L 211 282 C 226 282, 245 271, 253 258 L 307 166 L 307 166 C 314 152, 314 130, 307 117 L 253 25 Z"
      },
      {
        "id": "sp-18",
        "x": 209.5114854517611,
        "y": 172.49185185185183,
        "width": 314.48085758039815,
        "height": 322.0222222222222,
        "localPctX": 0.02297090352220521,
        "localPctY": 0.016296296296296243,
        "localPctW": 0.9617151607963246,
        "localPctH": 0.9555555555555555,
        "fillColor": "#3365cc"
      },
      {
        "id": "sp-19",
        "x": 202,
        "y": 167,
        "width": 326.99999999999994,
        "height": 337,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.9999999999999998,
        "localPctH": 1,
        "pathD": "M 132 64 L 195 64 C 210 64, 229 75, 237 88 L 269 143 C 277 156, 277 178, 269 192 L 237 246 C 229 260, 210 271, 195 271 L 132 271 C 116 271, 97 260, 89 246 L 58 192 C 50 178, 50 156, 58 143 L 89 88 C 97 75, 116 64, 132 64 Z M 110 26 C 94 26, 75 37, 67 51 L 14 143 C 6 156, 6 178, 14 192 L 67 284 C 75 297, 94 308, 110 308 L 216 308 C 232 308, 251 297, 259 284 L 312 192 C 320 178, 320 156, 312 143 L 259 51 C 251 37, 232 26, 216 26 Z M 0 0 L 327 0 L 327 337 L 0 337 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 202,
    "y": 167,
    "width": 327,
    "height": 337
  },
  {
    "id": "grp-5",
    "isGroup": true,
    "children": [
      {
        "id": "sp-20",
        "x": 759.511485451761,
        "y": 192.4622222222222,
        "width": 314.48085758039815,
        "height": 282.0814814814815,
        "localPctX": 0.02297090352220495,
        "localPctY": 0.07555555555555551,
        "localPctW": 0.9617151607963246,
        "localPctH": 0.837037037037037,
        "fillColor": "#ffffff",
        "pathD": "M 231 220 L 231 220 C 224 233, 204 244, 189 244 L 126 244 L 126 244 C 110 244, 91 233, 83 220 L 52 166 L 52 166 C 44 152, 44 130, 52 117 L 83 62 L 83 62 C 91 49, 110 38, 126 38 L 189 38 L 189 38 C 204 38, 224 49, 231 62 L 263 117 L 263 117 C 271 130, 271 152, 263 166 L 231 220 Z M 253 25 L 253 25 C 245 11, 226 0, 211 0 L 104 0 L 104 0 C 88 0, 69 11, 61 25 L 8 117 L 8 117 C 0 130, 0 152, 8 166 L 61 258 L 61 258 C 69 271, 88 282, 104 282 L 211 282 L 211 282 C 226 282, 245 271, 253 258 L 307 166 L 307 166 C 314 152, 314 130, 307 117 L 253 25 Z"
      },
      {
        "id": "sp-21",
        "x": 759.511485451761,
        "y": 172.49185185185183,
        "width": 314.48085758039815,
        "height": 322.0222222222222,
        "localPctX": 0.02297090352220495,
        "localPctY": 0.016296296296296243,
        "localPctW": 0.9617151607963246,
        "localPctH": 0.9555555555555555,
        "fillColor": "#52c49c"
      },
      {
        "id": "sp-22",
        "x": 752,
        "y": 167,
        "width": 326.99999999999994,
        "height": 337,
        "localPctX": 0,
        "localPctY": 0,
        "localPctW": 0.9999999999999998,
        "localPctH": 1,
        "pathD": "M 132 64 L 195 64 C 210 64, 229 75, 237 88 L 269 143 C 277 156, 277 178, 269 192 L 237 246 C 229 260, 210 271, 195 271 L 132 271 C 116 271, 97 260, 89 246 L 58 192 C 50 178, 50 156, 58 143 L 89 88 C 97 75, 116 64, 132 64 Z M 110 26 C 94 26, 75 37, 67 51 L 14 143 C 6 156, 6 178, 14 192 L 67 284 C 75 297, 94 308, 110 308 L 216 308 C 232 308, 251 297, 259 284 L 312 192 C 320 178, 320 156, 312 143 L 259 51 C 251 37, 232 26, 216 26 Z M 0 0 L 327 0 L 327 337 L 0 337 Z"
      }
    ],
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 752,
    "y": 167,
    "width": 327,
    "height": 337
  },
  {
    "id": "sp-1",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 335,
    "y": 265,
    "width": 60,
    "height": 71,
    "fillColor": "#3365cc",
    "pathD": "M 58 64 C 55 64, 53 66, 53 69 L 58 69 L 58 64 Z M 2 64 L 2 69 L 7 69 C 7 66, 5 64, 2 64 Z M 45 55 C 44 55, 43 56, 43 57 L 43 57 C 43 59, 44 60, 45 60 L 45 60 C 47 60, 48 59, 48 57 L 48 57 C 48 56, 47 55, 45 55 L 45 55 Z M 15 55 C 14 55, 13 56, 13 57 L 13 57 C 13 59, 14 60, 15 60 L 16 60 C 17 60, 18 59, 18 57 L 18 57 C 18 56, 17 55, 16 55 L 15 55 Z M 45 53 L 45 53 C 48 53, 50 54, 50 57 L 50 57 C 50 60, 48 62, 45 62 L 45 62 C 42 62, 41 60, 41 57 L 41 57 C 41 54, 42 53, 45 53 Z M 15 53 L 16 53 C 18 53, 20 54, 20 57 L 20 57 C 20 60, 18 62, 16 62 L 15 62 C 13 62, 11 60, 11 57 L 11 57 C 11 54, 13 53, 15 53 Z M 30 47 C 31 47, 31 48, 31 48 L 31 49 C 33 50, 35 52, 35 54 C 35 54, 35 55, 34 55 C 33 55, 33 54, 33 54 C 33 53, 32 51, 30 51 C 29 51, 28 53, 28 54 C 28 55, 28 56, 30 56 C 34 56, 35 58, 35 61 C 35 63, 33 64, 31 65 L 31 66 C 31 66, 31 67, 30 67 C 30 67, 29 66, 29 66 L 29 65 C 27 64, 25 63, 25 61 C 25 60, 26 60, 27 60 C 27 60, 28 60, 28 61 C 28 62, 29 63, 30 63 C 32 63, 33 62, 33 61 C 33 59, 32 58, 30 58 C 27 58, 25 56, 25 54 C 25 52, 27 50, 29 49 L 29 48 C 29 48, 30 47, 30 47 Z M 53 45 C 53 48, 55 50, 58 50 L 58 45 L 53 45 Z M 10 45 C 9 49, 6 52, 2 53 L 2 61 C 6 62, 9 65, 10 69 L 50 69 C 51 65, 54 62, 58 61 L 58 53 C 54 52, 51 49, 50 45 L 10 45 Z M 2 45 L 2 50 C 5 50, 7 48, 7 45 L 2 45 Z M 47 12 C 45 14, 41 20, 42 25 C 42 27, 44 29, 46 30 L 46 20 C 46 20, 46 19, 47 19 C 48 19, 48 20, 48 20 L 48 30 C 51 29, 52 27, 52 25 C 53 20, 49 14, 47 12 Z M 46 10 C 47 10, 47 10, 48 10 C 48 10, 56 18, 54 25 C 54 29, 52 31, 48 33 L 48 35 C 48 37, 46 39, 44 39 L 33 39 C 32 39, 31 40, 31 41 L 31 43 L 58 43 C 59 43, 60 44, 60 45 L 60 69 C 60 70, 59 71, 58 71 L 2 71 C 1 71, 0 70, 0 69 L 0 45 C 0 44, 1 43, 2 43 L 29 43 L 29 41 C 29 39, 31 37, 33 37 L 44 37 C 45 37, 46 36, 46 35 L 46 33 C 42 31, 40 29, 40 25 C 38 18, 46 10, 46 10 Z M 11 6 C 9 8, 5 14, 6 19 C 6 21, 7 23, 10 24 L 10 14 C 10 14, 10 13, 11 13 C 11 13, 12 14, 12 14 L 12 24 C 14 23, 16 21, 16 19 C 17 14, 13 8, 11 6 Z M 10 4 C 10 3, 11 3, 12 4 C 12 4, 20 12, 18 19 C 18 22, 16 25, 12 27 L 12 29 C 12 30, 13 31, 14 31 L 27 31 C 29 31, 31 33, 31 35 C 31 36, 31 36, 30 36 C 30 36, 29 36, 29 35 C 29 34, 28 33, 27 33 L 14 33 C 12 33, 10 31, 10 29 L 10 27 C 6 25, 4 22, 4 19 C 2 12, 10 4, 10 4 Z M 30 3 C 28 5, 24 11, 25 16 C 25 18, 27 19, 29 21 L 29 11 C 29 10, 29 10, 30 10 C 31 10, 31 10, 31 11 L 31 21 C 33 19, 35 18, 35 16 C 36 10, 32 5, 30 3 Z M 29 0 C 30 0, 30 0, 31 0 C 31 1, 39 9, 37 16 C 37 19, 35 21, 31 23 L 31 28 C 31 29, 31 29, 30 29 C 29 29, 29 29, 29 28 L 29 23 C 25 21, 23 19, 23 16 C 21 9, 29 1, 29 0 Z"
  },
  {
    "id": "sp-2",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 887,
    "y": 265,
    "width": 58,
    "height": 71,
    "fillColor": "#52c49c",
    "pathD": "M 36 65 C 36 65, 37 65, 37 66 C 37 66, 36 67, 36 67 C 35 67, 35 66, 35 66 C 35 65, 35 65, 36 65 Z M 25 65 C 26 65, 26 65, 26 66 C 26 66, 26 67, 25 67 C 24 67, 24 66, 24 66 C 24 65, 24 65, 25 65 Z M 14 65 C 15 65, 15 65, 15 66 C 15 66, 15 67, 14 67 C 13 67, 13 66, 13 66 C 13 65, 13 65, 14 65 Z M 38 29 C 36 29, 34 29, 33 31 C 32 32, 31 34, 31 36 C 31 37, 32 39, 33 40 C 34 42, 36 42, 38 42 C 40 42, 41 42, 43 40 C 45 38, 45 33, 43 31 C 41 29, 40 29, 38 29 Z M 50 22 L 44 29 C 46 31, 47 33, 47 35 L 56 35 C 56 30, 53 25, 50 22 Z M 39 18 L 39 27 C 40 27, 41 27, 43 28 L 48 21 C 45 19, 42 18, 39 18 Z M 37 18 C 27 18, 20 26, 20 36 L 20 58 L 26 50 C 26 50, 26 50, 26 50 C 27 50, 27 50, 27 50 C 30 52, 34 53, 38 53 C 47 53, 55 46, 56 37 L 47 37 C 47 39, 46 40, 44 42 C 43 44, 40 45, 38 45 C 36 45, 35 44, 33 43 L 30 48 C 30 48, 30 48, 29 48 C 29 48, 29 48, 28 48 C 28 48, 28 47, 28 47 L 32 42 C 32 42, 31 42, 31 42 C 30 40, 29 38, 29 36 C 29 33, 30 31, 31 29 C 33 28, 35 27, 37 27 L 37 18 Z M 2 11 L 2 60 L 12 60 C 13 60, 13 61, 13 61 C 13 62, 13 62, 12 62 L 2 62 L 2 65 C 2 67, 4 69, 6 69 L 43 69 C 46 69, 48 67, 48 65 L 48 62 L 26 62 C 26 62, 25 62, 25 61 C 25 61, 26 60, 26 60 L 48 60 L 48 53 C 45 55, 41 56, 38 56 C 34 56, 30 55, 27 52 L 20 62 C 19 62, 19 62, 19 62 C 19 62, 18 62, 18 62 C 18 62, 18 62, 18 61 L 18 36 C 18 25, 27 16, 38 16 C 41 16, 45 17, 48 18 L 48 11 L 2 11 Z M 29 5 C 30 4, 30 4, 31 5 C 31 5, 31 5, 31 6 C 31 6, 31 6, 31 6 C 31 7, 30 7, 30 7 C 30 7, 30 7, 29 6 C 29 6, 29 6, 29 6 C 29 5, 29 5, 29 5 Z M 18 5 C 19 4, 20 4, 20 5 C 20 5, 20 5, 20 6 C 20 6, 20 6, 20 6 C 20 7, 20 7, 19 7 C 19 7, 19 7, 18 6 C 18 6, 18 6, 18 6 C 18 5, 18 5, 18 5 Z M 25 4 C 26 4, 26 5, 26 6 C 26 6, 26 7, 25 7 C 24 7, 24 6, 24 6 C 24 5, 24 4, 25 4 Z M 6 2 C 4 2, 2 4, 2 6 L 2 9 L 48 9 L 48 6 C 48 4, 46 2, 43 2 L 6 2 Z M 6 0 L 43 0 C 47 0, 50 3, 50 6 L 50 20 C 55 23, 58 29, 58 36 C 58 42, 55 48, 50 52 L 50 65 C 50 68, 47 71, 43 71 L 6 71 C 3 71, 0 68, 0 65 L 0 6 C 0 3, 3 0, 6 0 Z"
  },
  {
    "id": "sp-3",
    "isColorNode": true,
    "dataNodeIdx": 0,
    "x": 209,
    "y": 510,
    "width": 247,
    "height": 26,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 237 0 Q 247 0 247 10 L 247 16 Q 247 26 237 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-4",
    "dataNodeIdx": 2,
    "x": 208,
    "y": 510,
    "width": 106,
    "height": 26,
    "fillColor": "#3365cc",
    "pathD": "M 10 0 L 96 0 Q 106 0 106 10 L 106 16 Q 106 26 96 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-5",
    "isColorNode": true,
    "dataNodeIdx": 1,
    "x": 761,
    "y": 510,
    "width": 245,
    "height": 26,
    "fillColor": "#ffffff",
    "pathD": "M 10 0 L 235 0 Q 245 0 245 10 L 245 16 Q 245 26 235 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-6",
    "x": 760,
    "y": 510,
    "width": 212,
    "height": 26,
    "fillColor": "#52c49c",
    "pathD": "M 10 0 L 202 0 Q 212 0 212 10 L 212 16 Q 212 26 202 26 L 10 26 Q 0 26 0 16 L 0 10 Q 0 0 10 0 Z"
  },
  {
    "id": "sp-7",
    "dataNodeIdx": 0,
    "x": 315,
    "y": 354,
    "width": 100,
    "height": 58,
    "text": "95%",
    "textColor": "#3365cc",
    "textSize": 30
  },
  {
    "id": "sp-8",
    "dataNodeIdx": 1,
    "x": 865,
    "y": 354,
    "width": 100,
    "height": 58,
    "text": "50%",
    "textColor": "#52c49c",
    "textSize": 30
  },
  {
    "id": "sp-9",
    "dataNodeIdx": 0,
    "x": 467,
    "y": 505,
    "width": 62,
    "height": 36,
    "text": "25%",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-10",
    "dataNodeIdx": 1,
    "x": 1017,
    "y": 505,
    "width": 62,
    "height": 36,
    "text": "90%",
    "textColor": "#52c49c",
    "textSize": 16
  },
  {
    "id": "sp-11",
    "dataNodeIdx": 0,
    "x": 202,
    "y": 553,
    "width": 321,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-12",
    "dataNodeIdx": 1,
    "x": 754,
    "y": 553,
    "width": 321,
    "height": 58,
    "text": "MIGSO-PCUBED content and words to be added here as required",
    "textSize": 12
  },
  {
    "id": "sp-13",
    "dataNodeIdx": 0,
    "x": 310,
    "y": 138,
    "width": 111,
    "height": 36,
    "text": "Brand 01",
    "textColor": "#3365cc",
    "textSize": 16
  },
  {
    "id": "sp-14",
    "dataNodeIdx": 1,
    "x": 860,
    "y": 138,
    "width": 111,
    "height": 36,
    "text": "Brand 02",
    "textColor": "#3365cc",
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

export function Imported2025migsopcubedcreativeandexampletemplates66Template({ data }: { data: BrainData }): ReactElement {
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
