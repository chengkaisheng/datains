/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";import"../chunks/ArrayPool.js";import"../chunks/object.js";import"../chunks/deprecate.js";import"../core/lang.js";import"../config.js";import{L as t,i as s,b as r}from"../chunks/Logger.js";import"../chunks/string.js";import{g as o}from"../chunks/metadata.js";import{property as i}from"../core/accessorSupport/decorators/property.js";import"../core/Accessor.js";import"../chunks/PropertyOrigin.js";import"../core/scheduling.js";import{all as n,resolve as a,isAbortError as p}from"../core/promiseUtils.js";import"../chunks/Message.js";import l from"../core/Error.js";import"../chunks/compilerUtils.js";import"../chunks/ensureType.js";import{subclass as m}from"../core/accessorSupport/decorators/subclass.js";import"../chunks/Evented.js";import"../core/Collection.js";import"../chunks/collectionUtils.js";import{a as u}from"../chunks/JSONSupport.js";import"../chunks/Promise.js";import"../chunks/Loadable.js";import"../chunks/asyncUtils.js";import{join as d}from"../core/urlUtils.js";import"../core/accessorSupport/decorators/aliasOf.js";import"../core/accessorSupport/decorators/cast.js";import"../chunks/jsonMap.js";import"../chunks/enumeration.js";import{r as c}from"../chunks/reader.js";import"../chunks/shared.js";import"../chunks/writer.js";import"../chunks/multiOriginJSONSupportUtils.js";import"../chunks/resourceExtension.js";import"../chunks/persistableUrlUtils.js";import"../geometry/SpatialReference.js";import"../chunks/locale.js";import"../chunks/number.js";import"../intl.js";import"../kernel.js";import y from"../request.js";import"../chunks/assets.js";import"../geometry/Geometry.js";import"../geometry/Point.js";import"../chunks/Ellipsoid.js";import"../geometry/support/webMercatorUtils.js";import"../geometry/Extent.js";import"../portal/PortalQueryParams.js";import"../portal/PortalQueryResult.js";import"../portal/PortalFolder.js";import"../portal/PortalGroup.js";import"../portal/PortalUser.js";import"../portal/Portal.js";import"../portal/PortalItemResource.js";import"../portal/PortalRating.js";import"../portal/PortalItem.js";import"../chunks/mathUtils2.js";import"../chunks/colorUtils.js";import"../Color.js";import"../chunks/zmUtils.js";import"../geometry/Multipoint.js";import"../geometry/Polygon.js";import"../chunks/extentUtils.js";import"../geometry/Polyline.js";import"../chunks/typeUtils.js";import"../geometry/support/jsonUtils.js";import"../geometry.js";import"./support/CodedValueDomain.js";import"./support/Domain.js";import"./support/InheritedDomain.js";import"./support/RangeDomain.js";import"../chunks/domains.js";import"../chunks/arcadeOnDemand.js";import{fixRendererFields as h}from"./support/fieldUtils.js";import"../popup/content/Content.js";import"../popup/content/AttachmentsContent.js";import"../popup/content/CustomContent.js";import"../chunks/date.js";import"../popup/support/FieldInfoFormat.js";import"../popup/FieldInfo.js";import"../popup/content/FieldsContent.js";import"../chunks/MediaInfo.js";import"../popup/content/support/ChartMediaInfoValueSeries.js";import"../popup/content/support/ChartMediaInfoValue.js";import"../chunks/chartMediaInfoUtils.js";import"../popup/content/BarChartMediaInfo.js";import"../popup/content/ColumnChartMediaInfo.js";import"../popup/content/support/ImageMediaInfoValue.js";import"../popup/content/ImageMediaInfo.js";import"../popup/content/LineChartMediaInfo.js";import"../popup/content/PieChartMediaInfo.js";import"../popup/content/MediaContent.js";import"../popup/content/TextContent.js";import"../popup/content.js";import"../popup/ExpressionInfo.js";import"../popup/LayerOptions.js";import"../popup/support/RelatedRecordsInfoFieldOrder.js";import"../popup/RelatedRecordsInfo.js";import"../chunks/Identifiable.js";import"../support/actions/ActionBase.js";import"../support/actions/ActionButton.js";import"../support/actions/ActionToggle.js";import j from"../PopupTemplate.js";import"../symbols/Symbol.js";import"../symbols/CIMSymbol.js";import"../symbols/Symbol3DLayer.js";import"../chunks/screenUtils.js";import"../chunks/opacityUtils.js";import"../chunks/materialUtils.js";import"../symbols/edges/Edges3D.js";import"../symbols/edges/SketchEdges3D.js";import"../symbols/edges/SolidEdges3D.js";import"../chunks/utils.js";import"../chunks/Symbol3DMaterial.js";import"../symbols/ExtrudeSymbol3DLayer.js";import"../symbols/LineSymbol.js";import"../symbols/LineSymbolMarker.js";import"../symbols/SimpleLineSymbol.js";import"../symbols/FillSymbol.js";import"../symbols/patterns/StylePattern3D.js";import"../symbols/FillSymbol3DLayer.js";import"../chunks/colors.js";import"../chunks/Symbol3DOutline.js";import"../symbols/Font.js";import"../symbols/IconSymbol3DLayer.js";import"../symbols/LineSymbol3DLayer.js";import"../symbols/ObjectSymbol3DLayer.js";import"../symbols/PathSymbol3DLayer.js";import"../symbols/TextSymbol3DLayer.js";import"../symbols/WaterSymbol3DLayer.js";import"../symbols/Symbol3D.js";import"../chunks/Thumbnail.js";import"../symbols/callouts/Callout3D.js";import"../symbols/callouts/LineCallout3D.js";import"../chunks/Symbol3DVerticalOffset.js";import"../symbols/LabelSymbol3D.js";import"../symbols/LineSymbol3D.js";import"../symbols/MarkerSymbol.js";import"../symbols/MeshSymbol3D.js";import"../chunks/urlUtils.js";import"../symbols/PictureFillSymbol.js";import"../symbols/PictureMarkerSymbol.js";import"../symbols/PointSymbol3D.js";import"../symbols/PolygonSymbol3D.js";import"../symbols/SimpleFillSymbol.js";import"../symbols/SimpleMarkerSymbol.js";import"../symbols/TextSymbol.js";import"../symbols/WebStyleSymbol.js";import"../symbols/support/jsonUtils.js";import"../chunks/uid.js";import"../Graphic.js";import"../core/Handles.js";import f from"./Layer.js";import"../chunks/LegendOptions.js";import"../renderers/support/AuthoringInfo.js";import"../renderers/support/AuthoringInfoVisualVariable.js";import"../tasks/support/ColorRamp.js";import"../tasks/support/AlgorithmicColorRamp.js";import"../tasks/support/MultipartColorRamp.js";import"../chunks/colorRamps.js";import"../renderers/Renderer.js";import"../renderers/visualVariables/VisualVariable.js";import"../renderers/visualVariables/support/ColorStop.js";import"../renderers/visualVariables/ColorVariable.js";import"../renderers/visualVariables/support/OpacityStop.js";import"../renderers/visualVariables/OpacityVariable.js";import"../renderers/visualVariables/RotationVariable.js";import"../renderers/visualVariables/support/SizeStop.js";import"../renderers/visualVariables/SizeVariable.js";import"../chunks/sizeVariableUtils.js";import"../chunks/unitUtils.js";import"../chunks/lengthUtils.js";import"../chunks/visualVariableUtils.js";import"../chunks/VisualVariablesMixin.js";import"../renderers/support/ClassBreakInfo.js";import"../chunks/commonProperties.js";import"../renderers/ClassBreaksRenderer.js";import"../chunks/diffUtils.js";import"../renderers/support/UniqueValueInfo.js";import"../chunks/devEnvironmentUtils.js";import"../chunks/styleUtils.js";import"../renderers/UniqueValueRenderer.js";import"../chunks/MemCache.js";import"../chunks/LRUCache.js";import"../renderers/DictionaryRenderer.js";import"../renderers/support/AttributeColorInfo.js";import"../renderers/DotDensityRenderer.js";import"../renderers/support/HeatmapColorStop.js";import"../renderers/HeatmapRenderer.js";import"../renderers/SimpleRenderer.js";import{w as b}from"../renderers/support/jsonUtils.js";import"../chunks/timeUtils.js";import"../TimeExtent.js";import"../TimeInterval.js";import"../chunks/ReadOnlyMultiOriginJSONSupport.js";import{M as g}from"../chunks/MultiOriginJSONSupport.js";import{whenValidOnce as I}from"../core/watchUtils.js";import"../chunks/originUtils.js";import"../chunks/arcgisLayerUrl.js";import"../chunks/fieldType.js";import"../geometry/HeightModelInfo.js";import"../chunks/resourceUtils.js";import"../chunks/saveUtils.js";import{O as v}from"../chunks/OperationalLayer.js";import"../chunks/ElevationInfo.js";import"../chunks/unitConversionUtils.js";import{e as k,l as S,b as L,a as w,p as F,s as O}from"../chunks/commonProperties2.js";import"../core/workers/Connection.js";import"../chunks/Scheduler.js";import"../core/workers/workers.js";import"../form/ExpressionInfo.js";import"../form/elements/FieldElement.js";import"../form/support/elements.js";import"../form/elements/inputs/Input.js";import"../form/elements/support/inputs.js";import"../form/elements/inputs/DateTimePickerInput.js";import"../form/elements/inputs/TextInput.js";import"../form/elements/inputs/TextAreaInput.js";import"../form/elements/inputs/TextBoxInput.js";import"../form/elements/GroupElement.js";import"../form/FormTemplate.js";import"../chunks/zscale.js";import"../chunks/queryZScale.js";import"./support/Field.js";import"../tasks/support/FeatureSet.js";import"./FeatureLayer.js";import{A as U}from"../chunks/ArcGISService.js";import"../chunks/BlendLayer.js";import"../chunks/CustomParametersMixin.js";import{P as D}from"../chunks/PortalLayer.js";import"../chunks/RefreshableLayer.js";import{S as P}from"../chunks/ScaleRangeLayer.js";import"./support/TimeInfo.js";import"../chunks/TemporalLayer.js";import T,{F as E}from"./support/FeatureReductionSelection.js";import"./support/FeatureReductionCluster.js";import"../chunks/labelUtils.js";import R from"./support/LabelClass.js";import"../chunks/defaultsJSON.js";import"../chunks/defaults.js";import"../chunks/featureReductionUtils.js";import"./support/FeatureTemplate.js";import"./support/FeatureType.js";import{d as x}from"../chunks/fieldProperties.js";import C from"./support/FieldsIndex.js";import{r as _}from"../chunks/labelingInfo.js";import"./support/Relationship.js";import"../chunks/DataLayerSource.js";import{l as A}from"../chunks/styleUtils2.js";import{createPopupTemplate as M}from"../support/popupUtils.js";import"../tasks/support/AttachmentQuery.js";import V from"../tasks/support/Query.js";import"../tasks/support/StatisticDefinition.js";import"../tasks/support/RelationshipQuery.js";import{z as q}from"../chunks/capabilities.js";import{I as N,a as Q,b as G,c as z}from"../chunks/I3SLayerDefinitions.js";import{S as B}from"../chunks/SceneService.js";import{F as J}from"../chunks/FetchAssociatedFeatureLayer.js";let W=class extends u{constructor(){super(...arguments),this.name=null,this.field=null,this.currentRangeExtent=null,this.fullRangeExtent=null,this.type="rangeInfo"}};e([i({type:String,json:{read:!0,write:!0}})],W.prototype,"name",void 0),e([i({type:String,json:{read:!0,write:!0}})],W.prototype,"field",void 0),e([i({type:[Number],json:{read:!0,write:!0}})],W.prototype,"currentRangeExtent",void 0),e([i({type:[Number],json:{read:!0,write:!0}})],W.prototype,"fullRangeExtent",void 0),e([i({type:["rangeInfo"],readOnly:!0,json:{read:!1,write:!0}})],W.prototype,"type",void 0),W=e([m("esri.layers.support.RangeInfo")],W);var K=W;const $=["3DObject","Point"],H=t.getLogger("esri.layers.SceneLayer"),Z=x();let X=class extends(B(U(v(D(P(g(f))))))){constructor(...e){super(...e),this.featureReduction=null,this.rangeInfos=null,this.operationalLayerType="ArcGISSceneServiceLayer",this.type="scene",this.fields=null,this.outFields=null,this.nodePages=null,this.materialDefinitions=null,this.textureSetDefinitions=null,this.geometryDefinitions=null,this.serviceUpdateTimeStamp=null,this.definitionExpression=null,this.path=null,this.labelsVisible=!0,this.labelingInfo=null,this.legendEnabled=!0,this.cachedDrawingInfo={color:!1},this.editingEnabled=!0,this.popupEnabled=!0,this.popupTemplate=null,this.objectIdField=null,this.globalIdField=null,this._fieldUsageInfo={},this.screenSizePerspectiveEnabled=!0}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e){const t=this.getField(e);return t&&t.domain?t.domain:null}get fieldsIndex(){return new C(this.fields)}readNodePages(e,t,s){return"Point"===t.layerType&&(e=t.pointNodePages),null==e||"object"!=typeof e?null:N.fromJSON(e,s)}set elevationInfo(e){this._set("elevationInfo",e),this.loaded&&this._validateElevationInfo()}get geometryType(){return ee[this.profile]||"mesh"}set renderer(e){h(e,this.fields),this._set("renderer",e)}readCachedDrawingInfo(e){return null!=e&&"object"==typeof e||(e={}),null==e.color&&(e.color=!1),e}get capabilities(){const e=s(this.associatedLayer)&&this.associatedLayer.capabilities?this.associatedLayer.capabilities:q,{query:t,editing:{supportsGlobalId:r,supportsRollbackOnFailure:o,supportsUploadWithItemId:i},data:{supportsZ:n,supportsM:a,isVersioned:p},operations:{supportsEditing:l,supportsUpdate:m}}=e,u=e.operations.supportsChangeTracking;return{query:t,editing:{supportsGlobalId:r,supportsRollbackOnFailure:o,supportsGeometryUpdate:!1,supportsUploadWithItemId:i},data:{supportsZ:n,supportsM:a,isVersioned:p},operations:{supportsEditing:l&&u,supportsAdd:!1,supportsDelete:!1,supportsUpdate:m&&u}}}get defaultPopupTemplate(){return s(this.associatedLayer)||this.attributeStorageInfo?this.createPopupTemplate():null}readObjectIdField(e,t){return!e&&t.fields&&t.fields.some((t=>("esriFieldTypeOID"===t.type&&(e=t.name),!!e))),e||void 0}readGlobalIdField(e,t){return!e&&t.fields&&t.fields.some((t=>("esriFieldTypeGlobalID"===t.type&&(e=t.name),!!e))),e||void 0}get displayField(){return s(this.associatedLayer)?this.associatedLayer.displayField:null}readProfile(e,t){const s=t.store.profile;return null!=s&&Y[s]?Y[s]:(H.error("Unknown or missing profile",{profile:s,layer:this}),"mesh-pyramids")}load(e){const t=s(e)?e.signal:null,r=this.loadFromPortal({supportedTypes:["Scene Service"]},e).then((()=>this._fetchService(t)),(()=>this._fetchService(t))).then((()=>n([this._verifyRootNodeAndUpdateExtent(this.nodePages,t),this._setAssociatedFeatureLayer(t)]))).then((()=>this._validateElevationInfo())).then((()=>this._applyAssociatedLayerOverrides())).then((()=>this._populateFieldUsageInfo())).then((()=>A(this,{origin:"service"},t))).then((()=>h(this.renderer,this.fields)));return this.addResolvingPromise(r),a(this)}createQuery(){const e=new V;return"mesh"!==this.geometryType&&(e.returnGeometry=!0,e.returnZ=!0),e.where=this.definitionExpression||"1=1",e.sqlFormat="standard",e}queryExtent(e,t){return this._getAssociatedLayerForQuery().then((s=>s.queryExtent(e||this.createQuery(),t)))}queryFeatureCount(e,t){return this._getAssociatedLayerForQuery().then((s=>s.queryFeatureCount(e||this.createQuery(),t)))}queryFeatures(e,t){return this._getAssociatedLayerForQuery().then((s=>s.queryFeatures(e||this.createQuery(),t))).then((e=>{if(e&&e.features)for(const t of e.features)t.layer=this,t.sourceLayer=this;return e}))}queryObjectIds(e,t){return this._getAssociatedLayerForQuery().then((s=>s.queryObjectIds(e||this.createQuery(),t)))}getFieldUsageInfo(e){const t={supportsLabelingInfo:!1,supportsRenderer:!1,supportsPopupTemplate:!1,supportsLayerQuery:!1};return this.loaded?this._fieldUsageInfo[e]||t:(H.error("#getFieldUsageInfo()","Unavailable until layer is loaded"),t)}createPopupTemplate(e){return M(this,e)}_getAssociatedLayerForQuery(){const e=this.associatedLayer;return s(e)&&e.loaded?a(e):this._loadAssociatedLayerForQuery()}async _loadAssociatedLayerForQuery(){if(await this.load(),r(this.associatedLayer))throw new l("scenelayer:query-not-available","SceneLayer queries are not available without an associated feature layer",{layer:this});try{await this.associatedLayer.load()}catch(e){throw new l("scenelayer:query-not-available","SceneLayer associated feature layer could not be loaded",{layer:this,error:e})}return this.associatedLayer}hasCachedStatistics(e){return null!=this.statisticsInfo&&this.statisticsInfo.some((t=>t.name===e))}async queryCachedStatistics(e,t){if(await this.load(t),!this.statisticsInfo)throw new l("scenelayer:no-cached-statistics","Cached statistics are not available for this layer");const s=this.fieldsIndex.get(e);if(!s)throw new l("scenelayer:field-unexisting",`Field '${e}' does not exist on the layer`);for(const e of this.statisticsInfo)if(e.name===s.name){const s=d(this.parsedUrl.path,e.href);return y(s,{query:{f:"json"},responseType:"json",signal:t?t.signal:null}).then((e=>e.data))}throw new l("scenelayer:no-cached-statistics","Cached statistics for this attribute are not available")}async saveAs(e,t){return this._debouncedSaveOperations(1,{...t,getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"scene"},e)}async save(){const e={getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"scene"};return this._debouncedSaveOperations(0,e)}async applyEdits(e,t){const s=await import("../chunks/editingSupport.js");if(await this.load(),r(this.associatedLayer))throw new l(`${this.type}-layer:not-editable`,"Service is not editable");return await this.associatedLayer.load(),s.applyEdits(this,this.associatedLayer.source,e,t)}on(e,t){return super.on(e,t)}validateLayer(e){if(e.layerType&&-1===$.indexOf(e.layerType))throw new l("scenelayer:layer-type-not-supported","SceneLayer does not support this layer type",{layerType:e.layerType});if(isNaN(this.version.major)||isNaN(this.version.minor))throw new l("layer:service-version-not-supported","Service version is not supported.",{serviceVersion:this.version.versionString,supportedVersions:"1.x"});if(this.version.major>1)throw new l("layer:service-version-too-new","Service version is too new.",{serviceVersion:this.version.versionString,supportedVersions:"1.x"});!function(e,t){let s=!1,r=!1;if(null==e)s=!0,r=!0;else{const o=t&&t.isGeographic;switch(e){case"east-north-up":case"earth-centered":s=!0,r=o;break;case"vertex-reference-frame":s=!0,r=!o;break;default:s=!1}}if(!s)throw new l("scenelayer:unsupported-normal-reference-frame","Normal reference frame is invalid.");if(!r)throw new l("scenelayer:incompatible-normal-reference-frame","Normal reference frame is incompatible with layer spatial reference.")}(this.normalReferenceFrame,this.spatialReference)}_getTypeKeywords(){const e=[];if("points"===this.profile)e.push("Point");else{if("mesh-pyramids"!==this.profile)throw new l("scenelayer:unknown-profile","SceneLayer:save() encountered an unknown SceneLayer profile: "+this.profile);e.push("3DObject")}return e}_populateFieldUsageInfo(){if(this._fieldUsageInfo={},this.fields)for(const e of this.fields){const t=!(!this.attributeStorageInfo||!this.attributeStorageInfo.some((t=>t.name===e.name))),r=!!(s(this.associatedLayer)&&this.associatedLayer.fields&&this.associatedLayer.fields.some((t=>t&&e.name===t.name))),o={supportsLabelingInfo:t,supportsRenderer:t,supportsPopupTemplate:t||r,supportsLayerQuery:r};this._fieldUsageInfo[e.name]=o}}_applyAssociatedLayerOverrides(){this._applyAssociatedLayerFieldsOverrides(),this._applyAssociatedLayerPopupOverrides()}_applyAssociatedLayerFieldsOverrides(){if(r(this.associatedLayer)||!this.associatedLayer.fields)return;let e=null;for(const t of this.associatedLayer.fields){const s=this.getField(t.name);s?(!s.domain&&t.domain&&(s.domain=t.domain.clone()),s.editable=t.editable,s.nullable=t.nullable):(e||(e=this.fields?this.fields.slice():[]),e.push(t.clone()))}e&&this._set("fields",e)}_applyAssociatedLayerPopupOverrides(){if(r(this.associatedLayer))return;const e=["popupTemplate","popupEnabled"],t=o(this);for(let s=0;s<e.length;s++){const r=e[s];this._buddyIsMoreImportant(r)&&(t.setDefaultOrigin(this.associatedLayer.originOf(r)),t.set(r,this.associatedLayer[r]),t.setDefaultOrigin("user"))}}async _setAssociatedFeatureLayer(e){if(-1===["mesh-pyramids","points"].indexOf(this.profile))return;const t=new J(this.parsedUrl,this.portalItem,e);try{this.associatedLayer=await t.fetch()}catch(e){p(e)||this._logWarningOnPopupEnabled()}}_logWarningOnPopupEnabled(){I(this,["popupTemplate","popupEnabled"],(()=>this.popupEnabled&&null!=this.popupTemplate)).then((()=>()=>{const e=`this SceneLayer: ${this.title}`;null==this.attributeStorageInfo?H.warn(`Associated FeatureLayer could not be loaded and no binary attributes found. Popups will not work on ${e}`):H.info(`Associated FeatureLayer could not be loaded. Falling back to binary attributes for Popups on ${e}`)}))}_buddyIsMoreImportant(e){if(r(this.associatedLayer))return!1;const t=this.originIdOf(e),s=this.associatedLayer.originIdOf(e);return null!=s&&s<=2?null==t||t<2:null!=s&&s<=3&&(null==t||t<3)}_validateElevationInfo(){const e=this.elevationInfo;e&&("mesh-pyramids"===this.profile&&"absolute-height"!==e.mode&&H.warn(".elevationInfo=","Mesh scene layers only support absolute-height elevation mode"),e.featureExpressionInfo&&"0"!==e.featureExpressionInfo.expression&&H.warn(".elevationInfo=","Scene layers do not support featureExpressionInfo"))}};e([i({types:{key:"type",base:E,typeMap:{selection:T}},json:{origins:{"web-scene":{name:"layerDefinition.featureReduction",write:!0},"portal-item":{name:"layerDefinition.featureReduction",write:!0}}}})],X.prototype,"featureReduction",void 0),e([i({type:[K],json:{read:!1,origins:{"web-scene":{name:"layerDefinition.rangeInfos",write:!0},"portal-item":{name:"layerDefinition.rangeInfos",write:!0}}}})],X.prototype,"rangeInfos",void 0),e([i({json:{read:!1}})],X.prototype,"associatedLayer",void 0),e([i({type:["show","hide"]})],X.prototype,"listMode",void 0),e([i({type:["ArcGISSceneServiceLayer"]})],X.prototype,"operationalLayerType",void 0),e([i({json:{read:!1},readOnly:!0})],X.prototype,"type",void 0),e([i({...Z.fields,readOnly:!0,json:{read:!1,origins:{service:{read:!0}}}})],X.prototype,"fields",void 0),e([i({readOnly:!0,dependsOn:["fields"]})],X.prototype,"fieldsIndex",null),e([i(Z.outFields)],X.prototype,"outFields",void 0),e([i({type:N,readOnly:!0,json:{read:!1}})],X.prototype,"nodePages",void 0),e([c("service","nodePages",["nodePages","pointNodePages"])],X.prototype,"readNodePages",null),e([i({type:[Q],readOnly:!0})],X.prototype,"materialDefinitions",void 0),e([i({type:[G],readOnly:!0})],X.prototype,"textureSetDefinitions",void 0),e([i({type:[z],readOnly:!0})],X.prototype,"geometryDefinitions",void 0),e([i({readOnly:!0})],X.prototype,"serviceUpdateTimeStamp",void 0),e([i({readOnly:!0})],X.prototype,"attributeStorageInfo",void 0),e([i({readOnly:!0})],X.prototype,"statisticsInfo",void 0),e([i({type:String,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.definitionExpression",write:!0}})],X.prototype,"definitionExpression",void 0),e([i({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],X.prototype,"path",void 0),e([i(k)],X.prototype,"elevationInfo",null),e([i({type:String,dependsOn:["profile"]})],X.prototype,"geometryType",null),e([i(S)],X.prototype,"labelsVisible",void 0),e([i({type:[R],json:{origins:{service:{name:"drawingInfo.labelingInfo",read:{reader:_},write:!1}},name:"layerDefinition.drawingInfo.labelingInfo",read:{reader:_},write:!0}})],X.prototype,"labelingInfo",void 0),e([i(L)],X.prototype,"legendEnabled",void 0),e([i(w)],X.prototype,"opacity",void 0),e([i({types:b,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:!0},value:null})],X.prototype,"renderer",null),e([i({json:{read:!1}})],X.prototype,"cachedDrawingInfo",void 0),e([c("service","cachedDrawingInfo")],X.prototype,"readCachedDrawingInfo",null),e([i({readOnly:!0,json:{read:!1},dependsOn:["associatedLayer.capabilities"]})],X.prototype,"capabilities",null),e([i({type:Boolean,json:{read:!1}})],X.prototype,"editingEnabled",void 0),e([i(F)],X.prototype,"popupEnabled",void 0),e([i({type:j,json:{name:"popupInfo",write:!0}})],X.prototype,"popupTemplate",void 0),e([i({readOnly:!0,json:{read:!1},dependsOn:["fields","title","attributeStorageInfo","associatedLayer"]})],X.prototype,"defaultPopupTemplate",null),e([i({type:String,json:{read:!1}})],X.prototype,"objectIdField",void 0),e([c("service","objectIdField",["objectIdField","fields"])],X.prototype,"readObjectIdField",null),e([i({type:String,json:{read:!1}})],X.prototype,"globalIdField",void 0),e([c("service","globalIdField",["globalIdField","fields"])],X.prototype,"readGlobalIdField",null),e([i({readOnly:!0,type:String,json:{read:!1},dependsOn:["associatedLayer.displayField"]})],X.prototype,"displayField",null),e([i({type:String,json:{read:!1}})],X.prototype,"profile",void 0),e([c("service","profile",["store.profile"])],X.prototype,"readProfile",null),e([i({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],X.prototype,"normalReferenceFrame",void 0),e([i(O)],X.prototype,"screenSizePerspectiveEnabled",void 0),X=e([m("esri.layers.SceneLayer")],X);const Y={"mesh-pyramids":"mesh-pyramids",meshpyramids:"mesh-pyramids","features-meshes":"mesh-pyramids",points:"points","features-points":"points",lines:"lines","features-lines":"lines",polygons:"polygons","features-polygons":"polygons"},ee={"mesh-pyramids":"mesh",points:"point",lines:"polyline",polygons:"polygon"};var te=X;export default te;