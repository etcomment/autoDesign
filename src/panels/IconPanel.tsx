import { useState, useMemo } from 'react'
import { TEMPLATE_ICONS } from '../templates/shared/icons'

const ICON_SIZE = 36

export function IconPanel() {
  const [collapsed, setCollapsed] = useState(false)
  const iconNames = useMemo(() => Object.keys(TEMPLATE_ICONS).sort(), [])

  return (
    <div style={styles.panel}>
      <style>{`
        .ad-icon-grid-item:hover {
          background: #e8edf3;
          border-color: #4a90d9;
        }
      `}</style>
      <h3
        style={{ ...styles.title, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <span>{collapsed ? '▶' : '▼'}</span>
        Icons ({iconNames.length})
      </h3>
      {!collapsed && (
        <div style={styles.grid}>
          {iconNames.map(name => {
            const Icon = TEMPLATE_ICONS[name]!
            return (
              <div
                key={name}
                className="ad-icon-grid-item"
                style={styles.item}
                title={name}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('templateIcon', name)
                  e.dataTransfer.effectAllowed = 'copy'
                }}
              >
                <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" style={{ display: 'block', border: '1px solid #eee', borderRadius: 4, background: 'white', padding: 2 }}>
                  <g stroke="#333" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <Icon size={20} color="currentColor" />
                  </g>
                </svg>
                <div style={styles.label}>{name}</div>
              </div>
            )
          })}
        </div>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))',
    gap: 4,
    maxHeight: 280,
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: 3,
    cursor: 'grab',
    borderRadius: 4,
    border: '1px solid transparent',
    transition: 'background 0.15s, border-color 0.15s',
  },
  label: {
    fontSize: 8,
    color: '#666',
    marginTop: 2,
    textAlign: 'center' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    maxWidth: 52,
  },
}
