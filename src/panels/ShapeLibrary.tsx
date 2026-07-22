import { useDiagramStore } from '../store/diagramStore'
import type { ShapeType } from '../core/model/Shape'

interface ShapeTemplate {
  readonly type: ShapeType
  readonly label: string
}

const SHAPES: readonly ShapeTemplate[] = [
  { type: 'rectangle', label: 'Rectangle' },
  { type: 'ellipse', label: 'Ellipse' },
  { type: 'diamond', label: 'Diamond' },
]

export function ShapeLibrary() {
  const addShape = useDiagramStore(s => s.addShape)

  const handleAddShape = (type: ShapeType) => {
    addShape(type, { x: 100, y: 100 }, { width: 120, height: 80 })
  }

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Shapes</h3>
      <div style={styles.grid}>
        {SHAPES.map((shape) => (
          <button
            key={shape.type}
            style={styles.shapeButton}
            onClick={() => handleAddShape(shape.type)}
            onDragStart={(e) => {
              e.dataTransfer.setData('shapeType', shape.type)
            }}
            draggable
          >
            <ShapeIcon type={shape.type} />
            <span style={styles.label}>{shape.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ShapeIcon({ type }: { readonly type: ShapeType }) {
  const size = 40
  const half = size / 2
  switch (type) {
    case 'rectangle':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <rect x={2} y={8} width={size - 4} height={size - 16} rx={3} fill="white" stroke="#999" strokeWidth={1.5} />
        </svg>
      )
    case 'ellipse':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <ellipse cx={half} cy={half} rx={half - 4} ry={half - 6} fill="white" stroke="#999" strokeWidth={1.5} />
        </svg>
      )
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <polygon
            points={`${half},4 ${size - 4},${half} ${half},${size - 4} 4,${half}`}
            fill="white"
            stroke="#999"
            strokeWidth={1.5}
          />
        </svg>
      )
  }
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: 200,
    background: '#ffffff',
    borderRight: '1px solid #ddd',
    padding: 12,
    overflowY: 'auto',
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    margin: '0 0 12px 0',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
  },
  shapeButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    border: '1px solid #e0e0e0',
    borderRadius: 6,
    background: '#fafafa',
    cursor: 'grab',
  },
  label: {
    fontSize: 11,
    color: '#666',
  },
}
