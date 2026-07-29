import { TITLE_COLOR } from '../../lib/theme'
import { useEffect, useMemo, useRef, type ReactElement } from 'react'
import type { RoadmapData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

// Design from PDF Page 139:
// Canvas: 1000 x 562.5
// Winding 3D overlapping snake ribbon with 5 steps:
// Each step's body starts right underneath the previous arrow head, and its arrow head sits ON TOP of the next step's body!
// Step 1 (Teal #4cbfa0): Bottom lane going right (y=475)
// Step 2 (Yellow #ffbe00): Starts under Step 1 arrow (x=480), U-turns right to y=380 going left
// Step 3 (Coral Red #ff4a2b): Starts under Step 2 arrow (x=545), U-turns left to y=285 going right
// Step 4 (Medium Blue #2d62ed): Starts under Step 3 arrow (x=475), U-turns right to y=190 going left
// Step 5 (Dark Navy #23255a): Starts under Step 4 arrow (x=545), U-turns left to y=100 going right

export function Roadmap4Template({ data }: { data: RoadmapData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions)
  const moveEl = useTemplateStore(s => s.moveTemplateElement)
  const resizeEl = useTemplateStore(s => s.resizeTemplateElement)

  const { title, milestones = [], steps = [] } = data as { title?: string; milestones?: Array<{ title: string; subtitle?: string }>; steps?: Array<{ title: string }> }
  const W = 1000

  const stepList = [
    steps[0]?.title || 'Step One',
    steps[1]?.title || 'Step Two',
    steps[2]?.title || 'Step Three',
    steps[3]?.title || 'Step Four',
    steps[4]?.title || 'Step Five',
  ]

  const displayMilestones = milestones.length > 0 ? milestones : [
    { title: 'Milestone', subtitle: 'Content and description to be\nadded here as required' },
    { title: 'Milestone', subtitle: 'Content and description to be\nadded here as required' },
    { title: 'Milestone', subtitle: 'Content and description to be\nadded here as required' },
    { title: 'Milestone', subtitle: 'Content and description to be\nadded here as required' },
  ]

  const defaultPositions = useMemo(() => {
    const map = new Map<string, Rect>()
    map.set('main-title', { x: 45, y: 35, width: 350, height: 50 })

    // Step labels on ribbons
    map.set('step-1', { x: 340, y: 458, width: 120, height: 35 })
    map.set('step-2', { x: 540, y: 363, width: 120, height: 35 })
    map.set('step-3', { x: 340, y: 268, width: 120, height: 35 })
    map.set('step-4', { x: 550, y: 173, width: 120, height: 35 })
    map.set('step-5', { x: 670, y: 83, width: 120, height: 35 })

    // Milestone descriptions cleanly positioned away from turns
    map.set('milestone-1', { x: 695, y: 355, width: 240, height: 90 })
    map.set('milestone-2', { x: 80, y: 260, width: 240, height: 90 })
    map.set('milestone-3', { x: 730, y: 165, width: 240, height: 90 })
    map.set('milestone-4', { x: 80, y: 75, width: 240, height: 90 })
    map.set('milestone-5', { x: 780, y: 35, width: 240, height: 90 })

    for (let i = 5; i < displayMilestones.length; i++) {
      const id = `milestone-${i + 1}`
      const isLeft = i % 2 === 1
      const yPos = Math.max(20, 75 - Math.floor((i - 3) / 2) * 70)
      map.set(id, { x: isLeft ? 80 : 730, y: yPos, width: 240, height: 90 })
    }

    return map
  }, [displayMilestones.length])

  useEffect(() => {
    for (const [id, rect] of defaultPositions.entries()) {
      if (!pos[id]) {
        moveEl(id, { x: rect.x, y: rect.y })
        resizeEl(id, { width: rect.width, height: rect.height })
      }
    }
  }, [defaultPositions, pos, moveEl, resizeEl])

  const getR = (id: string): Rect => {
    const p = pos[id]
    const d = defaultPositions.get(id) || { x: 0, y: 0, width: 100, height: 50 }
    return {
      x: p?.x ?? d.x,
      y: p?.y ?? d.y,
      width: p?.width || d.width,
      height: p?.height || d.height,
    }
  }

  const titleR = getR('main-title')
  const step1R = getR('step-1')
  const step2R = getR('step-2')
  const step3R = getR('step-3')
  const step4R = getR('step-4')
  const step5R = getR('step-5')

  const c1 = tplColors['step-1'] || '#4cbfa0' // Teal
  const c2 = tplColors['step-2'] || '#ffbe00' // Yellow
  const c3 = tplColors['step-3'] || '#ff4a2b' // Coral Red
  const c4 = tplColors['step-4'] || '#2d62ed' // Blue
  const c5 = tplColors['step-5'] || '#23255a' // Navy

  return (
    <g ref={svgRef}>
      {/* Header Title */}
      {title && (
        <g onMouseDown={e => startDrag(e, 'main-title', titleR)} style={{ cursor: 'pointer' }}>
          <text
            x={W / 2}
            y={42}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={22}
            fontWeight={700}
            fill={tplColors['main-title'] || TITLE_COLOR}
          >
            {title}
          </text>
          {selectedIds.has('main-title') && renderHandles(titleR, 'main-title')}
        </g>
      )}

      {/* LAYER 1: RIBBON BODIES (Underneath layer) */}
      {/* Step 1 Body: Teal horizontal bar */}
      <rect x={160} y={452.5} width={315} height={45} fill={c1} />

      {/* Step 2 Body: Yellow start bar starting UNDER Teal arrow head (x=480), U-turn right to y=380 going left to x=550 */}
      <path
        d="M 480 475 L 640 475 A 47.5 47.5 0 0 0 640 380 L 550 380"
        fill="none"
        stroke={c2}
        strokeWidth={45}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />

      {/* Step 3 Body: Red start bar starting UNDER Yellow arrow head (x=545), U-turn left to y=285 going right to x=470 */}
      <path
        d="M 545 380 L 390 380 A 47.5 47.5 0 0 1 390 285 L 470 285"
        fill="none"
        stroke={c3}
        strokeWidth={45}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />

      {/* Step 4 Body: Blue start bar starting UNDER Red arrow head (x=475), U-turn right to y=190 going left to x=550 */}
      <path
        d="M 475 285 L 660 285 A 47.5 47.5 0 0 0 660 190 L 550 190"
        fill="none"
        stroke={c4}
        strokeWidth={45}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />

      {/* Step 5 Body: Navy start bar starting UNDER Blue arrow head (x=545), U-turn left to y=100 going right to x=770 */}
      <path
        d="M 545 190 L 390 190 A 45 45 0 0 1 390 100 L 770 100"
        fill="none"
        stroke={c5}
        strokeWidth={45}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />

      {/* LAYER 2: ARROW HEADS (Triangles sitting ON TOP of the next step's body) */}
      {/* Step 1 Arrow Head (Teal pointing right) -> base x=470, tip x=510 completely covers Yellow start at x=480 */}
      <path d="M 470 440 L 470 510 L 510 475 Z" fill={c1} />

      {/* Step 2 Arrow Head (Yellow pointing left) -> base x=555, tip x=515 completely covers Red start at x=545 */}
      <path d="M 555 345 L 555 415 L 515 380 Z" fill={c2} />

      {/* Step 3 Arrow Head (Red pointing right) -> base x=465, tip x=505 completely covers Blue start at x=475 */}
      <path d="M 465 250 L 465 320 L 505 285 Z" fill={c3} />

      {/* Step 4 Arrow Head (Blue pointing left) -> base x=555, tip x=515 completely covers Navy start at x=545 */}
      <path d="M 555 155 L 555 225 L 515 190 Z" fill={c4} />

      {/* Step 5 Arrow Head (Navy pointing right) */}
      <path d="M 765 65 L 765 135 L 805 100 Z" fill={c5} />

      {/* LAYER 3: INTERACTIVE STEP TEXT LABELS */}
      <g onMouseDown={e => startDrag(e, 'step-1', step1R)} style={{ cursor: 'pointer' }}>
        <text x={step1R.x + step1R.width / 2} y={step1R.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="#ffffff">{stepList[0]}</text>
        {selectedIds.has('step-1') && renderHandles(step1R, 'step-1')}
      </g>

      <g onMouseDown={e => startDrag(e, 'step-2', step2R)} style={{ cursor: 'pointer' }}>
        <text x={step2R.x + step2R.width / 2} y={step2R.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="#ffffff">{stepList[1]}</text>
        {selectedIds.has('step-2') && renderHandles(step2R, 'step-2')}
      </g>

      <g onMouseDown={e => startDrag(e, 'step-3', step3R)} style={{ cursor: 'pointer' }}>
        <text x={step3R.x + step3R.width / 2} y={step3R.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="#ffffff">{stepList[2]}</text>
        {selectedIds.has('step-3') && renderHandles(step3R, 'step-3')}
      </g>

      <g onMouseDown={e => startDrag(e, 'step-4', step4R)} style={{ cursor: 'pointer' }}>
        <text x={step4R.x + step4R.width / 2} y={step4R.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="#ffffff">{stepList[3]}</text>
        {selectedIds.has('step-4') && renderHandles(step4R, 'step-4')}
      </g>

      <g onMouseDown={e => startDrag(e, 'step-5', step5R)} style={{ cursor: 'pointer' }}>
        <text x={step5R.x + step5R.width / 2} y={step5R.y + 22} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill="#ffffff">{stepList[4]}</text>
        {selectedIds.has('step-5') && renderHandles(step5R, 'step-5')}
      </g>

      {/* LAYER 4: MILESTONE TEXT ANNOTATIONS */}
      {displayMilestones.map((ms, idx) => {
        const id = `milestone-${idx + 1}`
        const msR = getR(id)
        const isLeft = (idx % 2 === 1)
        const textX = isLeft ? msR.x + msR.width : msR.x
        const textAnchor = isLeft ? 'end' : 'start'
        const msColor = (ms as { color?: string }).color || "#23255a"

        return (
          <g key={id} onMouseDown={e => startDrag(e, id, msR)} style={{ cursor: 'pointer' }}>
            <text x={textX} y={msR.y + 22} textAnchor={textAnchor} fontFamily="Arial, sans-serif" fontSize={20} fontWeight="bold" fill={msColor}>
              {ms.title}
            </text>
            {ms.subtitle && ms.subtitle.split('\n').map((line, lIdx) => (
              <text key={lIdx} x={textX} y={msR.y + 48 + lIdx * 20} textAnchor={textAnchor} fontFamily="Arial, sans-serif" fontSize={13} fill="#555555">
                {line}
              </text>
            ))}
            {selectedIds.has(id) && renderHandles(msR, id)}
          </g>
        )
      })}
    </g>
  )
}
