//>>built
define(["dojo","dojox","dojo/data/util/sorter"],function(g,l){l.data.ASYNC_MODE=0;l.data.SYNC_MODE=1;return g.declare("dojox.data.CdfStore",null,{identity:"jsxid",url:"",xmlStr:"",data:null,label:"",mode:l.data.ASYNC_MODE,constructor:function(a){a&&(this.url=a.url,this.xmlStr=a.xmlStr||a.str,a.data&&(this.xmlStr=this._makeXmlString(a.data)),this.identity=a.identity||this.identity,this.label=a.label||this.label,this.mode=void 0!==a.mode?a.mode:this.mode);this._modifiedItems={};this.byId=this.fetchItemByIdentity},
getValue:function(a,b,f){return a.getAttribute(b)||f},getValues:function(a,b){a=this.getValue(a,b,[]);return g.isArray(a)?a:[a]},getAttributes:function(a){return a.getAttributeNames()},hasAttribute:function(a,b){return void 0!==this.getValue(a,b)},hasProperty:function(a,b){return this.hasAttribute(a,b)},containsValue:function(a,b,f){a=this.getValues(a,b);for(b=0;b<a.length;b++)if(null!==a[b])if("string"===typeof f){if(a[b].toString&&a[b].toString()===f)return!0}else if(a[b]===f)return!0;return!1},
isItem:function(a){return a.getClass&&a.getClass().equals(jsx3.xml.Entity.jsxclass)?!0:!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){},getFeatures:function(){return{"dojo.data.api.Read":!0,"dojo.data.api.Write":!0,"dojo.data.api.Identity":!0}},getLabel:function(a){if(""!==this.label&&this.isItem(a)&&(a=this.getValue(a,this.label)))return a.toString()},getLabelAttributes:function(a){return""!==this.label?[this.label]:null},fetch:function(a){a=a||{};a.store||(a.store=this);
void 0!==a.mode&&(this.mode=a.mode);var b=this,f=function(e){a.onError?a.onError.call(a.scope||g.global,e,a):console.error("cdfStore Error:",e)},k=function(e,c){c=c||a;var t=c.abort||null,p=!1,m=c.start?c.start:0,q=c.count&&Infinity!==c.count?m+c.count:e.length;c.abort=function(){p=!0;t&&t.call(c)};var r=c.scope||g.global;c.store||(c.store=b);c.onBegin&&c.onBegin.call(r,e.length,c);c.sort&&e.sort(g.data.util.sorter.createSortFunction(c.sort,b));if(c.onItem)for(var n=m;n<e.length&&n<q;++n){var u=e[n];
p||c.onItem.call(r,u,c)}c.onComplete&&!p?(c.onItem||(e=e.slice(m,q),c.byId&&(e=e[0])),c.onComplete.call(r,e,c)):(e=e.slice(m,q),c.byId&&(e=e[0]));return e};if(!this.url&&!this.data&&!this.xmlStr)return f(Error("No URL or data specified.")),!1;var h=a||"*";if(this.mode==l.data.SYNC_MODE){var d=this._loadCDF();if(d instanceof Error)return a.onError?a.onError.call(a.scope||g.global,d,a):console.error("CdfStore Error:",d),d;this.cdfDoc=d;return d=(d=this._getItems(this.cdfDoc,h))&&0<d.length?k(d,a):k([],
a)}d=this._loadCDF();d.addCallbacks(g.hitch(this,function(e){(e=this._getItems(this.cdfDoc,h))&&0<e.length?k(e,a):k([],a)}),g.hitch(this,function(e){f(e,a)}));return d},_loadCDF:function(){var a=new g.Deferred;if(this.cdfDoc){if(this.mode==l.data.SYNC_MODE)return this.cdfDoc;setTimeout(g.hitch(this,function(){a.callback(this.cdfDoc)}),0);return a}this.cdfDoc=jsx3.xml.CDF.Document.newDocument();this.cdfDoc.subscribe("response",this,function(b){a.callback(this.cdfDoc)});this.cdfDoc.subscribe("error",
this,function(b){a.errback(b)});this.cdfDoc.setAsync(!this.mode);if(this.url)this.cdfDoc.load(this.url);else if(this.xmlStr&&(this.cdfDoc.loadXML(this.xmlStr),this.cdfDoc.getError().code))return Error(this.cdfDoc.getError().description);return this.mode==l.data.SYNC_MODE?this.cdfDoc:a},_getItems:function(a,b){a=a.selectNodes(b.query,!1,1);for(b=[];a.hasNext();)b.push(a.next());return b},close:function(a){},newItem:function(a,b){a=a||{};a.tagName&&("record"!=a.tagName&&console.warn("Only record inserts are supported at this time"),
delete a.tagName);a.jsxid=a.jsxid||this.cdfDoc.getKey();this.isItem(b)&&(b=this.getIdentity(b));a=this.cdfDoc.insertRecord(a,b);this._makeDirty(a);return a},deleteItem:function(a){this.cdfDoc.deleteRecord(this.getIdentity(a));this._makeDirty(a);return!0},setValue:function(a,b,f){this._makeDirty(a);a.setAttribute(b,f);return!0},setValues:function(a,b,f){this._makeDirty(a);console.warn("cdfStore.setValues only partially implemented.");return a.setAttribute(b,f)},unsetAttribute:function(a,b){this._makeDirty(a);
a.removeAttribute(b);return!0},revert:function(){delete this.cdfDoc;this._modifiedItems={};return!0},isDirty:function(a){if(a)return!!this._modifiedItems[this.getIdentity(a)];a=!1;for(var b in this._modifiedItems){a=!0;break}return a},_makeDirty:function(a){var b=this.getIdentity(a);this._modifiedItems[b]=a},_makeXmlString:function(a){var b=function(f,k){var h="",d;if(g.isArray(f))for(d=0;d<f.length;d++)h+=b(f[d],k);else if(g.isObject(f)){h+="\x3c"+k+" ";for(d in f)g.isObject(f[d])||(h+=d+'\x3d"'+
f[d]+'" ');h+="\x3e";for(d in f)g.isObject(f[d])&&(h+=b(f[d],d));h+="\x3c/"+k+"\x3e"}return h};return b(a,"data")},getIdentity:function(a){return this.getValue(a,this.identity)},getIdentityAttributes:function(a){return[this.identity]},fetchItemByIdentity:function(a){g.isString(a)?a={query:"//record[@jsxid\x3d'"+a+"']",mode:l.data.SYNC_MODE}:(a&&(a.query="//record[@jsxid\x3d'"+a.identity+"']"),a.mode||(a.mode=this.mode));a.byId=!0;return this.fetch(a)},byId:function(a){}})});