// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ./lang ./maybe ./accessorSupport/ensureType ./accessorSupport/decorators/property ./accessorSupport/decorators/subclass ./ObjectPool ./ArrayPool ./scheduling ./Evented".split(" "),function(y,z,J,D,E,F,G,K,w,L,M){function A(f){return f?f instanceof x?f.toArray():f.length?Array.prototype.slice.apply(f):[]:[]}function B(f){if(f&&f.length)return f[0]}function H(f,l,c,a){l&&l.forEach((b,d,g)=>{f.push(b);H(f,c.call(a,b,d,g),c,a)})}var r;let N=
function(){function f(){this.target=null;this.defaultPrevented=this.cancellable=!1;this.type=this.item=void 0}var l=f.prototype;l.preventDefault=function(){this.cancellable&&(this.defaultPrevented=!0)};l.reset=function(c){this.defaultPrevented=!1;this.item=c};return f}();const q=new K(N,void 0,f=>{f.item=null;f.target=null;f.defaultPrevented=!1;f.cancellable=!1}),O=()=>{},t=new Set,u=new Set,v=new Set,C=new Map;let P=0,x=r=function(f){function l(a){a=f.call(this,a)||this;a._chgListeners=[];a._notifications=
null;a._timer=null;a.length=0;a._items=[];Object.defineProperty(y._assertThisInitialized(a),"uid",{value:P++});return a}y._inheritsLoose(l,f);l.isCollection=function(a){return null!=a&&a instanceof r};var c=l.prototype;c.normalizeCtorArgs=function(a){return a?Array.isArray(a)||a instanceof r?{items:a}:a:{}};c[Symbol.iterator]=function*(){yield*this.items};c.hasEventListener=function(a){return"change"===a?0<this._chgListeners.length:this._emitter.hasEventListener(a)};c.on=function(a,b){if("change"===
a){const d=this._chgListeners,g={removed:!1,callback:b};d.push(g);this._notifications&&this._notifications.push({listeners:d.slice(),items:this._items.slice(),changes:[]});return{remove(){this.remove=O;g.removed=!0;d.splice(d.indexOf(g),1)}}}return this._emitter.on(a,b)};c.once=function(a,b){const d=this.on(a,b);return{remove(){d.remove()}}};c.add=function(a,b){if(this._emitBeforeChanges(1))return this;b=this.getNextIndex(null!=b?b:null);this._splice(b,0,a);this._emitAfterChanges(1);return this};
c.addMany=function(a,b=this._items.length){if(!a||!a.length||this._emitBeforeChanges(1))return this;b=this.getNextIndex(b);this._splice(b,0,...A(a));this._emitAfterChanges(1);return this};c.removeAll=function(){if(!this.length||this._emitBeforeChanges(2))return[];const a=this._splice(0,this.length)||[];this._emitAfterChanges(2);return a};c.clone=function(){return this._createNewInstance({items:this._items.map(J.clone)})};c.concat=function(...a){a=a.map(A);return this._createNewInstance({items:this._items.concat(...a)})};
c.drain=function(a,b){if(this.length&&!this._emitBeforeChanges(2)){var d=D.assumeNonNull(this._splice(0,this.length)),g=d.length;for(let n=0;n<g;n++)a.call(b,d[n],n,d);this._emitAfterChanges(2)}};c.every=function(a,b){return this._items.every(a,b)};c.filter=function(a,b){let d;d=2===arguments.length?this._items.filter(a,b):this._items.filter(a);return this._createNewInstance({items:d})};c.find=function(a,b){return this._items.find(a,b)};c.findIndex=function(a,b){return this._items.findIndex(a,b)};
c.flatten=function(a,b){const d=[];H(d,this,a,b);return new r(d)};c.forEach=function(a,b){return this._items.forEach(a,b)};c.getItemAt=function(a){return this._items[a]};c.getNextIndex=function(a){const b=this.length;a=null==a?b:a;0>a?a=0:a>b&&(a=b);return a};c.includes=function(a,b=0){return this._items.includes(a,b)};c.indexOf=function(a,b=0){return this._items.indexOf(a,b)};c.join=function(a=","){return this._items.join(a)};c.lastIndexOf=function(a,b=this.length-1){return this._items.lastIndexOf(a,
b)};c.map=function(a,b){a=this._items.map(a,b);return new r({items:a})};c.reorder=function(a,b=this.length-1){const d=this.indexOf(a);if(-1!==d){0>b?b=0:b>=this.length&&(b=this.length-1);if(d!==b){if(this._emitBeforeChanges(4))return a;this._splice(d,1);this._splice(b,0,a);this._emitAfterChanges(4)}return a}};c.pop=function(){if(this.length&&!this._emitBeforeChanges(2)){var a=B(this._splice(this.length-1,1));this._emitAfterChanges(2);return a}};c.push=function(...a){if(this._emitBeforeChanges(1))return this.length;
this._splice(this.length,0,...a);this._emitAfterChanges(1);return this.length};c.reduce=function(a,b){const d=this._items;return 2===arguments.length?d.reduce(a,b):d.reduce(a)};c.reduceRight=function(a,b){const d=this._items;return 2===arguments.length?d.reduceRight(a,b):d.reduceRight(a)};c.remove=function(a){return this.removeAt(this.indexOf(a))};c.removeAt=function(a){if(!(0>a||a>=this.length||this._emitBeforeChanges(2)))return a=B(this._splice(a,1)),this._emitAfterChanges(2),a};c.removeMany=function(a){if(!a||
!a.length||this._emitBeforeChanges(2))return[];a=a instanceof r?a.toArray():a;const b=this._items,d=[],g=a.length;for(let h=0;h<g;h++){var n=b.indexOf(a[h]);if(-1<n){{var m=h+1;var k=n+1;const p=Math.min(a.length-m,b.length-k);let e=0;for(;e<p&&a[m+e]===b[k+e];)e++;m=e}m=1+m;(n=this._splice(n,m))&&0<n.length&&d.push.apply(d,n);h+=m-1}}this._emitAfterChanges(2);return d};c.reverse=function(){if(this._emitBeforeChanges(4))return this;const a=this._splice(0,this.length);a&&(a.reverse(),this._splice(0,
0,...a));this._emitAfterChanges(4);return this};c.shift=function(){if(this.length&&!this._emitBeforeChanges(2)){var a=B(this._splice(0,1));this._emitAfterChanges(2);return a}};c.slice=function(a=0,b=this.length){return this._createNewInstance({items:this._items.slice(a,b)})};c.some=function(a,b){return this._items.some(a,b)};c.sort=function(a){if(!this.length||this._emitBeforeChanges(4))return this;const b=D.assumeNonNull(this._splice(0,this.length));arguments.length?b.sort(a):b.sort();this._splice(0,
0,...b);this._emitAfterChanges(4);return this};c.splice=function(a,b,...d){const g=(b?2:0)|(d.length?1:0);if(this._emitBeforeChanges(g))return[];a=this._splice(a,b,...d)||[];this._emitAfterChanges(g);return a};c.toArray=function(){return this._items.slice()};c.toJSON=function(){return this.toArray()};c.toLocaleString=function(){return this._items.toLocaleString()};c.toString=function(){return this._items.toString()};c.unshift=function(...a){if(!a.length||this._emitBeforeChanges(1))return this.length;
this._splice(0,0,...a);this._emitAfterChanges(1);return this.length};c._createNewInstance=function(a){return new this.constructor(a)};c._splice=function(a,b,...d){const g=this._items;var n=this.constructor.prototype.itemType;let m=void 0;!this._notifications&&this.hasEventListener("change")&&(this._notifications=[{listeners:this._chgListeners.slice(),items:this._items.slice(),changes:[]}],this._timer&&this._timer.remove(),this._timer=L.schedule(()=>this._dispatchChange()));if(b){m=g.splice(a,b);if(this.hasEventListener("before-remove")){var k=
q.acquire();k.target=this;k.cancellable=!0;for(let e=0,I=m.length;e<I;e++)b=m[e],k.reset(b),this.emit("before-remove",k),k.defaultPrevented&&(m.splice(e,1),g.splice(a,0,b),a+=1,--e,--I);q.release(k)}this.length=this._items.length;if(this.hasEventListener("after-remove")){b=q.acquire();b.target=this;b.cancellable=!1;k=m.length;for(let e=0;e<k;e++)b.reset(m[e]),this.emit("after-remove",b);q.release(b)}}if(d&&d.length){if(n){b=[];for(var h of d)d=n.ensureType(h),null==d&&null!=h||b.push(d);d=b}n=this.hasEventListener("before-add");
h=this.hasEventListener("after-add");b=a===this.length;if(n||h){var p=q.acquire();p.target=this;p.cancellable=!0;k=q.acquire();k.target=this;k.cancellable=!1;for(const e of d)n?(p.reset(e),this.emit("before-add",p),p.defaultPrevented||(b?g.push(e):g.splice(a++,0,e),this._set("length",g.length),h&&(k.reset(e),this.emit("after-add",k)))):(b?g.push(e):g.splice(a++,0,e),this._set("length",g.length),k.reset(e),this.emit("after-add",k));q.release(k);q.release(p)}else{if(b)for(p of d)g.push(p);else g.splice(a,
0,...d);this._set("length",g.length)}}(d&&d.length||m&&m.length)&&this._notifyChangeEvent(d,m);return m};c._emitBeforeChanges=function(a){let b=!1;if(this.hasEventListener("before-changes")){const d=q.acquire();d.target=this;d.cancellable=!0;d.type=a;this.emit("before-changes",d);b=d.defaultPrevented;q.release(d)}return b};c._emitAfterChanges=function(a){if(this.hasEventListener("after-changes")){const b=q.acquire();b.target=this;b.cancellable=!1;b.type=a;this.emit("after-changes",b);q.release(b)}};
c._notifyChangeEvent=function(a,b){this.hasEventListener("change")&&this._notifications&&this._notifications[this._notifications.length-1].changes.push({added:a,removed:b})};c._dispatchChange=function(){this._timer&&(this._timer.remove(),this._timer=null);if(this._notifications){var a=this._notifications;this._notifications=null;for(const b of a){a=b.changes;t.clear();u.clear();v.clear();for(const {added:h,removed:p}of a){if(h)if(0===v.size&&0===u.size)for(const e of h)t.add(e);else for(const e of h)u.has(e)?
(v.add(e),u.delete(e)):v.has(e)||t.add(e);if(p)if(0===v.size&&0===t.size)for(const e of p)u.add(e);else for(const e of p)t.has(e)?t.delete(e):(v.delete(e),u.add(e))}const d=w.acquire();t.forEach(h=>{d.push(h)});const g=w.acquire();u.forEach(h=>{g.push(h)});const n=this._items,m=b.items,k=w.acquire();v.forEach(h=>{m.indexOf(h)!==n.indexOf(h)&&k.push(h)});if(b.listeners&&(d.length||g.length||k.length)){a={target:this,added:d,removed:g,moved:k};const h=b.listeners.length;for(let p=0;p<h;p++){const e=
b.listeners[p];e.removed||e.callback.call(this,a)}}w.release(d);w.release(g);w.release(k)}t.clear();u.clear();v.clear()}};y._createClass(l,[{key:"items",get:function(){return this._items},set:function(a){this._emitBeforeChanges(1)||(this._splice(0,this.length,...A(a)),this._emitAfterChanges(1))}}]);return l}(M.EventedAccessor);x.ofType=f=>{if(!f)return r;if(C.has(f))return C.get(f);var l=null;if("function"===typeof f)l=f.prototype.declaredClass;else if(f.base)l=f.base.prototype.declaredClass;else for(var c in f.typeMap){const a=
f.typeMap[c].prototype.declaredClass;l=l?l+` | ${a}`:a}c=function(a){function b(){return a.apply(this,arguments)||this}y._inheritsLoose(b,a);return b}(r);c=z.__decorate([G.subclass(`esri.core.Collection<${l}>`)],c);l={Type:f,ensureType:"function"===typeof f?E.ensureType(f):E.ensureOneOfType(f)};Object.defineProperty(c.prototype,"itemType",{value:l});C.set(f,c);return c};z.__decorate([F.property()],x.prototype,"length",void 0);z.__decorate([F.property()],x.prototype,"items",null);return x=r=z.__decorate([G.subclass("esri.core.Collection")],
x)});