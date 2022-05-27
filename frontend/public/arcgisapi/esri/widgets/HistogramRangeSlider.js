// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.18/esri/copyright.txt for details.
//>>built
define("../chunks/_rollupPluginBabelHelpers ../chunks/tslib.es6 ../core/has ../core/Logger ../core/accessorSupport/ensureType ../core/accessorSupport/decorators/property ../core/accessorSupport/decorators/aliasOf ../core/jsonMap ../core/accessorSupport/decorators/subclass ../core/urlUtils ../core/uuid ../portal/support/resourceExtension ../Color ../core/watchUtils ./support/widgetUtils ./support/decorators/messageBundle ./support/decorators/renderable ../chunks/index ./Widget ./Slider ./Histogram ./HistogramRangeSlider/HistogramRangeSliderViewModel ./smartMapping/support/utils".split(" "),
function(z,e,d,H,x,n,m,I,A,J,K,L,r,t,M,B,q,v,C,D,E,F,G){d=function(y){function w(a,g){a=y.call(this,a,g)||this;a._barElements=[];a._histogram=null;a._slider=null;a.average=null;a.barCreatedFunction=null;a.bins=null;a.dataLines=null;a.dataLineCreatedFunction=null;a.excludedBarColor=new r("#d7e5f0");a.hasTimeData=null;a.includedBarColor=new r("#599dd4");a.label=void 0;a.labelFormatFunction=null;a.max=null;a.messages=null;a.min=null;a.precision=4;a.rangeType=null;a.standardDeviation=null;a.standardDeviationCount=
1;a.values=null;a.viewModel=new F;return a}z._inheritsLoose(w,y);var k=w.prototype;k.initialize=function(){const {average:a,bins:g,hasTimeData:p,max:b,min:l,viewModel:f}=this;this._updateBarFill=this._updateBarFill.bind(this);this._histogram=new E({average:a,bins:g,barCreatedFunction:(c,h)=>{0===c&&(this._barElements=[]);this._barElements.push(h);this._updateBarFill(c,h);this.barCreatedFunction&&this.barCreatedFunction(c,h)},dataLines:this._getDataLines(),dataLineCreatedFunction:(c,h)=>{this.dataLineCreatedFunction&&
this.dataLineCreatedFunction(c,h)},labelFormatFunction:this.labelFormatFunction,layout:"horizontal",max:b,min:l});this._slider=new D({labelFormatFunction:this.labelFormatFunction,layout:"horizontal",visibleElements:{labels:!0,rangeLabels:!0},rangeLabelInputsEnabled:!p,viewModel:f});this.own(this._slider.on(["max-change","min-change"],c=>this.emit(c.type,c)),this._slider.on(["segment-drag","thumb-change","thumb-drag"],c=>{this._updateBarFills();this.emit(c.type,c)}),t.watch(this,"bins",()=>{const {_histogram:c,
bins:h}=this;if(h&&c.bins){const u=c.bins.length-h.length;this._barElements.splice(-u,u)}else this._barElements=[];c.set({bins:h});this._updateBarFills();this.scheduleRender()}),t.watch(this,["max","min","rangeType","values"],()=>{const {_histogram:c,max:h,min:u}=this;c.set({max:h,min:u});this._updateBarFills();this.scheduleRender()}),t.watch(this,["average","dataLines","standardDeviation","standardDeviationCount"],()=>{const {_histogram:c,average:h}=this;c.set({average:h,dataLines:this._getDataLines()})}),
t.watch(this,"labelFormatFunction",()=>{const {_histogram:c,labelFormatFunction:h}=this;c.set({labelFormatFunction:h})}),t.watch(this,"hasTimeData",()=>{this._slider.set({rangeLabelInputsEnabled:!this.hasTimeData})}))};k.generateWhereClause=function(a){return this.viewModel.generateWhereClause(a)};k.render=function(){const {rangeType:a,viewModel:g,label:p}=this,b=this.classes("esri-histogram-range-slider","esri-widget",`${"esri-histogram-range-slider__range-type--"}${a}`,"disabled"===g.state?"esri-disabled":
null);return v.jsx("div",{"aria-label":p,class:b},"disabled"===g.state?null:this.renderContent())};k.renderContent=function(){return[this.renderHistogram(),this.renderSlider()]};k.renderSlider=function(){return v.jsx("div",{key:`${this.id}-slider-container`,class:"esri-histogram-range-slider__slider-container"},this._slider.render())};k.renderHistogram=function(){return v.jsx("div",{class:"esri-histogram-range-slider__histogram-container"},this._histogram.render())};k._getDataLines=function(){return[...this._getStandardDeviationDataLines(),
...this.dataLines||[]]};k._getStandardDeviationDataLines=function(){const {average:a,standardDeviation:g,standardDeviationCount:p}=this;return G.getDeviationValues(g,a,p).map(b=>({value:b}))};k._updateBarFills=function(){this._barElements.forEach((a,g)=>this._updateBarFill(g,a))};k._updateBarFill=function(a,g){g.setAttribute("fill",this._getFillForBar(a).toHex())};k._getFillForBar=function(a){const {bins:g,rangeType:p,values:b}=this;if(!(g&&g.length&&p&&b.length))return null;a=g[a];if(!a)return null;
const {maxValue:l,minValue:f}=a;a=l-f;const c=b[0]>f&&b[0]<l;switch(p){case "equal":case "not-equal":return this.includedBarColor;case "less-than":case "at-most":return c?this._getBlendedColor((b[0]-f)/a):l<=b[0]?this.includedBarColor:this.excludedBarColor;case "greater-than":case "at-least":return c?this._getBlendedColor(1-(b[0]-f)/a):f>=b[0]?this.includedBarColor:this.excludedBarColor;case "between":if(2===b.length)return b[0]>f&&b[0]<l?this._getBlendedColor(1-(b[0]-f)/a):b[1]>f&&b[1]<l?this._getBlendedColor((b[1]-
f)/a):f>=b[0]&&l<=b[1]?this.includedBarColor:this.excludedBarColor;case "not-between":if(2===b.length)return b[0]>f&&b[0]<l?this._getBlendedColor((b[0]-f)/a):b[1]>f&&b[1]<l?this._getBlendedColor(1-(b[1]-f)/a):f>b[0]&&l<b[1]?this.excludedBarColor:this.includedBarColor;default:return this.includedBarColor}};k._getBlendedColor=function(a){return r.blendColors(this.excludedBarColor,this.includedBarColor,a)};return w}(C);e.__decorate([m.aliasOf("viewModel.average")],d.prototype,"average",void 0);e.__decorate([n.property(),
q.renderable()],d.prototype,"barCreatedFunction",void 0);e.__decorate([m.aliasOf("viewModel.bins")],d.prototype,"bins",void 0);e.__decorate([n.property(),q.renderable()],d.prototype,"dataLines",void 0);e.__decorate([n.property(),q.renderable()],d.prototype,"dataLineCreatedFunction",void 0);e.__decorate([n.property({type:r,json:{type:[x.Integer],write:!0}})],d.prototype,"excludedBarColor",void 0);e.__decorate([m.aliasOf("viewModel.hasTimeData")],d.prototype,"hasTimeData",void 0);e.__decorate([n.property({type:r,
json:{type:[x.Integer],write:!0}})],d.prototype,"includedBarColor",void 0);e.__decorate([n.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],d.prototype,"label",void 0);e.__decorate([m.aliasOf("viewModel.labelFormatFunction")],d.prototype,"labelFormatFunction",void 0);e.__decorate([m.aliasOf("viewModel.max")],d.prototype,"max",void 0);e.__decorate([n.property(),q.renderable(),B.messageBundle("esri/widgets/HistogramRangeSlider/t9n/HistogramRangeSlider")],d.prototype,"messages",void 0);
e.__decorate([m.aliasOf("viewModel.min")],d.prototype,"min",void 0);e.__decorate([m.aliasOf("viewModel.precision")],d.prototype,"precision",void 0);e.__decorate([m.aliasOf("viewModel.rangeType")],d.prototype,"rangeType",void 0);e.__decorate([m.aliasOf("viewModel.standardDeviation")],d.prototype,"standardDeviation",void 0);e.__decorate([n.property(),q.renderable()],d.prototype,"standardDeviationCount",void 0);e.__decorate([q.renderable(),m.aliasOf("viewModel.values")],d.prototype,"values",void 0);
e.__decorate([n.property(),q.renderable("viewModel.average viewModel.hasTimeData viewModel.labelFormatFunction viewModel.max viewModel.min viewModel.precision viewModel.rangeType viewModel.standardDeviation viewModel.values".split(" "))],d.prototype,"viewModel",void 0);return d=e.__decorate([A.subclass("esri.widgets.HistogramRangeSlider")],d)});