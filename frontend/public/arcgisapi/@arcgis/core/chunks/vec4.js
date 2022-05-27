/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{E as t,R as n}from"./common.js";function a(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function r(t,n,a,r,u){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t}function u(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t}function o(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}function e(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t[3]=n[3]*a[3],t}function s(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t[3]=n[3]/a[3],t}function c(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t}function i(t,n){const a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2],o=n[3]-t[3];return Math.sqrt(a*a+r*r+u*u+o*o)}function h(t,n){const a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2],o=n[3]-t[3];return a*a+r*r+u*u+o*o}function M(t){const n=t[0],a=t[1],r=t[2],u=t[3];return Math.sqrt(n*n+a*a+r*r+u*u)}function f(t){const n=t[0],a=t[1],r=t[2],u=t[3];return n*n+a*a+r*r+u*u}function l(t,n){const a=n[0],r=n[1],u=n[2],o=n[3];let e=a*a+r*r+u*u+o*o;return e>0&&(e=1/Math.sqrt(e),t[0]=a*e,t[1]=r*e,t[2]=u*e,t[3]=o*e),t}function m(t,n,a,r){const u=n[0],o=n[1],e=n[2],s=n[3];return t[0]=u+r*(a[0]-u),t[1]=o+r*(a[1]-o),t[2]=e+r*(a[2]-e),t[3]=s+r*(a[3]-s),t}function d(t,n,a){const r=n[0],u=n[1],o=n[2],e=n[3];return t[0]=a[0]*r+a[4]*u+a[8]*o+a[12]*e,t[1]=a[1]*r+a[5]*u+a[9]*o+a[13]*e,t[2]=a[2]*r+a[6]*u+a[10]*o+a[14]*e,t[3]=a[3]*r+a[7]*u+a[11]*o+a[15]*e,t}function b(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}let x=o,q=e,p=s,v=i,_=h,g=M,j=f;var w=Object.freeze({__proto__:null,copy:a,set:r,add:u,subtract:o,multiply:e,divide:s,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t[3]=Math.min(n[3],a[3]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t[3]=Math.max(n[3],a[3]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t},scale:c,scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t},distance:i,squaredDistance:h,length:M,squaredLength:f,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},normalize:l,dot:function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},lerp:m,random:function(t,a){let r,u,o,e,s,c;a=a||1;do{r=2*n()-1,u=2*n()-1,s=r*r+u*u}while(s>=1);do{o=2*n()-1,e=2*n()-1,c=o*o+e*e}while(c>=1);const i=Math.sqrt((1-s)/c);return t[0]=a*r,t[1]=a*u,t[2]=a*o*i,t[3]=a*e*i,t},transformMat4:d,transformQuat:function(t,n,a){const r=n[0],u=n[1],o=n[2],e=a[0],s=a[1],c=a[2],i=a[3],h=i*r+s*o-c*u,M=i*u+c*r-e*o,f=i*o+e*u-s*r,l=-e*r-s*u-c*o;return t[0]=h*i+l*-e+M*-c-f*-s,t[1]=M*i+l*-s+f*-e-h*-c,t[2]=f*i+l*-c+h*-s-M*-e,t[3]=n[3],t},str:function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},exactEquals:b,equals:function(n,a){const r=n[0],u=n[1],o=n[2],e=n[3],s=a[0],c=a[1],i=a[2],h=a[3];return Math.abs(r-s)<=t*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(u-c)<=t*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(o-i)<=t*Math.max(1,Math.abs(o),Math.abs(i))&&Math.abs(e-h)<=t*Math.max(1,Math.abs(e),Math.abs(h))},sub:x,mul:q,div:p,dist:v,sqrDist:_,len:g,sqrLen:j});export{c as a,u as b,a as c,h as d,b as e,m as l,l as n,r as s,d as t,w as v};
