angular.module("services.usercenter", []).factory("usercenterService", ["$http", "$rootScope", function(a, b) {
	var c = {};
	return c.getUserInfo = function() {
		var b = PREFIX_URL + "index.php?c=user&a=check";
		return b += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getCompanyScale = function() {
		var b = PREFIX_URL + "/base/class/company_scale";
		return b += "?time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getCompanyIndustry = function() {
		var b = PREFIX_URL + "/base/class/company_industry";
		return b += "?time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getCompanyInfo = function() {
		var b = PREFIX_URL + "index.php?c=company&a=info";
		return b += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getDesignerUserInfo = function(id) {
		var b = PREFIX_URL + "index.php?c=designer&a=userinfo";
		return b += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getProvince =function(){
        var b = PREFIX_URL +"index.php?c=Designer&a=getpro";
        return b +="&time=" + (new Date).getTime(), a({
            withCredentials: !0,
            method: "GET",
            url: b
        })
        
    },c.saveCompanyInfo = function(b) {
		//var c = PREFIX_URL + "m/u/company/save111";
		var c = PREFIX_URL + "index.php?c=company&a=save";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})

	}, c.saveDesignerInfo = function(b) {
		var c = PREFIX_URL + "index.php?c=designer&a=save";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		});
	}, c.saveUserInfo = function(b) {
		var c = PREFIX_URL + "index.php?c=user&a=save";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.getUserXd = function() {
		var b = PREFIX_URL + "index.php?c=user&a=xd";
		return b += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getgiveXd = function(b) {
		var c = PREFIX_URL + "index.php?c=user&a=giveXd";
		return c += "&toUser=" + b.toUser, c += "&xdCount=" + b.xdCount, c += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: c
		})
	}, c.getUserInvoice = function() {
		var b = PREFIX_URL + "m/order/user/invoice";
		return b += "?time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.saveUserInvoice = function(b) {
		var c = PREFIX_URL + "m/order/user/save/invoice";
		return c += "?time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			},
			data: JSON.stringify(b)
		})
	}, c.saveOrderInvoice = function(b) {
		var c = PREFIX_URL + "m/order/invoice/save";
		return c += "?time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: c,
			data: $.param(b),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		})
	}, c.getXdlog = function(b, c, d) {
		var e = PREFIX_URL + "index.php?c=user&a=xdlog&pageNo=" + c + "&pageSize=" + d;
		return e += "&time=" + (new Date).getTime(), b && (e += (/\?/.test(e) ? "&" : "?") + "type=" + b), e += (/\?/.test(e) ? "&" : "?") + "pageNo=" + c, e += (/\?/.test(e) ? "&" : "?") + "pageSize=" + d, a({
			withCredentials: !0,
			method: "POST",
			url: e
		})
	}, c.getXdStat = function() {
		var b = PREFIX_URL + "index.php?c=user&a=XdStat";
		return b += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.relAccount = function(b, c, d, e) {
		var f = PREFIX_URL + "m/u/bind/email?loginName=" + c + "&loginPassword=" + d;
		return e && (f += "&register=1"), f += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: f,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.relEmail = function(b, c, d) {
		var e = {
			email: b,
			pass: c,
			resend: d
		},
			f = PREFIX_URL + "index.php?c=user&a=email";
		return a({
			withCredentials: !0,
			method: "POST",
			url: f,
			data: $.param(e),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			}
		})
	}, c.verifyEmail = function() {
		var b = PREFIX_URL + "index.php?c=usercenter&a=verify";
		return a({
			withCredentials: !0,
			method: "GET",
			url: b,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.relMobile = function(b, c, d) {
		var e = PREFIX_URL + "/m/u/phone/verify?phone=" + b + "&pass=" + c + "&code=" + d;
		return e += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: e,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.relMobileCode = function(b, c) {
		var d = PREFIX_URL + "m/u/bind/user/phone?phone=" + b;
		return c && (d += "&type=" + c), d += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: d,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.companyMobile = function(b) {
		var c = PREFIX_URL + "m/u/company/smscode/send?phone=" + b;
		return c += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.setRead = function(b) {
		var c = PREFIX_URL + "m/u/markRead?ids=" + b;
		return c += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.getNewMessage = function(data) {
		var url = PREFIX_URL + "index.php?c=statics&a=msgList"
		data.pageNo && (url += "&pageNo=" + data.pageNo); 
		data.pageSize && (url += "&pageSize=" + data.pageSize);
		data.unread && (url += "&unread=" + data.unread);
		data.type && (url += "&type=" + data.type);

		return url += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: url
		})
	}, c.getBranches = function(b, c) {
		//var d = PREFIX_URL + "index.php?c=ad&a=subList";
		var d = PREFIX_URL + "index.php?c=company&a=subList";
		return b && (d += (/\?/.test(d) ? "&" : "&") + "pageSize=" + b), c && (d += (/\?/.test(d) ? "&" : "&") + "pageNo=" + c), d += (/\?/.test(d) ? "&" : "&") + "time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: d
		})
	}, c.getDepts = function(branchId) {
		//var b = PREFIX_URL + "m/u/tag/list";
		var b = PREFIX_URL + "index.php?c=Company&a=taglist&user_id=" + branchId;
		return b += "&time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.addDept = function(b) {
		//var c = PREFIX_URL + "m/u/tag/create";
		var c = PREFIX_URL + "index.php?c=Company&a=tagcreate";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.updateBranch = function(b) {
		//var c = PREFIX_URL + "m/u/sub/save";
		var c = PREFIX_URL + "index.php?c=Company&a=subsave";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.createBranch = function(b) {
		//var c = PREFIX_URL + "m/u/sub/create";
		var c = PREFIX_URL + "index.php?c=Company&a=subcreate";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.openBranch = function(b, c) {
		var d = PREFIX_URL;
		//return d += c ? "m/u/sub/turnOn?id=" + b : "m/u/sub/turnOff?id=" + b, a({
		return d += c ? "index.php?c=Company&a=subturnon&id=" + b : "index.php?c=Company&a=subturnoff&id=" + b, a({
			withCredentials: !0,
			method: "POST",
			url: d,
			headers: {
				"Content-Type": "text/plain; charset=UTF-8"
			}
		})
	}, c.getDomain = function() {
		var b = PREFIX_URL + "m/u/domain";
		return b += "?time=" + (new Date).getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.bindDomain = function(b) {
		var c = PREFIX_URL + "m/u/domain/bind";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.resetBranchPass = function(c) {
		//var d = PREFIX_URL + "m/u/sub/pwd/reset",
		var d = PREFIX_URL + "index.php?c=Company&a=resetpwd",
			e = {
				id: c
			};
		a({
			withCredentials: !0,
			method: "POST",
			url: d,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(e)
		}).then(function(a) {
			a.data.success && b.$broadcast("reset.branch.success")
		}, function() {})
	}, c.saveApplyInfo = function(b) {
		var c = PREFIX_URL + "m/u/showker/apply";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.resetApplyInfo = function(b) {
		var c = PREFIX_URL + "m/u/showker/apply";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.getVisitorMsg = function() {
		var b = PREFIX_URL + "m/u/showker/detail",
			c = new Date;
		return b += "?time=" + c.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getAPPlyMessage = function(b) {
		var c = PREFIX_S2_URL + "showker/tag?type=" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: c
		})
	}, c.getUserScene = function() {
		var b = PREFIX_URL + "m/u/scene/list",
			c = new Date;
		return b += "?time=" + c.getTime(), a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getUserStatus = function() {
		var b = PREFIX_URL + "m/u/showker/status";
		return a({
			withCredentials: !0,
			method: "GET",
			url: b
		})
	}, c.getCompanyQrCode = function(b, c, d) {
		var e = PREFIX_URL + "m/u/pay/member/url?goodsId=" + b + "&type=" + c;
		return d && (e += "&amount=" + d), a({
			withCredentials: !0,
			method: "GET",
			url: e
		})
	}, c.getUserMemberDetail = function(b) {
		var c = PREFIX_URL + "/m/u/member/detail?userId=" + b;
		return a({
			withCredentials: !0,
			method: "GET",
			url: c
		})
	}, c.getPayXdQrCode = function(b, c) {
		var d = PREFIX_URL + "m/u/pay/xd/url?goodsId=" + b + "&type=" + c;
		return a({
			withCredentials: !0,
			method: "GET",
			url: d
		})
	}, c.sendEmail = function(b) {
		var c = PREFIX_URL + "m/u/invite/user/email";
		return a({
			withCredentials: !0,
			method: "POST",
			url: c,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: $.param(b)
		})
	}, c.getInvoiceList = function(c, d) {
		var e = PREFIX_URL + "m/order/can/invoice/list";
		d && (e += (/\?/.test(e) ? "&" : "?") + "pageSize=" + d), c && (e += (/\?/.test(e) ? "&" : "?") + "pageNo=" + c), a({
			withCredentials: !0,
			method: "GET",
			url: e
		}).then(function(a) {
			a.data.success && b.$broadcast("get.invoice.list", a.data)
		})
	}, c
}]);