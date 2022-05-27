// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../core/mathUtils ../../../chunks/vec3f64 ../../../chunks/vec3 ../../../chunks/mat4 ../../../chunks/mat4f64 ../../../chunks/SunCalc".split(" "),function(y,z,w,u,A,O,v){function h(g,f,d,b){const e=[];for(let a=0;a<d.length;a++)e[a]=(b[a]-d[a])*g/f+d[a];return e}const q={local:{altitude:1500,ambientAtNight:.1,ambientAtNoon:.45,ambientAtTwilight:.2,diffuseAtNoon:.65,diffuseAtTwilight:.7},global:{altitude:8E5,ambient:.015,diffuse:.75},planarDirection:{localAltitude:1E4,globalAltitude:1E6,
globalAngles:{azimuth:1.3*Math.PI,altitude:.6*Math.PI}}},P=O.create(),l={azimuth:0,altitude:0},k={ambient:{color:w.create(),intensity:0},diffuse:{color:w.create(),intensity:0,direction:w.create()},globalFactor:0,noonFactor:0};y.computeColorAndIntensity=function(g,f){var d=f[2];u.set(k.ambient.color,1,1,1);k.ambient.intensity=q.global.ambient;u.set(k.diffuse.color,1,1,1);k.diffuse.intensity=q.global.diffuse;d=(Math.abs(d)-q.local.altitude)/(q.global.altitude-q.local.altitude);d=z.clamp(d,0,1);k.globalFactor=
d;f=v.SunCalc.getTimes(g,f[1],f[0]);if(1>d){{var b=g.valueOf();if(f.polarException===v.SunCalc.POLAR_EXCEPTION.MIDNIGHT_SUN){var e=b-36E5*(g.getHours()+48)-6E4*g.getMinutes();var a=e+432E6}else f.polarException===v.SunCalc.POLAR_EXCEPTION.POLAR_NIGHT?(e=b-2,a=b-1):(e=f.sunrise.valueOf(),a=f.sunset.valueOf());var r=a-e;var n=e+r/2;var m=r/4;var t=n-m;m=n+m;var c=.06*r;r=e-c/2;e+=c/2;const x=a-c/2,H=a+c/2;a=q.local;const I=[.01,a.ambientAtNight],J=[.8,.8,1],K=[.01,.01,.01],B=[a.diffuseAtTwilight,a.ambientAtTwilight],
C=[1,.75,.75],D=[.8,.8,1],E=[.9*a.diffuseAtNoon,a.ambientAtNoon],F=[1,.98,.98],G=[.98,.98,1],L=[a.diffuseAtNoon,a.ambientAtNoon],M=[1,1,1],N=[1,1,1];a=[0,0];let p=[0,0,0];c=[0,0,0];b<r||b>H?(a=I,p=K,c=J):b<e?(c=e-r,a=h(b-r,c,I,B),p=h(b-r,c,K,C),c=h(b-r,c,J,D)):b<t?(c=t-e,a=h(b-e,c,B,E),p=h(b-e,c,C,F),c=h(b-e,c,D,G)):b<n?(c=n-t,a=h(b-t,c,E,L),p=h(b-t,c,F,M),c=h(b-t,c,G,N)):b<m?(c=m-n,a=h(b-n,c,L,E),p=h(b-n,c,M,F),c=h(b-n,c,N,G)):b<x?(c=x-m,a=h(b-m,c,E,B),p=h(b-m,c,F,C),c=h(b-m,c,G,D)):b<H&&(c=H-x,
a=h(b-x,c,B,I),p=h(b-x,c,C,K),c=h(b-x,c,D,J));b=a[0];n=w.fromValues(p[0],p[1],p[2]);t=a[1];m=w.fromValues(c[0],c[1],c[2])}u.lerp(k.ambient.color,m,k.ambient.color,d);k.ambient.intensity=z.lerp(t,k.ambient.intensity,d);u.lerp(k.diffuse.color,n,k.diffuse.color,d);k.diffuse.intensity=z.lerp(b,k.diffuse.intensity,d)}d=g.valueOf();f.polarException===v.SunCalc.POLAR_EXCEPTION.MIDNIGHT_SUN?(g=d-36E5*(g.getHours()+48)-6E4*g.getMinutes(),f=g+432E6):f.polarException===v.SunCalc.POLAR_EXCEPTION.POLAR_NIGHT?
(g=d-2,f=d-1):(g=f.sunrise.valueOf(),f=f.sunset.valueOf());g=1-z.clamp(Math.abs(d-(g+(f-g)/2))/432E5,0,1);k.noonFactor=g;return k};y.computeDirection=function(g,f,d,b){b||(b=w.create());const e=A.identity(P);if("global"===d)v.SunCalc.getPosition(g,0,0,l),u.set(b,0,0,-1),A.rotateX(e,e,-l.azimuth),A.rotateY(e,e,-l.altitude);else{var a=q.planarDirection;d=a.globalAngles;a=(Math.abs(f[2])-a.localAltitude)/(a.globalAltitude-a.localAltitude);a=z.clamp(a,0,1);1>a?(v.SunCalc.getPosition(g,f[1],f[0],l),l.azimuth=
(1-a)*l.azimuth+a*d.azimuth,l.altitude=(1-a)*l.altitude+a*d.altitude):(l.azimuth=d.azimuth,l.altitude=d.altitude);u.set(b,0,-1,0);A.rotateZ(e,e,-l.azimuth);A.rotateX(e,e,-l.altitude)}u.transformMat4(b,b,e);return b};y.computeShadowsEnabled=function(g,f){return"global"===f?!0:Math.abs(g[2])<q.planarDirection.localAltitude};y.settings=q;Object.defineProperty(y,"__esModule",{value:!0})});