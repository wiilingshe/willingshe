<?php
	// $dbhost = 'localhost:3306';  // mysql服务器主机地址
	// $dbuser = 'root';            // mysql用户名
	// $dbpass = 'leonchen';          // mysql用户名密码
	// $conn = mysqli_connect($dbhost, $dbhostuser, $dbpass);
	$con = mysql_connect("localhost","root","leonchen");
	if(! $con ){
	    die('Could not connect: ' . mysqli_error());
	}
	// if(mysql_query('create database my_db',$con)){
	// 	echo "database created";
	// }else{
	//   echo "Error creating database: " . mysql_error();
	// }
	// Create table in my_db database
	mysql_select_db("my_db", $con);
	// $sql = "CREATE TABLE Persons 
	// (
	// FirstName varchar(15),
	// LastName varchar(15),
	// Age int
	// )";
	// mysql_query($sql,$con);
	// echo 'success';
// 	mysql_query("INSERT INTO Persons (FirstName, LastName, Age) 
// VALUES ('Peter', 'Griffin', '35')");

// mysql_query("INSERT INTO Persons (FirstName, LastName, Age) 
// VALUES ('Glenn', 'Quagmire', '33')");
	// 存入数据
	// $sql="INSERT INTO Persons (FirstName, LastName, Age)
	// VALUES
	// ('$_POST[firstname]','$_POST[lastname]','$_POST[age]')";

	// if (!mysql_query($sql,$con)){
	//   die('Error: ' . mysql_error());
	// }
	// echo "1 record added";

	// 读取数据

	// $result = mysql_query("SELECT * FROM Persons");

	// while($row = mysql_fetch_array($result))
	//   {
	//   echo $row['FirstName'] . " " . $row['LastName'];
	//   echo "<br />";
	//   }
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
	mysqli_close($con);
?>