// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../core/has ../../../../core/maybe ../../../../core/Logger ../../../../chunks/vec3f64 ../../../../chunks/vec3 ../../../../chunks/vec2f64 ../../../../chunks/vec4f64 ../../../../geometry/support/aaBoundingBox ../../webgl-engine/materials/HUDMaterial ./graphicSymbolUtils".split(" "),function(t,n,f,y,u,z,A,B,p,C,v){function q(a){a=v.getGraphics3DSymbol(a.graphics3DGraphic.graphics3DSymbol);return f.isSome(a)?a.symbol.symbolLayers.getItemAt(0):null}function D(a,b){var c=b.graphics3DGraphic.graphic.geometry;
if(f.isNone(c))return null;if(f.isSome(b.disablePlacement))return b.labelClass.labelPlacement?(h.warnOncePerTick(w(a.placement,b.disablePlacement.logEntityDescription)),m(b)):a;c=c.type;switch(c){case "polyline":case "polygon":case "extent":case "multipoint":if(b.labelClass.labelPlacement)return h.warnOncePerTick(w(a.placement,`'${c}' geometries`)),m(b)}return a}function w(a,b){return`the requested label placement '${a}' is currently unsupported for ${b} in SceneView`}function m(a){const b=a.graphics3DGraphic.graphic.geometry;
if(f.isNone(b))return null;switch(b.type){case "polyline":case "extent":case "multipoint":return{placement:"center-center",normalizedOffset:null,anchor:"center"};case "polygon":return a=q(a),f.isSome(a)&&"extrude"===a.type?g["above-center"]:{placement:"center-center",normalizedOffset:null,anchor:"center"};case "point":return g["above-center"];case "mesh":return g["above-center"]}}function E(a,b=F){({graphics3DGraphic:a}=a);a=a._graphics[0];(a=f.isSome(a)?a.stageObject.geometryRecords[0].material:
null)&&a instanceof C.HUDMaterial?(a=a.params.anchorPos,b[0]=2*(a[0]-.5),b[1]=2*(a[1]-.5)):(b[0]=0,b[1]=0);return b}function r(a,b,c){c=c.graphics3DGraphic._graphics[0];c=f.isSome(c)?c.getBoundingBoxObjectSpace(k):k;c=u.fromValues(c[3]-c[0],c[4]-c[1],c[5]-c[2]);a.centerOffset[0]=Math.sqrt(c[0]*c[0]+c[1]*c[1])/2*b.normalizedOffset[0];const d=a.translation[2],e=c[2]/2*b.normalizedOffset[1];a.translation[2]=0;a.elevationOffset=d+e;c=z.length(c);a.centerOffset[2]=c/2*b.normalizedOffset[2]}function G(a){const b=
a.labelClass.labelPlacement,{labelSymbol:c,graphics3DGraphic:d}=a;var e=v.getGraphics3DSymbol(d.graphics3DSymbol);e=f.isSome(e)?e.symbol:null;a=g[b]||m(a);if("point-3d"===e.type&&e.supportsCallout()&&e.hasVisibleVerticalOffset()&&!d.isDraped)return{placement:null,hasLabelVerticalOffset:!1,verticalOffset:x(e.verticalOffset),anchor:null,normalizedOffset:null};if(c&&c.hasVisibleVerticalOffset()&&("point-3d"!==e.type||!e.supportsCallout()||!e.verticalOffset||d.isDraped)){a:switch(a.placement){case "above-center":e=
!0;break a;default:e=!1}return e?{placement:"above-center",verticalOffset:x(c.verticalOffset),anchor:"bottom",normalizedOffset:[0,a.normalizedOffset[1],0],hasLabelVerticalOffset:!0}:(h.errorOncePerTick("Callouts and vertical offset on labels are currently only supported with 'above-center' label placement (not with "+b+" placement)"),null)}return{placement:null,verticalOffset:null,anchor:null,normalizedOffset:null,hasLabelVerticalOffset:!1}}function x(a){const {screenLength:b,minWorldLength:c,maxWorldLength:d}=
a;return{screenLength:b,minWorldLength:c,maxWorldLength:d}}const h=y.getLogger("esri.views.3d.layers.graphics.labelPlacement"),g={"above-center":{placement:"above-center",normalizedOffset:[0,1,0],anchor:"bottom"},"above-left":{placement:"above-left",normalizedOffset:[-1,1,0],anchor:"bottom-right"},"above-right":{placement:"above-right",normalizedOffset:[1,1,0],anchor:"bottom-left"},"below-center":{placement:"below-center",normalizedOffset:[0,-1,2],anchor:"top"},"below-left":{placement:"below-left",
normalizedOffset:[-1,-1,0],anchor:"top-right"},"below-right":{placement:"below-right",normalizedOffset:[1,-1,0],anchor:"top-left"},"center-center":{placement:"center-center",normalizedOffset:[0,0,1],anchor:"center"},"center-left":{placement:"center-left",normalizedOffset:[-1,0,0],anchor:"right"},"center-right":{placement:"center-right",normalizedOffset:[1,0,0],anchor:"left"}};n={"above-center":["default","esriServerPointLabelPlacementAboveCenter"],"above-left":["esriServerPointLabelPlacementAboveLeft"],
"above-right":["esriServerPointLabelPlacementAboveRight"],"below-center":["esriServerPointLabelPlacementBelowCenter"],"below-left":["esriServerPointLabelPlacementBelowLeft"],"below-right":["esriServerPointLabelPlacementBelowRight"],"center-center":["esriServerPointLabelPlacementCenterCenter"],"center-left":["esriServerPointLabelPlacementCenterLeft"],"center-right":["esriServerPointLabelPlacementCenterRight"]};for(const a in n){const b=g[a];n[a].forEach(c=>{g[c]=b})}Object.freeze&&(Object.freeze(g),
Object.keys(g).forEach(function(a){Object.freeze(g[a]);Object.freeze(g[a].normalizedOffset)}));const l=[0,0],F=[0,0],k=p.create();t.get=function(a){var b=G(a);if(f.isNone(b))return null;if(b.anchor)var c=b;else{c=a.labelClass.labelPlacement;var d=g[c],e=d||m(a);c&&!d&&h.warnOncePerTick(`the requested label placement '${c}' is not currently supported in SceneView`);c=D(e,a)}if(f.isNone(c))return null;d=!!b.hasLabelVerticalOffset;b={anchor:c.anchor,verticalOffset:b.verticalOffset,screenOffset:A.create(),
centerOffset:B.fromValues(0,0,0,-1),centerOffsetUnits:"world",translation:u.create(),elevationOffset:0,hasLabelVerticalOffset:d};d=a.graphics3DGraphic.graphic.geometry;if(f.isNone(d))a=null;else{switch(d.type){case "point":d=q(a);if(!f.isNone(d))switch(a.graphics3DGraphic.getCenterObjectSpace(b.translation),d.type){case "icon":case "text":({graphics3DGraphic:d}=a);e=d._graphics[0];e=f.isSome(e)?e.getScreenSize():null;!d.isDraped&&f.isSome(e)?(a=E(a),l[0]=e[0]/2*(c.normalizedOffset[0]-a[0]),l[1]=e[1]/
2*(c.normalizedOffset[1]-a[1]),b.screenOffset[0]=l[0],b.hasLabelVerticalOffset?(b.centerOffset[1]=l[1],b.centerOffsetUnits="screen"):b.screenOffset[1]=l[1]):b.hasLabelVerticalOffset||"center"===b.anchor||(g[a.labelClass.labelPlacement]&&h.warnOncePerTick(`the requested placement '${c.placement}' is currently unsupported for draped graphics`),b.anchor="center");break;case "object":r(b,c,a)}break;case "polygon":d=q(a);if(!f.isNone(d))switch(d.type){case "extrude":d=a.graphics3DGraphic._graphics[0],
f.isSome(d)&&d.getBoundingBoxObjectSpace(k),p.center(k,b.translation),b.translation[2]=p.height(k)/2,r(b,c,a)}break;case "mesh":r(b,c,a)}a=b}return a};Object.defineProperty(t,"__esModule",{value:!0})});