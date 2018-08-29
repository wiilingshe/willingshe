<?php

namespace Adminc\Controller;

use Adminc\Controller\BaseController;

class UserController extends BaseController {

    public function index() {

        $m = M('users');
        $where = array();
        if(I('type',0) != 21){    
            if (ISSET($_POST['username']) && !EMPTY($_POST['username'])) {
                $where['email_varchar'] = array('like', '%' . $_POST['username'] . '%');
    			$where['_logic'] = 'OR';
    			$where['uname'] = array('like', '%' . $_POST['username'] . '%');
                $this->assign('username',$_POST['username']);
            }
        }
		if(I('type',0)>0){
            if(I('type',0) == 21 && ISSET($_POST['username']) && !EMPTY($_POST['username'])){//如果选择是企业子账号，关联企业
                $uid = $m->where(array('email_varchar' => $_POST['username']))->getField('userid_int');
                $cid = M('company')->where(array('userid_int' => $uid))->getField('id');
                $where['companyid'] = $cid;
            }
			$where['cj_users.type'] = I('type');
            $this->assign('type',I('type'));
		}
        $count = $m->where($where)->count();
        $p = getpage($count, 10);
        $list = $m->field(true)->where($where)->order('create_time desc')->limit($p->firstRow, $p->listRows)->select();
        $this->assign('select', $list);
        $this->assign('page', $p->show());
        //用户组
        $user_group = M('user_group')->field('id,name')->select();
        foreach ($user_group as $ug) {
            $usergroups[$ug['id']] = $ug['name'];
        }
        trace($usergroups, 'user_group');
        $this->assign('user_group', $usergroups);
        $ui['users'] = 'active';
        $this->assign('group', $user_group);
		$this->assign('ui', $ui);
        $this->display();
    }

    public function del() {
        if (session('adminRole') == 2) {
            $this->error('您没有相关权限', U('user/index'));
        }
        $m = M('users');
        $m->where('userid_int=' . $_REQUEST['id'])->delete();
		M('company')->where('userid_int=' . $_REQUEST['id'])->delete();
		M('userexpire')->where('userid_int=' . $_REQUEST['id'])->delete();
		
        $this->success('操作成功', '/adminc.php?c=user');  // U ('user/index')
    }

    public function e() {
        $m = M('users');
        if (IS_POST) {
            $where['userid_int'] = I('post.id',0,'int');
            $update_arr = I('post.user');
            $update_arr['end_time'] = strtotime($update_arr['end_time']);
            if($update_arr['end_time']<=0){
                unset($update_arr['end_time']);
            }
            if (I('post.password_varchar')) {
                $update_arr['password_varchar'] = md5(I('post.password_varchar'));
            }
            $m->where($where)->save($update_arr);
            //print_r($update_arr);
            //echo $m->getlastsql();
            //die;
			if(intval($update_arr['type'])==2 || intval($update_arr['type'])==23){
				$infolist = M('company')->where($where)->find();
				$isad = (int)$update_arr['isad'];
				if(!$infolist){
					M('company')->add($where);
				}else{
					M('company')->where($where)->save(array('isad'=>$isad));
				}
			}

			//设计师添加其他资料
			if(intval($update_arr['type'])==22){
				$infolist = M('usermsg')->where(array('userid'=>$where['userid_int']))->find();
				if(!$infolist){
					M('usermsg')->add(array('userid'=>$where['userid_int']));
				}
			}

			if(intval($update_arr['type'])>1&&intval($update_arr['type'])<=12){
				$expire_time=M('userexpire')->where("userid_int=" . I('post.id'))->getField('expire_time');
				if(!$expire_time){                  
					M('userexpire')->add(array('userid_int'=>I('post.id'),'expire_time'=>$update_arr['end_time']));
				}else{
                    $utime['expire_time'] = $update_arr['end_time'];
                    M('userexpire')->where(array('userid_int'=>I('post.id')))->save($utime);
                }		
			}
            $this->success('操作成功', '/adminc.php?c=user');
        } else {
            $where['userid_int'] = I('get.id');
            $userinfo = $m->where($where)->find();
            $this->assign('user', $userinfo);
            $ui['users'] = 'active';
            //用户组
            $user_group = M('user_group')->field('id,name')->select();
            foreach ($user_group as $ug) {
                $usergroups[$ug['id']] = $ug['name'];
            }
            trace($usergroups, 'user_group');
			$isad=M('company')->where($where)->getField('isad');
            $this->assign('isad', $isad);
			$this->assign('user_group', $usergroups);
            $this->assign('ui', $ui);
            $this->display();
        }
    }

