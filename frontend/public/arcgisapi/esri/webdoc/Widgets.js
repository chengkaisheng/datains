// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ../core/has ../core/lang ../core/Logger ../core/accessorSupport/ensureType ../core/accessorSupport/decorators/property ../core/jsonMap ../core/accessorSupport/decorators/subclass ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../core/JSONSupport ./widgets/Range ./widgets/TimeSlider".split(" "),function(h,c,a,k,q,r,f,t,l,u,v,w,m,n,p){var d;a=d=function(g){function e(b){b=g.call(this,b)||this;b.range=null;b.timeSlider=
null;return b}h._inheritsLoose(e,g);e.prototype.clone=function(){return new d(k.clone({range:this.range,timeSlider:this.timeSlider}))};return e}(m.JSONSupport);c.__decorate([f.property({type:n,json:{write:!0}})],a.prototype,"range",void 0);c.__decorate([f.property({type:p,json:{write:!0}})],a.prototype,"timeSlider",void 0);return a=d=c.__decorate([l.subclass("esri.webdoc.Widgets")],a)});