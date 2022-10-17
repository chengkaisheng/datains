// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../chunks/_rollupPluginBabelHelpers ../../../chunks/tslib.es6 ../../../core/has ../../../core/maybe ../../../core/Logger ../../../core/accessorSupport/ensureType ../../../core/accessorSupport/decorators/property ../../../core/jsonMap ../../../core/accessorSupport/decorators/subclass ../../../core/Error ../../../core/urlUtils ../../../core/uuid ../../../portal/support/resourceExtension ../../../core/promiseUtils ../../../layers/support/fieldUtils ../../../Graphic ../../support/Scheduler ../../../core/sql/WhereClause ../../../tasks/support/Query ../../../layers/buildingSublayers/BuildingComponentSublayer ../../layers/BuildingComponentSublayerView ../../layers/support/FeatureFilter ../../layers/support/popupUtils ./i3s/I3SUtil ./BuildingSublayerView3D ./i3s/I3SGeometryUtil ./I3SMeshView3D ./i3s/BuildingFilterUtil ./i3s/I3SMeshViewFilter ./i3s/I3SQueryEngine ./i3s/I3SQueryFeatureAdapter ./i3s/I3SQueryFeatureStore ./support/DefinitionExpressionSceneLayerView".split(" "),
function(u,h,e,k,B,P,l,Q,C,v,R,S,T,w,n,D,E,F,x,U,G,H,t,y,I,J,K,z,A,L,M,N,O){const p=B.getLogger("esri.views.3d.layers.BuildingComponentSublayerView3D");e=function(q){function r(){var a=q.apply(this,arguments)||this;a.layerView=null;a._elevationContext="scene";a._isIntegratedMesh=!1;a._supportsLabeling=!1;a.lodFactor=1;a.progressiveLoadFactor=1;a._queryEngine=null;return a}u._inheritsLoose(r,q);var d=r.prototype;d.initialize=function(){this.updatingHandles.add(this,"sublayer.renderer,definitionExpressionFields,filterExpressionFields",
()=>this._updateRequiredFields());this.updatingHandles.add(this.sublayer,"renderer",a=>this._rendererChange(a),2);for(const a of["parsedDefinitionExpression","filter","viewFilter.parsedWhereClause","viewFilter.parsedGeometry","viewFilter.sortedObjectIds"])this.updatingHandles.add(this,a,()=>this._filterChange());this.updatingHandles.add(this,"parsedFilterExpressions",()=>this._updateSymbologyOverride(),2);this.addResolvingPromise(this._updateRequiredFields())};d._updateSymbologyOverride=function(){const a=
this.parsedFilterExpressions;0<a.length?this._setSymbologyOverride((b,c)=>{for(const [f,m]of a)try{if(f.testFeature(b))return z.applyFilterMode(c,m)}catch(g){this.logError(g)}return z.applyFilterMode(c,null)},this.filterExpressionFields):this._setSymbologyOverride(null,null)};d._createLayerGraphic=function(a){a=new D(null,null,a);a.layer=this.sublayer.layer;a.sourceLayer=this.sublayer;return a};d.canResume=function(){return q.prototype.canResume.call(this)&&(!this._controller||this._controller.rootNodeVisible)};
d.fetchPopupFeatures=async function(a,b){if(a=this._validateFetchPopupFeatures(b))return w.reject(a);if(!k.isSome(b)||!b.clientGraphics||0===b.clientGraphics.length)return[];const c=[],f=[];a=k.isSome(this.sublayer.associatedLayer)?await this.sublayer.associatedLayer.load():this.sublayer;a=n.unpackFieldNames(this.sublayer.fields,await t.getRequiredFields(a,t.getFetchPopupTemplate(this.sublayer,b)));const m=new Set;for(const g of b.clientGraphics)n.populateMissingFields(a,g,m)?f.push(g):c.push(g);
if(0===f.length)return w.resolve(c);k.isSome(this.sublayer.associatedLayer)&&await this.sublayer.associatedLayer.load().catch(()=>p.warn("Failed to load associated feature layer. Displaying popup attributes from cached attributes."));return this.whenGraphicAttributes(f,Array.from(m)).catch(()=>f).then(g=>c.concat(g))};d._updateRequiredFields=async function(){const a=n.fixFields(this.sublayer.fields,[...this.sublayer.renderer?await this.sublayer.renderer.getRequiredFields(this.sublayer.fields):[],
...this.definitionExpressionFields||[],...this.filterExpressionFields||[]]);this._set("requiredFields",a)};d._validateFetchPopupFeatures=function(a){const {sublayer:b}=this,{popupEnabled:c}=b;if(!c)return new v("buildingscenelayerview3d:fetchPopupFeatures","Popups are disabled",{sublayer:b});if(!t.getFetchPopupTemplate(b,a))return new v("buildingscenelayerview3d:fetchPopupFeatures","Layer does not define a popup template",{sublayer:b})};d.getFilters=function(){const a=q.prototype.getFilters.call(this);
this.addSqlFilter(a,this.parsedDefinitionExpression,this.logError);k.isSome(this.viewFilter)&&this.viewFilter.addFilters(a,this.view,this._controller.crsIndex,this._collection);return a};d.createQuery=function(){const a={outFields:["*"],returnGeometry:!1,outSpatialReference:this.view.spatialReference};return k.isSome(this.filter)?this.filter.createQuery(a):new x(a)};d.queryExtent=function(a,b){return this._ensureQueryEngine().executeQueryForExtent(this._ensureQuery(a),null==b?void 0:b.signal)};d.queryFeatureCount=
function(a,b){return this._ensureQueryEngine().executeQueryForCount(this._ensureQuery(a),null==b?void 0:b.signal)};d.queryFeatures=function(a,b){return this._ensureQueryEngine().executeQuery(this._ensureQuery(a),null==b?void 0:b.signal).then(c=>{if(null==c||!c.features)return c;const f=this.sublayer,m=f.layer;for(const g of c.features)g.layer=m,g.sourceLayer=f;return c})};d.queryObjectIds=function(a,b){return this._ensureQueryEngine().executeQueryForIds(this._ensureQuery(a),null==b?void 0:b.signal)};
d._ensureQueryEngine=function(){k.isNone(this._queryEngine)&&(this._queryEngine=this._createQueryEngine());return this._queryEngine};d._createQueryEngine=function(){const a=J.createGetFeatureExtent(this.view.spatialReference,this.view.renderSpatialReference,this._collection);return new L["default"]({layerView:this,task:E.Task.FEATURE_QUERY_ENGINE,spatialIndex:new N["default"]({featureAdapter:new M.I3SQueryFeatureAdapter({objectIdField:this.sublayer.objectIdField,attributeStorageInfo:this.sublayer.attributeStorageInfo,
getFeatureExtent:a}),forAllFeatures:(b,c)=>this._forAllFeatures((f,m,g)=>b({id:f,index:m,meta:g}),c,2),getFeatureExtent:a,sourceSpatialReference:y.getIndexCrs(this.sublayer),viewSpatialReference:this.view.spatialReference})})};d._ensureQuery=function(a){return this._addDefinitionExpressionToQuery(k.isNone(a)?this.createQuery():x.from(a))};u._createClass(r,[{key:"layerUid",get:function(){return this.sublayer.layer.uid}},{key:"sublayerUid",get:function(){return this.sublayer.uid}},{key:"parsedFilterExpressions",
get:function(){return"Overview"===this.sublayer.modelName?[]:this.layerView.filterExpressions.map(([a,b])=>{let c;try{c=F.WhereClause.create(a,this.sublayer.fieldsIndex)}catch(f){return p.error("Failed to parse filterExpression: "+f),null}if(!c.isStandardized)return p.error("filterExpression is using non standard function"),null;a=[];y.findFieldsCaseInsensitive(c.fieldNames,this.sublayer.fields,{missingFields:a});return 0<a.length?(p.error(`filterExpression references unknown fields: ${a.join(", ")}`),
null):[c,b]}).filter(a=>null!=a)}},{key:"filter",get:function(){return k.isSome(this.viewFilter)?this.viewFilter.filter:null},set:function(a){k.isNone(a)||!A.I3SMeshViewFilter.checkSupport(a)?this.viewFilter=null:k.isSome(this.viewFilter)?this.viewFilter.filter=a:this.viewFilter=new A.I3SMeshViewFilter({filter:a,layerFieldsIndex:this.sublayer.fieldsIndex,loadAsyncModule:b=>this._loadAsyncModule(b),applyFilters:()=>this._applyFilters(!0),addSqlFilter:(b,c)=>this.addSqlFilter(b,c,this.logError)})}},
{key:"filterExpressionFields",get:function(){return n.fixFields(this.sublayer.fields,this.parsedFilterExpressions.reduce((a,[b])=>a.concat(b.fieldNames),[]))}},{key:"availableFields",get:function(){var a=this.sublayer;const b=a.fields;let c=this.requiredFields;if(a.outFields||a.layer.outFields)a=[...a.outFields||[],...a.layer.outFields||[]],c=[...n.unpackFieldNames(b,a),...c];return n.fixFields(b,c)}}]);return r}(O.DefinitionExpressionSceneLayerView(K.I3SMeshView3D(I.BuildingSublayerView3DMixin(G))));
h.__decorate([l.property({aliasOf:"sublayer"})],e.prototype,"i3slayer",void 0);h.__decorate([l.property()],e.prototype,"layerView",void 0);h.__decorate([l.property({dependsOn:["_controller.rootNodeVisible"]})],e.prototype,"suspended",void 0);h.__decorate([l.property({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.3dObject.lodFactor"})],e.prototype,"lodFactor",void 0);h.__decorate([l.property({readOnly:!0,dependsOn:["layerView.filterExpressions","sublayer.fieldsIndex"]})],e.prototype,"parsedFilterExpressions",
null);h.__decorate([l.property({type:H})],e.prototype,"filter",null);h.__decorate([l.property()],e.prototype,"viewFilter",void 0);h.__decorate([l.property({type:[String],readOnly:!0,dependsOn:["parsedFilterExpressions"]})],e.prototype,"filterExpressionFields",null);h.__decorate([l.property({type:[String],readOnly:!0})],e.prototype,"requiredFields",void 0);h.__decorate([l.property({type:[String],readOnly:!0,dependsOn:["sublayer.outFields","sublayer.layer.outFields","requiredFields"]})],e.prototype,
"availableFields",null);return e=h.__decorate([C.subclass("esri.views.3d.layers.BuildingComponentSublayerView3D")],e)});