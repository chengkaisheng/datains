//>>built
define("dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/on dojo/query dojo/dom-style dojo/_base/fx dijit/_WidgetBase dojo/fx/easing".split(" "),function(k,r,c,t,l,m,f,n,g){c.getObject("widget",!0,dojox);k.experimental("dojox/widget/FisheyeLite");return dojo.declare("dojox.widget.FisheyeLite",[n],{durationIn:350,easeIn:g.backOut,durationOut:1420,easeOut:g.elasticOut,properties:null,units:"px",constructor:function(a,d){this.properties=a.properties||{fontSize:2.75}},postCreate:function(){this.inherited(arguments);
this._target=l(".fisheyeTarget",this.domNode)[0]||this.domNode;this._makeAnims();this.connect(this.domNode,"onmouseover","show");this.connect(this.domNode,"onmouseout","hide");this.connect(this._target,"onclick","onClick")},show:function(){this._runningOut.stop();this._runningIn.play()},hide:function(){this._runningIn.stop();this._runningOut.play()},_makeAnims:function(){var a={},d={},p=m.getComputedStyle(this._target),b;for(b in this.properties){var e=this.properties[b],q=c.isObject(e),h=parseFloat(p[b]);
d[b]={end:h,units:this.units};a[b]=q?e:{end:e*h,units:this.units}}this._runningIn=f.animateProperty({node:this._target,easing:this.easeIn,duration:this.durationIn,properties:a});this._runningOut=f.animateProperty({node:this._target,duration:this.durationOut,easing:this.easeOut,properties:d});this.connect(this._runningIn,"onEnd",c.hitch(this,"onSelected",this))},onClick:function(a){},onSelected:function(a){}})});