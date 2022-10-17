// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","../../../geometry/support/jsonUtils","../CurveHelper"],function(g,f,h){let k=function(){function d(){}d.local=function(){null===d.instance&&(d.instance=new d);return d.instance};d.prototype.execute=function(a,c,b){return new l(a,c,b)};return d}();k.instance=null;let l=function(){function d(a,c,b){this._inputGeometries=a;this._curveHelper=new h.CurveHelper;this._offset=(void 0!==c.offset?c.offset:1)*b;this._method=c.method;this._option=c.option;this._offsetFlattenError=h.PIXEL_TOLERANCE*
b;this._option}d.prototype.next=function(){for(var a=this._inputGeometries.next();a;){if(0===this._offset)return a;if(f.isExtent(a)){if("Rounded"===this._method&&0<this._offset){var c=this._curveHelper.offset([[a.xmin,a.ymin],[a.xmin,a.ymax],[a.xmax,a.ymax],[a.xmax,a.ymin],[a.xmin,a.ymin]],this._offset,this._method,4,this._offsetFlattenError);return c?{rings:[c]}:null}if(0<Math.min(a.xmax-a.xmin,a.ymax-a.ymin)+2*this._offset)return{xmin:a.xmin-this._offset,xmax:a.xmax+this._offset,ymin:a.ymin-this._offset,
ymax:a.ymax+this._offset}}if(f.isPolygon(a)){var b=[];for(c of a.rings){const e=this._curveHelper.offset(c,this._offset,this._method,4,this._offsetFlattenError);e&&b.push(e)}if(b.length)return{rings:b}}if(f.isPolyline(a)){b=[];for(const e of a.paths)(a=this._curveHelper.offset(e,this._offset,this._method,4,this._offsetFlattenError))&&b.push(a);if(b.length)return{paths:b}}a=this._inputGeometries.next()}return null};return d}();g.EffectOffset=k;Object.defineProperty(g,"__esModule",{value:!0})});