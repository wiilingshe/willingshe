angular.module("app.directives.style",[]).directive("panelDraggable",function(){return{restrict:"A",link:function(e,n,t){e.$on("$destroy",function(){$(n).draggable(),$(n).draggable("destroy"),n=null}),n.on("$destroy",function(){$(n).draggable(),$(n).draggable("destroy"),n=null}),$(n).draggable(),$(window).bind("resize",function(){$(n).css({left:$(document).width()-444,top:50})})}}});