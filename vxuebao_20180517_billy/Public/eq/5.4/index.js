/**
 * Mason
 * Created by Administrator on 2016/4/9 0009.
 */

function login() {
    var url = PREFIX_URL + "index.php?c=user&a=login";
    var loginEmail = document.getElementById("loginEmail");
    var loginPassword = document.getElementById("loginPassword");
    if ($.trim(loginEmail.value) != "" && $.trim(loginPassword.value) != "") {
        var postData = "username=" + loginEmail.value + "&password=" + loginPassword.value +
            "&rememberMe=";
        $.ajax(url, {
            type: 'post',
            data: postData,
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            success: function (data) {
                if (typeof data == "object") {
                    if (data.code == 1003) {
                        $('#loginError').css({display: "block"});
                        $('#loginError').text(data.msg);
                    }
                    return
                }
                var jsonData = eval("(" + data + ")");
                switch (jsonData.code) {
                    case 200 :
                        $('#loginModal').modal('hide');
						location.reload();
                        break;
                    case 1004:
                        $('#loginError').css({display: "block"});
                        $('#loginError').text(jsonData.msg);
                        break;
                }
            }
        });
    } else {
        if ($.trim(loginEmail.value) === "") {
            $('#loginError').css({display: "block"});
            $('#loginError').text("邮箱不能为空");
        } else {
            $('#loginError').text("密码不能为空");
        }
    }
}

function keylogin(){
    if(event.keyCode==13){
       login();
    }
}

function resetpwd(){
	var url = PREFIX_URL + "index.php?c=user&a=reset";
	var pwdl = document.getElementById("pwd1");
    var pwd2 = document.getElementById("pwd2");
	var key = document.getElementById("key");

	if(pwdl.value == "" || pwdl.value != pwd2.value){
		$('#resetpwdError').css({display: "block"});
        $('#resetpwdError').text("密码不能为空，并且两次密码必须一致");
		return false;
	}
	var postData = "newPwd=" + pwdl.value + "&key=" + key.value;
	$.ajax(url, {
		type: 'post',
		data: postData,
		headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
		success: function (data) {
			if (typeof data == "object") {
				if (data.code == 1003) {
					$('#resetpwdError').css({display: "block"});
					$('#resetpwdError').text(data.msg);
				}
				return false;
			}
			var jsonData = eval("(" + data + ")");
			switch (jsonData.code) {
				case 200 :
					$('#resetpwdModal').modal('hide');
					alert('密码重置成功\n\n请使用新密码登录！');
					//window.location.href=PREFIX_URL +"index.php/#login"; 
					break;
				case 1004:
					$('#resetpwdError').css({display: "block"});
					$('#resetpwdError').text(jsonData.msg);
					break;
			}
		}
	});

}
	
function checkEmailExist(email) {
    var regEmail = document.getElementById("regEmail");
    var url = PREFIX_URL + "index.php?c=user&a=checkN&username=" + regEmail.value;
    if ($.trim(regEmail.value) != "" && email == '') {
        if (!checkEmailFormat.test(regEmail.value)) {
            $('#regEmailError').text("账号为6-40个字符(英文字母或数字，只支持小写)以及-_@.的组合");
        } else {
            $.get(url, function (data) {
                if (typeof data == "object") {
                    $('#regEmailError').text("账号已存在，请重新填写");
                } else {
                    $('#regEmailError').text("");
                }
            })
        }
    } else {
        $('#regEmailError').text("账号不能为空");
    }
}

function checkRegPassword() {
    var regPassword = document.getElementById("regPassword");
    if ($.trim(regPassword.value) != "") {
        if (regPassword.value.length >= 6 && regPassword.value.length <= 16) {
            $('#regPasswordError').text("");
        } else {
            $('#regPasswordError').text("密码6~16个字符(英文字母或数字 区分大小写)");
        }
    } else {
        $('#regPasswordError').text("密码不能为空");
    }
}

