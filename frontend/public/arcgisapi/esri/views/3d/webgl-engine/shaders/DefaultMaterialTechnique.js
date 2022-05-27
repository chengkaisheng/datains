// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("require exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../chunks/tslib.es6 ../../../../chunks/vec3f64 ../core/shaderTechnique/ReloadableShaderModule ../core/shaderTechnique/ShaderTechnique ../core/shaderTechnique/ShaderTechniqueConfiguration ../lib/DefaultVertexAttributeLocations ../../../webgl/Program ../../../webgl/renderState ../core/shaderLibrary/util/View.glsl ../materials/internal/MaterialUtil ../core/shaderLibrary/Slice.glsl ../core/shaderLibrary/output/OutputHighlight.glsl ../core/shaderLibrary/shading/VisualVariables.glsl ../core/shaderLibrary/attributes/VerticalOffset.glsl ../lib/OrderIndependentTransparency ../lib/StencilUtils ../core/shaderLibrary/shading/ReadShadowMap.glsl ../core/shaderLibrary/util/DoublePrecision.glsl ../core/shaderLibrary/attributes/InstancedDoublePrecision.glsl ../core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl ../../../../chunks/DefaultMaterial.glsl".split(" "),
function(x,p,v,e,y,c,m,d,z,A,q,r,t,B,C,D,E,n,u,F,G,H,I,J){m=function(h){function k(){return h.apply(this,arguments)||this}v._inheritsLoose(k,h);var b=k.prototype;b.initializeProgram=function(g){var f=k.shader.get();const a=this.configuration;f=f.build({OITEnabled:0===a.transparencyPassType,output:a.output,viewingMode:g.viewingMode,receiveShadows:a.receiveShadows,slicePlaneEnabled:a.slicePlaneEnabled,sliceHighlightDisabled:a.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,symbolColor:a.symbolColors,
vvSize:a.vvSize,vvColor:a.vvColor,vvInstancingEnabled:!0,instanced:a.instanced,instancedColor:a.instancedColor,instancedDoublePrecision:a.instancedDoublePrecision,useOldSceneLightInterface:!1,pbrMode:a.usePBR?a.isSchematic?2:1:0,hasMetalnessAndRoughnessTexture:a.hasMetalnessAndRoughnessTexture,hasEmissionTexture:a.hasEmissionTexture,hasOcclusionTexture:a.hasOcclusionTexture,hasNormalTexture:a.hasNormalTexture,hasColorTexture:a.hasColorTexture,receiveAmbientOcclusion:a.receiveAmbientOcclusion,useCustomDTRExponentForWater:!1,
normalType:a.normalsTypeDerivate?3:0,doubleSidedMode:a.doubleSidedMode,vertexTangets:a.vertexTangents,attributeTextureCoordinates:a.hasMetalnessAndRoughnessTexture||a.hasEmissionTexture||a.hasOcclusionTexture||a.hasNormalTexture||a.hasColorTexture?1:0,textureAlphaPremultiplied:a.textureAlphaPremultiplied,attributeColor:a.vertexColors,screenSizePerspectiveEnabled:a.screenSizePerspective,verticalOffsetEnabled:a.verticalOffset,offsetBackfaces:a.offsetBackfaces,doublePrecisionRequiresObfuscation:G.doublePrecisionRequiresObfuscation(g.rctx),
alphaDiscardMode:a.alphaDiscardMode,supportsTextureAtlas:!1});return new A(g.rctx,f.generateSource("vertex"),f.generateSource("fragment"),z.Default3D)};b.bindPass=function(g,f,a){r.View.bindProjectionMatrix(this.program,a.camera.projectionMatrix);const l=this.configuration.output;7===l&&(this.program.setUniform1f("opacity",f.opacity),this.program.setUniform1f("layerOpacity",f.layerOpacity),this.program.setUniform4fv("externalColor",f.externalColor),this.program.setUniform1i("colorMixMode",t.colorMixModes[f.colorMixMode]));
0===l?(a.lighting.setUniforms(this.program,!1),this.program.setUniform3fv("ambient",f.ambient),this.program.setUniform3fv("diffuse",f.diffuse),this.program.setUniform4fv("externalColor",f.externalColor),this.program.setUniform1i("colorMixMode",t.colorMixModes[f.colorMixMode]),this.program.setUniform1f("opacity",f.opacity),this.program.setUniform1f("layerOpacity",f.layerOpacity),this.configuration.usePBR&&I.PhysicallyBasedRenderingParameters.bindUniforms(this.program,f,this.configuration.isSchematic)):
1===l||3===l?this.program.setUniform2fv("nearFar",a.camera.nearFar):4===l&&C.OutputHighlight.bindOutputHighlight(g,this.program,a);D.VisualVariables.bindUniformsForSymbols(this.program,f);E.VerticalOffset.bindUniforms(this.program,f,a);t.bindScreenSizePerspective(f.screenSizePerspective,this.program,"screenSizePerspectiveAlignment");2!==f.textureAlphaMode&&3!==f.textureAlphaMode||this.program.setUniform1f("textureAlphaCutoff",f.textureAlphaCutoff)};b.bindDraw=function(g){const f=this.configuration.instancedDoublePrecision?
y.fromValues(g.camera.viewInverseTransposeMatrix[3],g.camera.viewInverseTransposeMatrix[7],g.camera.viewInverseTransposeMatrix[11]):g.origin;r.View.bindViewCustomOrigin(this.program,f,g.camera.viewMatrix);(0===this.configuration.output||7===this.configuration.output||1===this.configuration.output&&this.configuration.screenSizePerspective||2===this.configuration.output&&this.configuration.screenSizePerspective||4===this.configuration.output&&this.configuration.screenSizePerspective)&&r.View.bindCamPosition(this.program,
f,g.camera.viewInverseTransposeMatrix);2===this.configuration.output&&this.program.setUniformMatrix4fv("viewNormal",g.camera.viewInverseTransposeMatrix);this.configuration.instancedDoublePrecision&&H.InstancedDoublePrecision.bindCustomOrigin(this.program,f);B.Slice.bindUniforms(this.program,this.configuration,g.slicePlane,f);0===this.configuration.output&&F.ReadShadowMap.bindViewCustomOrigin(this.program,g,f)};b.setPipeline=function(g,f){const a=this.configuration,l=3===g,w=2===g;return q.makePipelineState({blending:0!==
a.output&&7!==a.output||!a.transparent?null:l?n.blendingDefault:n.OITBlending(g),culling:K(a),depthTest:{func:n.OITDepthTest(g)},depthWrite:l||w?a.writeDepth&&q.defaultDepthWriteParams:null,colorWrite:q.defaultColorWriteParams,stencilWrite:a.sceneHasOcludees?u.stencilWriteMaskOn:null,stencilTest:a.sceneHasOcludees?f?u.stencilToolMaskBaseParams:u.stencilBaseAllZerosParams:null,polygonOffset:l||w?null:n.getOITPolygonOffset(a.enableOffset)})};b.initializePipeline=function(){this._occludeePipelineState=
this.setPipeline(this.configuration.transparencyPassType,!0);return this.setPipeline(this.configuration.transparencyPassType,!1)};b.getPipelineState=function(g){return g?this._occludeePipelineState:this.pipeline};return k}(m.ShaderTechnique);m.shader=new c.ReloadableShaderModule(J.DefaultMaterialShader,()=>new Promise(function(h,k){x(["./DefaultMaterial.glsl"],h,k)}));const K=h=>{var k=h.cullFace?0!==h.cullFace:h.slicePlaneEnabled?!1:!h.transparent&&!h.doubleSidedMode;return k&&{face:1===h.cullFace?
1028:1029,mode:2305}};c=function(h){function k(){var b=h.apply(this,arguments)||this;b.output=0;b.alphaDiscardMode=1;b.doubleSidedMode=0;b.isSchematic=!1;b.vertexColors=!1;b.offsetBackfaces=!1;b.symbolColors=!1;b.vvSize=!1;b.vvColor=!1;b.verticalOffset=!1;b.receiveShadows=!1;b.slicePlaneEnabled=!1;b.sliceHighlightDisabled=!1;b.receiveAmbientOcclusion=!1;b.screenSizePerspective=!1;b.textureAlphaPremultiplied=!1;b.hasColorTexture=!1;b.usePBR=!1;b.hasMetalnessAndRoughnessTexture=!1;b.hasEmissionTexture=
!1;b.hasOcclusionTexture=!1;b.hasNormalTexture=!1;b.instanced=!1;b.instancedColor=!1;b.instancedDoublePrecision=!1;b.vertexTangents=!1;b.normalsTypeDerivate=!1;b.writeDepth=!0;b.sceneHasOcludees=!1;b.transparent=!1;b.enableOffset=!0;b.cullFace=0;b.transparencyPassType=3;return b}v._inheritsLoose(k,h);return k}(d.ShaderTechniqueConfiguration);e.__decorate([d.parameter({count:8})],c.prototype,"output",void 0);e.__decorate([d.parameter({count:4})],c.prototype,"alphaDiscardMode",void 0);e.__decorate([d.parameter({count:3})],
c.prototype,"doubleSidedMode",void 0);e.__decorate([d.parameter()],c.prototype,"isSchematic",void 0);e.__decorate([d.parameter()],c.prototype,"vertexColors",void 0);e.__decorate([d.parameter()],c.prototype,"offsetBackfaces",void 0);e.__decorate([d.parameter()],c.prototype,"symbolColors",void 0);e.__decorate([d.parameter()],c.prototype,"vvSize",void 0);e.__decorate([d.parameter()],c.prototype,"vvColor",void 0);e.__decorate([d.parameter()],c.prototype,"verticalOffset",void 0);e.__decorate([d.parameter()],
c.prototype,"receiveShadows",void 0);e.__decorate([d.parameter()],c.prototype,"slicePlaneEnabled",void 0);e.__decorate([d.parameter()],c.prototype,"sliceHighlightDisabled",void 0);e.__decorate([d.parameter()],c.prototype,"receiveAmbientOcclusion",void 0);e.__decorate([d.parameter()],c.prototype,"screenSizePerspective",void 0);e.__decorate([d.parameter()],c.prototype,"textureAlphaPremultiplied",void 0);e.__decorate([d.parameter()],c.prototype,"hasColorTexture",void 0);e.__decorate([d.parameter()],
c.prototype,"usePBR",void 0);e.__decorate([d.parameter()],c.prototype,"hasMetalnessAndRoughnessTexture",void 0);e.__decorate([d.parameter()],c.prototype,"hasEmissionTexture",void 0);e.__decorate([d.parameter()],c.prototype,"hasOcclusionTexture",void 0);e.__decorate([d.parameter()],c.prototype,"hasNormalTexture",void 0);e.__decorate([d.parameter()],c.prototype,"instanced",void 0);e.__decorate([d.parameter()],c.prototype,"instancedColor",void 0);e.__decorate([d.parameter()],c.prototype,"instancedDoublePrecision",
void 0);e.__decorate([d.parameter()],c.prototype,"vertexTangents",void 0);e.__decorate([d.parameter()],c.prototype,"normalsTypeDerivate",void 0);e.__decorate([d.parameter()],c.prototype,"writeDepth",void 0);e.__decorate([d.parameter()],c.prototype,"sceneHasOcludees",void 0);e.__decorate([d.parameter()],c.prototype,"transparent",void 0);e.__decorate([d.parameter()],c.prototype,"enableOffset",void 0);e.__decorate([d.parameter({count:3})],c.prototype,"cullFace",void 0);e.__decorate([d.parameter({count:4})],
c.prototype,"transparencyPassType",void 0);p.DefaultMaterialTechnique=m;p.DefaultMaterialTechniqueConfiguration=c;Object.defineProperty(p,"__esModule",{value:!0})});