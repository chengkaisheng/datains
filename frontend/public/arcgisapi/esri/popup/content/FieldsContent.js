// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../chunks/_rollupPluginBabelHelpers ../../chunks/tslib.es6 ../../core/has ../../core/lang ../../core/Logger ../../core/accessorSupport/ensureType ../../core/accessorSupport/decorators/property ../../core/jsonMap ../../core/accessorSupport/decorators/subclass ../../core/accessorSupport/decorators/writer ../../core/urlUtils ../../core/uuid ../../portal/support/resourceExtension ./Content ../FieldInfo".split(" "),function(k,c,b,l,u,v,f,w,m,n,x,y,z,p,q){var d;b=d=function(g){function e(a){a=
g.call(this,a)||this;a.fieldInfos=null;a.type="fields";return a}k._inheritsLoose(e,g);var h=e.prototype;h.writeFieldInfos=function(a,r){r.fieldInfos=a&&a.map(t=>t.toJSON())};h.clone=function(){return new d({fieldInfos:Array.isArray(this.fieldInfos)?l.clone(this.fieldInfos):null})};return e}(p);c.__decorate([f.property({type:[q]})],b.prototype,"fieldInfos",void 0);c.__decorate([n.writer("fieldInfos")],b.prototype,"writeFieldInfos",null);c.__decorate([f.property({type:["fields"],readOnly:!0,json:{read:!1,
write:!0}})],b.prototype,"type",void 0);return b=d=c.__decorate([m.subclass("esri.popup.content.FieldsContent")],b)});