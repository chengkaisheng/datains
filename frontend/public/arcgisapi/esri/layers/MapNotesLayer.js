// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ../core/has ../core/Logger ../core/accessorSupport/ensureType ../core/accessorSupport/decorators/property ../core/jsonMap ../core/accessorSupport/decorators/reader ../core/accessorSupport/decorators/subclass ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../geometry/SpatialReference ../geometry/Extent ../geometry ../core/Collection ./Layer ../core/MultiOriginJSONSupport ./mixins/OperationalLayer ./mixins/BlendLayer ./mixins/PortalLayer ./mixins/ScaleRangeLayer ./FeatureLayer ../support/GraphicsCollection".split(" "),
function(t,c,b,D,E,f,F,k,u,G,H,I,q,n,J,v,w,x,y,z,A,B,C,g){b=function(m){function p(a){a=m.call(this,a)||this;a.capabilities={operations:{supportsEditing:!0}};a.legendEnabled=!1;a.lineGraphics=new g["default"];a.opacity=1;a.pointGraphics=new g["default"];a.polygonGraphics=new g["default"];a.textGraphics=new g["default"];a.type="map-notes";return a}t._inheritsLoose(p,m);var h=p.prototype;h.readFullExtent=function(a,d){if(!d.layers.length)return new n({xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:q.WGS84});
a=q.fromJSON(d.layers[0].layerDefinition.spatialReference);return d.layers.reduce((e,l)=>(l=l.layerDefinition.extent)?n.fromJSON(l).union(e):e,new n({spatialReference:a}))};h.readCapabilities=function(a,d){return{operations:{supportsEditing:!d.layers.some(e=>!!e.layerDefinition.drawingInfo)}}};h.readFeatureCollections=function(a,d,e){a=d.layers.map(l=>{const r=new C;r.read(l,e);return r});return new v({items:a})};h.readMinScale=function(a,d){for(const e of d.layers)if(null!=e.layerDefinition.minScale)return e.layerDefinition.minScale;
return 0};h.readMaxScale=function(a,d){for(const e of d.layers)if(null!=e.layerDefinition.maxScale)return e.layerDefinition.maxScale;return 0};h.load=function(a){this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Collection"]},a));return Promise.resolve(this)};h.read=function(a,d){"featureCollection"in a&&m.prototype.read.call(this,a.featureCollection,d);m.prototype.read.call(this,a,d)};return p}(z.BlendLayer(B.ScaleRangeLayer(y.OperationalLayer(A.PortalLayer(x.MultiOriginJSONMixin(w))))));
c.__decorate([k.reader(["web-map","portal-item"],"fullExtent",["layers"])],b.prototype,"readFullExtent",null);c.__decorate([f.property({readOnly:!0})],b.prototype,"capabilities",void 0);c.__decorate([k.reader(["portal-item","web-map"],"capabilities",["layers"])],b.prototype,"readCapabilities",null);c.__decorate([f.property({readOnly:!0})],b.prototype,"featureCollections",void 0);c.__decorate([k.reader(["web-map","portal-item"],"featureCollections",["layers"])],b.prototype,"readFeatureCollections",
null);c.__decorate([f.property({readOnly:!0,json:{origins:{service:{read:{enabled:!1}}},name:"showLegend",write:!0}})],b.prototype,"legendEnabled",void 0);c.__decorate([f.property(g.graphicsCollectionProperty("lineGraphics"))],b.prototype,"lineGraphics",void 0);c.__decorate([f.property({type:["show","hide"]})],b.prototype,"listMode",void 0);c.__decorate([k.reader(["web-map","portal-item"],"minScale",["layers"])],b.prototype,"readMinScale",null);c.__decorate([k.reader(["web-map","portal-item"],"maxScale",
["layers"])],b.prototype,"readMaxScale",null);c.__decorate([f.property({type:Number,json:{name:"opacity",write:!0}})],b.prototype,"opacity",void 0);c.__decorate([f.property(g.graphicsCollectionProperty("pointGraphics"))],b.prototype,"pointGraphics",void 0);c.__decorate([f.property(g.graphicsCollectionProperty("polygonGraphics"))],b.prototype,"polygonGraphics",void 0);c.__decorate([f.property(g.graphicsCollectionProperty("textGraphics"))],b.prototype,"textGraphics",void 0);c.__decorate([f.property({readOnly:!0,
json:{read:!1}})],b.prototype,"type",void 0);return b=c.__decorate([u.subclass("esri.layers.MapNotesLayer")],b)});