// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../../../chunks/_rollupPluginBabelHelpers ../../../../../chunks/tslib.es6 ../../../../../core/has ../../../../../core/maybe ../../../../../core/Logger ../../../../../core/accessorSupport/ensureType ../../../../../core/accessorSupport/decorators/property ../../../../../core/jsonMap ../../../../../core/accessorSupport/decorators/subclass ../../../../../core/Error ../../../../../core/urlUtils ../../../../../core/uuid ../../../../../portal/support/resourceExtension ../../../../../core/promiseUtils ../../../../../geometry/SpatialReference ../../../../../core/accessorSupport/diffUtils ../../../engine/webgl/definitions ../../../engine/webgl/util/BidiText ../../../engine/webgl/mesh/factories/matcherUtils ../textUtils ../../../engine/webgl/mesh/templates/WGLTemplateStore ../../../engine/webgl/mesh/factories/WGLMeshFactory ../support/AttributeStore ../../../engine/webgl/collisions/CollisionGrid ./BaseProcessor".split(" "),
function(w,z,A,p,t,N,O,P,B,Q,R,S,T,q,C,x,D,E,F,G,H,I,J,K,L){t.getLogger("esri.views.2d.layers.features.processors.SymbolProcessor");t=function(y){function u(){var b=y.apply(this,arguments)||this;b.type="symbol";return b}w._inheritsLoose(u,y);var l=u.prototype;l.destroy=function(){};l.update=async function(b,a){a=a.schema.processors[0];if("symbol"===a.type){var c=x.diff(this._schema,a);x.hasDiff(c,"mesh")&&(A("esri-2d-update-debug")&&console.debug("Applying Update - Processor:",c),b.mesh=!0,b.why.mesh.push("Symbology changed"),
this._schema=a,this._factory=this._createFactory(a),this._factory.update(a,this.tileStore.tileScheme.tileInfo))}};l.onTileData=function(b,a,c){q.throwIfAborted(c);return this._onTileData(b,a,c)};l.onTileError=function(b,a,c){return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:b.id,error:a},{signal:c.signal})};l._createFactory=function(b){const {geometryType:a,objectIdField:c,fields:d}=this.service;var g=C.fromJSON(this.spatialReference);g={geometryType:a,fields:d,spatialReference:g};
const e=new H.WGLTemplateStore((h,f)=>this.remoteClient.invoke("tileRenderer.getMaterialItems",h,f),!1);this._store=e;this._matcher=F.createMatcher(b.mesh.matcher,e,g);return new I.WGLMeshFactory(a,c,e)};l._onTileData=async function(b,a,c){const {type:d,addOrUpdate:g,remove:e,end:h}=a;if(!g)return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:b.id,data:{type:d,addOrUpdate:null,remove:e,clear:!1,end:h}},c);const f=this._processFeatures(b,g,c);a=c.signal;try{var k=await f;const m=p.andThen(k,
r=>r.message),v=p.andThen(k,r=>r.transferList)||[];k={type:d,addOrUpdate:m,remove:e,clear:!1,end:h};const n={transferList:p.unwrap(v)||[],signal:a};q.throwIfAborted(n);return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:b.id,data:k},n)}catch(m){this._handleError(b,m,c)}};l._processFeatures=async function(b,a,c){if(p.isNone(a)||!a.hasFeatures)return null;const d={transform:b.transform,hasZ:!1,hasM:!1},g=this._factory,e={viewingMode:"",scale:b.scale},h=await this._matcher;q.throwIfAborted(c);
const f=this._getLabelInfos(b,a);await g.analyze(a.getCursor(),h,d,e);q.throwIfAborted(c);return this._writeFeatureSet(b,a,d,f,g)};l._writeFeatureSet=function(b,a,c,d,g){const e=g.createMeshData(a.getApproximateSize()),h={viewingMode:"",scale:b.scale};for(a=a.getCursor();a.next();)try{const f=a.getDisplayId(),k=p.isSome(d)?d.get(f):null;g.writeCursor(e,a,c,h,b.level,k)}catch(f){}return this._encodeDisplayData(e)};l._encodeDisplayData=function(b){const a={},c=[];b.encode(a,c);return{message:a,transferList:c}};
l._handleError=function(b,a,c){if(!q.isAbortError(a))return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:b.id,error:a.message},{signal:c.signal})};l._shouldDiscard=function(b,a){switch(this.service.geometryType){case "esriGeometryPoint":return a=a.readLegacyPointGeometry(),!a||b.checkOverlap(a.x,a.y);case "esriGeometryPolygon":return a=a.readLegacyCentroid(),!a||b.checkOverlap(a.x,a.y);default:return!1}};l._markUsed=function(b,a){switch(this.service.geometryType){case "esriGeometryPoint":{const {x:c,
y:d}=a.readLegacyPointGeometry();return b.markUsed(c,d)}case "esriGeometryPolygon":{const {x:c,y:d}=a.readLegacyCentroid();return b.markUsed(c,d)}}};l._getLabelInfos=function(b,a){const c=p.andThen(this._schema.mesh.labels,f=>f.filter(k=>{var m=b.scale;return(!k.minScale||k.minScale>=m)&&(!k.maxScale||k.maxScale<=m)}));if(p.isNone(c)||0===c.length)return null;const d=new Map,g=new K.CollisionGrid(D.COLLISION_EARLY_REJECT_BUCKET_SIZE);for(a=a.getCursor();a.next();){const f=a.getDisplayId();if(this._shouldDiscard(g,
a)){d.has(f)||d.set(f,null);continue}var e=!1;const k=[],m=J.isAggregateId(f),v=m&&1!==a.readAttribute("cluster_count")?"aggregate":"feature";for(const n of c){if(n.target!==v)continue;var h=a.getStorage();h=m&&"feature"===v?h.getComputedStringAtIndex(a.readAttribute("referenceId"),n.fieldIndex):h.getComputedStringAtIndex(f,n.fieldIndex);if(!h)continue;e=E.bidiText(h.toString());const r=e[1];this._store.getMosaicItem(n.symbol,G.codepoints(e[0])).then(M=>{k[n.index]={glyphs:M.glyphMosaicItems,rtl:r,
index:n.index}});e=!0}d.set(f,k);e&&this._markUsed(g,a)}return d};w._createClass(u,[{key:"supportsTileUpdates",get:function(){return!0}}]);return u}(L);return t=z.__decorate([B.subclass("esri.views.2d.layers.features.processors.SymbolProcessor")],t)});