// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../../chunks/_rollupPluginBabelHelpers ../../../../../core/has ../../../../../core/typedArrayUtil ../../../../../core/maybe ../../../../../core/arrayUtils ../../../../../core/promiseUtils ../../../../../core/mathUtils ../../../../../chunks/vec3f64 ../../../../../chunks/vec3 ../../../../../chunks/mat4 ../../../../../chunks/mat3f64 ../../../../../chunks/mat4f64 ../../../../../chunks/mat3 ../../../../webgl/BufferObject ../../../../webgl/VertexArrayObject ../Object3D ../GridLocalOriginFactory ../../core/shaderLibrary/attributes/VertexPosition.glsl ../../../../../chunks/vec33 ../../core/util/TwoVectorPosition ../TextureBackedBuffer/BufferManager ../localOriginHelper ../LocalOriginManager ./bufferLayouts ./edgeBufferWriters ./EdgeRenderer ./EdgeWorkerHandle ./strokes ./util".split(" "),
function(E,M,F,N,t,O,z,G,B,x,P,H,I,C,D,J,Q,R,S,T,U,V,W,X,v,K,w,Y,Z,r){function aa(u){let h=null,a=null;for(let b=0;b<u.geometries.length;b++){const c=u.geometryRecords[b];if(c.material.supportsEdges){if(!h)h=c.transformation;else if(!O.equals(h,c.transformation))return!1;if(!a&&c.origin)a=c;else if(a&&c.origin&&a.origin.id!==c.origin.id)return!1}}return!0}F=function(){function u(a,b,c,d){this.rctx=a;this.techniqueRepository=b;this.callbacks=c;this.profilingCallback=null;this.perObjectData=new Map;
this.renderers=new Map;this.localOrigins=new X.LocalOriginManager(new R);this.gpuMemoryUsage=this.numberOfRenderedEdges=0;this.workerAbort=z.createAbortController();this.destroyed=!1;this.tmpModelPosition=B.create();this.tmpCameraPosition=B.create();this.componentColorManager=new V.BufferManager(this.rctx,2);this.worker=new Y(d);a=v.VertexLayout.createBuffer(4);for(b=0;4>b;b++)a.sideness.set(b,0,0===b||3===b?0:1),a.sideness.set(b,1,0===b||1===b?0:1);this.verticesBufferObject=D.createVertex(this.rctx,
35044,a.buffer)}var h=u.prototype;h.destroy=function(){this.destroyed||(this.perObjectData.forEach((a,b)=>{this.perObjectData.delete(b);a.renderables.forEach(c=>{this.removeRenderable(c)})}),this.strokesTexture=t.disposeMaybe(this.strokesTexture),this.componentColorManager=t.destroyMaybe(this.componentColorManager),this.workerAbort.abort(),this.worker.destroy(),this.verticesBufferObject=t.disposeMaybe(this.verticesBufferObject),this.perObjectData.clear(),this.renderers.clear(),this.destroyed=!0)};
h.getUsedMemory=function(){return this.gpuMemoryUsage};h.shouldRender=function(){return 0<this.renderers.size};h.addComponentObject=async function(a,b,c,d,f,e,m,k){if(!this.hasObject(a)){var g;c=new L(z.create(l=>g=l),c);this.perObjectData.set(a,c);await this.addComponentGeometry(b,c,d,f,e,m,k);this.callbacks.setNeedsRender();g()}};h.addOrUpdateObject3D=async function(a,b,c,d){const f=[];let e;const m=new L(z.create(g=>e=g)),k=this.perObjectData.get(a);this.perObjectData.set(a,m);if(c.mergeGeometries&&
1<a.geometries.length&&aa(a))f.push(this.addObjectMergedGeometries(a,m,b,c,d));else for(let g=0;g<a.geometries.length;g++){const l=a.geometryRecords[g];l.material.supportsEdges&&f.push(this.addGeometryData(a,m,a.geometries[g].data,l,b[0],c,d))}await z.all(f);k&&k.waitLoaded(()=>{k.renderables.forEach(g=>this.removeRenderable(g));this.callbacks.setNeedsRender()});this.callbacks.setNeedsRender();e()};h.hasObject=function(a){return this.perObjectData.has(a)};h.updateAllComponentOpacities=async function(a,
b){const c=b instanceof Array?d=>b[d]:()=>b;(await this.getObjectEntry(a)).renderables.forEach(d=>{const f=d.components.meta.length;for(let e=0;e<f;e++){const m=c(e),k=d.components.meta[e],g=k.index;k.material.opacity=m;d.components.buffer.textureBuffer.setDataElement(g,1,3,255*m)}this.updateTransparency(d)});this.callbacks.setNeedsRender()};h.updateAllComponentMaterials=async function(a,b,c,d){const f=a instanceof Q,e=!!c.slicePlaneEnabled,m=r.determineRendererType(b),k=w.EdgeRenderer.getKey(m,e,
f);(await this.getObjectEntry(a)).renderables.forEach(g=>{if(k!==g.rendererKey){var l=this.renderers.get(g.rendererKey);const n=this.acquireRenderer(m,e,f);l.removeRenderable(g);l.refCount.decrement();g.rendererKey=k;n.addRenderable(g)}for(l=0;l<b.length;l++)g.components.meta[l].material=b[l];d&&this.updateComponentBuffer(g.components);this.updateTransparency(g)});this.callbacks.setNeedsRender()};h.updateObjectVisibility=async function(a,b){(await this.getObjectEntry(a)).renderables.forEach(c=>c.visible=
b);this.callbacks.setNeedsRender()};h.removeObject=function(a){const b=this.perObjectData.get(a);b&&(this.perObjectData.delete(a),b.waitLoaded(()=>{b.renderables.forEach(c=>this.removeRenderable(c));this.callbacks.setNeedsRender()}))};h.getObjectEntry=async function(a){a=this.perObjectData.get(a);if(!a)throw"no object";await a.loaded;return a};h.removeAll=function(){this.perObjectData.forEach((a,b)=>this.removeObject(b))};h.render=function(a,b){if(!t.isNone(this.componentColorManager)){this.localOrigins.updateViewMatrices(a.camera.viewMatrix);
var c=a.camera.viewInverseTransposeMatrix,d=B.create(),f=new U.TwoVectorPosition,e=new S.VertexPosition.ViewProjectionTransform,m=H.create();x.set(d,c[3],c[7],c[11]);f.set(d);x.copy(e.worldFromView_TH,f.high);x.copy(e.worldFromView_TL,f.low);C.fromMat4(e.viewFromCameraRelative_RS,a.camera.viewMatrix);P.copy(e.projFromView,a.camera.projectionMatrix);c=H.create();C.transpose(c,e.viewFromCameraRelative_RS);C.invert(m,c);this.renderers.forEach(n=>{0===n.refCount.value&&(this.renderers.delete(n.key),n.dispose())});
this.componentColorManager.garbageCollect();this.componentColorManager.updateTextures();var k=0,g=0;this.renderers.forEach(n=>n.forEachRenderable(p=>{k+=p.statistics.averageEdgeLength;g++},b));if(0!==g){c=40*k/g;d=r.estimateLengthAtDistance(a.camera.fullViewport[3],a.camera.fovY,1,3.5*a.camera.pixelRatio);var l={distanceFalloffFactor:c,minimumEdgeLength:d,transparency:b,viewProjectionTransform:e,transformNormal_ViewFromGlobal:m};this.updateObjectCameraDistances(a);this.numberOfRenderedEdges=0;this.renderers.forEach(n=>
{this.renderRegularEdges(n,a,l);this.renderSilhouetteEdges(n,a,l)})}}};h.updateTransparency=function(a){const b=r.determineEdgeTransparency(a.components.meta),c=r.determineObjectTransparency(a.components.meta);if(b!==a.edgeTransparency||c!==a.objectTransparency)a.edgeTransparency=b,a.objectTransparency=c,this.renderers.get(a.rendererKey).setRenderablesDirty()};h.computeModelTransformWithLocalOrigin=function(a,b,c){a.getCombinedStaticTransformation(b,c);b.origin?this.localOrigins.register(b.origin):
(a=x.set(this.tmpModelPosition,c[12],c[13],c[14]),b.origin=this.localOrigins.acquire(a));W.applyToModelMatrix(b.origin.vec3,c);return c};h.updateComponentBuffer=function(a){const {meta:b,buffer:c}=a;for(a=0;a<b.length;a++){var d=b[a].material;const f=b[a].index,e=G.clamp(Math.round(d.size*w.LINE_WIDTH_FRACTION_FACTOR),0,255),m=G.clamp(d.extensionLength,-w.EXTENSION_LENGTH_OFFSET,255-w.EXTENSION_LENGTH_OFFSET)+w.EXTENSION_LENGTH_OFFSET,k="solid"===d.type?0:1,g=255*d.opacity;d=d.color;c.textureBuffer.setData(f,
0,255*d[0],255*d[1],255*d[2],255*d[3]);c.textureBuffer.setData(f,1,e,m,k,g)}};h.createComponentBuffers=function(a){if(t.isNone(this.componentColorManager))return null;const b=[],c=this.componentColorManager.getBuffer(a.length);for(let d=0;d<a.length;d++){const f=a[d],e=c.acquireIndex();b.push({index:e,material:f})}a={meta:b,buffer:c};this.updateComponentBuffer(a);return a};h.extractEdges=function(a,b,c,d,f){return this.worker.process({data:b,originalIndices:f,writerSettings:a,skipDeduplicate:c},this.workerAbort.signal,
d)};h.createEdgeResources=function(a){const b={};if(t.isNone(this.verticesBufferObject))return b;if(0<a.regular.lodInfo.lengths.length){var c=new J(this.rctx,v.EdgeShaderAttributeLocations,{vertices:v.glVertexLayout,instances:K.RegularEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:D.createVertex(this.rctx,35044,a.regular.instancesData.buffer)});b.regular={vao:c,lod:a.regular.lodInfo}}0<a.silhouette.lodInfo.lengths.length&&(c=new J(this.rctx,v.EdgeShaderAttributeLocations,
{vertices:v.glVertexLayout,instances:K.SilhouetteEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:D.createVertex(this.rctx,35044,a.silhouette.instancesData.buffer)}),b.silhouette={vao:c,lod:a.silhouette.lodInfo});return b};h.addGeometryData=async function(a,b,c,d,f,e,m){const k=c.getAttribute("position");a=this.computeModelTransformWithLocalOrigin(a,d,I.create());d=d.origin;c={position:k,indices:c.getIndices("position"),modelTransform:a,origin:d};return this.addPositionData(b,
c,f,e,m)};h.addPositionData=async function(a,b,c,d,f=!1){var e=this.createComponentBuffers([c]);if(!t.isNone(e)){c=this.acquireRenderer(c.type,!!d.slicePlaneEnabled);var {modelTransform:m,origin:k,indices:g}=b;b=b.position;d=b.data.length/b.strideIdx;var l=v.EdgeInputBufferLayout.createBuffer(d);for(let q=0;q<d;q++)l.position.set(q,0,b.data[b.offsetIdx+q*b.strideIdx+0]),l.position.set(q,1,b.data[b.offsetIdx+q*b.strideIdx+1]),l.position.set(q,2,b.data[b.offsetIdx+q*b.strideIdx+2]);r.fillComponenBufferIndices(e.meta,
[0,l.componentIndex.count],l.componentIndex);b=await this.extractEdges(c.writerSettings,l,!1,f,g);var {regular:n,silhouette:p}=this.createEdgeResources(b);f=(n?n.vao.size:0)+(p?p.vao.size:0);e={regular:n,silhouette:p,transform:{modelMatrix:m,origin:k},statistics:{gpuMemoryUsage:f,averageEdgeLength:b.averageEdgeLength},components:e,visible:!0,edgeTransparency:r.determineEdgeTransparency(e.meta),objectTransparency:r.determineObjectTransparency(e.meta),distanceToCamera:0,rendererKey:c.key};a.renderables.push(e);
c.addRenderable(e);this.gpuMemoryUsage+=f}};h.addComponentGeometry=async function(a,b,c,d,f,e,m){const k=this.createComponentBuffers(e);if(!t.isNone(k)){e=r.determineRendererType(e);m=this.acquireRenderer(e,m.slicePlaneEnabled||!1,!1);e=v.EdgeInputBufferLayout.createBuffer(c.count);T.copy(e.position,c);r.fillComponenBufferIndices(k.meta,f,e.componentIndex,d);d=await this.extractEdges(m.writerSettings,e,!0,!1,d);var {regular:g,silhouette:l}=this.createEdgeResources(d);c=(g?g.vao.size:0)+(l?l.vao.size:
0);a={regular:g,silhouette:l,transform:a,statistics:{gpuMemoryUsage:c,averageEdgeLength:d.averageEdgeLength},components:k,visible:!0,edgeTransparency:r.determineEdgeTransparency(k.meta),objectTransparency:r.determineObjectTransparency(k.meta),distanceToCamera:0,rendererKey:m.key};b.renderables.push(a);m.addRenderable(a);this.gpuMemoryUsage+=c}};h.addObjectMergedGeometries=async function(a,b,c,d,f){var e=new Map,m=0,k=null,g=null;for(var l=0;l<a.geometries.length;l++){var n=a.geometries[l],p=a.geometryRecords[l];
p.material.supportsEdges&&(!g&&p.origin&&(g=p),n=n.data.getIndices("position"),m+=n?n.length:0,n&&null==k||k===Uint16Array)&&(k=N.isUint16Array(n)?Uint16Array:Uint32Array)}m=m?new k(m):null;k=[];l=0;for(n=0;n<a.geometries.length;n++){var q=a.geometries[n];if(!a.geometryRecords[n].material.supportsEdges)continue;p=q.data.getAttribute("position");q=q.data.getIndices("position");let A=e.get(p.data);if(null==A){A=k.length/3;for(let y=p.offsetIdx;y<p.data.length;y+=p.strideIdx)k.push(p.data[y+0]),k.push(p.data[y+
1]),k.push(p.data[y+2]);e.set(p.data,A)}if(q)for(p=0;p<q.length;p++)m[l++]=A+q[p]}g=g||a.geometryRecords[0];e=this.computeModelTransformWithLocalOrigin(a,g,I.create());g=g.origin;for(l=0;l<a.geometryRecords.length;l++)a.geometryRecords[l].origin=g;await this.addPositionData(b,{position:{data:k,offsetIdx:0,strideIdx:3},indices:m,modelTransform:e,origin:g},c[0],d,f)};h.acquireRenderer=function(a,b,c=!0){const d=w.EdgeRenderer.getKey(a,b,c);let f=this.renderers.get(d);t.isNone(this.strokesTexture)&&
(this.strokesTexture=Z.generateStrokesTexture(this.rctx));f||(f=new w.EdgeRenderer(this.rctx,this.techniqueRepository,{type:a,slicePlaneEnabled:b,strokesTexture:this.strokesTexture,legacy:c}),this.renderers.set(d,f));f.refCount.increment();return f};h.removeRenderable=function(a){const b=this.renderers.get(a.rendererKey);if(b){b.removeRenderable(a);b.refCount.decrement();a.regular&&(a.regular.vao.vertexBuffers.instances.dispose(),a.regular.vao.dispose(!1),a.regular.vao=null);a.silhouette&&(a.silhouette.vao.vertexBuffers.instances.dispose(),
a.silhouette.vao.dispose(!1),a.silhouette.vao=null);"origin"in a.transform&&this.localOrigins.release(a.transform.origin);this.gpuMemoryUsage-=a.statistics.gpuMemoryUsage;for(const c of a.components.meta)a.components.buffer.releaseIndex(c.index)}};h.updateObjectCameraDistances=function(a){a=a.camera.viewInverseTransposeMatrix;x.set(this.tmpCameraPosition,a[3],a[7],a[11]);this.perObjectData.forEach((b,c)=>{c=t.isSome(b.center)?b.center:c.getCenter();const d=x.distance(c,this.tmpCameraPosition);b.renderables.forEach(f=>
f.distanceToCamera=d)})};h.renderRegularEdges=function(a,b,c){a.bindRegularEdges(b,c);a.forEachRenderable(d=>{if(d.visible&&d.regular){var f=r.computeEdgeCount(d.regular.lod.lengths,d.distanceToCamera,c);"origin"in d.transform&&(b.localViewMatrixForEdges=this.localOrigins.getViewMatrix(d.transform.origin));a.renderRegularEdges(d,b,f);this.numberOfRenderedEdges+=f}},c.transparency)};h.renderSilhouetteEdges=function(a,b,c){a.bindSilhouetteEdges(b,c);a.forEachRenderable(d=>{if(d.visible&&d.silhouette){var f=
r.computeEdgeCount(d.silhouette.lod.lengths,d.distanceToCamera,c);"origin"in d.transform&&(b.localViewMatrixForEdges=this.localOrigins.getViewMatrix(d.transform.origin));a.renderSilhouetteEdges(d,b,f);this.numberOfRenderedEdges+=f}},c.transparency)};M._createClass(u,[{key:"numberOfRenderedPrimitives",get:function(){return this.numberOfRenderedEdges}}]);return u}();let L=function(){function u(h,a=null){this.center=a;this.renderables=[];this.loaded=h;this.loaded.then(()=>this.loaded=!0)}u.prototype.waitLoaded=
function(h){!0===this.loaded?h():this.loaded.then(()=>h())};return u}();E.EdgeView=F;Object.defineProperty(E,"__esModule",{value:!0})});