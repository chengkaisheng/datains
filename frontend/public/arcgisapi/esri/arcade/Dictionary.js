// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["../geometry/Geometry","./ImmutableArray","../chunks/languageUtils"],function(l,m,f){function h(d){var e=null;if(null!==d)if(f.isNumber(d))e=f.toNumber(d);else if(f.isBoolean(d))e=f.toBoolean(d);else if(f.isString(d))e=f.toString(d);else if(f.isDate(d))e=f.toDate(d);else if(f.isArray(d)){e=[];for(var a of d)e.push(h(a))}else{if(0===Object.keys(d).length)return null;e=new k;e.immutable=!1;for(const c of Object.keys(d))a=d[c],void 0!==a&&e.setField(c,h(a));e.immutable=!0}return e}let k=function(){function d(a){this.declaredClass=
"esri.arcade.Dictionary";this.attributes=null;this.plain=!1;this.immutable=!0;this.attributes=a instanceof d?a.attributes:void 0===a?{}:null===a?{}:a}var e=d.prototype;e.field=function(a){const c=a.toLowerCase(),b=this.attributes[a];if(void 0!==b)return b;for(const g in this.attributes)if(g.toLowerCase()===c)return this.attributes[g];throw Error("Field not Found : "+a);};e.setField=function(a,c){if(this.immutable)throw Error("Dictionary is Immutable");const b=a.toLowerCase();if(void 0===this.attributes[a])for(const g in this.attributes)if(g.toLowerCase()===
b){this.attributes[g]=c;return}this.attributes[a]=c};e.hasField=function(a){const c=a.toLowerCase();if(void 0!==this.attributes[a])return!0;for(const b in this.attributes)if(b.toLowerCase()===c)return!0;return!1};e.keys=function(){let a=[];for(const c in this.attributes)a.push(c);return a=a.sort()};e.castToText=function(){let a="";for(const c in this.attributes){""!==a&&(a+=",");const b=this.attributes[c];null==b?a+=JSON.stringify(c)+":null":f.isBoolean(b)||f.isNumber(b)||f.isString(b)?a+=JSON.stringify(c)+
":"+JSON.stringify(b):b instanceof l?a+=JSON.stringify(c)+":"+f.toStringExplicit(b):b instanceof m?a+=JSON.stringify(c)+":"+f.toStringExplicit(b):b instanceof Array?a+=JSON.stringify(c)+":"+f.toStringExplicit(b):b instanceof Date?a+=JSON.stringify(c)+":"+JSON.stringify(b):null!==b&&"object"===typeof b&&void 0!==b.castToText&&(a+=JSON.stringify(c)+":"+b.castToText())}return"{"+a+"}"};d.convertObjectToArcadeDictionary=function(a){const c=new d;c.immutable=!1;for(const b in a){const g=a[b];void 0!==
g&&c.setField(b.toString(),h(g))}c.immutable=!0;return c};return d}();return k});