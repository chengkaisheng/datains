//>>built
define(["dojo","dijit","dojox"],function(e,h,f){e.provide("dojox.lang.oo.Filter");(function(){var c=f.lang.oo,g=c.Filter=function(a,b){this.bag=a;this.filter="object"==typeof b?function(){return b.exec.apply(b,arguments)}:b},d=function(a){this.map=a};d.prototype.exec=function(a){return this.map.hasOwnProperty(a)?this.map[a]:a};c.filter=function(a,b){return new g(a,new d(b))}})()});