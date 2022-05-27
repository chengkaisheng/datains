// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../core/lang ../../core/object ../../core/maybe ../../core/accessorSupport/extensions/serializableProperty/writer ../../core/Error".split(" "),function(f,m,n,l,e,p){function g(a){return!("feature"!==a.type||a.url||!a.source||"memory"!==a.source.type)}const h=new Set("bing-maps open-street-map tile unknown unsupported vector-tile web-tile".split(" ")),k=new Set("csv feature geo-rss group kml tile unknown unsupported vector-tile web-tile".split(" "));f.disableRestrictedWriting=function(a){h.add(a);
k.add(a)};f.enableRestrictedWriting=function(a){h.delete(a);k.delete(a)};f.getLayerJSON=function(a,d,b){if(!("write"in a&&a.write))return b&&b.messages&&b.messages.push(new p("layer:unsupported",`Layers (${a.title}, ${a.id}) of type '${a.declaredClass}' cannot be persisted`,{layer:a})),null;if(b.restrictedWebMapWriting){var c="basemap"===b.layerContainerType?h:"operational-layers"===b.layerContainerType?k:null;c=l.isSome(c)?c.has(a.type)&&!g(a):!0}else c=!0;if(c)return d={},a.write(d,b)?d:null;if(l.isSome(d)){b=
d=m.clone(d);if(g(a)){if(c=(c=n.getDeepValue("featureCollection.layers",b))&&c[0]&&c[0].layerDefinition)"maxScale"in a&&(c.maxScale=e.numberToJSON(a.maxScale)),"minScale"in a&&(c.minScale=e.numberToJSON(a.minScale))}else"group"!==a.type&&("maxScale"in a&&(b.maxScale=e.numberToJSON(a.maxScale)),"minScale"in a&&(b.minScale=e.numberToJSON(a.minScale)));"blendMode"in a&&(b.blendMode=a.blendMode,"normal"===b.blendMode&&delete b.blendMode);b.opacity=e.numberToJSON(a.opacity);b.title=a.title||"Layer";b.visibility=
a.visible;if("legendEnabled"in a&&"wmts"!==a.type)if(g(a)){if(b=b.featureCollection)b.showLegend=a.legendEnabled}else b.showLegend=a.legendEnabled}return d};Object.defineProperty(f,"__esModule",{value:!0})});