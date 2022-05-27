// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../core/typedArrayUtil ../../../../core/maybe ../../../../core/mathUtils ../../../../chunks/vec3f64 ../../../../chunks/vec3 ../../../../geometry/projection ../../../../geometry/support/triangulationUtils ../../webgl-engine/lib/GeometryData ./elevationAlignmentUtils ../../webgl-engine/shaders/RibbonLineTechnique ../../terrain/OverlayRenderer ./constants".split(" "),function(q,w,m,x,t,n,y,u,z,A,f,B,C){function v(a,c,e){const b=[];for(const {index:h,count:d}of a){if(1>=d)continue;
a=3*h;const g=a+3*d;b.push({position:c.subarray(a,g),mapPosition:e?e.subarray(a,g):void 0})}return b}const r=t.create(),p=t.create(),D=4/Math.PI;q.createGeometryData=function(a){const c={},e={};{const {attributeData:{position:k},removeDuplicateStartEnd:E}=a;var b=k.length;var h=(b=k[0]===k[b-3]&&k[1]===k[b-2]&&k[2]===k[b-1])&&1===E;b=k.length/3-(h?1:0);var d=new Uint32Array(2*(b-1));h=h?w.slice(k,0,k.length-3):k;var g=0;for(var l=0;l<b-1;l++)d[g++]=l,d[g++]=l+1;e[f.RibbonVertexAttributeConstants.POSITION]=
{size:3,data:h,offsetIdx:0,strideIdx:3};c[f.RibbonVertexAttributeConstants.POSITION]=d}b=new Uint32Array(c[f.RibbonVertexAttributeConstants.POSITION].length);d=a.attributeData.mapPosition;m.isNone(d)||(c.mapPos=c[f.RibbonVertexAttributeConstants.POSITION],e.mapPos={size:3,data:d,offsetIdx:0,strideIdx:3});m.isSome(a.attributeData.colorFeature)||(e[f.RibbonVertexAttributeConstants.COLOR]={size:4,data:m.unwrapOr(a.attributeData.color,C.WHITE_UNIT),offsetIdx:0,strideIdx:4},c[f.RibbonVertexAttributeConstants.COLOR]=
b);m.isSome(a.attributeData.sizeFeature)||(e[f.RibbonVertexAttributeConstants.SIZE]={size:1,data:new Float32Array([m.unwrapOr(a.attributeData.size,1)]),offsetIdx:0,strideIdx:1},c[f.RibbonVertexAttributeConstants.SIZE]=b);d=a.attributeData.colorFeature;m.isNone(d)||(e[f.RibbonVertexAttributeConstants.COLORFEATUREATTRIBUTE]={size:1,data:new Float32Array([d]),offsetIdx:0,strideIdx:1},c[f.RibbonVertexAttributeConstants.COLOR]=b);d=a.attributeData.sizeFeature;m.isNone(d)||(e[f.RibbonVertexAttributeConstants.SIZEFEATUREATTRIBUTE]=
{size:1,data:new Float32Array([d]),offsetIdx:0,strideIdx:1},c[f.RibbonVertexAttributeConstants.SIZEFEATUREATTRIBUTE]=b);d=a.attributeData.opacityFeature;m.isNone(d)||(e[f.RibbonVertexAttributeConstants.OPACITYFEATUREATTRIBUTE]={size:1,data:new Float32Array([d]),offsetIdx:0,strideIdx:1},c[f.RibbonVertexAttributeConstants.OPACITYFEATUREATTRIBUTE]=b);if("round"===a.join){b=e[f.RibbonVertexAttributeConstants.POSITION].data;d=b.length/3;h=new Float32Array(d);n.set(r,0,0,0);a=m.unwrapOr(a.uniformSize,1);
for(g=-1;g<d;++g){l=0>g?d+g:g;const k=(g+1)%d;n.set(p,b[3*k]-b[3*l],b[3*k+1]-b[3*l+1],b[3*k+2]-b[3*l+2]);n.normalize(p,p);0<=g&&(l=(Math.PI-x.acosClamped(n.dot(r,p)))*D*(1.863798+-2.0062872/Math.pow(1+a/18.2313,.8856294)),h[g]=Math.max(Math.floor(l),0));n.scale(r,p,-1)}e[f.RibbonVertexAttributeConstants.SUBDIVISIONS]={size:1,data:h,offsetIdx:0,strideIdx:1};c[f.RibbonVertexAttributeConstants.SUBDIVISIONS]=c[f.RibbonVertexAttributeConstants.POSITION]}return new z.GeometryData(e,c,"line")};q.geometryToRenderInfo=
function(a,c,e,b){const {position:h,outlines:d}=u.pathsToTriangulationInfo("polygon"===a.type?a.rings:a.paths,a.hasZ,"polygon"===a.type?1:0),g=new Float64Array(h.length);a=A.applyPerVertexElevationAlignment(h,a.spatialReference,0,g,0,h,0,h.length/3,c,e,b);c=null!=a;return{lines:c?v(d,h,g):[],projectionSuccess:c,sampledElevation:a}};q.geometryToRenderInfoDraped=function(a,c){const {position:e,outlines:b}=u.pathsToTriangulationInfo("polygon"===a.type?a.rings:a.paths,!1,"polygon"===a.type?1:0);a=y.projectBuffer(e,
a.spatialReference,0,e,c,0,e.length/3);for(c=2;c<e.length;c+=3)e[c]=B.DRAPED_Z;return{lines:a?v(b,e):[],projectionSuccess:a}};Object.defineProperty(q,"__esModule",{value:!0})});