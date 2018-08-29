<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
	
	
	public function index(){

	$mobileAgent = array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");
	//读取用户的浏览器资料
	$browser = $_SERVER['HTTP_USER_AGENT'];
	$isMobile = false;
	  
	//检查开始
	foreach($mobileAgent as $search){
		if(stristr($browser,$search)!=false){
			$isMobile = true;
			//echo $search;
			//程式码(转址)
			//header("Location: http://www.vxuebao.com/m/");
			//停止运行程序
			exit;
		}
	}
		//$mt=I('mb','index5_4');
	
		//logo
		if(session('userid')){
			$this->display('index6_0');
		}else{
			$ad=M('ad');
			$logourl=$ad->where(array('type'=>1))->getField('url');
			//banner
			$banner=$ad->where(array('type'=>2))->order("sort desc,id desc")->select();
			
			//友情链接
			$links=$ad->where(array('type'=>4))->select();
			
			$_scene = M('scene');
			$where['applyIndex']=2;
			$where['islongpage']=0;
			$_scene_list =$_scene->field('sceneid_bigint,scenecode_varchar,scenename_varchar,thumbnail_varchar')->where($where)->order('rank desc,sceneid_bigint desc')->limit(C('HOME_PAGESIZE')-1)->select();
			//if(session('userid')){
				/*echo "<script>var location_href = location.href;if(location_href.indexOf('usercenter/member') > -1){location.href = 'http://".$_SERVER['HTTP_HOST']."/main-index.html#/usercenter/member';}</script>";*/
				//echo "<script>var location_href = location.href.split('#')[1];if(location.href.indexOf('#/') > 0){location.href = 'http://".$_SERVER['HTTP_HOST']."/main-index.html#'+location_href;}< /script>";
				//$this->assign('use',1);
			//}
			$this->assign('logo','/Uploads'.$logourl);
			$this->assign('banner',$banner);
			$this->assign('links',$links);
			$this->assign('pro',$_scene_list);
			//$this->display('index5_4');
			$this->display('myindex');   //index3_9 index4_1 index4_2 
		
		}
	} 
	
	
	
    public function jumpgo(){
		header("Location: ".I("get.url"));
    }
	
    public function login(){
		header('Content-type: text/json');
		header('HTTP/1.1 401 Unauthorized');
		echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
		//header('HTTP/1.1 200 ok');
		//echo json_encode(array("success" => true,"code"=> 200,"msg" => "success","obj"=> null,"map"=> null,"list"=> null));
    }
	public function test(){
		echo C('THINK_SDK_QQ.APP_KEY');
		$this->display(); 
		
	}

	/**
	 * [elearning 登录接口]
	 * @return [type] [description]
	 */
	public function elearning(){
		header('Content-type: text/json');
		$app_key=I('app_key',0,'int');
		$timestamp=I('timestamp',0,'int');
		$signature=I('signature','');
		$userid=I('userid');
		//echo 'app_key：',$app_key,' timestamp：',$timestamp,' signature：',$getsignature,' userid：',$userid;
		//die;
		if($app_key<=0 || $timestamp<=0 || $signature=='' || $userid==''){
			$this->error('参数有误');
		}

		if(abs($timestamp-time())>600){	//时间校验
				$this->error('已超时');
		}

		$app_secret=M('open')->where(array('app_key'=>$app_key,'ok'=>1))->getField('app_secret');
		
		if(!$app_secret){	//app_secret查找
			$this->error('秘钥有误');
		}

		$getsignature=md5($app_key.$timestamp.$app_secret);
		if($signature!=$getsignature){//签名校对
			$this->error('签名有误');
		}

		$returnInfo=M('users')->where(array('email_varchar'=> 'elearning-'.$userid))->find();
		if($returnInfo){
			session('userid', $returnInfo["userid_int"]);
			session('name', $returnInfo["uname"]);
			session('username', $returnInfo["uname"]);
			session('phone', '13333333333');
			session('level_int', 0);
			session('type', 21);
			session('email', $returnInfo["email_varchar"]);
			session('companyid', $returnInfo["companyid"]);
			session('company_ext', $returnInfo["company_ext"]);
			$this->success('登录成功1',U('/#/main'));
		}else{
			
			$d['deptid']=0;
			$d['email_varchar']='elearning-'.$userid;
			$d['uname']='elearning-'.$userid;
			$d['type']=21;
			$d['companyid']=692;
			$d['create_time']=date('y-m-d H:i:s',time());
			$d['last_time']=date('y-m-d H:i:s',time());
			$d['createip_varchar']=get_client_ip();
			$d['lastip_varchar']=get_client_ip();
			$d['end_time']= time() + 10*365*24*60*60;
			$d['password_varchar']=md5($d['email_varchar'].$d['create_time']);
			$d['company_ext']='{"data_permiss":[true,true,true],"is_audit":"false","is_integral":"false","integral_num":0}';
			$id=M('users')->add($d);
			$d['userid_int']=$id;

			session('userid', $d['userid_int']);
			session('name', $d['uname']);
			session('username', $d['uname']);
			session('phone', '13333333333');
			session('level_int',0);
			session('type', 21);
			session('email', $d['email_varchar']);
			session('companyid',692);
			session('company_ext', $d['company_ext']);
			$this->success('登录成功0',U('/#/main'));
		}

	}
}