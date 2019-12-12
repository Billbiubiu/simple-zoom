!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SimpleZoom=e():t.SimpleZoom=e()}(this,(function(){return function(t){var e={};function o(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(s,i,function(e){return t[e]}.bind(null,i));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="./",o(o.s=1)}([function(t,e){},function(t,e,o){"use strict";function s(t){(t=t||window.event).preventDefault?t.preventDefault():t.returnValue=!1}function i(t,e){if(typeof t!=typeof e)throw new Error("compare failed, not the same type");if("object"!=typeof t)return t===e;for(let o in t)if("object"!=typeof t[o]){if(t[o]!==e[o])return!1}else i(t[o],e[o]);return!0}function n(t,e){let{offsetTop:o,offsetLeft:s}=t;return Array.from(e).map(t=>({clientX:t.clientX,clientY:t.clientY,force:t.force,identifier:t.identifier,pageX:t.pageX,pageY:t.pageY,radiusX:t.radiusX,radiusY:t.radiusY,rotationAngle:t.rotationAngle,screenX:t.screenX,screenY:t.screenY,offsetX:t.clientX-o,offsetY:t.clientY-s}))}function r(t,e,o,s){let{offsetWidth:i,offsetHeight:n}=t;return{top:o.y-s.y*(e-1),right:(i-s.x)*(1-e)-o.x,bottom:(n-s.y)*(1-e)-o.y,left:o.x-s.x*(e-1)}}o.r(e),o(0),o.d(e,"default",(function(){return l}));const a=Object.assign,h={initZoom:1,minZoom:.1,maxZoom:10,zoomSpeed:.2};class l{constructor(t,e={}){if(!t)throw new Error("please provide a target element!");if("string"==typeof t){if(this.el=document.querySelector(t),!this.el)throw new Error("element not found!")}else if("object"==typeof t){if(o=t,!("object"==typeof HTMLElement?o instanceof HTMLElement:o&&"object"==typeof o&&1===o.nodeType&&"string"==typeof o.nodeName))throw new Error("element is not HTMLElement!");this.el=t}var o;if(!this.el.parentNode||!this.el.parentNode.tagName)throw new Error("element can not be root-element!");if(this.parentNode=this.el.parentNode,this.el.classList.add("simple-zoom-el"),this.parentNode.classList.add("simple-zoom-container"),"object"!=typeof e)throw new Error("options is supposed to be an object!");this.options=a({},h,e),this._internalListeners={mousewheel:this._onMouseWheel.bind(this),DOMMouseScroll:this._onMouseWheel.bind(this),mousedown:this._onMouseDown.bind(this),mousemove:this._onMouseMove.bind(this),mouseup:this._onMouseUp.bind(this),mouseout:this._onMouseUp.bind(this),touchmovestart:this._onTouchMoveStart.bind(this),touchmove:this._onTouchMove.bind(this),touchmoveend:this._onTouchMoveEnd.bind(this),touchzoomstart:this._onTouchZoomStart.bind(this),touchzoom:this._onTouchZoom.bind(this),touchzoomend:this._onTouchZoomEnd.bind(this)},this._onListeners=Object.create(null),this._eventListeners=Object.create(null),this._init()}_init(){this.reset(),this.update(),this.el.addEventListener("mousewheel",this._internalListeners.mousewheel),this.el.addEventListener("DOMMouseScroll",this._internalListeners.DOMMouseScroll),this.el.addEventListener("mousedown",this._internalListeners.mousedown),this.parentNode.addEventListener("touchstart",this._internalListeners.touchmovestart),this.parentNode.addEventListener("touchstart",this._internalListeners.touchzoomstart)}_setTransform(t,e){let{x:o,y:s}=e;this.el.style.transform=`scale(${t}) translate(${o/t}px,${s/t}px)`}_setTransformOrigin(t){let{x:e,y:o}=t;this.el.style.transformOrigin=`${e}px ${o}px`}_excuteListeners(t,e){if(this._onListeners[t])try{this._onListeners[t](e)}catch(t){console.warn(t)}this._eventListeners[t]&&this._eventListeners[t].length&&this._eventListeners[t].forEach(t=>{try{t(e)}catch(t){console.warn(t)}})}_onMouseWheel(t){let{minZoom:e,maxZoom:o,zoomSpeed:i}=this.options,{zoomLock:n,positionLock:h,zoom:l,translate:u,transformOrigin:c}=this.state;if(n)return;s(t),function(t){(t=t||window.event).stopPropagation?t.stopPropagation():t.cancelBubble=!0}(t);let{offsetX:m,offsetY:f}=t,d=l+Math.max(-1,Math.min(1,t.wheelDelta||-t.detail))*i;if(d<e?(d=Math.max(e-i,0),setTimeout(()=>{this.setState(a({},this.state,{zoom:e}))},300)):d>o?(d=o+i,setTimeout(()=>{this.setState(a({},this.state,{zoom:o}))},300)):Math.abs(d-1)<i/2&&(d=1),d<=1)h=!0,u={x:0,y:0},c={x:this.el.offsetWidth/2,y:this.el.offsetHeight/2};else{h=!1,c={x:m,y:f};let t=r(this.el,d,u,c);for(let e in t)if(t[e]>0)switch(e){case"top":u.y-=t.top;break;case"right":u.x+=t.right;break;case"bottom":u.y+=t.bottom;break;case"left":u.x-=t.left}}this.setState(a({},this.state,{positionLock:h,zoom:d,translate:u,transformOrigin:c}))}_onMouseDown(t){let{positionLock:e,translate:o}=this.state;if(e)return;s(t);let{clientX:i,clientY:n}=t;this.setState(a({},this.state,{isMouseMoving:!0,moveStart:{x:i,y:n},movingTranslate:a({},o)})),this.el.classList.add("move"),this.el.addEventListener("mousemove",this._internalListeners.mousemove),this.el.addEventListener("mouseup",this._internalListeners.mouseup),this.el.addEventListener("mouseout",this._internalListeners.mouseout)}_onMouseMove(t){let{zoom:e,translate:o,movingTranslate:i,transformOrigin:n,moveStart:h}=this.state;s(t);let{clientX:l,clientY:u}=t,c={x:o.x+(l-h.x),y:o.y+(u-h.y)},m=r(this.el,e,c,n);for(let t in m)if(m[t]>0)switch(t){case"top":c.y=n.y*(e-1);break;case"right":c.x=(this.el.offsetWidth-n.x)*(1-e);break;case"bottom":c.y=(this.el.offsetHeight-n.y)*(1-e);break;case"left":c.x=n.x*(e-1)}this.setState(a({},this.state,{movingTranslate:c}))}_onMouseUp(){let{movingTranslate:t}=this.state;this.setState(a({},this.state,{translate:a({},t),isMouseMoving:!1})),this.el.classList.remove("move"),this.el.removeEventListener("mousemove",this._internalListeners.mousemove),this.el.removeEventListener("mouseup",this._internalListeners.mouseup),this.el.removeEventListener("mouseout",this._internalListeners.mouseout)}_onTouchMoveStart(t){let{positionLock:e,isTouchZoom:o,translate:i}=this.state;e||o||(s(t),2!==n(this.parentNode,t.touches).length&&(this.state.touchTimer=setTimeout(()=>{let e=t.touches[0],{clientX:o,clientY:s}=e;this.setState(a({},this.state,{touchTimer:null,isTouchMoving:!0,touchStart:{x:o,y:s},movingTranslate:a({},i)})),this.parentNode.addEventListener("touchmove",this._internalListeners.touchmove),this.parentNode.addEventListener("touchend",this._internalListeners.touchmoveend)},100)))}_onTouchMove(t){let{zoom:e,translate:o,touchStart:i,movingTranslate:h,transformOrigin:l}=this.state;s(t);let u=n(this.parentNode,t.touches),{clientX:c,clientY:m}=u[0],f={x:o.x+(c-i.x),y:o.y+(m-i.y)},d=r(this.el,e,f,l);for(let t in d)if(d[t]>0)switch(t){case"top":f.y=l.y*(e-1);break;case"right":f.x=(this.el.offsetWidth-l.x)*(1-e);break;case"bottom":f.y=(this.el.offsetHeight-l.y)*(1-e);break;case"left":f.x=l.x*(e-1)}this.setState(a({},this.state,{movingTranslate:f}))}_onTouchMoveEnd(){let{movingTranslate:t}=this.state;this.setState(a({},this.state,{translate:a({},t),isTouchMoving:!1})),this.parentNode.removeEventListener("touchmove",this._internalListeners.touchmove),this.parentNode.removeEventListener("touchend",this._internalListeners.touchmoveend)}_onTouchZoomStart(t){let{zoomLock:e,touchTimer:o,isTouchMoving:i}=this.state;if(e||i)return;s(t);let r=n(this.parentNode,t.touches);if(2===r.length){o&&window.clearTimeout(o);let[t,e]=r;this.setState(a({},this.state,{touchTimer:null,isTouchZoom:!0,touchDistance:Math.sqrt(Math.pow(t.offsetX-e.offsetX,2)+Math.pow(t.offsetY-e.offsetY,2))})),this.parentNode.addEventListener("touchmove",this._internalListeners.touchzoom),this.parentNode.addEventListener("touchend",this._internalListeners.touchzoomend)}}_onTouchZoom(t){s(t);let{minZoom:e,maxZoom:o,zoomSpeed:i}=this.options,{positionLock:h,zoom:l,translate:u,transformOrigin:c,touchZoomTimer:m,touchDistance:f}=this.state,d=n(this.parentNode,t.touches),p=d.length,[v,y]=d;if(1===p)return void this._onTouchZoomEnd();if(m)return;this.state.touchZoomTimer=setTimeout(()=>{this.state.touchZoomTimer=null},100);let g=Math.sqrt(Math.pow(v.offsetX-y.offsetX,2)+Math.pow(v.offsetY-y.offsetY,2)),L=l*(g/f);if(L<e?L=e:L>o?L=o:Math.abs(L-1)<i/2&&(L=1),L<=1)h=!0,u={x:0,y:0},c={x:this.el.offsetWidth/2,y:this.el.offsetHeight/2};else{h=!1,c={x:(v.offsetX+y.offsetX)/2,y:(v.offsetY+y.offsetY)/2};let t=r(this.el,L,u,c);for(let e in t)if(t[e]>0)switch(e){case"top":u.y-=t.top;break;case"right":u.x+=t.right;break;case"bottom":u.y+=t.bottom;break;case"left":u.x-=t.left}}this.setState(a({},this.state,{positionLock:h,zoom:L,translate:u,transformOrigin:c,touchDistance:g}))}_onTouchZoomEnd(){this.setState(a({},this.state,{isTouchZoom:!1})),this.parentNode.removeEventListener("touchmove",this._internalListeners.touchzoom),this.parentNode.removeEventListener("touchmoveend",this._internalListeners.touchzoomend)}reset(){let{initZoom:t}=this.options,e={zoomLock:!1,positionLock:!0,zoom:t,translate:{x:0,y:0},movingTranslate:{x:0,y:0},transformOrigin:{x:0,y:0},isMouseMoving:!1,moveStart:{x:0,y:0},touchTimer:null,isTouchMoving:!1,isTouchZoom:!1,touchStart:{x:0,y:0},touchZoomTimer:null,touchDistance:0};1!==t&&(e.transformOrigin={x:this.el.offsetWidth/2,y:this.offsetHeight/2}),this.setState(e)}update(){let{zoom:t,translate:e,transformOrigin:o}=this.state;this._setTransform(t,e),this._setTransformOrigin(o)}setState(t){this.state=this.state||t;let e=t.isMouseMoving||t.isTouchMoving,o=!i(this.state.zoom,t.zoom),s=!i(this.state.translate,t.translate),n=!i(this.state.transformOrigin,t.transformOrigin);this.state=a({},this.state,t),e?this._setTransform(t.zoom,t.movingTranslate):(o||s)&&this._setTransform(t.zoom,t.translate),n&&this._setTransformOrigin(t.transformOrigin);let r=Date.now();(e||s)&&this._excuteListeners("move",{type:"move",data:t,timestamp:r}),o&&this._excuteListeners("zoom",{type:"zoom",data:t,timestamp:r}),n&&this._excuteListeners("origin-change",{type:"origin-change",data:t,timestamp:r})}on(t,e){if("string"!=typeof t)throw new Error("event type must be a string");if("function"!=typeof e)throw new Error("event callback type must be a string");this._onListeners[t]=e}off(t){this._onListeners[t]=()=>{}}addEventListener(t,e){if("string"!=typeof t)throw new Error("event type must be a string");if("function"!=typeof e)throw new Error("event callback type must be a string");this._eventListeners[t]?this._eventListeners[t].push(e):this._eventListeners[t]=[e]}removeEventListener(t,e){this._eventListeners[t]&&this._eventListeners[t].length&&(this._eventListeners[t]=this._eventListeners[t].filter(t=>t!==e))}}}]).default}));