<?php

require 'config/config.php';


if( isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] ){
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if($mysqli->connect_errno) {
		echo $mysqli->connect_error;
		exit();
	}

	$username = $_SESSION['username'];

	$sql = "
	DELETE FROM users
	WHERE username = '" . $username . "';";

	$results = $mysqli->query($sql);

	if(!$results) {
		echo $mysqli->error;
		exit();
	}

	// If we affect a row, then the update was successful
	if($mysqli->affected_rows == 1) {
		echo "success";
	}
	else {
		// Something went wrong
		echo "Failed to delete";
	}
	$mysqli->close();
}
else {
	echo "You are not logged in";
}
?>