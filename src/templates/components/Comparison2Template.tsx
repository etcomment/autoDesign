import { useRef, type ReactElement } from 'react'
import type { Comparison2Data, ComparisonBlock } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

function parsePercent(val?: string | number, defaultVal: number = 50): number {
  if (typeof val === 'number') return Math.max(0, Math.min(100, val))
  if (!val) return defaultVal
  const cleaned = String(val).replace(/[^0-9.]/g, '')
  const num = parseFloat(cleaned)
  return isNaN(num) ? defaultVal : Math.max(0, Math.min(100, num))
}

const HEX_OUTER = 'M 4620 450 C 4477 202 4127 0 3842 0 L 1894 0 C 1609 0 1259 202 1116 450 L 143 2136 C 0 2383 0 2787 143 3034 L 1116 4720 C 1259 4967 1609 5169 1894 5169 L 3842 5169 C 4127 5169 4477 4967 4620 4720 L 5593 3034 C 5736 2787 5736 2383 5593 2136 L 4620 450 Z'
const HEX_INNER = 'M 4220 4029 C 4078 4276 3728 4478 3443 4478 L 2293 4478 C 2008 4478 1658 4276 1516 4029 L 941 3034 C 798 2787 798 2383 941 2136 L 1516 1141 C 1658 894 2008 692 2293 692 L 3443 692 C 3728 692 4078 894 4220 1141 L 4795 2136 C 4938 2383 4938 2787 4795 3034 L 4220 4029 Z'

