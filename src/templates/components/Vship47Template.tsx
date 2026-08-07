import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Vship47Template({ data, scale = 1, isExport = false }: any) {
  const steps = [
    { title: 'Lorem ipsum', value: 30, color: MIGSO_PALETTE[1] },
    { title: 'Lorem ipsum', value: 40, color: MIGSO_PALETTE[4] },
    { title: 'Lorem ipsum', value: 60, color: MIGSO_PALETTE[2] },
    { title: 'Lorem ipsum', value: 70, color: MIGSO_PALETTE[5] },
    { title: 'Lorem ipsum', value: 100, color: '#f5f5f5' },
    { title: 'Lorem ipsum', value: 50, color: '#7D7161' },
  ]
  
  return (
    <foreignObject x="0" y="0" width={960 * scale} height={540 * scale}>
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#052E2B', position: 'relative', color: 'white', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', background: 'white', color: '#052E2B', height: 90 * scale }}>
        <div style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>Add page title</div>
        <div style={{ width: '50%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 32 * scale }}>Title over three lines max</div>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>CLICK TO ADD SUBTITLE IN ALL CAPS</div>
      </div>
      
      <div style={{ padding: 40 * scale, flex: 1, position: 'relative' }}>
        <h2 style={{ fontSize: 16 * scale, margin: 0, textTransform: 'uppercase' }}>TITLE OF TABLE IN ALL CAPS</h2>
        <p style={{ fontSize: 14 * scale, margin: '10px 0 0 0', fontStyle: 'italic', color: '#D9D1C6' }}>Subtitle for table in italics</p>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20 * scale, height: 260 * scale, marginTop: 40 * scale, position: 'relative' }}>
          {steps.map((s, i) => {
            const h = s.value * 2 * scale
            const nextH = i < steps.length - 1 ? steps[i+1].value * 2 * scale : 0
            
            return (
              <div key={i} style={{ width: 100 * scale, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', height: h, background: s.color, border: '1px solid white' }} />
                <div style={{ position: 'absolute', bottom: -30 * scale, fontSize: 14 * scale, whiteSpace: 'nowrap' }}>{s.title}</div>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', top: - (nextH - h), left: 100 * scale, width: 20 * scale, borderTop: '1px dashed white' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 20 * scale, left: 40 * scale, display: 'flex', gap: 20 * scale, fontSize: 14 * scale, color: '#68DA6A' }}>
        <span style={{ color: 'white' }}>47</span>
        <span style={{ borderBottom: '1px solid #68DA6A' }}>Navigation 1</span>
        <span style={{ color: 'white' }}>Navigation 2</span>
        <span style={{ color: 'white' }}>Navigation 3</span>
      </div>
    </div>
    </foreignObject>
  )
}
