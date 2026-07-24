import { useState } from 'react'
import { useTemplateStore } from '../store'
import { getTemplatesByCategory } from '../registry'
import { TEMPLATE_ICONS } from '../shared/icons'
import type { TemplateType } from '../types'

const PRESET_COLORS = [
  '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
  '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
  '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  '#333333', '#000000',
]

const ICON_NAMES = Object.keys(TEMPLATE_ICONS).sort()
const ICONS_PER_ROW = 5
const ICON_SIZE = 28

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

export function TemplatePanel() {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const selectTemplate = useTemplateStore(s => s.selectTemplate)
  const clearTemplate = useTemplateStore(s => s.clearTemplate)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const templateColors = useTemplateStore(s => s.templateElementColors)
  const templateStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const updateTemplateColor = useTemplateStore(s => s.updateTemplateColor)
  const updateTemplateStrokeColor = useTemplateStore(s => s.updateTemplateStrokeColor)

  const [showIcons, setShowIcons] = useState(false)

  const categories = getTemplatesByCategory()
  const elements = [...selectedIds]
  const primaryId = elements[0] ?? ''
  const hasSelection = elements.length > 0

  const handleCopyIcon = (iconName: string) => {
    navigator.clipboard?.writeText(`Icon:${iconName}`).catch(() => {})
  }

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Templates</h3>

      {[...categories.entries()].map(([category, templates]) => (
        <div key={category} style={styles.category}>
          <div style={styles.categoryHeader}>{category}</div>
          {templates.map((tpl) => {
            const isActive = activeTemplate === tpl.type
            return (
              <button
                key={tpl.type}
                style={{
                  ...styles.templateButton,
                  background: isActive ? '#4a90d9' : '#f7fafc',
                  color: isActive ? '#ffffff' : '#4a5568',
                  border: isActive ? '1px solid #4a90d9' : '1px solid #e2e8f0',
                }}
                onClick={() => selectTemplate(tpl.type as TemplateType)}
              >
                {tpl.label}
              </button>
            )
          })}
        </div>
      ))}

      {activeTemplate && (
        <div style={styles.colorSection}>
          <h4 style={styles.subTitle}>{hasSelection ? (elements.length > 1 ? `${elements.length} selected` : elementLabel(primaryId)) : 'Click an element to select'}</h4>

          <label style={styles.label}>Fill</label>
          <div style={styles.colorGrid}>
            {PRESET_COLORS.map((color) => (
              <button
                key={`fill-${color}`}
                style={{
                  ...styles.colorButton,
                  backgroundColor: color,
                  border: templateColors[primaryId] === color ? '2px solid #333' : '1px solid #ccc',
                }}
                onClick={() => elements.forEach(id => updateTemplateColor(id, color))}
                title={color}
              />
            ))}
          </div>
          <div style={styles.row}>
            <input
              type="color"
              value={templateColors[primaryId] || '#ffffff'}
              onChange={(e) => elements.forEach(id => updateTemplateColor(id, e.target.value))}
              style={styles.colorInput}
            />
          </div>

          <label style={{ ...styles.label, marginTop: 8 }}>Stroke</label>
          <div style={styles.colorGrid}>
            {PRESET_COLORS.map((color) => (
              <button
                key={`stroke-${color}`}
                style={{
                  ...styles.colorButton,
                  backgroundColor: color,
                  border: templateStrokeColors[primaryId] === color ? '2px solid #333' : '1px solid #ccc',
                }}
                onClick={() => elements.forEach(id => updateTemplateStrokeColor(id, color))}
                title={color}
              />
            ))}
          </div>
          <div style={styles.row}>
            <input
              type="color"
              value={templateStrokeColors[primaryId] || '#000000'}
              onChange={(e) => elements.forEach(id => updateTemplateStrokeColor(id, e.target.value))}
              style={styles.colorInput}
            />
          </div>
        </div>
      )}

      <button style={styles.iconToggle} onClick={() => setShowIcons(!showIcons)}>
        {showIcons ? 'Hide Icons' : 'Browse Icons'} ({ICON_NAMES.length})
      </button>

      {showIcons && (
        <div style={styles.iconGrid}>
          {ICON_NAMES.map(name => {
            const Icon = TEMPLATE_ICONS[name]!
            return (
              <div
                key={name}
                style={styles.iconItem}
                onClick={() => handleCopyIcon(name)}
                title={name}
              >
                <svg width={ICON_SIZE} height={ICON_SIZE} viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}>
                  <g transform={`translate(${ICON_SIZE / 2},${ICON_SIZE / 2})`}>
                    <Icon size={ICON_SIZE} color="#555" />
                  </g>
                </svg>
                <div style={styles.iconLabel}>{name}</div>
              </div>
            )
          })}
        </div>
      )}

      {activeTemplate && (
        <button style={styles.clearButton} onClick={clearTemplate}>
          Clear
        </button>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: 220,
    background: '#ffffff',
    padding: 12,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 12px 0',
    color: '#333',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 600,
    margin: '0 0 6px 0',
    color: '#555',
  },
  category: {
    marginBottom: 12,
  },
  categoryHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: '#a0aec0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: 4,
    paddingLeft: 2,
  },
  templateButton: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: '6px 10px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid #e2e8f0',
    marginBottom: 3,
  },
  colorSection: {
    borderTop: '1px solid #eee',
    paddingTop: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  label: {
    display: 'block',
    fontSize: 10,
    fontWeight: 500,
    color: '#666',
    marginBottom: 4,
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: 2,
    marginBottom: 6,
  },
  colorButton: {
    width: 21,
    height: 21,
    borderRadius: 3,
    cursor: 'pointer',
    padding: 0,
    border: '1px solid #ccc',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  colorInput: {
    width: 28,
    height: 22,
    padding: 0,
    border: 'none',
    cursor: 'pointer',
  },
  iconToggle: {
    width: '100%',
    padding: '6px 0',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid #e2e8f0',
    background: '#f7fafc',
    color: '#4a5568',
    marginBottom: 8,
  },
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${ICONS_PER_ROW}, 1fr)`,
    gap: 4,
    marginBottom: 10,
    padding: 6,
    background: '#f9f9f9',
    borderRadius: 4,
    maxHeight: 300,
    overflowY: 'auto',
  },
  iconItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: 3,
    cursor: 'pointer',
    borderRadius: 3,
    transition: 'background 0.1s',
  },
  iconLabel: {
    fontSize: 7,
    color: '#999',
    marginTop: 2,
    textAlign: 'center' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    maxWidth: '100%',
  },
  clearButton: {
    width: '100%',
    padding: '8px 0',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid #e2e8f0',
    background: '#fff5f5',
    color: '#c53030',
    marginTop: 8,
  },
}
