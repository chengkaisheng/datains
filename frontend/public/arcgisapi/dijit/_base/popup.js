//>>built
define(["dojo/dom-class","dojo/_base/window","../popup","../BackgroundIframe"],function(e,f,b){var g=b._createWrapper;b._createWrapper=function(a){a.declaredClass||(a={_popupWrapper:a.parentNode&&e.contains(a.parentNode,"dijitPopup")?a.parentNode:null,domNode:a,destroy:function(){},ownerDocument:a.ownerDocument,ownerDocumentBody:f.body(a.ownerDocument)});return g.call(this,a)};var h=b.open;b.open=function(a){if(a.orient&&"string"!=typeof a.orient&&!("length"in a.orient)){var d=[],c;for(c in a.orient)d.push({aroundCorner:c,
corner:a.orient[c]});a.orient=d}return h.call(this,a)};return b});