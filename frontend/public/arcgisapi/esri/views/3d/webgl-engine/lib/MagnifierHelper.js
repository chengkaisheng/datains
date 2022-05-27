// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../chunks/tslib.es6 ../../../../core/has ../../../../core/maybe ../../../../core/Logger ../../../../core/accessorSupport/ensureType ../../../../core/accessorSupport/decorators/property ../../../../core/jsonMap ../../../../core/accessorSupport/decorators/subclass ../../../../core/urlUtils ../../../../core/uuid ../../../../portal/support/resourceExtension ../../../../core/promiseUtils ../../../../core/Accessor ../../../../core/Evented ../../../../core/mathUtils ../../../../core/screenUtils ../../../../core/Handles ../../../../support/requestImageUtils ../../../webgl/Program ../../../webgl/renderState ../../../webgl/BufferObject ../../../webgl/Texture ../../../webgl/VertexArrayObject ./DefaultVertexBufferLayouts ./glUtil3D ../../../webgl/Renderbuffer ../../../webgl/FramebufferObject ../../../webgl/ProgramCache ../../../webgl/RenderingContext ../../../webgl/ShaderCompiler ../shaders/Magnifier.glsl ../../../magnifier/resources".split(" "),
function(l,y,q,M,c,N,O,t,P,C,Q,R,S,D,E,F,z,u,G,A,H,v,T,w,U,I,J,V,W,X,Y,Z,K,L){l.MagnifierHelper=function(B){function r(){var a=B.apply(this,arguments)||this;a._handles=new G;a._magnifier=null;a._imageSources=null;a._imageLoadTask=null;a._resources=null;a.events=new F;a.tmpScreenPoint=u.createScreenPointArray();a.tmpRenderPoint=u.createRenderScreenPointArray();return a}y._inheritsLoose(r,B);var h=r.prototype;h.dispose=function(){this._magnifier=null;this._handles.destroy();c.isSome(this._imageLoadTask)&&
(this._imageLoadTask.task.abort(),this._imageLoadTask=null);this.disposeResources()};h.render=function(a,b){const e=this._validMagnifier;if(!c.isNone(e)){var f=b.camera.pixelRatio,k=Math.ceil(f*e.size);this.updateResources(a,k);if(!c.isNone(this._resources)){var d=this._resources.textures,g=Math.ceil(1/this.factor*k);d.input.resize(g,g);var m=b.camera.fullWidth,x=b.camera.fullHeight;u.screenPointObjectToArray(e.position,this.tmpScreenPoint);b=b.camera.screenToRender(this.tmpScreenPoint,this.tmpRenderPoint);
var n=.5*g,p=.5*g;b[0]=z.clamp(b[0],n,m-n-1);b[1]=z.clamp(b[1],p,x-p-1);n=Math.floor(b[0]-n);p=Math.floor(b[1]-p);a.bindTexture(d.input,0);a.gl.copyTexImage2D(d.input.descriptor.target,0,d.input.descriptor.pixelFormat,n,p,g,g,0);g=-1+(b[0]+e.offsetX*f)/m*2;f=-1+(b[1]-e.offsetY*f)/x*2;m=k/m*2;k=k/x*2;a.bindVAO(this._resources.vao);a.bindTexture(d.overlay,1);a.bindTexture(d.mask,2);d=this._resources.program;a.bindProgram(d);d.setUniform1i("textureInput",0);d.setUniform1i("textureOverlay",1);d.setUniform1i("textureMask",
2);d.setUniform4f("drawPosition",g,f,m,k);d.setUniform1i("maskEnabled",e.maskEnabled?1:0);d.setUniform1i("overlayEnabled",e.overlayEnabled?1:0);a.setPipelineState(this._resources.pipelineState);a.drawArrays(5,0,4)}}};h.updateResourceLoading=function(){const a=this._validMagnifier;if(!c.isNone(a)){var b=a.mask,e=a.overlay;!c.isSome(this._imageLoadTask)||this._imageLoadTask.mask===b&&this._imageLoadTask.overlay===e||(this._imageLoadTask.task.abort(),this._imageSources=this._imageLoadTask=null);c.isSome(this._imageSources)||
c.isSome(this._imageLoadTask)||(this._imageLoadTask={mask:b,overlay:e,task:D.createTask(async f=>{const k=c.isNone(b)||c.isNone(e)?L.loadMagnifierResources(f):null,d=c.isSome(b)?A.requestImage(b,{signal:f}):k.then(g=>g.mask);f=c.isSome(e)?A.requestImage(e,{signal:f}):k.then(g=>g.overlay);this._imageSources={mask:await d,overlay:await f};this.disposeResources();this.events.emit("request-render")})},this._imageLoadTask.task.promise.then(()=>this.notifyChange("updating"),()=>this.notifyChange("updating")))}};
h.updateResources=function(a,b){this.enabled?c.isSome(this._resources)?this._resources.textures.size!==b&&(a=this.createTextureResources(a,b),c.isNone(a)?this.disposeResources():(this.disposeTextureResources(this._resources.textures),this._resources.textures=a)):(b=this.createTextureResources(a,b),c.isNone(b)||(this._resources={textures:b,program:this.createProgram(a),vao:this.createVAO(a),pipelineState:v.makePipelineState({blending:v.simpleBlendingParams(1,771),depthTest:null,depthWrite:null,colorWrite:v.defaultColorWriteParams})})):
this.disposeResources()};h.disposeResources=function(){c.isNone(this._resources)||(this.disposeTextureResources(this._resources.textures),this._resources.program.dispose(),this._resources.vao.dispose(),this._resources=null)};h.disposeTextureResources=function(a){a.mask.dispose();a.overlay.dispose();a.input.dispose()};h.createTextureResources=function(a,b){if(c.isNone(this._imageSources))return null;this._imageSources.overlay.width=b;this._imageSources.overlay.height=b;this._imageSources.mask.width=
b;this._imageSources.mask.height=b;const e=new w(a,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!0},this._imageSources.overlay),f=new w(a,{target:3553,pixelFormat:6406,internalFormat:6406,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!0},this._imageSources.mask);return{input:new w(a,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!1}),mask:f,overlay:e,size:b}};h.createProgram=
function(a){const b=K.build();return new H(a,b.generateSource("vertex"),b.generateSource("fragment"),this.attributeLocations)};h.createVAO=function(a){return J.createQuadVAO(a,I.Pos2,this.attributeLocations,0,1)};y._createClass(r,[{key:"updating",get:function(){return c.isNone(this._imageSources)&&c.isSome(this._imageLoadTask)&&!this._imageLoadTask.task.finished}},{key:"magnifier",get:function(){return this._magnifier},set:function(a){a!==this._magnifier&&(this._handles.removeAll(),this._magnifier=
a,a=()=>{this.updateResourceLoading();this.events.emit("request-render")},c.isSome(this._magnifier)&&this._handles.add(this._magnifier.watch("version",a)),a())}},{key:"enabled",get:function(){return c.isSome(this._validMagnifier)}},{key:"_validMagnifier",get:function(){return c.isSome(this._magnifier)&&this._magnifier.visible&&c.isSome(this._magnifier.position)&&0<this._magnifier.size?this._magnifier:null}},{key:"factor",get:function(){return c.isSome(this._magnifier)?this._magnifier.factor||1:1}},
{key:"attributeLocations",get:function(){return{position:0}}}]);return r}(E);q.__decorate([t.property()],l.MagnifierHelper.prototype,"_imageSources",void 0);q.__decorate([t.property()],l.MagnifierHelper.prototype,"_imageLoadTask",void 0);q.__decorate([t.property({readOnly:!0,dependsOn:["_imageSources","_imageLoadTask"]})],l.MagnifierHelper.prototype,"updating",null);l.MagnifierHelper=q.__decorate([C.subclass("esri/views/3d/webgl-engine/lib/MagnifierHelper")],l.MagnifierHelper);Object.defineProperty(l,
"__esModule",{value:!0})});