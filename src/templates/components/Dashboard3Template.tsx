import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { BlockArrow } from '../shared/BlockArrow'
import {
  MiniAreaChart,
  MiniBarChart,
  MiniHorizontalBarChart,
  MiniLineChart,
  MiniPieChart,
} from '../shared/charts'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Dashboard3Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const positions = useTemplateStore(state => state.templateElementPositions)
  const elementColors = useTemplateStore(state => state.templateElementColors)
  const strokeColors = useTemplateStore(state => state.templateStrokeColors)
  const strokeWidths = useTemplateStore(state => state.templateStrokeWidths)

  const metrics = data.metrics ?? []
  const mainKpiValue = metrics[0]?.value ?? '73%'
  const secondKpiValue = metrics[1]?.value ?? '73%'
  const thirdKpiValue = metrics[2]?.value ?? '73%'

  const computeBox = (elementId: string, defaultBounds: { x: number; y: number; width: number; height: number }) => {
    const customPosition = positions[elementId]
    return {
      x: customPosition?.x ?? defaultBounds.x,
      y: customPosition?.y ?? defaultBounds.y,
      width: customPosition?.width ?? defaultBounds.width,
      height: customPosition?.height ?? defaultBounds.height,
    }
  }

  const computeBorder = (elementId: string, isSelected: boolean) => {
    return {
      stroke: strokeColors[elementId] || (isSelected ? '#4a90d9' : '#e2e8f0'),
      strokeWidth: strokeWidths[elementId] ?? (isSelected ? 2.5 : 1),
    }
  }

  const topSummaryId = 'top-kpi-summary'
  const topSummaryBox = computeBox(topSummaryId, { x: 40, y: 35, width: 560, height: 135 })
  const isTopSummarySelected = selectedIds.has(topSummaryId)
  const topSummaryBorder = computeBorder(topSummaryId, isTopSummarySelected)
  const topSummaryColor = elementColors[topSummaryId] ?? MIGSO_PALETTE[0]!

  const topAreaId = 'top-area-chart'
  const topAreaBox = computeBox(topAreaId, { x: 620, y: 35, width: 300, height: 135 })
  const isTopAreaSelected = selectedIds.has(topAreaId)
  const topAreaBorder = computeBorder(topAreaId, isTopAreaSelected)

  const midBarId = 'card-middle-bar'
  const midBarBox = computeBox(midBarId, { x: 40, y: 190, width: 275, height: 120 })
  const isMidBarSelected = selectedIds.has(midBarId)
  const midBarBorder = computeBorder(midBarId, isMidBarSelected)

  const midPieId = 'card-middle-pie'
  const midPieBox = computeBox(midPieId, { x: 342, y: 190, width: 275, height: 120 })
  const isMidPieSelected = selectedIds.has(midPieId)
  const midPieBorder = computeBorder(midPieId, isMidPieSelected)

  const midLineId = 'card-middle-line'
  const midLineBox = computeBox(midLineId, { x: 645, y: 190, width: 275, height: 120 })
  const isMidLineSelected = selectedIds.has(midLineId)
  const midLineBorder = computeBorder(midLineId, isMidLineSelected)

  const botHbarId = 'card-bottom-hbar'
  const botHbarBox = computeBox(botHbarId, { x: 40, y: 330, width: 440, height: 175 })
  const isBotHbarSelected = selectedIds.has(botHbarId)
  const botHbarBorder = computeBorder(botHbarId, isBotHbarSelected)

  const botKpiId = 'card-bottom-kpi'
  const botKpiBox = computeBox(botKpiId, { x: 500, y: 330, width: 105, height: 175 })
  const isBotKpiSelected = selectedIds.has(botKpiId)
  const botKpiBorder = computeBorder(botKpiId, isBotKpiSelected)

  const botBarId = 'card-bottom-bar'
  const botBarBox = computeBox(botBarId, { x: 625, y: 330, width: 295, height: 175 })
  const isBotBarSelected = selectedIds.has(botBarId)
  const botBarBorder = computeBorder(botBarId, isBotBarSelected)

  return (
    <g ref={svgRef}>
      <g
        data-element-id={topSummaryId}
        onMouseDown={event => startDrag(event, topSummaryId, topSummaryBox)}
        transform={getTransform(topSummaryId, topSummaryBox)}
        style={{ cursor: 'pointer' }}
      >
        {isTopSummarySelected && (
          <rect
            x={topSummaryBox.x}
            y={topSummaryBox.y}
            width={topSummaryBox.width}
            height={topSummaryBox.height}
            fill="none"
            stroke={topSummaryBorder.stroke}
            strokeWidth={topSummaryBorder.strokeWidth}
            rx={6}
          />
        )}
        <text
          x={topSummaryBox.x + 80}
          y={topSummaryBox.y + 60}
          textAnchor="middle"
          fontSize={44}
          fontWeight={800}
          fill={topSummaryColor}
          fontFamily="Arial, sans-serif"
        >
          {mainKpiValue}
        </text>
        <text
          x={topSummaryBox.x + 80}
          y={topSummaryBox.y + 88}
          textAnchor="middle"
          fontSize={10}
          fill="#718096"
          fontFamily="Arial, sans-serif"
        >
          <tspan x={topSummaryBox.x + 80} dy={0}>MIGSO-PCUBED content and words</tspan>
          <tspan x={topSummaryBox.x + 80} dy={14}>to be added here as required</tspan>
        </text>

        <text
          x={topSummaryBox.x + 250}
          y={topSummaryBox.y + 28}
          textAnchor="middle"
          fontSize={22}
          fontWeight={700}
          fill="#1a202c"
          fontFamily="Arial, sans-serif"
        >
          73%
        </text>
        <BlockArrow x={topSummaryBox.x + 215} y={topSummaryBox.y + 40} width={24} height={34} isUpward={true} color="#3366cc" />
        <text x={topSummaryBox.x + 227} y={topSummaryBox.y + 92} textAnchor="middle" fontSize={12} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">73%</text>
        <text x={topSummaryBox.x + 227} y={topSummaryBox.y + 107} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">Type your</text>
        <text x={topSummaryBox.x + 227} y={topSummaryBox.y + 119} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">text here</text>

        <BlockArrow x={topSummaryBox.x + 260} y={topSummaryBox.y + 40} width={24} height={34} isUpward={false} color="#ff5338" />
        <text x={topSummaryBox.x + 272} y={topSummaryBox.y + 92} textAnchor="middle" fontSize={12} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">73%</text>
        <text x={topSummaryBox.x + 272} y={topSummaryBox.y + 107} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">Type your</text>
        <text x={topSummaryBox.x + 272} y={topSummaryBox.y + 119} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">text here</text>

        <text
          x={topSummaryBox.x + 430}
          y={topSummaryBox.y + 55}
          textAnchor="middle"
          fontSize={20}
          fontWeight={700}
          fill="#1a202c"
          fontFamily="Arial, sans-serif"
        >
          Your title
        </text>
        <text
          x={topSummaryBox.x + 430}
          y={topSummaryBox.y + 82}
          textAnchor="middle"
          fontSize={10}
          fill="#718096"
          fontFamily="Arial, sans-serif"
        >
          <tspan x={topSummaryBox.x + 430} dy={0}>MIGSO-PCUBED content and words</tspan>
          <tspan x={topSummaryBox.x + 430} dy={14}>to be added here as required</tspan>
        </text>
        {isTopSummarySelected && renderHandles(topSummaryBox, topSummaryId)}
      </g>

      <g
        data-element-id={topAreaId}
        onMouseDown={event => startDrag(event, topAreaId, topAreaBox)}
        transform={getTransform(topAreaId, topAreaBox)}
        style={{ cursor: 'pointer' }}
      >
        <text x={topAreaBox.x + 18} y={topAreaBox.y + 16} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">150</text>
        <line x1={topAreaBox.x + 24} y1={topAreaBox.y + 12} x2={topAreaBox.x + topAreaBox.width} y2={topAreaBox.y + 12} stroke="#edf2f7" strokeWidth={1} />
        <text x={topAreaBox.x + 18} y={topAreaBox.y + 44} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">100</text>
        <line x1={topAreaBox.x + 24} y1={topAreaBox.y + 40} x2={topAreaBox.x + topAreaBox.width} y2={topAreaBox.y + 40} stroke="#edf2f7" strokeWidth={1} />
        <text x={topAreaBox.x + 18} y={topAreaBox.y + 72} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">50</text>
        <line x1={topAreaBox.x + 24} y1={topAreaBox.y + 68} x2={topAreaBox.x + topAreaBox.width} y2={topAreaBox.y + 68} stroke="#edf2f7" strokeWidth={1} />
        <text x={topAreaBox.x + 18} y={topAreaBox.y + 100} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">0</text>
        <MiniAreaChart
          x={topAreaBox.x + 24}
          y={topAreaBox.y + 12}
          width={topAreaBox.width - 24}
          height={topAreaBox.height - 12}
          yMin={0}
          yMax={150}
          labels={['1/1', '2/1', '3/1', '4/1', '5/1', '6/1', '7/1', '8/1', '9/1', '10/1']}
          series={[
            { points: [70, 30, 45, 95, 25, 15, 18, 20, 25, 30], color: '#ff5338', opacity: 0.9 },
            { points: [0, 0, 0, 0, 0, 75, 30, 40, 95, 20], color: '#3366cc', opacity: 0.9 },
          ]}
          fontSize={10}
        />
        {isTopAreaSelected && renderHandles(topAreaBox, topAreaId)}
      </g>

      <g
        data-element-id={midBarId}
        onMouseDown={event => startDrag(event, midBarId, midBarBox)}
        transform={getTransform(midBarId, midBarBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={midBarBox.x} y={midBarBox.y} width={midBarBox.width} height={midBarBox.height} rx={4} fill="#ffffff" stroke={midBarBorder.stroke} strokeWidth={midBarBorder.strokeWidth} />
        <text x={midBarBox.x + 14} y={midBarBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Your title</text>
        <text x={midBarBox.x + 14} y={midBarBox.y + 58} fontSize={28} fontWeight={800} fill="#1a202c" fontFamily="Arial, sans-serif">{secondKpiValue}</text>
        <text x={midBarBox.x + 14} y={midBarBox.y + 80} fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">
          <tspan x={midBarBox.x + 14} dy={0}>MIGSO-PCUBED content</tspan>
          <tspan x={midBarBox.x + 14} dy={12}>and words to be added</tspan>
          <tspan x={midBarBox.x + 14} dy={12}>here as required</tspan>
        </text>
        <text x={midBarBox.x + 148} y={midBarBox.y + 24} fontSize={10} fill="#718096" fontFamily="Arial, sans-serif">5</text>
        <text x={midBarBox.x + 148} y={midBarBox.y + 104} fontSize={10} fill="#718096" fontFamily="Arial, sans-serif">0</text>
        <MiniBarChart
          x={midBarBox.x + 160}
          y={midBarBox.y + 16}
          width={midBarBox.width - 170}
          height={88}
          yMax={5}
          groups={[
            { values: [4.6], colors: ['#2c2b64'] },
            { values: [2.5], colors: ['#3366cc'] },
            { values: [3.4], colors: ['#ff5338'] },
            { values: [4.8], colors: ['#f2cb13'] },
          ]}
        />
        {isMidBarSelected && renderHandles(midBarBox, midBarId)}
      </g>

      <g
        data-element-id={midPieId}
        onMouseDown={event => startDrag(event, midPieId, midPieBox)}
        transform={getTransform(midPieId, midPieBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={midPieBox.x} y={midPieBox.y} width={midPieBox.width} height={midPieBox.height} rx={4} fill="#ffffff" stroke={midPieBorder.stroke} strokeWidth={midPieBorder.strokeWidth} />
        <text x={midPieBox.x + 14} y={midPieBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Your title</text>
        <text x={midPieBox.x + 14} y={midPieBox.y + 44} fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">
          <tspan x={midPieBox.x + 14} dy={0}>MIGSO-PCUBED content</tspan>
          <tspan x={midPieBox.x + 14} dy={12}>and words to be added</tspan>
          <tspan x={midPieBox.x + 14} dy={12}>here as required</tspan>
        </text>
        <text x={midPieBox.x + 14} y={midPieBox.y + 102} fontSize={24} fontWeight={800} fill="#1a202c" fontFamily="Arial, sans-serif">{thirdKpiValue}</text>
        <MiniPieChart
          cx={midPieBox.x + 200}
          cy={midPieBox.y + 60}
          radius={42}
          slices={[
            { value: 55, color: '#2c2b64' },
            { value: 20, color: '#3366cc' },
            { value: 12, color: '#ff5338' },
            { value: 13, color: '#f2cb13' },
          ]}
        />
        {isMidPieSelected && renderHandles(midPieBox, midPieId)}
      </g>

      <g
        data-element-id={midLineId}
        onMouseDown={event => startDrag(event, midLineId, midLineBox)}
        transform={getTransform(midLineId, midLineBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={midLineBox.x} y={midLineBox.y} width={midLineBox.width} height={midLineBox.height} rx={4} fill="#ffffff" stroke={midLineBorder.stroke} strokeWidth={midLineBorder.strokeWidth} />
        <line x1={midLineBox.x + 15} y1={midLineBox.y + 22} x2={midLineBox.x + 130} y2={midLineBox.y + 22} stroke="#f1f5f9" strokeWidth={1} />
        <line x1={midLineBox.x + 15} y1={midLineBox.y + 100} x2={midLineBox.x + 130} y2={midLineBox.y + 100} stroke="#f1f5f9" strokeWidth={1} />
        <MiniLineChart
          x={midLineBox.x + 15}
          y={midLineBox.y + 25}
          width={115}
          height={75}
          showBaseline={false}
          series={[
            { points: [2.2, 3.8, 2.0, 1.8], color: '#3366cc', strokeWidth: 2.5 },
            { points: [1.8, 1.8, 3.2, 4.0], color: '#ff5338', strokeWidth: 2.5 },
          ]}
        />
        <text x={midLineBox.x + midLineBox.width - 14} y={midLineBox.y + 36} textAnchor="end" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">
          <tspan x={midLineBox.x + midLineBox.width - 14} dy={0}>MIGSO-PCUBED content</tspan>
          <tspan x={midLineBox.x + midLineBox.width - 14} dy={12}>and words to be added</tspan>
          <tspan x={midLineBox.x + midLineBox.width - 14} dy={12}>here as required</tspan>
        </text>
        <text x={midLineBox.x + midLineBox.width - 14} y={midLineBox.y + 102} textAnchor="end" fontSize={24} fontWeight={800} fill="#1a202c" fontFamily="Arial, sans-serif">
          73%
        </text>
        {isMidLineSelected && renderHandles(midLineBox, midLineId)}
      </g>

      <g
        data-element-id={botHbarId}
        onMouseDown={event => startDrag(event, botHbarId, botHbarBox)}
        transform={getTransform(botHbarId, botHbarBox)}
        style={{ cursor: 'pointer' }}
      >
        <text x={botHbarBox.x + 14} y={botHbarBox.y + 24} fontSize={16} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">
          Your title here
        </text>
        {[0, 1, 2, 3].map(index => (
          <line
            key={index}
            x1={botHbarBox.x + 85}
            y1={botHbarBox.y + 52 + index * 32}
            x2={botHbarBox.x + botHbarBox.width}
            y2={botHbarBox.y + 52 + index * 32}
            stroke="#f1f5f9"
            strokeWidth={1}
          />
        ))}
        <MiniHorizontalBarChart
          x={botHbarBox.x}
          y={botHbarBox.y + 36}
          width={botHbarBox.width}
          height={130}
          isStacked={true}
          labelWidth={85}
          barHeight={18}
          items={[
            { label: 'Sample Text', values: [4.3, 2.4, 2.0], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
            { label: 'Sample Text', values: [2.5, 4.4, 2.0], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
            { label: 'Sample Text', values: [3.5, 1.8, 3.0], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
            { label: 'Sample Text', values: [4.5, 2.8, 5.0], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
          ]}
        />
        {isBotHbarSelected && renderHandles(botHbarBox, botHbarId)}
      </g>

      <g
        data-element-id={botKpiId}
        onMouseDown={event => startDrag(event, botKpiId, botKpiBox)}
        transform={getTransform(botKpiId, botKpiBox)}
        style={{ cursor: 'pointer' }}
      >
        <text x={botKpiBox.x + botKpiBox.width / 2} y={botKpiBox.y + 24} textAnchor="middle" fontSize={22} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">
          73%
        </text>
        <BlockArrow x={botKpiBox.x + 12} y={botKpiBox.y + 40} width={26} height={36} isUpward={true} color="#3366cc" />
        <text x={botKpiBox.x + 25} y={botKpiBox.y + 94} textAnchor="middle" fontSize={12} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">73%</text>
        <text x={botKpiBox.x + 25} y={botKpiBox.y + 110} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">Type your</text>
        <text x={botKpiBox.x + 25} y={botKpiBox.y + 122} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">text here</text>

        <BlockArrow x={botKpiBox.x + 62} y={botKpiBox.y + 40} width={26} height={36} isUpward={false} color="#ff5338" />
        <text x={botKpiBox.x + 75} y={botKpiBox.y + 94} textAnchor="middle" fontSize={12} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">73%</text>
        <text x={botKpiBox.x + 75} y={botKpiBox.y + 110} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">Type your</text>
        <text x={botKpiBox.x + 75} y={botKpiBox.y + 122} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">text here</text>
        {isBotKpiSelected && renderHandles(botKpiBox, botKpiId)}
      </g>

      <g
        data-element-id={botBarId}
        onMouseDown={event => startDrag(event, botBarId, botBarBox)}
        transform={getTransform(botBarId, botBarBox)}
        style={{ cursor: 'pointer' }}
      >
        <text x={botBarBox.x + 14} y={botBarBox.y + 24} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">6</text>
        <line x1={botBarBox.x + 20} y1={botBarBox.y + 20} x2={botBarBox.x + 160} y2={botBarBox.y + 20} stroke="#edf2f7" strokeWidth={1} />
        <text x={botBarBox.x + 14} y={botBarBox.y + 54} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">4</text>
        <line x1={botBarBox.x + 20} y1={botBarBox.y + 50} x2={botBarBox.x + 160} y2={botBarBox.y + 50} stroke="#edf2f7" strokeWidth={1} />
        <text x={botBarBox.x + 14} y={botBarBox.y + 84} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">2</text>
        <line x1={botBarBox.x + 20} y1={botBarBox.y + 80} x2={botBarBox.x + 160} y2={botBarBox.y + 80} stroke="#edf2f7" strokeWidth={1} />
        <text x={botBarBox.x + 14} y={botBarBox.y + 114} fontSize={10} fill="#718096" textAnchor="end" fontFamily="Arial, sans-serif">0</text>

        <MiniBarChart
          x={botBarBox.x + 20}
          y={botBarBox.y + 20}
          width={140}
          height={94}
          yMax={6}
          groups={[
            { values: [4.2], colors: ['#2c2b64'] },
            { values: [2.5], colors: ['#3366cc'] },
            { values: [3.5], colors: ['#ff5338'] },
            { values: [4.8], colors: ['#f2cb13'] },
          ]}
        />
        <BlockArrow x={botBarBox.x + 195} y={botBarBox.y + 22} width={22} height={30} isUpward={true} color="#3366cc" />
        <text x={botBarBox.x + 206} y={botBarBox.y + 68} textAnchor="middle" fontSize={11} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">73%</text>
        <text x={botBarBox.x + 206} y={botBarBox.y + 80} textAnchor="middle" fontSize={8} fill="#718096" fontFamily="Arial, sans-serif">Type your</text>
        <text x={botBarBox.x + 206} y={botBarBox.y + 90} textAnchor="middle" fontSize={8} fill="#718096" fontFamily="Arial, sans-serif">text here</text>

        <BlockArrow x={botBarBox.x + 245} y={botBarBox.y + 22} width={22} height={30} isUpward={false} color="#ff5338" />
        <text x={botBarBox.x + 256} y={botBarBox.y + 68} textAnchor="middle" fontSize={11} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">73%</text>
        <text x={botBarBox.x + 256} y={botBarBox.y + 80} textAnchor="middle" fontSize={8} fill="#718096" fontFamily="Arial, sans-serif">Type your</text>
        <text x={botBarBox.x + 256} y={botBarBox.y + 90} textAnchor="middle" fontSize={8} fill="#718096" fontFamily="Arial, sans-serif">text here</text>

        <text x={botBarBox.x + 230} y={botBarBox.y + 114} textAnchor="middle" fontSize={9} fill="#718096" fontFamily="Arial, sans-serif">
          <tspan x={botBarBox.x + 230} dy={0}>MIGSO-PCUBED content</tspan>
          <tspan x={botBarBox.x + 230} dy={11}>and words to be added here</tspan>
          <tspan x={botBarBox.x + 230} dy={11}>as required</tspan>
        </text>
        {isBotBarSelected && renderHandles(botBarBox, botBarId)}
      </g>
    </g>
  )
}
