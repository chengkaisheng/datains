// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","../PixelBlock"],function(G,K){function J(f){let {altitude:g,azimuth:c}=f;const {hillshadeType:r,pixelSizePower:d,pixelSizeFactor:y,scalingType:F,isGCS:D,resolution:E}=f;var m="multi-directional"===r?2*f.zFactor:f.zFactor;const {x:v,y:u}=E;f=m/(8*v);var w=m/(8*u);D&&.001<m&&(f/=111E3,w/=111E3);"adjusted"===F&&(D?(f=111E3*v,w=111E3*u,f=(m+Math.pow(f,d)*y)/(8*f),w=(m+Math.pow(w,d)*y)/(8*w)):(f=(m+Math.pow(v,d)*y)/(8*v),w=(m+Math.pow(u,d)*y)/(8*u)));var l=(90-g)*Math.PI/180;m=Math.cos(l);
let h=(360-c+90)*Math.PI/180,e=Math.sin(l)*Math.cos(h);l=Math.sin(l)*Math.sin(h);const p=[315,270,225,360,180,0],k=[60,60,60,60,60,90];var t=new Float32Array([3,5,3,2,1,4]);const q=t.reduce((n,B)=>n+B);t=t.map(n=>n/q);const z="multi-directional"===r?p.length:1,A=new Float32Array(6),x=new Float32Array(6),C=new Float32Array(6);if("multi-directional"===r)for(let n=0;n<z;n++)g=k[n],c=p[n],l=(90-g)*Math.PI/180,m=Math.cos(l),h=(360-c+90)*Math.PI/180,e=Math.sin(l)*Math.cos(h),l=Math.sin(l)*Math.sin(h),A[n]=
m,x[n]=e,C[n]=l;else A.fill(m),x.fill(e),C.fill(l);return{resolution:E,factor:[f,w],sinZcosA:e,sinZsinA:l,cosZ:m,sinZcosAs:x,sinZsinAs:C,cosZs:A,weights:t,hillshadeType:["traditional","multi-directional"].indexOf(r)}}const H=function(f){return f&&"esri.layers.support.PixelBlock"===f.declaredClass&&f.pixels&&0<f.pixels.length};G.calculateHillshadeParams=J;G.hillshade=function(f,g){if(!H(f))return f;const {width:c,height:r,mask:d}=f,y=new Uint8Array(c*r);d&&y.set(d);const {factor:F,sinZcosA:D,sinZsinA:E,
cosZ:m,sinZcosAs:v,sinZsinAs:u,cosZs:w,weights:l}=J(g),[h,e]=F;var {hillshadeType:p}=g;const k=f.pixels[0];g=new Uint8Array(c*r);let t;for(let I=1;I<r-1;I++){const b=I*c;for(let a=1;a<c-1;a++)if(d&&!d[b+a])g[b+a]=0;else{var q=8;if(d&&(q=d[b-c+a-1]+d[b-c+a]+d[b-c+a+1]+d[b+a-1]+d[b+a+1]+d[b+c+a-1]+d[b+c+a]+d[b+c+a+1],7>q)){g[b+a]=0;y[b+a]=0;continue}if(7===q){var z=d[b-c+a-1]?k[b-c+a-1]:k[b+a];var A=d[b-c+a]?k[b-c+a]:k[b+a];var x=d[b-c+a+1]?k[b-c+a+1]:k[b+a];q=d[b+a-1]?k[b+a-1]:k[b+a];t=d[b+a+1]?k[b+
a+1]:k[b+a];var C=d[b+c+a-1]?k[b+c+a-1]:k[b+a];var n=d[b+c+a]?k[b+c+a]:k[b+a];var B=d[b+c+a+1]?k[b+c+a+1]:k[b+a]}else z=k[b-c+a-1],A=k[b-c+a],x=k[b-c+a+1],q=k[b+a-1],t=k[b+a+1],C=k[b+c+a-1],n=k[b+c+a],B=k[b+c+a+1];q=(x+t+t+B-(z+q+q+C))*h;z=(C+n+n+B-(z+A+A+x))*e;A=Math.sqrt(1+q*q+z*z);x=0;if("traditional"===p)q=255*(m+E*z-D*q)/A,0>q&&(q=0),x=q;else for(C=u.length,n=0;n<C;n++)B=255*(w[n]+u[n]*z-v[n]*q)/A,0>B&&(B=0),x+=B*l[n];g[b+a]=x&255}}for(p=0;p<r;p++)g[p*c]=g[p*c+1],g[(p+1)*c-1]=g[(p+1)*c-2];for(p=
1;p<c-1;p++)g[p]=g[p+c],g[p+(r-1)*c]=g[p+(r-2)*c];return new K({width:c,height:r,pixels:[g],mask:d?y:null,pixelType:"u8",validPixelCount:f.validPixelCount,statistics:[{minValue:0,maxValue:255}]})};G.tintHillshade=function(f,g,c,r){if(H(f)&&H(g)){var {min:d,max:y}=r;r=f.pixels[0];var {pixels:F,mask:D}=g;g=F[0];var E=255.00001/(y-d),m=new Uint8ClampedArray(g.length),v=new Uint8ClampedArray(g.length),u=new Uint8ClampedArray(g.length),w=c.length-1;for(let e=0;e<g.length;e++){if(D&&0===D[e])continue;var l=
Math.floor((g[e]-d)*E);const [p,k]=c[0>l?0:l>w?w:l];var h=r[e];l=h*k;const t=l*(1-Math.abs(p%2-1));h-=l;switch(Math.floor(p)){case 0:m[e]=l+h;v[e]=t+h;u[e]=h;break;case 1:m[e]=t+h;v[e]=l+h;u[e]=h;break;case 2:m[e]=h;v[e]=l+h;u[e]=t+h;break;case 3:m[e]=h;v[e]=t+h;u[e]=l+h;break;case 4:m[e]=t+h;v[e]=h;u[e]=l+h;break;case 5:case 6:m[e]=l+h,v[e]=h,u[e]=t+h}}f.pixels=[m,v,u];f.updateStatistics()}};Object.defineProperty(G,"__esModule",{value:!0})});