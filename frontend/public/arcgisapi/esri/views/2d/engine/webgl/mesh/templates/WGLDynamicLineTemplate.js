// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../../../../chunks/_rollupPluginBabelHelpers ../../../../../../core/screenUtils ../../definitions ../../number ../../materialKey/MaterialKey ../../color ../../util/Result ./util ./WGLDynamicMeshTemplate ./WGLBaseLineTemplate".split(" "),function(t,l,m,n,u,p,v,f,w,x){return function(q){function g(a){var c=q.call(this,a)||this;c._cimLineLayer=a;let h=0;f.isFunction(a.width)||(h=.5*l.pt2px(a.width));c._dynamicPropertyMap.set("_halfWidth",(d,b,e)=>f.isFunction(a.width)?.5*l.pt2px(a.width(d,
b,e)):h);f.isFunction(a.cap)?c._dynamicPropertyMap.set("_capType",a.cap):c._capType=a.cap;f.isFunction(a.join)?c._dynamicPropertyMap.set("_joinType",a.join):c._joinType=a.join;if(f.isFunction(a.color))c._dynamicPropertyMap.set("_fillColor",(d,b,e)=>(d=a.color(d,b,e))&&p.premultiplyAlphaRGBA(d)||0);else{const d=a.color;c._fillColor=d&&p.premultiplyAlphaRGBA(d)||0}f.isFunction(a.miterLimit)?c._dynamicPropertyMap.set("_miterLimitCosine",(d,b,e)=>f.getLimitCosine(a.miterLimit(d,b,e))):c._miterLimitCosine=
f.getLimitCosine(a.miterLimit);c._scaleFactor=a.scaleFactor||1;c._isDashed=a.isDashed;c.effects=a.effects;c.tessellationProperties._bitset=a.colorLocked?1:0;c._materialKey=a.materialKey;c._initializeTessellator(!0);return c}t._inheritsLoose(g,q);g.fromCIMLine=function(a){return new g(a)};g.prototype.bindFeature=function(a,c,h){const d=a.readLegacyFeature();this._dynamicPropertyMap.forEach((e,k)=>{this[k]=e(d,c,h)});this._halfWidth*=this._scaleFactor;a=this._materialCache;var b=this._cimLineLayer.materialHash;
b=b(d,c,h);b=a.get(b);a=null;b&&v.ok(b.spriteMosaicItem)&&(a=b.spriteMosaicItem);if(a){this._hasPattern=!0;const {rect:e,width:k,height:y}=a;b=e.x+m.SPRITE_PADDING;const r=e.y+m.SPRITE_PADDING,z=b+k,A=r+y;this.tessellationProperties._tl=n.i1616to32(b,r);this.tessellationProperties._br=n.i1616to32(z,A)}else this._hasPattern=!1,this.tessellationProperties._tl=0,this.tessellationProperties._br=0;this.tessellationProperties._fillColor=this._fillColor;this.tessellationProperties._halfWidth=this._halfWidth;
this.tessellationProperties._halfReferenceWidth=this.tessellationProperties._halfWidth;b=u.LineMaterialKey.load(this._materialKey);a&&(b.sdf=a.sdf,b.pattern=!0,b.textureBinding=a.textureBinding);this._materialKey=b.data};return g}(x(w))});