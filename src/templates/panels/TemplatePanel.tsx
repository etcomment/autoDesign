import { useTemplateStore } from '../store'
import { getTemplatesByCategory } from '../registry'
import type { TemplateType } from '../types'

export function TemplatePanel() {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const selectTemplate = useTemplateStore(s => s.selectTemplate)
  const clearTemplate = useTemplateStore(s => s.clearTemplate)

  const categories = getTemplatesByCategory()

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
    borderLeft: '1px solid #ddd',
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
    transition: 'background 0.15s',
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
