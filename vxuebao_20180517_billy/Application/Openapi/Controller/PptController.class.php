<?php
namespace Openapi\Controller;
use Think\Controller;
class PptController extends Controller {

	//http://local.vxuebao.com/api.php?c=Ppt&a=zip
	public function zip(){
		$fn="123.rar";
		$f='ppt/';
		import('ORG.Util.PclZip');
		$archive = new \PclZip($fn);
		$list = $archive->extract($f);
		if ($list == 0) {
		  die("解压出错");
		}
	}
	


}
?>