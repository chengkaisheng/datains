//>>built
define("dojo/_base/array dojo/_base/connect dojo/_base/lang dojo/on dojo/sniff ./main".split(" "),function(q,r,g,p,t,u){var e=u.typematic={_fireEventAndReload:function(){this._timer=null;this._callback(++this._count,this._node,this._evt);this._currentTimeout=Math.max(0>this._currentTimeout?this._initialDelay:1<this._subsequentDelay?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay),this._minDelay);this._timer=setTimeout(g.hitch(this,"_fireEventAndReload"),this._currentTimeout)},
trigger:function(c,a,l,h,f,k,m,b){if(f!=this._obj){this.stop();this._initialDelay=m||500;this._subsequentDelay=k||.9;this._minDelay=b||10;this._obj=f;this._node=l;this._count=this._currentTimeout=-1;this._callback=g.hitch(a,h);this._evt={faux:!0};for(var n in c)"layerX"!=n&&"layerY"!=n&&(a=c[n],"function"!=typeof a&&"undefined"!=typeof a&&(this._evt[n]=a));this._fireEventAndReload()}},stop:function(){this._timer&&(clearTimeout(this._timer),this._timer=null);this._obj&&(this._callback(-1,this._node,
this._evt),this._obj=null)},addKeyListener:function(c,a,l,h,f,k,m){var b="keyCode"in a?"keyCode":"charCode"in a?"charCode":"charOrCode",n=[p(c,"keyCode"in a?"keydown":"charCode"in a?"keypress":r._keypress,g.hitch(this,function(d){d[b]!=a[b]||void 0!==a.ctrlKey&&a.ctrlKey!=d.ctrlKey||void 0!==a.altKey&&a.altKey!=d.altKey||void 0!==a.metaKey&&a.metaKey!=(d.metaKey||!1)||void 0!==a.shiftKey&&a.shiftKey!=d.shiftKey?e._obj==a&&e.stop():(d.stopPropagation(),d.preventDefault(),e.trigger(d,l,c,h,a,f,k,m))})),
p(c,"keyup",g.hitch(this,function(){e._obj==a&&e.stop()}))];return{remove:function(){q.forEach(n,function(d){d.remove()})}}},addMouseListener:function(c,a,l,h,f,k){var m=[p(c,"mousedown",g.hitch(this,function(b){b.preventDefault();e.trigger(b,a,c,l,c,h,f,k)})),p(c,"mouseup",g.hitch(this,function(b){this._obj&&b.preventDefault();e.stop()})),p(c,"mouseout",g.hitch(this,function(b){this._obj&&b.preventDefault();e.stop()})),p(c,"dblclick",g.hitch(this,function(b){b.preventDefault();9>t("ie")&&(e.trigger(b,
a,c,l,c,h,f,k),setTimeout(g.hitch(this,e.stop),50))}))];return{remove:function(){q.forEach(m,function(b){b.remove()})}}},addListener:function(c,a,l,h,f,k,m,b){var n=[this.addKeyListener(a,l,h,f,k,m,b),this.addMouseListener(c,h,f,k,m,b)];return{remove:function(){q.forEach(n,function(d){d.remove()})}}}};return e});