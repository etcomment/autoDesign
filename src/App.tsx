import { useEffect, useState, useCallback, useRef } from 'react'
import { Canvas } from './editor/Canvas'
import { ShapeLibrary } from './panels/ShapeLibrary'
import { PropertiesPanel } from './panels/PropertiesPanel'
import { TemplatePanel } from './templates/panels/TemplatePanel'
import { TemplatePropertiesPanel } from './templates/panels/TemplatePropertiesPanel'
import { TemplateDslEditor } from './templates/panels/TemplateDslEditor'
import { Toolbar } from './panels/Toolbar'
import { MermaidEditor } from './panels/MermaidEditor'
import { SubgraphStylePanel } from './panels/SubgraphStylePanel'
import { useDiagramStore } from './store/diagramStore'

export function App() {
  const undo = useDiagramStore(s => s.undo)
  const redo = useDiagramStore(s => s.redo)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const removeShape = useDiagramStore(s => s.removeShape)
  const clearSelection = useDiagramStore(s => s.clearSelection)

  const [sidebarWidth, setSidebarWidth] = useState(220)
  const [rightPanelWidth, setRightPanelWidth] = useState(220)
  const [hoveredHandle, setHoveredHandle] = useState<string | null>(null)

  const isResizing = useRef<'sidebar' | 'rightPanel' | null>(null)

  const [resizing, setResizing] = useState<'sidebar' | 'rightPanel' | null>(null)

  const handleMouseDown = useCallback((target: 'sidebar' | 'rightPanel') => {
    isResizing.current = target
    setResizing(target)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return

    if (isResizing.current === 'sidebar') {
      const newWidth = e.clientX
      setSidebarWidth(Math.max(150, Math.min(500, newWidth)))
    } else {
      const newWidth = window.innerWidth - e.clientX
      setRightPanelWidth(Math.max(150, Math.min(500, newWidth)))
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    isResizing.current = null
    setResizing(null)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMod = e.ctrlKey || e.metaKey

      if (isMod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
        return
      }

      if (isMod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
        return
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        for (const id of selectedShapeIds) {
          removeShape(id)
        }
        clearSelection()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, selectedShapeIds, removeShape, clearSelection])

  return (
    <div style={styles.container}>
      <Toolbar />
      <div style={styles.workspace}>
        <div style={{ ...styles.sidebar, width: sidebarWidth, maxWidth: 'none' }}>
          <ShapeLibrary />
          <MermaidEditor />
          <SubgraphStylePanel />
          <TemplatePanel />
          <TemplateDslEditor />
          <div
            style={{
              ...styles.resizeHandle,
              borderRightColor: hoveredHandle === 'sidebar' || resizing === 'sidebar' ? '#bbb' : 'transparent',
            }}
            onMouseDown={() => handleMouseDown('sidebar')}
            onMouseEnter={() => setHoveredHandle('sidebar')}
            onMouseLeave={() => setHoveredHandle(null)}
          />
        </div>
        <div style={styles.canvas}>
          <Canvas />
        </div>
        <div style={{ ...styles.rightPanels, width: rightPanelWidth, maxWidth: 'none' }}>
          <div
            style={{
              ...styles.resizeHandle,
              left: 0,
              right: 'auto',
              borderRight: 'none',
              borderLeft: '3px solid transparent',
              borderLeftColor: hoveredHandle === 'rightPanel' || resizing === 'rightPanel' ? '#bbb' : 'transparent',
            }}
            onMouseDown={() => handleMouseDown('rightPanel')}
            onMouseEnter={() => setHoveredHandle('rightPanel')}
            onMouseLeave={() => setHoveredHandle(null)}
          />
          <PropertiesPanel />
          <TemplatePropertiesPanel />
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #ddd',
    flexShrink: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  workspace: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  rightPanels: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 220,
    maxWidth: 220,
    overflow: 'auto',
    borderLeft: '1px solid #ddd',
    position: 'relative',
  },
  resizeHandle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 3,
    cursor: 'col-resize',
    zIndex: 10,
    borderRight: '3px solid transparent',
    transition: 'border-color 0.15s',
    background: 'transparent',
  },
}
