angular.module("main.userGuide",[]).controller("userGuideCtrl",["$rootScope","$scope","dateFilter",function(e,i,o){var t;if(window.localStorage){var r=JSON.parse(localStorage.getItem("loginInfo"));r&&r[e.user.id]?!r.isShow||i.user.checkEmail?i.firstLogin=!1:sessionStorage.getItem("emailGuide")?i.firstLogin=!1:(r.isShow=!0,t=!0,i.firstLogin=!0):(i.firstLogin=!0,r=r||{},r[e.user.id]=1,r.isShow=!0,localStorage.setItem("loginInfo",JSON.stringify(r)))}i.currentGuide="bindEmailGuide",i.showNextGuide=function(){sessionStorage.setItem("emailGuide","true"),t?i.firstLogin=!1:(i.currentGuide="createGuide",i.firstLogin=!0)};var n=0;i.closeDiv=function(){document.getElementById("divClose").style.display="none"},i.showGuide=function(){"createGuide"==i.currentGuide&&(i.firstLogin=1===++n)},i.isShow=function(){if(window.localStorage){var e=JSON.parse(localStorage.getItem("loginInfo"));e.isShow=!e.isShow,localStorage.setItem("loginInfo",JSON.stringify(e))}}}]);