// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports"],function(a){function e(){return new Float32Array(3)}function m(c){const b=new Float32Array(3);b[0]=c[0];b[1]=c[1];b[2]=c[2];return b}function d(c,b,w){const f=new Float32Array(3);f[0]=c;f[1]=b;f[2]=w;return f}function n(c,b){return new Float32Array(c,b,3)}function p(){return e()}function g(){return d(1,1,1)}function h(){return d(1,0,0)}function k(){return d(0,1,0)}function l(){return d(0,0,1)}const q=e(),r=g(),t=h(),u=k(),v=l();var x=Object.freeze({__proto__:null,create:e,clone:m,
fromValues:d,createView:n,zeros:p,ones:g,unitX:h,unitY:k,unitZ:l,ZEROS:q,ONES:r,UNIT_X:t,UNIT_Y:u,UNIT_Z:v});a.ONES=r;a.UNIT_X=t;a.UNIT_Y=u;a.UNIT_Z=v;a.ZEROS=q;a.clone=m;a.create=e;a.createView=n;a.fromValues=d;a.ones=g;a.unitX=h;a.unitY=k;a.unitZ=l;a.vec3f32=x;a.zeros=p});