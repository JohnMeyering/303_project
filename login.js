$(document).ready(function() {
	// This file contains two primary functions:
	//  -login()
	//  -register()
	// Both handle the submission of their respective form

	// There is also a helper function:
	// -ajaxPost(endpointUrl, postData, returnFunction)
	// It does what you think it does

	$("#login-form-tag").on("submit", function(event) {
		// Performs validation, then AJAX to src/login_service.php
		// If the AJAX gets a "success", then we redirect to profile.php
		event.preventDefault();
		console.log("Validating login...");

		let username = $("input[name='login-username']").val().trim();
		let password = $("input[name='login-password']").val();

		let username_error = $("#login-username-error");
		let password_error = $("#login-password-error");

		let noErrors = true;

		if(username == "") {
			username_error.text("Please Enter a Username");
			noErrors = false;
		}
		else if(username.length > 20) {
			username_error.text("Max Username Length: 20");
			noErrors = false;
		}

		if(password == "") {
			password_error.text("Please Enter a Password");
			noErrors = false;
		}
		else if(password.length > 20) {
			password_error.text("Max Password Length: 20");
			noErrors = false;
		}

		if(noErrors) {
			// AJAX
			console.log("No Errors. Proceeding with AJAX...");
			let postData = "username=" + username + "&password=" + password;

			$.ajax({
				method: "POST",
				url: "src/login_service.php",
				data: {
					username: username,
					password: password
				}
			}).done(function(response) {
				console.log(response);
				if( response == "success" ) {
					window.location.replace("profile.php");
				}
			});
		}
	});
	$("#register-form-tag").on("submit", function(event) {
		// Performs validation, then AJAX to src/register_service.php
		// If the AJAX gets a "success", then we redirect to profile.php
		event.preventDefault();
		console.log("Validating register...");

		let username = $("input[name='register-username']").val().trim();
		let password = $("input[name='register-password']").val();
		let password_confirm = $("input[name='register-password-confirm']").val();

		let username_error = $("#register-username-error");
		let password_error = $("#register-password-error");
		let password_confirm_error = $("#register-password-confirm-error");

		let noErrors = true;

		if(username == "") {
			username_error.text("Please Enter a Username");
			noErrors = false;
		}
		else if(username.length > 20) {
			username_error.text("Max Username Length: 20");
			noErrors = false;
		}

		if(password == "") {
			password_error.text("Please Enter a Password");
			noErrors = false;
		}
		else if(password.length > 20) {
			password_error.text("Max Password Length: 20");
			noErrors = false;
		}

		if(password_confirm != password) {
			password_confirm_error.text("Passwords must match");
			noErrors = false;
		}

		if(noErrors) {
			// AJAX
			console.log("No Errors. Proceeding with AJAX...");

			$.ajax({
				method: "POST",
				url: "src/register_service.php",
				data: {
					username: username,
					password: password,
					password_confirm: password_confirm
				}
			}).done(function(response) {
				console.log(response);
				if( response == "success" ) {
					window.location.replace("profile.php");
				}
			});
		}
	});
});


