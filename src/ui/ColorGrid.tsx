import { Check } from 'lucide-react'
import { theme } from '../lib/theme'

export interface ColorGridProps {
  label: string
  colors: string[]
  value: string
  onSelect: (color: string) => void
}

export function ColorGrid({ label, colors, value, onSelect }: ColorGridProps) {
  return (
    <div style={styles.section}>
      <label style={styles.label}>{label}</label>
      <div style={styles.grid}>
        {colors.map(color => {
          const isSelected = value === color
          return (
            <button
              key={color}
              type="button"
              style={{
                ...styles.swatch,
                backgroundColor: color,
                boxShadow: isSelected ? `0 0 0 2px ${theme.color.bgPanel}, 0 0 0 4px ${theme.color.accent}` : `inset 0 0 0 1px ${theme.color.border}`,
              }}
              onClick={() => onSelect(color)}
              title={color}
              aria-label={`${label}: ${color}`}
              aria-pressed={isSelected}
            >
              {isSelected && <Check size={12} color={getContrastColor(color)} style={styles.check} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function getContrastColor(color: string): string {
  const hex = color.replace('#', '')
  if (hex.length !== 6) return theme.color.textOnPrimary
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#1a1a2e' : '#ffffff'
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    marginBottom: theme.spacing.sm,
  },
  label: {
    display: 'block',
    fontSize: theme.font.sizeXs,
    fontWeight: theme.font.weightMedium,
    color: theme.color.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  swatch: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.sm,
    cursor: 'pointer',
    padding: 0,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transition.fast,
  },
  check: {
    display: 'block',
  },
}
