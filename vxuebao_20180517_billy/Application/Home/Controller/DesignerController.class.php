<?php
namespace Home\Controller;
use Think\Controller;

class DesignerController extends Controller{
	public function index(){		
		$msg = M('usermsg');
		$scene = M('scene');				
		$sql['cj_users.type'] = 22;
		//分类;
		if(I('city','0','int') || I('industry','0','int')){
			if(I('city','0','int')>0){
				$sql['cj_usermsg.cityid'] = I('city','0','int');
			};
			if(I('industry','0','int')>0){
				$sql['cj_usermsg.tag'] = I('industry','0','int');
			}
		}
		//搜索
		if(return_designer(I('search_type','','strip_tags'))){
			$sql += return_designer($_POST['search_type']);
		}
	
		$count= M('users')->where($sql)->join('cj_usermsg ON cj_users.userid_int = cj_usermsg.userid')->count();
		$p = getpage($count,10);
		$list = M('users')->where($sql)->join('cj_usermsg ON cj_users.userid_int = cj_usermsg.userid')->field('cj_users.uname,cj_users.userid_int,cj_users.headimg')->limit($p -> firstRow,$p -> listRows)->select();
		$num = count($list);
		for($i=0;$i<$num;$i++){
			$data[$i]['userid_int'] = $list[$i]['userid_int'];
			$data[$i]['uname'] = $list[$i]['uname'];
			$data[$i]['headimg'] = $list[$i]['headimg'];
			$r = ($msg->field('proid,cityid,msg,tag,sentiment')->where(array('userid' => $list[$i]['userid_int']))->find());
			$d1 = M('area')->field('shortname')->where(array('id' => $r['proid']))->find();
			$d2 = M('area')->field('shortname')->where(array('id' => $r['cityid']))->find();
			$s1 = $scene->field('thumbnail_varchar')->where(array('userid_int' => $list[$i]['userid_int']))->count();
			$s2 = $scene->field('thumbnail_varchar,scenecode_varchar')->where(array('userid_int' => $list[$i]['userid_int']))->limit(3)->select();
			$data[$i]['msg'] = $r['msg'];
			$data[$i]['pro'] = $d1['shortname'];
			$data[$i]['city'] = $d2['shortname'];
			$data[$i]['tag'] = $r['tag'];
			$data[$i]['sentiment'] = $r['sentiment'];
			$data[$i]['product_num'] = $s1;
			$data[$i]['product'] = $s2;
		}
		$this->assign('sql',$sql);
		$this->assign('data',$data);
		$this->assign('list1',$this->get_tag());
		$this->assign('list2',$this->get_city());
		$this->assign('page',$p->show());
		$this->display();
	}

	public function get_tag(){//行业列表
		$tag = M('tag');
		$list1 = $tag->cache('tagid_int')->field('tagid_int,name_varchar')->where(array('biztype_int' => 101))->select();
		return $list1;
	}

	public function get_city(){//城市列表
		$c = M('area');
		$where['id'] = array('in','110100,310100,440100,440300,440400,420100,120100');
		$list2 = $c->cache('id')->field('id,shortname,parentid,level')->where($where)->select();
		return $list2;
	}


	public function designer_show(){
		if(I('userid',0,int)){
			$user = M('users');
			$usermsg = M('usermsg');
			$area = M('area');
			$tag = M('tag');
			//访问
			$p_num = M('moods')->where(array('user_ip' => $_SERVER['REMOTE_ADDR'].I('userid',0,int)))->count();
			if(!$p_num){

				$ip['user_ip'] = $_SERVER['REMOTE_ADDR'].I('post.userid');
				M('moods')->add($ip);
				$usermsg->where(array('userid' => I('userid',0,int)))->setInc('sentiment',1); // 人气+1
			}
						
			$where['userid_int'] = I('userid',0,int);
			$data = $user->field('userid_int,uname,email_varchar,phone,tel,qq,headimg,weixin')->where($where)->find();
			$pcid = $usermsg->field('proid,cityid,msg,sentiment')->where(array('userid' => I('userid',0,int)))->find();
			$province = $area->field('shortname')->where(array('id' => $pcid['proid']))->find();
			$city = $area->field('shortname')->where(array('id' =>$pcid['cityid'] ))->find();
			$product = M('scene')->field('thumbnail_varchar,scenecode_varchar,sceneid_bigint,hitcount_int')->where($where)->select();
			$product_num = count($product);
			$long = $tag->field('name_varchar')->where($where)->select();
	
		}else{
			$this->error('页面出错！！！',U('designer'));
		}

		$data['msg'] = $pcid['msg'];
		$data['sentiment'] = $pcid['sentiment'];
		$data['province'] = $province['shortname'];
		$data['city'] = $city['shortname'];
		$data['product_num'] = $product_num;
		$data['product'] = $product;
		$data['long'] = $long;
		$this->assign('data',$data);
		$this->display();
	}	
	
	//设计师资料保存接口
	public function save(){
		$this->unlogin();
		
		$usid=(int)session('userid');
		
		$data['qq']		=	I('post.qq');		//QQ
		$data['weixin']	=	I('post.weixin');	//微信
		$data['phone']	=	I('post.mobile');	//手机
		$data['uname']	=	I('post.name');		//昵称
		
		
		$tags=explode(' ',I('tags'));
		$tag=json_encode($tags);
		//$data['address']=	I('address');	//地址
		$data2['proid']		=I('proid');
		$data2['cityid']	=I('cityid');
		$data2['msg']		=I('signature');	//个性签名
		$data2['tag']		=$tag;		//标签
		$u=M('users');
		$umsg=M('usermsg');
		$u->where('userid_int='.$usid)->save($data); 
		$umsg->where('userid='.$usid)->save($data2); 
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null}';
		//dump($_POST);
	}
	
	
	public function userinfo(){
		$this->unlogin();
		$usid=(int)session('userid');
		$U=M('users');
		$MSG=M('usermsg');
		$user=$U->find($usid);
		$usermsg=$MSG->where('userid='.$usid)->find();
		$tags=implode(" ",json_decode($usermsg['tag'],true));
		$area=M('area')->where(array('id'=>$usermsg['proid']))->getField('shortname');
		$city=M('area')->where(array('id'=>$usermsg['cityid']))->getField('shortname');
		$arr['success']	=true;
		$arr['code']	=200;
		$arr['msg']		='操作成功';
		$arr['obj']['qq']=$user['qq'];
		$arr['obj']['weixin']=$user['weixin'];
		$arr['obj']['mobile']=$user['phone'];
		$arr['obj']['email']=$user['email_varchar'];
		$arr['obj']['name']=$user['uname'];
		$arr['obj']['proname']=$area;
		$arr['obj']['cityname']=$city;
		$arr['obj']['signature']=$usermsg['msg'];
		$arr['obj']['tags']=$tags;
		$arr['map']	=null;
		$arr['list']=null;
		echo json_encode($arr);die;
	}
	
	
	//获取省份列表
	public function getpro(){
		$m=M('area');
		$data=$m->cache('provicelist')->where('level=1')->order('id asc')->select();
		echo( json_encode($data));
	}
	
	
	public function getcity(){
		$pid=I('pid',0,'int');
		if($pid>0){
			$m=M('area');
			$where['level']=2;
			$where['parentid']=$pid;
			$data=$m->where($where)->order('id asc')->select();
			echo( json_encode($data));
		}
	
	}

	public function unlogin() {
        if (intval(session('userid')) == 0) {
            header('Content-type: text/json');
            header('HTTP/1.1 401 Unauthorized');
            echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录!", "obj" => null, "map" => null, "list" => null));
            exit;
        }
    }
}