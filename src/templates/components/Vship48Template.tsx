import React from 'react'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Vship48Template({ data, scale = 1, isExport = false }: any) {
  return (
    <foreignObject x="0" y="0" width={960 * scale} height={540 * scale}>
    <div style={{ width: 960 * scale, height: 540 * scale, background: '#fff', position: 'relative', color: '#052E2B', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', background: 'white', color: '#052E2B', height: 90 * scale }}>
        <div style={{ width: '15%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>Add page title</div>
        <div style={{ width: '50%', borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 30px', fontSize: 32 * scale }}>Title over three lines max</div>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 14 * scale }}>CLICK TO ADD SUBTITLE IN ALL CAPS</div>
      </div>
      
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: '45%', background: '#052E2B', color: 'white', padding: 40 * scale, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 50 * scale, color: '#68DA6A', margin: 0, fontWeight: 300 }}>No.1</h2>
          <p style={{ fontSize: 14 * scale, margin: '5px 0 20px 0', color: '#C7FFB5' }}>Lorem ipsum dolor sit amet</p>
          <h2 style={{ fontSize: 50 * scale, color: '#68DA6A', margin: 0, fontWeight: 300 }}>No.8</h2>
          <p style={{ fontSize: 14 * scale, margin: '5px 0 20px 0', color: '#C7FFB5' }}>Lorem ipsum dolor sit amet</p>
          <h2 style={{ fontSize: 50 * scale, color: '#68DA6A', margin: 0, fontWeight: 300 }}>2,400+</h2>
          <p style={{ fontSize: 14 * scale, margin: '5px 0 20px 0', color: '#C7FFB5' }}>Lorem</p>
          <h2 style={{ fontSize: 50 * scale, color: '#68DA6A', margin: 0, fontWeight: 300 }}>80+</h2>
          <p style={{ fontSize: 14 * scale, margin: '5px 0 0 0', color: '#C7FFB5' }}>Lorem ipsum</p>
        </div>
        
        <div style={{ width: '55%', padding: 40 * scale, boxSizing: 'border-box' }}>
          <h3 style={{ fontSize: 16 * scale, textTransform: 'uppercase', margin: '0 0 20px 0' }}>FUSCE POSUERE, MAGNA SED PULVINAR</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 120 * scale, gap: 80 * scale, position: 'relative', borderBottom: '1px solid #ccc' }}>
            <div style={{ width: 100 * scale, position: 'relative' }}>
              <div style={{ height: 30 * scale, background: '#FF451A' }}></div>
              <div style={{ height: 20 * scale, background: '#68DA6A' }}></div>
              <div style={{ position: 'absolute', top: -20 * scale, width: '100%', textAlign: 'center', fontWeight: 'bold' }}>400</div>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '35%', color: 'red' }}>&rarr; +x%</div>
            <div style={{ width: 100 * scale, position: 'relative' }}>
              <div style={{ height: 50 * scale, background: '#FF451A' }}></div>
              <div style={{ height: 40 * scale, background: '#68DA6A' }}></div>
              <div style={{ position: 'absolute', top: -20 * scale, width: '100%', textAlign: 'center', fontWeight: 'bold' }}>600</div>
            </div>
          </div>
          
          <h3 style={{ fontSize: 16 * scale, textTransform: 'uppercase', margin: '40px 0 20px 0' }}>FUSCE POSUERE, MAGNA SED PULVINAR</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 120 * scale, gap: 80 * scale, position: 'relative', borderBottom: '1px solid #ccc' }}>
            <div style={{ width: 100 * scale, position: 'relative' }}>
              <div style={{ height: 40 * scale, background: '#68DA6A' }}></div>
              <div style={{ position: 'absolute', top: -20 * scale, width: '100%', textAlign: 'center', fontWeight: 'bold' }}>100</div>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '35%', color: 'red' }}>&rarr; +x%</div>
            <div style={{ width: 100 * scale, position: 'relative' }}>
              <div style={{ height: 60 * scale, background: '#68DA6A' }}></div>
              <div style={{ position: 'absolute', top: -20 * scale, width: '100%', textAlign: 'center', fontWeight: 'bold' }}>200</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 20 * scale, left: 40 * scale, display: 'flex', gap: 20 * scale, fontSize: 14 * scale, color: '#68DA6A' }}>
        <span style={{ color: 'white' }}>48</span>
        <span style={{ borderBottom: '1px solid #68DA6A' }}>Navigation 1</span>
        <span style={{ color: 'white' }}>Navigation 2</span>
        <span style={{ color: 'white' }}>Navigation 3</span>
      </div>
    </div>
    </foreignObject>
  )
}
