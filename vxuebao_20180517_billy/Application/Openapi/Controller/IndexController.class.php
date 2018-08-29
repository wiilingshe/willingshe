<?php
namespace Openapi\Controller;
use Think\Controller;
class IndexController extends Controller {
    
	//测试登陆请求，成功设置session，返回success的json
	public function login(){
		header('Content-type: text/json');
		$app_key=I('app_key',0,'int');
		$timestamp=I('timestamp',0,'int');
		$signature=I('signature');
		$app_secret=M('open')->where(array('app_key'=>$app_key,'ok'=>1))->getField('app_secret');
		
		if($app_secret){	//app_secret查找
			$getsignature=md5($app_key.$timestamp.$app_secret);
			print_r();
			if(abs($timestamp-time())>600){	//时间校验
				echo $_GET['callback'] . "(".json_encode(array("success" => false, "code" => 401, "msg" => "超时!", "obj" => null, "map" => null, "list" => null)).")";
				exit;
			}
			if($signature!=$getsignature){//签名校对
				echo $_GET['callback'] . "(".json_encode(array("success" => false, "code" => 401, "msg" => "签名有误!", "obj" => null, "map" => null, "list" => null)).")";
				exit;
			}else{
				$returnInfo = M('users')->where(array('userid_int'=>$app_key))->find();
				if(!$returnInfo){
					echo $_GET['callback'] . "(".json_encode(array("success" => false, "code" => 401, "msg" => "APP_key有误!", "obj" => null, "map" => null, "list" => null)).")";
					exit;
				}
				if (intval($returnInfo['end_time']) > 0 && $returnInfo['end_time'] < time()) {
						echo $_GET['callback'] . "(".'{"success":false,"code":1004,"msg":"您的账号已过期，请与管理员联系","map":{"isValidateCodeLogin":false}}'.")";
					}else {
					    if ($returnInfo['last_session_id']) {
                            M('session')->where(array('session_id'=>$returnInfo['last_session_id']))->delete();
                        }
						session('userid', $returnInfo["userid_int"]);
						session('name', $returnInfo["uname"]);
						session('username', $returnInfo["uname"]);
						session('phone', $returnInfo['phone']);
						session('level_int', $returnInfo["level_int"]);
						session('type', $returnInfo["type"]);
						session('email', $returnInfo["email_varchar"]);
						session('companyid', $returnInfo["companyid"]);
						session('company_ext', $returnInfo["company_ext"]);
                        header('HTTP/1.1 200 ok');
                        
						$userInfoStr = getUsreJsonStr($returnInfo);
						echo $_GET['callback'] . "(".'{"success":true,"code":200,"msg":"success","obj":{' . $userInfoStr . '},"map":null,"list":null}'.")";
				}
				exit;
			}		
		
		}else{
			echo $_GET['callback'] . "(".json_encode(array("success" => false, "code" => 400, "msg" => "签名有误!", "obj" => null, "map" => null, "list" => null)).")";
			exit;
		}

    }
	
	//课件的基本资料（编号  code  标题  缩略图  描述）
/*	public function scene(){
		header('Content-type: text/json');
		$userid=(int)session('userid');
		if($userid==0){
			exit($_GET['callback'] . "(".'{"success":false,"code":1001,"msg":"请先获取登陆权限","obj":null,"map":null,"list":null}'.")");
		}
		$sceneid=I('sceneid',0,'int');
		if($sceneid<=0){
			exit($_GET['callback'] . "(".'{"success":false,"code":1004,"msg":"服务器异常","obj":null,"map":null,"list":null}'.")");
		}
		$data=M('scene')->field('sceneid_bigint as sceneid,scenecode_varchar as scenecode,scenename_varchar as scenename,desc_varchar as scenedesc,thumbnail_varchar as thumbnail')->where(array('userid_int'=>$userid,'sceneid'=>$sceneid))->find();
		$js['success']=true;
		$js['code']=200;
		$js['msg']='success';
		$js['obj']=$data;
		$js['map']=null;
		$js['list']=null;

		echo $_GET['callback'] . "(".json_encode($js).")";
				
	}
*/	
	public function create(){
		$returnInfo = D("Scene")->addscene();
	}
	
	
}
?>