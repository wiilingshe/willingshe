<?php
$con = mysql_connect("localhost","root","leonchen");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("my_db", $con);

$result = mysql_query("SELECT * FROM Persons");

echo "<table border='1'>
<tr>
<th>Firstname</th>
<th>Lastname</th>
</tr>";

while($row = mysql_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['FirstName'] . "</td>";
  echo "<td>" . $row['LastName'] . "</td>";
  echo "</tr>";
  }
echo "</table>";

mysql_close($con);
?>
// <?php
// //链接数据库
// $con = mysql_connect('localhost','root','leonchen');
// if(!$con){
// 	die('Could not connect: ' . mysql_error());
// }
// // 创建数据库
// mysql_query('create database willing',$con);
// //选择数据库
// mysql_select_db('willing',$con);
// //创建表
// $sql = 'create table Persons
// (
// 	Firstname varchar(15),
// 	Lastname varchar(15),
// 	Age int
// 	)'
// //插入数据
// $sql = 'INSERT INTO Persons (Firstname,Lastname,Age) VALUES ("willing","she","24")';
// mysql_query($sql,$con);
// ?>