<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;

class OpenController extends BaseController{
	
	public function index(){
		$data=M('open')->select();
		$ui['Open'] = 'active';
        $this->assign('ui',$ui);
		$this->assign('data',$data);
		$this->display();
	}
	
	public function edit(){
		if(IS_POST){
			$id=I('post.id',0,'int');
			$data['app_name']=I('post.app_name');
			$data['app_key']=I('post.app_key');
			$data['app_secret']=I('post.app_secret');
			$data['creatime']=time();
			$data['ok']=I('post.ok',0,'int');
			if($id==0){
				$rs=M('open')->add($data);
				if($rs){
					$this->success('添加成功',U('Open/index'));
				}else{
					$this->error('添加失败',U('Open/index'));
				}
			}else{
				unset($data['creatime']);
				$rs=M('open')->where(array('id'=>$id))->save($data);
				if($rs){
					$this->success('编辑成功',U('Open/index'));
				}else{
					$this->error('编辑失败',U('Open/index'));
				}
			}
		}else{
			$id=I('get.id',0,'int');
			if($id>0){
				$data=M('open')->find($id);
			}else{
				$data['app_secret']=getSecretKey();
			}
			$ui['Open'] = 'active';
			$this->assign('ui',$ui);
			$this->assign('data',$data);
			$this->display();
		}
	}
	
	public function del(){
		$id=I('id',0,'int');
		if($id==0){
			$this->error('删除失败，参数有误');
		}
		$rs=M('open')->delete($id);
		if($rs){
			$this->success('删除成功');
		}else{
			$this->error('删除失败');
		}
	}
	
	public function appsystem(){
		if(IS_POST){
			$data['app_name']=I('app_name');
			$data['app_view']=I('app_view');
			$data['app_link']='http://www.vxuebao.com'.I('app_link');
			F('app/system',$data);
			$this->success('设置成功');
		}else{
			$ui['appsystem'] = 'active';
			$this->assign('ui',$ui);
			$data=F('app/system');
			$data['app_link']=ltrim($data['app_link'],'http://www.vxuebao.com');
			$this->assign('data',$data);
			$this->display();
		}
	}
	
}
?>
