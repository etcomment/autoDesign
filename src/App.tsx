import { useEffect } from 'react'
import { Canvas } from './editor/Canvas'
import { ShapeLibrary } from './panels/ShapeLibrary'
import { PropertiesPanel } from './panels/PropertiesPanel'
import { TemplatePanel } from './templates/panels/TemplatePanel'
import { TemplatePropertiesPanel } from './templates/panels/TemplatePropertiesPanel'
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
        <div style={styles.sidebar}>
          <ShapeLibrary />
          <MermaidEditor />
          <SubgraphStylePanel />
          <TemplatePanel />
        </div>
        <div style={styles.canvas}>
          <Canvas />
        </div>
        <div style={styles.rightPanels}>
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
    maxWidth: 220,
    flexShrink: 0,
    overflow: 'hidden',
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
  },
}
