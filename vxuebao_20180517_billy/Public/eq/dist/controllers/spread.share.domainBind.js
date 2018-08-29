angular.module("spread.share.domainBind", ["services.usercenter", "services.i18nNotifications"]), angular.module("spread.share.domainBind").controller("DomainBindCtrl", ["$scope", "$rootScope", "usercenterService", "$translate", "i18nNotifications", function(a, b, c, d, e) {
		a.showController = {}, a.goStep = function(b) {
			a.showController.step = b
		}, a.bindDomain = function() {
			a.showController.agreeBind = !0
		}, a.reApply = function() {
			a.isShowBindPanel = !0, a.showController.agreeBind = !1
		};
		var f = function() {
				c.getDomain().then(function(b) {
					if (b.data.success) if (a.domainInfo = b.data.obj, a.model.day = b.data.obj.typeList[0], a.typeIndex = 0, b.data.obj.id) {
						a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90";
						var c = a.status = b.data.obj.status;
						1 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS1"), a.unbind = !1, a.domainInfo.restTime = Math.floor((a.domainInfo.endDate - a.domainInfo.startDate) / 864e5)) : 2 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS2"), a.unbind = !1) : 3 === c ? (a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS3"), a.unbind = !0) : 4 === c ? a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS4") : (new Date).getTime() > b.data.obj.endDate && (a.status = 5, a.domainMes = d.instant("usercenter.server.DOMAIN_STATUS5"), a.unbind = !0)
					} else a.isShowBindPanel = !0
				})
			};
		f(), a.getUserXd = function() {
			c.getUserXd().then(function(b) {
				b.data.success && (a.xdCounts = b.data.obj)
			})
		}, a.getUserXd(), a.model || (a.model = {});
		var g = a.model;
		a.checkDomainFormat = function(b) {
			return b.url ? (a.domainFormatErr = "", !0) : (a.domainFormatErr = d.instant("usercenter.server.WRITE_DNS"), !1)
		}, a.checkDayFormat = function(b) {
			return b.day ? (a.dayFormatErr = "", !0) : (a.dayFormatErr = d.instant("usercenter.server.WRITE_DATE"), !1)
		}, a.checkAppIdAndSecret = function(b) {
			return b.appId && !b.secretId ? (a.appIdFormatErr = d.instant("usercenter.serverWRITE_APPSECRET"), !1) : !b.appId && b.secretId ? (a.appSecretErr = d.instant("usercenter.server.WRITE_APPID"), !1) : (a.appIdFormatErr = "", a.appSecretErr = "", !0)
		}, a.submit = function() {
			if (a.checkDomainFormat(g) && a.checkDayFormat(g) && a.checkAppIdAndSecret(g)) if (a.cost = g.day.label, a.xdCounts >= parseInt(a.cost, 10)) {
				var b = {
					url: g.url,
					buyTime: g.day.value,
					appId: g.appId,
					secretId: g.secretId
				};
				c.bindDomain(b).then(function(b) {
					b.data.success ? (alert(d.instant("usercenter.server.DNS_COMMIT")), a.status = 2, a.isShowBindPanel = !1, a.domainInfo.ipAddress = "202.173.11.90", a.domainInfo.url = g.url) : a.actionerror = b.data.msg
				}, function() {
					alert(d.instant("usercenter.server.SERVER_ERROR"))
				})
			} else e.pushForCurrentRoute("xd.insufficient", "notify.success")
		}, a.switchDomainType = function(b) {
			a.typeIndex = b
		}
	}]);