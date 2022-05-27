// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../core/maybe ../../../../core/Error ../../../../geometry/Extent ../../../../geometry/Polygon ../../../../geometry ../../../../Color ../../../../core/screenUtils ../../../../chunks/mat4f64 ../../../../chunks/vec4f64 ../../../../geometry/support/aaBoundingBox ../../webgl-engine/lib/Object3D ./elevationAlignmentUtils ./ElevationAligners ./ElevationContext ./Graphics3DObject3DGraphicLayer ../../webgl-engine/lib/Geometry ./Graphics3DSymbolLayer ../../../../renderers/support/renderingInfoUtils ../../webgl-engine/materials/RibbonLineMaterial ../../webgl-engine/materials/lineStippleUtils ./Graphics3DDrapedGraphicLayer ../support/FastSymbolUpdates ../../webgl-engine/lib/RenderGeometry ./lineUtils".split(" "),
function(x,B,k,F,G,H,u,I,r,J,K,m,L,q,M,N,O,P,w,Q,C,R,S,D,T,y){u=function(z){function t(a,b,c,e){a=z.call(this,a,b,c,e)||this;a._uniformSize=1;return a}B._inheritsLoose(t,z);var d=t.prototype;d.doLoad=async function(){this._vvConvertOptions={modelSize:[1,1,1],symbolSize:[1,1,1],unitInMeters:1,transformation:{anchor:[0,0,0],scale:[1,1,1],rotation:[0,0,0]},supportedTypes:{size:!0,color:!0,opacity:!0,rotation:!1}};this._fastUpdates=this._context.renderer&&this._context.renderer.visualVariables&&0<this._context.renderer.visualVariables.length?
D.initFastSymbolUpdatesState(this._context.renderer,this._vvConvertOptions):{enabled:!1};if(!this._drivenProperties.size){const a=null!=this.symbolLayer.size?this.symbolLayer.size:r.px2pt(1);if(0>a)throw new F("graphics3dlinesymbollayer:invalid-size","Symbol sizes may not be negative values");this._uniformSize=a}};d.getMaterialParameters=function(a){var b=k.get(this.symbolLayer,"material","color");b=this._getCombinedOpacityAndColor(b);a={width:1,color:b,polygonOffset:!0,join:this.symbolLayer.join||
"miter",cap:this.symbolLayer.cap||"butt",transparent:1>b[3]||this.needsDrivenTransparentPass,slicePlaneEnabled:this._context.slicePlaneEnabled,isClosed:a,stipplePattern:this.symbolLayer.stipplePattern?R.createStipplePattern(this.symbolLayer.stipplePattern.map(r.pt2px)):null,stippleOffColor:this.symbolLayer.stippleOffColor?I.toUnitRGBA(this.symbolLayer.stippleOffColor):null,stippleIntegerRepeats:!0};this._drivenProperties.size?this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size&&(a.width=
r.pt2px(1)):(b=null!=this.symbolLayer.size?this.symbolLayer.size:r.px2pt(1),a.width=r.pt2px(b));return this._fastUpdates&&this._fastUpdates.visualVariables?{...a,...this._fastUpdates.materialParameters}:a};d.destroy=function(){z.prototype.destroy.call(this);k.isSome(this._lineMaterial)&&(this._context.stage.remove(3,this._lineMaterial.id),this._lineMaterial=null);k.isSome(this._ringMaterial)&&(this._context.stage.remove(3,this._ringMaterial.id),this._ringMaterial=null)};d.getDrivenSize=function(a){return this._drivenProperties.size&&
a.size?r.pt2px(Q.getDriverAxisSizeValueAny(a.size)):1};d.getSizeFeatureAttributeData=function(a){return this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size?w.getAttributeValue(this._fastUpdates.visualVariables.size.field,a):null};d.getDrivenColor=function(a){const b=K.fromValues(1,1,1,1);this._drivenProperties.color&&a.color&&(b[0]=a.color[0],b[1]=a.color[1],b[2]=a.color[2],0<a.color.length&&(b[3]=a.color[3]));this._drivenProperties.opacity&&a.opacity&&(b[3]=a.opacity);return b};d.getColorFeatureAttributeData=
function(a){return this._fastUpdates.enabled&&this._fastUpdates.visualVariables.color?w.getAttributeValue(this._fastUpdates.visualVariables.color.field,a):null};d.getOpacityFeatureAttributeData=function(a){return this._fastUpdates.enabled&&this._fastUpdates.visualVariables.opacity?w.getAttributeValue(this._fastUpdates.visualVariables.opacity.field,a):null};d.createGraphics3DGraphic=function(a){const b=a.graphic;var c=b.geometry;if(!this._validateGeometryType(b.geometry,t.validGeometryTypes,this.symbolLayer.type)||
!this._validateGeometry(c))return null;c="graphic"+b.uid;const e=this.setGraphicElevationContext(b,new N.ElevationContext);this.ensureDrapedStatus("on-the-ground"===e.mode);return this.draped?this._createAsOverlay(a,this._context.layer.uid):this._createAs3DShape(a,e,c,b.uid)};d.applyRendererDiff=function(a,b){for(const c in a.diff)switch(c){case "visualVariables":if(D.updateFastSymbolUpdatesState(this._fastUpdates,b,this._vvConvertOptions))k.isSome(this._lineMaterial)&&this._lineMaterial.setParameterValues(this._fastUpdates.materialParameters),
k.isSome(this._ringMaterial)&&this._ringMaterial.setParameterValues(this._fastUpdates.materialParameters);else return!1;break;default:return!1}return!0};d.layerOpacityChanged=function(){k.isSome(this._lineMaterial)&&this.updateMaterialLayerOpacity(this._lineMaterial);k.isSome(this._ringMaterial)&&this.updateMaterialLayerOpacity(this._ringMaterial);return!0};d.updateMaterialLayerOpacity=function(a){const b=a.params.color;var c=k.get(this.symbolLayer,"material","color");c=this._getCombinedOpacity(c);
a.setParameterValues({color:[b[0],b[1],b[2],c],transparent:1>c||this.needsDrivenTransparentPass})};d.layerElevationInfoChanged=function(a,b,c){const e=this._elevationContext.mode;c=q.elevationModeChangeUpdateType(t.elevationModeChangeTypes,c,e);if(c!==q.SymbolUpdateType.UPDATE)return c;const g=q.needsElevationUpdates2D(e);return this.updateGraphics3DGraphicElevationInfo(a,b,()=>g)};d.slicePlaneEnabledChanged=function(){k.isSome(this._lineMaterial)&&this._lineMaterial.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled});
k.isSome(this._ringMaterial)&&this._ringMaterial.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled});return!0};d.physicalBasedRenderingChanged=function(){return!0};d.pixelRatioChanged=function(){return!0};d._getGeometryAsPolygonOrPolyline=function(a){switch(a.type){case "extent":if(a instanceof G)return H.fromExtent(a);break;case "polygon":case "polyline":return a}return null};d._createAs3DShape=function(a,b,c,e){const g=this._getGeometryAsPolygonOrPolyline(a.graphic.geometry);
var p="polygon"===g.type?g.rings:g.paths,l=[];const f=[],v=[],n=m.create(),h=y.geometryToRenderInfo(g,this._context.elevationProvider,this._context.renderCoordsHelper,b);this._logGeometryCreationWarnings(h,p,"polygon"===g.type?"rings":"paths","LineSymbol3DLayer");for(p=0;p<h.lines.length;p++){const {position:U,mapPosition:E}=h.lines[p];if(k.isSome(this._context.clippingExtent)&&(m.empty(n),m.expandWithBuffer(n,E),!m.intersectsClippingArea(n,this._context.clippingExtent)))continue;var A=this._createGeometryData(a,
U,E,g.type);A=new P(A,c+"path"+p);l.push(A);f.push("polygon"===g.type?this.ringMaterial:this.lineMaterial);v.push(J.IDENTITY)}if(0===l.length)return null;a=new L({geometries:l,materials:f,transformations:v,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicUid:e},idHint:c});l=new O(this,a,l,null,null,M.perVertexElevationAligner,b);l.alignedSampledElevation=h.sampledElevation;l.needsElevationUpdates=q.needsElevationUpdates2D(b.mode);return l};d._createGeometryData=function(a,b,c,e){const g=
this._fastUpdates.enabled&&this._fastUpdates.visualVariables.color;return y.createGeometryData({removeDuplicateStartEnd:"polygon"===e?1:0,uniformSize:this._uniformSize,attributeData:{position:b,mapPosition:c,size:this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size?null:this.getDrivenSize(a.renderingInfo),color:g?null:this.getDrivenColor(a.renderingInfo),sizeFeature:this.getSizeFeatureAttributeData(a.graphic),colorFeature:this.getColorFeatureAttributeData(a.graphic),opacityFeature:this.getOpacityFeatureAttributeData(a.graphic)}})};
d._createAsOverlay=function(a,b){const c=a.graphic,e=this._getGeometryAsPolygonOrPolyline(c.geometry);var g="polygon"===e.type?e.rings:e.paths;const p="polygon"===e.type?this.ringMaterial:this.lineMaterial;p.renderPriority=this._renderPriority;const l=[],f=m.create(),v=m.empty();var n=y.geometryToRenderInfoDraped(e,this._context.overlaySR);this._logGeometryCreationWarnings(n,g,"polygon"===e.type?"rings":"paths","LineSymbol3DLayer");if(0<g.length){({lines:g}=n);for(n=0;n<g.length;++n){var h=g[n];m.empty(f);
m.expandWithBuffer(f,h.position);m.intersectsClippingArea(f,this._context.clippingExtent)&&(m.expandWithAABB(v,f),h=this._createGeometryData(a,h.position,null,e.type),h=new T(h),h.data.layerUid=b,h.data.graphicUid=c.uid,h.material=p,h.center=[.5*(f[0]+f[3]),.5*(f[1]+f[4]),0],h.bsRadius=.5*Math.sqrt((f[3]-f[0])*(f[3]-f[0])+(f[4]-f[1])*(f[4]-f[1])),l.push(h))}return new S(this,l,v)}return null};B._createClass(t,[{key:"lineMaterial",get:function(){k.isNone(this._lineMaterial)&&(this._lineMaterial=new C.RibbonLineMaterial(this.getMaterialParameters(!1),
this._getIdHint("_ribbonlinemat")),this._context.stage.add(3,this._lineMaterial));return this._lineMaterial}},{key:"ringMaterial",get:function(){k.isNone(this._ringMaterial)&&(this._ringMaterial=new C.RibbonLineMaterial(this.getMaterialParameters(!0),this._getIdHint("_ribbonlinemat")),this._context.stage.add(3,this._ringMaterial));return this._ringMaterial}}]);return t}(w.Graphics3DSymbolLayer);u.validGeometryTypes=["polyline","polygon","extent"];u.elevationModeChangeTypes={definedChanged:q.SymbolUpdateType.RECREATE,
staysOnTheGround:q.SymbolUpdateType.NONE,onTheGroundChanged:q.SymbolUpdateType.RECREATE};x.Graphics3DLineSymbolLayer=u;x.default=u;Object.defineProperty(x,"__esModule",{value:!0})});