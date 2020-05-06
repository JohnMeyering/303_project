<?php

require 'config/config.php';


if( isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] ){
	if ( isset($_POST['display_color']) ) {

		//input validation
		if( $_POST['display_color'] == $_SESSION['display_color'] ) {
			echo "Please Input a new Color";
		}
		else if ( empty($_POST['display_color']) ) {
			echo "Display Color empty";
		}
		else if( strlen($_POST['display_color']) != 7 ) {
			echo "Display Color is not 7 characters";
		}
		else {
			$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

			if($mysqli->connect_errno) {
				echo $mysqli->connect_error;
				exit();
			}

			// First we find the id for this color (if it exists)
			$display_color = $mysqli->real_escape_string($_POST['display_color']);
			$username = $_SESSION['username'];

			$sql = "
			SELECT *
			FROM colors 
			WHERE color = '" . $display_color . "';";

			$results = $mysqli->query($sql);

			if(!$results) {
				echo $mysqli->error;
				exit();
			}

			if($results->num_rows == 1) {
				//color already exists, we just take the id
				$result = $results->fetch_assoc();
				$_SESSION["display_color"] = $result['color'];
				echo "success";
			}
			else {
				//color doesn't exist, we make it
				$sql = "
				INSERT INTO colors (color) VALUES ('" . $display_color . "');";

				$results = $mysqli->query($sql);

				if(!$results) {
					echo $mysqli->error;
					exit();
				}
				$_SESSION['display_color'] = $display_color;

				//Color is made, now we need to set the user's color_id to match
				//select which color_id we need -> update
				$sql = "
				SELECT *
				FROM colors
				WHERE color = '" . $display_color . "';";

				$results = $mysqli->query($sql);

				if(!$results) {
					echo $mysqli->error;
					exit();
				}
				$result = $results->fetch_assoc();
				$color_id = $result['color_id'];
				//We now have the color_id and can update the user's color_id
				$sql ="
				UPDATE users 
				SET color_id = '" . $color_id . "' WHERE username = '" . $username . "';";

				$results = $mysqli->query($sql);

				if(!$results) {
					echo $mysqli->error;
					exit();
				}
				if($mysqli->affected_rows == 1) {
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
	echo "You are not logged in";
}
?>