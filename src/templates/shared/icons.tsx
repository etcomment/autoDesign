import type { ReactElement } from 'react'

interface IconProps { size?: number; color?: string; fill?: string }

export function UserIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={2} fill="none" strokeLinecap="round">
      <circle cx={size / 2} cy={size * 0.3} r={size * 0.2} />
      <path d={`M ${size * 0.2} ${size * 0.85} Q ${size / 2} ${size * 0.6} ${size * 0.8} ${size * 0.85} L ${size * 0.8} ${size * 0.9} L ${size * 0.2} ${size * 0.9} Z`} fill={color} />
    </g>
  )
}

export function ChartIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={2} fill="none">
      <rect x={2} y={size * 0.4} width={size * 0.18} height={size * 0.5} rx={2} fill={color} opacity={0.4} />
      <rect x={size * 0.27} y={size * 0.15} width={size * 0.18} height={size * 0.75} rx={2} fill={color} opacity={0.6} />
      <rect x={size * 0.54} y={size * 0.05} width={size * 0.18} height={size * 0.85} rx={2} fill={color} opacity={0.85} />
      <rect x={size * 0.81} y={size * 0.25} width={size * 0.18} height={size * 0.65} rx={2} fill={color} opacity={0.5} />
    </g>
  )
}

export function GearIcon({ size = 24, fill = 'none', color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill={fill} transform={`translate(${size / 2},${size / 2})`}>
      <circle cx={0} cy={0} r={size * 0.22} fill={fill} />
      <path d={`M 0 ${-size * 0.35} L ${size * 0.06} ${-size * 0.3} L ${size * 0.1} ${-size * 0.36}`} />
      <path d={`M ${size * 0.3} ${-size * 0.18} L ${size * 0.33} ${-size * 0.12} L ${size * 0.4} ${-size * 0.1}`} />
      <path d={`M ${size * 0.35} ${size * 0.05} L ${size * 0.3} ${size * 0.08} L ${size * 0.28} ${size * 0.15}`} />
      <path d={`M ${size * 0.15} ${size * 0.32} L ${size * 0.1} ${size * 0.35} L ${size * 0.05} ${size * 0.4}`} />
      <path d={`M ${-size * 0.05} ${size * 0.35} L ${-size * 0.08} ${size * 0.3} L ${-size * 0.15} ${size * 0.28}`} />
      <path d={`M ${-size * 0.32} ${size * 0.15} L ${-size * 0.35} ${size * 0.1} L ${-size * 0.4} ${size * 0.05}`} />
      <path d={`M ${-size * 0.35} ${-size * 0.05} L ${-size * 0.3} ${-size * 0.08} L ${-size * 0.28} ${-size * 0.15}`} />
      <path d={`M ${-size * 0.15} ${-size * 0.32} L ${-size * 0.1} ${-size * 0.35} L ${-size * 0.05} ${-size * 0.4}`} />
    </g>
  )
}

export function TargetIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={2} fill="none">
      <circle cx={size / 2} cy={size / 2} r={size * 0.42} />
      <circle cx={size / 2} cy={size / 2} r={size * 0.22} />
      <circle cx={size / 2} cy={size / 2} r={size * 0.06} fill={color} />
      <line x1={size / 2} y1={0} x2={size / 2} y2={size * 0.08} />
      <line x1={size / 2} y1={size * 0.92} x2={size / 2} y2={size} />
      <line x1={0} y1={size / 2} x2={size * 0.08} y2={size / 2} />
      <line x1={size * 0.92} y1={size / 2} x2={size} y2={size / 2} />
    </g>
  )
}

export function LightbulbIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <path d={`M ${size * 0.35} ${size * 0.85} L ${size * 0.65} ${size * 0.85}`} />
      <path d={`M ${size * 0.4} ${size * 0.75} L ${size * 0.6} ${size * 0.75}`} />
      <path d={`M ${size / 2} ${size * 0.05} Q ${size * 0.25} ${size * 0.05} ${size * 0.25} ${size * 0.3} Q ${size * 0.25} ${size * 0.6} ${size * 0.35} ${size * 0.7} L ${size * 0.65} ${size * 0.7} Q ${size * 0.75} ${size * 0.6} ${size * 0.75} ${size * 0.3} Q ${size * 0.75} ${size * 0.05} ${size / 2} ${size * 0.05} Z`} fill={color} opacity={0.15} />
    </g>
  )
}

