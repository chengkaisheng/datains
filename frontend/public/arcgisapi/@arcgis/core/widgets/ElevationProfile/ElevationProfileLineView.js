/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as e}from"../../chunks/tslib.es6.js";import"../../chunks/ArrayPool.js";import"../../chunks/object.js";import"../../chunks/deprecate.js";import"../../core/lang.js";import"../../config.js";import{i as t,b as s}from"../../chunks/Logger.js";import"../../chunks/string.js";import"../../chunks/metadata.js";import{property as r}from"../../core/accessorSupport/decorators/property.js";import"../../core/Accessor.js";import"../../chunks/PropertyOrigin.js";import"../../core/scheduling.js";import"../../core/promiseUtils.js";import"../../chunks/Message.js";import"../../core/Error.js";import"../../chunks/ensureType.js";import{subclass as o}from"../../core/accessorSupport/decorators/subclass.js";import"../../chunks/Evented.js";import"../../core/Collection.js";import"../../chunks/JSONSupport.js";import"../../chunks/asyncUtils.js";import"../../core/urlUtils.js";import"../../core/accessorSupport/decorators/cast.js";import"../../chunks/jsonMap.js";import"../../chunks/reader.js";import"../../chunks/writer.js";import"../../chunks/resourceExtension.js";import"../../geometry/SpatialReference.js";import"../../kernel.js";import"../../request.js";import"../../chunks/assets.js";import"../../geometry/Geometry.js";import"../../geometry/Point.js";import"../../chunks/Ellipsoid.js";import"../../geometry/support/webMercatorUtils.js";import"../../geometry/Extent.js";import"../../chunks/mathUtils2.js";import"../../chunks/vec3f64.js";import"../../chunks/common.js";import{f as i,g as n}from"../../chunks/vec3.js";import"../../chunks/mathUtils.js";import"../../chunks/colorUtils.js";import c from"../../Color.js";import"../../chunks/zmUtils.js";import"../../geometry/Multipoint.js";import"../../geometry/Polygon.js";import"../../chunks/extentUtils.js";import"../../geometry/Polyline.js";import"../../chunks/typeUtils.js";import"../../geometry/support/jsonUtils.js";import"../../geometry.js";import"../../chunks/screenUtils.js";import p from"../../core/Handles.js";import{i as l,e as a}from"../../chunks/unitUtils.js";import{init as m,on as u,when as h}from"../../core/watchUtils.js";import"../../chunks/mat4.js";import"../../chunks/pe.js";import"../../chunks/aaBoundingRect.js";import"../../chunks/geodesicConstants.js";import"../../geometry/support/GeographicTransformationStep.js";import"../../geometry/support/GeographicTransformation.js";import"../../geometry/projection.js";import{c as j}from"../../chunks/vec4f64.js";import"../../chunks/quatf64.js";import"../../chunks/mat3.js";import"../../chunks/vec2.js";import"../../chunks/vec4.js";import"../../chunks/quat.js";import"../../layers/support/ElevationSampler.js";import"../../chunks/vec2f64.js";import"../../chunks/vec3f32.js";import{r as d}from"../../chunks/geometryUtils.js";import"../../chunks/Util.js";import"../../chunks/Object3D.js";import"../../chunks/intersectorUtils.js";import{I as y}from"../../chunks/Intersector.js";import{a as v}from"../../chunks/ElevationProfileLine.js";import{GeometryDescriptor as k}from"../../chunks/ElevationQuery.js";let f=class extends v{constructor(e){super(e),this.type="view",this.color=new c([191,76,245]),this.include=null,this.exclude=null,this.numSamplesForPreview=50,this.numSamplesPerChunk=100,this._vecA=j(),this._vecB=j(),this._ray=d.create()}get minDemResolution(){var e,t,s;const r=null==(e=this._viewModel)?void 0:e.view;if(!r||"3d"!==r.type)return null;const o=null==(t=r.pointsOfInterest)||null==(s=t.focus)?void 0:s.renderLocation;if(!o)return null;return r.state.camera.computeRenderPixelSizeAt(o)*l(r.spatialReference)}get _intersectOptions(){const e=this._view;return t(e)?e.externalToInternalIntersectOptions({include:this.include,exclude:this.exclude}):{}}get _view(){const e=this._viewModel.view;return"3d"===(null==e?void 0:e.type)?e:null}get _maxIntersectionDistance(){const e=this._view;return s(e)?Number.POSITIVE_INFINITY:a(e.spatialReference).radius/e.renderCoordsHelper.unitInMeters}get _intersector(){const e=this._view;if(s(e))return null;const t=new y(e.state.mode),r=t.options;return r.hud=!1,r.invisibleTerrain=!1,r.backfacesTerrain=!1,r.selectionMode=!1,r.store=2,t}async queryElevation(e,{noDataValue:r,signal:o}){const c=this._view;if(s(c))throw new Error("can only query SceneView");const p=this._viewModel.input,l=t(p)?g(p):null,a=this._intersector,m=this._maxIntersectionDistance,u=c.spatialReference,h=await k.fromGeometry(e).project(u,o);for(const e of h.coordinates){var j;const t=this._vecA,o=this._vecB;i(o,e.x,e.y,null!=(j=e.z)?j:0),c.renderCoordsHelper.toRenderCoords(o,u,o),n(t,o),c.renderCoordsHelper.setAltitude(2e5,t);const p=d.fromPoints(t,o,this._ray);c.sceneIntersectionHelper.computeIntersection(p,a,this._intersectOptions);const h=a.results.all.find((e=>{if(e.distanceInRenderSpace>m)return!1;const t=e.toGraphic(c);return s(t)||g(t)!==l}));if(h){const t=this._vecA;h.getIntersectionPoint(t),c.renderCoordsHelper.fromRenderCoords(t,t,u),e.z=t[2]}else e.z=r}return{geometry:h.export(),noDataValue:r}}attach(e){const t=new p;t.add(super.attach(e));const s=()=>{this.notifyChange("_intersectOptions")},r=()=>{this._watchLayerVisibilities(t,e.view,this._onChange),this._onChange()};return t.add([m(this,"_intersectOptions",this._onChange),u(this,"include","change",s,s,s),u(this,"exclude","change",s,s,s),h(e,"view.stationary",(()=>this._onChange())),u(e,"view.elevationProvider","elevation-change",this._onChange),u(e,"view.map.allLayers","change",r,r,r)]),t}_watchLayerVisibilities(e,t,s){var r,o,i;e.remove("layer-visibilities");const n=null!=(r=null==(o=t.map)||null==(i=o.allLayers)?void 0:i.toArray())?r:[];e.add(n.map((e=>e.watch("visible",s))),"layer-visibilities")}};function g(e){if(e.layer&&"objectIdField"in e.layer){const t=e.attributes[e.layer.objectIdField];if(t)return`o-${e.layer.id}-${t}`}return`u-${e.uid}`}e([r({type:c,nonNullable:!0})],f.prototype,"color",void 0),e([r()],f.prototype,"include",void 0),e([r()],f.prototype,"exclude",void 0),e([r({readOnly:!0})],f.prototype,"minDemResolution",null),e([r()],f.prototype,"_intersectOptions",null),e([r()],f.prototype,"_view",null),e([r()],f.prototype,"_maxIntersectionDistance",null),e([r()],f.prototype,"_intersector",null),f=e([o("esri.widgets.ElevationProfile.ElevationProfileLineView")],f);var _=f;export default _;
