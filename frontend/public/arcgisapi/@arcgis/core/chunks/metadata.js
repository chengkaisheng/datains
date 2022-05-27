/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{clone as r}from"../core/lang.js";import{i as t,a as e}from"./Logger.js";function n(r){return o((()=>r.forEach((r=>t(r)&&r.remove()))))}function o(r){return{remove:()=>{r&&(r(),r=void 0)}}}function a(r){return o((()=>{const e=r();t(e)&&e.remove()}))}function s(r){return o(t(r)?()=>r.destroy():void 0)}function c(r,t){const e=setTimeout(r,t);return o((()=>clearTimeout(e)))}function u(r){return r?r.__accessor__?r.__accessor__:r.propertyInvalidated?r:null:null}function i(r,t){return null!=r&&r.metadatas&&null!=r.metadatas[t]}function f(r,t,e){if(e){return l(r,t,{policy:e,path:""})}return l(r,t,null)}function l(t,n,o){return n?Object.keys(n).reduce((function(t,a){let s=null,c="merge";if(o&&(s=o.path?`${o.path}.${a}`:a,c=o.policy(s)),"replace"===c)return t[a]=n[a],t;if(void 0===t[a])return t[a]=r(n[a]),t;let u=t[a],i=n[a];if(u===i)return t;if(Array.isArray(i)||Array.isArray(t))u=u?Array.isArray(u)?t[a]=u.concat():t[a]=[u]:t[a]=[],i&&(Array.isArray(i)||(i=[i]),i.forEach((r=>{-1===u.indexOf(r)&&u.push(r)})));else if(i&&"object"==typeof i)if(o){const r=o.path;o.path=e(s),t[a]=l(u,i,o),o.path=r}else t[a]=l(u,i,null);else t.hasOwnProperty(a)&&!n.hasOwnProperty(a)||(t[a]=i);return t}),t||{}):t}function p(r){return r?"string"==typeof r&&-1===r.indexOf(".")?r:y(r):r}function y(r){return Array.isArray(r)?r:r.split(".")}function _(r){return r.indexOf(",")>-1?r.split(",").map((r=>r.trim())):[r.trim()]}function d(r,t,e,o){const a=function(r){if(Array.isArray(r)){const t=[];for(const e of r)t.push(..._(e));return t}return _(r)}(t);if(1!==a.length){return n(a.map((t=>o(r,t,e))))}return o(r,a[0],e)}function m(r){let t=!1;return()=>{t||(t=!0,r())}}class h{constructor(r){this.autoDestroy=!1,this.properties=r}}function b(t){let n=t.constructor.__accessorMetadata__;const o=Object.prototype.hasOwnProperty.call(t.constructor,"__accessorMetadata__");if(n){if(!o){const e=Object.create(n.properties),o=n.autoDestroy;for(const t in e)e[t]=r(e[t]);n=new h(e),n.autoDestroy=o,Object.defineProperty(t.constructor,"__accessorMetadata__",{value:n,enumerable:!1,configurable:!0,writable:!0})}}else n=new h({}),Object.defineProperty(t.constructor,"__accessorMetadata__",{value:n,enumerable:!1,configurable:!0,writable:!0});return e(t.constructor.__accessorMetadata__)}function A(r,t){const e=function(r){return b(r).properties}(r);let n=e[t];return n||(n=e[t]={}),n}function g(r,t){return f(r,t,O)}const j=/^(?:[^.]+\.)?(?:value|type|(?:json\.type|json\.origins\.[^.]\.type))$/;function O(r){return j.test(r)?"replace":"merge"}export{A as a,g as b,b as c,p as d,d as e,o as f,u as g,n as h,i,s as j,f as m,m as o,y as p,a as r,c as t};
