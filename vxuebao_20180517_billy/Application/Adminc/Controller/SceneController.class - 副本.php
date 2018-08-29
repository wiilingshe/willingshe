<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class SceneController extends BaseController {
	public function index() {
		$_scene = M('scene');
		
		$biztype_int = I('biztype_int', 0,'int');	//大分类
		if ($biztype_int > 0) {
			$where['biztype_int'] = $biztype_int;
		}
		$this->assign('biztype_int',$biztype_int);


		$tagid_int = I('tagid_int', 0,'int');	//小分类
		if ($tagid_int > 0) {
			$where['tagid_int'] = $tagid_int;
		}
		$this->assign('tagid_int',$tagid_int);

		//搜索框
		$field=I('post.field','');
		$keyword=I('post.keyword','');
		if($keyword){
			$where[$field]  = array('like','%'.$keyword.'%');
			$this->assign('field',$field);  
			$this->assign('keyword',$keyword);  
		}
		
		
		$user_id = intval(I('user_id'));
		$order='sceneid_bigint'; 
		if($user_id){
			$where['cj_scene.userid_int']  = $user_id;
			$ui['scene_anli'] = 'active';	$ui['anli_index'] ='active';
		}else{
			$flag=I('get.flag');		//参数
			$apply=I('get.apply');		//0未申请 1待审  2通过  -1拒绝
			
			$this->assign('flag',$flag);
			$this->assign('apply',$apply);
			
			//is_tpl=1  模板（申请/未申请）  2首页推荐案例  3微课广场案例  4设计师案例
			if($flag=='designer'){	//设计师	
				$where['is_tpl']	= 4;				
				$where['user_type']	=array('GT',0);	//大于0位设计师作品
				$ui['designer'] = 'active';
				$title='设计师案例';
				if(''!=$apply){
					$where['applyPromotion']	= $apply;
				}else{
					$where['applyPromotion']	= array('LT',2);
				}
				$order='applyPromotion desc,sceneid_bigint';
			}elseif($flag=='indextj'){//首页推荐
				$where['is_tpl']	= 2;
				$title='首页推荐案例';
				$ui['indextj'] = 'active';
				if(''!=$apply){
					$where['applyIndex']	= intval($apply);
				}else{
					$where['applyIndex']	= array('LT',2);
				}
				$order='applyIndex desc,sceneid_bigint';
			}elseif($flag=='guanchan'){//微课广场推荐
				$where['is_tpl']	= 3;
				$title='微课广场推荐案例';
				$ui['guanchan'] = 'active';
				if(''!=$apply){
					$where['applyGuanchan']	= intval($apply);
				}else{
					$where['applyGuanchan']	= array('LT',2);
				}
				$order='applyGuanchan desc,sceneid_bigint';
			}elseif($flag=='sysmb'){//系统模板
				$where['is_tpl']	= 1;
				$title='系统模板';
				$ui['sysmb'] = 'active';
				if(''!=$apply){
					$where['applyTemplate']	= intval($apply);
				}else{
					$where['applyTemplate']	= array('LT',2);
				}
				//pre($where);die;
				$order='applyTemplate desc,sceneid_bigint';
			}else{//全部
				$ui['all'] = 'active';
				$title='所有用户案例';
				if(''!=$apply){
					$where['applyPromotion']	= intval($apply);
				}else{
					$where['applyPromotion']	= array('LT',2);
				}
			}
			
			if(2==$apply){
					$ui['shenqin_scene'] = 'active';
				}else{
					$ui['scene_anli'] = 'active';
				}
			
		}

		$count = $_scene -> where($where) -> count();
		$p = getpage($count, 10);
		$list = $_scene -> where($where) -> order($order)->join('left JOIN cj_users ON cj_users.userid_int = cj_scene.userid_int' ) -> limit($p -> firstRow, $p -> listRows) -> select();
		//echo $_scene->getLastsql();
		//die;
		$this->assign('ui',$ui); 
		$this -> assign('title', $title);
		$this -> assign('select', $list);
		$this -> assign('page', $p -> show());

		//大小分类
		$list=M('dtag')->where("type='scene_type'")->order('sort asc,id asc')->select();		
		$biztypeId=intval($biztype_int)>0?intval($biztype_int):$list[0]['value'];
		$slist=M('tag')->where("type_int=2 and biztype_int=".$biztypeId)->order('tagid_int asc')->select();
		$this->assign('scene_type_list', $list); 
		$this->assign('scene_type_list2', $slist); 

		$this -> display($display);
		
	}
	
	
	public function lists() {
		$_scene = M('scene');
		//$scenetype = intval(I('get.tagId', 0));
		$where['scenetype_int']  = intval(I('get.fnid'));
		if ($scenetype > 0) {
			$where['tagid_int'] = $scenetype;
		}
		if (I('get.flag') == 'useranli') {
			$where['userid_int'] = array('gt', 0);
		} else {
			$where['userid_int'] = 0;

		}
		$count = $_scene -> where($where) -> count();
		$p = getpage($count, 10);
		$list = $_scene -> where($where) -> order('sceneid_bigint  desc') -> limit($p -> firstRow, $p -> listRows) -> select();

		$ui['scene_index'] = 'active';
        $this->assign('ui',$ui);
		$this -> assign('select', $list);
		$this -> assign('page', $p -> show());
		$this->assign('fnid',I('get.fnid')); 
		$this -> assign('flag', I('get.flag', 'sys'));
		$this -> display('index');
	}
	
	
	
	
	
	
	

	public function usercpsystem() {
		if (IS_GET) {

			$returnInfo = D("Scene") -> usercpsystem();
			$this -> success('操作成功',U('scene/index'));
		}
	}

	public function e() {
		$m = M('scene');
		if (IS_POST) {
			$where['sceneid_bigint'] = I('post.id');
			$update_arr = I('post.user');
			if(isset($update_arr['vi_timeout']) && $update_arr['vi_timeout']){
				$update_arr['vi_timeout']=str_replace("\\/", "/", json_encode($update_arr['vi_timeout']));
			}
			$update_arr = array_filter($update_arr);
			//if($update_arr['scenetype_int']<0){unset $update_arr['scenetype_int'] }
	
			$m -> where($where) -> save($update_arr);
			if (I('get.flag') == 'useranli') {
			$this -> success('操作成功', U('/Scene/index/flag/useranli'));
		} else {
			$this -> success('操作成功',U('scene/index'));
			
		}
			
			//$this -> success('操作成功', U ('scene/index'));

		} else {
			
			$where['sceneid_bigint'] = I('get.id');
			$userinfo = $m -> where($where) -> find();
			if(isset($userinfo['vi_timeout']) && $userinfo['vi_timeout']){
				$arr=json_decode($userinfo['vi_timeout']);
				
				$userinfo['vi_timeout']=object_array($arr);
			}
			$this -> assign('user', $userinfo);
			
			$movietypelist=getMovietypeList();
			$this->assign('movietypelist', $movietypelist); 
			
			$list=M('cate')->where("type='scene_type'")->order('sort asc,id asc')->select();
			
			$biztypeId=$userinfo['scenetype_int']?intval($userinfo['scenetype_int']):$list[0]['value'];
			$slist=M('tag')->where("type_int=2 and biztype_int=".$biztypeId)->order('tagid_int asc')->select();
			
			$this->assign('scene_type_list', $list); 
			$this->assign('scene_type_list2', $slist); 
			if($userinfo['is_tpl']==1){
				$ui['scene_index'] = 'active';
			}else{
				$ui['scene_anli'] = 'active';
				}
            $this->assign('ui',$ui);
			$this -> display();
		}
	}

	function del() {
		if (session('adminRole') == 2) {
			$this -> error('您没有相关权限', U('scene/index'));
		}
		if(I('get.id')<1411){
			$this -> error('系统场景，禁止删除!', U('/Scene/index/flag/useranli'));
		}
		$m = M('scene');
		$m -> where('sceneid_bigint=' . $_REQUEST['id']) -> delete();
		if (I('get.flag') == 'useranli') {
			$this -> success('操作成功', U('/Scene/index/flag/useranli'));
		} else {
			$this -> success('操作成功',U('scene/index'));
		}
	}

public function user_anli(){
	if (IS_GET){
		$data=I('get.');
		$_anli = M('scene');
		$where['sceneid_bigint']=I('get.id');
		if(I('get.no')>0){
			$update_arr['showstatus_int']=1;
			$update_arr['showstatus_int']=0;
			$_anli -> where($where) -> save($update_arr);
		}elseif(I('get.no')<1){
		$update_arr['showstatus_int']=1;
		
			$_anli -> where($where) -> save($update_arr);	
		}
		 $this -> success('操作成功', U('/Scene/index/flag/useranli'));
	}
	
			}
 	public function is_showstatus(){
		$m = M('scene'); 
		$where['sceneid_bigint']=I('get.id');
		$update_arr['showstatus_int']= I('get.no')? 0: 1;
		//$update_arr['is_public']= I('get.no')? 0: 1;
		$m->where($where)->save($update_arr);
		
		
		$this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' ); 
	}
	public function is_public(){
		$m = M('scene'); 
		$where['sceneid_bigint']=I('get.id');
		//$update_arr['showstatus_int']= I('get.no')? 2: 1;
		$update_arr['is_public']= I('get.no')? 0: 1;
		$m->where($where)->save($update_arr);
		
		
		$this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' ); 
	}	
	public function shenhe(){
		$m = M('scene'); 
		$where['sceneid_bigint']=I('get.id');
		$update_arr['shenhe']= I('get.no')? 0: 1;
		
		$m->where($where)->save($update_arr);
		
		
		$this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' ); 
	}
	public function shenheOk(){
		$m = M('scene'); 
			$res=array('status'=>1,"info"=>'');
			$where['sceneid_bigint']=I('post.id');
			$update_arr['applyPromotion']= intval(I('post.applystatus'));
		$m->where($where)->save($update_arr);
		 
		 echo json_encode($res);	
	}
	
public function is_anli(){
	if (IS_GET){
		$data=I('get.');
		$_anli = M('scene');
		$where['sceneid_bigint']=I('get.id');
		if(I('get.no')>0){
			
			$update_arr['showstatus_int']=0;
			$_anli -> where($where) -> save($update_arr);
		}elseif(I('get.no')<1){
		 $update_arr['applyPromotion']=1;
		$update_arr['showstatus_int']=1;
			$_anli -> where($where) -> save($update_arr);	
		}
		 $this -> success('操作成功',U('/Scene/index/flag/useranli'));
	}
	
			}
			
 public function Type(){
				   $tag=M('tag'); 
				   $where['biztype_int']=I('get.biztype'); 
				   $where['type_int']=2; 
				   $where['userid_int']=0; 
				   $tagid=$tag->where($where)->select(); 
				   foreach ($tagid as $tagids) { 
				   echo '<option value="'.$tagids['tagid_int'].'">'.$tagids['name_varchar'].'</option>';
		} 
	}
	
	public function getSceneTag(){
		$res=array('status'=>0,"info"=>'');
		$biztypeId=intval(I('get.biztypeId'));
		$type_int=intval(I('get.type_int',2));
		$slist=M('tag')->where("type_int=$type_int and biztype_int=".$biztypeId)->order('tagid_int asc')->select();
		$option='';
		foreach($slist as $v){
			$option.='<option value="'.$v['tagid_int'].'">'.$v['name_varchar'].'</option>';
		}
		$res['status']=1;
		$res['info']=$option;
		
		echo json_encode($res);	
	}
	
		public function hideeqad(){
		$m = M('scene'); 
		$where['sceneid_bigint']=I('get.id');
		$update_arr['hideeqad']= I('get.no')? 1: 0;
		
		$property= $m->where($where)->getField("property");
		
		$update_arr['property']= str_replace('"hideEqAd":false','"hideEqAd":true',$property);
		$m->where($where)->save($update_arr);
		 
		
		 $this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' ); 
	}
        
    public function addpagesys() {
        $model = M('scenepagesys');
        $data3['tagid_int'] = I('tagid');
        $data3['biztype_int'] = 1103;
        $data3['pagecurrentnum_int'] = 0;
        $data3['userid_int'] = 0;
        //$data3['sceneid_bigint'] = $v['sceneId'];
        $data3['content_text'] = I('element','',htmlspecialchars_decode);
        $data3['pagename_varchar'] = I('pagename');
        $filename = I('thumbdata','',md5).".png";
        //dump(substr(I('thumbdata'), 22));
        //dump(base64_decode(substr(I('thumbdata'), 22)));
        $filesize = file_put_contents("./Uploads/syspic/page/".$filename, base64_decode(substr(I('thumbdata'), 22)));      
        //dump($filesize);
        if(!$filesize){
            $this->error('缩略图上传失败');
        }
        $data3['thumbsrc_varchar'] = 'syspic/page/' . $filename;
        $data3['eqsrc_varchar'] = $v['properties']['thumbSrc'];
        $data3['createtime_time'] = date('y-m-d H:i:s', time());
        //print_r($data3);
        //var_dump(file_get_contents("php://input"));
        //$datas = json_decode(file_get_contents("php://input"),true);
        //print_r($datas);
        //dump($datas);
        $r = $model->add($data3);
        if($r){
            $this->success('操作成功');
        }else{
            $this->error('操作失败');
        }
        
    }
    



    public function pagesys() {
        $model = M('scenepagesys');
        $where = " 1 ";
        $tagids = I('tagid',0);
        if($tagids){
            foreach($tagids as $tagid){
                if(!$tagid)                    continue;
                $where .= " and tagid_int like '%$tagid%'";
            }
            $this->assign('issearch','TRUE');            
        }        
        if (isset($_REQUEST['order'])) {
            $order = $_REQUEST['order'];
        }
        if (isset($_REQUEST['sort'])) {
            $_REQUEST['sort'] == 'asc' ? $sort = 'asc' : $sort = 'desc';
        }
        if(!$order){$order = 'pageid_bigint';}
        if(!$sort){$sort = 'desc';}
        $select_str_order[$order] = " selected ";
        $select_str_sort[$sort] = " selected ";
        $this->assign('select_str_order', $select_str_order);
        $this->assign('select_str_sort', $select_str_sort);
        $count = $model->where($where)->count();
        //dump($model->_sql());
        $p = getpage($count, 10);
        $list = $model->where($where)->order('sceneid_bigint desc')->field('pageid_bigint,pagename_varchar,tagid_int,thumbsrc_varchar,listorder')->order("$order $sort")->limit($p->firstRow, $p->listRows)->select();
        $taglist = M('tag')->where('biztype_int in (11001,11002,11003)')->field('tagid_int,name_varchar')->order('tagid_int asc')->select();
        //pre($taglist);
        foreach ($taglist as $tag) {
            $tags[$tag['tagid_int']] = $tag['name_varchar'];
        }
        //pre($tags);
        foreach ($list as $k=>$one) {
            //pre($one);
            $tagarr = explode(",",$one['tagid_int']);
            //pre($tagarr);
            foreach ($tagarr as $tagid) {
                if($tags[$tagid]){
                    $list[$k]['tagstr'] .= $tags[$tagid]." &nbsp; ";
                }else{
                    $list[$k]['tagstr'] = '';
                }
            }
        }
        //pre($list);
        $this->assign('list', $list);        
        $ui = array('File_index' => 'active');
        $this->assign('ui', $ui);
        $this->assign('page', $p->show());
        $this->display();
    }
    
    public function editpagesys(){
        if (IS_POST) {
            $upload = new \Think\Upload(); // 
            $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
            $upload->savePath = '/syspic/page/';
            $info = $upload->upload();

            if ($info) {                
                $data['thumbsrc_varchar'] = $info['photo2']['savepath'] . $info['photo2']['savename'];
                $data['thumbsrc_varchar'] = substr($data['thumbsrc_varchar'], 1);
            }
            $data['pageid_bigint'] = I('pageid',0,'intval');
            $posttagid = I('tagid');
            foreach($posttagid as $k=>$tag){
                if(!$tag) unset($posttagid[$k]);
            }
            $data['tagid_int'] = implode(",",$posttagid);                    
            $data['pagename_varchar'] = I('pagename');
            M('scenepagesys')->save($data);
            //echo M('scenepagesys')->_sql();
             $url = "/adminc.php?s=/scene/pagesys/p".'/'.I('get.p');
            	$this->success('修改成功',"$url");
            //$this->success('修改成功',U('Scene/pagesys'));
        } else {
            $info = M('scenepagesys')->find(I('pageid', 0, 'intval'));
            $this->assign('info', $info);
            $ui = array('File_index' => 'active');
            $this->assign('ui', $ui);
            for($i=11001;$i<=11003;$i++){
                $taglist[$i] = M('tag')->where("`biztype_int`=$i")->field('tagid_int,name_varchar')->order('tagid_int asc')->select();
            }
            $this->assign('taglist',$taglist);
            $this->display();
        }
    }
    
    public function delpagesys(){
        if($pageid = I('pageid',0,'intval')){
            if(M('scenepagesys')->delete($pageid)){
                $this->success('删除成功');
            }else{
                $this->error('删除失败');
            }            
        }
    }
    
    public function listorder(){
        if(IS_POST){
           foreach ($_POST['listorder'] as $id=>$order) {
                M('scenepagesys')->where(array('pageid_bigint' => $id))->setField('listorder', $order);
            }
            $this->success('排序成功'); 
        }
    }

}
