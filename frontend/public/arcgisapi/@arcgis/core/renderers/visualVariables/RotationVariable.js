/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import"../../chunks/ArrayPool.js";import"../../chunks/object.js";import"../../chunks/deprecate.js";import"../../core/lang.js";import"../../config.js";import"../../chunks/Logger.js";import"../../chunks/string.js";import"../../chunks/metadata.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/Accessor.js";import"../../chunks/PropertyOrigin.js";import"../../core/scheduling.js";import"../../core/promiseUtils.js";import"../../chunks/Message.js";import t from"../../core/Error.js";import"../../chunks/ensureType.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";import"../../chunks/JSONSupport.js";import"../../core/urlUtils.js";import"../../core/accessorSupport/decorators/cast.js";import"../../chunks/jsonMap.js";import{w as r}from"../../chunks/writer.js";import"../../chunks/resourceExtension.js";import"../../chunks/LegendOptions.js";import i from"./VisualVariable.js";var p;let n=p=class extends i{constructor(e){super(e),this.axis=null,this.type="rotation",this.rotationType="geographic",this.valueExpressionTitle=null}get cache(){return{hasExpression:!!this.valueExpression,compiledFunc:null}}writeValueExpressionTitleWebScene(e,s,o,r){if(r&&r.messages){const e=`visualVariables[${this.index}]`;r.messages.push(new t("property:unsupported",this.type+"VisualVariable.valueExpressionTitle is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:e+".valueExpressionTitle",context:r}))}}clone(){return new p({axis:this.axis,rotationType:this.rotationType,field:this.field,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,legendOptions:this.legendOptions&&this.legendOptions.clone()})}};e([s({readOnly:!0,dependsOn:["valueExpression"]})],n.prototype,"cache",null),e([s({type:["heading","tilt","roll"],json:{origins:{"web-scene":{default:"heading",write:!0}}}})],n.prototype,"axis",void 0),e([s({type:["rotation"],json:{type:["rotationInfo"]}})],n.prototype,"type",void 0),e([s({type:["geographic","arithmetic"],json:{write:!0,origins:{"web-document":{write:!0,default:"geographic"}}}})],n.prototype,"rotationType",void 0),e([s({type:String,json:{write:!0}})],n.prototype,"valueExpressionTitle",void 0),e([r("web-scene","valueExpressionTitle")],n.prototype,"writeValueExpressionTitleWebScene",null),n=p=e([o("esri.renderers.visualVariables.RotationVariable")],n);var a=n;export default a;
