/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import"./object.js";import{n as t,i as n,b as e,L as r}from"./Logger.js";import{n as i}from"../core/scheduling.js";import{b as s,c as o}from"./mathUtils2.js";import{d as c,c as u,a,f}from"./vec3f64.js";import{d as g,l,n as p,e as h,s as m,g as d,c as b,a as P,h as M,u as y,f as v,k as _,i as A,m as j}from"./vec3.js";import{d as w,j as S}from"./mathUtils.js";import{e as V}from"./screenUtils.js";import{a as B,b as I,r as O,i as R,m as x}from"./mat4.js";import{d as z,f as N}from"./vec4f64.js";import{e as L,g as k,h as E,c as T}from"./quatf64.js";import{c as F,d as U}from"./vec2.js";import{t as q}from"./vec4.js";import{b as H}from"./vec2f64.js";class C{constructor(t,n,e){this.itemByteSize=t,this.itemCreate=n,this.buffers=[],this.items=[],this.itemsPerBuffer=0,this.itemsPtr=0,this.itemsPerBuffer=Math.ceil(e/this.itemByteSize),this.tickHandle=i.before((()=>this.reset()))}destroy(){this.tickHandle&&(this.tickHandle.remove(),this.tickHandle=t(this.tickHandle)),this.itemsPtr=0,this.items=t(this.items),this.buffers=t(this.buffers)}get(){0===this.itemsPtr&&i((()=>{}));const t=Math.floor(this.itemsPtr/this.itemsPerBuffer);for(;this.buffers.length<=t;){const t=new ArrayBuffer(this.itemsPerBuffer*this.itemByteSize);for(let n=0;n<this.itemsPerBuffer;++n)this.items.push(this.itemCreate(t,n*this.itemByteSize));this.buffers.push(t)}return this.items[this.itemsPtr++]}reset(){const t=2*(Math.floor(this.itemsPtr/this.itemsPerBuffer)+1);for(;this.buffers.length>t;)this.buffers.pop(),this.items.length=this.buffers.length*this.itemsPerBuffer;this.itemsPtr=0}static createVec2f64(t=D){return new C(16,H,t)}static createVec3f64(t=D){return new C(24,c,t)}static createVec4f64(t=D){return new C(32,z,t)}static createMat3f64(t=D){return new C(72,L,t)}static createMat4f64(t=D){return new C(128,k,t)}static createQuatf64(t=D){return new C(32,E,t)}get test(){return{size:this.buffers.length*this.itemsPerBuffer*this.itemByteSize}}}const D=4096,Y=C.createVec2f64(),Q=C.createVec3f64(),G=C.createVec4f64(),X=(C.createMat3f64(),C.createMat4f64()),J=C.createQuatf64();function K(t,n){return g(t,n)/l(t)}function W(t,n){const e=g(t,n)/(l(t)*l(n));return-s(e)}function Z(t,n,e){p($,t),p(tt,n);const r=g($,tt),i=s(r),o=h($,$,tt);return g(o,e)<0?2*Math.PI-i:i}const $=u(),tt=u();var nt=Object.freeze({__proto__:null,projectPoint:function(t,n,e){const r=g(t,n)/g(t,t);return m(e,t,r)},projectPointSignedLength:K,angle:W,angleAroundAxis:Z});function et(t=it){return[t[0],t[1],t[2],t[3]]}function rt(t,n,e,r,i=et()){return i[0]=t,i[1]=n,i[2]=e,i[3]=r,i}const it=[0,0,1,0];var st=Object.freeze({__proto__:null,create:et,wrap:function(t,n,e,r){return rt(t,n,e,r,G.get())},wrapAxisAngle:function(t,n){return rt(t[0],t[1],t[2],n,G.get())},copy:function(t,n=et()){return rt(t[0],t[1],t[2],t[3],n)},fromValues:rt,fromAxisAndAngle:function(t,n,e=et()){return d(e,t),e[3]=n,e},fromPoints:function(t,n,e=et()){return h(e,t,n),p(e,e),e[3]=W(t,n),e},axis:function(t){return t},UP:it});class ot{constructor(t){this.allocator=t,this.items=[],this.itemsPtr=0,this.tickHandle=i.before((()=>this.reset())),this.grow()}destroy(){this.tickHandle&&(this.tickHandle.remove(),this.tickHandle=t(this.tickHandle)),this.items=t(this.items)}get(){return 0===this.itemsPtr&&i((()=>{})),this.itemsPtr===this.items.length&&this.grow(),this.items[this.itemsPtr++]}reset(){const t=Math.min(3*Math.max(8,this.itemsPtr),this.itemsPtr+3*ct);this.items.length=Math.min(t,this.items.length),this.itemsPtr=0}grow(){for(let t=0;t<Math.max(8,Math.min(this.items.length,ct));t++)this.items.push(this.allocator())}}const ct=1024;function ut(t){return t?{origin:a(t.origin),vector:a(t.vector)}:{origin:u(),vector:u()}}function at(t,n){const e=mt.get();return e.origin=t,e.vector=n,e}function ft(t,n,e=ut()){return d(e.origin,t),d(e.vector,n),e}function gt(t,n){const e=b(Q.get(),n,t.origin),r=g(t.vector,e),i=g(t.vector,t.vector),s=o(r/i,0,1),c=b(Q.get(),m(Q.get(),t.vector,s),e);return g(c,c)}function lt(t,n,e,r,i){const{vector:s,origin:c}=t,u=b(Q.get(),n,c),a=l(s),f=g(s,u)/a;return m(i,s,o(f,e,r)),P(i,i,t.origin)}function pt(t,n,e,r){const i=1e-6,s=t.origin,c=P(Q.get(),s,t.vector),u=n.origin,a=P(Q.get(),u,n.vector),f=Q.get(),g=Q.get();if(f[0]=s[0]-u[0],f[1]=s[1]-u[1],f[2]=s[2]-u[2],g[0]=a[0]-u[0],g[1]=a[1]-u[1],g[2]=a[2]-u[2],Math.abs(g[0])<i&&Math.abs(g[1])<i&&Math.abs(g[2])<i)return!1;const l=Q.get();if(l[0]=c[0]-s[0],l[1]=c[1]-s[1],l[2]=c[2]-s[2],Math.abs(l[0])<i&&Math.abs(l[1])<i&&Math.abs(l[2])<i)return!1;const p=f[0]*g[0]+f[1]*g[1]+f[2]*g[2],h=g[0]*l[0]+g[1]*l[1]+g[2]*l[2],m=f[0]*l[0]+f[1]*l[1]+f[2]*l[2],d=g[0]*g[0]+g[1]*g[1]+g[2]*g[2],b=(l[0]*l[0]+l[1]*l[1]+l[2]*l[2])*d-h*h;if(Math.abs(b)<i)return!1;let y=(p*h-m*d)/b,v=(p+h*y)/d;e&&(y=o(y,0,1),v=o(v,0,1));const _=Q.get(),A=Q.get();return _[0]=s[0]+y*l[0],_[1]=s[1]+y*l[1],_[2]=s[2]+y*l[2],A[0]=u[0]+v*g[0],A[1]=u[1]+v*g[1],A[2]=u[2]+v*g[2],r.tA=y,r.tB=v,r.pA=_,r.pB=A,r.distance2=M(_,A),!0}const ht={tA:0,tB:0,pA:u(),pB:u(),distance2:0},mt=new ot((()=>({origin:null,vector:null})));var dt=Object.freeze({__proto__:null,create:ut,wrap:at,copy:function(t,n=ut()){return ft(t.origin,t.vector,n)},fromValues:ft,fromPoints:function(t,n,e=ut()){return d(e.origin,t),b(e.vector,n,t),e},distance2:gt,distance:function(t,n){return Math.sqrt(gt(t,n))},projectPoint:function(t,n,e){return lt(t,n,0,1,e)},pointAt:function(t,n,e){return P(e,t.origin,m(e,t.vector,n))},projectPointClamp:lt,closestRayDistance2:function(t,n){if(pt(t,at(n.origin,n.direction),!1,ht)){const{tA:n,pB:e,distance2:r}=ht;if(n>=0&&n<=1)return r;if(n<0)return M(t.origin,e);if(n>1)return M(P(Q.get(),t.origin,t.vector),e)}return null},closestLineSegmentPoint:function(t,n,e){return!!pt(t,n,!0,ht)&&(d(e,ht.pA),!0)},closestLineSegmentDistance2:function(t,n){return pt(t,n,!0,ht)?ht.distance2:null}});function bt(t=Qt){return[t[0],t[1],t[2],t[3]]}function Pt(t,n,e,r){return yt(t,n,e,r,G.get())}function Mt(t,n=bt()){return yt(t[0],t[1],t[2],t[3],n)}function yt(t,n,e,r,i=bt()){return i[0]=t,i[1]=n,i[2]=e,i[3]=r,i}function vt(t,n,e=bt()){d(e,n);const r=g(n,n);return Math.abs(r-1)>1e-5&&r>1e-12&&m(e,e,1/Math.sqrt(r)),Ot(e,t,e),e}function _t(t,n,e,r=bt()){return Rt(b(Q.get(),t,n),b(Q.get(),e,n),t,r)}function At(t,n,e,r,i){if(t.count<3)return!1;t.getVec(e,wt);let s=r,o=!1;for(;s<t.count-1&&!o;)t.getVec(s,St),s++,o=!y(wt,St);if(!o)return!1;for(s=Math.max(s,i),o=!1;s<t.count&&!o;)t.getVec(s,Vt),s++,b(Bt,wt,St),p(Bt,Bt),b(It,St,Vt),p(It,It),o=!y(wt,Vt)&&!y(St,Vt)&&Math.abs(g(Bt,It))<jt;return o?(_t(wt,St,Vt,n),!0):(0!==e||1!==r||2!==i)&&At(t,n,0,1,2)}const jt=.99619469809,wt=u(),St=u(),Vt=u(),Bt=u(),It=u();function Ot(t,n,e){return t!==e&&Mt(t,e),e[3]=-g(e,n),e}function Rt(t,n,e,r=bt()){return vt(e,h(Q.get(),n,t),r)}function xt(t,e,r){return!!n(e)&&Dt(t,e.origin,e.direction,!0,!1,r)}function zt(t,n,e){return Dt(t,n.origin,n.vector,!1,!1,e)}function Nt(t,n,e){return Dt(t,n.origin,n.vector,!1,!0,e)}function Lt(t,n){const{center:e,radius:r}=n;return Ct(t,e)-r>=0}function kt(t,n){return Ct(t,n)>=0}function Et(t,n){return Ct(t,n)<0}function Tt(t,n){const e=n[0],r=n[1],i=n[2],s=n[3],o=n[4],c=n[5];return t[0]*(t[0]>0?e:s)+t[1]*(t[1]>0?r:o)+t[2]*(t[2]>0?i:c)+t[3]>=0}function Ft(t,n){const e=g(t,n.ray.direction),r=-Ct(t,n.ray.origin);if(r<0&&e>=0)return!1;if(e>-1e-6&&e<1e-6)return r>0;if((r<0||e<0)&&!(r<0&&e<0))return!0;const i=r/e;return e>0?i<n.c1&&(n.c1=i):i>n.c0&&(n.c0=i),n.c0<=n.c1}function Ut(t,n){const e=g(t,n.ray.direction),r=-Ct(t,n.ray.origin);if(e>-1e-6&&e<1e-6)return r>0;const i=r/e;return e>0?i<n.c1&&(n.c1=i):i>n.c0&&(n.c0=i),n.c0<=n.c1}function qt(t,n,e){const r=m(Q.get(),t,-t[3]),i=Ht(t,b(Q.get(),n,r),Q.get());return P(e,i,r),e}function Ht(t,n,e){const r=m(Q.get(),t,g(t,n));return b(e,n,r),e}function Ct(t,n){return g(t,n)+t[3]}function Dt(t,n,e,r,i,s){const c=g(t,e);if(0===c)return!1;let u=-(g(t,n)+t[3])/c;return i&&(u=r?Math.max(0,u):o(u,0,1)),!(u<0||!r&&u>1)&&(P(s,n,m(s,e,u)),!0)}function Yt(t){return t}const Qt=[0,0,1,0];var Gt=Object.freeze({__proto__:null,create:bt,wrap:Pt,copy:Mt,fromValues:yt,fromNormalAndOffset:function(t,n,e=bt()){return d(e,t),e[3]=n,e},fromPositionAndNormal:vt,fromPoints:_t,fromManyPoints:function(t,n){return At(t,n,0,1,2)},fromManyPointsSampleAt:At,setOffsetFromPoint:Ot,negate:function(t,n){return n[0]=-t[0],n[1]=-t[1],n[2]=-t[2],n[3]=-t[3],n},fromVectorsAndPoint:Rt,intersectRay:xt,intersectLineSegment:zt,intersectLineSegmentClamp:Nt,isSphereFullyInside:Lt,isSphereFullyOutside:function(t,n){const{center:e,radius:r}=n;return Ct(t,e)+r<0},isPointInside:kt,isPointOutside:Et,isAABBFullyInside:Tt,clip:Ft,clipInfinite:Ut,projectPoint:qt,projectVector:Ht,distance:function(t,n){return Math.abs(Ct(t,n))},signedDistance:Ct,normal:Yt,UP:Qt});function Xt(t){return t?{origin:a(t.origin),direction:a(t.direction)}:{origin:u(),direction:u()}}function Jt(t,n=Xt()){return Wt(t.origin,t.direction,n)}function Kt(t,n,e=Xt()){return d(e.origin,t),b(e.direction,n,t),e}function Wt(t,n,e=Xt()){return d(e.origin,t),d(e.direction,n),e}function Zt(t,n,e=Xt()){return $t(t,t.screenToRender(n,V(Q.get())),e)}function $t(t,n,r=Xt()){const i=V(F(Q.get(),n));if(i[2]=0,!t.unprojectFromRenderScreen(i,r.origin))return null;const s=V(F(Q.get(),n));s[2]=1;const o=t.unprojectFromRenderScreen(s,Q.get());return e(o)?null:(b(r.direction,o,r.origin),r)}function tn(t,n,e=Xt()){return nn(t,t.screenToRender(n,V(Q.get())),e)}function nn(t,n,r=Xt()){d(r.origin,t.eye);const i=v(Q.get(),n[0],n[1],1),s=t.unprojectFromRenderScreen(i,Q.get());return e(s)?null:(b(r.direction,s,r.origin),r)}function en(t,n){const e=h(Q.get(),p(Q.get(),t.direction),b(Q.get(),n,t.origin));return g(e,e)}function rn(t,n,e){const r=g(t.direction,b(e,n,t.origin));return P(e,t.origin,m(e,t.direction,r)),e}function sn(){return{origin:null,direction:null}}const on=new ot(sn);var cn=Object.freeze({__proto__:null,create:Xt,wrap:function(t,n){const e=on.get();return e.origin=t,e.direction=n,e},copy:Jt,fromPoints:Kt,fromValues:Wt,fromScreen:Zt,fromRender:$t,fromScreenAtEye:tn,fromRenderAtEye:nn,distance2:en,distance:function(t,n){return Math.sqrt(en(t,n))},closestPoint:rn,createWrapper:sn});const un=r.getLogger("esri.views.3d.support.geometryUtils.boundedPlane");class an{constructor(){this.plane=bt(),this.origin=u(),this.basis1=u(),this.basis2=u()}}function fn(t=On){return{plane:bt(t.plane),origin:a(t.origin),basis1:a(t.basis1),basis2:a(t.basis2)}}function gn(t,n=fn()){return ln(t.origin,t.basis1,t.basis2,n)}function ln(t,n,e,r=fn()){return d(r.origin,t),d(r.basis1,n),d(r.basis2,e),pn(r),function(t,n){Math.abs(g(t.basis1,t.basis2)/(l(t.basis1)*l(t.basis2)))>1e-6&&un.warn(n,"Provided basis vectors are not perpendicular");Math.abs(g(t.basis1,wn(t)))>1e-6&&un.warn(n,"Basis vectors and plane normal are not perpendicular");Math.abs(-g(wn(t),t.origin)-t.plane[3])>1e-6&&un.warn(n,"Plane offset is not consistent with plane origin")}(r,"fromValues()"),r}function pn(t){Rt(t.basis2,t.basis1,t.origin,t.plane)}function hn(t,n,e){t!==e&&gn(t,e);const r=m(Q.get(),wn(t),n);return P(e.origin,e.origin,r),e.plane[3]-=n,e}function mn(t,n=fn()){const e=(t[2]-t[0])/2,r=(t[3]-t[1])/2;return v(n.origin,t[0]+e,t[1]+r,0),v(n.basis1,e,0,0),v(n.basis2,0,r,0),yt(0,0,1,0,n.plane),n}function dn(t,n,e){return!!xt(t.plane,n,e)&&Sn(t,e)}function bn(t,n,e){const r=Rn.get();In(t,n,r,Rn.get());let i=Number.POSITIVE_INFINITY;for(const o of Ln){const c=Bn(t,o,xn.get()),u=Q.get();if(zt(r,c,u)){const t=w(Q.get(),n.origin,u),r=Math.abs(s(g(n.direction,t)));r<i&&(i=r,d(e,u))}}return i===Number.POSITIVE_INFINITY?Pn(t,n,e):e}function Pn(t,n,e){if(dn(t,n,e))return e;const r=Rn.get(),i=Rn.get();In(t,n,r,i);let s=Number.POSITIVE_INFINITY;for(const o of Ln){const c=Bn(t,o,xn.get()),u=Q.get();if(Nt(r,c,u)){const t=en(n,u);if(!kt(i,u))continue;t<s&&(s=t,d(e,u))}}return vn(t,n.origin)<s&&Mn(t,n.origin,e),e}function Mn(t,n,e){const r=qt(t.plane,n,Q.get()),i=lt(Vn(t,t.basis1),r,-1,1,Q.get()),s=lt(Vn(t,t.basis2),r,-1,1,Q.get());return b(e,P(Q.get(),i,s),t.origin),e}function yn(t,n,e){const{origin:r,basis1:i,basis2:s}=t,o=b(Q.get(),n,r),c=K(i,o),u=K(s,o),a=K(wn(t),o);return v(e,c,u,a)}function vn(t,n){const e=yn(t,n,Q.get()),{basis1:r,basis2:i}=t,s=l(r),o=l(i),c=Math.max(Math.abs(e[0])-s,0),u=Math.max(Math.abs(e[1])-o,0),a=e[2];return c*c+u*u+a*a}function _n(t,n){return kt(t.plane,n)&&Sn(t,n)}function An(t,n){const e=-t.plane[3];return K(wn(t),n)-e}function jn(t,n){return y(t.basis1,n.basis1)&&y(t.basis2,n.basis2)&&y(t.origin,n.origin)}function wn(t){return t.plane}function Sn(t,n){const e=b(Q.get(),n,t.origin),r=j(t.basis1),i=j(t.basis2),s=g(t.basis1,e),o=g(t.basis2,e);return-s-r<0&&s-r<0&&-o-i<0&&o-i<0}function Vn(t,n){const e=xn.get();return d(e.origin,t.origin),d(e.vector,n),e}function Bn(t,n,e){const{basis1:r,basis2:i,origin:s}=t,o=m(Q.get(),r,n.origin[0]),c=m(Q.get(),i,n.origin[1]);P(e.origin,o,c),P(e.origin,e.origin,s);const u=m(Q.get(),r,n.direction[0]),a=m(Q.get(),i,n.direction[1]);return m(e.vector,P(u,u,a),2),e}function In(t,n,e,r){const i=wn(t);Rt(i,n.direction,n.origin,e),Rt(e,i,n.origin,r)}const On={plane:bt(),origin:f(0,0,0),basis1:f(1,0,0),basis2:f(0,1,0)},Rn=new ot(bt),xn=new ot(ut),zn=u(),Nn=new ot((()=>({origin:null,basis1:null,basis2:null,plane:null}))),Ln=[{origin:[-1,-1],direction:[1,0]},{origin:[1,-1],direction:[0,1]},{origin:[1,1],direction:[-1,0]},{origin:[-1,1],direction:[0,-1]}],kn=T(),En=T();var Tn=Object.freeze({__proto__:null,BoundedPlaneClass:an,create:fn,wrap:function(t,n,e){const r=Nn.get();return r.origin=t,r.basis1=n,r.basis2=e,r.plane=Pt(0,0,0,0),pn(r),r},copy:gn,fromValues:ln,updateUnboundedPlane:pn,elevate:hn,setExtent:function(t,n,e){return mn(n,e),hn(e,An(t,t.origin),e),e},fromAABoundingRect:mn,intersectRay:dn,intersectRayClosestSilhouette:function(t,n,e){if(dn(t,n,e))return e;const r=bn(t,n,Q.get());return P(e,n.origin,m(Q.get(),n.direction,_(n.origin,r)/l(n.direction))),e},closestPointOnSilhouette:bn,closestPoint:Pn,projectPoint:Mn,projectPointLocal:yn,distance2:vn,distance:function(t,n){return Math.sqrt(vn(t,n))},distanceToSilhouette:function(t,n){let e=Number.NEGATIVE_INFINITY;for(const r of Ln){const i=gt(Bn(t,r,xn.get()),n);i>e&&(e=i)}return Math.sqrt(e)},extrusionContainsPoint:_n,axisAt:function(t,n,e,r){return function(t,n,e){switch(n){case 0:d(e,t.basis1),p(e,e);break;case 1:d(e,t.basis2),p(e,e);break;case 2:d(e,wn(t))}return e}(t,e,r)},altitudeAt:An,setAltitudeAt:function(t,n,e,r){const i=An(t,n),s=m(zn,wn(t),e-i);return P(r,n,s),r},equals:jn,transform:function(t,n,e){return t!==e&&gn(t,e),B(kn,n),I(kn,kn),A(e.basis1,t.basis1,kn),A(e.basis2,t.basis2,kn),A(e.plane,t.plane,kn),A(e.origin,t.origin,n),Ot(e.plane,e.origin,e.plane),e},rotate:function(t,n,e,r){return t!==r&&gn(t,r),O(En,R(En),n,e),A(r.basis1,t.basis1,En),A(r.basis2,t.basis2,En),pn(r),r},normal:wn,UP:On});function Fn(t){return t?{ray:Xt(t.ray),c0:t.c0,c1:t.c1}:{ray:Xt(),c0:0,c1:Number.MAX_VALUE}}function Un(t,n,e,r=Fn()){return Jt(t,r.ray),r.c0=n,r.c1=e,r}function qn(t,n=Fn()){return Jt(t,n.ray),n.c0=0,n.c1=Number.MAX_VALUE,n}function Hn(t,n,e=Fn()){const r=l(t.vector);return Wt(t.origin,n,e.ray),e.c0=0,e.c1=r,e}function Cn(t,n){return Yn(t,t.c0,n)}function Dn(t,n){return Yn(t,t.c1,n)}function Yn(t,n,e){return P(e,t.ray.origin,m(e,t.ray.direction,n))}const Qn=new ot((()=>({c0:0,c1:0,ray:null})));var Gn=Object.freeze({__proto__:null,create:Fn,wrap:function(t,n,e){const r=Qn.get();return r.ray=t,r.c0=n,r.c1=e,r},copy:function(t,n=Fn()){return Un(t.ray,t.c0,t.c1,n)},fromValues:Un,fromRay:qn,fromLineSegment:function(t,n=Fn()){return Hn(t,p(Q.get(),t.vector),n)},fromLineSegmentAndDirection:Hn,getStart:Cn,getEnd:Dn,getAt:Yn});function Xn(t){if(t){const{planes:n,points:e}=t;return{planes:[bt(n[0]),bt(n[1]),bt(n[2]),bt(n[3]),bt(n[4]),bt(n[5])],points:[a(e[0]),a(e[1]),a(e[2]),a(e[3]),a(e[4]),a(e[5]),a(e[6]),a(e[7])]}}return{planes:[bt(),bt(),bt(),bt(),bt(),bt()],points:[u(),u(),u(),u(),u(),u(),u(),u()]}}function Jn(t,n,e=Xn()){for(let n=0;n<6;n++)Mt(t[n],e.planes[n]);for(let t=0;t<8;t++)d(e.points[t],n[t]);return e}function Kn(t,n,e=Xn()){const{points:r}=e,i=x(X.get(),n,t);B(i,i);for(let t=0;t<8;++t){const n=q(G.get(),ie[t],i);v(r[t],n[0]/n[3],n[1]/n[3],n[2]/n[3])}return Wn(e),e}function Wn(t){const{planes:n,points:e}=t;_t(e[4],e[0],e[3],n[0]),_t(e[1],e[5],e[6],n[1]),_t(e[4],e[5],e[1],n[2]),_t(e[3],e[2],e[6],n[3]),_t(e[0],e[1],e[2],n[4]),_t(e[5],e[4],e[7],n[5])}function Zn(t,n){for(let e=0;e<6;e++)if(Lt(t[e],n))return!1;return!0}function $n(t,n){return ee(t,qn(n,se.get()))}function te(t,n,e){return ee(t,Hn(n,e,se.get()))}function ne(t,n){for(let e=0;e<6;e++){if(Ct(t[e],n)>0)return!1}return!0}function ee(t,n){for(let e=0;e<6;e++)if(!Ft(t[e],n))return!1;return!0}const re={bottom:[5,1,0,4],near:[0,1,2,3],far:[5,4,7,6],right:[1,5,6,2],left:[4,0,3,7],top:[7,3,2,6]},ie=[N(-1,-1,-1,1),N(1,-1,-1,1),N(1,1,-1,1),N(-1,1,-1,1),N(-1,-1,1,1),N(1,-1,1,1),N(1,1,1,1),N(-1,1,1,1)],se=new ot(Fn);var oe=Object.freeze({__proto__:null,create:Xn,copy:function(t,n=Xn()){return Jn(t.planes,t.points,n)},fromValues:Jn,fromMatrix:Kn,recomputePlanes:Wn,intersectsSphere:Zn,intersectsRay:$n,intersectClipRay:function(t,n){for(let e=0;e<6;e++){if(!Ut(t[e],n))return!1}return!0},intersectsLineSegment:te,intersectsPoint:ne,intersectsAABB:function(t,n){for(let e=0;e<6;e++)if(Tt(t[e],n))return!1;return!0},planePointIndices:re});const ce=r.getLogger("esri.views.3d.support.geometryUtils.sphere");function ue(t){return t?{radius:t.radius,center:a(t.center)}:{radius:1,center:u()}}function ae(t,n=ue()){return fe(t.radius,t.center,n)}function fe(t,n,e=ue()){return d(e.center,n),e.radius=t,e}function ge(t,n,r){if(e(n))return!1;const i=b(Q.get(),n.origin,t.center),s=g(n.direction,n.direction),o=2*g(n.direction,i),c=o*o-4*s*(g(i,i)-t.radius*t.radius);if(c<0)return!1;const u=Math.sqrt(c);let a=(-o-u)/(2*s);const f=(-o+u)/(2*s);return(a<0||f<a&&f>0)&&(a=f),!(a<0)&&(r&&P(r,n.origin,m(Q.get(),n.direction,a)),!0)}function le(t,n,e){const r=Q.get(),i=X.get();h(r,n.origin,n.direction),h(e,r,n.origin),m(e,e,1/l(e)*t.radius);const s=he(t,n.origin),o=W(n.origin,e);return R(i),O(i,i,o+s,r),A(e,e,i),e}function pe(t,n,e){const r=b(Q.get(),n,t.center),i=m(Q.get(),r,t.radius/l(r));return P(e,i,t.center)}function he(t,n){const e=b(Q.get(),n,t.center),r=l(e),i=t.radius+Math.abs(t.radius-r);return s(t.radius/i)}const me=u();function de(t,n,e,r){const i=b(me,n,t.center);switch(e){case 0:{const t=S(i,me)[2];return v(r,-Math.sin(t),Math.cos(t),0)}case 1:{const t=S(i,me),n=t[1],e=t[2],s=Math.sin(n);return v(r,-s*Math.cos(e),-s*Math.sin(e),Math.cos(n))}case 2:return p(r,i);default:return}}function be(t,n){const e=b(ve,n,t.center);return l(e)-t.radius}const Pe=new ot((()=>({center:null,radius:0}))),Me=Xt(),ye=u(),ve=u();Object.freeze(ye);var _e=Object.freeze({__proto__:null,create:ue,wrap:function(t,n){const e=Pe.get();return e.radius=t,e.center=n||ye,e},copy:ae,fromValues:fe,elevate:function(t,n,e){return t!==e&&d(e.center,t.center),e.radius=t.radius+n,e},setExtent:function(t,n,e){return ce.error("sphere.setExtent is not yet supported"),t===e?e:ae(t,e)},intersectRay:ge,intersectScreen:function(t,n,e,r){return ge(t,tn(n,e,Me),r)},intersectsRay:function(t,n){return ge(t,n,null)},intersectRayClosestSilhouette:function(t,n,e){if(ge(t,n,e))return e;const r=le(t,n,Q.get());return P(e,n.origin,m(Q.get(),n.direction,_(n.origin,r)/l(n.direction))),e},closestPointOnSilhouette:le,closestPoint:function(t,n,e){return ge(t,n,e)?e:(rn(n,t.center,e),pe(t,e,e))},projectPoint:pe,distanceToSilhouette:function(t,n){const e=b(Q.get(),n,t.center),r=j(e),i=t.radius*t.radius;return Math.sqrt(Math.abs(r-i))},angleToSilhouette:he,axisAt:de,altitudeAt:be,setAltitudeAt:function(t,n,e,r){const i=be(t,n),s=de(t,n,2,ve),o=m(ve,s,e-i);return P(r,n,o),r}});function Ae(t){return t?{p0:a(t.p0),p1:a(t.p1),p2:a(t.p2)}:{p0:u(),p1:u(),p2:u()}}function je(t,n,e,r=Ae()){return d(r.p0,t),d(r.p1,n),d(r.p2,e),r}function we(t,n,e){const r=1e-5,{direction:i,origin:s}=n,{p0:o,p1:c,p2:u}=t,a=c[0]-o[0],f=c[1]-o[1],g=c[2]-o[2],l=u[0]-o[0],p=u[1]-o[1],h=u[2]-o[2],d=i[1]*h-p*i[2],b=i[2]*l-h*i[0],M=i[0]*p-l*i[1],y=a*d+f*b+g*M;if(y>-r&&y<r)return!1;const v=1/y,_=s[0]-o[0],A=s[1]-o[1],j=s[2]-o[2],w=v*(_*d+A*b+j*M);if(w<0||w>1)return!1;const S=A*g-f*j,V=j*a-g*_,B=_*f-a*A,I=v*(i[0]*S+i[1]*V+i[2]*B);if(I<0||w+I>1)return!1;if(e){m(e,i,v*(l*S+p*V+h*B)),P(e,s,e)}return!0}function Se(t,n,e){const r=U(t,n),i=U(n,e),s=U(e,t),o=(r+i+s)/2,c=o*(o-r)*(o-i)*(o-s);return c<=0?0:Math.sqrt(c)}function Ve(t,n,e){return b(Oe,n,t),b(Re,e,t),l(h(Oe,Oe,Re))/2}const Be=new ot(ut),Ie=new ot((()=>({p0:null,p1:null,p2:null}))),Oe=u(),Re=u();const xe=Gt,ze=Tn,Ne=Object.freeze({__proto__:null,create:Ae,wrap:function(t,n,e){const r=Ie.get();return r.p0=t,r.p1=n,r.p2=e,r},copy:function(t,n=Ae()){return je(t.p0,t.p1,t.p2,n)},fromValues:je,distance2:function(t,n){const e=t.p0,r=t.p1,i=t.p2,s=b(Q.get(),r,e),o=b(Q.get(),i,r),c=b(Q.get(),e,i),u=b(Q.get(),n,e),a=b(Q.get(),n,r),f=b(Q.get(),n,i),l=h(s,s,c),p=g(h(Q.get(),s,l),u),m=g(h(Q.get(),o,l),a),d=g(h(Q.get(),c,l),f);if(p>0&&m>0&&d>0){const t=g(l,u);return t*t/g(l,l)}const P=gt(ft(e,s,Be.get()),n),M=gt(ft(r,o,Be.get()),n),y=gt(ft(i,c,Be.get()),n);return Math.min(P,M,y)},intersectRay:we,areaPoints2d:Se,area2d:function(t){return Se(t.p0,t.p1,t.p2)},areaPoints3d:Ve}),Le=dt,ke=cn,Ee=Gn,Te=_e,Fe=oe,Ue=nt,qe=st;export{Ue as A,Mt as B,Et as C,Ct as D,an as E,ue as F,_n as G,K as H,Ve as I,Fn as J,qn as K,Cn as L,Dn as M,Ee as N,Y as O,Jt as P,Kt as Q,Z as R,J as S,fn as T,jn as U,we as V,qe as a,X as b,Q as c,W as d,ze as e,bt as f,At as g,Xn as h,ge as i,Kn as j,Wn as k,Zn as l,$n as m,Yt as n,te as o,xe as p,ne as q,ke as r,Te as s,re as t,Le as u,Ne as v,Fe as w,Xt as x,nn as y,Zt as z};
