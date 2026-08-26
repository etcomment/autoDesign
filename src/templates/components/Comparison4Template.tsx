import { useRef, type ReactElement } from 'react'
import type { ComparisonData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import { MIGSO_PALETTE } from '../../lib/theme'

const DEFAULT_COLOR_A = MIGSO_PALETTE[0]!
const DEFAULT_COLOR_B = MIGSO_PALETTE[1]!

export function Comparison4Template({ data }: { data: ComparisonData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const { leftTitle, rightTitle, items = [] } = data || {}

  const itemA = items[0]
  const itemB = items[1]

  const pctA = itemA?.percent || itemA?.left || '57%'
  const pctB = itemB?.percent || itemB?.right || '43%'
  const iconA = itemA?.icon || 'laptop'
  const iconB = itemB?.icon || 'lightbulb'

  const centerCx = 500
  const centerCy = 270
  const centerR = 120
  const ringThickness = 28
  const innerR = centerR
  const outerR = centerR + ringThickness

  const centerId = 'center-card'
  const centerDefaultBbox = {
    x: centerCx - centerR,
    y: centerCy - centerR,
    width: centerR * 2,
    height: centerR * 2,
  }
  const centerCustom = positions[centerId]
  const centerBbox = {
    x: centerCustom?.x ?? centerDefaultBbox.x,
    y: centerCustom?.y ?? centerDefaultBbox.y,
    width: centerCustom?.width ?? centerDefaultBbox.width,
    height: centerCustom?.height ?? centerDefaultBbox.height,
  }
  const isCenterSelected = selectedIds.has(centerId)
  const centerStrokeColor = tplStrokeColors[centerId] || (isCenterSelected ? '#4a90d9' : 'none')
  const centerStrokeWidth = tplStrokeWidths[centerId] ?? (isCenterSelected ? 2 : 0)

  const badgeAId = 'badge-a'
  const badgeAR = 26
  const badgeADefaultBbox = {
    x: centerCx - badgeAR,
    y: centerCy - outerR + (outerR - innerR) / 2 - badgeAR,
    width: badgeAR * 2,
    height: badgeAR * 2,
  }
  const badgeACustom = positions[badgeAId]
  const badgeABbox = {
    x: badgeACustom?.x ?? badgeADefaultBbox.x,
    y: badgeACustom?.y ?? badgeADefaultBbox.y,
    width: badgeACustom?.width ?? badgeADefaultBbox.width,
    height: badgeACustom?.height ?? badgeADefaultBbox.height,
  }
  const isBadgeASelected = selectedIds.has(badgeAId)

  const badgeBId = 'badge-b'
  const badgeBR = 26
  const badgeBDefaultBbox = {
    x: centerCx + 74,
    y: centerCy + 98,
    width: badgeBR * 2,
    height: badgeBR * 2,
  }
  const badgeBCustom = positions[badgeBId]
  const badgeBBbox = {
    x: badgeBCustom?.x ?? badgeBDefaultBbox.x,
    y: badgeBCustom?.y ?? badgeBDefaultBbox.y,
    width: badgeBCustom?.width ?? badgeBDefaultBbox.width,
    height: badgeBCustom?.height ?? badgeBDefaultBbox.height,
  }
  const isBadgeBSelected = selectedIds.has(badgeBId)

  const discAId = 'disc-a'
  const discAR = 68
  const discADefaultBbox = {
    x: centerCx - 275 - discAR,
    y: centerCy - 10 - discAR,
    width: discAR * 2,
    height: discAR * 2,
  }
  const discACustom = positions[discAId]
  const discABbox = {
    x: discACustom?.x ?? discADefaultBbox.x,
    y: discACustom?.y ?? discADefaultBbox.y,
    width: discACustom?.width ?? discADefaultBbox.width,
    height: discACustom?.height ?? discADefaultBbox.height,
  }
  const isDiscASelected = selectedIds.has(discAId)
  const colorA = tplColors[discAId] || itemA?.color || DEFAULT_COLOR_A
  const strokeColorA = tplStrokeColors[discAId] || (isDiscASelected ? '#4a90d9' : 'none')
  const strokeWidthA = tplStrokeWidths[discAId] ?? (isDiscASelected ? 2.5 : 0)

  const discBId = 'disc-b'
  const discBR = 68
  const discBDefaultBbox = {
    x: centerCx + 240 - discBR,
    y: centerCy + 40 - discBR,
    width: discBR * 2,
    height: discBR * 2,
  }
  const discBCustom = positions[discBId]
  const discBBbox = {
    x: discBCustom?.x ?? discBDefaultBbox.x,
    y: discBCustom?.y ?? discBDefaultBbox.y,
    width: discBCustom?.width ?? discBDefaultBbox.width,
    height: discBCustom?.height ?? discBDefaultBbox.height,
  }
  const isDiscBSelected = selectedIds.has(discBId)
  const colorB = tplColors[discBId] || itemB?.color || DEFAULT_COLOR_B
  const strokeColorB = tplStrokeColors[discBId] || (isDiscBSelected ? '#4a90d9' : 'none')
  const strokeWidthB = tplStrokeWidths[discBId] ?? (isDiscBSelected ? 2.5 : 0)

  const statAId = 'stat-a'
  const statADefaultBbox = {
    x: discABbox.x,
    y: discABbox.y - 60,
    width: discABbox.width,
    height: 44,
  }
  const statACustom = positions[statAId]
  const statABbox = {
    x: statACustom?.x ?? statADefaultBbox.x,
    y: statACustom?.y ?? statADefaultBbox.y,
    width: statACustom?.width ?? statADefaultBbox.width,
    height: statACustom?.height ?? statADefaultBbox.height,
  }
  const isStatASelected = selectedIds.has(statAId)

  const statBId = 'stat-b'
  const statBDefaultBbox = {
    x: discBBbox.x,
    y: discBBbox.y + discBBbox.height + 16,
    width: discBBbox.width,
    height: 44,
  }
  const statBCustom = positions[statBId]
  const statBBbox = {
    x: statBCustom?.x ?? statBDefaultBbox.x,
    y: statBCustom?.y ?? statBDefaultBbox.y,
    width: statBCustom?.width ?? statBDefaultBbox.width,
    height: statBCustom?.height ?? statBDefaultBbox.height,
  }
  const isStatBSelected = selectedIds.has(statBId)

  const centerTitle = data?.title || leftTitle || 'Your title'
  const centerSubtitle = itemA?.subtitle || itemB?.subtitle || rightTitle || 'MIGSO-PCUBED content and words to be added here as required'
  const centerTitleLines = wrapTextByWidth(centerTitle, Math.max(8, Math.floor(centerBbox.width / 11)))
  const centerSubLines = wrapTextByWidth(centerSubtitle, Math.max(12, Math.floor(centerBbox.width / 7.5)))

  const IconAComponent = TEMPLATE_ICONS[iconA] || TEMPLATE_ICONS.laptop
  const IconBComponent = TEMPLATE_ICONS[iconB] || TEMPLATE_ICONS.lightbulb

  const arrowTipX_A = 70
  const arrowTipX_B = 890

  return (
    <g ref={svgRef}>
      <g>
        <path
          d={`
            M ${centerCx + innerR * Math.cos(Math.PI / 4)} ${centerCy + innerR * Math.sin(Math.PI / 4)}
            A ${innerR} ${innerR} 0 1 1 ${centerCx} ${centerCy - innerR}
            L ${centerCx} ${centerCy - outerR}
            A ${outerR} ${outerR} 0 1 0 ${centerCx + outerR * Math.cos(Math.PI / 4)} ${centerCy + outerR * Math.sin(Math.PI / 4)}
            Z
          `}
          fill={colorA}
        />
        <path
          d={`
            M ${centerCx} ${centerCy + innerR}
            L ${arrowTipX_A + 46} ${centerCy + innerR}
            L ${arrowTipX_A + 46} ${centerCy + innerR + 18}
            L ${arrowTipX_A} ${centerCy + innerR - ringThickness / 2}
            L ${arrowTipX_A + 46} ${centerCy + innerR - ringThickness - 18}
            L ${arrowTipX_A + 46} ${centerCy + innerR - ringThickness}
            L ${centerCx} ${centerCy + innerR - ringThickness}
            Z
          `}
          fill={colorA}
        />
      </g>

      <g>
        <path
          d={`
            M ${centerCx + 14} ${centerCy - outerR + 4}
            A ${outerR} ${outerR} 0 0 1 ${centerCx + outerR * Math.cos((50 * Math.PI) / 180)} ${centerCy + outerR * Math.sin((50 * Math.PI) / 180)}
            L ${centerCx + innerR * Math.cos((50 * Math.PI) / 180)} ${centerCy + innerR * Math.sin((50 * Math.PI) / 180)}
            A ${innerR} ${innerR} 0 0 0 ${centerCx + 14} ${centerCy - innerR + 12}
            Z
          `}
          fill={colorB}
        />
        <path
          d={`
            M ${centerCx} ${centerCy - outerR}
            L ${arrowTipX_B - 46} ${centerCy - outerR}
            L ${arrowTipX_B - 46} ${centerCy - outerR - 18}
            L ${arrowTipX_B} ${centerCy - outerR + ringThickness / 2}
            L ${arrowTipX_B - 46} ${centerCy - outerR + ringThickness + 18}
            L ${arrowTipX_B - 46} ${centerCy - outerR + ringThickness}
            L ${centerCx + outerR * Math.sin((50 * Math.PI) / 180)} ${centerCy - outerR + ringThickness}
            Z
          `}
          fill={colorB}
        />
      </g>

      <g
        key={centerId}
        data-element-id={centerId}
        onMouseDown={e => startDrag(e, centerId, centerBbox)}
        transform={getTransform(centerId, centerBbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={centerBbox.x + centerBbox.width / 2}
          cy={centerBbox.y + centerBbox.height / 2}
          r={centerBbox.width / 2 - 2}
          fill="#ffffff"
          stroke={centerStrokeColor}
          strokeWidth={centerStrokeWidth}
        />

        <text
          x={centerBbox.x + centerBbox.width / 2}
          y={centerBbox.y + centerBbox.height / 2 - 24}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={22}
          fontWeight={800}
          fill="#2c2b64"
        >
          {centerTitleLines.map((line, lineIndex) => (
            <tspan
              key={lineIndex}
              x={centerBbox.x + centerBbox.width / 2}
              dy={lineIndex === 0 ? 0 : 26}
            >
              {line}
            </tspan>
          ))}
        </text>

        <text
          x={centerBbox.x + centerBbox.width / 2}
          y={centerBbox.y + centerBbox.height / 2 + 18}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={12}
          fontWeight={500}
          fill="#64748b"
        >
          {centerSubLines.map((line, lineIndex) => (
            <tspan
              key={lineIndex}
              x={centerBbox.x + centerBbox.width / 2}
              dy={lineIndex === 0 ? 0 : 16}
            >
              {line}
            </tspan>
          ))}
        </text>

        {isCenterSelected && renderHandles(centerBbox, centerId)}
      </g>

      <g
        key={badgeAId}
        data-element-id={badgeAId}
        onMouseDown={e => startDrag(e, badgeAId, badgeABbox)}
        transform={getTransform(badgeAId, badgeABbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={badgeABbox.x + badgeABbox.width / 2}
          cy={badgeABbox.y + badgeABbox.height / 2}
          r={badgeABbox.width / 2}
          fill="#ffffff"
          stroke={isBadgeASelected ? '#4a90d9' : '#e2e8f0'}
          strokeWidth={isBadgeASelected ? 2.5 : 1}
        />
        <text
          x={badgeABbox.x + badgeABbox.width / 2}
          y={badgeABbox.y + badgeABbox.height / 2 + 7}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={19}
          fontWeight={800}
          fill="#2c2b64"
        >
          A
        </text>
        {isBadgeASelected && renderHandles(badgeABbox, badgeAId)}
      </g>

      <g
        key={badgeBId}
        data-element-id={badgeBId}
        onMouseDown={e => startDrag(e, badgeBId, badgeBBbox)}
        transform={getTransform(badgeBId, badgeBBbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={badgeBBbox.x + badgeBBbox.width / 2}
          cy={badgeBBbox.y + badgeBBbox.height / 2}
          r={badgeBBbox.width / 2}
          fill="#ffffff"
          stroke={isBadgeBSelected ? '#4a90d9' : '#e2e8f0'}
          strokeWidth={isBadgeBSelected ? 2.5 : 1}
        />
        <text
          x={badgeBBbox.x + badgeBBbox.width / 2}
          y={badgeBBbox.y + badgeBBbox.height / 2 + 7}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={19}
          fontWeight={800}
          fill="#2c2b64"
        >
          B
        </text>
        {isBadgeBSelected && renderHandles(badgeBBbox, badgeBId)}
      </g>

      <g
        key={statAId}
        data-element-id={statAId}
        onMouseDown={e => startDrag(e, statAId, statABbox)}
        transform={getTransform(statAId, statABbox)}
        style={{ cursor: 'pointer' }}
      >
        <text
          x={statABbox.x + statABbox.width / 2}
          y={statABbox.y + statABbox.height - 8}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={34}
          fontWeight={800}
          fill={colorA}
        >
          {pctA}
        </text>
        {isStatASelected && renderHandles(statABbox, statAId)}
      </g>

      <g
        key={discAId}
        data-element-id={discAId}
        onMouseDown={e => startDrag(e, discAId, discABbox)}
        transform={getTransform(discAId, discABbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={discABbox.x + discABbox.width / 2}
          cy={discABbox.y + discABbox.height / 2}
          r={discABbox.width / 2}
          fill={colorA}
          stroke={strokeColorA}
          strokeWidth={strokeWidthA}
        />
        {IconAComponent && (
          <g
            transform={`translate(${discABbox.x + discABbox.width / 2 - 24}, ${discABbox.y + discABbox.height / 2 - 24})`}
          >
            <IconAComponent size={48} color="#ffffff" fill="none" />
          </g>
        )}
        {isDiscASelected && renderHandles(discABbox, discAId)}
      </g>

      <g
        key={discBId}
        data-element-id={discBId}
        onMouseDown={e => startDrag(e, discBId, discBBbox)}
        transform={getTransform(discBId, discBBbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={discBBbox.x + discBBbox.width / 2}
          cy={discBBbox.y + discBBbox.height / 2}
          r={discBBbox.width / 2}
          fill={colorB}
          stroke={strokeColorB}
          strokeWidth={strokeWidthB}
        />
        {IconBComponent && (
          <g
            transform={`translate(${discBBbox.x + discBBbox.width / 2 - 24}, ${discBBbox.y + discBBbox.height / 2 - 24})`}
          >
            <IconBComponent size={48} color="#ffffff" fill="none" />
          </g>
        )}
        {isDiscBSelected && renderHandles(discBBbox, discBId)}
      </g>

      <g
        key={statBId}
        data-element-id={statBId}
        onMouseDown={e => startDrag(e, statBId, statBBbox)}
        transform={getTransform(statBId, statBBbox)}
        style={{ cursor: 'pointer' }}
      >
        <text
          x={statBBbox.x + statBBbox.width / 2}
          y={statBBbox.y + 30}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={34}
          fontWeight={800}
          fill={colorB}
        >
          {pctB}
        </text>
        {isStatBSelected && renderHandles(statBBbox, statBId)}
      </g>
    </g>
  )
}