    public function add() {
        $m = M('users');
        $field = C('REG_FIELD') ? C('REG_FIELD') : 'email_varchar';
        if (IS_POST) {

            $where['userid_int'] = I('post.id');
            $userinfo = I('post.user');
            $userinfo['create_time'] = date('y-m-d H:i:s', time());
            $userinfo['last_time'] = date('y-m-d H:i:s', time());
            $userinfo['createip_varchar'] = get_client_ip();
            $userinfo['lastip_varchar'] = get_client_ip();
			if(strtotime($userinfo['end_time'])){               
                $userinfo['end_time'] = strtotime($userinfo['end_time']);
            }else{
                $userinfo['end_time'] = 0;
            }
            $userinfo['headimg'] = '';
            $field = C('REG_FIELD') ? C('REG_FIELD') : 'email_varchar';
            $is_exist_id = $m->where("$field='" . $userinfo[$field] . "'")->getField('userid_int');
            if ($is_exist_id) {
                $this->error('账号已经存在');
            }
            if (I('post.password_varchar')) {
                $userinfo['password_varchar'] = md5(I('post.password_varchar'));
            } else {
                $this->assign('user', $userinfo);
                $this->error('密码不能为空');
            }

            
            $id=$m->where($where)->add($userinfo);
            $data['userid_int']=$id;
            //判断是否是是设计
            if($_POST['user']['type'] == 22){
                $res['userid']=$id;
                M('usermsg')->add($res);
            }
			if(intval($userinfo['type'])==2){
				//增加公司资料
				M('company')->add($data);
			}
			if(intval($userinfo['type'])>1 && intval($userinfo['type'])<=12){
				//增加到期时间
				$data2['userid_int']=$id;
				//$data2['expire_time']=time()+24*60*60*365;
                $data2['expire_time'] = strtotime($userinfo['end_time']) ? strtotime($userinfo['end_time']) : strtotime("next year");
				M('userexpire')->add($data2);

			}
			
            $this->success('操作成功', '/adminc.php?c=user');
        } else {
            //用户组
            $user_group = M('user_group')->where('id<>21')->field('id,name')->select();
            foreach ($user_group as $ug) {
                $usergroups[$ug['id']] = $ug['name'];
            }
            trace($usergroups, 'user_group');
            $this->assign('user_group', $usergroups);
			$ui['users_add'] = 'active';
			$this->assign('ui', $ui);
            $this->assign('field', $field);
            $this->display('e');
        }
    }
	