export function FlagIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <line x1={size * 0.2} y1={size * 0.1} x2={size * 0.2} y2={size * 0.95} />
      <path d={`M ${size * 0.2} ${size * 0.1} L ${size * 0.85} ${size * 0.25} L ${size * 0.2} ${size * 0.4} Z`} fill={color} opacity={0.2} />
    </g>
  )
}

export function StarIcon({ size = 24, fill = '#ffd700', color = '#d4a017' }: IconProps): ReactElement {
  const cx = size / 2
  const cy = size / 2
  const or = size * 0.45
  const ir = size * 0.2
  const pts: string[] = []
  for (let i = 0; i < 5; i++) {
    const oa = (i * 72 - 90) * Math.PI / 180
    const ia = ((i * 72 + 36) - 90) * Math.PI / 180
    pts.push(`${cx + or * Math.cos(oa)},${cy + or * Math.sin(oa)}`)
    pts.push(`${cx + ir * Math.cos(ia)},${cy + ir * Math.sin(ia)}`)
  }
  return <polygon points={pts.join(' ')} fill={fill} stroke={color} strokeWidth={0.5} />
}

export function CheckIcon({ size = 24, color = '#4caf50' }: IconProps): ReactElement {
  return (
    <circle cx={size / 2} cy={size / 2} r={size * 0.4} fill={color} />
  )
}

export function ArrowUpIcon({ size = 24, color = '#4caf50' }: IconProps): ReactElement {
  return (
    <path d={`M ${size / 2} ${size * 0.1} L ${size * 0.35} ${size * 0.5} L ${size * 0.45} ${size * 0.5} L ${size * 0.45} ${size * 0.9} L ${size * 0.55} ${size * 0.9} L ${size * 0.55} ${size * 0.5} L ${size * 0.65} ${size * 0.5} Z`} fill={color} />
  )
}

export function ArrowDownIcon({ size = 24, color = '#f44336' }: IconProps): ReactElement {
  return (
    <path d={`M ${size / 2} ${size * 0.9} L ${size * 0.35} ${size * 0.5} L ${size * 0.45} ${size * 0.5} L ${size * 0.45} ${size * 0.1} L ${size * 0.55} ${size * 0.1} L ${size * 0.55} ${size * 0.5} L ${size * 0.65} ${size * 0.5} Z`} fill={color} />
  )
}

// ============================================================
// Communication
// ============================================================

export function MailIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.1} y={size * 0.2} width={size * 0.8} height={size * 0.55} rx={size * 0.05} />
      <path d={`M ${size * 0.1} ${size * 0.2} L ${size / 2} ${size * 0.5} L ${size * 0.9} ${size * 0.2}`} />
    </g>
  )
}

export function PhoneIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.55} ${size * 0.1} Q ${size * 0.55} ${size * 0.2} ${size * 0.65} ${size * 0.2} Q ${size * 0.75} ${size * 0.2} ${size * 0.75} ${size * 0.35} Q ${size * 0.75} ${size * 0.7} ${size * 0.55} ${size * 0.9} L ${size * 0.45} ${size * 0.9} Q ${size * 0.25} ${size * 0.7} ${size * 0.25} ${size * 0.35} Q ${size * 0.25} ${size * 0.2} ${size * 0.35} ${size * 0.2} Q ${size * 0.45} ${size * 0.2} ${size * 0.45} ${size * 0.1} Z`} />
    </g>
  )
}

export function ChatIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.1} ${size * 0.12} L ${size * 0.9} ${size * 0.12} Q ${size * 0.9} ${size * 0.12} ${size * 0.9} ${size * 0.25} L ${size * 0.9} ${size * 0.6} Q ${size * 0.9} ${size * 0.72} ${size * 0.78} ${size * 0.72} L ${size * 0.6} ${size * 0.72} L ${size / 2} ${size * 0.9} L ${size / 2} ${size * 0.72} L ${size * 0.22} ${size * 0.72} Q ${size * 0.1} ${size * 0.72} ${size * 0.1} ${size * 0.6} L ${size * 0.1} ${size * 0.25} Q ${size * 0.1} ${size * 0.12} ${size * 0.22} ${size * 0.12} Z`} />
    </g>
  )
}

