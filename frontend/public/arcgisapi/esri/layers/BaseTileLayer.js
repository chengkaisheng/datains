// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ../core/has ../core/Logger ../core/accessorSupport/ensureType ../core/accessorSupport/decorators/property ../core/jsonMap ../core/accessorSupport/decorators/subclass ../core/Error ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../geometry/SpatialReference ../geometry/Extent ../request ./Layer ../geometry/support/aaBoundingRect ./mixins/BlendLayer ./mixins/RefreshableLayer ./mixins/ScaleRangeLayer ./support/TileInfo".split(" "),
function(q,d,b,E,F,g,G,r,t,H,I,J,h,u,v,w,x,y,z,A,n){const e={id:"0/0/0",level:0,row:0,col:0,extent:null};b=function(p){function k(){var a=p.apply(this,arguments)||this;a.tileInfo=n.create({spatialReference:h.WebMercator,size:256});a.type="base-tile";a.fullExtent=new u(-2.0037508342787E7,-2.003750834278E7,2.003750834278E7,2.0037508342787E7,h.WebMercator);a.spatialReference=h.WebMercator;return a}q._inheritsLoose(k,p);var l=k.prototype;l.getTileBounds=function(a,f,m,c){c=c||x.create();e.level=a;e.row=
f;e.col=m;e.extent=c;this.tileInfo.updateTileInfo(e);e.extent=null;return c};l.fetchTile=function(a,f,m,c={}){const {signal:B,timestamp:C}=c;a=this.getTileUrl(a,f,m);f={responseType:"image",signal:B};null!=C&&(f.query={_ts:c.timestamp});return v(a,f).then(D=>D.data)};l.getTileUrl=function(){throw new t("basetilelayer:gettileurl-not-implemented","getTileUrl() is not implemented");};return k}(y.BlendLayer(A.ScaleRangeLayer(z.RefreshableLayer(w))));d.__decorate([g.property({type:n})],b.prototype,"tileInfo",
void 0);d.__decorate([g.property({type:["show","hide"]})],b.prototype,"listMode",void 0);d.__decorate([g.property({readOnly:!0,value:"base-tile"})],b.prototype,"type",void 0);d.__decorate([g.property()],b.prototype,"fullExtent",void 0);d.__decorate([g.property()],b.prototype,"spatialReference",void 0);return b=d.__decorate([r.subclass("esri.layers.BaseTileLayer")],b)});