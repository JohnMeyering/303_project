<?php

require "src/config/config.php";

// If the user is logged in, they shouldn't be here
if( isset($_SESSION["logged_in"]) ) {
	header("Location: profile.php");
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Quiplash*lite* - Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

	<!-- Global CSS -->
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
					<a href="#" class='nav-link text-white'><i class="fas fa-gamepad"></i> Login </a>
				</li>
				<li class='nav-item'>
					<a href="host.php" class='nav-link'><i class="fas fa-tv"></i> Host a Game!</a>
				</li>
			</ul> <!-- End of navbar-nav -->
		</div> <!-- End of navbar-collapse -->
	</nav> <!-- End of navbar -->
<!-- END OF NAVBAR -->


<link rel="stylesheet" href="login.css">
<script src="login.js"></script>
<div id="content">
	<!-- LOGIN/REGISTER -->
	<div class="container-fluid">
		<div class="row justify-content-center">
			<div id="login-form" class="col col-11 col-sm-5">
				<form id="login-form-tag">
					<h2 class="text-white text-center">Login</h2>

					<label for="login-username" class="text-white">Username</label>
					<font id="login-username-error" class="error-message"></font>
					<input name="login-username" type="text" class="form-control form-margin">

					<label for="login-password" class="text-white">Password</label>
					<font id="login-password-error" class="error-message"></font>
					<input name="login-password" type="password" class="form-control form-margin">

					<button id="login-submit" type="submit" class="btn form-control form-margin btn-white"><i class="fas fa-sign-in-alt"></i> Sign In</button>
				</form>
			</div>
			<div id="register-form" class="col col-11 col-sm-5">
				<form id="register-form-tag">
					<h2 class="text-white text-center">Register</h2>

					<label for="register-username" class="text-white">Username</label>
					<font id="register-username-error" class="error-message"></font>
					<input name="register-username" type="text" class="form-control form-margin">

					<label for="register-password" class="text-white">Password</label>
					<font id="register-password-error" class="error-message"></font>
					<input name="register-password" type="password" class="form-control form-margin">

					<lable for="register-password-confirm" class="text-white">Confirm Password</lable>
					<font id="register-password-confirm-error" class="error-message"></font>
					<input name="register-password-confirm" type="password" class="form-control form-margin">

					<button id="register-submit" type="submit" class="btn form-control form-margin btn-white"><i class="fas fa-user-plus"></i> Create Account</button>
				</form>
			</div>
		</div>
	</div>
	<!-- END OF LOGIN/REGISTER -->
</div>


<!-- FOOTER -->
<footer id="footer">
	<a class="footer-copyright py-3 text-white" id="copyright">Made for ITP 303 by John Meyering</a>
</footer>
<!-- END OF FOOTER -->

</body>
</html>