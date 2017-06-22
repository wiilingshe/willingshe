<?php
// header('Content-Type:text/plain;charset=utf-8');
$con = mysql_connect('localhost','root','leonchen');
if(!$con){
	echo mysql_error();
}
mysql_select_db('my_db',$con);
// $result = mysql_query("SELECT * FROM Persons");
//   while($row = mysql_fetch_array($result)){
//   	echo $row['Age'];
//   	echo "<br />";
//   }
$result = mysql_query("SELECT * FROM Persons WHERE FirstName='jack'");
while($row = mysql_fetch_array($result)){
	echo $row['Age'];
	echo "<img src=upload/".$row['Age'].">";
}
if($_FILES['file']['error']>0){
	echo "error:".$_FILES['file']['error'].'<br/>';
}
else{
  // echo "Upload: " . $_FILES["file"]["name"] . "<br />";
  // echo "Type: " . $_FILES["file"]["type"] . "<br />";
  // echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
  // echo "Stored in: " . $_FILES["file"]["tmp_name"];
  if (file_exists("upload/" . $_FILES["file"]["name"])){
      	echo $_FILES["file"]["name"] . " already exists. ";
  }else{
	      move_uploaded_file($_FILES["file"]["tmp_name"],"upload/" . $_FILES["file"]["name"]);
	      $fleName = $_FILES["file"]["name"];
	      $sql="INSERT INTO Persons (FirstName, LastName, Age)VALUES('$_POST[firstName]','$_POST[lastName]','$fleName')";
	      mysql_query($sql);
	      mysql_close($con);
	      echo "success";
  }
}
?>