<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class SceneController extends BaseController {
	public function index() {
		$_scene = M('scene');
		$where['islongpage']=I('islongpage',0,'int');
		$biztype_int = intval(I('biztype_int'));	//大分类
		if ($biztype_int > 0) {
			$where['scenetype_int'] = $biztype_int;
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

		$user_id = intval(I('get.user_id'));
		$order='sceneid_bigint desc'; 
		if($user_id){
			$where['cj_scene.userid_int']  = $user_id;
			$ui['scene_anli'] = 'active';	$ui['anli_index'] ='active';
			$where['delete_int']  = 0;
		}else{
			$flag=I('get.flag');		//参数
			$apply=I('apply',0,'int');		//0未申请 1待审  2通过  -1拒绝
			
			$this->assign('flag',$flag);
			$this->assign('apply',$apply);
			$where['delete_int']  = 0;
			//is_tpl=1  模板（申请/未申请）  2首页推荐案例  3微课广场案例  4设计师案例
			if($flag=='designer'){	//设计师	
				//$where['is_tpl']	= 4;				
				$where['user_type']	=array('GT',0);	//大于0位设计师作品
				$ui['designer'] = 'active';
				$title='设计师案例';
				if(0!=$apply){
					$where['applyPromotion']	= $apply;
				}else{
					$where['applyPromotion']	= array('LT',3);
				}
				$order='applyPromotion desc,sceneid_bigint desc';
			}elseif($flag=='indextj'){//首页推荐
				//$where['is_tpl']	= 2;
				$title='首页推荐案例';
				$ui['indextj'] = 'active';
				if(0!=$apply){
					$where['applyIndex']	= intval($apply);
				}else{
					$where['applyIndex']	= array('NEQ',0);
				}
				$order='applyIndex desc,sceneid_bigint desc';
			}elseif($flag=='guanchan'){//微课广场推荐
				//$where['is_tpl']	= 3;
				$title='微课广场推荐案例';
				$ui['guanchan'] = 'active';
				if(0!=$apply){
					$where['applyGuanchan']	= intval($apply);
				}else{
					$where['applyGuanchan']	= array('NEQ',0);
				}
				$order='applyGuanchan desc,sceneid_bigint desc';
			}elseif($flag=='sysmb'){//系统模板
				$where['is_tpl']	= 1;
				$title='系统模板';
				$ui['sysmb'] = 'active';
				if(0!=$apply){
					$where['applyTemplate']	= intval($apply);
				}else{
					$where['applyTemplate']	= array('NEQ',0);
				}
				//pre($where);die;
				$order='applyTemplate desc,sceneid_bigint desc';
			}else{//全部
				$ui['all'] = 'active';
				$title='所有用户案例';
				if(0!=$apply){
					$where['applyPromotion']	= intval($apply);
				}else{
					$where['applyPromotion']	= array('LT',3);
				}
			}
			//dump($where);die;
			if(2==$apply){
				$ui['shenqin_scene'] = 'active';
			}else{
				$ui['scene_anli'] = 'active';
			}
			
		}

		$count = $_scene -> where($where) -> count();
		$p = getpage($count, 10);
	
		$list = $_scene -> where($where) -> order('sceneid_bigint desc')->join('left JOIN cj_users ON cj_users.userid_int = cj_scene.userid_int' ) -> limit($p -> firstRow, $p -> listRows) -> select();
		//pre($list);die();
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
		$this->assign('islongpage', I('islongpage')); 

		$this -> display();
		
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
		$where['islongpage']=0;
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
			$this -> success('操作成功');
		} else {
			
			$this -> success('操作成功');
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
		
		
		$this->success ( '操作成功' ); 
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
		$flag=I('flag');
		
		$res=array('status'=>1,"info"=>'');
			$where['sceneid_bigint']=I('post.id');
			if('sysmb'==$flag){	//系统模板
				$update['applyTemplate']=intval(I('post.applystatus'));
				$update['is_tpl']=1;
			}else if('designer'==$flag){//设计师案例
				$update['applyPromotion']=intval(I('post.applystatus'));
				$update['is_tpl']=4;
			}else if('indextj'==$flag){//推荐到首页
				$update['applyIndex']=intval(I('post.applystatus'));
				$update['is_tpl']=2;
			}else if('guanchan'==$flag){//微课广场推荐
				$update['applyGuanchan']=intval(I('post.applystatus'));
				$update['is_tpl']=3;
			}
			$update_arr[]= intval(I('post.applystatus'));
		$m->where($where)->save($update);
		// echo $m->getLastsql();
		 //die;
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
		$islong=I('islong',0,'int');
        $data3['tagid_int'] = I('tagid');
        $data3['biztype_int'] = 1103;
        $data3['pagecurrentnum_int'] = 0;
        $data3['userid_int'] = 0;
		
		$data3['islong'] = I('islong',0,'int');
		
        $data3['content_text'] = I('element','',htmlspecialchars_decode);
        $data3['pagename_varchar'] = I('pagename');
        $filename = I('thumbdata','',md5).".png";
        //dump(substr(I('thumbdata'), 22));
        //dump(base64_decode(substr(I('thumbdata'), 22)));
        if($islong){
       		$filestring = M('scene')->field('cj_scene.property,cj_scenepage.properties_text,cj_scene.sceneid_bigint')->where(array('cj_scene.scenecode_varchar'=>I('post.code')))->join('cj_scenepage ON cj_scene.sceneid_bigint = cj_scenepage.sceneid_bigint')->find();
       		$data3['properties_text'] = $filestring['properties_text'];
       		$data3['sceneid_bigint'] = $filestring['sceneid_bigint'];
        	$filegroup = json_decode($filestring['property'],true);
        	$filename =  substr($filegroup['temp'],8); 
        	$filesize = 1;
        }else{
        	$filesize = file_put_contents("./Uploads/syspic/page/".$filename, base64_decode(substr(I('thumbdata'), 22)));      
        }
        //dump($filesize);
        if(!$filesize){
            $this->error('缩略图上传失败');
        }
        if($islong){
        	$data3['thumbsrc_varchar'] = $filename;
        }else{
        	$data3['thumbsrc_varchar'] = 'syspic/page/' . $filename;
        }
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
        $order2 = 'listorder';
        $sort2 = 'desc';
        $select_str_order[$order] = " selected ";
        $select_str_sort[$sort] = " selected ";
        $this->assign('select_str_order', $select_str_order);
        $this->assign('select_str_sort', $select_str_sort);
        $count = $model->where($where)->count();
        //dump($model->_sql());
        $p = getpage($count, 10);
        $list = $model->where($where)->order("$order2 $sort2,$order $sort")->field('pageid_bigint,pagename_varchar,tagid_int,thumbsrc_varchar,listorder')->limit($p->firstRow, $p->listRows)->select();
		//echo $model->getlastsql();die;
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
	
	
	//导出单页模板
	public function syspageexport2(){
	
		C('DB_PARAMS',array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL));
		$id=isset($_POST['id'])?$_POST['id']:$_GET['id'];
		$p=I('p',1,'int');
		echo '共'. M('scenepagesys')->field('pageid_bigint')->count();
		echo "条 ， <br>正在到处第 $p 页";
		$id=M('scenepagesys')->field('pageid_bigint')->page($p,10)->select();
		
		$id=array_column($id,'pageid_bigint');
		if(count($id)==0){
			echo '全部导出成功';die;
		}
		echo '<br>';
		//print_r($id); 
		if(!is_array($id)|| isset($id)==false){
			$this->error('请选择需要导出的模板');
		}
		$ids=implode(',',$id);
		//文件夹目录
		$dest_dir = './Uploads/Syspagetpl/'.md5($ids).'/';
		//sql文件
		$filename =	$dest_dir.'data.sql';
		
        //删除已生成的数据
        if (is_dir($dest_dir)) {
            delDirAndFile($dest_dir,true);
        }
		@unlink('./Uploads/Syspagetpl/'.md5($ids).'.zip');
        $mkdirresult = makeDir($dest_dir);

		if (!$mkdirresult)
            exit($dest_dir . "文件夹生成失败,请检查权限");
		$sql="";
		if ($file = fopen($filename, 'wb')) {
			$rs=M('scenepagesys')->where('pageid_bigint in ('.$ids.')')->select();
			$n=count($rs);
			for($i=0;$i<$n;$i++){
				$sql.= "INSERT INTO `{pre}scenepagesys` (sceneid_bigint,scenecode_varchar,pagecurrentnum_int,createtime_time,content_text,pagename_varchar,userid_int,biztype_int,tagid_int,thumbsrc_varchar,eqsrc_varchar,eqid_int,usecount_int,listorder) VALUES ('".$rs[$i]['sceneid_bigint']."','1','".$rs[$i]['pagecurrentnum_int']."','".$rs[$i]['createtime_time']."','".addslashes($rs[$i]['content_text'])."','".$rs[$i]['pagename_varchar']."','".$rs[$i]['userid_int']."','".$rs[$i]['biztype_int']."','".$rs[$i]['tagid_int']."','".$rs[$i]['thumbsrc_varchar']."','".$rs[$i]['eqsrc_varchar']."',0,0,0);\r\n";
			
			if (!empty($rs[$i]['thumbsrc_varchar'])) {
				makeDir(dirname($dest_dir . $rs[$i]['thumbsrc_varchar']));
				$r = copy('./Uploads/' . $rs[$i]['thumbsrc_varchar'], $dest_dir . $rs[$i]['thumbsrc_varchar']);
			}
			
			$arrjsondata[$i] = json_decode($rs[$i]['content_text'], 1);
			//print_r($arrjsondata);
			foreach ($arrjsondata[$i] as $list) {
				//图片
				if (!empty($list['properties']['src'])) {
					makeDir(dirname($dest_dir . $list['properties']['src']));
					$r = copy('./Uploads/' . $list['properties']['src'], $dest_dir . $list['properties']['src']);
				}
				//背景
				if (!empty($list['properties']['imgSrc'])) {
					makeDir(dirname($dest_dir . $list['properties']['imgSrc']));
					$r = copy('./Uploads/' . $list['properties']['imgSrc'], $dest_dir . $list['properties']['imgSrc']);
				}
				//音乐
				if (!empty($list['sound']['src'])) {
					makeDir(dirname($dest_dir . $list['sound']['src']));
					$r = copy('./Uploads/' . $list['sound']['src'], $dest_dir . $list['sound']['src']);
				}
				//图集
				if (!empty($list['properties']['children'])) { //如果有图集
					foreach ($list['properties']['children'] as $children) { //循环图集数组
						makeDir(dirname($dest_dir . $children['src'])); //生成目标路径
						$r = copy('./Uploads/' . $children['src'], $dest_dir . $children['src']); //拷贝图集图片到目的路径
					}
				}
			}
		}
			
			file_put_contents($filename,$sql);
			
			$fn='Uploads/Syspagetpl/'.md5($ids).'.zip';
			$f='Uploads/Syspagetpl/'.md5($ids).'/';
			
			import('Org.Util.PclZip');
			$archive = new \PclZip($fn);
			$list = $archive->create($f,PCLZIP_OPT_REMOVE_PATH, $f);
			
			if ($list==0)
				$this->error('压缩失败');
			//$this->success('<iframe src="' . __ROOT__ . $fn. '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);
			$this->redirect('Scene/syspageexport', array('p' => $p+1), 3, '导出成功，如需下载请找管理员FTP批量下载。'.time());
			
			
		}
	}
	//导出单页模板
	public function syspageexport(){
		C('DB_PARAMS',array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL));
		$id=isset($_POST['id'])?$_POST['id']:$_GET['id'];
		if(!is_array($id)|| isset($id)==false){
			$this->error('请选择需要导出的模板');
		}
		$ids=implode(',',$id);
		
		//文件夹目录
		$dest_dir = './Uploads/Syspagetpl/'.md5($ids).'/';
		//sql文件
		$filename =	$dest_dir.'data.sql';
		
        //删除已生成的数据
        if (is_dir($dest_dir)) {
            delDirAndFile($dest_dir,true);
        }
		@unlink('./Uploads/Syspagetpl/'.md5($ids).'.zip');
        $mkdirresult = makeDir($dest_dir);

		if (!$mkdirresult)
            exit($dest_dir . "文件夹生成失败,请检查权限");
		$sql="";
		if ($file = fopen($filename, 'wb')) {
			$rs=M('scenepagesys')->where('pageid_bigint in ('.$ids.')')->select();
			$n=count($rs);
			for($i=0;$i<$n;$i++){
				$sql.= "INSERT INTO `{pre}scenepagesys` (sceneid_bigint,scenecode_varchar,pagecurrentnum_int,createtime_time,content_text,pagename_varchar,userid_int,biztype_int,tagid_int,thumbsrc_varchar,eqsrc_varchar,eqid_int,usecount_int,listorder) VALUES ('".$rs[$i]['sceneid_bigint']."','1','".$rs[$i]['pagecurrentnum_int']."','".$rs[$i]['createtime_time']."','".addslashes($rs[$i]['content_text'])."','".$rs[$i]['pagename_varchar']."','".$rs[$i]['userid_int']."','".$rs[$i]['biztype_int']."','".$rs[$i]['tagid_int']."','".$rs[$i]['thumbsrc_varchar']."','".$rs[$i]['eqsrc_varchar']."',0,0,0);\r\n";
			
			if (!empty($rs[$i]['thumbsrc_varchar'])) {
				makeDir(dirname($dest_dir . $rs[$i]['thumbsrc_varchar']));
				$r = copy('./Uploads/' . $rs[$i]['thumbsrc_varchar'], $dest_dir . $rs[$i]['thumbsrc_varchar']);
			}
			
			$arrjsondata[$i] = json_decode($rs[$i]['content_text'], 1);
			//print_r($arrjsondata);
			foreach ($arrjsondata[$i] as $list) {
				//图片
				if (!empty($list['properties']['src'])) {
					makeDir(dirname($dest_dir . $list['properties']['src']));
					$r = copy('./Uploads/' . $list['properties']['src'], $dest_dir . $list['properties']['src']);
				}
				//背景
				if (!empty($list['properties']['imgSrc'])) {
					makeDir(dirname($dest_dir . $list['properties']['imgSrc']));
					$r = copy('./Uploads/' . $list['properties']['imgSrc'], $dest_dir . $list['properties']['imgSrc']);
				}
				//音乐
				if (!empty($list['sound']['src'])) {
					makeDir(dirname($dest_dir . $list['sound']['src']));
					$r = copy('./Uploads/' . $list['sound']['src'], $dest_dir . $list['sound']['src']);
				}
				//图集
				if (!empty($list['properties']['children'])) { //如果有图集
					foreach ($list['properties']['children'] as $children) { //循环图集数组
						makeDir(dirname($dest_dir . $children['src'])); //生成目标路径
						$r = copy('./Uploads/' . $children['src'], $dest_dir . $children['src']); //拷贝图集图片到目的路径
					}
				}
			}
		}
			
			file_put_contents($filename,$sql);
			
			$fn='Uploads/Syspagetpl/'.md5($ids).'.zip';
			$f='Uploads/Syspagetpl/'.md5($ids).'/';
			
			import('Org.Util.PclZip');
			$archive = new \PclZip($fn);
			$list = $archive->create($f,PCLZIP_OPT_REMOVE_PATH, $f);
			
			if ($list==0)
				$this->error('压缩失败');
			$this->success('<iframe src="' . __ROOT__ . $fn. '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);
		}
	}
	
	
	//单页模板导入
	public function syspageimport(){
		C('DB_PARAMS',array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL));
		if(IS_POST){
			$upload = new \Think\Upload();// 实例化上传类
			$upload->maxSize   =     100*1024*1024 ;// 设置附件上传大小
			$upload->exts      =     array('rar', 'zip');// 设置附件上传类型
			$upload->savePath  =      'Syspagetpl/'; // 设置附件上传目录    // 上传文件     
			$info   =   $upload->upload(); 
			//'原始文件名'.$info['myfile']['name'];
			//'新文件名'.$info['myfile']['savename'];
			//'保存路径'.$info['myfile']['savepath'];
			if(!$info) {// 上传错误提示错误信息 
				$this->error($upload->getError());    
			}
			
			$fn='Uploads/'.$info['myfile']['savepath'].'/'.$info['myfile']['savename'];
			$f='Uploads/';
			
			import('Org.Util.PclZip');
			$archive = new \PclZip($fn);
			$list = $archive->extract($f);
			if ($list == 0) {
			  die("解压出错");
			}
			if (! file_exists ("Uploads/data.sql")) {
				exit ( "文件不存在！请检查" );
			}
			$sql=file_get_contents('Uploads/data.sql');
			$sql=str_replace('{pre}',C('DB_PREFIX'),$sql);
			$db=M();
			
			$db->execute($sql);
			
			
			@unlink('Uploads/data.sql'); 
			
			if(!$info) {// 上传错误提示错误信息 
				$this->error($upload->getError());    
			}else{// 上传成功
				$this->success('数据导入成功！');    
			}
		
		}else{
			$ui = array('File_index' => 'active');
			$this->assign('ui', $ui);
			$this->display();
		
		}
	}
	
	
	//整套模板打包
	public function systplexport(){
		C('DB_PARAMS',array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL));
		$id=$_POST['id'];
		if(!is_array($id)){
			$this->error('请选择需要导出的模板');
		}
		$ids=implode(',',$id);
		
		//文件夹目录
		$dest_dir = './Uploads/Syspagetpl/'.md5($ids).'/';
		//sql文件

		//删除已生成的数据
		
		/*暂时取消删除和生成*/
        if (is_dir($dest_dir)) {
			delDirAndFile($dest_dir,true);
        }
		@unlink('./Uploads/Syspagetpl/'.md5($ids).'.zip');
        $mkdirresult = makeDir($dest_dir);
		if (!$mkdirresult)
            exit($dest_dir . "文件夹生成失败,请检查权限");
		
		
		
		//生成sql
		$scenesql="";
		$scene=M('scene')->field('font,islongpage,applyIndex,applyGuanchan,music_url,user_type',true)->where('sceneid_bigint in ('.$ids.')')->select();
		
		$json=array();
		$m=count($scene);
		for($j=0;$j<$m;$j++){
			
			
			//这里必须放在前面，因为会unset编号
			$scenepage=M('scenepage')->where('sceneid_bigint='.$scene[$j]['sceneid_bigint'])->select();
			
			$scene[$j]['eqid_int']=0;
			$scene[$j]['accessCode']=0;
			$scene[$j]['lastpageid']=0;
			//unset($scene[$j]['sceneid_bigint']);
			array_splice($scene[$j],0,1);
			$code=$scene[$j]['scenecode_varchar'].substr(uniqid(),7);
			$json[]=$code;
			$scene[$j]['scenecode_varchar']=$code;
			$scenefields=array_keys($scene[$j]);
			//print_r($scenefields);die;
			$scenesql.='INSERT INTO `{pre}scene` ('.implode(',',$scenefields).') VALUES (';
			for($i=0; $i<count($scenefields);$i++) {
				$scenesql.="'".$scene[$j][$scenefields[$i]]."',";
			}
			$scenesql=rtrim($scenesql,',');
			$scenesql.=");\r\n";
			
			if (!empty($scene[$j]['musicurl_varchar'])) {
				makeDir(dirname($dest_dir . $scene[$j]['musicurl_varchar']));
				$r = copy('./Uploads/' . $scene[$j]['musicurl_varchar'], $dest_dir . $scene[$j]['musicurl_varchar']);
			}
			if (!empty($scene[$j]['thumbnail_varchar'])) {
				makeDir(dirname($dest_dir . $scene[$j]['thumbnail_varchar']));
				$r = copy('./Uploads/' . $scene[$j]['thumbnail_varchar'], $dest_dir . $scene[$j]['thumbnail_varchar']);
			}
			$arr=json_decode($scene[$j]['music_url'],1);
			if(is_array($arr)){
				for($i=0;$i<count($arr);$i++){
					if(!empty($arr[$i]['url'])){
						makeDir(dirname($dest_dir . $arr[$i]['url']));
						$r = copy('./Uploads/' . $arr[$i]['url'], $dest_dir . $arr[$i]['url']);
					}
				}
			}
			
			$scenepagefields=array_keys($scenepage[0]);
			array_splice($scenepagefields,0,1);
			//print_r($scenepagefields);die;
			$scenepagesql='INSERT INTO `{pre}scenepage` ('.implode(',',$scenepagefields).') VALUES ';
			$sss=count($scenepage);
			for($i=0;$i<$sss;$i++){
				$arrjsondata = json_decode($scenepage[$i]['content_text'], 1);
				foreach ($arrjsondata as $key=> $list) {
					//图片
					if (!empty($list['properties']['src'])) {
						makeDir(dirname($dest_dir . $list['properties']['src']));
						$r = copy('./Uploads/' . $list['properties']['src'], $dest_dir . $list['properties']['src']);
					}
					//背景
					if (!empty($list['properties']['imgSrc'])) {
						makeDir(dirname($dest_dir . $list['properties']['imgSrc']));
						$r = copy('./Uploads/' . $list['properties']['imgSrc'], $dest_dir . $list['properties']['imgSrc']);
					}
					//音乐
					if (!empty($list['sound']['src'])) {
						makeDir(dirname($dest_dir . $list['sound']['src']));
						$r = copy('./Uploads/' . $list['sound']['src'], $dest_dir . $list['sound']['src']);
					}
					//图集
					if (!empty($list['properties']['children'])) { //如果有图集
						foreach ($list['properties']['children'] as $children) { //循环图集数组
							makeDir(dirname($dest_dir . $children['src'])); //生成目标路径
							$r = copy('./Uploads/' . $children['src'], $dest_dir . $children['src']); //拷贝图集图片到目的路径
						}
					}
					//$arrjsondata[$key]['content']=
				}
				$scenepage[$i]['content_text']=addslashes($scenepage[$i]['content_text']);
				//unset($scenepage[$i]['pageid_bigint']);
				//$scenepage[$i]['content_text']='';
				array_splice($scenepage[$i],0,1);
				$scenepage[$i]['my_type_cate']=0;
				$scenepage[$i]['sceneid_bigint']='{scid}';
				$scenepage[$i]['scenecode_varchar']=$code;
				$scenepage[$i]['createtime_time']=date('Y-m-d H:i:s', time());
				$scenepagesql.="(";
				for($j1=0; $j1<count($scenepagefields);$j1++){
					$scenepagesql.="'".$scenepage[$i][$scenepagefields[$j1]]."',";
				}
				$scenepagesql=rtrim($scenepagesql,',');
				$scenepagesql.="),";
			}
			$scenepagesql=rtrim($scenepagesql,',');
			$scenepagesql.=";\r\n";
			file_put_contents($dest_dir.$code.'.sql',$scenepagesql,FILE_APPEND);
		
		}
		//echo $sql;
		file_put_contents($dest_dir.'scene.sql',$scenesql,FILE_APPEND);
		file_put_contents($dest_dir.'scene.json',json_encode($json),FILE_APPEND);
		$fn='Uploads/Syspagetpl/'.md5($ids).'.zip';
		$f='Uploads/Syspagetpl/'.md5($ids).'/';
		
		import('Org.Util.PclZip');
		$archive = new \PclZip($fn);
		$list = $archive->create($f,PCLZIP_OPT_REMOVE_PATH, $f);
		
		if ($list==0)
			$this->error('压缩失败');
		
		$this->success('<iframe src="' . __ROOT__ . $fn. '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);


	}








	//整套模板打包（批量）
	public function systplexport2(){
		C('DB_PARAMS',array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL));
		$idss=session('idss');
		if(!$idss){
			$map['delete_int']		=0;
			$map['is_tpl']			=1;
			$map['applyTemplate']	=2;
			
			$idss=M('scene')->where($map)->field('sceneid_bigint')->select();
			session('idss',$idss);
		
		}
		$iii=I('i',0,'int');
		if($i>=count($idss)){
			echo '全部导出成功';die;
		}
		$ids=$idss[$iii]['sceneid_bigint'];
		
		//文件夹目录
		$dest_dir = './Uploads/Syspagetpl/'.$ids.'/';
		//sql文件

		//删除已生成的数据
		
		/*暂时取消删除和生成*/
        //if (is_dir($dest_dir)) {
			//delDirAndFile($dest_dir,true);
        //}
		//@unlink('./Uploads/Syspagetpl/'.$ids.'.zip');
        $mkdirresult = makeDir($dest_dir);
		if (!$mkdirresult)
            exit($dest_dir . "文件夹生成失败,请检查权限");
		
		
		
		//生成sql
		$scenesql="";
		$scene=M('scene')->field('font,islongpage,applyIndex,applyGuanchan,music_url,user_type',true)->where(array('sceneid_bigint'=>$ids))->select();
		
		$json=array();
		$m=count($scene);
		for($j=0;$j<$m;$j++){
			
			
	
			//if(1== 2){	//导出到第三方平台需要开启这
				//unset($scene[$j]['font']);
				//array_splice($scene[$j],55,1);
				
				//unset($scene[$j]['islongpage']);
				//array_splice($scene[$j],54,1);
			
				//unset($scene[$j]['applyindex']);
				//array_splice($scene[$j],36,1);
				//unset($scene[$j]['applyguanchan']);
				//array_splice($scene[$j],35,1);
				//unset($scene[$j]['music_url']);
				//array_splice($scene[$j],9,1);
				//unset($scene[$j]['user_type']);
				//array_splice($scene[$j],5,1);
			//}
			
			
			//这里必须放在前面，因为会unset编号
			$scenepage=M('scenepage')->where('sceneid_bigint='.$scene[$j]['sceneid_bigint'])->select();
			
			$scene[$j]['eqid_int']=0;
			$scene[$j]['accessCode']=0;
			$scene[$j]['lastpageid']=0;
			//unset($scene[$j]['sceneid_bigint']);
			array_splice($scene[$j],0,1);
			$code=$scene[$j]['scenecode_varchar'].substr(uniqid(),7);
			$json[]=$code;
			$scene[$j]['scenecode_varchar']=$code;
			$scenefields=array_keys($scene[$j]);
			//print_r($scenefields);die;
			$scenesql.='INSERT INTO `{pre}scene` ('.implode(',',$scenefields).') VALUES (';
			for($i=0; $i<count($scenefields);$i++) {
				$scenesql.="'".$scene[$j][$scenefields[$i]]."',";
			}
			$scenesql=rtrim($scenesql,',');
			$scenesql.=");\r\n";
			
			if (!empty($scene[$j]['musicurl_varchar'])) {
				makeDir(dirname($dest_dir . $scene[$j]['musicurl_varchar']));
				$r = copy('./Uploads/' . $scene[$j]['musicurl_varchar'], $dest_dir . $scene[$j]['musicurl_varchar']);
			}
			if (!empty($scene[$j]['thumbnail_varchar'])) {
				makeDir(dirname($dest_dir . $scene[$j]['thumbnail_varchar']));
				$r = copy('./Uploads/' . $scene[$j]['thumbnail_varchar'], $dest_dir . $scene[$j]['thumbnail_varchar']);
			}
			$arr=json_decode($scene[$j]['music_url'],1);
			if(is_array($arr)){
				for($i=0;$i<count($arr);$i++){
					if(!empty($arr[$i]['url'])){
						makeDir(dirname($dest_dir . $arr[$i]['url']));
						$r = copy('./Uploads/' . $arr[$i]['url'], $dest_dir . $arr[$i]['url']);
					}
				}
			}
			
			$scenepagefields=array_keys($scenepage[0]);
			array_splice($scenepagefields,0,1);
			print_r($scenepagefields);die;
			$scenepagesql='INSERT INTO `{pre}scenepage` ('.implode(',',$scenepagefields).') VALUES ';
			$sss=count($scenepage);
			for($i=0;$i<$sss;$i++){
				$arrjsondata = json_decode($scenepage[$i]['content_text'], 1);
				foreach ($arrjsondata as $key=> $list) {
					//图片
					if (!empty($list['properties']['src'])) {
						makeDir(dirname($dest_dir . $list['properties']['src']));
						$r = copy('./Uploads/' . $list['properties']['src'], $dest_dir . $list['properties']['src']);
					}
					//背景
					if (!empty($list['properties']['imgSrc'])) {
						makeDir(dirname($dest_dir . $list['properties']['imgSrc']));
						$r = copy('./Uploads/' . $list['properties']['imgSrc'], $dest_dir . $list['properties']['imgSrc']);
					}
					//音乐
					if (!empty($list['sound']['src'])) {
						makeDir(dirname($dest_dir . $list['sound']['src']));
						$r = copy('./Uploads/' . $list['sound']['src'], $dest_dir . $list['sound']['src']);
					}
					//图集
					if (!empty($list['properties']['children'])) { //如果有图集
						foreach ($list['properties']['children'] as $children) { //循环图集数组
							makeDir(dirname($dest_dir . $children['src'])); //生成目标路径
							$r = copy('./Uploads/' . $children['src'], $dest_dir . $children['src']); //拷贝图集图片到目的路径
						}
					}
					//$arrjsondata[$key]['content']=
				}
				$scenepage[$i]['content_text']=addslashes($scenepage[$i]['content_text']);
				//unset($scenepage[$i]['pageid_bigint']);
				//$scenepage[$i]['content_text']='';
				array_splice($scenepage[$i],0,1);
				$scenepage[$i]['my_type_cate']=0;
				$scenepage[$i]['sceneid_bigint']='{scid}';
				$scenepage[$i]['scenecode_varchar']=$code;
				$scenepage[$i]['createtime_time']=date('Y-m-d H:i:s', time());
				$scenepagesql.="(";
				for($j1=0; $j1<count($scenepagefields);$j1++){
					$scenepagesql.="'".$scenepage[$i][$scenepagefields[$j1]]."',";
				}
				$scenepagesql=rtrim($scenepagesql,',');
				$scenepagesql.="),";
			}
			$scenepagesql=rtrim($scenepagesql,',');
			$scenepagesql.=";\r\n";
			file_put_contents($dest_dir.$code.'.sql',$scenepagesql,FILE_APPEND);
		
		}
		//echo $sql;
		file_put_contents($dest_dir.'scene.sql',$scenesql,FILE_APPEND);
		file_put_contents($dest_dir.'scene.json',json_encode($json),FILE_APPEND);
		$fn='Uploads/Syspagetpl/'.$ids.'.zip';
		$f='Uploads/Syspagetpl/'.$ids.'/';
		
		import('Org.Util.PclZip');
		$archive = new \PclZip($fn);
		$list = $archive->create($f,PCLZIP_OPT_REMOVE_PATH, $f);
		
		if ($list==0)
			$this->error('压缩失败');
		$this->redirect('Scene/systplexport', array('i' => $iii+1), 3, '导出成功，如需下载请找管理员FTP批量下载。'.time());
		//$this->success('<iframe src="' . __ROOT__ . $fn. '" style="display:none;"></iframe>导出成功,正在下载压缩包...' . $restr, "javascript:window.opener=null;window.open('','_self'); window.close();",3);


	}
	
	
	
	//整套课件导入
	public function sceneimport(){
		C('DB_PARAMS',array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL));
		if(IS_POST){
			$upload = new \Think\Upload();// 实例化上传类
			$upload->maxSize   =     40*1024*1024 ;// 设置附件上传大小
			$upload->exts      =     array('rar', 'zip');// 设置附件上传类型
			$upload->savePath  =      'Syspagetpl/'; // 设置附件上传目录    // 上传文件     
			$info   =   $upload->upload(); 
			//print_r($info);die;
			if(!$info) {// 上传错误提示错误信息 
				$this->error($upload->getError());    
			}
			$fn='Uploads/'.$info['myfile']['savepath'].'/'.$info['myfile']['savename'];
			$f='Uploads/';
			
			import('Org.Util.PclZip');
			$archive = new \PclZip($fn);
			$list = $archive->extract($f);
			if ($list == 0) {
			  die("解压出错");
			}
			if (! file_exists ("Uploads/scene.sql")) {
				exit ( "data文件不存在！请检查" );
			}
			if (! file_exists ("Uploads/scene.json")) {
				exit ( "json文件不存在！请检查" );
			}
			
			$scenesql=file_get_contents('Uploads/scene.sql');
			$scenesql=str_replace('{pre}',C('DB_PREFIX'),$scenesql);
			$json=json_decode(file_get_contents('Uploads/scene.json'),true);
			//先拆分,$$$   再拆分#@#
			$db=M();
			$db->execute($scenesql);			
			
			for($i=0;$i<count($json);$i++){
				$sceneid_bigint=M('scene')->where(array('scenecode_varchar'=>$json[$i]))->getField('sceneid_bigint');
				$pagesql=file_get_contents('Uploads/'.$json[$i].'.sql');
				$pagesql=str_replace('{scid}',$sceneid_bigint,$pagesql);
				$pagesql=str_replace('{pre}',C('DB_PREFIX'),$pagesql);
				$db->execute($pagesql);
			}
			
			@unlink('Uploads/scene.sql');
			@unlink('Uploads/scene.json');
			$this->success('导入成功');
			
		}else{
			$ui['shenqin_scene'] = 'active';
			$ui['sysmb'] = 'active';
			$this->assign('ui', $ui);
			$this->display();
		}
	}
	
}
?>