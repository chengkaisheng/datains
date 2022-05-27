// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../LayerAdapter ../FeatureLayerAdapter ../CSVLayerAdapter ../SceneLayerAdapter ../PointCloudLayerAdapter".split(" "),function(b,k,e,l,m,n){const c={[0]:{adapter:l,type:"csv",label:"CSVLayer"},[2]:{adapter:e,type:"feature",label:"FeatureLayer"},[1]:{adapter:e,type:"geojson",label:"GeoJSONLayer"},[3]:{adapter:m,type:"scene",label:"SceneLayer"},[4]:{adapter:n,type:"point-cloud",label:"PointCloudLayer"}},p=[0,2,1,3,4];b.createLayerAdapter=function(a,d=p){if(a instanceof k)return a;let f=
null;d.some(g=>{const h=a.type===c[g].type;h&&(f=new c[g].adapter({layer:a}));return h});return f};b.getLayerTypeLabels=function(a){return a.map(d=>c[d].label)};Object.defineProperty(b,"__esModule",{value:!0})});