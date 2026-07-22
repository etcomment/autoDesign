import { useDiagramStore } from '../store/diagramStore'

const PRESET_COLORS = [
  '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
  '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
  '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  '#333333', '#000000',
]

export function PropertiesPanel() {
  const shapes = useDiagramStore(s => s.shapes)
  const selectedShapeIds = useDiagramStore(s => s.selectedShapeIds)
  const batchUpdateShapeStyle = useDiagramStore(s => s.batchUpdateShapeStyle)
  const updateShapeText = useDiagramStore(s => s.updateShapeText)

  const selectedIds = [...selectedShapeIds]
  const primaryShape = shapes.find(s => s.id === selectedIds[0])

  if (selectedShapeIds.size === 0 || !primaryShape) return null

  const plural = selectedIds.length > 1

  const handleStyleChange = (field: 'fill' | 'stroke' | 'strokeWidth', value: string | number) => {
    batchUpdateShapeStyle(selectedIds, { [field]: value })
  }

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>
        {plural ? `${selectedIds.length} shapes` : 'Properties'}
      </h3>

      <div style={styles.section}>
        <label style={styles.label}>Fill</label>
        <div style={styles.colorGrid}>
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              style={{
                ...styles.colorButton,
                backgroundColor: color,
                border: primaryShape.style.fill === color ? '2px solid #333' : '1px solid #ccc',
              }}
              onClick={() => handleStyleChange('fill', color)}
              title={color}
            />
          ))}
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Custom</label>
          <input
            type="color"
            value={primaryShape.style.fill}
            onChange={(e) => handleStyleChange('fill', e.target.value)}
            style={styles.colorInput}
          />
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Stroke</label>
        <div style={styles.colorGrid}>
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              style={{
                ...styles.colorButton,
                backgroundColor: color,
                border: primaryShape.style.stroke === color ? '2px solid #333' : '1px solid #ccc',
              }}
              onClick={() => handleStyleChange('stroke', color)}
              title={color}
            />
          ))}
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Custom</label>
          <input
            type="color"
            value={primaryShape.style.stroke}
            onChange={(e) => handleStyleChange('stroke', e.target.value)}
            style={styles.colorInput}
          />
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Stroke Width</label>
        <div style={styles.row}>
          <input
            type="range"
            min={1}
            max={10}
            value={primaryShape.style.strokeWidth}
            onChange={(e) => handleStyleChange('strokeWidth', Number(e.target.value))}
            style={styles.range}
          />
          <span style={styles.value}>{primaryShape.style.strokeWidth}px</span>
        </div>
      </div>

      {!plural && (
        <div style={styles.section}>
          <label style={styles.label}>Text</label>
          <input
            type="text"
            value={primaryShape.text.content}
            onChange={(e) => {
              updateShapeText(primaryShape.id, { content: e.target.value })
            }}
            placeholder="Enter text..."
            style={styles.textInput}
          />
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: 220,
    background: '#ffffff',
    borderLeft: '1px solid #ddd',
    padding: 12,
    overflowY: 'auto',
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 12px 0',
    color: '#333',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    display: 'block',
    fontSize: 11,
    fontWeight: 500,
    color: '#666',
    marginBottom: 6,
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: 3,
    marginBottom: 8,
  },
  colorButton: {
    width: 22,
    height: 22,
    borderRadius: 3,
    cursor: 'pointer',
    padding: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  colorInput: {
    width: 32,
    height: 24,
    padding: 0,
    border: 'none',
    cursor: 'pointer',
  },
  range: {
    flex: 1,
    cursor: 'pointer',
  },
  value: {
    fontSize: 12,
    color: '#666',
    minWidth: 30,
  },
  textInput: {
    width: '100%',
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 12,
    boxSizing: 'border-box',
  },
}
