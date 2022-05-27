// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","./TextRenderParameters"],function(n,x,q,r){function p(d,k,a){d.canvas||(d.canvas=document.createElement("canvas"));d.canvas.width=k;d.canvas.height=a;return d.canvas}let w=function(){function d(a,c,b=2048){this.text=a;this.maxSize=b;this._displayWidth=this._renderPixelRatio=null;this.parameters=c instanceof r.TextRenderParameters?c:new r.TextRenderParameters(c);this.key=`${this.parameters.key}--${a}`;this.textLines=
a.split(/\r?\n/);this.lineHeight=this.computeLineHeight()}var k=d.prototype;k.render=function(a,c=0,b=0){const l=this.renderedLineHeight,h=this.renderedHaloSize;var e=a.textAlign,f=this.renderedWidth;e=("center"===e?.5*f:"right"===e?f:0)+h;f=h+1;a.save();0<h&&this.renderHalo(a,e,f,c,b);this.setFontProperties(a,this.renderedFontSize);b+=f;c+=e;for(const g of this.textLines)a.globalCompositeOperation="destination-out",a.fillStyle="rgb(0, 0, 0)",a.fillText(g,c,b),a.globalCompositeOperation="source-over",
a.fillStyle=this.parameters.fillStyle,a.fillText(g,c,b),b+=l;a.restore()};k.renderHalo=function(a,c,b,l,h){const e=this.renderedWidth,f=this.renderedHeight,g=p(t,Math.max(e,512),Math.max(f,512)),m=g.getContext("2d");m.clearRect(0,0,e,f);this.setFontProperties(m,this.renderedFontSize);m.fillStyle=this.parameters.haloStyle;m.strokeStyle=this.parameters.haloStyle;const u=3>this.renderedHaloSize;m.lineJoin=u?"miter":"round";u?this.renderHaloEmulated(m,c,b):this.renderHaloNative(m,c,b);a.globalAlpha=this.parameters.definition.halo.color[3];
a.drawImage(g,0,0,e,f,l,h,e,f);a.globalAlpha=1};k.renderHaloEmulated=function(a,c,b){const l=this.renderedLineHeight,h=this.renderedHaloSize;for(const e of this.textLines){for(const [f,g]of v)a.fillText(e,c+h*f,b+h*g);b+=l}};k.renderHaloNative=function(a,c,b){const l=this.renderedLineHeight,h=this.renderedHaloSize;for(const e of this.textLines){const f=2*h;for(let g=0;5>g;g++)a.lineWidth=(.6+.1*g)*f,a.strokeText(e,c,b);b+=l}};k.setFontProperties=function(a,c){const b=this.parameters.definition.font;
a.font=`${b.style} ${b.weight} ${c}px ${b.family}, sans-serif`;a.textAlign="left";a.textBaseline="top"};k.computeTextWidth=function(){const a=p(t,512,512).getContext("2d");this.setFontProperties(a,this.parameters.definition.size);let c=0;for(var b of this.textLines)c=Math.max(c,a.measureText(b).width);b=this.parameters.definition.font;if("italic"===b.style||"oblique"===b.style||"string"===typeof b.weight&&("bold"===b.weight||"bolder"===b.weight)||"number"===typeof b.weight&&600<b.weight)c+=.3*a.measureText("A").width;
c+=2*this.parameters.haloSize;return Math.round(c)};k.computeLineHeight=function(){return Math.ceil(1.275*this.parameters.definition.size+2*this.parameters.haloSize)+1};x._createClass(d,[{key:"displayWidth",get:function(){q.isNone(this._displayWidth)&&(this._displayWidth=this.computeTextWidth());return this._displayWidth}},{key:"displayHeight",get:function(){return this.lineHeight*this.textLines.length}},{key:"renderedWidth",get:function(){return Math.round(this.displayWidth*this.renderPixelRatio)}},
{key:"renderedHeight",get:function(){return Math.round(this.displayHeight*this.renderPixelRatio)}},{key:"renderedLineHeight",get:function(){return Math.round(this.lineHeight*this.renderPixelRatio)}},{key:"renderedFontSize",get:function(){return this.parameters.definition.size*this.renderPixelRatio}},{key:"renderedHaloSize",get:function(){return this.parameters.haloSize*this.renderPixelRatio}},{key:"renderPixelRatio",get:function(){if(q.isNone(this._renderPixelRatio)){const a=this.parameters.definition.pixelRatio;
this._renderPixelRatio=0<this.maxSize?Math.min(a,Math.min(this.maxSize/(this.displayWidth*a),this.maxSize/(this.displayHeight*a))):a}return this._renderPixelRatio}}]);return d}();const v=[];for(let d=0;360>d;d+=22.5)v.push([Math.cos(Math.PI*d/180),Math.sin(Math.PI*d/180)]);const t={canvas:null};n.TextRenderer=w;n.default=w;n.getTextHelperCanvas=p;Object.defineProperty(n,"__esModule",{value:!0})});