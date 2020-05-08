<?php

require 'config/config.php';

if( isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] ){
	if ( isset($_POST['display-font-input']) ) {

		$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

		if($mysqli->connect_errno) {
			echo $mysqli->connect_error;
			exit();
		}

		// Update the user's font_id
		$font_id = $_POST['display-font-input'];
		$username = $_SESSION['username'];

		$sql ="
		UPDATE users 
		SET font_id = " . $font_id . " WHERE username = '" . $username . "';";

		$results = $mysqli->query($sql);

		if(!$results) {
			echo $mysqli->error;
			exit();
		}
		if($mysqli->affected_rows == 1) {
			//We need to find out what the font was (in a string form)
			$sql = "
			SELECT *
			FROM fonts
			WHERE font_id = " . $font_id . ";";

			$results = $mysqli->query($sql);
			if(!$results) {
				echo $mysqli->error;
				exit();
			}

			$results = $results->fetch_assoc();
			$display_font = $results['font'];
			$_SESSION["display_font"] = $display_font;

			header("Location: ../profile.php");
		}
		else {
			echo "Something broke :(";
		}

		$mysqli->close();
	}
}
else {
	echo "You are not logged in";
}
?>