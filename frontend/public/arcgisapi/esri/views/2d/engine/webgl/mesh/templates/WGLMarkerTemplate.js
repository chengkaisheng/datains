// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../../../../chunks/_rollupPluginBabelHelpers ../../../../../../core/maybe ../../../../../../core/screenUtils ../../definitions ../../../../../../chunks/mat2df32 ../../../../../../chunks/vec2f32 ../../number ../../materialKey/MaterialKey ../../color ./WGLMeshTemplate ./WGLBaseMarkerTemplate".split(" "),function(E,F,k,x,G,H,r,I,t,J,K){return function(D){function n(a,d,g,l,h,c,m,f,p,y,z,A,B,u,e,v,q,C,w,L,M){var b=D.call(this)||this;b.angle=l;b.height=m;b.width=c;b.xOffset=d*w;b.yOffset=
g*w;b._markerPlacement=L;b.effects=M;b._anchorX=.5-(.5+v)*e.width/e.width;b._anchorY=.5-(.5+q)*e.height/e.height;d=(1===u?1:0)|(z?1:0)<<1|(B?1:0)<<2|(A?1:0)<<3;g=e&&e.sdf;a=I.MarkerMaterialKey.load(a);a.sdf=g;a.pattern=!0;a.textureBinding=e.textureBinding;b._materialKey=a.data;b._fillColor=h;b._outlineColor=p;b._sizeOutlineWidth=r.i8888to32(Math.round(Math.min(Math.sqrt(128*c),255)),Math.round(Math.min(Math.sqrt(128*m),255)),Math.round(Math.min(Math.sqrt(128*y),255)),Math.round(Math.min(Math.sqrt(128*
f),255)));h=e.rect.x+x.SPRITE_PADDING;f=e.rect.y+x.SPRITE_PADDING;p=h+e.width;e=f+e.height;b._texUpperLeft=r.i1616to32(h,f);b._texUpperRight=r.i1616to32(p,f);b._texBottomLeft=r.i1616to32(h,e);b._texBottomRight=r.i1616to32(p,e);c=c*C*w;m=m*C*w;b._bitestAndDistRatio=r.i8888to32(0,0,d,Math.round(Math.min(64*C,255)));b._computedWidth=c;b._computedHeight=m;c=H.create();m=G.create();b._applyTransformation(m,c);return b}E._inheritsLoose(n,D);n.fromCIMMarker=function(a,d){const g=a.size,l=(d&&d.width||1)/
(d&&d.height||1)*a.scaleX;var h=a.scaleSymbolsProportionally&&a.frameHeight?g/a.frameHeight:1;const c=t.premultiplyAlphaRGBA(a.color),m=t.premultiplyAlphaRGBA(a.outlineColor),f=k.pt2px(g),p=f*l,y=k.pt2px(a.offsetX||0),z=k.pt2px(a.offsetY||0);h*=k.pt2px(a.outlineWidth||0);const A=a.alignment||0,B=k.pt2px(a.referenceSize);let u=a.rotation||0;a.rotateClockwise||(u=-u);let e=0,v=0;const q=a.anchorPoint;q&&(a.isAbsoluteAnchorPoint?g&&(e=-q.x/(g*l),v=q.y/g):(e=q.x,v=q.y));return new n(a.materialKey,y,z,
u,c,p,f,B,m,h,a.colorLocked,a.scaleSymbolsProportionally,!1,A,d,e,v,a.sizeRatio,F.unwrapOr(a.scaleFactor,1),a.markerPlacement,a.effects)};n.fromPictureMarker=function(a,d){const g=Math.round(k.pt2px(a.width)),l=Math.round(k.pt2px(a.height)),h=x.PICTURE_FILL_COLOR,c=Math.round(k.pt2px(a.xoffset||0)),m=Math.round(k.pt2px(a.yoffset||0));return new n(a.materialKey,c,m,a.angle,h,g,l,l,0,0,!1,!1,!1,0,d,0,0,1,1,null,null)};n.fromSimpleMarker=function(a,d){const g=t.premultiplyAlphaRGBAArray(a.color),l=Math.round(k.pt2px(a.size)),
h=Math.round(k.pt2px(a.xoffset||0)),c=Math.round(k.pt2px(a.yoffset||0)),m=a.style;var f=a.outline;const p=(f&&f.color&&t.premultiplyAlphaRGBAArray(f.color))|0;f=(f&&f.width&&Math.round(k.pt2px(f.width)))|0;a=new n(a.materialKey,h,c,a.angle,g,l,l,l,p,f,!1,!1,"esriSMSCross"===m||"esriSMSX"===m,0,d,0,0,1.96875,1,null,null);a.boundsType="esriSMSCircle"===m?"circle":"square";return a};n.fromLineSymbolMarker=function(a,d){const g=t.premultiplyAlphaRGBAArray(a.color),l=Math.round(k.pt2px(6*a.lineWidth)),
h="cross"===a.style||"x"===a.style;switch(a.placement){case "begin-end":var c="Both";break;case "begin":c="JustBegin";break;case "end":c="JustEnd";break;default:c="None"}c={type:"CIMMarkerPlacementAtExtremities",angleToLine:!0,offset:0,extremityPlacement:c,offsetAlongLine:0};d=new n(a.materialKey,0,0,0,g,l,l,l/6,g,h?Math.round(k.pt2px(a.lineWidth)):0,!1,!1,h,1,d,0,0,1.96875,1,c,null);d.boundsType="circle"===a.style?"circle":"square";return d};return n}(K(J))});