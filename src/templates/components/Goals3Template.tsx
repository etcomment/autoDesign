import { useRef, type ReactElement } from 'react'
import type { GoalsData } from '../types'
import { wrapTextByWidth } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const CENTER = { x: 250, y: 350 }
const CENTER_R = 40
const BAND = 28
const TEXT_W = 190
const LIGHT = '#5bc19c'
const DARK = '#26674f'
const OUTER_R = CENTER_R + 4 * BAND
const PLUME_RADIUS = OUTER_R + 2 * BAND
const TEXT_X = CENTER.x + OUTER_R + BAND + 90
const ANGLE_STEP = 16

const PLUMES = [
  { cx: 155.5, cy: 184.55, h: 21.9, d: 'm 148.50557,195.50406 c -11.49782,-3.02446 -12.02071,-18.19859 -0.75375,-21.87369 6.47105,-2.11075 13.65082,1.58928 15.41127,7.94206 0.43502,1.56985 0.45889,3.16202 0.0527,3.51965 -0.84097,0.74053 -3.6709,1.73975 -6.68743,2.36127 l -1.42489,0.29357 -0.5282,2.1345 c -1.44301,5.83125 -2.29087,6.61666 -6.06975,5.62264 z' },
  { cx: 171.45, cy: 152.45, h: 19.4, d: 'm 170.69405,162.15948 c -7.11292,-0.63245 -11.72371,-7.82156 -9.37908,-14.6238 2.9808,-8.64789 14.28745,-11.33165 20.25083,-4.80676 2.129,2.32947 1.92613,3.00319 -2.09339,6.95178 l -2.20814,2.16918 0.49088,1.64306 c 1.13723,3.80655 1.33525,6.23754 0.56614,6.95032 -1.23963,1.14885 -4.85615,1.96261 -7.62724,1.71622 z' },
  { cx: 175.45, cy: 110.1, h: 23.4, d: 'm 169.30713,121.82219 c -14.32909,-3.22311 -8.88191,-26.139479 5.55665,-23.376926 4.28753,0.82034 4.65743,1.988896 2.64241,8.347696 l -0.59544,1.87904 2.14829,2.19957 c 3.29132,3.36988 3.63602,4.17311 2.51272,5.85525 -2.62849,3.93621 -7.82326,6.09439 -12.26463,5.09537 z' },
  { cx: 152.15, cy: 75.75, h: 23.7, d: 'm 150.37107,63.923257 c -0.47938,0.02219 -1.03244,0.128541 -1.68155,0.294556 -7.34753,1.879182 -10.81851,10.747582 -7.00009,17.88573 l 0.29972,0.560173 c 0.26965,0.328957 0.78967,0.949735 1.15549,1.354439 l 1.02061,1.113627 c 0.24171,0.19634 0.65526,0.544671 0.65526,0.544671 0.82232,0.721379 2.45752,1.514767 3.96306,1.92288 6.53245,1.770776 13.42815,-3.48955 13.85032,-10.565764 0.10822,-1.813944 0.0327,-1.951742 -1.49655,-2.724381 -0.96047,-0.485252 -4.22901,-1.494915 -5.53661,-1.71049 -0.89695,-0.147874 -0.92066,-0.187653 -1.36685,-2.243791 -1.09479,-5.045009 -1.78548,-6.527801 -3.86281,-6.43165 z' },
] as const

const BANDS: { r: number; isGreen: boolean }[] = []
for (let i = 0; i < 4; i++) {
  BANDS.push({ r: CENTER_R + i * BAND, isGreen: i % 2 === 1 })
}

