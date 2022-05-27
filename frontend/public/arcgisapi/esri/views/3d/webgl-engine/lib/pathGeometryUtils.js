// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../../../../chunks/_rollupPluginBabelHelpers ../../../../core/mathUtils ../../../../chunks/vec3f64 ../../../../chunks/vec3 ../../../../chunks/mat4 ../../../../chunks/mat4f64 ../../../../chunks/vec2f64 ../../../../chunks/vec2 ../../support/geometryUtils ./Util ./GeometryData ./GeometryUtil ../materials/internal/MaterialUtil ../../../../chunks/mat2 ../../../../chunks/mat2f64 ../materials/PathTechnique".split(" "),function(C,G,v,h,L,Q,u,r,H,D,R,S,V,W,X,B){var I;(function(w){function M(){return{up:v.create(),
right:v.create()}}w.makeFrame=M;w.profileSpaceToVertexSpace=function(k,g,a){k[0]=a[0]*g.right[0]+a[1]*g.up[0];k[1]=a[0]*g.right[1]+a[1]*g.up[1];k[2]=a[0]*g.right[2]+a[1]*g.up[2]};w.vertexSpaceToProfileSpace=function(k,g,a){r.set(k,h.dot(a,g.right),h.dot(a,g.up))};var t=function(){function k(){this.pos=v.create();this.posES=v.create();this.posGS=v.create();this.vRight=v.create();this.vLeft=v.create();this.frame=M();this.rotationFrame=M();this.rotationRight=u.create();this.rotationAngle=0;this.miterStretch=
X.create()}var g=k.prototype;g.setFrameFromUpVector=function(a){h.copy(this.frame.up,a);h.add(y,this.vLeft,this.vRight);h.normalize(y,y);h.scale(z,this.frame.up,h.dot(y,this.frame.up));h.subtract(J,y,z);h.normalize(J,J);h.cross(this.frame.right,J,this.frame.up)};g.computeRotationAxisAndAngleFromUpVector=function(){h.copy(this.rotationFrame.up,this.frame.up);h.copy(this.rotationFrame.right,this.frame.right);r.set(this.rotationRight,1,0);h.scale(z,this.frame.up,h.dot(this.frame.up,this.vLeft));h.subtract(z,
this.vLeft,z);h.negate(z,z);h.normalize(z,z);h.scale(y,this.frame.up,h.dot(this.frame.up,this.vRight));h.subtract(y,this.vRight,y);h.normalize(y,y);h.cross(N,this.rotationFrame.up,this.vLeft);this.rotationAngle=G.sign(h.dot(N,this.vRight))*(Math.PI-G.acosClamped(h.dot(z,y)));if(0<Math.abs(this.rotationAngle)){const a=G.reciprocalClamped(Math.cos(.5*this.rotationAngle));W.set(this.miterStretch,1+(a-1),0,0,1)}this.maxStretchDistance=Math.abs(Math.min(this.vLeftLength,this.vRightLength)/Math.cos(.5*
(Math.PI-this.rotationAngle)))};return k}();w.PathVertex=t;t=function(){function k(){this.vertices=[];this.vertexIndices=[];this.vertexNormals=[];this.poles=[];this.poleIndices=[];this.uvIndices=this.uvs=null}var g=k.prototype;g.addVertex=function(a,b){this.vertices.push(u.clone(a));this.vertexNormals.push(u.clone(b));return this.vertices.length-1};g.addUV=function(a){this.uvs||(this.uvs=[],this.uvIndices=[]);this.uvs.push(a);return this.uvs.length-1};g.addPole=function(a,b=null){this.poles.push({position:u.clone(a),
normal:b?u.clone(b):null});return this.poles.length-1};g.addSegment=function(a,b=null,c=null){this.vertexIndices.push(a.v0);this.vertexIndices.push(a.v1);b&&(this.uvIndices.push(b.v0),this.uvIndices.push(b.v1));c&&(this.poleIndices.push(c.v0),this.poleIndices.push(c.v1))};g.hasUV=function(){return null!=this.uvs};g.translate=function(a,b){for(const c of this.vertices)c[0]+=a,c[1]+=b;for(const c of this.poles)c.position[0]+=a,c.position[1]+=b};k.circle=function(a=20){const b=new k,c={v0:0,v1:0};b.addPole(u.fromValues(0,
0));for(var f=0;f<a;++f){var d=2*f*Math.PI/a,e=Math.cos(d);const m=Math.sin(d);d=u.fromValues(.5*e,.5*m);e=u.fromValues(e,m);b.addVertex(d,e);b.addUV(f/a)}b.addUV(1);for(f=0;f<a-1;++f)e={v0:f,v1:f+1},b.addSegment(e,e,c);b.addSegment({v0:a-1,v1:0},{v0:a-1,v1:a},c);return b};k.rect=function(){const a=new k,b=u.fromValues(-.5,-.5),c=u.fromValues(.5,-.5),f=u.fromValues(.5,.5),d=u.fromValues(-.5,.5),e=u.fromValues(0,-1),m=u.fromValues(1,0),l=u.fromValues(0,1),p=u.fromValues(-1,0);a.addUV(0);a.addUV(1);
a.addPole(u.fromValues(0,.5),l);a.addPole(u.fromValues(0,.5));a.addPole(u.fromValues(0,-.5));a.addPole(u.fromValues(0,-.5),e);const n={v0:0,v1:1};a.addVertex(b,e);a.addVertex(c,e);a.addSegment({v0:0,v1:1},n,{v0:3,v1:3});a.addVertex(c,m);a.addVertex(f,m);a.addSegment({v0:2,v1:3},n,{v0:2,v1:1});a.addVertex(f,l);a.addVertex(d,l);a.addSegment({v0:4,v1:5},n,{v0:0,v1:0});a.addVertex(d,p);a.addVertex(b,p);a.addSegment({v0:6,v1:7},n,{v0:1,v1:2});return a};C._createClass(k,[{key:"numSegments",get:function(){return this.vertexIndices.length/
2}}]);return k}();w.Profile=t;t=function(){function k(g){this.vertices=[];this.offset=v.create();this.xform=Q.create();this.vertices=g;h.copy(this.offset,this.vertices[Math.floor((g.length-1)/2)].pos);for(const a of this.vertices)h.subtract(a.pos,a.pos,this.offset);L.translate(this.xform,this.xform,this.offset);this.updatePathVertexInformation()}k.prototype.updatePathVertexInformation=function(){const g=this.vertices.length;let a=this.vertices[0];a.index=0;h.set(a.vLeft,0,0,0);a.vLeftLength=0;h.subtract(a.vRight,
this.vertices[1].pos,a.pos);a.vRightLength=h.length(a.vRight);h.normalize(a.vRight,a.vRight);let b=a;for(let c=1;c<g;++c)a=this.vertices[c],a.index=c,h.copy(a.vLeft,b.vRight),a.vLeftLength=b.vRightLength,c<g-1?(h.subtract(a.vRight,this.vertices[c+1].pos,a.pos),a.vRightLength=h.length(a.vRight),h.normalize(a.vRight,a.vRight)):(h.copy(a.vRight,a.vLeft),a.vRightLength=a.vLeftLength),b=a};return k}();w.Path=t;w.computeMinimumRotationTangentFrame=function(k,g){let a=null;const b=k.vertices.length,c=v.create(),
f=v.create(),d=v.create(),e=v.create(),m=v.create(),l=v.create(),p=H.plane.create();let n=k.vertices[0];h.copy(f,g);h.set(c,0,1,0);S.makeOrthoBasisDirUpFallback(n.vRight,f,c,c,d,f,.99619469809);h.copy(n.frame.up,f);h.copy(n.frame.right,d);a=n;for(g=1;g<b;++g){n=k.vertices[g];h.add(m,n.vLeft,n.vRight);let q=h.length(m);0<q?(q=1/Math.sqrt(q),m[0]*=q,m[1]*=q,m[2]*=q):(m[0]=n.vRight[0],m[1]=n.vRight[1],m[2]=n.vRight[2]);h.add(l,a.pos,a.frame.up);H.plane.fromPositionAndNormal(n.pos,m,p);H.plane.intersectRay(p,
H.ray.wrap(l,n.vLeft),e)?(h.subtract(e,e,n.pos),h.normalize(f,e),h.cross(d,m,f),h.normalize(d,d)):S.makeOrthoBasisDirUpFallback(m,a.frame.up,a.frame.right,c,d,f,.99619469809);h.copy(n.frame.up,f);h.copy(n.frame.right,d);a=n}};w.Extruder=function(){};t=function(){function k(){}var g=k.prototype;g.numProfilesPerJoin=function(){return 1};g.extrude=function(a,b,c){for(let f=0;f<b.vertices.length;++f)c(a.index,a.frame,b.vertices[f],b.vertexNormals[f],!1)};return k}();w.SimpleExtruder=t;t=function(){function k(a=
.8*Math.PI,b=1){this.cutoffAngle=a;this.numBendSubdivisions=b}var g=k.prototype;g.numProfilesPerJoin=function(){return this.numBendSubdivisions+1};g.extrude=function(a,b,c){var f=Y;if(Math.abs(a.rotationAngle)>=this.cutoffAngle)for(var d=0;d<this.numBendSubdivisions+1;++d){L.identity(K);L.rotate(K,K,.5*-a.rotationAngle+d*a.rotationAngle/this.numBendSubdivisions,a.rotationFrame.up);var e=f,m=a.frame,l=K;h.transformMat4(e.up,m.up,l);h.transformMat4(e.right,m.right,l);for(e=0;e<b.vertices.length;++e)0<=
r.dot(b.vertices[e],a.rotationRight)*a.rotationAngle?c(a.index,f,b.vertices[e],b.vertexNormals[e],!1):(r.transformMat2(E,b.vertices[e],a.miterStretch),c(a.index,a.frame,E,b.vertexNormals[e],!0))}else for(f=0;f<this.numBendSubdivisions+1;++f)for(d=0;d<b.vertices.length;++d)e=0<=r.dot(b.vertices[d],a.rotationRight)*a.rotationAngle,r.transformMat2(E,b.vertices[d],a.miterStretch),c(a.index,a.frame,E,b.vertexNormals[d],e?!1:!0)};return k}();w.MiterExtruder=t;const Z={generateUV:!1};t=function(){function k(){}
k.prototype.rebuildConnectingProfileGeometry=function(g,a,b){for(let c=0;c<a.vertices.length;++c)b(g.index,g.frame,a.vertices[c],a.vertexNormals[c],0,0)};return k}();w.CapBuilder=t;var O=function(k){function g(){return k.call(this)||this}C._inheritsLoose(g,k);var a=g.prototype;a.getNumVertices=function(){return 0};a.getNumIndices=function(){return 0};a.rebuildCapGeometry=function(){};a.buildTopology=function(){};return g}(t);w.NoCapBuilder=O;O=function(k){function g(b,c=0,f=!1){var d=k.call(this)||
this;d.profile=b;d.profilePlaneOffset=c;d.flip=f;return d}C._inheritsLoose(g,k);var a=g.prototype;a.getNumVertices=function(){return this.profile.vertices.length};a.getNumIndices=function(){return 3*this.profile.numSegments};a.rebuildConnectingProfileGeometry=function(b,c,f){for(let d=0;d<c.vertices.length;++d)f(b.index,b.frame,c.vertices[d],c.vertexNormals[d],this.profilePlaneOffset,0)};a.rebuildCapGeometry=function(b,c){const f=P;r.set(f,0,0);const d=this.flip?1:-1;for(let e=0;e<this.profile.vertices.length;++e)c(b.index,
b.frame,this.profile.vertices[e],f,this.profilePlaneOffset,d)};a.buildTopology=function(b,c){b=this.vertexBufferStart+this.profile.vertexIndices[0];for(let f=1;f<this.profile.numSegments;++f){const d=this.vertexBufferStart+this.profile.vertexIndices[2*f],e=this.vertexBufferStart+this.profile.vertexIndices[2*f+1];this.flip?c(e,d,b):c(b,d,e)}};return g}(t);w.TriangulationCapBuilder=O;t=function(k){function g(b){var c=k.call(this)||this;c.flip=!1;c.sign=0;c.breakNormals=!1;c.numSegments=3;c.profile=
b.profile;c.flip=b.flip;c.sign=c.flip?1:-1;c.breakNormals=b.breakNormals;c.numSegments=b.subdivisions;return c}C._inheritsLoose(g,k);var a=g.prototype;a.getNumVertices=function(){let b=0;b=this.profile.vertices.length*(this.numSegments-1);this.breakNormals&&(b+=this.profile.vertices.length);return b+=this.profile.poles.length};a.getNumIndices=function(){let b;b=2*this.profile.numSegments*(this.numSegments-1);for(let c=0;c<this.profile.numSegments;++c)b=this.profile.poleIndices[this.profile.vertexIndices[2*
c]]===this.profile.poleIndices[this.profile.vertexIndices[2*c+1]]?b+1:b+2;return 3*b};a.rebuildCapGeometry=function(b,c){const f=b.frame,d=.5*this.sign,e=E,m=P;r.set(m,0,0);for(var l=0;l<this.profile.poles.length;++l){var p=this.profile.poles[l];p.normal?c(b.index,f,p.position,p.normal,d,0):c(b.index,f,p.position,m,d,this.sign)}if(this.breakNormals)for(l=0;l<this.profile.vertices.length;++l)c(b.index,f,this.profile.vertices[l],this.profile.vertexNormals[l],0,0);for(l=0;l<this.numSegments-1;++l){var n=
(1-(l+1)/this.numSegments)*Math.PI*.5;p=Math.sin(n);n=Math.cos(n);for(let q=0;q<this.profile.vertices.length;++q){const x=this.profile.poles[this.profile.poleIndices[q]];r.subtract(e,this.profile.vertices[q],x.position);r.scale(e,e,p);x.normal?(r.add(e,e,x.position),c(b.index,f,e,x.normal,d*n,0)):(r.normalize(m,e),r.scale(m,m,p),r.add(e,e,x.position),c(b.index,f,e,m,d*n,this.sign*n))}}};a.buildTopology=function(b,c){b=this.breakNormals?this.vertexBufferStart+this.profile.poles.length:this.firstProfileVertexIndex;
const f=this.breakNormals?this.vertexBufferStart+this.profile.poles.length+this.profile.vertices.length:this.vertexBufferStart+this.profile.poles.length;for(let d=0;d<this.profile.numSegments;++d){const e=this.profile.vertexIndices[2*d],m=this.profile.vertexIndices[2*d+1],l=this.vertexBufferStart+this.profile.poleIndices[e],p=this.vertexBufferStart+this.profile.poleIndices[m];let n=b+e,q=b+m;for(let x=0;x<this.numSegments-1;++x){const A=f+x*this.profile.vertices.length+e,F=f+x*this.profile.vertices.length+
m;this.flip?(c(A,q,n),c(q,A,F)):(c(n,q,A),c(F,A,q));n=A;q=F}this.flip?(c(l,q,n),l!==p&&c(l,p,q)):(c(n,q,l),l!==p&&c(q,p,l))}};return g}(t);w.RoundCapBuilder=t;t=function(){function k(a,b,c,f,d,e=Z){this.options=e;this.numUVTotal=this.numNormalsTotal=this.numVerticesTotal=this.numExtrusionProfiles=this._triangleCount=this._extrusionVertexCount=0;this.profile=b;this.path=a;this.extruder=c;this.startCap=f;this.endCap=d;a=this.path.vertices.length-2;this.numExtrusionProfiles=c.numProfilesPerJoin()*a+
2;this.numNormalsTotal=this.numVerticesTotal=b.vertices.length*this.numExtrusionProfiles;this.startCap.vertexBufferStart=this.numVerticesTotal;b=this.startCap.getNumVertices();this.numVerticesTotal+=b;this.numNormalsTotal+=b;this.endCap.vertexBufferStart=this.numVerticesTotal;b=this.endCap.getNumVertices();this.numVerticesTotal+=b;this.numNormalsTotal+=b;this.pathVertexData=new Float32Array(1*this.numVerticesTotal);this.profileRightAxisData=new Float32Array(4*this.numVerticesTotal);this.profileUpAxisData=
new Float32Array(4*this.numVerticesTotal);this.profileVertexAndNormalData=new Float32Array(4*this.numVerticesTotal);this.profile.hasUV()&&this.options.generateUV&&(this.numUVTotal=this.profile.uvs.length,this.uvData=new Float32Array(2*this.numUVTotal));this.originData=new Float32Array(3*this.path.vertices.length);this.rebuildGeometry();this.buildTopology()}var g=k.prototype;g.emitVertex=function(a,b,c,f,d){this.profileRightAxisData[4*this._extrusionVertexCount]=b.right[0];this.profileRightAxisData[4*
this._extrusionVertexCount+1]=b.right[1];this.profileRightAxisData[4*this._extrusionVertexCount+2]=b.right[2];this.profileUpAxisData[4*this._extrusionVertexCount]=b.up[0];this.profileUpAxisData[4*this._extrusionVertexCount+1]=b.up[1];this.profileUpAxisData[4*this._extrusionVertexCount+2]=b.up[2];this.profileVertexAndNormalData[4*this._extrusionVertexCount]=c[0];this.profileVertexAndNormalData[4*this._extrusionVertexCount+1]=c[1];this.profileVertexAndNormalData[4*this._extrusionVertexCount+2]=f[0];
this.profileVertexAndNormalData[4*this._extrusionVertexCount+3]=f[1];this.pathVertexData[this._extrusionVertexCount]=a;d?(a=this.path.vertices[a],this.profileRightAxisData[4*this._extrusionVertexCount+3]=a.rotationRight[0]*a.maxStretchDistance,this.profileUpAxisData[4*this._extrusionVertexCount+3]=a.rotationRight[1]*a.maxStretchDistance):(this.profileRightAxisData[4*this._extrusionVertexCount+3]=0,this.profileUpAxisData[4*this._extrusionVertexCount+3]=0);++this._extrusionVertexCount};g.emitCapVertex=
function(a,b,c,f,d,e){this.profileRightAxisData[4*this._extrusionVertexCount]=b.right[0];this.profileRightAxisData[4*this._extrusionVertexCount+1]=b.right[1];this.profileRightAxisData[4*this._extrusionVertexCount+2]=b.right[2];this.profileUpAxisData[4*this._extrusionVertexCount]=b.up[0];this.profileUpAxisData[4*this._extrusionVertexCount+1]=b.up[1];this.profileUpAxisData[4*this._extrusionVertexCount+2]=b.up[2];this.profileVertexAndNormalData[4*this._extrusionVertexCount]=c[0];this.profileVertexAndNormalData[4*
this._extrusionVertexCount+1]=c[1];this.profileVertexAndNormalData[4*this._extrusionVertexCount+2]=f[0];this.profileVertexAndNormalData[4*this._extrusionVertexCount+3]=f[1];this.pathVertexData[this._extrusionVertexCount]=a;this.profileRightAxisData[4*this._extrusionVertexCount+3]=d;this.profileUpAxisData[4*this._extrusionVertexCount+3]=e;++this._extrusionVertexCount};g.emitTriangle=function(a,b,c){this.vertexIndices[3*this._triangleCount]=a;this.vertexIndices[3*this._triangleCount+1]=b;this.vertexIndices[3*
this._triangleCount+2]=c;this.pathVertexIndices[3*this._triangleCount]=this.pathVertexData[a];this.pathVertexIndices[3*this._triangleCount+1]=this.pathVertexData[b];this.pathVertexIndices[3*this._triangleCount+2]=this.pathVertexData[c];this.normalIndices[3*this._triangleCount]=a;this.normalIndices[3*this._triangleCount+1]=b;this.normalIndices[3*this._triangleCount+2]=c;++this._triangleCount};g.rebuildGeometry=function(){var a=(f,d,e,m,l)=>this.emitVertex(f,d,e,m,l);const b=(f,d,e,m,l,p)=>this.emitCapVertex(f,
d,e,m,l,p);this._extrusionVertexCount=0;for(var c of this.path.vertices)this.originData[3*c.index]=c.pos[0],this.originData[3*c.index+1]=c.pos[1],this.originData[3*c.index+2]=c.pos[2];this.startCap.rebuildConnectingProfileGeometry(this.path.vertices[0],this.profile,b);for(c=1;c<this.path.vertices.length-1;++c)this.extruder.extrude(this.path.vertices[c],this.profile,a);this.endCap.rebuildConnectingProfileGeometry(this.path.vertices[this.path.vertices.length-1],this.profile,b);this.startCap.rebuildCapGeometry(this.path.vertices[0],
b);this.endCap.rebuildCapGeometry(this.path.vertices[this.path.vertices.length-1],b);if(this.profile.hasUV()&&this.options.generateUV)for(a=0;a<this.profile.uvs.length;++a)this.uvData[2*a]=this.profile.uvs[a],this.uvData[2*a+1]=0};g.buildTopology=function(){const a=(e,m,l)=>this.emitTriangle(e,m,l);this._triangleCount=0;const b=this.profile.vertices.length,c=this.profile.numSegments,f=this.numExtrusionProfiles-1;var d=c*f*6;this.startCap.indexBufferStart=d;this.startCap.firstProfileVertexIndex=0;
d+=this.startCap.getNumIndices();this.endCap.indexBufferStart=d;this.endCap.firstProfileVertexIndex=b*(this.numExtrusionProfiles-1);d+=this.endCap.getNumIndices();this.vertexIndices=new Uint32Array(d);this.normalIndices=new Uint32Array(d);this.pathVertexIndices=new Uint32Array(d);this.profile.hasUV()&&this.options.generateUV&&(this.uvIndices=new Uint32Array(d));for(d=0;d<c;++d){const e=this.profile.vertexIndices[2*d],m=this.profile.vertexIndices[2*d+1];for(let l=0;l<f;++l){const p=l*b+e,n=(l+1)*b+
m,q=l*b+m;a(p,(l+1)*b+e,n);a(p,n,q)}}this.startCap.buildTopology(this.path.vertices[0],a);this.endCap.buildTopology(this.path.vertices[this.path.vertices.length-1],a)};g.onPathChanged=function(){this.rebuildGeometry()};return k}();w.Builder=t;t=function(){function k(g){this.builder=g}k.prototype.onPathChanged=function(){this.builder.onPathChanged()};C._createClass(k,[{key:"xform",get:function(){return this.builder.path.xform}}]);return k}();w.PathGeometry=t;let U=function(k){function g(b){b=k.call(this,
b)||this;b.vertexAttributePosition=null;b.vertexAttributeNormal=null;b.vertexAttributeColor=null;b.vertexAttributePosition=new Float32Array(3*b.builder.numVerticesTotal);b.vertexAttributeNormal=new Float32Array(3*b.builder.numNormalsTotal);b.vertexAttributeColor=new Uint8Array(4);b.vertexAttributeColor[0]=255;b.vertexAttributeColor[1]=255;b.vertexAttributeColor[2]=255;b.vertexAttributeColor[3]=255;return b}C._inheritsLoose(g,k);var a=g.prototype;a.bakeVertexColors=function(b){this.vertexAttributeColor[0]=
255*b[0];this.vertexAttributeColor[1]=255*b[1];this.vertexAttributeColor[2]=255*b[2];this.vertexAttributeColor[3]=255*(3<b.length?b[3]:1)};a.bake=function(b){this.size=b;for(let e=0;e<this.builder.numVerticesTotal;++e){var c=this.builder.pathVertexData[e],f=0===c||c===this.builder.path.vertices.length-1,d=aa;h.set(d,this.builder.originData[3*c],this.builder.originData[3*c+1],this.builder.originData[3*c+2]);const m=z,l=E;c=y;const p=N,n=ba;let q=0,x=0;h.set(p,this.builder.profileRightAxisData[4*e],
this.builder.profileRightAxisData[4*e+1],this.builder.profileRightAxisData[4*e+2]);h.set(n,this.builder.profileUpAxisData[4*e],this.builder.profileUpAxisData[4*e+1],this.builder.profileUpAxisData[4*e+2]);r.set(l,this.builder.profileVertexAndNormalData[4*e]*b[0],this.builder.profileVertexAndNormalData[4*e+1]*b[1]);if(f)h.cross(c,n,p),q=this.builder.profileRightAxisData[4*e+3]*b[0],x=this.builder.profileUpAxisData[4*e+3];else{f=P;const A=ca;r.set(f,this.builder.profileRightAxisData[4*e+3],this.builder.profileUpAxisData[4*
e+3]);const F=r.length(f);r.normalize(f,f);const T=r.dot(l,f);if(Math.abs(T)>F){r.set(A,-f[1],f[0]);const da=r.dot(l,A);r.scale(f,f,F*G.sign(T));r.scale(A,A,da);r.add(l,f,A)}h.set(c,0,0,0)}h.set(m,p[0]*l[0]+n[0]*l[1],p[1]*l[0]+n[1]*l[1],p[2]*l[0]+n[2]*l[1]);this.vertexAttributePosition[3*e]=d[0]+m[0]+c[0]*q;this.vertexAttributePosition[3*e+1]=d[1]+m[1]+c[1]*q;this.vertexAttributePosition[3*e+2]=d[2]+m[2]+c[2]*q;d=E;r.set(d,this.builder.profileVertexAndNormalData[4*e+2],this.builder.profileVertexAndNormalData[4*
e+3]);this.vertexAttributeNormal[3*e]=p[0]*d[0]+n[0]*d[1]+c[0]*x;this.vertexAttributeNormal[3*e+1]=p[1]*d[0]+n[1]*d[1]+c[1]*x;this.vertexAttributeNormal[3*e+2]=p[2]*d[0]+n[2]*d[1]+c[2]*x}};a.createGeometryData=function(){const b={};b[D.VertexAttrConstants.POSITION]=this.builder.vertexIndices;b[D.VertexAttrConstants.NORMAL]=this.builder.normalIndices;this.vertexAttributeColor&&(b[D.VertexAttrConstants.COLOR]=new Uint32Array(b[D.VertexAttrConstants.POSITION].length));const c={};c[D.VertexAttrConstants.POSITION]=
{size:3,data:this.vertexAttributePosition};c[D.VertexAttrConstants.NORMAL]={size:3,data:this.vertexAttributeNormal};this.vertexAttributeColor&&(c[D.VertexAttrConstants.COLOR]={size:4,data:this.vertexAttributeColor});return new R.GeometryData(c,b,"triangle")};a.onPathChanged=function(){k.prototype.onPathChanged.call(this);this.bake(this.size)};a.intersect=function(b,c,f){const d=this.builder.vertexIndices;V.intersectTriangles(b,c,0,d.length/3,d,{size:3,offsetIdx:0,strideIdx:3,data:this.vertexAttributePosition},
void 0,void 0,f)};return g}(t);w.StaticPathGeometry=U;t=function(k){function g(a,b,c,f){var d=k.call(this,a)||this;d.sizeAttributeValue=b;d.colorAttributeValue=c;d.opacityAttributeValue=f;d.vvData=null;d.baked=new U(a);d.vvData=new Float32Array(4*d.builder.path.vertices.length);for(a=0;a<d.builder.path.vertices.length;++a)d.vvData[4*a]=b,d.vvData[4*a+1]=c,d.vvData[4*a+2]=f,d.vvData[4*a+3]=0===a||a===d.builder.path.vertices.length-1?1:0;return d}C._inheritsLoose(g,k);g.prototype.createGeometryData=
function(){const a={};a[B.PathVertexAttrConstants.POSITION]=this.builder.pathVertexIndices;a[B.PathVertexAttrConstants.PROFILERIGHT]=this.builder.vertexIndices;a[B.PathVertexAttrConstants.PROFILEUP]=this.builder.vertexIndices;a[B.PathVertexAttrConstants.PROFILEVERTEXANDNORMAL]=this.builder.vertexIndices;a[B.PathVertexAttrConstants.FEATUREVALUE]=this.builder.pathVertexIndices;const b={};b[B.PathVertexAttrConstants.POSITION]={size:3,data:this.builder.originData};b[B.PathVertexAttrConstants.PROFILERIGHT]=
{size:4,data:this.builder.profileRightAxisData};b[B.PathVertexAttrConstants.PROFILEUP]={size:4,data:this.builder.profileUpAxisData};b[B.PathVertexAttrConstants.PROFILEVERTEXANDNORMAL]={size:4,data:this.builder.profileVertexAndNormalData};b[B.PathVertexAttrConstants.FEATUREVALUE]={size:4,data:this.vvData};return new R.GeometryData(b,a,"triangle")};return g}(t);w.FastUpdatePathGeometry=t})(I||(I={}));const aa=v.create(),E=u.create(),P=u.create(),ca=u.create(),z=v.create(),y=v.create(),N=v.create(),
ba=v.create(),J=v.create(),Y=I.makeFrame(),K=Q.create();return I});