//>>built
define(["dojo/_base/declare","dojo/_base/lang","./Default","./commonStacked"],function(m,k,n,e){return m("dojox.charting.plot2d.Stacked",n,{getSeriesStats:function(){return e.collectStats(this.series,k.hitch(this,"isNullValue"))},buildSegments:function(f,b){for(var d=this.series[f],a=b?Math.max(0,Math.floor(this._hScaler.bounds.from-1)):0,p=b?Math.min(d.data.length-1,Math.ceil(this._hScaler.bounds.to)):d.data.length-1,c=null,l=[],g=k.hitch(this,"isNullValue");a<=p;a++){var h=b?e.getIndexValue(this.series,
f,a,g):e.getValue(this.series,f,d.data[a]?d.data[a].x:null,g);if(!g(h[0])&&(b||null!=h[0].y))c||(c=[],l.push({index:a,rseg:c})),c.push(h[0]);else if(!this.opt.interpolate||b)c=null}return l}})});