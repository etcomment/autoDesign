import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Vship52Template({ data, scale = 1, isExport = false }: any) {
  return (
    <foreignObject x="0" y="0" width={960 * scale} height={540 * scale}>
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#fff', position: 'relative', color: '#052E2B', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', background: 'white', color: '#052E2B', height: 90 * scale }}>
        <div style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>Add page title</div>
        <div style={{ width: '50%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 32 * scale }}>Title over three lines max</div>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>CLICK TO ADD SUBTITLE IN ALL CAPS</div>
      </div>
      
      <div style={{ padding: 40 * scale, flex: 1, display: 'flex', gap: 40 * scale }}>
        <div style={{ width: '50%' }}>
          <h2 style={{ fontSize: 24 * scale, margin: '0 0 10px 0' }}>SALES</h2>
          <p style={{ fontSize: 14 * scale, fontStyle: 'italic', color: '#888', margin: '0 0 30px 0' }}>Subtitle for graph in italics</p>
          
          <div style={{ width: '100%', height: 260 * scale, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <svg width="200" height="200" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f5f5f5" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#68DA6A" strokeWidth="20" strokeDasharray="180 250" strokeDashoffset="-25" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#052E2B" strokeWidth="20" strokeDasharray="50 250" strokeDashoffset="-205" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: 24 * scale, fontWeight: 'bold' }}>100%</div>
              <div style={{ fontSize: 12 * scale }}>Total</div>
            </div>
          </div>
        </div>
        
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale, marginBottom: 20 * scale }}>
            <div style={{ width: 20 * scale, height: 20 * scale, background: '#68DA6A' }}></div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Category 1 (70%)</div>
              <div style={{ fontSize: 12 * scale, color: '#888' }}>Lorem ipsum dolor sit amet</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale, marginBottom: 20 * scale }}>
            <div style={{ width: 20 * scale, height: 20 * scale, background: '#052E2B' }}></div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Category 2 (20%)</div>
              <div style={{ fontSize: 12 * scale, color: '#888' }}>Lorem ipsum dolor sit amet</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale }}>
            <div style={{ width: 20 * scale, height: 20 * scale, background: '#f5f5f5', border: '1px solid #ccc' }}></div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Category 3 (10%)</div>
              <div style={{ fontSize: 12 * scale, color: '#888' }}>Lorem ipsum dolor sit amet</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 20 * scale, left: 40 * scale, display: 'flex', gap: 20 * scale, fontSize: 14 * scale, color: '#68DA6A' }}>
        <span style={{ color: '#052E2B' }}>52</span>
        <span style={{ borderBottom: '1px solid #68DA6A' }}>Navigation 1</span>
        <span style={{ color: '#052E2B' }}>Navigation 2</span>
        <span style={{ color: '#052E2B' }}>Navigation 3</span>
      </div>
    </div>
    </foreignObject>
  )
}
