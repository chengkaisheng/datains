// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ./_rollupPluginBabelHelpers ./tslib.es6 ../core/has ../core/lang ../core/Logger ../core/accessorSupport/ensureType ../core/accessorSupport/decorators/property ../core/jsonMap ../core/accessorSupport/decorators/subclass ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../core/JSONSupport ../Color ../symbols/support/materialUtils".split(" "),function(a,h,b,e,k,r,t,l,u,m,v,w,x,n,p,q){var c;a.LineCallout3DBorder$2=c=function(f){function d(){var g=f.apply(this,arguments)||
this;g.color=new p("white");return g}h._inheritsLoose(d,f);d.prototype.clone=function(){return new c({color:k.clone(this.color)})};return d}(n.JSONSupport);b.__decorate([l.property(q.colorAndTransparencyProperty)],a.LineCallout3DBorder$2.prototype,"color",void 0);a.LineCallout3DBorder$2=c=b.__decorate([m.subclass("esri.symbols.callouts.LineCallout3DBorder")],a.LineCallout3DBorder$2);b=a.LineCallout3DBorder$2;e=Object.freeze({__proto__:null,get LineCallout3DBorder(){return a.LineCallout3DBorder$2},
"default":b});a.LineCallout3DBorder=e;a.LineCallout3DBorder$1=b});