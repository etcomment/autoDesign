import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Vship53Template({ data, scale = 1, isExport = false }: any) {
  return (
    <foreignObject x="0" y="0" width={960 * scale} height={540 * scale}>
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#fff', position: 'relative', color: '#052E2B', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', background: 'white', color: '#052E2B', height: 90 * scale }}>
        <div style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>Add page title</div>
        <div style={{ width: '50%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 32 * scale }}>Title over three lines max</div>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>CLICK TO ADD SUBTITLE IN ALL CAPS</div>
      </div>
      
      <div style={{ padding: 40 * scale, flex: 1, position: 'relative' }}>
        <h2 style={{ fontSize: 24 * scale, margin: '0 0 10px 0' }}>Global Reach</h2>
        <p style={{ fontSize: 14 * scale, fontStyle: 'italic', color: '#888', margin: '0 0 30px 0' }}>Subtitle for map in italics</p>
        
        <div style={{ width: '100%', height: 280 * scale, background: '#f0f8ff', position: 'relative', borderRadius: 10 * scale, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Simple map placeholder */}
          <svg width="80%" height="80%" viewBox="0 0 800 400">
            <path d="M 100 100 Q 150 50 200 150 T 300 100 T 400 200 T 600 150 T 700 250" fill="none" stroke="#ddd" strokeWidth="5" />
            <path d="M 200 300 Q 250 250 300 350 T 400 300 T 500 350" fill="none" stroke="#ddd" strokeWidth="5" />
            
            {/* Pins */}
            <circle cx="200" cy="150" r="10" fill="#68DA6A" />
            <circle cx="400" cy="200" r="10" fill="#FF451A" />
            <circle cx="600" cy="150" r="10" fill="#052E2B" />
          </svg>
          
          <div style={{ position: 'absolute', top: '35%', left: '20%', fontSize: 12 * scale, fontWeight: 'bold' }}>North America</div>
          <div style={{ position: 'absolute', top: '45%', left: '45%', fontSize: 12 * scale, fontWeight: 'bold' }}>Europe</div>
          <div style={{ position: 'absolute', top: '35%', left: '70%', fontSize: 12 * scale, fontWeight: 'bold' }}>Asia</div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 20 * scale, left: 40 * scale, display: 'flex', gap: 20 * scale, fontSize: 14 * scale, color: '#68DA6A' }}>
        <span style={{ color: '#052E2B' }}>53</span>
        <span style={{ borderBottom: '1px solid #68DA6A' }}>Navigation 1</span>
        <span style={{ color: '#052E2B' }}>Navigation 2</span>
        <span style={{ color: '#052E2B' }}>Navigation 3</span>
      </div>
    </div>
    </foreignObject>
  )
}
