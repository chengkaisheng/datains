// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../chunks/_rollupPluginBabelHelpers ../../../core/has ../../../core/maybe ../../../geometry/SpatialReference ../../../chunks/vec3 ../../../geometry/projectionEllipsoid ../../../core/unitUtils ../../../chunks/mat4 ../../../geometry/projection ../../../layers/graphics/dehydratedFeatures ./stack ./geometryUtils ./geometryUtils/coordinateSystem".split(" "),function(m,t,n,u,v,p,w,x,y,h,q,k,l,d){n=function(){function f(a,b,c,g){this.viewingMode=a;this.spatialReference=b;this.unitInMeters=
c;this.coordinateSystem=g;this._coordinateSystem=d.create(g)}var e=f.prototype;e.getAltitude=function(a){return d.altitudeAt(this.coordinateSystem,a)};e.setAltitude=function(a,b){d.setAltitudeAt(this.coordinateSystem,b,a,b)};e.setAltitudeOfTransformation=function(a,b){d.setAltitudeOfTransformation(this.coordinateSystem,b,a,b)};e.worldUpAtPosition=function(a,b){return d.normalAt(this.coordinateSystem,a,b)};e.worldBasisAtPosition=function(a,b,c){return d.axisAt(this.coordinateSystem,a,b,c)};e.basisMatrixAtPosition=
function(a,b){const c=this.worldBasisAtPosition(a,0,k.sv3d.get()),g=this.worldBasisAtPosition(a,1,k.sv3d.get());a=this.worldBasisAtPosition(a,2,k.sv3d.get());y.set(b,c[0],c[1],c[2],0,g[0],g[1],g[2],0,a[0],a[1],a[2],0,0,0,0,1);return b};e.intersectManifoldClosestSilhouette=function(a,b,c){d.elevate(this.coordinateSystem,b,this._coordinateSystem);d.intersectRayClosestSilhouette(this._coordinateSystem,a,c);return c};e.intersectManifold=function(a,b,c){d.elevate(this.coordinateSystem,b,this._coordinateSystem);
b=k.sv3d.get();return d.intersectRay(this._coordinateSystem,a,b)?(p.copy(c,b),!0):!1};e.intersectInfiniteManifold=function(a,b,c){if(1===this.viewingMode)return this.intersectManifold(a,b,c);d.elevate(this.coordinateSystem,b,this._coordinateSystem);b=this._coordinateSystem.value;const g=k.sv3d.get();return l.plane.intersectRay(b.plane,a,g)?(p.copy(c,g),!0):!1};e.toRenderCoords=function(a,b,c){return q.isDehydratedPoint(a)?h.projectPointToVector(a,b,this.spatialReference):h.projectVectorToVector(a,
b,c,this.spatialReference)};e.fromRenderCoords=function(a,b,c){return q.isDehydratedPoint(b)?h.projectVectorToDehydratedPoint(a,this.spatialReference,b,c):b instanceof v?h.projectVectorToPoint(a,this.spatialReference,b):h.projectVectorToVector(a,this.spatialReference,b,u.unwrap(c))};f.createGlobal=function(a){const b=d.fromValues(l.sphere,l.sphere.fromValues(w.getReferenceEllipsoid(a).radius,[0,0,0]));return new f(1,a,1,b)};f.createLocal=function(a){const b=d.fromValues(l.boundedPlane,l.boundedPlane.fromValues([0,
0,0],[r,0,0],[0,r,0])),c=x.getMetersPerUnitForSR(a);return new f(2,a,c,b)};f.createMode=function(a,b){switch(a){case 2:return f.createLocal(b);case 1:return f.createGlobal(b)}};t._createClass(f,[{key:"extent",set:function(a){a&&d.setExtent(this.coordinateSystem,a,this.coordinateSystem)}}]);return f}();const r=Math.pow(2,50);m.RenderCoordsHelper=n;Object.defineProperty(m,"__esModule",{value:!0})});