export function GlobeIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <circle cx={size / 2} cy={size / 2} r={size * 0.38} />
      <ellipse cx={size / 2} cy={size / 2} rx={size * 0.15} ry={size * 0.38} />
      <line x1={size * 0.12} y1={size / 2} x2={size * 0.88} y2={size / 2} />
      <line x1={size / 2} y1={size * 0.12} x2={size / 2} y2={size * 0.88} />
    </g>
  )
}

export function WifiIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <circle cx={size / 2} cy={size * 0.78} r={size * 0.07} fill={color} />
      <path d={`M ${size * 0.3} ${size * 0.62} Q ${size / 2} ${size * 0.48} ${size * 0.7} ${size * 0.62}`} />
      <path d={`M ${size * 0.18} ${size * 0.42} Q ${size / 2} ${size * 0.2} ${size * 0.82} ${size * 0.42}`} />
      <path d={`M ${size * 0.08} ${size * 0.22} Q ${size / 2} ${-size * 0.08} ${size * 0.92} ${size * 0.22}`} />
    </g>
  )
}

export function BluetoothIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polygon points={`${size / 2},${size * 0.08} ${size * 0.65},${size * 0.42} ${size / 2},${size * 0.55}`} fill={color} opacity={0.15} />
      <polygon points={`${size / 2},${size * 0.55} ${size * 0.35},${size * 0.42} ${size / 2},${size * 0.08}`} />
      <polygon points={`${size / 2},${size * 0.45} ${size * 0.35},${size * 0.58} ${size / 2},${size * 0.92}`} />
      <polygon points={`${size / 2},${size * 0.45} ${size * 0.65},${size * 0.58} ${size / 2},${size * 0.92}`} fill={color} opacity={0.15} />
      <line x1={size / 2} y1={size * 0.42} x2={size / 2} y2={size * 0.58} />
    </g>
  )
}

// ============================================================
// Business & Finance
// ============================================================

export function DollarIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <circle cx={size / 2} cy={size / 2} r={size * 0.42} />
      <line x1={size / 2} y1={size * 0.18} x2={size / 2} y2={size * 0.82} />
      <path d={`M ${size * 0.38} ${size * 0.32} Q ${size / 2} ${size * 0.24} ${size * 0.62} ${size * 0.32} Q ${size * 0.68} ${size * 0.38} ${size * 0.62} ${size * 0.44} L ${size * 0.38} ${size * 0.56} Q ${size * 0.32} ${size * 0.62} ${size * 0.38} ${size * 0.68} Q ${size / 2} ${size * 0.76} ${size * 0.62} ${size * 0.68}`} />
    </g>
  )
}

export function EuroIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <circle cx={size / 2} cy={size / 2} r={size * 0.42} />
      <path d={`M ${size * 0.6} ${size * 0.28} L ${size * 0.32} ${size * 0.32} Q ${size * 0.25} ${size * 0.45} ${size * 0.32} ${size * 0.58} L ${size * 0.6} ${size * 0.55}`} />
      <line x1={size * 0.56} y1={size * 0.38} x2={size * 0.34} y2={size * 0.38} />
      <line x1={size * 0.56} y1={size * 0.62} x2={size * 0.34} y2={size * 0.62} />
    </g>
  )
}

export function CreditCardIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.08} y={size * 0.18} width={size * 0.84} height={size * 0.58} rx={size * 0.06} />
      <line x1={size * 0.08} y1={size * 0.38} x2={size * 0.92} y2={size * 0.38} />
      <line x1={size * 0.2} y1={size * 0.6} x2={size * 0.5} y2={size * 0.6} />
      <line x1={size * 0.2} y1={size * 0.7} x2={size * 0.4} y2={size * 0.7} />
    </g>
  )
}

