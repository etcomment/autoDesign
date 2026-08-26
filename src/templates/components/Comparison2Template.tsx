import { useRef, type ReactElement } from 'react'
import type { Comparison2Data, ComparisonBlock } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

function getHexagonPath(cx: number, cy: number, radius: number): string {
  const h = (radius * Math.sqrt(3)) / 2
  const rHalf = radius * 0.5
  return `M ${cx} ${cy - h} L ${cx - rHalf} ${cy - h} L ${cx - radius} ${cy} L ${cx - rHalf} ${cy + h} L ${cx + rHalf} ${cy + h} L ${cx + radius} ${cy} L ${cx + rHalf} ${cy - h} Z`
}

function parsePercent(val?: string | number, defaultVal: number = 50): number {
  if (typeof val === 'number') return Math.max(0, Math.min(100, val))
  if (!val) return defaultVal
  const cleaned = String(val).replace(/[^0-9.]/g, '')
  const num = parseFloat(cleaned)
  return isNaN(num) ? defaultVal : Math.max(0, Math.min(100, num))
}

export function Comparison2Template({ data }: { data: Comparison2Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const rawBlocks: ComparisonBlock[] = data?.blocks && data.blocks.length > 0
    ? data.blocks
    : [
        {
          title: 'Brand 01',
          subtitle: 'MIGSO-PCUBED content and words to\nbe added here as required',
          percent: '25%',
          value: '35%',
          color: '#2c2b64',
        },
        {
          title: 'Brand 02',
          subtitle: 'MIGSO-PCUBED content and words to\nbe added here as required',
          percent: '65%',
          value: '95%',
          icon: 'smartphone',
          color: '#ff5338',
        },
        {
          title: 'Brand 03',
          subtitle: 'MIGSO-PCUBED content and words to\nbe added here as required',
          percent: '25%',
          value: '75%',
          icon: 'phone',
          color: '#f2cb13',
        },
      ]

  const count = Math.max(1, rawBlocks.length)
  const W = 960
  const vsW = 60
  const totalVsW = (count - 1) * vsW
  const marginX = 30
  const availableW = W - marginX * 2 - totalVsW
  const colW = Math.max(150, Math.min(300, availableW / count))
  const totalW = count * colW + totalVsW
  const startX = (W - totalW) / 2

  const headerH = 32
  const headerY = 30
  const cardY = 72
  const cardH = count === 2 ? 300 : count === 3 ? 245 : 210
  const gaugeY = cardY + cardH + 16
  const gaugeH = 28
  const descY = gaugeY + gaugeH + 14
  const descH = 60

  return (
    <g ref={svgRef}>
      {rawBlocks.map((block, index) => {
        const colX = startX + index * (colW + vsW)
        const brandPaletteColor = block.color || MIGSO_PALETTE[index % MIGSO_PALETTE.length] || '#2c2b64'
        const isFirstDarkBrand = index === 0 && (!block.color || block.color === '#2c2b64' || block.color === '#23255a')

        // 1. Header (Brand Name)
        const headerId = `header-${index}`
        const isHeaderSelected = selectedIds.has(headerId)
        const defaultHeaderBbox = { x: colX, y: headerY, width: colW, height: headerH }
        const customHeaderPos = positions[headerId]
        const headerBbox = {
          x: customHeaderPos?.x ?? defaultHeaderBbox.x,
          y: customHeaderPos?.y ?? defaultHeaderBbox.y,
          width: customHeaderPos?.width ?? defaultHeaderBbox.width,
          height: customHeaderPos?.height ?? defaultHeaderBbox.height,
        }
        const headerColor = tplColors[headerId] || '#23255a'
        const headerStrokeColor = tplStrokeColors[headerId] || (isHeaderSelected ? '#4a90d9' : 'none')
        const headerStrokeWidth = tplStrokeWidths[headerId] ?? (isHeaderSelected ? 2 : 0)
        const titleChars = Math.max(8, Math.floor(headerBbox.width / 10))
        const titleLines = wrapTextByWidth(block.title || `Brand 0${index + 1}`, titleChars)

        // 2. Main Card Box
        const cardId = `card-${index}`
        const isCardSelected = selectedIds.has(cardId)
        const defaultCardBbox = { x: colX, y: cardY, width: colW, height: cardH }
        const customCardPos = positions[cardId]
        const cardBbox = {
          x: customCardPos?.x ?? defaultCardBbox.x,
          y: customCardPos?.y ?? defaultCardBbox.y,
          width: customCardPos?.width ?? defaultCardBbox.width,
          height: customCardPos?.height ?? defaultCardBbox.height,
        }
        const cardBg = tplColors[cardId] || '#23255a'
        const cardStrokeColor = tplStrokeColors[cardId] || (isCardSelected ? '#4a90d9' : 'none')
        const cardStrokeWidth = tplStrokeWidths[cardId] ?? (isCardSelected ? 2.5 : 0)

        // Hexagon inside Card
        const cx = cardBbox.x + cardBbox.width / 2
        const cy = cardBbox.y + cardBbox.height / 2
        const hexR = Math.min(cardBbox.width, cardBbox.height) * 0.38
        const hexStrokeW = Math.max(12, Math.round(hexR * 0.18))
        const hexPath = getHexagonPath(cx, cy, hexR)
        const badgePct = parsePercent(block.badgePercent || block.percent, isFirstDarkBrand ? 25 : index === 1 ? 65 : 25)
        const arcColor = isFirstDarkBrand ? '#ffffff' : brandPaletteColor
        const IconComponent = block.icon ? TEMPLATE_ICONS[block.icon] : undefined
        const iconSize = Math.round(hexR * 0.38)

        // 3. Bottom Horizontal Gauge
        const gaugeId = `gauge-${index}`
        const isGaugeSelected = selectedIds.has(gaugeId)
        const defaultGaugeBbox = { x: colX, y: gaugeY, width: colW, height: gaugeH }
        const customGaugePos = positions[gaugeId]
        const gaugeBbox = {
          x: customGaugePos?.x ?? defaultGaugeBbox.x,
          y: customGaugePos?.y ?? defaultGaugeBbox.y,
          width: customGaugePos?.width ?? defaultGaugeBbox.width,
          height: customGaugePos?.height ?? defaultGaugeBbox.height,
        }
        const gaugeColor = tplColors[gaugeId] || (isFirstDarkBrand ? '#23255a' : brandPaletteColor)
        const gaugeStrokeColor = tplStrokeColors[gaugeId] || (isGaugeSelected ? '#4a90d9' : 'none')
        const gaugeStrokeWidth = tplStrokeWidths[gaugeId] ?? (isGaugeSelected ? 2 : 0)
        const gaugePct = parsePercent(block.progress || block.value || block.percent, isFirstDarkBrand ? 35 : index === 1 ? 95 : 75)
        const trackW = Math.max(30, gaugeBbox.width - 56)

        // 4. Description Card
        const descId = `desc-${index}`
        const isDescSelected = selectedIds.has(descId)
        const defaultDescBbox = { x: colX, y: descY, width: colW, height: descH }
        const customDescPos = positions[descId]
        const descBbox = {
          x: customDescPos?.x ?? defaultDescBbox.x,
          y: customDescPos?.y ?? defaultDescBbox.y,
          width: customDescPos?.width ?? defaultDescBbox.width,
          height: customDescPos?.height ?? defaultDescBbox.height,
        }
        const descColor = tplColors[descId] || '#475569'
        const descStrokeColor = tplStrokeColors[descId] || (isDescSelected ? '#4a90d9' : 'none')
        const descStrokeWidth = tplStrokeWidths[descId] ?? (isDescSelected ? 2 : 0)
        const maxDescChars = Math.max(10, Math.floor(descBbox.width / 7.5))
        const descLines = wrapTextByWidth(block.subtitle || block.description || '', maxDescChars)

        return (
          <g key={`brand-${index}`}>
            {/* Header */}
            <g
              data-element-id={headerId}
              onMouseDown={e => startDrag(e, headerId, headerBbox)}
              transform={getTransform(headerId, headerBbox)}
              style={{ cursor: 'pointer' }}
            >
              {headerStrokeWidth > 0 && (
                <rect x={headerBbox.x} y={headerBbox.y} width={headerBbox.width} height={headerBbox.height} rx={4} fill="none" stroke={headerStrokeColor} strokeWidth={headerStrokeWidth} />
              )}
              <text
                x={headerBbox.x + headerBbox.width / 2}
                y={headerBbox.y + headerBbox.height / 2 + (titleLines.length > 1 ? -4 : 6)}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight={800}
                fill={headerColor}
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={headerBbox.x + headerBbox.width / 2} dy={lineIndex === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isHeaderSelected && renderHandles(headerBbox, headerId)}
            </g>

            {/* Main Card with Hexagon */}
            <g
              data-element-id={cardId}
              onMouseDown={e => startDrag(e, cardId, cardBbox)}
              transform={getTransform(cardId, cardBbox)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={cardBbox.x}
                y={cardBbox.y}
                width={cardBbox.width}
                height={cardBbox.height}
                rx={4}
                fill={cardBg}
                stroke={cardStrokeColor}
                strokeWidth={cardStrokeWidth}
              />

              {/* Background Hexagon Track */}
              {!isFirstDarkBrand && (
                <path
                  d={hexPath}
                  fill="none"
                  stroke="rgba(241, 245, 249, 0.9)"
                  strokeWidth={hexStrokeW}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}

              {/* Active Hexagon Arc */}
              <path
                d={hexPath}
                fill="none"
                stroke={arcColor}
                strokeWidth={hexStrokeW}
                strokeLinejoin="round"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={`${badgePct} 100`}
              />

              {/* Center Icon & Percentage */}
              {IconComponent && (
                <g transform={`translate(${cx - iconSize / 2}, ${cy - (badgePct ? iconSize * 0.9 : iconSize / 2)})`}>
                  <IconComponent size={iconSize} color={arcColor} />
                </g>
              )}

              {badgePct > 0 && !isFirstDarkBrand && (
                <text
                  x={cx}
                  y={IconComponent ? cy + iconSize * 0.7 : cy + 8}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={Math.round(hexR * 0.24)}
                  fontWeight={800}
                  fill={arcColor}
                >
                  {badgePct}%
                </text>
              )}

              {isCardSelected && renderHandles(cardBbox, cardId)}
            </g>

            {/* Bottom Horizontal Gauge */}
            <g
              data-element-id={gaugeId}
              onMouseDown={e => startDrag(e, gaugeId, gaugeBbox)}
              transform={getTransform(gaugeId, gaugeBbox)}
              style={{ cursor: 'pointer' }}
            >
              {gaugeStrokeWidth > 0 && (
                <rect x={gaugeBbox.x - 2} y={gaugeBbox.y - 2} width={gaugeBbox.width + 4} height={gaugeBbox.height + 4} rx={6} fill="none" stroke={gaugeStrokeColor} strokeWidth={gaugeStrokeWidth} />
              )}
              <rect x={gaugeBbox.x} y={gaugeBbox.y + (gaugeBbox.height - 18) / 2} width={trackW} height={18} rx={9} fill="#f1f5f9" />
              <rect x={gaugeBbox.x} y={gaugeBbox.y + (gaugeBbox.height - 18) / 2} width={Math.max(0, (gaugePct / 100) * trackW)} height={18} rx={9} fill={gaugeColor} />
              <text x={gaugeBbox.x + trackW + 8} y={gaugeBbox.y + gaugeBbox.height / 2 + 5} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={800} fill={gaugeColor}>
                {gaugePct}%
              </text>
              {isGaugeSelected && renderHandles(gaugeBbox, gaugeId)}
            </g>

            {/* Description Text */}
            <g
              data-element-id={descId}
              onMouseDown={e => startDrag(e, descId, descBbox)}
              transform={getTransform(descId, descBbox)}
              style={{ cursor: 'pointer' }}
            >
              {descStrokeWidth > 0 && (
                <rect x={descBbox.x} y={descBbox.y} width={descBbox.width} height={descBbox.height} rx={4} fill="none" stroke={descStrokeColor} strokeWidth={descStrokeWidth} />
              )}
              <text
                x={descBbox.x + descBbox.width / 2}
                y={descBbox.y + 14}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={13}
                fontWeight={500}
                fill={descColor}
              >
                {descLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={descBbox.x + descBbox.width / 2} dy={lineIndex === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isDescSelected && renderHandles(descBbox, descId)}
            </g>
          </g>
        )
      })}

      {/* VS Separators */}
      {Array.from({ length: count - 1 }, (_, index) => {
        const vsId = `vs-${index}`
        const isVsSelected = selectedIds.has(vsId)
        const vsStrokeColor = tplStrokeColors[vsId] || (isVsSelected ? '#4a90d9' : 'none')
        const vsStrokeWidth = tplStrokeWidths[vsId] ?? (isVsSelected ? 2 : 0)
        const colX = startX + index * (colW + vsW)
        const vsX = colX + colW + (vsW - 50) / 2
        const defaultVsBbox = { x: vsX, y: cardY + cardH / 2 - 25, width: 50, height: 50 }
        const customVsPos = positions[vsId]
        const vsBbox = {
          x: customVsPos?.x ?? defaultVsBbox.x,
          y: customVsPos?.y ?? defaultVsBbox.y,
          width: customVsPos?.width ?? defaultVsBbox.width,
          height: customVsPos?.height ?? defaultVsBbox.height,
        }

        return (
          <g
            key={vsId}
            data-element-id={vsId}
            onMouseDown={e => startDrag(e, vsId, vsBbox)}
            transform={getTransform(vsId, vsBbox)}
            style={{ cursor: 'pointer' }}
          >
            {vsStrokeWidth > 0 && (
              <rect x={vsBbox.x} y={vsBbox.y} width={vsBbox.width} height={vsBbox.height} rx={4} fill="none" stroke={vsStrokeColor} strokeWidth={vsStrokeWidth} />
            )}
            <text
              x={vsBbox.x + vsBbox.width / 2}
              y={vsBbox.y + vsBbox.height / 2 + 11}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={32}
              fontWeight={900}
              fill="#23255a"
            >
              VS
            </text>
            {isVsSelected && renderHandles(vsBbox, vsId)}
          </g>
        )
      })}
    </g>
  )
}
