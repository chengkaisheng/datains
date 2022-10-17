// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../core/maybe ../../../../geometry/support/coordsUtils ../../../../geometry/support/centroid ../../../../core/mathUtils ../../../../chunks/vec3f64 ../../../../chunks/mat4 ../../../../geometry/support/aaBoundingRect ../../../../geometry/projection ../../../../chunks/mat4f64 ../../../../chunks/vec2f64 ../../../../chunks/vec4f64 ../../../../chunks/vec4 ../../../../geometry/support/aaBoundingBox ../../../../layers/graphics/dehydratedFeatures ../../../../layers/graphics/hydratedFeatures".split(" "),
function(h,l,w,D,E,x,t,F,G,H,k,y,I,z,u,A){function B(a){var b=a.paths[0];if(!b||0===b.length)return null;b=w.getPointOnPath(b,w.getPathLength(b)/2);return u.makeDehydratedPoint(b[0],b[1],b[2],a.spatialReference)}function m(a,b,c){c=c?a:A.clonePoint(a);return b&&a?G.projectPoint(a,c,b)?c:null:c}function v(a){if(Array.isArray(a)){for(const b of a)if(!v(b))return!1;return!0}return null==a||0<=a}k={"bottom-left":k.fromValues(0,0),bottom:k.fromValues(.5,0),"bottom-right":k.fromValues(1,0),left:k.fromValues(0,
.5),center:k.fromValues(.5,.5),right:k.fromValues(1,.5),"top-left":k.fromValues(0,1),top:k.fromValues(.5,1),"top-right":k.fromValues(1,1)};h.computeCentroid=function(a,b){if("point"===a.type)return m(a,b,!1);if(A.isHydratedGeometry(a))switch(a.type){case "extent":return m(a.center,b,!1);case "polygon":return m(a.centroid,b,!1);case "polyline":return m(B(a),b,!0);case "mesh":return m(a.extent.center,b,!1)}else switch(a.type){case "extent":var c=E.isFinite(a.zmin);a=u.makeDehydratedPoint(.5*(a.xmax+
a.xmin),.5*(a.ymax+a.ymin),c?.5*(a.zmax+a.zmin):void 0,a.spatialReference);return m(a,b,!0);case "polygon":return(c=a.rings[0])&&0!==c.length?(c=D.ringsCentroid(a.rings,a.hasZ),a=u.makeDehydratedPoint(c[0],c[1],c[2],a.spatialReference)):a=null,m(a,b,!0);case "polyline":return m(B(a),b,!0)}};h.computeObjectRotation=function(a,b,c,d=H.create()){a=a||0;b=b||0;c=c||0;0!==a&&t.rotateZ(d,d,-a/180*Math.PI);0!==b&&t.rotateX(d,d,b/180*Math.PI);0!==c&&t.rotateY(d,d,c/180*Math.PI);return d};h.computeObjectScale=
function(a=x.ONES,b,c,d=1){const e=Array(3);if(l.isNone(b)||l.isNone(c))e[0]=1,e[1]=1,e[2]=1;else{let g=0;for(let n=2;0<=n;n--){const p=a[n];let q;const C=null!=p,J=0===n&&!f&&!C,r=c[n];"symbol-value"===p||J?q=0!==r?b[n]/r:1:C&&"proportional"!==p&&isFinite(p)&&(q=0!==r?p/r:1);if(null!=q){var f=e[n]=q;g=Math.max(g,Math.abs(q))}}for(a=2;0<=a;a--)null==e[a]?e[a]=f:0===e[a]&&(e[a]=.001*g)}for(f=2;0<=f;f--)e[f]/=d;return x.fromArray(e)};h.demResolutionForBoundingBox=function(a,b){return null!=b.minDemResolution?
b.minDemResolution:z.isPoint(a)?b.minDemResolutionForPoints:.01*z.maximumDimension(a)};h.enlargeExtent=function(a,b,c,d=0){if(a){b||(b=F.create());let e=.5*a.width*(c-1);c=.5*a.height*(c-1);a.width<1E-7*a.height?e+=c/20:a.height<1E-7*a.width&&(c+=e/20);I.set(b,a.xmin-e-d,a.ymin-c-d,a.xmax+e+d,a.ymax+c+d);return b}return null};h.isValidSize=v;h.mixinColorAndOpacity=function(a,b){const c=y.clone(y.ONES);l.isSome(a)&&(c[0]=a[0],c[1]=a[1],c[2]=a[2]);l.isSome(b)?c[3]=b:l.isSome(a)&&3<a.length&&(c[3]=a[3]);
return c};h.namedAnchorToHUDMaterialAnchorPos=k;h.overrideColor=function(a,b,c,d,e,f=[0,0,0,0]){for(let g=0;3>g;++g)l.isSome(a)&&null!=a[g]?f[g]=a[g]:l.isSome(c)&&null!=c[g]?f[g]=c[g]:f[g]=e[g];l.isSome(b)?f[3]=b:l.isSome(d)?f[3]=d:f[3]=e[3];return f};h.updateVertexAttributeAuxpos1w=function(a,b){for(let c=0;c<a.geometries.length;++c){const d=a.geometries[c].data.vertexAttributes.auxpos1;d&&d.data[3]!==b&&(d.data[3]=b,a.geometryVertexAttrsUpdated(c))}};h.validateSymbolLayerSize=function(a){null!=
a.isPrimitive&&(a=[a.width,a.depth,a.height]);return v(a)?null:"Symbol sizes may not be negative values"};Object.defineProperty(h,"__esModule",{value:!0})});