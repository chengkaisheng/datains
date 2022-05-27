// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../chunks/_rollupPluginBabelHelpers ../../chunks/tslib.es6 ../../core/has ../../core/Logger ../../core/accessorSupport/ensureType ../../core/accessorSupport/decorators/property ../../core/jsonMap ../../core/accessorSupport/decorators/subclass ../../core/urlUtils ../../core/uuid ../../portal/support/resourceExtension ../../core/JSONSupport ../../geometry/support/jsonUtils ../../geometry".split(" "),function(h,c,e,p,q,d,k,l,r,t,u,a,m,n){e=new k.JSONMap({esriSpatialRelIntersects:"intersects",
esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"});a=function(f){function g(b){b=f.call(this,b)||this;b.geometry=null;b.name=null;b.spatialRelationship=null;b.type="layer";b.where=null;return b}h._inheritsLoose(g,f);return g}(a.JSONSupport);c.__decorate([d.property({types:n.geometryTypes,
json:{read:m.fromJSON,write:!0}})],a.prototype,"geometry",void 0);c.__decorate([d.property({type:String,json:{read:{source:"layerName"},write:{target:"layerName"}}})],a.prototype,"name",void 0);c.__decorate([d.property({type:String,json:{read:{source:"spatialRel",reader:e.read},write:{target:"spatialRel",writer:e.write}}})],a.prototype,"spatialRelationship",void 0);c.__decorate([d.property({type:String,json:{write:!0}})],a.prototype,"type",void 0);c.__decorate([d.property({type:String,json:{write:!0}})],
a.prototype,"where",void 0);return a=c.__decorate([l.subclass("esri.tasks.support.DataLayer")],a)});