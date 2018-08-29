<?php
namespace Home\Controller;
use Think\Controller;
class OtherloginController extends Controller {
    //登录地址
    public function login() {
        $type = I('get.type', 'qq');
        //加载ThinkOauth类并实例化一个对象
        import("ORG.ThinkSDK.ThinkOauth");
        $sns = \ThinkOauth::getInstance($type);
        $url = $sns->getRequestCodeURL();
        //\Think\Log::write("index \n" . $url);
        //跳转到授权页面
        redirect($url);
    }
    public function index() {
        defined('LOGIN_LOG', true);
        $type = I('get.type','qq');
        if($type == 'weixin'){
            $wxqrlogin = new \Think\wxqrlogin(C('WX.appid'),C('WX.appsecret'), I('get.code'));
            $backarr = $wxqrlogin->access_token_act();
            //\Think\Log::write(print_r($backarr,1),INFO,'file',LOG_PATH.'otherlogin.log');
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
            $access_token = I('post.accessToken');
            $openid = I('post.openId');
            $usrapi_arr = $qq->user_info(C('THINK_SDK_QQ.APP_KEY'), $openid, $access_token);
            $usrapi_arr['headimg'] = $usrapi_arr['figureurl_qq_2'];
            $usrapi_arr['sex'] = $usrapi_arr["gender"] == "男" ? 1 : 2;
            $openid_field = "openid_qq";
        }
        
        
        if (!$usrapi_arr) {
            echo '{"success":false,"code":200,"msg":"出错了","obj":null,"map":null,"list":null}';
            exit;
        }
        $User = M("users");
		
		//$post=I('post.');
		//\Think\Log::write("post \n" . var_export($post, true));
		
		
        $cj_user_info = M("users")->where("$openid_field='" . $openid . "'")->find();
        if ($cj_user_info) {
            $returnInfo = $cj_user_info;
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
                $User->where(array('userid_int' => $returnInfo["userid_int"]))->save($update);
                if (defined('LOGIN_LOG') && LOGIN_LOG)
                   // \Think\Log::write(D("")->getlastsql() . "User->add \n" . var_export($returnInfo, true));
                $returnInfo['status_int'] = 1;
                $userInfo_str = getUsreJsonStr($returnInfo);
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
            $userinfo['allow_nums'] = C('allow_nums') ? intval(C('allow_nums')) : 30;
            $id = $User->add($userinfo);
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
                echo '{"success":true,"code":200,"msg":"操作成功","obj":{' . $userInfo_str . '},"map":null,"list":null}';
            } else {
                echo '{"success":false,"code":200,"msg":"出错了","obj":null,"map":null,"list":null}';
            }
        }
    }
    public function indexY() {
        import("Org.ThinkSDK.ThinkOauth");
        \Think\Log::write("index \n" . var_export($_POST, true));
        $type = I('get.type', 'qq');
        $sns = \ThinkOauth::getInstance($type);
        $extend = null;
        $code = I('get.code', '');
        //请妥善保管这里获取到的Token信息，方便以后API调用
        //调用方法，实例化SDK对象的时候直接作为构造函数的第二个参数传入
        //如： $qq = ThinkOauth::getInstance('qq', $token);
        $token = $sns->getAccessToken($code, $extend);
        if (defined('LOGIN_LOG') && LOGIN_LOG)
            //\Think\Log::write("getAccessToken: \n" . $token);
        //获取当前登录用户信息
        if (is_array($token)) {
            $user_info = $this->qq($token);
        }
    }
    //登录成功，获取腾讯QQ用户信息
    public function qq($token) {
        //import("ORG.ThinkSDK.ThinkOauth");
        $qq = \ThinkOauth::getInstance('qq', $token);
        $data = $qq->call('user/get_user_info');
        if (defined('LOGIN_LOG') && LOGIN_LOG)
            //\Think\Log::write("user/get_user_info \n" . var_export($data, true));
        if ($data['ret'] == 0) {
            $userInfo['type'] = 'QQ';
            $userInfo['name'] = $data['nickname'];
            $userInfo['nick'] = $data['nickname'];
            $userInfo['head'] = $data['figureurl_2'];
            $userInfo['gender'] = $data ["gender"];   // hcc
            $userInfo['openid'] = $qq->openid();
            return $userInfo;
        } else {
            throw_exception("获取腾讯QQ用户信息失败：{$data['msg']}");
        }
    }
}
