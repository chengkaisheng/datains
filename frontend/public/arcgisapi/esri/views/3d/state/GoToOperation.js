// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../core/maybe ../../../core/Error ../../../core/promiseUtils ../../../Camera ../../../Viewpoint ../../../core/watchUtils ../camera/constraintUtils/surfaceCollision ../../animation/easing ../camera/constraintUtils ./controllers/CameraController ./controllers/PointToPointAnimationController ../support/cameraUtils ./controllers/SurfaceCollisionCorrectionController ../support/viewpointUtils".split(" "),function(q,e,h,k,r,t,u,v,w,x,l,n,y,z,A){let B=function(){function p(a,b,c){this.target=
a;this.options=b;this.view=c;this.state="pending";this.animationController=this.abortController=null;this.promise=k.create((g,m)=>{this.resolveCallback=g;this.rejectCallback=m;g=k.createAbortController();if(e.isSome(this.options.signal))k.onAbort(this.options.signal,()=>{this.abort()});this.abortController=g;this.waitForReady()})}var d=p.prototype;d.then=function(a,b){return this.promise.then(a,b)};d.catch=function(a){return this.promise.catch(a)};d.resolve=function(a){this.state="finished";return this.resolveCallback(a)};
d.reject=function(a){this.state="finished";return this.rejectCallback(a)};d.goTo=function(a,b){switch(this.state){case "pending":case "wait-for-ready":case "wait-for-viewpoint":case "wait-for-animation-finish":b.animate&&this.options.animate?this.reject(new h("AbortError")):this.abort()}return new p(a,b,this.view)};d.waitForReady=function(){this.state="wait-for-ready";this.view.stateManager.view.ready?this.createViewPoint():u.whenOnce(this.view.stateManager.view,"ready",this.abortController.signal).then(()=>
{this.createViewPoint()},a=>{this.reject(a)})};d.createViewPoint=function(){"finished"!==this.state&&(this.state="wait-for-viewpoint",this.animationController=this.options.animate?this.getAnimationController():null,A.create(this.view.stateManager.view,this.target,this.abortController.signal).then(a=>{"finished"!==this.state&&(a=this.getCameraFromViewpoint(a),e.isNone(a)||(this.options.animate?e.isNone(this.animationController)||this.startAnimation(a,this.animationController):(this.view.stateManager.setStateCamera(a.camera,
{applyConstraints:!a.isFullySpecified,positionAndOrientationOnly:!0,doNotCancelGoToOperation:!0}),this.resolve())))},a=>{this.reject(a)}))};d.internalAnimateOptions=function(a){const b={};a&&(null!=a.speedFactor&&(b.speedFactor=a.speedFactor),null!=a.duration&&(b.duration=a.duration/1E3),null!=a.maxDuration&&(b.maxDuration=a.maxDuration/1E3),null!=a.easing&&(b.easing="string"===typeof a.easing?w.named[a.easing]:a.easing));return b};d.getCameraFromViewpoint=function(a){const b=!!(this.target instanceof
t&&this.target.camera||this.target instanceof r);var c=a.camera;if(e.isNone(c))return null;if(!this.view.stateManager.isCompatible(c))return a=(a=c.position)&&a.spatialReference,this.reject(new h("GotoAnimation:incompatible-spatialreference",`Resulting camera has an incompatible spatial reference (camera: ${a?a.wkid:"none"}, view: ${this.view.stateManager.view.spatialReference.wkid})`,{camera:c})),null;c=y.externalToInternal(this.view.stateManager.view,c);return c?{viewpoint:a,camera:c,isFullySpecified:b}:
(this.reject(new h("GotoAnimation:invalid-camera","Resulting camera is invalid")),null)};d.startAnimation=function(a,b){this.state="wait-for-animation-finish";const c=b.viewAnimation;if(e.isNone(c))this.reject(new h("GotoAnimation:missing-animation","Unreachable code in view.stateManager"));else{c.update(a.viewpoint,"running");if(!b.active||e.isNone(b.viewAnimation)||b.viewAnimation.target!==a.viewpoint||this.view.stateManager.view.state.cameraController!==b)return this.abort();if(a.isFullySpecified){var g=
new z.SurfaceCollisionCorrectionController({view:this.view.stateManager.view,desiredCamera:a.camera});v.applySurfaceCollisionConstraint(this.view.stateManager.view,a.camera,1)}else x.applyAll(this.view.stateManager.view,a.camera);b.begin(a.camera,this.internalAnimateOptions(this.options));var m=f=>{if(!e.isNone(this.view.stateManager.view.state))switch(b.state){case l.State.Finished:switch(this.state){case "pending":case "wait-for-ready":case "wait-for-viewpoint":case "wait-for-animation-finish":this.resolve()}break;
case l.State.Ready:case l.State.Rejected:case l.State.Running:case l.State.Stopped:switch(this.state){case "pending":case "wait-for-ready":case "wait-for-viewpoint":case "wait-for-animation-finish":this.reject(f)}}};c.when(()=>{const f=this.view.stateManager.view.state.cameraController;g&&(f&&f.active?f instanceof n.PointToPointAnimationController&&e.isSome(f.viewAnimation)&&f.viewAnimation.target===a.viewpoint&&(this.view.stateManager.view.state.cameraController=g):e.isSome(b.viewAnimation)&&b.viewAnimation.target===
a.viewpoint&&"finished"===b.state&&(this.view.stateManager.view.state.cameraController=g))},f=>m(f));b.asyncResult={resolve:()=>m(),reject:f=>m(f)}}};d.getAnimationController=function(){let a;var b=null;b=this.view.stateManager.view.state.cameraController;b instanceof n.PointToPointAnimationController&&(b.updateStateFromViewAnimation(),b.active&&(a=b,b=a.viewAnimation));return null!=a||(a=new n.PointToPointAnimationController({view:this.view.stateManager.view,mode:"animation"}),b=a.viewAnimation,
this.view.stateManager.view.state.switchCameraController(a))?a:(e.isSome(b)&&b.stop(),this.reject(new h("GotoAnimation:goto-cannot-interrupt","Cannot start an animation while interacting")),null)};d.abort=function(){switch(this.state){case "pending":case "wait-for-ready":case "wait-for-viewpoint":this.reject(k.createAbortError());break;case "wait-for-animation-finish":e.isSome(this.animationController)&&this.view.stateManager.view.state.cameraController===this.animationController&&this.animationController.active&&
this.animationController.stopController(),this.reject(k.createAbortError())}};return p}();q.GoToOperation=B;Object.defineProperty(q,"__esModule",{value:!0})});