//>>built
define(["dojo/_base/kernel","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred"],function(h,k,l,g,m){h.deprecated("dojox/mobile/_DataMixin","Use dojox/mobile/_StoreMixin instead","2.0");return l("dojox.mobile._DataMixin",null,{store:null,query:null,queryOptions:null,setStore:function(a,b,d){if(a===this.store)return null;this.store=a;this._setQuery(b,d);a&&a.getFeatures()["dojo.data.api.Notification"]&&(k.forEach(this._conn||[],this.disconnect,this),this._conn=[this.connect(a,
"onSet","onSet"),this.connect(a,"onNew","onNew"),this.connect(a,"onDelete","onDelete"),this.connect(a,"close","onStoreClose")]);return this.refresh()},setQuery:function(a,b){this._setQuery(a,b);return this.refresh()},_setQuery:function(a,b){this.query=a;this.queryOptions=b||this.queryOptions},refresh:function(){if(!this.store)return null;var a=new m,b=g.hitch(this,function(e,f){this.onComplete(e,f);a.resolve()}),d=g.hitch(this,function(e,f){this.onError(e,f);a.resolve()}),c=this.query;this.store.fetch({query:c,
queryOptions:this.queryOptions,onComplete:b,onError:d,start:c&&c.start,count:c&&c.count});return a}})});