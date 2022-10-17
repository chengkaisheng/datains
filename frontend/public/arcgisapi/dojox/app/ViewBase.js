//>>built
define("require dojo/when dojo/on dojo/dom-attr dojo/dom-style dojo/_base/declare dojo/_base/lang dojo/Deferred ./utils/model ./utils/constraints".split(" "),function(g,k,t,n,p,l,c,m,q,r){return l("dojox.app.ViewBase",null,{constructor:function(a){this.name=this.id="";this.children={};this.selectedChildren={};this.loadedStores={};this._started=!1;c.mixin(this,a);this.parent.views&&c.mixin(this,this.parent.views[this.name])},start:function(){if(this._started)return this;this._startDef=new m;k(this.load(),
c.hitch(this,function(){this._createDataStore(this);this._setupModel()}));return this._startDef},load:function(){var a=this._loadViewController();k(a,c.hitch(this,function(b){b&&l.safeMixin(this,b)}));return a},_createDataStore:function(){this.parent.loadedStores&&c.mixin(this.loadedStores,this.parent.loadedStores);if(this.stores)for(var a in this.stores)if("_"!==a.charAt(0)){var b=this.stores[a].type?this.stores[a].type:"dojo/store/Memory",d={};this.stores[a].params&&c.mixin(d,this.stores[a].params);
try{var h=g(b)}catch(e){throw Error(b+" must be listed in the dependencies");}d.data&&c.isString(d.data)&&(d.data=c.getObject(d.data));if(this.stores[a].observable){try{var f=g("dojo/store/Observable")}catch(e){throw Error("dojo/store/Observable must be listed in the dependencies");}this.stores[a].store=f(new h(d))}else this.stores[a].store=new h(d);this.loadedStores[a]=this.stores[a].store}},_setupModel:function(){if(this.loadedModels)this._startup();else{try{var a=q(this.models,this.parent,this.app)}catch(b){throw Error("Error creating models: "+
b.message);}k(a,c.hitch(this,function(b){b&&(this.loadedModels=c.isArray(b)?b[0]:b);this._startup()}),function(b){throw Error("Error creating models: "+b.message);})}},_startup:function(){this._initViewHidden();this._needsResize=!0;this._startLayout()},_initViewHidden:function(){p.set(this.domNode,"visibility","hidden")},_startLayout:function(){this.app.log("  \x3e in app/ViewBase _startLayout firing layout for name\x3d[",this.name,"], parent.name\x3d[",this.parent.name,"]");this.hasOwnProperty("constraint")||
(this.constraint=n.get(this.domNode,"data-app-constraint")||"center");r.register(this.constraint);this.app.emit("app-initLayout",{view:this,callback:c.hitch(this,function(){this.startup();this.app.log("  \x3e in app/ViewBase calling init() name\x3d[",this.name,"], parent.name\x3d[",this.parent.name,"]");this.init();this._started=!0;this._startDef&&this._startDef.resolve(this)})})},_loadViewController:function(){var a=new m;if(this.controller)var b=this.controller.replace(/(\.js)$/,"");else return this.app.log("  \x3e in app/ViewBase _loadViewController no controller set for view name\x3d[",
this.name,"], parent.name\x3d[",this.parent.name,"]"),a.resolve(!0),a;try{var d=b,h=d.indexOf("./");0<=h&&(d=b.substring(h+2));var f=g.on?g.on("error",function(e){!a.isResolved()&&!a.isRejected()&&e.info[0]&&0<=e.info[0].indexOf(d)&&(a.resolve(!1),f&&f.remove())}):null;0==b.indexOf("./")&&(b="app/"+b);g([b],function(e){a.resolve(e);f&&f.remove()})}catch(e){a.reject(e),f&&f.remove()}return a},init:function(){},beforeActivate:function(){},afterActivate:function(){},beforeDeactivate:function(){},afterDeactivate:function(){},
destroy:function(){}})});