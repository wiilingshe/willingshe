angular.module("scene.create.console.sound").filter("maxLength",function(){return function(n,e){return n?n.length<=e?n:n.substr(0,e)+"…":void 0}});