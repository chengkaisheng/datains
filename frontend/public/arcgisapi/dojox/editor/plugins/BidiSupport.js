//>>built
define("dojo/_base/declare dojo/_base/array dojo/aspect dojo/_base/lang dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/i18n dojo/NodeList-dom dojo/NodeList-traverse dojo/dom-style dojo/sniff dojo/query dijit dojox dijit/_editor/_Plugin dijit/_editor/range dijit/_editor/plugins/EnterKeyHandling dijit/_editor/plugins/FontChoice ./NormalizeIndentOutdent dijit/form/ToggleButton dojo/i18n!./nls/BidiSupport".split(" "),function(H,x,B,r,n,I,p,J,N,O,h,l,v,P,Q,C,w,F,K,L,M){var G=H("dojox.editor.plugins.BidiSupport",
C,{useDefaultCommand:!1,buttonClass:null,iconClassPrefix:"dijitAdditionalEditorIcon",command:"bidiSupport",blockMode:"DIV",shortcutonly:!1,bogusHtmlContent:"\x26nbsp;",buttonLtr:null,buttonRtl:null,_indentBy:40,_lineTextArray:"DIV P LI H1 H2 H3 H4 H5 H6 ADDRESS PRE DT DE TD".split(" "),_lineStyledTextArray:"H1 H2 H3 H4 H5 H6 ADDRESS PRE P".split(" "),_tableContainers:["TABLE","THEAD","TBODY","TR"],_blockContainers:["TABLE","OL","UL","BLOCKQUOTE"],_initButton:function(){this.shortcutonly||(this.buttonLtr||
(this.buttonLtr=this._createButton("ltr")),this.buttonRtl||(this.buttonRtl=this._createButton("rtl")))},_createButton:function(c){return M(r.mixin({label:J.getLocalization("dojox.editor.plugins","BidiSupport")[c],dir:this.editor.dir,lang:this.editor.lang,showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+("ltr"==c?"ParaLeftToRight":"ParaRightToLeft"),onClick:r.hitch(this,"_changeState",[c])},this.params||{}))},setToolbar:function(c){this.shortcutonly||(this.editor.isLeftToRight()?
(c.addChild(this.buttonLtr),c.addChild(this.buttonRtl)):(c.addChild(this.buttonRtl),c.addChild(this.buttonLtr)))},updateState:function(){if(this.editor&&this.editor.isLoaded&&!this.shortcutonly&&(this.buttonLtr.set("disabled",!!this.disabled),this.buttonRtl.set("disabled",!!this.disabled),!this.disabled)){var c=w.getSelection(this.editor.window);if(c&&0!=c.rangeCount){var a=c.getRangeAt(0);if(a.startContainer!==this.editor.editNode||a.startContainer.hasChildNodes()){c=a.startContainer;a=a.startOffset;
if(this._isBlockElement(c))for(;c.hasChildNodes();)a==c.childNodes.length&&a--,c=c.childNodes[a],a=0;c=this._getBlockAncestor(c)}else c=a.startContainer;c=h.get(c,"direction");this.buttonLtr.set("checked","ltr"==c);this.buttonRtl.set("checked","rtl"==c)}}},setEditor:function(c){this.editor=c;"P"!=this.blockMode&&"DIV"!=this.blockMode&&(this.blockMode="DIV");this._initButton();this.editor.contentPreFilters.push(this._preFilterNewLines);c=r.hitch(this,function(a){if(this.disabled||!a.hasChildNodes())return a;
this._changeStateOfBlocks(this.editor.editNode,this.editor.editNode,this.editor.editNode,"explicitdir",null);return this.editor.editNode});this.editor.contentDomPostFilters.push(c);this.editor._justifyleftImpl=r.hitch(this,function(){this._changeState("left");return!0});this.editor._justifyrightImpl=r.hitch(this,function(){this._changeState("right");return!0});this.editor._justifycenterImpl=r.hitch(this,function(){this._changeState("center");return!0});this.editor._insertorderedlistImpl=r.hitch(this,
"_insertLists","insertorderedlist");this.editor._insertunorderedlistImpl=r.hitch(this,"_insertLists","insertunorderedlist");this.editor._indentImpl=r.hitch(this,"_indentAndOutdent","indent");this.editor._outdentImpl=r.hitch(this,"_indentAndOutdent","outdent");this.editor._formatblockImpl=r.hitch(this,"_formatBlocks");this.editor.onLoadDeferred.addCallback(r.hitch(this,function(){var a=this.editor._plugins,b=a.length;var d=r.hitch(this,"_changeState","mirror");var e=r.hitch(this,"_changeState","ltr");
var g=r.hitch(this,"_changeState","rtl");this.editor.addKeyHandler("9",1,0,d);this.editor.addKeyHandler("8",1,0,e);this.editor.addKeyHandler("0",1,0,g);for(d=0;d<a.length;d++)if(e=a[d])e.constructor===F?(e.destroy(),e=null,b=d):e.constructor===L?(this.editor._normalizeIndentOutdent=!0,this.editor._indentImpl=r.hitch(this,"_indentAndOutdent","indent"),this.editor._outdentImpl=r.hitch(this,"_indentAndOutdent","outdent")):e.constructor===K&&"formatBlock"===e.command&&this.own(B.before(e.button,"_execCommand",
r.hitch(this,"_handleNoFormat")));this.editor.addPlugin({ctor:F,blockNodeForEnter:this.blockMode,blockNodes:/^(?:P|H1|H2|H3|H4|H5|H6|LI|DIV)$/},b);e=this.editor._plugins[b];this.own(B.after(e,"handleEnterKey",r.hitch(this,"_checkNewLine"),!0))}));this.own(B.after(this.editor,"onNormalizedDisplayChanged",r.hitch(this,"updateState"),!0))},_checkNewLine:function(){var c=w.getSelection(this.editor.window).getRangeAt(0);c=w.getBlockAncestor(c.startContainer,null,this.editor.editNode).blockNode;c.innerHTML===
this.bogusHtmlContent&&c.previousSibling?c.style.cssText=c.previousSibling.style.cssText:c.innerHTML!==this.bogusHtmlContent&&c.previousSibling&&c.previousSibling.innerHTML===this.bogusHtmlContent&&(c.previousSibling.style.cssText=c.style.cssText)},_handleNoFormat:function(c,a,b){return"noFormat"===b?[c,a,"DIV"]:arguments},_execNativeCmd:function(c,a,b){if(this._isSimpleInfo(b))return c=this.editor.document.execCommand(c,!1,a),l("webkit")&&v("table",this.editor.editNode).prev().forEach(function(y,
z,A){this._hasTag(y,"BR")&&y.parentNode.removeChild(y)},this),c;var d=w.getSelection(this.editor.window);if(!d||0==d.rangeCount)return!1;var e=d.getRangeAt(0),g=e.cloneRange(),f=e.startContainer,k=e.startOffset,m=e.endContainer;e=e.endOffset;for(var q=0;q<b.groups.length;q++){var t=b.groups[q],u=t[t.length-1].childNodes.length;g.setStart(t[0],0);g.setEnd(t[t.length-1],u);d.removeAllRanges();d.addRange(g);u=this.editor.selection.getParentOfType(t[0],["TABLE"]);t=this.editor.document.execCommand(c,
!1,a);l("webkit")&&(u&&this._hasTag(u.previousSibling,"BR")&&u.parentNode.removeChild(u.previousSibling),this.editor.focus(),d=w.getSelection(this.editor.window),u=d.getRangeAt(0),0==q?(f=u.endContainer,k=u.endOffset):q==b.groups.length-1&&(m=u.endContainer,e=u.endOffset));if(!t)break;l("webkit")&&this._changeState(c)}d.removeAllRanges();try{g.setStart(f,k),g.setEnd(m,e),d.addRange(g)}catch(y){}return!0},_insertLists:function(c){var a=this._changeState("preparelists",c);if(!this._execNativeCmd(c,
null,a))return!1;l("webkit")&&!this._isSimpleInfo(a)||this._changeState(c);this._cleanLists();this._mergeLists();return!0},_indentAndOutdent:function(c){if(this.editor._normalizeIndentOutdent)return this._changeState("normalize"+c),!0;var a=this._changeState("prepare"+c);if(l("mozilla")){try{var b=this.editor.document.queryCommandValue("styleWithCSS")}catch(d){b=!1}this.editor.document.execCommand("styleWithCSS",!1,!0)}a=this._execNativeCmd(c,null,a);l("mozilla")&&this.editor.document.execCommand("styleWithCSS",
!1,b);if(!a)return!1;this._changeState(c);this._mergeLists();return!0},_formatBlocks:function(c){if(l("mozilla")||l("webkit"))var a=this._changeState("prepareformat",c);l("ie")&&c&&"\x3c"!=c.charAt(0)&&(c="\x3c"+c+"\x3e");if(!this._execNativeCmd("formatblock",c,a))return!1;l("webkit")&&!this._isSimpleInfo(a)||this._changeState("formatblock",c);this._mergeLists();return!0},_changeState:function(c,a){if(this.editor.window){this.editor.focus();var b=w.getSelection(this.editor.window);if(b&&0!=b.rangeCount){var d=
b.getRangeAt(0),e=d.cloneRange();var g=d.startContainer;b=d.startOffset;var f=d.endContainer;var k=d.endOffset;d=g===f&&b==k;if(this._isBlockElement(g)||this._hasTagFrom(g,this._tableContainers))for(;g.hasChildNodes();)b==g.childNodes.length&&b--,g=g.childNodes[b],b=0;e.setStart(g,b);g=this._getClosestBlock(g,"start",e);(b=w.getBlockAncestor(g,/li/i,this.editor.editNode).blockNode)&&b!==g&&(g=b);f=e.endContainer;k=e.endOffset;if(this._isBlockElement(f)||this._hasTagFrom(f,this._tableContainers))for(;f.hasChildNodes();)k==
f.childNodes.length&&k--,f=f.childNodes[k],k=f.hasChildNodes()?f.childNodes.length:3==f.nodeType&&f.nodeValue?f.nodeValue.length:0;e.setEnd(f,k);f=this._getClosestBlock(f,"end",e);(b=w.getBlockAncestor(f,/li/i,this.editor.editNode).blockNode)&&b!==f&&(f=b);b=w.getSelection(this.editor.window,!0);b.removeAllRanges();b.addRange(e);b=w.getCommonAncestor(g,f);c=this._changeStateOfBlocks(g,f,b,c,a,e);d&&(f=e.startContainer,k=e.startOffset,e.setEnd(f,k),b=w.getSelection(this.editor.window,!0),b.removeAllRanges(),
b.addRange(e));return c}}},_isBlockElement:function(c){if(!c||1!=c.nodeType)return!1;c=h.get(c,"display");return"block"==c||"list-item"==c||"table-cell"==c},_isInlineOrTextElement:function(c){return!this._isBlockElement(c)&&(1==c.nodeType||3==c.nodeType||8==c.nodeType)},_isElement:function(c){return c&&(1==c.nodeType||3==c.nodeType)},_isBlockWithText:function(c){return c!==this.editor.editNode&&this._hasTagFrom(c,this._lineTextArray)},_getBlockAncestor:function(c){for(;c.parentNode&&!this._isBlockElement(c);)c=
c.parentNode;return c},_getClosestBlock:function(c,a,b){if(this._isBlockElement(c))return c;var d=c.parentNode,e,g=!1;for(removeOffset=!1;;){var f=c;for(g=!1;;){if(this._isInlineOrTextElement(f)){var k=f;e||(e=f)}f=f.previousSibling;if(!f)break;else if(this._isBlockElement(f)||this._hasTagFrom(f,this._blockContainers)||this._hasTag(f,"BR")){g=!0;break}else if(3==f.nodeType&&3==f.nextSibling.nodeType&&(f.nextSibling.nodeValue=f.nodeValue+f.nextSibling.nodeValue,"start"==a&&f===b.startContainer?b.setStart(f.nextSibling,
0):"end"!=a||f!==b.endContainer&&f.nextSibling!==b.endContainer||b.setEnd(f.nextSibling,f.nextSibling.nodeValue.length),f=f.nextSibling,f.parentNode.removeChild(f.previousSibling),!f.previousSibling))break}for(f=c;this._isInlineOrTextElement(f)&&(k||(k=f),e=f),f=f.nextSibling,f;)if(this._isBlockElement(f)||this._hasTagFrom(f,this._blockContainers)){g=!0;break}else if(this._hasTag(f,"BR")&&f.nextSibling&&!this._isBlockElement(f.nextSibling)&&!this._hasTagFrom(f.nextSibling,this._blockContainers)){e=
f;g=!0;break}else if(3==f.nodeType&&3==f.previousSibling.nodeType&&(f.previousSibling.nodeValue+=f.nodeValue,"start"==a&&f===b.startContainer?b.setStart(f.previousSibling,0):"end"!=a||f!==b.endContainer&&f.previousSibling!==b.endContainer||b.setEnd(f.previousSibling,f.previousSibling.nodeValue.length),f=f.previousSibling,f.parentNode.removeChild(f.nextSibling),!f.nextSibling))break;if(g||this._isBlockElement(d)&&!this._isBlockWithText(d)&&k){c=b?b.startOffset:0;g=b?b.endOffset:0;f=b?b.startContainer:
null;var m=b?b.endContainer:null;d=this._repackInlineElements(k,e,d);a=d["start"==a?0:d.length-1];b&&a&&k===f&&this._hasTag(k,"BR")&&(f=a,c=0,e===k&&(m=f,g=0));b&&(b.setStart(f,c),b.setEnd(m,g));return a}if(this._isBlockElement(d))return d;c=d;removeOffset=!0;d=d.parentNode;k=e=null}},_changeStateOfBlocks:function(c,a,b,d,e,g){var f=[];if(c===this.editor.editNode){if(!c.hasChildNodes())return;this._isInlineOrTextElement(c.firstChild)&&this._rebuildBlock(c);c=this._getClosestBlock(c.firstChild,"start",
null)}if(a===this.editor.editNode){if(!a.hasChildNodes())return;this._isInlineOrTextElement(a.lastChild)&&this._rebuildBlock(a);a=this._getClosestBlock(a.lastChild,"end",null)}var k=g?g.startOffset:0,m=g?g.endOffset:0,q=g?g.startContainer:null,t=g?g.endContainer:null;c=this._collectNodes(c,a,b,g,f,q,k,t,m,d);f={nodes:f,groups:c.groups,cells:c.cells};d=d.toString();switch(d){case "mirror":case "ltr":case "rtl":case "left":case "right":case "center":case "explicitdir":this._execDirAndAlignment(f,d,
e);break;case "preparelists":this._prepareLists(f,e);break;case "insertorderedlist":case "insertunorderedlist":this._execInsertLists(f);break;case "prepareoutdent":this._prepareOutdent(f);break;case "prepareindent":this._prepareIndent(f);break;case "indent":this._execIndent(f);break;case "outdent":this._execOutdent(f);break;case "normalizeindent":this._execNormalizedIndent(f);break;case "normalizeoutdent":this._execNormalizedOutdent(f);break;case "prepareformat":this._prepareFormat(f,e);break;case "formatblock":this._execFormatBlocks(f,
e);break;default:console.error("Command "+d+" isn't handled")}g&&(g.setStart(q,k),g.setEnd(t,m),sel=w.getSelection(this.editor.window,!0),sel.removeAllRanges(),sel.addRange(g),this.editor.onDisplayChanged());return f},_collectNodes:function(c,a,b,d,e,g,f,k,m,q){d=c.parentNode;k=[];var t=[],u=[],y=[],z=this.editor.editNode;g=r.hitch(this,function(D){e.push(D);var E=this.editor.selection.getParentOfType(D,["TD"]);if(z!==E||l("webkit")&&("prepareformat"===q||"preparelists"===q))u.length&&t.push(u),u=
[],z!=E&&(z=E)&&y.push(z);u.push(D)});for(this._rebuildBlock(d);;){if(this._hasTagFrom(c,this._tableContainers)){if(c.firstChild){d=c;c=c.firstChild;continue}}else if(this._isBlockElement(c)){if((f=w.getBlockAncestor(c,/li/i,this.editor.editNode).blockNode)&&f!==c){c=f;d=c.parentNode;continue}if(!this._hasTag(c,"LI")&&c.firstChild&&(this._rebuildBlock(c),this._isBlockElement(c.firstChild)||this._hasTagFrom(c.firstChild,this._tableContainers))){d=c;c=c.firstChild;continue}this._hasTagFrom(c,this._lineTextArray)&&
g(c)}else if(this._isInlineOrTextElement(c)&&!this._hasTagFrom(c.parentNode,this._tableContainers)){for(k=c;c;){f=c.nextSibling;if(this._isInlineOrTextElement(c)){var A=c;if(this._hasTag(c,"BR")&&(!this._isBlockElement(d)||c!==d.lastChild)){k=this._repackInlineElements(k,A,d);c=k[k.length-1];for(m=0;m<k.length;m++)g(k[m]);k=A=null;f&&this._isInlineOrTextElement(f)&&(k=f)}}else if(this._isBlockElement(c))break;c=f}if(!k)continue;k=this._repackInlineElements(k,A,d);c=k[k.length-1];for(m=0;m<k.length;m++)g(k[m])}if(c===
a)break;if(c.nextSibling)c=c.nextSibling;else if(d!==b){for(;!d.nextSibling&&(c=d,d=c.parentNode,d!==b););if(d!==b&&d.nextSibling)c=d.nextSibling,d=d.parentNode;else break}else break}u.length&&(l("webkit")||z?t.push(u):t.unshift(u));return{groups:t,cells:y}},_execDirAndAlignment:function(c,a,b){switch(a){case "mirror":case "ltr":case "rtl":x.forEach(c.nodes,function(d){var e=h.getComputedStyle(d),g=e.direction,f="mirror"!=a?a:"ltr"==g?"rtl":"ltr",k=e.textAlign,m=isNaN(parseInt(e.marginLeft))?0:parseInt(e.marginLeft);
e=isNaN(parseInt(e.marginRight))?0:parseInt(e.marginRight);n.remove(d,"dir");n.remove(d,"align");h.set(d,{direction:f,textAlign:""});if(!this._hasTag(d,"CENTER"))if(0<=k.indexOf("center")&&h.set(d,"textAlign","center"),this._hasTag(d,"LI")){this._refineLIMargins(d);m="rtl"===g?e:m;e=0;var q=d.parentNode;if(g!=h.get(q,"direction")){for(;q!==this.editor.editNode;)this._hasTagFrom(q,["OL","UL"])&&e++,q=q.parentNode;m-=this._getMargins(e)}g="rtl"==f?"marginRight":"marginLeft";e=h.get(d,g);e=isNaN(e)?
0:parseInt(e);h.set(d,g,""+(e+m)+"px");l("webkit")?0>k.indexOf("center")&&h.set(d,"textAlign","rtl"==f?"right":"left"):d.firstChild&&d.firstChild.tagName&&this._hasTagFrom(d.firstChild,this._lineStyledTextArray)&&(e=h.getComputedStyle(d),k=this._refineAlignment(e.direction,e.textAlign),l("mozilla")?h.set(d.firstChild,{textAlign:k}):h.set(d.firstChild,{direction:f,textAlign:k}))}else"rtl"==f&&0!=m?h.set(d,{marginLeft:"",marginRight:""+m+"px"}):"ltr"==f&&0!=e&&h.set(d,{marginRight:"",marginLeft:""+
e+"px"})},this);v("table",this.editor.editNode).forEach(function(d,e,g){e=a;"mirror"===a&&(e="ltr"===h.get(d,"direction")?"rtl":"ltr");g=v("td",d);for(var f=!1,k=!1,m=0;m<c.cells.length;m++)if(!f&&g[0]===c.cells[m])f=!0;else if(g[g.length-1]===c.cells[m]){k=!0;break}if(f&&k)for(h.set(d,"direction",e),m=0;m<g.length;m++)h.set(g[m],"direction",e)},this);break;case "left":case "right":case "center":x.forEach(c.nodes,function(d){if(!this._hasTag(d,"CENTER")&&(n.remove(d,"align"),h.set(d,"textAlign",a),
this._hasTag(d,"LI")&&d.firstChild&&d.firstChild.tagName&&this._hasTagFrom(d.firstChild,this._lineStyledTextArray))){var e=h.getComputedStyle(d);e=this._refineAlignment(e.direction,e.textAlign);h.set(d.firstChild,"textAlign",e)}},this);break;case "explicitdir":x.forEach(c.nodes,function(d){var e=h.getComputedStyle(d).direction;n.remove(d,"dir");h.set(d,{direction:e})},this)}},_prepareLists:function(c,a){x.forEach(c.nodes,function(b,d,e){if(l("mozilla")||l("webkit")){l("mozilla")&&(d=this._getParentFrom(b,
["TD"]))&&0==v("div[tempRole]",d).length&&p.create("div",{innerHTML:"\x3cspan tempRole\x3d'true'\x3e"+this.bogusHtmlContent+"\x3c/span",tempRole:"true"},d);d=this._tag(b);if(l("webkit")&&this._hasTagFrom(b,this._lineStyledTextArray)||this._hasTag(b,"LI")&&this._hasStyledTextLineTag(b.firstChild)){var g=this._hasTag(b,"LI")?this._tag(b.firstChild):d;if(this._hasTag(b,"LI")){for(;b.firstChild.lastChild;)p.place(b.firstChild.lastChild,b.firstChild,"after");b.removeChild(b.firstChild)}g=p.create("span",
{innerHTML:this.bogusHtmlContent,bogusFormat:g},b,"first")}if(l("webkit")||"DIV"==d||"P"==d||"LI"==d)if(l("webkit")&&this._isListTypeChanged(b,a)&&b===b.parentNode.lastChild&&p.create("li",{tempRole:"true"},b,"after"),!("LI"==d&&b.firstChild&&b.firstChild.tagName&&this._hasTagFrom(b.firstChild,this._lineStyledTextArray))){var f=h.getComputedStyle(b);e=f.direction;f=f.textAlign;f=this._refineAlignment(e,f);var k=this._getLIIndent(b);k=0==k?"":""+k+"px";l("webkit")&&"LI"==d&&h.set(b,"textAlign","");
b=g?b.firstChild:p.create("span",{innerHTML:this.bogusHtmlContent},b,"first");n.set(b,"bogusDir",e);""!=f&&n.set(b,"bogusAlign",f);k&&n.set(b,"bogusMargin",k)}}else if(l("ie")&&this._hasTag(b,"LI")&&(h.getComputedStyle(b),h.set(b,"marginRight",""),h.set(b,"marginLeft",""),1==this._getLILevel(b)&&!this._isListTypeChanged(b,cmd)&&(b.firstChild&&this._hasTagFrom(b.firstChild,["P","PRE"])&&p.create("span",{bogusIEFormat:this._tag(b.firstChild)},b.firstChild,"first"),this._hasTag(b.firstChild,"PRE")))){for(g=
p.create("p",null,b.firstChild,"after");b.firstChild.firstChild;)p.place(b.firstChild.firstChild,g,"last");g.style.cssText=b.style.cssText;b.removeChild(b.firstChild)}},this);l("webkit")&&v("table",this.editor.editNode).forEach(function(b,d,e){(d=b.nextSibling)&&this._hasTagFrom(d,["UL","OL"])&&p.create("UL",{tempRole:"true"},b,"after")},this)},_execInsertLists:function(c){x.forEach(c.nodes,function(a,b){if(this._hasTag(a,"LI")){if(a.firstChild&&a.firstChild.tagName&&this._hasTagFrom(a.firstChild,
this._lineStyledTextArray)){var d=h.getComputedStyle(a.firstChild),e=this._refineAlignment(d.direction,d.textAlign);h.set(a,{direction:d.direction,textAlign:e});b=this._getIntStyleValue(a,"marginLeft")+this._getIntStyleValue(a.firstChild,"marginLeft");var g=this._getIntStyleValue(a,"marginRight")+this._getIntStyleValue(a.firstChild,"marginRight");h.set(a,{marginLeft:b?""+b+"px":"",marginRight:g?""+g+"px":""});h.set(a.firstChild,{direction:"",textAlign:""});l("mozilla")||h.set(a.firstChild,{marginLeft:"",
marginRight:""})}for(;1<a.childNodes.length&&3==a.lastChild.nodeType&&a.lastChild.previousSibling&&3==a.lastChild.previousSibling.nodeType&&""==r.trim(a.lastChild.nodeValue);)a.removeChild(a.lastChild);if(l("safari")&&this._hasTag(a.firstChild,"SPAN")&&I.contains(a.firstChild,"Apple-style-span")&&(b=a.firstChild,this._hasTag(b.firstChild,"SPAN")&&n.has(b.firstChild,"bogusFormat"))){for(;b.lastChild;)p.place(b.lastChild,b,"after");a.removeChild(b)}}else if(this._hasTag(a,"DIV")&&0==a.childNodes.length){a.parentNode.removeChild(a);
return}if(l("ie")){if(this._hasTag(a,"P")&&"DIV"==this.blockMode.toUpperCase()){if(this._hasTag(a.firstChild,"SPAN")&&n.has(a.firstChild,"bogusIEFormat")){"PRE"===n.get(a.firstChild,"bogusIEFormat").toUpperCase()?(b=p.create("pre",{innerHTML:a.innerHTML},a,"before"),b.style.cssText=a.style.cssText,b.removeChild(b.firstChild),a.parentNode.removeChild(a)):a.removeChild(a.firstChild);return}b=p.create("div");b.style.cssText=a.style.cssText;for(a.parentNode.insertBefore(b,a);a.firstChild;)b.appendChild(a.firstChild);
a.parentNode.removeChild(a)}if(!this._hasTag(a,"LI"))return;this._refineLIMargins(a);b=a.firstChild;if(!this._hasTag(b,"DIV")||b!==a.lastChild)return;d=h.getComputedStyle(b);var f=d.direction;e=d.textAlign;h.getComputedStyle(a);h.set(a,"direction",f);e=this._refineAlignment(f,e);for(h.set(a,"textAlign",e);b.firstChild;)a.insertBefore(b.firstChild,b);a.removeChild(b)}else if(!this._hasTag(a.firstChild,"SPAN")){this._hasTag(a,"LI")&&(this._refineLIMargins(a),l("mozilla")&&this._hasStyledTextLineTag(a.firstChild)&&
this._recountLIMargins(a));return}var k=!1,m=b=!1;g=0;n.has(a.firstChild,"bogusDir")&&(k=!0,f=n.get(a.firstChild,"bogusDir"),h.set(a,"direction",f));if(n.has(a.firstChild,"bogusAlign")&&(m=k=!0,e=n.get(a.firstChild,"bogusAlign"),h.set(a,"textAlign",e),d=a.firstChild.nextSibling,this._hasTag(d,"SPAN")&&h.get(d,"textAlign")===e&&(h.set(d,"textAlign",""),""==d.style.cssText))){for(;d.lastChild;)p.place(d.lastChild,d,"after");a.removeChild(d)}n.has(a.firstChild,"bogusMargin")&&(b=k=!0,g=parseInt(n.get(a.firstChild,
"bogusMargin")),this._hasTag(a,"LI")||(d="rtl"===h.get(a,"direction")?"marginRight":"marginLeft",e=this._getIntStyleValue(a,d)+g,h.set(a,d,0==e?"":""+e+"px")));if(n.has(a.firstChild,"bogusFormat")){k=!1;n.remove(a.firstChild,"bogusDir");if(a.firstChild.nextSibling&&this._hasTag(a.firstChild.nextSibling,"SPAN")){e=a.firstChild.style.cssText.trim().split(";");f=a.firstChild.nextSibling.style.cssText.trim().split(";");for(var q=0;q<e.length;q++)if(e[q])for(d=0;d<f.length;d++)if(e[q].trim()==f[d].trim()){d=
e[q].trim().split(":")[0];h.set(a.firstChild.nextSibling,d,"");break}if(""===a.firstChild.nextSibling.style.cssText){for(;a.firstChild.nextSibling.firstChild;)p.place(a.firstChild.nextSibling.firstChild,a.firstChild.nextSibling,"after");a.removeChild(a.firstChild.nextSibling)}}d=n.get(a.firstChild,"bogusFormat");for(e=p.create(d,null,a.firstChild,"after");e.nextSibling;)p.place(e.nextSibling,e,"last");a.removeChild(a.firstChild);l("webkit")&&this._hasTag(a,"LI")&&(f=a.parentNode.parentNode,this._hasTag(f,
d)&&n.set(f,"tempRole","true"));1!=a.childNodes.length||this._hasTag(a,"TD")||(l("mozilla")||this._hasTag(a,"LI")?this._hasTag(a,"LI")||(e.style.cssText=a.style.cssText,p.place(e,a,"after"),n.set(a,"tempRole","true")):(e.style.cssText=a.style.cssText,n.set(a,"tempRole","true")))}k&&a.removeChild(a.firstChild);this._hasTag(a,"LI")&&(l("webkit")&&!m&&"center"!=h.get(a,"textAlign")&&h.set(a,"textAlign","rtl"==h.get(a,"direction")?"right":"left"),l("safari")&&this._hasTag(a,"DIV")&&(a.innerHTML=a.nextSibling.innerHTML,
a.parentNode.removeChild(a.nextSibling)),k=a.parentNode.parentNode,k!==this.editor.editNode&&this._hasTag(k,"DIV")&&1==k.childNodes.length&&(k.parentNode.insertBefore(a.parentNode,k),k.parentNode.removeChild(k)),this._refineLIMargins(a),b&&this._recountLIMargins(a,g))},this);l("mozilla")?v("*[tempRole]",this.editor.editNode).forEach(function(a,b,d){if(this._hasTag(a,"SPAN")){if(n.get(a.parentNode,"tempRole"))return;if(this._hasTag(a.parentNode,"LI")){a.parentNode.parentNode.removeChild(a.parentNode);
return}}a.parentNode.removeChild(a)},this):l("webkit")&&v("*[tempRole]",this.editor.editNode).forEach(function(a,b,d){if(!this._hasTag(a,"LI")&&!this._hasTag(a,"UL")){for(;a.lastChild;)p.place(a.lastChild,a,"after");a.parentNode.removeChild(a)}},this)},_execNormalizedIndent:function(c){x.forEach(c.nodes,function(a){var b="rtl"===h.get(a,"direction")?"marginRight":"marginLeft",d=h.get(a,b);d=isNaN(d)?0:parseInt(d);h.set(a,b,""+(d+this._indentBy)+"px")},this)},_execNormalizedOutdent:function(c){x.forEach(c.nodes,
function(a){var b="rtl"===h.get(a,"direction")?"marginRight":"marginLeft",d=h.get(a,b);d=isNaN(d)?0:parseInt(d);var e=0;if("LI"===a.tagName.toUpperCase()){var g=0,f=a.parentNode;if(h.get(a,"direction")!=h.get(f,"direction")){for(;f!==this.editor.editNode;)this._hasTagFrom(f,["OL","UL"])&&g++,f=f.parentNode;e=this._getMargins(g)}}d>=this._indentBy+e&&h.set(a,b,d==this._indentBy?"":""+(d-this._indentBy)+"px")},this)},_prepareIndent:function(c){x.forEach(c.nodes,function(a){if(l("mozilla")){var b=this._getParentFrom(a,
["TD"]);b&&0==v("div[tempRole]",b).length&&p.create("div",{innerHTML:this.bogusHtmlContent,tempRole:"true"},b);this._hasTag(a,"LI")&&(b=this._getLIIndent(a),n.set(a,"tempIndent",b))}if(l("webkit")&&this._hasTag(a,"LI")&&this._hasStyledTextLineTag(a.firstChild)){for(b=this._tag(a.firstChild);a.firstChild.lastChild;)p.place(a.firstChild.lastChild,a.firstChild,"after");a.removeChild(a.firstChild);p.create("span",{innerHTML:this.bogusHtmlContent,bogusFormat:b},a,"first")}},this)},_prepareOutdent:function(c){x.forEach(c.nodes,
function(a){if(l("mozilla")||l("webkit")){if(l("mozilla")){var b=this._getParentFrom(a,["TD"]);b&&0==v("div[tempRole]",b).length&&p.create("div",{innerHTML:this.bogusHtmlContent,tempRole:"true"},b)}b=this._tag(a);if(l("mozilla")&&"LI"!==b)return;var d=null;if(l("webkit")&&this._hasTag(a,"LI")&&this._hasStyledTextLineTag(a.firstChild)){b=this._tag(a.firstChild);for(var e=a.firstChild;e.lastChild;)p.place(e.lastChild,e,"after");a.removeChild(a.firstChild);d=p.create("span",{innerHTML:this.bogusHtmlContent,
bogusFormat:b},a,"first")}if(a.firstChild&&a.firstChild.tagName&&this._hasTagFrom(a.firstChild,this._lineStyledTextArray)){l("mozilla")&&(a.firstChild.style.cssText=a.style.cssText,b="rtl"===h.get(a,"direction")?"marginRight":"marginLeft",e=this._getLIIndent(a),0<e&&h.set(a.firstChild,b,""+e+"px"));return}var g=h.getComputedStyle(a);e=g.direction;g=g.textAlign;g=this._refineAlignment(e,g);l("webkit")&&"LI"==b&&h.set(a,"textAlign","");b=d?a.firstChild:p.create("span",{innerHTML:this.bogusHtmlContent},
a,"first");n.set(b,"bogusDir",e);""!=g&&n.set(b,"bogusAlign",g);l("mozilla")&&(e=this._getLIIndent(a),n.set(b,"bogusIndent",e))}if(l("ie")&&"LI"==a.tagName.toUpperCase()&&(h.set(a,"marginLeft",""),h.set(a,"marginRight",""),1==this._getLILevel(a)&&(a.firstChild&&this._hasTagFrom(a.firstChild,["P","PRE"])&&p.create("span",{bogusIEFormat:this._tag(a.firstChild)},a.firstChild,"first"),this._hasTag(a.firstChild,"PRE")))){for(b=p.create("p",null,a.firstChild,"after");a.firstChild.firstChild;)p.place(a.firstChild.firstChild,
b,"last");b.style.cssText=a.style.cssText;a.removeChild(a.firstChild)}},this)},_execIndent:function(c){x.forEach(c.nodes,function(a){l("mozilla")||h.set(a,"margin","");if(this._hasTag(a,"LI")){var b=0;l("mozilla")&&n.has(a,"tempIndent")&&(b=parseInt(n.get(a,"tempIndent")),n.remove(a,"tempIndent"));this._refineLIMargins(a);l("mozilla")&&this._recountLIMargins(a,b)}if(n.has(a.firstChild,"bogusFormat")){b=n.get(a.firstChild,"bogusFormat");for(b=p.create(b,null,a.firstChild,"after");b.nextSibling;)p.place(b.nextSibling,
b,"last");a.removeChild(a.firstChild)}if(l("ie")||l("webkit"))for(a=a.parentNode;a!==this.editor.editNode;){a=w.getBlockAncestor(a,/blockquote/i,this.editor.editNode).blockNode;if(!a)break;n.has(a,"dir")&&n.remove(a,"dir");h.set(a,"marginLeft","");h.set(a,"marginRight","");h.set(a,"margin","");a=a.parentNode}},this);l("mozilla")&&(v("div[tempRole]",this.editor.editNode).forEach(function(a,b,d){a.parentNode.removeChild(a)}),v("ul,ol",this.editor.editNode).forEach(function(a,b,d){h.set(a,"marginLeft",
"");h.set(a,"marginRight","")}))},_execOutdent:function(c){x.forEach(c.nodes,function(a){if(l("mozilla")||l("webkit")){if(!this._hasTag(a.firstChild,"SPAN")){this._hasTag(a,"LI")&&(this._refineLIMargins(a),l("mozilla")&&this._hasStyledTextLineTag(a.firstChild)&&(this._recountLIMargins(a),a.firstChild.style.cssText=""));return}var b=!1,d=!1,e=0;if(n.has(a.firstChild,"bogusDir")){b=!0;var g=n.get(a.firstChild,"bogusDir");h.set(a,"direction",g)}n.has(a.firstChild,"bogusAlign")&&(b=!0,g=n.get(a.firstChild,
"bogusAlign"),h.set(a,"textAlign",g));if(n.has(a.firstChild,"bogusIndent")&&(b=!0,e=parseInt(n.get(a.firstChild,"bogusIndent")),!this._hasTag(a,"LI"))){g="rtl"===h.get(a,"direction")?"marginRight":"marginLeft";var f=""+(this._getIntStyleValue(a,g)+e)+"px";h.set(a,g,f)}if(n.has(a.firstChild,"bogusFormat")){b=!0;g=n.get(a.firstChild,"bogusFormat");for(g=p.create(g,null,a.firstChild,"after");g.nextSibling;)p.place(g.nextSibling,g,"last");this._hasTag(a,"LI")||(g.style.cssText=a.style.cssText,d=!0)}if(b&&
(a.removeChild(a.firstChild),d)){for(;a.lastChild;)p.place(a.lastChild,a,"after");n.set(a,"tempRole","true")}l("webkit")&&this._hasTag(a,"LI")&&"center"!=h.get(a,"textAlign")&&h.set(a,"textAlign","rtl"==h.get(a,"direction")?"right":"left");l("mozilla")&&this._hasTag(a,"LI")&&(b=a.parentNode.parentNode,b!==this.editor.editNode&&this._hasTag(b,"DIV")&&1==b.childNodes.length&&(b.parentNode.insertBefore(a.parentNode,b),b.parentNode.removeChild(b)))}if(l("ie")&&this._hasTag(a,"P")&&"DIV"==this.blockMode.toUpperCase()){if(this._hasTag(a.firstChild,
"SPAN")&&n.has(a.firstChild,"bogusIEFormat")){"PRE"===n.get(a.firstChild,"bogusIEFormat").toUpperCase()?(e=p.create("pre",{innerHTML:a.innerHTML},a,"before"),e.style.cssText=a.style.cssText,e.removeChild(e.firstChild),a.parentNode.removeChild(a)):a.removeChild(a.firstChild);return}b=p.create("div");b.style.cssText=a.style.cssText;for(a.parentNode.insertBefore(b,a);a.firstChild;)b.appendChild(a.firstChild);a.parentNode.removeChild(a)}this._hasTag(a,"LI")&&(this._refineLIMargins(a),l("mozilla")&&this._recountLIMargins(a,
e))},this);(l("mozilla")||l("webkit"))&&v("div[tempRole]",this.editor.editNode).forEach(function(a,b,d){a.parentNode.removeChild(a)})},_prepareFormat:function(c,a){x.forEach(c.nodes,function(b){if(l("mozilla")&&this._hasTag(b,"LI")){if(b.firstChild&&!this._isBlockElement(b.firstChild)){var d=b.ownerDocument.createElement(a),e=b.firstChild;for(b.insertBefore(d,b.firstChild);e;)d.appendChild(e),e=e.nextSibling}d=this._getLIIndent(b);n.set(b,"tempIndent",d)}if(l("webkit")){if(this._hasTag(b,"LI")){if(this._hasStyledTextLineTag(b.firstChild)){for(;b.firstChild.lastChild;)p.place(b.firstChild.lastChild,
b.firstChild,"after");b.removeChild(b.firstChild)}var g=p.create("span",{innerHTML:this.bogusHtmlContent,bogusFormat:a},b,"first")}e=h.getComputedStyle(b);d=e.direction;e=e.textAlign;e=this._refineAlignment(d,e);b=g?b.firstChild:p.create("span",{innerHTML:this.bogusHtmlContent},b,"first");n.set(b,"bogusDir",d);""!=e&&n.set(b,"bogusAlign",e)}},this)},_execFormatBlocks:function(c,a){x.forEach(c.nodes,function(b){if(this._hasTagFrom(b,this._lineTextArray)){if(this._hasTag(b.parentNode,"DIV")&&b.parentNode!==
this.editor.editNode)for(;b.parentNode.lastChild&&(3==b.parentNode.lastChild.nodeType&&""==r.trim(b.parentNode.lastChild.nodeValue)||this._hasTag(b.parentNode.lastChild,"BR"));)b.parentNode.removeChild(b.parentNode.lastChild);if(this._hasTag(b.parentNode,"DIV")&&b.parentNode!==this.editor.editNode&&1==b.parentNode.childNodes.length){var d=b.parentNode,e=h.getComputedStyle(d),g=this._refineAlignment(e.direction,e.textAlign);h.set(b,{direction:e.direction,textAlign:g});g="rtl"===e.direction?"marginRight":
"marginLeft";e=parseInt(h.get(d,g));0==e||isNan(e)||h.set(b,g,e);d.parentNode.insertBefore(b,d);d.parentNode.removeChild(d)}}if(this._hasTag(b,"LI")){d=0;n.has(b,"tempIndent")&&(d=parseInt(n.get(b,"tempIndent")),n.remove(b,"tempIndent"));this._refineLIMargins(b);for(d&&this._recountLIMargins(b,d);1<b.childNodes.length&&3==b.lastChild.nodeType&&""==r.trim(b.lastChild.nodeValue);)b.removeChild(b.lastChild);if(this._hasTagFrom(b.firstChild,this._lineStyledTextArray))e=h.getComputedStyle(b),g=this._refineAlignment(e.direction,
e.textAlign),l("mozilla")||l("ie")&&this._hasTag(b,"LI")||h.set(b.firstChild,{direction:e.direction,textAlign:g});else if(this._hasTag(b.firstChild,"DIV")){for(d=b.firstChild;d.firstChild;)b.insertBefore(d.firstChild,d);b.removeChild(d)}if(l("ie")&&!this._hasTag(b.firstChild,"P")&&"\x3cp\x3e"===a){d=p.create("p");for(g=this._hasTagFrom(d.nextSibling,this._lineStyledTextArray)?d.nextSibling:b;g.firstChild;)p.place(g.firstChild,d,"last");p.place(d,b,"first");g!==b&&b.removeChild(g)}}if(l("webkit")){if(this._hasTag(b,
"DIV")){if(n.has(b,"tempRole"))return;if(this._hasTag(b.previousSibling,"LI")){for(;b.firstChild;)p.place(b.firstChild,b.previousSibling,"last");n.set(b,"tempRole",!0);b=b.previousSibling}}d=!1;n.has(b.firstChild,"bogusDir")&&(d=!0,g=n.get(b.firstChild,"bogusDir"),h.set(b,"direction",g));n.has(b.firstChild,"bogusAlign")&&(d=!0,g=n.get(b.firstChild,"bogusAlign"),h.set(b,"textAlign",g));if(n.has(b.firstChild,"bogusFormat")){d=!0;var f=n.get(b.firstChild,"bogusFormat");if("DIV"!==f.toUpperCase())for(g=
p.create(f,null,b.firstChild,"after");g.nextSibling;)p.place(g.nextSibling,g,"last");else g=b;if(l("safari")&&this._hasTag(b.nextSibling,"DIV")){for(;b.nextSibling.firstChild;)p.place(b.nextSibling.firstChild,g,"last");n.set(b.nextSibling,"tempRole","true")}}d&&b.removeChild(b.firstChild);f&&this._hasTag(b,"LI")&&(b=b.parentNode.parentNode,this._hasTag(b,f)&&n.set(b,"tempRole","true"))}},this);l("webkit")&&v("*[tempRole]",this.editor.editNode).forEach(function(b,d,e){for(;b.lastChild;)p.place(b.lastChild,
b,"after");b.parentNode.removeChild(b)},this)},_rebuildBlock:function(c){for(var a=c.firstChild,b,d,e=!1;a;){if(this._isInlineOrTextElement(a)&&!this._hasTagFrom(a,this._tableContainers))e=!this._hasTagFrom(c,this._lineTextArray),b||(b=a),d=a;else if(this._isBlockElement(a)||this._hasTagFrom(a,this._tableContainers))b&&(this._repackInlineElements(b,d,c),b=null),e=!0;a=a.nextSibling}e&&b&&this._repackInlineElements(b,d,c)},_repackInlineElements:function(c,a,b){var d=[],e=b.ownerDocument.createElement(this.blockMode),
g=c.previousSibling&&1==c.previousSibling.nodeType?c.previousSibling.style.cssText:b.style.cssText,f=b===this.editor.editNode;d.push(e);c=b.replaceChild(e,c);p.place(c,e,"after");for(f?h.set(e,"direction",h.get(this.editor.editNode,"direction")):e.style.cssText=g;c;){var k=c.nextSibling;if(this._isInlineOrTextElement(c)){if(this._hasTag(c,"BR")&&c!==a){var m=b.ownerDocument.createElement(this.blockMode);d.push(m);c=b.replaceChild(m,c);p.place(c,m,"after");f?h.set(m,"direction",h.get(this.editor.editNode,
"direction")):m.style.cssText=g}!this._hasTag(c,"BR")&&8!=c.nodeType||e.hasChildNodes()||(e.innerHTML=this.bogusHtmlContent);this._hasTag(c,"BR")&&l("ie")?c.parentNode.removeChild(c):8!=c.nodeType?e.appendChild(c):c.parentNode.removeChild(c);3==c.nodeType&&c.previousSibling&&3==c.previousSibling.nodeType&&(c.previousSibling.nodeValue+=c.nodeValue,c.parentNode.removeChild(c));m&&(e=m,m=null)}if(c===a)break;c=k}return d},_preFilterNewLines:function(c){c=c.split(/(<\/?pre.*>)/i);for(var a=!1,b=0;b<c.length;b++)0>
c[b].search(/<\/?pre/i)&&!a?c[b]=c[b].replace(/\n/g,"").replace(/\t+/g,"\u00a0").replace(/^\s+/,"\u00a0").replace(/\xA0\xA0+$/,""):0<=c[b].search(/<\/?pre/i)&&(a=!a);return c.join("")},_refineAlignment:function(c,a){return a=0<=a.indexOf("left")&&"rtl"==c?"left":0<=a.indexOf("right")&&"ltr"==c?"right":0<=a.indexOf("center")?"center":""},_refineLIMargins:function(c){var a=h.get(c,"direction"),b=h.get(c.parentNode,"direction"),d=0,e=c.parentNode;for(l("webkit")&&(b=h.get(this.editor.editNode,"direction"));e!==
this.editor.editNode;)this._hasTagFrom(e,["OL","UL"])&&d++,e=e.parentNode;h.set(c,"marginRight","");h.set(c,"marginLeft","");e="rtl"==a?"marginRight":"marginLeft";d=this._getMargins(d);a!=b&&h.set(c,e,""+d+"px")},_getMargins:function(c){if(0==c)return 0;var a=35;l("mozilla")?a=45:l("ie")&&(a=25);return a+40*(c-1)},_recountLIMargins:function(c,a){var b=h.get(c,"direction"),d=h.get(c.parentNode,"direction"),e="rtl"==b?"marginRight":"marginLeft",g=h.get(c,e);a=(isNaN(parseInt(g))?0:parseInt(g))+(a?a:
0);c.firstChild&&1==c.firstChild.nodeType&&(g=h.get(c.firstChild,e),a+=isNaN(parseInt(g))?0:parseInt(g),h.set(c.firstChild,{marginLeft:"",marginRight:""}));b!=d&&(a-=this._getMargins(this._getLILevel(c)));if(g=this._getListMargins(c))for(var f=0;f<g/40;f++){var k=p.create(this._tag(c.parentNode),null,c,"before");p.place(c,k,"last")}b!=d&&(a+=this._getMargins(this._getLILevel(c)));a&&h.set(c,e,""+a+"px")},_getLILevel:function(c){c=c.parentNode;for(var a=0;this._hasTagFrom(c,["UL","OL"]);)a++,c=c.parentNode;
return a},_getLIIndent:function(c){var a=c.parentNode,b=h.get(c,"direction"),d=h.get(a,"direction");a=this._getIntStyleValue(c,"rtl"===b?"marginRight":"marginLeft");c=b===d?0:this._getMargins(this._getLILevel(c));return a-c},_getListMargins:function(c){c=c.parentNode;for(var a,b=0;this._hasTagFrom(c,["UL","OL"]);)a="rtl"==h.get(c,"direction")?"marginRight":"marginLeft",a=h.get(c,a),b+=isNaN(parseInt(a))?0:parseInt(a),c=c.parentNode;return b},_tag:function(c){return c&&c.tagName&&c.tagName.toUpperCase()},
_hasTag:function(c,a){return c&&a&&c.tagName&&c.tagName.toUpperCase()===a.toUpperCase()},_hasStyledTextLineTag:function(c){return this._hasTagFrom(c,this._lineStyledTextArray)},_hasTagFrom:function(c,a){return c&&a&&c.tagName&&0<=x.indexOf(a,c.tagName.toUpperCase())},_getParentFrom:function(c,a){if(!c||!a||!a.length)return null;for(;c!==this.editor.editNode;){if(this._hasTagFrom(c,a))return c;c=c.parentNode}return null},_isSimpleInfo:function(c){return!c||2>c.groups.length},_isListTypeChanged:function(c,
a){if(!this._hasTag(c,"LI"))return!1;c=c.parentNode;return this._hasTag(c,"UL")&&"insertorderedlist"===a||this._hasTag(c,"OL")&&"insertunorderedlist"===a},_getIntStyleValue:function(c,a){c=parseInt(h.get(c,a));return isNaN(c)?0:c},_mergeLists:function(){var c=w.getSelection(this.editor.window),a=c&&0<c.rangeCount;if(a)var b=c.getRangeAt(0).cloneRange(),d=b.startContainer,e=b.startOffset,g=b.endContainer,f=b.endOffset;var k=!1;v("ul,ol",this.editor.editNode).forEach(function(m,q,t){if(n.has(m,"tempRole"))m.parentNode.removeChild(m);
else for(q=m.nextSibling;this._hasTag(q,this._tag(m));){for(;q.firstChild;)p.place(q.firstChild,m,"last"),k=!0;n.set(q,"tempRole","true");q=q.nextSibling}},this);if(a&&k){c.removeAllRanges();try{b.setStart(d,e),b.setEnd(g,f),c.addRange(b)}catch(m){}}},_cleanLists:function(){l("webkit")&&(v("table",this.editor.editNode).forEach(function(m,q,t){m=m.nextSibling;this._hasTag(m,"UL")&&"true"===n.get(m,"tempRole")&&m.parentNode.removeChild(m)},this),v("li[tempRole]",this.editor.editNode).forEach(function(m,
q,t){1==m.parentNode.childNodes.length?m.parentNode.parentNode.removeChild(m.parentNode):m.parentNode.removeChild(m)}));var c=w.getSelection(this.editor.window),a=c&&0<c.rangeCount;if(a)var b=c.getRangeAt(0).cloneRange(),d=b.startContainer,e=b.startOffset,g=b.endContainer,f=b.endOffset;var k=!1;v("span[bogusDir]",this.editor.editNode).forEach(function(m,q,t){t=q=m.firstChild;if(1==q.nodeType)for(;q;)t=q.nextSibling,p.place(q,m,"after"),k=!0,q=t;m.parentNode.removeChild(m)},this);if(a&&k){c.removeAllRanges();
try{b.setStart(d,e),b.setEnd(g,f),c.addRange(b)}catch(m){}}}});C.registry.bidiSupport=C.registry.bidisupport=function(c){return new G({})};return G});