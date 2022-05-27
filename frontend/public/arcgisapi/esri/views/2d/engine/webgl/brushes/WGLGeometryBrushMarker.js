// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["../../../../../chunks/_rollupPluginBabelHelpers","../enums","../materialKey/MaterialKey","../Utils","./WGLGeometryBrush"],function(q,r,t,u,v){return function(k){function f(){return k.apply(this,arguments)||this}q._inheritsLoose(f,k);var g=f.prototype;g.dispose=function(){};g.getGeometryType=function(){return r.WGLGeometryType.MARKER};g.drawGeometry=function(d,l,b,h,a){const {context:e,painter:m,rendererInfo:c,state:n}=d,{indexCount:w,indexFrom:x,materialKey:y}=b;b=t.MarkerMaterialKey.load(y);
const {bufferLayouts:z,attributes:p}=u.createProgramDescriptor(b.data,{geometry:[{location:0,name:"a_pos",count:2,type:5122},{location:1,name:"a_vertexOffset",count:2,type:5122},{location:2,name:"a_texCoords",count:2,type:5123},{location:3,name:"a_bitSetAndDistRatio",count:4,type:5121},{location:4,name:"a_id",count:4,type:5121},{location:5,name:"a_color",count:4,type:5121,normalized:!0},{location:6,name:"a_outlineColor",count:4,type:5121,normalized:!0},{location:7,name:"a_sizeAndOutlineWidth",count:4,
type:5121}]});a=m.materialManager.getMaterialProgram(d,b,"materials/icon",p,a);h=this._getVAO(e,z,p,h);e.bindProgram(a);e.bindVAO(h);b.textureBinding&&m.textureManager.bindTextures(e,a,b,!0);this._setSharedUniforms(a,d,l);a.setUniformMatrix3fv("u_displayMat3",b.vvRotation?n.displayViewMat3:n.displayMat3);b.vvSizeMinMaxValue&&a.setUniform4fv("u_vvSizeMinMaxValue",c.vvSizeMinMaxValue);b.vvSizeScaleStops&&a.setUniform1f("u_vvSizeScaleStopsValue",c.vvSizeScaleStopsValue);b.vvSizeFieldStops&&(d=c.getSizeVVFieldStops(l.key.level),
a.setUniform1fv("u_vvSizeFieldStopsValues",d.values),a.setUniform1fv("u_vvSizeFieldStopsSizes",d.sizes));b.vvSizeUnitValue&&a.setUniform1f("u_vvSizeUnitValueWorldToPixelsRatio",c.vvSizeUnitValueToPixelsRatio);b.vvColor&&(a.setUniform1fv("u_vvColorValues",c.vvColorValues),a.setUniform4fv("u_vvColors",c.vvColors));b.vvOpacity&&(a.setUniform1fv("u_vvOpacityValues",c.vvOpacityValues),a.setUniform1fv("u_vvOpacities",c.vvOpacities));b.vvRotation&&a.setUniform1f("u_vvRotationType","geographic"===c.vvMaterialParameters.vvRotationType?
0:1);e.drawElements(4,w,5125,Uint32Array.BYTES_PER_ELEMENT*x);e.bindVAO(null)};return f}(v)});