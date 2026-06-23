const v=document.getElementById('view');
function go(page){
 if(page==='home') return home();
 if(page==='temperature') return temperatureStart();
 if(page==='leader') return leader();
 if(page==='metrics') return metrics();
}
function home(){v.innerHTML=`
 <div class="priority"><div><small>CURRENT PRIORITY</small><div style="font-size:42px">⚠️</div><h2>Hot Holding<br>Temperature Check</h2><small>Deli • Hot Case</small><br><br><span class="badge">HIGH PRIORITY</span></div></div>
 <div class="grid">
  ${tile('📋','Missions','temperature')} ${tile('🎓','Training','training')} ${tile('🔄','Fresh Start','fresh')} ${tile('📦','Orders','orders')} ${tile('🛒','Replenishment','replenish')} ${tile('🔔','Alerts <span class="alert-dot">3</span>','alerts')} ${tile('🌡️','Temperature','temperature')} ${tile('📊','Metrics','metrics')}
 </div>
 <div class="card" style="margin-top:12px"><span class="check">✓</span> All Systems Operational<br><span class="muted">Last Sync: 9:13 AM</span></div>`}
function tile(icon,label,page){return `<button class="tile" onclick="go('${page}')"><span class="icon">${icon}</span>${label}</button>`}
function temperatureStart(){v.innerHTML=`
 <div class="card white"><h2 class="mission-title">Hot Holding Temperature Check</h2><p><b>Assigned To:</b> Alex M.</p><p><b>Department:</b> Deli</p><p><b>Location:</b> Hot Case</p><p><b>Target:</b> 165°F or above</p></div>
 <div class="card"><h3>F.R.I.E.N.D. Guidance</h3><p>Verify product temperature and record the exact reading.</p></div>
 <button class="btn" onclick="temperatureEquipment()">Start Mission</button>`}
function temperatureEquipment(){v.innerHTML=`
 <h2>Select Equipment</h2><button class="card white btnlike" onclick="temperatureReading()"><div class="row"><b>Probe Thermometer</b><span class="check">✓</span></div><p>Use sanitized probe thermometer for accurate results.</p></button>
 <button class="card btnlike" onclick="temperatureReading()"><div class="row"><b>Infrared Thermometer</b><span></span></div><p class="muted">Not recommended for internal product temp.</p></button>
 <button class="btn" onclick="temperatureReading()">Continue</button>`}
function temperatureReading(){v.innerHTML=`
 <div class="card white"><h2>Take Temperature</h2><p>Insert probe and take reading.</p><div class="row"><b>Product</b><span>Chicken Tenders</span></div><div class="row"><b>Target</b><span>165°F or above</span></div></div>
 <div class="temp">171°F</div><div style="text-align:center"><span class="badge" style="background:#22a447">IN RANGE</span></div>
 <button class="btn green" onclick="temperatureLocation()">Save Temperature</button>`}
function temperatureLocation(){v.innerHTML=`
 <h2>Record Location</h2><div class="list">
 ${loc('Deli Hot Case',true)}${loc('Chicken Station')} ${loc('Soup Bar')} ${loc('Rotisserie Area')} ${loc('Grab & Go Case')}
 </div><button class="btn" onclick="complete()">Continue</button>`}
function loc(name,on=false){return `<button class="card white" style="width:100%;margin:7px 0"><div class="row"><b>${name}</b><span>${on?'●':'○'}</span></div></button>`}
function complete(){v.innerHTML=`
 <div class="priority green"><div><div style="font-size:52px">✓</div><h2>Mission Complete</h2><small>Hot Holding Temperature Check</small></div></div>
 <div class="card white"><div class="row"><b>Temperature</b><span>171°F</span></div><div class="row"><b>Requirement</b><span>165°F+</span></div><div class="row"><b>Status</b><span class="check">Compliant</span></div><div class="row"><b>Leader</b><span>Jamie R. Notified</span></div></div>
 <button class="btn" onclick="leader()">View Leader Visibility</button>`}
function leader(){v.innerHTML=`
 <h2>Jamie R. Leader Dashboard</h2><div class="card white"><h3><span class="check">✓</span> Temperature Mission Complete</h3><div class="row"><b>Associate</b><span>Alex M.</span></div><div class="row"><b>Location</b><span>Deli Hot Case</span></div><div class="row"><b>Temperature</b><span>171°F</span></div><div class="row"><b>Requirement</b><span>165°F+</span></div><div class="row"><b>Status</b><span class="check">Compliant</span></div></div>
 <div class="grid" style="margin-top:12px">${tile('👥','Team Readiness','metrics')}${tile('📋','Open Missions','temperature')}${tile('🛡️','Compliance','metrics')}${tile('💬','Coaching','metrics')}</div>`}
function metrics(){v.innerHTML=`<h2>Division Metrics</h2><div class="metric"><div class="card"><b>155</b><br>Stores</div><div class="card"><b>22,000+</b><br>Associates</div><div class="card"><b>94%</b><br>Readiness</div><div class="card"><b>98%</b><br>Compliance</div><div class="card"><b>42</b><br>Active Missions</div><div class="card"><b>5.6x</b><br>Projected ROI</div></div><button class="btn gold" onclick="home()">Return to Dynamic Priority Circle</button>`}
function training(){v.innerHTML='<h2>Training</h2><div class="card">Micro-learning and Fresh Start content coming next.</div>'}
function fresh(){v.innerHTML='<h2>Fresh Start</h2><div class="card">Opening readiness missions and daily standards.</div>'}
function orders(){v.innerHTML='<h2>Orders</h2><div class="card">Order guidance and priority fill support.</div>'}
function replenish(){v.innerHTML='<h2>Replenishment</h2><div class="card">Display standards, fill levels, and completion checks.</div>'}
function alerts(){v.innerHTML='<h2>Alerts</h2><div class="card white"><b>3 Active Alerts</b><p>Temperature check due, Fresh Start incomplete, production follow-up.</p></div>'}
home();
