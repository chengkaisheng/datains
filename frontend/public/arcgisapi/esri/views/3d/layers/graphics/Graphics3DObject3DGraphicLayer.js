// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../../chunks/_rollupPluginBabelHelpers ../../../../core/maybe ../../../../chunks/vec3f64 ../../../../chunks/vec3 ../../../../geometry/support/aaBoundingBox ./graphicUtils ./featureExpressionInfoUtils".split(" "),function(z,r,v,u,m,A,B){function x(g){return g.isVisible?g.params.transparent?1:2:0}let w=function(){function g(a,b,d,k,c,h,t,e=null){this.uniqueGeometries=d;this.uniqueMaterials=k;this.uniqueTextures=c;this.elevationAligner=h;this.elevationContext=t;this._edgeState=e;this.type=
"object3d";this.stage=this.stageLayer=null;this._addedToStage=this._visible=!1;this.alignedSampledElevation=0;this.needsElevationUpdates=!1;this.graphics3DSymbolLayer=a;this.stageObject=b}var f=g.prototype;f.initialize=function(a,b){this.stageLayer=b;this.stage=a;if(this.uniqueMaterials)for(b=0;b<this.uniqueMaterials.length;b++)a.add(3,this.uniqueMaterials[b]);if(this.uniqueGeometries)for(b=0;b<this.uniqueGeometries.length;b++)a.add(2,this.uniqueGeometries[b]);if(this.uniqueTextures)for(b=0;b<this.uniqueTextures.length;b++)a.add(4,
this.uniqueTextures[b]);a.add(1,this.stageObject)};f.layerOpacityChanged=function(a,b){if(!r.isNone(this._edgeState)){var d=x(this._edgeState.baseMaterial),k=!1;for(const c of this._edgeState.edgeMaterials)c.objectTransparency!==d&&(c.objectTransparency=d,k=!0);k&&this.resetEdgeObject(b);this.stage.renderView.ensureEdgeView().updateAllComponentOpacities(this.stageObject,[a])}};f.slicePlaneEnabledChanged=function(a,b){r.isNone(this._edgeState)||(this.stage.renderView.ensureEdgeView().updateAllComponentMaterials(this.stageObject,
this._edgeState.edgeMaterials,{slicePlaneEnabled:a},!b),this._edgeState.properties.slicePlaneEnabled=a)};f.setVisibility=function(a){if(null!=this.stage&&this._visible!==a&&((this._visible=a)?this._addedToStage?this.stageObject.setVisible(!0):(this.stageLayer.addObject(this.stageObject),this._addedToStage=!0):this.stageObject.setVisible(!1),r.isSome(this._edgeState))){const b=this.stage.renderView.ensureEdgeView();b.hasObject(this.stageObject)?b.updateObjectVisibility(this.stageObject,a):a&&this.addOrUpdateEdgeObject(b,
!1)}};f.destroy=function(){var a=this.stage;if(this.stageLayer){if(this.uniqueMaterials)for(var b=0;b<this.uniqueMaterials.length;b++)a.remove(3,this.uniqueMaterials[b].id);if(this.uniqueGeometries)for(b=0;b<this.uniqueGeometries.length;b++)a.remove(2,this.uniqueGeometries[b].id);if(this.uniqueTextures)for(b=0;b<this.uniqueTextures.length;b++)a.remove(4,this.uniqueTextures[b].id)}a.remove(1,this.stageObject.id);this._addedToStage&&(this.stageLayer.removeObject(this.stageObject),this._addedToStage=
!1);a=this.stage.renderView.ensureEdgeView();a.hasObject(this.stageObject)&&a.removeObject(this.stageObject);this.stageObject.dispose();this._visible=!1;this.stage=this.stageLayer=null};f.alignWithElevation=function(a,b,d,k){null!=this.elevationAligner&&(r.isSome(d)&&B.setContextFeature(this.elevationContext.featureExpressionInfoContext,d),a=this.elevationAligner(this,this.elevationContext,a,b),null!=a&&(this.alignedSampledElevation=a),this.resetEdgeObject(k))};f.getBSRadius=function(){return this.stageObject.getBSRadius()};
f.getCenterObjectSpace=function(a=v.create()){return u.copy(a,this.stageObject.getCenter(!0))};f.getBoundingBoxObjectSpace=function(a=m.create()){var b=this.stageObject;a||(a=m.create());m.setMin(a,b.getBBMin(!0));m.setMax(a,b.getBBMax(!0));return a};f.computeAttachmentOrigin=function(a){for(const b of this.stageObject.geometryRecords)b.computeAttachmentOrigin(l)&&(u.transformMat4(l,l,this.stageObject.objectTransformation),u.add(a.render.origin,a.render.origin,l),a.render.num++)};f.getProjectedBoundingBox=
async function(a,b,d,k,c){c=this.getBoundingBoxObjectSpace(c);var h=C;const t=m.isPoint(c)?1:h.length;for(var e=0;e<t;e++){const n=h[e];p[0]=c[n[0]];p[1]=c[n[1]];p[2]=c[n[2]];u.transformMat4(p,p,this.stageObject.objectTransformation);q[3*e]=p[0];q[3*e+1]=p[1];q[3*e+2]=p[2]}if(!a(q,0,t))return null;m.empty(c);a=null;this.calculateRelativeScreenBounds&&(a=this.calculateRelativeScreenBounds());for(h=0;h<3*t;h+=3){for(e=0;3>e;e++)c[e]=Math.min(c[e],q[h+e]),c[e+3]=Math.max(c[e+3],q[h+e]);a&&d.push({location:q.slice(h,
h+3),screenSpaceBoundingRect:a})}if(b&&b.service&&"absolute-height"!==this.elevationContext.mode){m.center(c,l);d="relative-to-scene"===this.elevationContext.mode?"scene":"ground";let n;if(b.useViewElevation)n=b.service.getElevation(l[0],l[1],d);else try{const y=A.demResolutionForBoundingBox(c,b);n=await b.service.queryElevation(l[0],l[1],k,y,d)}catch(y){n=null}m.offset(c,0,0,-this.alignedSampledElevation+n)}return c};f.addObjectState=function(a,b){0===a&&b.addObject(this.stageObject,this.stageObject.highlight());
1===a&&b.addObject(this.stageObject,this.stageObject.maskOccludee())};f.removeObjectState=function(a){a.removeObject(this.stageObject)};f.resetEdgeObject=function(a){if(!r.isNone(this._edgeState)){var b=this.stage.renderView.ensureEdgeView();this._visible?this.addOrUpdateEdgeObject(b,a):b.removeObject(this.stageObject)}};f.addOrUpdateEdgeObject=function(a,b){const d=this._edgeState;if(!r.isNone(d)){var k=x(d.baseMaterial);for(const c of d.edgeMaterials)c.objectTransparency=k;a.addOrUpdateObject3D(this.stageObject,
d.edgeMaterials,d.properties,!b)}};z._createClass(g,[{key:"isElevationSource",get:function(){return!(!this.stageObject.metadata||!this.stageObject.metadata.isElevationSource)}},{key:"visible",get:function(){return this._visible}}]);return g}();(function(g){g=g.VisibilityModes||(g.VisibilityModes={});g[g.REMOVE_OBJECT=0]="REMOVE_OBJECT";g[g.HIDE_FACERANGE=1]="HIDE_FACERANGE"})(w||(w={}));const q=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],p=v.create(),l=v.create(),C=[[0,1,2],[3,1,2],[0,4,2],
[3,4,2],[0,1,5],[3,1,5],[0,4,5],[3,4,5]];return w});