import type { ReactElement } from 'react'

interface IconProps {
  size?: number
  color?: string
}

export function CommentsIcon({ size = 52, color = '#ffffff' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.22} y={size * 0.12} width={size * 0.7} height={size * 0.48} rx={3} />
      <line x1={size * 0.34} y1={size * 0.24} x2={size * 0.78} y2={size * 0.24} />
      <line x1={size * 0.34} y1={size * 0.36} x2={size * 0.78} y2={size * 0.36} />
      <line x1={size * 0.34} y1={size * 0.48} x2={size * 0.6} y2={size * 0.48} />
      <path d={`M ${size * 0.22} ${size * 0.44} L ${size * 0.08} ${size * 0.44} L ${size * 0.08} ${size * 0.84} L ${size * 0.24} ${size * 0.84} L ${size * 0.32} ${size * 0.94} L ${size * 0.32} ${size * 0.84} L ${size * 0.52} ${size * 0.84} L ${size * 0.52} ${size * 0.6}`} />
      <circle cx={size * 0.18} cy={size * 0.64} r={1.2} fill={color} />
      <circle cx={size * 0.28} cy={size * 0.64} r={1.2} fill={color} />
      <circle cx={size * 0.38} cy={size * 0.64} r={1.2} fill={color} />
    </g>
  )
}

export function UsersFemaleIcon({ size = 52, color = '#ffffff' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.32} ${size * 0.3} C ${size * 0.32} ${size * 0.14} ${size * 0.68} ${size * 0.14} ${size * 0.68} ${size * 0.3} C ${size * 0.78} ${size * 0.45} ${size * 0.78} ${size * 0.6} ${size * 0.68} ${size * 0.68} L ${size * 0.64} ${size * 0.65} C ${size * 0.58} ${size * 0.6} ${size * 0.42} ${size * 0.6} ${size * 0.36} ${size * 0.65} L ${size * 0.32} ${size * 0.68} C ${size * 0.22} ${size * 0.6} ${size * 0.22} ${size * 0.45} ${size * 0.32} ${size * 0.3} Z`} />
      <path d={`M ${size * 0.35} ${size * 0.32} C ${size * 0.4} ${size * 0.45} ${size * 0.6} ${size * 0.45} ${size * 0.65} ${size * 0.32}`} />
      <path d={`M ${size * 0.32} ${size * 0.68} C ${size * 0.2} ${size * 0.72} ${size * 0.12} ${size * 0.84} ${size * 0.12} ${size * 0.95}`} />
      <path d={`M ${size * 0.68} ${size * 0.68} C ${size * 0.8} ${size * 0.72} ${size * 0.88} ${size * 0.84} ${size * 0.88} ${size * 0.95}`} />
      <line x1={size * 0.42} y1={size * 0.85} x2={size * 0.42} y2={size * 0.95} />
      <line x1={size * 0.58} y1={size * 0.85} x2={size * 0.58} y2={size * 0.95} />
      <path d={`M ${size * 0.42} ${size * 0.64} L ${size * 0.5} ${size * 0.74} L ${size * 0.58} ${size * 0.64}`} />
    </g>
  )
}

export function FilesIcon({ size = 52, color = '#ffffff' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.25} ${size * 0.1} L ${size * 0.7} ${size * 0.1} L ${size * 0.85} ${size * 0.25} L ${size * 0.85} ${size * 0.82} L ${size * 0.65} ${size * 0.82}`} />
      <rect x={size * 0.15} y={size * 0.22} width={size * 0.55} height={size * 0.72} rx={2} />
      <path d={`M ${size * 0.52} ${size * 0.22} L ${size * 0.7} ${size * 0.4} L ${size * 0.52} ${size * 0.4} Z`} />
      <line x1={size * 0.25} y1={size * 0.48} x2={size * 0.6} y2={size * 0.48} />
      <line x1={size * 0.25} y1={size * 0.58} x2={size * 0.6} y2={size * 0.58} />
      <line x1={size * 0.25} y1={size * 0.68} x2={size * 0.45} y2={size * 0.68} />
      <line x1={size * 0.25} y1={size * 0.78} x2={size * 0.55} y2={size * 0.78} />
    </g>
  )
}

export function MoneyBagChessIcon({ size = 56, color = '#ffffff' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.3} ${size * 0.15} L ${size * 0.22} ${size * 0.28} C ${size * 0.1} ${size * 0.4} ${size * 0.08} ${size * 0.75} ${size * 0.25} ${size * 0.88} C ${size * 0.35} ${size * 0.92} ${size * 0.5} ${size * 0.9} ${size * 0.55} ${size * 0.82} C ${size * 0.55} ${size * 0.7} ${size * 0.52} ${size * 0.4} ${size * 0.44} ${size * 0.28} L ${size * 0.38} ${size * 0.15} Z`} />
      <line x1={size * 0.22} y1={size * 0.28} x2={size * 0.44} y2={size * 0.28} />
      <text x={size * 0.32} y={size * 0.62} fill={color} stroke="none" fontSize={size * 0.26} fontWeight={700} textAnchor="middle" fontFamily="Arial, sans-serif">$</text>
      <path d={`M ${size * 0.58} ${size * 0.88} L ${size * 0.9} ${size * 0.88}`} />
      <rect x={size * 0.62} y={size * 0.82} width={size * 0.24} height={size * 0.06} rx={1} />
      <path d={`M ${size * 0.66} ${size * 0.82} L ${size * 0.68} ${size * 0.45} L ${size * 0.8} ${size * 0.45} L ${size * 0.82} ${size * 0.82} Z`} />
      <line x1={size * 0.66} y1={size * 0.55} x2={size * 0.82} y2={size * 0.55} />
      <line x1={size * 0.66} y1={size * 0.68} x2={size * 0.82} y2={size * 0.68} />
      <path d={`M ${size * 0.66} ${size * 0.45} L ${size * 0.64} ${size * 0.35} L ${size * 0.74} ${size * 0.38} L ${size * 0.84} ${size * 0.35} L ${size * 0.82} ${size * 0.45} Z`} />
      <line x1={size * 0.74} y1={size * 0.28} x2={size * 0.74} y2={size * 0.35} />
      <line x1={size * 0.7} y1={size * 0.31} x2={size * 0.78} y2={size * 0.31} />
    </g>
  )
}

interface MapPinProps {
  x: number
  y: number
  color?: string
  label?: string
}

export function LocationMapPin({ x, y, color = '#2865c8', label = 'Type your text here' }: MapPinProps): ReactElement {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M 0 -18 C -6 -18 -10 -14 -10 -8 C -10 -2 0 4 0 4 C 0 4 10 -2 10 -8 C 10 -14 6 -18 0 -18 Z"
        fill={color}
      />
      <circle cx={0} cy={-9} r={3.5} fill="#ffffff" />
      <text
        x={0}
        y={14}
        textAnchor="middle"
        fill="#4b5563"
        fontSize={8.5}
        fontWeight={500}
        fontFamily="Arial, sans-serif"
      >
        {label}
      </text>
    </g>
  )
}
