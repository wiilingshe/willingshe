<?php
namespace Home\Controller;
use Think\Controller;
 
class MobileController extends Controller {

	//token认证
	public function _initialize() {
        $tk=I('token','');
		$user_id=(int)session('user_id');
		if($user_id==0){
			if($tk==''){
				echo('权限认证失败');die;
			}
			$map['session_id']=$tk;
			$map['session_expire']=array('gt',time());
			$islogin=M('session')->where($map)->count();
			if($islogin==0){
				$this->error('登陆失败，请重新使用电脑登陆再操作');
			}else{
				$user_id=M('users')->where(array('last_session_id'=>$tk))->getField('userid_int');
				if(!$user_id){
				$this->error('登陆失败，请重新使用电脑登陆再操作');
				}
				session('user_id',$user_id);
			}
		}
		
    }
   
   //文件上传  index.php?c=Mobile&token=*********&type=*******
	public function index(){
		$token=I('token','');
		$type=I('type',0,'int');
		if($type==0){
			$tpname='图片';
		}else{
			$tpname='音频';
		}
		$this->assign('type',$type);
		$this->assign('token',$token);
		$this->assign('tpname',$tpname);
		$this->display('photo');		
	}
	
	//图片上传保存
	public function save(){
		$user_id=(int)session('user_id');
		$token=I('token','');
		$type=I('type',0,'int');
		if($type==0){
			$filetype=1;
		}else{
			$filetype=2;
		}
		if($user_id==0){
			$this->error('请使用电脑重新登陆');
		}
		M('upfile')->where(array('userid_int'=>$user_id,'filetype_int'=>$filetype,'delete_int'=>1))->save(array('delete_int'=>2));
		echo '<script language="javascript">alert("上传成功！");window.opener=null;window.close();</script>';
		
		$this->error('上传成功');
	}
	
	public function upload(){
		$type=I('type',0,'int');
		$user_id=(int)session('user_id');
		if($user_id==0){
			$this->error('请重新使用电脑登陆再使用手机上传');
		}
		if($type==0){
			$exts=array('gif','png','jpg','jpeg');
			$filetype=1;
			$savePath='pic/'.$user_id.'/';
		}else{
			$exts=array('mp3','wav','mp4');
			$filetype=2;
			$savePath='mp3/'.$user_id.'/';
		}
		$upload = new \Think\Upload();// 实例化上传类
		$upload->maxSize   =  10*1024*1024 ;// 设置附件上传大小
		$upload->exts      =  $exts;// 设置附件上传类型
		$upload->rootPath = './Uploads/';
		$upload->savePath  =  $savePath; // 设置附件上传目录
		$upload->subName  = array('date','Ym');
		$info   =  $upload->upload(); 
		
		if($filetype==1){
			$image = new \Think\Image(); 
			$image->open('Uploads/'.$info['photo']['savepath'].$info['photo']['savename']);
			$image->thumb(160, 160,\Think\Image::IMAGE_THUMB_CENTER)->save('Uploads/'.$info['photo']['savepath'].'thumb'.$info['photo']['savename']);
			$thumb=$info['photo']['savepath'].'thumb'.$info['photo']['savename'];
		}else{
			$thumb=$info['photo']['savepath'].$info['photo']['savename'];
		}
		
		$data['userid_int']=$user_id;
		$data['filetype_int']=$filetype;
		$data['filesrc_varchar']=$info['photo']['savepath'].$info['photo']['savename'];
		$data['create_time']=date('Y-m-d H:i:s');
		$data['sizekb_int']=(int)($info['size'] / 1024);
		$data['filethumbsrc_varchar']=$thumb;
		
		$data['biztype_int']=0;
		$data['ext_varchar']=$info['photo']['ext'];
		$data['filename_varchar']=$info['photo']['name'];
		$data['eqsrc_varchar']='';
		$data['tagid_int']='';
		$data['delete_int']=1;
		
		if(!$info) {// 上传错误提示错误信息
			echo $upload->getError();
		}else{// 上传成功
			M('upfile')->add($data);
			if($filetype==1){
				echo '<li class="p"><input name="photo[]" type="hidden" value="1"><img src="/Uploads/'.$info['photo']['savepath'].'thumb'.$info['photo']['savename'].'"></li>';
			}else{
				echo '<li class="m"><input name="photo[]" type="hidden" value="1">'.$info['photo']['name'].'</li>';
			}
		}
	}	
}
?>
