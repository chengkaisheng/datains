// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../../chunks/_rollupPluginBabelHelpers ../../../../chunks/tslib.es6 ../../../../core/has ../../../../core/Logger ../../../../core/accessorSupport/ensureType ../../../../core/accessorSupport/decorators/property ../../../../core/jsonMap ../../../../core/accessorSupport/decorators/subclass ../../../../core/urlUtils ../../../../core/uuid ../../../../portal/support/resourceExtension ../../../../core/promiseUtils ../../../../core/Accessor ../../../../core/Collection".split(" "),function(k,
e,c,t,u,g,v,m,w,x,y,n,p,q){c=function(l){function f(){var a=l.apply(this,arguments)||this;a.itemCache=new q;a.state="ready";return a}k._inheritsLoose(f,l);var b=f.prototype;b.destroy=function(){this.itemCache.destroy();this._set("itemCache",null)};b.addItems=async function(a){this.itemCache.addMany(null==a?void 0:a.items)};b.fetchItems=async function(a){const {page:h,pageSize:d}=a;a=h*d;return this.itemCache.items.slice(a,a+d)};b.getLocalItemAt=function(a){return this.itemCache.getItemAt(a)};b.getItemAt=
function(a){return n.resolve(this.itemCache.getItemAt(a))};b.load=async function(){};b.query=function(a){return this.fetchItems(a)};b.removeItemAt=async function(a){this.itemCache.removeAt(a)};b.reset=async function(){this.itemCache.removeAll()};b.updateItem=async function(a){const {index:h,name:d,value:r}=a;(a=this.itemCache.getItemAt(h))&&d&&a[d]&&(a[d]=r)};k._createClass(f,[{key:"count",get:function(){var a;return(null==(a=this.itemCache)?void 0:a.length)||0}}]);return f}(p);e.__decorate([g.property({readOnly:!0,
dependsOn:["itemCache.length"]})],c.prototype,"count",null);e.__decorate([g.property()],c.prototype,"itemCache",void 0);e.__decorate([g.property({readOnly:!0})],c.prototype,"state",void 0);return c=e.__decorate([m.subclass("esri.widgets.FeatureTable.Grid.support.LocalStore")],c)});