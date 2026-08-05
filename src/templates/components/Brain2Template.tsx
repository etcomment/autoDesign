import { useRef, type ReactElement } from "react"
import type { BrainData } from "../types"
import { wrapTextByWidth } from "../shared/primitives"
import { useTemplateDragResize } from "../shared/useTemplateDragResize"
import { useTemplateStore } from "../store"
import { TEMPLATE_ICONS } from "../shared/icons"
import { MIGSO_PALETTE } from "../../lib/theme"
import * as LucideIcons from "lucide-react"
import { buildSectorPath, getRingPoint, equalAreaBoundaries, RING_GAP_WIDTH, OUTER_CONTOUR, INNER_CONTOUR } from "../shared/ringGeometry"

const BRAIN2_INNER_CONTOUR: readonly (readonly [number, number])[] = [[63.58, 167.64], [62.90, 166.58], [62.24, 165.52], [61.61, 164.45], [61.00, 163.36], [60.42, 162.27], [59.86, 161.18], [59.33, 160.07], [58.83, 158.96], [58.35, 157.84], [57.90, 156.72], [57.47, 155.59], [57.07, 154.46], [56.70, 153.33], [56.35, 152.20], [56.03, 151.06], [55.73, 149.93], [55.45, 148.79], [55.20, 147.65], [54.98, 146.52], [54.78, 145.39], [54.60, 144.26], [54.45, 143.13], [54.32, 142.01], [54.21, 140.89], [54.13, 139.77], [54.06, 138.67], [54.02, 137.56], [54.00, 136.46], [54.00, 135.37], [54.03, 134.29], [54.07, 133.21], [54.13, 132.15], [54.21, 131.09], [54.31, 130.03], [54.43, 128.99], [54.57, 127.96], [54.73, 126.94], [54.90, 125.92], [55.09, 124.92], [55.29, 123.93], [55.52, 122.94], [55.75, 121.97], [56.01, 121.01], [56.27, 120.06], [56.55, 119.13], [56.85, 118.20], [57.16, 117.29], [57.48, 116.39], [57.82, 115.50], [58.16, 114.62], [58.52, 113.76], [58.89, 112.90], [59.27, 112.06], [59.66, 111.23], [60.06, 110.42], [60.47, 109.62], [60.89, 108.83], [61.32, 108.05], [61.76, 107.29], [62.21, 106.53], [62.66, 105.79], [63.12, 105.07], [63.59, 104.35], [64.07, 103.65], [64.55, 102.96], [65.04, 102.28], [65.54, 101.62], [66.04, 100.96], [66.55, 100.32], [67.06, 99.69], [67.58, 99.08], [68.10, 98.47], [68.63, 97.88], [69.16, 97.29], [69.69, 96.72], [70.23, 96.16], [70.77, 95.62], [71.32, 95.08], [71.87, 94.55], [72.42, 94.04], [72.98, 93.53], [73.54, 93.04], [74.10, 92.56], [74.66, 92.09], [75.23, 91.62], [75.80, 91.17], [76.37, 90.73], [76.94, 90.30], [77.51, 89.87], [78.09, 89.46], [78.67, 89.06], [79.24, 88.67], [79.82, 88.28], [80.41, 87.91], [80.99, 87.54], [81.57, 87.18], [82.16, 86.83], [82.75, 86.50], [83.33, 86.16], [83.92, 85.84], [84.51, 85.53], [85.10, 85.22], [85.69, 84.93], [86.29, 84.64], [86.88, 84.36], [87.47, 84.08], [88.07, 83.82], [88.66, 83.56], [89.26, 83.31], [89.85, 83.07], [90.45, 82.83], [91.05, 82.61], [91.65, 82.39], [92.24, 82.17], [92.84, 81.97], [93.44, 81.77], [94.05, 81.58], [94.65, 81.40], [95.25, 81.22], [95.85, 81.05], [96.45, 80.89], [97.06, 80.73], [97.66, 80.58], [98.27, 80.44], [98.88, 80.30], [99.48, 80.18], [100.09, 80.05], [100.70, 79.94], [101.31, 79.83], [101.92, 79.73], [102.53, 79.63], [103.14, 79.54], [103.75, 79.46], [104.37, 79.39], [104.98, 79.32], [105.60, 79.26], [106.21, 79.20], [106.83, 79.15], [107.45, 79.11], [108.07, 79.08], [108.69, 79.05], [109.31, 79.02], [109.94, 79.01], [110.56, 79.00], [111.19, 79.00], [111.81, 79.01], [112.44, 79.02], [113.07, 79.04], [113.70, 79.06], [114.33, 79.10], [114.97, 79.14], [115.60, 79.19], [116.24, 79.24], [116.88, 79.30], [117.51, 79.37], [118.15, 79.45], [118.80, 79.54], [119.44, 79.63], [120.08, 79.73], [120.73, 79.84], [121.38, 79.95], [122.03, 80.08], [122.68, 80.21], [123.33, 80.35], [123.98, 80.50], [124.64, 80.66], [125.29, 80.82], [125.95, 81.00], [126.61, 81.18], [127.27, 81.37], [127.93, 81.57], [128.59, 81.78], [129.25, 82.00], [129.92, 82.23], [130.58, 82.47], [131.25, 82.72], [131.92, 82.98], [132.58, 83.24], [133.25, 83.52], [133.92, 83.81], [134.59, 84.11], [135.26, 84.42], [135.93, 84.74], [136.60, 85.07], [137.27, 85.42], [137.94, 85.77], [138.62, 86.14], [139.29, 86.51], [139.96, 86.90], [140.62, 87.30], [141.29, 87.72], [141.96, 88.14], [142.63, 88.58], [143.29, 89.03], [143.96, 89.49], [144.62, 89.97], [145.28, 90.46], [145.93, 90.96], [146.59, 91.48], [147.24, 92.00], [147.89, 92.55], [148.54, 93.10], [149.18, 93.67], [149.82, 94.26], [150.45, 94.86], [151.08, 95.47], [151.70, 96.10], [152.32, 96.74], [152.94, 97.40], [153.55, 98.07], [154.15, 98.75], [154.74, 99.45], [155.33, 100.17], [155.91, 100.90], [156.49, 101.65], [157.05, 102.41], [157.61, 103.18], [158.15, 103.97], [158.69, 104.78], [159.22, 105.60], [159.73, 106.44], [160.24, 107.29], [160.74, 108.15], [161.22, 109.03], [161.69, 109.93], [162.15, 110.84], [162.59, 111.76], [163.02, 112.70], [163.44, 113.65], [163.84, 114.62], [164.22, 115.60], [164.59, 116.59], [164.95, 117.60], [165.29, 118.62], [165.61, 119.65], [165.91, 120.70], [166.19, 121.76], [166.46, 122.83], [166.70, 123.91], [166.93, 125.00], [167.13, 126.10], [167.32, 127.21], [167.48, 128.34], [167.62, 129.47], [167.74, 130.61], [167.84, 131.76], [167.92, 132.92], [167.97, 134.08], [168.00, 135.25], [168.00, 136.43], [167.98, 137.62], [167.93, 138.81], [167.86, 140.00], [167.76, 141.20], [167.64, 142.40], [167.49, 143.60], [167.32, 144.81], [167.11, 146.01], [166.88, 147.22], [166.63, 148.43], [166.35, 149.64], [166.03, 150.84], [165.70, 152.04], [165.33, 153.24], [164.94, 154.44], [164.51, 155.63], [164.06, 156.81], [163.59, 157.99], [163.08, 159.17], [162.55, 160.33], [161.98, 161.49], [161.39, 162.63], [160.78, 163.77], [160.13, 164.90], [159.46, 166.01], [158.76, 167.11], [158.03, 168.20], [157.28, 169.27], [156.50, 170.33], [155.69, 171.38]];

