import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Vship50Template({ data, scale = 1, isExport = false }: any) {
  return (
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#fff', position: 'relative', color: '#052E2B', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', background: 'white', color: '#052E2B', height: 90 * scale }}>
        <div style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>Add page title</div>
        <div style={{ width: '50%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 32 * scale }}>Title over three lines max</div>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>CLICK TO ADD SUBTITLE IN ALL CAPS</div>
      </div>
      
      <div style={{ padding: 40 * scale, flex: 1, display: 'flex', gap: 40 * scale }}>
        <div style={{ width: '60%' }}>
          <h2 style={{ fontSize: 24 * scale, margin: '0 0 10px 0' }}>Financial summary</h2>
          <p style={{ fontSize: 14 * scale, fontStyle: 'italic', color: '#888', margin: '0 0 30px 0' }}>Subtitle for graph in italics</p>
          
          <div style={{ width: '100%', height: 260 * scale, position: 'relative', borderBottom: '1px solid #ccc', borderLeft: '1px solid #ccc' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 80 L 25 50 L 50 65 L 75 30 L 100 45" fill="none" stroke="#FF451A" strokeWidth="2" />
              <circle cx="0" cy="80" r="2" fill="#FF451A" />
              <circle cx="25" cy="50" r="2" fill="#FF451A" />
              <circle cx="50" cy="65" r="2" fill="#FF451A" />
              <circle cx="75" cy="30" r="2" fill="#FF451A" />
              <circle cx="100" cy="45" r="2" fill="#FF451A" />
            </svg>
            <div style={{ position: 'absolute', bottom: -20 * scale, width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 12 * scale, color: '#888' }}>
              <span>Point 1</span>
              <span>Point 2</span>
              <span>Point 3</span>
              <span>Point 4</span>
              <span>Point 5</span>
            </div>
          </div>
        </div>
        
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: 16 * scale, margin: '0 0 10px 0' }}>FUSCE POSUERE, MAGNA</h3>
          <p style={{ fontSize: 14 * scale, margin: '0 0 20px 0' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
          <h3 style={{ fontSize: 16 * scale, margin: '0 0 10px 0' }}>FUSCE POSUERE, MAGNA</h3>
          <p style={{ fontSize: 14 * scale, margin: '0 0 0 0' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 20 * scale, left: 40 * scale, display: 'flex', gap: 20 * scale, fontSize: 14 * scale, color: '#68DA6A' }}>
        <span style={{ color: '#052E2B' }}>50</span>
        <span style={{ borderBottom: '1px solid #68DA6A' }}>Navigation 1</span>
        <span style={{ color: '#052E2B' }}>Navigation 2</span>
        <span style={{ color: '#052E2B' }}>Navigation 3</span>
      </div>
    </div>
  )
}
