<?php

require "config/config.php";

//Query DB for quips
// Establish Connection
$host = DB_HOST;
$user = DB_USER;
$pass = DB_PASS;
$db = DB_NAME;

$mysqli = new mysqli($host, $user, $pass, $db);

if($mysqli->connecterrno) {
	echo "MySQL Connection Error: " . $mysqli->connect_error;
	exit();
}

// Query and Errors
$mysqli->set_charset("utf8");

$quipQuery = "SELECT * FROM quips";

$quips = $mysqli->query($quipQuery);
if(!$quips) {
	echo $mysqli->error;
	exit();
}
// Use Response
$message = array();
while($quip = $quips->fetch_assoc()) {
	$message[] = $quip['quip'];
}
echo json_encode($message);

// Close Connection
$mysqli->close();

?>