<?php
namespace Openapi\Controller;
use Think\Controller;

class SsoController extends Controller {

	
	function index(){
	
	}
	
	//QQ单点登录for app
	function qq(){
		$type=I('type','qq');	// qq  wx
		if($type=='qq'){
			$field="openid_qq";
		}else{
			$field="openid_wx";
		}
		if($type=="" || I('openid')==""){
			echo '{"success":false,"code":1001,"msg":"参数有误","obj":null,"map":null,"list":null}';
			die;
		}
		
if(IS_POST){
			
			session('[regenerate]');
			$sessionid= session_id();
			
			$data[$field]	=I('openid');
			$data['nickname']=I('nickname');
			$data['headimg']=I('headimg');
			$data['sex']	=I('sex',0,'int');
			if(strlen(I('openid'))<10){
				echo '{"success":false,"code":1002,"msg":"出错了","obj":null,"map":null,"list":null}';
				die;
			}
			$returnInfo = M('users')->where("$field='" . I('openid') . "'")->find();
		if ($returnInfo) {
            if (intval($returnInfo['end_time']) > 0 && $returnInfo['end_time'] < time() && 1 == 2) {
                echo '{"success":false,"code":1004,"msg":"您的账号已过期，请与管理员联系","map":{"isValidateCodeLogin":false}}';
            } else {
                session('userid', $returnInfo["userid_int"]);
                session('username', $returnInfo['uname']);
                session('phone', $returnInfo['phone']);
                session('level_int', $returnInfo["level_int"]);
                session('type', $returnInfo["type"]);
                session('email', $returnInfo["email_varchar"]);
                session('md5str', md5('adklsj[]999875sssee,' . $returnInfo["id"]));
				
				session('companyid', $returnInfo["companyid"]);
				session('company_ext', $returnInfo["company_ext"]);
                cookie('USERID', $returnInfo["userid_int"]);
                cookie('MD5STR', md5('adklsj[]999875sssee,' . $returnInfo["id"]));
                header('HTTP/1.1 200 ok');
                $update['last_time'] = date('y-m-d H:i:s', time());
				$update['last_session_id'] = $sessionid;
                M("users")->where(array('userid_int' => $returnInfo["userid_int"]))->save($update);
                if (defined('LOGIN_LOG') && LOGIN_LOG)
                   // \Think\Log::write(D("")->getlastsql() . "User->add \n" . var_export($returnInfo, true));
                $returnInfo['status_int'] = 1;
                $userInfo_str = getUsreJsonStr($returnInfo);
				//echo '<script>window.opener.location.href = "/";window.close();< /script>';
				//die;
                echo '{"success":true,"code":200,"msg":"登陆成功","obj":{' . $userInfo_str . '},"map":null,"list":null,"sessionid":"'.$sessionid.'"}';
            }
        }else {
            $userinfo["uname"] = I('nickname');
            $userinfo["email_varchar"] = md5(I('openid'))."@qq.com";
			$userinfo["sex"] = I('sex',0,'int');
            $userinfo["headimg"] = I('headimg');
            $userinfo[$field] = I('openid');
            $userinfo['password_varchar'] = '18541ebd31703b6589f2d51d858cf2f5';
            $userinfo['create_time'] = date('y-m-d H:i:s', time());
            $userinfo['last_time'] = date('y-m-d H:i:s', time());
            $userinfo['end_time'] = C('reg_validdays') > 0 ? time() + intval(C('reg_validdays')) * 24 * 3600 : 0;
            $userinfo['createip_varchar'] = get_client_ip();
            $userinfo['lastip_varchar'] = get_client_ip();
            $userinfo['xd'] = C('xd');
            $userinfo['allow_nums'] = C('allow_nums') ? intval(C('allow_nums')) : 0;
			$userinfo['export_num'] = M('user_group')->where("id=1")->getField('export_num');
            $id = M("users")->add($userinfo);
           // \Think\Log::write(D("")->getlastsql() . "User->add \n" . var_export($userinfo, true));
            if ($id) {
                session('userid', $id);
                session('username', $userinfo['uname']);
                session('email', $userinfo['email_varchar']);
                session('md5str', md5('adklsj[]999875sssee,' . $id));
				session('companyid', 0);
				session('company_ext','');
                cookie('USERID', $userinfo['email_varchar']);
                cookie('MD5STR', md5('adklsj[]999875sssee,' . $id));
                header('HTTP/1.1 200 ok');
                $userinfo['status_int'] = 1;
                $userInfo_str = getUsreJsonStr($userinfo);
				//echo '<script>window.opener.location.href = "/";window.close();< /script>';
				//die;
                echo '{"success":true,"code":200,"msg":"注册登陆成功","obj":{' . $userInfo_str . '},"map":null,"list":null,"sessionid":"'.$sessionid.'"}';
            } else {
                echo '{"success":false,"code":200,"msg":"出错了","obj":null,"map":null,"list":null}';
            }
        }
		
		
		
}
	
	}
	
}
?>