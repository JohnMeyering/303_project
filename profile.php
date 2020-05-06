<?php

require "src/config/config.php";

// If the user isn't logged in, they shouldn't be here
if( !isset($_SESSION['logged_in']) || empty($_SESSION["logged_in"]) ) {
	header("Location: login.php");
}

$display_name = $_SESSION['display_name'];
$display_color = $_SESSION['display_color'];
$favorite_quip = $_SESSION['quip'];

?>
<!DOCTYPE html>
<html>
<head>
	<title>Quiplash*lite* - Profile</title>
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
					<a href="#" class='nav-link text-white'><i class="fas fa-user"></i> Profile </a>
				</li>
				<li class='nav-item'>
					<a href="join.php" class='nav-link'><i class="fas fa-gamepad"></i> Join! </a>
				</li>
				<li class='nav-item'>
					<a href="src/logout_service.php" class='nav-link'><i class="fas fa-sign-out-alt"></i> Logout</a>
				</li>
			</ul> <!-- End of navbar-nav -->
		</div> <!-- End of navbar-collapse -->
	</nav> <!-- End of navbar -->
<!-- END OF NAVBAR -->

<!-- PROFILE CONTENT -->
<link rel="stylesheet" href="profile.css">
<script src="profile.js"></script>
<div id="content">
	<div class="container-fluid">
		<!-- DISPLAY NAME -->
		<div class="row justify-content-center">
			<div class="col col-10 col-sm-8 col-md-6 col-lg-4" id="display-name-form">
				<div class="text-white center-text">Your current display name is: <font><?php echo $display_name; ?></font></div>
				<hr>
				<form id="display-name-form-tag">
					<label for="display-name-input" class="text-white center-text">Would you like a new one?<br>(Ex. Obama, Trump, Hitler, Mickey Mouse, etc.)</label>
					<font id="display-name-error-message" class="error-message"></font>
					<input name="display-name-input" type="text" class="form-control form-margin">
					<button type="submit" id="display-name-submit" class="btn form-control form-margin btn-white"><i class="far fa-address-card"></i> Replace Display Name</button>
				</form>
			</div>
		</div>
		<!-- END OF DISPLAY NAME -->
		<!-- COLOR PICKER -->
		<div class="row justify-content-center">
			<div class="col col-10 col-sm-8 col-md-6 col-lg-4" id="display-color-form">
				<div class="text-white center-text">Your current display color is: <font id="color-font" style="color: <?php echo $display_color; ?> !important;"><?php echo $display_color; ?></font></div>
				<hr>
				<form id="display-color-form-tag">
					<label for="display-color-input" class="text-white center-text">Would you like a new one?<br></label>
					<font id="display-color-error-message" class="error-message"></font>
					<input name="display-color-input" type="color" class="form-control form-margin" value="<?php echo $display_color; ?>">
					<button type="submit" class="btn form-control form-margin btn-white"><i class="fas fa-paint-brush"></i> Replace Display Color</button>
				</form>
			</div>
		</div>
		<!-- END OF COLOR PICKER -->
		<!-- FAVORITE QUIP -->
		<div class="row justify-content-center">
			<div class="col col-10 col-sm-8 col-md-6 col-lg-4" id="delete-account-form">
				<div class="text-white center-text">Your current favorite quip prompt is:</div>
				<hr>

				<p class="text-white center-text"><?php echo $favorite_quip; ?></p>
				<hr>

				<div class="text-white center-text" style="font-size: 12px;">*Hit the star button when in a game to select a new favorite quip prompt!*</div>
			</div>
		</div>
		<!-- END OF FAVORITE QUIP -->
		<!-- DELETE ACCOUNT -->
		<div class="row justify-content-center" >
			<div class="col col-10 col-sm-8 col-md-6 col-lg-4" id="delete-account-form">
				<div class="text-white center-text">Would you like to delete your account? :thinking:</div>
				<div class="text-white center-text">We won't ask you to confirm your decision</div>
				<hr>

				<form id="delete-account-form-tag">
					<font id="delete-user-error-message" class="error-message"></font>
					<button type="submit" class="btn form-control form-margin btn-danger"><i class="fas fa-trash"></i> Delete Account</button>
				</form>
			</div>
		</div>
		<!-- END OF DELETE ACCOUNT -->
	</div>
</div>
<!-- END OF PROFILE CONTENT -->


<!-- FOOTER -->
<footer id="footer">
	<a class="footer-copyright py-3 text-white" id="copyright">Made for ITP 303 by John Meyering</a>
</footer>
<!-- END OF FOOTER -->

</body>
</html>