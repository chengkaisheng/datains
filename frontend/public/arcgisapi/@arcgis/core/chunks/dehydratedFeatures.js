/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import"./object.js";import{e}from"../core/lang.js";import{i as t,b as s}from"./Logger.js";import n from"../geometry/SpatialReference.js";import{f as r}from"./typeUtils.js";import{g as a}from"./uid.js";import{c as i,e as o,a as l}from"./aaBoundingRect.js";import u from"../layers/support/Field.js";import{c,b as h,d as p}from"./aaBoundingBox.js";import{u as m,a as f,b as g,c as y}from"./quantizationUtils.js";function b(e){return 32+e.length}function d(){return 16}class x{constructor(e,t,s){this.uid=e,this.geometry=t,this.attributes=s,this.visible=!0,this.objectId=null,this.centroid=null}}function Z(e){return t(e.geometry)}class j{constructor(){this.exceededTransferLimit=!1,this.features=[],this.fields=[],this.hasM=!1,this.hasZ=!1,this.geometryType=null,this.objectIdFieldName=null,this.globalIdFieldName=null,this.geometryProperties=null,this.geohashFieldName=null,this.spatialReference=null,this.transform=null}}function M(e){return"point"===e.type}function k(e){const t=r.fromJSON(e.geometryType),s=n.fromJSON(e.spatialReference),i=e.transform,o=e.features.map((n=>{const r=function(e,t,s,n){return{uid:a(),objectId:n&&e.attributes?e.attributes[n]:null,attributes:e.attributes,geometry:N(e.geometry,t,s),visible:!0}}(n,t,s,e.objectIdFieldName),o=r.geometry;if(o&&i)switch(o.type){case"point":r.geometry=y(i,o,o,o.hasZ,o.hasM);break;case"multipoint":r.geometry=g(i,o,o,o.hasZ,o.hasM);break;case"polygon":r.geometry=f(i,o,o,o.hasZ,o.hasM);break;case"polyline":r.geometry=m(i,o,o,o.hasZ,o.hasM)}return r}));return{geometryType:t,features:o,spatialReference:s,fields:e.fields?e.fields.map((e=>u.fromJSON(e))):null,objectIdFieldName:e.objectIdFieldName,globalIdFieldName:e.globalIdFieldName,geohashFieldName:e.geohashFieldName,geometryProperties:e.geometryProperties,hasZ:e.hasZ,hasM:e.hasM,exceededTransferLimit:e.exceededTransferLimit,transform:null}}function N(e,t,s){if(!e)return null;switch(t){case"point":{const t=e;return{x:t.x,y:t.y,z:t.z,m:t.m,hasZ:null!=t.z,hasM:null!=t.m,type:"point",spatialReference:s}}case"polyline":{const t=e;return{paths:t.paths,hasZ:!!t.hasZ,hasM:!!t.hasM,type:"polyline",spatialReference:s}}case"polygon":{const t=e;return{rings:t.rings,hasZ:!!t.hasZ,hasM:!!t.hasM,type:"polygon",spatialReference:s}}case"multipoint":{const t=e;return{points:t.points,hasZ:!!t.hasZ,hasM:!!t.hasM,type:"multipoint",spatialReference:s}}}}function v(e,t,s,n){return{x:e,y:t,z:s,hasZ:null!=s,hasM:!1,spatialReference:n,type:"point"}}function F(e){if(!e)return 0;let t=32;for(const s in e)if(e.hasOwnProperty(s)){const n=e[s];switch(typeof n){case"string":t+=b(n);break;default:case"number":t+=16}}return t}function I(t){let n=32;return n+=F(t.attributes),n+=3,n+=8+function(t){if(s(t))return 0;let n=32;switch(t.type){case"point":n+=42;break;case"polyline":case"polygon":{let e=0;const s=2+(t.hasZ?1:0)+(t.hasM?1:0),r="polyline"===t.type?t.paths:t.rings;for(const t of r)e+=t.length;n+=8*e*s+64,n+=128*e,n+=34,n+=32*(r.length+1);break}case"multipoint":{const e=2+(t.hasZ?1:0)+(t.hasM?1:0),s=t.points.length;n+=8*s*e+64,n+=128*s,n+=34,n+=32;break}case"extent":n+=98,t.hasM&&(n+=32),t.hasZ&&(n+=32);break;case"mesh":n+=e(t.vertexAttributes.position),n+=e(t.vertexAttributes.normal),n+=e(t.vertexAttributes.uv),n+=e(t.vertexAttributes.tangent)}return n}(t.geometry),n}function z(e){if(s(e))return 0;switch(e.type){case"point":return 1;case"polyline":{let t=0;for(const s of e.paths)t+=s.length;return t}case"polygon":{let t=0;for(const s of e.rings)t+=s.length;return t}case"multipoint":return e.points.length;case"extent":return 2;case"mesh":{const t=e.vertexAttributes&&e.vertexAttributes.position;return t?t.length/3:0}default:return}}function R(e){if(!e)return!1;switch(e.type){case"extent":case"point":return!0;case"polyline":for(const t of e.paths)if(t.length>0)return!0;return!1;case"polygon":for(const t of e.rings)if(t.length>0)return!0;return!1;case"multipoint":return e.points.length>0;case"mesh":return e.vertexAttributes&&e.vertexAttributes.position&&e.vertexAttributes.position.length>0;default:return}}function w(e,t){switch(h(t),"mesh"===e.type&&(e=e.extent),e.type){case"point":t[0]=t[3]=e.x,t[1]=t[4]=e.y,e.hasZ&&(t[2]=t[5]=e.z);break;case"polyline":for(let s=0;s<e.paths.length;s++)p(t,e.paths[s],e.hasZ);break;case"polygon":for(let s=0;s<e.rings.length;s++)p(t,e.rings[s],e.hasZ);break;case"multipoint":p(t,e.points,e.hasZ);break;case"extent":t[0]=e.xmin,t[1]=e.ymin,t[3]=e.xmax,t[4]=e.ymax,null!=e.zmin&&(t[2]=e.zmin),null!=e.zmax&&(t[5]=e.zmax)}}function A(e,t){switch(o(t),"mesh"===e.type&&(e=e.extent),e.type){case"point":t[0]=t[2]=e.x,t[1]=t[3]=e.y;break;case"polyline":for(let s=0;s<e.paths.length;s++)l(t,e.paths[s]);break;case"polygon":for(let s=0;s<e.rings.length;s++)l(t,e.rings[s]);break;case"multipoint":l(t,e.points);break;case"extent":t[0]=e.xmin,t[1]=e.ymin,t[2]=e.xmax,t[3]=e.ymax}}function T(e,t){return null!=e.objectId?e.objectId:e.attributes&&t?e.attributes[t]:null}c(),i();export{j as D,x as a,w as b,A as c,b as d,F as e,d as f,T as g,Z as h,M as i,k as j,I as k,R as l,v as m,z as n};
