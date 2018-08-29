angular.module("scene.create.console.scene-setting-component",["services.pagetpl"]).service("memberHandler", ["usercenterService", "security", "eqADTypeChoice", function(a, b, c) {
	function d(a, b) {
		return /^\d+$/.test(b) ? 0 : a * parseFloat(b)
	}
	var e = {},
		f = null;
	e.isVipUser = "1" != b.currentUser.type;
	e.initUserMemberDetail = function() {
		a.getUserMemberDetail(b.currentUser.id).then(function(a) {
			f = a.data.obj
		})
	}, e.getCurrentSelectionPrice = function(a, b, d, f) {
		var g = e.getPriceByADType(a.property.eqAdType);
		g = e.isVipUser && a.property.eqAdType != c.HIDE ? 0 : e.getPriceWithMemberPrivilege(g);
		var h = g - b;
		return d && 0 !== h ? h = g : 0 > h && (h = 0), !f && a.loadingLogo && (h += e.getPriceWithMemberPrivilege(loadingLogo_qi_xd, !0)), h
	}, e.getPriceWithMemberPrivilege = function(a, c) {
		return 2 === b.currentUser.type && b.currentUser.memberType && (new Date).getTime() < b.currentUser.expiryTime || 21 === b.currentUser.type ? c ? d(a, f.loadingLogo || "1.0") : d(a, f.tailPage || "1.0") : a
	}, e.getPriceByADType = function(a) {
		switch (a) {
		case c.HIDE:
			return QI_AD_XDS;
		case c.FREEPAGE:
			return 0;
		case c.DEFAULT_BOTTOM:
			return 15;
		case c.CUSTOM_BOTTOM:
			return 30
		}
	}
	return e;
}]).service("sceneSettingCache", ["sceneService", "pageTplService", function(a, b) {
	return {
		sceneTplPricesPromise: a.getSceneTemplatePrices(),
		sceneTagsPromise: b.getTagSysListWithType(),
		pageTplsPromise: b.getPageTpls(1301),
		bottomPageTplsPromise: b.getPageTpls(1311)/*,
		activitiesPromise: a.getActivities()*/
	}
}]);