angular.module("usercenter.invoicelist", []).controller("GetInvoiceListCtrl", ["$scope", "usercenterService", "$modal", "ModalService", function(a, b, c, d) {		
	
	a.pageNo = 1;
	a.pageSize = 5;
	a.obj = {};

	var e = [],
		f = function(a, c) {
			b.getInvoiceList(a, c)
		};

	f(1, 5);

	a.$on("get.invoice.list", function(b, c) {
		a.invoiceList = c.list || [];
		for(var d = 0; d < c.list.length; d++) {
			a.invoiceList[d].totalFee = a.invoiceList[d].totalFee / 100;
			if(0 == c.list[d].payType){
				a.invoiceList[d].payType = "微信支付";
			}else if(1 == c.list[d].payType){
				a.invoiceList[d].payType = "支付宝支付";
			}

		}
		a.totalItems = c.map.count;
		a.currentPage = a.obj.toPage = c.map.pageNo;

	}), a.pageChanged = function(c) {
		b.getInvoiceList(c, a.pageSize);

	}, a.cancel = function() {
		a.$dismiss();

	};

	a.view = !0;

	a.ok = function() {
		var b = angular.copy(e);
		e = [];
		if(b.length > 0){
			c.open({
				windowClass: "six-contain",
				templateUrl: BASE_URL + "templates/usercenter.console.invoice.tpl.html",
				controller: "InvoiceCtrl",
				scope: a,
				resolve: {
					userinfo: function() {
						return {
							view: a.view,
							orderIds: b
						}
					}
				}
			}).result.then(function(b) {
				f(1, 5);
				a.switchSelectAll();
			}, function() {})
		}else{
			d.openMsgDialog({
				msg: "请选择需要开发票的订单列表",
				btn: "去选择"
			}, function() {})
		}
	}, a.switchSelectAll = function(b) {
		e = [];
		if(b){
			$.each(a.invoiceList, function(a, b) {
				e.push(b.id);
				b.selected = !0;
			})
		}else{
			$.each(a.invoiceList, function(a, b) {
				b.selected = !1;
			})
		}
	}, a.switchSelect = function(a) {
		if(a.selected){
			e.push(a.id);
		}else{
			$.each(e, function(b, c) {
				c == a.id && e.splice(b, 1);
			})
		}
	}
}]);