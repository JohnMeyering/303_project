<?php

require 'config/config.php';


if( !isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]){
	if ( isset($_POST['username']) && isset($_POST['password']) ) {

		//input validation
		if ( empty($_POST['username']) || empty($_POST['password']) ) {
			echo "Username and/or password was empty";
		}
		else if( strlen($_POST['username']) > 20 || strlen($_POST['password']) > 20 ) {
			echo "Username and/or password longer than 20 characters";
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
			JOIN colors
			  ON colors.color_id = users.color_id
			JOIN fonts
			  ON fonts.font_id = users.font_id
			WHERE username = '" . $username . "' AND password = '" . $password . "';";
			
			$results = $mysqli->query($sql);

			if(!$results) {
				echo $mysqli->error;
				exit();
			}
			// If we get 1 result back, then the username/pw combo is valid
			if($results->num_rows == 1) {
				// Set session variables to remember this user
				$_SESSION["username"] = $_POST["username"];
				$_SESSION["logged_in"] = true;

				// Put the user details in a variable for easy access
				$details = $results->fetch_assoc();

				// And move them into session variables
				$_SESSION['display_name'] = $details['display_name'];
				$_SESSION['display_color'] = $details['color'];
				$_SESSION['display_font'] = $details['font'];

				echo "success";
			}
			else {
				echo "Username and/or Password are wrong";
			}
			$mysqli->close();
		} 
	}
	else {
		echo "Fields are missing";
	}
}
else {
	echo "You are already logged in D:<";
}
?>