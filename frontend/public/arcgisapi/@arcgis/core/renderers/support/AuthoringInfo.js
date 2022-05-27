/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import"../../chunks/ArrayPool.js";import"../../chunks/object.js";import"../../chunks/deprecate.js";import{clone as t}from"../../core/lang.js";import"../../config.js";import"../../chunks/Logger.js";import"../../chunks/string.js";import"../../chunks/metadata.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/Accessor.js";import"../../chunks/PropertyOrigin.js";import"../../core/scheduling.js";import"../../core/promiseUtils.js";import"../../chunks/Message.js";import"../../core/Error.js";import{I as i}from"../../chunks/ensureType.js";import{subclass as r}from"../../core/accessorSupport/decorators/subclass.js";import{a}from"../../chunks/JSONSupport.js";import"../../core/urlUtils.js";import"../../core/accessorSupport/decorators/cast.js";import{J as o}from"../../chunks/jsonMap.js";import"../../chunks/enumeration.js";import{r as l}from"../../chunks/reader.js";import"../../chunks/resourceExtension.js";import"../../chunks/mathUtils2.js";import"../../chunks/colorUtils.js";import"../../Color.js";import n from"./AuthoringInfoVisualVariable.js";import"../../tasks/support/ColorRamp.js";import"../../tasks/support/AlgorithmicColorRamp.js";import"../../tasks/support/MultipartColorRamp.js";import{f as p,t as u}from"../../chunks/colorRamps.js";var c;let d=c=class extends a{constructor(e){super(e),this.minValue=0,this.maxValue=0}clone(){return new c({minValue:this.minValue,maxValue:this.maxValue})}};e([s({type:Number,json:{write:!0}})],d.prototype,"minValue",void 0),e([s({type:Number,json:{write:!0}})],d.prototype,"maxValue",void 0),d=c=e([r("esri.renderer.support.AuthoringInfoClassBreakInfo")],d);var h,m=d;let y=h=class extends a{constructor(e){super(e),this.field="",this.normalizationField="",this.label="",this.classBreakInfos=[]}clone(){return new h({field:this.field,normalizationField:this.normalizationField,label:this.label,classBreakInfos:t(this.classBreakInfos)})}};e([s({type:String,json:{write:!0}})],y.prototype,"field",void 0),e([s({type:String,json:{write:!0}})],y.prototype,"normalizationField",void 0),e([s({type:String,json:{write:!0}})],y.prototype,"label",void 0),e([s({type:[m],json:{write:!0}})],y.prototype,"classBreakInfos",void 0),y=h=e([r("esri.renderers.support.AuthoringInfoFieldInfo")],y);var v,f=y;const j=new o({esriClassifyDefinedInterval:"defined-interval",esriClassifyEqualInterval:"equal-interval",esriClassifyManual:"manual",esriClassifyNaturalBreaks:"natural-breaks",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation"}),g=new o({classedSize:"class-breaks-size",classedColor:"class-breaks-color",univariateColorSize:"univariate-color-size",relationship:"relationship",predominance:"predominance",dotDensity:"dot-density"}),b=["inches","feet","yards","miles","nautical-miles","millimeters","centimeters","decimeters","meters","kilometers","decimal-degrees"];let w=v=class extends a{constructor(e){super(e),this.colorRamp=null,this.lengthUnit=null,this.maxSliderValue=null,this.minSliderValue=null,this.visualVariables=null}get classificationMethod(){const e=this._get("classificationMethod"),t=this.type;return t&&"relationship"!==t?"class-breaks-size"===t||"class-breaks-color"===t?e||"manual":null:e}set classificationMethod(e){this._set("classificationMethod",e)}readColorRamp(e){if(e)return p(e)}get fields(){return this.type&&"predominance"!==this.type?null:this._get("fields")}set fields(e){this._set("fields",e)}get field1(){return this.type&&"relationship"!==this.type?null:this._get("field1")}set field1(e){this._set("field1",e)}get field2(){return this.type&&"relationship"!==this.type?null:this._get("field2")}set field2(e){this._set("field2",e)}get focus(){return this.type&&"relationship"!==this.type?null:this._get("focus")}set focus(e){this._set("focus",e)}get numClasses(){return this.type&&"relationship"!==this.type?null:this._get("numClasses")}set numClasses(e){this._set("numClasses",e)}get statistics(){return"univariate-color-size"===this.type&&"above-and-below"===this.univariateTheme?this._get("statistics"):null}set statistics(e){this._set("statistics",e)}get standardDeviationInterval(){const e=this.type;return e&&"relationship"!==e&&"class-breaks-size"!==e&&"class-breaks-color"!==e||this.classificationMethod&&"standard-deviation"!==this.classificationMethod?null:this._get("standardDeviationInterval")}set standardDeviationInterval(e){this._set("standardDeviationInterval",e)}get type(){return this._get("type")}set type(e){let t=e;"classed-size"===e?t="class-breaks-size":"classed-color"===e&&(t="class-breaks-color"),this._set("type",t)}get univariateSymbolStyle(){return"univariate-color-size"===this.type&&"above-and-below"===this.univariateTheme?this._get("univariateSymbolStyle"):null}set univariateSymbolStyle(e){this._set("univariateSymbolStyle",e)}get univariateTheme(){return"univariate-color-size"===this.type?this._get("univariateTheme"):null}set univariateTheme(e){this._set("univariateTheme",e)}clone(){return new v({classificationMethod:this.classificationMethod,colorRamp:t(this.colorRamp),fields:this.fields&&this.fields.slice(0),field1:t(this.field1),field2:t(this.field2),focus:this.focus,numClasses:this.numClasses,maxSliderValue:this.maxSliderValue,minSliderValue:this.minSliderValue,lengthUnit:this.lengthUnit,statistics:this.statistics,standardDeviationInterval:this.standardDeviationInterval,type:this.type,visualVariables:this.visualVariables&&this.visualVariables.map((e=>e.clone())),univariateSymbolStyle:this.univariateSymbolStyle,univariateTheme:this.univariateTheme})}};e([s({type:j.apiValues,value:null,dependsOn:["type"],json:{type:j.jsonValues,read:j.read,write:j.write,origins:{"web-document":{default:"manual",type:j.jsonValues,read:j.read,write:j.write}}}})],w.prototype,"classificationMethod",null),e([s({types:u,json:{write:!0}})],w.prototype,"colorRamp",void 0),e([l("colorRamp")],w.prototype,"readColorRamp",null),e([s({type:[String],value:null,dependsOn:["type"],json:{write:!0}})],w.prototype,"fields",null),e([s({type:f,value:null,dependsOn:["type"],json:{write:!0}})],w.prototype,"field1",null),e([s({type:f,value:null,dependsOn:["type"],json:{write:!0}})],w.prototype,"field2",null),e([s({type:["HH","HL","LH","LL"],value:null,dependsOn:["type"],json:{write:!0}})],w.prototype,"focus",null),e([s({type:Number,value:null,dependsOn:["type"],json:{type:i,write:!0}})],w.prototype,"numClasses",null),e([s({type:b,json:{type:b,read:!1,write:!1,origins:{"web-scene":{read:!0,write:!0}}}})],w.prototype,"lengthUnit",void 0),e([s({type:Number,json:{write:!0,origins:{"web-scene":{write:!1,read:!1}}}})],w.prototype,"maxSliderValue",void 0),e([s({type:Number,json:{write:!0,origins:{"web-scene":{write:!1,read:!1}}}})],w.prototype,"minSliderValue",void 0),e([s({type:Object,value:null,dependsOn:["type","univariateTheme"],json:{write:!0,origins:{"web-scene":{write:!1,read:!1}}}})],w.prototype,"statistics",null),e([s({type:[.25,.33,.5,1],value:null,dependsOn:["classificationMethod","type"],json:{type:[.25,.33,.5,1],write:!0}})],w.prototype,"standardDeviationInterval",null),e([s({type:g.apiValues,value:null,json:{type:g.jsonValues,read:g.read,write:g.write}})],w.prototype,"type",null),e([s({type:[n],json:{write:!0}})],w.prototype,"visualVariables",void 0),e([s({type:["caret","circle-caret","arrow","circle-arrow","plus-minus","circle-plus-minus","square","circle","triangle","happy-sad","thumb","custom"],value:null,dependsOn:["type","univariateTheme"],json:{write:!0,origins:{"web-scene":{write:!1}}}})],w.prototype,"univariateSymbolStyle",null),e([s({type:["high-to-low","above-and-below","above","below","90-10"],value:null,json:{write:!0,origins:{"web-scene":{write:!1}}}})],w.prototype,"univariateTheme",null),w=v=e([r("esri.renderers.support.AuthoringInfo")],w);var k=w;export default k;export{f as A,m as a};
