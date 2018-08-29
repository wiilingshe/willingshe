<?php
ini_set("error_reporting","E_ALL & ~E_NOTICE");
session_start();
//ini_set("error_reporting","E_ALL & ~E_NOTICE");
header("Content-type: text/html; charset=utf-8");
ini_set('max_execution_time', 600);
$starttime = explode(' ',microtime());
$db=require_once('Application/Common/Conf/systemConfig.php');
$conn = mysql_connect($db['DB_HOST'],$db['DB_USER'],$db['DB_PWD']);
mysql_query("set character set 'utf8'");//读库 
mysql_query("set names 'utf8'");//写库 
mysql_select_db($db['DB_NAME'],$conn);

$sql="select * from ".$db['DB_PREFIX']."psd where isok=0 order by id desc limit 1";

$result=mysql_query($sql);
if($result) {
	$rs=mysql_fetch_assoc($result);
	
	if($rs){
		
		
		$userid=$rs['userid'];
		$sceneid=$rs['sceneid'];
		$pageid=$rs['pageid'];
		$psd='Uploads/'.$rs['url'];
		//echo $psd;die;
		$pt=explode('/',$rs['url']);
		array_pop($pt);
		$savePath=implode('/',$pt).'/';

		$im = new \Imagick(dirname(__FILE__).'/'.$psd);
		$num_layers = $im->getNumberImages();
		$_SESSION["bl"]=1;
		//session('bl',1);
		for ($i = 0 ; $i < $num_layers; ++$i) {
			$im->setIteratorIndex($i);      //or this is kinda redundant
			$pagedata=$im->getImagePage();
			$f=$savePath.date('dHis').$i.'.png';
			$data=array();
			if($i==0){
				$bl=320/$pagedata["width"];
				//session('bl',$bl);
				$_SESSION["bl"]=$bl;
			}else{
				//素材插入用户素材表upfile，获取素材编号
				$data['userid_int']=$userid;
				$data['filetype_int']=1;
				$data['filesrc_varchar']=$f;
				$data['create_time']=date('Y-m-d H:i:s');
				$data['sizekb_int']=10.00;
				$data['filethumbsrc_varchar']=$f;
				$data['biztype_int']=0;
				$data['ext_varchar']='png';
				$data['filename_varchar']=$f;
				$data['eqsrc_varchar']='';
				$data['tagid_int']=0;
				$data['delete_int']=0;
				//$fid=M('upfile')->add($data);
				$sq="insert into ".$db['DB_PREFIX']."upfile(userid_int,filetype_int,filesrc_varchar,create_time,sizekb_int,filethumbsrc_varchar,biztype_int,ext_varchar,filename_varchar,eqsrc_varchar,tagid_int,delete_int) values('{$userid}','1','{$f}','".date('Y-m-d H:i:s')."','10.00','{$f}','0','png','{$f}',' ',0,0)";
				$fid=mysql_query($sq);
				//$bl=session('bl');
				$bl=$_SESSION["bl"];
				$arr[$i-1]['content']	="";
				$arr[$i-1]['css']		=array('top'=>($bl*$pagedata["y"]),'zIndex'=>$i-1,'width'=>($bl*$pagedata["width"]),'height'=>($bl*$pagedata["height"]),'left'=>($bl*$pagedata["x"]));
				$arr[$i-1]['id']		=abs(crc32(time().$f));
				$arr[$i-1]['num']		=1;
				$arr[$i-1]['pageId']	=$pageid;
				$arr[$i-1]['properties']=array('width'=>($bl*$pagedata["width"]),'height'=>($bl*$pagedata["height"]),'src'=>$f,'id'=>$fid,'imgStyle'=>array('width' => ($bl*$pagedata["width"]),'height' => ($bl*$pagedata["height"]),'marginTop' => '0px','marginLeft' => '0px'));
				$arr[$i-1]['sceneId']	=$sceneid;
				$arr[$i-1]['title']	='';
				$arr[$i-1]['type']	=4;
				//拼凑array，更新scenepage层信息
			
			
			
				$im->writeImage(dirname(__FILE__).'/Uploads/'.$f); //导出所有图层到单独的png文件
				exec('C:\pngquant\pngquant.exe -f --ext .png --quality 50-80 D:/vxuebao/Uploads/'.$f);
			}
		}
		//session('bl',null); 
		unset($_SESSION['bl']);
		$content_text=json_encode($arr);
		
		$sql1="update ".$db['DB_PREFIX']."scenepage set `content_text`='".addslashes ($content_text)."' where `pageid_bigint`=".$pageid."";
		$sql2="update ".$db['DB_PREFIX']."psd set isok=1 where id=".$rs['id'];
		$content_text=json_encode($arr);
		//echo $sq;
		//echo $sql1;
		//echo $sql2;
		//echo $content_text;
		
		mysql_query($sql1);
		mysql_query($sql2);
		
		//mysql_close($conn);
		$im->clear();  
		$im->destroy(); 
			
			
			
	}else{
		echo "没有需要转换的文件";
	}
}
mysql_close($conn);



$endtime = explode(' ',microtime());
$thistime = $endtime[0]+$endtime[1]-($starttime[0]+$starttime[1]);
$thistime = round($thistime,3);
echo "\n".$thistime." s";
?>