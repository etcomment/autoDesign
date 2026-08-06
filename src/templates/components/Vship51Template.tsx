import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Vship51Template({ data, scale = 1, isExport = false }: any) {
  return (
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#fff', position: 'relative', color: '#052E2B', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', background: 'white', color: '#052E2B', height: 90 * scale }}>
        <div style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>Add page title</div>
        <div style={{ width: '50%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 32 * scale }}>Title over three lines max</div>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>CLICK TO ADD SUBTITLE IN ALL CAPS</div>
      </div>
      
      <div style={{ padding: 40 * scale, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: 24 * scale, margin: '0 0 10px 0' }}>Financial summary</h2>
        <p style={{ fontSize: 14 * scale, fontStyle: 'italic', color: '#888', margin: '0 0 30px 0' }}>Subtitle for graph in italics</p>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 * scale }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 * scale }}>
            <div style={{ width: 150 * scale, fontSize: 14 * scale, textAlign: 'right' }}>Category 1</div>
            <div style={{ flex: 1, height: 30 * scale, background: '#f5f5f5', position: 'relative' }}>
              <div style={{ width: '40%', height: '100%', background: '#68DA6A', display: 'flex', alignItems: 'center', paddingLeft: 10 * scale, boxSizing: 'border-box' }}>40</div>
              <div style={{ width: '20%', height: '100%', background: '#052E2B', position: 'absolute', top: 0, left: '40%', color: 'white', display: 'flex', alignItems: 'center', paddingLeft: 10 * scale, boxSizing: 'border-box' }}>20</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 * scale }}>
            <div style={{ width: 150 * scale, fontSize: 14 * scale, textAlign: 'right' }}>Category 2</div>
            <div style={{ flex: 1, height: 30 * scale, background: '#f5f5f5', position: 'relative' }}>
              <div style={{ width: '30%', height: '100%', background: '#68DA6A', display: 'flex', alignItems: 'center', paddingLeft: 10 * scale, boxSizing: 'border-box' }}>30</div>
              <div style={{ width: '50%', height: '100%', background: '#052E2B', position: 'absolute', top: 0, left: '30%', color: 'white', display: 'flex', alignItems: 'center', paddingLeft: 10 * scale, boxSizing: 'border-box' }}>50</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 * scale }}>
            <div style={{ width: 150 * scale, fontSize: 14 * scale, textAlign: 'right' }}>Category 3</div>
            <div style={{ flex: 1, height: 30 * scale, background: '#f5f5f5', position: 'relative' }}>
              <div style={{ width: '60%', height: '100%', background: '#68DA6A', display: 'flex', alignItems: 'center', paddingLeft: 10 * scale, boxSizing: 'border-box' }}>60</div>
              <div style={{ width: '10%', height: '100%', background: '#052E2B', position: 'absolute', top: 0, left: '60%', color: 'white', display: 'flex', alignItems: 'center', paddingLeft: 10 * scale, boxSizing: 'border-box' }}>10</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 20 * scale, left: 40 * scale, display: 'flex', gap: 20 * scale, fontSize: 14 * scale, color: '#68DA6A' }}>
        <span style={{ color: '#052E2B' }}>51</span>
        <span style={{ borderBottom: '1px solid #68DA6A' }}>Navigation 1</span>
        <span style={{ color: '#052E2B' }}>Navigation 2</span>
        <span style={{ color: '#052E2B' }}>Navigation 3</span>
      </div>
    </div>
  )
}
