angular.module("app.directives.editor",[]).directive("toolbar",["$compile","sceneService",function(e,o){function t(t,i,c){var a=o.currentElemDef;"x"==a.type?(t.showCustomFamilyFont=!0,t.showLinkOption=!1,n(t)):(t.showCustomFamilyFont=!1,t.showLinkOption=!0),i.bind("keydown",function(e){e.stopPropagation()}),t.internalLinks=angular.copy(t.pages),t.internalLink||t.externalLink||(t.internalLink=t.internalLinks[0],t.externalLink="http://");try{t.fontColor=$(a.content).css("color"),t.backgroundColor=$(a.content).css("background-color")}catch(e){}var l=["#000000","#7e2412","#ff5400","#225801","#0c529e","#333333","#b61b52","#f4711f","#3bbc1e","#23a3d3","#888888","#d34141","#f7951e","#29b16a","#97daf3","#cccccc","#ec7c7c","#fdea02","#79c450","#563679","#ffffff","#ffcccc","#d9ef7f","#c3f649"],r=$(".color-menu"),s=$(".bgcolor-menu");$.each(l,function(e,o){r.append($('<li><a dropdown-toggle class="btn" data-edit="foreColor '+o+'" style="background-color: '+o+'"></a></li>'))}),e(r.append($('<li style="position: relative;"><a ng-model="fontColor" ng-click="setSelection()" colorpicker-Position="sceneToobar" class="btn glyphicon glyphicon-remove" colorpicker="rgba" style="background-color: transparent"></a><em style="background-color:#ff5448;position:absolute;height:10px;width:10px;top:0;left:0;z-index:-1"></em><em style="background-color:#f2a653;position:absolute;height:10px;width:10px;top:0;left:10px;z-index:-1"></em><em style="background-color:#08a1ef;position:absolute;height:10px;width:10px;top:10px;left:0;z-index:-1"></em><em style="background-color:#44cb83;position:absolute;height:10px;width:10px;top:10px;left:10px;z-index:-1"></em></li>')))(t),t.$watch("fontColor",function(e,o){e&&e!=o&&document.execCommand("foreColor",0,e)});var d=function(e){var o=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(o,function(e,o,t,n){return o+o+t+t+n+n});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null};$.each(l,function(e,o){var t=d(o);s.append($('<li><a dropdown-toggle class="btn" data-edit="backColor rgba('+t.r+","+t.g+","+t.b+', 0.3)" style="background-color: rgba('+t.r+","+t.g+","+t.b+', 0.3)"></a></li>'))}),e(s.append($('<li style="position: relative;"><a ng-model="backgroundColor" ng-click="setSelection()" colorpicker="rgba" colorpicker-Position="sceneToobar" class="btn glyphicon glyphicon-remove" style="background-color: transparent"></a><em style="background-color:#ff5448;position:absolute;height:10px;width:10px;top:0;left:0;z-index:-1"></em><em style="background-color:#f2a653;position:absolute;height:10px;width:10px;top:0;left:10px;z-index:-1"></em><em style="background-color:#08a1ef;position:absolute;height:10px;width:10px;top:10px;left:0;z-index:-1"></em><em style="background-color:#44cb83;position:absolute;height:10px;width:10px;top:10px;left:10px;z-index:-1"></em></li>')))(t),t.$watch("backgroundColor",function(e){e&&document.execCommand("backColor",0,e)}),t.setSelection=function(){var e=window.getSelection();e.getRangeAt&&e.rangeCount&&e.getRangeAt(0),e.modify("move","left","documentboundary"),e.modify("extend","right","documentboundary")},a.css.lineHeight=(parseFloat(a.css.lineHeight)||1).toFixed(1),t.increaseLineHeight=function(){var e=window.getSelection(),o=e.focusNode,t=$(o).parents(".element-box");a.css.lineHeight=(parseFloat(a.css.lineHeight)+.1).toFixed(1),t.css("line-height",a.css.lineHeight),$(o.parentNode).focus()},t.decreaseLineHeight=function(){var e=window.getSelection(),o=e.focusNode,t=$(o).parents(".element-box");a.css.lineHeight>.1&&(a.css.lineHeight=(parseFloat(a.css.lineHeight)-.1).toFixed(1),t.css("line-height",a.css.lineHeight)),$(o.parentNode).focus()}}function n(e){var o=utilFont.getFontName(),t=$(".fontname-menu");$.each(o,function(e,o){t.append($('<li class="'+e+'"><a dropdown-toggle class="btn" data-edit="fontName '+e+'"><img src="'+CLIENT_CDN+o.blueSrc+'"/></a></li>')),$("."+e).hover(function(){$(this).find("img").attr("src",CLIENT_CDN+o.src)},function(){$(this).hasClass("selected-font")||$(this).find("img").attr("src",CLIENT_CDN+o.blueSrc)})})}return{restrict:"EA",replace:!0,templateUrl:"/Public/eq/6.0/templates/directives.toolbar.tpl.html",link:t}}]);