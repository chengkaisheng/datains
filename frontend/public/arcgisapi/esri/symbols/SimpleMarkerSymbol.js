// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ../core/has ../core/lang ../core/Logger ../core/accessorSupport/ensureType ../core/accessorSupport/decorators/property ../core/jsonMap ../core/accessorSupport/decorators/enumeration ../core/accessorSupport/decorators/subclass ../core/accessorSupport/decorators/writer ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../Color ../core/screenUtils ./SimpleLineSymbol ./MarkerSymbol".split(" "),function(n,c,g,t,A,B,d,u,v,w,
x,C,D,E,y,z,p,b){var l;g=new u.JSONMap({esriSMSCircle:"circle",esriSMSSquare:"square",esriSMSCross:"cross",esriSMSX:"x",esriSMSDiamond:"diamond",esriSMSTriangle:"triangle",esriSMSPath:"path"});b=l=function(m){function h(...a){a=m.call(this,...a)||this;a.color=new y([255,255,255,.25]);a.type="simple-marker";a.size=12;a.style="circle";a.outline=new p;return a}n._inheritsLoose(h,m);var k=h.prototype;k.normalizeCtorArgs=function(a,e,q,r){if(a&&"string"!==typeof a)return a;const f={};a&&(f.style=a);null!=
e&&(f.size=z.toPt(e));q&&(f.outline=q);r&&(f.color=r);return f};k.writeColor=function(a,e){a&&"x"!==this.style&&"cross"!==this.style&&(e.color=a.toJSON());null===a&&(e.color=null)};k.clone=function(){return new l({angle:this.angle,color:t.clone(this.color),outline:this.outline&&this.outline.clone(),path:this.path,size:this.size,style:this.style,xoffset:this.xoffset,yoffset:this.yoffset})};k.hash=function(){var a;return`${m.prototype.hash.call(this)}.${this.color&&this.color.hash()}.${this.path}.${this.style}.${null==
(a=this.outline)?void 0:a.hash()}`};n._createClass(h,[{key:"path",set:function(a){this.style="path";this._set("path",a)}}]);return h}(b);c.__decorate([d.property()],b.prototype,"color",void 0);c.__decorate([x.writer("color")],b.prototype,"writeColor",null);c.__decorate([v.enumeration({esriSMS:"simple-marker"},{readOnly:!0})],b.prototype,"type",void 0);c.__decorate([d.property()],b.prototype,"size",void 0);c.__decorate([d.property({type:g.apiValues,json:{read:g.read,write:g.write}})],b.prototype,"style",
void 0);c.__decorate([d.property({type:String,json:{write:!0}})],b.prototype,"path",null);c.__decorate([d.property({types:{key:"type",base:null,defaultKeyValue:"simple-line",typeMap:{"simple-line":p}},json:{default:null,write:!0}})],b.prototype,"outline",void 0);return b=l=c.__decorate([w.subclass("esri.symbols.SimpleMarkerSymbol")],b)});