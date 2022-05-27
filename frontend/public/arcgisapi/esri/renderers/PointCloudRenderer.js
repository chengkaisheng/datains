// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ../core/has ../core/lang ../core/Logger ../core/accessorSupport/ensureType ../core/accessorSupport/decorators/property ../core/jsonMap ../core/accessorSupport/decorators/subclass ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../core/JSONSupport ./support/pointCloud/ColorModulation ./support/pointCloud/pointSizeAlgorithmTypeUtils".split(" "),function(m,c,d,f,r,t,e,h,n,u,v,w,a,p,q){d=h.strict()({pointCloudClassBreaksRenderer:"point-cloud-class-breaks",
pointCloudRGBRenderer:"point-cloud-rgb",pointCloudStretchRenderer:"point-cloud-stretch",pointCloudUniqueValueRenderer:"point-cloud-unique-value"});a=function(k){function g(b){b=k.call(this,b)||this;b.type=void 0;b.pointSizeAlgorithm=null;b.colorModulation=null;b.pointsPerInch=10;return b}m._inheritsLoose(g,k);var l=g.prototype;l.clone=function(){console.warn(".clone() is not implemented for "+this.declaredClass);return null};l.cloneProperties=function(){return{pointSizeAlgorithm:f.clone(this.pointSizeAlgorithm),
colorModulation:f.clone(this.colorModulation),pointsPerInch:f.clone(this.pointsPerInch)}};return g}(a.JSONSupport);c.__decorate([e.property({type:d.apiValues,readOnly:!0,nonNullable:!0,json:{type:d.jsonValues,read:!1,write:d.write}})],a.prototype,"type",void 0);c.__decorate([e.property({types:q.pointSizeAlgorithmTypes,json:{write:!0}})],a.prototype,"pointSizeAlgorithm",void 0);c.__decorate([e.property({type:p["default"],json:{write:!0}})],a.prototype,"colorModulation",void 0);c.__decorate([e.property({json:{write:!0},
nonNullable:!0,type:Number})],a.prototype,"pointsPerInch",void 0);a=c.__decorate([n.subclass("esri.renderers.PointCloudRenderer")],a);(a||(a={})).fieldTransformTypeKebabDict=new h.JSONMap({none:"none",lowFourBit:"low-four-bit",highFourBit:"high-four-bit",absoluteValue:"absolute-value",moduloTen:"modulo-ten"});return a});