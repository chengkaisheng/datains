// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../../core/maybe ../../../../../core/Logger ../../../../../core/Error ../../../../webgl/Program ../../../../webgl/BufferObject ../../../../webgl/Texture ../../../../webgl/VertexArrayObject ../../../../webgl/Renderbuffer ../../../../webgl/FramebufferObject ../../../../webgl/ProgramCache ../../../../webgl/RenderingContext ../../../../webgl/ShaderCompiler ../enums ../VertexStream ../shaders/BlendPrograms".split(" "),function(p,w,m,q,C,D,x,E,F,G,y,H,I,z,A,r){const t=m.getLogger("esri.views.2d.engine.webgl.effects.blendEffects.BlendEffect");
m=function(){function u(){this._size=[0,0]}var h=u.prototype;h.dispose=function(a){this._backBufferTexture&&(this._backBufferTexture.dispose(),this._backBufferTexture=null);this._programCache&&(this._programCache.dispose(),this._programCache=null);this._quad&&(this._quad.dispose(),this._quad=null)};h.draw=function(a,b,d,g,k){const {context:c,drawPhase:n}=a;this._setupShader(c);g&&"normal"!==g&&n!==z.WGLDrawPhase.LABEL?this._drawBlended(a,b,d,g,k):(a=this._programCache.getProgram(r.blend,"normal"))?
(c.bindProgram(a),b.setSamplingMode(d),c.bindTexture(b,0),a.setUniform1i("u_layerTexture",0),a.setUniform1f("u_opacity",k),c.setBlendingEnabled(!0),c.setBlendFunction(1,771),b=this._quad,b.draw(),b.unbind()):t.error(new q("mapview-BlendEffect",'Error creating shader program for blend mode "normal"'))};h._drawBlended=function(a,b,d,g,k){const {context:c,state:n,pixelRatio:v,inFadeTransition:B}=a;var {size:e}=n,f=c.getBoundFramebufferObject();let l;w.isSome(f)?(e=f.descriptor,l=e.width,e=e.height):
(l=Math.round(v*e[0]),e=Math.round(v*e[1]));this._createOrResizeTexture(a,l,e);a=this._backBufferTexture;f.copyToTexture(0,0,l,e,0,0,a);c.setStencilTestEnabled(!1);c.setStencilWriteMask(0);c.setBlendingEnabled(!0);c.setDepthTestEnabled(!1);c.setDepthWriteEnabled(!1);(f=this._programCache.getProgram(r.blend,g))?(c.bindProgram(f),a.setSamplingMode(d),c.bindTexture(a,0),f.setUniform1i("u_backbufferTexture",0),b.setSamplingMode(d),c.bindTexture(b,1),f.setUniform1i("u_layerTexture",1),f.setUniform1f("u_opacity",
k),f.setUniform1f("u_inFadeOpacity",B?1:0),c.setBlendFunction(1,0),b=this._quad,b.draw(),b.unbind(),c.setBlendFunction(1,771)):t.error(new q("mapview-BlendEffect",`Error creating shader program for blend mode ${g}`))};h._setupShader=function(a){this._programCache||(this._programCache=new y(a),this._quad||(this._quad=new A(a,[-1,-1,1,-1,-1,1,1,1])))};h._createOrResizeTexture=function(a,b,d){({context:a}=a);if(null===this._backBufferTexture||b!==this._size[0]||d!==this._size[1])this._backBufferTexture?
this._backBufferTexture.resize(b,d):this._backBufferTexture=new x(a,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!1,width:b,height:d}),this._size[0]=b,this._size[1]=d};return u}();p.BlendEffect=m;Object.defineProperty(p,"__esModule",{value:!0})});