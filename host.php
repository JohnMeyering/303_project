<?php

require "src/config/config.php";

// If the user is logged in, they shouldn't be here
if( isset($_SESSION["logged_in"]) || $_SESSION["logged_in"]) {
	header("Location: profile.php");
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Quiplash*lite* - Host</title>
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
					<a href="login.php" class='nav-link'><i class="fas fa-gamepad"></i> Login </a>
				</li>
				<li class='nav-item'>
					<a href="#" class='nav-link text-white'><i class="fas fa-tv"></i> Host a Game!</a>
				</li>
			</ul> <!-- End of navbar-nav -->
		</div> <!-- End of navbar-collapse -->
	</nav> <!-- End of navbar -->
<!-- END OF NAVBAR -->


<link rel="stylesheet" href="host.css">
<script src="host.js"></script>
<div id="content">
	<!-- HOST INPUT -->
	<div class="container-fluid">
		<div class="row justify-content-center">
			<div class="col col-10 col-sm-8 col-md-6 col-lg-4" id="setup-form">
				<form id="room-key-form-tag">
					<label for="room-key-input" class="text-white align-middle center-text">Make a Room Key!</label>
					<input name="room-key-input" id="room-key-input" type="text" class="form-control form-margin" maxlength="4" placeholder="ENTER ANY 4-LETTER CODE" autocomplete="off" autocorrect="off">

					<button type="submit" class="btn form-control form-margin btn-white"><i class="fas fa-broadcast-tower"></i> Create Room!</button>
				</form>
			</div>
		</div>
	</div>
	<!-- END OF HOST INPUT -->
</div>
<button type="button" onclick="sendQuipPrompt('John', 'Cena', 'Are You Sure About That');">Send Quip Prompt</button>
<button type="button" onclick="sendVotingPrompt('John', 'Cena', 'Are You', 'Sure About That');">Send Voting Prompt</button>

<!-- FOOTER -->
<footer id="footer">
	<a class="footer-copyright py-3 text-white" id="copyright">Made for ITP 303 by John Meyering</a>
</footer>
<!-- END OF FOOTER -->

</body>
</html>