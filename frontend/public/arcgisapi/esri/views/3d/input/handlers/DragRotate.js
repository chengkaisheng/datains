// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../core/screenUtils ../../../input/InputHandler ../../../input/handlers/support ../../state/controllers/RotateController".split(" "),function(g,k,l,e,m,n){e=function(h){function f(c,a,d,p){var b=h.call(this,!0)||this;b.view=c;b.pointerAction=a;b.pivotPoint=d;b.registerIncoming("drag",p,q=>b.handleDrag(q));return b}k._inheritsLoose(f,h);f.prototype.handleDrag=function(c){const a=c.data;if(!(1<a.pointers.size)&&m.eventMatchesMousePointerAction(c.data,
this.pointerAction)){var d=l.createScreenPointArray(a.center.x,a.center.y);switch(a.action){case "start":this.cameraController&&(this.cameraController.end(),this.cameraController=null);this.cameraController=new n.RotateController({view:this.view,pivot:this.pivotPoint});this.view.state.switchCameraController(this.cameraController);this.cameraController.begin(d);break;case "update":this.cameraController&&this.cameraController.update(d);break;case "end":this.cameraController&&(this.cameraController.end(),
this.cameraController=null)}c.stopPropagation()}};return f}(e.InputHandler);g.DragRotate=e;Object.defineProperty(g,"__esModule",{value:!0})});