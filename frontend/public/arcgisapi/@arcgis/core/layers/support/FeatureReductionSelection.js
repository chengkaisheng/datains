/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as r}from"../../chunks/tslib.es6.js";import"../../chunks/ArrayPool.js";import"../../chunks/object.js";import"../../chunks/deprecate.js";import"../../core/lang.js";import"../../config.js";import"../../chunks/Logger.js";import"../../chunks/string.js";import"../../chunks/metadata.js";import{property as s}from"../../core/accessorSupport/decorators/property.js";import"../../core/Accessor.js";import"../../chunks/PropertyOrigin.js";import"../../core/scheduling.js";import"../../core/promiseUtils.js";import"../../chunks/Message.js";import"../../core/Error.js";import"../../chunks/ensureType.js";import{subclass as e}from"../../core/accessorSupport/decorators/subclass.js";import{a as o}from"../../chunks/JSONSupport.js";import"../../core/urlUtils.js";import"../../chunks/resourceExtension.js";let t=class extends o{constructor(){super(...arguments),this.type=null}};r([s({type:["selection","cluster"],readOnly:!0,json:{read:!1,write:!0}})],t.prototype,"type",void 0),t=r([e("esri.layers.support.FeatureReduction")],t);var p,c=t;let i=p=class extends c{constructor(r){super(r),this.type="selection"}clone(){return new p}};r([s({type:["selection"]})],i.prototype,"type",void 0),i=p=r([e("esri.layers.support.FeatureReductionSelection")],i);var n=i;export default n;export{c as F};