/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
import{_ as s}from"../chunks/tslib.es6.js";import"../chunks/ArrayPool.js";import"../chunks/object.js";import"../chunks/deprecate.js";import"../core/lang.js";import"../config.js";import"../chunks/Logger.js";import"../chunks/string.js";import"../chunks/metadata.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import"../core/Accessor.js";import"../chunks/PropertyOrigin.js";import"../core/scheduling.js";import{ignoreAbortErrors as e}from"../core/promiseUtils.js";import"../chunks/Message.js";import"../core/Error.js";import"../chunks/compilerUtils.js";import"../chunks/ensureType.js";import{subclass as o}from"../core/accessorSupport/decorators/subclass.js";import"../chunks/Evented.js";import"../core/Collection.js";import"../chunks/collectionUtils.js";import"../chunks/JSONSupport.js";import"../chunks/Promise.js";import"../chunks/Loadable.js";import"../chunks/asyncUtils.js";import"../chunks/loadAll.js";import"../core/urlUtils.js";import{aliasOf as r}from"../core/accessorSupport/decorators/aliasOf.js";import"../core/accessorSupport/decorators/cast.js";import"../chunks/jsonMap.js";import"../chunks/enumeration.js";import"../chunks/reader.js";import"../chunks/writer.js";import"../chunks/resourceExtension.js";import"../chunks/persistableUrlUtils.js";import"../geometry/SpatialReference.js";import"../chunks/locale.js";import"../chunks/number.js";import"../intl.js";import"../kernel.js";import"../request.js";import"../chunks/assets.js";import"../geometry/Geometry.js";import"../geometry/Point.js";import"../chunks/Ellipsoid.js";import"../geometry/support/webMercatorUtils.js";import"../geometry/Extent.js";import"../portal/PortalQueryParams.js";import"../portal/PortalQueryResult.js";import"../portal/PortalFolder.js";import"../portal/PortalGroup.js";import"../portal/PortalUser.js";import"../portal/Portal.js";import"../portal/PortalItemResource.js";import"../portal/PortalRating.js";import"../portal/PortalItem.js";import"../chunks/writeUtils.js";import"../chunks/mathUtils2.js";import"../chunks/vec3f64.js";import"../chunks/common.js";import"../chunks/vec3.js";import"../chunks/mathUtils.js";import"../chunks/colorUtils.js";import"../Color.js";import"../chunks/zmUtils.js";import"../geometry/Multipoint.js";import"../geometry/Polygon.js";import"../chunks/extentUtils.js";import"../geometry/Polyline.js";import"../chunks/typeUtils.js";import"../geometry/support/jsonUtils.js";import"../geometry.js";import"../layers/support/CodedValueDomain.js";import"../layers/support/Domain.js";import"../layers/support/InheritedDomain.js";import"../layers/support/RangeDomain.js";import"../chunks/domains.js";import"../chunks/arcadeOnDemand.js";import"../layers/support/fieldUtils.js";import"../popup/content/Content.js";import"../popup/content/AttachmentsContent.js";import"../popup/content/CustomContent.js";import"../chunks/date.js";import"../popup/support/FieldInfoFormat.js";import"../popup/FieldInfo.js";import"../popup/content/FieldsContent.js";import"../chunks/MediaInfo.js";import"../popup/content/support/ChartMediaInfoValueSeries.js";import"../popup/content/support/ChartMediaInfoValue.js";import"../chunks/chartMediaInfoUtils.js";import"../popup/content/BarChartMediaInfo.js";import"../popup/content/ColumnChartMediaInfo.js";import"../popup/content/support/ImageMediaInfoValue.js";import"../popup/content/ImageMediaInfo.js";import"../popup/content/LineChartMediaInfo.js";import"../popup/content/PieChartMediaInfo.js";import"../popup/content/MediaContent.js";import"../popup/content/TextContent.js";import"../popup/content.js";import"../popup/ExpressionInfo.js";import"../popup/LayerOptions.js";import"../popup/support/RelatedRecordsInfoFieldOrder.js";import"../popup/RelatedRecordsInfo.js";import"../chunks/Identifiable.js";import"../support/actions/ActionBase.js";import"../support/actions/ActionButton.js";import"../support/actions/ActionToggle.js";import"../PopupTemplate.js";import"../symbols/Symbol.js";import"../symbols/CIMSymbol.js";import"../symbols/Symbol3DLayer.js";import"../chunks/screenUtils.js";import"../chunks/opacityUtils.js";import"../chunks/materialUtils.js";import"../symbols/edges/Edges3D.js";import"../symbols/edges/SketchEdges3D.js";import"../symbols/edges/SolidEdges3D.js";import"../chunks/utils.js";import"../chunks/Symbol3DMaterial.js";import"../symbols/ExtrudeSymbol3DLayer.js";import"../symbols/LineSymbol.js";import"../symbols/LineSymbolMarker.js";import"../symbols/SimpleLineSymbol.js";import"../symbols/FillSymbol.js";import"../symbols/patterns/StylePattern3D.js";import"../symbols/FillSymbol3DLayer.js";import"../chunks/colors.js";import"../chunks/Symbol3DOutline.js";import"../symbols/Font.js";import"../symbols/IconSymbol3DLayer.js";import"../symbols/LineSymbol3DLayer.js";import"../symbols/ObjectSymbol3DLayer.js";import"../symbols/PathSymbol3DLayer.js";import"../symbols/TextSymbol3DLayer.js";import"../symbols/WaterSymbol3DLayer.js";import"../symbols/Symbol3D.js";import"../chunks/Thumbnail.js";import"../symbols/callouts/Callout3D.js";import"../symbols/callouts/LineCallout3D.js";import"../chunks/Symbol3DVerticalOffset.js";import"../symbols/LabelSymbol3D.js";import"../symbols/LineSymbol3D.js";import"../symbols/MarkerSymbol.js";import"../symbols/MeshSymbol3D.js";import"../chunks/urlUtils.js";import"../symbols/PictureFillSymbol.js";import"../symbols/PictureMarkerSymbol.js";import"../symbols/PointSymbol3D.js";import"../symbols/PolygonSymbol3D.js";import"../symbols/SimpleFillSymbol.js";import"../symbols/SimpleMarkerSymbol.js";import"../symbols/TextSymbol.js";import"../symbols/WebStyleSymbol.js";import"../symbols/support/jsonUtils.js";import"../chunks/uid.js";import"../Graphic.js";import"../core/Handles.js";import"../layers/Layer.js";import"../chunks/TablesMixin.js";import{s as i}from"../chunks/unitUtils.js";import"../chunks/lengthUtils.js";import"../geometry/support/normalizeUtils.js";import"../chunks/timeUtils.js";import"../TimeExtent.js";import"../chunks/ReadOnlyMultiOriginJSONSupport.js";import"../chunks/MultiOriginJSONSupport.js";import"../core/watchUtils.js";import"../chunks/fieldType.js";import"../chunks/mat4.js";import"../chunks/pe.js";import"../chunks/aaBoundingRect.js";import"../chunks/geodesicConstants.js";import"../geometry/support/GeographicTransformationStep.js";import"../geometry/support/GeographicTransformation.js";import"../geometry/projection.js";import"../chunks/OperationalLayer.js";import"../chunks/ElevationInfo.js";import"../chunks/unitConversionUtils.js";import"../chunks/commonProperties2.js";import"../core/HandleOwner.js";import"../chunks/_commonjsHelpers.js";import"../geometry/support/geodesicUtils.js";import"../geometry/Circle.js";import"../chunks/geometryEngineBase.js";import"../chunks/hydrated.js";import"../geometry/geometryEngine.js";import"../chunks/vec4f64.js";import"../chunks/quatf64.js";import"../chunks/mat3.js";import"../chunks/BufferView.js";import"../chunks/vec2.js";import"../chunks/vec4.js";import"../chunks/quat.js";import"../chunks/domUtils.js";import"../chunks/widgetUtils.js";import"../chunks/projector.js";import{a as p}from"../chunks/accessibleHandler.js";import{m}from"../chunks/messageBundle.js";import{r as n}from"../chunks/renderable.js";import"../chunks/vmEvent.js";import{j as a}from"../chunks/index.js";import"./support/widget.js";import l from"./Widget.js";import"../chunks/zscale.js";import"../chunks/queryZScale.js";import"../layers/support/Field.js";import"../tasks/support/FeatureSet.js";import"../chunks/BlendLayer.js";import"../chunks/PortalLayer.js";import"../chunks/ScaleRangeLayer.js";import"../chunks/defaultsJSON.js";import"../chunks/defaults.js";import"../chunks/DataLayerSource.js";import"../tasks/support/AttachmentQuery.js";import"../tasks/support/Query.js";import"../tasks/support/StatisticDefinition.js";import"../tasks/support/RelationshipQuery.js";import"../chunks/GraphicsCollection.js";import"../layers/GraphicsLayer.js";import"../layers/GroupLayer.js";import"../tasks/Task.js";import"../chunks/OptimizedGeometry.js";import"../chunks/featureConversionUtils.js";import"../tasks/QueryTask.js";import"../chunks/pbf.js";import"../chunks/pbfQueryUtils.js";import"../chunks/query.js";import"../layers/support/AttachmentInfo.js";import"../chunks/aaBoundingBox.js";import"../chunks/Queue.js";import"../chunks/InputManager.js";import"../chunks/interactiveToolUtils.js";import"../chunks/throttle.js";import"./Attachments.js";import"./Attachments/AttachmentsViewModel.js";import"./Feature/FeatureViewModel.js";import"./Feature.js";import"../chunks/AnchorElementViewModel.js";import"./Spinner/SpinnerViewModel.js";import"./Popup.js";import"../chunks/layerViewUtils.js";import"../chunks/actions.js";import"../chunks/GoTo.js";import"./Popup/PopupViewModel.js";import"../chunks/screenUtils2.js";import"../chunks/quantizationUtils.js";import"../chunks/mat2d.js";import"../chunks/dehydratedFeatures.js";import"../chunks/ElevationProvider.js";import"../chunks/mat2df64.js";import"../chunks/vec2f64.js";import"../chunks/PointerClickHoldAndDrag.js";import"../chunks/requestImageUtils.js";import"../chunks/PiUtils.glsl.js";import"../chunks/Program.js";import"../chunks/isWebGL2Context.js";import"../chunks/glUtil.js";import"../chunks/InterleavedLayout.js";import"../chunks/mat4f32.js";import"../chunks/vec3f32.js";import"../chunks/geometryUtils.js";import"../chunks/ColorMaterial.js";import"../chunks/Util.js";import"../chunks/Geometry.js";import"../chunks/VertexArrayObject.js";import"../chunks/sdfPrimitives.js";import"../chunks/Object3D.js";import"../chunks/DefaultTextureUnits.js";import"../chunks/GLMaterialTexture.js";import"../chunks/VerticalOffset.glsl.js";import"../chunks/elevationAlignmentUtils.js";import"../chunks/RenderingContext.js";import"../chunks/CameraSpace.glsl.js";import"../chunks/Texture.js";import"../chunks/vec4f32.js";import"../views/draw/DrawAction.js";import"../chunks/Keys.js";import"../views/draw/MultipointDrawAction.js";import"../chunks/DrawTool.js";import"../chunks/elevationInfoUtils.js";import"../chunks/InteractiveToolBase.js";import"../chunks/RightAngleQuadVisualElement.js";import"../chunks/LaserLineRenderer.js";import"../views/draw/PointDrawAction.js";import"../views/draw/PolygonDrawAction.js";import"../views/draw/PolylineDrawAction.js";import"../views/draw/SegmentDrawAction.js";import"../views/draw/Draw.js";import"../chunks/drapedUtils.js";import"../chunks/GraphicManipulator.js";import u from"./AreaMeasurement2D/AreaMeasurement2DViewModel.js";import"../chunks/commonProperties3.js";import"../chunks/InteractiveToolViewModel.js";const c="esri-button esri-button--secondary",j="esri-button--disabled",h="esri-icon-measure-area",d="esri-area-measurement-2d",k="esri-widget",y="esri-widget--panel",b="esri-area-measurement-2d__container",g="esri-area-measurement-2d__hint",v="esri-area-measurement-2d__hint-text",w="esri-area-measurement-2d__panel--error",f="esri-area-measurement-2d__measurement",M="esri-area-measurement-2d__measurement-item",S="esri-area-measurement-2d__measurement-item--disabled",U="esri-area-measurement-2d__measurement-item-title",D="esri-area-measurement-2d__measurement-item-value",_="esri-area-measurement-2d__settings",P="esri-area-measurement-2d__units",L="esri-area-measurement-2d__units-label",C="esri-area-measurement-2d__units-select esri-select",I="esri-area-measurement-2d__units-select-wrapper",A="esri-area-measurement-2d__actions",O="esri-area-measurement-2d__clear-button";let x=class extends l{constructor(s,t){super(s,t),this.active=null,this.iconClass=h,this.label=void 0,this.messages=null,this.messagesUnits=null,this.unit=null,this.unitOptions=null,this.view=null,this.viewModel=new u}render(){const{id:s,viewModel:t,visible:e}=this,{active:o,isSupported:r,measurementLabel:p,state:m,unit:n,unitOptions:l}=t,u="disabled"===m,h="ready"===m,x="measuring"===m||"measured"===m,{messages:T,messagesUnits:E}=this,F=o&&h?a("section",{key:"hint",class:g},a("p",{class:v},T.hint)):null,V=r?null:a("section",{key:"unsupported",class:w},a("p",null,T.unsupported)),R=(s,t,e)=>t?a("div",{key:`${e}-enabled`,class:M},a("span",{class:U},s),a("span",{class:D},t)):a("div",{key:`${e}-disabled`,class:this.classes(M,S),"aria-disabled":"true"},a("span",{class:U},s)),G=x?a("section",{key:"measurement",class:f},R(T.area,p.area,"area"),R(T.perimeter,p.perimeter,"perimeter")):null,B=`${s}__units`,Q=a("section",{key:"units",class:P},a("label",{class:L,for:B},T.unit),a("div",{class:I},a("select",{class:C,id:B,onchange:this._changeUnit,bind:this,value:n},l.map((s=>{var t;return a("option",{key:s,value:s},i(s)?E.systems[s]:null==(t=E.units[s])?void 0:t.pluralCapitalized)}))))),q=x?a("div",{key:"settings",class:_},Q):null,z=!r||o&&!x?null:a("div",{class:A},a("button",{disabled:u,class:this.classes(c,O,u&&j),bind:this,onclick:this._newMeasurement,title:T.newMeasurement,type:"button","aria-label":T.newMeasurement},T.newMeasurement)),H=e?a("div",{class:b},V,F,q,G,z):null;return a("div",{class:this.classes(d,k,y)},H)}_newMeasurement(){e(this.viewModel.start())}_changeUnit(s){const t=s.target,e=t.options[t.selectedIndex];e&&(this.viewModel.unit=e.value)}};s([r("viewModel.active"),n()],x.prototype,"active",void 0),s([t()],x.prototype,"iconClass",void 0),s([t({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],x.prototype,"label",void 0),s([t(),n(),m("esri/widgets/AreaMeasurement2D/t9n/AreaMeasurement2D")],x.prototype,"messages",void 0),s([t(),n(),m("esri/core/t9n/Units")],x.prototype,"messagesUnits",void 0),s([r("viewModel.unit")],x.prototype,"unit",void 0),s([r("viewModel.unitOptions")],x.prototype,"unitOptions",void 0),s([r("viewModel.view")],x.prototype,"view",void 0),s([t({type:u}),n(["viewModel.state","viewModel.unitOptions","viewModel.unit","viewModel.measurementLabel"])],x.prototype,"viewModel",void 0),s([r("viewModel.visible"),n()],x.prototype,"visible",void 0),s([p()],x.prototype,"_newMeasurement",null),s([p()],x.prototype,"_changeUnit",null),x=s([o("esri.widgets.AreaMeasurement2D")],x);var T=x;export default T;