export function WalletIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.1} ${size * 0.25} L ${size * 0.7} ${size * 0.25} L ${size * 0.7} ${size * 0.8} L ${size * 0.1} ${size * 0.8} Q ${size * 0.1} ${size * 0.8} ${size * 0.1} ${size * 0.68} L ${size * 0.1} ${size * 0.35} Q ${size * 0.1} ${size * 0.25} ${size * 0.25} ${size * 0.25} Z`} />
      <path d={`M ${size * 0.7} ${size * 0.38} L ${size * 0.9} ${size * 0.38} Q ${size * 0.9} ${size * 0.38} ${size * 0.9} ${size * 0.5} L ${size * 0.9} ${size * 0.6} Q ${size * 0.9} ${size * 0.72} ${size * 0.78} ${size * 0.72} L ${size * 0.7} ${size * 0.72}`} />
      <circle cx={size * 0.8} cy={size * 0.55} r={size * 0.05} fill={color} />
    </g>
  )
}

export function PieChartIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={size / 2} cy={size / 2} r={size * 0.4} />
      <line x1={size / 2} y1={size / 2} x2={size / 2} y2={size * 0.1} />
      <path d={`M ${size / 2} ${size / 2} L ${size * 0.18} ${size * 0.55} A ${size * 0.4} ${size * 0.4} 0 0 1 ${size * 0.85} ${size * 0.42} Z`} fill={color} opacity={0.15} />
    </g>
  )
}

export function BarChartIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <rect x={size * 0.1} y={size * 0.4} width={size * 0.2} height={size * 0.5} rx={2} fill={color} opacity={0.2} />
      <rect x={size * 0.4} y={size * 0.15} width={size * 0.2} height={size * 0.75} rx={2} fill={color} opacity={0.2} />
      <rect x={size * 0.7} y={size * 0.3} width={size * 0.2} height={size * 0.6} rx={2} fill={color} opacity={0.2} />
    </g>
  )
}

export function LineChartIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={`${size * 0.08},${size * 0.7} ${size * 0.3},${size * 0.5} ${size * 0.5},${size * 0.55} ${size * 0.7},${size * 0.25} ${size * 0.92},${size * 0.15}`} />
      <circle cx={size * 0.08} cy={size * 0.7} r={size * 0.03} fill={color} />
      <circle cx={size * 0.3} cy={size * 0.5} r={size * 0.03} fill={color} />
      <circle cx={size * 0.5} cy={size * 0.55} r={size * 0.03} fill={color} />
      <circle cx={size * 0.7} cy={size * 0.25} r={size * 0.03} fill={color} />
      <circle cx={size * 0.92} cy={size * 0.15} r={size * 0.03} fill={color} />
    </g>
  )
}

// ============================================================
// Technology
// ============================================================

export function LaptopIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.12} y={size * 0.1} width={size * 0.76} height={size * 0.52} rx={size * 0.04} />
      <path d={`M ${size * 0.04} ${size * 0.62} L ${size * 0.96} ${size * 0.62} L ${size * 0.96} ${size * 0.72} Q ${size * 0.96} ${size * 0.8} ${size * 0.88} ${size * 0.82} L ${size * 0.12} ${size * 0.82} Q ${size * 0.04} ${size * 0.8} ${size * 0.04} ${size * 0.72} Z`} />
      <line x1={size / 2} y1={size * 0.62} x2={size / 2} y2={size * 0.68} />
    </g>
  )
}

export function MobileIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.3} y={size * 0.05} width={size * 0.4} height={size * 0.9} rx={size * 0.08} />
      <line x1={size * 0.4} y1={size * 0.82} x2={size * 0.6} y2={size * 0.82} />
      <rect x={size * 0.38} y={size * 0.12} width={size * 0.24} height={size * 0.55} rx={2} fill={color} opacity={0.1} />
    </g>
  )
}

export function TabletIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.15} y={size * 0.08} width={size * 0.7} height={size * 0.84} rx={size * 0.08} />
      <circle cx={size / 2} cy={size * 0.84} r={size * 0.03} fill={color} />
      <rect x={size * 0.25} y={size * 0.15} width={size * 0.5} height={size * 0.55} rx={2} fill={color} opacity={0.1} />
    </g>
  )
}

export function CloudIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.25} ${size * 0.62} H ${size * 0.2} Q ${size * 0.05} ${size * 0.62} ${size * 0.05} ${size * 0.45} Q ${size * 0.05} ${size * 0.3} ${size * 0.2} ${size * 0.3} Q ${size * 0.22} ${size * 0.12} ${size * 0.4} ${size * 0.12} Q ${size * 0.6} ${size * 0.08} ${size * 0.75} ${size * 0.25} Q ${size * 0.92} ${size * 0.2} ${size * 0.92} ${size * 0.4} Q ${size * 0.92} ${size * 0.58} ${size * 0.75} ${size * 0.62} H ${size * 0.4}`} fill={color} opacity={0.1} />
    </g>
  )
}

