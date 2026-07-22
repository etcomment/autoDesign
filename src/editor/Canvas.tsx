import { useCallback, useRef, useMemo } from 'react'
import { useDiagramStore } from '../store/diagramStore'
import { ShapeRenderer } from './shapes/ShapeRenderer'
import { ConnectionLines } from './shapes/ConnectionLines'

const GRID_SIZE = 20

export function Canvas() {
  const shapes = useDiagramStore(s => s.shapes)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const viewBox = useDiagramStore(s => s.viewBox)
  const setViewBox = useDiagramStore(s => s.setViewBox)
  const clearSelection = useDiagramStore(s => s.clearSelection)
  const toggleSelection = useDiagramStore(s => s.toggleSelection)
  const moveShape = useDiagramStore(s => s.moveShape)
  const isConnectMode = useDiagramStore(s => s.isConnectMode)
  const addConnection = useDiagramStore(s => s.addConnection)
  const selectShape = useDiagramStore(s => s.selectShape)

  const svgRef = useRef<SVGSVGElement>(null)
  const isPanning = useRef(false)
  const panStart = useRef({ x: 0, y: 0 })
  const dragTarget = useRef<string | null>(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const connectSourceId = useRef<string | null>(null)

  const selectedSet = useMemo(
    () => new Set(selectedShapeIds),
    [selectedShapeIds],
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const target = e.target as HTMLElement
      const shapeElement = target.closest('[data-shape-id]')
      if (shapeElement) {
        const shapeId = shapeElement.getAttribute('data-shape-id')
        if (!shapeId) return

        if (isConnectMode) {
          if (connectSourceId.current === null) {
            connectSourceId.current = shapeId
            selectShape(shapeId)
            return
          }
          if (connectSourceId.current !== shapeId) {
            addConnection(connectSourceId.current, shapeId)
          }
          connectSourceId.current = null
          clearSelection()
          return
        }

        toggleSelection(shapeId)
        dragTarget.current = shapeId
        dragStart.current = { x: e.clientX, y: e.clientY }
        return
      }

      connectSourceId.current = null
      clearSelection()
      isPanning.current = true
      panStart.current = { x: e.clientX - viewBox.x, y: e.clientY - viewBox.y }
    },
    [toggleSelection, clearSelection, viewBox, isConnectMode, addConnection, selectShape],
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isPanning.current) {
        const dx = e.clientX - panStart.current.x
        const dy = e.clientY - panStart.current.y
        setViewBox({ ...viewBox, x: dx, y: dy })
        return
      }

      if (dragTarget.current && !isConnectMode) {
        const dx = (e.clientX - dragStart.current.x) / viewBox.scale
        const dy = (e.clientY - dragStart.current.y) / viewBox.scale
        const shape = shapes.find(s => s.id === dragTarget.current)
        if (!shape) return
        moveShape(dragTarget.current, {
          x: shape.position.x + dx,
          y: shape.position.y + dy,
        })
        dragStart.current = { x: e.clientX, y: e.clientY }
      }
    },
    [viewBox, shapes, moveShape, setViewBox, isConnectMode],
  )

  const onMouseUp = useCallback(() => {
    isPanning.current = false
    dragTarget.current = null
  }, [])

  const onWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      const newScale = Math.max(0.1, Math.min(5, viewBox.scale + delta))
      setViewBox({ ...viewBox, scale: newScale })
    },
    [viewBox, setViewBox],
  )

  const transform = `translate(${viewBox.x}, ${viewBox.y}) scale(${viewBox.scale})`

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{
        display: 'block',
        background: isConnectMode ? '#f0f4ff' : '#f8f8f8',
        cursor: isConnectMode ? 'crosshair' : isPanning.current ? 'grabbing' : 'grab',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      <defs>
        <pattern
          id="grid"
          width={GRID_SIZE}
          height={GRID_SIZE}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth={0.5}
          />
        </pattern>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
        </marker>
      </defs>

      <g transform={transform}>
        <rect x={-5000} y={-5000} width={10000} height={10000} fill="url(#grid)" />
        <ConnectionLines />

        {shapes.map((shape) => (
          <g
            key={shape.id}
            data-shape-id={shape.id}
          >
            <ShapeRenderer
              shape={shape}
              isSelected={selectedSet.has(shape.id)}
            />
          </g>
        ))}
      </g>
    </svg>
  )
}
