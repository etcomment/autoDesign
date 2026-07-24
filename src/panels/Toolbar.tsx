import { useState } from 'react'
import { useDiagramStore } from '../store/diagramStore'
import { Undo2, Redo2, Trash2, MousePointer2, Download, Link2 } from 'lucide-react'
import { downloadCanvasSvg } from '../export/generateSvg'
import { downloadCanvasPptx } from '../export/generatePptx'
import { generateCanvasPng, generateCanvasJpg, downloadBlob } from '../export/generateImage'

export function Toolbar() {
  const canUndo = useDiagramStore(s => s.canUndo)
  const canRedo = useDiagramStore(s => s.canRedo)
  const undo = useDiagramStore(s => s.undo)
  const redo = useDiagramStore(s => s.redo)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const removeShape = useDiagramStore(s => s.removeShape)
  const clearSelection = useDiagramStore(s => s.clearSelection)
  const isConnectMode = useDiagramStore(s => s.isConnectMode)
  const toggleConnectMode = useDiagramStore(s => s.toggleConnectMode)

  const [exportOpen, setExportOpen] = useState(false)

  const handleDelete = () => {
    for (const id of selectedShapeIds) {
      removeShape(id)
    }
    clearSelection()
  }

  const handleExportSvg = () => {
    try {
      downloadCanvasSvg()
    } catch {
      return
    }
    setExportOpen(false)
  }

  const handleExportPng = async () => {
    const blob = await generateCanvasPng()
    downloadBlob(blob, 'diagram.png')
    setExportOpen(false)
  }

  const handleExportJpg = async () => {
    const blob = await generateCanvasJpg()
    downloadBlob(blob, 'diagram.jpg')
    setExportOpen(false)
  }

  const handleExportPptx = async () => {
    await downloadCanvasPptx()
    setExportOpen(false)
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
      <div style={styles.dropdownContainer}>
        <button
          style={styles.button}
          onClick={() => setExportOpen(!exportOpen)}
          title="Export"
        >
          <Download size={18} />
        </button>
        {exportOpen && (
          <div style={styles.dropdown}>
            <button style={styles.dropdownItem} onClick={handleExportSvg}>SVG</button>
            <button style={styles.dropdownItem} onClick={handleExportPng}>PNG</button>
            <button style={styles.dropdownItem} onClick={handleExportJpg}>JPG</button>
            <button style={styles.dropdownItem} onClick={handleExportPptx}>PPTX</button>
          </div>
        )}
      </div>
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
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 36,
    right: 0,
    background: '#333',
    borderRadius: 4,
    padding: '4px 0',
    zIndex: 100,
    minWidth: 80,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    padding: '6px 16px',
    border: 'none',
    background: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: 13,
  },
}
