<?php

namespace Adminc\Controller;

use Adminc\Controller\BaseController;

class LecturerController extends BaseController{
	public function index(){
		$lect = M('jianshi');
		if(IS_POST){
			$where['usname'] = array('like','%' . trim(I('usname','',string)) . '%');
		}

		$count = $lect->where($where)->count();
        $p = getpage($count, 10);
		$list = $lect->field('id,usname,usjianjie,photo,tags,jigou')->where($where)->order('id desc')->limit($p->firstRow, $p->listRows)->select();
        $this->assign('page', $p->show());

		$this->assign('list',$list);
		$ui['lecturer'] = 'active';
        $this->assign('ui',$ui);
        $this->display();
	}


	public function add(){
		$lect = M('jianshi');
		if(IS_POST){
			$upload = new\Think\Upload();
			$upload->allowExts =  array('jpg', 'gif', 'png', 'jpeg');
			$upload->savePath ='lecturer/';
			$info   =   $upload->upload();
			$lecturer = I('lecturer');
			if($info){
				$lecturer['photo'] = $info[0]['savepath'].$info[0]['savename'];//获得大图片的绝对路径 
				$img = new \Think\Image();
				$img->open($upload->rootPath.$lecturer['photo']); //打开大图片 
				$img->thumb(223,279,6);
				$small_photo = $upload->rootPath.$info[0]['savepath'].'small'.$info[0]['savename'];
				$img->save($small_photo);  //保存 
				$lecturer['photo'] = $small_photo;

			}
			if(I('picture')){
				$photo=I('picture');
				$lecturer['picture'] = json_encode($photo);
			}
			//pre($lecturer);
			if(!$lecturer['usname']){
				$this->error('用户名不能为空！！！',U('lecturer/add'));
			}
			$lect->add($lecturer);
			$this->success('添加成功！！！','/adminc.php?c=lecturer');
		}else{
			$area = C('AREA');
			$this->assign('area',$area);
			$ui['add_lecturer'] = 'active';
	        $this->assign('ui',$ui);
			$this->display();
		}
	}

	public function edit(){
		$lect = M('jianshi');
		if(IS_POST){
			$where['id'] = I('post.id',0,'int');
			$data = I('lecturer');
			$upload = new\Think\Upload();
			$upload->allowExts =  array('jpg', 'gif', 'png', 'jpeg');
			$upload->savePath ='lecturer/';
			$info =  $upload->upload();
			$lecturer = $lect->field('picture')->where($where)->find();
			$lecturer['picture'] = json_decode($lecturer['picture']);
			if($info){
				$img = new \Think\Image();
				foreach($info as $i=>$d){
					if($i==0){
						$data['photo'] = $info[$i]['savepath'].$info[$i]['savename'];
						$img->open($upload->rootPath.$data['photo']);
						$img->thumb(223,279,6);
						$small_photo = $upload->rootPath.$info[$i]['savepath'].'small'.$info[$i]['savename'];
						$img->save($small_photo);
						$data['photo'] = $small_photo;
					
					}else{
						$lecturer['picture'][$i-1] = $d['savepath'].$d['savename'];
						$img->open($upload->rootPath.$lecturer['picture'][$i-1]);
						$img->thumb(353,235,6);
						$small_photo = $upload->rootPath.$d['savepath'].'small'.$d['savename'];
						$img->save($small_photo);
						$lecturer['picture'][$i-1] = $small_photo;
					}				
				}
			}
			if(I('picture')){
				$photo=I('picture');
				if(!$lecturer['picture']){
					$lecturer['picture'] = array_map($lecturer['picture'],$photo);
				}else{

					$lecturer['picture'] = array_merge($lecturer['picture'],$photo);
				}
			}
	
			$data['picture'] = json_encode($lecturer['picture']);
	
			$lect->where($where)->save($data);
			$this->success('修改成功！！！',U('lecturer/index'));
		}else{
			$where['id'] = I('get.id','0',int);
			$lecturer = $lect->field(true)->where($where)->find();
			$lecturer['picture'] = json_decode($lecturer['picture']);
			//pre($lecturer);	
			$area = C('AREA');
			$this->assign('area',$area);
			$this->assign('lecturer',$lecturer);
			$this->display('add');
		}
	}

	public function delet(){
		if (session('adminRole') == 2) {
            $this->error('您没有相关权限', U('lecturer/index'));
        }
        $lect = M('jianshi');
        $lect->where('id=' . I('id','0',int))->delete();
		M('jianshipl')->where('jsid=' .I('id','0',int))->delete();
			
        $this->success('操作成功', '/adminc.php?c=lecturer'); 
	}

	public function uploads(){	
		header("Content-Type:text/html;charset=utf-8");
	    import('ORG.Net.UploadFile');

	    $upload = new\Think\Upload();
		$upload->maxSize  = 3145728;
		$upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');	
		$upload->savePath =  'lecturer/';
		$info = $upload->upload();
		
		if(!$info){
			$error['error']=1;
			$error['message']=$upload->getError();
			exit(json_encode($error));
		}else{
			$img = new \Think\Image();
			$img->open($upload->rootPath.$info['imgFile']['savepath'].$info['imgFile']['savename']);
			$img->thumb(353,235,6);
			$small_photo = $upload->rootPath.$info['imgFile']['savepath'].'small'.$info['imgFile']['savename'];
			$img->save($small_photo);
			$data=array(
				'url'=>$small_photo,
				'error'=>0
			);
			
			exit(json_encode($data));		
		}
		
	}
}