<?php
namespace Home\Controller;
use Think\Controller;
class ScenedataController extends Controller{

    public function _initialize(){
        header('Content-type: application/json;charset=UTF-8');
	}

    public function getdata(){
		$_scenedata = M('scenedata');
		$_scenedatadetail = M('scenedatadetail');
		$where['sceneid_bigint']  = intval(I('get.id',0));
		$where['userid_int']  = intval(session('userid'));
		$scenedata_list=$_scenedata->where($where)->order('dataid_bigint asc')->select();
 

		$pageshowsize = I('get.pageSize',10);
		if($pageshowsize>10){
			$pageshowsize = 10;
		}

		$wheredetail['sceneid_bigint']  = I('get.id',0);
		$_scenedatadetail_list=$_scenedatadetail->where($wheredetail)->order('detailid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		$_scenedatadetail_count=$_scenedatadetail->where($wheredetail)->count();
			//\Think\Log::write('$scenedata_list ：'."\n".var_export($scenedata_list,true)."\n\n -----------\n");
		//echo d()->getlastsql();
		//print_r($scenedata_list);
		if(count($scenedata_list)>0)
		{
			$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":{"count":'.$_scenedatadetail_count.',"pageNo":'.I('get.pageNo',0).',"pageSize": '.$pageshowsize.'},"list":[["ID",';
			$jsonstrtemp = '';
			$listkey='';
			$other_info_arr=array();
			$element_type_arr=array();
			
			foreach($scenedata_list as $vo){
				$jsonstrtemp = $jsonstrtemp .''.json_encode($vo["elementtitle_varchar"]).',';
				$listkey=$listkey .$vo["elementid_int"].',';
				if(isset($vo['other_info'])&&$vo['other_info']){
					$choices_arr=object_array(json_decode($vo["other_info"]));
						//\Think\Log::write('$choices_arr ：'."\n".var_export($choices_arr,true)."\n\n -----------\n");
		
					$tt=array();
					foreach($choices_arr['options'] as $choices){
						//\Think\Log::write('$choices ：'."\n".var_export($choices,true)."\n\n -----------\n");
						$tt[$choices['id']] =$choices['label'];
					}
					//\Think\Log::write('$tt ：'."\n".var_export($tt,true)."\n\n -----------\n");
					$other_info_arr[$vo["elementid_int"]]=$tt;
					$element_type_arr[$vo["elementid_int"]]=$vo['elementtype_int'];
					
				}else{
					 $other_info_arr[$vo["elementid_int"]]= array(); 
					 $element_type_arr[$vo["elementid_int"]]=array();
				}				 
			}
		
			//\Think\Log::write('$other_info_arr ：'."\n".var_export($other_info_arr,true)."\n\n -----------\n");
			$listkey = explode(',',rtrim($listkey,','));
			$jsonstr = $jsonstr.$jsonstrtemp.'"时间"],';
			$jsonstrtemp = '';			
			foreach($_scenedatadetail_list as $vo2){
				$tempjson = json_decode($vo2["content_varchar"],true);
				$jsonstrtemp = $jsonstrtemp.'["'.$vo2['detailid_bigint'].'",';			
				foreach($listkey as $vo3){
					$re_detail_val='';
					$data_detail_val=$tempjson['eq']['f_'.$vo3];
					if($data_detail_val&&$other_info_arr[$vo3]){
						if($element_type_arr[$vo3]=='c'){
							$data_detail_val_arr=explode(',',$data_detail_val);
							foreach($data_detail_val_arr as $val){
								$re_detail_val.=$other_info_arr[$vo3][$val].',';
							}
							$re_detail_val=rtrim($re_detail_val,',');
						}else{
							$re_detail_val=$other_info_arr[$vo3][$data_detail_val];
						}
						$jsonstrtemp = $jsonstrtemp .json_encode($re_detail_val).',';
					}else{
						$jsonstrtemp = $jsonstrtemp .json_encode($tempjson['eq']['f_'.$vo3]).',';
					}
					
				}
				$jsonstrtemp = $jsonstrtemp.'"'.$vo2['createtime_time'].'"],';			
			}
			if($jsonstrtemp == '')
			{
				$jsonstrtemp = '[]';
			}
			$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		}
		else
		{
			$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":0,"pageNo":1,"pageSize":10},"list":[]}';
		}
		echo $jsonstr;

    }
	public function delete(){
		$map['sceneid_bigint']= I('get.sceneId');
		$map['detailid_bigint']=array('in',I('get.dataIds'));
		$renum= M('scenedatadetail')->where($map)->delete();
		
		if($renum){
			M('scene')->where("sceneid_bigint='".$map['sceneid_bigint']."'")->setDec('datacount_int',$renum)	;
			 
		}
		
		$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
		echo $jsonstr;
	}
	public function excel(){
		$_scenedata = M('scenedata');
		$_scenedatadetail = M('scenedatadetail');
		$where['sceneid_bigint']  = I('get.id',0);
		$where['userid_int']  = intval(session('userid'));
		$_scene_list=$_scenedata->where($where)->order('dataid_bigint asc')->select();

		
	 
		$wheredetail['sceneid_bigint']  = I('get.id',0);
		$_scenedatadetail_list=$_scenedatadetail->where($wheredetail)->order('detailid_bigint desc')->select();
		$_scene_count=$_scenedatadetail->where($wheredetail)->count();
		//$jsonstr = ',,,,,,,,,,,,'.utf2gb('').','."\n";  		
		//$jsonstr .= ',total:'.$_scene_count.',,,,,,,,,,,,'."\n"; 
		   $jsonstrtemp = '';
			$listkey='';
			$other_info_arr=array();
            $element_type_arr=array();
			foreach($_scene_list as $vo){
			   //$data .=  utf2gb('姓名').','.utf2gb('性别') ;
				$jsonstrtemp = $jsonstrtemp . $vo["elementtitle_varchar"].','  ;     //''.json_encode($vo["elementtitle_varchar"]).',';
				$listkey=$listkey .$vo["elementid_int"].',';
				if(isset($vo['other_info'])&&$vo['other_info']){
                    $choices_arr=object_array(json_decode($vo["other_info"]));
                    $tt=array();
                    foreach($choices_arr['options'] as $choices){
                        $tt[$choices['id']] =$choices['label'] ;
                    }
    
                    $other_info_arr[$vo["elementid_int"]]=$tt;
                    $element_type_arr[$vo["elementid_int"]]=$vo['elementtype_int'];
                    
                }
			}

			$listkey = explode(',',rtrim($listkey,','));
			$jsonstr = $jsonstr.$jsonstrtemp. '提交时间'; 
			$jsonstrtemp = '';			
			foreach($_scenedatadetail_list as $vo2){
				$tempjson = json_decode($vo2["content_varchar"],true);
				$jsonstrtemp = $jsonstrtemp;		
				foreach($listkey as $vo3){
				  /*$jsonstrtemp = $jsonstrtemp . utf2gb($tempjson['eq']['f_'.$vo3]).',';*/
				  	$re_detail_val='';
                    $data_detail_val=$tempjson['eq']['f_'.$vo3];
                    if($data_detail_val&&$other_info_arr[$vo3]){
                        if($element_type_arr[$vo3]=='c'){
                            $data_detail_val_arr=explode(',',$data_detail_val);
                            foreach($data_detail_val_arr as $val){
                                $re_detail_val.=$other_info_arr[$vo3][$val].',';
                            }
                            $re_detail_val=rtrim($re_detail_val,',');
                        }else{
                            $re_detail_val=$other_info_arr[$vo3][$data_detail_val];
                        }
                        $jsonstrtemp = $jsonstrtemp .$re_detail_val.',';
                    }else{
                        $jsonstrtemp = $jsonstrtemp .$tempjson['eq']['f_'.$vo3].',';
                    }
				}
			$jsonstrtemp = $jsonstrtemp.$vo2['createtime_time']."<br>"; 			
			}
			$filename = '我的场景数据-'.date('YmdHis').".xls";//文件名
			header("Content-type:text/csv;charset=UTF-8");
			header("Content-Disposition:attachment;filename=".$filename);
			header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
			header('Expires:0');
			header('Pragma:public');

			$title=explode(',',$jsonstr);
			$content=explode('<br>',$jsonstrtemp);
			$this->assign('total',$_scene_count);
			$this->assign('title',$title);
			$this->assign('content',$content);
			$this->display();die;

			//print_r($title);die;
			//print_r($content);die;
		//$jsonstr = $jsonstr.$jsonstrtemp ;
		//$jsonstr = iconv("UTF-8","GBK", $jsonstr.$jsonstrtemp);
		//$filename = '我的场景数据-'.date('YmdHis').".csv";//文件名
		
		//exit($jsonstr); 
	}
    public function add(){
		$m_scenedata=M('scenedatadetail');
		$datainput['sceneid_bigint'] = I("get.id",0);
		$datainput['ip_varchar'] = get_client_ip();
		$datainput['createtime_time'] = date('y-m-d H:i:s',time());
		$datainput['userid'] = intval(session('userid'));
		$datainput['flag'] = I("get.flag",'');
		$datainput['pageid_bigint'] = I("get.pageid",0);
		
		//echo json_encode($_POST);exit;
		$datainput['content_varchar'] = json_encode($_POST);
		$result = $m_scenedata->data($datainput)->add();
		if($result)
		{
			$m_scene=M('Scene');
			$where['sceneid_bigint'] = I('get.id',0);
			$m_scene->where($where)->setInc('datacount_int');
		}
		
		$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":0,"pageNo":1,"pageSize":10},"list":[]}';
		echo $jsonstr;
    }

    public function getcount(){
		$_scene = M('scene');
		$where['userid_int']  = intval(session('userid'));
		$where['delete_int']  = 0;
		$_scene_list=$_scene->where($where)->sum('datacount_int');
		echo '{"success":true,"code":200,"msg":"success","obj":'.$_scene_list.',"map":null,"list":null}';
    }
	public function statSum(){
		$_scene = M('scene');
		$sessionid=I('get.sessionid','');
		if($sessionid!=''){
			$userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
		}else{
			$userid=intval(session('userid'));
		}
		$where['userid_int'] = intval($userid);
		$where['delete_int'] = 0;
		$datacount = $_scene -> where($where) -> sum('datacount_int');		
		$hitcount=$_scene->where($where)->sum('hitcount_int');
		$open = $_scene->where($where) ->count();
		
		$datacount=$datacount?intval($datacount):0;	 
		$hitcount=$hitcount?intval($hitcount):0;	 
		$open=$open?intval($open):0;	 
		
		echo '{"success":true,"code":200,"msg":"操作成功","obj":{"dt":'.$datacount.',"open":'.$open.',"pv":'.$hitcount.'},"map":null,"list":null}';
	}
} 
