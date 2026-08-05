import { useRef, type ReactElement } from "react"
import type { BrainData } from "../types"
import { useTemplateDragResize } from "../shared/useTemplateDragResize"
import { useTemplateStore } from "../store"
import { TEMPLATE_ICONS } from "../shared/icons"
import { MIGSO_PALETTE } from "../../lib/theme"
import * as LucideIcons from "lucide-react"
import { buildSectorPath, getRingPoint, equalAreaBoundaries, RING_GAP_WIDTH, OUTER_CONTOUR, INNER_CONTOUR } from "../shared/ringGeometry"

const BRAIN2_INNER_CONTOUR: readonly (readonly [number, number])[] = [[63.58, 167.64], [62.90, 166.58], [62.24, 165.52], [61.61, 164.45], [61.00, 163.36], [60.42, 162.27], [59.86, 161.18], [59.33, 160.07], [58.83, 158.96], [58.35, 157.84], [57.90, 156.72], [57.47, 155.59], [57.07, 154.46], [56.70, 153.33], [56.35, 152.20], [56.03, 151.06], [55.73, 149.93], [55.45, 148.79], [55.20, 147.65], [54.98, 146.52], [54.78, 145.39], [54.60, 144.26], [54.45, 143.13], [54.32, 142.01], [54.21, 140.89], [54.13, 139.77], [54.06, 138.67], [54.02, 137.56], [54.00, 136.46], [54.00, 135.37], [54.03, 134.29], [54.07, 133.21], [54.13, 132.15], [54.21, 131.09], [54.31, 130.03], [54.43, 128.99], [54.57, 127.96], [54.73, 126.94], [54.90, 125.92], [55.09, 124.92], [55.29, 123.93], [55.52, 122.94], [55.75, 121.97], [56.01, 121.01], [56.27, 120.06], [56.55, 119.13], [56.85, 118.20], [57.16, 117.29], [57.48, 116.39], [57.82, 115.50], [58.16, 114.62], [58.52, 113.76], [58.89, 112.90], [59.27, 112.06], [59.66, 111.23], [60.06, 110.42], [60.47, 109.62], [60.89, 108.83], [61.32, 108.05], [61.76, 107.29], [62.21, 106.53], [62.66, 105.79], [63.12, 105.07], [63.59, 104.35], [64.07, 103.65], [64.55, 102.96], [65.04, 102.28], [65.54, 101.62], [66.04, 100.96], [66.55, 100.32], [67.06, 99.69], [67.58, 99.08], [68.10, 98.47], [68.63, 97.88], [69.16, 97.29], [69.69, 96.72], [70.23, 96.16], [70.77, 95.62], [71.32, 95.08], [71.87, 94.55], [72.42, 94.04], [72.98, 93.53], [73.54, 93.04], [74.10, 92.56], [74.66, 92.09], [75.23, 91.62], [75.80, 91.17], [76.37, 90.73], [76.94, 90.30], [77.51, 89.87], [78.09, 89.46], [78.67, 89.06], [79.24, 88.67], [79.82, 88.28], [80.41, 87.91], [80.99, 87.54], [81.57, 87.18], [82.16, 86.83], [82.75, 86.50], [83.33, 86.16], [83.92, 85.84], [84.51, 85.53], [85.10, 85.22], [85.69, 84.93], [86.29, 84.64], [86.88, 84.36], [87.47, 84.08], [88.07, 83.82], [88.66, 83.56], [89.26, 83.31], [89.85, 83.07], [90.45, 82.83], [91.05, 82.61], [91.65, 82.39], [92.24, 82.17], [92.84, 81.97], [93.44, 81.77], [94.05, 81.58], [94.65, 81.40], [95.25, 81.22], [95.85, 81.05], [96.45, 80.89], [97.06, 80.73], [97.66, 80.58], [98.27, 80.44], [98.88, 80.30], [99.48, 80.18], [100.09, 80.05], [100.70, 79.94], [101.31, 79.83], [101.92, 79.73], [102.53, 79.63], [103.14, 79.54], [103.75, 79.46], [104.37, 79.39], [104.98, 79.32], [105.60, 79.26], [106.21, 79.20], [106.83, 79.15], [107.45, 79.11], [108.07, 79.08], [108.69, 79.05], [109.31, 79.02], [109.94, 79.01], [110.56, 79.00], [111.19, 79.00], [111.81, 79.01], [112.44, 79.02], [113.07, 79.04], [113.70, 79.06], [114.33, 79.10], [114.97, 79.14], [115.60, 79.19], [116.24, 79.24], [116.88, 79.30], [117.51, 79.37], [118.15, 79.45], [118.80, 79.54], [119.44, 79.63], [120.08, 79.73], [120.73, 79.84], [121.38, 79.95], [122.03, 80.08], [122.68, 80.21], [123.33, 80.35], [123.98, 80.50], [124.64, 80.66], [125.29, 80.82], [125.95, 81.00], [126.61, 81.18], [127.27, 81.37], [127.93, 81.57], [128.59, 81.78], [129.25, 82.00], [129.92, 82.23], [130.58, 82.47], [131.25, 82.72], [131.92, 82.98], [132.58, 83.24], [133.25, 83.52], [133.92, 83.81], [134.59, 84.11], [135.26, 84.42], [135.93, 84.74], [136.60, 85.07], [137.27, 85.42], [137.94, 85.77], [138.62, 86.14], [139.29, 86.51], [139.96, 86.90], [140.62, 87.30], [141.29, 87.72], [141.96, 88.14], [142.63, 88.58], [143.29, 89.03], [143.96, 89.49], [144.62, 89.97], [145.28, 90.46], [145.93, 90.96], [146.59, 91.48], [147.24, 92.00], [147.89, 92.55], [148.54, 93.10], [149.18, 93.67], [149.82, 94.26], [150.45, 94.86], [151.08, 95.47], [151.70, 96.10], [152.32, 96.74], [152.94, 97.40], [153.55, 98.07], [154.15, 98.75], [154.74, 99.45], [155.33, 100.17], [155.91, 100.90], [156.49, 101.65], [157.05, 102.41], [157.61, 103.18], [158.15, 103.97], [158.69, 104.78], [159.22, 105.60], [159.73, 106.44], [160.24, 107.29], [160.74, 108.15], [161.22, 109.03], [161.69, 109.93], [162.15, 110.84], [162.59, 111.76], [163.02, 112.70], [163.44, 113.65], [163.84, 114.62], [164.22, 115.60], [164.59, 116.59], [164.95, 117.60], [165.29, 118.62], [165.61, 119.65], [165.91, 120.70], [166.19, 121.76], [166.46, 122.83], [166.70, 123.91], [166.93, 125.00], [167.13, 126.10], [167.32, 127.21], [167.48, 128.34], [167.62, 129.47], [167.74, 130.61], [167.84, 131.76], [167.92, 132.92], [167.97, 134.08], [168.00, 135.25], [168.00, 136.43], [167.98, 137.62], [167.93, 138.81], [167.86, 140.00], [167.76, 141.20], [167.64, 142.40], [167.49, 143.60], [167.32, 144.81], [167.11, 146.01], [166.88, 147.22], [166.63, 148.43], [166.35, 149.64], [166.03, 150.84], [165.70, 152.04], [165.33, 153.24], [164.94, 154.44], [164.51, 155.63], [164.06, 156.81], [163.59, 157.99], [163.08, 159.17], [162.55, 160.33], [161.98, 161.49], [161.39, 162.63], [160.78, 163.77], [160.13, 164.90], [159.46, 166.01], [158.76, 167.11], [158.03, 168.20], [157.28, 169.27], [156.50, 170.33], [155.69, 171.38]];

