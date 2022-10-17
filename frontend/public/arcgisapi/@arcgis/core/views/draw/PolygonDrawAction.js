/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as t}from"../../chunks/tslib.es6.js";import"../../chunks/ArrayPool.js";import"../../chunks/object.js";import"../../chunks/deprecate.js";import"../../core/lang.js";import"../../config.js";import{i as e,b as s}from"../../chunks/Logger.js";import"../../chunks/string.js";import"../../chunks/metadata.js";import{property as o}from"../../core/accessorSupport/decorators/property.js";import"../../core/Accessor.js";import"../../chunks/PropertyOrigin.js";import"../../core/scheduling.js";import"../../core/promiseUtils.js";import"../../chunks/Message.js";import"../../core/Error.js";import"../../chunks/compilerUtils.js";import"../../chunks/ensureType.js";import{subclass as i}from"../../core/accessorSupport/decorators/subclass.js";import"../../chunks/Evented.js";import"../../core/Collection.js";import"../../chunks/collectionUtils.js";import"../../chunks/JSONSupport.js";import"../../chunks/Promise.js";import"../../chunks/Loadable.js";import"../../core/urlUtils.js";import"../../core/accessorSupport/decorators/aliasOf.js";import"../../core/accessorSupport/decorators/cast.js";import"../../chunks/jsonMap.js";import"../../chunks/enumeration.js";import"../../chunks/reader.js";import"../../chunks/writer.js";import"../../chunks/resourceExtension.js";import"../../chunks/persistableUrlUtils.js";import"../../geometry/SpatialReference.js";import"../../chunks/locale.js";import"../../chunks/number.js";import"../../intl.js";import"../../kernel.js";import"../../request.js";import"../../chunks/assets.js";import"../../geometry/Geometry.js";import"../../geometry/Point.js";import"../../chunks/Ellipsoid.js";import"../../geometry/support/webMercatorUtils.js";import"../../geometry/Extent.js";import"../../portal/PortalQueryParams.js";import"../../portal/PortalQueryResult.js";import"../../portal/PortalFolder.js";import"../../portal/PortalGroup.js";import"../../portal/PortalUser.js";import"../../portal/Portal.js";import"../../chunks/mathUtils2.js";import"../../chunks/vec3f64.js";import"../../chunks/common.js";import"../../chunks/vec3.js";import"../../chunks/mathUtils.js";import"../../chunks/colorUtils.js";import"../../Color.js";import"../../chunks/zmUtils.js";import"../../geometry/Multipoint.js";import"../../geometry/Polygon.js";import"../../chunks/extentUtils.js";import"../../geometry/Polyline.js";import"../../chunks/typeUtils.js";import"../../geometry/support/jsonUtils.js";import"../../geometry.js";import"../../layers/support/CodedValueDomain.js";import"../../layers/support/Domain.js";import"../../layers/support/InheritedDomain.js";import"../../layers/support/RangeDomain.js";import"../../chunks/domains.js";import"../../chunks/arcadeOnDemand.js";import"../../layers/support/fieldUtils.js";import"../../popup/content/Content.js";import"../../popup/content/AttachmentsContent.js";import"../../popup/content/CustomContent.js";import"../../chunks/date.js";import"../../popup/support/FieldInfoFormat.js";import"../../popup/FieldInfo.js";import"../../popup/content/FieldsContent.js";import"../../chunks/MediaInfo.js";import"../../popup/content/support/ChartMediaInfoValueSeries.js";import"../../popup/content/support/ChartMediaInfoValue.js";import"../../chunks/chartMediaInfoUtils.js";import"../../popup/content/BarChartMediaInfo.js";import"../../popup/content/ColumnChartMediaInfo.js";import"../../popup/content/support/ImageMediaInfoValue.js";import"../../popup/content/ImageMediaInfo.js";import"../../popup/content/LineChartMediaInfo.js";import"../../popup/content/PieChartMediaInfo.js";import"../../popup/content/MediaContent.js";import"../../popup/content/TextContent.js";import"../../popup/content.js";import"../../popup/ExpressionInfo.js";import"../../popup/LayerOptions.js";import"../../popup/support/RelatedRecordsInfoFieldOrder.js";import"../../popup/RelatedRecordsInfo.js";import"../../chunks/Identifiable.js";import"../../support/actions/ActionBase.js";import"../../support/actions/ActionButton.js";import"../../support/actions/ActionToggle.js";import"../../PopupTemplate.js";import"../../symbols/Symbol.js";import"../../symbols/CIMSymbol.js";import"../../symbols/Symbol3DLayer.js";import"../../chunks/screenUtils.js";import"../../chunks/opacityUtils.js";import"../../chunks/materialUtils.js";import"../../symbols/edges/Edges3D.js";import"../../symbols/edges/SketchEdges3D.js";import"../../symbols/edges/SolidEdges3D.js";import"../../chunks/utils.js";import"../../chunks/Symbol3DMaterial.js";import"../../symbols/ExtrudeSymbol3DLayer.js";import"../../symbols/LineSymbol.js";import"../../symbols/LineSymbolMarker.js";import"../../symbols/SimpleLineSymbol.js";import"../../symbols/FillSymbol.js";import"../../symbols/patterns/StylePattern3D.js";import"../../symbols/FillSymbol3DLayer.js";import"../../chunks/colors.js";import"../../chunks/Symbol3DOutline.js";import"../../symbols/Font.js";import"../../symbols/IconSymbol3DLayer.js";import"../../symbols/LineSymbol3DLayer.js";import"../../symbols/ObjectSymbol3DLayer.js";import"../../symbols/PathSymbol3DLayer.js";import"../../symbols/TextSymbol3DLayer.js";import"../../symbols/WaterSymbol3DLayer.js";import"../../symbols/Symbol3D.js";import"../../chunks/Thumbnail.js";import"../../symbols/callouts/Callout3D.js";import"../../symbols/callouts/LineCallout3D.js";import"../../chunks/Symbol3DVerticalOffset.js";import"../../symbols/LabelSymbol3D.js";import"../../symbols/LineSymbol3D.js";import"../../symbols/MarkerSymbol.js";import"../../symbols/MeshSymbol3D.js";import"../../chunks/urlUtils.js";import"../../symbols/PictureFillSymbol.js";import"../../symbols/PictureMarkerSymbol.js";import"../../symbols/PointSymbol3D.js";import"../../symbols/PolygonSymbol3D.js";import"../../symbols/SimpleFillSymbol.js";import"../../symbols/SimpleMarkerSymbol.js";import"../../symbols/TextSymbol.js";import"../../symbols/WebStyleSymbol.js";import"../../symbols/support/jsonUtils.js";import"../../chunks/uid.js";import"../../Graphic.js";import r from"../../core/Handles.js";import"../../layers/Layer.js";import"../../chunks/unitUtils.js";import"../../chunks/lengthUtils.js";import"../../geometry/support/normalizeUtils.js";import"../../chunks/timeUtils.js";import"../../TimeExtent.js";import"../../core/watchUtils.js";import"../../chunks/fieldType.js";import"../../chunks/mat4.js";import"../../chunks/pe.js";import"../../chunks/aaBoundingRect.js";import"../../chunks/geodesicConstants.js";import"../../geometry/support/GeographicTransformationStep.js";import"../../geometry/support/GeographicTransformation.js";import"../../geometry/projection.js";import"../../chunks/unitConversionUtils.js";import"../../core/HandleOwner.js";import"../../chunks/_commonjsHelpers.js";import"../../chunks/vec4f64.js";import"../../chunks/quatf64.js";import"../../chunks/mat3.js";import"../../chunks/BufferView.js";import"../../chunks/vec2.js";import"../../chunks/vec4.js";import"../../chunks/domUtils.js";import"../../chunks/widgetUtils.js";import"../../chunks/projector.js";import"../../chunks/accessibleHandler.js";import"../../chunks/messageBundle.js";import"../../chunks/renderable.js";import"../../chunks/vmEvent.js";import"../../chunks/index.js";import"../../widgets/support/widget.js";import"../../widgets/Widget.js";import"../../chunks/zscale.js";import"../../chunks/queryZScale.js";import"../../layers/support/Field.js";import"../../tasks/support/FeatureSet.js";import"../../chunks/DataLayerSource.js";import"../../tasks/support/AttachmentQuery.js";import"../../tasks/support/Query.js";import"../../tasks/support/StatisticDefinition.js";import"../../tasks/support/RelationshipQuery.js";import"../../tasks/Task.js";import"../../chunks/OptimizedGeometry.js";import"../../chunks/featureConversionUtils.js";import"../../tasks/QueryTask.js";import"../../chunks/pbf.js";import"../../chunks/pbfQueryUtils.js";import"../../chunks/query.js";import"../../layers/support/AttachmentInfo.js";import"../../chunks/aaBoundingBox.js";import"../../chunks/Queue.js";import{V as n}from"../../chunks/InputManager.js";import"../../chunks/interactiveToolUtils.js";import"../../chunks/throttle.js";import"../../widgets/Attachments.js";import"../../widgets/Attachments/AttachmentsViewModel.js";import"../../widgets/Feature/FeatureViewModel.js";import"../../widgets/Feature.js";import"../../chunks/AnchorElementViewModel.js";import"../../widgets/Spinner/SpinnerViewModel.js";import"../../widgets/Popup.js";import"../../chunks/layerViewUtils.js";import"../../chunks/actions.js";import"../../chunks/GoTo.js";import"../../widgets/Popup/PopupViewModel.js";import{c as p}from"../../chunks/screenUtils2.js";import"../../chunks/quantizationUtils.js";import"../../chunks/dehydratedFeatures.js";import"../../chunks/ElevationProvider.js";import"../../chunks/vec2f64.js";import"../../chunks/requestImageUtils.js";import"../../chunks/PiUtils.glsl.js";import"../../chunks/Program.js";import"../../chunks/isWebGL2Context.js";import"../../chunks/glUtil.js";import"../../chunks/InterleavedLayout.js";import"../../chunks/mat4f32.js";import"../../chunks/vec3f32.js";import"../../chunks/geometryUtils.js";import"../../chunks/ColorMaterial.js";import"../../chunks/Util.js";import"../../chunks/Geometry.js";import"../../chunks/VertexArrayObject.js";import"../../chunks/sdfPrimitives.js";import"../../chunks/Object3D.js";import"../../chunks/DefaultTextureUnits.js";import"../../chunks/GLMaterialTexture.js";import"../../chunks/VerticalOffset.glsl.js";import"../../chunks/elevationAlignmentUtils.js";import"../../chunks/RenderingContext.js";import"../../chunks/CameraSpace.glsl.js";import"../../chunks/Texture.js";import"../../chunks/vec4f32.js";import m from"./DrawAction.js";import{V as l,a,b as h,K as c,C as u,D as d}from"../../chunks/Keys.js";import{d as j,D as y,a as v}from"../../chunks/DrawTool.js";import"../../chunks/elevationInfoUtils.js";import"../../chunks/InteractiveToolBase.js";import"../../chunks/RightAngleQuadVisualElement.js";import"../../chunks/LaserLineRenderer.js";let k=class extends m{constructor(t){super(t),this._cursorScreenPoint=null,this._panEnabled=!1,this._cursorVertexAdded=!1,this._popVertexOnPointerMove=!1,this._addVertexOnPointerUp=!1,this._activePointerId=null,this._viewHandles=new r,this.mode=j,this.vertices=[]}initialize(){"2d"===this.view.type?this._addViewHandles():this._addDrawTool(this.view)}destroy(){"2d"===this.view.type?(this._removeViewHandles(),this._viewHandles.destroy()):this._removeDrawTool(),this.emit("destroy")}get _clickEnabled(){return"click"===this.mode||"hybrid"===this.mode}get _dragEnabled(){return"freehand"===this.mode||"hybrid"===this.mode}addVertex(t,e){this.vertices.splice(e,0,t);const s={vertex:t,vertexIndex:e,undo:()=>this._undoVertexAdd(null,e),redo:()=>this._redoVertexAdd(null,t,e)};this.history.push(s),this._set("redoHistory",[]);const o=new l(this.view,null,e,this.vertices);this.emit("vertex-add",o),o.defaultPrevented&&(this._popVertexOnPointerMove=!0,this.history.pop())}removeVertex(t){const e=this.vertices.splice(t,1)[0],s={vertex:e,vertexIndex:t,undo:()=>this._undoVertexRemove(null,e,t),redo:()=>this._redoVertexRemove(null,t)};this.history.push(s),this._set("redoHistory",[]),this.emit("vertex-remove",new a(this.view,null,t,this.vertices))}updateVertex(t,e){const s=this.vertices[e];this.vertices[e]=t;const o={vertex:t,vertexIndex:e,undo:()=>this._undoVertexUpdate(null,s,e),redo:()=>this._redoVertexUpdate(null,t,e)};this.history.push(o),this._set("redoHistory",[]),this.emit("vertex-update",new h(this.view,null,e,this.vertices))}complete(){"2d"===this.view.type?this._completeDrawing():this._drawTool.completeCreateOperation()}getGeometryZValue(){return this.vertices.length>0&&this.vertices[0].length>2?this.vertices[0][2]:this._get("defaultZ")}_addViewHandles(){this._removeViewHandles(),this._viewHandles.add([this.view.on("click",(t=>{t.stopPropagation()}),n.TOOL),this.view.on("pointer-down",(t=>{this._shouldHandlePointerEvent(t)&&(this._panEnabled||(this._activePointerId=t.pointerId,this._addVertexOnPointerUp=!0,this._cursorScreenPoint=p(t),"touch"===t.pointerType&&this._updateCursor(t.native)))}),n.TOOL),this.view.on("pointer-move",(t=>{this._popVertexOnPointerMove&&(this.vertices.pop(),this._popVertexOnPointerMove=!1),this._cursorScreenPoint=p(t),"touch"!==t.pointerType&&this._updateCursor(t.native)}),n.TOOL),this.view.on("pointer-drag",(t=>{this._shouldHandlePointerEvent(t)&&(this._cursorScreenPoint=p(t),this._dragEnabled&&!this._panEnabled?this._vertexAddHandler(t):this._addVertexOnPointerUp=!1)}),n.TOOL),this.view.on("pointer-up",(t=>{if(this._shouldHandlePointerEvent(t))if(this._activePointerId=null,this._addVertexOnPointerUp){if(!this._clickEnabled)return 1===this.vertices.length&&this.vertices.pop(),void this._drawCompleteHandler(t);this._vertexAddHandler(t)}else{const e="touch"===t.pointerType;this._updateCursor(t.native,e)}}),n.TOOL),this.view.on("drag",(t=>{this._dragEnabled&&e(this._activePointerId)&&!this._panEnabled&&t.stopPropagation()}),n.TOOL),this.view.on("drag",["Shift"],(t=>{t.stopPropagation()}),n.TOOL),this.view.on("double-click",(t=>{t.stopPropagation(),this._drawCompleteHandler(t)}),n.TOOL),this.view.on("double-click",["Control"],(t=>{t.stopPropagation(),this._drawCompleteHandler(t)}),n.TOOL),this.view.on("key-down",(t=>{const{key:e,repeat:s}=t;e===c.vertexAddKey&&!s&&this._cursorScreenPoint?(t.stopPropagation(),this._vertexAddHandler(t)):e===c.drawCompleteKey&&!s&&this._cursorScreenPoint&&this.vertices.length>2?(t.stopPropagation(),this._vertexAddHandler(t),this._drawCompleteHandler(t)):e!==c.undoKey||this.interactiveUndoDisabled||s?e!==c.redoKey||this.interactiveUndoDisabled||s?e!==c.panKey||s||(t.stopPropagation(),this._panEnabled=!0):(t.stopPropagation(),this.redo()):(t.stopPropagation(),this.undo())}),n.TOOL),this.view.on("key-up",(t=>{t.key===c.panKey&&(t.stopPropagation(),this._panEnabled=!1)}),n.TOOL)])}_removeViewHandles(){this._viewHandles.removeAll()}_addDrawTool(t){this._drawTool=new y({view:t,elevationInfo:this.elevationInfo,hasZ:this.hasZ,geometryType:"polygon",mode:this.mode}),this.view.toolViewManager.tools.push(this._drawTool),this.view.activeTool=this._drawTool,this._drawTool.on("vertex-add",(t=>{1===t.vertices.length&&this.emit("vertex-add",new l(this.view,null,t.vertices[0].vertexIndex,this._drawTool.getVertexCoords()))})),this._drawTool.on("cursor-update",(t=>{1===t.vertices.length&&this.emit("cursor-update",new u(this.view,null,t.vertices[0].vertexIndex,this._drawTool.getVertexCoords()))})),this._drawTool.on("complete",(t=>{this.emit("draw-complete",new d(null,this._drawTool.getVertexCoords())),this._removeDrawTool()}))}_removeDrawTool(){e(this._drawTool)&&(this.view.tools.remove(this._drawTool),this._drawTool.destroy(),this._drawTool=null)}_addVertex(t,e){if(this._popCursorVertex(),this.isDuplicateVertex(this.vertices,t))return;const s=this.vertices.length;this.vertices.push(t);const o={vertex:t,vertexIndex:s,undo:()=>this._undoVertexAdd(e,s),redo:()=>this._redoVertexAdd(e,t,s)};this.history.push(o),this._set("redoHistory",[]);const i=new l(this.view,e,s,this.vertices);this.emit("vertex-add",i),i.defaultPrevented&&(this._popVertexOnPointerMove=!0,this.history.pop())}_updateCursor(t,s=!1){if(this._popCursorVertex(),!this._cursorScreenPoint)return;let o=null,i=null;const r=this.getCoordsAndPointFromScreenPoint(this._cursorScreenPoint);e(r)&&(o=r.mapPoint,s||(i=this._pushCursorVertex(r.vertex)));const n=new u(this.view,t,i,this.vertices,o);this.emit("cursor-update",n)}_completeDrawing(t){if(this._activePointerId=null,this._popCursorVertex(),this.vertices.length<3)return;const e=new d(t,this.vertices);this.emit("draw-complete",e),e.defaultPrevented||this._removeViewHandles()}_undoVertexAdd(t,e){this.vertices.splice(e,1),this.emit("undo",new a(this.view,t,e,this.vertices))}_redoVertexAdd(t,e,s){this.vertices.splice(s,0,e),this.emit("redo",new l(this.view,t,s,this.vertices))}_undoVertexRemove(t,e,s){this.vertices.splice(s,0,e),this.emit("undo",new l(this.view,t,s,this.vertices))}_redoVertexRemove(t,e){this.vertices.splice(e,1),this.emit("redo",new a(this.view,t,e,this.vertices))}_undoVertexUpdate(t,e,s){this.vertices[s]=e,this.emit("undo",new h(this.view,t,s,this.vertices))}_redoVertexUpdate(t,e,s){this.vertices[s]=e,this.emit("redo",new h(this.view,t,s,this.vertices))}_pushCursorVertex(t){return this._popCursorVertex(),this.vertices.push(t),this._cursorVertexAdded=!0,this.vertices.length-1}_popCursorVertex(){this._cursorVertexAdded&&(this.vertices.pop(),this._cursorVertexAdded=!1)}_shouldHandlePointerEvent(t){return function(t){return"mouse"!==t.pointerType||0===t.button}(t)&&(s(this._activePointerId)||this._activePointerId===t.pointerId)}_vertexAddHandler(t){if(this._cursorVertexAdded){const e=this.vertices[this.vertices.length-1];this._addVertex(e,t.native)}else{const s=this.getCoordsFromScreenPoint(this._cursorScreenPoint);e(s)&&this._addVertex(s,t.native)}}_drawCompleteHandler(t){this._completeDrawing(t.native)}};t([o({dependsOn:["mode"]})],k.prototype,"_clickEnabled",null),t([o({dependsOn:["mode"]})],k.prototype,"_dragEnabled",null),t([o({type:v})],k.prototype,"mode",void 0),t([o({readOnly:!0})],k.prototype,"vertices",void 0),k=t([i("esri.views.draw.PolygonDrawAction")],k);export{k as PolygonDrawAction};
