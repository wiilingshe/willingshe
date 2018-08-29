angular.module("save.template", []), angular.module("save.template").controller("saveTemplateCtrl", ["$scope", "$rootScope", "security", function(a, b, c) {
		a.btnGroup = {
			selectItem: 1,
			caretSwitch: !1
		};
		var d;
		if(window.localStorage){
			d = JSON.parse(localStorage.getItem("templateInfo"));
			if(d && d[c.currentUser.id]){
				a.btnGroup.selectItem = d[c.currentUser.id];
			}else{
				d = d || {};
				d[c.currentUser.id] = 1;
				localStorage.setItem("templateInfo", JSON.stringify(d));
			}
		}

		a.btnGroup = {
			selectItem: d[c.currentUser.id],
			caretSwitch: !1
		};
		a.selectedTemplate = function(b) {
			if("myTemplate" == b){
				a.btnGroup.selectItem = 2;
			}else if("companyTemplate" == b){
				a.btnGroup.selectItem = 1;
			}
			if(window.localStorage){
				d[c.currentUser.id] = a.btnGroup.selectItem;
				localStorage.setItem("templateInfo", JSON.stringify(d));
			}

		};
		a.openMenu = function() {
			a.btnGroup.caretSwitch = !a.btnGroup.caretSwitch;
		}
	}])