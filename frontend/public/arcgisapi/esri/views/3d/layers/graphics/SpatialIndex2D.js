// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../chunks/tslib.es6 ../../../../core/has ../../../../core/Logger ../../../../core/accessorSupport/ensureType ../../../../core/accessorSupport/decorators/property ../../../../core/jsonMap ../../../../core/accessorSupport/decorators/subclass ../../../../core/urlUtils ../../../../core/uuid ../../../../portal/support/resourceExtension ../../../../core/Accessor ../../../../geometry/support/aaBoundingBox ../../../../layers/graphics/dehydratedFeatures ../../../../core/libs/rbush/PooledRBush".split(" "),
function(c,r,f,t,y,z,k,A,u,B,C,D,v,w,l,x){c.SpatialIndex2D=function(p){function m(a){a=p.call(this,a)||this;a.index=new x.PooledRBush(9,t("csp-restrictions")?b=>({minX:b.extent[0],minY:b.extent[1],maxX:b.extent[2],maxY:b.extent[3]}):[".extent[0]",".extent[1]",".extent[2]",".extent[3]"]);a.boundsByFeature=new Map;a.spatialReference=null;a.hasZ=null;a.hasM=null;a.objectIdField=null;return a}r._inheritsLoose(m,p);var e=m.prototype;e.destroy=function(){this.index.destroy();this.index=null;this.boundsByFeature.clear();
this.boundsByFeature=null};e.queryGraphicUIDsInExtent=function(a,b,g){b.equals(this.spatialReference)&&(d.minX=a[0],d.minY=a[1],d.maxX=a[2],d.maxY=a[3],this.index.search(d,h=>g(h.graphic.uid)))};e.add=function(a){a.computeExtent(this.spatialReference);this.index.insert(a);const b=l.getObjectId(a.graphic,this._get("objectIdField"));null!=b&&this.boundsByFeature.set(b,a.extent)};e.addMany=function(a,b=a.length){const g=this._get("objectIdField");for(let h=0;h<b;h++){const n=a[h];n.computeExtent(this.spatialReference);
const q=l.getObjectId(n.graphic,g);null!=q&&this.boundsByFeature.set(q,n.extent)}this.index.load(a,b)};e.remove=function(a){this.index.remove(a);a=l.getObjectId(a.graphic,this._get("objectIdField"));null!=a&&this.boundsByFeature.delete(a)};e.clear=function(){this.index.clear();this.boundsByFeature.clear()};e.forEachInBounds=function(a,b){d.minX=a[0];d.minY=a[1];d.maxX=a[2];d.maxY=a[3];this.index.search(d,g=>{b(g)})};e.getBounds=function(a,b){return(a=this.boundsByFeature.get(a))?w.fromRect(b,a):null};
return m}(v);f.__decorate([k.property({constructOnly:!0})],c.SpatialIndex2D.prototype,"spatialReference",void 0);f.__decorate([k.property({constructOnly:!0})],c.SpatialIndex2D.prototype,"hasZ",void 0);f.__decorate([k.property({constructOnly:!0})],c.SpatialIndex2D.prototype,"hasM",void 0);f.__decorate([k.property({constructOnly:!0})],c.SpatialIndex2D.prototype,"objectIdField",void 0);c.SpatialIndex2D=f.__decorate([u.subclass("esri.views.3d.layers.graphics.SpatialIndex2D")],c.SpatialIndex2D);const d=
{minX:0,minY:0,maxX:0,maxY:0};c.default=c.SpatialIndex2D;Object.defineProperty(c,"__esModule",{value:!0})});