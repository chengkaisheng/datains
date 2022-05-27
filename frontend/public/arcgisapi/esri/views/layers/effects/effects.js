// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../chunks/mat4f32","./colorMatrixFunctions"],function(g,k,l,h){function f(b,e,a){return b+(e-b)*a}let m=function(){function b(a,c,d){this.strength=a;this.radius=c;this.threshold=d;this.type="bloom"}var e=b.prototype;e.interpolate=function(a,c,d){this.strength=f(a.strength,c.strength,d);this.radius=f(a.radius,c.radius,d);this.threshold=f(a.threshold,c.threshold,d)};e.clone=function(){return new b(this.strength,this.radius,this.threshold)};
return b}(),n=function(){function b(a){this.radius=a;this.type="blur"}var e=b.prototype;e.interpolate=function(a,c,d){this.radius=Math.round(f(a.radius,c.radius,d))};e.clone=function(){return new b(this.radius)};return b}(),p=function(){function b(a,c){this.type=a;this.amount=c;if("invert"===this.type||"grayscale"===this.type||"sepia"===this.type)this.amount=Math.min(this.amount,1)}var e=b.prototype;e.interpolate=function(a,c,d){this.amount=f(a.amount,c.amount,d);this._updateMatrix()};e.clone=function(){return new b(this.type,
this.amount)};e._updateMatrix=function(){const a=this._colorMatrix||l.create();switch(this.type){case "brightness":this._colorMatrix=h.brightness(a,this.amount);break;case "contrast":this._colorMatrix=h.contrast(a,this.amount);break;case "grayscale":this._colorMatrix=h.grayscale(a,this.amount);break;case "invert":this._colorMatrix=h.invert(a,this.amount);break;case "saturate":this._colorMatrix=h.saturate(a,this.amount);break;case "sepia":this._colorMatrix=h.sepia(a,this.amount)}};k._createClass(b,
[{key:"colorMatrix",get:function(){this._colorMatrix||this._updateMatrix();return this._colorMatrix}}]);return b}(),r=function(){function b(a,c,d,q){this.offsetX=a;this.offsetY=c;this.blurRadius=d;this.color=q;this.type="drop-shadow"}var e=b.prototype;e.interpolate=function(a,c,d){this.offsetX=f(a.offsetX,c.offsetX,d);this.offsetY=f(a.offsetY,c.offsetY,d);this.blurRadius=f(a.blurRadius,c.blurRadius,d);this.color[0]=Math.round(f(a.color[0],c.color[0],d));this.color[1]=Math.round(f(a.color[1],c.color[1],
d));this.color[2]=Math.round(f(a.color[2],c.color[2],d));this.color[3]=f(a.color[3],c.color[3],d)};e.clone=function(){return new b(this.offsetX,this.offsetY,this.blurRadius,[...this.color])};return b}(),t=function(){function b(a){this.angle=a;this.type="hue-rotate"}var e=b.prototype;e.interpolate=function(a,c,d){this.angle=f(a.angle,c.angle,d);this._updateMatrix()};e.clone=function(){return new b(this.angle)};e._updateMatrix=function(){const a=this._colorMatrix||l.create();this._colorMatrix=h.rotateHue(a,
this.angle)};k._createClass(b,[{key:"colorMatrix",get:function(){this._colorMatrix||this._updateMatrix();return this._colorMatrix}}]);return b}(),u=function(){function b(a){this.amount=a;this.type="opacity";this.amount=Math.min(this.amount,1)}var e=b.prototype;e.interpolate=function(a,c,d){this.amount=f(a.amount,c.amount,d)};e.clone=function(){return new b(this.amount)};return b}();g.BloomEffect=m;g.BlurEffect=n;g.ColorMatrixEffect=p;g.DropShadowEffect=r;g.HueRotateEffect=t;g.OpacityEffect=u;g.isColorMatrixEffect=
function(b){return"colorMatrix"in b};Object.defineProperty(g,"__esModule",{value:!0})});