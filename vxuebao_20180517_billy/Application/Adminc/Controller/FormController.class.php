<?php
	namespace Adminc\Controller;
	use Adminc\Controller\BaseController;
	class FormController extends BaseController{
		//用户所有考卷
		public function index(){
			$form = M('form');
			if(I('get.type',0,'int')){
				$where['type'] = I('get.type',0,'int');
			}
			if(IS_POST){
				
				$where['title'] = array('like','%' . trim(I('ipttitle','','string')) . '%');
				$this->assign('ipttitle',I('ipttitle','','string'));
			}
			$where['delete_int'] = 0;
			$count = $form->where($where)->count();
        	$p = getpage($count, 10);
			$list = $form->field('id,title,photo,content,type,istpl,recommend_int')->where($where)->order('id desc')->limit($p->firstRow, $p->listRows)->select();
			//pre($list);

			$ui['form'] = 'active';
			$this->assign('type',I('get.type',0,'int'));
        	$this->assign('ui',$ui);
        	$this->assign('list',$list);
        	$this->assign('page',$p->show());
			$this->display();
		}


		public function delet(){
			$form = M('form');
			$formdata = M('formdata');
			$examhistory = M('examhistory');
			if(I('get.id',0,'int')){
				$id = I('get.id',0,'int');
				$form->where(array('id' => $id))->delete();
				$formdata->where(array('fid' => $id))->delete();
				$examhistory->where(array('efid' => $id))->delete();
				$this->success('删除成功！！！');
			}else{
				$this->error('参数错误！！！');
			}
		}

		public function edit(){
			$sform = M('form');
			if(IS_POST){
				$where['id'] = I('post.id',0,'int');
				$data = I('form');
				$upload = new\Think\Upload();
				$upload->allowExst = array('jpg','gif','png','jpeg');
				$upload->savePath = 'exam_form/';
				$info = $upload->upload();
				if($info){
					$data['photo'] = $info[0]['savepath'].$info[0]['savename'];
					$img = new \Think\Image();
					$img->open($upload->rootPath.$data['photo']);
					$img->thumb(270,204,6);
					$small_photo = $upload->rootPath.$info[0]['savepath'].'small'.$info[0]['savename'];
					$img->save($small_photo);
					$data['photo'] = $small_photo;
				}
				$sform->where($where)->save($data);
				$this->success('编辑成功！！！','/adminc.php?c=form');
			}else{
				$where['id'] = I('get.id',0,'int');
				$form = $sform->field('id,title,content,photo,istpl,recommend_int')->where($where)->find();
				$this->assign('form',$form);
				$type = C('FTYPE');
				$this->assign('type',$type);
				$this->display();
			}
		}
	}
?>