function checkConfirmPassword() {
    var regPassword = document.getElementById("regPassword");
    var confirmPassword = document.getElementById("confirmPassword");
    if ($.trim(regPassword.value) != "") {
        if (regPassword.value == confirmPassword.value) {
            $('#confirmPwdError').text("");
        } else {
            $('#confirmPwdError').text("两次密码输入不一致，请重新输入)");
        }
    } else {
        $('#confirmPwdError').text("密码不能为空");
    }
}

function register() {
    var url = PREFIX_URL + "index.php?c=user&a=register";
    var regEmail = document.getElementById("regEmail");
    var regPassword = document.getElementById("regPassword");
    var confirmPassword = document.getElementById("confirmPassword");
    var regPwdEqualConPwd = (regPassword.value === confirmPassword.value);

    if ($.trim(regEmail.value) != "" && $.trim(regPassword.value) != "" && regPwdEqualConPwd) {
        var postData = "loginName=" + regEmail.value + "&password=" + regPassword.value;
        $.ajax(url, {
            type: 'post',
            data: postData,
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            success: function (d) {
            	var data = eval("(" + d + ")");
            	if (data.code == 200) {
                        //alert(data.msg);
                        $('#myAlert .modal-body').text(data.msg);
                        $('#myAlert').modal('show');
                        $('#regModal').modal('hide');
                        //$('#loginModal').modal('show');
                }else{
                	alert(data.msg);
                }
            }
        });
    }
}

function retrievePassword() {
    var url = PREFIX_URL + "index.php?c=user&a=forget_password";
    var retrieveUsername = document.getElementById("retrieveUsername");
    if ($.trim(retrieveUsername.value) != "") {
        if ($(".gt_ajax_tip").hasClass("gt_success")) {
            var postData = {"email": retrieveUsername.value};
            console.log("验证成功");
            $('#forgetPwdError').css({display: "none"});
            $.ajax(url, {
                type: 'post',
                data: postData,
                headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
                success: function (data) {
                    var jsonData = eval("(" + data + ")");
                    switch (jsonData.code) {
                        case 200 :
                            $('.send_email').text("重置密码的链接已发送到你的 " + retrieveUsername.value + "邮箱，登录邮箱重置密码吧！");
                            $('.retrieveForm').css({"display": "none"});
                            $('#findPwdSuccess').css({"display": "block"});
                            break;
                        default:
                            $('#forgetPwdError').css({display: "block"});
                            $('#forgetPwdError').text("账号不存在");
                            break;
                    }
                }
            });
        } else if (!checkEmailFormat.test(retrieveUsername.value)) {
            $('#forgetPwdError').css({display: "block"});
            $('#forgetPwdError').text("邮箱格式不正确");
        } else {
            $('#forgetPwdError').css({display: "block"});
            $('#forgetPwdError').text("请拖动滑块进行验证");
        }
    } else {
        $('#forgetPwdError').css({display: "block"});
        $('#forgetPwdError').text("邮箱不能为空");
    }
}

function openThirdPatyWindow(thirdType) {
    var url = "";
    switch (thirdType) {
        case "weixin":
            url = "https://open.weixin.qq.com/connect/qrconnect?appid=wx5a3ca7ea184c3a3b&redirect_uri=http%3A%2F%2Fwww.vxuebao.com%2Fpassword.html&scope=snsapi_login&response_type=code&state=WECHAT_STATE#wechat_redirect";
            break;
        case "qq":
            url = "https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101276409&redirect_uri=http%3A%2F%2Fwww.vxuebao.com%2Fpassword.html&scope=get_user_info&response_type=token";
            break;
    }
    window.open(url, "_blank", "width=600,height=600,menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes");
}

function reset() {
    $("#retrieveUsername").val("");
}

function clearRetrievePassword() {
    $("#retrieveUsername").val("");
    $('.retrieveForm').css({'display': 'block'});
    $('#findPwdSuccess').css({'display': 'none'});
}

function clearAlertText() {
    $('.alert').css({"display": "none"});
    $('#loginPassword').val("");
}

function cleaerErrorText() {
    $('#regEmail').val("");
    $('#regPassword').val("");
    $('#confirmPassword').val("");
    $('.error_text').text("");
}
