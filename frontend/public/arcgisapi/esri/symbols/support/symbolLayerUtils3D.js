// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","../../core/has","../../chunks/vec3f64","../../geometry/support/aaBoundingBox"],function(d,p,n,g){const h=g.fromValues(-.5,-.5,-.5,.5,.5,.5),k=g.fromValues(-.5,-.5,0,.5,.5,1),l=g.fromValues(-.5,-.5,0,.5,.5,.5);d.OBJECT_SYMBOL_LAYER_BOUNDING_BOX_TETRAHEDRON=l;d.OBJECT_SYMBOL_LAYER_BOUNDING_BOX_UNIT_CUBE=h;d.OBJECT_SYMBOL_LAYER_BOUNDING_BOX_UNIT_CYLINDER=k;d.objectSymbolLayerPrimitiveBoundingBox=function(b){switch(b){case "sphere":case "cube":case "diamond":return h;case "cylinder":case "cone":case "inverted-cone":return k;
case "tetrahedron":return l}};d.objectSymbolLayerSizeWithResourceSize=function(b,{isPrimitive:e,width:c,depth:a,height:f}){e=e?10:1;if(null==c&&null==f&&null==a)return[e*b[0],e*b[1],e*b[2]];c=n.fromValues(c,a,f);let m;for(a=0;3>a;a++)if(f=c[a],null!=f){m=f/b[a];break}for(a=0;3>a;a++)null==c[a]&&(c[a]=b[a]*m);return c};Object.defineProperty(d,"__esModule",{value:!0})});