import { useRef, useCallback } from 'react'
import { useDiagramStore } from '../store/diagramStore'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

type Corner = 'nw' | 'ne' | 'sw' | 'se'

interface Interaction {
  id: string
  kind: 'drag' | 'resize'
  corner?: Corner
  startMouse: { x: number; y: number }
  startRect: Rect
  hasMoved: boolean
}

const DRAG_THRESHOLD = 3
const HANDLE_SIZE = 8
const MIN_SIZE = 40

export function useDiagramDragResize(svgRef: React.RefObject<SVGGElement | null>) {
  const interactionRef = useRef<Interaction | null>(null)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)
  const moveDiagramElement = useDiagramStore(s => s.moveDiagramElement)
  const resizeDiagramElement = useDiagramStore(s => s.resizeDiagramElement)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)

  const onMouseMoveRef = useRef<(e: MouseEvent) => void>(() => {})
  const onMouseUpRef = useRef<() => void>(() => {})

  const stableOnMouseMove = useCallback((e: MouseEvent) => onMouseMoveRef.current(e), [])
  const stableOnMouseUp = useCallback(() => onMouseUpRef.current(), [])

  const toSvgPoint = useCallback((e: React.MouseEvent | MouseEvent): { x: number; y: number } => {
    const svg = svgRef.current?.ownerSVGElement
    if (!svg) return { x: 0, y: 0 }
    const ctm = svg.getScreenCTM()
    if (!ctm) return { x: 0, y: 0 }
    const pt = svg.createSVGPoint()
    if ('nativeEvent' in e) {
      pt.x = e.nativeEvent.clientX
      pt.y = e.nativeEvent.clientY
    } else {
      pt.x = e.clientX
      pt.y = e.clientY
    }
    const p = pt.matrixTransform(ctm.inverse())
    return { x: p.x, y: p.y }
  }, [svgRef])

  onMouseUpRef.current = () => {
    const interaction = interactionRef.current
    if (!interaction) return
    interactionRef.current = null
    window.removeEventListener('mousemove', stableOnMouseMove)
    window.removeEventListener('mouseup', stableOnMouseUp)
    if (!interaction.hasMoved) {
      toggleElement(interaction.id)
    }
  }

  onMouseMoveRef.current = (e: MouseEvent) => {
    const interaction = interactionRef.current
    if (!interaction) return
    const { x, y } = toSvgPoint(e)
    const dx = x - interaction.startMouse.x
    const dy = y - interaction.startMouse.y

    if (interaction.kind === 'drag') {
      if (!interaction.hasMoved) {
        if (Math.hypot(dx, dy) <= DRAG_THRESHOLD) return
        interaction.hasMoved = true
      }
      if (e.ctrlKey || e.metaKey) {
        moveDiagramElement(interaction.id, {
          x: interaction.startRect.x + dx,
          y: interaction.startRect.y,
        })
        return
      }
      if (e.shiftKey) {
        moveDiagramElement(interaction.id, {
          x: interaction.startRect.x,
          y: interaction.startRect.y + dy,
        })
        return
      }
      moveDiagramElement(interaction.id, {
        x: interaction.startRect.x + dx,
        y: interaction.startRect.y + dy,
      })
      return
    }

    if (interaction.kind === 'resize' && interaction.corner) {
      interaction.hasMoved = true
      const start = interaction.startRect
      let nextX = start.x
      let nextY = start.y
      let nextW = start.width
      let nextH = start.height

      if (interaction.corner === 'se') {
        nextW = Math.max(MIN_SIZE, x - start.x)
        nextH = Math.max(MIN_SIZE, y - start.y)
      } else if (interaction.corner === 'sw') {
        const right = start.x + start.width
        nextX = Math.min(x, right - MIN_SIZE)
        nextW = Math.max(MIN_SIZE, right - x)
        nextH = Math.max(MIN_SIZE, y - start.y)
      } else if (interaction.corner === 'ne') {
        const bottom = start.y + start.height
        nextY = Math.min(y, bottom - MIN_SIZE)
        nextW = Math.max(MIN_SIZE, x - start.x)
        nextH = Math.max(MIN_SIZE, bottom - y)
      } else {
        const right = start.x + start.width
        const bottom = start.y + start.height
        nextX = Math.min(x, right - MIN_SIZE)
        nextY = Math.min(y, bottom - MIN_SIZE)
        nextW = Math.max(MIN_SIZE, right - x)
        nextH = Math.max(MIN_SIZE, bottom - y)
      }

      resizeDiagramElement(interaction.id, { width: nextW, height: nextH })
      moveDiagramElement(interaction.id, { x: nextX, y: nextY })
    }
  }

  const startDrag = useCallback((e: React.MouseEvent, id: string, rect: Rect) => {
    e.stopPropagation()
    e.preventDefault()
    if (interactionRef.current) return
    const { x, y } = toSvgPoint(e)
    interactionRef.current = {
      id,
      kind: 'drag',
      startMouse: { x, y },
      startRect: rect,
      hasMoved: false,
    }
    window.addEventListener('mousemove', stableOnMouseMove)
    window.addEventListener('mouseup', stableOnMouseUp)
  }, [toSvgPoint, stableOnMouseMove, stableOnMouseUp])

  const startResize = useCallback((e: React.MouseEvent, id: string, corner: Corner, rect: Rect) => {
    e.stopPropagation()
    e.preventDefault()
    if (interactionRef.current) return
    const { x, y } = toSvgPoint(e)
    interactionRef.current = {
      id,
      kind: 'resize',
      corner,
      startMouse: { x, y },
      startRect: rect,
      hasMoved: true,
    }
    window.addEventListener('mousemove', stableOnMouseMove)
    window.addEventListener('mouseup', stableOnMouseUp)
  }, [toSvgPoint, stableOnMouseMove, stableOnMouseUp])

  const renderHandles = useCallback((visualRect: Rect, id: string) => {
    if (!selectedIds.has(id)) return null
    const half = HANDLE_SIZE / 2
    const handles: Array<{ corner: Corner; x: number; y: number; cursor: string }> = [
      { corner: 'nw', x: visualRect.x - half, y: visualRect.y - half, cursor: 'nwse-resize' },
      { corner: 'ne', x: visualRect.x + visualRect.width - half, y: visualRect.y - half, cursor: 'nesw-resize' },
      { corner: 'sw', x: visualRect.x - half, y: visualRect.y + visualRect.height - half, cursor: 'nesw-resize' },
      { corner: 'se', x: visualRect.x + visualRect.width - half, y: visualRect.y + visualRect.height - half, cursor: 'nwse-resize' },
    ]
    return (
      <g pointerEvents="all">
        {handles.map(h => (
          <rect
            key={h.corner}
            x={h.x}
            y={h.y}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            fill="#fff"
            stroke="#2196F3"
            strokeWidth={1}
            style={{ cursor: h.cursor }}
            onMouseDown={e => startResize(e, id, h.corner, visualRect)}
          />
        ))}
      </g>
    )
  }, [selectedIds, startResize])

  return { startDrag, startResize, renderHandles, toSvgPoint }
}
