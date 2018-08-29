<?php
namespace Home\Controller;
use Think\Controller;
/*新修改*/
class PasswordController extends Controller{

	public function index(){
		$type = I('get.state','qq');
		if($type == 'WECHAT_STATE'){
            $wxqrlogin = new \Think\wxqrlogin(C('WX.appid'),C('WX.appsecret'), I('get.code'));
            $backarr = $wxqrlogin->access_token_act();
			//dump($backarr);die;
            \Think\Log::write("\n" . var_export($backarr, true));
            $openid = $wxqrlogin->get_openid($backarr);
            $wxuserinfo = $wxqrlogin->user_info($backarr);
            $usrapi_arr = array(
                'nickname' =>$wxuserinfo['nickname'],
                'headimg'=>$wxuserinfo['headimgurl'],
                'sex'=>$wxuserinfo['sex']
            );
            $openid_field = "openid_wx";
		}else{
			$qq = new \Think\Qqlogin(C('THINK_SDK_QQ.APP_KEY'), C('THINK_SDK_QQ.APP_SECRET'), C('THINK_SDK_QQ.CALLBACK'));
			
				$arr=$qq->get_token();
				$access_token=$arr['access_token'];
			
			$usrapi_arr=$qq->get_client_id($access_token);
			//dump($usrapi_arr);die;
			$client_id=$usrapi_arr['client_id'];
			$openid=$usrapi_arr['openid'];
			$usrapi_arr=$qq->user_info($client_id,$openid,$access_token);
			if (!$usrapi_arr) {
				$this->error('出错了1');
            	echo '{"success":false,"code":200,"msg":"出错了1","obj":null,"map":null,"list":null}';
            	exit;
       		}
			$openid_field = "openid_qq";
		}
		
		if (!$openid){
			$this->error('出错了2');
			echo '{"success":false,"code":404,"msg":"出错了2","obj":null,"map":null,"list":null}';
			die;
		}
		$User = M("users");
		$cj_user_info = $User->where("$openid_field='" . $openid . "'")->find();
		if ($cj_user_info) {
            $returnInfo = $cj_user_info;
            if (intval($returnInfo['end_time']) > 0 && $returnInfo['end_time'] < time() && 1 == 2) {
            	$this->error('您的账号已过期，请与管理员联系');
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
                $User->where(array('userid_int' => $returnInfo["userid_int"]))->save($update);
                if (defined('LOGIN_LOG') && LOGIN_LOG)
                   // \Think\Log::write(D("")->getlastsql() . "User->add \n" . var_export($returnInfo, true));
                //$returnInfo['status_int'] = 1;
                $userInfo_str = getUsreJsonStr($returnInfo);
				$this->success('登录成功',U('/'));
				die;
                echo '{"success":true,"code":200,"msg":"success","obj":{' . $userInfo_str . '},"map":null,"list":null}';
            }
        }else {
            $userinfo["uname"] = $usrapi_arr["nickname"];
            $userinfo["sex"] = $usrapi_arr["sex"];
            $userinfo["headimg"] = $usrapi_arr["headimg"];
            $userinfo[$openid_field] = $openid;
            $userinfo['password_varchar'] = '18541ebd31703b6589f2d51d858cf2f5';
            $userinfo['create_time'] = date('y-m-d H:i:s', time());
            $userinfo['last_time'] = date('y-m-d H:i:s', time());
            $userinfo['end_time'] = C('reg_validdays') > 0 ? time() + intval(C('reg_validdays')) * 24 * 3600 : 0;
            $userinfo['createip_varchar'] = get_client_ip();
            $userinfo['lastip_varchar'] = get_client_ip();
            $userinfo['xd'] = C('xd');
            $userinfo['allow_nums'] = C('allow_nums') ? intval(C('allow_nums')) : 0;
			$userinfo['export_num'] = M('user_group')->where("id=1")->getField('export_num');
            $userinfo['status_int']=0;
            $id = $User->add($userinfo);
           // \Think\Log::write(D("")->getlastsql() . "User->add \n" . var_export($userinfo, true));
            if ($id) {
                $User->where(array('userid_int'=>$id))->save(array('email_varchar'=>$id.'@vxuebao.com'));
                header('HTTP/1.1 200 ok');
                $userinfo['status_int'] = 1;
                $userInfo_str = getUsreJsonStr($userinfo);
				echo '<script>window.opener.location.href = "/";window.close();</script>';
				die;
                echo '{"success":true,"code":200,"msg":"操作成功","obj":{' . $userInfo_str . '},"map":null,"list":null}';
            } else {
                echo '{"success":false,"code":200,"msg":"出错了","obj":null,"map":null,"list":null}';
            }
        }
	}
	
	public function view(){
		echo 111;
	}
}
?>