// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../chunks/_rollupPluginBabelHelpers ../../chunks/tslib.es6 ../../core/has ../../core/Logger ../../core/accessorSupport/ensureType ../../core/accessorSupport/decorators/property ../../core/jsonMap ../../core/accessorSupport/decorators/subclass ../../core/urlUtils ../../core/uuid ../../portal/support/resourceExtension ../../core/Accessor ../../core/Evented ../../core/Identifiable ../../core/Promise ../../core/HandleOwner".split(" "),function(h,c,b,l,v,d,w,m,x,y,z,n,p,q,r,t){b=function(k){function e(a){a=
k.call(this,a)||this;a.layer=null;a.parent=null;return a}h._inheritsLoose(e,k);var f=e.prototype;f.initialize=function(){this.when().catch(a=>{if("layerview:create-error"!==a.name){const g=this.layer&&this.layer.id||"no id",u=this.layer&&this.layer.title||"no title";l.getLogger(this.declaredClass).error("#resolve()",`Failed to resolve layer view (layer title: '${u}', id: '${g}')`,a);throw a;}})};f.canResume=function(){return!this.get("parent.suspended")&&this.get("view.ready")&&this.get("layer.loaded")&&
this.visible||!1};f.getSuspendInfo=function(){const a=this.parent&&this.parent.suspended?this.parent.suspendInfo:{};this.view&&this.view.ready||(a.viewNotReady=!0);this.layer&&this.layer.loaded||(a.layerNotLoaded=!0);this.visible||(a.layerInvisible=!0);return a};f.isUpdating=function(){return!1};h._createClass(e,[{key:"fullOpacity",get:function(){var a=this.get("layer.opacity");a=null==a?1:a;var g=this.get("parent.fullOpacity");return a*(null==g?1:g)}},{key:"suspended",get:function(){return!this.canResume()}},
{key:"suspendInfo",get:function(){return this.getSuspendInfo()}},{key:"legendEnabled",get:function(){return!this.suspended&&!0===this.layer.legendEnabled}},{key:"updating",get:function(){return!!(this.updatingHandles&&this.updatingHandles.updating||this.isUpdating())}},{key:"visible",get:function(){return!0===this.get("layer.visible")},set:function(a){void 0===a?this._clearOverride("visible"):this._override("visible",a)}}]);return e}(t.HandleOwnerMixin(q.IdentifiableMixin(r.EsriPromiseMixin(p.EventedMixin(n)))));
c.__decorate([d.property({dependsOn:["layer.opacity","parent.fullOpacity"]})],b.prototype,"fullOpacity",null);c.__decorate([d.property()],b.prototype,"layer",void 0);c.__decorate([d.property()],b.prototype,"parent",void 0);c.__decorate([d.property({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],b.prototype,"suspended",null);c.__decorate([d.property({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],b.prototype,"suspendInfo",
null);c.__decorate([d.property({readOnly:!0,dependsOn:["suspended","layer.legendEnabled?"]})],b.prototype,"legendEnabled",null);c.__decorate([d.property({type:Boolean,dependsOn:["updatingHandles.updating"],readOnly:!0})],b.prototype,"updating",null);c.__decorate([d.property({dependsOn:["layer.visible"]})],b.prototype,"visible",null);return b=c.__decorate([m.subclass("esri.views.layers.LayerView")],b)});