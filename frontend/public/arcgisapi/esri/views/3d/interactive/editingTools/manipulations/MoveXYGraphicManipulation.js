// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../../chunks/_rollupPluginBabelHelpers ../../../../../core/maybe ../../../../../core/Handles ../../../../interactive/dragEventPipeline ../../../../interactive/GraphicManipulator ../dragEventPipeline3D ./Manipulation ./moveUtils".split(" "),function(k,n,p,q,e,r,t,f,u){f=function(l){function g(a){var b=l.call(this)||this;b._handles=new q;b._view=a.view;b._tool=a.tool;b._graphicState=a.graphicState;b._createManipulator();b.forEachManipulator(c=>b._tool.manipulators.add(c));return b}
n._inheritsLoose(g,l);var d=g.prototype;d.destroy=function(){this._handles.destroy();this.forEachManipulator(a=>{this._tool.manipulators.remove(a);a.destroy()});this._graphicState=this._manipulator=this._view=this._tool=null};d.forEachManipulator=function(a){a(this._manipulator,1)};d.createGraphicDragPipeline=function(a){return u.createGraphicMoveDragPipeline(this._graphicState,a,b=>this.createDragPipeline(b))};d.createDragPipeline=function(a){const b=this._view,c=this._graphicState.graphic,v=p.isSome(c.geometry)?
c.geometry.spatialReference:null;return e.createManipulatorDragEventPipeline(this._manipulator,(w,h,x,y,m)=>{h=h.next(t.screenToMapXYForGraphic(m,b,c,v)).next(e.addMapDelta()).next(e.addScreenDelta());a(w,h,x,y,m)})};d._createManipulator=function(){this._manipulator=new r.GraphicManipulator({graphic:this._graphicState.graphic,view:this._view,selectable:!0,cursor:"move"})};return g}(f.Manipulation);k.MoveXYGraphicManipulation=f;Object.defineProperty(k,"__esModule",{value:!0})});