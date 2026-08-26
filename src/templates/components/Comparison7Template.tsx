import { useRef, type ReactElement } from 'react'
import type { Comparison7Data, Comparison7Item } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const PRO_COLOR = MIGSO_PALETTE[0]!
const CON_COLOR = MIGSO_PALETTE[1]!

function getHexagonPoints(cx: number, cy: number, w: number, h: number): string {
  const hw = w / 2
  const hh = h / 2
  const pw = w * 0.22
  return [
    `${cx - hw},${cy}`,
    `${cx - hw + pw},${cy - hh}`,
    `${cx + hw - pw},${cy - hh}`,
    `${cx + hw},${cy}`,
    `${cx + hw - pw},${cy + hh}`,
    `${cx - hw + pw},${cy + hh}`,
  ].join(' ')
}

function DeskIconWhite({ size = 20 }: { size?: number }): ReactElement {
  return (
    <g stroke="white" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={size / 2} cy={size * 0.28} r={size * 0.14} />
      <path d={`M ${size * 0.28} ${size * 0.52} Q ${size / 2} ${size * 0.42} ${size * 0.72} ${size * 0.52} L ${size * 0.72} ${size * 0.75} L ${size * 0.28} ${size * 0.75} Z`} />
      <line x1={size * 0.15} y1={size * 0.75} x2={size * 0.85} y2={size * 0.75} />
      <line x1={size * 0.2} y1={size * 0.75} x2={size * 0.2} y2={size * 0.95} />
      <line x1={size * 0.8} y1={size * 0.75} x2={size * 0.8} y2={size * 0.95} />
    </g>
  )
}

function ScreenIconWhite({ size = 20 }: { size?: number }): ReactElement {
  return (
    <g stroke="white" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.15} y={size * 0.15} width={size * 0.7} height={size * 0.52} rx={2} />
      <line x1={size * 0.3} y1={size * 0.32} x2={size * 0.55} y2={size * 0.32} />
      <line x1={size * 0.3} y1={size * 0.44} x2={size * 0.5} y2={size * 0.44} />
      <line x1={size * 0.3} y1={size * 0.54} x2={size * 0.42} y2={size * 0.54} />
      <line x1={size / 2} y1={size * 0.67} x2={size / 2} y2={size * 0.84} />
      <line x1={size * 0.32} y1={size * 0.84} x2={size * 0.68} y2={size * 0.84} />
    </g>
  )
}

function renderItemIcon(iconName: string | undefined, defaultType: 'pro' | 'con', size: number = 22): ReactElement {
  if (iconName && TEMPLATE_ICONS[iconName]) {
    const IconComp = TEMPLATE_ICONS[iconName]!
    return <IconComp size={size} color="white" fill="white" />
  }
  if (defaultType === 'pro') {
    return <DeskIconWhite size={size} />
  }
  return <ScreenIconWhite size={size} />
}

