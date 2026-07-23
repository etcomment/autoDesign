import type { ReactElement } from 'react'
import type { ManufacturingData } from '../types'
import { Arrow } from '../shared/primitives'
import { GearIcon, StarIcon } from '../shared/icons'

const PALETTE = ['#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function ManufacturingTemplate({ data }: { data: ManufacturingData }): ReactElement {
  const { title, stations } = data
  const W = 1000
  const H = 500
  const startX = 120
  const boxW = 130
  const boxH = 80
  const gap = 20
  const y = 180

  const totalWidth = stations.length * boxW + (stations.length - 1) * gap
  const firstBoxX = (W - totalWidth) / 2

  return (
    <g>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <text x={startX - 40} y={y + boxH / 2 + 4} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600} fill="#888">
        INPUT
      </text>
      <rect x={startX - 8} y={y + (boxH - 36) / 2} width={36} height={36} rx={8} fill="#f0f4ff" stroke="#4a90d9" strokeWidth={1.5} />
      <circle cx={startX + 10} cy={y + boxH / 2} r={8} fill="#4a90d9" />

      {stations.map((station, i) => {
        const color = PALETTE[i % PALETTE.length]!
        const bx = firstBoxX + i * (boxW + gap)

        if (station.isQuality) {
          const diamondW = 110
          const diamondH = 76
          const dx = bx + (boxW - diamondW) / 2
          const dy = y + (boxH - diamondH) / 2
          const dmx = dx + diamondW / 2
          const dmy = dy + diamondH / 2

          return (
            <g key={i}>
              <polygon
                points={`${dmx},${dy} ${dx + diamondW},${dmy} ${dmx},${dy + diamondH} ${dx},${dmy}`}
                fill="#fff3e0"
                stroke="#e67e22"
                strokeWidth={2}
              />
              <text x={dmx} y={dmy - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#e67e22">
                {station.title}
              </text>
              {station.subtitle && (
                <text x={dmx} y={dmy + 10} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#888">
                  {station.subtitle}
                </text>
              )}
            </g>
          )
        }

        return (
          <g key={i}>
            <rect x={bx} y={y} width={boxW} height={boxH} rx={8} fill="white" stroke={color} strokeWidth={2} />
            <g transform={`translate(${bx + boxW / 2 - 12}, ${y + 10})`}>
              <GearIcon size={24} color={color} />
            </g>
            <text x={bx + boxW / 2} y={y + boxH - 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill={color}>
              {station.title.length > 16 ? station.title.slice(0, 14) + '..' : station.title}
            </text>
            {station.subtitle && (
              <text x={bx + boxW / 2} y={y + boxH + 16} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#777">
                {station.subtitle.length > 20 ? station.subtitle.slice(0, 18) + '..' : station.subtitle}
              </text>
            )}
          </g>
        )
      })}

      {Array.from({ length: stations.length }).map((_, i) => {
        const bx = firstBoxX + i * (boxW + gap)
        const nextBx = firstBoxX + (i + 1) * (boxW + gap)

        const fromX = bx + boxW
        const fromY = y + boxH / 2

        if (i < stations.length - 1) {
          const color = PALETTE[i % PALETTE.length]!
          return <Arrow key={`arr-${i}`} from={{ x: fromX, y: fromY }} to={{ x: nextBx, y: fromY }} color={color} />
        }

        return (
          <g key={`out-${i}`}>
            <Arrow from={{ x: fromX, y: fromY }} to={{ x: fromX + 40, y: fromY }} color="#4a90d9" />
            <g transform={`translate(${fromX + 48}, ${fromY - 18})`}>
              <StarIcon size={32} fill="#ffc107" color="#e0a800" />
            </g>
            <text x={fromX + 50} y={fromY + 28} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#888">
              OUTPUT
            </text>
          </g>
        )
      })}
    </g>
  )
}
