angular.module("spread.share.subtab", ["spread.share.socialShare", "spread.share.expandWeb", "spread.share.domainBind", "spread.share.siteImport"]);
angular.module("spread.share", ["spread.share.subtab"]), angular.module("spread.share").controller("ShareCtrl", ["$rootScope", "$scope", "$stateParams", "$location", "security", function(a, b, c, d, e) {
	c.subtab && (b.viewControl.subtab = c.subtab), b.isDomainAccessable = e.isAllowToAccess(e.accessDef.ACCESS_DOMAIN_BIND), b.showSelectSubTab = function(a) {
		b.viewControl.subtab = a, d.path("spread/share/" + b.sceneId + "/" + a, !1)
	}
}]);