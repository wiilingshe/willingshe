angular.module("invitation", ["app.directives.copyButton"]),
	angular.module("invitation").controller("InvitationCtrl", ["security", "$scope", "usercenterService", "$translate", "$timeout", "ModalService", "i18nNotifications", function(a, b, c, d, e, f, g) {
		b.tabid = "email", b.showUrl = PREFIX_HOST + "/#/home/register?u=" + a.currentUser.id, b.url = "我做的企业秀，用的是微学宝，免费好用，你试试吧：\r\n" + PREFIX_HOST + "/#/home/register?u=" + a.currentUser.id, b.sendEmail = function(a) {
			!b.emailFormatErr && a && c.sendEmail({
				email: a
			}).then(function(a) {
				a.data.success ? g.pushForCurrentRoute("invitation.sendemail.success", "notify.success") : g.pushForCurrentRoute("invitation.sendemail.error", "notify.warning")
			})
		}, b.checkEmailFormat = function(a) {
			var c = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			c.test(a) ? b.emailFormatErr = "" : b.emailFormatErr = "邮件格式不正确"
		}
	}]);