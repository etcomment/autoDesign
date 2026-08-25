import { useMemo } from 'react'
import { TEMPLATE_ICONS } from '../templates/shared/icons'
import { Panel } from '../ui/Panel'
import { theme } from '../lib/theme'

const ICON_SIZE = 36

export function IconPanel() {
  const iconNames = useMemo(() => Object.keys(TEMPLATE_ICONS).sort(), [])

  return (
    <Panel title="Icons" badge={iconNames.length}>
      <style>{`
        .ad-icon-grid-item:hover {
          background: ${theme.color.bgPanelHover};
          border-color: ${theme.color.accent};
        }
      `}</style>
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
              <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" style={{ display: 'block', border: `1px solid ${theme.color.border}`, borderRadius: theme.radius.sm, background: theme.color.bgPanel, padding: 2 }}>
                <g stroke="#333" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <Icon size={20} color="currentColor" />
                </g>
              </svg>
              <div style={styles.label}>{name}</div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))',
    gap: theme.spacing.xs,
    maxHeight: 280,
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    cursor: 'grab',
    borderRadius: theme.radius.sm,
    border: '1px solid transparent',
    transition: theme.transition.fast,
  },
  label: {
    fontSize: theme.font.sizeXs,
    color: theme.color.textSecondary,
    marginTop: 2,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 52,
  },
}
