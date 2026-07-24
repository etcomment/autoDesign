import { useTemplateStore } from '../store'

const PRESET_COLORS = [
  '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
  '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
  '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  '#333333', '#000000',
]

function elementLabel(elementId: string): string {
  const dash = elementId.indexOf('-')
  if (dash < 0) return elementId
  const prefix = elementId.slice(0, dash)
  const name = elementId.slice(dash + 1)
  const labels: Record<string, string> = {
    milestone: 'Milestone', block: 'Block', step: 'Step', piece: 'Piece',
    level: 'Level', section: 'Section', metric: 'Metric', row: 'Row',
    item: 'Item', node: 'Node', station: 'Station', branch: 'Branch',
    primary: 'Activity', support: 'Support',
  }
  return `${labels[prefix] ?? prefix}: ${name}`
}

export function TemplatePropertiesPanel() {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const updateTemplateColor = useTemplateStore(s => s.updateTemplateColor)
  const updateTemplateStrokeColor = useTemplateStore(s => s.updateTemplateStrokeColor)

  if (!activeTemplate || selectedIds.size === 0) return null

  const elements = [...selectedIds]
  const primaryId = elements[0]!
  const isMulti = elements.length > 1
  const primaryFill = templateColors[primaryId] ?? ''
  const primaryStroke = templateStrokeColors[primaryId] ?? ''

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Template Element</h3>

      <div style={styles.section}>
        <label style={styles.label}>
          {isMulti ? `${elements.length} elements` : elementLabel(primaryId)}
        </label>
      </div>

      <div style={styles.section}>
        <label style={styles.sectionLabel}>Fill</label>
        <div style={styles.colorGrid}>
          {PRESET_COLORS.map((color) => (
            <button
              key={`fill-${color}`}
              style={{
                ...styles.colorButton,
                backgroundColor: color,
                border: primaryFill === color ? '2px solid #333' : '1px solid #ccc',
              }}
              onClick={() => elements.forEach(id => updateTemplateColor(id, color))}
              title={color}
            />
          ))}
        </div>
        <div style={styles.row}>
          <input
            type="color"
            value={primaryFill || '#ffffff'}
            onChange={(e) => elements.forEach(id => updateTemplateColor(id, e.target.value))}
            style={styles.colorInput}
          />
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.sectionLabel}>Stroke</label>
        <div style={styles.colorGrid}>
          {PRESET_COLORS.map((color) => (
            <button
              key={`stroke-${color}`}
              style={{
                ...styles.colorButton,
                backgroundColor: color,
                border: primaryStroke === color ? '2px solid #333' : '1px solid #ccc',
              }}
              onClick={() => elements.forEach(id => updateTemplateStrokeColor(id, color))}
              title={color}
            />
          ))}
        </div>
        <div style={styles.row}>
          <input
            type="color"
            value={primaryStroke || '#000000'}
            onChange={(e) => elements.forEach(id => updateTemplateStrokeColor(id, e.target.value))}
            style={styles.colorInput}
          />
        </div>
      </div>
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
    color: '#333',
  },
  sectionLabel: {
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
}
