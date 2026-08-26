import { useRef, type ReactElement } from 'react'
import type { ValueChain3Data, ValueChain3Item } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'

const DEFAULT_CHEVRON_ITEMS: ValueChain3Item[] = [
  { title: 'Logistics', color: '#1a2249' },
  { title: 'Purchasing', color: '#2b63d9' },
  { title: 'Manufacturing', color: '#ff5338' },
  { title: 'Distribution', color: '#ffb100' },
  { title: 'Service', color: '#48bb95' },
]

const DEFAULT_BAR_COLOR = '#c0c0c8'

function createChevronPath(bbox: { x: number; y: number; width: number; height: number }, indent: number): string {
  const { x, y, width, height } = bbox
  const halfHeight = height / 2
  return `M ${x} ${y} L ${x + width - indent} ${y} L ${x + width} ${y + halfHeight} L ${x + width - indent} ${y + height} L ${x} ${y + height} L ${x + indent} ${y + halfHeight} Z`
}

export function ValueChain3Template({ data }: { data: ValueChain3Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const topBarTitle = data.topBar || data.support?.[0]?.title || 'Product Design'
  const bottomBarTitle = data.bottomBar || data.support?.[1]?.title || 'Marketing & Sales'
  const footerText = data.footerText ?? 'MIGSO-PCUBED content and words to be added here as required'

  const rawItems = data.items || data.primary || DEFAULT_CHEVRON_ITEMS
  const items: ValueChain3Item[] = rawItems.map((item, index) => ({
    title: item.title,
    subtitle: item.subtitle,
    color: item.color || DEFAULT_CHEVRON_ITEMS[index % DEFAULT_CHEVRON_ITEMS.length]?.color,
    icon: item.icon,
  }))

  const startX = 50
  const totalWidth = 860
  const topBarHeight = 50
  const chevronHeight = 140
  const bottomBarHeight = 50
  const verticalGap = 16
  const chevronGap = 10

  const topBarDefaultRect = { x: startX, y: 100, width: totalWidth, height: topBarHeight }
  const topBarCustomPos = positions['top-bar']
  const topBarBbox = {
    x: topBarCustomPos ? topBarCustomPos.x : topBarDefaultRect.x,
    y: topBarCustomPos ? topBarCustomPos.y : topBarDefaultRect.y,
    width: topBarCustomPos?.width || topBarDefaultRect.width,
    height: topBarCustomPos?.height || topBarDefaultRect.height,
  }
  const isTopBarSelected = selectedIds.has('top-bar')
  const topBarColor = templateColors['top-bar'] ?? DEFAULT_BAR_COLOR
  const topBarStrokeColor = templateStrokeColors['top-bar'] || (isTopBarSelected ? '#4a90d9' : 'none')
  const topBarStrokeWidth = templateStrokeWidths['top-bar'] ?? (isTopBarSelected ? 2.5 : 0)

  const chevronY = 100 + topBarHeight + verticalGap
  const itemCount = Math.max(1, items.length)
  const chevronWidth = (totalWidth - (itemCount - 1) * chevronGap) / itemCount
  const chevronIndent = Math.min(36, chevronWidth * 0.22)

  const bottomBarY = chevronY + chevronHeight + verticalGap
  const bottomBarDefaultRect = { x: startX, y: bottomBarY, width: totalWidth, height: bottomBarHeight }
  const bottomBarCustomPos = positions['bottom-bar']
  const bottomBarBbox = {
    x: bottomBarCustomPos ? bottomBarCustomPos.x : bottomBarDefaultRect.x,
    y: bottomBarCustomPos ? bottomBarCustomPos.y : bottomBarDefaultRect.y,
    width: bottomBarCustomPos?.width || bottomBarDefaultRect.width,
    height: bottomBarCustomPos?.height || bottomBarDefaultRect.height,
  }
  const isBottomBarSelected = selectedIds.has('bottom-bar')
  const bottomBarColor = templateColors['bottom-bar'] ?? DEFAULT_BAR_COLOR
  const bottomBarStrokeColor = templateStrokeColors['bottom-bar'] || (isBottomBarSelected ? '#4a90d9' : 'none')
  const bottomBarStrokeWidth = templateStrokeWidths['bottom-bar'] ?? (isBottomBarSelected ? 2.5 : 0)

  const footerY = bottomBarY + bottomBarHeight + 36
  const footerDefaultRect = { x: startX, y: footerY - 14, width: totalWidth, height: 28 }
  const footerCustomPos = positions['footer-text']
  const footerBbox = {
    x: footerCustomPos ? footerCustomPos.x : footerDefaultRect.x,
    y: footerCustomPos ? footerCustomPos.y : footerDefaultRect.y,
    width: footerCustomPos?.width || footerDefaultRect.width,
    height: footerCustomPos?.height || footerDefaultRect.height,
  }
  const isFooterSelected = selectedIds.has('footer-text')
  const footerColor = templateColors['footer-text'] ?? '#475569'
  const footerStrokeColor = templateStrokeColors['footer-text'] || (isFooterSelected ? '#4a90d9' : 'none')
  const footerStrokeWidth = templateStrokeWidths['footer-text'] ?? (isFooterSelected ? 2 : 0)

  return (
    <g ref={svgRef}>
      <g
        data-element-id="top-bar"
        onMouseDown={event => startDrag(event, 'top-bar', topBarBbox)}
        transform={getTransform('top-bar', topBarBbox)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={topBarBbox.x}
          y={topBarBbox.y}
          width={topBarBbox.width}
          height={topBarBbox.height}
          fill={topBarColor}
          stroke={topBarStrokeColor}
          strokeWidth={topBarStrokeWidth}
        />
        <text
          x={topBarBbox.x + topBarBbox.width / 2}
          y={topBarBbox.y + topBarBbox.height / 2 + 6}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={18}
          fontWeight={700}
          fill="#ffffff"
        >
          {topBarTitle}
        </text>
        {isTopBarSelected && renderHandles(topBarBbox, 'top-bar')}
      </g>

      {items.map((item, index) => {
        const elementId = `chevron-${index}`
        const itemX = startX + index * (chevronWidth + chevronGap)
        const defaultRect = { x: itemX, y: chevronY, width: chevronWidth, height: chevronHeight }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos ? customPos.x : defaultRect.x,
          y: customPos ? customPos.y : defaultRect.y,
          width: customPos?.width || defaultRect.width,
          height: customPos?.height || defaultRect.height,
        }

        const isSelected = selectedIds.has(elementId)
        const defaultColor = item.color || DEFAULT_CHEVRON_ITEMS[index % DEFAULT_CHEVRON_ITEMS.length]?.color || '#1a2249'
        const color = templateColors[elementId] ?? defaultColor
        const strokeColor = templateStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2.5 : 0)

        const pathData = createChevronPath(bbox, chevronIndent)
        const IconComponent = item.icon ? TEMPLATE_ICONS[item.icon] : undefined

        const maxCharacters = Math.max(6, Math.floor((bbox.width - chevronIndent) / 9))
        const titleLines = wrapTextByWidth(item.title, maxCharacters)
        const subtitleLines = item.subtitle ? wrapTextByWidth(item.subtitle, maxCharacters) : []

        const centerX = bbox.x + bbox.width / 2
        const centerY = bbox.y + bbox.height / 2
        const titleLineHeight = 18
        const totalLinesCount = titleLines.length + subtitleLines.length
        const textStartY = centerY - ((totalLinesCount * titleLineHeight) / 2) + 6

        return (
          <g key={elementId}>
            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, bbox)}
              transform={getTransform(elementId, bbox)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={pathData}
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />

              {IconComponent && (
                <g transform={`translate(${centerX - 10}, ${bbox.y + 24})`}>
                  <IconComponent size={20} color="#ffffff" />
                </g>
              )}

              <text
                x={centerX}
                y={IconComponent ? bbox.y + 64 : textStartY}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={16}
                fontWeight={700}
                fill="#ffffff"
              >
                {titleLines.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={centerX}
                    dy={lineIndex === 0 ? 0 : titleLineHeight}
                  >
                    {line}
                  </tspan>
                ))}
              </text>

              {subtitleLines.length > 0 && (
                <text
                  x={centerX}
                  y={IconComponent ? bbox.y + 64 + titleLines.length * titleLineHeight : textStartY + titleLines.length * titleLineHeight}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight={500}
                  fill="#f1f5f9"
                >
                  {subtitleLines.map((line, lineIndex) => (
                    <tspan
                      key={lineIndex}
                      x={centerX}
                      dy={lineIndex === 0 ? 0 : 14}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      <g
        data-element-id="bottom-bar"
        onMouseDown={event => startDrag(event, 'bottom-bar', bottomBarBbox)}
        transform={getTransform('bottom-bar', bottomBarBbox)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={bottomBarBbox.x}
          y={bottomBarBbox.y}
          width={bottomBarBbox.width}
          height={bottomBarBbox.height}
          fill={bottomBarColor}
          stroke={bottomBarStrokeColor}
          strokeWidth={bottomBarStrokeWidth}
        />
        <text
          x={bottomBarBbox.x + bottomBarBbox.width / 2}
          y={bottomBarBbox.y + bottomBarBbox.height / 2 + 6}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={18}
          fontWeight={700}
          fill="#ffffff"
        >
          {bottomBarTitle}
        </text>
        {isBottomBarSelected && renderHandles(bottomBarBbox, 'bottom-bar')}
      </g>

      {footerText && (
        <g
          data-element-id="footer-text"
          onMouseDown={event => startDrag(event, 'footer-text', footerBbox)}
          transform={getTransform('footer-text', footerBbox)}
          style={{ cursor: 'pointer' }}
        >
          <rect
            x={footerBbox.x}
            y={footerBbox.y}
            width={footerBbox.width}
            height={footerBbox.height}
            fill="transparent"
            stroke={footerStrokeColor}
            strokeWidth={footerStrokeWidth}
          />
          <text
            x={footerBbox.x + footerBbox.width / 2}
            y={footerBbox.y + footerBbox.height / 2 + 4}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={13}
            fontWeight={400}
            fill={footerColor}
          >
            {footerText}
          </text>
          {isFooterSelected && renderHandles(footerBbox, 'footer-text')}
        </g>
      )}
    </g>
  )
}
