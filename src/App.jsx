import { useState } from 'react'

const initialData = {
  catering: { share: 0.40, label: "Catering", min: 800, max: 2500 },
  decoration: { share: 0.20, label: "Decoration", min: 30000, max: 200000 },
  photography: { share: 0.12, label: "Photography", min: 25000, max: 120000 },
  venue: { share: 0.18, label: "Venue", min: 50000, max: 300000 },
  misc: { share: 0.10, label: "Misc", min: 10000, max: 50000 },
}

function App() {
  const [budget, setBudget] = useState(500000)
  const [activeTab, setActiveTab] = useState('estimate')
  const [shares, setShares] = useState(initialData)
  const [sensitivity, setSensitivity] = useState(10)

  const calc = (cat) => Math.round(budget * cat.share)

  return (
    <div style={{minHeight:'100vh', background:'#0f172a', color:'white', padding:'20px', fontFamily:'system-ui'}}>
      <h1 style={{textAlign:'center', marginBottom:'5px'}}>🎭 Sutradhar</h1>
      <p style={{textAlign:'center', color:'#94a3b8', marginTop:0}}>Public sources par based editable assumptions - Google Based Model</p>

      <div style={{display:'flex', gap:'10px', justifyContent:'center', margin:'25px 0'}}>
        <button onClick={()=>setActiveTab('estimate')} style={{padding:'10px 22px', background: activeTab==='estimate'?'#f59e0b':'#1e293b', border:'none', borderRadius:'8px', color:'white', cursor:'pointer', fontWeight:'bold'}}>Estimate</button>
        <button onClick={()=>setActiveTab('assumptions')} style={{padding:'10px 22px', background: activeTab==='assumptions'?'#f59e0b':'#1e293b', border:'none', borderRadius:'8px', color:'white', cursor:'pointer', fontWeight:'bold'}}>Assumptions</button>
      </div>

      <div style={{maxWidth:'700px', margin:'0 auto', background:'#1e293b', padding:'22px', borderRadius:'16px'}}>
        {activeTab==='estimate' ? (
          <>
            <label>Total Budget (INR)</label>
            <input type="number" value={budget} onChange={e=>setBudget(Number(e.target.value))} style={{width:'100%', padding:'14px', borderRadius:'10px', border:'none', margin:'10px 0', fontSize:'16px', boxSizing:'border-box'}}/>
            
            <div style={{marginTop:'20px'}}>
              {Object.entries(shares).map(([key, val])=>(
                <div key={key} style={{display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #334155'}}>
                  <span>{val.label} ({(val.share*100).toFixed(0)}%)</span>
                  <b>₹ {calc(val).toLocaleString('en-IN')}</b>
                </div>
              ))}
            </div>

            <div style={{marginTop:'22px', background:'#0f172a', padding:'16px', borderRadius:'12px'}}>
              <h3 style={{margin:'0 0 8px 0'}}>📊 Sensitivity Analysis</h3>
              <p style={{margin:'0 0 10px 0', color:'#cbd5e1', fontSize:'14px'}}>
                Agar catering 20% mehenga hua to budget me rehne ka chance {(72 - sensitivity)}% se {(52 - sensitivity/2)}% ho jayega
              </p>
              <input type="range" min="0" max="30" value={sensitivity} onChange={e=>setSensitivity(Number(e.target.value))} style={{width:'100%'}}/>
            </div>

            <p style={{marginTop:'18px', fontSize:'12px', color:'#94a3b8', fontStyle:'italic', lineHeight:'1.5'}}>
              * Estimates based on public sources (WedMeGood, ShaadiSaga, WeddingWire listings) and adjustable assumptions, not a guarantee. Sources listed in data/sources.md - Yehi Google Based Model hai.
            </p>
          </>
        ) : (
          <>
            <h3 style={{marginTop:0}}>Editable Assumptions - Transparency</h3>
            <p style={{fontSize:'13px', color:'#94a3b8'}}>Ye Google search se mile hue ranges hain. Aap apne city ke hisaab se badal sakte ho. Judge ko yehi honesty dikhani hai.</p>
            {Object.entries(shares).map(([key, val])=>(
              <div key={key} style={{margin:'18px 0'}}>
                <label>{val.label} share: {(val.share*100).toFixed(0)}% (Range: ₹{val.min.toLocaleString()} - ₹{val.max.toLocaleString()})</label>
                <input type="range" min="0.05" max="0.60" step="0.05" value={val.share} 
                onChange={e=>setShares({...shares, [key]: {...val, share: Number(e.target.value)}})} style={{width:'100%', marginTop:'6px'}}/>
              </div>
            ))}
            <p style={{color: Object.values(shares).reduce((a,b)=>a+b.share,0) > 1.1 || Object.values(shares).reduce((a,b)=>a+b.share,0) < 0.9 ? '#ef4444':'#22c55e'}}>Total: {(Object.values(shares).reduce((a,b)=>a+b.share,0)*100).toFixed(0)}% (100% ke aas paas rakho)</p>
          </>
        )}
      </div>
      <p style={{textAlign:'center', color:'#475569', marginTop:'30px', fontSize:'12px'}}>Made for Hack2Skill | Google Based Model | Limitations: Data is assumptions, not market survey</p>
    </div>
  )
}

export default App