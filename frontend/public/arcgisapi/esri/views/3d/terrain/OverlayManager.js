// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../chunks/_rollupPluginBabelHelpers ../../../chunks/tslib.es6 ../../../core/has ../../../core/maybe ../../../core/Logger ../../../core/accessorSupport/ensureType ../../../core/accessorSupport/decorators/property ../../../core/jsonMap ../../../core/accessorSupport/decorators/subclass ../../../core/urlUtils ../../../core/uuid ../../../portal/support/resourceExtension ../../../core/scheduling ../../../core/Accessor ../../../core/mathUtils ../../../chunks/vec3f64 ../../../chunks/vec3 ../support/mathUtils ../../../core/Handles ../../../geometry/projectionEllipsoid ../../../core/unitUtils ../../../layers/support/timeUtils ../../../geometry/support/aaBoundingRect ../../../geometry/projection ../../support/Scheduler ../../../chunks/vec4f64 ../../../chunks/vec2 ../../../chunks/vec4 ../support/geometryUtils ../webgl-engine/lib/Intersector ../state/utils/viewUtils ../support/debugFlags ../webgl-engine/lib/localOrigin ./OverlayRenderer ../support/debugUtils ../support/animationUtils ../webgl-engine/parts/requireUtils".split(" "),
function(m,I,p,P,l,ja,ka,q,la,Q,ma,na,oa,R,S,A,J,B,F,T,K,L,U,h,G,V,M,W,y,C,X,Y,H,Z,aa,ba,ca,da){function ea(u,r){const f=H.TESTS_DISABLE_UPDATE_THRESHOLDS?0:1E-5*Math.max(u[2]-u[0],u[3]-u[1],r[2]-r[0],r[3]-r[1]);for(let a=0;4>a;a++)if(Math.abs(r[a]-u[a])>f)return!0;return!1}const fa=[[-.1,-2,3.9,2],[-.1,-3.9,3.9,.1],[-2,-3.9,2,.1],[-3.9,-3.9,.1,.1],[-3.9,-2,.1,2],[-3.9,-.1,.1,3.9],[-2,-.1,2,3.9],[-.1,-.1,3.9,3.9]];let v;m.OverlayManager=function(u){function r(a){a=u.call(this,a)||this;a._handles=
new T;a._overlaySR=null;a._renderSR=null;a._overlaySREqualsRenderSR=!0;a._drapeSources=new Map;a._drapeTargets=new Set;a._drapeSourceTypes=[0,0];a._drapeTargetTypes=[0,0];a._renderedAltitude=0;a._placementDirty=!1;a._drawTexturesDirty=!1;a._drawTexturesAnimateDirty=!1;a._layerViewsDirty=!0;a._hasUnusedRenderTargets=!1;a._isSpherical=!1;a._longitudeCyclical=null;a._latestOriginId=0;a._maxResolution=P("esri-mobile")?2048:4096;a._animationTimeLast=0;a._forceAnimation=!1;return a}I._inheritsLoose(r,u);
var f=r.prototype;f.initialize=function(){const a=this.view._stage.renderView,b=this.view.state.isGlobal&&l.isSome(this._overlaySR)?L.getMetersPerUnitForSR(this._overlaySR):1;this.renderer=new aa.OverlayRenderer({renderView:a,globalUnitScale:b});this._drapeTargetTypes[0]++;this.renderer.onHasHighlightsChanged=()=>{this._setDrawTexturesDirty();this.notifyChange("hasHighlights")};this.renderer.onRendersOccludedChanged=()=>{this._setDrawTexturesDirty();this.notifyChange("rendersOccluded")};this.renderer.onContentChanged=
()=>{this._setDrawTexturesDirty()};this.groundIntersector=new X.Intersector(this.view.state.mode);this.groundIntersector.options.backfacesTerrain=!0;this.groundIntersector.options.invisibleTerrain=!0;this.groundIntersector.options.hud=!1;this._handles.add([this.view.watch(["pointsOfInterest.renderPointOfView","pointsOfInterest.centerOnSurfaceFrequent.location","pixelRatio"],()=>this.setOverlayPlacementDirty()),this.surface.on("elevation-change",()=>this.setOverlayPlacementDirty()),this.view.allLayerViews.on("after-changes",
()=>this._layerViewsDirty=!0),this.view.on("resize",()=>this.setOverlayPlacementDirty()),R.addFrameTask({preRender:c=>{this.renderer.commitChanges();this._updateLayerViews();this.renderer.hasOverlays&&(this._dispatchRendererUpdate(c),this._drawOverlayTextures(this.renderer.overlays));this._hasUnusedRenderTargets&&this._collectUnusedRenderTargetMemory()}}),this.view.resourceController.scheduler.registerTask(V.Task.OVERLAY_MANAGER,()=>this.updateOverlays(),()=>this._needsUpdate),this.view._stage.renderView.events.on("force-camera-for-screenshot",
c=>{this.updateOverlays(c);this.renderer.hasOverlays&&this._drawOverlayTextures(this.renderer.overlays)})]);this._updateLayerViews()};f.destroy=function(){this._drapeSources.forEach((a,b)=>this.unregisterDrapeSource(b));this._drapeTargets.forEach(a=>this._unregisterDrapeTarget(a));this._drapeTargetTypes[0]--;this._disposeOverlays();this.renderer.dispose();this._handles&&(this._handles.destroy(),this._handles=null);l.isSome(v)&&(v.remove(),v=null)};f.setSpatialReference=function(a,b){this._overlaySR=
a;this._longitudeCyclical=null;const c=this.view.renderSpatialReference;if(l.isSome(a)&&l.isSome(c)){this._renderSR=c;this._overlaySREqualsRenderSR=a.equals(this._renderSR);if(this._isSpherical=b)this._longitudeCyclical=a.isWebMercator?new F.Cyclical(-2.0037508342787E7,2.0037508342787E7):new F.Cyclical(-180,180),this.renderer.longitudeCyclical=this._longitudeCyclical;this.renderer&&(this.renderer.globalUnitScale=b&&l.isSome(this._overlaySR)?L.getMetersPerUnitForSR(this._overlaySR):1)}else this._disposeOverlays()};
f.getGpuMemoryUsage=function(){return this.renderer.gpuMemoryUsage};f._updateLayerViews=function(){if(this._layerViewsDirty){var a=new Set;for(const b of this.view.allLayerViews.items)a.add(b.uid),"drapeSourceType"in b&&!this._drapeSources.has(b)&&this._registerDrapeSource(b,0),"drapeTargetType"in b&&!this._drapeTargets.has(b)&&this._registerDrapeTarget(b);this._drapeSources.forEach((b,c)=>{0!==b||a.has(c.uid)||this.unregisterDrapeSource(c)});this._drapeTargets.forEach(b=>{a.has(b.uid)||this._unregisterDrapeTarget(b)});
this.renderer.updateLayerOrder();this._setDrawTexturesDirty();this._layerViewsDirty=!1}};f.registerDrapeSource=function(a){this._registerDrapeSource(a,1)};f._registerDrapeSource=function(a,b){this._drapeSourceTypes[a.drapeSourceType]++;this._drapeSources.set(a,b);this.renderer.forEachOverlay((c,e)=>this._updateDrapeSource(a,e,c));this._setOverlayContentDirty();this.notifyChange("_needsUpdate")};f._updateDrapeSource=function(a,b,c){l.isSome(a.setDrapingExtent)&&l.isSome(this._overlaySR)&&a.setDrapingExtent(b,
c.extent,this._overlaySR,c.resolution,c.renderLocalOrigin,c.pixelRatio)};f.unregisterDrapeSource=function(a){this._drapeSources.has(a)&&(this._drapeSourceTypes[a.drapeSourceType]--,this._drapeSources.delete(a),this._setOverlayContentDirty(),this.notifyChange("_needsUpdate"))};f._registerDrapeTarget=function(a){this._drapeTargets.add(a);this._updateDrapeTarget(a);this._drapeTargetTypes[a.drapeTargetType]++};f._updateDrapeTarget=function(a){this.renderer.forEachOverlay((b,c)=>{var e=b.renderTargets;
const d=this.needsColorWithoutRasterImage()?e.colorWithoutRasterImage:this.hasDrapedFeatures()?e.color:null,g=e.highlight;e=e.water;a.setDrapingTextures(c,b.extent,d&&d.valid?d.fbo.getTexture():null,g.valid?g.fbo.getTexture():null,e.valid?e.fbo.getTexture():null)})};f._unregisterDrapeTarget=function(a){this._drapeTargets.delete(a);this._drapeTargetTypes[a.drapeTargetType]--};f._setOverlayContentDirty=function(){this.setOverlayPlacementDirty();this._setDrawTexturesDirty()};f.setOverlayPlacementDirty=
function(){this._placementDirty=!0};f.updateOverlays=function(a=this.view.state.camera){if(this._overlaySR){this._updateLayerViews();var b=A.nextHighestPowerOfTwo(Math.max(a.fullWidth,a.fullHeight)+256);var c=Math.min(b,this._maxResolution);this._computeOverlayExtents(a,b,D);b=h.width(D.inner)/h.width(D.outer);this.renderer.ensureOverlays();a=this._updateOverlay(0,D.inner,c,1);c=this._updateOverlay(1,D.outer,c,b);if(a||c)this.surface.updateTileOverlayParams(),this._setDrawTexturesDirty();this._placementDirty=
!1;this.surface.updateOverlayOpacity()}};f._updateOverlay=function(a,b,c,e){if(l.isNone(this.renderer.overlays))return!1;const d=this.renderer.overlays[a];if(!ea(b,d.extent)&&c===d.resolution&&d.pixelRatio===e)return!1;h.set(d.extent,b);d.resolution=c;d.pixelRatio=e;b=h.center(d.extent);d.renderLocalOrigin=Z.fromValues(b[0],b[1],0,`OV_${this._latestOriginId++}`);this._drapeSources.forEach((g,k)=>this._updateDrapeSource(k,a,d));return!0};f.computeOpacity=function(a){return this.renderer.hasOverlays?
3.5*a<this._renderedAltitude?Math.sqrt(A.clamp((a-this._renderedAltitude/10)/(this._renderedAltitude/3.5-this._renderedAltitude/10),0,1)):1:1};f.setTileParameters=function(a){const b=a.renderData.overlay;if(l.isSome(this.renderer.overlays)){const c=this.renderer.overlays[0],e=this.renderer.overlays[1];a=h.intersection(a.extent,a.surface.extent,N);this._rectInsideRect(a,c.extent)?(this._setTileOverlayData(a,0,b),this._clearTileOverlayData(1,b)):this._rectanglesOverlap(a,c.extent)?(this._setTileOverlayData(a,
0,b),this._setTileOverlayData(a,1,b)):this._rectanglesOverlap(a,e.extent)?(this._clearTileOverlayData(0,b),this._setTileOverlayData(a,1,b)):(this._clearTileOverlayData(0,b),this._clearTileOverlayData(1,b))}else this._clearTileOverlayData(0,b),this._clearTileOverlayData(1,b)};f.overlayPixelSizeInMapUnits=function(a){if(l.isNone(this.renderer.overlays))return 0;const b=this.renderer.overlays[0],c=this.renderer.overlays[1];a=this._pointIsInExtent(a,b.extent)?b:c;return(a.extent[2]-a.extent[0])/a.resolution};
f._setTileOverlayData=function(a,b,c){if(!l.isNone(this.renderer.overlays)){var e=this.renderer.overlays[b].extent;c.setScale(b,(a[2]-a[0])/(e[2]-e[0]),(a[3]-a[1])/(e[3]-e[1]));var d=a[0];if(this._longitudeCyclical){d=this._longitudeCyclical.minimalMonotonic(e[0],d);const g=this._longitudeCyclical.minimalMonotonic(e[0],a[2]);d>g&&(d=g-(a[2]-a[0]))}c.setOffset(b,(d-e[0])/(e[2]-e[0]),(a[1]-e[1])/(e[3]-e[1]))}};f._clearTileOverlayData=function(a,b){b.setScale(a,-1,-1);b.setOffset(a,-1,-1)};f._disposeOverlays=
function(){this.renderer.disposeOverlays()};f.reloadShaders=async function(){da.removeLoadedShaderModules();await this.renderer.reloadShaders();this.updateOverlays()};f.stopAnimationsAtTime=function(a){this.renderer.stopAnimationsAtTime(a);this._forceAnimation=!0};f._dispatchRendererUpdate=function(a){const b=U.Milliseconds(a.time-this._animationTimeLast);b<ca.DESIRED_DRAPED_ANIMATION_MS&&!this._forceAnimation||(this._animationTimeLast=a.time,this.renderer.updateLogic({dt:b,camera:this.view._stage.getCamera()})&&
(this._drawTexturesAnimateDirty=!0))};f._setDrawTexturesDirty=function(){this.renderer.hasOverlays?this._drawTexturesDirty=!0:this.setOverlayPlacementDirty()};f._intersectGroundFromView=function(a,b,c,e){c=this.view.sceneIntersectionHelper.getCenterRayWithSubpixelOffset(a,ha,b,c);if(l.isNone(c))return!1;b=c.origin;c=B.add(E,c.origin,c.direction);this.groundIntersector.reset(b,c);this.groundIntersector.intersect([],null,a);this.view.basemapTerrain.intersect(this.groundIntersector,null,b,c);return this.groundIntersector.results.min.getIntersectionPoint(e)};
f._findHorizonBasedPointOfInterest=function(a,b){var c=.5;c=this.view.renderCoordsHelper.getAltitude(a.eye);const e=this.view.pointsOfInterest.centerOnSurfaceFrequent;var d=A.clamp(e.estimatedSurfaceAltitude,a.aboveGround?-Infinity:c+1E-5,a.aboveGround?c-1E-5:Infinity);c=a.aboveGround;if("global"===this.view.viewingMode){var g=E;C.sphere.closestPointOnSilhouette(C.sphere.wrap(K.getReferenceEllipsoid(this.view.spatialReference).radius+d),C.ray.wrap(a.eye,a.viewForward),g);B.subtract(g,g,a.eye);d=F.cyclicalPI.normalize(C.vector.angleAroundAxis(a.viewForward,
g,a.viewRight))/a.fovY+.5;g=0>=d||1<=d?.5:.55;c=c?g*d:d+g*(1-d)}else d=M.fromValues(0,Math.tan(.5*Math.PI-Math.acos(-a.viewForward[2])),1,0),d=y.transformMat4(d,d,a.projectionMatrix)[1],d=A.clamp(.5+.5*d,0,1),c=1===d||0===d?.5:c?.55*d:1-.55*(1-d);return this._intersectGroundFromView(a,.5,c,b)?B.sqrDist(b,a.eye)<e.distance*e.distance:!1};f._computeOverlayExtents=function(a,b,c){var e=this.surface.extent,d=this.view.pointsOfInterest.centerOnSurfaceFrequent.renderLocation;const g=J.create();this._findHorizonBasedPointOfInterest(a,
g)||B.copy(g,d);this._renderedAltitude=this.view.renderCoordsHelper.getAltitude(a.eye);var k=B.distance(a.eye,g);d=Y.viewAngle(this.view.renderCoordsHelper,d,a.eye);d=Math.PI/2-Math.abs(d-Math.PI/2);H.OVERLAY_SHOW_CENTER?(l.isNone(v)&&(v=new ba.GraphicsHandle(this.view.graphics,"red")),v.showPoint(g,this._renderSR)):l.isSome(v)&&v.remove();this._overlaySREqualsRenderSR||G.projectVectorToVector(g,this._renderSR,g,this._overlaySR);k=b*a.perRenderPixelRatio*k/2;var n=!1;let w=Infinity;this._isSpherical&&
l.isSome(this._overlaySR)&&(this._overlaySR.isWebMercator?(k/=Math.cos(G.webMercator.y2lat(g[1])),w=this.surface.extent[3]):(n=!0,k/=K.getReferenceEllipsoid(this._overlaySR).metersPerDegree,w=90),k>=w&&(k=w,g[1]=0,this._overlaySR.isWebMercator&&(g[0]=0)));let z=1;n&&(z=1/Math.max(.2,Math.cos(Math.abs(A.deg2rad(g[1])))),180<k*z&&(z=180/k));n=Math.log(2)/12;k=Math.exp(Math.round(Math.log(k)/n)*n);n=k*z;const O=.5*b/(32*n);b=.5*b/(32*k);g[0]=Math.round(g[0]*O)/O;g[1]=Math.round(g[1]*b)/b;b=c.inner;b[0]=
g[0]-n;b[1]=g[1]-k;b[2]=g[0]+n;b[3]=g[1]+k;this._isSpherical&&this._shiftExtentToFitBounds(b,Infinity,w);c=c.outer;h.set(c,b);6*n>e[2]-e[0]?h.set(c,e):d<=.25*Math.PI?(c[0]-=n,c[1]-=k,c[2]+=n,c[3]+=k):(G.projectVectorToVector(a.eye,this._renderSR,E,this._overlaySR),W.subtract(t,g,E),a=-Math.atan2(t[1],t[0])+.125*Math.PI,0>a&&(a+=2*Math.PI),y.scale(t,fa[Math.floor(a/(.25*Math.PI))],2*k),t[0]*=z,t[2]*=z,y.add(c,c,t));this._isSpherical&&(c[0]=this._longitudeCyclical.clamp(c[0]),c[2]=this._longitudeCyclical.clamp(c[2]),
c[1]=Math.max(c[1],-w),c[3]=Math.min(c[3],w));!this._isSpherical&&e&&(a=h.intersection(b,e,N),e=h.intersection(c,e,ia),h.contains(a,e)&&(c[2]=c[0],c[3]=c[1]))};f._drawOverlayTextures=function(a){if(!l.isNone(a)&&(this._drawTexturesDirty||this._drawTexturesAnimateDirty)){var b=this._drawOverlay(a,0);a=this._drawOverlay(a,1);0!==b&&0!==a||this.surface.updateTileOverlayParams();this._collectUnusedRenderTargetMemory();this._drapeTargets.forEach(c=>this._updateDrapeTarget(c));this._drawTexturesDirty?(this._drawTexturesAnimateDirty=
this._drawTexturesDirty=!1,this.surface.requestRender(),this.surface.pendingUpdates=!0):(this._drawTexturesAnimateDirty=!1,this.surface.requestRender(0))}};f._setupGeometryViewsCyclical=function(a,b,c){this._setupGeometryViewsDirect(a,b,c);const e=.001*this._longitudeCyclical.range;if(b[0]-e<=this._longitudeCyclical.min){const d=a.views[a.numViews++];y.set(d.viewport,0,0,c,c);h.offset(b,this._longitudeCyclical.range,0,d.extent)}b[2]+e>=this._longitudeCyclical.max&&(a=a.views[a.numViews++],y.set(a.viewport,
0,0,c,c),h.offset(b,-this._longitudeCyclical.range,0,a.extent))};f._setupGeometryViewsDirect=function(a,b,c){a.numViews=1;a=a.views[0];h.set(a.extent,b);y.set(a.viewport,0,0,c,c)};f._drawOverlay=function(a,b){const c=a[b];a=c.computeRenderTargetValidityBitfield();const {extent:e,resolution:d,pixelRatio:g}=c;this._longitudeCyclical?this._setupGeometryViewsCyclical(x,e,d):this._setupGeometryViewsDirect(x,e,d);x.width=d;x.height=d;x.pixelRatio=g*this.view.state.camera.pixelRatio;x.index=b;c.drawRenderTargets(this.renderer,
x,this.needsColorWithoutRasterImage());b=c.computeRenderTargetValidityBitfield();return a^b?0:1};f.needsColorWithoutRasterImage=function(){return 0<this._drapeSourceTypes[0]&&0<this._drapeSourceTypes[1]&&0<this._drapeTargetTypes[1]};f.hasDrapedFeatures=function(){return 0<this._drapeSourceTypes[1]};f._collectUnusedRenderTargetMemory=function(){this._hasUnusedRenderTargets=!1;if(this.renderer.hasOverlays){const a=performance.now();this.renderer.forEachOverlay(b=>this._hasUnusedRenderTargets=b.collectUnusedMemory(a)||
this._hasUnusedRenderTargets)}};f._rectanglesOverlap=function(a,b){return this._longitudeCyclical?(this._longitudeCyclical.contains(b[0],b[2],a[0])||this._longitudeCyclical.contains(b[0],b[2],a[2])||this._longitudeCyclical.contains(a[0],a[2],b[0]))&&!(a[1]>b[3]||a[3]<b[1]):h.intersects(a,b)};f._rectInsideRect=function(a,b){return this._longitudeCyclical?this._longitudeCyclical.contains(b[0],b[2],a[0])&&this._longitudeCyclical.contains(b[0],b[2],a[2])&&a[1]>b[1]&&a[3]<b[3]:h.contains(b,a)};f._pointIsInExtent=
function(a,b){if(this._longitudeCyclical)return this._longitudeCyclical.contains(b[0],b[2],a.x)&&a.y>=b[1]&&a.y<=b[3];const c=a.x;a=a.y;return c>b[0]&&c<b[2]&&a>b[1]&&a<b[3]};f._shiftExtentToFitBounds=function(a,b,c){let e=0,d=0;a[0]<-b?e=a[0]+b:a[2]>b&&(e=b-a[2]);a[1]<-c?d=a[1]+c:a[3]>c&&(d=c-a[3]);h.offset(a,e,d)};I._createClass(r,[{key:"_needsUpdate",get:function(){return(this._placementDirty||this._layerViewsDirty)&&(0<this._drapeSources.size||0<this.view.graphics.length||H.OVERLAY_DRAW_DEBUG_TEXTURE)&&
!!this._overlaySR&&!this.suspended&&this.surface.ready}},{key:"view",get:function(){return this.surface.view}},{key:"updating",get:function(){return this._needsUpdate||this.renderer.updating}},{key:"hasHighlights",get:function(){return this.renderer.hasHighlights}},{key:"rendersOccluded",get:function(){return this.renderer.rendersOccluded}},{key:"hasOverlays",get:function(){return this.renderer.hasOverlays}},{key:"test",get:function(){return{renderer:this.renderer}}}]);return r}(S);p.__decorate([q.property()],
m.OverlayManager.prototype,"_overlaySR",void 0);p.__decorate([q.property({readOnly:!0})],m.OverlayManager.prototype,"_needsUpdate",null);p.__decorate([q.property()],m.OverlayManager.prototype,"_placementDirty",void 0);p.__decorate([q.property()],m.OverlayManager.prototype,"_layerViewsDirty",void 0);p.__decorate([q.property()],m.OverlayManager.prototype,"renderer",void 0);p.__decorate([q.property({constructOnly:!0})],m.OverlayManager.prototype,"surface",void 0);p.__decorate([q.property({readOnly:!0,
aliasOf:"surface.suspended"})],m.OverlayManager.prototype,"suspended",void 0);p.__decorate([q.property({readOnly:!0})],m.OverlayManager.prototype,"updating",null);p.__decorate([q.property({type:Boolean})],m.OverlayManager.prototype,"hasHighlights",null);p.__decorate([q.property({type:Boolean})],m.OverlayManager.prototype,"rendersOccluded",null);m.OverlayManager=p.__decorate([Q.subclass("esri.views.3d.terrain.OverlayManager")],m.OverlayManager);const x={width:0,height:0,pixelRatio:0,views:[{viewport:h.create(),
extent:h.create()},{viewport:h.create(),extent:h.create()},{viewport:h.create(),extent:h.create()}],numViews:0,index:0},t=M.create(),E=J.create(),D={inner:h.create(),outer:h.create()},N=h.create(),ia=h.create(),ha=C.ray.create();Object.defineProperty(m,"__esModule",{value:!0})});