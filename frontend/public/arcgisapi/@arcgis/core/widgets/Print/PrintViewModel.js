/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import"../../chunks/ArrayPool.js";import"../../chunks/object.js";import"../../chunks/deprecate.js";import"../../core/lang.js";import"../../config.js";import"../../chunks/Logger.js";import"../../chunks/string.js";import"../../chunks/metadata.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/Accessor.js";import"../../chunks/PropertyOrigin.js";import"../../core/scheduling.js";import{reject as o}from"../../core/promiseUtils.js";import"../../chunks/Message.js";import e from"../../core/Error.js";import"../../chunks/compilerUtils.js";import"../../chunks/ensureType.js";import{subclass as r}from"../../core/accessorSupport/decorators/subclass.js";import"../../chunks/Evented.js";import i from"../../core/Collection.js";import"../../chunks/collectionUtils.js";import"../../chunks/JSONSupport.js";import"../../chunks/Promise.js";import{L as p}from"../../chunks/Loadable.js";import"../../core/urlUtils.js";import"../../core/accessorSupport/decorators/aliasOf.js";import"../../core/accessorSupport/decorators/cast.js";import"../../chunks/jsonMap.js";import"../../chunks/enumeration.js";import"../../chunks/reader.js";import"../../chunks/writer.js";import"../../chunks/resourceExtension.js";import"../../chunks/persistableUrlUtils.js";import"../../geometry/SpatialReference.js";import"../../chunks/locale.js";import{a as l,c as n}from"../../chunks/number.js";import"../../intl.js";import"../../kernel.js";import m from"../../request.js";import"../../chunks/assets.js";import"../../geometry/Geometry.js";import"../../geometry/Point.js";import"../../chunks/Ellipsoid.js";import"../../geometry/support/webMercatorUtils.js";import a from"../../geometry/Extent.js";import"../../portal/PortalQueryParams.js";import"../../portal/PortalQueryResult.js";import"../../portal/PortalFolder.js";import"../../portal/PortalGroup.js";import"../../portal/PortalUser.js";import u from"../../portal/Portal.js";import"../../chunks/mathUtils2.js";import"../../chunks/vec3f64.js";import"../../chunks/common.js";import"../../chunks/vec3.js";import"../../chunks/mathUtils.js";import"../../Camera.js";import"../../chunks/colorUtils.js";import"../../Color.js";import"../../chunks/zmUtils.js";import"../../geometry/Multipoint.js";import"../../geometry/Polygon.js";import"../../chunks/extentUtils.js";import"../../geometry/Polyline.js";import"../../chunks/typeUtils.js";import"../../geometry/support/jsonUtils.js";import"../../geometry.js";import"../../layers/support/CodedValueDomain.js";import"../../layers/support/Domain.js";import"../../layers/support/InheritedDomain.js";import"../../layers/support/RangeDomain.js";import"../../chunks/domains.js";import"../../chunks/arcadeOnDemand.js";import"../../layers/support/fieldUtils.js";import"../../popup/content/Content.js";import"../../popup/content/AttachmentsContent.js";import"../../popup/content/CustomContent.js";import"../../chunks/date.js";import"../../popup/support/FieldInfoFormat.js";import"../../popup/FieldInfo.js";import"../../popup/content/FieldsContent.js";import"../../chunks/MediaInfo.js";import"../../popup/content/support/ChartMediaInfoValueSeries.js";import"../../popup/content/support/ChartMediaInfoValue.js";import"../../chunks/chartMediaInfoUtils.js";import"../../popup/content/BarChartMediaInfo.js";import"../../popup/content/ColumnChartMediaInfo.js";import"../../popup/content/support/ImageMediaInfoValue.js";import"../../popup/content/ImageMediaInfo.js";import"../../popup/content/LineChartMediaInfo.js";import"../../popup/content/PieChartMediaInfo.js";import"../../popup/content/MediaContent.js";import"../../popup/content/TextContent.js";import"../../popup/content.js";import"../../popup/ExpressionInfo.js";import"../../popup/LayerOptions.js";import"../../popup/support/RelatedRecordsInfoFieldOrder.js";import"../../popup/RelatedRecordsInfo.js";import"../../chunks/Identifiable.js";import"../../support/actions/ActionBase.js";import"../../support/actions/ActionButton.js";import"../../support/actions/ActionToggle.js";import"../../PopupTemplate.js";import"../../symbols/Symbol.js";import"../../symbols/CIMSymbol.js";import"../../symbols/Symbol3DLayer.js";import"../../chunks/screenUtils.js";import"../../chunks/opacityUtils.js";import"../../chunks/materialUtils.js";import"../../symbols/edges/Edges3D.js";import"../../symbols/edges/SketchEdges3D.js";import"../../symbols/edges/SolidEdges3D.js";import"../../chunks/utils.js";import"../../chunks/Symbol3DMaterial.js";import"../../symbols/ExtrudeSymbol3DLayer.js";import"../../symbols/LineSymbol.js";import"../../symbols/LineSymbolMarker.js";import"../../symbols/SimpleLineSymbol.js";import"../../symbols/FillSymbol.js";import"../../symbols/patterns/StylePattern3D.js";import"../../symbols/FillSymbol3DLayer.js";import"../../chunks/colors.js";import"../../chunks/Symbol3DOutline.js";import"../../symbols/Font.js";import"../../symbols/IconSymbol3DLayer.js";import"../../symbols/LineSymbol3DLayer.js";import"../../symbols/ObjectSymbol3DLayer.js";import"../../symbols/PathSymbol3DLayer.js";import"../../symbols/TextSymbol3DLayer.js";import"../../symbols/WaterSymbol3DLayer.js";import"../../symbols/Symbol3D.js";import"../../chunks/Thumbnail.js";import"../../symbols/callouts/Callout3D.js";import"../../symbols/callouts/LineCallout3D.js";import"../../chunks/Symbol3DVerticalOffset.js";import"../../symbols/LabelSymbol3D.js";import"../../symbols/LineSymbol3D.js";import"../../symbols/MarkerSymbol.js";import"../../symbols/MeshSymbol3D.js";import"../../chunks/urlUtils.js";import"../../symbols/PictureFillSymbol.js";import"../../symbols/PictureMarkerSymbol.js";import"../../symbols/PointSymbol3D.js";import"../../symbols/PolygonSymbol3D.js";import"../../symbols/SimpleFillSymbol.js";import"../../symbols/SimpleMarkerSymbol.js";import"../../symbols/TextSymbol.js";import"../../symbols/WebStyleSymbol.js";import"../../symbols/support/jsonUtils.js";import"../../chunks/uid.js";import"../../Graphic.js";import c from"../../core/Handles.js";import"../../chunks/sizeVariableUtils.js";import"../../chunks/unitUtils.js";import"../../chunks/lengthUtils.js";import"../../chunks/visualVariableUtils.js";import"../../geometry/support/normalizeUtils.js";import"../../chunks/timeUtils.js";import"../../TimeExtent.js";import j from"../../Viewpoint.js";import"../../chunks/fieldType.js";import"../../chunks/vec2.js";import"../../layers/support/Field.js";import"../../tasks/support/FeatureSet.js";import"../../chunks/DataLayerSource.js";import"../../tasks/support/Query.js";import"../../tasks/support/StatisticDefinition.js";import"../../tasks/Task.js";import"../../layers/support/MapImage.js";import"../../chunks/mat2d.js";import"../../tasks/support/GPMessage.js";import"../../tasks/support/DataFile.js";import"../../tasks/support/JobInfo.js";import"../../tasks/support/LinearUnit.js";import"../../tasks/support/ParameterValue.js";import"../../tasks/support/RasterData.js";import"../../tasks/Geoprocessor.js";import{f as h,b as y}from"../../chunks/layoutTemplate.js";import d from"../../tasks/PrintTask.js";import"../../tasks/support/PrintTemplate.js";import f from"../../tasks/support/PrintParameters.js";import"../../chunks/mat2df64.js";import"../../chunks/vec2f64.js";import{k}from"../../chunks/viewpointUtils.js";import b from"./CustomTemplate.js";const v=i.ofType(b);let S=class extends p{constructor(t){super(t),this._handles=new c,this._viewpoint=null,this.allowedFormats="all",this.allowedLayouts="all",this.defaultTemplates=new v,this.includeDefaultTemplates=!0,this.effectivePrintServiceUrl=null,this.error=null,this.portal=u.getDefault(),this.printServiceUrl=null,this.scaleEnabled=!1,this.templatesInfo=null,this.updateDelay=1e3,this.view=null,this.print=this.print.bind(this)}destroy(){this._handles.destroy(),this._handles=null,this.view=null}get printTask(){return new d(this.effectivePrintServiceUrl,{updateDelay:this.updateDelay})}get state(){return"loading"===this.loadStatus?"initializing":this.error||"failed"===this.loadStatus?"error":this.get("view.ready")&&"loaded"===this.loadStatus?"ready":"disabled"}async load(t){return this.addResolvingPromise(this._loadResources(t).catch((t=>this.error=t))),this}print(t){let s;if(!this.view)return o(new e("print:view-required","view is not set"));this.scaleEnabled?(this._viewpoint||(this._viewpoint=this.view.viewpoint.clone()),s=this._getExtent(this._viewpoint,t.outScale)):(this._viewpoint=null,s=this._getExtent(this.view.viewpoint)),function(t){if(t.layoutOptions||(t.layoutOptions={}),t.layoutOptions.customTextElements||(t.layoutOptions.customTextElements=[]),!t.layoutOptions.customTextElements.find((t=>"date"in t))){const{customTextElements:s}=t.layoutOptions;s.push({date:l(Date.now(),n("short-date"))})}}(t);const r=new f({view:this.view,template:t,extent:s});return this.printTask.execute(r).catch((t=>{const s="print-task:cim-symbol-unsupported"===t.name?t.message:"An error occurred while exporting the web map.";return o(new e("print:export-error",s,{error:t}))}))}async _loadResources(t){let s=[];const{printServiceUrl:o}=this;if(!o){var r;if(this.destroyed)return;const{portal:o}=this;try{await o.load(t)}catch(t){throw new e("print:could-not-load-portal","Cannot load print resource information from portal",{url:this.effectivePrintServiceUrl})}const p=null==(r=o.helperServices)?void 0:r.printTask;var i;if(p)this._set("effectivePrintServiceUrl",p.url),s=(null!=(i=null==p?void 0:p.templates)?i:[]).map((t=>b.fromJSON(t)))}s.length>0&&this.defaultTemplates.addMany(s),await this._loadServiceDescription(t)}async _loadServiceDescription(t){const s=await this._getPrintTemplatesFromService(t);this._set("templatesInfo",s)}_getPrintTemplatesFromService(t){if(-1===this.effectivePrintServiceUrl.toLowerCase().split("/").indexOf("gpserver"))throw new e("print:invalid-print-service-url","Can't fetch print templates information from provided URL",{url:this.effectivePrintServiceUrl});return m(this.effectivePrintServiceUrl,{...t,query:{f:"json"},timeout:6e4}).then((t=>{const s=t&&t.data,o=s&&s.parameters;let e=null,r=null;o.forEach((t=>{let s,o=t.choiceList&&t.choiceList.slice();o&&o.length&&t.defaultValue&&(s=o.indexOf(t.defaultValue)),s>-1&&(o.splice(s,1),o.unshift(t.defaultValue));const i=(t,s)=>{const o="all"===s?t:t.filter((t=>s.indexOf(t)>-1));return 0===o.length?t:o};if("Format"===t.name){const s=i(o.map(h),this.allowedFormats),r=h(t.defaultValue);e={defaultValue:s.includes(r)?r:s[0],choiceList:s}}else if("Layout_Template"===t.name){let s,e;o=o.filter((t=>"map_only"!==t.toLowerCase())),o.some(((t,o)=>{const e=t.toLowerCase();return e.indexOf("letter")>-1&&e.indexOf("landscape")>-1?(s=o,!0):e.indexOf("a4")>-1&&e.indexOf("landscape")>-1&&(s=o,!1)})),s&&(e=o[s],o.splice(s,1),o.unshift(e));const p=i(o.map(y),this.allowedLayouts),l=y(t.defaultValue);r={defaultValue:p.includes(l)?l:p[0],choiceList:p}}})),this.error=null;return{format:e,layout:r}})).catch((t=>{throw new e("print:unavailable-service-info","Can't fetch templates info from service",{error:t})}))}_getExtent(t,s){const o=s||this.view.scale,e=this.get("view.size"),r=t?t.targetGeometry:null;return k(new a,new j({scale:o,targetGeometry:r}),e)}};t([s()],S.prototype,"allowedFormats",void 0),t([s()],S.prototype,"allowedLayouts",void 0),t([s({type:v})],S.prototype,"defaultTemplates",void 0),t([s()],S.prototype,"includeDefaultTemplates",void 0),t([s({aliasOf:{source:"printServiceUrl",overridable:!0},readOnly:!0})],S.prototype,"effectivePrintServiceUrl",void 0),t([s()],S.prototype,"error",void 0),t([s({type:u})],S.prototype,"portal",void 0),t([s()],S.prototype,"printServiceUrl",void 0),t([s({dependsOn:["effectivePrintServiceUrl"],type:d})],S.prototype,"printTask",null),t([s({dependsOn:["view.ready","error","loadStatus"],readOnly:!0})],S.prototype,"state",null),t([s()],S.prototype,"scaleEnabled",void 0),t([s({readOnly:!0})],S.prototype,"templatesInfo",void 0),t([s()],S.prototype,"updateDelay",void 0),t([s()],S.prototype,"view",void 0),S=t([r("esri.widgets.Print.PrintViewModel")],S);var g=S;export default g;
