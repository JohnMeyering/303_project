$(document).ready(function() {
	// This file contains three primary functions:
	//  -update_display_name()
	//  -update_display_color()
	//  -delete_user()
	// Each handles the submission of its respective "form"

	$("#display-name-form-tag").on("submit", function(event) {
		// This function validates the display_name input and performs AJAX to display_name_service.php
		event.preventDefault();

		// Validation
		let noErrors = true;
		let input = $("input[name='display-name-input']").val().trim();
		let error = $("#display-name-error-message");

		if(input == "") {
			error.text("Please Enter a Display Name");
			noErrors = false;
		}
		else if(input.length > 20) {
			error.text("Max length 20 characters");
			noErrors = false;
		}

		// AJAX
		if(noErrors) {
			$.ajax({
				method: "POST",
				url: "src/display_name_service.php",
				data: {
					display_name: input
				}
			}).done(function(response) {
				console.log(response);
				if(response == "success") {
					//reload page
					location.reload();
				}
				else {
					error.text(response);
				}
			});
		}
	});

	$("#display-color-form-tag").on("submit", function(event) {
		// This function validates the display_color input and performs AJAX to display_color_service.php
		event.preventDefault();

		// Validation
		let noErrors = true;
		let input = $("input[name='display-color-input']").val().trim();
		let error = $("#display-color-error-message");

		if(input == "") {
			error.text("Please Select a Color");
			noErrors = false;
		}
		else if(input.length != 7) {
			//I'm not actually going to check if the value is a valid color hex
			//I'm not insane
			error.text("Stop entering values into the inspector, your turd");
			noErrors = false;
		}

		// AJAX
		if(noErrors) {
			$.ajax({
				method: "POST",
				url: "src/display_color_service.php",
				data: {
					display_color: input
				}
			}).done(function(response) {
				console.log(response);
				if(response == "success") {
					//reload the page
					location.reload();
				}
				else {
					error.text(response);
				}
			})
		}
	});

	$("#delete-account-form-tag").on("submit", function(event) {
		//No validation, we just do what they ask
		event.preventDefault();
		let error = $("#delete-user-error-message");

		$.ajax({
			method: "POST",
			url: "src/delete_user_service.php",
		}).done(function(response) {
			console.log(response);
			if(response == "success") {
				window.location.replace("src/logout_service.php");
			}
			else {
				error.text(response);
			}
		})
	});
});