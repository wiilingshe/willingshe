angular.module("usercenter.branch", ["services.usercenter", "services.i18nNotifications"]),
	angular.module("usercenter.branch").controller("BranchCtrl", ["$rootScope", "$scope", "$window", "$stateParams", "usercenterService", "security", "$modal", "ModalService", "$location", "branch", "i18nNotifications", "$translate", function(a, b, c, d, e, f, g, h, i, j, k, l) {		
		b.originData = b.branch = angular.copy(j);
		b.dept = {};
		b.depts = [];
		b.resetDefalt = !1;
		if(j){
			b.resetDefalt = !0;
		}else{
			b.resetDefalt = !1;
			setTimeout(function() {
				$("button").css("background-color", "#ccc")
			}, 0);
			b.branch = {};
		}
		b.openResetModal = function(a) {
			g.open({
				windowClass: "console six-contain",
				templateUrl: BASE_URL + "templates/usercenter_console_resetbranchpass.html",
				controller: "ResetBranchPassCtrl",
				resolve: {
					branch: function() {
						return a
					}
				}
			}).result.then(function() {
				k.pushForCurrentRoute("branch.reset.success", "notify.success");

			}, function() {})
		}, b.getDepts = function() {
			if(b.branch.id){
				e.getDepts(b.branch.id).then(function(a) {
					if(a.data.company_ext.is_audit == 'false'){
						a.data.company_ext.is_audit = false;
					}else if(a.data.company_ext.is_audit == 'true'){
						a.data.company_ext.is_audit = true;
					}
					if(a.data.company_ext.is_integral == 'false'){
						a.data.company_ext.is_integral = false;
					}else if(a.data.company_ext.is_integral == 'true'){
						a.data.company_ext.is_integral = true;
					}
					b.branchPermi.edit = (a.data.company_ext.data_permiss[0]=='false' || a.data.company_ext.data_permiss[0] == false)?false:true;
					b.branchPermi.delete = (a.data.company_ext.data_permiss[1]=='false' || a.data.company_ext.data_permiss[1] == false)?false:true;
					b.branchPermi.export = (a.data.company_ext.data_permiss[2]=='false' || a.data.company_ext.data_permiss[2] == false)?false:true;
					b.branchPermi.audit = a.data.company_ext.is_audit;
					b.branchPermi.integral = a.data.company_ext.is_integral;
					b.branchPermi.integralCore = a.data.company_ext.integral_num;

					b.depts = a.data.list;
					if(b.branch.deptName || b.branch.deptId){
						for(var c = 0; c < b.depts.length; c++){
							if(b.depts[c].id == b.branch.deptId) {
								return void(b.branch.dept = b.depts[c])
							}
						}
					}
				}, function() {
					//alert(l.instant("usercenter.account.SERVER_ERROR"))
				})
			}
		};
		b.getDepts();

		b.authError = "";
		b.checkDeptFormat = function(a) {
			if(a.name){
				if(countCharacters(a.name) > 30){
					$(".dept-name").addClass("error");
					$(".dept-name").change(function() {
						$(this).removeClass("error")
					});
					b.deptFormatError = l.instant("usercenter.account.DEPT_ERR2");
					return !1;
				}else{
					b.deptFormatError = "";
					return !0;
				}

			}else{
				b.deptFormatError = l.instant("usercenter.account.DEPT_ERR1");
				$(".dept-name").focus();
				deptF = {};
				return !1;
			}
		}, b.addDept = function() {
			b.checkDeptFormat(b.dept) && e.addDept(b.dept).then(function(a) {
				if(a.data.success){
					b.showAddSec = !1;
					b.depts.unshift({
						id: a.data.obj,
						name: b.dept.name
					});
					k.pushForCurrentRoute("dept.create.success", "notify.success");
					b.dept = {};
				}

			}, function() {
				b.authError = l.instant("usercenter.account.SERVER_ERROR");
			})
		};

		b.branchPermi = {
			edit: false,
			delete: false,
			export: false,
			audit: !1,
			integral: !1,
			integralCore: 0
		};
		if(b.branch.extPermi){
			/^([\d,]+,)?1(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi.edit = !0);
			/^([\d,]+,)?2(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi["delete"] = !0);
			/^([\d,]+,)?3(,[\d,]*)?$/.test(b.branch.extPermi) && (b.branchPermi["export"] = !0);
		}


		b.checkEmailFormat = function(a) {
			// if(b.branch.loginName){
			// 	if(/^[-_a-z0-9\.@]{6,40}$/g.test(b.branch.loginName)){
			// 		b.emailFormatError = "";
			// 		return !0;
			// 	}else{
			// 		b.emailFormatError = l.instant("usercenter.account.BRANCH_ERR2");
			// 		return !1;
			// 	}
			// }else{
			// 	b.emailFormatError = l.instant("usercenter.account.BRANCH_ERR1");
			// 	return !1;
			// }
			return !0;
		}, b.checkNameFormat = function(a) {
			if(a.name){
				if(countCharacters(a.name) > 30){
					b.nameFormatErr = l.instant("usercenter.account.LOGIN_NAME_ERR2");
					return !1;
				}else{
					b.nameFormatErr = "";
					return !0;
				}

			}else{
				$(".branch-name").focus();
				b.nameFormatErr = l.instant("usercenter.account.LOGIN_NAME_ERR1");
				return !1;
			}

		}, b.confirm = function() {
			if(b.checkEmailFormat(b.branch) && b.checkNameFormat(b.branch)) {
				var a = {};
				if(b.branch.dept){
					b.branch.deptName = b.branch.dept.name;
					b.branch.dept.id && (a.deptId = b.branch.deptId = b.branch.dept.id);
				}

				var c = [];
				$.each(b.branchPermi, function(a, b) {
					if("edit" == a && b){
						c.push("1");

					}else if("export" == a && b){
						c.push("3");

					}else if("delete" == a && b){
						c.push("2");

					}
				});
				b.branch.extPermi = c.join(",");
				
				if(!b.branchPermi.integral ){//如果没开通积分
					b.branchPermi.integralCore = 0;
				}
				if(j){
					$.extend(a, {
						id: b.branch.id,
						name: b.branch.name,
						data_permissions: b.branch.extPermi,
						is_audit: b.branchPermi.audit,
						is_integral: b.branchPermi.integral,
						integral_num: b.branchPermi.integralCore
					});
					e.updateBranch(a).then(function(a) {
						if(a.data.success){
							b.$close(b.branch);
							k.pushForCurrentRoute("branch.update.success", "notify.success");
						}

					}, function(a) {
						b.serverError = l.instant("usercenter.account.SERVER_ERROR");
					})
				}else{
					$.extend(a, {
						loginName: b.branch.loginName,
						name: b.branch.name,
						data_permissions: b.branch.extPermi,
						is_audit: b.branchPermi.audit,
						is_integral: b.branchPermi.integral,
						integral_num: b.branchPermi.integralCore
					});
					e.createBranch(a).then(function(a) {
						if(a.data.success){
							b.branch.id = a.data.obj.id;
							k.pushForCurrentRoute("branch.create.success", "notify.success");
							b.$close(b.branch);
						}else{
							b.serverError = a.data.msg;
						}
					}, function(a) {
						b.serverError = l.instant("usercenter.account.SERVER_ERROR");
					})
				}
			}
		}, b.cancel = function() {
			b.$dismiss()
		}
	}]);