import re

with open("src/templates/shared/useTemplateDragResize.tsx", "r") as f:
    content = f.read()

new_code = """import { useRef, useCallback } from 'react'
import { useTemplateStore } from '../store'
import { useDiagramStore } from '../../store/diagramStore'

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
  allStartRects?: Record<string, Rect>
}

const DRAG_THRESHOLD = 3
const HANDLE_SIZE = 8
const MIN_SIZE = 40

export function useTemplateDragResize(svgRef: React.RefObject<SVGGElement | null>) {
  const interactionRef = useRef<Interaction | null>(null)
  const toggleElement = useTemplateStore(s => s.toggleTemplateElement)
  const selectElement = useTemplateStore(s => s.selectTemplateElement)
  const moveElement = useTemplateStore(s => s.moveTemplateElement)
  const resizeElement = useTemplateStore(s => s.resizeTemplateElement)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateElementPositions = useTemplateStore(s => s.templateElementPositions)

  const onMouseMoveRef = useRef<(e: MouseEvent) => void>(() => {})
  const onMouseUpRef = useRef<(e: MouseEvent) => void>(() => {})

  const stableOnMouseMove = useCallback((e: MouseEvent) => onMouseMoveRef.current(e), [])
  const stableOnMouseUp = useCallback((e: MouseEvent) => onMouseUpRef.current(e), [])

  const toSvgPoint = useCallback((e: MouseEvent): { x: number; y: number } => {
    const svg = svgRef.current?.ownerSVGElement
    if (!svg) return { x: 0, y: 0 }
    const ctm = svg.getScreenCTM()
    if (!ctm) return { x: 0, y: 0 }
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(ctm.inverse())
    return { x: p.x, y: p.y }
  }, [svgRef])

  onMouseUpRef.current = (e: MouseEvent) => {
    const interaction = interactionRef.current
    if (!interaction) return
    interactionRef.current = null
    window.removeEventListener('mousemove', stableOnMouseMove)
    window.removeEventListener('mouseup', stableOnMouseUp)
    if (!interaction.hasMoved) {
      if (e.ctrlKey || e.metaKey) {
        toggleElement(interaction.id)
      } else {
        useDiagramStore.getState().clearSelection()
        useDiagramStore.getState().clearDiagramElementSelection()
        selectElement(interaction.id)
      }
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
      const useX = (e.ctrlKey || e.metaKey) ? dx : (e.shiftKey ? 0 : dx)
      const useY = e.shiftKey ? dy : (e.ctrlKey || e.metaKey) ? 0 : dy

      if (interaction.allStartRects) {
        for (const [sid, startR] of Object.entries(interaction.allStartRects)) {
          moveElement(sid, {
            x: startR.x + useX,
            y: startR.y + useY,
          })
        }
      }
      moveElement(interaction.id, {
        x: interaction.startRect.x + useX,
        y: interaction.startRect.y + useY,
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

      if (interaction.allStartRects) {
        const scaleX = nextW / start.width
        const scaleY = nextH / start.height
        
        for (const [sid, startR] of Object.entries(interaction.allStartRects)) {
          const relativeX = startR.x - start.x
          const relativeY = startR.y - start.y
          moveElement(sid, {
            x: nextX + relativeX * scaleX,
            y: nextY + relativeY * scaleY,
          })
          resizeElement(sid, {
            width: startR.width * scaleX,
            height: startR.height * scaleY,
          })
        }
      }

      resizeElement(interaction.id, { width: nextW, height: nextH })
      moveElement(interaction.id, { x: nextX, y: nextY })
    }
  }

  const startInteraction = useCallback((e: React.MouseEvent, id: string, rect: Rect, kind: 'drag' | 'resize', corner?: Corner) => {
    e.stopPropagation()
    e.preventDefault()
    if (interactionRef.current) return
    const mouseEvent = e.nativeEvent
    const { x, y } = toSvgPoint(mouseEvent)

    let allStartRects: Record<string, Rect> | undefined
    let groupStartRect = rect

    if (selectedIds.size > 1 && selectedIds.has(id)) {
      allStartRects = {}
      let minX = rect.x
      let minY = rect.y
      let maxX = rect.x + rect.width
      let maxY = rect.y + rect.height

      for (const sid of selectedIds) {
        if (sid === id) continue
        const pos = templateElementPositions[sid]
        if (pos) {
          allStartRects[sid] = { x: pos.x, y: pos.y, width: pos.width || 20, height: pos.height || 20 }
          minX = Math.min(minX, pos.x)
          minY = Math.min(minY, pos.y)
          maxX = Math.max(maxX, pos.x + (pos.width || 20))
          maxY = Math.max(maxY, pos.y + (pos.height || 20))
        }
      }
      groupStartRect = { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    }

    interactionRef.current = {
      id,
      kind,
      corner,
      startMouse: { x, y },
      startRect: groupStartRect,
      hasMoved: kind === 'resize',
      allStartRects,
    }
    window.addEventListener('mousemove', stableOnMouseMove)
    window.addEventListener('mouseup', stableOnMouseUp)
  }, [toSvgPoint, stableOnMouseMove, stableOnMouseUp, selectedIds, templateElementPositions])

  const startDrag = useCallback((e: React.MouseEvent, id: string, rect: Rect) => {
    startInteraction(e, id, rect, 'drag')
  }, [startInteraction])

  const startResize = useCallback((e: React.MouseEvent, id: string, corner: Corner, rect: Rect) => {
    startInteraction(e, id, rect, 'resize', corner)
  }, [startInteraction])

  const renderHandles = useCallback((visualRect: Rect, id: string) => {
    if (!selectedIds.has(id)) return null
    
    let renderRect = visualRect
    if (selectedIds.size > 1) {
       const firstId = Array.from(selectedIds)[0]
       if (id !== firstId) return null
       
       let minX = visualRect.x
       let minY = visualRect.y
       let maxX = visualRect.x + visualRect.width
       let maxY = visualRect.y + visualRect.height
       
       for (const sid of selectedIds) {
          if (sid === id) continue
          const pos = templateElementPositions[sid]
          if (pos) {
             minX = Math.min(minX, pos.x)
             minY = Math.min(minY, pos.y)
             maxX = Math.max(maxX, pos.x + (pos.width || 20))
             maxY = Math.max(maxY, pos.y + (pos.height || 20))
          }
       }
       renderRect = { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    }

    const half = HANDLE_SIZE / 2
    const handles: Array<{ corner: Corner; x: number; y: number; cursor: string }> = [
      { corner: 'nw', x: renderRect.x - half, y: renderRect.y - half, cursor: 'nwse-resize' },
      { corner: 'ne', x: renderRect.x + renderRect.width - half, y: renderRect.y - half, cursor: 'nesw-resize' },
      { corner: 'sw', x: renderRect.x - half, y: renderRect.y + renderRect.height - half, cursor: 'nesw-resize' },
      { corner: 'se', x: renderRect.x + renderRect.width - half, y: renderRect.y + renderRect.height - half, cursor: 'nwse-resize' },
    ]
    return (
      <g pointerEvents="all">
        {selectedIds.size > 1 && (
          <rect
            x={renderRect.x}
            y={renderRect.y}
            width={renderRect.width}
            height={renderRect.height}
            fill="none"
            stroke="#2196F3"
            strokeWidth={1}
            strokeDasharray="4 4"
            pointerEvents="none"
          />
        )}
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
  }, [selectedIds, startResize, templateElementPositions])

  return { startDrag, startResize, renderHandles, toSvgPoint }
}
"""

with open("src/templates/shared/useTemplateDragResize.tsx", "w") as f:
    f.write(new_code)
