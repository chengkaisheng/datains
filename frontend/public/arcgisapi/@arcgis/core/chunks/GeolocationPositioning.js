/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as t}from"./tslib.es6.js";import"./object.js";import"./Logger.js";import{property as i}from"../core/accessorSupport/decorators/property.js";import o from"../core/Accessor.js";import{resolve as e}from"../core/promiseUtils.js";import s from"../core/Error.js";import"./ensureType.js";import{subclass as r}from"../core/accessorSupport/decorators/subclass.js";import{E as a}from"./Evented.js";import"../core/urlUtils.js";import"./resourceExtension.js";import{g as n}from"./assets.js";import c from"../symbols/PictureMarkerSymbol.js";import p from"../Graphic.js";import{G as l}from"./GoTo.js";import{s as d,p as h}from"./geolocationUtils.js";let g=class extends(l(a.EventedMixin(o))){constructor(){super(...arguments),this._geolocationUsable=!0,this._iconPath=n("esri/images/support/sdk_gps_location.png"),this.geolocationOptions=null,this.goToLocationEnabled=!0,this.graphic=new p({symbol:new c({url:this._iconPath,width:21,height:21})}),this.scale=null,this.useHeadingEnabled=!0,this.view=null}initialize(){d()||(this._geolocationUsable=!1)}destroy(){this._clear(),this.view=null}_clear(){this.view&&this.view.graphics.remove(this.graphic)}_getScaleWithinConstraints(t,i){if(!i)return t;if("2d"===i.type){const{effectiveMaxScale:o,effectiveMinScale:e}=i.constraints;return Math.min(e,Math.max(o,t))}return t}_getScale(t){const{scale:i}=this,o="number"==typeof i?i:2500;return this._getScaleWithinConstraints(o,t)}_getHeading(t,i){const o=i&&i.spatialReference,e=o&&(o.isWebMercator||o.isGeographic),s=t.coords&&t.coords.heading;if(!(!e||"number"!=typeof s||isNaN(s)||s<0||s>360))return s}_addHeading(t){const{heading:i,target:o,view:e}=t;e&&"number"==typeof i&&!isNaN(i)&&("3d"!==e.type?"2d"===e.type&&(o.rotation=360-i):o.heading=i)}_animatePoint(t,i,o,s){const{view:r}=this;if(!this.goToLocationEnabled||!r)return e(i);const a=this.useHeadingEnabled?this._getHeading(i,r):void 0,n={target:t,scale:o};return this._addHeading({heading:a,target:n,view:r}),this.callGoTo({target:n,options:s}).then((()=>i))}async _setPosition(t,i){try{const o=await h({position:t,view:this.view},i),{graphic:e}=this,{timestamp:s}=t,{coords:r}=t,{accuracy:a,altitude:n,altitudeAccuracy:c,heading:p,latitude:l,longitude:d,speed:g}=r,m={timestamp:s,accuracy:a,altitude:n,altitudeAccuracy:c,heading:p,latitude:l,longitude:d,speed:g};e&&(e.geometry=o,e.attributes=m);const u=this._getScale(this.view);return this._animatePoint(o,t,u,i)}catch(t){throw new s("positioning:invalid-point","Cannot position invalid point",{error:t})}}};t([i()],g.prototype,"_geolocationUsable",void 0),t([i()],g.prototype,"geolocationOptions",void 0),t([i()],g.prototype,"goToLocationEnabled",void 0),t([i()],g.prototype,"graphic",void 0),t([i()],g.prototype,"scale",void 0),t([i()],g.prototype,"useHeadingEnabled",void 0),t([i()],g.prototype,"view",void 0),g=t([r("esri.widgets.support.GeolocationPositioning")],g);var m=g;export{m as G};