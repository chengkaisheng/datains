//>>built
define(["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/_base/xhr"],function(g,h,e,n){var k=e.getObject("grid.enhanced.plugins",!0,dojox),p=function(a){for(var b=["reorder","sizeChange","normal","presentation"],c=b.length,d=a.length-1;0<=d;--d){var f=h.indexOf(b,a[d]);0<=f&&f<=c&&(c=f)}return c<b.length-1?b.slice(0,c+1):b},q=function(a){var b=this._layers;var c=b.length;if(a){for(--c;0<=c;--c)if(b[c].name()==a){b[c]._unwrap(b[c+1]);break}b.splice(c,1)}else for(--c;0<=c;--c)b[c]._unwrap();
b.length||(delete this._layers,delete this.layer,delete this.unwrap,delete this.forEachLayer);return this},r=function(a){var b,c=this._layers;if("undefined"==typeof a)return c.length;if("number"==typeof a)return c[a];for(b=c.length-1;0<=b;--b)if(c[b].name()==a)return c[b];return null},t=function(a,b){var c=this._layers.length;if(b){b=0;var d=1}else b=c-1,d=c=-1;for(;b!=c;b+=d)if(!1===a(this._layers[b],b))return b;return c};k.wrap=function(a,b,c,d){a._layers||(a._layers=[],a.layer=e.hitch(a,r),a.unwrap=
e.hitch(a,q),a.forEachLayer=e.hitch(a,t));var f=p(c.tags);h.some(a._layers,function(l,u){if(h.some(l.tags,function(v){return 0<=h.indexOf(f,v)}))return!1;a._layers.splice(u,0,c);c._wrap(a,b,d,l);return!0})||(a._layers.push(c),c._wrap(a,b,d));return a};var m=g("dojox.grid.enhanced.plugins._StoreLayer",null,{tags:["normal"],layerFuncName:"_fetch",constructor:function(){this._originFetch=this._store=null;this.__enabled=!0},initialize:function(a){},uninitialize:function(a){},invalidate:function(){},_wrap:function(a,
b,c,d){this._store=a;this._funcName=b;var f=e.hitch(this,function(){return(this.enabled()?this[c||this.layerFuncName]:this.originFetch).apply(this,arguments)});d?(this._originFetch=d._originFetch,d._originFetch=f):(this._originFetch=a[b]||function(){},a[b]=f);this.initialize(a)},_unwrap:function(a){this.uninitialize(this._store);a?a._originFetch=this._originFetch:this._store[this._funcName]=this._originFetch;this._store=this._originFetch=null},enabled:function(a){"undefined"!=typeof a&&(this.__enabled=
!!a);return this.__enabled},name:function(){if(!this.__name){var a=this.declaredClass.match(/(?:\.(?:_*)([^\.]+)Layer$)|(?:\.([^\.]+)$)/i);this.__name=a?(a[1]||a[2]).toLowerCase():this.declaredClass}return this.__name},originFetch:function(){return e.hitch(this._store,this._originFetch).apply(this,arguments)}});g=g("dojox.grid.enhanced.plugins._ServerSideLayer",m,{constructor:function(a){a=a||{};this._url=a.url||"";this._isStateful=!!a.isStateful;this._onUserCommandLoad=a.onCommandLoad||function(){};
this.__cmds={cmdlayer:this.name(),enable:!0};this.useCommands(this._isStateful)},enabled:function(a){var b=this.inherited(arguments);this.__cmds.enable=this.__enabled;return b},useCommands:function(a){"undefined"!=typeof a&&(this.__cmds.cmdlayer=a&&this._isStateful?this.name():null);return!!this.__cmds.cmdlayer},_fetch:function(a){this.__cmds.cmdlayer?n.post({url:this._url||this._store.url,content:this.__cmds,load:e.hitch(this,function(b){this.onCommandLoad(b,a);this.originFetch(a)}),error:e.hitch(this,
this.onCommandError)}):(this.onCommandLoad("",a),this.originFetch(a));return a},command:function(a,b){var c=this.__cmds;null===b?delete c[a]:"undefined"!==typeof b&&(c[a]=b);return c[a]},onCommandLoad:function(a,b){this._onUserCommandLoad(this.__cmds,b,a)},onCommandError:function(a){console.log(a);throw a;}});return{_StoreLayer:m,_ServerSideLayer:g,wrap:k.wrap}});