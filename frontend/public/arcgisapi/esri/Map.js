// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("./chunks/_rollupPluginBabelHelpers ./chunks/tslib.es6 ./core/has ./core/Logger ./core/accessorSupport/decorators/property ./core/accessorSupport/decorators/cast ./core/jsonMap ./core/accessorSupport/decorators/subclass ./core/urlUtils ./core/uuid ./portal/support/resourceExtension ./core/Accessor ./core/Evented ./Basemap ./Ground ./core/CollectionFlattener ./support/basemapUtils ./support/groundUtils ./support/LayersMixin ./support/TablesMixin".split(" "),function(g,e,c,q,f,l,A,r,B,C,D,t,
u,v,m,n,h,w,x,y){const z=q.getLogger("esri.Map");c=function(p){function k(a){a=p.call(this,a)||this;a.allLayers=new n({root:g._assertThisInitialized(a),rootCollectionNames:["basemap.baseLayers","ground.layers","layers","basemap.referenceLayers"],getChildrenFunction:b=>b.layers});a.allTables=a._createTablesFlattener(g._assertThisInitialized(a));a.basemap=null;a.ground=new m;a._basemapCache=h.createCache();return a}g._inheritsLoose(k,p);var d=k.prototype;d.destroy=function(){var a,b;this.allLayers.destroy();
this.allTables.destroy();null==(a=this.ground)?void 0:a.destroy();null==(b=this.basemap)?void 0:b.destroy();h.destroyCache(this._basemapCache);this._basemapCache=null};d.castBasemap=function(a){return h.ensureType(a,this._basemapCache)};d.castGround=function(a){a=w.ensureType(a);return a?a:(z.error("Map.ground may not be set to null or undefined"),this._get("ground"))};d.findLayerById=function(a){return this.allLayers.find(b=>b.id===a)};d.findTableById=function(a){return this.allTables.find(b=>b.id===
a)};d._createTablesFlattener=function(a){return new n({root:a,rootCollectionNames:["tables","layers"],getChildrenFunction:b=>b&&"group"===b.type?this._createTablesFlattener(b):null,itemFilterFunction:b=>this._isMapOrGroupLayer(b.parent)&&b.parent.tables.includes(b)})};d._isMapOrGroupLayer=function(a){return a&&(a===this||this._isGroupLayer(a))};d._isGroupLayer=function(a){return a&&"group"===a.type};return k}(y.TablesMixin(x.LayersMixin(u.EventedMixin(t))));e.__decorate([f.property({readOnly:!0,dependsOn:[],
autoTracked:!1})],c.prototype,"allLayers",void 0);e.__decorate([f.property({readOnly:!0})],c.prototype,"allTables",void 0);e.__decorate([f.property({type:v})],c.prototype,"basemap",void 0);e.__decorate([l.cast("basemap")],c.prototype,"castBasemap",null);e.__decorate([f.property({type:m,nonNullable:!0})],c.prototype,"ground",void 0);e.__decorate([l.cast("ground")],c.prototype,"castGround",null);return c=e.__decorate([r.subclass("esri.Map")],c)});