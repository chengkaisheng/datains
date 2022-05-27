// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../core/maybe ../../../webgl/Program ../../../webgl/BufferObject ../../../webgl/Texture ../../../webgl/VertexArrayObject ../../../webgl/Renderbuffer ../../../webgl/FramebufferObject ../../../webgl/ProgramCache ../../../webgl/RenderingContext ../../../webgl/ShaderCompiler ./decluttering/util".split(" "),function(p,u,h,q,m,w,r,t,x,y,D,E,C){q=function(){function l(f){this.layerUIDs=[];this.isDestroyed=!1;this.data=f;this.memoryUsed=
f.byteLength;let b=1;f=new Uint32Array(f);this.layerUIDs=[];const c=f[b++];for(let a=0;a<c;a++)this.layerUIDs[a]=f[b++];this.bufferDataOffset=b}var g=l.prototype;g.destroy=function(){this.isDestroyed||(this.doDestroy(),this.isDestroyed=!0)};g.prepareForRendering=function(f,b){h.isNone(this.data)||(this.doPrepareForRendering(f,b,this.data,this.bufferDataOffset),this.data=null)};u._createClass(l,[{key:"isPreparedForRendering",get:function(){return h.isNone(this.data)}},{key:"offset",get:function(){return this.bufferDataOffset}}]);
return l}();w=function(l){function g(b){var c=l.call(this,b)||this;c.type=2;c.lineIndexStart=0;c.lineIndexCount=0;let a=c.bufferDataOffset;b=new Uint32Array(b);c.lineIndexStart=b[a++];c.lineIndexCount=b[a++];c.isLineDataDriven=!!b[a++];c.bufferDataOffset=a;return c}u._inheritsLoose(g,l);var f=g.prototype;f.hasData=function(){return 0<this.lineIndexCount};f.triangleCount=function(){return this.lineIndexCount/3};f.doDestroy=function(){h.isSome(this.lineVertexArrayObject)&&this.lineVertexArrayObject.dispose();
h.isSome(this.lineVertexBuffer)&&this.lineVertexBuffer.dispose();h.isSome(this.lineIndexBuffer)&&this.lineIndexBuffer.dispose();this.lineIndexBuffer=this.lineVertexBuffer=this.lineVertexArrayObject=null;this.memoryUsed=0};f.doPrepareForRendering=function(b,c,a,d){a=new Uint32Array(a);var e=new Int32Array(a.buffer);const k=a[d++];this.lineVertexBuffer=m.createVertex(b,35044,new Int32Array(e.buffer,4*d,k));d+=k;e=a[d++];this.lineIndexBuffer=m.createIndex(b,35044,new Uint32Array(a.buffer,4*d,e));d+=
e;this.lineVertexArrayObject=new r(b,c.getProgramAttributes(3),this.isLineDataDriven?g.lineVertexAttributesDD:g.lineVertexAttributes,{geometry:this.lineVertexBuffer},this.lineIndexBuffer)};return g}(q);w.lineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5123,offset:8,stride:12,normalized:!1,divisor:0}]};w.lineVertexAttributesDD=
{geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:20,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:20,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5122,offset:8,stride:20,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:20,normalized:!0,divisor:0},{name:"a_width",count:1,type:5126,offset:16,stride:20,normalized:!1,divisor:0}]};t=function(l){function g(b){var c=l.call(this,b)||this;c.type=1;c.fillIndexStart=
0;c.fillIndexCount=0;c.outlineIndexStart=0;c.outlineIndexCount=0;let a=c.bufferDataOffset;b=new Uint32Array(b);c.fillIndexStart=b[a++];c.fillIndexCount=b[a++];c.outlineIndexStart=b[a++];c.outlineIndexCount=b[a++];c.isFillDataDriven=!!b[a++];c.isOutlineDataDriven=!!b[a++];c.bufferDataOffset=a;return c}u._inheritsLoose(g,l);var f=g.prototype;f.hasData=function(){return 0<this.fillIndexCount||0<this.outlineIndexCount};f.triangleCount=function(){return(this.fillIndexCount+this.outlineIndexCount)/3};f.doDestroy=
function(){h.isSome(this.fillVertexArrayObject)&&this.fillVertexArrayObject.dispose();h.isSome(this.fillVertexBuffer)&&this.fillVertexBuffer.dispose();h.isSome(this.fillIndexBuffer)&&this.fillIndexBuffer.dispose();this.fillIndexBuffer=this.fillVertexBuffer=this.fillVertexArrayObject=null;h.isSome(this.outlineVertexArrayObject)&&this.outlineVertexArrayObject.dispose();h.isSome(this.outlineVertexBuffer)&&this.outlineVertexBuffer.dispose();h.isSome(this.outlineIndexBuffer)&&this.outlineIndexBuffer.dispose();
this.outlineIndexBuffer=this.outlineVertexBuffer=this.outlineVertexArrayObject=null;this.memoryUsed=0};f.doPrepareForRendering=function(b,c,a,d){a=new Uint32Array(a);var e=new Int32Array(a.buffer),k=a[d++];this.fillVertexBuffer=m.createVertex(b,35044,new Int32Array(e.buffer,4*d,k));d+=k;k=a[d++];this.fillIndexBuffer=m.createIndex(b,35044,new Uint32Array(a.buffer,4*d,k));d+=k;k=a[d++];this.outlineVertexBuffer=m.createVertex(b,35044,new Int32Array(e.buffer,4*d,k));d+=k;e=a[d++];this.outlineIndexBuffer=
m.createIndex(b,35044,new Uint32Array(a.buffer,4*d,e));d+=e;this.fillVertexArrayObject=new r(b,c.getProgramAttributes(1),this.isFillDataDriven?g.fillVertexAttributesDD:g.fillVertexAttributes,{geometry:this.fillVertexBuffer},this.fillIndexBuffer);this.outlineVertexArrayObject=new r(b,c.getProgramAttributes(2),this.isOutlineDataDriven?g.outlineVertexAttributesDD:g.outlineVertexAttributes,{geometry:this.outlineVertexBuffer},this.outlineIndexBuffer)};return g}(q);t.fillVertexAttributes={geometry:[{name:"a_pos",
count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]};t.fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]};t.outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,
divisor:0}]};t.outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]};x=function(l){function g(b,c){var a=l.call(this,b)||this;a.type=3;a.iconPerPageElementsMap=new Map;a.glyphPerPageElementsMap=new Map;a.symbolInstances=
[];a.isIconSDF=!1;a.opacityChanged=!1;a.lastOpacityUpdate=0;a.symbols=[];let d=a.bufferDataOffset;const e=new Uint32Array(b),k=new Int32Array(b);b=new Float32Array(b);a.isIconSDF=!!e[d++];a.isIconDataDriven=!!e[d++];a.isTextDataDriven=!!e[d++];var v=e[d++];for(var n=0;n<v;n++){var z=e[d++],A=e[d++],B=e[d++];a.iconPerPageElementsMap.set(z,[A,B])}v=e[d++];for(n=0;n<v;n++)z=e[d++],A=e[d++],B=e[d++],a.glyphPerPageElementsMap.set(z,[A,B]);v=e[d++];n=e[d++];a.iconOpacity=new Int32Array(v);a.textOpacity=
new Int32Array(n);d=C.deserializeSymbols(e,k,b,d,a.symbols,c);a.bufferDataOffset=d;return a}u._inheritsLoose(g,l);var f=g.prototype;f.hasData=function(){return 0<this.iconPerPageElementsMap.size||0<this.glyphPerPageElementsMap.size};f.triangleCount=function(){let b=0;this.iconPerPageElementsMap.forEach(c=>{b+=c[1]});this.glyphPerPageElementsMap.forEach(c=>{b+=c[1]});return b/3};f.doDestroy=function(){h.isSome(this.iconVertexArrayObject)&&this.iconVertexArrayObject.dispose();h.isSome(this.iconVertexBuffer)&&
this.iconVertexBuffer.dispose();h.isSome(this.iconOpacityBuffer)&&this.iconOpacityBuffer.dispose();h.isSome(this.iconIndexBuffer)&&this.iconIndexBuffer.dispose();this.iconIndexBuffer=this.iconOpacityBuffer=this.iconVertexBuffer=this.iconVertexArrayObject=null;h.isSome(this.textVertexArrayObject)&&this.textVertexArrayObject.dispose();h.isSome(this.textVertexBuffer)&&this.textVertexBuffer.dispose();h.isSome(this.textOpacityBuffer)&&this.textOpacityBuffer.dispose();h.isSome(this.textIndexBuffer)&&this.textIndexBuffer.dispose();
this.textIndexBuffer=this.textOpacityBuffer=this.textVertexBuffer=this.textVertexArrayObject=null;this.memoryUsed=0};f.updateOpacityInfo=function(){if(this.opacityChanged){this.opacityChanged=!1;var b=h.unwrap(this.iconOpacity),c=h.unwrap(this.iconOpacityBuffer);0<b.length&&b.byteLength===c.size&&c.setSubData(b);b=h.unwrap(this.textOpacity);c=h.unwrap(this.textOpacityBuffer);0<b.length&&b.byteLength===c.size&&c.setSubData(b)}};f.doPrepareForRendering=function(b,c,a,d){a=new Uint32Array(a);var e=new Int32Array(a.buffer),
k=a[d++];this.iconVertexBuffer=m.createVertex(b,35044,new Int32Array(e.buffer,4*d,k));d+=k;k=a[d++];this.iconIndexBuffer=m.createIndex(b,35044,new Uint32Array(a.buffer,4*d,k));d+=k;k=a[d++];this.textVertexBuffer=m.createVertex(b,35044,new Int32Array(e.buffer,4*d,k));d+=k;e=a[d++];this.textIndexBuffer=m.createIndex(b,35044,new Uint32Array(a.buffer,4*d,e));d+=e;this.iconOpacityBuffer=m.createVertex(b,35044,h.unwrap(this.iconOpacity).buffer);this.textOpacityBuffer=m.createVertex(b,35044,h.unwrap(this.textOpacity).buffer);
this.iconVertexArrayObject=new r(b,c.getProgramAttributes(4),this.isIconDataDriven?g.vertexAttributesDD:g.vertexAttributes,{geometry:this.iconVertexBuffer,opacity:this.iconOpacityBuffer},this.iconIndexBuffer);this.textVertexArrayObject=new r(b,c.getProgramAttributes(6),this.isTextDataDriven?g.vertexAttributesDD:g.vertexAttributes,{geometry:this.textVertexBuffer,opacity:this.textOpacityBuffer},this.textIndexBuffer)};return g}(q);x.vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,
stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_texAngleRange",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}],opacity:[{name:"a_opacityInfo",count:1,type:5121,offset:0,stride:1,normalized:!1,divisor:0}]};x.vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",
count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_texAngleRange",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}],opacity:[{name:"a_opacityInfo",count:1,type:5121,offset:0,stride:1,normalized:!1,divisor:0}]};y=function(l){function g(b){var c=
l.call(this,b)||this;c.type=4;c.circleIndexStart=0;c.circleIndexCount=0;let a=c.bufferDataOffset;b=new Uint32Array(b);c.circleIndexStart=b[a++];c.circleIndexCount=b[a++];c.bufferDataOffset=a;return c}u._inheritsLoose(g,l);var f=g.prototype;f.hasData=function(){return 0<this.circleIndexCount};f.triangleCount=function(){return this.circleIndexCount/3};f.doDestroy=function(){h.isSome(this.circleVertexArrayObject)&&this.circleVertexArrayObject.dispose();h.isSome(this.circleVertexBuffer)&&this.circleVertexBuffer.dispose();
h.isSome(this.circleIndexBuffer)&&this.circleIndexBuffer.dispose();this.circleIndexBuffer=this.circleVertexBuffer=this.circleVertexArrayObject=null;this.memoryUsed=0};f.doPrepareForRendering=function(b,c,a,d){a=new Uint32Array(a);var e=new Int32Array(a.buffer);const k=a[d++];this.circleVertexBuffer=m.createVertex(b,35044,new Int32Array(e.buffer,4*d,k));d+=k;e=a[d++];this.circleIndexBuffer=m.createIndex(b,35044,new Uint32Array(a.buffer,4*d,e));d+=e;this.circleVertexArrayObject=new r(b,c.getProgramAttributes(5),
g.circleVertexAttributes,{geometry:this.circleVertexBuffer},this.circleIndexBuffer)};return g}(q);y.circleVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:16,normalized:!0,divisor:0},{name:"a_stroke_color",count:4,type:5121,offset:8,stride:16,normalized:!0,divisor:0},{name:"a_data",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]};p.CircleRenderBucket=y;p.FillRenderBucket=t;p.LineRenderBucket=
w;p.RenderBucketBase=q;p.SymbolRenderBucket=x;Object.defineProperty(p,"__esModule",{value:!0})});