export function DatabaseIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <ellipse cx={size / 2} cy={size * 0.18} rx={size * 0.3} ry={size * 0.1} />
      <path d={`M ${size * 0.2} ${size * 0.18} L ${size * 0.2} ${size * 0.72} Q ${size * 0.2} ${size * 0.82} ${size / 2} ${size * 0.82} Q ${size * 0.8} ${size * 0.82} ${size * 0.8} ${size * 0.72} L ${size * 0.8} ${size * 0.18}`} />
      <path d={`M ${size * 0.2} ${size * 0.45} Q ${size / 2} ${size * 0.55} ${size * 0.8} ${size * 0.45}`} />
    </g>
  )
}

export function CodeIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={`${size * 0.35},${size * 0.2} ${size * 0.1},${size / 2} ${size * 0.35},${size * 0.8}`} />
      <polyline points={`${size * 0.65},${size * 0.2} ${size * 0.9},${size / 2} ${size * 0.65},${size * 0.8}`} />
      <line x1={size * 0.55} y1={size * 0.85} x2={size * 0.45} y2={size * 0.15} />
    </g>
  )
}

export function ShieldIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size / 2} ${size * 0.05} L ${size * 0.85} ${size * 0.2} L ${size * 0.85} ${size * 0.5} Q ${size * 0.85} ${size * 0.85} ${size / 2} ${size * 0.95} Q ${size * 0.15} ${size * 0.85} ${size * 0.15} ${size * 0.5} L ${size * 0.15} ${size * 0.2} Z`} fill={color} opacity={0.1} />
      <path d={`M ${size * 0.35} ${size / 2} L ${size * 0.48} ${size * 0.68} L ${size * 0.7} ${size * 0.4}`} />
    </g>
  )
}

export function KeyIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={size * 0.3} cy={size / 2} r={size * 0.2} />
      <line x1={size * 0.48} y1={size / 2} x2={size * 0.92} y2={size / 2} />
      <line x1={size * 0.78} y1={size / 2} x2={size * 0.78} y2={size * 0.35} />
      <line x1={size * 0.64} y1={size / 2} x2={size * 0.64} y2={size * 0.38} />
    </g>
  )
}

export function MapPinIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size / 2} ${size * 0.05} Q ${size * 0.25} ${size * 0.05} ${size * 0.25} ${size * 0.35} Q ${size * 0.25} ${size * 0.65} ${size / 2} ${size * 0.95} Q ${size * 0.75} ${size * 0.65} ${size * 0.75} ${size * 0.35} Q ${size * 0.75} ${size * 0.05} ${size / 2} ${size * 0.05} Z`} fill={color} opacity={0.1} />
      <circle cx={size / 2} cy={size * 0.35} r={size * 0.12} />
    </g>
  )
}

// ============================================================
// People & HR
// ============================================================

export function PeopleIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <circle cx={size * 0.35} cy={size * 0.25} r={size * 0.14} />
      <path d={`M ${size * 0.12} ${size * 0.7} Q ${size * 0.35} ${size * 0.5} ${size * 0.58} ${size * 0.7}`} />
      <circle cx={size * 0.68} cy={size * 0.25} r={size * 0.14} />
      <path d={`M ${size * 0.45} ${size * 0.7} Q ${size * 0.68} ${size * 0.5} ${size * 0.92} ${size * 0.7}`} />
    </g>
  )
}

export function HandshakeIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.08} ${size * 0.45} L ${size * 0.25} ${size * 0.35} L ${size * 0.35} ${size * 0.45} L ${size * 0.25} ${size * 0.55}`} />
      <path d={`M ${size * 0.35} ${size * 0.45} L ${size / 2} ${size * 0.55}`} />
      <path d={`M ${size * 0.65} ${size * 0.45} L ${size / 2} ${size * 0.55}`} />
      <path d={`M ${size * 0.92} ${size * 0.45} L ${size * 0.75} ${size * 0.35} L ${size * 0.65} ${size * 0.45} L ${size * 0.75} ${size * 0.55}`} />
      <line x1={size * 0.08} y1={size * 0.45} x2={size * 0.08} y2={size * 0.8} />
      <line x1={size * 0.92} y1={size * 0.45} x2={size * 0.92} y2={size * 0.8} />
    </g>
  )
}

export function TrophyIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.25} ${size * 0.1} L ${size * 0.75} ${size * 0.1} L ${size * 0.7} ${size * 0.4} Q ${size / 2} ${size * 0.55} ${size * 0.3} ${size * 0.4} Z`} fill={color} opacity={0.1} />
      <path d={`M ${size * 0.25} ${size * 0.1} L ${size * 0.12} ${size * 0.25} L ${size * 0.22} ${size * 0.4}`} />
      <path d={`M ${size * 0.75} ${size * 0.1} L ${size * 0.88} ${size * 0.25} L ${size * 0.78} ${size * 0.4}`} />
      <path d={`M ${size * 0.35} ${size * 0.55} L ${size * 0.35} ${size * 0.7} L ${size * 0.65} ${size * 0.7} L ${size * 0.65} ${size * 0.55}`} />
      <line x1={size * 0.3} y1={size * 0.7} x2={size * 0.7} y2={size * 0.7} />
    </g>
  )
}

