import { useRef, type ReactElement } from 'react'
import type { BudgetData, BudgetItem } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth } from '../shared/primitives'
import { MIGSO_PALETTE } from '../../lib/theme'

const DEFAULT_COLUMNS = ['Cost type', 'Planned (£)', 'Actual (£)', 'Variance (£)']
const DEFAULT_ITEMS: BudgetItem[] = [
  { label: 'Staff Costs (Internal)', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Services (External)', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Material', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Travel Expenses', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Advertising Expenses', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Rent', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Hardware', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Software/Licenses', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Equipment', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
  { label: 'Other Costs', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
]

export function Budget5Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const positions = useTemplateStore(s => s.templateElementPositions)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)

  const items = data.items && data.items.length > 0 ? data.items : DEFAULT_ITEMS
  const columns = data.columns && data.columns.length > 0 ? data.columns : DEFAULT_COLUMNS
  const totalLabel = data.totalLabel || 'Total costs'
  const totalAmount = data.totalAmount || '£50,000.00'
  const totalActual = data.totalActual || '£30,000.00'
  const totalVariance = data.totalVariance || '£20,000.00'

  const tableX = 40
  const tableWidth = 880
  const colCount = Math.max(1, columns.length)
  const firstColRatio = colCount > 1 ? 0.37 : 1
  const remainingRatio = colCount > 1 ? (1 - firstColRatio) / (colCount - 1) : 0

  const colWidths = columns.map((_, colIndex) =>
    colIndex === 0 ? tableWidth * firstColRatio : tableWidth * remainingRatio
  )

  const colXPositions: number[] = []
  let accumulatedX = tableX
  for (let i = 0; i < colCount; i++) {
    colXPositions.push(accumulatedX)
    accumulatedX += colWidths[i]!
  }

  const topLineY = 46
  const headerTextY = 74
  const headerBottomY = 92

  const maxItemsHeight = 390
  const rowHeight = Math.min(38, Math.max(26, maxItemsHeight / Math.max(1, items.length + 1.5)))
  const totalRowY = headerBottomY + items.length * rowHeight + 10

  const accentColors = [
    MIGSO_PALETTE[0] ?? '#1a2249',
    MIGSO_PALETTE[1] ?? '#2b63d9',
    MIGSO_PALETTE[2] ?? '#ff5338',
    MIGSO_PALETTE[3] ?? '#ffb100',
  ]

  return (
    <g ref={svgRef}>
      <line
        x1={tableX}
        y1={topLineY}
        x2={tableX + tableWidth}
        y2={topLineY}
        stroke="#cbd5e1"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {columns.map((columnName, colIndex) => {
        const colX = colXPositions[colIndex] ?? tableX
        const colW = colWidths[colIndex] ?? 100
        const pillWidth = Math.min(76, colW * 0.45)
        const pillX = colX + (colW - pillWidth) / 2
        const pillColor = accentColors[colIndex % accentColors.length]!
        const maxChars = Math.max(8, Math.floor(colW / 9))
        const lines = wrapTextByWidth(columnName, maxChars)

        return (
          <g key={`header-col-${colIndex}`}>
            <rect
              x={pillX}
              y={topLineY - 3}
              width={pillWidth}
              height={6}
              rx={3}
              fill={pillColor}
            />
            <text
              x={colIndex === 0 ? colX + 12 : colX + colW / 2}
              y={headerTextY}
              textAnchor={colIndex === 0 ? 'start' : 'middle'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize={13}
              fontWeight={700}
              fill="#1a2249"
            >
              {lines.map((line, lineIndex) => (
                <tspan
                  key={lineIndex}
                  x={colIndex === 0 ? colX + 12 : colX + colW / 2}
                  dy={lineIndex === 0 ? 0 : 15}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        )
      })}

      <line
        x1={tableX}
        y1={headerBottomY}
        x2={tableX + tableWidth}
        y2={headerBottomY}
        stroke="#94a3b8"
        strokeWidth={1.5}
      />

      {items.map((item, index) => {
        const elementId = `item-${index}`
        const defaultBbox = {
          x: tableX,
          y: headerBottomY + index * rowHeight,
          width: tableWidth,
          height: rowHeight,
        }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#2b63d9' : 'transparent')
        const strokeWidth = tplStrokeWidths[elementId] ?? (isSelected ? 1.5 : 0)
        const customColor = tplColors[elementId] ?? item.color ?? '#334155'

        const plannedText = item.planned || item.amount || '—'
        const actualText = item.actual || item.value || '—'
        const varianceText = item.variance || '—'
        const colValues = [item.label, plannedText, actualText, varianceText]

        const textBaselineY = bbox.y + bbox.height * 0.62
        const maxLabelChars = Math.max(10, Math.floor((colWidths[0] ?? 200) / 8))
        const labelLines = wrapTextByWidth(item.label, maxLabelChars)

        return (
          <g
            key={elementId}
            data-element-id={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              rx={4}
              fill={isSelected ? 'rgba(43, 99, 217, 0.08)' : 'transparent'}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            <text
              x={(colXPositions[0] ?? tableX) + 12}
              y={labelLines.length > 1 ? bbox.y + 14 : textBaselineY}
              textAnchor="start"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize={12}
              fontWeight={500}
              fill={customColor}
            >
              {labelLines.map((line, lineIndex) => (
                <tspan
                  key={lineIndex}
                  x={(colXPositions[0] ?? tableX) + 12}
                  dy={lineIndex === 0 ? 0 : 13}
                >
                  {line}
                </tspan>
              ))}
            </text>

            {columns.slice(1).map((_, colIndex) => {
              const actualColIndex = colIndex + 1
              const colX = colXPositions[actualColIndex] ?? tableX
              const colW = colWidths[actualColIndex] ?? 100
              const value = colValues[actualColIndex] ?? '—'

              return (
                <text
                  key={`val-${actualColIndex}`}
                  x={colX + colW / 2}
                  y={textBaselineY}
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize={12}
                  fontWeight={500}
                  fill="#334155"
                >
                  {value}
                </text>
              )
            })}

            <line
              x1={bbox.x}
              y1={bbox.y + bbox.height}
              x2={bbox.x + bbox.width}
              y2={bbox.y + bbox.height}
              stroke="#e2e8f0"
              strokeWidth={1}
            />

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}

      <g>
        <line
          x1={tableX}
          y1={totalRowY}
          x2={tableX + tableWidth}
          y2={totalRowY}
          stroke="#1a2249"
          strokeWidth={2}
        />

        <text
          x={(colXPositions[0] ?? tableX) + 12}
          y={totalRowY + 24}
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize={14}
          fontWeight={700}
          fill="#1a2249"
        >
          {totalLabel}
        </text>

        {columns.slice(1).map((_, colIndex) => {
          const actualColIndex = colIndex + 1
          const colX = colXPositions[actualColIndex] ?? tableX
          const colW = colWidths[actualColIndex] ?? 100
          const totalVals = ['', totalAmount, totalActual, totalVariance]
          const val = totalVals[actualColIndex] ?? '—'

          return (
            <text
              key={`total-val-${actualColIndex}`}
              x={colX + colW / 2}
              y={totalRowY + 24}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize={14}
              fontWeight={700}
              fill="#1a2249"
            >
              {val}
            </text>
          )
        })}
      </g>
    </g>
  )
}
