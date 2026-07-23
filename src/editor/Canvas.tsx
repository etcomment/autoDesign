import { useCallback, useRef, useMemo, useState } from 'react'
import { useDiagramStore } from '../store/diagramStore'
import { ShapeRenderer } from './shapes/ShapeRenderer'
import { ConnectionLines } from './shapes/ConnectionLines'
import { SubgraphRenderer } from './shapes/SubgraphRenderer'
import { SequenceLifelines } from './shapes/SequenceLifelines'
import { PieRenderer } from './shapes/PieRenderer'
import { QuadrantRenderer } from './shapes/QuadrantRenderer'
import { TimelineRenderer } from './shapes/TimelineRenderer'
import { UserJourneyRenderer } from './shapes/UserJourneyRenderer'
import { GanttRenderer } from './shapes/GanttRenderer'
import { MindmapRenderer } from './shapes/MindmapRenderer'
import { GitGraphRenderer } from './shapes/GitGraphRenderer'
import { SankeyRenderer } from './shapes/SankeyRenderer'
import { XYChartRenderer } from './shapes/XYChartRenderer'
import { KanbanRenderer } from './shapes/KanbanRenderer'
import { C4Renderer } from './shapes/C4Renderer'
import { StateRenderer } from './shapes/StateRenderer'
import { ArchitectureRenderer } from './shapes/ArchitectureRenderer'
import { RadarRenderer } from './shapes/RadarRenderer'
import { WardleyRenderer } from './shapes/WardleyRenderer'
import { CynefinRenderer } from './shapes/CynefinRenderer'
import { SwimlanesRenderer } from './shapes/SwimlanesRenderer'
import { ZenUmlRenderer } from './shapes/ZenUmlRenderer'
import { VennRenderer } from './shapes/VennRenderer'
import { TreemapRenderer } from './shapes/TreemapRenderer'
import { IshikawaRenderer } from './shapes/IshikawaRenderer'
import { GRID_SIZE, snapToGrid } from '../core/grid'

interface MarqueeRect {
  startX: number
  startY: number
  endX: number
  endY: number
}

