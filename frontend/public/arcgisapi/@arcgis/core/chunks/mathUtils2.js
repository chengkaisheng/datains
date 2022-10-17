/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
const n=new Float32Array(1),t=Number.isFinite||function(n){return"number"==typeof n&&window.isFinite(n)},r=Number.isNaN||function(n){return n!=n};function a(n){--n;for(let t=1;t<32;t<<=1)n|=n>>t;return n+1}function u(n,t,r){return n<t?t:n>r?r:n}function e(n,t,r){return Math.min(Math.max(n,t),r)}function i(n){return 0==(n&n-1)}function s(n){return n--,n|=n>>1,n|=n>>2,n|=n>>4,n|=n>>8,n|=n>>16,++n}function o(n){return Math.pow(10,Math.ceil(Math.LOG10E*Math.log(n)))}const f=Math.sign||function(n){return+(n>0)-+(n<0)||+n},c=Math.log2||function(n){return Math.log(n)/Math.LN2};function h(n,t,r){return n+(t-n)*r}function M(n){return n*Math.PI/180}function m(n){return 180*n/Math.PI}function b(n,t=1e-6){return(n<0?-1:1)/Math.max(Math.abs(n),t)}function l(n){return Math.acos(u(n,-1,1))}function N(n){return Math.asin(u(n,-1,1))}function g(n,t,a=1e-6){if(r(n)||r(t))return!1;if(n===t)return!0;const u=Math.abs(n-t),e=Math.abs(n),i=Math.abs(t);if(0===n||0===t||e<1e-12&&i<1e-12){if(u>.01*a)return!1}else if(u/(e+i)>a)return!1;return!0}function p(n,t,a=1e-6){if(r(n)||r(t))return!1;return(n>t?n-t:t-n)<=a}function w(n){return x(Math.max(-F,Math.min(n,F)))}function x(t){return n[0]=t,n[0]}const F=x(34028234663852886e22);export{F as N,N as a,l as b,u as c,M as d,g as e,p as f,w as g,h,t as i,b as j,e as k,c as l,i as m,a as n,s as o,o as p,r as q,m as r,f as s};