	   //企业子账号批量导入
    public function batch(){
        $user = M('users');
        $user_company = M('company');
        //选择企业下已有的子账户
        $u = $_GET['parentid']; 
        if(isset($u)){
            $cid = $user_company->field('id')->where(array('userid_int' => $u))->find();
            $ps = $user->field('email_varchar')->where(array('companyid' => $cid['id']))->select();
            $this->ajaxReturn($ps,'json');
        }
        if(IS_POST){
           
            if(I('post.user')){
                $where['userid_int'] = I('post.user');
                $parent = $user->where($where)->find();
                $company = $user_company->field('id')->where($where)->find();
                if($company){
                    //导入文件
                    $upload = new\Think\Upload();
                    $upload->exts = array('csv');
                    $upload->savePath = '/csv/';
                    $info   =   $upload->upload();  
                    if(!$info) {        
                        $this->error($upload->getError());    
                    }else{          
                        $fname = $info['myfile']['savepath'].$info['myfile']['savename'];
                        $handle = fopen('./Uploads/'.$fname,"r");
                        $arr=array();
                        while($data=fgetcsv($handle,10000,",")){
                            $arr[]=$data;
                        }
                       $kname = $arr[0];
                       foreach($arr as $key=>$val)
                        {
                            foreach($val as $k=>$v)
                            {
                                $arr[$key][$kname[$k]] = $v;
                                unset($arr[$key][$k]);
                            }
                        }
                        //判断添加的账号是否已经存在
                        $num = 0;
                        foreach($arr as $key => $value){
                            $userinfo = $user->where('email_varchar = '.'"'.$value['email_varchar'].'"')->find();
                            if($userinfo){
                                $num ++;
                                $have_p = $userinfo['email_varchar'];
                            }
                        }  
                        if(!$num){
                            $datainfo = array();
                            $delete = array_shift ($arr);
                            for($i=0;$i<count($arr);$i++){
                              
                                $datainfo[$i]['deptid'] = $arr[$i]['deptid'] ? $arr[$i]['deptid'] : 0;
                                $datainfo[$i]['email_varchar'] = $arr[$i]['email_varchar'];
                                $datainfo[$i]['uname'] = iconv('','utf-8',$arr[$i]['uname']);
                                $datainfo[$i]['type'] = 21;
                                $datainfo[$i]['companyid'] = $company['id'];
                                $datainfo[$i]['create_time'] = date('y-m-d H:i:s',time());
                                $datainfo[$i]['last_time'] = date('y-m-d H:i:s',time());
                                $datainfo[$i]['createip_varchar'] = get_client_ip();
                                $datainfo[$i]['lastip_varchar'] = get_client_ip();
                                $datainfo[$i]['end_time'] = $parent['end_time'];
                                $datainfo[$i]['password_varchar'] = md5($arr[$i]['password']);
                                $c_ext = array(
                                    "data_permiss" => array(
                                        "0" => "true",
                                        "1" => "true",
                                        "2" => "true",
                                        ),
                                    "is_audit" => "false",
                                    "is_integral" => "false",
                                    "integral_num" => 0
                                    );
                                $datainfo[$i]['company_ext'] = json_encode($c_ext);

                            }
                            // pre($datainfo);die();
                            if($user->addAll($datainfo)){
                                $where1['companyid'] = $company['id'];
                                $where1['checkemail'] = array('exp','is null');
                                $email = $user->field('email_varchar')->where($where1)->select();
                                $usercenter = A('Home/Usercenter');
                                foreach($email as $key => $value){
                                    $usercenter->_send_to_active2($value['email_varchar']);
                                }                     
                                $this->success('添加成功！！！','/adminc.php?c=user',3);
                                exit();
                            }   
                        }else{
                            $this->error("添加的用户名".$have_p."已存在！",'/adminc.php?s=/user/batch.html',3);
                        }     
                    }
                }else{$this->error('该企业账号资料没有完善，请先完善company资料');}
            }else{
                $this->error('请选择企业！','/adminc.php?s=/user/batch.html',3);
            }
        }

        $p = $user->field('userid_int,email_varchar,uname')->where('type=2 or type=23')->select();
        $this->assign('parent',$p);
        $ui['users_batch'] = 'active';
        $this->assign('ui',$ui);
        $this->display();
    }

