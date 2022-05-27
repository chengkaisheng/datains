// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../core/compilerUtils ../../geometry/SpatialReference ../../core/uid ../../layers/support/Field ../../layers/graphics/featureConversionUtils ./zscale ../../layers/graphics/dehydratedFeatures".split(" "),function(l,q,r,t,u,m,v,n){function w(e,c){return c}function k(e,c,a,b){switch(a){case 0:return h(e,c+b,0);case 1:return"lowerLeft"===e.originPosition?h(e,c+b,1):x(e,c+b,1)}}function p(e,c,a,b){switch(a){case 2:return h(e,c,2);default:return k(e,c,a,b)}}function y(e,c,a,b){switch(a){case 2:return h(e,
c,3);default:return k(e,c,a,b)}}function z(e,c,a,b){switch(a){case 3:return h(e,c,3);default:return p(e,c,a,b)}}function h({translate:e,scale:c},a,b){return e[b]+a*c[b]}function x({translate:e,scale:c},a,b){return e[b]-a*c[b]}let B=function(){function e(a){this.options=a;this.geometryTypes=["point","multipoint","polyline","polygon"];this.previousCoordinate=[0,0];this.transform=null;this.applyTransform=w;this.lengths=[];this.vertexDimension=this.toAddInCurrentPath=this.currentLengthIndex=0;this.coordinateBuffer=
null;this.coordinateBufferPtr=0;this.AttributesConstructor=function(){}}var c=e.prototype;c.createFeatureResult=function(){return new n.DehydratedFeatureSetClass};c.finishFeatureResult=function(a){this.options.applyTransform&&(a.transform=null);this.AttributesConstructor=function(){};this.coordinateBuffer=null;this.lengths.length=0;if(a.hasZ){var b=v.getGeometryZScaler(a.geometryType,this.options.sourceSpatialReference,a.spatialReference);if(b)for(const d of a.features)b(d.geometry)}};c.createSpatialReference=
function(){return new r};c.addField=function(a,b){a.fields.push(u.fromJSON(b));const d=a.fields.map(f=>f.name);this.AttributesConstructor=function(){for(const f of d)this[f]=null}};c.addFeature=function(a,b){const d=this.options.maxStringAttributeLength?this.options.maxStringAttributeLength:0;if(0<d)for(const f in b.attributes){const g=b.attributes[f];"string"===typeof g&&g.length>d&&(b.attributes[f]="")}a.features.push(b)};c.addQueryGeometry=function(a,b){const {queryGeometry:d,queryGeometryType:f}=
b;b=m.unquantizeOptimizedGeometry(d.clone(),d,!1,!1,this.transform);b=m.convertToGeometry(b,f,!1,!1);let g=null;switch(f){case "esriGeometryPoint":g="point";break;case "esriGeometryPolygon":g="polygon";break;case "esriGeometryPolyline":g="polyline";break;case "esriGeometryMultipoint":g="multipoint"}b.type=g;a.queryGeometryType=f;a.queryGeometry=b};c.prepareFeatures=function(a){this.transform=a.transform;this.options.applyTransform&&a.transform&&(this.applyTransform=this.deriveApplyTransform(a));this.vertexDimension=
2;a.hasZ&&this.vertexDimension++;a.hasM&&this.vertexDimension++;switch(a.geometryType){case "point":this.addCoordinate=(b,d,f)=>this.addCoordinatePoint(b,d,f);this.createGeometry=b=>this.createPointGeometry(b);break;case "polygon":this.addCoordinate=(b,d,f)=>this.addCoordinatePolygon(b,d,f);this.createGeometry=b=>this.createPolygonGeometry(b);break;case "polyline":this.addCoordinate=(b,d,f)=>this.addCoordinatePolyline(b,d,f);this.createGeometry=b=>this.createPolylineGeometry(b);break;case "multipoint":this.addCoordinate=
(b,d,f)=>this.addCoordinateMultipoint(b,d,f);this.createGeometry=b=>this.createMultipointGeometry(b);break;default:q.neverReached(a.geometryType)}};c.createFeature=function(){this.currentLengthIndex=this.lengths.length=0;this.previousCoordinate[0]=0;this.previousCoordinate[1]=0;this.coordinateBuffer=null;this.coordinateBufferPtr=0;return new n.DehydratedFeatureClass(t.generateUID(),null,new this.AttributesConstructor)};c.addLength=function(a,b,d){0===this.lengths.length&&(this.toAddInCurrentPath=
b);this.lengths.push(b)};c.createPointGeometry=function(a){a={type:"point",x:0,y:0,spatialReference:a.spatialReference,hasZ:!!a.hasZ,hasM:!!a.hasM};a.hasZ&&(a.z=0);a.hasM&&(a.m=0);return a};c.addCoordinatePoint=function(a,b,d){b=this.applyTransform(this.transform,b,d,0);switch(d){case 0:a.x=b;break;case 1:a.y=b;break;case 2:a.hasZ?a.z=b:a.m=b;break;case 3:a.m=b}};c.transformPathLikeValue=function(a,b){let d=0;1>=b&&(d=this.previousCoordinate[b],this.previousCoordinate[b]+=a);return this.applyTransform(this.transform,
a,b,d)};c.addCoordinatePolyline=function(a,b,d){this.dehydratedAddPointsCoordinate(a.paths,b,d)};c.addCoordinatePolygon=function(a,b,d){this.dehydratedAddPointsCoordinate(a.rings,b,d)};c.addCoordinateMultipoint=function(a,b,d){0===d&&a.points.push([]);b=this.transformPathLikeValue(b,d);a.points[a.points.length-1].push(b)};c.createPolygonGeometry=function(a){return{type:"polygon",rings:[[]],spatialReference:a.spatialReference,hasZ:!!a.hasZ,hasM:!!a.hasM}};c.createPolylineGeometry=function(a){return{type:"polyline",
paths:[[]],spatialReference:a.spatialReference,hasZ:!!a.hasZ,hasM:!!a.hasM}};c.createMultipointGeometry=function(a){return{type:"multipoint",points:[],spatialReference:a.spatialReference,hasZ:!!a.hasZ,hasM:!!a.hasM}};c.dehydratedAddPointsCoordinate=function(a,b,d){if(null===this.coordinateBuffer){const f=this.lengths.reduce((g,A)=>g+A,0);this.coordinateBuffer=new Float64Array(f*this.vertexDimension)}0===d&&0===this.toAddInCurrentPath--&&(a.push([]),this.toAddInCurrentPath=this.lengths[++this.currentLengthIndex]-
1,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0);b=this.transformPathLikeValue(b,d);a=a[a.length-1];0===d&&a.push(new Float64Array(this.coordinateBuffer.buffer,this.coordinateBufferPtr*Float64Array.BYTES_PER_ELEMENT,this.vertexDimension));this.coordinateBuffer[this.coordinateBufferPtr++]=b};c.deriveApplyTransform=function(a){const {hasZ:b,hasM:d}=a;return b&&d?z:b?p:d?y:k};return e}();l.DehydratedFeatureSetParserContext=B;Object.defineProperty(l,"__esModule",{value:!0})});