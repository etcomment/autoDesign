import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Vship49Template({ data, scale = 1, isExport = false }: any) {
  return (
    <foreignObject x="0" y="0" width={960 * scale} height={540 * scale}>
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#fff', position: 'relative', color: '#052E2B', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', background: 'white', color: '#052E2B', height: 90 * scale }}>
        <div style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>Add page title</div>
        <div style={{ width: '50%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 32 * scale }}>Title over three lines max</div>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>CLICK TO ADD SUBTITLE IN ALL CAPS</div>
      </div>
      
      <div style={{ padding: 40 * scale, flex: 1 }}>
        <h2 style={{ fontSize: 24 * scale, margin: '0 0 10px 0' }}>Financial summary</h2>
        <p style={{ fontSize: 14 * scale, fontStyle: 'italic', color: '#888', margin: '0 0 30px 0' }}>Subtitle for graph in italics</p>
        
        <div style={{ width: '100%', height: 280 * scale, position: 'relative', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc' }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 100 L 0 80 L 10 70 L 20 85 L 30 60 L 40 75 L 50 40 L 60 55 L 70 20 L 80 40 L 90 10 L 100 30 L 100 100 Z" fill="#68DA6A" fillOpacity="0.3" />
            <path d="M 0 80 L 10 70 L 20 85 L 30 60 L 40 75 L 50 40 L 60 55 L 70 20 L 80 40 L 90 10 L 100 30" fill="none" stroke="#68DA6A" strokeWidth="2" />
          </svg>
          <div style={{ position: 'absolute', bottom: -20 * scale, width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 12 * scale, color: '#888' }}>
            <span>Category 1</span>
            <span>Category 2</span>
            <span>Category 3</span>
            <span>Category 4</span>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 20 * scale, left: 40 * scale, display: 'flex', gap: 20 * scale, fontSize: 14 * scale, color: '#68DA6A' }}>
        <span style={{ color: '#052E2B' }}>49</span>
        <span style={{ borderBottom: '1px solid #68DA6A' }}>Navigation 1</span>
        <span style={{ color: '#052E2B' }}>Navigation 2</span>
        <span style={{ color: '#052E2B' }}>Navigation 3</span>
      </div>
    </div>
    </foreignObject>
  )
}
