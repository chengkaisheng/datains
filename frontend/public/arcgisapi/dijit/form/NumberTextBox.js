//>>built
define("dojo/_base/declare dojo/_base/lang dojo/i18n dojo/string dojo/number ./RangeBoundTextBox".split(" "),function(f,e,l,p,g,q){var m=function(a){a=a||{};var b=l.getLocalization("dojo.cldr","number",l.normalizeLocale(a.locale)),c=a.pattern?a.pattern:b[(a.type||"decimal")+"Format"];a="number"==typeof a.places?a.places:"string"===typeof a.places&&0<a.places.length?a.places.replace(/.*,/,""):-1!=c.indexOf(".")?c.split(".")[1].replace(/[^#0]/g,"").length:0;return{sep:b.decimal,places:a}},n=f("dijit.form.NumberTextBoxMixin",
null,{pattern:function(a){return"("+(this.focused&&this.editOptions?this._regExpGenerator(e.delegate(a,this.editOptions))+"|":"")+this._regExpGenerator(a)+")"},value:NaN,editOptions:{pattern:"#.######"},_formatter:g.format,_regExpGenerator:g.regexp,_decimalInfo:m(),postMixInProperties:function(){this.inherited(arguments);this._set("type","text")},_setConstraintsAttr:function(a){var b="number"==typeof a.places?a.places:0;b&&b++;"number"!=typeof a.max&&(a.max=9*Math.pow(10,15-b));"number"!=typeof a.min&&
(a.min=-9*Math.pow(10,15-b));this.inherited(arguments,[a]);this.focusNode&&this.focusNode.value&&!isNaN(this.value)&&this.set("value",this.value);this._decimalInfo=m(a)},_onFocus:function(a){if(!this.disabled&&!this.readOnly){var b=this.get("value");"number"!=typeof b||isNaN(b)||(b=this.format(b,this.constraints),void 0!==b&&(this.textbox.value=b,"mouse"!==a&&this.textbox.select()));this.inherited(arguments)}},format:function(a,b){var c=String(a);if("number"!=typeof a)return c;if(isNaN(a))return"";
if(!("rangeCheck"in this&&this.rangeCheck(a,b))&&!1!==b.exponent&&/\de[-+]?\d/i.test(c))return c;this.editOptions&&this.focused&&(b=e.mixin({},b,this.editOptions));return this._formatter(a,b)},_parser:g.parse,parse:function(a,b){var c=e.mixin({},b,this.editOptions&&this.focused?this.editOptions:{});if(this.focused&&null!=c.places){var d=c.places;d="number"===typeof d?d:Number(d.split(",").pop());c.places="0,"+d}c=this._parser(a,c);this.editOptions&&this.focused&&isNaN(c)&&(c=this._parser(a,b));return c},
_getDisplayedValueAttr:function(){var a=this.inherited(arguments);return isNaN(a)?this.textbox.value:a},filter:function(a){if(null==a||"string"==typeof a&&""==a)return NaN;"number"!=typeof a||isNaN(a)||0==a||(a=g.round(a,this._decimalInfo.places));return this.inherited(arguments,[a])},serialize:function(a,b){return"number"!=typeof a||isNaN(a)?"":this.inherited(arguments)},_setBlurValue:function(){var a=e.hitch(e.delegate(this,{focused:!0}),"get")("value");this._setValueAttr(a,!0)},_setValueAttr:function(a,
b,c){if(void 0!==a&&void 0===c)if(c=String(a),"number"==typeof a)if(isNaN(a))c="";else{if("rangeCheck"in this&&this.rangeCheck(a,this.constraints)||!1===this.constraints.exponent||!/\de[-+]?\d/i.test(c))c=void 0}else a?a=void 0:(c="",a=NaN);this.inherited(arguments,[a,b,c])},_getValueAttr:function(){var a=this.inherited(arguments);if(isNaN(a)&&""!==this.textbox.value){if(!1!==this.constraints.exponent&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+g._realNumberRegexp(e.delegate(this.constraints))+
"$")).test(this.textbox.value))return a=Number(this.textbox.value),isNaN(a)?void 0:a}else return a},isValid:function(a){if(!this.focused||this._isEmpty(this.textbox.value))return this.inherited(arguments);var b=this.get("value");return!isNaN(b)&&this.rangeCheck(b,this.constraints)?!1!==this.constraints.exponent&&/\de[-+]?\d/i.test(this.textbox.value)?!0:this.inherited(arguments):!1},_isValidSubset:function(){var a="number"==typeof this.constraints.min,b="number"==typeof this.constraints.max,c=this.get("value");
if(isNaN(c)||!a&&!b)return this.inherited(arguments);var d=c|0,r=0>c,h=-1!=this.textbox.value.indexOf(this._decimalInfo.sep),k=(this.maxLength||20)-this.textbox.value.length,t=h?this.textbox.value.split(this._decimalInfo.sep)[1].replace(/[^0-9]/g,""):"";d=h?d+"."+t:d+"";k=p.rep("9",k);h=c;r?h=Number(d+k):c=Number(d+k);return!(a&&c<this.constraints.min||b&&h>this.constraints.max)}});f=f("dijit.form.NumberTextBox",[q,n],{baseClass:"dijitTextBox dijitNumberTextBox"});f.Mixin=n;return f});