import React, { useState } from 'react'
import Game from './Game'

export default function App(){
  const [mode, setMode] = useState<'timing'|'swipe'>('timing')
  return (
    <div className="app">
      <h1>Cricket 3D Prototype — RCB vs CSK</h1>
      <div style={{display:'flex',gap:12}}>
        <div style={{flex:1}}>
          <div className="panel">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div className="score">RCB vs CSK</div>
                <div>Overs: 4 (demo)</div>
              </div>
              <div className="toggle">
                <label style={{marginRight:8}}>Controls:</label>
                <select value={mode} onChange={e=>setMode(e.target.value as any)}>
                  <option value="timing">Timing Bar</option>
                  <option value="swipe">Mouse Swipe</option>
                </select>
              </div>
            </div>
            <div className="controls">
              <button className="btn" onClick={() => window.location.reload()}>Reset</button>
            </div>
          </div>
          <div style={{height:12}} />
          <Game controlMode={mode} />
        </div>
        <div style={{width:320}}>
          <div className="panel">
            <h3>Instructions</h3>
            <ul>
              <li>Choose control mode (Timing or Swipe)</li>
              <li>Timing: press <b>Space</b> or click on the bar to hit at the right moment</li>
              <li>Swipe: Click-drag on canvas to set shot direction & power, release to hit</li>
              <li>Timing determines shot quality. Better timing = better contact.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}