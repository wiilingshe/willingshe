angular.module("usercenter.invoice", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.invoice").controller("InvoiceCtrl", ["$scope", "usercenterService", "$modal", "i18nNotifications", "userinfo", function(a, b, c, d, e) {		
		a.invoiceStatus = "";
		a.changeType = function(b) {
			a.invoiceStatus = b;
		};

		a.editInfo = {
			isEditable: !0
		};
		if(e.view){
			a.view = e.view;
			a.editInfo.isEditable = !1;
			e.orderIds = e.orderIds.join(",");
		}

		var f = [];
		a.authError = "";
		a.picture = {};
		a.invoice = {
			receiver: "",
			phone: "",
			address: ""
		};

		a.reset = function() {
			a.editInfo.isEditable = !0
		};
		a.invoiceListPu = {
			invoiceType: 1
		};
		a.invoiceListzhuan = {
			invoiceType: 2
		};
		var g = function() {
			b.getUserInvoice().then(function(b) {
				if(200 == b.data.code) {
					b.data.obj && (a.invoice = b.data.obj);
					a.invoiceStatus = b.data.map.invoiceType ? b.data.map.invoiceType : 1;

					for(var c = b.data.list, d = 0; d < c.length; d++) {
						if(1 == c[d].invoiceType){
							a.invoiceListPu = c[0]
						}else if(2 == c[d].invoiceType){
							a.invoiceListzhuan = c[1];
							f = c[1].licenseImgsJson.split(",");
							a.picture = {
								tax: f[0],
								bank: f[1],
								people: f[2],
								mes: f[3]
							}
						}
					}
				}
			})
		};
		g(), a.addPictures = function(b) {
			c.open({
				windowClass: "console img_console",
				templateUrl: BASE_URL + "templates/scene.console.bg.tpl.html",
				controller: "BgConsoleCtrl",
				resolve: {
					obj: function() {
						return {
							fileType: 1,
							count: 1
						}
					}
				}
			}).result.then(function(c) {
				switch(b){
					case "tax":
						a.picture.tax = c.data
						break;
					case "bank":
						a.picture.bank = c.data
						break;
					case "people":
						a.picture.people = c.data
						break;
					case "mes":
						a.picture.mes = c.data
						break;
				}
				d.pushForCurrentRoute("upload.success", "notify.success");
			})
		};
		var h = function() {
			if(!a.picture.tax){
				a.authError = "请上传税务登记证";
				return !1;
			}else if(!a.picture.bank){
				a.authError = "请上传银行许可证";
				return !1;
			}else if(!a.picture.people){
				a.authError = "请上传一般纳税人资质证明";
				return !1;
			}else if(!a.picture.mes){
				a.authError = "请上传开票信息加盖公章";
				return !1;
			}else{
				return !0
			}

		};
		a.submit = function(c) {
			if(!a.invoice.receiver) {
				return void(a.authError = "请填写收件人");
			}
			if(!a.invoice.phone) {
				return void(a.authError = "请填写联系电话");
			}
			if(!a.invoice.address) {
				return void(a.authError = "请填写收货地址");
			}
			var c = {
				orderIds: e.orderIds,
				receiver: a.invoice.receiver,
				address: a.invoice.address,
				phone: a.invoice.phone
			};

			if(1 == a.invoiceStatus){
				c.invoiceType = 1;
				c.title = a.invoiceListPu.title;
			}else if(2 == a.invoiceStatus) {
				if(!h()) {
					return !1;
				}
				c.invoiceType = 2;
				c.title = a.invoiceListzhuan.title;
				c.licenseImgsJson = a.picture.tax + "," + a.picture.bank + "," + a.picture.people + "," + a.picture.mes;
			}else if(3 == a.invoiceStatus){
				c.invoiceType = 3
			}

			b.saveOrderInvoice(c).then(function(b) {
				b.data.success && (a.$close(c), d.pushForCurrentRoute("save.success", "notify.success"))
			})
		}, a.saveUserInvoice = function(c) {
			if(!a.invoice.receiver) {
				return void(a.authError = "请填写收件人");
			}
			if(!a.invoice.phone) {
				return void(a.authError = "请填写联系电话");
			}
			if(!a.invoice.address) {
				return void(a.authError = "请填写收货地址");
			}
			var c = {};
			c.invoiceDeliver = {
				receiver: a.invoice.receiver,
				address: a.invoice.address,
				phone: a.invoice.phone
			};
			c.invoiceList = [];
			a.invoiceListPu.title && c.invoiceList.push({
				invoiceType: a.invoiceListPu.invoiceType,
				title: a.invoiceListPu.title
			});
			if(a.invoiceListzhuan.title) {
				if(!a.picture.tax) {
					return void(a.authError = "请上传税务登记证");
				}
				if(!a.picture.bank) {
					return void(a.authError = "请上传银行许可证");
				}
				if(!a.picture.people) {
					return void(a.authError = "请上传一般纳税人资质证明");
				}
				if(!a.picture.mes) {
					return void(a.authError = "请上传开票信息加盖公章");
				}
				var f = {
					invoiceType: a.invoiceListzhuan.invoiceType,
					title: a.invoiceListzhuan.title,
					licenseImgsJson: a.picture.tax + "," + a.picture.bank + "," + a.picture.people + "," + a.picture.mes
				};
				c.invoiceList.push(f)
			}
			b.saveUserInvoice(c).then(function(b) {
				b.data.success && (e.view ? a.editInfo.isEditable = !1 : a.$close(c), d.pushForCurrentRoute("save.success", "notify.success"))
			})
		}, a.cancel = function() {
			a.$close();
		}
	}]);