<?php
namespace Home\Controller;
use Think\Controller;
class MainController extends Controller {
	public function index(){
		
		if(session('userid')){
				$this->display('Index:index6_0');
		}else{
			$this->display('Index:myindex');
		}
	}
}