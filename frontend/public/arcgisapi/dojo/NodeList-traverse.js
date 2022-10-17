//>>built
define(["./query","./_base/lang","./_base/array"],function(f,g,k){var h=f.NodeList;g.extend(h,{_buildArrayFromCallback:function(c){for(var a=[],b=0;b<this.length;b++){var d=c.call(this[b],this[b],a);d&&(a=a.concat(d))}return a},_getUniqueAsNodeList:function(c){for(var a=[],b=0,d;d=c[b];b++)1==d.nodeType&&-1==k.indexOf(a,d)&&a.push(d);return this._wrap(a,null,this._NodeListCtor)},_getUniqueNodeListWithParent:function(c,a){c=this._getUniqueAsNodeList(c);c=a?f._filterResult(c,a):c;return c._stash(this)},
_getRelatedUniqueNodes:function(c,a){return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(a),c)},children:function(c){return this._getRelatedUniqueNodes(c,function(a,b){return g._toArray(a.childNodes)})},closest:function(c,a){return this._getRelatedUniqueNodes(null,function(b,d){do if(f._filterResult([b],c,a).length)return b;while(b!=a&&(b=b.parentNode)&&1==b.nodeType);return null})},parent:function(c){return this._getRelatedUniqueNodes(c,function(a,b){return a.parentNode})},parents:function(c){return this._getRelatedUniqueNodes(c,
function(a,b){for(b=[];a.parentNode;)a=a.parentNode,b.push(a);return b})},siblings:function(c){return this._getRelatedUniqueNodes(c,function(a,b){b=[];for(var d=a.parentNode&&a.parentNode.childNodes,e=0;e<d.length;e++)d[e]!=a&&b.push(d[e]);return b})},next:function(c){return this._getRelatedUniqueNodes(c,function(a,b){for(a=a.nextSibling;a&&1!=a.nodeType;)a=a.nextSibling;return a})},nextAll:function(c){return this._getRelatedUniqueNodes(c,function(a,b){for(b=[];a=a.nextSibling;)1==a.nodeType&&b.push(a);
return b})},prev:function(c){return this._getRelatedUniqueNodes(c,function(a,b){for(a=a.previousSibling;a&&1!=a.nodeType;)a=a.previousSibling;return a})},prevAll:function(c){return this._getRelatedUniqueNodes(c,function(a,b){for(b=[];a=a.previousSibling;)1==a.nodeType&&b.push(a);return b})},andSelf:function(){return this.concat(this._parent)},first:function(){return this._wrap(this[0]&&[this[0]]||[],this)},last:function(){return this._wrap(this.length?[this[this.length-1]]:[],this)},even:function(){return this.filter(function(c,
a){return 0!=a%2})},odd:function(){return this.filter(function(c,a){return 0==a%2})}});return h});