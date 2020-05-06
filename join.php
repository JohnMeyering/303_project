<?php

require "src/config/config.php";

// If the user isn't logged in, they shouldn't be here
if( !isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]) {
	header("Location: login.php");
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Quiplash*lite* - Join!</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

	<!-- CSS -->
	<link rel="stylesheet" href="style.css">

	<!-- Font -->
	<link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Lobster&display=swap" rel="stylesheet">
	<script src="https://kit.fontawesome.com/e587026860.js" crossorigin="anonymous"></script>

	<!-- Bootstrap trash -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<!-- End of trash -->

</head>
<body>

<!--NAVBAR -->
	<nav class='navbar navbar-expand-sm navbar-dark' id="navbar">
		<a href="#" class='navbar-brand brand-font'>
			<span>
				<font id="logo1">Quiplash </font>
				<font id="logo2">*lite*</font>
			</span>
		</a>
		<button class='navbar-toggler' data-toggle='collapse' data-target='#nav'>
			<span class='navbar-toggler-icon'></span>
		</button>
		<div class='collapse navbar-collapse' id="nav">
			<ul class='navbar-nav ml-auto'>
				<li class='nav-item'>
					<a href="profile.php" class='nav-link'><i class="fas fa-user"></i> Profile </a>
				</li>
				<li class='nav-item'>
					<a href="#" class='nav-link text-white'><i class="fas fa-gamepad"></i> Join! </a>
				</li>
				<li class='nav-item'>
					<a href="src/logout_service.php" class='nav-link'><i class="fas fa-sign-out-alt"></i> Logout</a>
				</li>
			</ul> <!-- End of navbar-nav -->
		</div> <!-- End of navbar-collapse -->
	</nav> <!-- End of navbar -->
<!-- END OF NAVBAR -->

<!-- JOIN INPUT -->
<link rel="stylesheet" href="join.css">
<div id="content">
	<div class="container-fluid">
		<div class="row justify-content-center">
			<div class="col col-10 col-sm-8 col-md-6 col-lg-4" id="join-form">
				<form>
					<label for="room-key-input" class="text-white align-middle center-text">Join a Room!</label>
					<input name="room-key-input" id="room-key-input" type="text" class="form-control form-margin" maxlength="4" placeholder="ENTER YOUR 4-LETTER CODE" autocomplete="off" autocorrect="off">

					<button type="button" class="btn form-control form-margin btn-white"><i class="fas fa-user-plus"></i> Join!</button>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- END OF JOIN INPUT -->

<!-- FOOTER -->
<footer id="footer">
	<a class="footer-copyright py-3 text-white" id="copyright">Made for ITP 303 by John Meyering</a>
</footer>
<!-- END OF FOOTER -->
</body>
</html>