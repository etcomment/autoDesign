import { useDiagramStore } from '../store/diagramStore'
import { Undo2, Redo2, Trash2, MousePointer2, Download, Link2 } from 'lucide-react'
import { downloadSvg } from '../export/generateSvg'

export function Toolbar() {
  const canUndo = useDiagramStore(s => s.canUndo)
  const canRedo = useDiagramStore(s => s.canRedo)
  const undo = useDiagramStore(s => s.undo)
  const redo = useDiagramStore(s => s.redo)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const removeShape = useDiagramStore(s => s.removeShape)
  const clearSelection = useDiagramStore(s => s.clearSelection)
  const getModel = useDiagramStore(s => s.getModel)
  const isConnectMode = useDiagramStore(s => s.isConnectMode)
  const toggleConnectMode = useDiagramStore(s => s.toggleConnectMode)

  const handleDelete = () => {
    for (const id of selectedShapeIds) {
      removeShape(id)
    }
    clearSelection()
  }

  const handleExportSvg = () => {
    downloadSvg(getModel())
  }

  return (
    <div style={styles.bar}>
      <span style={styles.brand}>autoDesign</span>
      <div style={styles.spacer} />
      <button
        style={{
          ...styles.button,
          background: isConnectMode ? '#4a90d9' : 'transparent',
          borderRadius: 4,
        }}
        onClick={toggleConnectMode}
        title={isConnectMode ? 'Quitter mode connexion' : 'Mode connexion'}
      >
        <Link2 size={18} />
      </button>
      <div style={styles.separator} />
      <div style={styles.group}>
        <button
          style={{ ...styles.button, opacity: canUndo ? 1 : 0.4 }}
          disabled={!canUndo}
          onClick={undo}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button
          style={{ ...styles.button, opacity: canRedo ? 1 : 0.4 }}
          disabled={!canRedo}
          onClick={redo}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={18} />
        </button>
      </div>
      <div style={styles.separator} />
      <button
        style={{ ...styles.button, opacity: selectedShapeIds.size > 0 ? 1 : 0.4 }}
        disabled={selectedShapeIds.size === 0}
        onClick={handleDelete}
        title="Delete selected"
      >
        <Trash2 size={18} />
      </button>
      <button
        style={{ ...styles.button, opacity: selectedShapeIds.size > 0 ? 1 : 0.4 }}
        disabled={selectedShapeIds.size === 0}
        onClick={clearSelection}
        title="Deselect all"
      >
        <MousePointer2 size={18} />
      </button>
      <div style={styles.separator} />
      <button
        style={styles.button}
        onClick={handleExportSvg}
        title="Export SVG"
      >
        <Download size={18} />
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    height: 44,
    padding: '0 12px',
    background: '#2c2c2c',
    color: '#fff',
    gap: 4,
    flexShrink: 0,
  },
  brand: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  spacer: {
    flex: 1,
  },
  group: {
    display: 'flex',
    gap: 2,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    border: 'none',
    borderRadius: 4,
    background: 'transparent',
    color: '#fff',
    cursor: 'pointer',
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#555',
    margin: '0 8px',
  },
}
