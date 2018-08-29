<?php
namespace Home\Controller;
use Think\Controller;

class UploadsController extends Controller {
	
	public function index(){
		$sessionid=I('sessionid','');
		$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		if(intval($userid)==0 || $sessionid==''){
			header('Content-type: text/json');
			echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录或超时，请重新登陆!", "obj" => null, "map" => null, "list" => null));
			exit;
		}
		if(IS_POST){
			$userid=I("userid");
			//$imgs=I('image');
			
			//$userid=0;
			//$data=F('post');
			$str=I('image');
			
			$images=explode(",",$str);
			$arr=array();
			$path='pic/'.$userid.'/'.date("Ym/");
			mkdir('Uploads/'.$path,0777,true);
			foreach($images as $k=>$v){
				if(strlen($v)>50){
					$img =base64_decode($v);
					$f=uniqid().mt_rand(1000,9999).'.jpg';
					$arr[]=$path.$f;
					file_put_contents("Uploads/".$path.$f,$img);
				}
			}
			echo json_encode(array("success" => true,"code"=> 200,"msg" => "上传成功!","obj"=> null,"map"=> null,"list"=> $arr));
		}
	}
	
}

?>