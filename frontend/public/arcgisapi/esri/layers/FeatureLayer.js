// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("require ../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ../core/has ../core/object ../core/maybe ../core/Logger ../core/accessorSupport/decorators/property ../core/accessorSupport/decorators/cast ../core/jsonMap ../core/accessorSupport/decorators/reader ../core/accessorSupport/extensions/serializableProperty/reader ../core/accessorSupport/decorators/subclass ../core/accessorSupport/decorators/writer ../core/Error ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../core/promiseUtils ../geometry/SpatialReference ../geometry/Extent ../core/Collection ./support/fieldUtils ../PopupTemplate ../request ../chunks/symbols ../core/Handles ./Layer ../renderers/Renderer ../renderers/ClassBreaksRenderer ../renderers/UniqueValueRenderer ../renderers/DictionaryRenderer ../renderers/DotDensityRenderer ../renderers/HeatmapRenderer ../renderers/SimpleRenderer ../renderers/support/types ../renderers/support/jsonUtils ../core/MultiOriginJSONSupport ./support/arcgisLayerUrl ../geometry/HeightModelInfo ./support/commonProperties ./mixins/OperationalLayer ./support/FieldsIndex ../form/FormTemplate ../tasks/support/FeatureSet ./graphics/sources/MemorySource ./mixins/ArcGISService ./mixins/BlendLayer ./mixins/CustomParametersMixin ./mixins/PortalLayer ./mixins/RefreshableLayer ./mixins/ScaleRangeLayer ./support/TimeInfo ./mixins/TemporalLayer ./support/FeatureIndex ./support/FeatureReduction ./support/LabelClass ./support/FeatureReductionCluster ./support/FeatureReductionSelection ./support/featureReductionUtils ./support/FeatureTemplate ./support/FeatureType ./support/fieldProperties ./support/labelingInfo ./support/Relationship ../chunks/DataLayerSource ../renderers/support/styleUtils ../support/popupUtils ../tasks/support/AttachmentQuery ../tasks/support/Query ../tasks/support/RelationshipQuery".split(" "),
function(L,M,d,C,D,N,Z,g,aa,ba,m,ca,da,w,p,E,Na,Oa,v,O,ea,x,A,fa,ha,P,ia,c,Pa,Qa,ja,Ra,Sa,Ta,ka,Q,F,la,y,ma,u,na,oa,pa,qa,R,ra,sa,ta,ua,va,wa,xa,ya,S,za,Aa,Ba,Ca,G,T,U,Da,V,Ea,Fa,Ga,Ha,Ia,z,W){function k(n,q,f){return!(n&&n.hasOwnProperty(q)?!n[q]:!f)}function B(n,q,f){return n&&n.hasOwnProperty(q)?n[q]:f}function H(n,q,f){n=!(null==f||!f.writeLayerSchema);return{enabled:n,ignoreOrigin:n}}const I=new ba.JSONMap({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",
esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch"}),Ja={name:"supportsName",size:"supportsSize",contentType:"supportsContentType",keywords:"supportsKeywords",exifInfo:"supportsExifInfo"},X=Z.getLogger("esri.layers.FeatureLayer");C=Da.defineFieldProperties();c=function(n){function q(...a){a=n.call(this,...a)||this;a._handles=new ia;a.capabilities=null;a.charts=null;a.copyright=null;a.displayField=null;a.definitionExpression=null;a.dynamicDataSource=null;a.editFieldsInfo=null;a.editingEnabled=
!0;a.editingInfo=null;a.elevationInfo=null;a.featureReduction=null;a.fields=null;a.formTemplate=null;a.fullExtent=null;a.gdbVersion=null;a.geometryProperties=null;a.geometryType=null;a.hasM=void 0;a.hasZ=void 0;a.heightModelInfo=null;a.historicMoment=null;a.isTable=!1;a.labelsVisible=!0;a.labelingInfo=null;a.layerId=void 0;a.legendEnabled=!0;a.minScale=0;a.maxScale=0;a.globalIdField=null;a.objectIdField=null;a.outFields=null;a.path=null;a.popupEnabled=!0;a.popupTemplate=null;a.relationships=null;
a.sourceJSON=null;a.returnM=void 0;a.returnZ=void 0;a.screenSizePerspectiveEnabled=!0;a.serviceDefinitionExpression=null;a.spatialReference=O.WGS84;a.templates=null;a.timeInfo=null;a.title=null;a.sublayerTitleMode="item-title";a.trackIdField=null;a.type="feature";a.typeIdField=null;a.types=null;a.indexes=new (x.ofType(S.FeatureIndex));a.userIsAdmin=!1;a.version=void 0;a.visible=!0;return a}M._inheritsLoose(q,n);var f=q.prototype;f.destroy=function(){var a;null==(a=this.source)?void 0:a.destroy();
this._handles&&(this._handles.destroy(),this._handles=null)};f.normalizeCtorArgs=function(a,b){return"string"===typeof a?{url:a,...b}:a};f.load=function(a){const b=N.isSome(a)?a.signal:null;if(this.portalItem&&this.portalItem.loaded&&this.source)this.addResolvingPromise(this.createGraphicsSource(b).then(e=>this._initLayerProperties(e)));else return a=this.loadFromPortal({supportedTypes:["Feature Service","Feature Collection"]},a).catch(e=>e).then(async()=>{if(this.url&&null==this.layerId&&/FeatureServer|MapServer\/*$/i.test(this.url)){const e=
await this._fetchFirstLayerId(b);null!=e&&(this.layerId=e)}if(!this.url&&!this._hasMemorySource())throw new p("feature-layer:missing-url-or-source","Feature layer must be created with either a url or a source");return this._initLayerProperties(await this.createGraphicsSource(b))}),this.addResolvingPromise(a),v.resolve(this)};f.readCapabilities=function(a,b){b=b.layerDefinition||b;return{attachment:this._readAttachmentCapabilities(b.attachmentProperties),data:this._readDataCapabilities(b),metadata:this._readMetadataCapabilities(b),
operations:this._readOperationsCapabilities(b.capabilities||a,b),query:this._readQueryCapabilities(b),queryRelated:this._readQueryRelatedCapabilities(b),editing:this._readEditingCapabilities(b)}};f.readEditingEnabled=function(a,b){return this._readEditingEnabled(b,!1)};f.readEditingEnabledFromWebMap=function(a,b,e){return this._readEditingEnabled(b,!0,e)};f.writeEditingEnabled=function(a,b){this._writeEditingEnabled(a,b,!1)};f.writeEditingEnabledToWebMap=function(a,b,e,h){this._writeEditingEnabled(a,
b,!0,h)};f.readEditingInfo=function(a,b){({editingInfo:a}=b);return a?{lastEditDate:null!=a.lastEditDate?new Date(a.lastEditDate):null}:null};f.readFeatureReduction=function(a,b){return G.read(a,b)};f.writeWebSceneFeatureReduction=function(a,b,e,h){G.writeTarget(a,b,"layerDefinition.featureReduction",h)};f.readIsTable=function(a,b){b=b&&b.layerDefinition||b;return"Table"===b.type||!b.geometryType};f.writeIsTable=function(a,b,e,h){null!=h&&h.writeLayerSchema&&D.setDeepValue(e,a?"Table":"Feature Layer",
b)};f.readMinScale=function(a,b){return b.effectiveMinScale||a||0};f.readMaxScale=function(a,b){return b.effectiveMaxScale||a||0};f.readGlobalIdFieldFromService=function(a,b){b=b.layerDefinition||b;if(b.globalIdField)return b.globalIdField;if(b.fields)for(const e of b.fields)if("esriFieldTypeGlobalID"===e.type)return e.name};f.readObjectIdFieldFromService=function(a,b){b=b.layerDefinition||b;if(b.objectIdField)return b.objectIdField;if(b.fields)for(const e of b.fields)if("esriFieldTypeOID"===e.type)return e.name};
f.readRenderer=function(a,b,e){b=b.layerDefinition||b;if(a=b.drawingInfo&&b.drawingInfo.renderer||void 0)return(a=F.read(a,b,e)||void 0)||X.error("Failed to create renderer",{rendererDefinition:b.drawingInfo.renderer,layer:this,context:e}),a;if(b.defaultSymbol)return b.types&&b.types.length?new ja({defaultSymbol:J(b.defaultSymbol,b,e),field:b.typeIdField,uniqueValueInfos:b.types.map(h=>({id:h.id,symbol:J(h.symbol,h,e)}))}):new ka({symbol:J(b.defaultSymbol,b,e)})};f.castSource=function(a){return a?
Array.isArray(a)||a instanceof x?new R["default"]({layer:this,items:a}):a:null};f.readSource=function(a,b){a=qa.fromJSON(b.featureSet);return new R["default"]({layer:this,items:a&&a.features||[]})};f.readServiceDefinitionExpression=function(a,b){return b.definitionQuery||b.definitionExpression};f.readTemplates=function(a,b){var e=b.editFieldsInfo;b=e&&e.creatorField;e=e&&e.editorField;a=a&&a.map(h=>T.fromJSON(h));this._fixTemplates(a,b);this._fixTemplates(a,e);return a};f.readTitle=function(a,b){a=
b.layerDefinition&&b.layerDefinition.name||b.name;b=b.title||b.layerDefinition&&b.layerDefinition.title;if(a){b=this.portalItem&&this.portalItem.title;if("item-title"===this.sublayerTitleMode)return this.url?y.titleFromUrlAndName(this.url,a):a;if(!a&&this.url){const e=y.parse(this.url);N.isSome(e)&&(a=e.title)}if(!a)return;"item-title-and-service-name"===this.sublayerTitleMode&&b&&b!==a&&(a=b+" - "+a);return y.cleanTitle(a)}if("item-title"===this.sublayerTitleMode&&b)return b};f.readTitleFromWebMap=
function(a,b){return b.title||b.layerDefinition&&b.layerDefinition.name};f.readTypeIdField=function(a,b){b=b.layerDefinition||b;if(a=b.typeIdField)if(b=A.getField(b.fields,a))a=b.name;return a};f.readTypes=function(a,b){b=b.layerDefinition||b;a=b.types;const e=(b=b.editFieldsInfo)&&b.creatorField,h=b&&b.editorField;return a&&a.map(l=>{l=U.fromJSON(l);this._fixTemplates(l.templates,e);this._fixTemplates(l.templates,h);return l})};f.writeUrl=function(a,b,e,h){y.writeUrlWithLayerId(this,a,null,b,h)};
f.readVersion=function(a,b){return b.currentVersion?b.currentVersion:b.hasOwnProperty("capabilities")||b.hasOwnProperty("drawingInfo")||b.hasOwnProperty("hasAttachments")||b.hasOwnProperty("htmlPopupType")||b.hasOwnProperty("relationships")||b.hasOwnProperty("timeInfo")||b.hasOwnProperty("typeIdField")||b.hasOwnProperty("types")?10:9.3};f.readVisible=function(a,b){if(b.layerDefinition&&null!=b.layerDefinition.defaultVisibility)return!!b.layerDefinition.defaultVisibility;if(null!=b.visibility)return!!b.visibility};
f.addAttachment=function(a,b){return this.load().then(()=>this._checkAttachmentSupport(a)).then(()=>{if(!("addAttachment"in this.source))throw new p("FeatureLayer","Layer source does not support addAttachment capability");return this.source.addAttachment(a,b)})};f.updateAttachment=function(a,b,e){return this.load().then(()=>this._checkAttachmentSupport(a)).then(()=>{if(!("updateAttachment"in this.source))throw new p("FeatureLayer","Layer source does not support updateAttachment capability");return this.source.updateAttachment(a,
b,e)})};f.applyEdits=async function(a,b){const e=await new Promise(function(h,l){L(["./graphics/editingSupport"],h,l)});await this.load();return e.applyEdits(this,this.source,a,b)};f.on=function(a,b){return n.prototype.on.call(this,a,b)};f.createPopupTemplate=function(a){return Ha.createPopupTemplate(this,a)};f.createGraphicsSource=async function(a){if(this._hasMemorySource())return this.emit("graphics-source-create",{graphicsSource:this.source}),this.source.load({signal:a});const b=await new Promise(function(e,
h){L(["./graphics/sources/FeatureLayerSource"],function(l){e(Object.freeze({__proto__:null,"default":l}))},h)});v.throwIfAborted(a);a=await (new b.default({layer:this})).load({signal:a});this.emit("graphics-source-create",{graphicsSource:a});return a};f.createQuery=function(){const a=new z,b=this.get("capabilities.data");a.dynamicDataSource=this.dynamicDataSource;a.gdbVersion=this.gdbVersion;a.historicMoment=this.historicMoment;a.returnGeometry=!0;b&&(b.supportsZ&&null!=this.returnZ&&(a.returnZ=this.returnZ),
b.supportsM&&null!=this.returnM&&(a.returnM=this.returnM));a.outFields=["*"];a.where=this.definitionExpression||"1\x3d1";const {timeOffset:e,timeExtent:h}=this;a.timeExtent=null!=e&&null!=h?h.offset(-e.value,e.unit):h||null;a.multipatchOption="multipatch"===this.geometryType?"xyFootprint":null;return a};f.deleteAttachments=function(a,b){return this.load().then(()=>this._checkAttachmentSupport(a)).then(()=>{if(!("deleteAttachments"in this.source))throw new p("FeatureLayer","Layer source does not support deleteAttachments capability");
return this.source.deleteAttachments(a,b)})};f.fetchRecomputedExtents=function(a){return this.load({signal:null==a?void 0:a.signal}).then(()=>{if(this.source.fetchRecomputedExtents)return this.source.fetchRecomputedExtents(a);throw new p("FeatureLayer","Layer source does not support fetchUpdates capability");})};f.getFeatureType=function(a){const {typeIdField:b,types:e}=this;if(!b||!a)return null;const h=a.attributes?a.attributes[b]:void 0;if(null==h)return null;let l=null;e.some(r=>{const {id:t}=
r;if(null==t)return!1;t.toString()===h.toString()&&(l=r);return!!l});return l};f.getFieldDomain=function(a,b){return(b=this.getFeatureType(b&&b.feature))&&(b=b.domains&&b.domains[a])&&"inherited"!==b.type?b:this._getLayerDomain(a)};f.getField=function(a){return this.fieldsIndex.get(a)};f.queryAttachments=function(a,b){a=Ia.from(a);return this.load().then(()=>{if(!this.get("capabilities.data.supportsAttachment"))throw new p("FeatureLayer","this layer doesn't support attachments");const {attachmentTypes:e,
objectIds:h,globalIds:l,num:r,size:t,start:K,where:Y}=a;if(!this.get("capabilities.operations.supportsQueryAttachments")){const Ka=e&&e.length,La=l&&l.length,Ma=t&&t.length;if(h&&1<h.length||Ka||La||Ma||r||K||Y)throw new p("FeatureLayer","when 'supportsQueryAttachments' is false, only objectIds of length 1 are supported",a);}if(!(h&&h.length||Y))throw new p("FeatureLayer","'objectIds' or 'where' are required to perform attachment query",a);if(!("queryAttachments"in this.source))throw new p("FeatureLayer",
"Layer source does not support queryAttachments capability",a);return this.source.queryAttachments(a)})};f.queryFeatures=function(a,b){return this.load().then(()=>this.source.queryFeatures(z.from(a)||this.createQuery(),b)).then(e=>{if(e&&e.features)for(const h of e.features)h.layer=h.sourceLayer=this;return e})};f.queryObjectIds=function(a,b){return this.load().then(()=>{if(this.source.queryObjectIds)return this.source.queryObjectIds(z.from(a)||this.createQuery(),b);throw new p("FeatureLayer","Layer source does not support queryObjectIds capability");
})};f.queryFeatureCount=function(a,b){return this.load().then(()=>{if(this.source.queryFeatureCount)return this.source.queryFeatureCount(z.from(a)||this.createQuery(),b);throw new p("FeatureLayer","Layer source does not support queryFeatureCount capability");})};f.queryExtent=function(a,b){return this.load().then(()=>{if(this.source.queryExtent)return this.source.queryExtent(z.from(a)||this.createQuery(),b);throw new p("FeatureLayer","Layer source does not support queryExtent capability");})};f.queryRelatedFeatures=
function(a,b){return this.load().then(()=>{if("queryRelatedFeatures"in this.source)return this.source.queryRelatedFeatures(W.from(a),b);throw new p("FeatureLayer","Layer source does not support queryRelatedFeatures capability");})};f.queryRelatedFeaturesCount=function(a,b){return this.load().then(()=>{if("queryRelatedFeaturesCount"in this.source)return this.source.queryRelatedFeaturesCount(W.from(a),b);throw new p("FeatureLayer","Layer source does not support queryRelatedFeaturesCount capability");
})};f.read=function(a,b){const e=a.featureCollection;if(e){const h=e.layers;h&&1===h.length&&(n.prototype.read.call(this,h[0],b),null!=e.showLegend&&n.prototype.read.call(this,{showLegend:e.showLegend},b))}n.prototype.read.call(this,a,b);b&&"service"===b.origin&&this.revert(["objectIdField","fields","timeInfo","spatialReference"],"service")};f.write=function(a,b){var e,h;b={...b,writeLayerSchema:null!=(e=null==(h=b)?void 0:h.writeLayerSchema)?e:this._hasMemorySource()};e=b.origin;h=b.layerContainerType;
const l=b.messages;if(this.isTable){if("web-scene"===e||"web-map"===e&&"tables"!==h)return l&&l.push(new p("layer:unsupported",`Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' using a Table source cannot be written to web scenes and web maps`,{layer:this})),null;if(this._hasMemorySource())return l&&l.push(new p("layer:unsupported",`Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' using an in-memory Table source cannot be written to web scenes and web maps`,{layer:this})),
null}else if(this.loaded&&"web-map"===e&&"tables"===h)return l&&l.push(new p("layer:unsupported",`Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' using a non-table source cannot be written to tables in web maps`,{layer:this})),null;return n.prototype.write.call(this,a,b)};f._readEditingEnabled=function(a,b,e){var h;let l=null==(h=a.layerDefinition)?void 0:h.capabilities;if(l)return this._hasEditingCapability(l);l=a.capabilities;return b&&"web-map"===(null==e?void 0:e.origin)&&!this._hasMemorySource()&&
l?this._hasEditingCapability(l):!0};f._hasEditingCapability=function(a){return a.toLowerCase().split(",").map(b=>b.trim()).includes("editing")};f._writeEditingEnabled=function(a,b,e,h){if(!a){var l,r;a=null!=(l=this.capabilities)&&null!=(r=l.operations)&&r.supportsSync?"Query,Sync":"Query";D.setDeepValue("layerDefinition.capabilities",a,b);!e||null!=h&&h.writeLayerSchema||(b.capabilities=a)}};f._checkAttachmentSupport=function(a){const {attributes:b}=a,{objectIdField:e}=this;if(!this.get("capabilities.data.supportsAttachment"))return v.reject(new p("FeatureLayer",
"this layer doesn't support attachments"));if(!a)return v.reject(new p("FeatureLayer","A feature is required to add/delete/update attachments"));if(!b)return v.reject(new p("FeatureLayer","'attributes' are required on a feature to query attachments"));if(!b[e])return v.reject(new p("FeatureLayer",`feature is missing the identifying attribute ${e}`))};f._getLayerDomain=function(a){return(a=this.fieldsIndex.get(a))?a.domain:null};f._fetchFirstLayerId=function(a){return ha(this.url,{query:{f:"json",
...this.customParameters},responseType:"json",signal:a}).then(b=>{if(b=b.data){if(Array.isArray(b.layers)&&0<b.layers.length)return b.layers[0].id;if(Array.isArray(b.tables)&&0<b.tables.length)return b.tables[0].id}})};f._initLayerProperties=async function(a){this._set("source",a);a.sourceJSON&&(this.sourceJSON=a.sourceJSON,this.read(a.sourceJSON,{origin:"service",url:this.parsedUrl}));this._verifySource();this._verifyFields();A.fixRendererFields(this.renderer,this.fields);A.fixTimeInfoFields(this.timeInfo,
this.fields);return Ga.loadStyleRenderer(this,{origin:"service"})};f._verifyFields=function(){const a=this.parsedUrl&&this.parsedUrl.path||"undefined";this.objectIdField||console.log("FeatureLayer: 'objectIdField' property is not defined (url: "+a+")");this.isTable||this._hasMemorySource()||-1!==a.search(/\/FeatureServer\//i)||this.fields&&this.fields.some(function(b){return"geometry"===b.type})||console.log("FeatureLayer: unable to find field of type 'geometry' in the layer 'fields' list. If you are using a map service layer, features will not have geometry (url: "+
a+")")};f._fixTemplates=function(a,b){a&&a.forEach(e=>{(e=e.prototype&&e.prototype.attributes)&&b&&delete e[b]})};f._verifySource=function(){if(this._hasMemorySource()){if(this.url)throw new p("feature-layer:mixed-source-and-url","FeatureLayer cannot be created with both an in-memory source and a url");}else if(!this.url)throw new p("feature-layer:source-or-url-required","FeatureLayer requires either a url, a valid portal item or a source");};f._initMemorySource=function(a){a.forEach(b=>{b.layer=
this;b.sourceLayer=this});this._handles.add([a.on("after-add",b=>{b.item.layer=this;b.item.sourceLayer=this}),a.on("after-remove",b=>{b.item.layer=null;b.item.sourceLayer=null})],"fl-source")};f._resetMemorySource=function(a){a.forEach(b=>{b.layer=null;b.sourceLayer=null});this._handles.remove("fl-source")};f._hasMemorySource=function(){return!(this.url||!this.source)};f._readAttachmentCapabilities=function(a){const b={supportsName:!1,supportsSize:!1,supportsContentType:!1,supportsKeywords:!1,supportsExifInfo:!1};
a&&Array.isArray(a)&&a.forEach(e=>{const h=Ja[e.name];h&&(b[h]=!!e.isEnabled)});return b};f._readDataCapabilities=function(a){return{isVersioned:k(a,"isDataVersioned",!1),supportsAttachment:k(a,"hasAttachments",!1),supportsM:k(a,"hasM",!1),supportsZ:k(a,"hasZ",!1)}};f._readMetadataCapabilities=function(a){return{supportsAdvancedFieldProperties:k(a,"supportsFieldDescriptionProperty",!1)}};f._readOperationsCapabilities=function(a,b){a=a?a.toLowerCase().split(",").map(K=>K.trim()):[];const e=-1!==a.indexOf("editing");
let h=e&&-1!==a.indexOf("create"),l=e&&-1!==a.indexOf("delete"),r=e&&-1!==a.indexOf("update");const t=-1!==a.indexOf("changetracking");!e||h||l||r||(h=l=r=!0);return{supportsCalculate:k(b,"supportsCalculate",!1),supportsTruncate:k(b,"supportsTruncate",!1),supportsValidateSql:k(b,"supportsValidateSql",!1),supportsAdd:h,supportsDelete:l,supportsEditing:e,supportsChangeTracking:t,supportsQuery:-1!==a.indexOf("query"),supportsQueryAttachments:k(b.advancedQueryCapabilities,"supportsQueryAttachments",!1),
supportsResizeAttachments:k(b,"supportsAttachmentsResizing",!1),supportsSync:-1!==a.indexOf("sync"),supportsUpdate:r,supportsExceedsLimitStatistics:k(b,"supportsExceedsLimitStatistics",!1)}};f._readQueryCapabilities=function(a){const b=a.advancedQueryCapabilities,e=a.ownershipBasedAccessControlForFeatures,h=a.archivingInfo,l=(a.supportedQueryFormats||"").split(",").reduce((r,t)=>{(t=t.toLowerCase().trim())&&r.add(t);return r},new Set);return{supportsStatistics:k(b,"supportsStatistics",a.supportsStatistics),
supportsPercentileStatistics:k(b,"supportsPercentileStatistics",!1),supportsCentroid:k(b,"supportsReturningGeometryCentroid",!1),supportsDistance:k(b,"supportsQueryWithDistance",!1),supportsDistinct:k(b,"supportsDistinct",a.supportsAdvancedQueries),supportsExtent:k(b,"supportsReturningQueryExtent",!1),supportsGeometryProperties:k(b,"supportsReturningGeometryProperties",!1),supportsHavingClause:k(b,"supportsHavingClause",!1),supportsOrderBy:k(b,"supportsOrderBy",a.supportsAdvancedQueries),supportsPagination:k(b,
"supportsPagination",!1),supportsQuantization:k(a,"supportsCoordinatesQuantization",!1),supportsQuantizationEditMode:k(a,"supportsQuantizationEditMode",!1),supportsQueryGeometry:k(a,"supportsReturningQueryGeometry",!1),supportsResultType:k(b,"supportsQueryWithResultType",!1),supportsMaxRecordCountFactor:k(b,"supportsMaxRecordCountFactor",!1),supportsSqlExpression:k(b,"supportsSqlExpression",!1),supportsStandardizedQueriesOnly:k(a,"useStandardizedQueries",!1),supportsQueryByOthers:k(e,"allowOthersToQuery",
!0),supportsHistoricMoment:k(h,"supportsQueryWithHistoricMoment",!1),supportsFormatPBF:l.has("pbf"),supportsDisjointSpatialRelationship:k(b,"supportsDisjointSpatialRel",!1),supportsCacheHint:k(b,"supportsQueryWithCacheHint",!1),maxRecordCountFactor:B(a,"maxRecordCountFactor",void 0),maxRecordCount:B(a,"maxRecordCount",void 0),standardMaxRecordCount:B(a,"standardMaxRecordCount",void 0),tileMaxRecordCount:B(a,"tileMaxRecordCount",void 0)}};f._readQueryRelatedCapabilities=function(a){a=a.advancedQueryCapabilities;
const b=k(a,"supportsAdvancedQueryRelated",!1);return{supportsPagination:k(a,"supportsQueryRelatedPagination",!1),supportsCount:b,supportsOrderBy:b}};f._readEditingCapabilities=function(a){const b=a.ownershipBasedAccessControlForFeatures;return{supportsGeometryUpdate:k(a,"allowGeometryUpdates",!0),supportsGlobalId:k(a,"supportsApplyEditsWithGlobalIds",!1),supportsRollbackOnFailure:k(a,"supportsRollbackOnFailureParameter",!1),supportsUpdateWithoutM:k(a,"allowUpdateWithoutMValues",!1),supportsUploadWithItemId:k(a,
"supportsAttachmentsByUploadId",!1),supportsDeleteByAnonymous:k(b,"allowAnonymousToDelete",!0),supportsDeleteByOthers:k(b,"allowOthersToDelete",!0),supportsUpdateByAnonymous:k(b,"allowAnonymousToUpdate",!0),supportsUpdateByOthers:k(b,"allowOthersToUpdate",!0)}};M._createClass(q,[{key:"createQueryVersion",get:function(){this.definitionExpression;this.dynamicDataSource;this.timeExtent;this.timeOffset;this.geometryType;this.gdbVersion;this.historicMoment;this.returnZ;this.capabilities;this.returnM;return(this._get("createQueryVersion")||
0)+1}},{key:"fieldsIndex",get:function(){return new oa(this.fields||[])}},{key:"parsedUrl",get:function(){const a=this.url?E.urlToObject(this.url):null;null!=a&&(null!=this.dynamicDataSource?a.path=E.join(a.path,"dynamicLayer"):null!=this.layerId&&(a.path=E.join(a.path,this.layerId.toString())));return a}},{key:"defaultPopupTemplate",get:function(){return this.createPopupTemplate()}},{key:"renderer",set:function(a){A.fixRendererFields(a,this.fields);this._set("renderer",a)}},{key:"source",set:function(a){const b=
this._get("source");b!==a&&(b&&b instanceof x&&this._resetMemorySource(b),a&&a instanceof x&&this._initMemorySource(a),this._set("source",a))}},{key:"url",set:function(a){a=y.sanitizeUrlWithLayerId(this,a,X);this._set("url",a.url);null!=a.layerId&&this._set("layerId",a.layerId)}}]);return q}(sa.BlendLayer(ya.TemporalLayer(wa.ScaleRangeLayer(va.RefreshableLayer(ra.ArcGISService(na.OperationalLayer(ua.PortalLayer(la.MultiOriginJSONMixin(ta.CustomParametersMixin(c))))))))));d.__decorate([g.property({readOnly:!0,
json:{read:!1}})],c.prototype,"capabilities",void 0);d.__decorate([m.reader("service","capabilities","advancedQueryCapabilities allowGeometryUpdates allowUpdateWithoutMValues archivingInfo capabilities hasAttachments hasM hasZ maxRecordCount maxRecordCountFactor ownershipBasedAccessControlForFeatures standardMaxRecordCount supportedQueryFormats supportsAdvancedQueries supportsApplyEditsWithGlobalIds supportsAttachmentsByUploadId supportsAttachmentsResizing supportsCalculate supportsCoordinatesQuantization supportsExceedsLimitStatistics supportsFieldDescriptionProperty supportsQuantizationEditMode supportsRollbackOnFailureParameter supportsStatistics supportsTruncate supportsValidateSql tileMaxRecordCount useStandardizedQueries".split(" "))],
c.prototype,"readCapabilities",null);d.__decorate([g.property({json:{origins:{"portal-item":{write:!0},"web-map":{write:!0}}}})],c.prototype,"charts",void 0);d.__decorate([g.property({readOnly:!0,dependsOn:"definitionExpression dynamicDataSource timeExtent timeOffset geometryType gdbVersion historicMoment returnZ capabilities returnM".split(" ")})],c.prototype,"createQueryVersion",null);d.__decorate([g.property({type:String,json:{read:{source:"layerDefinition.copyrightText"},origins:{service:{read:{source:"copyrightText"}}}}})],
c.prototype,"copyright",void 0);d.__decorate([g.property({type:String,json:{read:{source:"layerDefinition.displayField"},origins:{service:{read:{source:"displayField"}}}}})],c.prototype,"displayField",void 0);d.__decorate([g.property({type:String,json:{origins:{service:{read:!1,write:!1}},read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],c.prototype,"definitionExpression",void 0);d.__decorate([g.property({types:P.symbolTypes,readOnly:!0})],
c.prototype,"defaultSymbol",void 0);d.__decorate([g.property({type:Fa.DataLayerSource})],c.prototype,"dynamicDataSource",void 0);d.__decorate([g.property({readOnly:!0})],c.prototype,"editFieldsInfo",void 0);d.__decorate([g.property({type:Boolean})],c.prototype,"editingEnabled",void 0);d.__decorate([m.reader(["portal-item","web-scene"],"editingEnabled",["layerDefinition.capabilities"])],c.prototype,"readEditingEnabled",null);d.__decorate([m.reader("web-map","editingEnabled",["capabilities","layerDefinition.capabilities"])],
c.prototype,"readEditingEnabledFromWebMap",null);d.__decorate([w.writer(["portal-item","web-scene"],"editingEnabled",{"layerDefinition.capabilities":{type:String}})],c.prototype,"writeEditingEnabled",null);d.__decorate([w.writer("web-map","editingEnabled",{capabilities:{type:String},"layerDefinition.capabilities":{type:String}})],c.prototype,"writeEditingEnabledToWebMap",null);d.__decorate([g.property({readOnly:!0})],c.prototype,"editingInfo",void 0);d.__decorate([m.reader("editingInfo")],c.prototype,
"readEditingInfo",null);d.__decorate([g.property(u.elevationInfo)],c.prototype,"elevationInfo",void 0);d.__decorate([g.property({types:{key:"type",base:za["default"],typeMap:{selection:Ca,cluster:Ba}},json:{write:{target:"layerDefinition.featureReduction"}}})],c.prototype,"featureReduction",void 0);d.__decorate([m.reader("featureReduction",["layerDefinition.featureReduction"])],c.prototype,"readFeatureReduction",null);d.__decorate([w.writer("web-scene","featureReduction",{"layerDefinition.featureReduction":{types:G.webSceneFeatureReductionTypes}})],
c.prototype,"writeWebSceneFeatureReduction",null);d.__decorate([g.property({...C.fields,json:{read:{source:"layerDefinition.fields"},origins:{service:{read:!0},"web-map":{write:{target:"layerDefinition.fields",overridePolicy:H}}}}})],c.prototype,"fields",void 0);d.__decorate([g.property({readOnly:!0,dependsOn:["fields"]})],c.prototype,"fieldsIndex",null);d.__decorate([g.property({type:pa,json:{name:"formInfo",write:!0,origins:{"web-scene":{read:!1,write:!1}}}})],c.prototype,"formTemplate",void 0);
d.__decorate([g.property({type:ea,json:{origins:{service:{read:{source:"extent"}}},read:{source:"layerDefinition.extent"}}})],c.prototype,"fullExtent",void 0);d.__decorate([g.property()],c.prototype,"gdbVersion",void 0);d.__decorate([g.property({readOnly:!0})],c.prototype,"geometryProperties",void 0);d.__decorate([g.property({type:"point polygon polyline multipoint multipatch mesh".split(" "),json:{origins:{service:{read:I.read},"web-map":{write:{target:"layerDefinition.geometryType",overridePolicy:H,
writer(n,q,f){(n=n?I.toJSON(n):null)&&D.setDeepValue(f,n,q)}}}},read:{source:"layerDefinition.geometryType",reader:I.read}}})],c.prototype,"geometryType",void 0);d.__decorate([g.property({type:Boolean,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasM"}}})],c.prototype,"hasM",void 0);d.__decorate([g.property({type:Boolean,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasZ"}}})],c.prototype,"hasZ",void 0);d.__decorate([g.property({readOnly:!0,type:ma})],c.prototype,
"heightModelInfo",void 0);d.__decorate([g.property({type:Date})],c.prototype,"historicMoment",void 0);d.__decorate([g.property({json:{origins:{service:{read:!1},"portal-item":{read:!1}}}})],c.prototype,"id",void 0);d.__decorate([g.property({readOnly:!0,json:{origins:{"web-map":{write:{target:"layerDefinition.type"}}}}})],c.prototype,"isTable",void 0);d.__decorate([m.reader("service","isTable",["type","geometryType"]),m.reader("isTable",["layerDefinition.type","layerDefinition.geometryType"])],c.prototype,
"readIsTable",null);d.__decorate([w.writer("web-map","isTable")],c.prototype,"writeIsTable",null);d.__decorate([g.property(u.labelsVisible)],c.prototype,"labelsVisible",void 0);d.__decorate([g.property({type:[Aa],json:{origins:{service:{read:{source:"drawingInfo.labelingInfo",reader:V.reader},write:{target:"drawingInfo.labelingInfo",enabled:!1}}},read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:V.reader},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],c.prototype,"labelingInfo",
void 0);d.__decorate([g.property(u.opacityDrawingInfo)],c.prototype,"opacity",void 0);d.__decorate([g.property({type:Number,json:{origins:{service:{read:{source:"id"}}},read:!1}})],c.prototype,"layerId",void 0);d.__decorate([g.property(u.legendEnabled)],c.prototype,"legendEnabled",void 0);d.__decorate([g.property({type:["show","hide"]})],c.prototype,"listMode",void 0);d.__decorate([g.property({type:Number,json:{origins:{service:{write:{enabled:!1}}},read:{source:"layerDefinition.minScale"},write:{target:"layerDefinition.minScale"}}})],
c.prototype,"minScale",void 0);d.__decorate([m.reader("service","minScale",["minScale","effectiveMinScale"])],c.prototype,"readMinScale",null);d.__decorate([g.property({type:Number,json:{origins:{service:{write:{enabled:!1}}},read:{source:"layerDefinition.maxScale"},write:{target:"layerDefinition.maxScale"}}})],c.prototype,"maxScale",void 0);d.__decorate([m.reader("service","maxScale",["maxScale","effectiveMaxScale"])],c.prototype,"readMaxScale",null);d.__decorate([g.property({type:String})],c.prototype,
"globalIdField",void 0);d.__decorate([m.reader("globalIdField",["layerDefinition.globalIdField","layerDefinition.fields"]),m.reader("service","globalIdField",["globalIdField","fields"])],c.prototype,"readGlobalIdFieldFromService",null);d.__decorate([g.property({type:String,json:{origins:{"web-map":{write:{target:"layerDefinition.objectIdField",overridePolicy:H}}}}})],c.prototype,"objectIdField",void 0);d.__decorate([m.reader("objectIdField",["layerDefinition.objectIdField","layerDefinition.fields"]),
m.reader("service","objectIdField",["objectIdField","fields"])],c.prototype,"readObjectIdFieldFromService",null);d.__decorate([g.property({value:"ArcGISFeatureLayer",type:["ArcGISFeatureLayer"]})],c.prototype,"operationalLayerType",void 0);d.__decorate([g.property(C.outFields)],c.prototype,"outFields",void 0);d.__decorate([g.property({readOnly:!0,dependsOn:["layerId","dynamicDataSource"]})],c.prototype,"parsedUrl",null);d.__decorate([g.property({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},
read:!1}})],c.prototype,"path",void 0);d.__decorate([g.property(u.popupEnabled)],c.prototype,"popupEnabled",void 0);d.__decorate([g.property({type:fa,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],c.prototype,"popupTemplate",void 0);d.__decorate([g.property({readOnly:!0,dependsOn:["fields","title"]})],c.prototype,"defaultPopupTemplate",null);d.__decorate([g.property({type:[Ea],readOnly:!0})],c.prototype,"relationships",void 0);d.__decorate([g.property({types:Q.rendererTypes,json:{origins:{service:{write:{target:"drawingInfo.renderer",
enabled:!1}},"web-scene":{types:Q.webSceneRendererTypes,write:{target:"layerDefinition.drawingInfo.renderer",writer:F.write}}},write:{target:"layerDefinition.drawingInfo.renderer",overridePolicy(n,q,f){return{ignoreOrigin:null==f?void 0:f.writeLayerSchema}},writer:F.write}}})],c.prototype,"renderer",null);d.__decorate([m.reader("service","renderer",["drawingInfo.renderer","defaultSymbol"]),m.reader("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol"])],c.prototype,"readRenderer",
null);d.__decorate([g.property()],c.prototype,"sourceJSON",void 0);d.__decorate([g.property({type:Boolean})],c.prototype,"returnM",void 0);d.__decorate([g.property({type:Boolean})],c.prototype,"returnZ",void 0);d.__decorate([g.property(u.screenSizePerspectiveEnabled)],c.prototype,"screenSizePerspectiveEnabled",void 0);d.__decorate([g.property()],c.prototype,"source",null);d.__decorate([aa.cast("source")],c.prototype,"castSource",null);d.__decorate([m.reader("portal-item","source",["featureSet"]),
m.reader("web-map","source",["featureSet"])],c.prototype,"readSource",null);d.__decorate([g.property({readOnly:!0})],c.prototype,"serviceDefinitionExpression",void 0);d.__decorate([m.reader("service","serviceDefinitionExpression",["definitionQuery","definitionExpression"])],c.prototype,"readServiceDefinitionExpression",null);d.__decorate([g.property({type:O,json:{origins:{service:{read:{source:"extent.spatialReference"}}},read:{source:"layerDefinition.extent.spatialReference"}}})],c.prototype,"spatialReference",
void 0);d.__decorate([g.property({type:[T]})],c.prototype,"templates",void 0);d.__decorate([m.reader("templates",["editFieldsInfo","creatorField","editorField","templates"])],c.prototype,"readTemplates",null);d.__decorate([g.property({type:xa})],c.prototype,"timeInfo",void 0);d.__decorate([g.property()],c.prototype,"title",void 0);d.__decorate([m.reader("service","title",["name"]),m.reader("portal-item","title",["layerDefinition.title","layerDefinition.name","title"])],c.prototype,"readTitle",null);
d.__decorate([m.reader("web-map","title",["layerDefinition.name","title"])],c.prototype,"readTitleFromWebMap",null);d.__decorate([g.property({type:String})],c.prototype,"sublayerTitleMode",void 0);d.__decorate([g.property({type:String,json:{read:{source:"timeInfo.trackIdField"}}})],c.prototype,"trackIdField",void 0);d.__decorate([g.property({json:{read:!1}})],c.prototype,"type",void 0);d.__decorate([g.property({type:String})],c.prototype,"typeIdField",void 0);d.__decorate([m.reader("service","typeIdField"),
m.reader("typeIdField",["layerDefinition.typeIdField"])],c.prototype,"readTypeIdField",null);d.__decorate([g.property({type:[U]})],c.prototype,"types",void 0);d.__decorate([m.reader("service","types",["types"]),m.reader("types",["layerDefinition.types"])],c.prototype,"readTypes",null);d.__decorate([g.property({readOnly:!0,json:{write:!1}})],c.prototype,"serverGens",void 0);d.__decorate([g.property({type:x.ofType(S.FeatureIndex),readOnly:!0})],c.prototype,"indexes",void 0);d.__decorate([g.property(u.url)],
c.prototype,"url",null);d.__decorate([w.writer("url")],c.prototype,"writeUrl",null);d.__decorate([g.property({readOnly:!0})],c.prototype,"userIsAdmin",void 0);d.__decorate([g.property({json:{origins:{service:{read:!0}},read:!1}})],c.prototype,"version",void 0);d.__decorate([m.reader("service","version","currentVersion capabilities drawingInfo hasAttachments htmlPopupType relationships timeInfo typeIdField types".split(" "))],c.prototype,"readVersion",null);d.__decorate([g.property({type:Boolean,json:{origins:{"portal-item":{write:{target:"layerDefinition.defaultVisibility"}}}}})],
c.prototype,"visible",void 0);d.__decorate([m.reader("portal-item","visible",["visibility","layerDefinition.defaultVisibility"])],c.prototype,"readVisible",null);c=d.__decorate([da.subclass("esri.layers.FeatureLayer")],c);const J=ca.createTypeReader({types:P.symbolTypesRenderer});return c});