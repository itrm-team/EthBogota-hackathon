(self.webpackChunkMultiCash=self.webpackChunkMultiCash||[]).push([[1296],{1296:(e,t,i)=>{"use strict";i.r(t),i.d(t,{KEYBOARD_DID_CLOSE:()=>o,KEYBOARD_DID_OPEN:()=>s,copyVisualViewport:()=>D,keyboardDidClose:()=>c,keyboardDidOpen:()=>l,keyboardDidResize:()=>w,resetKeyboardAssist:()=>r,setKeyboardClose:()=>g,setKeyboardOpen:()=>b,startKeyboardAssist:()=>n,trackViewportChanges:()=>y});const s="ionKeyboardDidShow",o="ionKeyboardDidHide";let a={},d={},h=!1;const r=()=>{a={},d={},h=!1},n=e=>{p(e),e.visualViewport&&(d=D(e.visualViewport),e.visualViewport.onresize=()=>{y(e),l()||w(e)?b(e):c(e)&&g(e)})},p=e=>{e.addEventListener("keyboardDidShow",t=>b(e,t)),e.addEventListener("keyboardDidHide",()=>g(e))},b=(e,t)=>{u(e,t),h=!0},g=e=>{f(e),h=!1},l=()=>!h&&a.width===d.width&&(a.height-d.height)*d.scale>150,w=e=>h&&!c(e),c=e=>h&&d.height===e.innerHeight,u=(e,t)=>{const i=new CustomEvent(s,{detail:{keyboardHeight:t?t.keyboardHeight:e.innerHeight-d.height}});e.dispatchEvent(i)},f=e=>{const t=new CustomEvent(o);e.dispatchEvent(t)},y=e=>{a=Object.assign({},d),d=D(e.visualViewport)},D=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale})}}]);