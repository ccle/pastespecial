YUI.add("moodle-atto_pastespecial-button",function(e,t){var n="atto_pastespecial",r={PASTEAREA:"atto_pastespecial_pastearea",PASTEFROMWORD:"atto_pastespecial_pastefromword",PASTEFROMGDOC:"atto_pastespecial_pastefromgdoc",PASTEFROMLIBRE:"atto_pastespecial_pastefromlibre",PASTEFROMOTHER:"atto_pastespecial_pastefromother",PASTEUNFORMATTED:"atto_pastespecial_pasteunformatted",IFRAME:"atto_pastespecial_iframe"},i={PASTEAREA:".atto_pastespecial_pastearea",PASTEFROMWORD:".atto_pastespecial_pastefromword",PASTEFROMGDOC:".atto_pastespecial_pastefromgdoc",PASTEFROMLIBRE:".atto_pastespecial_pastefromlibre",PASTEFROMOTHER:".atto_pastespecial_pastefromother",PASTEUNFORMATTED:".atto_pastespecial_pasteunformatted",IFRAME:".atto_pastespecial_iframe",IFRAMEID:"#atto_pastespecial_iframe"},s={GDOC:["background-color","color","font-family","font-size","font-weight","font-style","text-decoration","list-style-type","text-align"],LIBRE:["background","color","font-size"],WORD:["font-family","font-size","background","color","background-color"]},o='<form class="atto_form"><div>{{get_string "pastehere" component}}</div><div id="{{elementid}}_{{CSS.IFRAME}}" class="{{CSS.IFRAME}}" contentEditable="true"style="width:100%;height:200px;overflow-y:scroll;border: 1px solid grey"></div><input type="radio" class="{{CSS.PASTEFROMWORD}}" name="from" id="{{elementid}}_{{CSS.PASTEFROMWORD}}" checked><label for="{{elementid}}_{{CSS.PASTEFROMWORD}}">{{get_string "pastefromword" component}}</label><br><input type="radio" class="{{CSS.PASTEFROMGDOC}}" name="from" id="{{elementid}}_{{CSS.PASTEFROMGDOC}}"/><label for="{{elementid}}_{{CSS.PASTEFROMGDOC}}">{{get_string "pastefromgdoc" component}}</label><br><input type="radio" class="{{CSS.PASTEFROMLIBRE}}" name="from" id="{{elementid}}_{{CSS.PASTEFROMLIBRE}}"/><label for="{{elementid}}_{{CSS.PASTEFROMLIBRE}}">{{get_string "pastefromlibre" component}}</label><br><input type="radio" class="{{CSS.PASTEFROMOTHER}}" name="from" id="{{elementid}}_{{CSS.PASTEFROMOTHER}}"/><label for="{{elementid}}_{{CSS.PASTEFROMOTHER}}">{{get_string "pastefromother" component}}</label><br><input type="radio" class="{{CSS.PASTEUNFORMATTED}}" name="from" id="{{elementid}}_{{CSS.PASTEUNFORMATTED}}"/><label for="{{elementid}}_{{CSS.PASTEUNFORMATTED}}">{{get_string "pasteunformatted" component}}</label><div class="mdl-align"><br><button type="submit" class="submit">{{get_string "paste" component}}</button></div></form>';e.namespace("M.atto_pastespecial").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_content:null,_iframe:null,_gdocStyle:null,_libreStyle:null,_wordStyle:null,_otherStyle:null,_currentSelection:null,initializer:function(e){e.wordCSS!==""?this._wordStyle=e.wordCSS.split(","):this._wordStyle=s.WORD,e.gdocCSS!==""?this._gdocStyle=e.gdocCSS.split(","):this._gdocStyle=s.GDOC,e.libreCSS!==""?this._libreStyle=e.libreCSS.split(","):this._libreStyle=s.LIBRE,e.otherCSS!==""?this._otherStyle=e.otherCSS.split(","):this._otherStyle=this._gdocStyle+this._wordStyle+this._libreStyle,this.addButton({icon:"e/paste",callback:this._displayDialogue})},_displayDialogue:function(){var t=this.getDialogue({headerContent:M.util.get_string("pluginname",n),focusAfterHide:!0,focusOnShowSelector:i.PASTEAREA});this._currentSelection=this.get("host").getSelection(),t.set("bodyContent",this._getDialogueContent()),t.show(),this._iframe=e.one(i.IFRAME),this._iframe.focus()},_pasteContent:function(t){var n,i,s=this.get("host");t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide(),n=this._iframe.getHTML(),n=this._cleanSafari(n),i=e.one("input[name=from]:checked"),n!==""&&(i.hasClass(r.PASTEFROMWORD)?n=this._handleWord(n):i.hasClass(r.PASTEFROMGDOC)?n=this._handleGDoc(n):i.hasClass(r.PASTEFROMLIBRE)?n=this._handleLibre(n):i.hasClass(r.PASTEFROMOTHER)?n=this._handleOther(n):n=this._handleUnformatted(n),this._currentSelection===!1?(this.editor.focus(),this.editor.append(n)):(s.setSelection(this._currentSelection),s.insertContentAtFocusPoint(n)),this.markUpdated())},_getDialogueContent:function(){var t=e.Handlebars.compile(o);return this._content=e.Node.create(t({component:n,CSS:r})),this._content.one(".submit").on("click",this._pasteContent,this),this._content},_handleWord:function(e){return this._findTags(e,"word")},_handleGDoc:function(e){return this._findTags(e,"gdoc")},_cleanSafari:function(e){e.indexOf("<!--EndFragment-->")!==-1&&(e=e.substring(0,e.indexOf("<!--EndFragment-->")));for(;;){if(e.indexOf("-->")===-1)break;e=e.substring(e.indexOf("-->")+3,e.length)}return e},_findTags:function(e,t){var n="",r,i,s;for(;;){if(e==="")break;r=e.indexOf("<"),i=e.indexOf("<",r+1),s=e.indexOf(">"),n+=e.substring(0,r);if(s<i)e.substring(r,s+1)==="<br>"||e.substring(r,s+13)==="<o:p>&nbsp;</o:p>"?(n+="<br>",e=e.substring(s+1,e.length)):e.substring(r,s+7)==="<o:p></o:p>"||e.substring(r+1,r+6)==="/font"?(n=n,e=e.substring(s+1,e.length)):e.substring(r+1,r+5)==="font"?(n=this._handleFont(e.substring(r,s+1),n,e,t),e=e.substring(e.indexOf("</font>")+7,e.length)):(n+=this._handleTags(e.substring(r,s+1),t),e=e.substring(s+1,e.length));else{if(i===-1){e=e.substring(r,e.length),n+=e;break}n+="<",e=e.substring(r+1,e.length)}}return n=this._cleanOutput(n),n},_handleLibre:function(e){return this._findTags(e,"libre")},_handleOther:function(e){return this._findTags(e,"other")},_handleUnformatted:function(e){var t;return t=this._stripTags(e),t},_handleFont:function(e,t,n,r){var i="",s,o,u,a=0,f=0,l,c;l=n.indexOf("<font"),c=n.indexOf(">",l),u=t.replace(/\s+g/,""),u=u.replace(/(\r\n|\n|\r)/gm,""),s=e.indexOf('face="'),o=e.indexOf('style="'),o!==-1&&(i+=this._handleStyle(e.substring(o+7,e.indexOf('"',o+7)),r)),o!==-1&&s!==-1&&(i+=";"),s!==-1&&(i+="font-family:"+e.substring(s+6,e.indexOf('"',s+7)));if(u[u.length-1]!==">")return t='<span style="'+i+'">'+n.substring(c+1,n.indexOf("</font>"))+"</span>",t;if(u[u.length-2]!=='"'){for(;;){a=t.indexOf(">",f+1),f=t.indexOf(">",a+1);if(f===-1)break}newString=t.substring(0,a)+' style="'+i+'">'}else if(
u[u.length-2]==='"'){for(;;){a=t.indexOf('">',f+1),f=t.indexOf('">',a+1);if(f===-1)break}newString=t.substring(0,a)+";"+i+'">'}return newString},_handleTags:function(e,t){var n=e.substring(1,e.indexOf(" ")),r,i,s="",o="",u="";return e.indexOf(" ")===-1&&(n=e.substring(1,e.indexOf(">"))),t==="word"&&n.substring(0,3)==="!--"?"":(r=e.indexOf('style="')+7,i=e.indexOf('"',r),e.indexOf(" ")!==-1&&(u=this._handleStyle(e.substring(r,i),t)),e.indexOf(" ")!==-1&&(s=e.substring(e.indexOf(" "),e.length-1),s=this._handleAdditional(s)),e.substring(0,2)==="</"?e:(n==="span"?o+="<span":n.substring(0,1)==="h"?o+="<h"+n[1]:n==="div"?o+="<div":n==="ul"?o+="<ul":n==="ol"?o+="<ol":n==="li"?o+="<li":n==="b"?o+="<b":n==="i"?o+="<i":n==="u"?o+="<u":o+="<p",u!==""&&(u=' style="'+u+'"'),s!==""&&(s=" "+s),o+=s+u+">",o))},_handleAdditional:function(e){var t="",n,r;return n=e.indexOf('align="'),r=e.indexOf('"',n+8),n!==-1&&(t=e.substring(n,r+1)),t},_cleanOutput:function(e){var t,n,r,i,s;for(;;){t=e.indexOf("<span>"),t!==-1?(r=e.substring(0,t),i=e.substring(t+6,e.length),i.replace("</span>",""),e=r+i):s=!0,n=e.indexOf("><span"),e.substring(n-6,7)!=="</span>"&&(r=e.substring(0,n),i=e.substring(n+6,e.length),i=i.replace("</span>",""),r[r.length-1]==='"'&&i.substring(0,8)===' style="'?(e=r.substring(0,r.length-1)+i.substring(8,i.length),s=!1):e=r+i);if(s)break}return e},_handleStyle:function(e,t){var n,r,i="",s,o="";t==="gdoc"?s=this._gdocStyle:t==="libre"?s=this._libreStyle:t==="word"?s=this._wordStyle:s=this._otherStyle,o=e.replace(/\s+/g,""),o=o.replace(/&quot;/g,"'"),e=e.replace(/&quot;/g,"'");for(;;){n=o.substring(0,o.indexOf(":")),e.indexOf(";")!==-1?r=e.substring(e.indexOf(":")+1,e.indexOf(";")):r=e.substring(e.indexOf(":")+1,e.length),s.indexOf(n)!==-1&&r!==""&&r!=="initial"&&r!=="inherit"&&r!=="normal"&&r!=="tansparent"&&(i+=n+":"+r+";");if(e.indexOf(";")===-1)break;e=e.substring(e.indexOf(";")+1,e.length),o=o.substring(o.indexOf(";")+1,o.length)}return i},_stripTags:function(e){var t,n,r,i;t="";for(;;){n=e.indexOf("<"),r=e.indexOf("<",n+1),i=e.indexOf(">");if(n===-1||i===-1)break;if(i<r||r===-1){t+=e.substring(0,n),e.substring(n,n+5)==="<span"||e.substring(n,n+6)==="</span"?t=t:e.substring(n,n+4)==="</p>"&&t.substring(t.length-4,t.length)!=="</p>"?t+="</p>":e.substring(n,n+2)==="<p"&&t.substring(t.length-3,t.length)!=="<p>"?t+="<p>":e.substring(n,i+1)==="<br>"?t+="<br>":e[n+1]==="/"&&t.substring(t.length-4,t.length)!=="</p>"?t+="</p>":t.substring(t.length-3,t.length)!=="<p>"&&e[n+1]!=="/"&&(t+="<p>");if(i===e.length-1)break;e=e.substring(i+1,e.length)}else t+=e.substring(0,r),e=e.substring(r,e.length)}return t.substring(t.length-3,t.length)==="<p>"?t.substring(0,t.length-3):t}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
