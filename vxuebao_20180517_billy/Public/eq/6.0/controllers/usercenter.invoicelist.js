angular.module("usercenter.invoicelist",[]).controller("GetInvoiceListCtrl",["$scope","usercenterService","$modal","ModalService",function(e,i,t,n){e.pageNo=1,e.pageSize=5,e.obj={};var o=[],c=function(e,t){i.getInvoiceList(e,t)};c(1,5),e.$on("get.invoice.list",function(i,t){e.invoiceList=t.list||[];for(var n=0;n<t.list.length;n++)e.invoiceList[n].totalFee=e.invoiceList[n].totalFee/100,0==t.list[n].payType?e.invoiceList[n].payType="微信支付":1==t.list[n].payType&&(e.invoiceList[n].payType="支付宝支付");e.totalItems=t.map.count,e.currentPage=e.obj.toPage=t.map.pageNo}),e.pageChanged=function(t){i.getInvoiceList(t,e.pageSize)},e.cancel=function(){e.$dismiss()},e.view=!0,e.ok=function(){var i=angular.copy(o);o=[],i.length>0?t.open({windowClass:"six-contain",templateUrl:BASE_URL+"templates/usercenter.console.invoice.tpl.html",controller:"InvoiceCtrl",scope:e,resolve:{userinfo:function(){return{view:e.view,orderIds:i}}}}).result.then(function(i){c(1,5),e.switchSelectAll()},function(){}):n.openMsgDialog({msg:"请选择需要开发票的订单列表",btn:"去选择"},function(){})},e.switchSelectAll=function(i){o=[],i?$.each(e.invoiceList,function(e,i){o.push(i.id),i.selected=!0}):$.each(e.invoiceList,function(e,i){i.selected=!1})},e.switchSelect=function(e){e.selected?o.push(e.id):$.each(o,function(i,t){t==e.id&&o.splice(i,1)})}}]);