<?php
header("Content-type: text/html; charset=utf-8");
//ob_end_clean();
ob_implicit_flush(1);
ignore_user_abort(true);
ini_set('max_execution_time',3000);
set_time_limit(3000);
$db=require_once('Application/Common/Conf/systemConfig.php');
//echo getcwd();die;
echo ppt() . '<br>';


function ppt(){
	global $db;
	$conn = mysql_connect($db['DB_HOST'],$db['DB_USER'],$db['DB_PWD']);
	mysql_query("set character set 'utf8'");//读库 
	mysql_query("set names 'utf8'");//写库 
	mysql_select_db($db['DB_NAME'],$conn);
	
	$sql="select * from ".$db['DB_PREFIX']."ppt where is_del=1 order by id desc limit 1";
	
	$result=mysql_query($sql);
	if($result) {
		$rs=mysql_fetch_assoc($result);
		if($rs){
		
			$p=explode('/',$rs['ppturl']);
			///   e.g. ppt/201701/587728c51b392.pptx
			//print_r($p);die;
			$ppt['savepath']=$p[0].'/'.$p[1].'/';			//保存目录
			$ppt['savename']=$p[2];							//保存文件名
			$input = 'Uploads/'.$ppt['savepath'].$ppt['savename'];
			$input = str_replace('/','\\',$input);
			$output=str_replace(array('.pptx','.ppt'),'.html',$input);
			$cmd=file_get_contents("D:/vxuebao/static/xml/cmd.txt");
			$cmd=str_replace('{#input#}',$input,$cmd);
			$cmd=str_replace('{#output#}',$output,$cmd);
			sleep(1);
			$out=exec($cmd,$out);
			sleep(1);
			mysql_query("UPDATE ".$db['DB_PREFIX']."ppt SET is_del=0 WHERE id=".$rs['id']); 
			mysql_close($conn);
			$ffnn=str_replace(array('.pptx','.ppt'),'',$p[2]);
			
			
			$fn='D:/vxuebao/Uploads/'.$ppt['savepath'].$ffnn.'/'.$ffnn.'.zip';
			
			$f='D:/vxuebao/Uploads/'.$ppt['savepath'].$ffnn;
			
			require_once('D:\vxuebao\ThinkPHP\Library\Org\PclZip.php');
			$archive = new PclZip($fn);
			$list = $archive->extract($f);
			if ($list == 0) {
			  die("zip error");
			}
			$html=file_get_contents('D:/vxuebao/Uploads/'.$rs['pptlink']);
			$html = str_replace("{title}", $rs['title'], $html);
			$fp = file_put_contents('D:/vxuebao/Uploads/'.$rs['pptlink'],$html);

			/*$fp = fopen('D:/vxuebao/Uploads/'.$rs['pptlink'], 'r+');
			fwrite($fp, $html);
			fclose($fp);*/
			
				
			return 'success'.time();		
		}else{
			return 'no data'.time();
		}
	}
}

?>