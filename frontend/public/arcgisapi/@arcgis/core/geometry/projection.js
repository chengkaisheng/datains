/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import"../chunks/tslib.es6.js";import"../chunks/ArrayPool.js";import"../chunks/object.js";import"../chunks/deprecate.js";import"../core/lang.js";import"../config.js";import{b as n,i as t}from"../chunks/Logger.js";import"../chunks/string.js";import"../chunks/metadata.js";import"../core/accessorSupport/decorators/property.js";import"../core/Accessor.js";import"../chunks/PropertyOrigin.js";import"../core/scheduling.js";import{all as e,throwIfAborted as r}from"../core/promiseUtils.js";import"../chunks/Message.js";import s from"../core/Error.js";import"../chunks/ensureType.js";import"../core/accessorSupport/decorators/subclass.js";import"../chunks/JSONSupport.js";import"../core/urlUtils.js";import"../core/accessorSupport/decorators/cast.js";import"../chunks/jsonMap.js";import"../chunks/reader.js";import"../chunks/writer.js";import"../chunks/resourceExtension.js";import{e as o,j as u,a,i,b as l,c}from"./SpatialReference.js";import"../kernel.js";import"../request.js";import"../chunks/assets.js";import"./Geometry.js";import f from"./Point.js";import{e as p,a as h,m}from"../chunks/Ellipsoid.js";import"./support/webMercatorUtils.js";import d from"./Extent.js";import{c as M,d as j,r as R,a as g}from"../chunks/mathUtils2.js";import{c as k}from"../chunks/vec3f64.js";import"../chunks/common.js";import{g as w,a as y,c as E,n as x,l as S}from"../chunks/vec3.js";import"../chunks/zmUtils.js";import I from"./Multipoint.js";import T from"./Polygon.js";import"../chunks/extentUtils.js";import P from"./Polyline.js";import{a as b,S as C,W as F,b as U,d as v}from"../chunks/unitUtils.js";import{i as q,t as z,s as G}from"../chunks/mat4.js";import{l as A,p as W,i as Z}from"../chunks/pe.js";import{s as _}from"../chunks/aaBoundingRect.js";import{e as B}from"../chunks/geodesicConstants.js";import"./support/GeographicTransformationStep.js";import L from"./support/GeographicTransformation.js";let N=null,O=null,J=null,K={};function V(){return!!N&&Z()}function X(){return!0}function D(t){return n(J)&&(J=e([A(),import("../chunks/geometryEngineBase.js").then((function(n){return n.g})),import("../chunks/hydrated.js")])),J.then((([,n,{hydratedAdapter:e}])=>{r(t),O=e,N=n.default,N._enableProjection(W)}))}function H(n,t,e=null){return Array.isArray(n)?0===n.length?[]:Q(O,n,n[0].spatialReference,t,e):Q(O,[n],n.spatialReference,t,e)[0]}function Q(t,e,r,s,o=null){if(n(r)||n(s))return e;if(en(r,s,o))return e.map((n=>function(n,t,e){if(!n)return n;if("x"in n){const r=new f;return un(n,t,r,e)?r:null}if("xmin"in n){const r=new d;return dn(n,t,r,e)?r:null}if("rings"in n){const r=new T;return hn(n,t,r,e)?r:null}if("paths"in n){const r=new P;return fn(n,t,r,e)?r:null}if("points"in n){const r=new I;return ln(n,t,r,e)?r:null}return null}(n,r,s)));if(n(o)){const t=L.cacheKey(r,s);void 0!==K[t]?o=K[t]:(o=Y(r,s,null),n(o)&&(o=new L),K[t]=o)}if(n(N))throw new nn;return N._project(t,e,r,s,o)}function Y(t,e,r=null){if(n(N))throw new nn;if(n(t)||n(e))return null;const s=N._getTransformation(O,t,e,r,null==r?void 0:r.spatialReference);return null!==s?L.fromGE(s):null}function $(t,e,r=null){if(n(N))throw new nn;const s=N._getTransformationBySuitability(O,t,e,r,null==r?void 0:r.spatialReference);if(null!==s){const n=[];for(const t of s)n.push(L.fromGE(t));return n}return[]}class nn extends s{constructor(){super("projection:not-loaded","projection engine not fully loaded yet, please call load()")}}function tn(){N=null,O=null,J=null,K={}}function en(n,t,e){return!e&&(!!o(n,t)||u(n)&&u(t)&&!!tt(n,t,ut))}async function rn(n,t){if(!V())for(const{source:e,dest:r,geographicTransformation:s}of n)if(!en(e,r,s))return D(t)}function sn(n,t){switch(tt(n,t,ut)){case vn:return"copy3";case Nn:return"wgs84ToSphericalECEF";case An:return"wgs84ToWebMercator";case Hn:return"wgs84ToWGS84ECEF";case qn:return"webMercatorToWGS84";case zn:return"webMercatorToSphericalECEF";case Gn:return"webMercatorToWGS84ECEF";case Qn:return"wgs84ECEFToWGS84";case Yn:return"wgs84ECEFToSphericalECEF";case $n:return"wgs84ECEFToWebMercator";case Vn:return"sphericalECEFToWGS84";case Xn:return"sphericalECEFToWebMercator";case Kn:return"sphericalECEFToMars2000";case Jn:return"sphericalECEFToMoon2000";case Dn:return"sphericalECEFToWGS84ECEF";case Ln:return"mars2000ToSphericalPCPF";case Bn:return"moon2000ToSphericalPCPF";default:return null}}function on(t,e,r=e.spatialReference,s=0){return!n(r)&&un(t,t.spatialReference,e,r,s)}function un(n,t,e,r,s=0){ht[0]=n.x,ht[1]=n.y;const o=n.z;return ht[2]=void 0!==o?o:s,!!En(ht,t,0,ht,r,0,1)&&(e.x=ht[0],e.y=ht[1],e.spatialReference=r,void 0===o?(e.z=void 0,e.hasZ=!1):(e.z=ht[2],e.hasZ=!0),void 0===n.m?(e.m=void 0,e.hasM=!1):(e.m=n.m,e.hasM=!0),!0)}function an(t,e,r=e.spatialReference,s=0){return!n(r)&&ln(t,t.spatialReference,e,r,s)}function ln(n,t,e,r,s=0){const{points:o,hasZ:u,hasM:a}=n,i=[],l=o.length,c=[];for(const n of o)c.push(n[0],n[1],u?n[2]:s);if(!En(c,t,0,c,r,0,l))return!1;for(let n=0;n<l;++n){const t=3*n,e=c[t],r=c[t+1];u&&a?i.push([e,r,c[t+2],o[n][3]]):u?i.push([e,r,c[t+2]]):a?i.push([e,r,o[n][2]]):i.push([e,r])}return e.points=i,e.spatialReference=r,e.hasZ=u,e.hasM=a,!0}function cn(t,e,r=e.spatialReference,s=0){return!n(r)&&fn(t,t.spatialReference,e,r,s)}function fn(n,t,e,r,s=0){const{paths:o,hasZ:u,hasM:a}=n,i=[];return!!Sn(o,u,a,t,i,r,s)&&(e.paths=i,e.spatialReference=r,e.hasZ=u,e.hasM=a,!0)}function pn(t,e,r=e.spatialReference,s=0){return!n(r)&&hn(t,t.spatialReference,e,r,s)}function hn(n,t,e,r,s=0){const{rings:o,hasZ:u,hasM:a}=n,i=[];return!!Sn(o,u,a,t,i,r,s)&&(e.rings=i,e.spatialReference=r,e.hasZ=u,e.hasM=a,!0)}function mn(t,e,r=e.spatialReference,s=0){return!n(r)&&dn(t,t.spatialReference,e,r,s)}function dn(n,t,e,r,s=0){const{xmin:o,ymin:u,xmax:a,ymax:i,hasZ:l,hasM:c}=n;if(!gn(o,u,l?n.zmin:s,t,ht,r))return!1;e.xmin=ht[0],e.ymin=ht[1],l&&(e.zmin=ht[2]);return!!gn(a,i,l?n.zmax:s,t,ht,r)&&(e.xmax=ht[0],e.ymax=ht[1],l&&(e.zmax=ht[2]),c&&(e.mmin=n.mmin,e.mmax=n.mmax),e.spatialReference=r,!0)}function Mn(e,r,s,o){return n(r)||n(s)?null:(o=t(o)?o:new f({spatialReference:s}),En(e,r,0,ht,s,0,1)?(o.x=ht[0],o.y=ht[1],o.z=ht[2],o.spatialReference=s,o):null)}function jn(t,e,r,s){return n(s)&&(s=r.spatialReference),En(t,e,0,ht,s,0,1)?(r.x=ht[0],r.y=ht[1],r.z=ht[2],r.spatialReference=s,r):null}function Rn(n,t,e,r=0){ht[0]=n.x,ht[1]=n.y;const s=n.z;return ht[2]=void 0!==s?s:r,En(ht,n.spatialReference,0,t,e,0,1)}function gn(n,t,e,r,s,o){return ct[0]=n,ct[1]=t,ct[2]=e,En(ct,r,0,s,o,0,1)}function kn(t,e,r,s){return!(n(e)||n(s)||t.length<2)&&(2===t.length&&(ct[0]=t[0],ct[1]=t[1],ct[2]=0,t=ct),En(t,e,0,r,s,0,1))}function wn(n,t){ht[0]=n.x,ht[1]=n.y;const e=n.z;return ht[2]=void 0!==e?e:0,yn(ht,n.spatialReference,t)}function yn(t,e,r){return function(t,e,r,s){if(n(e))return!1;const o=Un(e,st),u=nt[o][s];if(n(u))return!1;u(t,0,ct,0),r!==ct&&(r[0]=ct[0],r[1]=ct[1],r.length>2&&(r[2]=ct[2]));return!0}(t,e,r,6)}function En(t,e,r,s,o,u,a=1){const i=tt(e,o,ut);if(n(i))return!1;if(i===vn){if(t===s&&r===u)return!0;const n=r+3*a;for(let e=r,o=u;e<n;e++,o++)s[o]=t[e];return!0}const l=r+3*a;for(let n=r,e=u;n<l;n+=3,e+=3)i(t,n,s,e);return!0}function xn(n,t,e,r,s){w(ht,n),y(mt,n,t),kn(ht,e,ht,s),kn(mt,e,mt,s),E(r,mt,ht),x(r,r)}function Sn(n,t,e,r,s,o,u=0){const a=new Array;for(const e of n)for(const n of e)a.push(n[0],n[1],t?n[2]:u);if(!En(a,r,0,a,o,0,a.length/3))return!1;let i=0;s.length=0;for(const r of n){const n=new Array;for(const s of r)t&&e?n.push([a[i++],a[i++],a[i++],s[3]]):t?n.push([a[i++],a[i++],a[i++]]):e?(n.push([a[i++],a[i++],s[2]]),i++):(n.push([a[i++],a[i++]]),i++);s.push(n)}return!0}function In(t,e,r,s){if(n(e)||n(s))return!1;const o=et(e,s,at);if(o.projector===vn)return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],!0;if(n(o.projector))return!1;const{source:u,dest:a}=o;if(3===a.spatialReferenceId){const e=nt[u.spatialReferenceId][2];if(n(e))return!1;e(t,0,ft,0);const s=Math.abs(it*ft[1])+Math.asin(t[3]/(p.radius+t[2]));if(An(ft,0,r,0),s>.9999*Math.PI)r[3]=Number.MAX_VALUE;else{const n=1/Math.cos(s);r[3]=n*t[3]}return!0}return o.projector(t,0,r,0),r[3]=t[3]*u.metersPerUnit/a.metersPerUnit,!0}function Tn(n,t,e,r){return null!=n&&(o(t,r)?(_(e,n),!0):(ct[0]=n[0],ct[1]=n[1],ct[2]=0,!!En(ct,t,0,ct,r,0,1)&&(e[0]=ct[0],e[1]=ct[1],ct[0]=n[2],ct[1]=n[3],ct[2]=0,!!En(ct,t,0,ct,r,0,1)&&(e[2]=ct[0],e[3]=ct[1],!0))))}function Pn(t,e,r,s){if(n(e)||n(s))return!1;const u=Un(e,st),a=Un(s,ot);if(u===a&&0!==u||o(e,s))return r[0]=1,r[1]=1,r[2]=1,!0;if(1===u){const n=S(t),e=n/Math.sqrt(t[0]*t[0]+t[1]*t[1]),s=n/p.radius;if(3===a)return r[0]=e*s,r[1]=e*s,r[2]=1,!0;if(2===a||5===a){const n=180/(p.radius*Math.PI);return r[0]=n*e*s,r[1]=n*s,r[2]=1,!0}}return!1}function bn(t,e,r,s){if(n(t)||n(s))return!1;const u=Un(t,st),a=Un(s,ot);if(u===a&&1!==a&&(0!==u||o(t,s)))return q(r),z(r,r,e),!0;if(1===a||7===a||9===a){let t=0,s=0;if(1===a){const r=nt[u][6],o=nt[6][a];if(n(r)||n(o))return!1;r(e,0,ft,0),o(ft,0,pt,0),t=it*ft[0],s=it*ft[1]}else if(7===a||9===a){const r=nt[u][a];if(n(r))return!1;r(e,0,pt,0),t=it*e[0],s=it*e[1]}return Cn(s,t,r),r[12]=pt[0],r[13]=pt[1],r[14]=pt[2],!0}if(3===a&&(2===u||1===u)){const t=nt[u][6];if(n(t))return!1;t(e,0,ft,0);const s=it*ft[1];An(ft,0,pt,0),q(r),z(r,r,pt);const o=1/Math.cos(s);return G(r,r,[o,o,1]),!0}return!1}function Cn(n,t,e){const r=Math.sin(t),s=Math.cos(t),o=Math.sin(n),u=Math.cos(n),a=e;return a[0]=-r,a[4]=-o*s,a[8]=u*s,a[12]=0,a[1]=s,a[5]=-o*r,a[9]=u*r,a[13]=0,a[2]=0,a[6]=u,a[10]=o,a[14]=0,a[3]=0,a[7]=0,a[11]=0,a[15]=1,a}var Fn;function Un(n,t){return t.spatialReference===n?t.spatialReferenceId:(t.spatialReference=n,"metersPerUnit"in t&&(t.metersPerUnit=b(n,1)),n.wkt===C.wkt?t.spatialReferenceId=1:a(n)?t.spatialReferenceId=2:i(n)?t.spatialReferenceId=3:n.wkt===F.wkt?t.spatialReferenceId=4:4490===n.wkid?t.spatialReferenceId=5:n.wkt===U.wkt?t.spatialReferenceId=7:n.wkt===v.wkt?t.spatialReferenceId=9:l(n)?t.spatialReferenceId=8:c(n)?t.spatialReferenceId=10:t.spatialReferenceId=0)}function vn(n,t,e,r){n!==e&&(e[r++]=n[t++],e[r++]=n[t++],e[r]=n[t])}function qn(n,t,e,r){e[r++]=lt*(n[t++]/p.radius),e[r++]=lt*(Math.PI/2-2*Math.atan(Math.exp(-1*n[t++]/p.radius))),e[r]=n[t]}function zn(n,t,e,r){qn(n,t,e,r),Nn(e,r,e,r)}function Gn(n,t,e,r){qn(n,t,e,r),Hn(e,r,e,r)}function An(n,t,e,r){const s=.4999999*Math.PI,o=M(it*n[t+1],-s,s),u=Math.sin(o);e[r++]=it*n[t]*p.radius,e[r++]=p.halfSemiMajorAxis*Math.log((1+u)/(1-u)),e[r]=n[t+2]}function Wn(t){if(n(t))return!1;const e=Un(t,st);return!!nt[e][6]}function Zn(n,t,e,r,s=0){const o=r+s,u=Math.cos(e);n[0]=Math.cos(t)*u*o,n[1]=Math.sin(t)*u*o,n[2]=Math.sin(e)*o}function _n(n,t,e,r,s){const o=s+n[t+2],u=it*n[t+1],a=it*n[t],i=Math.cos(u);e[r++]=Math.cos(a)*i*o,e[r++]=Math.sin(a)*i*o,e[r]=Math.sin(u)*o}function Bn(n,t,e,r){_n(n,t,e,r,h.radius)}function Ln(n,t,e,r){_n(n,t,e,r,m.radius)}function Nn(n,t,e,r){_n(n,t,e,r,p.radius)}function On(n,t,e,r,s){const o=n[t],u=n[t+1],a=n[t+2],i=Math.sqrt(o*o+u*u+a*a),l=g(a/(0===i?1:i)),c=Math.atan2(u,o);e[r++]=lt*c,e[r++]=lt*l,e[r]=i-s}function Jn(n,t,e,r){On(n,t,e,r,h.radius)}function Kn(n,t,e,r){On(n,t,e,r,m.radius)}function Vn(n,t,e,r){On(n,t,e,r,p.radius)}function Xn(n,t,e,r){Vn(n,t,e,r),An(e,r,e,r)}function Dn(n,t,e,r){Vn(n,t,e,r),Hn(e,r,e,r)}function Hn(n,t,e,r){!function(n,t,e,r,s){const o=it*n[t],u=it*n[t+1],a=n[t+2],i=Math.sin(u),l=Math.cos(u),c=s.radius/Math.sqrt(1-s.eccentricitySquared*i*i);e[r++]=(c+a)*l*Math.cos(o),e[r++]=(c+a)*l*Math.sin(o),e[r++]=(c*(1-s.eccentricitySquared)+a)*i}(n,t,e,r,p)}function Qn(n,t,e,r){const s=B,o=n[t],u=n[t+1],a=n[t+2];let i,l,c,f,h,m,d,M,j,R,g,k,w,y,E,x,S,I,T,P,b;i=Math.abs(a),l=o*o+u*u,c=Math.sqrt(l),f=l+a*a,h=Math.sqrt(f),P=Math.atan2(u,o),m=a*a/f,d=l/f,y=s.a2/h,E=s.a3-s.a4/h,d>.3?(M=i/h*(1+d*(s.a1+y+m*E)/h),T=Math.asin(M),R=M*M,j=Math.sqrt(1-R)):(j=c/h*(1-m*(s.a5-y-d*E)/h),T=Math.acos(j),R=1-j*j,M=Math.sqrt(R)),g=1-p.eccentricitySquared*R,k=p.radius/Math.sqrt(g),w=s.a6*k,y=c-k*j,E=i-w*M,S=j*y+M*E,x=j*E-M*y,I=x/(w/g+S),T+=I,b=S+x*I/2,a<0&&(T=-T),e[r++]=lt*P,e[r++]=lt*T,e[r]=b}function Yn(n,t,e,r){Qn(n,t,e,r),Nn(e,r,e,r)}function $n(n,t,e,r){Qn(n,t,e,r),An(e,r,e,r)}!function(n){n.x2lon=function(n){return n/p.radius},n.y2lat=function(n){return Math.PI/2-2*Math.atan(Math.exp(-1*n/p.radius))},n.lon2x=function(n){return n*p.radius},n.lat2y=function(n){const t=Math.sin(n);return p.radius/2*Math.log((1+t)/(1-t))}}(Fn||(Fn={}));const nt={2:{5:null,8:null,10:null,6:vn,1:Nn,7:null,9:null,0:null,3:An,2:vn,4:Hn},5:{5:vn,8:null,10:null,6:vn,1:Nn,7:null,9:null,0:null,3:null,2:null,4:Hn},8:{5:null,8:vn,10:null,6:null,1:null,7:Ln,9:null,0:null,3:null,2:null,4:null},10:{5:null,8:null,10:vn,6:null,1:null,7:null,9:Bn,0:null,3:null,2:null,4:null},3:{5:null,8:null,10:null,6:qn,1:zn,7:null,9:null,0:null,3:vn,2:qn,4:Gn},4:{5:Qn,8:null,10:null,6:Qn,1:Yn,7:null,9:null,0:null,3:$n,2:Qn,4:vn},1:{5:Vn,8:null,10:null,6:Vn,1:vn,7:null,9:null,0:null,3:Xn,2:Vn,4:Dn},7:{5:null,8:Kn,10:null,6:null,1:null,7:vn,9:null,0:null,3:null,2:null,4:null},9:{5:null,8:null,10:Jn,6:null,1:null,7:null,9:vn,0:null,3:null,2:null,4:null},0:{5:null,8:null,10:null,6:null,1:null,7:null,9:null,0:vn,3:null,2:null,4:null},6:{5:null,8:null,10:null,6:vn,1:Nn,7:null,9:null,0:null,3:null,2:vn,4:Hn}};function tt(t,e,r=rt()){return n(t)||n(e)?null:et(t,e,r).projector}function et(t,e,r){if(n(t)||n(e)||r.source.spatialReference===t&&r.dest.spatialReference===e)return r;const s=Un(t,r.source),u=Un(e,r.dest);return 0===s&&0===u?o(t,e)?r.projector=vn:r.projector=null:r.projector=nt[s][u],r}function rt(){return{source:{spatialReference:null,spatialReferenceId:0,metersPerUnit:1},dest:{spatialReference:null,spatialReferenceId:0,metersPerUnit:1},projector:vn}}const st={spatialReference:null,spatialReferenceId:0},ot={spatialReference:null,spatialReferenceId:0},ut=rt(),at=rt(),it=j(1),lt=R(1),ct=k(),ft=k(),pt=k(),ht=k(),mt=k();export{Wn as canProjectToWGS84ComparableLonLat,en as canProjectWithoutEngine,Cn as computeLatLonToENURotation,bn as computeLinearTransformation,sn as getProjectorName,Y as getTransformation,$ as getTransformations,rn as initializeProjection,V as isLoaded,X as isSupported,D as load,Pn as localLinearScaleFactors,Zn as lonLatToSphericalPCPF,H as project,Tn as projectBoundingRect,In as projectBoundingSphere,En as projectBuffer,xn as projectDirection,mn as projectExtent,Q as projectMany,an as projectMultipoint,on as projectPoint,Rn as projectPointToVector,wn as projectPointToWGS84ComparableLonLat,pn as projectPolygon,cn as projectPolyline,jn as projectVectorToDehydratedPoint,Mn as projectVectorToPoint,kn as projectVectorToVector,yn as projectVectorToWGS84ComparableLonLat,gn as projectXYZToVector,On as sphericalECEFToSphericalPCPF,tn as unload,Fn as webMercator};