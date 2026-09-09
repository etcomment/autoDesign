import { useRef, type ReactElement } from 'react'
import type { DashboardData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { TEMPLATE_ICONS } from '../shared/icons'
import {
  ArcGauge,
  MiniBarChart,
  MiniLineChart,
  MiniPieChart,
} from '../shared/charts'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Dashboard4Template({ data }: { data: DashboardData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const positions = useTemplateStore(state => state.templateElementPositions)
  const elementColors = useTemplateStore(state => state.templateElementColors)
  const strokeColors = useTemplateStore(state => state.templateStrokeColors)
  const strokeWidths = useTemplateStore(state => state.templateStrokeWidths)

  const metrics = data.metrics ?? []
  const businessValue = metrics[0]?.value ?? '6/10'
  const industryValue = metrics[1]?.value ?? '8/10'

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

  const businessId = 'card-business'
  const businessBox = computeBox(businessId, { x: 45, y: 35, width: 215, height: 125 })
  const isBusinessSelected = selectedIds.has(businessId)
  const businessBorder = computeBorder(businessId, isBusinessSelected)
  const businessColor = elementColors[businessId] ?? MIGSO_PALETTE[0]!

  const industryId = 'card-industry'
  const industryBox = computeBox(industryId, { x: 270, y: 35, width: 215, height: 125 })
  const isIndustrySelected = selectedIds.has(industryId)
  const industryBorder = computeBorder(industryId, isIndustrySelected)
  const industryColor = elementColors[industryId] ?? MIGSO_PALETTE[2]!

  const categoriesId = 'card-categories'
  const categoriesBox = computeBox(categoriesId, { x: 45, y: 175, width: 440, height: 135 })
  const isCategoriesSelected = selectedIds.has(categoriesId)
  const categoriesBorder = computeBorder(categoriesId, isCategoriesSelected)

  const activitiesId = 'card-activities'
  const activitiesBox = computeBox(activitiesId, { x: 500, y: 35, width: 420, height: 275 })
  const isActivitiesSelected = selectedIds.has(activitiesId)
  const activitiesBorder = computeBorder(activitiesId, isActivitiesSelected)

  const aestheticsId = 'card-aesthetics'
  const aestheticsBox = computeBox(aestheticsId, { x: 45, y: 325, width: 210, height: 170 })
  const isAestheticsSelected = selectedIds.has(aestheticsId)
  const aestheticsBorder = computeBorder(aestheticsId, isAestheticsSelected)

  const navigationId = 'card-navigation'
  const navigationBox = computeBox(navigationId, { x: 265, y: 325, width: 210, height: 170 })
  const isNavigationSelected = selectedIds.has(navigationId)
  const navigationBorder = computeBorder(navigationId, isNavigationSelected)

  const speedId = 'card-speed'
  const speedBox = computeBox(speedId, { x: 485, y: 325, width: 210, height: 170 })
  const isSpeedSelected = selectedIds.has(speedId)
  const speedBorder = computeBorder(speedId, isSpeedSelected)

  const searchId = 'card-searchability'
  const searchBox = computeBox(searchId, { x: 705, y: 325, width: 215, height: 170 })
  const isSearchSelected = selectedIds.has(searchId)
  const searchBorder = computeBorder(searchId, isSearchSelected)

  const PrinterIcon = TEMPLATE_ICONS.printer
  const NewspaperIcon = TEMPLATE_ICONS.newspaper
  const SearchIcon = TEMPLATE_ICONS.search

  return (
    <g ref={svgRef}>
      <g
        data-element-id={businessId}
        onMouseDown={event => startDrag(event, businessId, businessBox)}
        transform={getTransform(businessId, businessBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={businessBox.x} y={businessBox.y} width={businessBox.width} height={businessBox.height} rx={4} fill="#ffffff" stroke={businessBorder.stroke} strokeWidth={businessBorder.strokeWidth} />
        <text x={businessBox.x + 16} y={businessBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Your business</text>
        <text x={businessBox.x + businessBox.width - 16} y={businessBox.y + 24} textAnchor="end" fontSize={12} fontWeight={700} fill={businessColor} fontFamily="Arial, sans-serif">{businessValue}</text>
        <ArcGauge
          cx={businessBox.x + businessBox.width / 2}
          cy={businessBox.y + 92}
          radius={48}
          innerRadius={34}
          value={6}
          min={0}
          max={10}
          segments={[
            { color: businessColor, weight: 6 },
            { color: '#eef2f6', weight: 4 },
          ]}
          needleColor="#718096"
          pivotColor="#718096"
        />
        <line x1={businessBox.x + 18} y1={businessBox.y + 92} x2={businessBox.x + businessBox.width - 18} y2={businessBox.y + 92} stroke="#e2e8f0" strokeWidth={1} />
        <text x={businessBox.x + 36} y={businessBox.y + 110} textAnchor="middle" fontSize={10} fill="#718096" fontFamily="Arial, sans-serif">Low</text>
        <text x={businessBox.x + businessBox.width - 36} y={businessBox.y + 110} textAnchor="middle" fontSize={10} fill="#718096" fontFamily="Arial, sans-serif">High</text>
        {isBusinessSelected && renderHandles(businessBox, businessId)}
      </g>

      <g
        data-element-id={industryId}
        onMouseDown={event => startDrag(event, industryId, industryBox)}
        transform={getTransform(industryId, industryBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={industryBox.x} y={industryBox.y} width={industryBox.width} height={industryBox.height} rx={4} fill="#ffffff" stroke={industryBorder.stroke} strokeWidth={industryBorder.strokeWidth} />
        <text x={industryBox.x + 16} y={industryBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Industry average</text>
        <text x={industryBox.x + industryBox.width - 16} y={industryBox.y + 24} textAnchor="end" fontSize={12} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">{industryValue}</text>
        <ArcGauge
          cx={industryBox.x + industryBox.width / 2}
          cy={industryBox.y + 92}
          radius={48}
          innerRadius={34}
          value={8}
          min={0}
          max={10}
          segments={[
            { color: industryColor, weight: 8 },
            { color: '#eef2f6', weight: 2 },
          ]}
          needleColor="#718096"
          pivotColor="#718096"
        />
        <line x1={industryBox.x + 18} y1={industryBox.y + 92} x2={industryBox.x + industryBox.width - 18} y2={industryBox.y + 92} stroke="#e2e8f0" strokeWidth={1} />
        <text x={industryBox.x + 36} y={industryBox.y + 110} textAnchor="middle" fontSize={10} fill="#718096" fontFamily="Arial, sans-serif">Low</text>
        <text x={industryBox.x + industryBox.width - 36} y={industryBox.y + 110} textAnchor="middle" fontSize={10} fill="#718096" fontFamily="Arial, sans-serif">High</text>
        {isIndustrySelected && renderHandles(industryBox, industryId)}
      </g>

      <g
        data-element-id={categoriesId}
        onMouseDown={event => startDrag(event, categoriesId, categoriesBox)}
        transform={getTransform(categoriesId, categoriesBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={categoriesBox.x} y={categoriesBox.y} width={categoriesBox.width} height={categoriesBox.height} rx={4} fill="#ffffff" stroke={categoriesBorder.stroke} strokeWidth={categoriesBorder.strokeWidth} />
        
        {PrinterIcon && (
          <g transform={`translate(${categoriesBox.x + 16}, ${categoriesBox.y + 20})`}>
            <PrinterIcon size={18} color="#4a5568" />
          </g>
        )}
        <text x={categoriesBox.x + 44} y={categoriesBox.y + 34} fontSize={12} fontWeight={600} fill="#1a202c" fontFamily="Arial, sans-serif">Technology</text>
        <rect x={categoriesBox.x + 145} y={categoriesBox.y + 28} width={220} height={7} rx={3.5} fill="#f1f5f9" />
        <rect x={categoriesBox.x + 145} y={categoriesBox.y + 28} width={110} height={7} rx={3.5} fill="#2c2b64" />
        <text x={categoriesBox.x + 380} y={categoriesBox.y + 34} fontSize={11} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">5/10</text>

        {NewspaperIcon && (
          <g transform={`translate(${categoriesBox.x + 16}, ${categoriesBox.y + 58})`}>
            <NewspaperIcon size={18} color="#4a5568" />
          </g>
        )}
        <text x={categoriesBox.x + 44} y={categoriesBox.y + 72} fontSize={12} fontWeight={600} fill="#1a202c" fontFamily="Arial, sans-serif">Accessibility</text>
        <rect x={categoriesBox.x + 145} y={categoriesBox.y + 66} width={220} height={7} rx={3.5} fill="#f1f5f9" />
        <rect x={categoriesBox.x + 145} y={categoriesBox.y + 66} width={154} height={7} rx={3.5} fill="#3366cc" />
        <text x={categoriesBox.x + 380} y={categoriesBox.y + 72} fontSize={11} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">7/10</text>

        {SearchIcon && (
          <g transform={`translate(${categoriesBox.x + 16}, ${categoriesBox.y + 96})`}>
            <SearchIcon size={18} color="#4a5568" />
          </g>
        )}
        <text x={categoriesBox.x + 44} y={categoriesBox.y + 110} fontSize={12} fontWeight={600} fill="#1a202c" fontFamily="Arial, sans-serif">Security</text>
        <rect x={categoriesBox.x + 145} y={categoriesBox.y + 104} width={220} height={7} rx={3.5} fill="#f1f5f9" />
        <rect x={categoriesBox.x + 145} y={categoriesBox.y + 104} width={198} height={7} rx={3.5} fill="#ff5338" />
        <text x={categoriesBox.x + 380} y={categoriesBox.y + 110} fontSize={11} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">9/10</text>
        {isCategoriesSelected && renderHandles(categoriesBox, categoriesId)}
      </g>

      <g
        data-element-id={activitiesId}
        onMouseDown={event => startDrag(event, activitiesId, activitiesBox)}
        transform={getTransform(activitiesId, activitiesBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={activitiesBox.x} y={activitiesBox.y} width={activitiesBox.width} height={activitiesBox.height} rx={4} fill="#ffffff" stroke={activitiesBorder.stroke} strokeWidth={activitiesBorder.strokeWidth} />
        <text x={activitiesBox.x + 20} y={activitiesBox.y + 28} fontSize={15} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Latest activities</text>
        {[6, 5, 4, 3, 2, 1, 0].map((val, idx) => {
          const tickY = activitiesBox.y + 55 + idx * 24
          return (
            <text key={val} x={activitiesBox.x + 26} y={tickY + 4} fontSize={13} fill="#1a202c" textAnchor="end" fontFamily="Arial, sans-serif">{val}</text>
          )
        })}
        <MiniLineChart
          x={activitiesBox.x + 44}
          y={activitiesBox.y + 55}
          width={activitiesBox.width - 64}
          height={175}
          yMin={0}
          yMax={6}
          showBaseline={true}
          labels={['2014', '2015', '2016', '2017']}
          fontSize={15}
          textColor="#1a202c"
          series={[
            { points: [4.3, 2.5, 3.5, 4.5], color: '#2c2b64', strokeWidth: 4 },
            { points: [2.4, 4.4, 1.8, 2.8], color: '#3366cc', strokeWidth: 4 },
            { points: [2.0, 2.0, 3.0, 5.0], color: '#ff5338', strokeWidth: 4 },
          ]}
        />
        {isActivitiesSelected && renderHandles(activitiesBox, activitiesId)}
      </g>

      <g
        data-element-id={aestheticsId}
        onMouseDown={event => startDrag(event, aestheticsId, aestheticsBox)}
        transform={getTransform(aestheticsId, aestheticsBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={aestheticsBox.x} y={aestheticsBox.y} width={aestheticsBox.width} height={aestheticsBox.height} rx={4} fill="#ffffff" stroke={aestheticsBorder.stroke} strokeWidth={aestheticsBorder.strokeWidth} />
        <text x={aestheticsBox.x + 16} y={aestheticsBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Aesthetics</text>
        <text x={aestheticsBox.x + 16} y={aestheticsBox.y + 52} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">5</text>
        <text x={aestheticsBox.x + 16} y={aestheticsBox.y + 120} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">0</text>
        <MiniBarChart
          x={aestheticsBox.x + 30}
          y={aestheticsBox.y + 44}
          width={aestheticsBox.width - 45}
          height={95}
          yMax={5}
          fontSize={12}
          textColor="#1a202c"
          groups={[
            { label: '1', values: [4.0], colors: ['#2c2b64'] },
            { label: '2', values: [2.0], colors: ['#3366cc'] },
            { label: '3', values: [3.2], colors: ['#ff5338'] },
            { label: '4', values: [4.2], colors: ['#f2cb13'] },
          ]}
        />
        {isAestheticsSelected && renderHandles(aestheticsBox, aestheticsId)}
      </g>

      <g
        data-element-id={navigationId}
        onMouseDown={event => startDrag(event, navigationId, navigationBox)}
        transform={getTransform(navigationId, navigationBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={navigationBox.x} y={navigationBox.y} width={navigationBox.width} height={navigationBox.height} rx={4} fill="#ffffff" stroke={navigationBorder.stroke} strokeWidth={navigationBorder.strokeWidth} />
        <text x={navigationBox.x + 16} y={navigationBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Navigation</text>
        <MiniPieChart
          cx={navigationBox.x + navigationBox.width / 2}
          cy={navigationBox.y + 95}
          radius={48}
          innerRadius={28}
          slices={[
            { value: 70, color: '#ff5338' },
            { value: 30, color: '#e2e8f0' },
          ]}
          centerText="70%"
          centerTextColor="#1a202c"
        />
        {isNavigationSelected && renderHandles(navigationBox, navigationId)}
      </g>

      <g
        data-element-id={speedId}
        onMouseDown={event => startDrag(event, speedId, speedBox)}
        transform={getTransform(speedId, speedBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={speedBox.x} y={speedBox.y} width={speedBox.width} height={speedBox.height} rx={4} fill="#ffffff" stroke={speedBorder.stroke} strokeWidth={speedBorder.strokeWidth} />
        <text x={speedBox.x + 16} y={speedBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Speed</text>
        <text x={speedBox.x + 16} y={speedBox.y + 52} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">20</text>
        <text x={speedBox.x + 16} y={speedBox.y + 86} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">10</text>
        <text x={speedBox.x + 16} y={speedBox.y + 120} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">0</text>
        <MiniBarChart
          x={speedBox.x + 32}
          y={speedBox.y + 44}
          width={speedBox.width - 46}
          height={95}
          isStacked={true}
          yMax={20}
          fontSize={12}
          textColor="#1a202c"
          groups={[
            { label: '0', values: [3, 4, 6], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
            { label: '1', values: [4, 2, 3], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
            { label: '2', values: [6, 4, 5], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
            { label: '3', values: [4, 5, 5], colors: ['#2c2b64', '#3366cc', '#ff5338'] },
          ]}
        />
        {isSpeedSelected && renderHandles(speedBox, speedId)}
      </g>

      <g
        data-element-id={searchId}
        onMouseDown={event => startDrag(event, searchId, searchBox)}
        transform={getTransform(searchId, searchBox)}
        style={{ cursor: 'pointer' }}
      >
        <rect x={searchBox.x} y={searchBox.y} width={searchBox.width} height={searchBox.height} rx={4} fill="#ffffff" stroke={searchBorder.stroke} strokeWidth={searchBorder.strokeWidth} />
        <text x={searchBox.x + 16} y={searchBox.y + 24} fontSize={14} fontWeight={700} fill="#1a202c" fontFamily="Arial, sans-serif">Searchability</text>
        <text x={searchBox.x + 16} y={searchBox.y + 52} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">10</text>
        <text x={searchBox.x + 16} y={searchBox.y + 86} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">5</text>
        <text x={searchBox.x + 16} y={searchBox.y + 120} fontSize={10} fill="#1a202c" fontFamily="Arial, sans-serif">0</text>
        <MiniLineChart
          x={searchBox.x + 30}
          y={searchBox.y + 44}
          width={searchBox.width - 45}
          height={95}
          yMin={0}
          yMax={10}
          showBaseline={true}
          labels={['2014', '2015', '2016', '2017']}
          fontSize={10}
          textColor="#1a202c"
          series={[
            { points: [4.5, 2.5, 3.5, 4.5], color: '#2c2b64', strokeWidth: 2.5 },
            { points: [2.5, 4.5, 2.0, 3.0], color: '#3366cc', strokeWidth: 2.5 },
            { points: [2.0, 2.0, 3.0, 5.0], color: '#ff5338', strokeWidth: 2.5 },
          ]}
        />
        {isSearchSelected && renderHandles(searchBox, searchId)}
      </g>
    </g>
  )
}
