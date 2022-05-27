// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","./definitions","./GeometryUtils","./Geometry"],function(w,y,z,u,q){let v=function(m,f,a){this.ratio=m;this.x=f;this.y=a},B=function(){function m(a,b,d,e=8,c=8){this.lines=[];this.starts=[];this.validateTessellation=!0;this.pixelRatio=e;this.pixelMargin=c;this.tileSize=z.TILE_SIZE*e;this.dz=a;this.yPos=b;this.xPos=d}var f=m.prototype;f.setExtent=function(a){this.finalRatio=this.tileSize/a*(1<<this.dz);let b=this.pixelRatio*this.pixelMargin;
b/=this.finalRatio;a>>=this.dz;b>a&&(b=a);this.margin=b;this.xmin=a*this.xPos-b;this.ymin=a*this.yPos-b;this.xmax=this.xmin+a+2*b;this.ymax=this.ymin+a+2*b};f.reset=function(a){this.type=a;this.lines=[];this.starts=[];this.line=null;this.start=0};f.moveTo=function(a,b){this._pushLine();this._prevIsIn=this._isIn(a,b);this._moveTo(a,b,this._prevIsIn);this._prevPt=new q.Point(a,b);this._firstPt=new q.Point(a,b);this._dist=0};f.lineTo=function(a,b){const d=this._isIn(a,b),e=new q.Point(a,b),c=q.Point.distance(this._prevPt,
e);if(d)if(this._prevIsIn)this._lineTo(a,b,!0);else{var g=this._prevPt;var h=e;a=this._intersect(h,g);this.start=this._dist+c*(1-this._r);this._lineTo(a.x,a.y,!0);this._lineTo(h.x,h.y,!0)}else if(this._prevIsIn)h=this._prevPt,g=e,a=this._intersect(h,g),this._lineTo(a.x,a.y,!0),this._lineTo(g.x,g.y,!1);else{const k=this._prevPt;if(!(k.x<=this.xmin&&e.x<=this.xmin||k.x>=this.xmax&&e.x>=this.xmax||k.y<=this.ymin&&e.y<=this.ymin||k.y>=this.ymax&&e.y>=this.ymax)){a=[];if(k.x<this.xmin&&e.x>this.xmin||
k.x>this.xmin&&e.x<this.xmin){b=(this.xmin-k.x)/(e.x-k.x);var l=k.y+b*(e.y-k.y);l<=this.ymin?h=!1:l>=this.ymax?h=!0:a.push(new v(b,this.xmin,l))}if(k.x<this.xmax&&e.x>this.xmax||k.x>this.xmax&&e.x<this.xmax)b=(this.xmax-k.x)/(e.x-k.x),l=k.y+b*(e.y-k.y),l<=this.ymin?h=!1:l>=this.ymax?h=!0:a.push(new v(b,this.xmax,l));if(k.y<this.ymin&&e.y>this.ymin||k.y>this.ymin&&e.y<this.ymin)b=(this.ymin-k.y)/(e.y-k.y),l=k.x+b*(e.x-k.x),l<=this.xmin?g=!1:l>=this.xmax?g=!0:a.push(new v(b,l,this.ymin));if(k.y<this.ymax&&
e.y>this.ymax||k.y>this.ymax&&e.y<this.ymax)b=(this.ymax-k.y)/(e.y-k.y),l=k.x+b*(e.x-k.x),l<=this.xmin?g=!1:l>=this.xmax?g=!0:a.push(new v(b,l,this.ymax));if(0===a.length)g?h?this._lineTo(this.xmax,this.ymax,!0):this._lineTo(this.xmax,this.ymin,!0):h?this._lineTo(this.xmin,this.ymax,!0):this._lineTo(this.xmin,this.ymin,!0);else if(1<a.length&&a[0].ratio>a[1].ratio)this.start=this._dist+c*a[1].ratio,this._lineTo(a[1].x,a[1].y,!0),this._lineTo(a[0].x,a[0].y,!0);else for(this.start=this._dist+c*a[0].ratio,
g=0;g<a.length;g++)this._lineTo(a[g].x,a[g].y,!0)}this._lineTo(e.x,e.y,!1)}this._dist+=c;this._prevIsIn=d;this._prevPt=e};f.close=function(){if(2<this.line.length){var a=this._firstPt,b=this._prevPt;a.x===b.x&&a.y===b.y||this.lineTo(a.x,a.y);a=this.line;for(b=a.length;4<=b;)if(a[0].x===a[1].x&&a[0].x===a[b-2].x||a[0].y===a[1].y&&a[0].y===a[b-2].y)a.pop(),a[0].x=a[b-2].x,a[0].y=a[b-2].y,--b;else break}};f.result=function(a=!0){this._pushLine();if(0===this.lines.length)return null;3===this.type&&a&&
A.simplify(this.tileSize,this.margin*this.finalRatio,this.lines);return this.lines};f.resultWithStarts=function(){if(2!==this.type)throw Error("Only valid for lines");this._pushLine();const a=this.lines,b=a.length;if(0===b)return null;const d=[];for(let e=0;e<b;e++)d.push({line:a[e],start:this.starts[e]||0});return d};f._isIn=function(a,b){return a>=this.xmin&&a<=this.xmax&&b>=this.ymin&&b<=this.ymax};f._intersect=function(a,b){let d,e,c;if(b.x>=this.xmin&&b.x<=this.xmax)e=b.y<=this.ymin?this.ymin:
this.ymax,c=(e-a.y)/(b.y-a.y),d=a.x+c*(b.x-a.x);else if(b.y>=this.ymin&&b.y<=this.ymax)d=b.x<=this.xmin?this.xmin:this.xmax,c=(d-a.x)/(b.x-a.x),e=a.y+c*(b.y-a.y);else{e=b.y<=this.ymin?this.ymin:this.ymax;d=b.x<=this.xmin?this.xmin:this.xmax;const g=(d-a.x)/(b.x-a.x),h=(e-a.y)/(b.y-a.y);g<h?(c=g,e=a.y+g*(b.y-a.y)):(c=h,d=a.x+h*(b.x-a.x))}this._r=c;return new q.Point(d,e)};f._pushLine=function(){this.line&&(1===this.type?0<this.line.length&&(this.lines.push(this.line),this.starts.push(this.start)):
2===this.type?1<this.line.length&&(this.lines.push(this.line),this.starts.push(this.start)):3===this.type&&3<this.line.length&&(this.lines.push(this.line),this.starts.push(this.start)));this.line=[];this.start=0};f._moveTo=function(a,b,d){3!==this.type?d&&(a=Math.round((a-(this.xmin+this.margin))*this.finalRatio),b=Math.round((b-(this.ymin+this.margin))*this.finalRatio),this.line.push(new q.Point(a,b))):(d||(a<this.xmin&&(a=this.xmin),a>this.xmax&&(a=this.xmax),b<this.ymin&&(b=this.ymin),b>this.ymax&&
(b=this.ymax)),a=Math.round((a-(this.xmin+this.margin))*this.finalRatio),b=Math.round((b-(this.ymin+this.margin))*this.finalRatio),this.line.push(new q.Point(a,b)),this._is_v=this._is_h=!1)};f._lineTo=function(a,b,d){if(3!==this.type)if(d){a=Math.round((a-(this.xmin+this.margin))*this.finalRatio);b=Math.round((b-(this.ymin+this.margin))*this.finalRatio);if(0<this.line.length&&(d=this.line[this.line.length-1],d.equals(a,b)))return;this.line.push(new q.Point(a,b))}else this.line&&0<this.line.length&&
this._pushLine();else if(d||(a<this.xmin&&(a=this.xmin),a>this.xmax&&(a=this.xmax),b<this.ymin&&(b=this.ymin),b>this.ymax&&(b=this.ymax)),a=Math.round((a-(this.xmin+this.margin))*this.finalRatio),b=Math.round((b-(this.ymin+this.margin))*this.finalRatio),this.line&&0<this.line.length){d=this.line[this.line.length-1];const e=d.x===a,c=d.y===b;e&&c||(this._is_h&&e?(d.x=a,d.y=b,d=this.line[this.line.length-2],d.x===a&&d.y===b?(this.line.pop(),1>=this.line.length?this._is_v=this._is_h=!1:(d=this.line[this.line.length-
2],this._is_h=d.x===a,this._is_v=d.y===b)):(this._is_h=d.x===a,this._is_v=d.y===b)):this._is_v&&c?(d.x=a,d.y=b,d=this.line[this.line.length-2],d.x===a&&d.y===b?(this.line.pop(),1>=this.line.length?this._is_v=this._is_h=!1:(d=this.line[this.line.length-2],this._is_h=d.x===a,this._is_v=d.y===b)):(this._is_h=d.x===a,this._is_v=d.y===b)):(this.line.push(new q.Point(a,b)),this._is_h=e,this._is_v=c))}else this.line.push(new q.Point(a,b))};return m}(),C=function(){function m(){}var f=m.prototype;f.setExtent=
function(a){this._ratio=4096===a?1:4096/a};f.reset=function(a){this.lines=[];this.line=null};f.moveTo=function(a,b){this.line&&this.lines.push(this.line);this.line=[];const d=this._ratio;this.line.push(new q.Point(a*d,b*d))};f.lineTo=function(a,b){const d=this._ratio;this.line.push(new q.Point(a*d,b*d))};f.close=function(){const a=this.line;a&&!a[0].isEqual(a[a.length-1])&&a.push(a[0])};f.result=function(){this.line&&this.lines.push(this.line);return 0===this.lines.length?null:this.lines};y._createClass(m,
[{key:"validateTessellation",get:function(){return 1>this._ratio}}]);return m}(),A=function(){function m(){}m.simplify=function(f,a,b){if(b){var d=-a,e=f+a,c=-a,g=f+a;f=[];a=[];var h=b.length;for(let l=0;l<h;++l){const k=b[l];if(!k||2>k.length)continue;let p=k[0],r;const t=k.length;for(let n=1;n<t;++n)r=k[n],p.x===r.x&&(p.x<=d&&(p.y>r.y?(f.push(l),f.push(n),f.push(0),f.push(-1)):(a.push(l),a.push(n),a.push(0),a.push(-1))),p.x>=e&&(p.y<r.y?(f.push(l),f.push(n),f.push(1),f.push(-1)):(a.push(l),a.push(n),
a.push(1),a.push(-1)))),p.y===r.y&&(p.y<=c&&(p.x<r.x?(f.push(l),f.push(n),f.push(2),f.push(-1)):(a.push(l),a.push(n),a.push(2),a.push(-1))),p.y>=g&&(p.x>r.x?(f.push(l),f.push(n),f.push(3),f.push(-1)):(a.push(l),a.push(n),a.push(3),a.push(-1)))),p=r}0!==f.length&&0!==a.length&&(m.fillParent(b,a,f),m.fillParent(b,f,a),d=[],m.calcDeltas(d,a,f),m.calcDeltas(d,f,a),m.addDeltas(d,b))}};m.fillParent=function(f,a,b){const d=b.length,e=a.length;for(let k=0;k<e;k+=4){var c=a[k],g=a[k+1];const p=a[k+2],r=f[c][g-
1];c=f[c][g];g=8092;let t=-1;for(let n=0;n<d;n+=4){if(b[n+2]!==p)continue;var h=b[n];const x=b[n+1];var l=f[h][x-1];h=f[h][x];switch(p){case 0:case 1:u.between(r.y,l.y,h.y)&&u.between(c.y,l.y,h.y)&&(l=Math.abs(h.y-l.y),l<g&&(g=l,t=n));break;case 2:case 3:u.between(r.x,l.x,h.x)&&u.between(c.x,l.x,h.x)&&(l=Math.abs(h.x-l.x),l<g&&(g=l,t=n))}}a[k+3]=t}};m.calcDeltas=function(f,a,b){const d=a.length;for(let e=0;e<d;e+=4){const c=m.calcDelta(e,a,b,[]);f.push(a[e]);f.push(a[e+1]);f.push(a[e+2]);f.push(c)}};
m.calcDelta=function(f,a,b,d){f=a[f+3];if(-1===f)return 0;const e=d.length;if(1<e&&d[e-2]===f)return 0;d.push(f);return m.calcDelta(f,b,a,d)+1};m.addDeltas=function(f,a){const b=f.length;let d=0;for(var e=0;e<b;e+=4){var c=f[e+3];c>d&&(d=c)}for(e=0;e<b;e+=4){c=a[f[e]];const g=f[e+1],h=d-f[e+3];switch(f[e+2]){case 0:c[g-1].x-=h;c[g].x-=h;1===g&&(c[c.length-1].x-=h);g===c.length-1&&(c[0].x-=h);break;case 1:c[g-1].x+=h;c[g].x+=h;1===g&&(c[c.length-1].x+=h);g===c.length-1&&(c[0].x+=h);break;case 2:c[g-
1].y-=h;c[g].y-=h;1===g&&(c[c.length-1].y-=h);g===c.length-1&&(c[0].y-=h);break;case 3:c[g-1].y+=h,c[g].y+=h,1===g&&(c[c.length-1].y+=h),g===c.length-1&&(c[0].y+=h)}}};return m}();w.SimpleBuilder=C;w.TileClipper=B;Object.defineProperty(w,"__esModule",{value:!0})});