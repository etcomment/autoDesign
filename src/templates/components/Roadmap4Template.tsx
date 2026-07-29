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

    // Ribbon bodies
    map.set('step-1-body', { x: 160, y: 452.5, width: 315, height: 45 })
    map.set('step-2-body', { x: 480, y: 380, width: 207.5, height: 95 })
    map.set('step-3-body', { x: 342.5, y: 285, width: 202.5, height: 95 })
    map.set('step-4-body', { x: 475, y: 190, width: 232.5, height: 95 })
    map.set('step-5-body', { x: 345, y: 100, width: 425, height: 90 })

    // Arrow heads
    map.set('step-1-arrow', { x: 470, y: 440, width: 40, height: 70 })
    map.set('step-2-arrow', { x: 515, y: 345, width: 40, height: 70 })
    map.set('step-3-arrow', { x: 465, y: 250, width: 40, height: 70 })
    map.set('step-4-arrow', { x: 515, y: 155, width: 40, height: 70 })
    map.set('step-5-arrow', { x: 765, y: 65, width: 40, height: 70 })

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

  const s1bR = getR('step-1-body')
  const s2bR = getR('step-2-body')
  const s3bR = getR('step-3-body')
  const s4bR = getR('step-4-body')
  const s5bR = getR('step-5-body')

  const s1aR = getR('step-1-arrow')
  const s2aR = getR('step-2-arrow')
  const s3aR = getR('step-3-arrow')
  const s4aR = getR('step-4-arrow')
  const s5aR = getR('step-5-arrow')

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
      <g onMouseDown={e => startDrag(e, 'step-1-body', s1bR)} style={{ cursor: 'pointer' }}>
        <rect x={s1bR.x} y={s1bR.y} width={s1bR.width} height={s1bR.height} fill={c1} />
        {selectedIds.has('step-1-body') && renderHandles(s1bR, 'step-1-body')}
      </g>

      {/* Step 2 Body: Yellow start bar starting UNDER Teal arrow head (x=480), U-turn right to y=380 going left to x=550 */}
      <g onMouseDown={e => startDrag(e, 'step-2-body', s2bR)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${s2bR.x} ${s2bR.y + s2bR.height} L ${s2bR.x + s2bR.width - s2bR.height / 2} ${s2bR.y + s2bR.height} A ${s2bR.height / 2} ${s2bR.height / 2} 0 0 0 ${s2bR.x + s2bR.width - s2bR.height / 2} ${s2bR.y} L ${s2bR.x + 70} ${s2bR.y}`}
          fill="none"
          stroke={c2}
          strokeWidth={45}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {selectedIds.has('step-2-body') && renderHandles(s2bR, 'step-2-body')}
      </g>

      {/* Step 3 Body: Red start bar starting UNDER Yellow arrow head (x=545), U-turn left to y=285 going right to x=470 */}
      <g onMouseDown={e => startDrag(e, 'step-3-body', s3bR)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${s3bR.x + s3bR.width} ${s3bR.y + s3bR.height} L ${s3bR.x + s3bR.height / 2} ${s3bR.y + s3bR.height} A ${s3bR.height / 2} ${s3bR.height / 2} 0 0 1 ${s3bR.x + s3bR.height / 2} ${s3bR.y} L ${s3bR.x + s3bR.width - 75} ${s3bR.y}`}
          fill="none"
          stroke={c3}
          strokeWidth={45}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {selectedIds.has('step-3-body') && renderHandles(s3bR, 'step-3-body')}
      </g>

      {/* Step 4 Body: Blue start bar starting UNDER Red arrow head (x=475), U-turn right to y=190 going left to x=550 */}
      <g onMouseDown={e => startDrag(e, 'step-4-body', s4bR)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${s4bR.x} ${s4bR.y + s4bR.height} L ${s4bR.x + s4bR.width - s4bR.height / 2} ${s4bR.y + s4bR.height} A ${s4bR.height / 2} ${s4bR.height / 2} 0 0 0 ${s4bR.x + s4bR.width - s4bR.height / 2} ${s4bR.y} L ${s4bR.x + 75} ${s4bR.y}`}
          fill="none"
          stroke={c4}
          strokeWidth={45}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {selectedIds.has('step-4-body') && renderHandles(s4bR, 'step-4-body')}
      </g>

      {/* Step 5 Body: Navy start bar starting UNDER Blue arrow head (x=545), U-turn left to y=100 going right to x=770 */}
      <g onMouseDown={e => startDrag(e, 'step-5-body', s5bR)} style={{ cursor: 'pointer' }}>
        <path
          d={`M ${s5bR.x + 200} ${s5bR.y + s5bR.height} L ${s5bR.x + s5bR.height / 2} ${s5bR.y + s5bR.height} A ${s5bR.height / 2} ${s5bR.height / 2} 0 0 1 ${s5bR.x + s5bR.height / 2} ${s5bR.y} L ${s5bR.x + s5bR.width} ${s5bR.y}`}
          fill="none"
          stroke={c5}
          strokeWidth={45}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {selectedIds.has('step-5-body') && renderHandles(s5bR, 'step-5-body')}
      </g>

      {/* LAYER 2: ARROW HEADS (Triangles sitting ON TOP of the next step's body) */}
      {/* Step 1 Arrow Head (Teal pointing right) -> base x=470, tip x=510 completely covers Yellow start at x=480 */}
      <g onMouseDown={e => startDrag(e, 'step-1-arrow', s1aR)} style={{ cursor: 'pointer' }}>
        <path d={`M ${s1aR.x} ${s1aR.y} L ${s1aR.x} ${s1aR.y + s1aR.height} L ${s1aR.x + s1aR.width} ${s1aR.y + s1aR.height / 2} Z`} fill={c1} />
        {selectedIds.has('step-1-arrow') && renderHandles(s1aR, 'step-1-arrow')}
      </g>

      {/* Step 2 Arrow Head (Yellow pointing left) -> base x=555, tip x=515 completely covers Red start at x=545 */}
      <g onMouseDown={e => startDrag(e, 'step-2-arrow', s2aR)} style={{ cursor: 'pointer' }}>
        <path d={`M ${s2aR.x + s2aR.width} ${s2aR.y} L ${s2aR.x + s2aR.width} ${s2aR.y + s2aR.height} L ${s2aR.x} ${s2aR.y + s2aR.height / 2} Z`} fill={c2} />
        {selectedIds.has('step-2-arrow') && renderHandles(s2aR, 'step-2-arrow')}
      </g>

      {/* Step 3 Arrow Head (Red pointing right) -> base x=465, tip x=505 completely covers Blue start at x=475 */}
      <g onMouseDown={e => startDrag(e, 'step-3-arrow', s3aR)} style={{ cursor: 'pointer' }}>
        <path d={`M ${s3aR.x} ${s3aR.y} L ${s3aR.x} ${s3aR.y + s3aR.height} L ${s3aR.x + s3aR.width} ${s3aR.y + s3aR.height / 2} Z`} fill={c3} />
        {selectedIds.has('step-3-arrow') && renderHandles(s3aR, 'step-3-arrow')}
      </g>

      {/* Step 4 Arrow Head (Blue pointing left) -> base x=555, tip x=515 completely covers Navy start at x=545 */}
      <g onMouseDown={e => startDrag(e, 'step-4-arrow', s4aR)} style={{ cursor: 'pointer' }}>
        <path d={`M ${s4aR.x + s4aR.width} ${s4aR.y} L ${s4aR.x + s4aR.width} ${s4aR.y + s4aR.height} L ${s4aR.x} ${s4aR.y + s4aR.height / 2} Z`} fill={c4} />
        {selectedIds.has('step-4-arrow') && renderHandles(s4aR, 'step-4-arrow')}
      </g>

      {/* Step 5 Arrow Head (Navy pointing right) */}
      <g onMouseDown={e => startDrag(e, 'step-5-arrow', s5aR)} style={{ cursor: 'pointer' }}>
        <path d={`M ${s5aR.x} ${s5aR.y} L ${s5aR.x} ${s5aR.y + s5aR.height} L ${s5aR.x + s5aR.width} ${s5aR.y + s5aR.height / 2} Z`} fill={c5} />
        {selectedIds.has('step-5-arrow') && renderHandles(s5aR, 'step-5-arrow')}
      </g>

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
