// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define(["exports","./has"],function(e,f){function m(c,a,b=!1){b&&h.has(a)||(b&&h.add(a),c.warn(`\ud83d\uded1 DEPRECATED - ${a}`))}function g(c,a,b={}){if(f("esri-deprecation-warnings")){const {replacement:d,version:k,see:l,warnOnce:n}=b;d&&(a+=`\n\t\ud83d\udee0\ufe0f Replacement: ${d}`);k&&(a+=`\n\t\u2699\ufe0f Version: ${k}`);l&&(a+=`\n\t\ud83d\udd17 See ${l} for more details.`);m(c,a,n)}}const h=new Set;e.deprecated=g;e.deprecatedFunction=function(c,a,b={}){if(f("esri-deprecation-warnings")){const {moduleName:d}=
b;g(c,`Function: ${(d?d+"::":"")+a+"()"}`,b)}};e.deprecatedModule=function(c,a,b={}){f("esri-deprecation-warnings")&&g(c,`Module: ${a}`,b)};e.deprecatedProperty=function(c,a,b={}){if(f("esri-deprecation-warnings")){const {moduleName:d}=b;g(c,`Property: ${(d?d+"::":"")+a}`,b)}};Object.defineProperty(e,"__esModule",{value:!0})});