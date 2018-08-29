<?php
namespace Home\Controller;
use Think\Controller;
class FormController extends Controller{
    
    public function unlogin(){
        $sessionid=I('get.sessionid','');
        if($sessionid==''){
            if(intval(session('userid')) == 0){
                header('Content-type: text/json');
                echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录！", "obj" => null, "map" => null, "list" => null));
                exit;
            }
        }else{
            $userid=M('users')->where(array('last_session_id'=>$sessionid))->getField('userid_int');
            if(intval($userid)==0){
                header('Content-type: text/json');
                echo json_encode(array("success" => false, "code" => 1001, "msg" => "请先登录或超时，请重新登录!", "obj" => null, "map" => null, "list" => null));
                exit;
            }
        }
    }
    public function index(){
        $this->unlogin();
        $jsonstr='{"success":true,"code":200,"obj":null,"list":[';
        $where['fid'] = 0;
        $list = M('formdata')->field('id,type,fid,ipttitle,iptanswer,score,info,usid,sort')->where($where)->order('sort asc')->select();
        
        $jsonstream = '';
        foreach($list as $value){
            $jsonstream = $jsonstream .'{
                "id": '.$value['id'].',
                "type": '.$value['type'].',
                "fid": 0,
                "ipttitle": '.$value['ipttitle'].',
                "sort": '.$value['sort'].'
            },';
        }
        $jsonstr = $jsonstr.rtrim($jsonstream).']}';
        echo $jsonstr;
    }

    //创建
    public function design(){
        $this->unlogin();
        $form = M('form');
        if(IS_POST){
            $data['type'] = I('post.ftype');
            $data['usid'] = session('userid');
            $data['sceneid'] = 0;
            $data['title'] = I('post.title') ? I('post.title') : 'null';
            $data['photo'] = '/view/images/view_pic.png';//默认
            $data['content'] = I('post.content') ? I('post.content') : 'null';
            $data['istpl'] = I('post.istpl');
            $data['create_time'] = time();//创建时间
            $form->add($data);
            $n_fid = $form->getLastInsID();
            echo json_encode(array("success" => true, "code" => 200, "fid" => $n_fid, "msg" => "success", "obj" => null,"map" => null,"list" => null));
        }else{
            echo json_encode(array("success" => false, "code" => 1001, "msg" => "操作错误！", "obj" => null, "map" => null, "list" => null));
            exit;
        }
    }
    
    //添加，编辑
    public function create(){
        $this->unlogin();
        $formdata = M('formdata');
        if(IS_POST){
            $form_res = $_POST;
            if(isset($form_res['type'])){
                $data = return_form($form_res['type']);
                $data['type'] = $form_res['type'];
            }           
            $data['usid'] = session('userid');
            $data['fid'] = I('get.fid',0,'int');            
            if(isset($form_res['ipttitle'])){
                $data['ipttitle'] = $form_res['ipttitle'];
            }          
            if($form_res['type'] == 1){//标题type=1
                $ft['title'] = $form_res['ipttitle'];
            }
            if(isset($form_res['total_score'])){
                $ft['total_score'] = intval($form_res['total_score']);
            }
            if(isset($form_res['pass'])){
                $ft['pass_grade'] = intval($form_res['pass']);
            }
            M('form')->where(array('id'=>I('get.fid',0,'int')))->save($ft);
            if(isset($form_res['iptval'])){
                $data['iptval'] = $form_res['iptval'];
            }
            if(isset($form_res['score'])){
                $data['score'] = $form_res['score'];//分数
            }
            if(isset($form_res['sort'])){
                $data['sort'] = $form_res['sort'];//排序
            }
            if(I('get.id',0,'int')){
                $res = $formdata->where(array('id' => I('get.id',0,'int')))->save($data);
                $jsonstr = '{"success":true,"code":200,"msg":"success","msg":"修改成功","obj":null,"map":null,"list":null}';
            }else{
                $resid = $formdata->add($data);
                $jsonstr = '{"success":true,"code":200,"msg":"success","msg":"添加成功","obj":' . $resid . ',"map":null,"list":null}';
            }
            
        }else{
            if(I('get.fid',0,'int')){
                $where['fid'] = I('get.fid',0,'int');
                $list = $formdata->field('id,type,fid,ipttitle,iptval,iptanswer,score,info,usid,sort')->where($where)->order('sort asc')->select(); 
                $score = M('form')->field('total_score,pass_grade')->where(array('id'=>I('get.fid',0,'int')))->find();
                $jsonstr = json_encode(array("success" => "true","code" => 200,"obj" => "null","list" => $list,"score" => $score));
            }else{
                $jsonstr = json_encode(array("success" => "false","code" => 1001,"obj" => "null","list" => "你还没有创建问卷内容"));
            }
            
        }
            echo $jsonstr;
    }

    //删除
    public function del_form(){
        $this->unlogin();
        $form = M('Form');
        if (intval(session('userid'))) {
            $where['usid'] = intval(session('userid'));
        }
        if(I('get.del_id',0,'int')){
            $where['id'] = I('get.del_id',0,'int');
            $res = M('formdata')->where($where)->delete();
    
        }elseif(I('get.del_fid',0,'int')){

            $form->where(array('id' => I('get.del_fid',0,'int')))->setField(array('delete_int' => 1));
            
        }
        $jsonstr='{"success":true,"code":200,"msg":"删除成功！","obj":null,"map":null,"list":null}';
        echo $jsonstr;
    }
    
    
    public function ipt(){
         $formdata = M('formdata');
        if(I('get.fid',0,'int')){
            $res = M('form')->field('title,publishint')->where(array('id' => I('get.fid',0,'int'),'delete_int'=>0))->find();
            if(!$res['publishint']){
               $this->error('抱歉，此问卷处于草稿状态！！！');
            }
            $this->assign('title',$res['title']);
        }else{
            $this->error('参数错误！！！');
        }
       $this->display();
    }

    //发布
    public function publish(){
        $form = M('form');//,'usid'=>session('userid')
        $res = $form->field('id,total_score,pass_grade,bg_photo')->where(array('id' => I('get.fid',0,'int')))->find();
        if($res['id']){
            $list = M('formdata')->field('iptval')->where(array('fid'=>I('get.fid',0,'int'),'type' => 1))->limit(1)->select();
            $realscore = M('formdata')->where(array('fid'=>I('get.fid',0,'int')))->sum('score');
            if($res['total_score'] != $realscore){     
                $data['total_score'] = $realscore;
            }
            if(!$res['pass_grade']){
                $data['pass_grade'] = $data['total_score'] * 0.6;
            }
            if(!$res['bg_photo']){
                $data['bg_photo'] = '/view/images/preview.png';
            }
            $data['content'] = $list[0]['iptval'];            
            $data['publishint'] = 1;
            $form->where(array('id'=>I('get.fid',0,'int')))->save($data);
            $this->redirect('/#/form/preview/fid/'.I('get.fid',0,'int'));
        }else{
            exit('{"success":false,"code":1001,"msg":"参数错误","obj":null,"map":null,"list":null}');
        }
    }


    //上传图片素材
    public function upload_photo(){
       $this->unlogin();
       $upload = new \Think\Upload();
       $upload->allowExst = array('jpg','gif','png','jpeg');
       if(I('post.bgphone')){
            $upload->savePath = 'exam_form/bg/';
       }else{
            $upload->savePath = 'exam_form/';
       }
       $upload->rootPath = './Uploads/';
       $info = $upload->upload();
       if($info){
            header('Content-type: text/json');
            header('HTTP/1.1 200 ok');
            $data['photo'] = $info['file']['savepath'].$info['file']['savename'];
            echo json_encode(array("success" => true,"code"=>200,"src"=>$data['photo'],"obj"=>null));
       }else{
          header('Content-type: text/json');
            echo json_encode(array("success" => false,"code"=> 1001,"msg" => $upload->getError(),"obj"=> null,"map"=> null,"list"=> null));
            die;     
       }
    }

    //详情
    public function view(){
        $this->unlogin();
        $form = M('form');
        if(IS_POST){
            $f_data = $_POST;
            if(isset($f_data['photo'])){
                $data['photo'] = $f_data['photo'];
                $form->where(array('id'=>I('get.id',0,'int')))->save($data);
                $json = json_encode(array("success" => "true","code" => 200,"msg"=>"null","list" => 'null'));
            }else{
                $json = json_encode(array("success" => "false","code" => 1001,"msg"=>"null","list" => 'null'));
            }
        }else{
           if(I('get.id',0,'int')){
                $data = $form->field('title,photo,publishint,create_time,type')->where(array('id' => I('get.id',0,'int')))->find();
                $data['create_time'] = date('Y-m-d',$data['create_time']);
                $json = json_encode(array("success" => "true","code" => 200,"msg"=>"null","list" => $data));  
            }else{
                $json = json_encode(array("success" => "false","code" => 1001,"msg" => "null","list"=>"null"));
            } 
        }
        echo $json;                
    }

    //预览
    public function preview(){
        $formdata = M('formdata');
        $form = M('form');
        $res = $form->field('bg_photo,publishint')->where(array('id'=>I('get.fid',0,'int'),'usid'=>session('userid'),'delete_int'=>0))->find();
        if($res['publishint']){
            $jsonstr='{"success":true,"code":200,"obj":null,"bg_photo":"'.$res["bg_photo"].'","list":[';
            $where['fid'] = I('get.fid',0,'int');
            $list = $formdata->field('id,type,fid,ipttitle,iptanswer,score,info,usid,sort')->where($where)->order('sort asc')->select();
            $jsonstream = '';
            foreach($list as $value){
                $value['info'] = $value['info'] ? $value['info'] : "null"; 
                $jsonstream = $jsonstream .'{
                    "id": '.$value['id'].',
                    "type": '.$value['type'].',
                    "fid": '.$value['fid'].',
                    "ipttitle": "'.$value['ipttitle'].'",
                    "score": '.$value['score'].',
                    "info": '.$value['info'].',
                    "sort": '.$value['sort'].',
                    "usid": '.$value['usid'].'
                },';
            }
            $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';
        }else{
            $jsonstr = '{"success":false,"code":1001,"msg":"尚未发布","obj":null,"map":null,"list":null}';
        }
        
        echo $jsonstr;

    }


    //设置考试页面的背景图
    public function bgphoto(){
       $form = M('form');
       if(I('get.fid',0,'int')){
            if(I('get.tpl')){
                $data['bg_photo'] = I('get.tpl');
                $res = $form->where(array('id'=>I('get.fid',0,'int')))->save($data);
                $json = '{"success":true,"code":200,"msg":"成功修改背景图！！！","obj":null,"map":null,"list":null}';
            }else{
                $json = '{"success":false,"code":1001,"msg":"图片修改出错！！！","obj":null,"map":null,"list":null}';
            }
       }else{
            $json = '{"success":false,"code":1001,"msg":"参数有误！！！","obj":null,"map":null,"list":null}';
       }
       echo $json;
    }

    //考试/调查
    public function exampaper(){
        //获取考卷id     
        $formdata = M('formdata');
        if(I('get.fid',0,'int')){
            $res = M('form')->field('type,publishint,bg_photo')->where(array('id' => I('get.fid',0,'int'),'delete_int'=>0))->find();
            $jsonstr='{"success":true,"code":200,"ftype":"'.$res['type'].'","tpl":"'.$res['bg_photo'].'","obj":null,"startime":'.time().',"list":[';
            if($res['publishint']){
                $list = $formdata->where(array('fid' => I('get.fid',0,'int')))->order('sort asc')->select();
                $jsonstream = '';
                foreach($list as $value){
                    $value['info'] = $value['info'] ? $value['info'] : 'null';
                    $jsonstream = $jsonstream .'{
                        "id": '.$value['id'].',
                        "type": '.$value['type'].',
                        "fid": '.$value['fid'].',
                        "ipttitle": "'.$value['ipttitle'].'",
                        "score": '.$value['score'].',
                        "info": '.$value['info'].',
                        "sort": '.$value['sort'].',
                        "usid": '.$value['usid'].'
                    },';
                }
                $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';
            }else{
               $jsonstr =  '{"success":false,"code":1001,"msg":"此卷还是草稿状态，尚未发布！","obj":null,"map":null,"list":null}';
            }
        }else{
            $jsonstr = '{"success":false,"code":1001,"msg":"参数错误！","obj":null,"map":null,"list":null}';
        }
        echo $jsonstr;
    }


    //评分
    public function score(){
        $formdata = M('formdata');
        $examhistory = M('examhistory');
        $form = M('form');
        $exam = $form->field('id,type,title')->where(array('id' => I('get.fid',0,'int'),'delete_int'=>0))->select();
        $sessionvars = $formdata->where(array('fid' => I('get.fid',0,'int')))->select();
        foreach($sessionvars as $k => $v){
            $sessionvars[$k]['iptanswer'] = json_decode($v['iptanswer'],true);
        }
        $needhand = 0;
        if(IS_POST){
            $question = I('post.question');
            if($exam[0]['type'] == 2){
                $scorelist = array();
                foreach($sessionvars as $k => $tmp){
                    if(($tmp['type'] > 2 && $tmp['type'] < 8) || $tmp['type'] == 9){//1-7都是客观题,9新增的判断题
                        foreach($question as $key => $value){
                            if($key == $tmp['id']){ 
                                if($tmp['type'] != 7){//连线题的统计例外
                                    if(!array_diff($tmp['iptanswer'],$value)){
                                        $score = $tmp['score'];
                                    }else{
                                        $score = 0;
                                    }
                                }else{
                                    $correct_num = count(array_intersect($tmp['iptanswer'],$value));
                                    if($correct_num){
                                        $score = round((($tmp['score'] / count($tmp['iptanswer'])) * $correct_num),2);
                                    }else{
                                        $score = 0;
                                    }
                                }                  
                                    $scorelist["$key"] = $score; 
                            }
                        }
                    }elseif(count($tmp) && $tmp['type'] == 8){
                        $needhand = 1;
                    }       
                }
                $history['escore'] = array_sum($scorelist);
                $history['escorelist'] = json_encode($scorelist);
            }
            //考生考卷信息
            foreach($sessionvars as $k => $tmp){
                if($tmp['type'] == 11){//11.姓名 12.部门 。。。
                    foreach($question as $key => $value){
                        if($key == $tmp['id']){                         
                           $history['eusername'] = $value[0]; 
                        }
                    }
                }elseif($tmp['type'] < 17 && $tmp['type'] > 11){
                    foreach($question as $key => $value){
                        if($key == $tmp['id']){                         
                           $userinfo[$tmp['ipttitle']] = $value; 
                        }
                    }
                }       
            }
            $history['efid'] = $exam[0]['id'];
            $history['etitle'] = $exam[0]['title'];
            $history['etype'] = $exam[0]['type'];
            $history['einfo'] = json_encode($userinfo);
            $history['eanswerlist'] = json_encode($question);
            $history['equestion'] = json_encode($sessionvars);
            $history['estime'] = I('get.time');
            $history['ehtime'] = histime(time()-$history['estime']);
            if(!$needhand){
                $resid = $examhistory->add($history);
                //$jsonstr = '{"success":"true","code":200,"msg":"操作成功","forwarurl":"index.php?c=form&a=readpaper"}';
            }else{
                $history['ehand'] = 1;
                $resid = $examhistory->add($history);
                //$jsonstr = '{"success":"true","code":200,"msg":"操作成功,本卷需要教师评分，请等待评分结果"}';
            }
            //echo $jsonstr;
            if($exam[0]['type'] == 2){
                $this->success('考卷填写成功,为你跳转到成绩页面！',U('Form/testResult',array('v'=>time().'u'.$resid)));
            }else{
                $this->success('问卷填写成功,为你跳转到成绩页面！','http://'.$_SERVER['SERVER_NAME']);
            }
        }else{
            exit('{"success":false,"code":1001,"msg":"操作错误！","obj":null,"map":null,"list":null}');
        }
    }

    //我的考卷
    public function haveexam(){
        $form = M('form');
        $where['usid'] = session('userid');
        $where['delete_int'] = 0;
        if(I('get.type',0,'int')){
            $where['type'] = I('get.type',0,'int');
        }
        $list = $form->field('id,title,type')->where($where)->page(I('get.pageNo',1,"int"),I('get.pageSize',17,"int"))->select();
        $f_count = $form->where($where)->count();
        $jsonstr='{"success":true,"code":200,"obj":null,"map":{"count":'.$f_count.',"pageNo":'.I('get.pageNo',1,'int').',"pageSize":'.I('get.pageSize',17,"int").'},"list":[';
        if($list){
            $jsonstream = '';
            foreach($list as $value){
                $jsonstream = $jsonstream .'{
                    "id": '.$value['id'].',
                    "type": '.$value['type'].',
                    "title": "'.$value['title'].'"
                },';
            }
            $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';    
            echo $jsonstr;
        }
    }
    
    //显示需要批改的用户试卷（含主观题）
    public function needhand(){
        $examhistory = M('examhistory');
        $where['efid'] = I('get.id',0,'int');
        $where['ehand'] = 1;
        $list = $examhistory->field('eid,etitle,eusername,estime')->where($where)->page(I('get.pageNo',1,"int"),I('get.pageSize',15,"int"))->select();
        if($list){
            $f_count = $examhistory->where($where)->count();
            $jsonstr='{"success":true,"code":200,"obj":null,"map":{"count":'.$f_count.',"pageNo":'.I('get.pageNo',1,'int').',"pageSize":'.I('get.pageSize',15,"int").'},"list":[';
            $jsonstream = '';
            foreach($list as $key => $value){
                $list[$key]['estime'] = date('Y-m-d',$value['estime']);
                $jsonstream = $jsonstream .'{
                    "eid": '.$value['eid'].',
                    "etitle": "'.$value['etitle'].'",
                    "eusername": "'.$value['eusername'].'",
                    "estime": "'.date('Y-m-d',$value['estime']).'"
                },';
            }
            $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';
            echo $jsonstr;
        }
        
    }

    //主观题评分
    public function makescore(){
        $examhistory = M('examhistory');
        if(I('get.eid',0,'int')){
            $where['eid'] = I('get.eid',0,'int');
            $eh = $examhistory->field('efid,equestion,eanswerlist,escore,escorelist')->where($where)->select();
            if(IS_POST){//提交分数
                $postscore = I('post.score');
                $oscore = json_decode($eh[0]['escorelist'],true);
                $nscorelist = $oscore + $postscore;
                $args['escore'] = array_sum($nscorelist);
                $args['escorelist'] = json_encode($nscorelist);
                $args['ehand'] = 0;
                $examhistory->where($where)->save($args);
                //$jsonstr = '{"success":true,"code":200,"msg":"评分成功！","obj":null,"map":null,"list":null}';
                $this->success('评分成功！','/#/form/checkQuestion/'.$eh[0]['efid']);
            }else{
                $question = json_decode($eh[0]['equestion'],true);
                $answer = json_decode($eh[0]['eanswerlist'],true);
                foreach($question as $key => $value){
                    if($value['type'] == 8){//问答题
                        foreach($answer as $k => $v){
                            if($value['id'] == $k){
                                $list[$value['id']]['question'] = $value['ipttitle'];
                                $list[$value['id']]['answer'] = $v[0];
                                $list[$value['id']]['score'] = $value['score'];
                                $list[$value['id']]['sort'] = $value['sort'];
                            }
                        }
                    }
                }
                $jsonstr='{"success":true,"code":200,"obj":null,"list":[';
                $jsonstream = '';
                foreach($list as $key => $value){
                    $jsonstream = $jsonstream .'{
                        "id": '.$key.',
                        "question": "'.$value['question'].'",
                        "answer": "'.$value['answer'].'",
                        "score": '.$value['score'].',
                        "sort": '.$value['sort'].'
                    },';
                }
                $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';
            }
            echo $jsonstr;
        }
    }

    //直观统计
    public function intuitive($fid,$fine_score,$good_score){
        if(intval($fid)){
            $failed_num = $pass_num = $fine_num = $good_num = 0;
            $where['efid'] = $fid;
            $score = M('form')->field('total_score,pass_grade')->where(array('id'=>$fid))->find();
            if(!$fine_score){
                $fine_score = round($score['total_score'] * 0.8,0);
            }
            if(!$good_score){
                $good_score = round($score['total_score'] * 0.9,0);
            }
            $list = M('examhistory')->field('escore')->where($where)->select();
            foreach($list as $key => $value){
               if($value['escore'] >= $score['pass_grade']){
                    if($value['escore'] >= $fine_score && $value['escore'] < $good_score){
                        $fine_num++;
                    }elseif($value['escore'] >= $good_score){
                        $good_num++;
                    }else{    
                        $pass_num++;
                    }
               }else{
                    $failed_num++;
               } 
            }
            $allnum = count($list);
            $res['allnum'] = $allnum;
            $res['fine_score'] = $fine_score;
            $res['good_score'] = $good_score;
            $res['percent'] = array(
                "failed_percent" => round(($failed_num/$allnum)*100,1). '%',
                "pass_percent" => round(($pass_num/$allnum)*100,1). '%',
                "fine_percent" => round(($fine_num/$allnum)*100,1). '%',
                "good_percent" => round(($good_num/$allnum)*100,1). '%',
                );
            $res['pnum'] = array(
                "failed_num" => $failed_num,
                "pass_num" => $pass_num,
                "fine_num" => $fine_num,
                "good_num" => $good_num,
                );
            return json_encode($res,true);
        }else{
            return false;
        }
    }

    //数据统计
    public function scorelist(){
        $this->unlogin();
        $examhistory = M('examhistory');
        $where['efid'] = I('get.fid',0,'int');
        $where['ehand'] = 0;
        $list = $examhistory->field('eid,etitle,escore,eusername,estime,einfo')->where($where)->order('eid desc')->page(I('get.pageNo',1,"int"),I('get.pageSize',15,"int"))->select();
        if($list){
            $fine_score = I('get.fine_score',0,'int')? I('get.fine_score',0,'int'):0;
            $good_score = I('get.good_score',0,'int')?I('get.good_score',0,'int'):0;
            $st_res = $this->intuitive(I('get.fid',0,'int'),$fine_score,$good_score) ? $this->intuitive(I('get.fid',0,'int'),$fine_score,$good_score) : 'null';
            $f_count = $examhistory->where($where)->count();
            $jsonstr='{"success":true,"code":200,"obj":null,"map":{"count":'.$f_count.',"pageNo":'.I('get.pageNo',1,'int').',"pageSize":'.I('get.pageSize',15,"int").'},"st_res":'.$st_res.',"list":[';
            $jsonstream = '';
            foreach($list as $key => $value){
                $list[$key]['estime'] = date('Y-m-d',$value['estime']);
                $jsonstream = $jsonstream .'{
                    "eid": '.$value['eid'].',
                    "etitle": "'.$value['etitle'].'",
                    "eusername": "'.$value['eusername'].'",
                    "escore": '.$value['escore'].',
                    "einfo": '.$value['einfo'].',
                    "estime": "'.date('Y-m-d',$value['estime']).'"
                },';
            }
            $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';
            echo $jsonstr;
        }
    }

    public function aread($eid){
        if($eid){
            $examhistory = M('examhistory');
            $where['eid'] = $eid;
            $data = $examhistory->field('etitle,equestion,eanswerlist,escore,eusername,ehtime')->where($where)->select();
            $question = json_decode($data[0]['equestion'],true);
            $answer = json_decode($data[0]['eanswerlist'],true);
            foreach($question as $key => $value){
                if($value['type'] != 1 && $value['type'] != 2){
                    foreach($answer as $k => $v){
                        if($value['id'] == $k){
                            $list[$value['id']]['ipttitle'] = $value['ipttitle'];
                            $list[$value['id']]['question'] = $value['info'] ? $value['info'] : 'null';
                            $list[$value['id']]['tanswer'] = json_encode($value['iptanswer']);//正确答案
                            $list[$value['id']]['answer'] = json_encode($v);//考生答案
                            $list[$value['id']]['type'] = $value['type'];
                            $list[$value['id']]['e_score'] = $value['score'] ? $value['score'] : 'null';
                        }
                    }
                }
            }
            $jsonstr='{"success":true,"code":200,"obj":null,"title":"'.$data[0]['etitle'].'","time":"'.$data[0]['ehtime'].'","username":"'.$data[0]['eusername'].'","score":"'.$data[0]['escore'].'","list":[';
            $jsonstream = '';

            foreach($list as $key => $value){
                $jsonstream = $jsonstream .'{
                    "id": '.$key.',
                    "ipttitle": "'.$value['ipttitle'].'",
                    "question": '.$value['question'].',
                    "tanswer": '.$value['tanswer'].',
                    "answer": '.$value['answer'].',
                    "type": '.$value['type'].',
                    "e_score": '.$value['e_score'].'
                },';
            }
            $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';
            return $jsonstr;
       }else{
            return false;
       }
    }

    //用户考卷情况
    public function detailst($eid){
        if($eid){
            $truesb = 0;
            $examhistory = M('examhistory');
            $data = $examhistory->field('cj_examhistory.eusername,cj_examhistory.escorelist,cj_examhistory.escore,cj_examhistory.ehand,cj_examhistory.ehtime,cj_form.total_score,cj_form.pass_grade,cj_form.id')->where(array('cj_examhistory.eid'=>$eid))->join('cj_form ON cj_examhistory.efid = cj_form.id')->find();
            $where['fid'] = $data['id'];
            $where['type'] = array('between','3,9');
            $data['allsb'] = M('formdata')->where($where)->count();

            $ctn_array = M('formdata')->field('iptanswer,score')->where(array('fid'=> $data['id'],'type'=>7))->select();
            $ctnnum = $ctnscore = 0;
            foreach($ctn_array as $key => $value){
                $ctnnum += count(json_decode($value['iptanswer'],true));
                $ctnscore += $value['score']; 
            }
            $data['tb'][0]['rd'] = $data['tb'][0]['rdsc'] = $data['tb'][1]['co'] = $data['tb'][1]['cosc'] = $data['tb'][2]['fl'] = $data['tb'][2]['flsc'] = $data['tb'][3]['jd'] = $data['tb'][3]['jdsc'] = $data['tb'][4]['ct'] = $data['tb'][4]['ctsc'] = 0;
            $data['tb'][0]['radio'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>3))->count();
            $data['tb'][1]['choice'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>4))->count();
            $data['tb'][2]['fill'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>5))->count();
            $data['tb'][3]['judg'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>9))->count();
            $data['tb'][4]['cnt'] = $ctnnum;
            $data['tb'][0]['radio_s'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>3))->sum('score');
            $data['tb'][1]['choice_s'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>4))->sum('score');
            $data['tb'][2]['fill_s'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>5))->sum('score');
            $data['tb'][3]['judg_s'] = M('formdata')->where(array('fid'=> $data['id'],'type'=>9))->sum('score');
            $data['tb'][4]['ctn_s'] = $ctnscore;
            $scorelist = json_decode($data['escorelist'],true);
            foreach($scorelist as $key => $v){
                $type = M('formdata')->where(array('id'=> $key))->getField('type');
                if($type == 3 && $v > 0){
                   $data['tb'][0]['rd']++;
                   $data['tb'][0]['rdsc'] += $v; 
                }elseif($type == 4 && $v > 0){
                    $data['tb'][1]['co']++;
                    $data['tb'][1]['cosc'] += $v;
                }elseif($type == 5 && $v > 0){
                    $data['tb'][2]['fl']++;
                    $data['tb'][2]['flsc'] += $v;
                }elseif($type == 9 && $v > 0){
                    $data['tb'][3]['jd']++;
                    $data['tb'][3]['jdsc'] += $v;
                }elseif($type == 7 && $v > 0){
                    $ctnall = M('formdata')->field('iptanswer,score')->where(array('id'=> $key))->find();
                    $ctnrn = $v / ($ctnall['score'] / count(json_decode($ctnall['iptanswer'],true)));
                    $data['tb'][4]['ct'] += round($ctnrn,0);
                    $data['tb'][4]['ctsc'] += round($v,2); 
                }
                if($v > 0){
                    $truesb ++;
                }
            }
            $data['truesb'] = $truesb;

            return json_encode($data,true);

        }else{
            return false;
        }
    }

    //阅卷
    public function readpaper(){
        $this->unlogin();
        $json = $this->aread(I('get.eid',0,'int'));
        echo $json;
    }

    //考生提交后阅卷
    public function examread(){
       $json = $this->aread(I('get.eid',0,'int'));
       echo $json; 
    }

    public function testMarking(){
        $this->display();
    }

    //考生提交后统计
    public function resexam(){
        $json = $this->detailst(I('get.eid',0,'int'));
        echo $json;
    }

    //调查问卷的信息统计，除开填空问答题
    public function surveynum(){
        $this->unlogin();
        $examhistory = M('examhistory');
        if(I('get.efid',0,'int')){  
            $where['efid'] = I('get.efid',0,'int');
            $data = $examhistory->field('equestion')->where($where)->order('eid desc')->select();
            $answer = $examhistory->field('eanswerlist')->where($where)->select();
            $ques = json_decode($data[0]['equestion'],true);
            $list3 = array();
            foreach($answer as $key => $value){
                $answer[$key] = json_decode($value['eanswerlist'],true);
            }
            foreach($ques as $key => $value){
                if($value['type'] == 3 || $value['type'] == 4 || $value['type'] == 6 || $value['type'] == 9 || $value['type'] == 17){
                    foreach($answer as $k => $v){
                        for($i=0;$i<count($value['iptanswer']);$i++){
                            $num = 0;
                            if(in_array($value['iptanswer'][$i],$v[$value['id']])){
                                $num ++;
                                $list[$value['id']][$value['iptanswer'][$i]] += $num;
                            }else{
                                $list[$value['id']][$value['iptanswer'][$i]] += 0;
                            }
                        }
                    }
                }elseif($value['type'] == 5 || $value['type'] == 8){
                   foreach($answer as $k => $v){
                        $list3[$value['id']][] = $v[$value['id']];
                    }
                }
            }
            $sum = count($answer);
            foreach($list as $key => $value){
                foreach($value as $k => $v){
                    $list[$key][$k] = round(($v/$sum)*100,1). '%';
                }
            }
            $list = $list + $list3;
            $history['escorelist'] = json_encode($list);
            $history['escore'] = $sum;
            $examhistory->where($where)->save($history);
            $res = $examhistory->field('etitle,equestion,escorelist,escore')->order('eid desc')->limit(1)->where($where)->select();
            $equestion = json_decode($res[0]['equestion'],true);
            $escorelist = json_decode($res[0]['escorelist'],true);
            foreach($equestion as $key => $value){
                foreach($escorelist as $k => $v){
                    if($value['id'] == $k){
                        $list2[$value['id']]['type'] = $value['type'];
                        $list2[$value['id']]['ipttitle'] = $value['ipttitle'];
                        $list2[$value['id']]['question'] = json_encode($value['info']);
                        $list2[$value['id']]['answer'] = json_encode($v);
                    }
                }
            }
            $jsonstr='{"success":true,"code":200,"obj":null,"title":"'.$res[0]['etitle'].'","score":"'.rtrim($res[0]['escore'],'.00').'","list":[';
            $jsonstream = '';
            foreach($list2 as $key => $value){
                $jsonstream = $jsonstream .'{
                    "id": '.$key.',
                    "type": '.$value['type'].',
                    "ipttitle": "'.$value['ipttitle'].'",
                    "question": '.$value['question'].',
                    "answer": '.$value['answer'].'
                },';
            }
            $jsonstr = $jsonstr.rtrim($jsonstream,',').']}';

        }
          echo $jsonstr;    	

    }
    
    //模板中心
    public function template(){
        $this->unlogin();
        $formtem = M('form');
        if(I('get.new_form',0,'int')){//最新
            $order = 'id desc';
        }else{
            $order = 'id asc';
        }
        if(I('get.hot_form',0,'int')){//最热
            $where['recommend_int'] = 1;
         }
        if(I('get.form_type',0,'int')){//分类
            $where['type'] = I('get.form_type',0,'int');
        }
        if(I('get.search','','string')){//搜索
            $where['title'] = array('like','%' . trim(I('search','','string')) . '%');
        }
        $where['istpl'] = 1;
        $where['delete_int'] = 0;
        $list = $formtem->field('id,type,title,photo')->where($where)->order($order)->page(I('get.pageNo',1,"int"),I('get.pageSize',16,"int"))->select();
        $f_count = $formtem->where($where)->count();
        $form_type = C('FTYPE');
        echo json_encode(array("success" => "true","code" => 200,"count"=>$f_count,"pageNo"=>I('get.pageNo',1,"int"),"pageSize"=>I('get.pageSize',16,"int"),"obj" => "null","list" => $list,"form_type" => $form_type));
    }

    //模板预览(这个应该可以跟其他的预览一样)

    //模板套用
    public function paraphrase(){
        $this->unlogin();
        $formdata = M('formdata');
        $form = M('form');
        if(IS_POST){
            if(I('get.fid',0,'int')){
                $oform = $form->field('type,sceneid,title,content,photo')->where(array('id' => I('get.fid',0,'int')))->find();
                $oform['usid'] = session('userid');
                $res = $form->add($oform);
                $n_fid = $form->getLastInsID();
                $list = $formdata->where(array('fid' => I('get.fid',0,'int')))->select();
                $datainfo = array();
                for($i=0;$i<count($list);$i++){
                    $datainfo[$i]['ipttitle'] = $list[$i]['ipttitle'];
                    $datainfo[$i]['iptval'] = $list[$i]['iptval'];
                    $datainfo[$i]['iptanswer'] = $list[$i]['iptanswer'];
                    $datainfo[$i]['score'] = $list[$i]['score'];
                    $datainfo[$i]['sort'] = $list[$i]['sort'];
                    $datainfo[$i]['info'] = $list[$i]['info'];
                    $datainfo[$i]['type'] = $list[$i]['type'];
                    $datainfo[$i]['usid'] = session('userid') ? session('userid') : 0;
                    $datainfo[$i]['fid'] = $n_fid;  
                }
                if(count($datainfo)){
                    $formdata->addAll($datainfo);
                    
                }
                echo json_encode(array("success" => true,
                    "code" => 200,
                    "msg" => "success",
                    "obj" => $res,
                    "map" => null,
                    "list" => null
                    )
                );
            }
        }else{
            exit;
        }
    }

    //导出成绩
    public function outscore(){
        $this->unlogin();
        $examhistory = M('examhistory');
        if(I('get.efid',0,'int')){
            $where['efid'] = I('get.efid',0,'int');
            $fname = 'Uploads/csv/'.time().'-score.csv';
            $list = $examhistory->field('etitle,eusername,escore,einfo')->where($where)->select();
            if($list[0]['einfo']){
                $key2 = count(json_decode($list[0]['einfo'],true));
                $r[0][0] = iconv("UTF-8","GBK","考场名");
                $r[0][1] = iconv("UTF-8","GBK","姓名");
                foreach(json_decode($list[0]['einfo'],true) as $k => $value){
                    $r[0][] = iconv("UTF-8","GBK",$k);
                };
                $r[0][$key2+2] = iconv("UTF-8","GBK","总分");
            }else{
                $r[0] = array("0"=>iconv("UTF-8","GBK","考场名"),"1"=>iconv("UTF-8","GBK","姓名"),"2"=>iconv("UTF-8","GBK","总分")); 
            }
            foreach($list as $key => $p){
               /* $r[$key+1] = array('0' => iconv("UTF-8","GBK",$p['etitle']),'1' => iconv("UTF-8","GBK",$p['eusername']),'2' => $p['escore']);*/
                $r[$key+1][0] = iconv("UTF-8","GBK",$p['etitle']);
                $r[$key+1][1] = iconv("UTF-8","GBK",$p['eusername']);
                if($list[$key]['einfo']){
                    foreach(json_decode($list[$key]['einfo'],true) as $ke => $v){
                        $r[$key+1][] = iconv("UTF-8","GBK",$v[0]);
                    };
                };
                $r[$key+1][$key2+2] = $p['escore'];

            }           
            if(outCsv($fname,$r)){
                $result = array(
                    "success" => true,
                    "code" => 200,
                    "msg" => "导出成功，转入下载页面，如果浏览器没有相应，请<a href=\"{$fname}\">点此下载</a>",
                    "forwardUrl" => "{$fname}"
                );
            }else{
                $result = array(
                    "success" => false,
                    "code" => 1001,
                    "msg" => "导出失败"
                );
            }
               
        }else{
             $result = array(
                "success" => false,
                "code" => 1001,
                "msg" => "参数有误"
            );
        }
        echo json_encode($result);
        exit;

    }

}
?>