// Exact SVG Path extracted directly from dessin-2.svg (Inkscape)
const HEAD_PATH_EXACT = "M 93.79914,195.23832 C 94.20517,194.19898 96.92735,184.77713 97.64045,181.94301 C 99.98678,172.61776 100.89778,165.10145 99.91261,163.19634 C 99.00839,161.44777 97.58249,161.22470 90.18105,161.67396 C 85.65560,161.94864 84.26933,161.70606 83.21674,160.45509 C 82.44357,159.53623 82.36125,158.15090 82.96210,156.17023 C 83.52261,154.32258 83.46788,152.25170 82.82695,151.05586 C 82.23877,149.95845 82.15887,149.09486 82.57378,148.31960 C 82.78452,147.92583 82.75897,147.76906 82.46571,147.65653 C 82.25448,147.57543 81.93996,147.16707 81.76677,146.74898 C 81.49359,146.08946 81.54419,145.78723 82.14889,144.46639 C 83.27489,142.00689 82.86142,141.20856 79.98016,140.27901 C 76.82431,139.26087 77.43133,136.85161 82.40860,130.64064 C 85.31897,127.00888 85.73335,126.16233 85.73589,123.84314 C 85.73969,120.39654 87.93704,115.05060 90.73827,111.67294 C 95.63993,105.76264 103.93141,102.64323 112.80829,103.36979 C 123.08321,104.21078 131.59111,109.54717 135.38296,117.52924 C 136.95485,120.83817 137.41101,122.92504 137.40448,126.77738 C 137.39398,132.94986 135.78197,137.55096 130.45225,146.62062 C 126.34581,153.60860 125.77689,155.28954 126.21358,159.14444 C 126.81406,164.44522 130.01530,174.20685 133.31176,180.78910 C 134.03042,182.22411 135.06463,184.58884 135.60999,186.04405 C 136.59529,188.67317 138.12486,194.24218 138.12486,195.20040 C 138.12486,195.68796 137.53051,195.70134 115.87156,195.70134 C 94.78541,195.70134 93.62774,195.67704 93.79914,195.23832 Z"

