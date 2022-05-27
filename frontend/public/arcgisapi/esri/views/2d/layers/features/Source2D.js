// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("exports ../../../../chunks/_rollupPluginBabelHelpers ../../../../core/has ../../../../core/maybe ../../../../core/promiseUtils ../../../../core/accessorSupport/diffUtils ../../../../TimeExtent ../../../../tasks/support/Query ../../engine/webgl/definitions ./sources/createSource ./support/tileUtils ./support/UpdateToken".split(" "),function(v,w,A,q,B,r,C,D,x,E,n,t){function y(g,c){const b=[];b.push(new m([0,0],g,null));if(0===c)return b;c=Math.min(c,x.TILE_SIZE);const a=x.TILE_SIZE;b.push(new m([-a,
-a],n.getPow2NeighborTile(g,-1,-1),[a-c,a-c,a,a]));b.push(new m([0,-a],n.getPow2NeighborTile(g,0,-1),[0,a-c,a,a]));b.push(new m([a,-a],n.getPow2NeighborTile(g,1,-1),[0,a-c,c,a]));b.push(new m([-a,0],n.getPow2NeighborTile(g,-1,0),[a-c,0,a,a]));b.push(new m([a,0],n.getPow2NeighborTile(g,1,0),[0,0,c,a]));b.push(new m([-a,a],n.getPow2NeighborTile(g,-1,1),[a-c,0,a,c]));b.push(new m([0,a],n.getPow2NeighborTile(g,0,1),[0,0,a,c]));b.push(new m([a,a],n.getPow2NeighborTile(g,1,1),[0,0,c,c]));return b}let z=
0,F=function(){function g(b,a){this.didSend=!1;this.dataTileCount=0;this.update=t.UpdateToken.all();this._abortController=new AbortController;this.invalid=!1;this.displayTile=b;this._pixelBuffer=a;this.partitions=y(b,a)}var c=g.prototype;c.setUpdate=function(b,a){this.update=b;this.dataTileCount=0;a!==this._pixelBuffer&&(this._pixelBuffer=a,this.partitions=y(this.displayTile,a));b.mesh&&(this.didSend=!1)};c.abort=function(){this._abortController.abort()};w._createClass(g,[{key:"signal",get:function(){return this._abortController.signal}}]);
return g}(),m=function(){function g(c,b,a){this.resolved=!1;this.tile=b;this.offset=c;this.extent=a}g.prototype.reset=function(){this.resolved=!1};return g}(),O=function(){function g(b,a,f){this.type="remote";this._pendingEdits=new Set;this._queryInfo=null;this._subscriptions={display:new Map};this._invalid={outFields:!1,queryFilterParameters:!1};const h=this._onDataTileRequest.bind(this);this._source=E.createSource(b,a,f,h,()=>this.canAcceptPatch());this._serviceInfo=b;this._geometryType=b.geometryType;
this._outSR=a}var c=g.prototype;c.destroy=function(){this._getSubscriptions().map(({displayTile:b})=>this.unsubscribe(b));this._source.destroy()};c.enableEvent=function(b,a){this._source.enableEvent(b,a)};c.setViewState=function(b){this._source.setViewState(b)};c.update=function(b,a){var f,h,e,d,k=this._serviceInfo.fields.length;const l=null!=(f=null==(h=this._schema)?void 0:h.outFields)?f:[];f=null!=(e=null==(d=this._schema)?void 0:d.pixelBuffer)?e:0;e=a.outFields.filter(p=>-1===l.indexOf(p));e=
[...l,...e];a.pixelBuffer=0===a.pixelBuffer?0:Math.max(a.pixelBuffer,f);a.outFields=e.length>=.75*k?["*"]:e;a.outFields.sort();f=r.diff(this._schema,a);this._subscriptions.display.forEach(p=>{p.invalid&&(b.queryFilter=!0)});f&&(k=this._schema&&r.hasDiff(f,"outFields"),e=this._schema&&r.hasDiff(f,"pixelBuffer"),d=this._schema&&r.hasDiffAny(f,["definitionExpression","gdbVersion","historicMoment"]),A("esri-2d-update-debug")&&console.debug("Applying Update - Source:",f),f={returnCentroid:"esriGeometryPolygon"===
this._geometryType,returnGeometry:!0,outFields:a.outFields,outSpatialReference:this._outSR,orderByFields:[`${this._serviceInfo.objectIdField} ASC`],where:a.definitionExpression||"1\x3d1",gdbVersion:a.gdbVersion,historicMoment:a.historicMoment?new Date(a.historicMoment):null,timeExtent:C.fromJSON(a.timeExtent)},b.source=!0,e&&(b.why.mesh.push("Pixel buffer changed"),b.mesh=!0),d&&(b.why.mesh.push("Layer filter changed"),b.why.source.push("Layer filter changed"),b.mesh=!0,b.queryFilter=!0,this._invalid.queryFilterParameters=
!0),k&&(b.why.source.push("Layer required fields changed"),this._invalid.outFields=!0),this._schema=a,this._source.update(f),this._queryInfo=f)};c.subscribe=function(b){this._subscriptions.display.has(b.id)||this._subscribeDisplayTile(b)};c.unsubscribe=function(b){if(this._subscriptions.display.has(b.id)){var a=this._subscriptions.display.get(b.id);this._subscriptions.display.delete(b.id);this._source.unsubscribe(b);a.abort()}};c.forEachRequest=function(b,a){this._source.forEachRequest(b,a)};c.query=
function(b){return this._source.query(b)};c.createQuery=function(){return new D({...this._queryInfo})};c.createTileQuery=function(b){if("stream"===this._serviceInfo.type)throw Error("Service does not support tile  queries");const a=this.createQuery();a.quantizationParameters=b.getQuantizationParameters();a.resultType="tile";a.geometry=b.extent;"esriGeometryPolyline"===this._serviceInfo.geometryType&&(a.maxAllowableOffset=b.resolution);this._serviceInfo.capabilities.query.supportsQuantization||(a.quantizationParameters=
null,a.maxAllowableOffset=b.resolution);return a};c.invalidate=function(){this._subscriptions.display.forEach(b=>b.invalid=!0)};c.forEachPendingEdit=function(b){this._getSubscriptions().some(({invalid:a})=>a)?this._pendingEdits.forEach(b):this._pendingEdits.clear()};c.onEdits=async function(b){const a=b.addedFeatures.filter(d=>!d.error).map(d=>d.objectId),f=b.updatedFeatures.filter(d=>!d.error).map(d=>d.objectId),h=b.deletedFeatures.filter(d=>!d.error).map(d=>d.objectId),e=[...a,...f];h.forEach(d=>
{this._pendingEdits.has(d)&&this._pendingEdits.delete(d)});e.forEach(d=>this._pendingEdits.add(d));b=this._getSubscriptions().map(({displayTile:d})=>d).map(d=>{const k=this.createTileQuery(d);k.objectIds=e;return{tile:d,query:k}}).map(async({tile:d,query:k})=>({tile:d,result:await this._source.query(k)}));(await B.all(b)).forEach(({tile:d,result:k})=>{var l=this._subscriptions.display.get(d.key.id);if(l){l=l.signal;var p=t.UpdateToken.all();this.onDisplayTilePatch({type:"update",id:d.key.id,version:z++,
update:p,addOrUpdate:k,remove:[...f,...h],end:!0,noData:!1},{signal:l})}});this.invalidate()};c.resubscribe=async function(b,a=!1){const f=this._schema.pixelBuffer;this._subscriptions.display.forEach(e=>e.setUpdate(b,f));let h=!1;this._subscriptions.display.forEach(e=>{e.invalid&&(h=!0)});this._invalid.outFields&&(this._invalid.outFields=!1);a||this._invalid.queryFilterParameters||h?(a=this._getSubscriptions().map(({displayTile:e})=>e),a.forEach(e=>this.unsubscribe(e)),a.forEach(e=>this.subscribe(e)),
this._source.resume(),this._invalid.queryFilterParameters=!1):b.mesh?await this._source.resend({dataTileOnly:!1}):await this._source.resend({dataTileOnly:!0})};c.pause=function(){this._source.pause()};c.resume=function(){this._source.resume()};c._getSubscriptions=function(){const b=[];this._subscriptions.display.forEach(a=>{b.push(a)});return b};c._subscribeDisplayTile=function(b){var a=new F(b,this._schema.pixelBuffer);this._subscriptions.display.set(b.id,a);this._source.subscribe(b);for(const f of a.partitions)if(a=
this._source.get(f.tile.id),q.isSome(a))for(const h of a.requests.done)this._onPartitionMessage(b.id,f,h.request,"new")};c._onDataTileRequest=function(b,a,f){const h=this._subscriptions.display.get(b.id);if(f&&f.dataTileOnly)for(const e of h.partitions){if(e.tile.id===b.id){this._onPartitionMessage(b.id,e,b,a);break}}else{for(const e of h.partitions)if(e.tile.id===b.id){this._onPartitionMessage(b.id,e,b,a);break}this._subscriptions.display.forEach((e,d)=>{if(d!==b.id)for(const k of e.partitions)if(k.tile.id===
b.id){this._onPartitionMessage(d,k,b,a);break}})}};c._onPartitionMessage=function(b,a,f,h){const e=q.andThen(f.features,u=>{if(!q.isNone(a.extent)){var {offset:G,extent:H}=a,[I,J,K,L]=H,[M,N]=G;u=u.extent(I,J,K,L).transform(M,N)}return u}),d=this._subscriptions.display.get(b),k=d.signal;let l=d.update;d.didSend||(h="replace");q.isSome(e)&&!e.seen&&(l=t.UpdateToken.all(),e.seen=!0);let p=!1;f.end&&(a.resolved=!0,p=b===a.tile.id);d.didSend=!0;this.onDisplayTilePatch({type:h,id:b,version:z++,update:l,
addOrUpdate:e,remove:f.remove||[],noData:f.noData,end:p},{signal:k})};w._createClass(g,[{key:"updating",get:function(){return this._source.updating||this._getSubscriptions().some(b=>!b.didSend)}},{key:"isStream",get:function(){return"geoevent"===this._source.type}},{key:"sourceEvents",get:function(){return"geoevent"===this._source.type?{type:"geoevent",events:this._source.events}:{type:"feature",events:this._source.events}}}]);return g}();v.Source2D=O;Object.defineProperty(v,"__esModule",{value:!0})});