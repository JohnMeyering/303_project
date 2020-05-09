<?php

require 'config/config.php';


if( !isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]){
	if ( isset($_POST['username']) && isset($_POST['password']) && isset($_POST['password_confirm']) ) {

		//input validation
		if ( empty($_POST['username']) || empty($_POST['password']) ) {
			echo "Username and/or password was empty";
		}
		else if( strlen($_POST['username']) > 20 || strlen($_POST['password']) > 20 ) {
			echo "Username and/or password longer than 20 characters";
		}
		else if( $_POST['password'] != $_POST['password_confirm'] ) {
			echo "Passwords do not match";
			echo $_POST['password'] . " " . $_POST['password_confirm'];
		}
		else {

			$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

			if($mysqli->connect_errno) {
				echo $mysqli->connect_error;
				exit();
			}

			$username = $mysqli->real_escape_string($_POST['username']);
			$password = $mysqli->real_escape_string($_POST['password']);

			$sql = "
			SELECT * FROM users
			WHERE username = '" . $username . "';";
			
			$results = $mysqli->query($sql);

			if(!$results) {
				echo $mysqli->error;
				exit();
			}
			// If we get results back, then the username is taken
			if($results->num_rows > 0) {
				echo "Username is taken";
			}
			else {
				// The Username isn't taken -> we need to add it to the DB
				$display_name = $username;

				$sql = "
				INSERT INTO users (username, password, display_name) 
				VALUES ( '" . $username . "', '" . $password . "', '" . $display_name . "' );";

				$results = $mysqli->query($sql);

				if(!$results) {
					echo $mysqli->error;
					exit();
				}
				else {
					// Set session variables to remember this user
					$_SESSION["username"] = $_POST["username"];
					$_SESSION["logged_in"] = true;
					$_SESSION['display_name'] = $_POST["username"];
					$_SESSION['display_color'] = "#000000";
					$_SESSION['display_font'] = "Arial";

					echo "success";
				}
			}
			$mysqli->close();
		} 
	}
	else {
		echo "Form field missing";
	}
}
else {
	echo "You are already logged in D:<";
}
?>