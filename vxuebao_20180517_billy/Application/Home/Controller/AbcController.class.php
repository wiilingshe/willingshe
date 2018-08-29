<?php
namespace Home\Controller;
use Think\Controller;
 
class AbcController extends Controller {
   
	public function index(){
		import('ORG.Util.PclZip');
		$archive = new \PclZip("Uploads/8836102.zip");
		$list = $archive->create('./Uploads/8836102');
		
	}
}
?>