export function BadgeIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size / 2} ${size * 0.08} L ${size * 0.85} ${size * 0.22} L ${size * 0.85} ${size * 0.55} Q ${size * 0.85} ${size * 0.78} ${size / 2} ${size * 0.92} Q ${size * 0.15} ${size * 0.78} ${size * 0.15} ${size * 0.55} L ${size * 0.15} ${size * 0.22} Z`} fill={color} opacity={0.1} />
      <circle cx={size / 2} cy={size * 0.48} r={size * 0.14} />
      <path d={`M ${size / 2} ${size * 0.32} L ${size * 0.54} ${size * 0.42} L ${size * 0.62} ${size * 0.48} L ${size * 0.54} ${size * 0.54} L ${size / 2} ${size * 0.64} L ${size * 0.46} ${size * 0.54} L ${size * 0.38} ${size * 0.48} L ${size * 0.46} ${size * 0.42} Z`} fill={color} opacity={0.2} />
    </g>
  )
}

export function AwardIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={size / 2} cy={size * 0.35} r={size * 0.22} />
      <path d={`M ${size * 0.3} ${size * 0.52} L ${size * 0.2} ${size * 0.75} L ${size * 0.32} ${size * 0.65}`} />
      <path d={`M ${size * 0.7} ${size * 0.52} L ${size * 0.8} ${size * 0.75} L ${size * 0.68} ${size * 0.65}`} />
      <line x1={size * 0.3} y1={size * 0.52} x2={size * 0.7} y2={size * 0.52} />
      <line x1={size * 0.4} y1={size * 0.75} x2={size * 0.6} y2={size * 0.75} />
      <line x1={size * 0.35} y1={size * 0.85} x2={size * 0.65} y2={size * 0.85} />
    </g>
  )
}

// ============================================================
// Office & Documents
// ============================================================

export function FileIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.2} ${size * 0.08} L ${size * 0.58} ${size * 0.08} L ${size * 0.8} ${size * 0.3} L ${size * 0.8} ${size * 0.88} Q ${size * 0.8} ${size * 0.92} ${size * 0.72} ${size * 0.92} L ${size * 0.2} ${size * 0.92} Q ${size * 0.12} ${size * 0.92} ${size * 0.12} ${size * 0.88} L ${size * 0.12} ${size * 0.12} Q ${size * 0.12} ${size * 0.08} ${size * 0.2} ${size * 0.08} Z`} />
      <polyline points={`${size * 0.58},${size * 0.08} ${size * 0.58},${size * 0.3} ${size * 0.8},${size * 0.3}`} />
      <line x1={size * 0.3} y1={size * 0.5} x2={size * 0.7} y2={size * 0.5} />
      <line x1={size * 0.3} y1={size * 0.65} x2={size * 0.7} y2={size * 0.65} />
    </g>
  )
}

export function FolderIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.08} ${size * 0.22} L ${size * 0.08} ${size * 0.85} L ${size * 0.92} ${size * 0.85} L ${size * 0.92} ${size * 0.28} L ${size * 0.46} ${size * 0.28} L ${size * 0.35} ${size * 0.15} L ${size * 0.18} ${size * 0.15} Z`} fill={color} opacity={0.1} />
    </g>
  )
}

export function ClipboardIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.3} ${size * 0.08} L ${size * 0.7} ${size * 0.08} L ${size * 0.7} ${size * 0.15} Q ${size * 0.7} ${size * 0.2} ${size * 0.62} ${size * 0.2} L ${size * 0.38} ${size * 0.2} Q ${size * 0.3} ${size * 0.2} ${size * 0.3} ${size * 0.15} Z`} />
      <rect x={size * 0.2} y={size * 0.15} width={size * 0.6} height={size * 0.78} rx={size * 0.04} />
      <line x1={size * 0.32} y1={size * 0.4} x2={size * 0.68} y2={size * 0.4} />
      <line x1={size * 0.32} y1={size * 0.55} x2={size * 0.68} y2={size * 0.55} />
      <line x1={size * 0.32} y1={size * 0.7} x2={size * 0.5} y2={size * 0.7} />
    </g>
  )
}

