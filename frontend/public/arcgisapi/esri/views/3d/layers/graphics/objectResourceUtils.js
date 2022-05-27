// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../core/maybe ../../../../chunks/vec3f64 ../../../../chunks/vec3 ../../../../core/devEnvironmentUtils ../../../../chunks/mat4 ../../../../chunks/mat3f64 ../../../../chunks/mat4f64 ../../../../chunks/mat3 ../../support/buffer/BufferView ../../../../chunks/vec32 ../../../../geometry/support/aaBoundingBox ../../webgl-engine/lib/GeometryData ../../webgl-engine/lib/Geometry ../../webgl-engine/materials/DefaultMaterial ../../webgl-engine/lib/Texture ../../glTF/DefaultLoadingContext ../../../../chunks/vec22 ../../../../chunks/vec33 ../../../../chunks/vec43 ../../support/buffer/utils ../../glTF/loader ../../glTF/internal/indexUtils ./wosrLoader ../../../../chunks/vec42".split(" "),
function(H,e,K,w,S,T,U,V,O,q,I,L,W,X,B,E,Y,Z,aa,P,C,ba,M,Q,N){function R(c){const g=c.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return g?{fileType:"gltf",url:g[1],specifiedLodIndex:null!=g[4]?Number(g[4]):null}:c.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:c,specifiedLodIndex:null}:{fileType:"unknown",url:c,specifiedLodIndex:null}}function J(c,g,n,t){const p=c.model,x=U.create(),r=[],u=new Map,h=new Map;p.lods.forEach((y,F)=>{if(void 0===t||F===t){var D=0,d={name:y.name,stageResources:{textures:[],
materials:[],geometries:[]},lodThreshold:e.isSome(y.lodThreshold)?y.lodThreshold:null,pivotOffset:[0,0,0],numberOfVertices:0,boundingBox:L.empty()};r.push(d);y.parts.forEach(b=>{var v=b.material+(b.attributes.normal?"_normal":"")+(b.attributes.color?"_color":"")+(b.attributes.texCoord0?"_texCoord0":"")+(b.attributes.tangent?"_tangent":"");const a=p.materials.get(b.material),m=e.isSome(b.attributes.texCoord0);var l=e.isSome(b.attributes.normal);if(!u.has(v)){if(m){if(e.isSome(a.textureColor)&&!h.has(a.textureColor)){var k=
p.textures.get(a.textureColor);h.set(a.textureColor,new E(k.data,a.textureColor,{...k.parameters,preMultiplyAlpha:!0}))}e.isSome(a.textureNormal)&&!h.has(a.textureNormal)&&(k=p.textures.get(a.textureNormal),h.set(a.textureNormal,new E(k.data,a.textureNormal,{...k.parameters,preMultiplyAlpha:!0})));e.isSome(a.textureOcclusion)&&!h.has(a.textureOcclusion)&&(k=p.textures.get(a.textureOcclusion),h.set(a.textureOcclusion,new E(k.data,a.textureOcclusion,{...k.parameters,preMultiplyAlpha:!0})));e.isSome(a.textureEmissive)&&
!h.has(a.textureEmissive)&&(k=p.textures.get(a.textureEmissive),h.set(a.textureEmissive,new E(k.data,a.textureEmissive,{...k.parameters,preMultiplyAlpha:!0})));e.isSome(a.textureMetallicRoughness)&&!h.has(a.textureMetallicRoughness)&&(k=p.textures.get(a.textureMetallicRoughness),h.set(a.textureMetallicRoughness,new E(k.data,a.textureMetallicRoughness,{...k.parameters,preMultiplyAlpha:!0})))}k=Math.pow(a.color[0],1/B.COLOR_GAMMA);var z=Math.pow(a.color[1],1/B.COLOR_GAMMA),A=Math.pow(a.color[2],1/B.COLOR_GAMMA),
f=Math.pow(a.emissiveFactor[0],1/B.COLOR_GAMMA),G=Math.pow(a.emissiveFactor[1],1/B.COLOR_GAMMA);const ca=Math.pow(a.emissiveFactor[2],1/B.COLOR_GAMMA);u.set(v,new B.DefaultMaterial({...g,transparent:"BLEND"===a.alphaMode,textureAlphaMode:da(a.alphaMode),textureAlphaCutoff:a.alphaCutoff,diffuse:[k,z,A],ambient:[k,z,A],opacity:a.opacity,doubleSided:a.doubleSided,doubleSidedType:"winding-order",cullFace:a.doubleSided?0:2,vertexColors:!!b.attributes.color,vertexTangents:!!b.attributes.tangent,normals:l?
"default":"screenDerivative",castShadows:!0,receiveSSAO:!0,textureId:e.isSome(a.textureColor)&&m?h.get(a.textureColor).id:void 0,colorMixMode:a.colorMixMode,normalTextureId:e.isSome(a.textureNormal)&&m?h.get(a.textureNormal).id:void 0,textureAlphaPremultiplied:!0,occlusionTextureId:e.isSome(a.textureOcclusion)&&m?h.get(a.textureOcclusion).id:void 0,emissiveTextureId:e.isSome(a.textureEmissive)&&m?h.get(a.textureEmissive).id:void 0,metallicRoughnessTextureId:e.isSome(a.textureMetallicRoughness)&&m?
h.get(a.textureMetallicRoughness).id:void 0,emissiveFactor:[f,G,ca],mrrFactors:[a.metallicFactor,a.roughnessFactor,g.mrrFactors[2]],isSchematic:!1,...n},v))}a:{l=b.indices||b.attributes.position.count;switch(b.primitiveType){case 4:l=M.trianglesToTriangles(l);break a;case 5:l=M.triangleStripToTriangles(l);break a;case 6:l=M.triangleFanToTriangles(l);break a}l=void 0}k=l;z={};A={};l=b.attributes.position.count;f=C.createBuffer(q.BufferViewVec3f,l);I.transformMat4(f,b.attributes.position,b.transform);
A.position={data:f.typedBuffer,size:f.elementCount};z.position=k;e.isSome(b.attributes.normal)&&(f=C.createBuffer(q.BufferViewVec3f,l),O.normalFromMat4(x,b.transform),I.transformMat3(f,b.attributes.normal,x),A.normal={data:f.typedBuffer,size:f.elementCount},z.normal=k);e.isSome(b.attributes.tangent)&&(f=C.createBuffer(q.BufferViewVec4f,l),O.normalFromMat4(x,b.transform),N.transformMat3(f,b.attributes.tangent,x),A.tangent={data:f.typedBuffer,size:f.elementCount},z.tangent=k);e.isSome(b.attributes.texCoord0)&&
(f=C.createBuffer(q.BufferViewVec2f,l),Z.normalizeIntegerBuffer(f,b.attributes.texCoord0),A.uv0={data:f.typedBuffer,size:f.elementCount},z.uv0=k);e.isSome(b.attributes.color)&&(f=C.createBuffer(q.BufferViewVec4u8,l),4===b.attributes.color.elementCount?b.attributes.color instanceof q.BufferViewVec4f?N.scale(f,b.attributes.color,255):b.attributes.color instanceof q.BufferViewVec4u8?P.copy(f,b.attributes.color):b.attributes.color instanceof q.BufferViewVec4u16&&N.scale(f,b.attributes.color,1/256):(P.fill(f,
255,255,255,255),G=new q.BufferViewVec3u8(f.buffer,0,4),b.attributes.color instanceof q.BufferViewVec3f?I.scale(G,b.attributes.color,255):b.attributes.color instanceof q.BufferViewVec3u8?aa.copy(G,b.attributes.color):b.attributes.color instanceof q.BufferViewVec3u16&&I.scale(G,b.attributes.color,1/256)),A.color={data:f.typedBuffer,size:f.elementCount},z.color=k);b=new X(new W.GeometryData(A,z),`gltf_${y.name}_${D++}`);d.stageResources.geometries.push(b);d.stageResources.materials.push(u.get(v));m&&
(e.isSome(a.textureColor)&&d.stageResources.textures.push(h.get(a.textureColor)),e.isSome(a.textureNormal)&&d.stageResources.textures.push(h.get(a.textureNormal)),e.isSome(a.textureOcclusion)&&d.stageResources.textures.push(h.get(a.textureOcclusion)),e.isSome(a.textureEmissive)&&d.stageResources.textures.push(h.get(a.textureEmissive)),e.isSome(a.textureMetallicRoughness)&&d.stageResources.textures.push(h.get(a.textureMetallicRoughness)));d.numberOfVertices+=l;v=b.boundingInfo;L.expandWithVec3(d.boundingBox,
v.getBBMin());L.expandWithVec3(d.boundingBox,v.getBBMax())})}});return r}function da(c){switch(c){case "BLEND":return 0;case "MASK":return 2;case "OPAQUE":return 1;default:return 0}}H.fetch=async function(c,g){var n=R(S.adjustStaticAGOUrl(c));if("wosr"===n.fileType)return c=await (g.cache?g.cache.loadWOSR(n.url,g):Q.load(n.url,g)),n=Q.processLoadResult(c,g),{lods:[n],referenceBoundingBox:n.boundingBox,isEsriSymbolResource:!1,isWosr:!0,remove:c.remove};c=await (g.cache?g.cache.loadGLTF(n.url,g):ba.load(new Y.DefaultLoadingContext(g.streamDataRequester),
n.url,g));var t=e.get(c.model.meta,"ESRI_proxyEllipsoid");if(c.meta.isEsriSymbolResource&&e.isSome(t)&&-1!==c.meta.uri.indexOf("/RealisticTrees/"))a:for(var p=0;p<c.model.lods.length;++p){var x=c.model.lods[p];c.customMeta.esriTreeRendering=!0;for(var r of x.parts){x=r.attributes.normal;if(e.isNone(x))break a;const h=r.attributes.position,y=h.count,F=K.create(),D=K.create(),d=K.create(),b=C.createBuffer(q.BufferViewVec4u8,y),v=C.createBuffer(q.BufferViewVec3f,y),a=T.invert(V.create(),r.transform);
for(let m=0;m<y;m++){h.getVec(m,D);x.getVec(m,F);w.transformMat4(D,D,r.transform);w.subtract(d,D,t.center);w.divide(d,d,t.radius);const l=d[2];var u=w.length(d);u=Math.min(.45+.55*u*u,1);w.divide(d,d,t.radius);w.transformMat4(d,d,a);w.normalize(d,d);p+1!==c.model.lods.length&&1<c.model.lods.length&&(-1<l?w.lerp(d,d,F,.2):w.lerp(d,d,F,Math.min(-4*l-3.8,1)));v.setVec(m,d);b.set(m,0,255*u);b.set(m,1,255*u);b.set(m,2,255*u);b.set(m,3,255)}r.attributes.normal=v;r.attributes.color=b}}r=c.meta.isEsriSymbolResource?
{usePBR:g.usePBR,isSchematic:!1,treeRendering:c.customMeta.esriTreeRendering,mrrFactors:[0,1,.2]}:{usePBR:!0,isSchematic:!1,mrrFactors:[0,1,.5]};g={...g.materialParamsMixin,treeRendering:c.customMeta.esriTreeRendering};if(null!=n.specifiedLodIndex)return t=J(c,r,g,n.specifiedLodIndex),p=t[0].boundingBox,0!==n.specifiedLodIndex&&(p=J(c,r,g,0)[0].boundingBox),{lods:t,referenceBoundingBox:p,isEsriSymbolResource:c.meta.isEsriSymbolResource,isWosr:!1,remove:c.remove};n=J(c,r,g);return{lods:n,referenceBoundingBox:n[0].boundingBox,
isEsriSymbolResource:c.meta.isEsriSymbolResource,isWosr:!1,remove:c.remove}};H.gltfToEngineResources=J;H.parseUrl=R;Object.defineProperty(H,"__esModule",{value:!0})});