function annulus(cx: number, cy: number, rOuter: number, rInner: number): string {
  return (
    `M ${cx - rOuter} ${cy} A ${rOuter} ${rOuter} 0 1 0 ${cx + rOuter} ${cy} A ${rOuter} ${rOuter} 0 1 0 ${cx - rOuter} ${cy} Z ` +
    `M ${cx - rInner} ${cy} A ${rInner} ${rInner} 0 1 1 ${cx + rInner} ${cy} A ${rInner} ${rInner} 0 1 1 ${cx - rInner} ${cy} Z`
  )
}

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 14} color={props.color ?? 'white'} />
  }
  return null
}

export function Goals3Template({ data }: { data: GoalsData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { metrics } = data
  const count = Math.min(metrics.length, 4)
  const visibleMetrics = metrics.slice(0, count)
  const outerR = OUTER_R

  const targetId = 'target'
  const defaultTargetRect = { x: CENTER.x - outerR, y: CENTER.y - outerR, width: outerR * 2, height: outerR * 2 }
  const customTargetPos = positions[targetId]
  const targetRect = {
    x: customTargetPos?.x ?? defaultTargetRect.x,
    y: customTargetPos?.y ?? defaultTargetRect.y,
    width: customTargetPos?.width ?? defaultTargetRect.width,
    height: customTargetPos?.height ?? defaultTargetRect.height,
  }
  const isTargetSelected = selectedIds.has(targetId)
  const targetStroke = tplStrokeColors[targetId] || (isTargetSelected ? '#4a90d9' : '#1e5340')
  const targetStrokeWidth = tplStrokeWidths[targetId] !== undefined ? tplStrokeWidths[targetId] : (isTargetSelected ? 2.5 : 0)

  return (
    <g ref={svgRef}>
      <g
        data-element-id={targetId}
        onMouseDown={e => startDrag(e, targetId, targetRect)}
        transform={getTransform(targetId, targetRect)}
        style={{ cursor: 'pointer' }}
      >
        <defs>
          <clipPath id="goals3-left">
            <rect x={CENTER.x - outerR} y={CENTER.y - outerR} width={outerR} height={outerR * 2} />
          </clipPath>
          <clipPath id="goals3-right">
            <rect x={CENTER.x} y={CENTER.y - outerR} width={outerR} height={outerR * 2} />
          </clipPath>
        </defs>
        <g>
          <circle cx={CENTER.x} cy={CENTER.y} r={CENTER_R} fill={LIGHT} clipPath="url(#goals3-left)" />
          <circle cx={CENTER.x} cy={CENTER.y} r={CENTER_R} fill={DARK} clipPath="url(#goals3-right)" />
          {BANDS.map((b, i) => (
            <g key={i}>
              <path d={annulus(CENTER.x, CENTER.y, b.r + BAND, b.r)} fill={b.isGreen ? LIGHT : '#ffffff'} fillRule="evenodd" clipPath="url(#goals3-left)" />
              <path d={annulus(CENTER.x, CENTER.y, b.r + BAND, b.r)} fill={b.isGreen ? DARK : '#ffffff'} fillRule="evenodd" clipPath="url(#goals3-right)" />
            </g>
          ))}
        </g>
        <circle cx={CENTER.x} cy={CENTER.y} r={outerR} fill="none" stroke={targetStroke} strokeWidth={targetStrokeWidth} />
        {isTargetSelected && renderHandles(targetRect, targetId)}
      </g>

      {visibleMetrics.map((metric, index) => {
        const arrowId = `arrow-${index}`
        const textId = `text-${index}`
        const isArrowSelected = selectedIds.has(arrowId)
        const isTextSelected = selectedIds.has(textId)
        const color = tplColors[arrowId] ?? metric.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!
        const arrowStrokeColor = tplStrokeColors[arrowId] || (isArrowSelected ? '#4a90d9' : '#f0f0f0')
        const arrowStrokeWidth = tplStrokeWidths[arrowId] !== undefined ? tplStrokeWidths[arrowId] : (isArrowSelected ? 2.5 : 9)

        const angle = ((index - (count - 1) / 2) * ANGLE_STEP * Math.PI) / 180
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)
        const feather = {
          x: CENTER.x + cosA * PLUME_RADIUS,
          y: CENTER.y + sinA * PLUME_RADIUS,
        }
        const rowY = feather.y
        const dx = CENTER.x - feather.x
        const dy = CENTER.y - feather.y
        const dist = Math.hypot(dx, dy)
        const ux = dx / dist
        const uy = dy / dist
        const perpX = -uy
        const perpY = ux
        const spread = (index - (count - 1) / 2) * 5
        const tipDist = 10
        const tip = {
          x: CENTER.x - ux * tipDist + perpX * spread,
          y: CENTER.y - uy * tipDist + perpY * spread,
        }
        const forwardAngle = Math.atan2(dy, dx) * (180 / Math.PI)

        const plume = PLUMES[index % PLUMES.length]!
        const plumeScale = 58 / plume.h
        const IconFn = getDynamicIcon(metric.icon)

        const defaultArrowRect = { x: Math.min(feather.x, tip.x), y: Math.min(feather.y, tip.y) - 30, width: Math.abs(feather.x - tip.x), height: Math.abs(feather.y - tip.y) + 60 }
        const customArrowPos = positions[arrowId]
        const arrowRect = {
          x: customArrowPos?.x ?? defaultArrowRect.x,
          y: customArrowPos?.y ?? defaultArrowRect.y,
          width: customArrowPos?.width ?? defaultArrowRect.width,
          height: customArrowPos?.height ?? defaultArrowRect.height,
        }

        const defaultTextRect = { x: TEXT_X, y: rowY - 26, width: TEXT_W + 30, height: 52 }
        const customTextPos = positions[textId]
        const textRect = {
          x: customTextPos?.x ?? defaultTextRect.x,
          y: customTextPos?.y ?? defaultTextRect.y,
          width: customTextPos?.width ?? defaultTextRect.width,
          height: customTextPos?.height ?? defaultTextRect.height,
        }

        const maxChars = Math.max(10, Math.floor(textRect.width / 6.5))
        const titleLines = wrapTextByWidth(metric.label, maxChars)
        const descLabel = [metric.value ? `${metric.value} / ${metric.target}` : metric.target, metric.change].filter(Boolean).join(' · ')
        const descLines = wrapTextByWidth(descLabel, maxChars)

        return (
          <g key={arrowId}>
            <g
              data-element-id={arrowId}
              onMouseDown={e => startDrag(e, arrowId, arrowRect)}
              transform={getTransform(arrowId, arrowRect)}
              style={{ cursor: 'pointer' }}
            >
              <line x1={feather.x} y1={feather.y} x2={tip.x} y2={tip.y} stroke={arrowStrokeColor} strokeWidth={arrowStrokeWidth} strokeLinecap="round" />
              <path
                d={plume.d}
                fill={color}
                transform={`translate(${feather.x}, ${feather.y}) rotate(${forwardAngle}) scale(${-plumeScale}, ${plumeScale}) translate(${-plume.cx}, ${-plume.cy})`}
              />
              {IconFn && (
                <g transform={`translate(${feather.x - 20}, ${feather.y - 7})`}>
                  <IconFn size={14} color="white" />
                </g>
              )}
              {isArrowSelected && renderHandles(arrowRect, arrowId)}
            </g>

            <g
              data-element-id={textId}
              onMouseDown={e => startDrag(e, textId, textRect)}
              transform={getTransform(textId, textRect)}
              style={{ cursor: 'pointer' }}
            >
              <text x={textRect.x} y={textRect.y + 16} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#2c2b64">
                {titleLines.map((line, li) => (
                  <tspan key={li} x={textRect.x} dy={li === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text x={textRect.x} y={textRect.y + 16 + titleLines.length * 15 + 2} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#666">
                {descLines.map((line, li) => (
                  <tspan key={li} x={textRect.x} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
              {isTextSelected && renderHandles(textRect, textId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
