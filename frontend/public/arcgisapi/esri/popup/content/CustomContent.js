// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../chunks/_rollupPluginBabelHelpers ../../chunks/tslib.es6 ../../core/has ../../core/lang ../../core/Logger ../../core/accessorSupport/ensureType ../../core/accessorSupport/decorators/property ../../core/jsonMap ../../core/accessorSupport/decorators/subclass ../../core/urlUtils ../../core/uuid ../../portal/support/resourceExtension ./Content".split(" "),function(h,c,a,k,n,p,d,q,l,r,t,u,m){var e;a=e=function(g){function f(b){b=g.call(this,b)||this;b.creator=null;b.destroyer=null;b.outFields=
null;b.type="custom";return b}h._inheritsLoose(f,g);f.prototype.clone=function(){return new e({creator:this.creator,destroyer:this.destroyer,outFields:Array.isArray(this.outFields)?k.clone(this.outFields):null})};return f}(m);c.__decorate([d.property()],a.prototype,"creator",void 0);c.__decorate([d.property()],a.prototype,"destroyer",void 0);c.__decorate([d.property()],a.prototype,"outFields",void 0);c.__decorate([d.property({type:["custom"],readOnly:!0})],a.prototype,"type",void 0);return a=e=c.__decorate([l.subclass("esri.popup.content.CustomContent")],
a)});