// Reference 6-slice paths (exact Inkscape shapes, used only when count === 6)
const SLICE_PATHS = [
  "M 37.11415,193.37119 C 22.21610,176.75517 13.90998,156.47380 12.57711,133.45815 L 12.41239,130.61388 H 54.43699 L 54.61088,133.26737 C 55.30457,143.85263 60.01140,155.37817 67.00507,163.61682 L 68.85478,165.79580 L 54.08487,180.74859 C 45.96142,188.97263 39.28987,195.70138 39.25919,195.70138 C 39.22851,195.70138 38.26325,194.65280 37.11415,193.37119 Z",
  "M 12.75170,123.40415 C 13.54035,106.07824 19.77558,88.29273 30.23232,73.54206 C 33.12490,69.46166 38.69987,62.88055 39.26385,62.88055 C 39.44230,62.88055 42.20162,65.52969 45.39567,68.76753 C 48.58971,72.00536 55.17927,78.66305 60.03913,83.56239 L 68.87523,92.47027 L 67.56382,93.88114 C 60.54222,101.43520 55.24059,113.97738 54.59589,124.55959 L 54.43659,127.17430 L 12.58007,127.17463 Z",
  "M 56.48813,75.02355 L 41.68424,60.20285 L 43.00716,58.98659 C 58.06928,45.13887 77.13277,36.38251 96.98216,34.19447 C 99.01945,33.96990 101.93648,33.75419 103.46445,33.71512 L 106.24257,33.64409 L 106.31037,54.46079 L 106.37807,75.27749 L 104.85512,75.42912 C 98.54284,76.05759 93.39003,77.17173 88.96646,78.86457 C 83.61565,80.91224 77.13096,84.72484 73.54977,87.92862 C 72.75863,88.63638 71.92699,89.35694 71.70168,89.52986 C 71.35570,89.79539 68.99114,87.54076 56.48814,75.02355 Z",
  "M 143.53218,88.78446 C 143.10477,88.33401 141.68351,87.15896 140.37382,86.17323 C 132.03845,79.89966 122.85643,76.47395 111.60038,75.43818 L 109.81445,75.27384 V 54.40570 V 33.53755 L 112.12955,33.66737 C 125.01905,34.39011 135.94469,36.94762 147.05311,41.84238 C 156.10286,45.83001 165.76725,52.14887 172.91757,58.75330 L 174.50507,60.21960 L 159.77243,74.91153 C 151.66948,82.99209 144.87542,89.60346 144.67454,89.60346 C 144.47365,89.60346 143.95959,89.23491 143.53218,88.78446 Z",
  "M 161.55458,125.12378 C 160.49253,113.04985 156.00938,102.44530 148.20925,93.55639 L 147.15058,92.34994 L 161.96874,77.54910 L 176.78691,62.74825 L 178.71454,64.77608 C 182.25819,68.50392 186.38803,73.95353 189.53567,79.05533 C 197.50988,91.98021 202.67694,108.08089 203.35908,122.12944 C 203.43378,123.66718 203.54806,125.43135 203.61312,126.04982 L 203.73141,127.17430 H 161.73495 Z",
  "M 162.08327,180.64845 C 148.33939,166.88923 147.30869,165.79485 147.67811,165.35313 C 147.89695,165.09147 148.64469,164.22861 149.33975,163.43567 C 150.03482,162.64272 151.52593,160.61398 152.65334,158.92736 C 157.57392,151.56608 160.59401,143.05692 161.45819,134.11957 L 161.77159,130.87842 H 182.62427 H 203.47695 V 133.00261 C 203.47695,137.66430 202.19184,146.67017 200.66527,152.70655 C 196.88794,167.64290 188.81134,182.56863 178.42950,193.79874 L 176.88632,195.46801 Z",
]