// Exact SVG Path extracted directly from dessin-2.svg (Inkscape)
const HEAD_PATH_EXACT = "M 93.79914,195.23832 C 94.20517,194.19898 96.92735,184.77713 97.64045,181.94301 C 99.98678,172.61776 100.89778,165.10145 99.91261,163.19634 C 99.00839,161.44777 97.58249,161.22470 90.18105,161.67396 C 85.65560,161.94864 84.26933,161.70606 83.21674,160.45509 C 82.44357,159.53623 82.36125,158.15090 82.96210,156.17023 C 83.52261,154.32258 83.46788,152.25170 82.82695,151.05586 C 82.23877,149.95845 82.15887,149.09486 82.57378,148.31960 C 82.78452,147.92583 82.75897,147.76906 82.46571,147.65653 C 82.25448,147.57543 81.93996,147.16707 81.76677,146.74898 C 81.49359,146.08946 81.54419,145.78723 82.14889,144.46639 C 83.27489,142.00689 82.86142,141.20856 79.98016,140.27901 C 76.82431,139.26087 77.43133,136.85161 82.40860,130.64064 C 85.31897,127.00888 85.73335,126.16233 85.73589,123.84314 C 85.73969,120.39654 87.93704,115.05060 90.73827,111.67294 C 95.63993,105.76264 103.93141,102.64323 112.80829,103.36979 C 123.08321,104.21078 131.59111,109.54717 135.38296,117.52924 C 136.95485,120.83817 137.41101,122.92504 137.40448,126.77738 C 137.39398,132.94986 135.78197,137.55096 130.45225,146.62062 C 126.34581,153.60860 125.77689,155.28954 126.21358,159.14444 C 126.81406,164.44522 130.01530,174.20685 133.31176,180.78910 C 134.03042,182.22411 135.06463,184.58884 135.60999,186.04405 C 136.59529,188.67317 138.12486,194.24218 138.12486,195.20040 C 138.12486,195.68796 137.53051,195.70134 115.87156,195.70134 C 94.78541,195.70134 93.62774,195.67704 93.79914,195.23832 Z"

