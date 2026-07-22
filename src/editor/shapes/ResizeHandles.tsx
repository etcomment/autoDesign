import { useCallback, useRef } from 'react'
import { useDiagramStore } from '../../store/diagramStore'
import type { Shape } from '../../core/model/Shape'

interface ResizeHandlesProps {
  readonly shape: Shape
}

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const HANDLE_SIZE = 8

function getHandleCoordinates(shape: Shape, position: HandlePosition) {
  const { x, y } = shape.position
  const { width: w, height: h } = shape.dimensions

  switch (position) {
    case 'top-left': return { x: x - HANDLE_SIZE / 2, y: y - HANDLE_SIZE / 2, cursor: 'nwse-resize' }
    case 'top-right': return { x: x + w - HANDLE_SIZE / 2, y: y - HANDLE_SIZE / 2, cursor: 'nesw-resize' }
    case 'bottom-left': return { x: x - HANDLE_SIZE / 2, y: y + h - HANDLE_SIZE / 2, cursor: 'nesw-resize' }
    case 'bottom-right': return { x: x + w - HANDLE_SIZE / 2, y: y + h - HANDLE_SIZE / 2, cursor: 'nwse-resize' }
  }
}

export function ResizeHandles({ shape }: ResizeHandlesProps) {
  const resizeShape = useDiagramStore(s => s.moveAndResizeShape)
  const isDragging = useRef(false)
  const handleRef = useRef<HandlePosition | null>(null)
  const startMouse = useRef({ x: 0, y: 0 })
  const startDimensions = useRef({ width: 0, height: 0 })
  const startPosition = useRef({ x: 0, y: 0 })

  const onMouseDown = useCallback(
    (e: React.MouseEvent, position: HandlePosition) => {
      e.stopPropagation()
      e.preventDefault()
      isDragging.current = true
      handleRef.current = position
      startMouse.current = { x: e.clientX, y: e.clientY }
      startDimensions.current = { ...shape.dimensions }
      startPosition.current = { ...shape.position }

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current || !handleRef.current) return
        const dx = moveEvent.clientX - startMouse.current.x
        const dy = moveEvent.clientY - startMouse.current.y
        const pos = startPosition.current
        const dim = startDimensions.current
        const hPos = handleRef.current

        let newX = pos.x
        let newY = pos.y
        let newW = dim.width
        let newH = dim.height

        switch (hPos) {
          case 'top-left':
            newX = pos.x + dx
            newY = pos.y + dy
            newW = dim.width - dx
            newH = dim.height - dy
            break
          case 'top-right':
            newY = pos.y + dy
            newW = dim.width + dx
            newH = dim.height - dy
            break
          case 'bottom-left':
            newX = pos.x + dx
            newW = dim.width - dx
            newH = dim.height + dy
            break
          case 'bottom-right':
            newW = dim.width + dx
            newH = dim.height + dy
            break
        }

        const minSize = 10
        if (newW < minSize || newH < minSize) return

        resizeShape(shape.id, { x: newX, y: newY }, { width: newW, height: newH })
      }

      const handleMouseUp = () => {
        isDragging.current = false
        handleRef.current = null
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    },
    [shape, resizeShape],
  )

  const handles: HandlePosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

  return (
    <>
      {handles.map((position) => {
        const { x, y, cursor } = getHandleCoordinates(shape, position)
        return (
          <rect
            key={position}
            x={x}
            y={y}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            fill="white"
            stroke="#4a90d9"
            strokeWidth={1.5}
            style={{ cursor }}
            onMouseDown={(e) => onMouseDown(e, position)}
          />
        )
      })}
    </>
  )
}