export function Comparison7Template({ data }: { data: Comparison7Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const {
    leftTitle = 'PROS',
    rightTitle = 'CONS',
    pros = [
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
    ],
    cons = [
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
      'MIGSO-PCUBED content and words to be added here as required',
    ],
  } = data || {}

  const W = 800
  const centerX = W / 2
  const centerY = 270

  const hexW = 100
  const hexH = 116
  const hexGap = 12

  const normalizedPros: Comparison7Item[] = pros.map(p =>
    typeof p === 'string' ? { title: p } : p
  )
  const normalizedCons: Comparison7Item[] = cons.map(c =>
    typeof c === 'string' ? { title: c } : c
  )

  const numPros = Math.max(1, normalizedPros.length)
  const numCons = Math.max(1, normalizedCons.length)

  const totalHeight = 440
  const proPitch = totalHeight / numPros
  const conPitch = totalHeight / numCons
  const startY = 60

  // Hexagon PROS Bbox
  const prosHexId = 'hexagon-pros'
  const defaultProsHexBbox = {
    x: centerX - hexW - hexGap / 2,
    y: centerY - hexH / 2,
    width: hexW,
    height: hexH,
  }
  const customProsHexPos = positions[prosHexId]
  const prosHexBbox = {
    x: customProsHexPos?.x ?? defaultProsHexBbox.x,
    y: customProsHexPos?.y ?? defaultProsHexBbox.y,
    width: customProsHexPos?.width ?? defaultProsHexBbox.width,
    height: customProsHexPos?.height ?? defaultProsHexBbox.height,
  }
  const isProsHexSelected = selectedIds.has(prosHexId)
  const prosHexColor = tplColors[prosHexId] || PRO_COLOR
  const prosHexStroke = tplStrokeColors[prosHexId] || (isProsHexSelected ? '#4a90d9' : 'none')
  const prosHexStrokeWidth = tplStrokeWidths[prosHexId] ?? (isProsHexSelected ? 2.5 : 0)

  // Hexagon CONS Bbox
  const consHexId = 'hexagon-cons'
  const defaultConsHexBbox = {
    x: centerX + hexGap / 2,
    y: centerY - hexH / 2,
    width: hexW,
    height: hexH,
  }
  const customConsHexPos = positions[consHexId]
  const consHexBbox = {
    x: customConsHexPos?.x ?? defaultConsHexBbox.x,
    y: customConsHexPos?.y ?? defaultConsHexBbox.y,
    width: customConsHexPos?.width ?? defaultConsHexBbox.width,
    height: customConsHexPos?.height ?? defaultConsHexBbox.height,
  }
  const isConsHexSelected = selectedIds.has(consHexId)
  const consHexColor = tplColors[consHexId] || PRO_COLOR
  const consHexBorder = tplStrokeColors[consHexId] || CON_COLOR
  const consHexStrokeWidth = tplStrokeWidths[consHexId] ?? 6

  // Calculate coordinates for Pro items
  const proBadgeCoords = normalizedPros.map((_, index) => {
    const badgeId = `pro-badge-${index}`
    const defaultBadgeBbox = {
      x: 195,
      y: startY + index * proPitch + proPitch / 2 - 19,
      width: 38,
      height: 38,
    }
    const customPos = positions[badgeId]
    return {
      x: customPos?.x ?? defaultBadgeBbox.x,
      y: customPos?.y ?? defaultBadgeBbox.y,
      width: customPos?.width ?? defaultBadgeBbox.width,
      height: customPos?.height ?? defaultBadgeBbox.height,
    }
  })

  // Calculate coordinates for Con items
  const conBadgeCoords = normalizedCons.map((_, index) => {
    const badgeId = `con-badge-${index}`
    const defaultBadgeBbox = {
      x: 567,
      y: startY + index * conPitch + conPitch / 2 - 19,
      width: 38,
      height: 38,
    }
    const customPos = positions[badgeId]
    return {
      x: customPos?.x ?? defaultBadgeBbox.x,
      y: customPos?.y ?? defaultBadgeBbox.y,
      width: customPos?.width ?? defaultBadgeBbox.width,
      height: customPos?.height ?? defaultBadgeBbox.height,
    }
  })

  // Left trunk geometry
  const leftTipX = prosHexBbox.x
  const leftTipY = prosHexBbox.y + prosHexBbox.height / 2
  const leftTrunkX = 256
  const minProY = proBadgeCoords[0] ? proBadgeCoords[0].y + proBadgeCoords[0].height / 2 : leftTipY
  const maxProY = proBadgeCoords[proBadgeCoords.length - 1]
    ? proBadgeCoords[proBadgeCoords.length - 1]!.y + proBadgeCoords[proBadgeCoords.length - 1]!.height / 2
    : leftTipY

  // Right trunk geometry
  const rightTipX = consHexBbox.x + consHexBbox.width
  const rightTipY = consHexBbox.y + consHexBbox.height / 2
  const rightTrunkX = 544
  const minConY = conBadgeCoords[0] ? conBadgeCoords[0].y + conBadgeCoords[0].height / 2 : rightTipY
  const maxConY = conBadgeCoords[conBadgeCoords.length - 1]
    ? conBadgeCoords[conBadgeCoords.length - 1]!.y + conBadgeCoords[conBadgeCoords.length - 1]!.height / 2
    : rightTipY

  return (
    <g ref={svgRef}>
      {/* Branching Connectors Left (PROS) */}
      <g stroke="#cbd5e1" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Horizontal line from PROS hexagon left point to vertical trunk */}
        <line x1={leftTipX} y1={leftTipY} x2={leftTrunkX} y2={leftTipY} />
        {/* Vertical trunk line */}
        <line x1={leftTrunkX} y1={minProY} x2={leftTrunkX} y2={maxProY} />
        {/* Branch lines to each PRO badge */}
        {proBadgeCoords.map((coord, i) => (
          <line
            key={`pro-line-${i}`}
            x1={leftTrunkX}
            y1={coord.y + coord.height / 2}
            x2={coord.x + coord.width / 2}
            y2={coord.y + coord.height / 2}
          />
        ))}
      </g>

      {/* Branching Connectors Right (CONS) */}
      <g stroke="#cbd5e1" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Horizontal line from CONS hexagon right point to vertical trunk */}
        <line x1={rightTipX} y1={rightTipY} x2={rightTrunkX} y2={rightTipY} />
        {/* Vertical trunk line */}
        <line x1={rightTrunkX} y1={minConY} x2={rightTrunkX} y2={maxConY} />
        {/* Branch lines to each CON badge */}
        {conBadgeCoords.map((coord, i) => (
          <line
            key={`con-line-${i}`}
            x1={rightTrunkX}
            y1={coord.y + coord.height / 2}
            x2={coord.x + coord.width / 2}
            y2={coord.y + coord.height / 2}
          />
        ))}
      </g>

      {/* PROS Hexagon */}
      <g
        data-element-id={prosHexId}
        onMouseDown={e => startDrag(e, prosHexId, prosHexBbox)}
        transform={getTransform(prosHexId, prosHexBbox)}
        style={{ cursor: 'pointer' }}
      >
        <polygon
          points={getHexagonPoints(
            prosHexBbox.x + prosHexBbox.width / 2,
            prosHexBbox.y + prosHexBbox.height / 2,
            prosHexBbox.width,
            prosHexBbox.height
          )}
          fill={prosHexColor}
          stroke={prosHexStroke}
          strokeWidth={prosHexStrokeWidth}
        />
        <text
          x={prosHexBbox.x + prosHexBbox.width / 2}
          y={prosHexBbox.y + prosHexBbox.height / 2 + 7}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={20}
          fontWeight={800}
          letterSpacing={1}
          fill="white"
        >
          {leftTitle}
        </text>
        {isProsHexSelected && renderHandles(prosHexBbox, prosHexId)}
      </g>

      {/* CONS Hexagon */}
      <g
        data-element-id={consHexId}
        onMouseDown={e => startDrag(e, consHexId, consHexBbox)}
        transform={getTransform(consHexId, consHexBbox)}
        style={{ cursor: 'pointer' }}
      >
        <polygon
          points={getHexagonPoints(
            consHexBbox.x + consHexBbox.width / 2,
            consHexBbox.y + consHexBbox.height / 2,
            consHexBbox.width,
            consHexBbox.height
          )}
          fill={consHexColor}
          stroke={consHexBorder}
          strokeWidth={consHexStrokeWidth}
        />
        <text
          x={consHexBbox.x + consHexBbox.width / 2}
          y={consHexBbox.y + consHexBbox.height / 2 + 7}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={20}
          fontWeight={800}
          letterSpacing={1}
          fill={CON_COLOR}
        >
          {rightTitle}
        </text>
        {isConsHexSelected && renderHandles(consHexBbox, consHexId)}
      </g>

      {/* PRO Items (Left) */}
      {normalizedPros.map((item, index) => {
        const badgeId = `pro-badge-${index}`
        const badgeBbox = proBadgeCoords[index]!
        const isBadgeSelected = selectedIds.has(badgeId)
        const badgeColor = tplColors[badgeId] || item.color || PRO_COLOR
        const badgeStroke = tplStrokeColors[badgeId] || (isBadgeSelected ? '#4a90d9' : 'none')
        const badgeStrokeWidth = tplStrokeWidths[badgeId] ?? (isBadgeSelected ? 2.5 : 0)

        const cardId = `pro-card-${index}`
        const defaultCardBbox = {
          x: 20,
          y: badgeBbox.y - 4,
          width: 160,
          height: 48,
        }
        const customCardPos = positions[cardId]
        const cardBbox = {
          x: customCardPos?.x ?? defaultCardBbox.x,
          y: customCardPos?.y ?? defaultCardBbox.y,
          width: customCardPos?.width ?? defaultCardBbox.width,
          height: customCardPos?.height ?? defaultCardBbox.height,
        }
        const isCardSelected = selectedIds.has(cardId)
        const maxChars = Math.max(8, Math.floor(cardBbox.width / 6.8))
        const lines = wrapTextByWidth(item.title, maxChars)

        return (
          <g key={`pro-group-${index}`}>
            {/* Descriptive Text Card */}
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
                fill="transparent"
                stroke={isCardSelected ? '#4a90d9' : 'none'}
                strokeWidth={isCardSelected ? 1.5 : 0}
                rx={4}
              />
              <text
                x={cardBbox.x + cardBbox.width}
                y={cardBbox.y + 14}
                textAnchor="end"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#1e293b"
              >
                {lines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={cardBbox.x + cardBbox.width} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isCardSelected && renderHandles(cardBbox, cardId)}
            </g>

            {/* Circular Icon Badge */}
            <g
              data-element-id={badgeId}
              onMouseDown={e => startDrag(e, badgeId, badgeBbox)}
              transform={getTransform(badgeId, badgeBbox)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={badgeBbox.x + badgeBbox.width / 2}
                cy={badgeBbox.y + badgeBbox.height / 2}
                r={Math.min(badgeBbox.width, badgeBbox.height) / 2}
                fill={badgeColor}
                stroke={badgeStroke}
                strokeWidth={badgeStrokeWidth}
              />
              <g transform={`translate(${badgeBbox.x + badgeBbox.width / 2 - 11}, ${badgeBbox.y + badgeBbox.height / 2 - 11})`}>
                {renderItemIcon(item.icon, 'pro', 22)}
              </g>
              {isBadgeSelected && renderHandles(badgeBbox, badgeId)}
            </g>
          </g>
        )
      })}

      {/* CON Items (Right) */}
      {normalizedCons.map((item, index) => {
        const badgeId = `con-badge-${index}`
        const badgeBbox = conBadgeCoords[index]!
        const isBadgeSelected = selectedIds.has(badgeId)
        const badgeColor = tplColors[badgeId] || item.color || CON_COLOR
        const badgeStroke = tplStrokeColors[badgeId] || (isBadgeSelected ? '#4a90d9' : 'none')
        const badgeStrokeWidth = tplStrokeWidths[badgeId] ?? (isBadgeSelected ? 2.5 : 0)

        const cardId = `con-card-${index}`
        const defaultCardBbox = {
          x: 620,
          y: badgeBbox.y - 4,
          width: 160,
          height: 48,
        }
        const customCardPos = positions[cardId]
        const cardBbox = {
          x: customCardPos?.x ?? defaultCardBbox.x,
          y: customCardPos?.y ?? defaultCardBbox.y,
          width: customCardPos?.width ?? defaultCardBbox.width,
          height: customCardPos?.height ?? defaultCardBbox.height,
        }
        const isCardSelected = selectedIds.has(cardId)
        const maxChars = Math.max(8, Math.floor(cardBbox.width / 6.8))
        const lines = wrapTextByWidth(item.title, maxChars)

        return (
          <g key={`con-group-${index}`}>
            {/* Circular Icon Badge */}
            <g
              data-element-id={badgeId}
              onMouseDown={e => startDrag(e, badgeId, badgeBbox)}
              transform={getTransform(badgeId, badgeBbox)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={badgeBbox.x + badgeBbox.width / 2}
                cy={badgeBbox.y + badgeBbox.height / 2}
                r={Math.min(badgeBbox.width, badgeBbox.height) / 2}
                fill={badgeColor}
                stroke={badgeStroke}
                strokeWidth={badgeStrokeWidth}
              />
              <g transform={`translate(${badgeBbox.x + badgeBbox.width / 2 - 11}, ${badgeBbox.y + badgeBbox.height / 2 - 11})`}>
                {renderItemIcon(item.icon, 'con', 22)}
              </g>
              {isBadgeSelected && renderHandles(badgeBbox, badgeId)}
            </g>

            {/* Descriptive Text Card */}
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
                fill="transparent"
                stroke={isCardSelected ? '#4a90d9' : 'none'}
                strokeWidth={isCardSelected ? 1.5 : 0}
                rx={4}
              />
              <text
                x={cardBbox.x}
                y={cardBbox.y + 14}
                textAnchor="start"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill="#1e293b"
              >
                {lines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={cardBbox.x} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isCardSelected && renderHandles(cardBbox, cardId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