const DEFAULT_COLORS = ["#282a5d", "#3365cc", "#ff4d38", "#ffb900", "#52c49c", "#ee6d90"]

function getDynamicIcon(name: string | undefined, size: number) {
  if (!name) return null
  const clean = name.replace(/[^a-zA-Z0-9]/g, "")
  if (!clean) return null

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? size} color={props.color ?? "white"} />
  }

  return null
}

export function Brain2Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const templateElementRotations = useTemplateStore(s => s.templateElementRotations)

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

  const getDonutSectorPath = (startA: number, endA: number, customR: number, customr: number) => {
    const rShrink = (Math.asin((gapPixels/2) / customr) * 180 / Math.PI) || 0
    const RShrink = (Math.asin((gapPixels/2) / customR) * 180 / Math.PI) || 0

    let startR = startA + RShrink
    let endR = endA - RShrink
    let start_r = startA + rShrink
    let end_r = endA - rShrink

    if (startR > endR) { startR = (startA+endA)/2; endR = startR }
    if (start_r > end_r) { start_r = (startA+endA)/2; end_r = start_r }

    const p1 = polarToCartesian(cx, cy, customR, startR)
    const p2 = polarToCartesian(cx, cy, customR, endR)
    const p3 = polarToCartesian(cx, cy, customr, end_r)
    const p4 = polarToCartesian(cx, cy, customr, start_r)
    
    const largeArcFlagOuter = endR - startR <= 180 ? "0" : "1"
    const largeArcFlagInner = end_r - start_r <= 180 ? "0" : "1"

    return [
      `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
      `A ${customR} ${customR} 0 ${largeArcFlagOuter} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
      `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
      `A ${customr} ${customr} 0 ${largeArcFlagInner} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
      "Z"
    ].join(" ")
  }

  const getInterpolatedPath = (index: number, customR: number, customr: number) => {
    const anglePerSlice = totalAngle / count
    const startA = startAngle + index * anglePerSlice
    const endA = startAngle + (index + 1) * anglePerSlice
    return getDonutSectorPath(startA, endA, customR, customr)
  }

  const getInterpolatedContentPos = (index: number, customR: number, customr: number) => {
    const anglePerSlice = totalAngle / count
    const midAngle = startAngle + (index + 0.5) * anglePerSlice
    const isLeft = midAngle < 270
    
    // Position of the icon (closer to outer edge by default)
    const iconAngleOffset = isLeft ? 18 : -18
    const iconPt = polarToCartesian(cx, cy, customR - 10, midAngle + iconAngleOffset)
    
    // Position of the text (centered between inner and outer radius)
    const textPt = polarToCartesian(cx, cy, customr + (customR - customr) * 0.58, midAngle)
    
    // Position of the number (closer to inner edge)
    const numPt = polarToCartesian(cx, cy, customr + 6, midAngle)
    
    return {
      iconX: iconPt.x, iconY: iconPt.y,
      textX: textPt.x, textY: textPt.y,
      numX: numPt.x, numY: numPt.y
    }
  }

  const baseScale = (headBbox.width / 191.32) * 1.55
  const baseTx = headBbox.x - 75
  const baseTy = headBbox.y - 120

  const scaleFactor = Math.min(1.2, Math.max(0.65, 6 / count))
  const iconSize = Math.round(28 * scaleFactor)
  const titleFontSize = Math.round(7 * scaleFactor)
  const subtitleFontSize = Math.round(6 * scaleFactor)
  const numFontSize = Math.round(14 * scaleFactor)

  return (
    <g ref={svgRef}>
      {/* 1 & 2. Slices and Content grouped together for interaction */}
      {branches.map((branch, i) => {
        const id = `arc-${i}`
        const color = tplColors[id] ?? branch.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(id)
        
        const slicePos = positions[id]
        const defaultBbox = { x: baseTx + (polarToCartesian(cx, cy, r + (R - r) * 0.62, startAngle + (i + 0.5) * (totalAngle / count)).x - 12.41) * baseScale - 75, y: baseTy + (polarToCartesian(cx, cy, r + (R - r) * 0.62, startAngle + (i + 0.5) * (totalAngle / count)).y - 33.54) * baseScale - 50, width: 150, height: 100 }
        const sliceBbox = {
          x: slicePos?.x ?? defaultBbox.x,
          y: slicePos?.y ?? defaultBbox.y,
          width: slicePos?.width ?? defaultBbox.width,
          height: slicePos?.height ?? defaultBbox.height
        }

        const localSliceScale = sliceBbox.width / 150
        const localR = R * localSliceScale
        const localr = r * localSliceScale

        const pathD = getInterpolatedPath(i, localR, localr)
        const cfg = getInterpolatedContentPos(i, localR, localr)

        const ptIconX = baseTx + (cfg.iconX - 12.41) * baseScale
        const ptIconY = baseTy + (cfg.iconY - 33.54) * baseScale

        const ptTextX = baseTx + (cfg.textX - 12.41) * baseScale
        const ptTextY = baseTy + (cfg.textY - 33.54) * baseScale

        const ptNumX = baseTx + (cfg.numX - 12.41) * baseScale
        const ptNumY = baseTy + (cfg.numY - 33.54) * baseScale
        
        // Only apply translate (and rotation if any) natively, removing nested getTransform scaling
        const dx = sliceBbox.x - defaultBbox.x
        const dy = sliceBbox.y - defaultBbox.y
        const rotationStr = templateElementRotations[id] ? `rotate(${templateElementRotations[id]} ${sliceBbox.x + sliceBbox.width/2} ${sliceBbox.y + sliceBbox.height/2})` : ""

        const IconFn = branch.icon ? getDynamicIcon(branch.icon, iconSize) : null

        const titleLines = wrapTextByWidth(branch.title, Math.max(12, Math.round(18 * scaleFactor)))
        const subtitleLines = branch.subtitle ? wrapTextByWidth(branch.subtitle, Math.max(14, Math.round(22 * scaleFactor))) : []

        return (
          <g key={id} transform={`translate(${dx}, ${dy}) ${rotationStr}`} onMouseDown={e => startDrag(e, id, defaultBbox)} style={{ cursor: "pointer" }}>
            <g transform={`translate(${baseTx}, ${baseTy}) scale(${baseScale}) translate(-12.41, -33.54)`}>
              <path
                d={pathD}
                fill={color}
                opacity={isSelected ? 0.88 : 1}
                stroke={isSelected ? "#4a90d9" : "#ffffff"}
                strokeWidth={isSelected ? 1.5 : 0.4}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>

            <g>
              {IconFn && (
                <g transform={`translate(${ptIconX - iconSize / 2}, ${ptIconY - iconSize / 2})`}>
                  <IconFn size={iconSize} color="#ffffff" />
                </g>
              )}

              <text x={ptTextX} y={ptTextY - (titleLines.length > 1 ? titleFontSize * 0.6 : 4)} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={titleFontSize} fontWeight={700} fill="#ffffff">
                {titleLines.map((line, lIdx) => (
                  <tspan key={lIdx} x={ptTextX} dy={lIdx === 0 ? 0 : titleFontSize * 1.15}>{line}</tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text x={ptTextX} y={ptTextY + titleLines.length * titleFontSize * 0.7 + 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={subtitleFontSize} fontWeight={500} fill="#ffffff" opacity={0.95}>
                  {subtitleLines.map((line, lIdx) => (
                    <tspan key={lIdx} x={ptTextX} dy={lIdx === 0 ? 0 : subtitleFontSize * 1.15}>{line}</tspan>
                  ))}
                </text>
              )}

              <text x={ptTextX} y={ptTextY + titleLines.length * titleFontSize * 0.7 + (subtitleLines.length + 1) * subtitleFontSize * 1.1} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={Math.max(9, subtitleFontSize - 1)} fontWeight={600} fill="#ffffff" opacity={0.95}>
                {[branch.val, branch.pct, branch.date].filter(Boolean).join(" • ")}
              </text>

              <text x={ptNumX} y={ptNumY} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={numFontSize} fontWeight={900} fill="#ffffff">
                {i + 1}
              </text>
            </g>
            
            {isSelected && renderHandles(defaultBbox, id)}
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
          <g transform={`translate(${baseTx + (cx - 12.41) * baseScale - 20}, ${baseTy + (cy - 33.54) * baseScale - 25}) scale(0.8)`}>
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
