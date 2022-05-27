/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{i as e,b as t}from"./Logger.js";import{G as i}from"./PiUtils.glsl.js";import{D as r}from"./DefaultTextureUnits.js";class s extends i{constructor(e){super(e),this._textureIDs=new Set,this._textureRepository=e.textureRep,this._textureId=e.textureId,this._initTransparent=!!e.initTextureTransparent,this._texture=this._acquireIfNotUndefined(this._textureId),this._textureNormal=this._acquireIfNotUndefined(e.normalTextureId),this._textureEmissive=this._acquireIfNotUndefined(e.emissiveTextureId),this._textureOcclusion=this._acquireIfNotUndefined(e.occlusionTextureId),this._textureMetallicRoughness=this._acquireIfNotUndefined(e.metallicRoughnessTextureId)}dispose(){this._textureIDs.forEach((e=>this._textureRepository.release(e))),this._textureIDs.clear()}updateTexture(e){e!==this._textureId&&(this._releaseIfNotUndefined(this._textureId),this._textureId=e,this._texture=this._acquireIfNotUndefined(this._textureId))}bindTexture(t,i){e(this._texture)&&(i.setUniform1i("tex",r.DIFFUSE),t.bindTexture(this._texture.glTexture,r.DIFFUSE)),e(this._textureNormal)&&(i.setUniform1i("normalTexture",r.NORMAL),t.bindTexture(this._textureNormal.glTexture,r.NORMAL)),e(this._textureEmissive)&&(i.setUniform1i("texEmission",r.EMISSION),t.bindTexture(this._textureEmissive.glTexture,r.EMISSION)),e(this._textureOcclusion)&&(i.setUniform1i("texOcclusion",r.OCCLUSION),t.bindTexture(this._textureOcclusion.glTexture,r.OCCLUSION)),e(this._textureMetallicRoughness)&&(i.setUniform1i("texMetallicRoughness",r.METALLIC_ROUGHNESS),t.bindTexture(this._textureMetallicRoughness.glTexture,r.METALLIC_ROUGHNESS))}bindTextureScale(t,i){const r=e(this._texture)&&this._texture.glTexture;r&&r.descriptor.textureCoordinateScaleFactor?i.setUniform2fv("textureCoordinateScaleFactor",r.descriptor.textureCoordinateScaleFactor):i.setUniform2f("textureCoordinateScaleFactor",1,1)}_acquireIfNotUndefined(e){if(!t(e))return this._textureIDs.add(e),this._textureRepository.acquire(e,this._initTransparent)}_releaseIfNotUndefined(e){void 0!==e&&(this._textureIDs.delete(e),this._textureRepository.release(e))}}export{s as G};
