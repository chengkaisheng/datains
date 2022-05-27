//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel","dojo/_base/json","dojo/_base/xhr"],function(m,g,k,h,l){return m("dojox.data.FileStore",null,{constructor:function(a){a&&a.label&&(this.label=a.label);a&&a.url&&(this.url=a.url);a&&a.options&&(g.isArray(a.options)?this.options=a.options:g.isString(a.options)&&(this.options=a.options.split(",")));a&&a.pathAsQueryParam&&(this.pathAsQueryParam=!0);a&&"urlPreventCache"in a&&(this.urlPreventCache=a.urlPreventCache?!0:!1)},url:"",_storeRef:"_S",
label:"name",_identifier:"path",_attributes:"children directory name path modified size parentDir".split(" "),pathSeparator:"/",options:[],failOk:!1,urlPreventCache:!0,_assertIsItem:function(a){if(!this.isItem(a))throw Error("dojox.data.FileStore: a function was passed an item argument that was not an item");},_assertIsAttribute:function(a){if("string"!==typeof a)throw Error("dojox.data.FileStore: a function was passed an attribute argument that was not an attribute name string");},pathAsQueryParam:!1,
getFeatures:function(){return{"dojo.data.api.Read":!0,"dojo.data.api.Identity":!0}},getValue:function(a,b,d){return(a=this.getValues(a,b))&&0<a.length?a[0]:d},getAttributes:function(a){return this._attributes},hasAttribute:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);return b in a},getIdentity:function(a){return this.getValue(a,this._identifier)},getIdentityAttributes:function(a){return[this._identifier]},isItemLoaded:function(a){var b=this.isItem(a);b&&"boolean"==typeof a._loaded&&
!a._loaded&&(b=!1);return b},loadItem:function(a){var b=a.item,d=this,c=a.scope||k.global,e={};0<this.options.length&&(e.options=h.toJson(this.options));this.pathAsQueryParam&&(e.path=b.parentPath+this.pathSeparator+b.name);e=l.get({url:this.pathAsQueryParam?this.url:this.url+"/"+b.parentPath+"/"+b.name,handleAs:"json-comment-optional",content:e,preventCache:this.urlPreventCache,failOk:this.failOk});e.addErrback(function(f){a.onError&&a.onError.call(c,f)});e.addCallback(function(f){delete b.parentPath;
delete b._loaded;g.mixin(b,f);d._processItem(b);a.onItem&&a.onItem.call(c,b)})},getLabel:function(a){return this.getValue(a,this.label)},getLabelAttributes:function(a){return[this.label]},containsValue:function(a,b,d){a=this.getValues(a,b);for(b=0;b<a.length;b++)if(a[b]==d)return!0;return!1},getValues:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);a=a[b];"undefined"===typeof a||g.isArray(a)?"undefined"===typeof a&&(a=[]):a=[a];return a},isItem:function(a){return a&&a[this._storeRef]===
this?!0:!1},close:function(a){},fetch:function(a){a=a||{};a.store||(a.store=this);var b=this,d=a.scope||k.global,c={};a.query&&(c.query=h.toJson(a.query));a.sort&&(c.sort=h.toJson(a.sort));a.queryOptions&&(c.queryOptions=h.toJson(a.queryOptions));"number"==typeof a.start&&(c.start=""+a.start);"number"==typeof a.count&&(c.count=""+a.count);0<this.options.length&&(c.options=h.toJson(this.options));c=l.get({url:this.url,preventCache:this.urlPreventCache,failOk:this.failOk,handleAs:"json-comment-optional",
content:c});c.addCallback(function(e){b._processResult(e,a)});c.addErrback(function(e){a.onError&&a.onError.call(d,e,a)})},fetchItemByIdentity:function(a){var b=a.identity,d=this,c=a.scope||k.global,e={};0<this.options.length&&(e.options=h.toJson(this.options));this.pathAsQueryParam&&(e.path=b);b=l.get({url:this.pathAsQueryParam?this.url:this.url+"/"+b,handleAs:"json-comment-optional",content:e,preventCache:this.urlPreventCache,failOk:this.failOk});b.addErrback(function(f){a.onError&&a.onError.call(c,
f)});b.addCallback(function(f){f=d._processItem(f);a.onItem&&a.onItem.call(c,f)})},_processResult:function(a,b){var d=b.scope||k.global;try{a.pathSeparator&&(this.pathSeparator=a.pathSeparator);b.onBegin&&b.onBegin.call(d,a.total,b);var c=this._processItemArray(a.items);if(b.onItem){var e;for(e=0;e<c.length;e++)b.onItem.call(d,c[e],b);c=null}b.onComplete&&b.onComplete.call(d,c,b)}catch(f){b.onError?b.onError.call(d,f,b):console.log(f)}},_processItemArray:function(a){var b;for(b=0;b<a.length;b++)this._processItem(a[b]);
return a},_processItem:function(a){if(!a)return null;a[this._storeRef]=this;if(a.children&&a.directory)if(g.isArray(a.children)){var b=a.children,d;for(d=0;d<b.length;d++){var c=b[d];g.isObject(c)?b[d]=this._processItem(c):(b[d]={name:c,_loaded:!1,parentPath:a.path},b[d][this._storeRef]=this)}}else delete a.children;return a}})});