import { useState, useMemo } from 'react'
import { useTemplateStore } from '../store'
import { getTemplatesByCategory } from '../registry'
import { TEMPLATE_ICONS } from '../shared/icons'
import type { TemplateType } from '../types'

const ICON_SIZE = 40

export function TemplatePanel() {
  const activeTemplate = useTemplateStore(s => s.activeTemplate)
  const selectTemplate = useTemplateStore(s => s.selectTemplate)
  const clearTemplate = useTemplateStore(s => s.clearTemplate)

  const categories = getTemplatesByCategory()
  const categoryNames = [...categories.keys()]
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(categoryNames.length > 0 ? [categoryNames[0]!] : [])
  )
  const [showIcons, setShowIcons] = useState(false)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  const iconNames = useMemo(() => Object.keys(TEMPLATE_ICONS).sort(), [])

  return (
    <div style={styles.panel}>
      <style>{`
        .ad-icon-item:hover {
          background: #e8edf3;
        }
      `}</style>

      <h3 style={styles.title}>Templates</h3>

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

      <button style={styles.iconToggle} onClick={() => setShowIcons(!showIcons)}>
        {showIcons ? 'Hide Icons' : 'Browse Icons'} ({iconNames.length})
      </button>

      {showIcons && (
        <div style={styles.iconGrid}>
          {iconNames.map(name => {
            const Icon = TEMPLATE_ICONS[name]!
            return (
              <div
                key={name}
                style={styles.iconItem}
                title={name}
              >
                <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" style={{ display: 'block', border: '1px solid #eee', borderRadius: 4, background: 'white', padding: 2 }}>
                  <g stroke="#333" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <Icon size={20} color="currentColor" />
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
    background: '#ffffff',
    padding: 12,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    flex: 1,
    minHeight: 0,
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
    marginTop: 4,
  },
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))',
    gap: 4,
    marginBottom: 10,
    padding: 6,
    background: '#f9f9f9',
    borderRadius: 4,
    maxHeight: 280,
    overflowY: 'auto',
  },
  iconItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: 3,
    cursor: 'pointer',
    borderRadius: 4,
    transition: 'background 0.15s',
  },
  iconLabel: {
    fontSize: 8,
    color: '#666',
    marginTop: 2,
    textAlign: 'center' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    maxWidth: 52,
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
