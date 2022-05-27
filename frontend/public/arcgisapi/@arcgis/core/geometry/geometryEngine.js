/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import"../chunks/tslib.es6.js";import"../chunks/ArrayPool.js";import"../chunks/object.js";import"../chunks/deprecate.js";import"../core/lang.js";import"../config.js";import"../chunks/Logger.js";import"../chunks/string.js";import"../chunks/metadata.js";import"../core/accessorSupport/decorators/property.js";import"../core/Accessor.js";import"../chunks/PropertyOrigin.js";import"../core/scheduling.js";import"../core/promiseUtils.js";import"../chunks/Message.js";import"../core/Error.js";import"../chunks/ensureType.js";import"../core/accessorSupport/decorators/subclass.js";import"../chunks/JSONSupport.js";import"../core/urlUtils.js";import"../core/accessorSupport/decorators/cast.js";import"../chunks/reader.js";import"../chunks/writer.js";import"../chunks/resourceExtension.js";import"./SpatialReference.js";import"./Geometry.js";import"./Point.js";import"../chunks/Ellipsoid.js";import"./support/webMercatorUtils.js";import"./Extent.js";import"../chunks/zmUtils.js";import"./Multipoint.js";import"./Polygon.js";import"../chunks/extentUtils.js";import"./Polyline.js";import"../chunks/_commonjsHelpers.js";import{a as r}from"../chunks/geometryEngineBase.js";import{hydratedAdapter as n}from"../chunks/hydrated.js";function t(r){return Array.isArray(r)?r[0].spatialReference:r&&r.spatialReference}function e(n){return r.extendedSpatialReferenceInfo(n)}function o(e,o){return r.clip(n,t(e),e,o)}function i(e,o){return r.cut(n,t(e),e,o)}function s(e,o){return r.contains(n,t(e),e,o)}function c(e,o){return r.crosses(n,t(e),e,o)}function u(e,o,i){return r.distance(n,t(e),e,o,i)}function l(e,o){return r.equals(n,t(e),e,o)}function p(e,o){return r.intersects(n,t(e),e,o)}function f(e,o){return r.touches(n,t(e),e,o)}function a(e,o){return r.within(n,t(e),e,o)}function m(e,o){return r.disjoint(n,t(e),e,o)}function j(e,o){return r.overlaps(n,t(e),e,o)}function h(e,o,i){return r.relate(n,t(e),e,o,i)}function g(e){return r.isSimple(n,t(e),e)}function d(e){return r.simplify(n,t(e),e)}function k(e,o=!1){return r.convexHull(n,t(e),e,o)}function x(e,o){return r.difference(n,t(e),e,o)}function E(e,o){return r.symmetricDifference(n,t(e),e,o)}function w(e,o){return r.intersect(n,t(e),e,o)}function y(e,o=null){return r.union(n,t(e),e,o)}function A(e,o,i,s,c,u){return r.offset(n,t(e),e,o,i,s,c,u)}function S(e,o,i,s=!1){return r.buffer(n,t(e),e,o,i,s)}function R(e,o,i,s,c,u){return r.geodesicBuffer(n,t(e),e,o,i,s,c,u)}function I(e,o,i=!0){return r.nearestCoordinate(n,t(e),e,o,i)}function b(e,o){return r.nearestVertex(n,t(e),e,o)}function v(e,o,i,s){return r.nearestVertices(n,t(e),e,o,i,s)}function O(r){return"xmin"in r?"center"in r?r.center:null:"x"in r?r:"extent"in r?r.extent.center:null}function P(n,t,e){var o;if(null==n)throw new Error("Illegal Argument Exception");const i=n.spatialReference;if(null==(e=null!=(o=e)?o:O(n)))throw new Error("Illegal Argument Exception");const s=n.constructor.fromJSON(r.rotate(n,t,e));return s.spatialReference=i,s}function U(n,t){var e;if(null==n)throw new Error("Illegal Argument Exception");const o=n.spatialReference;if(null==(t=null!=(e=t)?e:O(n)))throw new Error("Illegal Argument Exception");const i=n.constructor.fromJSON(r.flipHorizontal(n,t));return i.spatialReference=o,i}function J(n,t){var e;if(null==n)throw new Error("Illegal Argument Exception");const o=n.spatialReference;if(null==(t=null!=(e=t)?e:O(n)))throw new Error("Illegal Argument Exception");const i=n.constructor.fromJSON(r.flipVertical(n,t));return i.spatialReference=o,i}function N(e,o,i,s){return r.generalize(n,t(e),e,o,i,s)}function z(e,o,i){return r.densify(n,t(e),e,o,i)}function H(e,o,i,s=0){return r.geodesicDensify(n,t(e),e,o,i,s)}function L(e,o){return r.planarArea(n,t(e),e,o)}function M(e,o){return r.planarLength(n,t(e),e,o)}function V(e,o,i){return r.geodesicArea(n,t(e),e,o,i)}function B(e,o,i){return r.geodesicLength(n,t(e),e,o,i)}export{S as buffer,o as clip,s as contains,k as convexHull,c as crosses,i as cut,z as densify,x as difference,m as disjoint,u as distance,l as equals,e as extendedSpatialReferenceInfo,U as flipHorizontal,J as flipVertical,N as generalize,V as geodesicArea,R as geodesicBuffer,H as geodesicDensify,B as geodesicLength,w as intersect,p as intersects,g as isSimple,I as nearestCoordinate,b as nearestVertex,v as nearestVertices,A as offset,j as overlaps,L as planarArea,M as planarLength,h as relate,P as rotate,d as simplify,E as symmetricDifference,f as touches,y as union,a as within};