export function CalendarIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.12} y={size * 0.15} width={size * 0.76} height={size * 0.78} rx={size * 0.05} />
      <line x1={size * 0.12} y1={size * 0.35} x2={size * 0.88} y2={size * 0.35} />
      <line x1={size * 0.28} y1={size * 0.08} x2={size * 0.28} y2={size * 0.22} />
      <line x1={size * 0.72} y1={size * 0.08} x2={size * 0.72} y2={size * 0.22} />
      <line x1={size * 0.28} y1={size * 0.48} x2={size * 0.38} y2={size * 0.48} />
      <line x1={size * 0.28} y1={size * 0.62} x2={size * 0.38} y2={size * 0.62} />
      <line x1={size * 0.5} y1={size * 0.48} x2={size * 0.6} y2={size * 0.48} />
      <line x1={size * 0.5} y1={size * 0.62} x2={size * 0.6} y2={size * 0.62} />
    </g>
  )
}

export function ClockIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round">
      <circle cx={size / 2} cy={size / 2} r={size * 0.42} />
      <polyline points={`${size / 2},${size / 2} ${size / 2},${size * 0.28} ${size * 0.62},${size * 0.55}`} />
    </g>
  )
}

// ============================================================
// Transport & Logistics
// ============================================================

export function TruckIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x={size * 0.08} y={size * 0.35} width={size * 0.6} height={size * 0.35} rx={size * 0.04} />
      <rect x={size * 0.68} y={size * 0.2} width={size * 0.25} height={size * 0.5} rx={size * 0.04} />
      <path d={`M ${size * 0.5} ${size * 0.35} L ${size * 0.5} ${size * 0.15} L ${size * 0.68} ${size * 0.15}`} />
      <circle cx={size * 0.25} cy={size * 0.78} r={size * 0.08} />
      <circle cx={size * 0.75} cy={size * 0.78} r={size * 0.08} />
    </g>
  )
}

export function PlaneIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.85} ${size * 0.65} L ${size * 0.55} ${size * 0.68} L ${size * 0.05} ${size * 0.85} L ${size * 0.1} ${size * 0.72} L ${size * 0.4} ${size * 0.55} L ${size * 0.05} ${size * 0.35} L ${size * 0.1} ${size * 0.25} L ${size * 0.55} ${size * 0.42} L ${size * 0.85} ${size * 0.45} L ${size * 0.82} ${size * 0.55} Z`} fill={color} opacity={0.1} />
    </g>
  )
}

export function ShipIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.1} ${size * 0.6} L ${size * 0.15} ${size * 0.3} L ${size * 0.85} ${size * 0.3} L ${size * 0.9} ${size * 0.6} Z`} fill={color} opacity={0.1} />
      <line x1={size * 0.08} y1={size * 0.6} x2={size * 0.92} y2={size * 0.6} />
      <line x1={size * 0.05} y1={size * 0.7} x2={size * 0.95} y2={size * 0.7} />
      <line x1={size / 2} y1={size * 0.3} x2={size / 2} y2={size * 0.1} />
      <line x1={size / 2} y1={size * 0.1} x2={size * 0.8} y2={size * 0.1} />
    </g>
  )
}

