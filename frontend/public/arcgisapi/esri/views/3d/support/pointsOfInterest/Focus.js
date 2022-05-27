// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../chunks/tslib.es6 ../../../../core/has ../../../../core/maybe ../../../../core/Logger ../../../../core/accessorSupport/ensureType ../../../../core/accessorSupport/decorators/property ../../../../core/jsonMap ../../../../core/accessorSupport/decorators/subclass ../../../../core/urlUtils ../../../../core/uuid ../../../../portal/support/resourceExtension ../../../../geometry/Point ../../../../core/mathUtils ../../../../core/screenUtils ../../../../chunks/vec3f64 ../../../../chunks/vec3 ../geometryUtils ../debugFlags ../PropertiesPool ./PointOfInterest ../debugUtils".split(" "),
function(c,r,g,I,t,J,K,l,L,x,M,N,O,y,z,A,m,e,B,C,D,E,F){const G=Array;c.Focus=function(n){function p(a){a=n.call(this,a)||this;a._propertiesPool=new D.PropertiesPool({location:y,renderLocation:G},r._assertThisInitialized(a));return a}r._inheritsLoose(p,n);var u=p.prototype;u.destroy=function(){this._propertiesPool.destroy();this._propertiesPool=null;f=t.removeMaybe(f)};u.calculateScreenHorizontalEdgeOnSurface=function(a){const b=this.state.camera,h=this.renderCoordsHelper.getAltitude(this.centerOnSurface.renderLocation);
var d=this.renderCoordsHelper.getAltitude(b.eye)>=h;const v=b.getRenderCenter(A.createRenderScreenPointArray3());v[1]=d?b.padding[2]:b.fullHeight-b.padding[0];if(b.unprojectFromRenderScreen(v,k)&&(e.subtract(k,k,b.eye),d=e.normalize(k,k),this.renderCoordsHelper.intersectManifold(B.ray.wrap(b.eye,d),h,a)))return a;e.copy(a,b.eye);this.renderCoordsHelper.setAltitude(h,a);return a};u.updateRenderLocation=function(){};r._createClass(p,[{key:"location",get:function(){const a=this._propertiesPool.get("location");
this.renderCoordsHelper.fromRenderCoords(this.renderLocation,a,this.state.spatialReference);return a}},{key:"renderLocation",get:function(){const a=this.centerOnSurface.renderLocation;var b=this.renderCoordsHelper;const h=this.calculateScreenHorizontalEdgeOnSurface(H);e.subtract(q,a,this.state.camera.eye);e.normalize(q,q);b.worldUpAtPosition(a,w);var d=Math.abs(Math.acos(e.dot(w,q))-.5*Math.PI);b=this._propertiesPool.get("renderLocation");Number.isNaN(d)?e.copy(b,a):(d=1-z.clamp(d/(.5*Math.PI),0,
1),e.lerp(b,a,h,d*d*d));t.isSome(f)&&(C.SHOW_POI?f.showPoint(b,this.renderCoordsHelper.spatialReference):f.remove());return b}}]);return p}(E.PointOfInterest);g.__decorate([l.property({constructOnly:!0})],c.Focus.prototype,"centerOnSurface",void 0);g.__decorate([l.property({readOnly:!0})],c.Focus.prototype,"location",null);g.__decorate([l.property({readOnly:!0})],c.Focus.prototype,"renderLocation",null);g.__decorate([l.property({readOnly:!0,aliasOf:"centerOnSurface.updating"})],c.Focus.prototype,
"updating",void 0);c.Focus=g.__decorate([x.subclass("esri.views.3d.support.CenterOnSurface")],c.Focus);const q=m.create(),w=m.create(),k=m.create(),H=m.create();let f;c.default=c.Focus;c.setupFocusDebugGraphic=function(n){t.removeMaybe(f);f=new F.GraphicsHandle(n,"green")};Object.defineProperty(c,"__esModule",{value:!0})});