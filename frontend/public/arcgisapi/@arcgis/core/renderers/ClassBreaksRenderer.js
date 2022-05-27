/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as s}from"../chunks/tslib.es6.js";import"../chunks/ArrayPool.js";import"../chunks/object.js";import"../chunks/deprecate.js";import{clone as o}from"../core/lang.js";import"../config.js";import{L as t,b as e,c as r,u as i}from"../chunks/Logger.js";import"../chunks/string.js";import"../chunks/metadata.js";import{property as l}from"../core/accessorSupport/decorators/property.js";import"../core/Accessor.js";import"../chunks/PropertyOrigin.js";import"../core/scheduling.js";import{all as a}from"../core/promiseUtils.js";import"../chunks/Message.js";import"../core/Error.js";import"../chunks/compilerUtils.js";import{e as n,n as p,l as m}from"../chunks/ensureType.js";import{subclass as u}from"../core/accessorSupport/decorators/subclass.js";import"../chunks/Evented.js";import"../core/Collection.js";import"../chunks/collectionUtils.js";import"../chunks/JSONSupport.js";import"../chunks/Promise.js";import"../chunks/Loadable.js";import"../core/urlUtils.js";import"../core/accessorSupport/decorators/aliasOf.js";import{cast as c}from"../core/accessorSupport/decorators/cast.js";import{J as h}from"../chunks/jsonMap.js";import{e as y}from"../chunks/enumeration.js";import{r as j}from"../chunks/reader.js";import{w as d}from"../chunks/writer.js";import"../chunks/resourceExtension.js";import"../chunks/persistableUrlUtils.js";import"../geometry/SpatialReference.js";import"../chunks/locale.js";import"../chunks/number.js";import"../intl.js";import"../kernel.js";import"../request.js";import"../chunks/assets.js";import"../geometry/Geometry.js";import"../geometry/Point.js";import"../chunks/Ellipsoid.js";import"../geometry/support/webMercatorUtils.js";import"../geometry/Extent.js";import"../portal/PortalQueryParams.js";import"../portal/PortalQueryResult.js";import"../portal/PortalFolder.js";import"../portal/PortalGroup.js";import"../portal/PortalUser.js";import"../portal/Portal.js";import"../chunks/mathUtils2.js";import"../chunks/colorUtils.js";import"../Color.js";import"../chunks/zmUtils.js";import"../geometry/Multipoint.js";import"../geometry/Polygon.js";import"../chunks/extentUtils.js";import"../geometry/Polyline.js";import"../chunks/typeUtils.js";import"../geometry/support/jsonUtils.js";import"../geometry.js";import"../layers/support/CodedValueDomain.js";import"../layers/support/Domain.js";import"../layers/support/InheritedDomain.js";import"../layers/support/RangeDomain.js";import"../chunks/domains.js";import{l as b}from"../chunks/arcadeOnDemand.js";import{collectArcadeFieldNames as f,collectField as k}from"../layers/support/fieldUtils.js";import"../popup/content/Content.js";import"../popup/content/AttachmentsContent.js";import"../popup/content/CustomContent.js";import"../chunks/date.js";import"../popup/support/FieldInfoFormat.js";import"../popup/FieldInfo.js";import"../popup/content/FieldsContent.js";import"../chunks/MediaInfo.js";import"../popup/content/support/ChartMediaInfoValueSeries.js";import"../popup/content/support/ChartMediaInfoValue.js";import"../chunks/chartMediaInfoUtils.js";import"../popup/content/BarChartMediaInfo.js";import"../popup/content/ColumnChartMediaInfo.js";import"../popup/content/support/ImageMediaInfoValue.js";import"../popup/content/ImageMediaInfo.js";import"../popup/content/LineChartMediaInfo.js";import"../popup/content/PieChartMediaInfo.js";import"../popup/content/MediaContent.js";import"../popup/content/TextContent.js";import"../popup/content.js";import"../popup/ExpressionInfo.js";import"../popup/LayerOptions.js";import"../popup/support/RelatedRecordsInfoFieldOrder.js";import"../popup/RelatedRecordsInfo.js";import"../chunks/Identifiable.js";import"../support/actions/ActionBase.js";import"../support/actions/ActionButton.js";import"../support/actions/ActionToggle.js";import"../PopupTemplate.js";import"../symbols/Symbol.js";import"../symbols/CIMSymbol.js";import"../symbols/Symbol3DLayer.js";import"../chunks/screenUtils.js";import"../chunks/opacityUtils.js";import"../chunks/materialUtils.js";import"../symbols/edges/Edges3D.js";import"../symbols/edges/SketchEdges3D.js";import"../symbols/edges/SolidEdges3D.js";import"../chunks/utils.js";import"../chunks/Symbol3DMaterial.js";import"../symbols/ExtrudeSymbol3DLayer.js";import"../symbols/LineSymbol.js";import"../symbols/LineSymbolMarker.js";import"../symbols/SimpleLineSymbol.js";import"../symbols/FillSymbol.js";import"../symbols/patterns/StylePattern3D.js";import"../symbols/FillSymbol3DLayer.js";import"../chunks/colors.js";import"../chunks/Symbol3DOutline.js";import"../symbols/Font.js";import"../symbols/IconSymbol3DLayer.js";import"../symbols/LineSymbol3DLayer.js";import"../symbols/ObjectSymbol3DLayer.js";import"../symbols/PathSymbol3DLayer.js";import"../symbols/TextSymbol3DLayer.js";import"../symbols/WaterSymbol3DLayer.js";import"../symbols/Symbol3D.js";import"../chunks/Thumbnail.js";import"../symbols/callouts/Callout3D.js";import"../symbols/callouts/LineCallout3D.js";import"../chunks/Symbol3DVerticalOffset.js";import"../symbols/LabelSymbol3D.js";import"../symbols/LineSymbol3D.js";import"../symbols/MarkerSymbol.js";import"../symbols/MeshSymbol3D.js";import"../chunks/urlUtils.js";import"../symbols/PictureFillSymbol.js";import"../symbols/PictureMarkerSymbol.js";import"../symbols/PointSymbol3D.js";import"../symbols/PolygonSymbol3D.js";import"../symbols/SimpleFillSymbol.js";import"../symbols/SimpleMarkerSymbol.js";import"../symbols/TextSymbol.js";import"../symbols/WebStyleSymbol.js";import{e as g}from"../symbols/support/jsonUtils.js";import"../chunks/uid.js";import"../Graphic.js";import{L as S}from"../chunks/LegendOptions.js";import"./support/AuthoringInfo.js";import"./support/AuthoringInfoVisualVariable.js";import"../tasks/support/ColorRamp.js";import"../tasks/support/AlgorithmicColorRamp.js";import"../tasks/support/MultipartColorRamp.js";import"../chunks/colorRamps.js";import I from"./Renderer.js";import"./visualVariables/VisualVariable.js";import"./visualVariables/support/ColorStop.js";import"./visualVariables/ColorVariable.js";import"./visualVariables/support/OpacityStop.js";import"./visualVariables/OpacityVariable.js";import"./visualVariables/RotationVariable.js";import"./visualVariables/support/SizeStop.js";import"./visualVariables/SizeVariable.js";import"../chunks/sizeVariableUtils.js";import"../chunks/unitUtils.js";import"../chunks/lengthUtils.js";import"../chunks/visualVariableUtils.js";import{V as v}from"../chunks/VisualVariablesMixin.js";import x from"./support/ClassBreakInfo.js";import{r as B,a as V}from"../chunks/commonProperties.js";var F;const C=t.getLogger("esri.renderers.ClassBreaksRenderer"),M=new h({esriNormalizeByLog:"log",esriNormalizeByPercentOfTotal:"percent-of-total",esriNormalizeByField:"field"}),z=n(x);let E=F=class extends(v(I)){constructor(s){super(s),this.backgroundFillSymbol=null,this.classBreakInfos=null,this.defaultLabel=null,this.defaultSymbol=null,this.field=null,this.isMaxInclusive=!0,this.legendOptions=null,this.normalizationField=null,this.normalizationTotal=null,this.type="class-breaks",this.valueExpression=null,this.valueExpressionTitle=null,this._set("classBreakInfos",[])}get _cache(){return{compiledFunc:null}}readClassBreakInfos(s,o,t){if(!Array.isArray(s))return;let e=o.minValue;return s.map((s=>{const o=new x;return o.read(s,t),null==o.minValue&&(o.minValue=e),null==o.maxValue&&(o.maxValue=o.minValue),e=o.maxValue,o}))}writeClassBreakInfos(s,o,t,e){const r=s.map((s=>s.write({},e)));this._areClassBreaksConsecutive()&&r.forEach((s=>delete s.classMinValue)),o[t]=r}castField(s){return null==s?s:"function"==typeof s?(C.error(".field: field must be a string value"),null):p(s)}get minValue(){return this.classBreakInfos&&this.classBreakInfos[0]&&this.classBreakInfos[0].minValue||0}get normalizationType(){let s=this._get("normalizationType");const o=!!this.normalizationField,t=null!=this.normalizationTotal;return o||t?(s=(o?"field":t&&"percent-of-total")||null,o&&t&&C.warn("warning: both normalizationField and normalizationTotal are set!")):"field"!==s&&"percent-of-total"!==s||(s=null),s}set normalizationType(s){this._set("normalizationType",s)}addClassBreakInfo(s,t,e){let r=null;r="number"==typeof s?new x({minValue:s,maxValue:t,symbol:g(e)}):z(o(s)),this.classBreakInfos.push(r),1===this.classBreakInfos.length&&this.notifyChange("minValue")}removeClassBreakInfo(s,o){const t=this.classBreakInfos.length;for(let e=0;e<t;e++){const t=[this.classBreakInfos[e].minValue,this.classBreakInfos[e].maxValue];if(t[0]===s&&t[1]===o){this.classBreakInfos.splice(e,1);break}}}getBreakIndex(s,o){return this.valueExpression&&(e(o)||e(o.arcade))&&C.warn(""),this.valueExpression?this._getBreakIndexForExpression(s,o):this._getBreakIndexForField(s)}async getClassBreakInfo(s,o){let t=o;this.valueExpression&&(e(o)||e(o.arcade))&&(t={...t,arcade:await b()});const r=this.getBreakIndex(s,t);return-1!==r?this.classBreakInfos[r]:null}getSymbol(s,o){if(this.valueExpression&&(e(o)||e(o.arcade)))return void C.error("#getSymbol()","Please use getSymbolAsync if valueExpression is used");const t=this.getBreakIndex(s,o);return t>-1?this.classBreakInfos[t].symbol:this.defaultSymbol}async getSymbolAsync(s,o){let t=o;this.valueExpression&&(e(o)||e(o.arcade))&&(t={...t,arcade:await b()});const r=this.getBreakIndex(s,t);return r>-1?this.classBreakInfos[r].symbol:this.defaultSymbol}getSymbols(){const s=[];return this.classBreakInfos.forEach((o=>{o.symbol&&s.push(o.symbol)})),this.defaultSymbol&&s.push(this.defaultSymbol),s}getAttributeHash(){return this.visualVariables&&this.visualVariables.reduce(((s,o)=>s+o.getAttributeHash()),"")}getMeshHash(){const s=JSON.stringify(this.backgroundFillSymbol),o=JSON.stringify(this.defaultSymbol),t=`${this.normalizationField}.${this.normalizationType}.${this.normalizationTotal}`;return`${s}.${o}.${this.classBreakInfos.reduce(((s,o)=>s+o.getMeshHash()),"")}.${t}.${this.field}.${this.valueExpression}`}get arcadeRequired(){return this.arcadeRequiredForVisualVariables||!!this.valueExpression}clone(){return new F({field:this.field,backgroundFillSymbol:this.backgroundFillSymbol&&this.backgroundFillSymbol.clone(),defaultLabel:this.defaultLabel,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.clone(),valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,classBreakInfos:o(this.classBreakInfos),isMaxInclusive:this.isMaxInclusive,normalizationField:this.normalizationField,normalizationTotal:this.normalizationTotal,normalizationType:this.normalizationType,visualVariables:o(this.visualVariables),legendOptions:o(this.legendOptions),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})}async collectRequiredFields(s,o){const t=[this.collectVVRequiredFields(s,o),this.collectSymbolFields(s,o)];await a(t)}async collectSymbolFields(s,o){const t=[...this.getSymbols().map((t=>t.collectRequiredFields(s,o))),f(s,o,this.valueExpression)];k(s,o,this.field),k(s,o,this.normalizationField),await a(t)}_getBreakIndexForExpression(s,o){const{viewingMode:t,scale:e,spatialReference:l,arcade:a}=r(o,{});let n=this._cache.compiledFunc;const p=i(a).arcadeUtils;if(!n){const s=p.createSyntaxTree(this.valueExpression);n=p.createFunction(s),this._cache.compiledFunc=n}const m=p.executeFunction(n,p.createExecContext(s,p.getViewInfo({viewingMode:t,scale:e,spatialReference:l})));return this._getBreakIndexfromInfos(m)}_getBreakIndexForField(s){const o=this.field,t=s.attributes,e=this.normalizationType;let r=parseFloat(t[o]);if(e){const s=this.normalizationTotal,o=parseFloat(t[this.normalizationField]);if("log"===e)r=Math.log(r)*Math.LOG10E;else if("percent-of-total"!==e||isNaN(s)){if("field"===e&&!isNaN(o)){if(isNaN(r)||isNaN(o))return-1;r/=o}}else r=r/s*100}return this._getBreakIndexfromInfos(r)}_getBreakIndexfromInfos(s){const o=this.isMaxInclusive;if(null!=s&&"number"==typeof s&&!isNaN(s))for(let t=0;t<this.classBreakInfos.length;t++){const e=[this.classBreakInfos[t].minValue,this.classBreakInfos[t].maxValue];if(e[0]<=s&&(o?s<=e[1]:s<e[1]))return t}return-1}_areClassBreaksConsecutive(){const s=this.classBreakInfos,o=s.length;for(let t=1;t<o;t++)if(s[t-1].maxValue!==s[t].minValue)return!1;return!0}};s([l({readOnly:!0,dependsOn:["valueExpression"]})],E.prototype,"_cache",null),s([l(B)],E.prototype,"backgroundFillSymbol",void 0),s([l({type:[x]})],E.prototype,"classBreakInfos",void 0),s([j("classBreakInfos")],E.prototype,"readClassBreakInfos",null),s([d("classBreakInfos")],E.prototype,"writeClassBreakInfos",null),s([l({type:String,json:{write:!0}})],E.prototype,"defaultLabel",void 0),s([l(V)],E.prototype,"defaultSymbol",void 0),s([l({type:String,json:{write:!0}})],E.prototype,"field",void 0),s([c("field")],E.prototype,"castField",null),s([l({type:Boolean})],E.prototype,"isMaxInclusive",void 0),s([l({type:S,json:{write:!0}})],E.prototype,"legendOptions",void 0),s([l({type:Number,readOnly:!0,value:null,dependsOn:["classBreakInfos"],json:{read:!1,write:{overridePolicy(){return 0!==this.classBreakInfos.length&&this._areClassBreaksConsecutive()?{enabled:!0}:{enabled:!1}}}}})],E.prototype,"minValue",null),s([l({type:String,json:{write:!0}})],E.prototype,"normalizationField",void 0),s([l({type:Number,cast:s=>m(s),json:{write:!0}})],E.prototype,"normalizationTotal",void 0),s([l({type:M.apiValues,value:null,dependsOn:["normalizationField","normalizationTotal"],json:{type:M.jsonValues,read:M.read,write:M.write}})],E.prototype,"normalizationType",null),s([y({classBreaks:"class-breaks"})],E.prototype,"type",void 0),s([l({type:String,json:{write:!0}})],E.prototype,"valueExpression",void 0),s([l({type:String,json:{write:!0}})],E.prototype,"valueExpressionTitle",void 0),E=F=s([u("esri.renderers.ClassBreaksRenderer")],E);var T=E;export default T;