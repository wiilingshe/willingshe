<?php
namespace Home\Controller;
use Think\Controller;

class SchoolController extends Controller{
	public function index(){
		if(session('userid')){
			//redirect('/#/main');
			$this->assign('use',1);
		}
		$activity = D('forum_post');
		if(I('fid',0,'int')>0){
			$where['fid'] = I('fid',0,'int');
		}else{
			$where['fid'] = 63;
		
		}
		$where['first'] = 1;
		$where['invisible']	= array('EGT',0);
		$count = $activity->where($where)->count();
		$p = getpage($count,7);
		$data = $activity->field('author,subject,dateline,message,tid,fid')->order('dateline desc')->limit($p -> firstRow,$p -> listRows)->where($where)->select();

		for($i=0;$i<count($data);$i++){
			$data[$i]['time'] = date('m-d h:i',$data[$i]['dateline']);
			$data[0]['year'] = date('Y',$data[0]['dateline']);
			$data[$i]['mon'] = date('m-d',$data[$i]['dateline']);
			$views = M('ultrax.forum_thread','pre_')->field('views')->where(array('tid' => $data[$i]['tid']))->find();
			$data[$i]['views'] = $views['views'];
			$r = preg_replace('/\[attach\](.)*\[.*\]+/iU','',$data[$i]['message']);
			$re = preg_replace('/\[.*\]/U','',$r);
			$res = preg_replace('/(http)(.)*([a-z0-9\-\.\_])+/i','',$re);
			if($res){
				if($data[$i]['fid'] == 65){
					$res2=str_replace("\r\n","<br />",trim($res));	
					$data[$i]['message'] = $res2
;				}else{
					$data[$i]['message'] = mb_substr($res,0,140,"utf-8").'.....';
				}

			}
			$num = (int)substr($data[$i]['tid'],-1,1);
			$attachment = M("ultrax.forum_attachment_$num",'pre_')->field('attachment')->where(array('tid' => $data[$i]['tid']))->limit(1)->select();

				$data[$i]['attachment'] = $attachment[0]['attachment'];
		}
		
		$this->assign('link',$_SERVER['REQUEST_URI']);
		$this->assign('data',$data);
		//pre($data);
		$this->assign('page',$p->show());
		$this->display();		
	}

	public function app_school(){
		$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';
		$activity = D('forum_post');
		$fid = intval(I('get.fid',0,'int'));
		if($fid>0){
			$where['fid'] = $fid;
		}
		$where['first'] = 1;
		$where['invisible']	= array('EGT',0);		
		$count = $activity->where($where)->count();
		$p = getpage($count,7);
		$data = $activity->field('author,subject,dateline,message,tid,fid,pid')->order('dateline desc')->limit($p -> firstRow,$p -> listRows)->where($where)->select();		 
		$jsonstrtemp = '';
		foreach($data as $value){
			$views = M('ultrax.forum_thread','pre_')->field('views')->where(array('tid' => $value['tid']))->find();
			$num = (int)substr($value['tid'],-1,1);
			$attachment = M("ultrax.forum_attachment_$num",'pre_')->field('attachment')->where(array('tid' => $value['tid']))->limit(1)->select();
			$r = preg_replace('/\[attach\](.)*\[.*\]+/iU','',$value['message']);
			$re = preg_replace('/\[.*\]/U','',$r);
			$res = preg_replace('/(http)(.)*([a-z0-9\-\.\_])+/i','',$re);
			$jsonstrtemp = $jsonstrtemp .'{
			"pid": '.$value['pid'].',
			"tid": '.$value['tid'].',
            "fid": '.$value['fid'].',	
			"author":'.json_encode($value['author']).',
			"subject":'.json_encode($value['subject']).',
            "dateline": '.$value['dateline'].',
            "view": '.$views['views'].',
			"message":'.json_encode(mb_substr($res,0,140,"utf-8")).',
            "attachment": "'.$attachment[0]['attachment'].'"
            
        },';
		}
		
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
	}

	public function details_school(){
		$pid = intval(I('get.pid',0));
		$tid = intval(I('get.tid',0));
		if($pid){
			$where['pid'] = $pid;
		}
		$data = D('forum_post')->field('pid,tid,subject,fid,dateline,author,message')->where($where)->find();
		$views = M('ultrax.forum_thread','pre_')->field('views')->where(array('tid' => $tid))->find();
		$data['message'] = discuzcode($data['message']);
		$data['views']=$views['views'];
		$num = (int)substr($tid,-1,1);
		$attachment = M("ultrax.forum_attachment_$num",'pre_')->field('aid,attachment,isimage')->where(array('tid' => $tid))->select();
			foreach($attachment as $key => $value){
				if($value['isimage']){
					$data['message'] = preg_replace("/\[attach\]$value[aid]\[.*\]+/iU","<img src='http://bbs.vxuebao.com/data/attachment/forum/$value[attachment]' />",$data['message']);
				}else{
					$data['message'] = preg_replace("/\[attach\]$value[aid]\[.*\]+/iU","<embed src='$value[attachment]' />",$data['message']);
				}
			}
		$this->assign('data',$data);
		$this->display('wap');
	}
}