function makePieSlicePath(cx: number, cy: number, r: number, pct: number): string {
  if (pct >= 100) {
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`
  }
  if (pct <= 0) return ''
  const startAngle = -Math.PI / 2
  const sweepAngle = (pct / 100) * 2 * Math.PI
  const endAngle = startAngle + sweepAngle
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const largeArc = sweepAngle > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
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
          percent: '95%',
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
  const vsW = 44
  const totalVsW = (count - 1) * vsW
  const marginX = 40
  const availableW = W - marginX * 2 - totalVsW
  const colW = Math.max(160, Math.min(260, availableW / count))
  const totalW = count * colW + totalVsW
  const startX = (W - totalW) / 2

  const headerH = 28
  const headerY = 24
  const cardY = 62
  const cardH = 250
  const gaugeY = cardY + cardH + 16
  const gaugeH = 24
  const descY = gaugeY + gaugeH + 14
  const descH = 50

  return (
    <g ref={svgRef}>
      <defs>
        {rawBlocks.map((_, index) => {
          const colX = startX + index * (colW + vsW)
          const cardId = `card-${index}`
          const customCardPos = positions[cardId]
          const curCardX = customCardPos?.x ?? colX
          const curCardY = customCardPos?.y ?? cardY
          const curCardW = customCardPos?.width ?? colW
          const curCardH = customCardPos?.height ?? cardH
          const hexW = curCardW * 0.78
          const hexH = hexW * (5170 / 5737)
          const hexX = curCardX + (curCardW - hexW) / 2
          const hexY = curCardY + (curCardH - hexH) / 2
          const scale = hexW / 5737

          return (
            <clipPath key={`clip-hex-2-${index}`} id={`clip-hex-ring-2-${index}`}>
              <g transform={`translate(${hexX}, ${hexY}) scale(${scale})`}>
                <path d={`${HEX_OUTER} ${HEX_INNER}`} clipRule="evenodd" />
              </g>
            </clipPath>
          )
        })}
      </defs>

      {rawBlocks.map((block, index) => {
        const colX = startX + index * (colW + vsW)
        const brandPaletteColor = block.color || MIGSO_PALETTE[index % MIGSO_PALETTE.length] || '#2c2b64'

        // 1. Header
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
        const headerColor = tplColors[headerId] || '#2c2b64'
        const headerStrokeColor = tplStrokeColors[headerId] || (isHeaderSelected ? '#4a90d9' : 'none')
        const headerStrokeWidth = tplStrokeWidths[headerId] ?? (isHeaderSelected ? 2 : 0)
        const titleChars = Math.max(8, Math.floor(headerBbox.width / 10))
        const titleLines = wrapTextByWidth(block.title || `Brand 0${index + 1}`, titleChars)

        // 2. Main Card
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
        const cardBg = tplColors[cardId] || '#2c2b64'
        const cardStrokeColor = tplStrokeColors[cardId] || (isCardSelected ? '#4a90d9' : 'none')
        const cardStrokeWidth = tplStrokeWidths[cardId] ?? (isCardSelected ? 2.5 : 0)

        // Hexagon inside Card
        const hexW = cardBbox.width * 0.78
        const hexH = hexW * (5170 / 5737)
        const hexX = cardBbox.x + (cardBbox.width - hexW) / 2
        const hexY = cardBbox.y + (cardBbox.height - hexH) / 2
        const scale = hexW / 5737
        const cx = hexX + hexW / 2
        const cy = hexY + hexH / 2
        const radius = hexW * 0.65
        const badgePct = parsePercent(block.badgePercent || block.percent, 50)
        const pieSlicePath = makePieSlicePath(cx, cy, radius, badgePct)
        const IconComponent = block.icon ? TEMPLATE_ICONS[block.icon] : undefined
        const iconSize = Math.round(hexW * 0.23)

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
        const gaugeColor = tplColors[gaugeId] || brandPaletteColor
        const gaugeStrokeColor = tplStrokeColors[gaugeId] || (isGaugeSelected ? '#4a90d9' : 'none')
        const gaugeStrokeWidth = tplStrokeWidths[gaugeId] ?? (isGaugeSelected ? 2 : 0)
        const gaugePct = parsePercent(block.progress || block.value, 75)
        const trackW = Math.max(30, gaugeBbox.width - 50)

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
        const descColor = tplColors[descId] || '#334155'
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
                y={headerBbox.y + headerBbox.height / 2 + 5}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={15}
                fontWeight={700}
                fill={headerColor}
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={headerBbox.x + headerBbox.width / 2} dy={lineIndex === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isHeaderSelected && renderHandles(headerBbox, headerId)}
            </g>

            {/* Main Card with Rounded Hexagon Gauge */}
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
                rx={0}
                fill={cardBg}
                stroke={cardStrokeColor}
                strokeWidth={cardStrokeWidth}
              />

              {/* Background Light Gray Hexagon Ring */}
              <g transform={`translate(${hexX}, ${hexY}) scale(${scale})`}>
                <path d={`${HEX_OUTER} ${HEX_INNER}`} fill="#f0f0f0" clipRule="evenodd" />
              </g>

              {/* Active Color Pie Slice clipped by Hexagon Ring */}
              <path
                d={pieSlicePath}
                fill={brandPaletteColor}
                clipPath={`url(#clip-hex-ring-2-${index})`}
              />

              {/* Center Icon */}
              {IconComponent && (
                <g transform={`translate(${cx - iconSize / 2}, ${cy - iconSize * 0.85})`}>
                  <IconComponent size={iconSize} color={brandPaletteColor} />
                </g>
              )}

              {/* Center Percentage */}
              <text
                x={cx}
                y={IconComponent ? cy + iconSize * 0.75 : cy + 6}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={24}
                fontWeight={700}
                fill={brandPaletteColor}
              >
                {badgePct}%
              </text>

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
              <rect x={gaugeBbox.x} y={gaugeBbox.y + (gaugeBbox.height - 14) / 2} width={trackW} height={14} rx={7} fill="#f0f0f0" />
              <rect x={gaugeBbox.x} y={gaugeBbox.y + (gaugeBbox.height - 14) / 2} width={Math.max(0, (gaugePct / 100) * trackW)} height={14} rx={7} fill={gaugeColor} />
              <text x={gaugeBbox.x + trackW + 8} y={gaugeBbox.y + gaugeBbox.height / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill={gaugeColor}>
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
                fontSize={11.5}
                fontWeight={400}
                fill={descColor}
              >
                {descLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={descBbox.x + descBbox.width / 2} dy={lineIndex === 0 ? 0 : 14}>
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
        const vsX = colX + colW + (vsW - 40) / 2
        const defaultVsBbox = { x: vsX, y: cardY + cardH / 2 - 20, width: 40, height: 40 }
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
              y={vsBbox.y + vsBbox.height / 2 + 10}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={28}
              fontWeight={800}
              fill="#2c2b64"
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
