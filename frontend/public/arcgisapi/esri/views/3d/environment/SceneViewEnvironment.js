// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../chunks/_rollupPluginBabelHelpers ../../../chunks/tslib.es6 ../../../core/has ../../../core/lang ../../../core/Logger ../../../core/accessorSupport/ensureType ../../../core/accessorSupport/decorators/property ../../../core/accessorSupport/decorators/cast ../../../core/jsonMap ../../../core/accessorSupport/decorators/subclass ../../../core/urlUtils ../../../core/uuid ../../../portal/support/resourceExtension ../../../webscene/Lighting ../../../webscene/Environment ./SceneViewAtmosphere ./SceneViewLighting".split(" "),
function(n,f,b,h,v,p,k,q,w,r,x,y,z,t,u,l,c){var d;b=d=function(m){function g(a){a=m.call(this,a)||this;a.atmosphere=new l["default"];return a}n._inheritsLoose(g,m);g.fromWebsceneEnvironment=function(a){a=a.cloneConstructProperties();return new d({...a,lighting:c.SceneViewLighting.fromWebsceneLighting(a.lighting)})};var e=g.prototype;e.castLighting=function(a){return this.convertLighting(a)};e.updateLighting=function(a){this.lighting=this.convertLighting(a)};e.convertLighting=function(a){return a?
a instanceof c.SceneViewLighting?a:a instanceof t?this.lighting?this.lighting.cloneWithWebsceneLighting(a):c.SceneViewLighting.fromWebsceneLighting(a):p.ensureType(c.SceneViewLighting,a):new c.SceneViewLighting};e.clone=function(){return new d({lighting:this.lighting.clone(),atmosphere:this.atmosphere.clone(),atmosphereEnabled:this.atmosphereEnabled,starsEnabled:this.starsEnabled,background:h.clone(this.background)})};e.cloneWithWebsceneEnvironment=function(a){return new d({atmosphere:this.atmosphere.clone(),
atmosphereEnabled:this.atmosphereEnabled,starsEnabled:this.starsEnabled,background:h.clone(this.background),...a.cloneConstructProperties(),lighting:null!=this.lighting?this.lighting.cloneWithWebsceneLighting(a.lighting):c.SceneViewLighting.fromWebsceneLighting(a.lighting)})};return g}(u);f.__decorate([k.property({type:l["default"],json:{read:!1}})],b.prototype,"atmosphere",void 0);f.__decorate([k.property()],b.prototype,"lighting",void 0);f.__decorate([q.cast("lighting")],b.prototype,"castLighting",
null);return b=d=f.__decorate([r.subclass("esri.views.3d.environment.SceneViewEnvironment")],b)});