/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import"../../chunks/ArrayPool.js";import"../../chunks/object.js";import"../../chunks/deprecate.js";import"../../core/lang.js";import"../../config.js";import{L as t}from"../../chunks/Logger.js";import"../../chunks/string.js";import"../../chunks/metadata.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/Accessor.js";import"../../chunks/PropertyOrigin.js";import"../../core/scheduling.js";import"../../core/promiseUtils.js";import"../../chunks/Message.js";import i from"../../core/Error.js";import"../../chunks/compilerUtils.js";import"../../chunks/ensureType.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";import"../../chunks/Evented.js";import"../../core/Collection.js";import"../../chunks/collectionUtils.js";import"../../chunks/JSONSupport.js";import"../../chunks/Promise.js";import"../../chunks/Loadable.js";import"../../core/urlUtils.js";import"../../core/accessorSupport/decorators/aliasOf.js";import{cast as r}from"../../core/accessorSupport/decorators/cast.js";import{J as n}from"../../chunks/jsonMap.js";import"../../chunks/enumeration.js";import{r as p}from"../../chunks/reader.js";import{w as l}from"../../chunks/writer.js";import"../../chunks/resourceExtension.js";import"../../chunks/persistableUrlUtils.js";import"../../geometry/SpatialReference.js";import"../../chunks/locale.js";import"../../chunks/number.js";import"../../intl.js";import"../../kernel.js";import"../../request.js";import"../../chunks/assets.js";import"../../geometry/Geometry.js";import"../../geometry/Point.js";import"../../chunks/Ellipsoid.js";import"../../geometry/support/webMercatorUtils.js";import"../../geometry/Extent.js";import"../../portal/PortalQueryParams.js";import"../../portal/PortalQueryResult.js";import"../../portal/PortalFolder.js";import"../../portal/PortalGroup.js";import"../../portal/PortalUser.js";import"../../portal/Portal.js";import"../../chunks/mathUtils2.js";import"../../chunks/colorUtils.js";import"../../Color.js";import"../../chunks/zmUtils.js";import"../../geometry/Multipoint.js";import"../../geometry/Polygon.js";import"../../chunks/extentUtils.js";import"../../geometry/Polyline.js";import"../../chunks/typeUtils.js";import"../../geometry/support/jsonUtils.js";import"../../geometry.js";import"../../layers/support/CodedValueDomain.js";import"../../layers/support/Domain.js";import"../../layers/support/InheritedDomain.js";import"../../layers/support/RangeDomain.js";import"../../chunks/domains.js";import"../../chunks/arcadeOnDemand.js";import"../../layers/support/fieldUtils.js";import"../../popup/content/Content.js";import"../../popup/content/AttachmentsContent.js";import"../../popup/content/CustomContent.js";import"../../chunks/date.js";import"../../popup/support/FieldInfoFormat.js";import"../../popup/FieldInfo.js";import"../../popup/content/FieldsContent.js";import"../../chunks/MediaInfo.js";import"../../popup/content/support/ChartMediaInfoValueSeries.js";import"../../popup/content/support/ChartMediaInfoValue.js";import"../../chunks/chartMediaInfoUtils.js";import"../../popup/content/BarChartMediaInfo.js";import"../../popup/content/ColumnChartMediaInfo.js";import"../../popup/content/support/ImageMediaInfoValue.js";import"../../popup/content/ImageMediaInfo.js";import"../../popup/content/LineChartMediaInfo.js";import"../../popup/content/PieChartMediaInfo.js";import"../../popup/content/MediaContent.js";import"../../popup/content/TextContent.js";import"../../popup/content.js";import"../../popup/ExpressionInfo.js";import"../../popup/LayerOptions.js";import"../../popup/support/RelatedRecordsInfoFieldOrder.js";import"../../popup/RelatedRecordsInfo.js";import"../../chunks/Identifiable.js";import"../../support/actions/ActionBase.js";import"../../support/actions/ActionButton.js";import"../../support/actions/ActionToggle.js";import"../../PopupTemplate.js";import"../../symbols/Symbol.js";import"../../symbols/CIMSymbol.js";import"../../symbols/Symbol3DLayer.js";import{t as a}from"../../chunks/screenUtils.js";import"../../chunks/opacityUtils.js";import"../../chunks/materialUtils.js";import"../../symbols/edges/Edges3D.js";import"../../symbols/edges/SketchEdges3D.js";import"../../symbols/edges/SolidEdges3D.js";import"../../chunks/utils.js";import"../../chunks/Symbol3DMaterial.js";import"../../symbols/ExtrudeSymbol3DLayer.js";import"../../symbols/LineSymbol.js";import"../../symbols/LineSymbolMarker.js";import"../../symbols/SimpleLineSymbol.js";import"../../symbols/FillSymbol.js";import"../../symbols/patterns/StylePattern3D.js";import"../../symbols/FillSymbol3DLayer.js";import"../../chunks/colors.js";import"../../chunks/Symbol3DOutline.js";import"../../symbols/Font.js";import"../../symbols/IconSymbol3DLayer.js";import"../../symbols/LineSymbol3DLayer.js";import"../../symbols/ObjectSymbol3DLayer.js";import"../../symbols/PathSymbol3DLayer.js";import"../../symbols/TextSymbol3DLayer.js";import"../../symbols/WaterSymbol3DLayer.js";import"../../symbols/Symbol3D.js";import"../../chunks/Thumbnail.js";import"../../symbols/callouts/Callout3D.js";import"../../symbols/callouts/LineCallout3D.js";import"../../chunks/Symbol3DVerticalOffset.js";import"../../symbols/LabelSymbol3D.js";import"../../symbols/LineSymbol3D.js";import"../../symbols/MarkerSymbol.js";import"../../symbols/MeshSymbol3D.js";import"../../chunks/urlUtils.js";import"../../symbols/PictureFillSymbol.js";import"../../symbols/PictureMarkerSymbol.js";import"../../symbols/PointSymbol3D.js";import"../../symbols/PolygonSymbol3D.js";import"../../symbols/SimpleFillSymbol.js";import"../../symbols/SimpleMarkerSymbol.js";import"../../symbols/TextSymbol.js";import"../../symbols/WebStyleSymbol.js";import"../../symbols/support/jsonUtils.js";import"../../chunks/uid.js";import"../../Graphic.js";import"../../chunks/LegendOptions.js";import m,{V as u}from"./VisualVariable.js";import c from"./support/SizeStop.js";import{i as y,g as h,a as j}from"../../chunks/sizeVariableUtils.js";import"../../chunks/unitUtils.js";import"../../chunks/lengthUtils.js";import{viewScaleRE as d}from"../../chunks/visualVariableUtils.js";var S;let b=S=class extends u{constructor(){super(...arguments),this.customValues=null}clone(){return new S({title:this.title,showLegend:this.showLegend,customValues:this.customValues&&this.customValues.slice(0)})}};e([s({type:[Number],json:{write:!0}})],b.prototype,"customValues",void 0),b=S=e([o("esri.renderers.visualVariables.support.SizeVariableLegendOptions")],b);var x,g=b;const v=t.getLogger("esri.renderers.visualVariables.SizeVariable"),z=new n({width:"width",depth:"depth",height:"height",widthAndDepth:"width-and-depth",all:"all"}),f=new n({unknown:"unknown",inch:"inches",foot:"feet",yard:"yards",mile:"miles","nautical-mile":"nautical-miles",millimeter:"millimeters",centimeter:"centimeters",decimeter:"decimeters",meter:"meters",kilometer:"kilometers","decimal-degree":"decimal-degrees"});function k(e){if(null!=e)return"string"==typeof e||"number"==typeof e?a(e):"size"===e.type?y(e)?e:(delete(e={...e}).type,new w(e)):void 0}function V(e,t,s){if("object"!=typeof e)return e;const i=new w;return i.read(e,s),i}let w=x=class extends m{constructor(e){super(e),this.axis=null,this.legendOptions=null,this.normalizationField=null,this.scaleBy=null,this.target=null,this.type="size",this.useSymbolValue=null,this.valueExpression=null,this.valueRepresentation=null,this.valueUnit=null}get cache(){return{ipData:this._interpolateData(),hasExpression:!!this.valueExpression,compiledFunc:null,isScaleDriven:d.test(this.valueExpression)}}set expression(e){v.warn("'expression' is deprecated since version 4.2. Use 'valueExpression' instead. The only supported expression is 'view.scale'."),"view.scale"===e?(this.valueExpression="$view.scale",this._set("expression",e)):this._set("expression",null)}set index(e){y(this.maxSize)&&(this.maxSize.index=`visualVariables[${e}].maxSize`),y(this.minSize)&&(this.minSize.index=`visualVariables[${e}].minSize`),this._set("index",e)}get inputValueType(){return h(this)}set maxDataValue(e){e&&this.stops&&(v.warn("cannot set maxDataValue when stops is not null."),e=null),this._set("maxDataValue",e)}set maxSize(e){e&&this.stops&&(v.warn("cannot set maxSize when stops is not null."),e=null),this._set("maxSize",e)}castMaxSize(e){return k(e)}readMaxSize(e,t,s){return V(e,0,s)}set minDataValue(e){e&&this.stops&&(v.warn("cannot set minDataValue when stops is not null."),e=null),this._set("minDataValue",e)}set minSize(e){e&&this.stops&&(v.warn("cannot set minSize when stops is not null."),e=null),this._set("minSize",e)}castMinSize(e){return k(e)}readMinSize(e,t,s){return V(e,0,s)}get arcadeRequired(){return!!this.valueExpression||(this.minSize&&"object"==typeof this.minSize&&this.minSize.arcadeRequired||this.maxSize&&"object"==typeof this.maxSize&&this.maxSize.arcadeRequired)}set stops(e){null==this.minDataValue&&null==this.maxDataValue&&null==this.minSize&&null==this.maxSize?e&&Array.isArray(e)&&(e=e.filter((e=>!!e))).sort(((e,t)=>e.value-t.value)):e&&(v.warn("cannot set stops when one of minDataValue, maxDataValue, minSize or maxSize is not null."),e=null),this._set("stops",e)}get transformationType(){return j(this,this.inputValueType)}readValueExpression(e,t){return e||t.expression&&"$view.scale"}writeValueExpressionWebScene(e,t,s,o){if("$view.scale"===e){if(o&&o.messages){const e=this.index,t="string"==typeof e?e:`visualVariables[${e}]`;o.messages.push(new i("property:unsupported",this.type+"VisualVariable.valueExpression = '$view.scale' is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:t+".valueExpression",context:o}))}}else t[s]=e}readValueUnit(e){return e?f.read(e):null}clone(){return new x({axis:this.axis,field:this.field,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,maxDataValue:this.maxDataValue,maxSize:y(this.maxSize)?this.maxSize.clone():this.maxSize,minDataValue:this.minDataValue,minSize:y(this.minSize)?this.minSize.clone():this.minSize,normalizationField:this.normalizationField,stops:this.stops&&this.stops.map((e=>e.clone())),target:this.target,useSymbolValue:this.useSymbolValue,valueRepresentation:this.valueRepresentation,valueUnit:this.valueUnit,legendOptions:this.legendOptions&&this.legendOptions.clone()})}flipSizes(){if("clamped-linear"===this.transformationType){const{minSize:e,maxSize:t}=this;return this.minSize=t,this.maxSize=e,this}if("stops"===this.transformationType){const e=this.stops,t=e.map((e=>e.size)).reverse(),s=e.length;for(let i=0;i<s;i++)e[i].size=t[i];return this}return this}getAttributeHash(){return`${super.getAttributeHash()}-${this.target}-${this.normalizationField}`}_interpolateData(){return this.stops&&this.stops.map((e=>e.value||0))}};e([s({readOnly:!0,dependsOn:["valueExpression","stops"]})],w.prototype,"cache",null),e([s({type:z.apiValues,json:{type:z.jsonValues,origins:{"web-map":{read:!1}},read:z.read,write:z.write}})],w.prototype,"axis",void 0),e([s({type:String,value:null,json:{read:!1}})],w.prototype,"expression",null),e([s()],w.prototype,"index",null),e([s({type:String,readOnly:!0,dependsOn:["field","valueExpression"]})],w.prototype,"inputValueType",null),e([s({type:g,json:{write:!0}})],w.prototype,"legendOptions",void 0),e([s({type:Number,value:null,json:{write:!0}})],w.prototype,"maxDataValue",null),e([s({type:Number,value:null,json:{write:!0}})],w.prototype,"maxSize",null),e([r("maxSize")],w.prototype,"castMaxSize",null),e([p("maxSize")],w.prototype,"readMaxSize",null),e([s({type:Number,value:null,json:{write:!0}})],w.prototype,"minDataValue",null),e([s({type:Number,value:null,json:{write:!0}})],w.prototype,"minSize",null),e([r("minSize")],w.prototype,"castMinSize",null),e([p("minSize")],w.prototype,"readMinSize",null),e([s({type:String,json:{write:!0}})],w.prototype,"normalizationField",void 0),e([s({readOnly:!0,dependsOn:["valueExpression","minSize.arcadeRequired","maxSize.arcadeRequired"]})],w.prototype,"arcadeRequired",null),e([s({type:String})],w.prototype,"scaleBy",void 0),e([s({type:[c],value:null,json:{write:!0}})],w.prototype,"stops",null),e([s({type:["outline"],json:{write:!0}})],w.prototype,"target",void 0),e([s({type:String,readOnly:!0,dependsOn:["minDataValue","maxDataValue","minSize","maxSize","valueUnit","inputValueType","stops"]})],w.prototype,"transformationType",null),e([s({type:["size"],json:{type:["sizeInfo"]}})],w.prototype,"type",void 0),e([s({type:Boolean,json:{write:!0,origins:{"web-map":{read:!1}}}})],w.prototype,"useSymbolValue",void 0),e([s({type:String,json:{write:!0}})],w.prototype,"valueExpression",void 0),e([p("valueExpression",["valueExpression","expression"])],w.prototype,"readValueExpression",null),e([l("web-scene","valueExpression")],w.prototype,"writeValueExpressionWebScene",null),e([s({type:["radius","diameter","area","width","distance"],json:{write:!0}})],w.prototype,"valueRepresentation",void 0),e([s({type:f.apiValues,json:{write:f.write,origins:{"web-map":{read:!1},"web-scene":{write:!0}}}})],w.prototype,"valueUnit",void 0),e([p("valueUnit")],w.prototype,"readValueUnit",null),w=x=e([o("esri.renderers.visualVariables.SizeVariable")],w);var D=w;export default D;export{g as S};