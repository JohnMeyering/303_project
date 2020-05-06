<?php

require 'config/config.php';


if( isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] ){
	if ( isset($_POST['display_name']) ) {

		//input validation
		if ( empty($_POST['display_name']) ) {
			echo "Display Name empty";
		}
		else if( strlen($_POST['display_name']) > 20 ) {
			echo "Display Name longer than 20 characters";
		}
		else {
			$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

			if($mysqli->connect_errno) {
				echo $mysqli->connect_error;
				exit();
			}

			$display_name = $mysqli->real_escape_string($_POST['display_name']);
			$username = $_SESSION['username'];

			$sql = "
			UPDATE users 
			SET display_name = '" . $display_name . "' WHERE username = '" . $username . "';";

			$results = $mysqli->query($sql);

			if(!$results) {
				echo $mysqli->error;
				exit();
			}

			// If we affect a row, then the update was successful
			if($mysqli->affected_rows == 1) {
				$_SESSION['display_name'] = $display_name;
				echo "success";
			}
			else {
				// Something went wrong
				echo "Failed to update";
			}
			$mysqli->close();
		}
	}
	else {
		echo "Form field missing";
	}
}
else {
	echo "You are not logged in";
}
?>