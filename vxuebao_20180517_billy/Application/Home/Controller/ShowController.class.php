<?php
namespace Home\Controller;
use Think\Controller;

class ShowController extends Controller{
	public function index(){
		$app=I('app');
		if(session('userid')&&$app==''){
			//redirect('/#/main');
			$this->assign('use',1);
		}
		//logo
		$ad=M('ad');
        $logourl=$ad->where(array('type'=>1))->getField('url');
		$_scene = M('scene');
		
		$type=I('type',0,'int');
		$class=I('class');
		$biz_id=I('biz_id',0,'int');
		$tagid=I('tagid',0,'int');
		//$order='sceneid_bigint desc';
		$order = 'updateTime desc';
		
		//$pageshowsize = I('get.pageSize',6);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
		if(C('HOME_PAGESIZE')){
			$pageshowsize=intval(C('HOME_PAGESIZE'));
		}
		
		$where['delete_int']  = 0;
		$where['userid_int'] = 1687;

		
		//$where['applyGuanchan']=2;
		//$where['is_tpl']=0;
		if($type > 0)
		{
			$where['scenetype_int']  = $type<10 ?'10'.$type : $type;
		}

		
		/*if($class=='tuijian'||($class==''&&$biz_id==0&&$tagid==0)){	//广场推荐
			$where['applyGuanchan']=2;
		}elseif($class=='new'){		//最新
			$order='sceneid_bigint desc';
		}elseif($class=='hot'){		//最热
			$order='hitcount_int desc,sceneid_bigint desc';
		}*/
		/*修改*/
		$where['scenetype_int'] = 101;
		/*if($biz_id>0){
			$tagwhere['type_int']=2;
			$tagwhere['biztype_int']=$biz_id;
			
		}*/
		$tagwhere['type_int']=2;
		$tagwhere['biztype_int'] = 101;
		$tags=M('tag')->where($tagwhere)->order('groupid_int asc,sort asc, tagid_int asc')->select();
		$this->assign('tags',$tags);


		if($tagid>0){
			$where['tagid_int']=$tagid;
		}else{
			//$where['tagid_int']=array('gt',1);
		}
		
		//搜索
		if(I('search_type','','strip_tags')){
			$where['scenename_varchar'] = array('like', '%' . trim($_POST['search_type']) . '%');
			$where['applyGuanchan'] = 0;
		}

		$where['islongpage']=0;
		//dump($where);die;
		$count=$_scene->where($where)->count();
		//echo $count;die;
		
		$p = getpage($count,8);
		$show  = $p->show();// 
		//pre($where); die();
		$_scene_list=$_scene->field('sceneid_bigint,scenecode_varchar,scenename_varchar,userid_int,scenetype_int,hitcount_int,thumbnail_varchar,desc_varchar')->where($where)->order($order)->limit($p->firstRow.','.$p->listRows)->select();
		$user = M('users')->field('userid_int,uname')->where(array('userid_int' => 1687))->find();

		//dump($_scene_list);
		//echo $_scene->getLastsql();
		for($i=0;$i<count($_scene_list);$i++){
			$_scene_list[$i]['uname'] = $user['uname'];
		}
		

		$this->assign('class',$class);
		$this->assign('biz_id',$biz_id);
		$this->assign('tagid',$tagid);
		$this->assign('list',$_scene_list);
		$this->assign('page',$show);
		$this->assign('logo','/Uploads'.$logourl);
		if($app=='app'){
			header('Content-type: text/json');
			echo json_encode(array("success" => true, "code" => 200, "msg" => "操作成功", "obj" => null, "map" => null, "list" => $_scene_list));
		}else{
			$this -> display();
		}
	}
}
?>