// Exact Inkscape coordinates for content placement (Icon top-left, Text center, Number inner edge)
const SLICE_CONTENT_POS = [
  // 1: Bottom Left
  { iconX: 28.0, iconY: 150.0, textX: 42.0, textY: 162.0, numX: 56.0, numY: 178.0 },
  // 2: Middle Left
  { iconX: 26.0, iconY: 78.0,  textX: 42.0, textY: 95.0,  numX: 58.0, numY: 98.0 },
  // 3: Top Left
  { iconX: 54.0, iconY: 46.0,  textX: 74.0, textY: 62.0,  numX: 88.0, numY: 76.0 },
  // 4: Top Right
  { iconX: 124.0, iconY: 46.0, textX: 142.0, textY: 62.0, numX: 128.0, numY: 76.0 },
  // 5: Middle Right
  { iconX: 158.0, iconY: 78.0, textX: 174.0, textY: 95.0, numX: 158.0, numY: 98.0 },
  // 6: Bottom Right
  { iconX: 158.0, iconY: 150.0, textX: 172.0, textY: 162.0, numX: 156.0, numY: 178.0 },
]

const DEFAULT_COLORS = ["#282a5d", "#3365cc", "#ff4d38", "#ffb900", "#52c49c", "#ee6d90"]
const DEFAULT_ICONS = ["wrench", "lightbulb", "zap", "git-branch", "target", "mouse-pointer"]

function getDynamicIcon(iconName?: string, size = 24) {
  if (!iconName) return null
  const clean = iconName.trim()

  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? size} color={props.color ?? "white"} />
  }

  return null
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
  if (!text) return []
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + " " + word).trim()
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

