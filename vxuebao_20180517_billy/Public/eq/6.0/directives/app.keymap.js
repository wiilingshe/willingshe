angular.module("app.directives.keymap",["services.scene","services.history","services.select"]).directive("eqxKeymap",["sceneService","historyService","selectService",function(e,t,n){return{restrict:"A",link:function(t){var n=$(document);t.$on("$destroy",function(){n.unbind("keydown")}),n.unbind("keydown").keydown(function(n){if((n.ctrlKey||n.metaKey)&&90==n.keyCode&&e.historyBack(),(n.ctrlKey||n.metaKey)&&89==n.keyCode&&e.historyForward(),(n.ctrlKey||n.metaKey)&&86==n.keyCode){if($("#btn-toolbar").length||$(".modal-dialog").length)return;e.getCopy()&&e.pasteElement()}if((n.ctrlKey||n.metaKey)&&67==n.keyCode){if($("#btn-toolbar").length||$(".modal-dialog").length)return;e.copyElement()}t.$apply()})}}}]);