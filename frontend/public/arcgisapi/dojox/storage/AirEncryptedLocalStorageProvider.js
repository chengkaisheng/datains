//>>built
define(["dojo","dijit","dojox","dojo/require!dojox/storage/manager,dojox/storage/Provider"],function(g,m,h){g.provide("dojox.storage.AirEncryptedLocalStorageProvider");g.require("dojox.storage.manager");g.require("dojox.storage.Provider");g.isAIR&&function(){if(!e)var e={};e.ByteArray=window.runtime.flash.utils.ByteArray;e.EncryptedLocalStore=window.runtime.flash.data.EncryptedLocalStore;g.declare("dojox.storage.AirEncryptedLocalStorageProvider",[h.storage.Provider],{initialize:function(){h.storage.manager.loaded()},
isAvailable:function(){return!0},_getItem:function(a){return(a=e.EncryptedLocalStore.getItem("__dojo_"+a))?a.readUTFBytes(a.length):""},_setItem:function(a,b){var c=new e.ByteArray;c.writeUTFBytes(b);e.EncryptedLocalStore.setItem("__dojo_"+a,c)},_removeItem:function(a){e.EncryptedLocalStore.removeItem("__dojo_"+a)},put:function(a,b,c,d){if(0==this.isValidKey(a))throw Error("Invalid key given: "+a);d=d||this.DEFAULT_NAMESPACE;if(0==this.isValidKey(d))throw Error("Invalid namespace given: "+d);try{var f=
this._getItem("namespaces")||"|";-1==f.indexOf("|"+d+"|")&&this._setItem("namespaces",f+d+"|");var k=this._getItem(d+"_keys")||"|";-1==k.indexOf("|"+a+"|")&&this._setItem(d+"_keys",k+a+"|");this._setItem("_"+d+"_"+a,b)}catch(l){console.debug("dojox.storage.AirEncryptedLocalStorageProvider.put:",l);c(this.FAILED,a,l.toString(),d);return}c&&c(this.SUCCESS,a,null,d)},get:function(a,b){if(0==this.isValidKey(a))throw Error("Invalid key given: "+a);b=b||this.DEFAULT_NAMESPACE;return this._getItem("_"+b+
"_"+a)},getNamespaces:function(){for(var a=[this.DEFAULT_NAMESPACE],b=(this._getItem("namespaces")||"|").split("|"),c=0;c<b.length;c++)b[c].length&&b[c]!=this.DEFAULT_NAMESPACE&&a.push(b[c]);return a},getKeys:function(a){a=a||this.DEFAULT_NAMESPACE;if(0==this.isValidKey(a))throw Error("Invalid namespace given: "+a);var b=[];a=(this._getItem(a+"_keys")||"|").split("|");for(var c=0;c<a.length;c++)a[c].length&&b.push(a[c]);return b},clear:function(a){if(0==this.isValidKey(a))throw Error("Invalid namespace given: "+
a);var b=this._getItem("namespaces")||"|";-1!=b.indexOf("|"+a+"|")&&this._setItem("namespaces",b.replace("|"+a+"|","|"));b=(this._getItem(a+"_keys")||"|").split("|");for(var c=0;c<b.length;c++)b[c].length&&this._removeItem(a+"_"+b[c]);this._removeItem(a+"_keys")},remove:function(a,b){b=b||this.DEFAULT_NAMESPACE;var c=this._getItem(b+"_keys")||"|";-1!=c.indexOf("|"+a+"|")&&this._setItem(b+"_keys",c.replace("|"+a+"|","|"));this._removeItem("_"+b+"_"+a)},putMultiple:function(a,b,c,d){if(!1===this.isValidKeyArray(a)||
!b instanceof Array||a.length!=b.length)throw Error("Invalid arguments: keys \x3d ["+a+"], values \x3d ["+b+"]");if(null==d||"undefined"==typeof d)d=this.DEFAULT_NAMESPACE;if(0==this.isValidKey(d))throw Error("Invalid namespace given: "+d);this._statusHandler=c;try{for(var f=0;f<a.length;f++)this.put(a[f],b[f],null,d)}catch(k){console.debug("dojox.storage.AirEncryptedLocalStorageProvider.putMultiple:",k);c&&c(this.FAILED,a,k.toString(),d);return}c&&c(this.SUCCESS,a,null)},getMultiple:function(a,b){if(!1===
this.isValidKeyArray(a))throw Error("Invalid key array given: "+a);if(null==b||"undefined"==typeof b)b=this.DEFAULT_NAMESPACE;if(0==this.isValidKey(b))throw Error("Invalid namespace given: "+b);for(var c=[],d=0;d<a.length;d++)c[d]=this.get(a[d],b);return c},removeMultiple:function(a,b){b=b||this.DEFAULT_NAMESPACE;for(var c=0;c<a.length;c++)this.remove(a[c],b)},isPermanent:function(){return!0},getMaximumSize:function(){return this.SIZE_NO_LIMIT},hasSettingsUI:function(){return!1},showSettingsUI:function(){throw Error(this.declaredClass+
" does not support a storage settings user-interface");},hideSettingsUI:function(){throw Error(this.declaredClass+" does not support a storage settings user-interface");}});h.storage.manager.register("dojox.storage.AirEncryptedLocalStorageProvider",new h.storage.AirEncryptedLocalStorageProvider);h.storage.manager.initialize()}()});