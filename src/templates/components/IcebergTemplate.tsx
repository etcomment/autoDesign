import { useRef, type ReactElement } from 'react'
import type { IcebergData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

const ABOVE_COLOR = '#e3f2fd'
const BELOW_COLOR = '#0f2b46'
const SECTION_COLORS = ['#4a90d9', '#3a7bc8', '#1a5ca6', '#0d4d95', '#083d7a', '#06244d']

function buildWavePath(W: number, waterY: number, H: number): string {
  const amplitude = 14
  const freq1 = 0.022
  const freq2 = 0.055
  let d = 'M 0 ' + waterY
  for (let x = 0; x <= W; x += 4) {
    const y = waterY + Math.sin(x * freq1) * amplitude + Math.sin(x * freq2 + 1) * (amplitude * 0.4)
    d += ' L ' + x + ' ' + y
  }
  d += ' L ' + W + ' ' + H + ' L 0 ' + H + ' Z'
  return d
}

function buildWaveLine(W: number, waterY: number): string {
  const amplitude = 14
  const freq1 = 0.022
  const freq2 = 0.055
  let d = 'M 0 ' + waterY
  for (let x = 0; x <= W; x += 4) {
    const y = waterY + Math.sin(x * freq1) * amplitude + Math.sin(x * freq2 + 1) * (amplitude * 0.4)
    d += ' L ' + x + ' ' + y
  }
  return d
}

export function IcebergTemplate({ data }: { data: IcebergData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, sections } = data
  const W = 900
  const H = 600
  const waterY = 310

  const aboveSections = sections.filter((s) => s.isAbove)
  const belowSections = sections.filter((s) => !s.isAbove)

  const aboveAreaTop = title ? 90 : 60
  const aboveAreaH = waterY - aboveAreaTop - 14
  const aboveSectionH = aboveSections.length > 0 ? Math.min(aboveAreaH / aboveSections.length, 60) : 0
  const aboveSlotH = aboveSectionH + 8
  const aboveTotalH = aboveSections.length * aboveSlotH
  const aboveStartY = aboveAreaTop + (aboveAreaH - aboveTotalH + 8) / 2

  const belowAreaTop = waterY + 14
  const belowAreaH = H - belowAreaTop - 16
  const belowSectionH = belowSections.length > 0 ? Math.min(belowAreaH / belowSections.length, 60) : 0
  const belowSlotH = belowSectionH + 8
  const belowTotalH = belowSections.length * belowSlotH
  const belowStartY = belowAreaTop + (belowAreaH - belowTotalH + 8) / 2

  const wavePath = buildWavePath(W, waterY, H)
  const waveLine = buildWaveLine(W, waterY)

  return (
    <g ref={svgRef}>
      <rect width={W} height={waterY} fill={ABOVE_COLOR} />
      <rect y={waterY} width={W} height={H - waterY} fill={BELOW_COLOR} />

      <path d={wavePath} fill="#1e4d8c" opacity={0.7} />
      <path d={waveLine} fill="none" stroke="#5db9e8" strokeWidth={3} opacity={0.9} />

      {title && (
        <text x={W / 2} y={48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      {aboveSections.map((section, i) => {
        const si = sections.indexOf(section)
        const elementId = `section-${si}`
        const color = tplColors[elementId] ?? SECTION_COLORS[si % SECTION_COLORS.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const y = aboveStartY + i * aboveSlotH
        const baseW = 160 + i * 30
        const x = (W - baseW) / 2
        const visualRect = { x, y, width: baseW, height: aboveSectionH }

        return (
          <g key={'above-' + i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={baseW} height={aboveSectionH} rx={6} fill={color} opacity={0.85} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 0} />
              <text x={x + 16} y={y + aboveSectionH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {section.title}
              </text>
              {section.subtitle && (
                <text x={x + baseW - 16} y={y + aboveSectionH / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.8)">
                  {section.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {belowSections.map((section, i) => {
        const si = sections.indexOf(section)
        const elementId = `section-${si}`
        const color = tplColors[elementId] ?? SECTION_COLORS[si % SECTION_COLORS.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const y = belowStartY + i * belowSlotH
        const baseW = 340 + i * 50
        const x = (W - baseW) / 2
        const visualRect = { x, y, width: baseW, height: belowSectionH }

        return (
          <g key={'below-' + i}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={baseW} height={belowSectionH} rx={6} fill={color} opacity={0.9} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 2.5 : 0} />
              <text x={x + 16} y={y + belowSectionH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">
                {section.title}
              </text>
              {section.subtitle && (
                <text x={x + baseW - 16} y={y + belowSectionH / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.8)">
                  {section.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <g transform={'translate(' + (W - 80) + ', ' + (waterY - 8) + ')'}>
        <path d="M 0 0 C 6 12 10 16 10 20 C 10 24 6 28 0 40" fill="none" stroke="#5db9e8" strokeWidth={3} strokeLinecap="round" />
        <circle cx={0} cy={44} r={4} fill="#5db9e8" />
        <path d="M -4 44 L -6 54 L 0 48 Z" fill="#5db9e8" />
        <path d="M 4 44 L 6 54 L 0 48 Z" fill="#5db9e8" />
      </g>
    </g>
  )
}
