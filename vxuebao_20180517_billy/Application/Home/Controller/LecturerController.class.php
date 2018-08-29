<?php
namespace Home\Controller;
use Think\Controller;

class LecturerController extends Controller{
	public function index(){
		/*if(session('userid')){
			redirect('/#/main');
		}*/
	
		if(I('area','0',int)){//城市
			$where['area'] = I('area','0',int);
		}

		if(I('class','',string)){//课程
			$where['class'] = array('like','%' . trim(I('class','',string)) . '%');
		}
	
		if(I('search_type','',string)){//搜索名称或者主讲课程
			$search_string = trim(I('search_type','',string));		
			$where['_string'] = ' (usname like "%'.$search_string.'%")  OR ( class like "%'.$search_string.'%") ';
		}

		/*名师推荐，最新，最热*/
		$class2 = I('class2','',string);
		if($class2 == 'rec'){//名师推荐
			$where['recommend']=1;
		}elseif($class2 == 'new'){//最新
			$order='id desc';
		}elseif($class2 == 'hot'){//最热
			$order='views desc';
		}else{
			$order='id asc';
		}

		$lecturer = M('jianshi');
		$count= $lecturer->where($where)->order($order)->count();
		$p = new \Think\Page($count, 8);
		$p->setConfig('prev', '上一页');
		$p->setConfig('next', '下一页');
		$p->setConfig('last', '尾页');
		$p->setConfig('first', '首页');
		$p->lastSuffix = false;//最后一页不显示为总页数

		$list = $lecturer->field('id,usname,usjianjie,photo,tags,area,class,views,jigou')->where($where)->order($order)->limit($p -> firstRow,$p -> listRows)->select();

		for($i=0;$i<count($list);$i++){
			$list[$i]['tags'] = explode('，',$list[$i]['tags']);
			$reply_count = M('jianshipl')->where(array('jsid' => $list[$i]['id']))->count();
			$list[$i]['reply'] = $reply_count ? $reply_count : 0;
		}
		//pre($list);
		$area = C('AREA');
		$class = $lecturer->distinct(true)->field('class')->limit('0,8')->select();
		$sid = session('userid')?session('userid'):'0';
		$this->assign('sid',session('userid'));
		$this->assign('class2',$class2);
		$this->assign('list',$list);
		$this->assign('area',$area);
		$this->assign('class',$class);
		$this->assign('page',$p->show());
		$this->display();
	}

	public function u(){
		if(I('get.userid','0',int)){
			$lecturer = M('jianshi');
			$where['id'] = I('get.userid','0',int);

			//人气
			$p_num = M('moods')->where(array('user_ip' => $_SERVER['REMOTE_ADDR'].session('userid').I('get.userid','0',int)))->count();
			if(!$p_num){

				$ip['user_ip'] = $_SERVER['REMOTE_ADDR'].session('userid').I('get.userid','0',int);
				M('moods')->add($ip);
				$lecturer->where($where)->setInc('views',1); // 人气+1
			}


			$list = $lecturer->field('id,usname,usjianjie,photo,tags,area,class,huiyuan,beijin,kecheng,tedian,fuwu,picture,zanshi,views,jigou')->where($where)->find();
			$list['tags'] = explode('，',$list['tags']);
			$reply_count = M('jianshipl')->where(array('jsid' => I('get.userid','0',int)))->count();
			$list['reply'] = $reply_count ? $reply_count : 0;
			$list['beijin'] = html_entity_decode($list['beijin']);
			$list['kecheng'] = html_entity_decode($list['kecheng']);
			$list['tedian'] = html_entity_decode($list['tedian']);
			$list['fuwu'] = html_entity_decode($list['fuwu']);
			$list['zanshi'] = html_entity_decode($list['zanshi']);
			$list['picture'] = json_decode($list['picture']);
		
			if(session('userid')){//登录才可以看到联系方式
				$touch = $lecturer->field('qq,weixin,phone,email')->where($where)->find();
			}

			$discuts = M('jianshipl')->field(true)->where(array('jsid' => I('get.userid','0',int)))->order('id asc')->select();

			for($i=0;$i<count($discuts);$i++){
				$discuts[$i]['addtime'] = delta_T($discuts[$i]['addtime']);
			}
			//pre($discuts);
			$this->assign('discuts',$discuts);
			$this->assign('touch',$touch);
			$this->assign('list',$list);
			$this->display();
		}else{
			$this->error('页面出错！！！',U('index'));
		}
	}

	public function discut(){
		if(I('get.u','0',int)){
			if(IS_POST){
				$dis = array();
				$dis['jsid'] =  I('get.userid','0',int);
				$headimg = M('users')->field('headimg,uname')->where(array('userid_int' => I('get.u','0',int)))->find();
				if($headimg['headimg']){

					$dis['headimg'] = '/Uploads/'.$headimg['headimg'];
				}
				$dis['usname'] = $headimg['uname'];
				if(I('post.content','',string)){

					$dis['content'] = I('post.content','',string);
				}else{
					$this->error('评论的内容不能为空！！！');
				}
				$dis['addtime'] = time();
				M('jianshipl')->add($dis);
				$this->success('评论成功！！！');
			}	
		}
	}

	public function mobile_u(){
		if(I('get.userid','0',int)){
			$lecturer = M('jianshi');
			$where['id'] = I('get.userid','0',int);

			//人气
			$p_num = M('moods')->where(array('user_ip' => $_SERVER['REMOTE_ADDR'].session('userid').I('get.userid','0',int)))->count();
			if(!$p_num){

				$ip['user_ip'] = $_SERVER['REMOTE_ADDR'].session('userid').I('get.userid','0',int);
				M('moods')->add($ip);
				$lecturer->where($where)->setInc('views',1); // 人气+1
			}


			$list = $lecturer->field('id,usname,usjianjie,photo,tags,area,class,huiyuan,beijin,kecheng,tedian,fuwu,picture,zanshi,views,jigou')->where($where)->find();
			$list['tags'] = explode('，',$list['tags']);
			$reply_count = M('jianshipl')->where(array('jsid' => I('get.userid','0',int)))->count();
			$list['reply'] = $reply_count ? $reply_count : 0;
			$list['beijin'] = html_entity_decode($list['beijin']);
			$list['kecheng'] = html_entity_decode($list['kecheng']);
			$list['tedian'] = html_entity_decode($list['tedian']);
			$list['fuwu'] = html_entity_decode($list['fuwu']);
			$list['zanshi'] = html_entity_decode($list['zanshi']);
			$list['picture'] = json_decode($list['picture']);
		
			if(I('get.u','0',int)){//登录才可以看到联系方式
				$touch = $lecturer->field('qq,weixin,phone,email')->where($where)->find();
			}

			$discuts = M('jianshipl')->field(true)->where(array('jsid' => I('get.userid','0',int)))->order('id asc')->select();

			for($i=0;$i<count($discuts);$i++){
				$discuts[$i]['addtime'] = date('Y-m-d H:m:s',$discuts[$i]['addtime']);
			}
			//pre($discuts);
			$this->assign('discuts',$discuts);
			$this->assign('touch',$touch);
			$this->assign('list',$list);
			$this->display();
		}else{
			$this->error('页面出错！！！',U('index'));
		}
	}



}