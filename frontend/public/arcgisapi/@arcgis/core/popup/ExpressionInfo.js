/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as r}from"../chunks/tslib.es6.js";import"../chunks/ArrayPool.js";import"../chunks/object.js";import"../chunks/deprecate.js";import"../core/lang.js";import"../config.js";import"../chunks/Logger.js";import"../chunks/string.js";import"../chunks/metadata.js";import{property as s}from"../core/accessorSupport/decorators/property.js";import"../core/Accessor.js";import"../chunks/PropertyOrigin.js";import"../core/scheduling.js";import"../core/promiseUtils.js";import"../chunks/Message.js";import"../core/Error.js";import"../chunks/ensureType.js";import{subclass as t}from"../core/accessorSupport/decorators/subclass.js";import{a as o}from"../chunks/JSONSupport.js";import"../core/urlUtils.js";import"../chunks/resourceExtension.js";var e;let i=e=class extends o{constructor(r){super(r),this.name=null,this.title=null,this.expression=null,this.returnType=null}clone(){return new e({name:this.name,title:this.title,expression:this.expression,returnType:this.returnType})}};r([s({type:String,json:{write:!0}})],i.prototype,"name",void 0),r([s({type:String,json:{write:!0}})],i.prototype,"title",void 0),r([s({type:String,json:{write:!0}})],i.prototype,"expression",void 0),r([s({type:["string","number"],json:{write:!0}})],i.prototype,"returnType",void 0),i=e=r([t("esri.popup.ExpressionInfo")],i);var p=i;export default p;