export function Brain2Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const headId = "head"
  const headDef = { x: 300, y: 140, width: 300, height: 420 }
  const headPos = positions[headId]
  const headBbox = {
    x: headPos?.x ?? headDef.x,
    y: headPos?.y ?? headDef.y,
    width: headPos?.width ?? headDef.width,
    height: headPos?.height ?? headDef.height,
  }
  const isHeadSelected = selectedIds.has(headId)

  const headRaise = headBbox.height * 0.05
  const headShiftX = 0
  const headShiftY = 23

  const branches = data.branches.length > 0 ? data.branches : [
    { title: "MIGSO-PCUBED", subtitle: "content", icon: "wrench", color: "#282a5d" },
    { title: "MIGSO-PCUBED", subtitle: "content", icon: "lightbulb", color: "#3365cc" },
    { title: "MIGSO-PCUBED", subtitle: "content", icon: "zap", color: "#ff4d38" },
    { title: "MIGSO-PCUBED", subtitle: "content", icon: "git-branch", color: "#ffb900" },
    { title: "MIGSO-PCUBED", subtitle: "content", icon: "target", color: "#52c49c" },
    { title: "MIGSO-PCUBED", subtitle: "content", icon: "mouse-pointer", color: "#ee6d90" },
  ]
  const count = Math.max(1, branches.length)

  // Mathematically perfect concentric donut logic
  const cx = 108
  const cy = 129
  const R = 96
  const r = 54
  const startAngle = 130
  const endAngle = 410
  const totalAngle = endAngle - startAngle
  const gapPixels = 4

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  const getDonutSectorPath = (startA: number, endA: number) => {
    const rShrink = (Math.asin((gapPixels/2) / r) * 180 / Math.PI) || 0
    const RShrink = (Math.asin((gapPixels/2) / R) * 180 / Math.PI) || 0

    let startR = startA + RShrink
    let endR = endA - RShrink
    let start_r = startA + rShrink
    let end_r = endA - rShrink

    if (startR > endR) { startR = (startA+endA)/2; endR = startR }
    if (start_r > end_r) { start_r = (startA+endA)/2; end_r = start_r }

    const p1 = polarToCartesian(cx, cy, R, startR)
    const p2 = polarToCartesian(cx, cy, R, endR)
    const p3 = polarToCartesian(cx, cy, r, end_r)
    const p4 = polarToCartesian(cx, cy, r, start_r)
    
    const largeArcFlagOuter = endR - startR <= 180 ? "0" : "1"
    const largeArcFlagInner = end_r - start_r <= 180 ? "0" : "1"

    return [
      `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
      `A ${R} ${R} 0 ${largeArcFlagOuter} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
      `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
      `A ${r} ${r} 0 ${largeArcFlagInner} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
      "Z"
    ].join(" ")
  }

  const getInterpolatedPath = (index: number) => {
    const anglePerSlice = totalAngle / count
    const startA = startAngle + index * anglePerSlice
    const endA = startAngle + (index + 1) * anglePerSlice
    return getDonutSectorPath(startA, endA)
  }

  const getInterpolatedContentPos = (index: number) => {
    const anglePerSlice = totalAngle / count
    const midAngle = startAngle + (index + 0.5) * anglePerSlice
    
    // Icon is near outer edge (radius 86)
    const iconPt = polarToCartesian(cx, cy, R - 10, midAngle)
    // Text is in the middle (radius 75)
    const textPt = polarToCartesian(cx, cy, r + (R - r) * 0.5, midAngle)
    // Num is near inner edge (radius 64)
    const numPt = polarToCartesian(cx, cy, r + 10, midAngle)
    
    return {
      iconX: iconPt.x, iconY: iconPt.y,
      textX: textPt.x, textY: textPt.y,
      numX: numPt.x, numY: numPt.y
    }
  }

  // Scale and translate dessin-2.svg coordinates to Canvas space
  const baseScale = (headBbox.width / 191.32) * 1.55
  const baseTx = headBbox.x - 75
  const baseTy = headBbox.y - 120

  // Proportional scale factor based on branch count N
  const scaleFactor = Math.min(1.2, Math.max(0.65, 6 / count))
  const iconSize = Math.round(24 * scaleFactor)
  const titleFontSize = Math.round(13 * scaleFactor)
  const subtitleFontSize = Math.round(10 * scaleFactor)
  const numFontSize = Math.round(22 * scaleFactor)

  return (
    <g ref={svgRef}>
      {/* 1. Exact SVG Arch Slices from dessin-2.svg (Interactive) */}
      <g transform={`translate(${baseTx}, ${baseTy}) scale(${baseScale}) translate(-12.41, -33.54)`}>
        {branches.map((branch, i) => {
          const id = `arc-${i}`
          const color = tplColors[id] ?? branch.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
          const isSelected = selectedIds.has(id)
          const pathD = getInterpolatedPath(i)

          return (
            <path
              key={id}
              d={pathD}
              fill={color}
              opacity={isSelected ? 0.88 : 1}
              stroke={isSelected ? "#4a90d9" : "#ffffff"}
              strokeWidth={isSelected ? 1.5 : 0.4}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ cursor: "pointer" }}
              onMouseDown={e => startDrag(e, id, headBbox)}
            />
          )
        })}
      </g>

      {/* 2. Text, Numbers (1..6) and Icons centered over Slices (Exact dessin-2.svg positioning) */}
      {branches.map((branch, i) => {
        const id = `arc-${i}`
        const isSelected = selectedIds.has(id)
        const cfg = getInterpolatedContentPos(i)

        // Transform Inkscape coords to Canvas Space
        const ptIconX = baseTx + (cfg.iconX - 12.41) * baseScale
        const ptIconY = baseTy + (cfg.iconY - 33.54) * baseScale

        const ptTextX = baseTx + (cfg.textX - 12.41) * baseScale
        const ptTextY = baseTy + (cfg.textY - 33.54) * baseScale

        const ptNumX = baseTx + (cfg.numX - 12.41) * baseScale
        const ptNumY = baseTy + (cfg.numY - 33.54) * baseScale

        const aBbox = { x: ptTextX - 50, y: ptTextY - 50, width: 100, height: 100 }

        const iconKey = branch.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length]
        const IconFn = getDynamicIcon(iconKey, iconSize)

        const titleLines = wrapText(branch.title, Math.max(8, Math.floor(14 * scaleFactor)))
        const subtitleLines = branch.subtitle ? wrapText(branch.subtitle, Math.max(10, Math.floor(16 * scaleFactor))) : []

        return (
          <g key={`content-${id}`} onMouseDown={e => startDrag(e, id, aBbox)} style={{ cursor: "pointer" }}>
            {/* Icon in top-left area of slice */}
            {IconFn && (
              <g transform={`translate(${ptIconX - iconSize / 2}, ${ptIconY - iconSize / 2})`}>
                <IconFn size={iconSize} color="#ffffff" />
              </g>
            )}

            {/* Title & Subtitle centered in middle of slice */}
            <text
              x={ptTextX}
              y={ptTextY - (titleLines.length > 1 ? titleFontSize * 0.6 : 4)}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={titleFontSize}
              fontWeight={700}
              fill="#ffffff"
            >
              {titleLines.map((line, lIdx) => (
                <tspan key={lIdx} x={ptTextX} dy={lIdx === 0 ? 0 : titleFontSize * 1.15}>
                  {line}
                </tspan>
              ))}
            </text>

            {/* Subtitle */}
            {subtitleLines.length > 0 && (
              <text
                x={ptTextX}
                y={ptTextY + titleLines.length * titleFontSize * 0.7 + 6}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={subtitleFontSize}
                fontWeight={400}
                fill="#ffffff"
                opacity={0.92}
              >
                {subtitleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={ptTextX} dy={lIdx === 0 ? 0 : subtitleFontSize * 1.15}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}

            {/* DSL Attributes: val / pct / date if present */}
            {(branch.val || branch.pct || branch.date) && (
              <text
                x={ptTextX}
                y={ptTextY + titleLines.length * titleFontSize * 0.7 + (subtitleLines.length + 1) * subtitleFontSize * 1.1}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={Math.max(9, subtitleFontSize - 1)}
                fontWeight={600}
                fill="#ffffff"
                opacity={0.95}
              >
                {[branch.val, branch.pct, branch.date].filter(Boolean).join(" • ")}
              </text>
            )}

            {/* Big bold number near inner edge */}
            <text
              x={ptNumX}
              y={ptNumY}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={numFontSize}
              fontWeight={900}
              fill="#ffffff"
            >
              {i + 1}
            </text>

            {isSelected && renderHandles(aBbox, id)}
          </g>
        )
      })}

      {/* 3. Central Head Silhouette from dessin-2.svg (Interactive & Horizontally Aligned at Base) */}
      <g
        transform={getTransform(headId, headBbox)}
        style={{ cursor: "pointer" }}
        onMouseDown={e => startDrag(e, headId, headBbox)}
      >
        <g transform={`translate(-${headShiftX}, ${headShiftY - headRaise})`}>
          <g transform={`translate(${baseTx}, ${baseTy}) scale(${baseScale}) translate(-12.41, -33.54)`}>
            <path
              d={HEAD_PATH_EXACT}
              fill="#111319"
              stroke={isHeadSelected ? "#4a90d9" : "none"}
              strokeWidth={isHeadSelected ? 1 : 0}
            />
          </g>

          {/* Lightbulb with horizontal arrows icon inside head */}
          <g transform={`translate(${headBbox.x + headBbox.width * 0.12}, ${headBbox.y + headBbox.height * 0.24})`}>
          {/* Lightbulb contour */}
          <path
            d="M 25 5 C 14 5 5 14 5 25 C 5 32 8 38 14 42 L 14 50 L 36 50 L 36 42 C 42 38 45 32 45 25 C 45 14 36 5 25 5 Z"
            fill="none"
            stroke="#d1d5db"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lightbulb base lines */}
          <line x1={17} y1={55} x2={33} y2={55} stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={20} y1={60} x2={30} y2={60} stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" />

          {/* Top Arrow pointing left */}
          <path d="M 34 20 L 14 20 M 20 14 L 14 20 L 20 26" stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom Arrow pointing right */}
          <path d="M 16 32 L 36 32 M 30 26 L 36 32 L 30 38" stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {isHeadSelected && renderHandles(headBbox, headId)}
      </g>
    </g>
  )
}
