import { useState } from 'react'
import { useTemplateStore } from '../store'
import { getTemplatesByCategory } from '../registry'
import type { TemplateType } from '../types'

export function TemplatePanel() {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const selectTemplate = useTemplateStore(s => s.selectTemplate)
  const clearTemplate = useTemplateStore(s => s.clearTemplate)

  const categories = getTemplatesByCategory()
  const categoryNames = [...categories.keys()]
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(categoryNames.length > 0 ? [categoryNames[0]!] : [])
  )
  const [tplCollapsed, setTplCollapsed] = useState(false)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  return (
    <div style={styles.panel}>
      <h3 style={{ ...styles.title, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }} onClick={() => setTplCollapsed(!tplCollapsed)}>
        <span>{tplCollapsed ? '▶' : '▼'}</span>
        Templates
      </h3>

      {!tplCollapsed && (
        <>
      {categoryNames.map((category) => {
        const templates = categories.get(category)!
        const isExpanded = expandedCategories.has(category)
        return (
          <div key={category} style={styles.category}>
            <div
              style={styles.categoryHeader}
              onClick={() => toggleCategory(category)}
            >
              <span style={styles.arrow}>{isExpanded ? '▼' : '▶'}</span>
              {category}
            </div>
            {isExpanded && templates.map((tpl) => {
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
        )
      })}

      {activeTemplate && (
        <button style={styles.clearButton} onClick={clearTemplate}>
          Clear
        </button>
      )}
        </>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    background: '#ffffff',
    padding: 12,
    flexShrink: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 8px 0',
    color: '#333',
    flexShrink: 0,
  },
  category: {
    marginBottom: 8,
  },
  categoryHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: '#a0aec0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: 4,
    paddingLeft: 2,
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  arrow: {
    fontSize: 10,
    display: 'inline-block',
    width: 12,
    textAlign: 'center' as const,
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
