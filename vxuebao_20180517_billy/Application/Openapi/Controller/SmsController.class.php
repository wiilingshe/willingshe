<?php
namespace Openapi\Controller;
use Think\Controller;
use Alidayu\AlidayuClient as Client;
use Alidayu\Request\SmsNumSend;

class SmsController extends Controller {

	//http://local.vxuebao.com/api.php?c=Sms&a=index
	//发送短信 私有
	protected static function sendmsg($mob=13929592957,$name='尊敬的用户'){
		header('Content-type: text/json');
        header('HTTP/1.1 200 ok');
        $client  = new Client;
        $request = new SmsNumSend;
		$yzm=(string)rand(100000,999999);
		
        // 短信内容参数
        $smsParams = array(
            'yzm'    => $yzm,
            'name' => $name
        );

        // 设置请求参数
        $req = $request->setSmsTemplateCode('SMS_13005258')
            ->setRecNum($mob)
            ->setSmsParam(json_encode($smsParams))
            ->setSmsFreeSignName('微学宝')
            ->setSmsType('normal')
            ->setExtend('demo');

        $str=$client->execute($req);
		//print_r($str);
		if($str['error_response']){
			//echo "失败";
			return false;
			exit;
			
		}else{
			$data['mob']=$mob;
			$data['yzm']=$yzm;
			$data['exptime']=time()+900;
			M("yzm")->add($data);
			return true;
			exit;
			//echo '成功';
		}
	}
	
	//获取短信验证码
	public function getyzm(){
		if(IS_POST){
			$mob=I("mob");
			$type=I('type',0,'int');	//	1就是注册,0就找回密码
			$ishave=M('users')->where(array('email_varchar'=>$mob))->count();
			if($type==1){	//存在手机号提示已经注册
				if($ishave>0){
					echo json_encode(array("success" => true, "code" => 401, "msg" => "您的手机号已经注册!", "obj" => null, "map" => null, "list" => null));
					die;
				}
			}else{
				if($ishave==0){
					echo json_encode(array("success" => true, "code" => 402, "msg" => "您的手机号暂未注册!", "obj" => null, "map" => null, "list" => null));
					die;
				}
			}
			if(!preg_match("/1[34578]{1}\d{9}$/",$mob)){
				echo json_encode(array("success" => true, "code" => 400, "msg" => "请输入正确的验证码!", "obj" => null, "map" => null, "list" => null));
				die;
			}
			$str=$this->sendmsg($mob,'尊敬的用户');
			if($str){
				echo json_encode(array("success" => true, "code" => 200, "msg" => "验证码发送成功!", "obj" => null, "map" => null, "list" => null));
			}else{
				echo json_encode(array("success" => false, "code" => 400, "msg" => "验证码发送失败!", "obj" => null, "map" => null, "list" => null));
			}
		}
	}
	
	public function yzmcheck(){
		if(IS_POST){
			$mob=I("mob");
			$yzm=I("yzm");
			if(!preg_match("/1[34578]{1}\d{9}$/",$mob)){
				json_encode(array("success" => true, "code" => 400, "msg" => "请输入正确的手机号码!", "obj" => null, "map" => null, "list" => null));
				die;
			}
			$data=M("yzm")->where(array('mob'=>$mob))->order('id desc')->find();
			if($data['yzm']!=$yzm || $data['exptime']-time()<0){
				echo json_encode(array("success" => true, "code" => 400, "msg" => "验证码有误或超时!", "obj" => null, "map" => null, "list" => null));
				die;
			}
			$sessionid=session_id();
			$User = M('users');
			$is_exist_id = $User->where("email_varchar='" . $mob . "'")->getField('userid_int');
			if ($is_exist_id) {
                $userinfo['last_session_id'] = $sessionid;
				$userinfo['checkemail'] = 1;
				$returnInfo = $User->where(array('userid_int'=>$is_exist_id))->save($userinfo);
            }else{
				$userinfo['email_varchar'] = $mob;
				$userinfo['password_varchar'] = $mob;
				$userinfo['create_time'] = date('y-m-d H:i:s', time());
				$userinfo['last_time'] = date('y-m-d H:i:s', time());
				$userinfo['end_time'] = C('reg_validdays') > 0 ? time() + intval(C('reg_validdays')) * 24 * 3600 : 0;
				$userinfo['createip_varchar'] = get_client_ip();
				$userinfo['lastip_varchar'] = get_client_ip();
				$userinfo['uname'] = $mob;
				$userinfo['headimg'] = '';
				$userinfo['xd'] = C('xd');
				$userinfo['checkemail'] = 1;
				$userinfo['allow_nums'] = C('allow_nums') ? intval(C('allow_nums')) : 0;
				$userinfo['export_num'] = M('user_group')->where("id=1")->getField('export_num');
				$userinfo['last_session_id'] = $sessionid;
				$returnInfo = $User->add($userinfo);
			}
			
			if ($returnInfo) {
                echo json_encode(array("success" => true, "code" => 200, "msg" => "验证成功!", "obj" => array('sessionid'=>$sessionid), "map" => null, "list" => null));
            } else {
                header('Content-type: text/json');
                //header('HTTP/1.1 401 Unauthorized');
                echo json_encode(array("success" => false, "code" => 1006, "msg" => "验证失败", "obj" => null, "map" => array("isValidateCodeLogin" => false), "list" => null));
            }
			
			
			
		}
	}
	
	//设置密码
	public function setpwd(){
		if(IS_POST){
			$sessionid=I('sessionid');
			$pwd=I('password','','md5');
			if($sessionid=='' || I('password')==''){
				echo json_encode(array("success" => false, "code" => 400, "msg" => "参数有误!", "obj" => null, "map" => null, "list" => null));
				die;
			}
			M('users')->where(array('last_session_id'=>$sessionid))->save(array('password_varchar'=>$pwd));
			echo json_encode(array("success" => true, "code" => 200, "msg" => "注册成功，请登陆!", "obj" => null, "map" => null, "list" => null));
		}
	}

}
?>