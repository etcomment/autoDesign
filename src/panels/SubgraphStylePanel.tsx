import { useState } from 'react'
import { useDiagramStore } from '../store/diagramStore'

const COLORS = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
  '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
  '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  '#333333', '#666666', '#90a4d0', '#f0f4ff',
]

export function SubgraphStylePanel() {
  const subgraphStyle = useDiagramStore(s => s.subgraphStyle)
  const updateSubgraphStyle = useDiagramStore(s => s.updateSubgraphStyle)
  const subgraphGroups = useDiagramStore(s => s.subgraphGroups)
  const [collapsed, setCollapsed] = useState(true)

  if (subgraphGroups.length === 0) return null

  return (
    <div style={styles.container}>
      <button
        style={styles.toggle}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '▶ Subgraph Style' : '▼ Subgraph Style'}
      </button>
      {!collapsed && (
        <div style={styles.body}>
          <div style={styles.section}>
            <label style={styles.label}>Stroke</label>
            <div style={styles.colorGrid}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  style={{
                    ...styles.colorButton,
                    backgroundColor: color,
                    border: subgraphStyle.stroke === color ? '2px solid #333' : '1px solid #ccc',
                  }}
                  onClick={() => updateSubgraphStyle({ stroke: color })}
                  title={color}
                />
              ))}
            </div>
          </div>
          <div style={styles.section}>
            <label style={styles.label}>Background</label>
            <div style={styles.colorGrid}>
              {COLORS.filter(c => c !== '#ffffff').map((color) => (
                <button
                  key={color}
                  style={{
                    ...styles.colorButton,
                    backgroundColor: color,
                    border: subgraphStyle.fill === color ? '2px solid #333' : '1px solid #ccc',
                  }}
                  onClick={() => updateSubgraphStyle({ fill: color })}
                  title={color}
                />
              ))}
            </div>
          </div>
          <div style={styles.section}>
            <label style={styles.label}>Text</label>
            <div style={styles.colorGrid}>
              {['#333333', '#666666', '#ffffff'].map((color) => (
                <button
                  key={color}
                  style={{
                    ...styles.colorButton,
                    backgroundColor: color,
                    border: subgraphStyle.textColor === color ? '2px solid #333' : '1px solid #ccc',
                  }}
                  onClick={() => updateSubgraphStyle({ textColor: color })}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderBottom: '1px solid #ddd',
    background: '#fafafa',
  },
  toggle: {
    width: '100%',
    padding: '6px 12px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 600,
    color: '#555',
  },
  body: {
    padding: '0 12px 12px',
  },
  section: {
    marginBottom: 10,
  },
  label: {
    display: 'block',
    fontSize: 11,
    fontWeight: 500,
    color: '#666',
    marginBottom: 4,
  },
  colorGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3,
  },
  colorButton: {
    width: 20,
    height: 20,
    borderRadius: 3,
    cursor: 'pointer',
    padding: 0,
  },
}
