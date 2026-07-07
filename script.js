'use strict';
const img=document.getElementById('screen');
const layer=document.getElementById('hotspots');
const stage=document.getElementById('stage');
const stack=[];
const screens={
  home:'images/home.png',production:'images/production.png',inventory:'images/inventory.png',ordering:'images/ordering.png',freshstart:'images/freshstart.png',safety:'images/safety.png',labor:'images/labor.png',sales:'images/sales.png',shrink:'images/shrink.png',foodsafety:'images/foodsafety.png',scorecard:'images/store_scorecard.png',composite:'images/composite.png',maximo:'images/maximo.png',storeleader:'images/storeleader.png',center:'images/center.png',meat:'images/meat-notifications.png',deli:'images/deli-notifications.png',bakery:'images/bakery-notifications.png',frontend:'images/frontend.png',operations:'images/operations.png',sandf:'images/sandf.png',replenishment:'images/replenishment.png',people:'images/people.png',temp1:'images/temp_1.png',temp2:'images/temp_2.png',temp3:'images/temp_3.png',temp4:'images/temp_4.png',temp5:'images/temp_5.png',temp6:'images/temp_6.png'
};
const order=['home','production','temp1','inventory','ordering','freshstart','safety','labor','sales','shrink','foodsafety','scorecard','composite','maximo','storeleader','center','meat','deli','bakery','frontend','operations','sandf','replenishment','people'];
let current='home',locked=false;
Object.values(screens).forEach(src=>{const p=new Image();p.decoding='async';p.src=src;});
function px(v){return v+'%'}
function add(x,y,w,h,fn,cls=''){const b=document.createElement('button');b.className='hotspot '+cls;b.style.left=px(x);b.style.top=px(y);b.style.width=px(w);b.style.height=px(h);b.addEventListener('click',fn,{passive:true});layer.appendChild(b);return b}
function go(name,{push=true}={}){if(!screens[name]||locked||name===current)return;locked=true;if(push&&current)stack.push(current);document.body.classList.add('leaving');setTimeout(()=>{current=name;img.src=screens[name];stage.scrollTo({top:0,left:0,behavior:'instant'});render();document.body.classList.remove('leaving');setTimeout(()=>locked=false,90)},90)}
function back(){const n=stack.pop()||'home';go(n,{push:false})}
function home(){stack.length=0;go('home',{push:false})}
function nextTemp(){const i=['temp1','temp2','temp3','temp4','temp5','temp6'].indexOf(current); if(i>=0&&i<5)go(['temp1','temp2','temp3','temp4','temp5','temp6'][i+1]); else home();}
function render(){layer.innerHTML=''; const commonBack=()=>add(0,0,22,12,back); const commonBell=()=>add(78,0,22,12,()=>go('storeleader'));
 if(current==='home'){
  // top summary cards / console
  add(2,21,96,21,()=>go('storeleader'));
  add(4,35,92,8,()=>go('composite'));
  // six equal score tiles (top-right tile routes to associate temperature module per request)
  add(2.5,43.1,30.5,12.7,()=>go('scorecard')); add(34.8,43.1,30.5,12.7,()=>go('storeleader')); add(67,43.1,30.5,12.7,()=>go('temp1'));
  add(2.5,57,30.5,12.7,()=>go('temp1')); add(34.8,57,30.5,12.7,()=>go('sales')); add(67,57,30.5,12.7,()=>go('labor'));
  // ten equal operational tiles
  const xs=[2.5,22.2,41.9,61.6,81.3], y1=73.5, y2=83.9, w=16.9, h=7.4;
  [['production',0],['temp1',1],['inventory',2],['ordering',3],['freshstart',4]].forEach(([n,i])=>add(xs[i],y1,w,h,()=>go(n)));
  [['safety',0],['labor',1],['sales',2],['shrink',3],['foodsafety',4]].forEach(([n,i])=>add(xs[i],y2,w,h,()=>go(n)));
  // bottom nav
  add(0,91.5,22,8.5,()=>{document.querySelector('.hotspot')?.classList.add('micPulse')}); add(22,91.5,20,8.5,()=>go('storeleader')); add(42,91.5,27,8.5,()=>go('composite')); add(69,91.5,31,8.5,()=>go('maximo'));
  return;
 }
 commonBack(); commonBell();
 // bottom home areas on screens that have them
 add(28,91,44,9,home);
 // screen-specific forward actions
 if(current==='production'){add(5,88,90,7,()=>go('shrink'))}
 if(current==='shrink'){add(0,92,25,8,back);add(35,92,30,8,home)}
 if(current==='inventory'){add(0,88,30,12,home);add(30,86,40,14,()=>go('storeleader'));add(70,88,30,12,()=>go('storeleader'))}
 if(current==='ordering'){add(3,84,94,13,()=>go('storeleader'))}
 if(current==='freshstart'){add(0,92,20,8,home);add(20,92,20,8,()=>go('storeleader'));add(40,92,20,8,()=>go('storeleader'));add(60,92,20,8,()=>go('people'));add(80,92,20,8,()=>go('people'))}
 if(current==='safety'){add(3,79,94,14,()=>go('storeleader'))}
 if(current==='sales'){add(0,91,24,9,back);add(35,91,30,9,home);add(72,91,28,9,()=>go('operations'))}
 if(current==='scorecard'){add(0,91,20,9,()=>go('sales'));add(20,91,20,9,()=>go('shrink'));add(40,91,20,9,()=>go('production'));add(60,91,20,9,()=>go('safety'));add(80,91,20,9,()=>go('foodsafety'));add(55,65,40,11,()=>go('composite'))}
 if(current==='composite'){add(0,91,29,9,()=>go('sales'));add(35,91,30,9,home);add(65,91,35,9,()=>go('operations'));add(72,80,25,9,()=>go('storeleader'))}
 if(current==='operations'){add(0,92,25,8,()=>go('sales'));add(35,92,30,8,home);add(70,92,30,8,()=>go('people'))}
 if(current==='storeleader'||current==='center'||current==='meat'||current==='deli'||current==='bakery'||current==='frontend'){add(2,16,96,82,()=>go('storeleader'))}
 if(current==='maximo'){add(3,16,94,80,()=>go('storeleader'))}
 if(current==='temp1'){add(2,45,96,10,()=>go('temp2'));add(3,69,94,8,nextTemp)}
 if(current==='temp2'){add(3,54,94,12,nextTemp);add(3,88,94,7,nextTemp)}
 if(current==='temp3'){add(3,44,94,8,nextTemp);add(3,79,94,8,nextTemp)}
 if(current==='temp4'){add(3,58,94,10,nextTemp)}
 if(current==='temp5'){add(3,71,94,9,nextTemp)}
 if(current==='temp6'){add(3,74,94,9,home)}
}
let startX=0,startY=0;stage.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY},{passive:true});stage.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.6){if(dx>0)back();else{const i=order.indexOf(current);go(order[(i+1)%order.length])}}},{passive:true});
window.addEventListener('keydown',e=>{if(e.key==='Escape'||e.key==='Backspace')back(); if(e.key==='Home')home();});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
img.onload=()=>{stage.scrollTo(0,0);};img.src=screens.home;render();
