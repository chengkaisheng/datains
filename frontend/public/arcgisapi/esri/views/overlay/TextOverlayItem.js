// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../chunks/_rollupPluginBabelHelpers ../../chunks/tslib.es6 ../../core/has ../../core/Logger ../../core/accessorSupport/ensureType ../../core/accessorSupport/decorators/property ../../core/jsonMap ../../core/accessorSupport/decorators/subclass ../../core/urlUtils ../../core/uuid ../../portal/support/resourceExtension ../../core/Accessor ../../libs/maquette/projection ../../libs/maquette/h ../../libs/maquette/projector".split(" "),function(p,e,h,y,z,k,A,t,B,C,D,u,E,v,F){const q={bottom:"esri-text-overlay-item-anchor-bottom",
"bottom-right":"esri-text-overlay-item-anchor-bottom-right","bottom-left":"esri-text-overlay-item-anchor-bottom-left",top:"esri-text-overlay-item-anchor-top","top-right":"esri-text-overlay-item-anchor-top-right","top-left":"esri-text-overlay-item-anchor-top-left",center:"esri-text-overlay-item-anchor-center",right:"esri-text-overlay-item-anchor-right",left:"esri-text-overlay-item-anchor-left"};h=function(r){function m(a){a=r.call(this,a)||this;a.x=0;a.y=0;a.text="-";a.fontSize=14;a.anchor="center";
a.visible=!0;a.backgroundColor="rgba(0, 0, 0, 0.6)";a.textColor="white";a.textShadowColor=[0,0,0];a.textShadowSize=1;return a}p._inheritsLoose(m,r);var l=m.prototype;l.render=function(){return v.h("div",{classes:this._cssClasses(),styles:{left:Math.floor(this.x)+"px",top:Math.floor(this.y)+"px",visibility:this.visible?"visible":"hidden",fontSize:this.fontSize+"px",backgroundColor:this.backgroundColor,color:this.textColor,padding:this.padding+"px",borderRadius:this.padding+"px",textShadow:`0 0 ${this.textShadowSize}px rgb(${this.textShadowColor[0]}, ${this.textShadowColor[1]}, ${this.textShadowColor[2]})`}},
[this.text])};l.renderCanvas=function(a){if(this.visible){var b=a.font.replace(/^(.*?)px/,"");a.font=`${this.fontSize}px ${b}`;var c=this.padding,g=this.padding,f=a.measureText(this.text).width,d=this.fontSize;b=w[this.anchor];a.textAlign="center";a.textBaseline="middle";f+=2*c;c=d+2*c;this.roundedRect(a,this.x+b.x*f,this.y+b.y*c,f,c,g);a.fillStyle=this.backgroundColor;a.fill();g=this.x+(b.x+.5)*f;b=this.y+(b.y+.5)*c;this._renderTextShadow(a,this.text,g,b);a.fillStyle=this.textColor;a.fillText(this.text,
g,b)}};l._renderTextShadow=function(a,b,c,g){a.lineJoin="miter";a.fillStyle=`rgba(${this.textShadowColor[0]}, ${this.textShadowColor[1]}, ${this.textShadowColor[2]}, ${1/n.length})`;const f=this.textShadowSize;for(const [d,x]of n)a.fillText(b,c+f*d,g+f*x)};l.roundedRect=function(a,b,c,g,f,d){a.beginPath();a.moveTo(b,c+d);a.arcTo(b,c,b+d,c,d);a.lineTo(b+g-d,c);a.arcTo(b+g,c,b+g,c+d,d);a.lineTo(b+g,c+f-d);a.arcTo(b+g,c+f,b+g-d,c+f,d);a.lineTo(b+d,c+f);a.arcTo(b,c+f,b,c+f-d,d);a.closePath()};l._cssClasses=
function(){const a={"esri-text-overlay-item":!0};for(const b in q)a[q[b]]=this.anchor===b;return a};p._createClass(m,[{key:"position",get:function(){return[this.x,this.y]},set:function(a){this._set("x",a[0]);this._set("y",a[1])}},{key:"padding",get:function(){return.5*this.fontSize}}]);return m}(u);e.__decorate([k.property()],h.prototype,"x",void 0);e.__decorate([k.property()],h.prototype,"y",void 0);e.__decorate([k.property({dependsOn:["x","y"]})],h.prototype,"position",null);e.__decorate([k.property()],
h.prototype,"text",void 0);e.__decorate([k.property()],h.prototype,"fontSize",void 0);e.__decorate([k.property()],h.prototype,"anchor",void 0);e.__decorate([k.property()],h.prototype,"visible",void 0);e.__decorate([k.property({dependsOn:["fontSize"]})],h.prototype,"padding",null);h=e.__decorate([t.subclass("esri.views.overlay.TextOverlayItem")],h);const w={bottom:{x:-.5,y:-1,textAlign:"center",textBaseline:"bottom"},"bottom-left":{x:0,y:-1,textAlign:"left",textBaseline:"bottom"},"bottom-right":{x:-1,
y:-1,textAlign:"right",textBaseline:"bottom"},center:{x:-.5,y:-.5,textAlign:"center",textBaseline:"middle"},left:{x:0,y:-.5,textAlign:"left",textBaseline:"middle"},right:{x:-1,y:-.5,textAlign:"right",textBaseline:"middle"},top:{x:-.5,y:0,textAlign:"center",textBaseline:"top"},"top-left":{x:0,y:0,textAlign:"left",textBaseline:"top"},"top-right":{x:-1,y:0,textAlign:"right",textBaseline:"top"}},n=[];for(e=0;360>e;e+=22.5)n.push([Math.cos(Math.PI*e/180),Math.sin(Math.PI*e/180)]);return h});