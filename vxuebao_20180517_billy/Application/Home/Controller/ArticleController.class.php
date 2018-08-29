<?php
namespace Home\Controller;
use Think\Controller;
 
class ArticleController extends Controller {
   
	public function index(){
		$type=I('type',0,'int');
		$data=M('article')->where(array('type'=>$type))->select();
		echo json_encode(array("success" => true, "code" => 200, "msg" => "获取成功!", "obj" => null, "map" => null, "list" => $data));
	}
	
	public function show(){
		$id=I('id',0,'int');
		$data=M('article')->where(array('id'=>$id))->find();
		echo json_encode(array("success" => true, "code" => 200, "msg" => "获取成功!", "obj" => null, "map" => null, "list" => $data));
	}
	
	public function appmsg(){
		if(IS_POST){
			$data['title']	=I('title');
			$data['type']	=9;
			$data['pic']	=' ';
			$data['content']=I('content');
			$data['create_time']=time();
			$rs=M('article')->add($data);
			if($rs){
				echo json_encode(array("success" => true, "code" => 200, "msg" => "留言成功!", "obj" => null, "map" => null, "list" => null));
			}
		}
	}
	
	public function appsystem(){
		$data=F('app/system');
		echo json_encode(array("success" => true, "code" => 200, "msg" => "获取成功!", "obj" => $data, "map" => null, "list" => null));
	}
	
}
?>
