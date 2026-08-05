import { useRef, type ReactElement } from "react"
import type { BrainData } from "../types"
import { useTemplateDragResize } from "../shared/useTemplateDragResize"
import { useTemplateStore } from "../store"
import { TEMPLATE_ICONS } from "../shared/icons"
import { MIGSO_PALETTE } from "../../lib/theme"
import * as LucideIcons from "lucide-react"
import { buildSectorPath, getRingPoint, equalAreaBoundaries, RING_GAP_WIDTH, OUTER_CONTOUR, INNER_CONTOUR } from "../shared/ringGeometry"

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
  const isExactSix = count === 6
  const outerContour = OUTER_CONTOUR
  const innerContour = INNER_CONTOUR
  const boundaries = equalAreaBoundaries(count, outerContour, innerContour)
  const sectorAngles = branches.map((_, i) => ({
    start: boundaries[i]!,
    end: boundaries[i + 1]!,
  }))

  const getInterpolatedPath = (index: number) => {
    let srcIndex = index
    if (count === 4) {
      srcIndex = [0, 1, 4, 5][index] ?? index
    } else if (count === 5) {
      srcIndex = [0, 1, 2, 4, 5][index] ?? index
    } else if (count === 7) {
      srcIndex = Math.min(5, Math.round((index / 6) * 5))
    } else {
      srcIndex = Math.min(5, Math.round((index / Math.max(1, count - 1)) * 5))
    }
    return SLICE_PATHS[srcIndex]!
  }

  const getInterpolatedContentPos = (index: number) => {
    let srcIndex = index
    if (count === 4) {
      srcIndex = [0, 1, 4, 5][index] ?? index
    } else if (count === 5) {
      srcIndex = [0, 1, 2, 4, 5][index] ?? index
    } else if (count === 7) {
      srcIndex = Math.min(5, Math.round((index / 6) * 5))
    } else {
      srcIndex = Math.min(5, Math.round((index / Math.max(1, count - 1)) * 5))
    }
    return SLICE_CONTENT_POS[srcIndex]!
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