export function PackageIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size / 2} ${size * 0.08} L ${size * 0.92} ${size * 0.35} L ${size * 0.92} ${size * 0.78} L ${size / 2} ${size * 0.55} Z`} />
      <path d={`M ${size / 2} ${size * 0.08} L ${size * 0.08} ${size * 0.35} L ${size * 0.08} ${size * 0.78} L ${size / 2} ${size * 0.55}`} />
      <line x1={size * 0.08} y1={size * 0.35} x2={size / 2} y2={size * 0.55} />
      <line x1={size / 2} y1={size * 0.55} x2={size * 0.92} y2={size * 0.35} />
      <polyline points={`${size * 0.92},${size * 0.78} ${size / 2},${size * 0.55} ${size * 0.08},${size * 0.78}`} />
    </g>
  )
}

// ============================================================
// Environment
// ============================================================

export function LeafIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.3} ${size * 0.9} Q ${size * 0.2} ${size * 0.55} ${size / 2} ${size * 0.15} Q ${size * 0.85} ${size * 0.25} ${size * 0.7} ${size * 0.55} Q ${size * 0.55} ${size * 0.85} ${size * 0.3} ${size * 0.9} Z`} fill={color} opacity={0.15} />
      <line x1={size * 0.3} y1={size * 0.9} x2={size * 0.38} y2={size * 0.95} />
    </g>
  )
}

export function TreeIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size / 2} ${size * 0.05} L ${size * 0.15} ${size * 0.45} L ${size * 0.4} ${size * 0.4} L ${size * 0.05} ${size * 0.7} L ${size * 0.55} ${size * 0.7} L ${size * 0.55} ${size * 0.95} L ${size * 0.45} ${size * 0.95} L ${size * 0.45} ${size * 0.7} L ${size * 0.95} ${size * 0.7} L ${size * 0.6} ${size * 0.4} L ${size * 0.85} ${size * 0.45} Z`} fill={color} opacity={0.15} />
    </g>
  )
}

export function RecycleIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size * 0.35} ${size * 0.1} L ${size * 0.5} ${size * 0.35} L ${size * 0.65} ${size * 0.12}`} />
      <path d={`M ${size * 0.85} ${size * 0.5} L ${size * 0.62} ${size * 0.5} L ${size * 0.83} ${size * 0.62}`} />
      <path d={`M ${size * 0.55} ${size * 0.85} L ${size * 0.35} ${size * 0.5} L ${size * 0.55} ${size * 0.55}`} />
      <polyline points={`${size * 0.5},${size * 0.18} ${size * 0.55},${size * 0.38} ${size * 0.35},${size * 0.35}`} />
      <polyline points={`${size * 0.3},${size * 0.65} ${size * 0.55},${size * 0.62} ${size * 0.42},${size * 0.58}`} />
      <polyline points={`${size * 0.65},${size * 0.7} ${size * 0.4},${size * 0.52} ${size * 0.45},${size * 0.48}`} />
    </g>
  )
}

export function WaterDropIcon({ size = 24, color = '#555' }: IconProps): ReactElement {
  return (
    <g stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${size / 2} ${size * 0.08} Q ${size * 0.2} ${size * 0.45} ${size * 0.2} ${size * 0.65} Q ${size * 0.2} ${size * 0.88} ${size / 2} ${size * 0.92} Q ${size * 0.8} ${size * 0.88} ${size * 0.8} ${size * 0.65} Q ${size * 0.8} ${size * 0.45} ${size / 2} ${size * 0.08} Z`} fill={color} opacity={0.1} />
    </g>
  )
}

export const TEMPLATE_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  user: UserIcon,
  chart: ChartIcon,
  gear: GearIcon,
  target: TargetIcon,
  lightbulb: LightbulbIcon,
  flag: FlagIcon,
  star: StarIcon,
  check: CheckIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  chat: ChatIcon,
  globe: GlobeIcon,
  wifi: WifiIcon,
  bluetooth: BluetoothIcon,
  dollar: DollarIcon,
  euro: EuroIcon,
  creditCard: CreditCardIcon,
  wallet: WalletIcon,
  pieChart: PieChartIcon,
  barChart: BarChartIcon,
  lineChart: LineChartIcon,
  laptop: LaptopIcon,
  mobile: MobileIcon,
  tablet: TabletIcon,
  cloud: CloudIcon,
  database: DatabaseIcon,
  code: CodeIcon,
  shield: ShieldIcon,
  key: KeyIcon,
  mapPin: MapPinIcon,
  people: PeopleIcon,
  handshake: HandshakeIcon,
  trophy: TrophyIcon,
  badge: BadgeIcon,
  award: AwardIcon,
  file: FileIcon,
  folder: FolderIcon,
  clipboard: ClipboardIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  truck: TruckIcon,
  plane: PlaneIcon,
  ship: ShipIcon,
  package: PackageIcon,
  leaf: LeafIcon,
  tree: TreeIcon,
  recycle: RecycleIcon,
  waterDrop: WaterDropIcon,
}
