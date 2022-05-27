//>>built
define(["dojo/_base/Deferred","dojo/_base/declare"],function(g,h){return h("dojox.mobile._StoreMixin",null,{store:null,query:null,queryOptions:null,labelProperty:"label",childrenProperty:"children",setStore:function(a,b,c){if(a===this.store)return null;a&&(a.getValue=function(d,f){return d[f]});this.store=a;this._setQuery(b,c);return this.refresh()},setQuery:function(a,b){this._setQuery(a,b);return this.refresh()},_setQuery:function(a,b){this.query=a;this.queryOptions=b||this.queryOptions},refresh:function(){if(!this.store)return null;
var a=this,b=this.store.query(this.query,this.queryOptions);g.when(b,function(c){c.items&&(c=c.items);b.observe&&(a._observe_h&&a._observe_h.remove(),a._observe_h=b.observe(function(d,f,e){if(-1!=f)if(e!=f){if(a.onDelete(d,f),-1!=e)if(a.onAdd)a.onAdd(d,e);else a.onUpdate(d,e)}else{if(a.onAdd)a.onUpdate(d,e)}else if(-1!=e)if(a.onAdd)a.onAdd(d,e);else a.onUpdate(d,e)},!0));a.onComplete(c)},function(c){a.onError(c)});return b},destroy:function(){this._observe_h&&(this._observe_h=this._observe_h.remove());
this.inherited(arguments)}})});