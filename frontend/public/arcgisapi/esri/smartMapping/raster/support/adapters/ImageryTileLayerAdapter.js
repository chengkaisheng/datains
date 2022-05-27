// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../../chunks/_rollupPluginBabelHelpers ../../../../chunks/tslib.es6 ../../../../core/has ../../../../core/Logger ../../../../core/accessorSupport/ensureType ../../../../core/accessorSupport/decorators/property ../../../../core/jsonMap ../../../../core/accessorSupport/decorators/subclass ../../../../core/Error ../../../../core/urlUtils ../../../../core/uuid ../../../../portal/support/resourceExtension ../../../../core/promiseUtils ../../../../geometry/Extent ../../../../layers/support/rasterFunctions/pixelUtils ./RasterLayerAdapter".split(" "),
function(u,q,g,B,C,v,D,w,x,E,F,G,r,y,z,A){g=function(t){function m(){return t.apply(this,arguments)||this}u._inheritsLoose(m,t);var f=m.prototype;f.generateRasterInfo=function(a){return r.resolve(this.rasterInfo)};f.estimateStatisticsHistograms=async function(a){if(null!==this._statsCache)return this._statsCache;const {raster:b}=this.layer,{extent:h,width:n,height:c}=this.getSamplePixelBlockDescriptor(b.rasterInfo);({pixelBlock:a}=await b.fetchPixels(h,n,c,a));if(null==a)throw new x("raster-layer-adapter",
"Unable to estimate histograms");return this._statsCache=z.estimateStatisticsHistograms(a)};f.supportsMultidirectionalHillshade=function(){return!0};f.load=function(a){this.addResolvingPromise(this.layer.load(a).then(()=>this.rasterInfo=this.layer.raster.rasterInfo));return r.resolve(this)};f.getSamplePixelBlockDescriptor=function(a,b=1E3){const {pyramidScalingFactor:h,maximumPyramidLevel:n}=a.storageInfo;let {extent:c,width:d,height:e,pixelSize:k}=a,p=Math.ceil(Math.log(Math.max(d,e)/b)/Math.log(h))-
1,l=a=0;p<=n?(b=Math.pow(h,p),d=Math.floor(d/b),e=Math.floor(e/b)):(p=0,d=Math.min(d,b),e=Math.min(e,b),a=Math.max(Math.floor(d/2-500),0),l=Math.max(Math.floor(e/2-500),0),c=new y({xmin:c.xmin+a*k.x,xmax:Math.min(c.xmax,c.xmin+a*k.x*b),ymin:c.ymin+l*k.y,ymax:Math.min(c.ymax,c.ymin+l*k.y*b)}));return{extent:c,width:d,height:e,origin:{x:a,y:l}}};return m}(A);q.__decorate([v.property()],g.prototype,"layer",void 0);return g=q.__decorate([w.subclass("esri.smartMapping.support.adapters.ImageryTileLayerAdapter")],
g)});