export function Canvas() {
  const shapes = useDiagramStore(s => s.shapes)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const diagramType = useDiagramStore(s => s.diagramType)
  const viewBox = useDiagramStore(s => s.viewBox)
  const setViewBox = useDiagramStore(s => s.setViewBox)
  const clearSelection = useDiagramStore(s => s.clearSelection)
  const clearDiagramElementSelection = useDiagramStore(s => s.clearDiagramElementSelection)
  const toggleSelection = useDiagramStore(s => s.toggleSelection)
  const selectShape = useDiagramStore(s => s.selectShape)
  const moveShape = useDiagramStore(s => s.moveShape)
  const isConnectMode = useDiagramStore(s => s.isConnectMode)
  const addConnection = useDiagramStore(s => s.addConnection)

  const svgRef = useRef<SVGSVGElement>(null)
  const isPanning = useRef(false)
  const panStart = useRef({ x: 0, y: 0 })
  const dragTarget = useRef<string | null>(null)
  const dragStartMouse = useRef({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const connectSourceId = useRef<string | null>(null)

  const [marquee, setMarquee] = useState<MarqueeRect | null>(null)

  const selectedSet = useMemo(
    () => new Set(selectedShapeIds),
    [selectedShapeIds],
  )

  const screenToCanvas = useCallback(
    (clientX: number, clientY: number) => {
      const svgEl = svgRef.current
      if (!svgEl) return { x: 0, y: 0 }
      const rect = svgEl.getBoundingClientRect()
      const mx = (clientX - rect.left - viewBox.x) / viewBox.scale
      const my = (clientY - rect.top - viewBox.y) / viewBox.scale
      return { x: mx, y: my }
    },
    [viewBox],
  )

  const isShapeInsideMarquee = useCallback(
    (shape: { position: { x: number; y: number }; dimensions: { width: number; height: number } }, marqueeRect: MarqueeRect) => {
      const minX = Math.min(marqueeRect.startX, marqueeRect.endX)
      const maxX = Math.max(marqueeRect.startX, marqueeRect.endX)
      const minY = Math.min(marqueeRect.startY, marqueeRect.endY)
      const maxY = Math.max(marqueeRect.startY, marqueeRect.endY)

      return (
        shape.position.x < maxX &&
        shape.position.x + shape.dimensions.width > minX &&
        shape.position.y < maxY &&
        shape.position.y + shape.dimensions.height > minY
      )
    },
    [],
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      // Middle-click → pan
      if (e.button === 1) {
        isPanning.current = true
        panStart.current = { x: e.clientX - viewBox.x, y: e.clientY - viewBox.y }
        return
      }

      if (e.button !== 0) return

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

        if (e.ctrlKey || e.metaKey) {
          toggleSelection(shapeId)
        } else if (!selectedSet.has(shapeId)) {
          clearSelection()
          selectShape(shapeId)
        }

        dragTarget.current = shapeId
        dragStartMouse.current = { x: e.clientX, y: e.clientY }
        const shape = shapes.find(s => s.id === shapeId)
        if (shape) {
          dragStartPos.current = { x: shape.position.x, y: shape.position.y }
        }
        return
      }

      connectSourceId.current = null

      // Start marquee selection
      if (!e.ctrlKey && !e.metaKey) {
        clearSelection()
        clearDiagramElementSelection()
      }
      const canvas = screenToCanvas(e.clientX, e.clientY)
      setMarquee({ startX: canvas.x, startY: canvas.y, endX: canvas.x, endY: canvas.y })
    },
    [toggleSelection, clearSelection, viewBox, isConnectMode, addConnection, selectShape, selectedSet, screenToCanvas, shapes],
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isPanning.current) {
        const dx = e.clientX - panStart.current.x
        const dy = e.clientY - panStart.current.y
        setViewBox({ ...viewBox, x: dx, y: dy })
        return
      }

      if (marquee) {
        const canvas = screenToCanvas(e.clientX, e.clientY)
        setMarquee({ ...marquee, endX: canvas.x, endY: canvas.y })
        return
      }

      if (dragTarget.current && !isConnectMode) {
        const dx = (e.clientX - dragStartMouse.current.x) / viewBox.scale
        const dy = (e.clientY - dragStartMouse.current.y) / viewBox.scale
        isDragging.current = true
        moveShape(dragTarget.current, {
          x: dragStartPos.current.x + dx,
          y: dragStartPos.current.y + dy,
        })
      }
    },
    [viewBox, moveShape, setViewBox, isConnectMode, marquee, screenToCanvas],
  )

  const onMouseUp = useCallback(() => {
    isPanning.current = false

    if (isDragging.current && dragTarget.current) {
      const shape = shapes.find(s => s.id === dragTarget.current)
      if (shape) {
        moveShape(dragTarget.current, {
          x: snapToGrid(shape.position.x),
          y: snapToGrid(shape.position.y),
        })
      }
      isDragging.current = false
    }
    dragTarget.current = null

    if (marquee) {
      // Select shapes inside marquee
      for (const shape of shapes) {
        if (isShapeInsideMarquee(shape, marquee)) {
          selectShape(shape.id)
        }
      }
      setMarquee(null)
    }
  }, [marquee, shapes, isShapeInsideMarquee, selectShape, moveShape])

  const onWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      const newScale = Math.max(0.1, Math.min(5, viewBox.scale + delta))
      setViewBox({ ...viewBox, scale: newScale })
    },
    [viewBox, setViewBox],
  )

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  const transform = `translate(${viewBox.x}, ${viewBox.y}) scale(${viewBox.scale})`

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{
        display: 'block',
        background: isConnectMode ? '#f0f4ff' : '#f8f8f8',
        cursor: isConnectMode ? 'crosshair' : isPanning.current ? 'grabbing' : 'default',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
      onContextMenu={onContextMenu}
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
      </defs>

      <g transform={transform}>
        <rect x={-5000} y={-5000} width={10000} height={10000} fill="url(#grid)" />
        <SubgraphRenderer />
        <SequenceLifelines />
        <PieRenderer />
        <QuadrantRenderer />
        <TimelineRenderer />
        <UserJourneyRenderer />
        <GanttRenderer />
        <MindmapRenderer />
        <GitGraphRenderer />
        <SankeyRenderer />
        <XYChartRenderer />
        {diagramType !== 'sequence' && diagramType !== 'state' && diagramType !== 'architecture' && diagramType !== 'c4' && <ConnectionLines />}

        {diagramType !== 'sequence' && diagramType !== 'state' && shapes.map((shape) => (
          <g key={shape.id} data-shape-id={shape.id}>
            <ShapeRenderer
              shape={shape}
              isSelected={selectedSet.has(shape.id)}
            />
          </g>
        ))}

        <C4Renderer />
        <StateRenderer />
        <ArchitectureRenderer />
        <KanbanRenderer />
        <RadarRenderer />
        <WardleyRenderer />
        <CynefinRenderer />
        <SwimlanesRenderer />
        <ZenUmlRenderer />
        <VennRenderer />
        <TreemapRenderer />
        <IshikawaRenderer />

        {marquee && (
          <rect
            x={Math.min(marquee.startX, marquee.endX)}
            y={Math.min(marquee.startY, marquee.endY)}
            width={Math.abs(marquee.endX - marquee.startX)}
            height={Math.abs(marquee.endY - marquee.startY)}
            fill="rgba(74, 144, 217, 0.1)"
            stroke="#4a90d9"
            strokeWidth={1}
            strokeDasharray="4 2"
          />
        )}
      </g>
    </svg>
  )
}