    //账号批量添加
    public function batch_enterprice(){
        if(IS_POST){
            $data = I('post.user');
            $upload = new\Think\Upload();
            $upload->exts = array('csv');
            $upload->savePath = '/csv/';
            $info = $upload->upload();
            if(!$info){
                $this->error($upload->getError());
            }else{
                $fname = $info['myfile']['savepath'] . $info['myfile']['savename'];
                $handle = fopen('./Uploads/'.$fname,"r");
                $arr=array();
                while($res=fgetcsv($handle,10000,",")){
                    $arr[]=$res;
                }
                $kname = $arr[0];
                foreach($arr as $key=>$val)
                {
                    foreach($val as $k=>$v)
                    {
                        $arr[$key][$kname[$k]] = $v;
                        unset($arr[$key][$k]);
                    }
                }
                $datainfo = array();
                $del = array_shift($arr);
                for($i=0;$i<count($arr);$i++){
                    $datainfo[$i]['email_varchar'] = $arr[$i]['email_varchar'];
                    $datainfo[$i]['uname'] = iconv('','utf-8',$arr[$i]['uname']);
                    $datainfo[$i]['type'] = $data['type'];
                    $datainfo[$i]['create_time'] = date('y-m-d H:i:s', time());
                    $datainfo[$i]['last_time'] = date('y-m-d H:i:s', time());
                    $datainfo[$i]['createip_varchar'] = get_client_ip();
                    $datainfo[$i]['lastip_varchar'] = get_client_ip();
                    if(strtotime($data['end_time'])){               
                        $datainfo[$i]['end_time'] = strtotime($data['end_time']);
               
                    }else{
                        $datainfo[$i]['end_time'] = 0;
                    }
                    $datainfo[$i]['checkemail'] = $data['checkemail'];
                    $datainfo[$i]['status_int'] = $data['status_int'];
                    $datainfo[$i]['password_varchar'] = md5($arr[$i]['password']);
                }

                //这里循环插入
                for($i=0;$i<count($datainfo);$i++){
                    $id['userid_int'] = M('users')->add($datainfo[$i]);
                    if(intval($data['type'])==2){
                        M('company')->add($id);//增加公司的资料
                    }
                    if(intval($data['type'])>1 && intval($data['type'])<=12){//会员到期时间
                        $data2['userid_int'] = $id['userid_int'];
                        $data2['expire_time'] = strtotime($data['end_time']);
                        M('userexpire')->add($data2);
                    }

                }

                $this->success('操作成功', '/adminc.php?c=user');
            } 
        }else{

            $user_group = M('user_group')->field('id,name')->select();
            foreach ($user_group as $ug) {
                $usergroups[$ug['id']] = $ug['name'];
            }
            trace($usergroups, 'user_group');
            $this->assign('user_group',$usergroups);    
            $this->display();
        }
    }

    public function upbatch(){

        $file  =  realpath('./Uploads/batch.csv') ;

        if ( file_exists ( $file )) {
            $date=date("Ymd-H:i:m");
            header ( 'Content-Description: File Transfer' );
            header ( 'Content-Type: text/csv' );
            header( "Content-Disposition:  attachment;  filename= {$date}.csv");
            header ( 'Content-Transfer-Encoding: binary' );
            header ( 'Expires: 0' );
            header ( 'Cache-Control: must-revalidate' );
            header ( 'Pragma: public' );
            header ( 'Content-Length: '  .  filesize ( $file ));
            ob_clean ();
            flush ();
            readfile ( $file );
            exit;
        }   

    }
	
	//到期会员排行
	public function expire(){
		$m = M('userexpire');
		
		$group=M('user_group')->select();
		$where = array();
		if (ISSET($_POST['username'])) {
            $where['email_varchar'] = array('like', '%' . $_POST['username'] . '%');
        }
		if(I('type',0)>0){
			$where['cj_users.type'] = I('type');
		}
		
		$count = $m->where($where)->count();
        $p = getpage($count, 10);
		
		$select=$m->join('cj_users on cj_users.userid_int=cj_userexpire.userid_int')
		->join('cj_user_group on cj_users.type=cj_user_group.id')
		->where($where)->order('expire_time asc')->limit($p->firstRow, $p->listRows)->select();
	
		$ui['user_expire'] = 'active';
		$this->assign('ui', $ui);
		$this->assign('select', $select);
		$this->assign('group', $group);
		$this->assign('page', $p->show());
		$this->display();
	}
	
	
	public function expiretime(){
		$id=I('id',0);
		if($id==0){
			$this->error('参数有误');
		}
		M('userexpire')->where('userid_int='.$id)->setInc('expire_time',24*60*60*365);
		$this->success('延期操作成功', '/adminc.php?c=user&a=expire');
	}

}
