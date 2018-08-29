<?php
namespace Home\Controller;
use Think\Controller;
 
class DanmuController extends Controller {
	
	public function _initialize() {
        header('Content-type: application/json;charset=UTF-8');
    }
	
	public function unlogin() {
		$sessionid=I('get.sessionid','');
		if($sessionid==''){
			if (intval(session('userid')) == 0) {
				header('Content-type: text/json');
				header('HTTP/1.1 401 Unauthorized');
				echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录!", "obj" => null, "map" => null, "list" => null));
				exit;
			}
		}else{
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
			if(intval($userid)==0){
				header('Content-type: text/json');
				echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录或超时，请重新登陆!", "obj" => null, "map" => null, "list" => null));
				exit;
			}
		}
    }

   
	public function index(){
		$this->display();		
	}
	
	//保存留言
	public function save(){
	//$this->unlogin();
		$userid=(int)session('userid');
		$sceneid=I('sceneid',0,'int');
		$content=I('content','');
		if($sceneid<=0 || $content==''){
			echo json_encode(array("success" => false, "code" => 400, "msg" => "请输入留言内容!", "obj" => null, "map" => null, "list" => null));
			exit;
		}
		if($userid>0){
			$headimg=M('users')->where(array('userid_int'=>$userid))->getField('headimg');
			$data['userid']	=$userid;
		}else{
			//$headimg='defaultuser.jpg';
			$headimg = I('post.headimg');
			$data['userid']	=0;
		}
		$data['sceneid']=$sceneid;
		$data['headimg']=$headimg;
		$data['content']=$content;
		$data['addtime']=time();
		$data['isok']	=1;
		$rs=M('danmu')->add($data);
		if($rs){
			echo json_encode(
				array("success" => true,
				"code" => 200,
				"msg" => "留言成功",
				"obj" => null,
				"map" => null,
				"list" => null
				)
			);
		}else{
			echo json_encode(
				array("success" => false,
				"code" => 404,
				"msg" => "留言失败",
				"obj" => null,
				"map" => null,
				"list" => null
				)
			);
		}
		
		
	}
	
	//课件留言列表
	public function view(){
		$sceneid=I('sceneid',0,'int');
		if($sceneid<=0){
			echo json_encode(array("success" => false, "code" => 400, "msg" => "课件编号获取失败!", "obj" => null, "map" => null, "list" => null));
			exit;
		}
		$data=M('danmu')->where(array('sceneid'=>$sceneid))->order('id desc')->select();
		if($data){
			echo json_encode(
				array("success" => true,
				"code" => 200,
				"msg" => "获取成功",
				"obj" => null,
				"map" => null,
				"list" => $data
				)
			);
		}else{
			echo json_encode(
				array("success" => false,
				"code" => 404,
				"msg" => "获取失败",
				"obj" => null,
				"map" => null,
				"list" => null
				)
			);
		}
	}
	
}
?>
