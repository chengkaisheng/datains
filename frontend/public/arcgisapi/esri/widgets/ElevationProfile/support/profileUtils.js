// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../core/maybe ../../../core/arrayUtils ../../../core/promiseUtils ../../../geometry/Multipoint ../../../core/unitUtils ../../../views/support/Scheduler ../../../geometry/support/geodesicUtils ../../../views/support/QueueProcessor ./geometryUtils ./constants ./statisticsUtils ./traversal".split(" "),function(t,y,z,q,A,B,C,D,E,u,w,F,G){async function x({densificationResult:b,result:a,provider:c,queue:f,signal:d,cache:h},e,g){const {densifiedPath:k,pathLength:m}=b,l=k.paths[0];
b=e.map(n=>l[n]);const p=g?Math.round(m/c.numSamplesForPreview):Math.round(m/l.length);await f.push({geometry:new A({spatialReference:k.spatialReference,points:b,hasZ:k.hasZ}),provider:c,indices:e,result:a,queryOptions:{...w.DEFAULT_ELEVATION_PROFILE_QUERY_OPTIONS,minDemResolution:p,cache:h}},{signal:d});c=a.samples.filter(n=>n.processed);a.progress=g?0:a.progress+e.length/l.length;a.statistics=F.getStatistics(a.samples,a.spatialReference);return{...a,samples:c}}async function H({geometry:b,provider:a,
indices:c,result:f,queryOptions:d}){if(0===c.length)return null;b=(await a.queryElevation(b,d)).geometry;d=d.noDataValue;f=f.samples;for(a=0;a<c.length;a++){const h=f[c[a]],{hasZ:e,z:g}=b.getPoint(a);h.z=e&&g!==d?g:null;h.processed=!0}}function v([b,a],c){return{x:b,y:a,z:null,distance:c,processed:!1}}t.createProfileQueue=function(b){return new E.QueueProcessor({task:C.Task.ELEVATION_PROFILE,concurrency:1,scheduler:b,process:async a=>{q.throwIfAborted(a.queryOptions);try{await H(a)}catch(c){q.isAbortError(c)}}})};
t.generateProfile=async function*(b){const a={signal:b.signal};var c=b.path;if(!u.isPolyline(c)||!u.isValidInputPath(c))return null;var f=await u.densifyPath(c,b.view.spatialReference,b.options,a);{var d=f.densifiedPath;var h=d.spatialReference;var e=f.densifiedPathInMeasurementSR;d=d.paths[0];const l=d.length;let p=0;const n=Array(l);n[0]=v(d[0],p);if(y.isSome(e)){var g=d;d=e.paths[0];var k=B.getMetersPerUnitForSR(h),m={distance:0};e=e.spatialReference;for(let r=1;r<l;r++)D.inverseGeodeticSolver(m,
d[r-1],d[r],e),p+=m.distance/k,n[r]=v(g[r],p)}else for(g=1;g<l;g++)k=d[g],e=d[g-1],m=k[0]-e[0],e=k[1]-e[1],p+=Math.sqrt(m*m+e*e),n[g]=v(k,p);h={progress:0,samples:n,statistics:null,spatialReference:h}}b={...b,path:c,densificationResult:f,result:h};f=G.getIndices(0,f.densifiedPath.paths[0].length);c=f.slice(0,b.provider.numSamplesForPreview);yield await x(b,c,!0);q.throwIfAborted(a);await q.after(w.DELAY_AFTER_PREVIEW_MILLIS);q.throwIfAborted(a);f=z.splitIntoChunks(f,b.provider.numSamplesPerChunk);
for(const l of f)yield await x(b,l,!1),q.throwIfAborted(a);b.result.progress=1;yield b.result};Object.defineProperty(t,"__esModule",{value:!0})});